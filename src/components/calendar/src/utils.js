const getYearMonthDay = date => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return {year, month, day}
}

const getDate = (year, month, day) => {
  return new Date(year, month, day)
}

const getFormatDate = (date, mask) => {
  if (Object.prototype.toString.call(date) !== '[object Date]') {
    throw new Error('invalid Date to format')
  }

  if (/(y+)/.test(mask)) {
    mask = mask.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(mask)) {
      let str = o[k] + ''
      mask = mask.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return mask
}

class CreateStore {
  constructor() {
    this.store = new Map()
  }

  getItem(key) {
    if (this.store.has(key)) {
      return this.store.get(key)
    }
    return null
  }
  setItem(key, val) {
    this.store.set(key, val)
  }
  hasItem(key) {
    return this.store.has(key)
  }
  removeItem(key) {
    this.store.delete(key)
  }
  clear() {
    this.store.clear()
  }
}

export {
  getYearMonthDay,
  getDate,
  getFormatDate,
  CreateStore
}