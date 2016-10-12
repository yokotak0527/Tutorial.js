/**
* @class DOMController
*
* @param {Object} param
* @param {jQuery} param.$
* @param {jQuery} param.$window
* @param {jQuery} param.$template
* @param {jQuery} param.$parent
* @param {Number} param.zIndex
* @param {String} param.mode
*/
class DOMController{
    static instance = undefined;
    static getInstance = ()=>{
        return DOMController.instance || false;
    };
    /**
    *
    */
    constructor(param){
      if(DOMController.instance) return DOMController.instance;

      let {
        $template,
        zIndex,
        mode,
        theme,
        BGCanvas,
        Animation,
        Deferred,
        bgColor,
        tutorialMediator,
        speed
      } = param;

      let tm = tutorialMediator;
      // this.tm           = tm;
      this.$            = tm.$;
      this.$window      = tm.$window;
      this.$parent      = tm.$parent;
      this.$template    = $template;
      this.$posFit      = $('.pos-fit',      this.$template);
      this.$contentWrap = $('.content-wrap', this.$template);
      this.$content     = $('.content',      this.$template);
      this.$bg          = $('.bg',           this.$template);
      this.$pager       = $('.pager',        this.$template);
      this.$controller  = $('.controller',   this.$template);
      this.$skipBtn     = $('.skip span',    this.$controller);
      this.$prevBtn     = $('.prev span',    this.$controller);
      this.$nextBtn     = $('.next span',    this.$controller);
      this.$endBtn      = $('.end span',     this.$controller);
      this.mode         = mode;
      this.Deferred     = Deferred;
      this.speed        = speed;
      this.bgCanvas     = false;
      $template.css({
        'z-index' : zIndex,
        'display' : 'none',
        'opacity' : 0
      });
      this.$template.addClass(mode).addClass(theme);
      if(mode === 'focus'){
        this.bgCanvas = new BGCanvas({
          '$'       : this.$,
          '$parent' : this.$bg,
          'bgColor' : bgColor
        });
        this.bgCanvas.setSize(this.$window.innerWidth(), this.$window.innerHeight());
      }
      this.animation    = new Animation({
        'tutorialMediator' : tm,
        'bgCanvas'         : this.bgCanvas
      });
      this.$posFit.css('z-index', zIndex+2);
      this.$bg.css('z-index', zIndex+1);
      // =======================================================================
      // events
      // =======================================================================
      // pager
      this.$pager.on('click', 'li span', function(e){
        if(!$(this).hasClass('active')) tm.getActive().show($(this).text() * 1);
      });
      // skip
      this.$skipBtn.on('click', ()=> tm.getActive().skip() );
      // next
      this.$nextBtn.on('click', ()=> tm.getActive().next() );
      // prev
      this.$prevBtn.on('click', ()=> tm.getActive().prev() );
      // end
      this.$endBtn.on('click', ()=> tm.getActive().end() );
      // resize
      tm.eventCtnr.addEventListener('resize', (size)=>{
        if(!tm.hasActive()) return false;
        if(this.hasBGCanvas()) this.bgCanvas.setSize(size.width, size.height).draw();
      });
      tm.eventCtnr.addEventListener('scroll', ()=>{
        
      });

      this.$parent.append(this.$template);
      DOMController.instance = this;
    }
    /**
    * @function get$obj
    * @memberof DOMController
    * @instance
    *
    * @param  {String} name
    * @return jQuery Object
    */
    get$obj(name){
      switch(name){
        case 'all' :
          return this.$template;
        case 'content-wrap' :
          return this.$contentWrap;
        case 'pos-fit' :
          return this.$posFit;
        case 'content' :
          return this.$content;
        case 'controller' :
          return this.$controller;
        case 'skipBtn' :
          return this.$skipBtn;
        case 'prevBtn' :
          return this.$prevBtn;
        case 'nextBtn' :
          return this.$nextBtn;
        case 'endBtn' :
          return this.$endBtn;
        case 'pager' :
          return this.$pager;
        case 'bg' :
          return this.$bg;
      }
    }
    /**
    * @param {String} name
    */
    disable(name){
      let $target = this.get$obj(name);
      $target.css('display', 'none');
      return this;
    }
    /**
    * @param {String} name
    */
    enable(name){
      let $target = this.get$obj(name);
      $target.css('display', '');
      return this;
    }
    /**
    * @param {jQuery | String | DOMObject} cnt
    */
    content(cnt){
      this.get$obj('content').empty().append(cnt);
      return this;
    }
    /**
    * @param {Number} num
    */
    pager(num){
      let cnt = '';
      for(let i = 0, l = num; i<l; i++) cnt += `<li><span>${i}</span></li>`;
      this.get$obj('pager').empty().append(cnt);
      return this;
    }
    /**
    * @param {Number} index
    */
    pagerActive(index){
      $('li span', this.get$obj('pager')).removeClass('active');
      $(`li:eq(${index}) span`, this.get$obj('pager')).addClass('active');
      return this;
    }
    /**
    *
    */
    addTutorialID(id){
      this.$contentWrap.attr('data-tutorial', id);
      return this;
    }
    /**
    *
    */
    removeTutorialID(){
      this.$contentWrap.attr('data-tutorial', '');
      return this;
    }
    /**
    *
    */
    addStepID(id){
      this.$contentWrap.attr('data-step', id);
      return this;
    }
    /**
    *
    */
    removeStepID(){
      this.$contentWrap.attr('data-step', '');
      return this;
    }
    /**
    *
    */
    hasBGCanvas(){
      return this.bgCanvas ? true : false;
    }
    /**
    * @param {Tutorial} tutorial - active tutorial instance.
    */
    open(tutorial){
      let count      = 0; // show, scroll, pos.
      let activeStep = tutorial.getActiveStep();
      let stepNum    = tutorial.step.length;
      let i          = tutorial.pointer;
      let ID         = tutorial.id;
      let name       = activeStep.name;
      let $window    = this.$window;
      let def        = new this.Deferred();
      let speed      = this.speed;
      this.content(activeStep.content || '').pager(stepNum).pagerActive(i);

      if(!tutorial.controller) this.disable('controller');
      if(!tutorial.pager)      this.disable('pager');
      if(!tutorial.skipBtn)    this.disable('skipBtn');
      if(!tutorial.roop){
        if(stepNum - 1 <= i) this.disable('nextBtn');
        if(i === 0) this.disable('prevBtn');
      }
      
      this.addTutorialID(ID).addStepID(name);
      
      if(this.hasBGCanvas()) this.bgCanvas.setSize($window.innerWidth(), $window.innerHeight()).draw();
      // 表示＆移動アニメーション
      let check = ()=>{
          count++;
          if(count === 3 && this.mode === 'focus'){
            // let step = this.active.getActiveStep();
            if(activeStep.target){
              let endPromise = this.animation.focus(activeStep.target, activeStep.targetPosOffset, speed.focus);
              endPromise.then( ()=> def.resolve() );
            }else{
              def.resolve();
            }
          }
      }
      let showAnimPromise = this.animation.show(this.get$obj('all'), speed.show);
      showAnimPromise.then( ()=> check() );
      let scrollAnimPromise = this.animation.scroll(activeStep.target, activeStep.targetPos, speed.scroll);
      scrollAnimPromise.then( ()=> check() );
      let posAnimationPromise = this.animation.tooltipPosFit(activeStep.pos, this.get$obj('content-wrap'), this.get$obj('pos-fit'), speed.posFit);
      posAnimationPromise.then( ()=> check() );
      return def.promise();
    }
    /**
    *
    */
    close(){
      let def = new this.Deferred();
      this.enable('nextBtn');
      this.enable('prevBtn');
      this.enable('controller');
      this.enable('pager');
      this.enable('skipBtn');
      this.enable('endBtn');
      this.removeTutorialID().removeStepID();
      setTimeout(()=> def.resolve(),10);
      return def.promise();
    }
}
