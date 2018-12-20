<template>
  <div class="af-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :buttonText="buttonTexts[0]"
      :title="titles[0] || t('el.transfer.titles.0')"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @do-move="addToRight">
    </transfer-panel>
    <div class="af-transfer__link">
      <i class="af-icon-sort"></i>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :buttonText="buttonTexts[1]"
      :title="titles[1] || t('el.transfer.titles.1')"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @do-move="addToLeft">
    </transfer-panel>
  </div>
</template>

<script>
  import AfButton from 'aui/packages/button';
  import Emitter from 'aui/src/mixins/emitter';
  import Locale from 'aui/src/mixins/locale';
  import TransferPanel from './transfer-panel.vue';
  import Migrating from 'aui/src/mixins/migrating';

  export default {
    name: 'AfTransfer',

    mixins: [Emitter, Locale, Migrating],

    components: {
      TransferPanel,
      AfButton
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      titles: {
        type: Array,
        default() {
          return [];
        }
      },
      buttonTexts: {
        type: Array,
        default() {
          return ['全选', '清空'];
        }
      },
      filterPlaceholder: {
        type: String,
        default: ''
      },
      filterMethod: Function,
      renderContent: Function,
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      format: {
        type: Object,
        default() {
          return {};
        }
      },
      filterable: Boolean,
      props: {
        type: Object,
        default() {
          return {
            label: 'label',
            key: 'key',
            disabled: 'disabled'
          };
        }
      },
      targetOrder: {
        type: String,
        default: 'original'
      }
    },

    data() {
      return {
        rightChecked: []
      };
    },

    computed: {
      // data转成Map格式
      dataObj() {
        const key = this.props.key;
        return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
      },
  
      // 左边的data
      sourceData() {
        return this.data.filter(item => this.value.indexOf(item[this.props.key]) === -1);
      },

      // 右边的data
      targetData() {
        return this.targetOrder === 'original'
          ? this.data.filter(item => this.value.indexOf(item[this.props.key]) > -1)
          : this.value.map(key => this.dataObj[key]);
      },

      // 是否自定义按钮文案
      hasButtonTexts() {
        return this.buttonTexts.length === 2;
      }
    },

    watch: {
      // watch value进行广播
      value(val) {
        this.dispatch('AfFormItem', 'el.form.change', val);
      }
    },

    methods: {
      getMigratingConfig() {
        return {
          props: {
            'footer-format': 'footer-format is renamed to format.'
          }
        };
      },

      // 向左移动
      addToLeft(moveList) {
        let currentValue = this.value.slice();
        let itemsToBeMoved = [];
        const key = this.props.key;
        itemsToBeMoved = moveList.map(item => item[key]);
        itemsToBeMoved.forEach(item => {
          const index = currentValue.indexOf(item);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        });
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'left', itemsToBeMoved);
      },

      // 向右移动
      addToRight(moveList) {
        let currentValue = this.value.slice();
        let itemsToBeMoved = [];
        const key = this.props.key;
        itemsToBeMoved = moveList.map(item => item[key]);
        currentValue = this.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved);
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'right', itemsToBeMoved);
      },

      // 清空搜索条件
      clearQuery(which) {
        if (which === 'left') {
          this.$refs.leftPanel.query = '';
        } else if (which === 'right') {
          this.$refs.rightPanel.query = '';
        }
      }
    }
  };
</script>
