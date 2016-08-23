/**
* @function removeStep
*
* @memberof Tutorial
* @instance
* @param    {String | Number | Array.<String|Number>} order
*/
removeStep(order){
  let _ = __privateMap.get(this);
  if(order === undefined){
    _.step = [];
  }else{
    if(!Array.isArray(order)) order = [order];
    order = order.map((val)=> typeof val === 'string' ? this.indexByName(val) : val );
    let newStep = _.step.filter((val, i)=>{
      let flg = true;
      for(let _i=0, _l=order.length; _i<_l; _i++){
        if(order[_i] === i){
          flg = false;
          break;
        }
      }
      if(flg) return val;
    });
    _.step = newStep;
  }
  __adjustStepNum.call(this);
  return this;
}
