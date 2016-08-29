/**
*
*/
prev(step){
  let _ = __privateMap.get(this);

  this.show(_.pointer);
  return this;
}
