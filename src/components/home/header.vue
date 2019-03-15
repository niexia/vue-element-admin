<template>
  <div class="content__header">
    <div class="header__navbar">
      <ul class="navbar__menu">
        <li class="menu__item"><i class="icon-home p_r10"></i>首页</li>
        <li class="menu__item"><i class="icon-email p_r10"></i>反馈</li>
        <li class="menu__item"><i class="icon-question-mark-circle p_r10"></i>帮助</li>
    </ul>
    </div>
    <el-dropdown class="header__user">
      <div class="user__profile">
        <img src="./../../assets/imgs/icon__logo.png">
        <p>
          <span style="font-size: 13px;">YangJin</span><br>
          <span style="font-size: 12px;">前端开发</span>
        </p>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <p><i class="icon-person"></i>个人中心</p>
        </el-dropdown-item>
        <el-dropdown-item>
          <p @click="handleLogout"><i class="icon-log-out"></i>退出登录</p>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    /**
     * 退出登录，路由跳转到登录页
     */
    handleLogout() {
      this.$router.push("/login");
    }
  },
}
</script>
<style>
.content__header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 20px;
  box-shadow: 0 1px 4px 0 rgba(0,21,41,.08)
}
.content__header .header__navbar {
  flex: 1;
  color: #666;
  font-size: 12px;
}
.content__header .header__navbar .navbar__menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.content__header .header__navbar .navbar__menu .menu__item{
  width: 90px;
  text-align: center;
}
.content__header .header__user {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.content__header .header__user .user__profile {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  text-align: center;
  color: #333;
}
.content__header .header__user .user__profile img {
  display: inline-block;
  height: 40px;
  width: 40px;
  margin-right: 10px;
}
</style>
