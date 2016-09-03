let __animate = Object.create(null);


__animate.show = (step, deferred, time = -1)=>{
  let _       = __privateMap.get(this);
  let conf    = __conf;
  let $       = conf.$;
  let $window = conf.$window;
  time        = time < 0 ? __conf.fadeinSpeed : time;

  __$tutorial.css('display', '');
  __$tutorial.animate({
    'opacity' : 1
  }, time, ()=>deferred.resolve() );

  // 250mm

  //let $cnt = __$content;
  deferred.resolve();
}

__animate.hide = ()=>{

}
__animate.move = ()=>{

}
