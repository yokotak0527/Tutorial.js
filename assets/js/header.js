"use strict";
{
  let privateMap = new WeakMap();
  // ===========================================================================
  let first           = true;
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
  conf.template       = ()=> `
<div class="tutorial">
 <div class="content-wrap">
   <ol class="pager"></ol>
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
  // ===========================================================================
  // called when first instance.
  let setup = function(){
    if(conf.$parent === null) conf.$parent = $('body');
    if(conf.$scroll === null) conf.$scroll = $('body');
    conf.$parent.append(conf.template());
    first = false;
  };
  class Tutorial{
