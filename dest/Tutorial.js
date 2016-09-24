"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var __private = new WeakMap();

    var Tutorial = function () {
      _createClass(Tutorial, null, [{
        key: 'changeConfig',

        /**
        * Tutorial全体の動作を変更する。Tutorialのインスタンスを作成する前のみ可能
        *
        * @param {(String|Object[])} name
        * @param {String}            name.name
        * @param {*}                 name.val
        * @param {*}                 [val]
        */
        value: function changeConfig(key, val) {
          if (!__first) return false;
          var confArr = Array.isArray(key) ? key : [{ 'key': key, 'val': val }];
          confArr.forEach(function (obj) {
            return __conf[obj.key] = obj.val;
          });
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

      }]);

      function Tutorial() {
        var _this = this;

        var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
      /*
      *
      */


      _createClass(Tutorial, [{
        key: 'next',
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
        /*
        *
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
        /*
        *
        */

      }, {
        key: 'skip',
        value: function skip() {
          var promise = this.mediator.offer(this, 'skip');
        }
        /*
        *
        */

      }, {
        key: 'end',
        value: function end() {
          var promise = this.mediator.offer(this, 'end');
        }
        /*
        * @param  {String} order
        * @return {SimplePromise}
        */

      }, {
        key: 'show',
        value: function show() {
          var _this4 = this;

          var order = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

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
        /*
        * @return {SimplePromise}
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
        /*
        *
        */

      }, {
        key: 'destroy',
        value: function destroy() {
          // let promise = this.mediator.offer(this, 'show');
        }
      }]);

      return Tutorial;
    }();

    var TutorialMediator = function () {
      /*
      * @constructor
      * @param      {Tutorial} tutorial
      * @return     TutorialMediator
      */
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
            conf.$scroll = conf.$scroll || $('body');
            self.$window = conf.$window;
            self.$parent = conf.$parent;
            self.$scroll = conf.$scroll;
            self.Deferred = conf.Deferred;
            self.animation = new conf.Animation(self.$, self.Deferred);
            self.domCtlr = new conf.DOMController({
              '$': self.$,
              '$window': self.$window,
              '$template': self.$(conf.template()),
              'zIndex': conf.zIndex,
              '$parent': self.$parent,
              'mode': conf.mode,
              'BGCanvas': conf.BGCanvas,
              'bgColor': conf.bgColor
            });
            if (self.domCtlr.bgCanvas) {
              self.domCtlr.bgCanvas.setSize(self.$window.innerWidth(), self.$window.innerHeight());
              self.domCtlr.bgCanvas.draw();
            }
            /* $ resize event listener */
            var resizeInterval = conf.resizeInterval || 250;
            var resizeTimer = null;
            self.$window.on('resize', function (e) {
              if (resizeTimer) clearTimeout(resizeTimer);
              resizeTimer = setTimeout(function () {
                self.eventCtnr.trigger('resize');
              }, resizeInterval);
            });
            /* custom resize event listener */
            self.eventCtnr.addEventListener('resize', function (size) {
              if (self.domCtlr.bgCanvas) {
                self.domCtlr.bgCanvas.setSize(size.width, size.height);
                self.domCtlr.bgCanvas.draw();
              }
            });
            /* $ pager event listener */
            var $pager = self.domCtlr.get$obj('pager');
            $pager.on('click', 'li span', function () {
              console.log("ddd");
              // self.active.show();
            });
            /* $ next event listener */
            var $nextBtn = self.domCtlr.get$obj('nextBtn');
            $nextBtn.on('click', function () {
              return self.active.next();
            });
            /* $ prev event listener */
            var $prevBtn = self.domCtlr.get$obj('prevBtn');
            $prevBtn.on('click', function () {
              return self.active.prev();
            });
            /* $ skip event listener */
            var $skipBtn = self.domCtlr.get$obj('skipBtn');
            $skipBtn.on('click', function () {
              return self.active.skip();
            });
            /* $ end event listener */
            var $endBtn = self.domCtlr.get$obj('endBtn');
            $endBtn.on('click', function () {
              return self.active.end();
            });

            /* $ */

            // eventContainer.trigger('resize');
            //
            //       // pager event
            //       this.$pager.on('click', 'li span', ()=>{
            //         console.log("ddd");
            //       });
            // self.domCtlr

            // self.DOMController = conf.DOMController;

            self.active = false; /* active tutorial */
            self.list = Object.create(null);
            // setTutorialMediatorPrivateFunc.call(self);
            TM.instance = self;
          })();
        }

        self.list[tutorial.id] = tutorial;
        return self;
      }
      /*
      * 新しいIDを発行する
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
        /*
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
      }]);

      return TutorialMediator;
    }();

    // /////////////////////////////////////////////////////////////////////////////
    // 表示処理
    // =============================================================================


    TutorialMediator.instance = undefined;
    TutorialMediator.idNum = 0;
    var proposalOfShowing = function proposalOfShowing(tutorial, def, step) {
      var minSpeed = 10;
      var conf = this.conf;
      var showSpeed = conf.animation === true || conf.animation.show ? conf.showSpeed : minSpeed;
      var scrollSpeed = conf.animation === true || conf.animation.scroll ? conf.scrollSpeed : minSpeed;
      if (showSpeed <= 0) showSpeed = minSpeed;
      if (scrollSpeed <= 0) scrollSpeed = minSpeed;
      // ---------------------------------------------------------------------------
      // アクティブな状態なtutorialがない
      // ---------------------------------------------------------------------------
      if (!this.hasActive()) {
        var count = 0; // show, scroll, target

        this.domCtlr.content(step.content || '').pager(tutorial.step.length).pagerActive(tutorial.pointer);

        if (!tutorial.controller) this.domCtlr.disable('controller');
        if (!tutorial.pager) this.domCtlr.disable('pager');
        if (!tutorial.skipBtn) this.domCtlr.disable('skipBtn');
        if (!tutorial.roop) {
          if (tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
          if (tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
        }

        var pointer = tutorial.pointer;
        this.domCtlr.addTutorialID(tutorial.id);
        this.domCtlr.addStepID(tutorial.step.list[pointer].name);
        this.active = tutorial;

        // 表示＆移動アニメーション
        // ここ
        var showAnimPromise = this.animation.show(this.domCtlr.get$obj('all'), showSpeed);
        showAnimPromise.then(function () {
          def.resolve();
          // count++;
          // if(count === 3) def.resolve();
        });

        var scrollAnimPromise = this.animation.scroll(conf.$scroll, scrollSpeed);
      }
      // ---------------------------------------------------------------------------
      // アクティブな状態なtutorialがあるが同じtutorialである(nextやprev経由)
      // ---------------------------------------------------------------------------
      else if (this.hasActive() && tutorial === this.active) {
          this.domCtlr.enable('nextBtn');
          this.domCtlr.enable('prevBtn');
          if (!tutorial.roop) {
            if (tutorial.step.length - 1 <= tutorial.pointer) this.domCtlr.disable('nextBtn');
            if (tutorial.pointer === 0) this.domCtlr.disable('prevBtn');
          }

          // 表示＆移動アニメーション
          // ここ
          this.domCtlr.content(step.content || '').pagerActive(tutorial.pointer).removeStepID().addStepID(tutorial.step.list[tutorial.pointer].name);
          def.resolve();
        }
        // ---------------------------------------------------------------------------
        // アクティブな状態な別のtutorialがある
        // ---------------------------------------------------------------------------
        else {
            this.domCtlr.enable('nextBtn');
            this.domCtlr.enable('prevBtn');
            this.domCtlr.enable('controller');
            this.domCtlr.enable('pager');
            this.domCtlr.enable('skipBtn');
            this.domCtlr.enable('endBtn');
            this.domCtlr.removeTutorialID().removeStepID();
            this.active = undefined;
            showFunc(def, step);
          }
    };

    // =============================================================================
    // 非表示処理
    // =============================================================================
    var proposalOfHiding = function proposalOfHiding(def, tutorial) {
      var _this7 = this;

      var conf = this.conf;
      var speed = conf.animation === true || conf.animation.hide ? conf.hideSpeed : 10;
      if (speed <= 0) speed = 10;
      if (this.active !== tutorial) {
        def.reject();
        return false;
      } else if (this.active === tutorial) {
        var promise = this.animation.hide(this.domCtlr.get$obj('all'), speed);
        promise.then(function () {
          _this7.domCtlr.enable('controller');
          _this7.domCtlr.enable('pager');
          _this7.domCtlr.enable('skipBtn');
          _this7.domCtlr.enable('nextBtn');
          _this7.domCtlr.enable('prevBtn');
          _this7.domCtlr.enable('endBtn');
          _this7.domCtlr.removeTutorialID().removeStepID();
          _this7.active = undefined;
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
        var triggerHookParam = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
          var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
          var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
        var list = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

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
          var _this8 = this;

          if (!Array.isArray(event)) event = [event];
          event.forEach(function (val) {
            return _this8.list[val.name] = val;
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
          var _this9 = this;

          var _target = __private.get(target);
          var _ = __private.get(this);
          var relationList = _target.relationList;

          if (!relationList[this.name]) relationList[this.name] = Object.create(null);
          relationList = relationList[this.name];

          eventList = typeof eventList === 'string' ? [eventList] : eventList;
          eventList.forEach(function (name) {
            if (target.list[name]) relationList[name] = _this9.list[name];
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

    CustomEventContainer.instance = Object.create(null);

    CustomEventContainer.getInstance = function (name) {
      if (CustomEventContainer.instance[name]) return CustomEventContainer.instance[name];
      return new CustomEventContainer(name);
    };

    var Step = function () {
      /*
      * @constructor
      * @param    {Tutorial} tutorial
      * @param    {Object[]} [step]
      * @return   Step
      */
      function Step(tutorial, step, $) {
        _classCallCheck(this, Step);

        this.list = [];
        this.length = 0;
        this.tutorial = tutorial;
        this.$ = $;
        if (step) this.add(step);
      }
      /* */


      _createClass(Step, [{
        key: 'change',

        /*
        * ステップの内容を変更する
        * @function changee
        * @memberof Step
        * @instance
        * @param    {String | Number} order
        * @param    {Object}          step
        * @param    {Boolean}         [partial = true]
        * @return   Step
        */
        value: function change(order, step) {
          var partial = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

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
        /*
        * ステップの内容を置き換える
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
        /*
        * @function addStep
        * @memberof Step
        * @instance
        * @param    {Object | Object[]} step
        * @return   Step
        */

      }, {
        key: 'add',
        value: function add(step) {
          var _this10 = this;

          var steps = Array.isArray(step) ? step : [step];
          steps.forEach(function (step) {
            var newStep = Step.setDefaultProperties(step);
            newStep = Step.setPropertiesFormat(newStep, _this10.$);
            _this10.list.push(newStep);
          });
          this.length = this.list.length;
          __private.get(this.tutorial).emit('step added');
          return this;
        }
        /*
        * @function deleteStep
        * @memberof Step
        * @instance
        * @param    {String | Number | Array.<String|Number>} order
        * @return   Step
        */

      }, {
        key: 'delete',
        value: function _delete(order) {
          var _this11 = this;

          if (order === undefined) {
            this.list = [];
            this.length = this.list.length;
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this11.indexByName(val) : val;
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

        /*
        * @param  {Object} step
        * @return Object
        */
        value: function setDefaultProperties(step) {
          var name = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

          step.pos = Array.isArray(step.pos) ? step.pos : ['center', 'center'];
          if (!step.name) {
            step.name = 'step-#{Step.id}';
            Step.id++;
          }
          if (step.target && !step.scroll) step.scroll = ['left', 'top'];
          return step;
        }
        /*
        *
        */

      }, {
        key: 'setPropertiesFormat',
        value: function setPropertiesFormat(step, $) {
          if (step.target) {
            step.target = Array.isArray(step.target) ? step.target : [step.target];
            step.target.map(function (v, i, arr) {
              if (typeof v === 'string') {
                return $(v);
              } else {
                return v;
              }
            });
          }
          return step;
        }
      }]);

      return Step;
    }();

    Step.id = 0;

    var DOMController = function () {
      /**
      *
      */
      function DOMController(param) {
        var _this12 = this;

        _classCallCheck(this, DOMController);

        if (DOMController.instance) return DOMController.instance;

        var $ = param.$;
        var $window = param.$window;
        var $template = param.$template;
        var zIndex = param.zIndex;
        var $parent = param.$parent;
        var mode = param.mode;
        var BGCanvas = param.BGCanvas;
        var bgColor = param.bgColor;


        this.$ = $;
        this.$window = $window;
        this.$template = $template;
        this.$contentWrap = $('.content-wrap', this.$template);
        this.$content = $('.content', this.$template);
        this.$bg = $('.bg', this.$template);
        this.$pager = $('.pager', this.$template);
        this.$controller = $('.controller', this.$template);
        this.$skipBtn = $('.skip span', this.$controller);
        this.$prevBtn = $('.prev span', this.$controller);
        this.$nextBtn = $('.next span', this.$controller);
        this.$endBtn = $('.end span', this.$controller);
        this.$parent = $parent;
        $template.css({
          'z-index': zIndex,
          'display': 'none',
          'opacity': 0
        });
        if (mode === 'focus') {
          this.bgCanvas = new BGCanvas({
            '$': this.$,
            '$parent': this.$bg,
            'bgColor': bgColor
          });
        }
        this.$contentWrap.css('z-index', zIndex + 2);
        this.$bg.css('z-index', zIndex + 1);

        // add event listener
        this.$skipBtn.on('click', function () {
          if (!_this12.active || _this12.active.fire) return false;
          _this12.active.skip();
        });
        this.$prevBtn.on('click', function () {
          if (!_this12.active || _this12.active.fire) return false;
          _this12.active.prev();
        });
        this.$nextBtn.on('click', function () {
          if (!_this12.active || _this12.active.fire) return false;
          _this12.active.next();
        });
        this.$endBtn.on('click', function () {
          if (!_this12.active || _this12.active.fire) return false;
          _this12.active.next();
        });

        this.$parent.append(this.$template);
      }
      /**
      *
      * @param  {String} name -
      * @return jQuery Object
      */

      /**
      *
      */


      _createClass(DOMController, [{
        key: 'get$obj',
        value: function get$obj(name) {
          switch (name) {
            case 'all':
              return this.$template;
            case 'content-wrap':
              return this.$contentWrap;
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
        *
        */

      }, {
        key: 'addMode',
        value: function addMode(mode, color, interval) {
          if (mode === 'focus') {
            this.$template.addClass('focus');
            var bgCvs = new BGCanvas({
              '$': this.$,
              '$window': this.$window,
              '$parent': this.$bg,
              'bgColor': color,
              'resizeInterval': interval
            });
            bgCvs.draw();
          }
          return this;
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
        /*
        * @param {String} name
        */

      }, {
        key: 'enable',
        value: function enable(name) {
          var $target = this.get$obj(name);
          $target.css('display', '');
          return this;
        }
        /*
        * @param {jQuery | String | DOMObject} cnt
        */

      }, {
        key: 'content',
        value: function content(cnt) {
          this.get$obj('content').empty().append(cnt);
          return this;
        }
        /*
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
        /*
        * @param {Number} index
        */

      }, {
        key: 'pagerActive',
        value: function pagerActive(index) {
          $('li span', this.get$obj('pager')).removeClass('active');
          $('li:eq(' + index + ') span', this.get$obj('pager')).addClass('active');
          return this;
        }
        /*
        *
        */

      }, {
        key: 'addTutorialID',
        value: function addTutorialID(id) {
          this.$contentWrap.attr('data-tutorial', id);
          return this;
        }
        /*
        *
        */

      }, {
        key: 'removeTutorialID',
        value: function removeTutorialID() {
          this.$contentWrap.attr('data-tutorial', '');
          return this;
        }
        /*
        *
        */

      }, {
        key: 'addStepID',
        value: function addStepID(id) {
          this.$contentWrap.attr('data-step', id);
          return this;
        }
        /*
        *
        */

      }, {
        key: 'removeStepID',
        value: function removeStepID() {
          this.$contentWrap.attr('data-step', '');
          return this;
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

        /*
        *
        */
        value: function getInstance() {
          return Animation.instance ? Animation.instance : false;
        }
        /*
        *
        */

      }]);

      function Animation($, Deferred) {
        _classCallCheck(this, Animation);

        if (Animation.instance) return Animation.instance;
        this.$ = $;
        this.Deferred = Deferred;
      }
      /*
      * @param {jQuery} $target
      * @param {Number} speed
      */


      _createClass(Animation, [{
        key: 'show',
        value: function show($target, speed) {
          var def = new this.Deferred();
          $target.stop().css('display', 'block').animate({
            'opacity': 1
          }, speed, function () {
            return def.resolve();
          });
          return def.promise();
        }
        /*
        *
        */

      }, {
        key: 'hide',
        value: function hide($target, speed) {
          var def = new this.Deferred();
          $target.stop().animate({
            'opacity': 0
          }, speed, function () {
            $target.css('display', 'none');
            def.resolve();
          });
          return def.promise();
        }
        /*
        *
        */

      }, {
        key: 'scroll',
        value: function scroll() {}
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
          var rect = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

          this.ctx.fillStyle = this.bgColor;
          this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
          this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
          if (rect) rect.forEach(function (val) {
            return ctx.clearRect(val[0], val[1], val[2], val[3]);
          });
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
    __conf.resizeInterval = 250;
    __conf.scrollInterval = 100;
    __conf.scrollSpeed = 500;
    __conf.showSpeed = 1000;
    __conf.hideSpeed = 500;
    __conf.animation = Object.create(null);
    __conf.animation.show = true;
    __conf.animation.hide = true;
    __conf.animation.scroll = true;
    __conf.animationFPS = 60;
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
      return '\n<div class="tutorial">\n  <div class="content-wrap center-middle">\n    <ol class="pager"></ol>\n    <div class="content"></div>\n    <div class="controller">\n      <ul class="left">\n        <li class="skip"><span>' + __conf.skipLabel + '</span></li>\n      </ul>\n      <ul class="right">\n        <li class="prev"><span>' + __conf.prevLabel + '</span></li>\n        <li class="next"><span>' + __conf.nextLabel + '</span></li>\n        <li class="end"><span>' + __conf.endLabel + '</span></li>\n      </ul>\n    </div>\n  </div>\n  <div class="bg"></div>\n</div>\n';
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