let __first           = true;

let __conf              = Object.create(null);
__conf.mode             = 'focus'; // focus | arrow
__conf.resizeInterval   = 250;
__conf.scrollInterval   = 100;
__conf.scrollSpeed      = 500;
__conf.showSpeed        = 1000;
__conf.hideSpeed        = 500;
__conf.animation        = Object.create(null);
__conf.animation.show   = true;
__conf.animation.hide   = true;
__conf.animation.scroll = true;
__conf.animationFPS     = 60;
__conf.skipLabel        = 'Skip';
__conf.prevLabel        = 'Prev';
__conf.nextLabel        = 'Next';
__conf.endLabel         = 'End';
__conf.$                = $;
__conf.$window          = null;
__conf.$parent          = null;
__conf.$scroll          = null;
__conf.zIndex           = 9000;
__conf.bgColor          = 'rgba(0, 0, 0, 0.5)';
__conf.template         = ()=> `
<div class="tutorial">
<div class="content-wrap center-middle">
 <ol class="pager">
  <li><span class="active">1</span></li>
  <li><span>2</span></li>
  <li><span>3</span></li>
  <li><span>4</span></li>
  <li><span>5</span></li>
 </ol>
 <div class="content"></div>
 <div class="controller">
   <ul class="left">
     <li class="skip"><span>${__conf.skipLabel}</span></li>
   </ul>
   <ul class="right">
     <li class="prev"><span>${__conf.prevLabel}</span></li>
     <li class="next"><span>${__conf.nextLabel}</span></li>
     <li class="end"><span>${__conf.endLabel}</span></li>
   </ul>
 </div>
</div>
<div class="bg"></div>
</div>
`;
__conf.defaultEventConf = [];
__conf.defaultEventConf.push(['resize', {
  'func' : (conf)=>{
    return {
      'width'  : conf.$window.innerWidth(),
      'height' : conf.$window.innerHeight()
    };
  },
  'ags' : __conf
}]);
__conf.defaultEventConf.push(['scroll',           false]);
__conf.defaultEventConf.push(['beforeAddStep',    false]);
__conf.defaultEventConf.push(['afterAddStep',     false]);
__conf.defaultEventConf.push(['beforeRemoveStep', false]);
__conf.defaultEventConf.push(['afterRemoveStep',  false]);
__conf.defaultEventConf.push(['beforeChangeStep', false]);
__conf.defaultEventConf.push(['afterChangeStep',  false]);
__conf.defaultEventConf.push(['beforeShow',       false]);
__conf.defaultEventConf.push(['afterShow',        false]);
__conf.defaultEventConf.push(['beforeNext',       false]);
__conf.defaultEventConf.push(['afterNext',        false]);
__conf.defaultEventConf.push(['beforePrev',       false]);
__conf.defaultEventConf.push(['afterPrev',        false]);
__conf.defaultEventConf.push(['beforeHide',       false]);
__conf.defaultEventConf.push(['afterHide',        false]);
__conf.defaultEventConf.push(['beforeDestory',    false]);
__conf.defaultEventConf.push(['afterDestory',     false]);
__conf.defaultEventConf.push(['beforeSkip',       false]);
__conf.defaultEventConf.push(['afterSkip',        false]);
__conf.Deferred             = SimpleDeferred;
__conf.DOMController        = DOMController;
__conf.CustomEvent          = CustomEvent;
__conf.CustomEventContainer = CustomEventContainer;
__conf.Animation            = Animation;
__conf.BGCanvas             = BGCanvas;
Object.seal(__conf);
