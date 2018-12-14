<template>
  <div class="af-transfer-panel">
    <p class="af-transfer-panel__header">
      {{title}}
    </p>
    
    <div :class="['af-transfer-panel__body', 'is-with-footer', filterable && 'is-with-filter']">
      <af-input
        class="af-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="prefix"
          :class="['af-input__icon', 'af-icon-' + inputIcon]"
          @click="clearQuery"
        ></i>
      </af-input>
      <af-checkbox-group
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="af-transfer-panel__list">
        <af-scrollbar
          wrap-class="af-checkbox-group__wrap"
          view-class="af-checkbox-group__list">
          <af-checkbox
            class="af-transfer-panel__item"
            :label="item[keyProp]"
            :disabled="item[disabledProp]"
            :key="item[keyProp]"
            v-for="item in filteredData">
            <option-content :option="item"></option-content>
          </af-checkbox>
        </af-scrollbar>
      </af-checkbox-group>
      <p
        class="af-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="af-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <div class="af-transfer-panel__footer">
      <span>{{ checkedSummary }}</span>
    </div>
  </div>
</template>

<script>
  import AfCheckboxGroup from 'aui/packages/checkbox-group';
  import AfCheckbox from 'aui/packages/checkbox';
  import AfInput from 'aui/packages/input';
  import Locale from 'aui/src/mixins/locale';

  export default {
    mixins: [Locale],

    name: 'AfTransferPanel',

    componentName: 'AfTransferPanel',

    components: {
      AfCheckboxGroup,
      AfCheckbox,
      AfInput,
      OptionContent: {
        props: {
          option: Object
        },
        // 数据项的渲染函数
        render(h) {
          const getParent = vm => {
            if (vm.$options.componentName === 'AfTransferPanel') {
              return vm;
            } else if (vm.$parent) {
              return getParent(vm.$parent);
            } else {
              return vm;
            }
          };
          const panel = getParent(this);
          const transfer = panel.$parent || panel;
          return panel.renderContent
            ? panel.renderContent(h, this.option)
            : transfer.$scopedSlots.default
              ? transfer.$scopedSlots.default({ option: this.option })
              : <span>{ this.option[panel.labelProp] || this.option[panel.keyProp] }</span>;
        }
      }
    },

    props: {
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      renderContent: Function,
      placeholder: String,
      title: String,
      filterable: Boolean,
      format: Object,
      filterMethod: Function,
      defaultChecked: Array,
      props: Object
    },

    data() {
      return {
        checked: [],
        allChecked: false,
        query: '',
        inputHover: false,
        checkChangeByUser: true
      };
    },

    watch: {
      checked(val, oldVal) {
        if (this.checkChangeByUser) {
          // 过滤出移动的keys
          const movedKeys = val.concat(oldVal)
            .filter(v => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
          this.$emit('checked-change', val, movedKeys);
        } else {
          this.$emit('checked-change', val);
          this.checkChangeByUser = true;
        }
      },

      data() {
        // 绑定的数据改变之后，checked过滤掉不存在的数据
        const checked = [];
        const filteredDataKeys = this.filteredData.map(item => item[this.keyProp]);
        this.checked.forEach(item => {
          if (filteredDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      },

      checkableData: {
        handler: function(val) {
          this.$emit('checkable-change', val.map(item => item[this.keyProp]));
        },
        immediate: true
      },

      defaultChecked: {
        // 已绑定就触发，并不是直接复制给checked，而是先过滤出可以勾选的
        immediate: true,
        handler(val, oldVal) {
          if (oldVal && val.length === oldVal.length &&
            val.every(item => oldVal.indexOf(item) > -1)) return;
          const checked = [];
          const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
          val.forEach(item => {
            if (checkableDataKeys.indexOf(item) > -1) {
              checked.push(item);
            }
          });
          this.checkChangeByUser = false;
          this.checked = checked;
        }
      }
    },

    computed: {
      /**
       * @description: 获取checkbook的选项数据
       * @return: 返回过滤之后的数据
       */
      filteredData() {
        // 如果自定义了过滤的方法则通过自定义的方法过滤
        // 否则通过indexOf来过滤
        return this.data.filter(item => {
          if (typeof this.filterMethod === 'function') {
            return this.filterMethod(this.query, item);
          } else {
            const label = item[this.labelProp] || item[this.keyProp].toString();
            return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          }
        });
      },

      /**
       * @description: 过滤掉不可勾选的数据，获取可勾选的数据
       * @return: 可以勾选的数据
       */
      checkableData() {
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },

      /**
       * @description: 勾选统计
       * @return: 统计的结果
       */
      checkedSummary() {
        const checkedLength = this.checked.length;
        const dataLength = this.data.length;
        const { noChecked, hasChecked } = this.format;
        if (noChecked && hasChecked) {
          return checkedLength > 0
            ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
            : noChecked.replace(/\${total}/g, dataLength);
        } else {
          return `${ checkedLength }/${ dataLength }`;
        }
      },

      /**
       * @description: 没有匹配的数据
       * @return: {Boolean} 是否搜索匹配到数据
       */
      hasNoMatch() {
        return this.query.length > 0 && this.filteredData.length === 0;
      },

      /**
       * @description: 搜索框prefix icon的class
       * @return: className 类名
       */
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },

      /**
       * @description: 数据源label字段名称
       * @return: label字段名称
       */
      labelProp() {
        return this.props.label || 'label';
      },

      /**
       * @description: 数据源key字段名称
       * @return: key字段名称
       */
      keyProp() {
        return this.props.key || 'key';
      },

      /**
       * @description: 数据源disabled字段名称
       * @return: disabled字段名称
       */
      disabledProp() {
        return this.props.disabled || 'disabled';
      }
    },

    methods: {
      /**
       * @description: 清除搜索输入框的内容
       */
      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      }
    }
  };
</script>
