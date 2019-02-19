<template>
  <div>
    <el-select
      v-model="data.key"
      multiple
      size="mini"
      v-bind="$attrs">
      <el-option
        v-for="(item, index) in data.list"
        :key="index"
        :value="item.value"
        :label="item.name">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['data'],
  data () {
    return {
      
    }
  }
}
</script>
