/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {Function}
 */
export default function setCancellableInterval(callback, delay, ...args) {
  const timer = setInterval(() => {
    callback.call(this, ...args)
  }, delay)

  return function(){
    clearInterval(timer)
  }
}