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
        '$'              : self.$,
        '$window'        : self.$window,
        '$template'      : self.$(conf.template()),
        'zIndex'         : conf.zIndex,
        '$parent'        : self.$parent,
        'mode'           : conf.mode,
        'BGCanvas'       : conf.BGCanvas,
        'bgColor'        : conf.bgColor
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
  * @param {Step}     ops
  */
  appeal(tutorial, type, ops){
    let def = new this.Deferred();

    // 表示するための処理
    let showFunc = (step)=>{
      let conf     = this.conf;
      let speed    = conf.animation === true || conf.animation.show ? conf.showSpeed : 0 ;
      let $parent  = this.domCtlr.get$obj('content');
      let $pager   = this.domCtlr.get$obj('pager');
      let $skipBtn = this.domCtlr.get$obj('skipBtn');
      let $prevBtn = this.domCtlr.get$obj('prevBtn');
      let $nextBtn = this.domCtlr.get$obj('nextBtn');
      let $endBtn  = this.domCtlr.get$obj('endBtn');
      if(!this.active){
        this.active = tutorial;
        $parent.empty().append(step.$cnt || '');
        // ここから
        let promise = this.animation.show(this.domCtlr.get$obj('all'), speed);
        promise.then( () => def.resolve() );
      }else{

        // let promise = this.active.hide();

      //  promise.then(()=>{
      //    this.active = tutorial;
      //    def.resolve();
      //  });
      }
    }

    // 非表示するための処理
    let hideFunc = (tutorial)=>{
      if(this.active !== tutorial){
        def.reject();
        return false;
      }
      // 処理
    }


    switch(type){
      // -----------------------------------------------------------------------
      case 'show' :
        setTimeout(showFunc.bind(this, ops), 10);
        return def.promise();
      // -----------------------------------------------------------------------
      case 'hide' :
        setTimeout(hideFunc.bind(this, tutorial), 10);
        return def.promise();
    }
  }
  /*
  * @return Boolean
  */
  hasActive(){
    return this.active ? true : false;
  }
}
