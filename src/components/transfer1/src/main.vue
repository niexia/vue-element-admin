<template>
  <div class="af-transfer">
    <transfer-panel
      v-bind="$props"
      ref="leftPanel"
      :data="sourceData"
      :title="titles[0] || t('el.transfer.titles.0')"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checkable-change="onSourceCheckableChange"
      @checked-change="onSourceCheckedChange">
      <slot name="left-footer"></slot>
    </transfer-panel>
    <div class="af-transfer__buttons">
      <af-button
        :class="['af-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addAllToRight"
        :disabled="leftCheck.length === 0">
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
        <!-- <i class="af-icon-arrow-right"></i> -->
      </af-button>
      <af-button
        :class="['af-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <!-- <i class="af-icon-arrow-right"></i> -->
      </af-button>
      <af-button
        :class="['af-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <!-- <i class="af-icon-arrow-left"></i> -->
        <span v-if="buttonTexts[2] !== undefined">{{ buttonTexts[2] }}</span>
      </af-button>
      <af-button
        :class="['af-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addAllToLeft"
        :disabled="rightCheck.length === 0">
        <!-- <i class="af-icon-arrow-left"></i> -->
        <span v-if="buttonTexts[3] !== undefined">{{ buttonTexts[3] }}</span>
      </af-button>
    </div>
    <transfer-panel
      v-bind="$props"
      ref="rightPanel"
      :data="targetData"
      :title="titles[1] || t('el.transfer.titles.1')"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      @checkable-change="onTargetCheckableChange"
      @checked-change="onTargetCheckedChange">
      <slot name="right-footer"></slot>
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
          return ['全选', '添加', '移除', '清除'];
        }
      },
      filterPlaceholder: {
        type: String,
        default: ''
      },
      filterMethod: Function,
      leftDefaultChecked: {
        type: Array,
        default() {
          return [];
        }
      },
      rightDefaultChecked: {
        type: Array,
        default() {
          return [];
        }
      },
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
        leftCheck: [],
        leftChecked: [],
        rightChecked: [],
        rightCheck: []
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

      // 右边checkableData改变的时候
      onTargetCheckableChange(val) {
        this.rightCheck = val;
      },

      // 右边数据改变的时候触发
      onTargetCheckedChange(val, movedKeys) {
        this.rightChecked = val;
        if (movedKeys === undefined) return;
        this.$emit('right-check-change', val, movedKeys);
      },

      // 左边数据改变的时候触发
      onSourceCheckedChange(val, movedKeys) {
        this.leftChecked = val;
        if (movedKeys === undefined) return;
        this.$emit('left-check-change', val, movedKeys);
      },

      // 左边checkableData改变的时候
      onSourceCheckableChange(val) {
        this.leftCheck = val;
      },

      // 全选
      addAllToRight() {
        this.toRight({checkAll: true});
      },

      // 添加
      addToRight() {
        this.toRight({checkAll: false});
      },

      // 移除
      addToLeft() {
        this.toLeft({checkAll: false});
      },

      // 清除
      addAllToLeft() {
        this.toLeft({checkAll: true});
      },

      // 向右
      toRight({checkAll = false}) {
        const type = checkAll ? 'leftCheck' : 'leftChecked';
        let currentValue = this.value.slice();
        const itemsToBeMoved = [];
        const key = this.props.key;
        this.data.forEach(item => {
          const itemKey = item[key];
          if (
            this[type].indexOf(itemKey) > -1 &&
            this.value.indexOf(itemKey) === -1
          ) {
            itemsToBeMoved.push(itemKey);
          }
        });
        currentValue = this.targetOrder === 'unshift'
          ? itemsToBeMoved.concat(currentValue)
          : currentValue.concat(itemsToBeMoved);
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'right', this[type]);
      },

      // 向左
      toLeft({checkAll = false}) {
        const type = checkAll ? 'rightCheck' : 'rightChecked';
        let currentValue = this.value.slice();
        this[type].forEach(item => {
          const index = currentValue.indexOf(item);
          if (index > -1) {
            currentValue.splice(index, 1);
          }
        });
        this.$emit('input', currentValue);
        this.$emit('change', currentValue, 'left', this[type]);
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
