import Vue from 'vue'
import Router from 'vue-router'
//home
const Home = resolve => require(['@/components/home/home'], resolve);
const HelloWorld = resolve => require(['@/views/HelloWorld'], resolve);
//组件
const Loading = resolve => require(['@/views/Loading'], resolve);
const Step = resolve => require(['@/views/Step'], resolve);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading,
    },
    {
      path: '/step',
      name: 'Step',
      component: Step,
    }
  ]
})
