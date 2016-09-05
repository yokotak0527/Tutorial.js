class InstanceManager{
    static instance = undefined;
    /**
    *
    * @return InstanceManager
    */
    static getInstance = ()=>{
        return InstanceManager.instance || new InstanceManager();
    };
    /**
    *
    * @return InstanceManager
    */
    constructor(){
      if(InstanceManager.instance) return InstanceManager.instance;
      this.active = undefined;
      this.list   = Object.create(null);
    }
    /**
    *
    * @param  {Tutorial} instance
    * @return InstanceManager
    */
    register(instance){
      this.list[instance.id] = instance;
      return this;
    }
    /**
    *
    * @param  {String | Tutorial} id
    * @return InstanceManager
    */
    unRegister(id){
      if(this.active && this.active === this) this.active = undefined;
      id = typeof id === 'string' ? id : id.id;
      if(this.list[id]) delete this.list[id];
      return this;
    }
    /**
    *
    * @param  {String} id
    * @return InstanceManager
    */
    getInstance(id){
      return this.list[id] ? this.list[id] : false;
    }
    /*
    * @param  {Tutorial} instance
    * @return Boolean
    */
    isActive(instance){
      return this.active === instance;
    }
    /*
    * @param {Tutorial} newActive
    * @return InstanceManager
    */
    changeActive(newActive){
      if(!this.isActive(newActive)){
        if(this.active) this.active.hide();
        this.active = this;
      }
      if(callback) callback();
      return this;
    }
}
