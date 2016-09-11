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
      let events = [];
      conf.defaultEventConf.forEach((val)=>{
        let name        = val[0];
        let triggerHook = val[1];
        events.push(new conf.CustomEvent(name, triggerHook));
      });
      self.eventCtnr = new CustomEventContainer('global', events);

      self.conf      = conf;
      self.$         = conf.$;
      conf.$window   = conf.$window || $(window);
      conf.$parent   = conf.$parent || $('body');
      conf.$scroll   = conf.$scroll || $('body');
      self.$window   = conf.$window;
      self.$parent   = conf.$parent;
      self.$scroll   = conf.$scroll;
      self.Deferred  = conf.Deferred;
      self.animation = new conf.Animation(self.$, self.Deferred);
      self.domCtlr   = new conf.DOMController({
        '$'         : self.$,
        '$window'   : self.$window,
        '$template' : self.$(conf.template()),
        'zIndex'    : conf.zIndex,
        '$parent'   : self.$parent,
        'mode'      : conf.mode,
        'BGCanvas'  : conf.BGCanvas,
        'bgColor'   : conf.bgColor
      });
      if(self.domCtlr.bgCanvas){
        self.domCtlr.bgCanvas.setSize(self.$window.innerWidth(), self.$window.innerHeight());
        self.domCtlr.bgCanvas.draw();
      }
      /* $ resize event listener */
      let resizeInterval = conf.resizeInterval || 250;
      let resizeTimer    = null;
      self.$window.on('resize', (e)=>{
        if(resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(()=>{
          self.eventCtnr.trigger('resize');
        }, resizeInterval);
      });
      /* custom resize event listener */
      self.eventCtnr.addEventListener('resize', (size)=>{
        if(self.domCtlr.bgCanvas){
          self.domCtlr.bgCanvas.setSize(size.width, size.height);
          self.domCtlr.bgCanvas.draw();
        }
      });
      /* $ pager event listener */
      let $pager = self.domCtlr.get$obj('pager');
      $pager.on('click', 'li span', ()=>{
        console.log("ddd");
        // self.eventCtnr.trigger('pager');
      });

      /* $ */

      // eventContainer.trigger('resize');
      //
      //       // pager event
      //       this.$pager.on('click', 'li span', ()=>{
      //         console.log("ddd");
      //       });
      // self.domCtlr

      // self.DOMController = conf.DOMController;

      self.active = false; /* active tutorial */

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
  * @param {*}        ops
  */
  appeal(tutorial, type, ops){

    // 表示するための処理
    let showFunc = (def, step)=>{
      let conf        = this.conf;
      let showSpeed   = conf.animation === true || conf.animation.show ? conf.showSpeed : 0 ;
      let hideSpeed   = 0;

      // console.log();
      /* アクティブな状態なtutorialがない */
      if(!this.hasActive()){
        this.domCtlr
          .content(step.$cnt || '')
          .pager(tutorial.step.length)
          .pagerActive(tutorial.pointer);

        if(!tutorial.controller) this.domCtlr.disable('controller');
        if(!tutorial.pager)      this.domCtlr.disable('pager');
        if(!tutorial.skipBtn)    this.domCtlr.disable('skipBtn');

        this.active = tutorial;
        // アニメーション
        let promise = this.animation.show(this.domCtlr.get$obj('all'), showSpeed);
        promise.then( () => def.resolve() );
      }
      /* アクティブな状態なtutorialがある */
      if(this.hasActive() && tutorial === this.active){
        this.domCtlr
          .content(step.$cnt || '')
          .pagerActive(tutorial.pointer);
      }
      else{


        // let promise = this.active.hide();

      //  promise.then(()=>{
      //    this.active = tutorial;
      //    def.resolve();
      //  });
      }
    }

    // 非表示するための処理
    let hideFunc = (def, tutorial)=>{
      if(this.active !== tutorial){
        def.reject();
        return false;
      }else if(this.active === tutorial){
      }
      // 処理
    }


    if(type === 'show'){
      let def = new this.Deferred();
      setTimeout(showFunc.bind(this, def, ops), 10);
      return def.promise();
    }
    else if(type === 'hide'){
      let def = new this.Deferred();
      setTimeout(hideFunc.bind(this, def, tutorial), 10);
      return def.promise();
    }
    else if(type === 'next'){
      let def = new this.Deferred();
      return def.promise();
    }
    else if(type === 'emit'){
      let msg = ops;
      if(!this.hasActive() || tutorial !== this.active) return false;
      if(!msg.match(/^step/)) return false;
      this.domCtlr
          .pager(tutorial.step.length)
          .pagerActive(tutorial.pointer);
    }
  }
  /*
  * @return Boolean
  */
  hasActive(){
    return this.active ? true : false;
  }
}
