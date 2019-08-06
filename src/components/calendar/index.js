import NxCalendar from './src/calendar';

NxCalendar.install = function (Vue) {
  Vue.component(NxCalendar.name, NxCalendar);
};

export default NxCalendar;