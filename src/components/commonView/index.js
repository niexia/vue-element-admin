import CommonView from './src/CommonView.vue';

CommonView.install = function(Vue) {
  Vue.component(CommonView.name, CommonView)
};

export default CommonView;