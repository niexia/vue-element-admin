<template>
  <div class="content__main">
    <el-row>
      <p><el-button type="text">效果</el-button></p>
      <el-steps :active="step" :simple="true">
        <el-step title="步骤1" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤2" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤3" description="这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="步骤4" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
      <el-button-group class="m_t10">
        <el-button type="primary" icon="el-icon-arrow-left"  @click="handleLastStep">上一步</el-button>
        <el-button type="primary" @click="handleNextStep">下一步<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </el-row>
    <el-row>
      <p><el-button type="text">核心代码</el-button></p>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        step: 1,
      }
    },
    methods: {
      handleNextStep(){
        this.step++;
      },
      handleLastStep(){
        this.step--;
      },
    }
  }
</script>
<style>
</style>

