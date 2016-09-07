class SimplePromise{
  /*
  * @param {SimpleDeferred} deferred
  */
  constructor(deferred){
    this.def = deferred;
  }
  /*
  * @param {Function} onFulfilled
  * @param {Function} [onRejected = false]
  */
  then(onFulfilled, onRejected){
    this.def.addListener(onFulfilled, onRejected);
  }
}

class SimpleDeferred{
  static num      = 0;
  static complete = ()=>{

  }
  /*
  *
  */
  constructor(){
    let _    = Object.create(null);
    _.list   = [];
    _.status = null;
    __private.set(this, _);
  }
  /*
  *
  */
  promise(){
    let _ = __private.get(this);
    if(_.status !== null) return this;
    _.promise = new SimplePromise(this);
    return _.promise;
  }
  /*
  *
  */
  getStatus(){
    let _ = __private.get(this);
    return _.status;
  }
  /*
  *
  */
  reject(){
    let _ = __private.get(this);
    if(_.status !== null) return this;
    _.status = false;
    _.list.forEach( listener =>{
      if(listener[1]) listener[1].call(_.promise);
    });
    return this;
  }
  /*
  * @return SimpleDeferred
  */
  resolve(){
    let _ = __private.get(this);
    if(_.status !== null) return this;
    _.list.forEach( listener => listener[0].call(_.promise) );
    _.status = true;
    return this;
  }
  /*
  * @param  {Function}         onFulfilled
  * @param  {Function | false} [onRejected]
  * @return SimpleDeferred
  */
  addListener(onFulfilled, onRejected){
    let _ = __private.get(this);
    if(_.status !== null) return this;
    _.list.push([onFulfilled, onRejected]);
    return this;
  }
}
