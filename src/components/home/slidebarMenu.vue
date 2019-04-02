<script>
import SubMenu from 'element-ui/lib/submenu';
import MenuItem from 'element-ui/lib/menu-item';
import iconMap from 'utils/iconMap';
var render = function(h){
  const r = function(h, data){
    if(data.children && data.children.length){
      const subs = function(list){
        return list.map( v => r(h, v));
      }.bind(this);
      return h(
        SubMenu,
        {
          props: {
            index: data.path,
          },
        },
        [
          <template slot="title">
            <i class={iconMap.getIcon(data.path)}></i>
            <span slot="title">{data.name}</span>
          </template>
        ].concat(subs(data.children))
      )
    }
    else{
      return h(
        MenuItem,
        {
          props: {
            index: data.path
          },
          domProps: {
            innerText: data.name
          }
        },
      )
    }
  }
  return r(h, this.data);
}
export default {
  name: 'slidebarMenu',
  render: function(h){
    return render.call(this, h);
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
</style>


