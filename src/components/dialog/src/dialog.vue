<template>
  <el-dialog
    :visible.sync="visible"
    title="提示"
    v-bind="$attrs" 
    v-on="$listeners"
    @close="OnClose()">
    <slot name="nx-title">
      <slot name="title"></slot>
    </slot>
    <slot name="nx-content"></slot>
    <slot name="nx-footer">
      <slot name="footer"></slot>
    </slot>
  </el-dialog>
</template>

<script>
export default {
  name: 'NxDialog',
  props: {
    show: { type: Boolean, default: false }
  },
  data() {
    return {
      visible: this.show
    }
  },
  watch: {
    show: {
      immediate: true,
      handler(show) {
        this.visible = this.show
      }
    }
  },
  methods: {
    OnClose() {
      this.$emit('update:show', false)
    }
  }
}
</script>