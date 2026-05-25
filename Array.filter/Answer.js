/**
 * @template T
 * @param {(value: T, index: number, array: Array<T>) => boolean} callbackFn
 * @param {unknown} [thisArg]
 * @returns {Array<T>}
 */
Array.prototype.myFilter = function (callbackFn, thisArg) {
  if(this === undefined || this === null || !Array.isArray(this)){
    throw 'Not an Array'
  }

  if(typeof callbackFn != 'function'){
    throw 'CallBack Function is not a function'
  }

  const res = [];
  for(let item in this){
    if(callbackFn.call(thisArg, this[item], item, this)) res.push(this[item])
  }

  return res;
};