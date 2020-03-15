import NxDialog from './src/dialog.vue';

NxDialog.install = function (Vue) {
  Vue.component(NxDialog.name, NxDialog);
};

export default NxDialog;