"use strict";
{
  let privateMap = new WeakMap();
  // ===========================================================================
  let first           = true;
  let TutorialID      = 0;
  let conf            = Object.create(null);
  conf.mode           = 'focus'; // focus | arrow
  conf.resizeInterval = 250;
  conf.scrollSpeed    = 500;
  conf.skipLabel      = 'Skip';
  conf.prevLabel      = 'Prev';
  conf.nextLabel      = 'Next';
  conf.endLabel       = 'End';
  conf.$parent        = null;
  conf.$scroll        = null;
  conf.zIndex         = 9000;
  conf.template       = ()=> `
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
       <li class="skip"><span>${conf.skipLabel}</span></li>
     </ul>
     <ul class="right">
       <li class="prev"><span>${conf.prevLabel}</span></li>
       <li class="next"><span>${conf.nextLabel}</span></li>
       <li class="end"><span>${conf.endLabel}</span></li>
     </ul>
   </div>
 </div>
 <div class="bg"></div>
</div>
`;
  Object.seal(conf);
  // ================================================================================
  // called when first instance.
  let setup = function(){
    if(conf.$parent === null) conf.$parent = $('body');
    if(conf.$scroll === null) conf.$scroll = $('body');
    let $cnt = $(conf.template());
    $cnt.css('z-index', conf.zIndex);
    conf.$parent.append($cnt);
    first = false;
  };
  // ================================================================================
  let adjustStepNum = function(){
    let _ = privateMap.get(this);
    _.num = _.step.length;
  }
  class Tutorial{
