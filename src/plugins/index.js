/*
 * @Description: 以插件的形式注册指令、mixin、以及实例属性或者方法
 * @Author: YangJin
 * @Date: 2018-10-18 11:59:01
 */
import {focus} from './drective';
import mixins from './mixins';
import {formatDate} from './methods';
var plugins = {};
plugins.install = function (Vue, option) {
  Vue.directive('focus', focus);
  Vue.mixin(mixins);
  Vue.prototype.$formatDate = formatDate;
}
export default plugins;