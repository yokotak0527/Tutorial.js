/**
* @function indexByName
*
* @memberof Tutorial
* @instance
* @param    {String} name - step name.
* @return   {Number|Number[]}
*/
indexByName(name){
  if(typeof name !== 'string') return -1;
  let _   = __privateMap.get(this);
  let arr = [];
  _.step.forEach((el, i)=>{
    if(typeof el === 'object' && el.name === name) arr.push(i);
  });
  return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
}
