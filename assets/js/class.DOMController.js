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
        mode
      } = param;


      this.$            = $;
      this.$window      = $window;
      this.$template    = $template;
      this.$contentWrap = $('.content-wrap', this.$template);
      this.$content     = $('.content',      this.$template);
      this.$bg          = $('.bg',           this.$template);
      this.$pager       = $('.pager',        this.$template);
      this.$controller  = $('.pager',        this.$template);
      this.$parent      = $parent;
      $template.css({
        'z-index' : zIndex,
        'display' : 'none',
        'opacity' : 0
      });
      this.$contentWrap.css('z-index', zIndex+2);
      this.$bg.css('z-index', zIndex+1);


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
        case 'content-set' :
          return this.$contentWrap;
        break;
        case 'controller' :
          return this.$controller;
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
