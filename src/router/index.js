import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// layout
const Home = resolve => require(['@/components/home/home'], resolve);

// login
const Login = resolve => require(['@/views/Login/login'], resolve);

// dashboard
const Dashboard = resolve => require(['@/views/home/dashboard.vue'], resolve);

// tableApplication
const TableBasic = resolve => require(['@/views/tableApplication/tableBasic.vue'], resolve);
const TableSearch = resolve => require(['@/views/tableApplication/tableSearch.vue'], resolve);

// formApplication
const FromBasic = resolve => require(['@/views/formApplication/formBasic.vue'], resolve);
const formDetail = resolve => require(['@/views/formApplication/formDetail.vue'], resolve);

// extendComponent
const DocViewer = resolve => require(['@/views/extendComponent/docViewer.vue'], resolve);
const ImageViewer = resolve => require(['@/views/extendComponent/imageViewer.vue'], resolve);
const MapUse = resolve => require(['@/views/extendComponent/map.vue'], resolve);
const MarkdownEditor = resolve => require(['@/views/extendComponent/markdownEditor.vue'], resolve);

// systemSetting
const PersonalCenter = resolve => require(['@/views/systemSetting/personalCenter.vue'], resolve);
const securitySetting = resolve => require(['@/views/systemSetting/securitySetting.vue'], resolve);

// exceptionPage
const Exception204 = resolve => require(['@/views/exceptionPage/204.vue'], resolve);
const Exception403 = resolve => require(['@/views/exceptionPage/403.vue'], resolve);
const Exception404 = resolve => require(['@/views/exceptionPage/404.vue'], resolve);
const Exception500 = resolve => require(['@/views/exceptionPage/500.vue'], resolve);

// default router
const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: Login
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '*',
      component: Exception404,
    },
  ]
});

// dynamic router
export const routesMenu = [{
  path: '/home',
  name: '首页',
  component: Home,
  children: [{
    path: '/',
    name: '首页',
    component: Dashboard,
  }]
}, {
  path: '/table',
  name: '表格应用',
  component: Home,
  children: [{
    path: 'tableBasic',
    name: '基础图表',
    component: TableBasic,
  },{
    path: 'tableSearch',
    name: '查询图表',
    component: TableSearch,
  }]
}, {
  path: '/form',
  name: '表单应用',
  component: Home,
  children: [{
    path: 'formBasic',
    name: '基础表单',
    component: FromBasic,
  }, {
    path: 'tableDetail',
    name: '表单详情',
    component: formDetail,
  }]
}, {
  path: '/extend',
  name: '扩展组件',
  component: Home,
  children: [{
    path: 'docViewer',
    name: '文件预览',
    component: DocViewer,
  }, {
    path: 'imageViewer',
    name: '图片预览',
    component: ImageViewer,
  }, {
    path: 'map',
    name: '地图应用',
    component: MapUse,
  }, {
    path: 'markdownEditor',
    name: 'Markdown编辑器',
    component: MarkdownEditor,
  }]
}, {
  path: '/setting',
  name: '系统设置',
  component: Home,
  children: [{
    path: 'personalCenter',
    name: '个人中心',
    component: PersonalCenter,
  }, {
    path: 'securitySetting',
    name: '安全设置',
    component: securitySetting,
  }]
}, {
  path: '/exception',
  name: '异常页面',
  component: Home,
  children: [{
    path: '204',
    name: '204',
    component: Exception204,
  }, {
    path: '403',
    name: '403',
    component: Exception403,
  }, {
    path: '404',
    name: '404',
    component: Exception404,
  }, {
    path: '500',
    name: '500',
    component: Exception500,
  }]
}];
router.addRoutes(routesMenu);
export default router;
