<template>
  <div class="views__slideBar">
    <el-menu
      :class="['views__menu', isCollapse && 'is-collapse']"
      :collapse="isCollapse"
      @select="handleSelect"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffeb3b">
      <div class="slideBar__expand"  @click="isCollapse = !isCollapse">
        <i :class="[isCollapse ? 'icon-menu' : 'icon-menu-arrow']"></i>
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
<style lang="scss">
.views__slideBar {
  overflow: auto;
  box-shadow: 0 2px 4px rgba(0,21,41,.08);
  .el-menu {
    border-right: none;
    .slideBar__expand {
      color: #fff;
    }
    .el-submenu__title [class^='icon-']{
      margin:0 8px 0 3px;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
