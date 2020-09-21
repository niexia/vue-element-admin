import Field from './materials.js'
import Button from 'element-ui/lib/button'
import lodash from 'lodash'

export default {
  name: 'SearchBar',
  inheritAttrs: false,
  props: {
    fieldList: {
      type: Array,
      default() {
        return []
      },
    },
    fieldListData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isExpand: false,
      initFieldList: [],
    }
  },
  computed: {
    hasOption() {
      return this.fieldList.some(
        item => item.region && item.region === 'option'
      )
    },
  },
  mounted() {
    this._saveInitFieldList()
  },
  methods: {
    handleExpandClick() {
      this.isExpand = !this.isExpand
    },
    handleSearchClick() {
      this.$emit('search')
    },
    handleResetClick() {
      Object.keys(this.fieldListData).forEach(key => {
        this.fieldListData[key] = this.initFieldList[key]
      })
      this.$emit('reset')
    },
    _saveInitFieldList() {
      this.initFieldList = lodash.cloneDeep(this.fieldListData)
    },
  },
  render(h) {
    const { fieldList, fieldListData, isExpand } = this
    const genField = (_fileList, _region) => {
      return this._l(_fileList, field => {
        const {
          label = '', region = 'main', type = '', align = '', slots = {}, hidden = false
        } = field
        if (region === _region && type === 'br') return <br />
        return (
          region === _region && (
            <div class={['search__main-item', align ? align : '']}>
              {label && <label class="search__main-item-label">{label}</label>}
              {
                (type === 'slot' && slots && slots.default) 
                  ? slots.default(h)
                  : <Field field={field} data={fieldListData} />
              }
            </div>
          )
        )
      })
    }
    const TemplateMain = (
      <section ref="main" class="search__main">
        {genField(fieldList, 'main')}
        {this.hasOption && (
          <div class="search__main-item">
            <Button onClick={this.handleExpandClick}>
              <span>{isExpand ? '收起' : '更多'}</span>
              <i class = {isExpand ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}></i>
            </Button>
          </div>
        )}
        {
          <div class="search__main-item">
            <Button type="primary" onClick={this.handleSearchClick}>
              <span>搜索</span>
            </Button>
          </div>
        }
        {
          <div class="search__main-item">
            <Button type="primary" onClick={this.handleResetClick}>
              <span>重置</span>
            </Button>
          </div>
        }
      </section>
    )
    const TemplateOption = (
      <section
        ref="more"
        style={{ display: isExpand ? 'block' : 'none' }}
        class="search__option"
      >
        {genField(fieldList, 'option')}
      </section>
    )

    return (
      <div class="search-bar">
        {TemplateMain}
        {this.hasOption && TemplateOption}
      </div>
    )
  },
}
