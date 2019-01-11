var fs = require('fs');
var render = require('json-templater/string');
var path = require('path');
var endOfLine = require('os').EOL;

var { STANDARD_IMPORT, STANDARD_DEFAULT, STANDARD_VIEWS } = require('../clients/STANDARD/router.js');
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