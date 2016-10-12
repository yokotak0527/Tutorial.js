/**
* @class  TutorialMediator
* @param  {Tutorial} tutorial
* @param  {Object}   conf      - configuration object.
*/
class TutorialMediator{
  static instance = undefined;
  static idNum    = 0;
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
      // [task] change scroll elm. when use IE9;
      conf.$scroll   = conf.$scroll || $('body');
      self.$window   = conf.$window;
      self.$parent   = conf.$parent;
      self.$scroll   = conf.$scroll;
      self.Deferred  = conf.Deferred;

      let speed     = Object.create(null);
      speed.show    = ( self.conf.animation === true || self.conf.animation.show    ) ? ( self.conf.showSpeed    > self.conf.minSpeed ) ? self.conf.showSpeed    : self.conf.minSpeed : self.conf.minSpeed;
      speed.scroll  = ( self.conf.animation === true || self.conf.animation.scroll  ) ? ( self.conf.scrollSpeed  > self.conf.minSpeed ) ? self.conf.scrollSpeed  : self.conf.minSpeed : self.conf.minSpeed;
      speed.posFit  = ( self.conf.animation === true || self.conf.animation.posFit  ) ? ( self.conf.posFitSpeed  > self.conf.minSpeed ) ? self.conf.posFitSpeed  : self.conf.minSpeed : self.conf.minSpeed;
      speed.focus   = ( self.conf.animation === true || self.conf.animation.focus   ) ? ( self.conf.focusSpeed   > self.conf.minSpeed ) ? self.conf.focusSpeed   : self.conf.minSpeed : self.conf.minSpeed;
      speed.unFocus = ( self.conf.animation === true || self.conf.animation.unfocus ) ? ( self.conf.unfocusSpeed > self.conf.minSpeed ) ? self.conf.unfocusSpeed : self.conf.minSpeed : self.conf.minSpeed;

      self.domCtlr = new conf.DOMController({
        '$template'        : self.$(conf.template()),
        'zIndex'           : conf.zIndex,
        'mode'             : conf.mode,
        'theme'            : conf.theme,
        'BGCanvas'         : conf.BGCanvas,
        'Animation'        : conf.Animation,
        'bgColor'          : conf.bgColor,
        'Deferred'         : conf.Deferred,
        'tutorialMediator' : self,
        'speed'            : speed
      });
      self.animation = self.domCtlr.animation;
      
      // =======================================================================
      // resize event
      // =======================================================================
      let resizeInterval = conf.resizeInterval === 0 ? conf.resizeInterval : conf.resizeInterval ? conf.resizeInterval : 250;
      // let resizeInterval = conf.resizeInterval || 250;
      // if(!conf.resizeInterval) conf.resizeInterval
      let resizeTimer    = null;
      self.$window.on('resize', (e)=>{
        if(!self.active) return false;
        if(resizeInterval === 0){
          self.eventCtnr.trigger('resize');
        }else{
          if(resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(()=>{
            self.eventCtnr.trigger('resize');
          }, resizeInterval);
        }
      });
      // =======================================================================
      // scroll event
      // =======================================================================
      let scrollInterval = conf.scrollInterval === 0 ? conf.scrollInterval : conf.scrollInterval ? conf.scrollInterval : 250;
      let scrollTimer    = null;
      self.$window.on('scroll', (e)=>{
        if(!self.active) return false;
        if(scrollInterval === 0){
          self.eventCtnr.trigger('scroll');
        }else{
          if(scrollTimer) clearTimeout(scrollTimer);
          scrollTimer = setTimeout(()=>{
            self.eventCtnr.trigger('scroll');
          }, scrollInterval);
        }
      });

      self.active = false; /* active tutorial */
      self.list   = Object.create(null);
      TM.instance = self;
    }

    self.list[tutorial.id] = tutorial;
    return self;
  }
  /**
  * 新しいIDを発行する
  *
  * @function issuanceNewID
  * @memberof TutorialMediator
  * @instance
  *
  * @return String
  */
  issuanceNewID(){
    let TM  = TutorialMediator;
    let rtn = `tutorial-${TM.idNum}`;
    TM.idNum++;
    return rtn;
  }
  /**
  *
  * @function offer
  * @memberof TutorialMediator
  * @instance
  *
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
  /*
  * @return Boolean
  */
  getActive(){
    return this.active ? this.active : false;
  }
  /*
  * @return Boolean
  */
  getActiveStep(){
    return this.active ? this.active.getActiveStep() : false;
  }
}

// /////////////////////////////////////////////////////////////////////////////
// 表示処理
// =============================================================================
let proposalOfShowing = function(tutorial, def, step){
  // ---------------------------------------------------------------------------
  // アクティブな状態なtutorialがない
  // ---------------------------------------------------------------------------
  if(!this.hasActive()){
    this.domCtlr.open(tutorial).then(()=>{
      this.active = tutorial;
      def.resolve();
    });
  }
  // ---------------------------------------------------------------------------
  // アクティブな状態なtutorialがあるが同じtutorialである(nextやprev経由)
  // ---------------------------------------------------------------------------
  else if(this.hasActive() && tutorial === this.active){
    // this.domCtlr.enable('nextBtn');
    // this.domCtlr.enable('prevBtn');
    // if(!tutorial.roop){
    //   if(tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
    //   if(tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
    // }
    // 
    // domCtlr
    //   .content(step.content || '')
    //   .pagerActive(tutorial.pointer)
    //   .removeStepID()
    //   .addStepID(tutorial.step.list[tutorial.pointer].name);
    // 
    // let posAnimationPromise = this.animation.tooltipPosFit(step.pos, this.domCtlr.get$obj('content-wrap'), this.domCtlr.get$obj('pos-fit'), posFitSpeed);
    // def.resolve();
  }
  // ---------------------------------------------------------------------------
  // アクティブな状態な別のtutorialがある
  // ---------------------------------------------------------------------------
  else{
    this.domCtlr.close().then(()=>{
      this.active = undefined;
      showFunc(def, step);
    });
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
