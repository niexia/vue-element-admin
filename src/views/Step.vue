<template>
  <div>
    <el-steps :active="step" :simple="true">
      <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
      <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
    </el-steps>
    <p>当前{{step}}</p>
    <button @click="step++">下一步</button>
    <button @click="step--">上一步</button>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        step: 1,
      }
    }
  }
</script>
<style>
/* @import 'element-ui/lib/theme-chalk/base.css';
@import 'element-ui/lib/theme-chalk/step.css';
@import 'element-ui/lib/theme-chalk/step.css'; */
@import './../assets/css/step.css';
@import './../assets/css/steps.css';
</style>

