/*
 * @Description: 自定义vue指令
 * @Author: YangJin
 * @Date: 2018-10-18 11:56:51
 */
var focus = { //自动聚焦
  update: function (el, {value, oldValue}) {
    if (value) {
      var inputNode = el.firstElementChild;
      inputNode.focus()
    }
  }
}
export {focus};