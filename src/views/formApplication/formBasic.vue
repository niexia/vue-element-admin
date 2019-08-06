<template>
  <div class="main__formBasic">
    <div class="formBox">
      <p class="form__title">基础表单</p>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="possword">
              <el-input v-model="form.possword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数字" prop="number">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="中文" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="tel">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网址" prop="url">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单选" prop="radio">
              <el-select v-model="form.radio" placeholder="请选择">
                <el-option label="选项一" value="shanghai"></el-option>
                <el-option label="选项二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="多选" prop="multiple">
              <el-select v-model="form.multiple" multiple collapse-tags placeholder="请选择">
                <el-option label="选项一" value="shanghai"></el-option>
                <el-option label="选项二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="时间" prop="time">
              <el-time-picker type="date" placeholder="选择时间" v-model="form.time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="date">
              <el-date-picker type="date" placeholder="选择时间" v-model="form.date" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="多选" prop="checkbox">
              <el-checkbox-group v-model="form.checkbox">
                <el-checkbox label="深圳" name="type"></el-checkbox>
                <el-checkbox label="广州" name="type"></el-checkbox>
                <el-checkbox label="上海" name="type"></el-checkbox>
                <el-checkbox label="北京" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单选" prop="gender">
              <el-radio-group v-model="form.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评分" prop="star">
          <el-rate v-model="form.star" show-text>
          </el-rate>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="form.desc" :autosize="{minRows: 3}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import validate from 'utils/validate.js';
export default {
  name: 'formBasic',
  data() {
    return {
      form: {
        userName: '',
        password: '',
        number: '',
        name: '',
        phone: '',
        tel: '',
        email: '',
        url: '',
        radio: '',
        multiple: '',
        time: '',
        date: '',
        checkbox: [],
        gender: '',
        star: 4,
        desc: ''
      },
      rules: {
        userName: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('username', val)) {
              cb();
            } else {
              cb(new Error('请输入1到16位的用户名, 用户名可以包含数字、字母、_和-'));
            }
          },
          trigger: 'blur'
        }],
        possword: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('possword', val)) {
              cb();
            } else {
              cb(new Error('请输入6到16位的密码, 密码可以包含数字、字母、_和-'));
            }
          },
          trigger: 'blur'
        }],
        number: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('number', val)) {
              cb();
            } else {
              cb(new Error('请输入数字'));
            }
          },
          trigger: 'blur'
        }],
        name: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('chinese', val)) {
              cb();
            } else {
              cb(new Error('请输入中文'));
            }
          },
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('phone', val)) {
              cb();
            } else {
              cb(new Error('请输入正确的手机号码'));
            }
          },
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('tel', val)) {
              cb();
            } else {
              cb(new Error('请输入正确的电话号码'));
            }
          },
          trigger: 'blur'
        }],
        email: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('email', val)) {
              cb();
            } else {
              cb(new Error('请输入正确的邮箱地址'));
            }
          },
          trigger: 'blur'
        }],
        url: [{
          required: true,
          validator: (rule, val, cb) => {
            if (validate.valid('url', val)) {
              cb();
            } else {
              cb(new Error('请输入正确的网址'));
            }
          },
          trigger: 'blur'
        }],
        radio: [{ 
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        multiple: [{ 
          required: true,
          message: '请选择',
          trigger: 'change'
        }],
        time: [{
          type: 'date',
          required: true,
          message: '请选择时间',
          trigger: 'change'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        checkbox: [{
          type: 'array',
          required: true,
          message: '请至少选择一个',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: '请选择性别',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: '请填写说明',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>
.main__formBasic {
  display: flex;
}
.main__formBasic .formBox {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
  
}
.main__formBasic .form__title {
  font-size: 18px;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f2f6fc;
}
.main__formBasic .el-select {
  width: 100%;
}
</style>

