<template>
  <div class="views__wrapper">
    <slidebar></slidebar>
    <div class="views__content">
      <div class="content__header"></div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import slidebar from "./slidebar.vue";
export default{
  name: "home",
  components:{slidebar},
  data(){
    return{

    }
  }
}
</script>
<style>
.views__wrapper{
  display: flex;
}
.views__wrapper .views__content{
  flex: 1;
}
</style>
