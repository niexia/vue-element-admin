<template>
  <div :class="viewClass">
    <div class="viewBox">
      <header class="view__header">
        <slot name="header">
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
        </slot>
      </header>
      <main class="view__main">
        <slot name="main">
          <el-table
            :data="tableData"
            :height="tableHeight"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </slot>
      </main>
      <footer class="view__footer">
        <slot name="footer">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CommonView',
  mixins: [],
  components: {},
  props: {
    name: { // view name
      type: String,
      default: ''
    },
    isFixedHeader: { // fixed table header
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      searchParams: {
        param1: '',
        param2: ''
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      pageSize: 1
    }
  },
  computed: {
    viewClass() {
      return ['main__view', this.name && ('main_' + this.name), this.isFixedHeader && 'is-fixed'];
    },
    tableHeight() {
      return this.isFixedHeader ? '100%' : 'auto';
    }
  },
  watch: {},
  created () {},
  mounted() {},
  destroyed() {},
  methods: {
    handleSizeChange(val) {
      this.$emit('size-change');
    },
    handleCurrentChange(val) {
      this.$emit('current-change');
    },
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
<style>
/* fixed table header */
.main__view.is-fixed {
  height: 100%;
}
.main__view.is-fixed .viewBox {
  height: 100%;
  overflow: hidden;
}
.main__view.is-fixed .view__main {
  overflow: hidden;
}
/* common */
.main__view .viewBox {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fff;
}
.main__view .view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}
.main__view .view__header .el-form .el-form-item {
  margin-bottom: 0;
}
.main__view .view__main {
  flex: 1;
}
.main__view .view__footer {
  height: 40px;
  padding-top: 8px;
  box-sizing: border-box;
}
.main__view .view__footer .el-pagination {
  position: relative;
  text-align: right;
}
.main__view .view__footer .el-pagination .el-pagination__total {
  position: absolute;
  left: 0;
}
</style>

