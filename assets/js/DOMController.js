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
        bgColor,
        tutorialMediator
      } = param;

      let tm = tutorialMediator;
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
        this.setCanvasSize(this.$window.innerWidth(), this.$window.innerHeight());
      }
      this.$posFit.css('z-index', zIndex+2);
      this.$bg.css('z-index', zIndex+1);
      // =======================================================================
      // events
      // =======================================================================
      // pager
      this.$pager.on('click', 'li span', function(e){
        if(!$(this).hasClass('active')) tm.active.show($(this).text() * 1);
      });
      // skip
      this.$skipBtn.on('click', ()=> tm.active.skip() );
      // next
      this.$nextBtn.on('click', ()=> tm.active.next() );
      // prev
      this.$prevBtn.on('click', ()=> tm.active.prev() );
      // end
      this.$endBtn.on('click', ()=> tm.active.end() );
      // resize
      tm.eventCtnr.addEventListener('resize', (size)=>{
        if(!tm.hasActive()) return false;
        this.setCanvasSize(size.width, size.height);
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
    * @function get$obj
    * @memberof DOMController
    * @instance
    *
    */
    // addMode(mode, color, interval){
    //   if(mode === 'focus'){
    //     this.$template.addClass('focus');
    //     let bgCvs = new BGCanvas({
    //       '$'              : this.$,
    //       '$window'        : this.$window,
    //       '$parent'        : this.$bg,
    //       'bgColor'        : color,
    //       'resizeInterval' : interval
    //     });
    //     bgCvs.draw();
    //   }
    //   return this;
    // }
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
    setCanvasSize(w, h){
      if(!this.bgCanvas) return this;
      this.bgCanvas.setSize(w, h);
      this.bgCanvas.draw();
      return this;
    }
}
