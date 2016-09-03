class EventMediator{
  static instance = undefined;
  /**
  *
  */
  static getInstance = ()=>{
    return EventMediator.instance || false;
  };
  /**
  *
  */
  constructor(){
    if(EventMediator.instance) return EventMediator.instance;
    this.list = Object.create(null);
    // this.listener = Object.create(null);
    // eventNames.forEach( (val, i)=> this.listener[val] = Object.create(null) );
    // Object.seal(this.listener);
  }
  /**
  *
  */
  addEvent(id, eventNames){
    eventNames = typeof eventName === 'string' ? [eventNames] : eventNames;
    this.list[id] = Object.create(null);
    eventNames.forEach((name)=> this.list[id][name] = Object.create(null) );
  }
  /**
  *
  */
  removeEvent(id){
    if(this.list[id]) delete this.list[id];
  }
  /**
  *
  */

    //getEventNames(){
    //  return Object.keys(this.listener);
    //}
    ///**
    //*
    //*/
    //trigger(name){
    //  if(!this.listener[name]) return;
    //  console.log(this.listener);
    //  for(let key in this.listener[name]){
    //    for(let func in this.listener[name][key]){
    //      this.listener[name][key][func]();
    //    }
    //    // console.log(key);
    //    // console.log(this.listener[name][key]);
    //  }
    //}
    ///**
    //*
    //*/
    //addListenerRelation(name, localListener){
    //  let globalListener = this.listener;
    //  for(let key in globalListener){
    //    if(!localListener[key]) continue;
    //    globalListener[key][name] = localListener[key];
    //  }
    //  // console.log(globalListener);
    //  // for(let key in globalListener) globalListener[key][name] = localListener[key];
    //}
    ///**
    //*
    //*/
    //removeListenerRelation(name, localListener){
    //  let globalListener = this.listener;
    //  for(let key in globalListener){
    //    if(!localListener[key]) continue;
    //    delete globalListener[key][name];
    //  }
    //  console.log(globalListener);
    //    // let globalListener = this.listener;
    //    // for(let key in globalListener) delete globalListener[key][id];
    //}
}
