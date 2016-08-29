/**
*
*/
next(step){
  let _    = __privateMap.get(this);
  // _.active = true;
  this.show(_.pointer);
  return this;
}
