import CommonView from './commonView/index';
import SearchBar from './SearchBar/index';

const components = [
  CommonView,
  SearchBar
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

export default install;