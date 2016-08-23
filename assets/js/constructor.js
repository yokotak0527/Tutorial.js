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
  if(__first){
    if(conf.$window === null) conf.$window = $(window);
    if(conf.$parent === null) conf.$parent = $('body');
    if(conf.$scroll === null) conf.$scroll = $('body');
    let $cnt = $(conf.template());
    $cnt.css('z-index', conf.zIndex);
    conf.$parent.append($cnt);
    // add resize events =======================================================
    let resizeTimer  = null;
    conf.$window.on('resize', (e)=>{
      if(resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(()=>{
        let w = conf.$window.innerWidth();
        let h = conf.$window.innerHeight();
        let listener = __listener['resize'];
        for(let instance in listener){
          let self = __instanceList[instance];
          for(let key in listener[instance]){
            listener[instance][key].call(self, e, {w:w, h:h});
          }
        }
      }, conf.resizeInterval);
    });
    __first = false;
  }
  // private member ============================================================
  let _  = Object.create(null);
  _.step          = [];
  _.active        = false;
  _.num           = 0; // step num
  _.pointer       = param.startStep ? param.startStep : 0;
  _.animation     = typeof param.animation === 'boolean' ? param.animation : true;
  _.roop          = typeof param.roop === 'boolean' ? param.roop : false;
  _.listener      = Object.create(null);
  Object.keys(__listener).forEach((val, i)=> _.listener[val] = Object.create(null) );
  Object.seal(_.listener);
  // @stepNum       = 0     # stepの総数
  // @stepPointer   = 0     # 現在のステップの位置
  // @stepIsActive  = false # ステップが表示されているか

  // class member ==============================================================
  this.id = __TutorialID;
  // ===========================================================================
  __TutorialID++;
  // make private properties
  __instanceList['instance-'+this.id] = this;
  __privateMap.set(this, _);


  __addEventListenerRelation.call(this);
  // __removeEventListenerRelation.call(this);
  __adjustStepNum.call(this);
  if(param.step) this.addStep(param.step);
}
