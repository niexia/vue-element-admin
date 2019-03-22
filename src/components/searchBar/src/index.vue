<template>
  <div class="header__searchBar">
    <section class="header__search">
      <slot name="search">
        <el-form :inline="true" :model="searchParams" ref="searchForm">
          <el-form-item label="姓名" prop="param1">
            <el-input v-model="searchParams.param1" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="param2">
            <el-select v-model="searchParams.param2" placeholder="请选择状态">
              <el-option label="成功" value="shanghai"></el-option>
              <el-option label="失败" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>
      </slot>
    </section>
    <section class="header__operate">
      <slot name="operate">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">删除</el-button>
        <el-button>导出</el-button>
      </slot>
    </section>
  </div>
</template>
<script>
export default {
  name: 'SearchBar',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      searchParams: {
        param1: '',
        param2: ''
      },
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  created () {
    
  },
  mounted() {
    
  },
  destroyed() {
    
  },
  methods: {
    handleSearch() {
      this.$emit('search');
    },
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.$emit('reset');
    }
  }
}
</script>
<style scoped>

</style>

