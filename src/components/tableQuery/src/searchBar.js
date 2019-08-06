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
      isExpand: false
    };
  },
  computed: {
    hasOption() {
      return this.fieldList.some(item => item.region && item.region === 'option');
    }
  },
  methods: {
    handleExpandClick() {
      this.isExpand = !this.isExpand;
    },
    handleSearchClick() {
      console.log('搜索');
    },
    handleResetClick() {
      console.log('重置');
    }
  },
  render(h) {
    const { fieldList, isExpand } = this;
    const genField = (_fileList, _region) => {
      return (
        this._l(fieldList, field => {
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