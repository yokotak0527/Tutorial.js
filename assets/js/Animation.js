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
  constructor($, Deferred){
    if(Animation.instance) return Animation.instance;
    this.$        = $;
    this.Deferred = Deferred;
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
  scroll(){

  }
}
