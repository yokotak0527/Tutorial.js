class DOMController{
    static instance = undefined;
    /**
    *
    */
    static getInstance = ()=>{
        return DOMController.instance || false;
    };
    /**
    *
    */
    constructor(param){
      if(DOMController.instance) return DOMController.instance;

      let {
        $,
        $window,
        $template,
        zIndex,
        $parent,
        mode,
        BGCanvas,
        bgColor
      } = param;

      this.$            = $;
      this.$window      = $window;
      this.$template    = $template;
      this.$contentWrap = $('.content-wrap', this.$template);
      this.$content     = $('.content',      this.$template);
      this.$bg          = $('.bg',           this.$template);
      this.$pager       = $('.pager',        this.$template);
      this.$controller  = $('.controller',   this.$template);
      this.$skipBtn     = $('.skip',         this.$controller);
      this.$prevBtn     = $('.prev',         this.$controller);
      this.$nextBtn     = $('.next',         this.$controller);
      this.$endBtn      = $('.end',          this.$controller);
      this.$parent      = $parent;
      $template.css({
        'z-index' : zIndex,
        'display' : 'none',
        'opacity' : 0
      });
      if(mode === 'focus'){
        this.bgCanvas = new BGCanvas({
          '$'       : this.$,
          '$parent' : this.$bg,
          'bgColor' : bgColor
        });
      }
      this.$contentWrap.css('z-index', zIndex+2);
      this.$bg.css('z-index', zIndex+1);


      // this.$pager
      // eventContainer


      // add click skip btn event.
      // $('.controller .skip span', $cnt).on('click', (e)=>{
        // if(__activeInstance) __activeInstance.skip();
      // });

          //// add click prev btn event.
          //$('.controller .prev span', $cnt).on('click', (e)=>{
          //  if(__activeInstance) __activeInstance.prev();
          //});
      //
          //// add click next btn event.
          //$('.controller .next span', $cnt).on('click', (e)=>{
          //    if(__activeInstance) __activeInstance.next();
          //});
      //
          //// add click end btn event.
          //$('.controller .end span', $cnt).on('click', (e)=>{
          //  if(__activeInstance) __activeInstance.end();
          //});

      this.$parent.append(this.$template);

    }
    /**
    *
    * @param  {String} name -
    * @return jQuery Object
    */
    get$obj(name){
      switch(name){
        case 'all' :
          return this.$template;
          break;
        case 'content-wrap' :
          return this.$contentWrap;
          break;
        case 'content' :
          return this.$content;
          break;
        case 'controller' :
          return this.$controller;
          break;
        case 'skipBtn' :
          return this.$skipBtn;
          break;
        case 'prevBtn' :
          return this.$prevBtn;
          break;
        case 'nextBtn' :
          return this.$nextBtn;
          break;
        case 'endBtn' :
          return this.$nextBtn;
          break;
        case 'pager' :
          return this.$pager;
          break;
        case 'bg' :
          return this.$bg;
          break;
      }
    }
    /**
    *
    */
    addMode(mode, color, interval){
      if(mode === 'focus'){
        this.$template.addClass('focus');
        let bgCvs = new BGCanvas({
          '$'              : this.$,
          '$window'        : this.$window,
          '$parent'        : this.$bg,
          'bgColor'        : color,
          'resizeInterval' : interval
        });
        bgCvs.draw();
      }
    }
}
