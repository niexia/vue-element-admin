<template>
  <div class="content__header">
    <p>组件学习</p>
    <el-tooltip effect="dark" content="关于我(Github)" placement="left-start">
      <div class="about">
        <a href="https://github.com/KingYouge" target="_blank"></a>
      </div>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  
}
</script>
<style>
.content__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 20px;
}
.content__header .about{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: url("./../../assets/imgs/icon-me.jpg") center no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}
.content__header .about a{
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
