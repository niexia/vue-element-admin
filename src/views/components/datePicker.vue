<template>
  <div>
    <p>日历组件</p>
    <el-divider></el-divider>
    <nx-date-picker v-model="now"></nx-date-picker>
    <div class="mt-10">
      <el-button @click="handleAddDay">增加1天</el-button>
      <el-button @click="handleMinusDay">减少1天</el-button>
      <el-button @click="handleResetDay">回到今天</el-button>
    </div>
  </div>
</template>

<script>
const ONE_DAY_MS = 60 * 60 * 1000 * 24;

export default {
  data() {
    return {
      now: new Date()
    }
  },
  methods: {
    handleAddDay() {
      let day = this.now.getDate();
      let nextDay = new Date(this.now.setDate(day + 1));
      this.now = nextDay;
    },
    handleMinusDay() {
      let day = this.now.getDate();
      let nextDay = new Date(this.now.setDate(day - 1));
      this.now = nextDay;
    },
    handleResetDay() {
      this.now = new Date();
    }
  },
}
</script>

