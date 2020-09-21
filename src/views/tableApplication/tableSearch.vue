<template>
  <table-query
    name="tableSearch"
    :field-list="fieldList"
    :field-list-data="fieldListData"
    :pagination="pagination"
    :isFixed="true"
    @search="handleSearch"
    @reset="handleReset">
    <template slot="header">
    </template>
    <template slot="main">
      <el-table
        :data="tableData"
        border
        stripe
        height="100%"
        style="width: 100%">
        <el-table-column prop="dsp_id" label="dsp_id" align="center" width="100">
        </el-table-column>
        <el-table-column prop="advertiser_id" label="advertiser_id" align="center" width="100">
        </el-table-column>
        <el-table-column prop="campaign_id" label="campaign_id" width="100">
        </el-table-column>
        <el-table-column prop="name" label="name" align="center" width="100">
        </el-table-column>
        <el-table-column prop="pricing_type" label="pricing_type" align="center" width="100">
        </el-table-column>
        <el-table-column prop="dsp_type" label="dsp_type" align="center" width="100">
        </el-table-column>
        <el-table-column prop="inventory_type" label="inventory_type" align="center" width="120">
        </el-table-column>
        <el-table-column prop="create_time" label="create_time" align="center" width="100">
        </el-table-column>
        <el-table-column prop="modify_time" label="modify_time" align="center" width="100">
        </el-table-column>
        <el-table-column prop="api_url" label="api_url" align="center" width="100">
        </el-table-column>
        <el-table-column prop="status" label="status" align="center" width="100">
        </el-table-column>
        <el-table-column prop="data" label="data" align="center" width="100">
        </el-table-column>
        <el-table-column prop="status_time" label="status_time" align="center">
        </el-table-column>
      </el-table>
    </template>
  </table-query>
</template>
<script>
import getFieldList from '@/const/tableApplication/fieldList'

export default {
  name: 'TableSearch',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      fieldListData: {
        dsp_id: '',
        advertiser_id: '',
        inventory_type: '',
        campaign_id: '',
        name: '',
        pricing_type: '',
        dsp_type: '',
        api_url: '',
        status: '',
      },
      tableData: new Array(20).fill({
        dsp_id: '1',
        advertiser_id: '12345',
        campaign_id: '1234',
        name: '我是无情的单测3',
        pricing_type: '3',
        dsp_type: '3',
        inventory_type: '80088',
        create_time: '2020-05-13 12:31:39',
        modify_time: '2020-09-19 08:42:38',
        api_url: 'http://www.baidu.com',
        status: '0',
        data: 'xxxxxx',
        status_time: '2020-05-11 10:43:21',
      }),
      // pagination
      pagination: {
        attrs: {
          currentPage: 1,
          pageSize: 10,
          total: 100,
        },
        events: {
          'current-change': this.handleCurrentChange,
          'size-change': this.handleSizeChange
        }
      }
    }
  },
  computed: {
    fieldList() {
      return getFieldList.call(this, {
        handleAddClick: this.handleAddClick
      })
    }
  },
  methods: {
    // chang size
    handleSizeChange(val) {
      console.log('sizeChange: ', val);
    },
    // change page
    handleCurrentChange(val) {
      console.log('currentPageChange: ', val);
    },
    // click button
    handleAddClick(val) {
      console.log('click: ', val);
    },
    // search
    handleSearch(queries) {
      console.log('search: ', queries);
    },
    // reset
    handleReset(queries) {
      console.log('reset: ', queries);
    }
  }
}
</script>
<style scoped>
</style>
