import TableQuery from './tableQuery/index';

const components = [
  TableQuery,
];

const install = function(Vue) {
  components.forEach(component => {
    Vue.use(component);
  })
};

export default install;