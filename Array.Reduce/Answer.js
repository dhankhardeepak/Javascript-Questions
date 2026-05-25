/**
 * @template T, U
 * @param {(previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U} callbackFn
 * @param {U} [initialValue]
 * @return {U}
 */
Array.prototype.myReduce = function (callbackFn, initialValue) {
  let noInitialValue = initialValue === undefined;
  let len = this.length;
  let arr = this;

  if(noInitialValue && len == 0){
    throw 'Please provide array';
  }

  let acc = noInitialValue ? this[0] : initialValue;
  let startingIndex = noInitialValue ? 1 : 0;

  let res = acc;

  for(let i = startingIndex; i < len; i++){
    if(Object.hasOwn(arr, i)){
      res = callbackFn(res, this[i], i, this);
    }
  }

  return res;
};