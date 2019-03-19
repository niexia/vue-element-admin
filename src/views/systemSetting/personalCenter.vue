<template>
  <div class="main__personalCenter">
    <aside class="personalCenter__profile">
      <div class="profileBox">
        <section class="profile__main">
          <img class="profile__logo" src="./../../assets/imgs/icon__logo.jpg">
          <p class="profile__name">{{profile.name}}</p>
          <p class="profile__motto">{{profile.bio}}</p>
        </section>
        <section class="profile__detail">
          <p><i class="icon-email"></i>{{profile.email}}</p>
          <p><i class="icon-smartphone"></i>{{profile.phone}}</p>
          <p><i class="icon-people"></i>{{profile.post}}</p>
          <p><i class="icon-navigation-"></i>{{profile.location}}</p>
        </section>
      </div>
    </aside>
    <main class="personalCenter__setting">
      <el-form :model="profileForm" :rules="rules" ref="profileForm" label-width="80px" class="demo-profile">
        <el-form-item label="头像" prop="logo">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="profileForm.logo" :src="profileForm.logo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="profileForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="bio">
          <el-input type="textarea" v-model="profileForm.bio"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="profileForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="profileForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="post">
          <el-input v-model="profileForm.post"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="location">
          <el-input v-model="profileForm.location"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit('profileForm')">保存</el-button>
          <el-button @click="handleReset('profileForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </main>
  </div>
</template>
<script>
export default {
  name: 'PersonalCenter',
  data() {
    return {
      profile: {
        name: 'Yang',
        bio: 'Seas the world',
        email: 'seas@gmail.com',
        phone: '12345678910',
        post: '公司.技术部.前端开发工程师',
        location: '广东-深圳'
      },
      profileForm: {
        logo: '',
        name: 'Yang',
        bio: 'Seas the world',
        email: 'seas@gmail.com',
        phone: '12345678910',
        post: '公司.技术部.前端开发工程师',
        location: '广东-深圳'
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        phone: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ],
        post: [
          { required: true, message: '请输入职位信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交配置
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.profile = JSON.parse(JSON.stringify(this.profileForm));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 重置配置
    handleReset(formName) {
      this.$refs[formName].resetFields();
      this.profileForm = JSON.parse(JSON.stringify(this.profile));
    },
    // 图片上传成功处理
    handleAvatarSuccess(res, file) {
      this.profileForm.logo = URL.createObjectURL(file.raw);
    },
    // 图片上传之前格式和大小的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>
<style scoped>
.main__personalCenter {
  display: flex;
}
.personalCenter__profile {
  width: 300px;
}
.personalCenter__profile .profileBox {
  line-height: 30px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}
.personalCenter__profile .profile__main {
  text-align: center;
}
.personalCenter__profile .profile__logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.personalCenter__profile .profile__name {
  font-size: 18px;
  color: #303133;
}
.personalCenter__profile .profile__motto {
  font-size: 14px;
  color: #000;
}
.personalCenter__profile .profile__detail {
  margin-top: 40px;
  font-size: 14px;
  color: #606266;
}
.personalCenter__profile .profile__detail i {
  margin-right: 5px;
}
.personalCenter__setting {
  flex: 1;
  margin-left: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}
.personalCenter__setting .el-input,
.personalCenter__setting .el-textarea {
  width: 380px;
}
.personalCenter__setting .avatar-uploader {
  display: inline-block;
  height: 80px;
  border: 1px dashed #d9d9d9;
}
.personalCenter__setting .avatar-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.personalCenter__setting .avatar-uploader img {
  width: 80px;
  height: 80px;
}
</style>

