let __changePointer = function(order){
  let _ = __privateMap.get(this);
  if(this.isFire) return order;
  order = typeof order === 'string' ? this.name2index(order) : typeof order === 'number' ? order : _.pointer;
  order = this.getPointer() < order ? this.getPointer() - 1 : order;
  order = order < 0 ? 0 : order;
  _.pointer = order;
  return _.pointer;
}
