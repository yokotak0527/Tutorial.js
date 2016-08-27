/**
* @function hide
*
* @memberof Tutorial
* @instance
*/
hide(step){
  if(!__activeInstance || __activeInstance !== this) return this;
  let _ = __privateMap.get(this);
  __$content.empty();
  __activeInstance = undefined;
  return this;
}
