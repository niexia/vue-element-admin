<template>
  <div
    class="el-steps"
    :class="[
       !simple && 'el-steps--' + direction,
       simple && 'el-steps--simple'
     ]">
      <slot></slot>
  </div>
</template>

<script>
import Migrating from './migrating';
export default {
  name: 'ElSteps',
  //mixins: [Migrating],
  props: {
    space: [Number, String],/* 每个 step 的间距，不填写将自适应间距。支持百分比 */
    active: Number, /* 设置当前激活步骤 */
    direction: { /* 显示方向 */
      type: String,
      default: 'horizontal'
    },
    alignCenter: Boolean, /* 进行居中对齐 */
    simple: Boolean, /* 是否应用简洁风格 */
    finishStatus: { /* 	设置结束步骤的状态 */
      type: String,
      default: 'finish'
    },
    processStatus: { /* 设置当前步骤的状态 */
      type: String,
      default: 'process'
    }
  },
  data() {
    return {
      steps: [],
      stepOffset: 0
    };
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {
          'center': 'center is removed.'
        }
      };
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },
    steps(steps) {
      debugger
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
};
</script>