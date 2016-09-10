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
  *
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
  hide(){
    let def = new this.Deferred();
    return def.promise();
  }
}
