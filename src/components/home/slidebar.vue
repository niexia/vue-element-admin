<template>
  <div class="views__slideBar">
    <el-menu
      class="views__menu"
      :collapse="isCollapse"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="slideBar__expand"  @click="isCollapse = !isCollapse">
        <i :class="['iconfont', isCollapse ? 'icon-expendMenu' : 'icon-shrinkMenu']"></i>
      </div>
      <slidebar-menu v-for="item in menu" :key="item.path" :data="item"></slidebar-menu>
    </el-menu>
  </div>
</template>
<script>
import slidebarMenu from './slidebarMenu.vue'
import {routesMenu} from '@/router/index'
export default {
  name: 'slideBar',
  components: {slidebarMenu},
  data() {
    return {
      isCollapse: false,
      menu: routesMenu,
    };
  },
  methods: {
    handleSelect(index, path){
      path = path.join("/").replace('/\/{2,}/g', '/')
      this.$router.push(path);
    }
  }
}
</script>
<style>
.views__header{
  height: 40px;
}
</style>
