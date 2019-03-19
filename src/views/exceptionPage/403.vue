<template>
  <exception>
    <template slot="img">
      <img src="./../../assets/imgs/exception_403.png">
    </template>
    <template slot="hint">
      <p class="hint__title">抱歉，您无权限～</p>
      <p class="hint__guide">抱歉，您暂无权限，请看看其他页面</p>
    </template>
  </exception>
</template>
<script>
import Exception from './template';
export default {
  name: 'Exception403',
  components: {Exception},
  data() {
    return {
    }
  }
}
</script>
<style scoped>

</style>
