class Animation{
  static instance;
  /*
  *
  */
  static getInstance(){
    return Animation.instance ? Animation.instance : false;
  }
  /*
  *
  */
  constructor(param){
    if(Animation.instance) return Animation.instance;
    let tm = param.tutorialMediator;
    this.tm           = tm;
    this.$            = tm.$;
    this.$window      = tm.$window;
    this.$scroll      = tm.$scroll;
    this.Deferred     = tm.Deferred;
    this.bgCanvas     = param.bgCanvas;
    this.focusTimer   = null;
    this.unfocusTimer = null;
    this.state        = {
      'show'    : false,
      'hide'    : false,
      'focus'   : false,
      'scroll'  : false,
      'unfocus' : false
    };
    if(this.bgCanvas){
      // [0] x / [1] y / [2] width / [3] height
      this.focusStartRect  = [];
      this.focusTargetRect = [];
    }
    this.moving = (current_time, start_val, end_val, total_time)=>{
      let elapsed_time = Math.round(current_time / total_time * 1000) / 1000;
      let dist         = start_val - end_val;
      let v            = dist < 0 ? -1 : 1;
      dist             = dist * v;
      return (start_val - elapsed_time * dist) * v;
    };
  }
  /**
  * @function show
  * @param {jQuery} $target
  * @param {Number} speed
  */
  show($target, speed){
    let def = new this.Deferred();
    this.state.show = true;
    $target.stop().css('display', 'block').animate({
      'opacity' : 1
    }, speed, ()=>{
      this.state.show = false;
      def.resolve();
    });
    return def.promise();
  }
  /**
  * @function hide
  * @param {jQuery} $target
  * @param {Number} Speed
  */
  hide($target, speed){
    let def = new this.Deferred();
    this.state.hide = true;
    $target.stop().animate({
      'opacity' : 0
    }, speed, ()=>{
      $target.css('display', 'none');
      this.state.hide = false;
      def.resolve();
    });
    return def.promise();
  }
  /**
  * @function scroll
  * @param {jQuery[]}            target
  * @param {String[] | Number[]} offset
  * @param {Number}              speed
  */
  scroll(target = false, offset, speed){
    let def = new this.Deferred();
    if(!target){
      setTimeout(()=> def.resolve(), 10);
    }else{
      let $target = $(target[0]);
      let x       = $target.offset().left;
      let y       = $target.offset().top;
      let w       = $target.innerWidth();
      let h       = $target.innerHeight();
      let windowW = this.$window.innerWidth();
      let windowH = this.$window.innerHeight();
      if(typeof offset[0] === 'number'){
        x += offset[0];
      }else{
        switch(offset[0]){
          case 'middle' :
            x -= windowW / 2 - w / 2;
            break;
          case 'center' :
            x -= windowW / 2 - w / 2;
            break;
          case 'right' :
            x -= windowW - w;
            break;
          case 'left' :
            x -= 0;
            break;
          default :
            x -= 0;
            break;
        }
      }
      if(typeof offset[1] === 'number'){
        y += offset[1];
      }else{
        switch(offset[1]){
          case 'middle' :
            y -= windowH / 2 - h / 2;
            break;
          case 'center' :
            y -= windowH / 2 - h / 2;
            break;
          case 'bottom' :
            y -= windowH - h;
            break;
          case 'top' :
            y -= 0;
            break;
          default :
            y -= 0;
            break;
        }
      }
      this.state.scroll = true;
      this.$scroll.animate({
        scrollTop  : y,
        scrollLeft : x
      }, speed, ()=>{
        this.state.scroll = false;
        def.resolve();
      });
    }
    return def.promise();
  }
  /**
  * @param {} target
  * @param {Number}   speed
  */
  focus($target, offset, speed){
    let def         = new this.Deferred();
    let frame       = 60;
    let FPS         = 1000 / frame;
    let currentTime = 0;
    let cssVal      = [];
    this.setFocusTargetRect($target, offset);
    this.setFocusDisplayRect();
    this.focusStartRect = this.bgCanvas.clearRect.map((val)=>{return val});
    
    this.state.focus = true;
    this.focusTimer = setInterval(()=>{
      cssVal = [];
      cssVal[0] = this.moving(currentTime, this.focusStartRect[0], this.focusTargetRect[0], speed);
      cssVal[1] = this.moving(currentTime, this.focusStartRect[1], this.focusTargetRect[1], speed);
      cssVal[2] = this.moving(currentTime, this.focusStartRect[2], this.focusTargetRect[2], speed);
      cssVal[3] = this.moving(currentTime, this.focusStartRect[3], this.focusTargetRect[3], speed);
      this.bgCanvas.clearRect = cssVal;
      this.bgCanvas.draw();
      currentTime += FPS;
      if(currentTime >= speed){
        clearInterval(this.focusTimer);
        this.bgCanvas.clearRect = this.focusTargetRect.map((val)=>{return val});
        this.bgCanvas.draw();
        this.state.focus = false;
        def.resolve();
      }
    }, FPS);

    return def.promise();
  }
  /**
  *
  */
  setFocusTargetRect($target, offset){
    if(!this.bgCanvas) return this;
    this.focusTargetRect = [];
    let scrollX = this.$scroll.scrollLeft();
    let scrollY = this.$scroll.scrollTop();

    let left    = $target.offset().left;
    let top     = $target.offset().top;
    let offsetX = left - scrollX;
    let offsetY = top  - scrollY;
    this.focusTargetRect = [
      offsetX - offset[0],
      offsetY - offset[1],
      $target.innerWidth() + offset[0] * 2,
      $target.innerHeight() + offset[1] * 2
    ];
    return this;
  }
  /**
  *
  */
  setFocusDisplayRect(){
    if(!this.bgCanvas) return this;
    let displayRect = this.bgCanvas.clearRect;
    if(!displayRect){
      displayRect    = [];
      displayRect[0] = this.focusTargetRect[0] + this.focusTargetRect[2] / 2;
      displayRect[1] = this.focusTargetRect[1] + this.focusTargetRect[3] / 2;
      displayRect[2] = 0;
      displayRect[3] = 0;
    }
    this.bgCanvas.clearRect = displayRect;
    return this;
  }
  /**
  *
  */
  unfocus(target, speed){
    // return this.focus(target, speed);
  }
  /**
  * @param {String[] | number[]} orderPos
  * @param {jQuery}              $target
  */
  tooltipPosFit(orderPos, $target, $parent, speed){
    let def = new this.Deferred();
    let w   = $target.innerWidth();
    let h   = $target.innerHeight();
    // IE9 can't use transform property.
    let orderX  = orderPos[0];
    let orderY  = orderPos[1];
    let left    = null;
    let marginX = null;
    let top     = null;
    let marginY = null;
    let count   = 0;
    if(orderX === 'left'){
      left    = '-50%';
      marginX = 0;
    }else if(orderX === 'center' || orderX === 'middle'){
      left    = 0;
      marginX = w / -2;
    }else if(orderX === 'right'){
      left    = '50%';
      marginX = w * -1;
    }
    if(orderY === 'top'){
      top     = 0;
      marginY = 0;
    }else if(orderY === 'center' || orderY === 'middle'){
      top     = '50%';
      marginY = h / -2;
    }else if('bottom'){
        top     = '100%';
        marginY = h * -1;
    }
    $target.animate({
      'left'        : left,
      'margin-top'  : marginY,
      'margin-left' : marginX
    }, speed, ()=>{
      count++;
      if(count === 2) def.resolve();
    });
    $parent.animate({
      'top' : top
    }, speed, ()=>{
      count++;
      if(count === 2) def.resolve();
    });
    return def.promise();
  }
}
