/**
* @function isActive
*
* @memberof Tutorial
* @instance
* @return {Boolean}
*/
isActive(){
  let _ = __privateMap.get(this);
  return _.active;
}
