<template>
  <exception>
    <template slot="img">
      <img src="./../../assets/imgs/exception_204.png">
    </template>
    <template slot="hint">
      <p class="hint__title">抱歉，服务器出错了</p>
      <p class="hint__guide">
        服务器出错了，请重新
        <el-button type="text" @click="handleRefresh">刷新页面</el-button>
        或者
        <el-button type="text" @click="handleReturnHome">返回首页</el-button>
      </p>
    </template>
  </exception>
</template>
<script>
import Exception from './template';
export default {
  name: 'Exception500',
  components: {Exception},
  data() {
    return {
    }
  },
  methods: {
    // 刷新页面
    handleRefresh() {
      location.reload();
    },
    // 返回首页
    handleReturnHome() {
      this.$router.push('/home/dashboard');
    }
  }
}
</script>
<style scoped>

</style>