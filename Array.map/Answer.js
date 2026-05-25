/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  //polyfill of array.prototype.map

  if(this == undefined || !Array.isArray(this)){
    throw 'Not an Array';
  }

  if(typeof callbackFn != 'function'){
    throw 'Callback is not a function'
  }

  let arr = [];

  for(let i in this){
    if(Object.hasOwn(this, i)){
      arr[i] = callbackFn.call(thisArg, this[i], i, this);
    }
  }

  return arr;
};