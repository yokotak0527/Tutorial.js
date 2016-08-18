    // =========================================================================
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
    constructor(param){
      if(first) setup.call(this);
      let _  = Object.create(null);
      _.step = [];
      // make private properties
      privateMap.set(this, _);
    }
    // =========================================================================
    /**
    * @function Tutorial.changeConfig
    *
    * @desc  change Tutorial.js configuration.
    * @param {(String|Object[])} name
    * @param {String}            name.name
    * @param {*}                 name.val
    * @param {*}                 [val]
    */
    static changeConfig(key, val){
      let confArr = Array.isArray(key) ? key : [{'key' : key, 'val' : val}];
      confArr.forEach( obj => conf[obj.key] = obj.val );
    }
    // =========================================================================
    /**
    * @function add
    *
    * @memberof Tutorial
    * @instance
    * @param    {Object | Object[]} step
    */
    add(step){
      //let steps = Array.isArray(step) ? step : [step];
      //steps.forEach( obj =>{
      //    console.log(a);
      //  }
      //);
      //return this;

      // if !newStep || (@helper.isArray(newStep) and !newStep.length)
      //     _errorMsg('1')
      //     return
      // # ----------------------------------------------------------------------
      // # オブジェクトが渡された場合、配列に突っ込む
      // if @helper.isObject(newStep) then newStep = [newStep]
      // for val in newStep then @step.push(val)
      // # ステップ数の設定
      // @resetStepNum(@)
      //
      // # イベント発火
      // @eventTrigger('addStep')
    }
    /**
    *
    */
    remove(step){

    }
    /**
    *
    */
    change(step){

    }

    /**
    *
    */
    next(step){}
    /**
    *
    */
    prev(step){}
    /**
    *
    */
    show(step){}
    /**
    *
    */
    hide(step){}
    /**
    *
    */
    destory(tutorial){}
