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
    this.$        = param.$;
    this.$window  = param.$window;
    this.$scroll  = param.$scroll;
    this.Deferred = param.Deferred;
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
  /*
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
  /*
  *
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
}
