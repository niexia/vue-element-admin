import TableQuery from './tableQuery/index';
import Anchor from './anchor/index';
import AnchorLink from './anchor-link/index';
import NxTransfer from './transfer/index';
import NxDatePicker from './date-picker/index';
import NxCalendar from './calendar/index';
import NxMonthPicker from './month-picker/index';
import Code from './code/index';

const components = [
  TableQuery,
  Anchor,
  AnchorLink,
  NxTransfer,
  NxDatePicker,
  NxCalendar,
  NxMonthPicker,
  Code
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

export default install;