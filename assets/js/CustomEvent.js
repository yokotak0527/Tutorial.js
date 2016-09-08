class CustomEvent{
  /*
  * @constructor CustomEvent
  * @param       {String}   name                       - event name
  * @param       {Object}   [triggerHookParam = false] -
  * @param       {Function} triggerHookParam.func      -
  * @param       {*}        [triggerHookParam.ags]     -
  * @param       {*}        [triggerHookParam.this]    -
  * @return      CustomEvent
  */
  constructor(name, triggerHookParam = false){
    let _ = Object.create(null);

    this.name = name;
    this.list = Object.create(null);

    __private.set(this, _);

    this.removeTriggerHook();
    if(triggerHookParam) this.addTriggerHook(triggerHookParam);
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @param    {String | Function} name       -
  * @param    {Function}          [callback] -
  * @return   String
  */
  addEventListener(name, callback){
    if(typeof name === 'function'){
      callback = name;
      name     = 'name-'+Math.random().toString(36).slice(-5);
    }
    this.list[name] = callback;
    return name;
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @return   CustomEvent
  */
  removeEventListener(name){
    if(!name){
      this.list = Object.create(null);
    }else if(this.list[name]){
      delete this.list[name];
    }
    return this;
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @param    {Object}   param        -
  * @param    {Function} paam.func    -
  * @param    {*}        [param.ags]  -
  * @param    {*}        [param.this] -
  * @return   CustomEvent
  */
  addTriggerHook(param = {}){
    let _ = __private.get(this);
    this.removeTriggerHook();
    _.triggerHook.func = param.func;
    _.triggerHook.ags  = param.ags  || _.triggerHook.ags;
    _.triggerHook.this = param.this || _.triggerHook.this;
    return this;
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @return   CustomEvent
  */
  removeTriggerHook(){
    let _ = __private.get(this);
    _.triggerHook = Object.create(null);
    _.triggerHook.func = (ags)=>{};
    _.triggerHook.ags  = undefined;
    _.triggerHook.this = this;
    return this;
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @param    {Object}   param        -
  * @param    {Function} paam.func    -
  * @param    {*}        [param.ags]  -
  * @param    {*}        [param.this] -
  * @return   CustomEvent
  */
  changeTriggerHook(param = {}){
    this.addTriggerHook(param);
    return this;
  }
  /*
  * @function addEventListener
  * @memberof CustomEvent
  * @return   CustomEvent
  */
  trigger(){
    let _     = __private.get(this);
    let param = _.triggerHook.func.call(_.triggerHook.this, _.triggerHook.ags);

    for(let name in this.list) this.list[name].call(this, param);
    return this;
  }
}
