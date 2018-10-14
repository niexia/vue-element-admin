<template>
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">
        <el-input v-focus="focus" v-model="sendMessage"></el-input>
        <el-button @click="handleSend">发送</el-button>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default{
  data(){
    return{
      focus: false,
      sendMessage: '',
    }
  },
  mounted() {
    //通过plugin添加的实例方法
    this.$formatDate('2018.10.12');
  },
  methods:{
    handleSend(){
      this.sendMessage = '';
      this.focus = true;
      this.$nextTick( _ => {
        this.focus = true;
        var inputNode = document.getElementsByTagName('input')[0];
        inputNode.focus();
      })
    }
  }
}  
</script>
<style>

</style>
