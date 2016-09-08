class Tutorial{
  /**
  * Tutorial全体の動作を変更する。Tutorialのインスタンスを作成する前のみ可能
  *
  * @param {(String|Object[])} name
  * @param {String}            name.name
  * @param {*}                 name.val
  * @param {*}                 [val]
  */
  static changeConfig(key, val){
    if(!__first) return false;
    let confArr = Array.isArray(key) ? key : [{'key' : key, 'val' : val}];
    confArr.forEach( obj => __conf[obj.key] = obj.val );
  }
  /*
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
  * @return Tutorial
  */
  constructor(param = {}){
    let conf      = __conf;
    let $         = conf.$;
    let _         = Object.create(null);
    __private.set(this, _);
    // let animationKind = ['fadeInOut', 'scroll'];
    this.mediator = new TutorialMediator(this, conf);
    this.step     = new Step(param.step || false);
    this.fire     = false;
    this.pointer  = param.startStep ? param.startStep : 0;
    this.roop     = typeof param.roop === 'boolean' ? param.roop : false;
    this.Deferred = conf.Deferred;

    if(__first) __first = false;
  }
  /*
  *
  */
  next(){
    if(this.fire) return false;
    let promise = this.mediator.appeal(this, 'next');
  }
  /*
  *
  */
  prev(){
    if(this.fire) return false;
    let promise = this.mediator.appeal(this, 'prev');
  }
  /*
  *
  */
  skip(){
    let promise = this.mediator.appeal(this, 'prev');
  }
  /*
  *
  */
  end(){
    let promise = this.mediator.appeal(this, 'prev');
  }
  /*
  * @param  {String} order
  * @return {SimplePromise}
  */
  show(order){
    if(this.fire) return false;
    this.fire   = true;
    let promise = this.mediator.appeal(this, 'show');
    let def     = new this.Deferred();
    promise.then(()=>{
    });
    return def.promise();
  }
  /*
  * @return {SimplePromise}
  */
  hide(){
    if(!this.fire) return false;
    let promise = this.mediator.appeal(this, 'hide');
    let def = new this.Deferred();
    return def.promise();
  }
  /*
  *
  */
  destroy(){
    // let promise = this.mediator.appeal(this, 'show');
  }
}
