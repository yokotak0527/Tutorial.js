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
        var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tutorial);

        var conf = __conf;
        var $ = conf.$;
        var _ = Object.create(null);
        __private.set(this, _);
        // let animationKind = ['fadeInOut', 'scroll'];
        this.mediator = new TutorialMediator(this, conf);
        this.domCtrl = this.mediator.domCtrl;
        this.fire = false;
        this.pointer = param.startStep ? param.startStep : 0;
        this.roop = typeof param.roop === 'boolean' ? param.roop : false;
        this.Deferred = conf.Deferred;
        this.pager = typeof param.pager === 'boolean' ? param.pager : true;
        this.controller = typeof param.controller === 'boolean' ? param.controller : true;
        this.step = new Step(param.step || false);

        if (__first) __first = false;
      }
      /*
      *
      */


      _createClass(Tutorial, [{
        key: 'next',
        value: function next() {
          if (this.fire) return false;
          var promise = this.mediator.appeal(this, 'next');
          // this.pointer
        }
        /*
        *
        */

      }, {
        key: 'prev',
        value: function prev() {
          if (this.fire) return false;
          var promise = this.mediator.appeal(this, 'prev');
          // this.pointer
        }
        /*
        *
        */

      }, {
        key: 'skip',
        value: function skip() {
          var promise = this.mediator.appeal(this, 'prev');
        }
        /*
        *
        */

      }, {
        key: 'end',
        value: function end() {
          var promise = this.mediator.appeal(this, 'prev');
        }
        /*
        * @param  {String} order
        * @return {SimplePromise}
        */

      }, {
        key: 'show',
        value: function show() {
          var _this = this;

          var order = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

          order = typeof order === 'string' ? this.step.indexByName(order) : order;
          order = !this.step.list[order] ? this.pointer : order;
          var step = this.step.list[order];
          this.fire = true;

          // 内容の切り替えはメディエータに任せる。
          var promise = this.mediator.appeal(this, 'show', step);
          var def = new this.Deferred();
          promise.then(function () {
            _this.fire = false;
            def.resolve();
          });
          return def.promise();
        }
        /*
        * @return {SimplePromise}
        */

      }, {
        key: 'hide',
        value: function hide() {
          // if(!this.fire) return false;
          var promise = this.mediator.appeal(this, 'hide');
          var def = new this.Deferred();
          return def.promise();
        }
        /*
        *
        */

      }, {
        key: 'destroy',
        value: function destroy() {
          // let promise = this.mediator.appeal(this, 'show');
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
              // self.eventCtnr.trigger('pager');
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

            // let events  = [];

            // globalEvent = new EventContainer('global');
            //   conf.defaultEventConf.forEach((val)=>{
            //     let name        = val[0];
            //     let triggerHook = val[1];
            //     events.push(new CustomEvent(name, triggerHook));
            //   });
            //   new EventContainer('global', events);
            // }
            // let globalEvent = EventContainer.getInstance('global');


            self.list = Object.create(null);
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
        * @param {Step}     ops
        */

      }, {
        key: 'appeal',
        value: function appeal(tutorial, type, ops) {
          var _this2 = this;

          var def = new this.Deferred();

          // 表示するための処理
          var showFunc = function showFunc(step) {
            var conf = _this2.conf;
            var speed = conf.animation === true || conf.animation.show ? conf.showSpeed : 0;
            var $parent = _this2.domCtlr.get$obj('content');
            var $pager = _this2.domCtlr.get$obj('pager');
            var $skipBtn = _this2.domCtlr.get$obj('skipBtn');
            var $prevBtn = _this2.domCtlr.get$obj('prevBtn');
            var $nextBtn = _this2.domCtlr.get$obj('nextBtn');
            var $endBtn = _this2.domCtlr.get$obj('endBtn');
            if (!_this2.active) {
              _this2.active = tutorial;
              $parent.empty().append(step.$cnt || '');
              // ここから
              var promise = _this2.animation.show(_this2.domCtlr.get$obj('all'), speed);
              promise.then(function () {
                return def.resolve();
              });
            } else {

              // let promise = this.active.hide();

              //  promise.then(()=>{
              //    this.active = tutorial;
              //    def.resolve();
              //  });
            }
          };

          // 非表示するための処理
          var hideFunc = function hideFunc(tutorial) {
            if (_this2.active !== tutorial) {
              def.reject();
              return false;
            }
            // 処理
          };

          switch (type) {
            // -----------------------------------------------------------------------
            case 'show':
              setTimeout(showFunc.bind(this, ops), 10);
              return def.promise();
            // -----------------------------------------------------------------------
            case 'hide':
              setTimeout(hideFunc.bind(this, tutorial), 10);
              return def.promise();
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

    TutorialMediator.instance = undefined;
    TutorialMediator.idNum = 0;

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
          var _this3 = this;

          if (!Array.isArray(event)) event = [event];
          event.forEach(function (val) {
            return _this3.list[val.name] = val;
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
          var _this4 = this;

          var _target = __private.get(target);
          var _ = __private.get(this);
          var relationList = _target.relationList;

          if (!relationList[this.name]) relationList[this.name] = Object.create(null);
          relationList = relationList[this.name];

          eventList = typeof eventList === 'string' ? [eventList] : eventList;
          eventList.forEach(function (name) {
            if (target.list[name]) relationList[name] = _this4.list[name];
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
      * @param    {Object[]} step
      * @return   Step
      */
      function Step(step) {
        _classCallCheck(this, Step);

        this.list = [];
        this.length = 0;
        if (step) this.add(step);
      }
      /* */


      _createClass(Step, [{
        key: 'change',

        /*
        * ステップの内容を変更する
        * @function changeeStep
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
          return this;
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
          var _this5 = this;

          var steps = Array.isArray(step) ? step : [step];
          steps.forEach(function (step) {
            return _this5.list.push(Step.setDefaultProperties(step));
          });
          this.length = this.list.length;
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
          var _this6 = this;

          if (order === undefined) {
            this.list = [];
            this.length = this.list.length;
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this6.indexByName(val) : val;
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

          step.pager = typeof step.pager === 'boolean' ? step.pager : true;
          step.controller = typeof step.controller === 'boolean' ? step.controller : true;
          step.skipBtn = typeof step.skipBtn === 'boolean' ? step.skipBtn : true;
          step.pos = Array.isArray(step.pos) ? step.pos : ['center', 'center'];
          if (!step.name) {
            step.name = 'step-#{Step.id}';
            Step.id++;
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
        this.$skipBtn = $('.skip', this.$controller);
        this.$prevBtn = $('.prev', this.$controller);
        this.$nextBtn = $('.next', this.$controller);
        this.$endBtn = $('.end', this.$controller);
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

        // this.$pager
        // eventContainer


        // add click skip btn event.
        // $('.controller .skip span', $cnt).on('click', (e)=>{
        // if(__activeInstance) __activeInstance.skip();
        // });

        //// add click prev btn event.
        //$('.controller .prev span', $cnt).on('click', (e)=>{
        //  if(__activeInstance) __activeInstance.prev();
        //});
        //
        //// add click next btn event.
        //$('.controller .next span', $cnt).on('click', (e)=>{
        //    if(__activeInstance) __activeInstance.next();
        //});
        //
        //// add click end btn event.
        //$('.controller .end span', $cnt).on('click', (e)=>{
        //  if(__activeInstance) __activeInstance.end();
        //});

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
              break;
            case 'content-wrap':
              return this.$contentWrap;
              break;
            case 'content':
              return this.$content;
              break;
            case 'controller':
              return this.$controller;
              break;
            case 'skipBtn':
              return this.$skipBtn;
              break;
            case 'prevBtn':
              return this.$prevBtn;
              break;
            case 'nextBtn':
              return this.$nextBtn;
              break;
            case 'endBtn':
              return this.$nextBtn;
              break;
            case 'pager':
              return this.$pager;
              break;
            case 'bg':
              return this.$bg;
              break;
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
      *
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
        value: function hide() {
          var def = new this.Deferred();
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
      return '\n<div class="tutorial">\n<div class="content-wrap center-middle">\n <ol class="pager">\n  <li><span class="active">1</span></li>\n  <li><span>2</span></li>\n  <li><span>3</span></li>\n  <li><span>4</span></li>\n  <li><span>5</span></li>\n </ol>\n <div class="content"></div>\n <div class="controller">\n   <ul class="left">\n     <li class="skip"><span>' + __conf.skipLabel + '</span></li>\n   </ul>\n   <ul class="right">\n     <li class="prev"><span>' + __conf.prevLabel + '</span></li>\n     <li class="next"><span>' + __conf.nextLabel + '</span></li>\n     <li class="end"><span>' + __conf.endLabel + '</span></li>\n   </ul>\n </div>\n</div>\n<div class="bg"></div>\n</div>\n';
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