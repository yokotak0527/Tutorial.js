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
  constructor(param){
    if(BGCanvas.instance) return BGCanvas.instance;
    let {
      $,
      $parent,
      bgColor
    } = param;

    this.bgColor   = bgColor;
    this.$cvs      = $('<canvas>');
    this.cvs       = this.$cvs[0];
    this.ctx       = this.cvs.getContext('2d');
    this.clearRect = false;
    $parent.append(this.$cvs);
    if(!BGCanvas.instance) BGCanvas.instance = this;
  }
  /*
  * @param {Number} w
  * @param {Number} h
  */
  setSize(w, h){
    this.cvs.width  = w;
    this.cvs.height = h;
    return this;
  }
  /**
  *
  */
  draw(){
    this.ctx.fillStyle = this.bgColor;
    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    if(this.clearRect) this.ctx.clearRect(this.clearRect[0], this.clearRect[1], this.clearRect[2], this.clearRect[3] );
    // this.ctx.clearRect(rect[0], rect[1], rect[2], rect[3] );
    // if(rect) rect.forEach((val)=> this.ctx.clearRect(val[0], val[1], val[2], val[3]) );
  }
  /**
  *
  */
  checkClearRect(){
    return !this.clearRect || (this.clearRect[2] === 0 && this.clearRect[3] === 0) ? false : true;
  }
}
