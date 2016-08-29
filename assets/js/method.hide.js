/**
* @function hide
*
* @memberof Tutorial
* @instance
*/
hide(step){
  if(!__activeInstance) return this;
  let _ = __privateMap.get(this);
  __$content.empty();
  __activeInstance = undefined;
  _.active = false;
  return this;
}
