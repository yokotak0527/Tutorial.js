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
    _.emit        = (msg)=> this.mediator.appeal(this, 'emit', msg);
    __private.set(this, _);

    this.mediator   = new TutorialMediator(this, conf);
    this.domCtrl    = this.mediator.domCtrl;
    this.fire       = false;
    this.pointer    = param.startStep ? param.startStep : 0;
    this.Deferred   = conf.Deferred;
    this.roop       = typeof param.roop       === 'boolean' ? param.roop       : false;
    this.pager      = typeof param.pager      === 'boolean' ? param.pager      : true;
    this.controller = typeof param.controller === 'boolean' ? param.controller : true;
    this.skip       = typeof param.skip       === 'boolean' ? param.skip       : true;
    this.step       = new Step(this, param.step || false);

    if(__first) __first = false;
  }
  /*
  *
  */
  next(){
    if(this.fire) return false;
    let promise = this.mediator.appeal(this, 'next');
    // this.pointer
  }
  /*
  *
  */
  prev(){
    if(this.fire) return false;
    let promise = this.mediator.appeal(this, 'prev');
    // this.pointer
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
  show(order = -1){
    order        = typeof order === 'string' ? this.step.indexByName(order) : order;
    order        = !this.step.list[order] ? this.pointer : order;
    this.fire    = true;
    this.pointer = order;

    // 内容の切り替えはメディエータに任せる。
    let promise = this.mediator.appeal(this, 'show', this.step.list[order]);
    let def     = new this.Deferred();
    promise.then(()=>{
      this.fire = false;
      def.resolve();
    });
    return def.promise();
  }
  /*
  * @return {SimplePromise}
  */
  hide(){
    // if(!this.fire) return false;
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
