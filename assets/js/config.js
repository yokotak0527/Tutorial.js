let __first           = true;

let __conf            = Object.create(null);
__conf.mode           = 'focus'; // focus | arrow
__conf.resizeInterval = 250;
__conf.scrollSpeed    = 500;
__conf.fadeinSpeed    = 500;
__conf.fadeoutSpeed   = 500;
__conf.animationFPS   = 60;
__conf.skipLabel      = 'Skip';
__conf.prevLabel      = 'Prev';
__conf.nextLabel      = 'Next';
__conf.endLabel       = 'End';
__conf.$              = $;
__conf.$window        = null;
__conf.$parent        = null;
__conf.$scroll        = null;
__conf.zIndex         = 9000;
__conf.focusBGColor   = 'rgba(0, 0, 0, 0.5)';
__conf.template       = ()=> `
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
__conf.defaultEventConf = [
  ['resize',           false],
  ['scroll',           false],
  ['beforeAddStep',    false],
  ['afterAddStep',     false],
  ['beforeRemoveStep', false],
  ['afterRemoveStep',  false],
  ['beforeChangeStep', false],
  ['afterChangeStep',  false],
  ['beforeShow',       false],
  ['afterShow',        false],
  ['beforeNext',       false],
  ['afterNext',        false],
  ['beforePrev',       false],
  ['afterPrev',        false],
  ['beforeHide',       false],
  ['afterHide',        false],
  ['beforeDestory',    false],
  ['afterDestory',     false],
  ['beforeSkip',       false],
  ['afterSkip',        false]
];
__conf.Deferred = SimpleDeferred;
Object.seal(__conf);
