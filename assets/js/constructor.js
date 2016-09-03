/**
* @constructor Tutorial
*
* @param {Object}          [param]                   - Tutorial instance setting parameter
* @param {Boolean}         [param.auto = false]      - auto start.
* @param {Boolean}         [param.skip = true]       - use skip button.
* @param {String | Number} [param.startStep = true]
* @param {Boolean}         [roop = false]
* @param {Boolean}         [param.pager = true]      - use pager.
* @param {Boolean}         [param.controller = true] - use controller.
* @param {Object[]}        [param.step]
*
* @return Tutorial
*/
constructor(param = {}){
  let conf            = __conf;
  let $               = conf.$;
  let instanceMed     = new InstanceMediator();
  // set default global events
  if(__first){
    let events = [];
    conf.defaultEventConf.forEach((val)=>{
      let name        = val[0];
      let triggerHook = val[1];
      events.push(new CustomEvent(name, triggerHook));
    });
    new EventContainer('global', events);
  }
  let globalEvent = EventContainer.getInstance('global');

  // ---------------------------------------------------------------------------
  // set instance member.
  this.id = 'tutorial-'+__TutorialID;

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
  if(param.step){
    this.addStep(param.step);
    _.pointer = param.startStep ? typeof param.startStep === 'string' ? this.name2index(param.startStep) : param.startStep : 0;
  }

  let events = [];
  conf.defaultEventConf.forEach((val)=>{
    let name        = val[0];
    let triggerHook = val[1];
    events.push(new CustomEvent(name, triggerHook));
  });
  _.event = new EventContainer(this.id, events);
  _.event.addRelation(globalEvent, ['resize', 'scroll']);

  __privateMap.set(this, _);

  // ---------------------------------------------------------------------------
  // make DOM
  if(__first){
    if(conf.$window === null) conf.$window = $(window);
    if(conf.$parent === null) conf.$parent = $('body');
    if(conf.$scroll === null) conf.$scroll = $('body');

    let domCtrl = new DOMController({
      '$'         : $,
      '$window'   : conf.$window,
      '$template' : $(conf.template()),
      'zIndex'    : conf.zIndex,
      '$parent'   : conf.$parent
    });

    if(conf.mode === 'focus') domCtrl.addMode('focus', conf.focusBGColor, conf.resizeInterval);

    // console.log(domCtrl.get$obj('bg'));

    __first = false;
  }
//     let domCtrl = new DOMController({
//       '$'         : $,
//       '$window'   : conf.$window,
//       '$template' : $(conf.template()),
//       'zIndex'    : conf.zIndex,
//       '$parent'   : conf.$parent
//     });
//
//     if(conf.mode === 'focus') domCtrl.addMode('focus', conf.focusBGColor, conf.resizeInterval);
//
//
//     // add resize event.
//     let resizeTimer = null;
//     conf.$window.on('resize', (e)=>{
//       if(resizeTimer) clearTimeout(resizeTimer);
//       resizeTimer = setTimeout(()=>{
//         let w        = conf.$window.innerWidth();
//         let h        = conf.$window.innerHeight();
//         let listener = __listener['resize'];
//         for(let instance in listener){
//           let self = __instanceList[instance];
//           for(let key in listener[instance]){
//             listener[instance][key].call(self, e, {w:w, h:h});
//           }
//         }
//       }, conf.resizeInterval);
//     });
//
//     //// add click skip btn event.
//     //$('.controller .skip span', $cnt).on('click', (e)=>{
//     //  if(__activeInstance) __activeInstance.skip();
//     //});
// //
//     //// add click prev btn event.
//     //$('.controller .prev span', $cnt).on('click', (e)=>{
//     //  if(__activeInstance) __activeInstance.prev();
//     //});
// //
//     //// add click next btn event.
//     //$('.controller .next span', $cnt).on('click', (e)=>{
//     //    if(__activeInstance) __activeInstance.next();
//     //});
// //
//     //// add click end btn event.
//     //$('.controller .end span', $cnt).on('click', (e)=>{
//     //  if(__activeInstance) __activeInstance.end();
//     //});
//
  __TutorialID++;
}
