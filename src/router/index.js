import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Loading from '@/views/Loading'
import Step from '@/views/Step'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
