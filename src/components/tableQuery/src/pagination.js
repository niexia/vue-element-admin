import ElPagination from 'element-ui/lib/pagination.js';

const getProps = (attrs, events) => {
  return {
    props: attrs,
    on: events
  };
};

export default {
  name: 'pagination',
  props: {
    pagination: {
      type: Object,
      default: () => {
        return {
          attrs: {},
          events: {}
        }
      }
    }
  },
  render(h) {
    const {attrs, events} = this.pagination;
    const Props = getProps(attrs, events);
    return (
      <ElPagination
        layout={attrs.layout || 'total, sizes, prev, pager, next, jumper'}
        pageSizes={attrs.pageSizes || [10, 20, 30, 40, 100]}
        {...Props}>
      </ElPagination>
    )
  }
}