import NxTransfer from './src/main.vue';

NxTransfer.install = function (Vue) {
  Vue.component(NxTransfer.name, NxTransfer)
};

export default NxTransfer;