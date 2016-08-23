/**
* @function changeeStep
*
* @memberof Tutorial
* @instance
* @param {String | Number} order
* @param {Object}          step
*/
changeStep(order, step){
  let _ = __privateMap.get(this);
  order = typeof order === 'string' ? this.indexByName(order) : order;
  if(order < 0) return;
  _.step[order] = step;
}
