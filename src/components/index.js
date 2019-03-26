import TableQuery from './tableQuery/index';
import Anchor from './anchor/index';
import AnchorLink from './anchor-link/index';

const components = [
  TableQuery,
  Anchor,
  AnchorLink
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

export default install;