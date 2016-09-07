class EventContainer{
    static instance = Object.create(null);
    /*
    *
    */
    static getInstance = (name)=>{
      if(EventContainer.instance[name]) return EventContainer.instance[name];
      return new EventContainer(name);
    }
    /*
    * @constructor EventContainer
    * @param       {String}                      name                       - event container name
    * @param       {CustomEvent | CustomEvent[]} [triggerHookParam = false] -
    * @return      EventContainer
    */
    constructor(name, list = false){
      if(EventContainer.instance[name]) return EventContainer.getInstance(name);
      this.name         = name;
      this.list         = Object.create(null);

      let _             = Object.create(null);
      _.relationList    = Object.create(null);
      _.otherContainers = Object.create(null);
      __privateMap.set(this, _);

      if(list) this.addEvent(list);
      EventContainer.instance[name] = this;
    }
    /*
    * @function addEvent
    * @memberof EventContainer
    * @param    {CustomEvent | CustomEvent[]} event -
    * @return   EventContainer
    */
    addEvent(event){
      if(!Array.isArray(event)) event = [event];
      event.forEach( val => this.list[val.name] = val );
      return this;
    }
    /*
    * @function removeEvent
    * @memberof EventContainer
    * @param    {String}       [name] -
    * @return   EventContainer
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
    * @memberof EventContainer
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
    * @memberof EventContainer
    * @param    {String}            eventName      -
    * @param    {String}            [listenerName] -
    * @return   EventContainer
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
    * @memberof EventContainer
    * @param    {String}       eventName
    * @return   EventContainer
    */
    trigger(eventName){
      let _            = __privateMap.get(this);
      let relationList = _.relationList;
      // console.log(relationList);
      if(this.list[eventName]) this.list[eventName].trigger();
      for(let containerName in relationList){
        if(relationList[containerName][eventName]) relationList[containerName][eventName].trigger();
      }

      return this;
    }
    /*
    * @function addRelation
    * @memberof EventContainer
    * イベントコンテナと他のイベントコンテナを親-子の関係で紐付ける。
    * 第1引数に親となるイベントコンテナ、第2引数に親が持っている紐付けるイベント名
    * @param    {EventContainer}    target    - parent EventContainer
    * @param    {String | String[]} eventList - event name of parent EventContainer to relate container.
    * @return   EventContainer
    */
    addRelation(target, eventList){
      let _target      = __privateMap.get(target);
      let _            = __privateMap.get(this);
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
    * @memberof EventContainer
    * @param    {EventContainer} target -
    * @return   EventContainer
    */
    removeRelation(target, eventList){
      let _target      = __privateMap.get(target);
      let _            = __privateMap.get(this);
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
    * @memberof EventContainer
    * @return   EventContainer
    */
    removeAllRelation(target){
      let _ = __privateMap.get(this);
      if(target){
        this.removeRelation(target);
      }else{
        for(let key in _.otherContainers) this.removeRelation(_.otherContainers[key]);
      }
      return this;
    }
}
