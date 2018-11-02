// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import installComponents from './util/installComponents'
import installPlugins from './plugins/index'
//注册组件
Vue.use(ElementUI);
installComponents(Vue);
//注册插件
Vue.use(installPlugins);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

