/**
* @constructor Tutorial
*
* @param  {Object}   [param]                   - Tutorial instance setting parameter
* @param  {Boolean}  [param.auto  = false]     - auto start.
* @param  {Boolean}  [param.skip  = true]      - use skip button.
* @param  {Boolean}  [param.pager = true]      - use pager.
* @param  {Boolean}  [param.controller = true] - use controller.
* @param  {Object[]} [param.step]
*
* @return Tutorial
*/
constructor(param = {}){
  let conf = __conf;
  let $    = conf.$;
  // ---------------------------------------------------------------------------
  // set private member.
  let _       = Object.create(null);
  _.step      = [];
  _.active    = false;
  _.fire      = false;
  _.num       = 0;
  _.pointer   = param.startStep ? param.startStep : 0;
  _.animation = typeof param.animation === 'boolean' ? param.animation : true;
  _.roop      = typeof param.roop === 'boolean' ? param.roop : false;
  _.pointer   = param.startStep ? typeof param.startStep === 'string' ? this.name2index(param.startStep) : param.startStep : 0;
  _.listener  = Object.create(null);
  Object.keys(__listener).forEach((val, i)=> _.listener[val] = Object.create(null) );
  Object.seal(_.listener);
  __privateMap.set(this, _);

  // ---------------------------------------------------------------------------
  // set instance member.
  this.id = __TutorialID;

  __instanceList['instance-'+this.id] = this.id;

  // ---------------------------------------------------------------------------
  // set event relation.
  __addEventListenerRelation.call(this);
  __adjustStepNum.call(this);

  // if first instance
  if(__first){

    if(conf.$window === null) conf.$window = $(window);
    if(conf.$parent === null) conf.$parent = $('body');
    if(conf.$scroll === null) conf.$scroll = $('body');

    // add HTML
    let $cnt = $(conf.template());
    $cnt.css('z-index', conf.zIndex);
    $('.content-wrap', $cnt).css('z-index', conf.zIndex+2);
    $('.bg', $cnt).css('z-index', conf.zIndex+1);
    conf.$parent.append($cnt);
    __$content = $('.content' ,$cnt);
    if(conf.mode === 'focus'){
      $cnt.addClass('focus');
      __canvasBGSetup($('.bg', $cnt));
    }

    // add resize event.
    let resizeTimer = null;
    conf.$window.on('resize', (e)=>{
      if(resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=>{
        let w        = conf.$window.innerWidth();
        let h        = conf.$window.innerHeight();
        let listener = __listener['resize'];
        for(let instance in listener){
          let self = __instanceList[instance];
          for(let key in listener[instance]){
            listener[instance][key].call(self, e, {w:w, h:h});
          }
        }
      }, conf.resizeInterval);
    });

    // add click skip btn event.
    $('.controller .skip span', $cnt).on('click', (e)=>{
      if(__activeInstance) __activeInstance.skip();
    });

    // add click prev btn event.
    $('.controller .prev span', $cnt).on('click', (e)=>{
      if(__activeInstance) __activeInstance.prev();
    });

    // add click next btn event.
    $('.controller .next span', $cnt).on('click', (e)=>{
        if(__activeInstance) __activeInstance.next();
    });

    // add click end btn event.
    $('.controller .end span', $cnt).on('click', (e)=>{
      if(__activeInstance) __activeInstance.end();
    });

    __first = false;
  }
  // if param has step property. set step to private member
  if(param.step) this.addStep(param.step);
  __TutorialID++;
}
