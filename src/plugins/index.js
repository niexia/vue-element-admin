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