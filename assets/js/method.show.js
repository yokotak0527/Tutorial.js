/**
* @function show
*
* @memberof Tutorial
* @instance
* @return {Number | String} [order]
*/
show(order){
  if(__activeInstance && __activeInstance === this) __activeInstance.hide();

  let _          = __privateMap.get(this);
  let oldPointer = _.pointer
  _.pointer      = order || _.pointer
  order = order || _.pointer;

  __activeInstance = this;

  // let _ = privateMap.get(this);

  // this.id
  // let _ = privateMap.get(this);
  // order = order || _.pointer;



  // _.animation
}
