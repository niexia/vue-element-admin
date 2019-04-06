function validate() {
  let rules = {
    username(str) {
      return /^[a-zA-Z0-9_-]{1,16}$/.test(str);
    },
    password(str) {
      return /^[a-zA-Z0-9_-]{6,16}$/.test(str);
    },
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    },
    url(str) {
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(str);
    },
    tel(str) {
      return /^(0\d{2,3}-)?(\d{7,8})$/.test(str);
    },
    phone(str) {
      return /^1[34578]\d{9}$/.test(str);
    },
    integer(str) {
      return /^\d+$/.test(str);
    },
    positiveInteger(str) {
      return /^\d+$/.test(str);
    },
    negativeInteger(str) {
      return /^-\d+$/.test(str);
    },
    number(str) {
      return /^-?\d*\.?\d+$/.test(str);
    },
    positiveNumber(str) {
      return /^\d*\.?\d+$/.test(str);
    },
    negativeNumber(str) {
      return /^-\d*\.?\d+$/.test(str);
    },
    chinese(str) {
      return /^[\u4E00-\u9FA5]+$/.test(str);
    },
  };
  return {
    valid(type, str) {
      return rules[type] ? rules[type](str) : false;
    },
    addRule(type, func) {
      rules[type] = func;
    }
  }
}

export default validate();