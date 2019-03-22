<template>
  <common-view
    name="tableBasic"
    :isFixed="true">
    <template slot="header">
      <div class="header__search" v-for="(group, index) in searchList" :key="index">
        <div class="search__title">{{group.title}}</div>
        <div class="search__group">
          <span :class="['search__item' , item === group.isSelected && 'is-selected']"
            @click="group.isSelected = item"
            v-for="(item, index) in group.list"
            :key="index">
            {{item}}
          </span>
        </div>
      </div>
    </template>
    <template slot="main">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        style="width: 100%">
        <el-table-column prop="type" label="类型" align="center" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地点" align="center" width="180">
        </el-table-column>
        <el-table-column prop="money" label="月薪">
        </el-table-column>
      </el-table>
    </template>
    <template slot="footer">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </template>
  </common-view>
</template>
<script>
export default {
  name: 'TableBasic',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      searchList: [{
        title: '类型',
        list: ['不限', '类型一', '类型二', '类型三', '类型四'],
        isSelected: '不限'
      }, {
        title: '地点',
        list: ['不限', '上海', '广州', '北京', '深圳'],
        isSelected: '不限'
      }, {
        title: '月薪',
        list: ['不限', '<10K', '10K~20K', '20K~30K', '>30K'],
        isSelected: '不限'
      }],
      tableData: [
        {type: '类型一', address: '广州', money: '<10K'}, 
        {type: '类型二', address: '王小虎', money: '10K~20K'}, 
        {type: '类型三', address: '北京', money: '10K~20K'}, 
        {type: '类型四', address: '深圳', money: '20K~30K'}, 
        {type: '类型四', address: '上海', money: '>30K'}, 
        {type: '类型二', address: '王小虎', money: '10K~20K'}, 
        {type: '类型三', address: '北京', money: '10K~20K'}, 
        {type: '类型四', address: '深圳', money: '20K~30K'}, 
        {type: '类型四', address: '上海', money: '>30K'}, 
        {type: '类型四', address: '广州', money: '20K~30K'}
      ],
      pageSize: 1
    }
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    }
  }
}
</script>
<style scoped>
.main_tableBasic .view__header .header__search {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}
.header__search .search__title {
  width: 50px;
  line-height: 20px;
  margin-right: 15px;
  font-weight: 700;
  color: rgba(0,0,0,.85);
}
.header__search .search__group {
  flex: 1;
}
.header__search .search__item {
  cursor: pointer;
  margin-right: 8px;
  padding: 3px 8px;
  border-radius: 2px;
  transition: .2s;
}
.header__search .search__item:hover,
.header__search .search__item.is-selected {
  background: #3788ee;
  color: #fff;
}
</style>

