let __first           = true;

let __conf               = Object.create(null);
__conf.mode              = 'focus'; // focus | arrow
// __conf.resizeInterval    = 250;
__conf.resizeInterval    = 0;
__conf.scrollInterval    = 0;
__conf.minSpeed          = 10;
__conf.scrollSpeed       = 500;
__conf.showSpeed         = 375;
__conf.hideSpeed         = 375;
__conf.posFitSpeed       = 300;
// __conf.focusSpeed        = 375;
__conf.focusSpeed        = 300;
__conf.unfocusSpeed      = 300;
__conf.theme             = 'default';
__conf.animation         = Object.create(null);
__conf.animation.show    = true;
__conf.animation.hide    = true;
__conf.animation.scroll  = true;
__conf.animation.posFit  = true;
__conf.animation.focus   = true;
__conf.animation.unfocus = true;
__conf.skipLabel         = 'Skip';
__conf.prevLabel         = 'Prev';
__conf.nextLabel         = 'Next';
__conf.endLabel          = 'End';
__conf.$                 = $;
__conf.$window           = null;
__conf.$parent           = null;
__conf.$scroll           = null;
__conf.zIndex            = 9000;
__conf.bgColor           = 'rgba(0, 0, 0, 0.5)';
__conf.template          = ()=> `
<div class="tutorial">
  <div class="pos-fit"><div class="content-wrap center-middle">
    <ol class="pager"></ol>
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
  </div></div>
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
