<template>
  <div>
    <button @click="loadingFull =! loadingFull">全屏loading</button>    
    <p v-vccc-loading.fullscreen="loadingFull" style="position: relative">
        <pre>
          update：所在组件的 VNode 更新时调用，
          但是可能发生在其子 VNode 更新之前。
          指令的值可能发生了改变，也可能没有。
          但是你可以通过比较更新前后的值来忽略不必要的模板更新 
          (详细的钩子函数参数见下)。
        </pre>
    </p>

    <button @click="loading = !loading">局部loading</button>
    <p v-vccc-loading="loading" style="position: relative">
      <pre>
        bind：只调用一次，指令第一次绑定到元素时调用。
        在这里可以进行一次性的初始化设置。
        inserted：被绑定元素插入父节点时调用 
        (仅保证父节点存在，但不一定已被插入文档中)。
      </pre>
    </p>
  </div>
</template>
<script>
  export default{
    data() {
      return{
        loadingFull: false,
        loading: false,
      }
    },

    methods:{
     handleLoadFull(){
        debugger;
        this.loadingFull = !this.loadingFull;
     }
    },

    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      },
    }
}
</script>

