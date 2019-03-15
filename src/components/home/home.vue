<template>
  <div class="views__wrapper">
    <slidebar></slidebar>
    <div class="views__content">
      <content-header></content-header>
      <div class="content__main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import slidebar from "./slidebar.vue";
import header from "./header.vue";
export default{
  name: "home",
  components:{slidebar: slidebar, contentHeader: header},
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
