// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import Echarts from 'vue-echarts'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import installPlugins from './plugins/index'
import components from './components/index';

// register components
Vue.use(ElementUI);
Vue.use(infiniteScroll);
Vue.prototype.$ELEMENT = {size: 'small'}; // default size
Vue.use(components);
Vue.component('v-chart', Echarts);

// register plugin
Vue.use(installPlugins);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

