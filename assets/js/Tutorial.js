/**
* @class Tutorial
* @param {Object}          [param]                   - Behavior of Tutorial.js parameter.
* @param {Boolean}         [param.skip = true]       - use skip button.
* @param {String | Number} [param.startStep = true]
* @param {Boolean}         [param.roop = false]
* @param {Boolean}         [param.pager = true]      - use pager.
* @param {Boolean}         [param.controller = true] - use controller.
* @param {Object[]}        [param.step]
* @return Tutorial
*/
class Tutorial{
  constructor(param = {}){
    let conf      = __conf;
    let $         = conf.$;
    let _         = Object.create(null);
    _.emit        = (msg)=> this.mediator.offer(this, 'emit', msg);
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
    this.step       = new Step(this, param.step || false, $);

    if(__first) __first = false;
  }
  /**
  *
  * Change overall behavior of Tutorial.js.  
  * **You are able to use it, As far as Tutorial.js instance is not exist.**
  *
  * | Key              | Type              | Default val.         |
  * |------------------|-------------------|----------------------|
  * | resizeInterval   | Number            | 250                  |
  * | scrollInterval   | Number            | 100                  |
  * | showSpeed        | Number            | 300                  |
  * | hideSpeed        | Number            | 300                  |
  * | scrollSpeed      | Number            | 500                  |
  * | posFitSpeed      | Number            | 300                  |
  * | animation        | Boolean / Object  | Object               |
  * | animation.show   | Boolean           | true                 |
  * | animation.hide   | Boolean           | true                 |
  * | animation.scroll | Boolean           | true                 |
  * | animation.posFit | Boolean           | true                 |
  * | skipLabel        | String            | 'Skip'               |
  * | prevLabel        | String            | 'Prev'               |
  * | nextLabel        | String            | 'Next'               |
  * | endLabel         | String            | 'End'                |
  * | $                | jQuery            | $                    |
  * | $window          | jQuery            | $(window)            |
  * | $parent          | jQuery            | $('body')            |
  * | $scroll          | jQuery            | $('body')            |
  * | zIndex           | Number            | 9000                 |
  * | bgColor          | String            | 'rgba(0, 0, 0, 0.5)' |
  * | theme            | String            | 'default'            |
  *
  * @function changeConfig
  * @memberof Tutorial
  * @static
  *
  * @param    {(String|Object[])} name
  * @param    {String}            name.name
  * @param    {*}                 name.val
  * @param    {*}                 [val]
  */
  static changeConfig(key, val){
    if(!__first) return false;
    let confArr = Array.isArray(key) ? key : [{'key' : key, 'val' : val}];
    confArr.forEach( obj => __conf[obj.key] = obj.val );
  }
  /**
  * @function next
  * @memberof Tutorial
  * @instance
  */
  next(){
    let newPointer = this.pointer + 1;
    if(this.fire) return false;
    if(this.roop && newPointer >= this.step.length) newPointer = 0;
    if(newPointer >= this.step.length) return false;
    let promise = this.mediator.offer(this, 'next', newPointer);
    promise.then(()=>{
      this.pointer = newPointer;
    });
  }
  /**
  * @function prev
  * @memberof Tutorial
  * @instance
  */
  prev(){
    let newPointer = this.pointer - 1;
    if(this.fire) return false;
    if(this.roop && this.pointer - 1 < 0) newPointer = this.step.length - 1;
    if(newPointer < 0) return false;
    let promise = this.mediator.offer(this, 'prev', newPointer);
    promise.then(()=>{
      this.pointer = newPointer;
    });
  }
  /**
  *
  * @function skip
  * @memberof Tutorial
  * @instance
  */
  skip(){
    let promise = this.mediator.offer(this, 'skip');
  }
  /**
  *
  * @function end
  * @memberof Tutorial
  * @instance
  */
  end(){
    this.hide();
  }
  /**
  * Show tutorial step.
  *
  * @function show
  * @memberof Tutorial
  * @instance
  *
  * @param {String | Number} [order]
  */
  show(order = -1){
    order        = typeof order === 'string' ? this.step.indexByName(order) : order;
    order        = !this.step.list[order] ? this.pointer : order;
    this.fire    = true;
    this.pointer = order;

    // 内容の切り替えはメディエータに任せる。
    let promise = this.mediator.offer(this, 'show', this.step.list[order]);
    let def     = new this.Deferred();
    promise.then(()=>{
      this.fire = false;
      def.resolve();
    },()=>{
      def.reject();
    });
    return def.promise();
  }
  /**
  * @function hide
  * @memberof Tutorial
  * @instance
  */
  hide(){
    this.fire   = true;
    let def     = new this.Deferred();
    let promise = this.mediator.offer(this, 'hide');
    promise.then(()=>{
      this.fire = false;
      def.resolve();
    },()=>{
      def.reject();
    });
    return def.promise();
  }
  /**
  * @function destroy
  * @memberof Tutorial
  * @instance
  */
  destroy(){
    // let promise = this.mediator.offer(this, 'show');
  }
}
