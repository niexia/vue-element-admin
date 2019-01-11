<template>
<div class="content__main">
  客户1
  <el-button @click="handleClick">确定</el-button>
</div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    handleClick() {
      console.log(process);
      console.log(process.env);
      if (process.env.NODE_ENV === "development") {
        console.log('这就是客户1...')
      } else {
        console.log('客户1...')
      }
    }
  },
}
</script>

