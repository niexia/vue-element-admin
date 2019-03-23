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
import Echarts from 'vue-echarts'
import components from './components/index';

// register components
Vue.use(ElementUI);
Vue.prototype.$ELEMENT = {size: 'small'}; // default size
Vue.use(components);
Vue.component('v-chart', Echarts);
installComponents(Vue);

// register plugin
Vue.use(installPlugins);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

