class DOMManager{
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
      this.$content     = $('.content', this.$template);
      this.$bg          = $('.bg', this.$template);
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
    */
    get$obj(name){
      switch(name){
        case 'all' :
          return this.$template;
        break;
        case 'content-wrap' :
        break;
        case 'controller' :
        break;
        case 'pager' :
        break;
        case 'bg' :
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
//
// // class BGCanvas{
// //   static instance = undefined;
// //   /**
// //   *
// //   */
// //   static getInstance = ()=>{
// //     return BGCanvas.instance || false;
// //   };
// //   /**
// //   *
// //   */
// //   constructor($param){
// //     if(BGCanvas.instance) return BGCanvas.instance;
// //
// //     let {
// //       $,
// //       $window,
// //       $parent,
// //       bgColor        = '0x000000',
// //       resizeInterval = 250
// //     } = $param;
// //     $window = $window ? $(window) : $window;
// //
// //     this.$              = $;
// //     this.$window        = $window;
// //     this.$parent        = $parent;
// //     this.bgColor        = bgColor;
// //     this.$cvs           = $('<canvas>');
// //     this.cvs            = this.$cvs[0];
// //     this.ctx            = this.cvs.getContext('2d');
// //     this.resizeInterval = resizeInterval;
// //     this.timer          = null;
// //
// //     this.cvs.width     = $window.innerWidth();
// //     this.cvs.height    = $window.innerHeight();
// //
// //     $window.on('resize', ()=>{
// //       if(this.timer) clearTimeout(this.timer);
// //       this.timer = setTimeout(()=>{
// //         this.cvs.width  = this.$window.innerWidth();
// //         this.cvs.height = this.$window.innerHeight();
// //         this.draw();
// //       }, this.resizeInterval);
// //     });
// //     this.$parent.append(this.$cvs);
// //     BGCanvas.instance = this;
// //     return this;
// //   }
// //   /**
// //   *
// //   */
// //   draw(rect = false){
// //     this.ctx.fillStyle = this.bgColor;
// //     this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
// //     this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
// //     if(rect) rect.forEach((val)=> ctx.clearRect(val[0], val[1], val[2], val[3]) );
// //   }
// // }
