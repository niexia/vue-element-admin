<template>
<div>
  <el-select v-model="value5" multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>

  <el-select
    v-model="value11"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-row>
    <el-col :span="12">
      <el-input v-focus="focus" v-model="text" @change="handleChange"></el-input>
      <el-button @click="handleClick">发送</el-button>
    </el-col>
  </el-row>
  <el-switch v-model="switchVal" active-icon-class="el-icon-success"></el-switch>
</div>
</template>
<script>
export default{
  data(){
    return{
      focus: false,
      text: '',
      sendMessage: '',
      options: [{
          value: '选项1',
          label: '黄金糕444444'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value5: [],
        value11: [],
        switchVal: '',
    }
  },
  watch:{
    focus(val){
      this.focus = !val;
    }
  },
  mounted() {
    function* dataConsumer() {
      console.log('Started');
      console.log(`1. ${yield}`);
      console.log(`2. ${yield}`);
      return 'result';
    }
    let genObj = dataConsumer();
    console.log(genObj.next())
    // Started
    console.log(genObj.next('a'));
    // 1. a
    console.log(genObj.next('b'));
    // 2. b
  },
  methods:{
    /**
     * @description: 遍历器生成函数
     * @param {Array} array 
     * @return: 遍历器对象
     */
    makeInterator(array){
      var nextIndex = 0;
      return{
        next: function () {
          return nextIndex < array.length ? {value: array[nextIndex++], done: false} : {value: undefined, done: true};
        }
      }
    },
    handleClick(){
      this.focus = true;
    },
    handleChange(val){
      console.log(val);
    }
  }
}  
</script>
<style>

</style>
