<template>
  <div class="main__exception">
    <section class="imgBox">
      <slot name="img">
        <img src="./../../assets/imgs/exception_404.png">
      </slot>
    </section>
    <section class="hintBox">
      <slot name="hint">
        <p class="hint__title">抱歉，你访问的页面不存在</p>
        <p class="hint__guide">您要找的页面没有找到，请返回首页继续浏览</p>
      </slot>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Exception',
  data() {
    return {
    }
  }
}
</script>
<style scoped>
  .main__exception {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  .main__exception .imgBox {
    width: 260px;
    height: 260px;
    margin-right: 50px;
  }
  .main__exception .imgBox img {
    width: 100%;
    height: 100%;
  }
  .main__exception .hintBox .hint__title {
    margin: 20px 0;
    font-size: 24px;
    color: #303133;
  }
  .main__exception .hintBox .hint__guide {
    font-size: 16px;
    color: #909399;
  }
  .main__exception .hintBox .hint__guide .el-button {
    margin-left: 0;
  }
</style>

