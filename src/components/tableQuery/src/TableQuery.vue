<template>
  <div :class="viewClass">
    <div class="viewBox">
      <header class="view__header">
        <slot name="header">
          <search-bar v-bind="$attrs" v-on="$listeners"></search-bar>
        </slot>
      </header>
      <main class="view__main">
        <slot name="main" ref="table"></slot>
      </main>
      <footer class="view__footer">
        <slot name="footer">
          <pagination v-bind="$attrs"></pagination>
        </slot>
      </footer>
    </div>
  </div>
</template>
<script>
import Pagination from './pagination.js';
import SearchBar from './searchBar.js';
export default {
  name: 'TableQuery',
  inheritAttrs: false,
  mixins: [],
  components: {
    Pagination,
    SearchBar
  },
  props: {
    name: {
      type: String,
      default: ''
    },
    /** 
     * Whether to fixed the table header.
     * Noting that if the prop height of table is'n 100%,
     * that is, you don't want to fixed table header,
     * you shoud banding flase to this prop to make your configuration take affect.
    */
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    viewClass() {
      return ['main__view', this.name && ('main_' + this.name), this.isFixed && 'is-fixed'];
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.main__view {

  /* fixed table header */
  &.is-fixed {
    height: 100%;
  }
  &.is-fixed .viewBox {
    height: 100%;
    overflow: hidden;
  }
  &.is-fixed .view__main {
    overflow: hidden;
  }

  /* common */
  .viewBox {
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #fff;
  }
  .view__header {
    padding-bottom: 10px;
    .el-form .el-form-item {
      margin-bottom: 0;
    }
  }
  .view__main {
    flex: 1;
  }
  .view__footer {
    height: 40px;
    padding-top: 8px;
    box-sizing: border-box;
    .el-pagination {
      position: relative;
      text-align: right;
    }
    .el-pagination .el-pagination__total {
      position: absolute;
      left: 0;
    }
  }
}
</style>

