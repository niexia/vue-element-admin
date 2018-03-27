<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="returnHome">返回</button>
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
</style>
