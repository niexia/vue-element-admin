// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import installComponents from './util/installComponents'
//注册组件
Vue.use(ElementUI);
installComponents(Vue);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
/**
 * 理解：
 * 引入组件App.vue
 * 对index.html的<div id="app"></div>创建vue实例
 * template:'<App/>' 根据官网，template是一个字符串模板作为 Vue 实例的标识使用，模板将会 替换 挂载的元素。
 * 挂载元素的内容都将被忽略，除非模板的内容有分发插槽。
 * 也就是index.html<div id="app"></div>会被替换为<App></App>
 * 哈哈哈 这个就是一如的组件App.vue
 * 所以和下面是等价的：
 * //main.js
 * new Vue({
 * el:'#app'
 * components:{
 * 'app':App
 * }
 * ...
 * //index.html
 * <app></app>
 * })
 */
