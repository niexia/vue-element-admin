import AnchorLink from './../anchor/src/anchor.vue';

AnchorLink.install = function (Vue) {
  Vue.component(AnchorLink.name, AnchorLink);
};

export default AnchorLink;