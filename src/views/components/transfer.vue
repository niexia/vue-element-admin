<template>
  <div>
    <el-button @click="handleAddData">添加数据</el-button>
    <el-button @click="handleDeleteData">删除数据</el-button>
    <div style="margin: 20px;">
      <nx-transfer filterable v-model="value" :data="data"></nx-transfer>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data: [],
        value: [1, 4]
      };
    },
    methods: {
      handleAddData() {
        let start = Date.now();
        const data = [];
        for (let i = 1; i <= 3000; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`
          });
        }
        this.data = data;
        let end = Date.now();
        console.log(`${(end - start) / 1000}s`);
      },
      handleDeleteData() {
        this.data = [];
      }
    },
  };
</script>
