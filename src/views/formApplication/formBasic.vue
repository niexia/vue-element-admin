<template>
  <div class="main__formBasic">
    <div class="formBox">
      <p class="form__title">基础表单</p>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数字" prop="name">
              <el-input v-model="form.name"></el-input>
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
            <el-form-item label="数字" prop="name">
              <el-input v-model="form.name"></el-input>
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
            <el-form-item label="用户名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="邮箱" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网址" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单选" prop="region">
              <el-select v-model="form.region" placeholder="请选择">
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
            <el-form-item label="时间" prop="date1">
              <el-time-picker type="date" placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期" prop="date1">
              <el-date-picker type="date" placeholder="选择时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="多选" prop="type">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="深圳" name="type"></el-checkbox>
                <el-checkbox label="广州" name="type"></el-checkbox>
                <el-checkbox label="上海" name="type"></el-checkbox>
                <el-checkbox label="北京" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单选" prop="resource">
              <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="评分" prop="delivery">
          <el-rate v-model="form.delivery" show-text>
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
export default {
  name: '',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: '',
        region: '',
        multiple: '',
        date1: '',
        date2: '',
        delivery: 4,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {},
  watch: {},
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

