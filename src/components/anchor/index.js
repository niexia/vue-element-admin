import Anchor from './src/anchor.vue';

Anchor.install = function(Vue) {
  Vue.components(Anchor.name, Anchor);
};

export default Anchor;