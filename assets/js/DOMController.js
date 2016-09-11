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
        case 'content-wrap' :
          return this.$contentWrap;
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
          return this.$nextBtn;
        case 'pager' :
          return this.$pager;
        case 'bg' :
          return this.$bg;
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
      return this;
    }
    /**
    * @param {String} name
    */
    disable(name){
      let $target = this.get$obj(name);
      $target.css('display', 'none');
      return this;
    }
    /*
    * @param {String} name
    */
    enable(name){
      let $target = this.get$obj(name);
      $target.css('display', '');
      return this;
    }
    /*
    * @param {jQuery | String} cnt
    */
    content(cnt){
      this.get$obj('content').empty().append(cnt);
      return this;
    }
    /*
    * @param {Number} num
    */
    pager(num){
      let cnt = '';
      for(let i = 0, l = num; i<l; i++) cnt += `<li><span>${i}</span></li>`;
      this.get$obj('pager').empty().append(cnt);
      return this;
    }
    /*
    * @param {Number} index
    */
    pagerActive(index){
      $('li span', this.get$obj('pager')).removeClass('active');
      $(`li:eq(${index}) span`, this.get$obj('pager')).addClass('active');
      return this;
    }
}
