  var focus = { //自动聚焦
    update: function (el, {value, oldValue}) {
      if (value) {
        var inputNode = el.firstElementChild;
        inputNode.focus()
      }
    }
  }
export {focus};