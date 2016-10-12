/**
* @class Step
*
* | Step parameters        ||
* |--------------------|----|
* | a | b |
*
* @param       {Tutorial} tutorial
* @param       {Object[]} [step]
* @return      Step
*/
class Step{
  static id = 0;
  constructor(tutorial, step, $){
    this.list     = [];
    this.length   = 0;
    this.tutorial = tutorial;
    this.$        = $;
    if(step) this.add(step);
  }
  /**
  *
  * @function setDefaultProperties
  * @memberof Step
  * @static
  *
  * @param  {Object} step
  * @param  {String} [name = '']
  * @return Step
  */
  static setDefaultProperties(step, name = ''){
    step.pos = Array.isArray(step.pos) ? step.pos : ['center', 'center'];
    if(!step.name){
      step.name = `step-${Step.id}`;
      Step.id++;
    }
    if(step.target) step.target = $(step.target[0]);
    if(step.target && !step.targetPos) step.targetPos = ['left', 'top'];
    if(step.target && !step.targetPosOffset) step.targetPosOffset = [0, 0];
    return step;
  }
  /**
  * @function setPropertiesFormat
  * @memberof Step
  * @static
  *
  * @param {Step}   step
  * @param {jQuery} $
  * @return Step
  */
  static setPropertiesFormat(step, $){
    if(step.target && typeof step.target === 'string') step.target = $(step.target);
    return step;
  }
  /**
  * Change step parameters.
  * @function change
  * @memberof Step
  * @instance
  *
  * @param    {String | Number} order
  * @param    {Object}          step
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
  /**
  * Replace step parameters.
  *
  * @function replace
  * @memberof Step
  * @instance
  * @param    {String | Number} order
  * @param    {Object}          step
  */
  replace(order, step){
    return this.change(order, step, false);
  }
  /**
  * Add new step.
  *
  * @function addStep
  * @memberof Step
  * @instance
  * @param    {Object | Object[]} step
  * @return   Step
  */
  add(step){
    let steps = Array.isArray(step) ? step : [step];
    steps.forEach( step =>{
      let newStep = Step.setDefaultProperties(step);
      newStep     = Step.setPropertiesFormat(newStep, this.$);
      this.list.push(newStep);
    });
    this.length = this.list.length;
    __private.get(this.tutorial).emit('step added');
    return this;
  }
  /**
  * delete specified step.
  *
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
