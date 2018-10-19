/*
 * @Description: 以插件的形式注册指令、mixin、以及实例属性或者方法
 * @Author: YangJin
 * @Date: 2018-10-18 11:59:01
 */
import mixins from './mixins';
import directives from './drective';
import methods from './methods';
let {keys, values, entries} = Object;
let plugins = {};
plugins.install = function (Vue, option) {
  //混入
  Vue.mixin(mixins);
  //注册指令
  for(let val of values(directives)) {
    Vue.directive(val.name, val.hooks);
  }
  //添加实例方法
  for (let [key, val] of entries(methods)){
    Vue.prototype[key] = val;
  }
}
export default plugins;