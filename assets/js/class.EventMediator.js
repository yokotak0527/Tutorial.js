class EventMediator{
  static instance = undefined;
  /**
  *
  */
  static getInstance = ()=>{
    return EventMediator.instance || new EventMediator();
  };
  /**
  * @constructor EventMediator
  */
  constructor(){
    if(EventMediator.instance) return EventMediator.instance;
    this.containerList = Object.create(null);
  }
  /*
  * @function addContainer
  * @memberof EventMediator
  * @param    {string}         name      -
  * @param    {EventContainer} container -
  * @return   EventMediator
  */
  addContainer(name, container){
    this.containerList[name] = container;
    return this;
  }
  /*
  * @function removeContainer
  * @memberof EventMediator
  * @return   EventMediator
  */
  removeContainer(name){
    if(this.containerList[name]) delete this.containerList[name];
    return this;
  }
  /*
  * @function addRelation
  * @memberof EventMediator
  * @return   EventMediator
  */
  addRelation(){
    return this;
  }
  /*
  * @function removeRelation
  * @memberof EventMediator
  * @return   EventMediator
  */
  removeRelation(){
    return this;
  }

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
