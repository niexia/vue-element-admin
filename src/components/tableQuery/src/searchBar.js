import Component from './materials.js';
import ElButton from 'element-ui/lib/button';

export default {
  name: 'SearchBar',
  inheritAttrs: false,
  props: {
    fieldList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      isExpand: false,
      initFieldList: []
    };
  },
  computed: {
    hasOption() {
      return this.fieldList.some(item => item.region && item.region === 'option');
    }
  },
  mounted() {
    this._saveInitFieldList();
  },
  methods: {
    handleExpandClick() {
      this.isExpand = !this.isExpand;
    },
    handleSearchClick() {
      let queries = this._getQueries();
      this.$emit('search', queries);
    },
    handleResetClick() {
      this.initFieldList.forEach((item, index) => {
        if (this.fieldList[index].hasOwnProperty('key')) {
          this.fieldList[index].value = item.value;
        }
      });
      let queries = this._getQueries();
      this.$emit('reset', queries);
    },
    _saveInitFieldList() {
      this.initFieldList = this.fieldList.map(({ value }) => ({ value }))
    },
    _getQueries() {
      let queries = {};
      // 如果设置了 key，并且值有效，则作为查询条件
      this.fieldList.forEach(({key, value}) => {
        if (key && value != null && value !== '') {
          queries[key] = value;
        }
      });
      return queries;
    }
  },
  render(h) {
    const { fieldList, isExpand } = this;
    const genField = (_fileList, _region) => {
      return (
        this._l(_fileList, field => {
          const _fieldRegion = field.region || 'main';
          if (_fieldRegion === _region && field.type === 'br') return <br/>;
          return _fieldRegion === _region && (
            <div
              class={[
                'search__main-item',
                field.align ? field.align : ''
              ]}
            >
              <Component fieldKey={field.key} field={field} />
            </div>
          );
        })
      );
    };
    const TemplateMain = (
      <section ref="main" class="search__main">
        {genField(fieldList, 'main')}
        {
          this.hasOption && 
          <ElButton onClick={this.handleExpandClick}>
            <span>{isExpand ? '收起' : '更多'}</span>
            <i class={[isExpand ? 'icon-arrowhead-up' : 'icon-arrowhead-down']}></i>
          </ElButton>
        }
        {
          <ElButton type="primary" onClick={this.handleSearchClick}>
            <span>搜索</span>
          </ElButton>
        }
        {
          <ElButton type="primary" onClick={this.handleResetClick}>
            <span>重置</span>
          </ElButton>
        }
      </section>
    );
    const TemplateOption = (
      <section ref="more" style={{ display: isExpand ? 'block' : 'none' }} class="search__option">
        {genField(fieldList, 'option')}
      </section>
    );

    return (
      <div class="header__search">
        {TemplateMain}
        {this.hasOption && TemplateOption}
      </div>
    );
  }
}