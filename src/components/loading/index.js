import Vue from 'vue';
import Loading from './loading.vue';
const loadingConstructor = Vue.extend(Loading);

Vue.directive('KY-loading', {
    update: function(el, binding){
        if(binding.oldValue != binding.value) {
            const options = {};
            options.fullScreen = binding.modifiers.fullScreen ? true : false;
            if(options.fullScreen){
                options.top = 0;
                options.left = 0;
                options.width = '100%';
                options.height = '100%';
            }
            else{
                ['top', 'left'].forEach(function(property){
                    var scroll = property === 'top' ? 'scrollTop':'scrollLeft';
                    options[property] = el.getBoundingClientRect()[property] + document.body[scroll] + document.documentElement[scroll] + 'px';
                })
            }
            var component = new loadingConstructor({
                data: options,
            }).$mouted()
            var node = document.querySelector('.KY-loading');
            if(node && node.parentNode){
                node.parentNode.removeChild(node);
            }
            if (binding.value === true) {
                document.querySelector("body").appendChild(component.$el);
            } 
            else{
                var node = document.querySelector('.kiko-loading');
                if (node && node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            }
        }
    },
})
