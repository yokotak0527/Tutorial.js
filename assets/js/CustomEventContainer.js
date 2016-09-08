class CustomEventContainer{
    static instance = Object.create(null);
    /*
    *
    */
    static getInstance = (name)=>{
      if(CustomEventContainer.instance[name]) return CustomEventContainer.instance[name];
      return new CustomEventContainer(name);
    }
    /*
    * @constructor CustomEventContainer
    * @param       {String}                      name                       - event container name
    * @param       {CustomEvent | CustomEvent[]} [triggerHookParam = false] -
    * @return      CustomEventContainer
    */
    constructor(name, list = false){
      if(CustomEventContainer.instance[name]) return CustomEventContainer.getInstance(name);
      this.name         = name;
      this.list         = Object.create(null);

      let _             = Object.create(null);
      _.relationList    = Object.create(null);
      _.otherContainers = Object.create(null);
      __private.set(this, _);

      if(list) this.addEvent(list);
      CustomEventContainer.instance[name] = this;
    }
    /*
    * @function addEvent
    * @memberof CustomEventContainer
    * @param    {CustomEvent | CustomEvent[]} event -
    * @return   CustomEventContainer
    */
    addEvent(event){
      if(!Array.isArray(event)) event = [event];
      event.forEach( val => this.list[val.name] = val );
      return this;
    }
    /*
    * @function removeEvent
    * @memberof CustomEventContainer
    * @param    {String}       [name] -
    * @return   CustomEventContainer
    */
    removeEvent(name){
      if(!name){
        this.list = Object.create(null);
      }else{
        if(this.list[name]) delete this.list[name];
      }
      return this;
    }
    /*
    * @function addEventListener
    * @memberof CustomEventContainer
    * @param    {String}            eventName    -
    * @param    {String | Function} listenerName -
    * @param    {Function}          [callback]   -
    * @return   String
    */
    addEventListener(eventName, listenerName, callback){
      if(!this.list[eventName]) return this;
      let name = '';
      if(callback){
        name = this.list[eventName].addEventListener(listenerName, callback);
      }else{
        name = this.list[eventName].addEventListener(listenerName);
      }
      return name;
    }
    /*
    * @function removeEventListener
    * @memberof CustomEventContainer
    * @param    {String}            eventName      -
    * @param    {String}            [listenerName] -
    * @return   CustomEventContainer
    */
    removeEventListener(eventName, listenerName){
      if(!this.list[eventName]) return this;
      if(!listenerName){
        this.list[eventName].removeEventListener();
      }else{
        this.list[eventName].removeEventListener(listenerName);
      }
      return this;
    }
    /*
    * @function trigger
    * @memberof CustomEventContainer
    * @param    {String}       eventName
    * @return   CustomEventContainer
    */
    trigger(eventName){
      let _            = __private.get(this);
      let relationList = _.relationList;
      if(this.list[eventName]) this.list[eventName].trigger();
      for(let containerName in relationList){
        if(relationList[containerName][eventName]) relationList[containerName][eventName].trigger();
      }

      return this;
    }
    /*
    * @function addRelation
    * @memberof CustomEventContainer
    * イベントコンテナと他のイベントコンテナを親-子の関係で紐付ける。
    * 第1引数に親となるイベントコンテナ、第2引数に親が持っている紐付けるイベント名
    * @param    {CustomEventContainer}    target    - parent CustomEventContainer
    * @param    {String | String[]} eventList - event name of parent CustomEventContainer to relate container.
    * @return   CustomEventContainer
    */
    addRelation(target, eventList){
      let _target      = __private.get(target);
      let _            = __private.get(this);
      let relationList = _target.relationList;

      if(!relationList[this.name]) relationList[this.name] = Object.create(null);
      relationList = relationList[this.name];

      eventList = typeof eventList === 'string' ? [eventList] : eventList;
      eventList.forEach((name)=>{
        if(target.list[name]) relationList[name] = this.list[name];
      });
      _.otherContainers[target.name] = target;
    }
    /*
    * @function removeRelation
    * @memberof CustomEventContainer
    * @param    {CustomEventContainer} target -
    * @return   CustomEventContainer
    */
    removeRelation(target, eventList){
      let _target      = __private.get(target);
      let _            = __private.get(this);
      let relationList = _target.relationList;

      if(eventList === undefined) eventList = Object.keys(this.list);
      eventList = typeof eventList === 'string' ? [eventList] : eventList;
      relationList = relationList[this.name];
      eventList.forEach(name => {
        if(relationList[name]) delete relationList[name];
      });
      if(!Object.keys(relationList).length){
        delete _target.relationList[this.name];
        delete _.otherContainers[target.name];
      }
      return this;
    }
    /*
    * @function removeAllRelation
    * @memberof CustomEventContainer
    * @return   CustomEventContainer
    */
    removeAllRelation(target){
      let _ = __private.get(this);
      if(target){
        this.removeRelation(target);
      }else{
        for(let key in _.otherContainers) this.removeRelation(_.otherContainers[key]);
      }
      return this;
    }
}
