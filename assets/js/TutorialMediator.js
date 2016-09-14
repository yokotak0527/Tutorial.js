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
        // self.active.show();
      });
      /* $ next event listener */
      let $nextBtn = self.domCtlr.get$obj('nextBtn');
      $nextBtn.on('click', ()=> self.active.next() );
      /* $ prev event listener */
      let $prevBtn = self.domCtlr.get$obj('prevBtn');
      $prevBtn.on('click', ()=> self.active.prev() );
      /* $ skip event listener */
      let $skipBtn = self.domCtlr.get$obj('skipBtn');
      $skipBtn.on('click', ()=> self.active.skip() );
      /* $ end event listener */
      let $endBtn = self.domCtlr.get$obj('endBtn');
      $endBtn.on('click', ()=> self.active.end() );

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
    // -------------------------------------------------------------------------
    // 表示するための処理
    // -------------------------------------------------------------------------
    let showFunc = (def, step)=>{
      let conf  = this.conf;
      let speed = conf.animation === true || conf.animation.show ? conf.showSpeed : 10 ;
      if(speed <= 0) speed = 10;

      /* アクティブな状態なtutorialがない */
      if(!this.hasActive()){
        this.domCtlr.content(step.content || '').pager(tutorial.step.length).pagerActive(tutorial.pointer);

        if(!tutorial.controller) this.domCtlr.disable('controller');
        if(!tutorial.pager)      this.domCtlr.disable('pager');
        if(!tutorial.skipBtn)    this.domCtlr.disable('skipBtn');
        // if(!tutorial.roop)       this.domCtlr.disable('endBtn');

        this.active = tutorial;
        // 表示＆移動アニメーション
        // ここ
        let promise = this.animation.show(this.domCtlr.get$obj('all'), speed);
        promise.then( () => def.resolve() );
      }
      /* アクティブな状態なtutorialがあるが同じtutorialである(nextやprev経由) */
      if(this.hasActive() && tutorial === this.active){
        // 表示＆移動アニメーション
        // ここ
        this.domCtlr.content(step.content || '').pagerActive(tutorial.pointer);
        def.resolve();
      }
      /* アクティブな状態なtutorialがある */
      else{
        this.domCtlr.enable('controller');
        this.domCtlr.enable('pager');
        this.domCtlr.enable('skipBtn');
        this.domCtlr.enable('endBtn');
        this.active = undefined;
        showFunc(def, step);
      }
    }
    // -------------------------------------------------------------------------
    // 非表示するための処理
    // -------------------------------------------------------------------------
    let hideFunc = (def, tutorial)=>{
      let conf  = this.conf;
      let speed = conf.animation === true || conf.animation.hide ? conf.hideSpeed : 10 ;
      if(speed <= 0) speed = 10;
      if(this.active !== tutorial){
        def.reject();
        return false;
      }else if(this.active === tutorial){
        this.active = undefined;
        let promise = this.animation.hide(this.domCtlr.get$obj('all'), speed);
        promise.then(()=>{
          this.domCtlr.enable('controller');
          this.domCtlr.enable('pager');
          this.domCtlr.enable('skipBtn');
          this.domCtlr.enable('endBtn');
          def.resolve();
        });
      }
    }
    // -------------------------------------------------------------------------
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
      let def        = new this.Deferred();
      let newPointer = ops;
      let promise    = tutorial.show(newPointer);
      promise.then(()=>{
        return def.resolve();
      });
      return def.promise();
    }
    else if(type === 'prev'){
      let def        = new this.Deferred();
      let newPointer = ops;
      let promise    = tutorial.show(newPointer);
      promise.then(()=>{
        return def.resolve();
      });
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

let __TutorialMediator_showFunc = function(){
  console.log(this);
}
