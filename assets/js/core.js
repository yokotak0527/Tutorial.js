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
      _.step    = [];
      _.active  = false;
      // @stepNum       = 0     # stepの総数
      // @stepPointer   = 0     # 現在のステップの位置
      // @stepIsActive  = false # ステップが表示されているか
      this.id = TutorialID;
      TutorialID++;
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
      let steps = Array.isArray(step) ? step : [step];
      let _     = privateMap.get(this);
      steps.forEach( obj => _.step.push(obj) );
      adjustStepNum.call(this);
      return this;
    }
    // =========================================================================
    /**
    * @function remove
    *
    * @memberof Tutorial
    * @instance
    */
    remove(order){
      let _ = privateMap.get(this);
      order = typeof order === 'string' ? this.name2index(order) : order;
      console.log(order);

      adjustStepNum.call(this);
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
