/*
 * @Description: 自定义vue指令
 * @Author: YangJin
 * @Date: 2018-10-18 11:56:51
 */
export default{
  /**
   * @description: 自动获取焦点,绑定的值为true,就可以focus
   */
  focus:{
    name: 'focus',
    hooks: {
      update: function (el, {value,oldValue}) {
        if (value) {
          var inputNode = el.firstElementChild;
          inputNode.focus()
        }
      }
    }
  }
}