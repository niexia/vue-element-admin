import Step from './step'
import Steps from './steps';

/* istanbul ignore next */
export default function(Vue) {
  Vue.component(Step.name, Step);
  Vue.component(Steps.name, Steps);
};
