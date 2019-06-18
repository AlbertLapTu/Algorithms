
/**
 *
 * @param {Function to debounce} func
 * @param {Time in ms} delay
 * 
 * 
 * ES6 Debounce
 */
const debounce = (func, delay) => {
  let timerId = null;

  return function() {
    let self = this;
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func.apply(self, [...arguments]), delay);
  };
};

/**
 * 
 * @param {Function to debounce} func 
 * @param {Time to wait} wait 
 * @param {*} immediate 
 * 
 * Returns a function, that, as long as it continues to be invoked,
 * will not be triggered. The function will be called after it stops
 * being called for N milliseconds. If `immediate` is passed, trigger
 * the function on the leading edge, instead of trailing. 
 */

function debounceES5(func, wait, immediate) {
  var timeout;
  return function() {
    var self = this,
    var args = arguments;

    var callLater = function() {
      timeout = null;
      if (!immediate) {
        func.apply(self, args)
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(callLater, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }
}
