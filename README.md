# 多用户配置

在开发中，如果项目代码中，面对多个客户，现在需要根据不同客户打包的不同的代码，需要怎么配置呢？

平常的开发中一些需求也是比较类似的，例如下面这段代码，根据不同环境，配置不同的接口地址。它们都是需要根据**环境变量**来做不同的配置，从而实现打包的时候进行区分。

```
let baseurl;
if (process.env.NODE_ENV === 'development') {
    baseurl = 'http://api.development.com';
} else {
    baseurl = 'http://api.production.com';
}
export default baseurl;
```

### [webpack的模式](https://webpack.docschina.org/concepts/mode/#mode-production)

开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，通常为每个环境编写彼此**独立的 webpack 配置**。

虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码。


#### webpack4配置mode

提供 mode 配置选项，**告知 webpack 使用相应模式的内置优化**，`mode`的默认值是`production`。

1. 只在配置中提供`mode`选项：

```
module.exports = {
  mode: 'production'
};
```

2. 从 CLI 参数中传递:

```
webpack --mode=production
```

选项|	描述
---|---
development|会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。
production|会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
none|不选用任何默认优化选项

可以看到`mode`实际就是设置`process.env.NODE_ENV`的值。

在`webpack 3.12.0`，以上的配置方法都是不适用的。
```
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  ...
```
```
// 报错信息
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
 - configuration has an unknown property 'mode'. These properties are valid:
...
```

使用第二种方式，同样没有成功
```
node_modules/.bin/webpack --mode=development
```
```
...
Unknown argument: mode
```

#### 在webpack3的配置

许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。

`webpack3`需要使用 webpack 内置的 [DefinePlugin](https://webpack.w3cvip.org/Plugins/DefinePlugin.html) 为所有依赖定义这个变量：

**webpack.dev.conf.js**
```
+ const webpack = require('webpack');
  const merge = require('webpack-merge');
  const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
      new UglifyJSPlugin({
        sourceMap: true
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  })
```
如果您正在使用像 react 这样的 library，那么在添加此 DefinePlugin 插件后，你应该看到 bundle 大小显著下降。**还要注意，任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量**，所以以下检查也是有效的：
```
  import { cube } from './math.js';

  if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

  function component() {
    var element = document.createElement('pre');

    element.innerHTML = [
      'Hello webpack!',
      '5 cubed is equal to ' + cube(5)
    ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

>技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。**通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为**。然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，请查看 [#2537](https://github.com/webpack/webpack/issues/2537)。因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js' 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。

也就是说，在 webpack.config.js 里面我们是无法拿到 process.env.NODE_ENV 的。但是可以换种方式来设置配置信息，可以参考 issue 里这个[解决方法](https://github.com/webpack/webpack/issues/2537#issuecomment-222363754)

#### [DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)

DefinePlugin 允许创建一个在编译时可以配置的**全局常量**。这可能会对开发模式和发布模式的构建允许不同的行为非常有用。如果在开发构建中，而不在发布构建中执行日志记录，则可以使用全局常量来决定是否记录日志。这就是 DefinePlugin 的用处，设置它，就可以忘记开发和发布构建的规则。

```
new webpack.DefinePlugin({
  // Definitions...
});
```
**用法**

每个传进 DefinePlugin 的键值都是一个标志符或者多个用 . 连接起来的标志符。

- 如果这个值是一个字符串，它会被当作一个代码片段来使用。
- 如果这个值不是字符串，它会被转化为字符串(包括函数)。
- 如果这个值是一个对象，它所有的 key 会被同样的方式定义。
- 如果在一个 key 前面加了 typeof,它会被定义为 typeof 调用。

**这些值会被内联进那些允许传一个代码压缩参数的代码中，从而减少冗余的条件判断。**

```
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object')
});
```

```
console.log('Running App version ' + VERSION);
if(!BROWSER_SUPPORTS_HTML5) require('html5shiv');
```

#### process.env

- [process](http://nodejs.cn/api/process.html)

process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。

- [process.env](http://nodejs.cn/api/process.html#process_process_env)

返回用户的环境信息，返回的对象类似如下：
```
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}

在[这篇文章](https://www.jianshu.com/p/ce8f405935b9)，列出了一些设置这些环境信息的方法，不同的环境存在这差异。
```

#### 设置NODE_ENV这样的环境变量

1. 通过DefinePlugin设置

src/下都可以获取到，但是webpack.config.js获取不到

2. 直接写在js文件里面，类似与`build.js`

```
// build.js
'use strict'
require('./check-versions')()
process.env.NODE_ENV = 'production'
```

### 配置

#### 实现步骤

1. 由一个变量标识当前是那个客户
2. `npm run dev`或者`npm run build`之前，根据不同客户生成对应的路由文件
3. 这样执行或者打包就可以根据路由的配置打包不同的文件，而那些没有使用的文件将不会被包含进来

#### 标识客户

1. 直接通过DefinePlugin来配置的话，例如
```
new webpack.DefinePlugin({
  CLIENT: 'C1'
});
```
这样这个 CLIENT 只能在 src/ 下面的文件获取到，无法在构建的时候进行判断。同时不方便扩展，当多个用户的时候就需要多个配置文件。

2. process.env.CLIENT = 'C1'，同时不方便扩展。

如果上面第二种方法不是直接写死，而是在执行命令的时候直接输入客户，然后代码里面直接判断即可，这样就解决第一步的问题。这就需要cross-env。

#### [cross-env](https://www.npmjs.com/package/cross-env)

cross-env(跨Win/Linux平台设置 process.env值)

**安装**

```
npm install --save-dev cross-env
```

在 package.json 文件中设置不同的运行脚本，比如：

```
script:{
    "start": "node build/dev-server.js",
    "buildStag": "cross-env cross-env NODE_ENV=stag  node build/dev-server.js",
    "buildProd": "cross-env cross-env NODE_ENV=production  node build/dev-server.js",
}
//根据上述脚本即可设置不同的 NODE_ENV 值，在文件中设置值或者加载不同的设置文件，以上配置在NODE项目中可正常运行
```

**在vue项目中的使用**

在使用Vue Cli构建的项目中，需要在 process.env 设置其他变量名进行使用，如：BUILD_ENV 在 package.json 的 script 字段中作如下配置：

```
"scripts": {
    "start": "cross-env BUILD_ENV=dev node build/dev-server.js",
    "dev": "cross-env BUILD_ENV=dev  node build/dev-server.js",
    "build": "cross-env BUILD_ENV=dev node build/build.js",
    "buildDev": "cross-env BUILD_ENV=dev  node build/build.js",
    "buildStag": "cross-env BUILD_ENV=stag  node build/build.js",
    "buildProd": "cross-env BUILD_ENV=prod  node build/build.js",
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit/specs test/e2e/specs"
  },

```

**由于搭配webpack重新设置了 process.env 的值，需要在webpack.dev.conf.js 及 webpack.prod.conf.js 文件中**

```
webpack.dev.conf.js
new webpack.DefinePlugin({
    'process.env': config.dev.env,
    'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)//增加此行
})

webpack.prod.conf.js
new webpack.DefinePlugin({
    'process.env': env,
    'process.env.BUILD_ENV': JSON.stringify(process.env.BUILD_ENV)
})
```

即在该插件设置并暴露出 process.env 对象后，再增加process.env.BUILD_ENV 字段并进行赋值。

此时，可在前端JS文件中通过 `process.env.BUILD_ENV` 获得 package.json 命令中设置的值，进行其他操作，

比如，引入不同环境的配置文件：
在config文件夹中增加 buildConfig 文件夹，其中新建以下3个文件：

1. dev.config.js 
2. stag.config.js 
3. prod.config.js,

在每个文件中采用module.exports的方式导出变量，如：

```
module.exports = {
    BASE_URL: 'https://dev-api.greigreat.com',
    BASE_STATIC_URL:'https://static1.greigreat.com/'
}
```

在其他文件中使用

```
//引入环境配置文件
//process.env.BUILD_ENV 为 webpack中的DefinePlugin暴露出的环境变量
const buildConfig = require('./buildConfig/' + process.env.BUILD_ENV + '.config')
export default {
    baseUrl: buildConfig.BASE_URL,
    baseStaticUrl: buildConfig.BASE_STATIC_URL
}
```
是的！！！这样就可以根据客户名称然后获取客户对应的配置！！！

- package.json
```
"scripts": {
  "dev": "npm run build:router && webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  "dev:C1": "cross-env CLIENT=C1 npm run dev", // 设置CLIENT=C1并执行
  "dev:C2": "cross-env CLIENT=C2 npm run dev", // 设置CLIENT=C2并执行
  "start": "npm run dev",
  "unit": "jest --config test/unit/jest.conf.js --coverage",
  "test": "npm run unit",
  "build:router": "node build/bin/build-router.js", // 创建路由
  "build": "npm run build:router && node build/build.js",
  "build:C1": "cross-env CLIENT=C1 npm run build", // 设置CLIENT=C1并打包
  "build:C2": "cross-env CLIENT=C2 npm run build" // 设置CLIENT=C1并打包
},
```
- 不同客户的配置

```
// build/clients/C1/router.js

var CLIENT_IMPORT = {
  Loading: '@/views/C1/Loading' // 不同客户路径不一样
}
module.exports = {
  CLIENT_IMPORT
}

// build/clients/C2/router.js

var CLIENT_IMPORT = {
  Loading: '@/views/C2/Loading' // 不同客户路径不一样
}
module.exports = {
  CLIENT_IMPORT
}
```

- 标准版本的配置

```
// 组件以及对应地址
var STANDARD_IMPORT = {
  Home: '@/components/home/home',
  NoFound: '@/views/NoFound',
  Loading: '@/views/Loading',
  Step: '@/views/Step',
  verify: '@/views/verify'
};

// 默认的路由
var STANDARD_DEFAULT = {
  Home: `{
      path: '/',
      name: '首页',
      component: Home
    }`,
  NoFound: `{
      path: '*',
      component: NoFound,
    }`
}

// 页面路由
var STANDARD_VIEWS = {
  notice: `{
    path: '/notice',
    name: 'notice',
    component: Home,
    children: [{
      path: 'loading',
      name: 'loading组件',
      component: Loading,
    }]
  }`,
  navigation: `{
    path: '/navigation',
    name: 'navigation',
    component: Home,
    children: [{
      path: 'step',
      name: 'step组件',
      component: Step,
    }]
  }`,
  verify: `{
    path: '/verify',
    name: 'verify',
    component: Home,
    children: [{
      path: 'verify',
      name: '官方文档验证',
      component: verify,
    }]
  }`
}

module.exports = {
  STANDARD_IMPORT,
  STANDARD_DEFAULT,
  STANDARD_VIEWS
}
```
- 生成路由
```
var fs = require('fs');
var render = require('json-templater/string');
var path = require('path');
var endOfLine = require('os').EOL;

var { STANDARD_IMPORT, STANDARD_DEFAULT, STANDARD_VIEWS } = require('../clients/STANDARD/router.js');

// 根据客户获取对应的配置文件
var CLIENT = process.env.CLIENT || "";
if (CLIENT) {
  var { CLIENT_IMPORT } = require(`../clients/${CLIENT}/router.js`);
} else {
  var CLIENT_IMPORT = {};
}

var OUTPUT_PATH = path.join(__dirname, '../../src/router/index.js');
var IMPORT_TEMPLATE = 'const {{name}} = resolve => require([\'{{path}}\'], resolve);';
var MAIN_TEMPLATE = `
// 由build/bin/build-router.js自动生成

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

{{include}}

// 默认路由
const router = new Router({
  routes: [
    {{default}}
  ]
})

// 动态路由,并用于生成菜单
export const routesMenu = [
  {{views}}
]

router.addRoutes(routesMenu);
export default router;
`;

var includeTemplate = [];
var defaultTemplate = [];
var viewsTemplate = [];

// include
var includeObject = Object.assign({}, STANDARD_IMPORT, CLIENT_IMPORT);
for (let name of Object.keys(includeObject)) {
  includeTemplate.push(render(IMPORT_TEMPLATE, {
    name: name,
    path: includeObject[name]
  }))
}

// default
for (let name of Object.keys(STANDARD_DEFAULT)) {
  defaultTemplate.push(STANDARD_DEFAULT[name])
}

// views
for (let name of Object.keys(STANDARD_VIEWS)) {
  viewsTemplate.push(STANDARD_VIEWS[name])
}

var template = render(MAIN_TEMPLATE, {
  include: includeTemplate.join(endOfLine),
  default: defaultTemplate.join(','),
  views: viewsTemplate.join(',')
}) 

fs.writeFileSync(OUTPUT_PATH, template); 
console.log('[build router] DONE', OUTPUT_PATH);
```

### 使用

``` bash
npm install

// 标准版
npm run dev
npm run build

// 客户C1版
npm run dev:C1
npm run build:C1

// 客户C2版
npm run dev:C1
npm run build:C2

npm run build --report
```