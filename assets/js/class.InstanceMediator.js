class InstanceMediator{
    static instance = undefined;
    /**
    *
    */
    static getInstance = ()=>{
        return InstanceMediator.instance || false;
    };
    /**
    *
    */
    constructor(){
      if(InstanceMediator.instance) return InstanceMediator.instance;
      this.active = undefined;
      this.list   = Object.create(null);
    }
    /**
    *
    */
    addInstance(id, instance, eventManager){
      // eventManager.relation();
      this.list['instance-'+id] = instance;

    }
    /**
    *
    */
    getInstance(id){
      return this.list['instance-'+id];
    }
    /**
    *
    */
    deleteInstance(id){
      let ins = this.list['instance-'+id];
      if(!ins) return;
      if(ins == this.active) this.active = undefined;
      delete this.list['instance-'+id];
    }
    /**
    *
    */
    getActiveInstance(){
      return this.active;
    }
    /**
    *
    */
    setActiveInstance(newActive){
      this.active = newActive;
    }
}
