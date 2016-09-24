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
      self.animation = new conf.Animation({
        '$'        : self.$,
        'Deferred' : self.Deferred,
        '$window'  : conf.$window,
        '$scroll'  : conf.$scroll
      });
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
      self.list   = Object.create(null);
      // setTutorialMediatorPrivateFunc.call(self);
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
  offer(tutorial, type, ops){
    if(type === 'show'){
      let def = new this.Deferred();
      setTimeout(()=> proposalOfShowing.call(this, tutorial, def, ops), 10);
      return def.promise();
    }
    else if(type === 'hide'){
      let def = new this.Deferred();
      // setTimeout(hideFunc.bind(this, def, tutorial), 10);
      setTimeout(()=> proposalOfHiding.call(this, def, tutorial), 10);
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

// /////////////////////////////////////////////////////////////////////////////
// 表示処理
// =============================================================================
let proposalOfShowing = function(tutorial, def, step){
  let minSpeed    = 10;
  let conf        = this.conf;
  let showSpeed   = conf.animation === true || conf.animation.show ? conf.showSpeed : minSpeed ;
  let scrollSpeed = conf.animation === true || conf.animation.scroll ? conf.scrollSpeed : minSpeed ;
  if(showSpeed <= 0) showSpeed = minSpeed;
  if(scrollSpeed <= 0) scrollSpeed = minSpeed;
  // ---------------------------------------------------------------------------
  // アクティブな状態なtutorialがない
  // ---------------------------------------------------------------------------
  if(!this.hasActive()){
    let count = 0; // show, scroll, target

    this.domCtlr.content(step.content || '').pager(tutorial.step.length).pagerActive(tutorial.pointer);

    if(!tutorial.controller) this.domCtlr.disable('controller');
    if(!tutorial.pager)      this.domCtlr.disable('pager');
    if(!tutorial.skipBtn)    this.domCtlr.disable('skipBtn');
    if(!tutorial.roop){
      if(tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
      if(tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
    }

    let pointer = tutorial.pointer;
    this.domCtlr.addTutorialID(tutorial.id);
    this.domCtlr.addStepID(tutorial.step.list[pointer].name);
    this.active = tutorial;

    // 表示＆移動アニメーション
    // ここ
    let showAnimPromise = this.animation.show(this.domCtlr.get$obj('all'), showSpeed);
    showAnimPromise.then( ()=>{
      count++;
      // if(count === 3) def.resolve();
      def.resolve();
    });
    let scrollAnimPromise = this.animation.scroll(step.target, step.targetPos, scrollSpeed);
    scrollAnimPromise.then( ()=>{
      count++;
      if(count === 3) def.resolve();
    });

  }
  // ---------------------------------------------------------------------------
  // アクティブな状態なtutorialがあるが同じtutorialである(nextやprev経由)
  // ---------------------------------------------------------------------------
  else if(this.hasActive() && tutorial === this.active){
    this.domCtlr.enable('nextBtn');
    this.domCtlr.enable('prevBtn');
    if(!tutorial.roop){
      if(tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
      if(tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
    }

    // 表示＆移動アニメーション
    // ここ
    this.domCtlr
      .content(step.content || '')
      .pagerActive(tutorial.pointer)
      .removeStepID()
      .addStepID(tutorial.step.list[tutorial.pointer].name);
    def.resolve();
  }
  // ---------------------------------------------------------------------------
  // アクティブな状態な別のtutorialがある
  // ---------------------------------------------------------------------------
  else{
    this.domCtlr.enable('nextBtn');
    this.domCtlr.enable('prevBtn');
    this.domCtlr.enable('controller');
    this.domCtlr.enable('pager');
    this.domCtlr.enable('skipBtn');
    this.domCtlr.enable('endBtn');
    this.domCtlr.removeTutorialID().removeStepID();
    this.active = undefined;
    showFunc(def, step);
  }
}

// =============================================================================
// 非表示処理
// =============================================================================
let proposalOfHiding = function(def, tutorial){
  let conf  = this.conf;
  let speed = conf.animation === true || conf.animation.hide ? conf.hideSpeed : 10 ;
  if(speed <= 0) speed = 10;
  if(this.active !== tutorial){
    def.reject();
    return false;
  }else if(this.active === tutorial){
    let promise = this.animation.hide(this.domCtlr.get$obj('all'), speed);
    promise.then(()=>{
      this.domCtlr.enable('controller');
      this.domCtlr.enable('pager');
      this.domCtlr.enable('skipBtn');
      this.domCtlr.enable('nextBtn');
      this.domCtlr.enable('prevBtn');
      this.domCtlr.enable('endBtn');
      this.domCtlr.removeTutorialID().removeStepID();
      this.active = undefined;
      def.resolve();
    });
  }
}
