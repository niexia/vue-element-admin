<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
        v-model="allChecked"
        @change="handleAllCheckedChange"
        :indeterminate="isIndeterminate">
        {{ title }}
        <span>{{ checkedSummary }}</span>
      </el-checkbox>
    </p>
    
    <div :class="['el-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
      <el-input
        class="el-transfer-panel__filter"
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="prefix"
          :class="['el-input__icon', 'el-icon-' + inputIcon]"
          @click="clearQuery"
        ></i>
      </el-input>
      <el-checkbox-group
        v-infinite-scroll="handleScroll"
        :infinite-scroll-immediate-check="false"
        ref="transferList"
        v-model="checked"
        v-show="!hasNoMatch && data.length > 0"
        :class="{ 'is-filterable': filterable }"
        class="el-transfer-panel__list">
        <template v-for="i in chunkNumber">
          <template v-if="i <= currentChunk">
            <el-checkbox
              class="el-transfer-panel__item"
              v-for="item in filteredData.slice(chunkSize*(i-1), chunkSize*i)" 
              :key="item[keyProp]"
              :label="item[keyProp]"
              :disabled="item[disabledProp]">
                <option-content :option="item"></option-content>
            </el-checkbox>
          </template>
        </template>
      </el-checkbox-group>
      <p
        class="el-transfer-panel__empty"
        v-show="hasNoMatch">{{ t('el.transfer.noMatch') }}</p>
      <p
        class="el-transfer-panel__empty"
        v-show="data.length === 0 && !hasNoMatch">{{ t('el.transfer.noData') }}</p>
    </div>
    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
  import ElCheckboxGroup from 'element-ui/packages/checkbox-group';
  import ElCheckbox from 'element-ui/packages/checkbox';
  import ElInput from 'element-ui/packages/input';
  import Locale from 'element-ui/src/mixins/locale';
  export default {
    mixins: [Locale],
    name: 'NxTransferPanel',
    componentName: 'ElTransferPanel',
    components: {
      ElCheckboxGroup,
      ElCheckbox,
      ElInput,
      OptionContent: {
        props: {
          option: Object
        },
        render(h) {
          const getParent = vm => {
            if (vm.$options.componentName === 'ElTransferPanel') {
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
        checkChangeByUser: true,
        scrollEle: '',
        currentChunk: 1,
        chunkSize: 50
      };
    },
    watch: {
      /**
       * watch checked
       * @param {type}
       * @return:
       */
      checked(val, oldVal) {
        this.updateAllChecked();
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
      /**
       * 绑定的数据改变之后，checked过滤掉不存在的数据
       */
      data() {
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
      /**
       * 绑定数据改变之后，可以勾选的数据肯定也会改变，也需要更新全选绑定状态
       */
      checkableData() {
        this.updateAllChecked();
      },
      /**
       * 默认勾选，已绑定就触发，并不是直接复制给checked，而是先过滤出可以勾选的
       * @param {type}
       * @return:
       */
      defaultChecked: {
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
       * 获取checkbook的选项数据
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
       * 过滤掉不可勾选的数据，获取可勾选的数据
       * @return: 可以勾选的数据
       */
      checkableData() {
        return this.filteredData.filter(item => !item[this.disabledProp]);
      },

      /**
       * 获取数据分块数量
       */
      chunkNumber() {
        let length = this.filteredData.length;
        let number = Math.ceil(length / this.chunkSize);
        if (this.currentChunk !== 1 && number < this.currentChunk) {
          this.currentChunk = number;
        }
        return number;
      },

      /**
       * 勾选统计
       * @return: str 统计的结果
       */
      checkedSummary() {
        const checkedLength = this.checked.length;
        const dataLength = this.data.length;
        const { noChecked, hasChecked } = this.format;
        // 如果绑定format
        // hasChecked也就是有勾选的时候: return hasChecked/dataLength
        // hoChecked也就是没有勾选的时候: return data.length
        if (noChecked && hasChecked) {
          return checkedLength > 0
            ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
            : noChecked.replace(/\${total}/g, dataLength);
        } else {
          return `${ checkedLength }/${ dataLength }`;
        }
      },

      /**
       * 全选框的中间状态显示状态
       * @return: 全选框是true或者false
       */
      isIndeterminate() {
        const checkedLength = this.checked.length;
        return checkedLength > 0 && checkedLength < this.checkableData.length;
      },

      /**
       * 没有匹配的数据
       * @return: true/false 是否搜索匹配到数据
       */
      hasNoMatch() {
        return this.query.length > 0 && this.filteredData.length === 0;
      },

      /**
       * 根据是否有输入且是否正在输入返回输入搜索框prefix的icon的class
       * @return: className 类名
       */
      inputIcon() {
        return this.query.length > 0 && this.inputHover
          ? 'circle-close'
          : 'search';
      },

      /**
       * 数据源label字段名称
       * @return: label字段名称
       */
      labelProp() {
        return this.props.label || 'label';
      },

      /**
       * 数据源key字段名称
       * @return: key字段名称
       */
      keyProp() {
        return this.props.key || 'key';
      },

      /**
       * 数据源disabled字段名称
       * @return: disabled字段名称
       */
      disabledProp() {
        return this.props.disabled || 'disabled';
      },

      /**
       * 判断是否还有footer
       * @return: true/false
       */
      hasFooter() {
        return !!this.$slots.default;
      }
    },

    methods: {
      /**
       * 滚动处理
       */
      handleScroll() {
        if (this.currentChunk < this.chunkNumber) {
          this.currentChunk++;
        }
      },

      /**
       * 更新全选，如果“可勾选的”==“已经勾选”的则为true，反之为false
       */
      updateAllChecked() {
        const checkableDataKeys = this.checkableData.map(item => item[this.keyProp]);
        this.allChecked = checkableDataKeys.length > 0 &&
          checkableDataKeys.every(item => this.checked.indexOf(item) > -1);
      },

      /**
       * 点击全选的处理
       * @param {boolean} true:全选 false:取消全选
       */
      handleAllCheckedChange(value) {
        this.checked = value
          ? this.checkableData.map(item => item[this.keyProp])
          : [];
      },

      /**
       * 清除搜索输入框的内容
       */
      clearQuery() {
        if (this.inputIcon === 'circle-close') {
          this.query = '';
        }
      }
    }
  };
</script>
