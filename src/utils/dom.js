import Vue from 'vue';
const isServer = Vue.prototype.$isServer;

// addEventListener
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    }
  }
})();

// removeEventListener
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.removeEventListener(event, handler, false);
      }
    }
  } else {
    return function(element, event, handler) {
      if (element, event, handler) {
        element.detachEvent('on' + event, handler);
      }
    }
  }
})();

