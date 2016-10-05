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
    this.$        = tm.$;
    this.$window  = tm.$window;
    this.$scroll  = tm.$scroll;
    this.Deferred = tm.Deferred;
    this.bgCanvas = param.bgCanvas;
    if(this.bgCanvas){
      // [0] x / [1] y / [2] width / [3] height
      // this.focusRect  = [];
      // this.targetRect = [];
    }
  }
  /*
  * @param {jQuery} $target
  * @param {Number} speed
  */
  show($target, speed){
    let def = new this.Deferred();
    $target.stop().css('display', 'block').animate({
      'opacity' : 1
    }, speed, ()=> def.resolve());
    return def.promise();
  }
  /**
  *
  */
  hide($target, speed){
    let def = new this.Deferred();
    $target.stop().animate({
      'opacity' : 0
    }, speed, ()=>{
      $target.css('display', 'none');
      def.resolve();
    });
    return def.promise();
  }
  /**
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
      this.$scroll.animate({
        scrollTop  : y,
        scrollLeft : x
      }, speed, ()=> def.resolve() );
    }
    return def.promise();
  }
  /**
  * @param {} target
  * @param {Number}   speed
  */
  focus(target, speed){
    this.focusTargetRectArr = [];
    let def     = new this.Deferred();
    let scrollX = this.$scroll.scrollLeft();
    let scrollY = this.$scroll.scrollTop();
    target.forEach((val, i)=>{
      let rect    = [];
      let left    = $(val).offset().left;
      let top     = $(val).offset().top;
      let offsetX = left - scrollX;
      let offsetY = top - scrollY;
      rect[0] = offsetX;
      rect[1] = offsetY;
      rect[2] = $(val).innerWidth();
      rect[3] = $(val).innerHeight();
      if(rect[0] + rect[2] > 0 && rect[1] + rect[3] > 0) this.focusTargetRectArr.push(rect);
    });

    // Animation
    console.log(this.focusTargetRectArr);
    // this.bgCanvas.draw(this.targetRect);
    // setTimeout(()=>{
    //   def.resolve();
    // }, 10);

    return def.promise();
  }
  /**
  *
  */
  unfocus(){
    
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
