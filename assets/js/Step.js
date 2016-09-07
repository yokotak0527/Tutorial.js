class Step{
  /*
  * @param    {Object[]} step
  * @return   Step
  */
  constructor(step){
    this.list    = [];
    this.length  = 0;
    if(step) this.add(step);
  }
  /*
  * ステップの内容を変更する
  * @function changeeStep
  * @memberof Step
  * @instance
  * @param    {String | Number} order
  * @param    {Object}          step
  * @return   Step
  */
  change(order, step){
    order = typeof order === 'string' ? this.indexByName(order) : order;
    if(order < 0) return;
    this.list[order] = step;
    return this;
  }
  /*
  * @function addStep
  * @memberof Step
  * @instance
  * @param    {Object | Object[]} step
  * @return   Step
  */
  add(step){
    let steps = Array.isArray(step) ? step : [step];
    steps.forEach( obj => this.list.push(obj) );
    this.length = this.list.length;
    return this;
  }
  /*
  * @function deleteStep
  * @memberof Step
  * @instance
  * @param    {String | Number | Array.<String|Number>} order
  * @return   Step
  */
  delete(order){
    if(order === undefined){
      this.list = [];
      this.length = this.list.length;
    }else{
      if(!Array.isArray(order)) order = [order];
      order = order.map((val)=> typeof val === 'string' ? this.indexByName(val) : val );
      let newStep = this.list.filter((val, i)=>{
        let flg = true;
        for(let _i=0, _l=order.length; _i<_l; _i++){
          if(order[_i] === i){
            flg = false;
            break;
          }
        }
        if(flg) return val;
      });
      this.list   = newStep;
      this.length = this.list.length;
    }
    return this;
  }
  /*
  * @function deleteStep
  * @memberof Step
  * @instance
  * @param    {String}          name
  * @return   Number | Number[]
  */
  indexByName(name){
    if(typeof name !== 'string') return -1;
    let arr = [];
    this.list.forEach((el, i)=>{
      if(typeof el === 'object' && el.name === name) arr.push(i);
    });
    return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
  }

}
