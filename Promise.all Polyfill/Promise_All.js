/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
  //Edge case - what if the terable is empty
  if(iterable.length == 0) return new Promise((resolve, reject) => {
    resolve([]);
  })

  return new Promise((resolve,  reject) => {
    const resp = new Array(iterable.length);
    let unresolved = iterable.length;
    iterable.forEach(async (item, index) => {
      try{
        const response = await item;
        resp[index] = response;
        unresolved -= 1;

        if (unresolved === 0) {
          resolve(resp);
        }
      }
      catch(err){
        reject(err);
      }
    });
  });
}