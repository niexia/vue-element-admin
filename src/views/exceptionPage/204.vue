<template>
  <exception>
    <template slot="img">
      <img src="./../../assets/imgs/exception_204.png">
    </template>
    <template slot="hint">
      <p class="hint__title">页面暂无内容</p>
      <p class="hint__guide">抱歉，页面暂无内容，请看看其他页面</p>
    </template>
  </exception>
</template>
<script>
import Exception from './template';
export default {
  name: 'Exception204',
  components: {Exception},
  data() {
    return {

    }
  }
}
</script>
<style scoped>

</style>

