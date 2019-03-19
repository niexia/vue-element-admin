<template>
  <div class="login">
    <div class="login__content">
      <p class="login__title">欢迎登陆</p>
      <el-form ref="form" :model="form" size="mini">
        <el-form-item label="">
          <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input placeholder="请输入密码" type="password" v-model="form.password" @keyup.enter.native="handleSubmit"></el-input>
        </el-form-item>
      </el-form>
      <p class="login__hint">忘记密码?</p>
      <el-button class="login__button" type="primary" size="mini" @click="handleSubmit">登陆</el-button>
      <!-- <el-checkbox class="login__remember" v-model="isRemember">记住密码</el-checkbox> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRemember: false,
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    /**
     * 登录之后进入首页
     */
    handleSubmit() {
      this.$message({
        message: '登录成功',
        type: 'success'
      });
      this.$router.push('/home/dashboard');
    }
  }
}
</script>
<style scoped>
  .login {
    position: relative;
    height: 100%;
    background: url('../../assets/imgs/login_bg.jpg') center center no-repeat;
    background-size: cover;
  }
  .login__content {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-60%);
    width: 300px;
    height: 320px;
    padding: 30px;
    box-sizing: border-box;
    border-radius: 5px;
    background: #fff;
  }
  .login__content .login__title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .login__content .login__hint {
    margin-bottom: 30px;
    font-size: 10px;
    color: #C0C4CC;
  }
  .login__content .login__button {
    width: 100%;
    margin-bottom: 18px;
  }
  .login__content .login__remember{
    font-size: 10px;
    color: #C0C4CC;
  }
</style>
