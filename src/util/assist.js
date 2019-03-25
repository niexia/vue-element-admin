// typeof
function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

// deep clone
export function deepClone(data) {
  const t = typeOf(data);
  let o;
  if (t === 'array') {
    o = [];
    for (let i = 0; i < data.length; i++) {
      o.push(deepClone(data[i]));
    }
  } else if (t === 'object') {
    o = {};
    for (let i in data) {
      o[i] = deepClone(data[i]);
    }
  } else {
    return data;
  }
  return o;
}

// scrollTop
export function scrollTop(el, from = 0, to, duration = 500, callback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = 
      window.webkitCancelAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000/60);
      }
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      callback && callback();
      return;
    }

    let d;
    if (start > end) {
      d = start + step > end ? end : start + step;
    } else {
      d = start - step < end ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTo(d);
    }
    // cyclic
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

// find components downward
export function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    let foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}

// find components upward
export function findComponentsUpward(context, componentName) {
  let parents = [];
  const parent = context.$parent;
  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}