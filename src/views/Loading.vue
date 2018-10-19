<template>
<div class="content__main">
    <el-row>
      <p><el-button type="text">效果</el-button></p>
      <el-button type="primary" @click="handleLoadFull">全屏loading</el-button>    
      <p v-views-loading.fullscreen="loadingFull" style="position: relative; height: 800px;">
        <pre>
          update：所在组件的 VNode 更新时调用，
          但是可能发生在其子 VNode 更新之前。
          指令的值可能发生了改变，也可能没有。
          但是你可以通过比较更新前后的值来忽略不必要的模板更新 
          (详细的钩子函数参数见下)。
        </pre>
      </p>
      <el-button type="primary" @click="loading = !loading">局部loading</el-button>
      <p v-views-loading="loading" style="position: relative">
        <pre>
          bind：只调用一次，指令第一次绑定到元素时调用。
          在这里可以进行一次性的初始化设置。
          inserted：被绑定元素插入父节点时调用 
          (仅保证父节点存在，但不一定已被插入文档中)。
        </pre>
      </p>
      <p><el-button type="text">核心代码</el-button></p>
      <div class="markdown-body" v-html="compiledMarkdown"></div>
    </el-row>
  </div>
</template>
<script>
import marked from 'marked';
import highlight from './../../static/js/highlight.min.js'
var rendererMD = new marked.Renderer();
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return highlight.highlightAuto(code).value
  }
})
export default{
  data() {
    return{
      loadingFull: false,
      loading: false,
      code: '### markDown能用了 ```abcd```',
    }
  },
  computed: {
    compiledMarkdown: function(){
      return marked(this.code, {sanitize: true});
    }
  },
  mounted() {
  },
  methods:{
    handleLoadFull(){
      this.loadingFull = true;
      setTimeout(() => {
        this.loadingFull = false;
      }, 5000);
    },
  },
}
</script>

