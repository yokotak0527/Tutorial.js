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
      conf.$scroll   = conf.$scroll || $('body');
      self.$window   = conf.$window;
      self.$parent   = conf.$parent;
      self.$scroll   = conf.$scroll;
      self.Deferred  = conf.Deferred;
      self.domCtlr = new conf.DOMController({
        '$template'        : self.$(conf.template()),
        'zIndex'           : conf.zIndex,
        'mode'             : conf.mode,
        'theme'            : conf.theme,
        'BGCanvas'         : conf.BGCanvas,
        'bgColor'          : conf.bgColor,
        'tutorialMediator' : self
      });
      self.animation = new conf.Animation({
        'tutorialMediator' : self,
        'bgCanvas'         : self.domCtlr.bgCanvas
      });
      
      // =======================================================================
      // $ resize event listener
      // =======================================================================
      let resizeInterval = conf.resizeInterval || 250;
      // if(!conf.resizeInterval) conf.resizeInterval
      let resizeTimer    = null;
      self.$window.on('resize', (e)=>{
        if(conf.resizeInterval === 0){
          self.eventCtnr.trigger('resize');
          
        }else{
          if(resizeTimer) clearTimeout(resizeTimer);
          resizeTimer = setTimeout(()=>{
            self.eventCtnr.trigger('resize');
            
          }, resizeInterval);
        }
      });
      
      // let scrollInterval = conf.scrollInterval || 

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
}

// /////////////////////////////////////////////////////////////////////////////
// 表示処理
// =============================================================================
let proposalOfShowing = function(tutorial, def, step){
  let conf         = this.conf;
  let showSpeed    = ( conf.animation === true || conf.animation.show    ) ? ( conf.showSpeed    > conf.minSpeed ) ? conf.showSpeed    : conf.minSpeed : conf.minSpeed;
  let scrollSpeed  = ( conf.animation === true || conf.animation.scroll  ) ? ( conf.scrollSpeed  > conf.minSpeed ) ? conf.scrollSpeed  : conf.minSpeed : conf.minSpeed;
  let posFitSpeed  = ( conf.animation === true || conf.animation.posFit  ) ? ( conf.posFitSpeed  > conf.minSpeed ) ? conf.posFitSpeed  : conf.minSpeed : conf.minSpeed;
  let focusSpeed   = ( conf.animation === true || conf.animation.focus   ) ? ( conf.focusSpeed   > conf.minSpeed ) ? conf.focusSpeed   : conf.minSpeed : conf.minSpeed;
  let unfocusSpeed = ( conf.animation === true || conf.animation.unfocus ) ? ( conf.unfocusSpeed > conf.minSpeed ) ? conf.unfocusSpeed : conf.minSpeed : conf.minSpeed;
  // ---------------------------------------------------------------------------
  // アクティブな状態なtutorialがない
  // ---------------------------------------------------------------------------
  if(!this.hasActive()){
    let count = 0; // show, scroll, pos.

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

    this.domCtlr.setCanvasSize(this.$window.innerWidth(), this.$window.innerHeight());
    // 表示＆移動アニメーション
    let check = (d)=>{
        count++;
        if(count === 3 && conf.mode === 'focus'){
          let step = this.active.getActiveStep();
          if(step.target){
            let endPromise = this.animation.focus(step.target, step.targetPosOffset, focusSpeed);
            endPromise.then( ()=> d.resolve() );
          }else{
            d.resolve();
          }
        }
    }
    let showAnimPromise = this.animation.show(this.domCtlr.get$obj('all'), showSpeed);
    showAnimPromise.then( ()=> check(def) );
    let scrollAnimPromise = this.animation.scroll(step.target, step.targetPos, scrollSpeed);
    scrollAnimPromise.then( ()=> check(def) );
    let posAnimationPromise = this.animation.tooltipPosFit(step.pos, this.domCtlr.get$obj('content-wrap'), this.domCtlr.get$obj('pos-fit'), posFitSpeed);
    posAnimationPromise.then( ()=> check(def) );
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

    let posAnimationPromise = this.animation.tooltipPosFit(step.pos, this.domCtlr.get$obj('content-wrap'), this.domCtlr.get$obj('pos-fit'), posFitSpeed);
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
