"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var __private = new WeakMap();

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

    var Tutorial = function () {
      function Tutorial() {
        var _this = this;

        var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Tutorial);

        var conf = __conf;
        var $ = conf.$;
        var _ = Object.create(null);
        _.emit = function (msg) {
          return _this.mediator.offer(_this, 'emit', msg);
        };
        __private.set(this, _);

        this.mediator = new TutorialMediator(this, conf);
        this.domCtrl = this.mediator.domCtrl;
        this.fire = false;
        this.pointer = param.startStep ? param.startStep : 0;
        this.Deferred = conf.Deferred;
        this.roop = typeof param.roop === 'boolean' ? param.roop : false;
        this.pager = typeof param.pager === 'boolean' ? param.pager : true;
        this.controller = typeof param.controller === 'boolean' ? param.controller : true;
        this.skip = typeof param.skip === 'boolean' ? param.skip : true;
        this.step = new Step(this, param.step || false, $);

        if (__first) __first = false;
      }
      /**
      *
      * Change overall behavior of Tutorial.js.  
      * **You are able to use it, As far as Tutorial.js instance is not exist.**
      *
      * | Key               | Type              | Default val.         |
      * |-------------------|-------------------|----------------------|
      * | resizeInterval    | Number            | 250                  |
      * | scrollInterval    | Number            | 100                  |
      * | showSpeed         | Number            | 300                  |
      * | hideSpeed         | Number            | 300                  |
      * | scrollSpeed       | Number            | 500                  |
      * | posFitSpeed       | Number            | 300                  |
      * | focusSpeed        | Number            | 300                  |
      * | unfocusSpeed      | Number            | 300                  |
      * | animation         | Boolean / Object  | Object               |
      * | animation.show    | Boolean           | true                 |
      * | animation.hide    | Boolean           | true                 |
      * | animation.scroll  | Boolean           | true                 |
      * | animation.posFit  | Boolean           | true                 |
      * | animation.focus   | Boolean           | true                 |
      * | animation.unfocus | Boolean           | true                 |
      * | skipLabel         | String            | 'Skip'               |
      * | prevLabel         | String            | 'Prev'               |
      * | nextLabel         | String            | 'Next'               |
      * | endLabel          | String            | 'End'                |
      * | $                 | jQuery            | $                    |
      * | $window           | jQuery            | $(window)            |
      * | $parent           | jQuery            | $('body')            |
      * | $scroll           | jQuery            | $('body')            |
      * | zIndex            | Number            | 9000                 |
      * | bgColor           | String            | 'rgba(0, 0, 0, 0.5)' |
      * | theme             | String            | 'default'            |
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


      _createClass(Tutorial, [{
        key: 'next',

        /**
        * @function next
        * @memberof Tutorial
        * @instance
        */
        value: function next() {
          var _this2 = this;

          var newPointer = this.pointer + 1;
          if (this.fire) return false;
          if (this.roop && newPointer >= this.step.length) newPointer = 0;
          if (newPointer >= this.step.length) return false;
          var promise = this.mediator.offer(this, 'next', newPointer);
          promise.then(function () {
            _this2.pointer = newPointer;
          });
        }
        /**
        * @function prev
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'prev',
        value: function prev() {
          var _this3 = this;

          var newPointer = this.pointer - 1;
          if (this.fire) return false;
          if (this.roop && this.pointer - 1 < 0) newPointer = this.step.length - 1;
          if (newPointer < 0) return false;
          var promise = this.mediator.offer(this, 'prev', newPointer);
          promise.then(function () {
            _this3.pointer = newPointer;
          });
        }
        /**
        * @function skip
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'skip',
        value: function skip() {
          var promise = this.mediator.offer(this, 'skip');
        }
        /**
        * @function end
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'end',
        value: function end() {
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

      }, {
        key: 'show',
        value: function show() {
          var _this4 = this;

          var order = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;

          order = typeof order === 'string' ? this.step.indexByName(order) : order;
          order = !this.step.list[order] ? this.pointer : order;
          this.fire = true;
          this.pointer = order;

          // 内容の切り替えはメディエータに任せる。
          var promise = this.mediator.offer(this, 'show', this.step.list[order]);
          var def = new this.Deferred();
          promise.then(function () {
            _this4.fire = false;
            def.resolve();
          }, function () {
            def.reject();
          });
          return def.promise();
        }
        /**
        * @function hide
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'hide',
        value: function hide() {
          var _this5 = this;

          this.fire = true;
          var def = new this.Deferred();
          var promise = this.mediator.offer(this, 'hide');
          promise.then(function () {
            _this5.fire = false;
            def.resolve();
          }, function () {
            def.reject();
          });
          return def.promise();
        }
        /**
        * @function destroy
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'destroy',
        value: function destroy() {}
        // let promise = this.mediator.offer(this, 'show');

        /**
        * @function getActiveStep
        * @memberof Tutorial
        * @instance
        * 
        * @return   Step
        */

      }, {
        key: 'getActiveStep',
        value: function getActiveStep() {
          return this.step.list[this.pointer];
        }
        /**
        * @function getPointer
        * @memberof Tutorial
        * @instance
        *
        * @return   Number
        */

      }, {
        key: 'getPointer',
        value: function getPointer() {
          return this.pointer;
        }
        /**
        * @function getStepList
        * @memberof Tutorial
        * @instance
        *
        * @return Step[]
        */

      }, {
        key: 'getStepList',
        value: function getStepList() {
          return this.step.list;
        }
        /**
        * Return step length.
        * @function stepNumIs
        * @memberof Tutorial
        * @instance
        *
        * @return   Number
        */

      }, {
        key: 'stepNumIs',
        value: function stepNumIs() {
          return this.step.length;
        }
      }], [{
        key: 'changeConfig',
        value: function changeConfig(key, val) {
          if (!__first) return false;
          var confArr = Array.isArray(key) ? key : [{ 'key': key, 'val': val }];
          confArr.forEach(function (obj) {
            return __conf[obj.key] = obj.val;
          });
        }
      }]);

      return Tutorial;
    }();

    /**
    * @class  TutorialMediator
    * @param  {Tutorial} tutorial
    * @param  {Object}   conf      - configuration object.
    */


    var TutorialMediator = function () {
      function TutorialMediator(tutorial, conf) {
        _classCallCheck(this, TutorialMediator);

        var TM = TutorialMediator;
        var self = TM.instance ? TM.instance : this;
        tutorial.id = self.issuanceNewID();

        if (!TM.instance) {
          (function () {
            var events = [];
            conf.defaultEventConf.forEach(function (val) {
              var name = val[0];
              var triggerHook = val[1];
              events.push(new conf.CustomEvent(name, triggerHook));
            });
            self.eventCtnr = new CustomEventContainer('global', events);

            self.conf = conf;
            self.$ = conf.$;
            conf.$window = conf.$window || $(window);
            conf.$parent = conf.$parent || $('body');
            // [task] change scroll elm. when use IE9;
            conf.$scroll = conf.$scroll || $('body');
            self.$window = conf.$window;
            self.$parent = conf.$parent;
            self.$scroll = conf.$scroll;
            self.Deferred = conf.Deferred;

            var speed = Object.create(null);
            speed.show = self.conf.animation === true || self.conf.animation.show ? self.conf.showSpeed > self.conf.minSpeed ? self.conf.showSpeed : self.conf.minSpeed : self.conf.minSpeed;
            speed.scroll = self.conf.animation === true || self.conf.animation.scroll ? self.conf.scrollSpeed > self.conf.minSpeed ? self.conf.scrollSpeed : self.conf.minSpeed : self.conf.minSpeed;
            speed.posFit = self.conf.animation === true || self.conf.animation.posFit ? self.conf.posFitSpeed > self.conf.minSpeed ? self.conf.posFitSpeed : self.conf.minSpeed : self.conf.minSpeed;
            speed.focus = self.conf.animation === true || self.conf.animation.focus ? self.conf.focusSpeed > self.conf.minSpeed ? self.conf.focusSpeed : self.conf.minSpeed : self.conf.minSpeed;
            speed.unFocus = self.conf.animation === true || self.conf.animation.unfocus ? self.conf.unfocusSpeed > self.conf.minSpeed ? self.conf.unfocusSpeed : self.conf.minSpeed : self.conf.minSpeed;

            self.domCtlr = new conf.DOMController({
              '$template': self.$(conf.template()),
              'zIndex': conf.zIndex,
              'mode': conf.mode,
              'theme': conf.theme,
              'BGCanvas': conf.BGCanvas,
              'Animation': conf.Animation,
              'bgColor': conf.bgColor,
              'Deferred': conf.Deferred,
              'tutorialMediator': self,
              'speed': speed
            });
            self.animation = self.domCtlr.animation;

            // =======================================================================
            // resize event
            // =======================================================================
            var resizeInterval = conf.resizeInterval === 0 ? conf.resizeInterval : conf.resizeInterval ? conf.resizeInterval : 250;
            // let resizeInterval = conf.resizeInterval || 250;
            // if(!conf.resizeInterval) conf.resizeInterval
            var resizeTimer = null;
            self.$window.on('resize', function (e) {
              if (!self.active) return false;
              if (resizeInterval === 0) {
                self.eventCtnr.trigger('resize');
              } else {
                if (resizeTimer) clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () {
                  self.eventCtnr.trigger('resize');
                }, resizeInterval);
              }
            });
            // =======================================================================
            // scroll event
            // =======================================================================
            var scrollInterval = conf.scrollInterval === 0 ? conf.scrollInterval : conf.scrollInterval ? conf.scrollInterval : 250;
            var scrollTimer = null;
            self.$window.on('scroll', function (e) {
              if (!self.active) return false;
              if (scrollInterval === 0) {
                self.eventCtnr.trigger('scroll');
              } else {
                if (scrollTimer) clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                  self.eventCtnr.trigger('scroll');
                }, scrollInterval);
              }
            });

            self.active = false; /* active tutorial */
            self.list = Object.create(null);
            TM.instance = self;
          })();
        }

        self.list[tutorial.id] = tutorial;
        return self;
      }
      /**
      * 新しいIDを発行する
      *
      * @function issuanceNewID
      * @memberof TutorialMediator
      * @instance
      *
      * @return String
      */


      _createClass(TutorialMediator, [{
        key: 'issuanceNewID',
        value: function issuanceNewID() {
          var TM = TutorialMediator;
          var rtn = 'tutorial-' + TM.idNum;
          TM.idNum++;
          return rtn;
        }
        /**
        *
        * @function offer
        * @memberof TutorialMediator
        * @instance
        *
        * @param {Tutorial} tutorial
        * @param {String}   type
        * @param {*}        ops
        */

      }, {
        key: 'offer',
        value: function offer(tutorial, type, ops) {
          var _this6 = this;

          if (type === 'show') {
            var _ret3 = function () {
              var def = new _this6.Deferred();
              setTimeout(function () {
                return proposalOfShowing.call(_this6, tutorial, def, ops);
              }, 10);
              return {
                v: def.promise()
              };
            }();

            if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
          } else if (type === 'hide') {
            var _ret4 = function () {
              var def = new _this6.Deferred();
              // setTimeout(hideFunc.bind(this, def, tutorial), 10);
              setTimeout(function () {
                return proposalOfHiding.call(_this6, def, tutorial);
              }, 10);
              return {
                v: def.promise()
              };
            }();

            if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
          } else if (type === 'next') {
            var _ret5 = function () {
              var def = new _this6.Deferred();
              var newPointer = ops;
              var promise = tutorial.show(newPointer);
              promise.then(function () {
                return def.resolve();
              });
              return {
                v: def.promise()
              };
            }();

            if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
          } else if (type === 'prev') {
            var _ret6 = function () {
              var def = new _this6.Deferred();
              var newPointer = ops;
              var promise = tutorial.show(newPointer);
              promise.then(function () {
                return def.resolve();
              });
              return {
                v: def.promise()
              };
            }();

            if ((typeof _ret6 === 'undefined' ? 'undefined' : _typeof(_ret6)) === "object") return _ret6.v;
          } else if (type === 'emit') {
            var msg = ops;
            if (!this.hasActive() || tutorial !== this.active) return false;
            if (!msg.match(/^step/)) return false;
            this.domCtlr.pager(tutorial.step.length).pagerActive(tutorial.pointer);
          }
        }
        /*
        * @return Boolean
        */

      }, {
        key: 'hasActive',
        value: function hasActive() {
          return this.active ? true : false;
        }
        /*
        * @return Boolean
        */

      }, {
        key: 'getActive',
        value: function getActive() {
          return this.active ? this.active : false;
        }
        /*
        * @return Boolean
        */

      }, {
        key: 'getActiveStep',
        value: function getActiveStep() {
          return this.active ? this.active.getActiveStep() : false;
        }
      }]);

      return TutorialMediator;
    }();

    // /////////////////////////////////////////////////////////////////////////////
    // 表示処理
    // =============================================================================


    TutorialMediator.instance = undefined;
    TutorialMediator.idNum = 0;
    var proposalOfShowing = function proposalOfShowing(tutorial, def, step) {
      var _this7 = this;

      // ---------------------------------------------------------------------------
      // アクティブな状態なtutorialがない
      // ---------------------------------------------------------------------------
      if (!this.hasActive()) {
        this.domCtlr.open(tutorial).then(function () {
          _this7.active = tutorial;
          def.resolve();
        });
      }
      // ---------------------------------------------------------------------------
      // アクティブな状態なtutorialがあるが同じtutorialである(nextやprev経由)
      // ---------------------------------------------------------------------------
      else if (this.hasActive() && tutorial === this.active) {}
        // this.domCtlr.enable('nextBtn');
        // this.domCtlr.enable('prevBtn');
        // if(!tutorial.roop){
        //   if(tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
        //   if(tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
        // }
        // 
        // domCtlr
        //   .content(step.content || '')
        //   .pagerActive(tutorial.pointer)
        //   .removeStepID()
        //   .addStepID(tutorial.step.list[tutorial.pointer].name);
        // 
        // let posAnimationPromise = this.animation.tooltipPosFit(step.pos, this.domCtlr.get$obj('content-wrap'), this.domCtlr.get$obj('pos-fit'), posFitSpeed);
        // def.resolve();

        // ---------------------------------------------------------------------------
        // アクティブな状態な別のtutorialがある
        // ---------------------------------------------------------------------------
        else {
            this.domCtlr.close().then(function () {
              _this7.active = undefined;
              showFunc(def, step);
            });
          }
    };

    // =============================================================================
    // 非表示処理
    // =============================================================================
    var proposalOfHiding = function proposalOfHiding(def, tutorial) {
      var _this8 = this;

      var conf = this.conf;
      var speed = conf.animation === true || conf.animation.hide ? conf.hideSpeed : 10;
      if (speed <= 0) speed = 10;
      if (this.active !== tutorial) {
        def.reject();
        return false;
      } else if (this.active === tutorial) {
        var promise = this.animation.hide(this.domCtlr.get$obj('all'), speed);
        promise.then(function () {
          _this8.domCtlr.enable('controller');
          _this8.domCtlr.enable('pager');
          _this8.domCtlr.enable('skipBtn');
          _this8.domCtlr.enable('nextBtn');
          _this8.domCtlr.enable('prevBtn');
          _this8.domCtlr.enable('endBtn');
          _this8.domCtlr.removeTutorialID().removeStepID();
          _this8.active = undefined;
          def.resolve();
        });
      }
    };

    var CustomEvent = function () {
      /*
      * @constructor CustomEvent
      * @param       {String}   name                       - event name
      * @param       {Object}   [triggerHookParam = false] -
      * @param       {Function} triggerHookParam.func      -
      * @param       {*}        [triggerHookParam.ags]     -
      * @param       {*}        [triggerHookParam.this]    -
      * @return      CustomEvent
      */
      function CustomEvent(name) {
        var triggerHookParam = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, CustomEvent);

        var _ = Object.create(null);

        this.name = name;
        this.list = Object.create(null);

        __private.set(this, _);

        this.removeTriggerHook();
        if (triggerHookParam) this.addTriggerHook(triggerHookParam);
      }
      /*
      * @function addEventListener
      * @memberof CustomEvent
      * @param    {String | Function} name       -
      * @param    {Function}          [callback] -
      * @return   String
      */


      _createClass(CustomEvent, [{
        key: 'addEventListener',
        value: function addEventListener(name, callback) {
          if (typeof name === 'function') {
            callback = name;
            name = 'name-' + Math.random().toString(36).slice(-5);
          }
          this.list[name] = callback;
          return name;
        }
        /*
        * @function addEventListener
        * @memberof CustomEvent
        * @return   CustomEvent
        */

      }, {
        key: 'removeEventListener',
        value: function removeEventListener(name) {
          if (!name) {
            this.list = Object.create(null);
          } else if (this.list[name]) {
            delete this.list[name];
          }
          return this;
        }
        /*
        * @function addEventListener
        * @memberof CustomEvent
        * @param    {Object}   param        -
        * @param    {Function} paam.func    -
        * @param    {*}        [param.ags]  -
        * @param    {*}        [param.this] -
        * @return   CustomEvent
        */

      }, {
        key: 'addTriggerHook',
        value: function addTriggerHook() {
          var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          var _ = __private.get(this);
          this.removeTriggerHook();
          _.triggerHook.func = param.func;
          _.triggerHook.ags = param.ags || _.triggerHook.ags;
          _.triggerHook.this = param.this || _.triggerHook.this;
          return this;
        }
        /*
        * @function addEventListener
        * @memberof CustomEvent
        * @return   CustomEvent
        */

      }, {
        key: 'removeTriggerHook',
        value: function removeTriggerHook() {
          var _ = __private.get(this);
          _.triggerHook = Object.create(null);
          _.triggerHook.func = function (ags) {};
          _.triggerHook.ags = undefined;
          _.triggerHook.this = this;
          return this;
        }
        /*
        * @function addEventListener
        * @memberof CustomEvent
        * @param    {Object}   param        -
        * @param    {Function} paam.func    -
        * @param    {*}        [param.ags]  -
        * @param    {*}        [param.this] -
        * @return   CustomEvent
        */

      }, {
        key: 'changeTriggerHook',
        value: function changeTriggerHook() {
          var param = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          this.addTriggerHook(param);
          return this;
        }
        /*
        * @function addEventListener
        * @memberof CustomEvent
        * @return   CustomEvent
        */

      }, {
        key: 'trigger',
        value: function trigger() {
          var _ = __private.get(this);
          var param = _.triggerHook.func.call(_.triggerHook.this, _.triggerHook.ags);

          for (var name in this.list) {
            this.list[name].call(this, param);
          }return this;
        }
      }]);

      return CustomEvent;
    }();

    var CustomEventContainer = function () {
      /*
      * @constructor CustomEventContainer
      * @param       {String}                      name                       - event container name
      * @param       {CustomEvent | CustomEvent[]} [triggerHookParam = false] -
      * @return      CustomEventContainer
      */
      function CustomEventContainer(name) {
        var list = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _classCallCheck(this, CustomEventContainer);

        if (CustomEventContainer.instance[name]) return CustomEventContainer.getInstance(name);
        this.name = name;
        this.list = Object.create(null);

        var _ = Object.create(null);
        _.relationList = Object.create(null);
        _.otherContainers = Object.create(null);
        __private.set(this, _);

        if (list) this.addEvent(list);
        CustomEventContainer.instance[name] = this;
      }
      /*
      * @function addEvent
      * @memberof CustomEventContainer
      * @param    {CustomEvent | CustomEvent[]} event -
      * @return   CustomEventContainer
      */

      /*
      *
      */


      _createClass(CustomEventContainer, [{
        key: 'addEvent',
        value: function addEvent(event) {
          var _this9 = this;

          if (!Array.isArray(event)) event = [event];
          event.forEach(function (val) {
            return _this9.list[val.name] = val;
          });
          return this;
        }
        /*
        * @function removeEvent
        * @memberof CustomEventContainer
        * @param    {String}       [name] -
        * @return   CustomEventContainer
        */

      }, {
        key: 'removeEvent',
        value: function removeEvent(name) {
          if (!name) {
            this.list = Object.create(null);
          } else {
            if (this.list[name]) delete this.list[name];
          }
          return this;
        }
        /*
        * @function addEventListener
        * @memberof CustomEventContainer
        * @param    {String}            eventName    -
        * @param    {String | Function} listenerName -
        * @param    {Function}          [callback]   -
        * @return   String
        */

      }, {
        key: 'addEventListener',
        value: function addEventListener(eventName, listenerName, callback) {
          if (!this.list[eventName]) return this;
          var name = '';
          if (callback) {
            name = this.list[eventName].addEventListener(listenerName, callback);
          } else {
            name = this.list[eventName].addEventListener(listenerName);
          }
          return name;
        }
        /*
        * @function removeEventListener
        * @memberof CustomEventContainer
        * @param    {String}            eventName      -
        * @param    {String}            [listenerName] -
        * @return   CustomEventContainer
        */

      }, {
        key: 'removeEventListener',
        value: function removeEventListener(eventName, listenerName) {
          if (!this.list[eventName]) return this;
          if (!listenerName) {
            this.list[eventName].removeEventListener();
          } else {
            this.list[eventName].removeEventListener(listenerName);
          }
          return this;
        }
        /*
        * @function trigger
        * @memberof CustomEventContainer
        * @param    {String}       eventName
        * @return   CustomEventContainer
        */

      }, {
        key: 'trigger',
        value: function trigger(eventName) {
          var _ = __private.get(this);
          var relationList = _.relationList;
          if (this.list[eventName]) this.list[eventName].trigger();
          for (var containerName in relationList) {
            if (relationList[containerName][eventName]) relationList[containerName][eventName].trigger();
          }

          return this;
        }
        /*
        * @function addRelation
        * @memberof CustomEventContainer
        * イベントコンテナと他のイベントコンテナを親-子の関係で紐付ける。
        * 第1引数に親となるイベントコンテナ、第2引数に親が持っている紐付けるイベント名
        * @param    {CustomEventContainer}    target    - parent CustomEventContainer
        * @param    {String | String[]} eventList - event name of parent CustomEventContainer to relate container.
        * @return   CustomEventContainer
        */

      }, {
        key: 'addRelation',
        value: function addRelation(target, eventList) {
          var _this10 = this;

          var _target = __private.get(target);
          var _ = __private.get(this);
          var relationList = _target.relationList;

          if (!relationList[this.name]) relationList[this.name] = Object.create(null);
          relationList = relationList[this.name];

          eventList = typeof eventList === 'string' ? [eventList] : eventList;
          eventList.forEach(function (name) {
            if (target.list[name]) relationList[name] = _this10.list[name];
          });
          _.otherContainers[target.name] = target;
        }
        /*
        * @function removeRelation
        * @memberof CustomEventContainer
        * @param    {CustomEventContainer} target -
        * @return   CustomEventContainer
        */

      }, {
        key: 'removeRelation',
        value: function removeRelation(target, eventList) {
          var _target = __private.get(target);
          var _ = __private.get(this);
          var relationList = _target.relationList;

          if (eventList === undefined) eventList = Object.keys(this.list);
          eventList = typeof eventList === 'string' ? [eventList] : eventList;
          relationList = relationList[this.name];
          eventList.forEach(function (name) {
            if (relationList[name]) delete relationList[name];
          });
          if (!Object.keys(relationList).length) {
            delete _target.relationList[this.name];
            delete _.otherContainers[target.name];
          }
          return this;
        }
        /*
        * @function removeAllRelation
        * @memberof CustomEventContainer
        * @return   CustomEventContainer
        */

      }, {
        key: 'removeAllRelation',
        value: function removeAllRelation(target) {
          var _ = __private.get(this);
          if (target) {
            this.removeRelation(target);
          } else {
            for (var key in _.otherContainers) {
              this.removeRelation(_.otherContainers[key]);
            }
          }
          return this;
        }
      }]);

      return CustomEventContainer;
    }();

    /**
    * @class Step
    *
    * | Step parameters        ||
    * |--------------------|----|
    * | a | b |
    *
    * @param       {Tutorial} tutorial
    * @param       {Object[]} [step]
    * @return      Step
    */


    CustomEventContainer.instance = Object.create(null);

    CustomEventContainer.getInstance = function (name) {
      if (CustomEventContainer.instance[name]) return CustomEventContainer.instance[name];
      return new CustomEventContainer(name);
    };

    var Step = function () {
      function Step(tutorial, step, $) {
        _classCallCheck(this, Step);

        this.list = [];
        this.length = 0;
        this.tutorial = tutorial;
        this.$ = $;
        if (step) this.add(step);
      }
      /**
      *
      * @function setDefaultProperties
      * @memberof Step
      * @static
      *
      * @param  {Object} step
      * @param  {String} [name = '']
      * @return Step
      */


      _createClass(Step, [{
        key: 'change',

        /**
        * Change step parameters.
        * @function change
        * @memberof Step
        * @instance
        *
        * @param    {String | Number} order
        * @param    {Object}          step
        * @return   Step
        */
        value: function change(order, step) {
          var partial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

          order = typeof order === 'string' ? this.indexByName(order) : order;
          if (!this.list[order]) return this;
          var name = this.list[order].name;
          // console.log(name);
          if (partial) {
            for (var key in step) {
              this.list[order][key] = step[key];
            }
          } else {
            if (!step.name) step.name = name;
            this.list[order] = Step.setDefaultProperties(step);
          }
          __private.get(this.tutorial).emit('step changed');
          return this;
        }
        /**
        * Replace step parameters.
        *
        * @function replace
        * @memberof Step
        * @instance
        * @param    {String | Number} order
        * @param    {Object}          step
        */

      }, {
        key: 'replace',
        value: function replace(order, step) {
          return this.change(order, step, false);
        }
        /**
        * Add new step.
        *
        * @function addStep
        * @memberof Step
        * @instance
        * @param    {Object | Object[]} step
        * @return   Step
        */

      }, {
        key: 'add',
        value: function add(step) {
          var _this11 = this;

          var steps = Array.isArray(step) ? step : [step];
          steps.forEach(function (step) {
            var newStep = Step.setDefaultProperties(step);
            newStep = Step.setPropertiesFormat(newStep, _this11.$);
            _this11.list.push(newStep);
          });
          this.length = this.list.length;
          __private.get(this.tutorial).emit('step added');
          return this;
        }
        /**
        * delete specified step.
        *
        * @function deleteStep
        * @memberof Step
        * @instance
        * @param    {String | Number | Array.<String|Number>} order
        * @return   Step
        */

      }, {
        key: 'delete',
        value: function _delete(order) {
          var _this12 = this;

          if (order === undefined) {
            this.list = [];
            this.length = this.list.length;
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this12.indexByName(val) : val;
            });
            var newStep = this.list.filter(function (val, i) {
              var flg = true;
              for (var _i = 0, _l = order.length; _i < _l; _i++) {
                if (order[_i] === i) {
                  flg = false;
                  break;
                }
              }
              if (flg) return val;
            });
            this.list = newStep;
            this.length = this.list.length;
          }
          __private.get(this.tutorial).emit('step deleted');
          return this;
        }
        /*
        * @function deleteStep
        * @memberof Step
        * @instance
        * @param    {String}          name
        * @return   Number | Number[]
        */

      }, {
        key: 'indexByName',
        value: function indexByName(name) {
          if (typeof name !== 'string') return -1;
          var arr = [];
          this.list.forEach(function (el, i) {
            if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.name === name) arr.push(i);
          });
          return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
        }
        /*
        * @function deleteStep
        * @memberof Step
        * @instance
        * @param    {Number}
        * @return   String
        */

      }, {
        key: 'nameByIndex',
        value: function nameByIndex(index) {
          if (!this.list[index]) return '';
          if (this.list[index]) return this.list[index].name;
        }
      }], [{
        key: 'setDefaultProperties',
        value: function setDefaultProperties(step) {
          var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

          step.pos = Array.isArray(step.pos) ? step.pos : ['center', 'center'];
          if (!step.name) {
            step.name = 'step-' + Step.id;
            Step.id++;
          }
          if (step.target) step.target = $(step.target[0]);
          if (step.target && !step.targetPos) step.targetPos = ['left', 'top'];
          if (step.target && !step.targetPosOffset) step.targetPosOffset = [0, 0];
          return step;
        }
        /**
        * @function setPropertiesFormat
        * @memberof Step
        * @static
        *
        * @param {Step}   step
        * @param {jQuery} $
        * @return Step
        */

      }, {
        key: 'setPropertiesFormat',
        value: function setPropertiesFormat(step, $) {
          if (step.target && typeof step.target === 'string') step.target = $(step.target);
          return step;
        }
      }]);

      return Step;
    }();

    /**
    * @class DOMController
    *
    * @param {Object} param
    * @param {jQuery} param.$
    * @param {jQuery} param.$window
    * @param {jQuery} param.$template
    * @param {jQuery} param.$parent
    * @param {Number} param.zIndex
    * @param {String} param.mode
    */


    Step.id = 0;

    var DOMController = function () {
      /**
      *
      */
      function DOMController(param) {
        var _this13 = this;

        _classCallCheck(this, DOMController);

        if (DOMController.instance) return DOMController.instance;

        var $template = param.$template;
        var zIndex = param.zIndex;
        var mode = param.mode;
        var theme = param.theme;
        var BGCanvas = param.BGCanvas;
        var Animation = param.Animation;
        var Deferred = param.Deferred;
        var bgColor = param.bgColor;
        var tutorialMediator = param.tutorialMediator;
        var speed = param.speed;


        var tm = tutorialMediator;
        // this.tm           = tm;
        this.$ = tm.$;
        this.$window = tm.$window;
        this.$parent = tm.$parent;
        this.$template = $template;
        this.$posFit = $('.pos-fit', this.$template);
        this.$contentWrap = $('.content-wrap', this.$template);
        this.$content = $('.content', this.$template);
        this.$bg = $('.bg', this.$template);
        this.$pager = $('.pager', this.$template);
        this.$controller = $('.controller', this.$template);
        this.$skipBtn = $('.skip span', this.$controller);
        this.$prevBtn = $('.prev span', this.$controller);
        this.$nextBtn = $('.next span', this.$controller);
        this.$endBtn = $('.end span', this.$controller);
        this.mode = mode;
        this.Deferred = Deferred;
        this.speed = speed;
        this.bgCanvas = false;
        $template.css({
          'z-index': zIndex,
          'display': 'none',
          'opacity': 0
        });
        this.$template.addClass(mode).addClass(theme);
        if (mode === 'focus') {
          this.bgCanvas = new BGCanvas({
            '$': this.$,
            '$parent': this.$bg,
            'bgColor': bgColor
          });
          this.bgCanvas.setSize(this.$window.innerWidth(), this.$window.innerHeight());
        }
        this.animation = new Animation({
          'tutorialMediator': tm,
          'bgCanvas': this.bgCanvas
        });
        this.$posFit.css('z-index', zIndex + 2);
        this.$bg.css('z-index', zIndex + 1);
        // =======================================================================
        // events
        // =======================================================================
        // pager
        this.$pager.on('click', 'li span', function (e) {
          if (!$(this).hasClass('active')) tm.getActive().show($(this).text() * 1);
        });
        // skip
        this.$skipBtn.on('click', function () {
          return tm.getActive().skip();
        });
        // next
        this.$nextBtn.on('click', function () {
          return tm.getActive().next();
        });
        // prev
        this.$prevBtn.on('click', function () {
          return tm.getActive().prev();
        });
        // end
        this.$endBtn.on('click', function () {
          return tm.getActive().end();
        });
        // resize
        tm.eventCtnr.addEventListener('resize', function (size) {
          if (!tm.hasActive()) return false;
          if (_this13.hasBGCanvas()) _this13.bgCanvas.setSize(size.width, size.height).draw();
        });
        tm.eventCtnr.addEventListener('scroll', function () {});

        this.$parent.append(this.$template);
        DOMController.instance = this;
      }
      /**
      * @function get$obj
      * @memberof DOMController
      * @instance
      *
      * @param  {String} name
      * @return jQuery Object
      */


      _createClass(DOMController, [{
        key: 'get$obj',
        value: function get$obj(name) {
          switch (name) {
            case 'all':
              return this.$template;
            case 'content-wrap':
              return this.$contentWrap;
            case 'pos-fit':
              return this.$posFit;
            case 'content':
              return this.$content;
            case 'controller':
              return this.$controller;
            case 'skipBtn':
              return this.$skipBtn;
            case 'prevBtn':
              return this.$prevBtn;
            case 'nextBtn':
              return this.$nextBtn;
            case 'endBtn':
              return this.$endBtn;
            case 'pager':
              return this.$pager;
            case 'bg':
              return this.$bg;
          }
        }
        /**
        * @param {String} name
        */

      }, {
        key: 'disable',
        value: function disable(name) {
          var $target = this.get$obj(name);
          $target.css('display', 'none');
          return this;
        }
        /**
        * @param {String} name
        */

      }, {
        key: 'enable',
        value: function enable(name) {
          var $target = this.get$obj(name);
          $target.css('display', '');
          return this;
        }
        /**
        * @param {jQuery | String | DOMObject} cnt
        */

      }, {
        key: 'content',
        value: function content(cnt) {
          this.get$obj('content').empty().append(cnt);
          return this;
        }
        /**
        * @param {Number} num
        */

      }, {
        key: 'pager',
        value: function pager(num) {
          var cnt = '';
          for (var i = 0, l = num; i < l; i++) {
            cnt += '<li><span>' + i + '</span></li>';
          }this.get$obj('pager').empty().append(cnt);
          return this;
        }
        /**
        * @param {Number} index
        */

      }, {
        key: 'pagerActive',
        value: function pagerActive(index) {
          $('li span', this.get$obj('pager')).removeClass('active');
          $('li:eq(' + index + ') span', this.get$obj('pager')).addClass('active');
          return this;
        }
        /**
        *
        */

      }, {
        key: 'addTutorialID',
        value: function addTutorialID(id) {
          this.$contentWrap.attr('data-tutorial', id);
          return this;
        }
        /**
        *
        */

      }, {
        key: 'removeTutorialID',
        value: function removeTutorialID() {
          this.$contentWrap.attr('data-tutorial', '');
          return this;
        }
        /**
        *
        */

      }, {
        key: 'addStepID',
        value: function addStepID(id) {
          this.$contentWrap.attr('data-step', id);
          return this;
        }
        /**
        *
        */

      }, {
        key: 'removeStepID',
        value: function removeStepID() {
          this.$contentWrap.attr('data-step', '');
          return this;
        }
        /**
        *
        */

      }, {
        key: 'hasBGCanvas',
        value: function hasBGCanvas() {
          return this.bgCanvas ? true : false;
        }
        /**
        * @param {Tutorial} tutorial - active tutorial instance.
        */

      }, {
        key: 'open',
        value: function open(tutorial) {
          var _this14 = this;

          var count = 0; // show, scroll, pos.
          var activeStep = tutorial.getActiveStep();
          var stepNum = tutorial.step.length;
          var i = tutorial.pointer;
          var ID = tutorial.id;
          var name = activeStep.name;
          var $window = this.$window;
          var def = new this.Deferred();
          var speed = this.speed;
          this.content(activeStep.content || '').pager(stepNum).pagerActive(i);

          if (!tutorial.controller) this.disable('controller');
          if (!tutorial.pager) this.disable('pager');
          if (!tutorial.skipBtn) this.disable('skipBtn');
          if (!tutorial.roop) {
            if (stepNum - 1 <= i) this.disable('nextBtn');
            if (i === 0) this.disable('prevBtn');
          }

          this.addTutorialID(ID).addStepID(name);

          if (this.hasBGCanvas()) this.bgCanvas.setSize($window.innerWidth(), $window.innerHeight()).draw();
          // 表示＆移動アニメーション
          var check = function check() {
            count++;
            if (count === 3 && _this14.mode === 'focus') {
              // let step = this.active.getActiveStep();
              if (activeStep.target) {
                var endPromise = _this14.animation.focus(activeStep.target, activeStep.targetPosOffset, speed.focus);
                endPromise.then(function () {
                  return def.resolve();
                });
              } else {
                def.resolve();
              }
            }
          };
          var showAnimPromise = this.animation.show(this.get$obj('all'), speed.show);
          showAnimPromise.then(function () {
            return check();
          });
          var scrollAnimPromise = this.animation.scroll(activeStep.target, activeStep.targetPos, speed.scroll);
          scrollAnimPromise.then(function () {
            return check();
          });
          var posAnimationPromise = this.animation.tooltipPosFit(activeStep.pos, this.get$obj('content-wrap'), this.get$obj('pos-fit'), speed.posFit);
          posAnimationPromise.then(function () {
            return check();
          });
          return def.promise();
        }
        /**
        *
        */

      }, {
        key: 'close',
        value: function close() {
          var def = new this.Deferred();
          this.enable('nextBtn');
          this.enable('prevBtn');
          this.enable('controller');
          this.enable('pager');
          this.enable('skipBtn');
          this.enable('endBtn');
          this.removeTutorialID().removeStepID();
          setTimeout(function () {
            return def.resolve();
          }, 10);
          return def.promise();
        }
      }]);

      return DOMController;
    }();

    DOMController.instance = undefined;

    DOMController.getInstance = function () {
      return DOMController.instance || false;
    };

    var SimplePromise = function () {
      /*
      * @param {SimpleDeferred} deferred
      */
      function SimplePromise(deferred) {
        _classCallCheck(this, SimplePromise);

        this.def = deferred;
      }
      /*
      * @param {Function} onFulfilled
      * @param {Function} [onRejected = false]
      */


      _createClass(SimplePromise, [{
        key: 'then',
        value: function then(onFulfilled, onRejected) {
          this.def.addListener(onFulfilled, onRejected);
        }
      }]);

      return SimplePromise;
    }();

    var SimpleDeferred = function () {
      /*
      *
      */
      function SimpleDeferred() {
        _classCallCheck(this, SimpleDeferred);

        var _ = Object.create(null);
        _.list = [];
        _.status = null;
        __private.set(this, _);
      }
      /*
      *
      */


      _createClass(SimpleDeferred, [{
        key: 'promise',
        value: function promise() {
          var _ = __private.get(this);
          if (_.status !== null) return this;
          _.promise = new SimplePromise(this);
          return _.promise;
        }
        /*
        *
        */

      }, {
        key: 'getStatus',
        value: function getStatus() {
          var _ = __private.get(this);
          return _.status;
        }
        /*
        *
        */

      }, {
        key: 'reject',
        value: function reject() {
          var _ = __private.get(this);
          if (_.status !== null) return this;
          _.status = false;
          _.list.forEach(function (listener) {
            if (listener[1]) listener[1].call(_.promise);
          });
          return this;
        }
        /*
        * @return SimpleDeferred
        */

      }, {
        key: 'resolve',
        value: function resolve() {
          var _ = __private.get(this);
          if (_.status !== null) return this;
          _.list.forEach(function (listener) {
            return listener[0].call(_.promise);
          });
          _.status = true;
          return this;
        }
        /*
        * @param  {Function}         onFulfilled
        * @param  {Function | false} [onRejected]
        * @return SimpleDeferred
        */

      }, {
        key: 'addListener',
        value: function addListener(onFulfilled, onRejected) {
          var _ = __private.get(this);
          if (_.status !== null) return this;
          _.list.push([onFulfilled, onRejected]);
          return this;
        }
      }]);

      return SimpleDeferred;
    }();

    SimpleDeferred.num = 0;

    SimpleDeferred.complete = function () {};

    var Animation = function () {
      _createClass(Animation, null, [{
        key: 'getInstance',

        /**
        *
        */
        value: function getInstance() {
          return Animation.instance ? Animation.instance : false;
        }
        /**
        *
        */

      }]);

      function Animation(param) {
        var _this15 = this;

        _classCallCheck(this, Animation);

        if (Animation.instance) return Animation.instance;
        var tm = param.tutorialMediator;
        this.tm = tm;
        this.$ = tm.$;
        this.$window = tm.$window;
        this.$scroll = tm.$scroll;
        this.Deferred = tm.Deferred;
        this.bgCanvas = param.bgCanvas;
        this.focusTimer = null;
        this.unfocusTimer = null;
        this.state = {
          'show': false,
          'hide': false,
          'focus': false,
          'scroll': false,
          'unfocus': false
        };
        if (this.bgCanvas) {
          // [0] x / [1] y / [2] width / [3] height
          this.focusStartRect = [];
          this.focusTargetRect = [];
        }
        this.moving = function (current_time, start_val, end_val, total_time) {
          var elapsed_time = Math.round(current_time / total_time * 1000) / 1000;
          var dist = start_val - end_val;
          var v = dist < 0 ? -1 : 1;
          dist = dist * v;
          return (start_val - elapsed_time * dist) * v;
        };
        // =========================================================================
        // Resize Event
        // =========================================================================
        this.tm.eventCtnr.addEventListener('resize', function (size) {
          if (!_this15.tm.active) return false;
          var activeStep = _this15.tm.getActiveStep();
          var bgCvs = _this15.bgCanvas;
          // .BGCanvas
          if (!_this15.state.focus && _this15.bgCanvas) {
            if (bgCvs.checkClearRect()) {
              _this15.setFocusTargetRect(activeStep.target, activeStep.targetPosOffset);
              bgCvs.clearRect = _this15.focusTargetRect.map(function (val) {
                return val;
              });
              bgCvs.draw();
            }
          }
        });
        // =========================================================================
        // scroll Event
        // =========================================================================
        this.tm.eventCtnr.addEventListener('scroll', function () {
          if (!_this15.tm.active) return false;
          var activeStep = _this15.tm.getActiveStep();
          var bgCvs = _this15.bgCanvas;
          if (!_this15.state.focus && _this15.bgCanvas) {
            if (bgCvs.checkClearRect()) {
              _this15.setFocusTargetRect(activeStep.target, activeStep.targetPosOffset);
              bgCvs.clearRect = _this15.focusTargetRect.map(function (val) {
                return val;
              });
              bgCvs.draw();
            }
          }
        });
      }
      /**
      * @function show
      * @param {jQuery} $target
      * @param {Number} speed
      */


      _createClass(Animation, [{
        key: 'show',
        value: function show($target, speed) {
          var _this16 = this;

          var def = new this.Deferred();
          this.state.show = true;
          $target.stop().css('display', 'block').animate({
            'opacity': 1
          }, speed, function () {
            _this16.state.show = false;
            def.resolve();
          });
          return def.promise();
        }
        /**
        * @function hide
        * @param {jQuery} $target
        * @param {Number} Speed
        */

      }, {
        key: 'hide',
        value: function hide($target, speed) {
          var _this17 = this;

          var def = new this.Deferred();
          this.state.hide = true;
          $target.stop().animate({
            'opacity': 0
          }, speed, function () {
            $target.css('display', 'none');
            _this17.state.hide = false;
            def.resolve();
          });
          return def.promise();
        }
        /**
        * @function scroll
        * @param {jQuery[]}            target
        * @param {String[] | Number[]} offset
        * @param {Number}              speed
        */

      }, {
        key: 'scroll',
        value: function scroll() {
          var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          var _this18 = this;

          var offset = arguments[1];
          var speed = arguments[2];

          var def = new this.Deferred();
          if (!target) {
            setTimeout(function () {
              return def.resolve();
            }, 10);
          } else {
            var $target = $(target[0]);
            var x = $target.offset().left;
            var y = $target.offset().top;
            var w = $target.innerWidth();
            var h = $target.innerHeight();
            var windowW = this.$window.innerWidth();
            var windowH = this.$window.innerHeight();
            if (typeof offset[0] === 'number') {
              x += offset[0];
            } else {
              switch (offset[0]) {
                case 'middle':
                  x -= windowW / 2 - w / 2;
                  break;
                case 'center':
                  x -= windowW / 2 - w / 2;
                  break;
                case 'right':
                  x -= windowW - w;
                  break;
                case 'left':
                  x -= 0;
                  break;
                default:
                  x -= 0;
                  break;
              }
            }
            if (typeof offset[1] === 'number') {
              y += offset[1];
            } else {
              switch (offset[1]) {
                case 'middle':
                  y -= windowH / 2 - h / 2;
                  break;
                case 'center':
                  y -= windowH / 2 - h / 2;
                  break;
                case 'bottom':
                  y -= windowH - h;
                  break;
                case 'top':
                  y -= 0;
                  break;
                default:
                  y -= 0;
                  break;
              }
            }
            this.state.scroll = true;
            this.$scroll.animate({
              scrollTop: y,
              scrollLeft: x
            }, speed, function () {
              _this18.state.scroll = false;
              def.resolve();
            });
          }
          return def.promise();
        }
        /**
        * @param {} target
        * @param {Number}   speed
        */

      }, {
        key: 'focus',
        value: function focus($target, offset, speed) {
          var _this19 = this;

          var def = new this.Deferred();
          var frame = 60;
          var FPS = 1000 / frame;
          var currentTime = 0;
          var cssVal = [];
          this.setFocusTargetRect($target, offset);
          this.setFocusDisplayRect();
          this.focusStartRect = this.bgCanvas.clearRect.map(function (val) {
            return val;
          });

          this.state.focus = true;
          this.focusTimer = setInterval(function () {
            cssVal = [];
            cssVal[0] = _this19.moving(currentTime, _this19.focusStartRect[0], _this19.focusTargetRect[0], speed);
            cssVal[1] = _this19.moving(currentTime, _this19.focusStartRect[1], _this19.focusTargetRect[1], speed);
            cssVal[2] = _this19.moving(currentTime, _this19.focusStartRect[2], _this19.focusTargetRect[2], speed);
            cssVal[3] = _this19.moving(currentTime, _this19.focusStartRect[3], _this19.focusTargetRect[3], speed);
            _this19.bgCanvas.clearRect = cssVal;
            _this19.bgCanvas.draw();
            currentTime += FPS;
            if (currentTime >= speed) {
              clearInterval(_this19.focusTimer);
              _this19.bgCanvas.clearRect = _this19.focusTargetRect.map(function (val) {
                return val;
              });
              _this19.bgCanvas.draw();
              _this19.state.focus = false;
              def.resolve();
            }
          }, FPS);

          return def.promise();
        }
        /**
        *
        */

      }, {
        key: 'setFocusTargetRect',
        value: function setFocusTargetRect($target, offset) {
          if (!this.bgCanvas) return this;
          this.focusTargetRect = [];
          var scrollX = this.$scroll.scrollLeft();
          var scrollY = this.$scroll.scrollTop();

          var left = $target.offset().left;
          var top = $target.offset().top;
          var offsetX = left - scrollX;
          var offsetY = top - scrollY;
          this.focusTargetRect = [offsetX - offset[0], offsetY - offset[1], $target.innerWidth() + offset[0] * 2, $target.innerHeight() + offset[1] * 2];
          return this;
        }
        /**
        *
        */

      }, {
        key: 'setFocusDisplayRect',
        value: function setFocusDisplayRect() {
          if (!this.bgCanvas) return this;
          var displayRect = this.bgCanvas.clearRect;
          if (!displayRect) {
            displayRect = [];
            displayRect[0] = this.focusTargetRect[0] + this.focusTargetRect[2] / 2;
            displayRect[1] = this.focusTargetRect[1] + this.focusTargetRect[3] / 2;
            displayRect[2] = 0;
            displayRect[3] = 0;
          }
          this.bgCanvas.clearRect = displayRect;
          return this;
        }
        /**
        *
        */

      }, {
        key: 'unfocus',
        value: function unfocus(target, speed) {}
        // return this.focus(target, speed);

        /**
        * @param {String[] | number[]} orderPos
        * @param {jQuery}              $target
        */

      }, {
        key: 'tooltipPosFit',
        value: function tooltipPosFit(orderPos, $target, $parent, speed) {
          var def = new this.Deferred();
          var w = $target.innerWidth();
          var h = $target.innerHeight();
          // IE9 can't use transform property.
          var orderX = orderPos[0];
          var orderY = orderPos[1];
          var left = null;
          var marginX = null;
          var top = null;
          var marginY = null;
          var count = 0;
          if (orderX === 'left') {
            left = '-50%';
            marginX = 0;
          } else if (orderX === 'center' || orderX === 'middle') {
            left = 0;
            marginX = w / -2;
          } else if (orderX === 'right') {
            left = '50%';
            marginX = w * -1;
          }
          if (orderY === 'top') {
            top = 0;
            marginY = 0;
          } else if (orderY === 'center' || orderY === 'middle') {
            top = '50%';
            marginY = h / -2;
          } else if ('bottom') {
            top = '100%';
            marginY = h * -1;
          }
          $target.animate({
            'left': left,
            'margin-top': marginY,
            'margin-left': marginX
          }, speed, function () {
            count++;
            if (count === 2) def.resolve();
          });
          $parent.animate({
            'top': top
          }, speed, function () {
            count++;
            if (count === 2) def.resolve();
          });
          return def.promise();
        }
      }]);

      return Animation;
    }();

    var BGCanvas = function () {
      /**
      *
      */
      function BGCanvas(param) {
        _classCallCheck(this, BGCanvas);

        if (BGCanvas.instance) return BGCanvas.instance;
        var $ = param.$;
        var $parent = param.$parent;
        var bgColor = param.bgColor;


        this.bgColor = bgColor;
        this.$cvs = $('<canvas>');
        this.cvs = this.$cvs[0];
        this.ctx = this.cvs.getContext('2d');
        this.clearRect = false;
        $parent.append(this.$cvs);
        if (!BGCanvas.instance) BGCanvas.instance = this;
      }
      /*
      * @param {Number} w
      * @param {Number} h
      */

      /**
      *
      */


      _createClass(BGCanvas, [{
        key: 'setSize',
        value: function setSize(w, h) {
          this.cvs.width = w;
          this.cvs.height = h;
          return this;
        }
        /**
        *
        */

      }, {
        key: 'draw',
        value: function draw() {
          this.ctx.fillStyle = this.bgColor;
          this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
          this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
          if (this.clearRect) this.ctx.clearRect(this.clearRect[0], this.clearRect[1], this.clearRect[2], this.clearRect[3]);
          // this.ctx.clearRect(rect[0], rect[1], rect[2], rect[3] );
          // if(rect) rect.forEach((val)=> this.ctx.clearRect(val[0], val[1], val[2], val[3]) );
        }
        /**
        *
        */

      }, {
        key: 'checkClearRect',
        value: function checkClearRect() {
          return !this.clearRect || this.clearRect[2] === 0 && this.clearRect[3] === 0 ? false : true;
        }
      }]);

      return BGCanvas;
    }();

    BGCanvas.instance = undefined;

    BGCanvas.getInstance = function () {
      return BGCanvas.instance || false;
    };

    var __first = true;

    var __conf = Object.create(null);
    __conf.mode = 'focus'; // focus | arrow
    // __conf.resizeInterval    = 250;
    __conf.resizeInterval = 0;
    __conf.scrollInterval = 0;
    __conf.minSpeed = 10;
    __conf.scrollSpeed = 500;
    __conf.showSpeed = 375;
    __conf.hideSpeed = 375;
    __conf.posFitSpeed = 300;
    // __conf.focusSpeed        = 375;
    __conf.focusSpeed = 300;
    __conf.unfocusSpeed = 300;
    __conf.theme = 'default';
    __conf.animation = Object.create(null);
    __conf.animation.show = true;
    __conf.animation.hide = true;
    __conf.animation.scroll = true;
    __conf.animation.posFit = true;
    __conf.animation.focus = true;
    __conf.animation.unfocus = true;
    __conf.skipLabel = 'Skip';
    __conf.prevLabel = 'Prev';
    __conf.nextLabel = 'Next';
    __conf.endLabel = 'End';
    __conf.$ = $;
    __conf.$window = null;
    __conf.$parent = null;
    __conf.$scroll = null;
    __conf.zIndex = 9000;
    __conf.bgColor = 'rgba(0, 0, 0, 0.5)';
    __conf.template = function () {
      return '\n<div class="tutorial">\n  <div class="pos-fit"><div class="content-wrap center-middle">\n    <ol class="pager"></ol>\n    <div class="content"></div>\n    <div class="controller">\n      <ul class="left">\n        <li class="skip"><span>' + __conf.skipLabel + '</span></li>\n      </ul>\n      <ul class="right">\n        <li class="prev"><span>' + __conf.prevLabel + '</span></li>\n        <li class="next"><span>' + __conf.nextLabel + '</span></li>\n        <li class="end"><span>' + __conf.endLabel + '</span></li>\n      </ul>\n    </div>\n  </div></div>\n  <div class="bg"></div>\n</div>\n';
    };
    __conf.defaultEventConf = [];
    __conf.defaultEventConf.push(['resize', {
      'func': function func(conf) {
        return {
          'width': conf.$window.innerWidth(),
          'height': conf.$window.innerHeight()
        };
      },
      'ags': __conf
    }]);
    __conf.defaultEventConf.push(['scroll', false]);
    __conf.defaultEventConf.push(['beforeAddStep', false]);
    __conf.defaultEventConf.push(['afterAddStep', false]);
    __conf.defaultEventConf.push(['beforeRemoveStep', false]);
    __conf.defaultEventConf.push(['afterRemoveStep', false]);
    __conf.defaultEventConf.push(['beforeChangeStep', false]);
    __conf.defaultEventConf.push(['afterChangeStep', false]);
    __conf.defaultEventConf.push(['beforeShow', false]);
    __conf.defaultEventConf.push(['afterShow', false]);
    __conf.defaultEventConf.push(['beforeNext', false]);
    __conf.defaultEventConf.push(['afterNext', false]);
    __conf.defaultEventConf.push(['beforePrev', false]);
    __conf.defaultEventConf.push(['afterPrev', false]);
    __conf.defaultEventConf.push(['beforeHide', false]);
    __conf.defaultEventConf.push(['afterHide', false]);
    __conf.defaultEventConf.push(['beforeDestory', false]);
    __conf.defaultEventConf.push(['afterDestory', false]);
    __conf.defaultEventConf.push(['beforeSkip', false]);
    __conf.defaultEventConf.push(['afterSkip', false]);
    __conf.Deferred = SimpleDeferred;
    __conf.DOMController = DOMController;
    __conf.CustomEvent = CustomEvent;
    __conf.CustomEventContainer = CustomEventContainer;
    __conf.Animation = Animation;
    __conf.BGCanvas = BGCanvas;
    Object.seal(__conf);

    window.Tutorial = Tutorial;
  })();
}