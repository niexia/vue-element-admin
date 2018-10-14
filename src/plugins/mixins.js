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