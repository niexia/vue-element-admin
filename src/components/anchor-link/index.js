import AnchorLink from './../anchor/src/anchor.vue';

AnchorLink.install = function (Vue) {
  Vue.components(AnchorLink.name, AnchorLink);
};

export default AnchorLink;