<template>
  <table-query
    name="tableSearch"
    :field-list="fieldList"
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
        <el-table-column prop="type" label="类型" align="center" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地点" align="center" width="180">
        </el-table-column>
        <el-table-column prop="money" label="月薪">
        </el-table-column>
      </el-table>
    </template>
  </table-query>
</template>
<script>
export default {
  name: 'TableSearch',
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      queryParams: {
        name: 'Vue',
      },
      tableData: [
        {type: '类型一', address: '广州', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型二', address: '王小虎', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型三', address: '北京', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型四', address: '深圳', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型四', address: '上海', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型二', address: '深圳', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型三', address: '北京', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型四', address: '深圳', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型四', address: '上海', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}, 
        {type: '类型四', address: '广州', money: 'Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动'}
      ],
      // searchBar
      fieldList: [
        // button
        {
          type:'y-button',
          align: 'right',
          text: '导出',
          region:'main',
          attrs: {
            icon: 'el-icon-upload'
          },
          events: {
            click: this.handleClick
          }
        },
        {
          type:'y-button',
          align: 'right',
          text: '删除',
          region:'main',
          attrs: {
            type: 'danger',
          },
          events: {
            click: this.handleClick
          }
        },
        {
          type:'y-button',
          align: 'right',
          text: '新增',
          region:'main',
          attrs: {
            type: 'primary',
          },
          events: {
            click: this.handleClick
          }
        },
        // main-form
        {
          type: 'y-input',
          region: 'main',
          key: 'query1',
          value: '',
          attrs: {
            placeholder: '请输入',
          },
          events: {
            change: this.handleChange,
            clear: this.handleClear
          }
        },
        {
          type:'y-time-picker',
          region:'main',
          key: 'query2',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '任意时间点',
            'prefix-icon': 'af-icon-search',
            'arrow-control': true,
            'picker-options': {
              selectableRange: '18:30:00 - 20:30:00'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        // option-form
        {
          type:'y-time-select',
          region: 'option',
          key: 'query3',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query4',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query5',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query6',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query7',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query8',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query9',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        },
        {
          type:'y-time-select',
          region: 'option',
          key: 'query10',
          value: '',
          attrs:{
            clearable: true,
            placeholder: '选择时间',
            'prefix-icon': 'af-icon-search',
            'picker-options': {
              start: '08:30',
              step: '00:15',
              end: '18:30'
            }
          },
          events: {
            change: this.handleChange
          }
        }
      ],
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
  methods: {
    // chang size
    handleSizeChange(val) {
      console.log('sizeChange: ', val);
    },
    // change page
    handleCurrentChange(val) {
      console.log('currentPageChange: ', val);
    },
    // change
    handleChange(val) {
      console.log('change: ', val);
    },
    // clear
    handleClear(val) {
      console.log('clear: ', val);
    },
    // click button
    handleClick(val) {
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
