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