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
        this.step = new Step(param.step || false);
        this.fire = false;
        this.pointer = param.startStep ? param.startStep : 0;
        this.roop = typeof param.roop === 'boolean' ? param.roop : false;

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
        }
        /*
        *
        */

      }, {
        key: 'prev',
        value: function prev() {
          if (this.fire) return false;
          var promise = this.mediator.appeal(this, 'prev');
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
        *
        */

      }, {
        key: 'show',
        value: function show() {
          if (this.fire) return false;
          var promise = this.mediator.appeal(this, 'show');
        }
        /*
        *
        */

      }, {
        key: 'hide',
        value: function hide() {
          var promise = this.mediator.appeal(this, 'show');
        }
        /*
        *
        */

      }, {
        key: 'destroy',
        value: function destroy() {
          var promise = this.mediator.appeal(this, 'show');
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
          self.$ = conf.$;
          self.$window = conf.$window || $(window);
          self.$parent = conf.$parent || $('body');
          self.$scroll = conf.$scroll || $('body');
          self.Deferred = conf.Deferred;

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
        */

      }, {
        key: 'appeal',
        value: function appeal(tutorial, type) {
          var Deferred = this.Deferred;
          switch (type) {
            case 'show':
              var _def = new Deferred();
              var _p = _def.promise();
              _p.then(function () {
                console.log('ok');
              }, function () {
                console.log(this);
              });
              _def.reject();
              break;
          }
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

        __privateMap.set(this, _);

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

          var _ = __privateMap.get(this);
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
          var _ = __privateMap.get(this);
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
          var _ = __privateMap.get(this);
          var param = _.triggerHook.func.call(_.triggerHook.this, _.triggerHook.ags);

          for (var name in this.list) {
            this.list[name].call(this, param);
          }return this;
        }
      }]);

      return CustomEvent;
    }();

    var Step = function () {
      /*
      * @param    {Object[]} step
      * @return   Step
      */
      function Step(step) {
        _classCallCheck(this, Step);

        this.list = [];
        this.length = 0;
        if (step) this.add(step);
      }
      /*
      * ステップの内容を変更する
      * @function changeeStep
      * @memberof Step
      * @instance
      * @param    {String | Number} order
      * @param    {Object}          step
      * @return   Step
      */


      _createClass(Step, [{
        key: 'change',
        value: function change(order, step) {
          order = typeof order === 'string' ? this.indexByName(order) : order;
          if (order < 0) return;
          this.list[order] = step;
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
          var _this = this;

          var steps = Array.isArray(step) ? step : [step];
          steps.forEach(function (obj) {
            return _this.list.push(obj);
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
          var _this2 = this;

          if (order === undefined) {
            this.list = [];
            this.length = this.list.length;
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this2.indexByName(val) : val;
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
      }]);

      return Step;
    }();

    var EventContainer = function () {
      /*
      * @constructor EventContainer
      * @param       {String}                      name                       - event container name
      * @param       {CustomEvent | CustomEvent[]} [triggerHookParam = false] -
      * @return      EventContainer
      */
      function EventContainer(name) {
        var list = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

        _classCallCheck(this, EventContainer);

        if (EventContainer.instance[name]) return EventContainer.getInstance(name);
        this.name = name;
        this.list = Object.create(null);

        var _ = Object.create(null);
        _.relationList = Object.create(null);
        _.otherContainers = Object.create(null);
        __privateMap.set(this, _);

        if (list) this.addEvent(list);
        EventContainer.instance[name] = this;
      }
      /*
      * @function addEvent
      * @memberof EventContainer
      * @param    {CustomEvent | CustomEvent[]} event -
      * @return   EventContainer
      */

      /*
      *
      */


      _createClass(EventContainer, [{
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
        * @memberof EventContainer
        * @param    {String}       [name] -
        * @return   EventContainer
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
        * @memberof EventContainer
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
        * @memberof EventContainer
        * @param    {String}            eventName      -
        * @param    {String}            [listenerName] -
        * @return   EventContainer
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
        * @memberof EventContainer
        * @param    {String}       eventName
        * @return   EventContainer
        */

      }, {
        key: 'trigger',
        value: function trigger(eventName) {
          var _ = __privateMap.get(this);
          var relationList = _.relationList;
          // console.log(relationList);
          if (this.list[eventName]) this.list[eventName].trigger();
          for (var containerName in relationList) {
            if (relationList[containerName][eventName]) relationList[containerName][eventName].trigger();
          }

          return this;
        }
        /*
        * @function addRelation
        * @memberof EventContainer
        * イベントコンテナと他のイベントコンテナを親-子の関係で紐付ける。
        * 第1引数に親となるイベントコンテナ、第2引数に親が持っている紐付けるイベント名
        * @param    {EventContainer}    target    - parent EventContainer
        * @param    {String | String[]} eventList - event name of parent EventContainer to relate container.
        * @return   EventContainer
        */

      }, {
        key: 'addRelation',
        value: function addRelation(target, eventList) {
          var _this4 = this;

          var _target = __privateMap.get(target);
          var _ = __privateMap.get(this);
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
        * @memberof EventContainer
        * @param    {EventContainer} target -
        * @return   EventContainer
        */

      }, {
        key: 'removeRelation',
        value: function removeRelation(target, eventList) {
          var _target = __privateMap.get(target);
          var _ = __privateMap.get(this);
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
        * @memberof EventContainer
        * @return   EventContainer
        */

      }, {
        key: 'removeAllRelation',
        value: function removeAllRelation(target) {
          var _ = __privateMap.get(this);
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

      return EventContainer;
    }();

    EventContainer.instance = Object.create(null);

    EventContainer.getInstance = function (name) {
      if (EventContainer.instance[name]) return EventContainer.instance[name];
      return new EventContainer(name);
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

    var __first = true;

    var __conf = Object.create(null);
    __conf.mode = 'focus'; // focus | arrow
    __conf.resizeInterval = 250;
    __conf.scrollSpeed = 500;
    __conf.fadeinSpeed = 500;
    __conf.fadeoutSpeed = 500;
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
    __conf.focusBGColor = 'rgba(0, 0, 0, 0.5)';
    __conf.template = function () {
      return '\n<div class="tutorial">\n<div class="content-wrap center-middle">\n <ol class="pager">\n  <li><span class="active">1</span></li>\n  <li><span>2</span></li>\n  <li><span>3</span></li>\n  <li><span>4</span></li>\n  <li><span>5</span></li>\n </ol>\n <div class="content"></div>\n <div class="controller">\n   <ul class="left">\n     <li class="skip"><span>' + __conf.skipLabel + '</span></li>\n   </ul>\n   <ul class="right">\n     <li class="prev"><span>' + __conf.prevLabel + '</span></li>\n     <li class="next"><span>' + __conf.nextLabel + '</span></li>\n     <li class="end"><span>' + __conf.endLabel + '</span></li>\n   </ul>\n </div>\n</div>\n<div class="bg"></div>\n</div>\n';
    };
    __conf.defaultEventConf = [['resize', false], ['scroll', false], ['beforeAddStep', false], ['afterAddStep', false], ['beforeRemoveStep', false], ['afterRemoveStep', false], ['beforeChangeStep', false], ['afterChangeStep', false], ['beforeShow', false], ['afterShow', false], ['beforeNext', false], ['afterNext', false], ['beforePrev', false], ['afterPrev', false], ['beforeHide', false], ['afterHide', false], ['beforeDestory', false], ['afterDestory', false], ['beforeSkip', false], ['afterSkip', false]];
    __conf.Deferred = SimpleDeferred;
    Object.seal(__conf);

    window.Tutorial = Tutorial;
  })();
}