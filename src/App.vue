<template>
  <div id="app">
    <div class="return">
      <span @click="returnHome">返回首页</span>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
      returnHome(){
         this.$router.push({ path: '/' });
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.return {
  margin: 5px;
  background-color: #23ff23;
}
</style>
