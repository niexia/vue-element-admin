<template>
  <exception>
    <template slot="img">
      <img src="./../../assets/imgs/exception_404.png">
    </template>
    <template slot="hint">
      <p class="hint__title">抱歉，你访问的页面不存在</p>
      <p class="hint__guide">
        您要找的页面没有找到，请返回
        <el-button type="text" @click="handleReturnPrepage">上一页</el-button>
        或者
        <el-button type="text" @click="handleReturnHome">首页</el-button>
        继续浏览
      </p>
    </template>
  </exception>
</template>
<script>
import Exception from './template';
export default {
  name: 'Exception404',
  components: {Exception},
  data() {
    return {
    }
  },
  methods: {
    // 返回上一页。先判断有没有上一页，有则直接返回，反之返回首页
    handleReturnPrepage() {
      if (history.length > 0) {
        history.go(-1);
      } else {
        this.$router.push('/home/dashboard');
      }
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