/*
 * @Description: 全局的mixins
 * @Author: YangJin
 * @Date: 2018-10-18 11:57:49
 */
var mixin = {
  created: function () {
    this.createdVue();
  },
  mounted() {
    this.mounted();
  },
  methods: {
    createdVue() {
      // console.log('创建vue实例');
    },
    mounted() {
      // console.log('挂载vue实例');
    }
  }
}
export default mixin;