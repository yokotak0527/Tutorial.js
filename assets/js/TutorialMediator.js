class TutorialMediator{
  static instance = undefined;
  static idNum    = 0;
  /*
  * @constructor
  * @param      {Tutorial} tutorial
  * @return     TutorialMediator
  */
  constructor(tutorial, conf){
    let TM      = TutorialMediator;
    let self    = TM.instance ? TM.instance : this;
    tutorial.id = self.issuanceNewID();

    if(!TM.instance){
      self.$        = conf.$;
      self.$window  = conf.$window || $(window);
      self.$parent  = conf.$parent || $('body');
      self.$scroll  = conf.$scroll || $('body');
      self.Deferred = conf.Deferred;
      self.active   = false;

      // let events  = [];

      // globalEvent = new EventContainer('global');
      //   conf.defaultEventConf.forEach((val)=>{
      //     let name        = val[0];
      //     let triggerHook = val[1];
      //     events.push(new CustomEvent(name, triggerHook));
      //   });
      //   new EventContainer('global', events);
      // }
      // let globalEvent = EventContainer.getInstance('global');



      self.list   = Object.create(null);
      TM.instance = self;
    }

    self.list[tutorial.id] = tutorial;
    return self;
  }
  /*
  * 新しいIDを発行する
  * @return String
  */
  issuanceNewID(){
    let TM  = TutorialMediator;
    let rtn = `tutorial-${TM.idNum}`;
    TM.idNum++;
    return rtn;
  }
  /*
  * @param {Tutorial} tutorial
  * @param {String}   type
  */
  appeal(tutorial, type){
    let Deferred = this.Deferred;
    switch(type){
      // -----------------------------------------------------------------------
      case 'show' :
        let def = new Deferred();
        setTimeout(()=>{
          if(!this.active){
            this.active = tutorial;
            def.resolve();
          }else{
            let promise = this.active.hide();
            promise.then(()=>{
              this.active = tutorial;
              def.resolve();
            });
          }
        }, 10);
        return def.promise();
        break;
      // -----------------------------------------------------------------------
      case 'hide' :
        break;
    }
  }
}
