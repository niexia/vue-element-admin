import Vue from 'vue';
import Loading from './loading.vue';
let loadingConstructor = Vue.extend(Loading);
let getScroll = function(key) {
  return document.body[key] || document.documentElement[key] || 0;
}
Vue.directive('views-loading', {
  update: function(el, binding) {
    if (binding.oldValue != binding.value) {
      let options = {}
      if (!!binding.modifiers.fullscreen) {
        Object.assign(options, {top: 0, left: 0, width: '100%', height: '100%'});
      } else { 
        let {top, left, height, width} = el.getBoundingClientRect();
        top = `${top + getScroll('scrollTop')}px`
        left = `${left + getScroll('scrollLeft')}px`
        height = `${height}px`
        width = `${width}px`
        Object.assign(options, {top, left, height, width});
      }
      var component = new loadingConstructor({data: options}).$mount(); //创建loading实例并挂载
      var node = document.querySelector('.views-loading')
      if (binding.value) { document.querySelector('body').appendChild(component.$el);} 
      else{
        if (node && node.parentNode) { node.parentNode.removeChild(node)}
      }
    }
  }
})
/** 
 * Vue.api:
 * Vue.extent()
 * el
 * mouted()
*/