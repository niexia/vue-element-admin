import TableQuery from './tableQuery/index';
import Anchor from './anchor/index';
import AnchorLink from './anchor-link/index';
import NxTransfer from './transfer/index';
import NxDatePicker from './date-picker/index';

const components = [
  TableQuery,
  Anchor,
  AnchorLink,
  NxTransfer,
  NxDatePicker
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

export default install;