class BGCanvas{
  static instance = undefined;
  /**
  *
  */
  static getInstance = ()=>{
    return BGCanvas.instance || false;
  };
  /**
  *
  */
  constructor($param){
    if(BGCanvas.instance) return BGCanvas.instance;

    let {
      $,
      $window,
      $parent,
      bgColor        = '0x000000',
      resizeInterval = 250
    } = $param;
    $window = $window ? $(window) : $window;

    this.$              = $;
    this.$window        = $window;
    this.$parent        = $parent;
    this.bgColor        = bgColor;
    this.$cvs           = $('<canvas>');
    this.cvs            = this.$cvs[0];
    this.ctx            = this.cvs.getContext('2d');
    this.resizeInterval = resizeInterval;
    this.timer          = null;

    this.cvs.width     = $window.innerWidth();
    this.cvs.height    = $window.innerHeight();

    $window.on('resize', ()=>{
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(()=>{
        this.cvs.width  = this.$window.innerWidth();
        this.cvs.height = this.$window.innerHeight();
        this.draw();
      }, this.resizeInterval);
    });
    this.$parent.append(this.$cvs);
    BGCanvas.instance = this;
    return this;
  }
  /**
  *
  */
  draw(rect = false){
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    if(rect) rect.forEach((val)=> ctx.clearRect(val[0], val[1], val[2], val[3]) );
  }
}
