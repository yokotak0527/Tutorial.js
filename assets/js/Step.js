class Step{
  /*
  * @constructor
  * @param    {Tutorial} tutorial
  * @param    {Object[]} [step]
  * @return   Step
  */
  constructor(tutorial, step){
    this.list     = [];
    this.length   = 0;
    this.tutorial = tutorial;
    if(step) this.add(step);
  }
  /* */
  static id = 0;
  /*
  * @param  {Object} step
  * @return Object
  */
  static setDefaultProperties(step, name = ''){
    step.pos = Array.isArray(step.pos) ? step.pos : ['center', 'center'];
    if(!step.name){
      step.name = `step-#{Step.id}`;
      Step.id++;
    }
    return step;
  }
  /*
  * ステップの内容を変更する
  * @function changeeStep
  * @memberof Step
  * @instance
  * @param    {String | Number} order
  * @param    {Object}          step
  * @param    {Boolean}         [partial = true]
  * @return   Step
  */
  change(order, step, partial = true){
    order = typeof order === 'string' ? this.indexByName(order) : order;
    if(!this.list[order]) return this;
    let name = this.list[order].name;
    // console.log(name);
    if(partial){
      for(let key in step) this.list[order][key] = step[key];
    }else{
      if(!step.name) step.name = name;
      this.list[order] = Step.setDefaultProperties(step);
    }
    __private.get(this.tutorial).emit('step changed');
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
    steps.forEach( step => this.list.push( Step.setDefaultProperties(step) ) );
    this.length = this.list.length;
    __private.get(this.tutorial).emit('step added');
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
      this.list   = [];
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
    __private.get(this.tutorial).emit('step deleted');
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
  /*
  * @function deleteStep
  * @memberof Step
  * @instance
  * @param    {Number}
  * @return   String
  */
  nameByIndex(index){
    if(!this.list[index]) return '';
    if(this.list[index]) return this.list[index].name;
  }

}
