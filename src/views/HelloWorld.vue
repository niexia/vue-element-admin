<template>
  <div vccc-loading='true' class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <button @click="loading">loading</button>
      </li>
      <li>
        <button @click="step">steps</button>
      </li>
    </ul>
  </div>
</template>

<script>
//import vccc-button from '../components/button/button'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    loading(){
      this.$router.push({ path: '/loading' });
    },
    step(){
      this.$router.push({ path:'/step'});
    }
    
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {font-weight: normal;}
ul {list-style-type: none;padding: 0;}
li {display: inline-block;margin: 0 10px;}
a {color: #42b983;}
</style>
