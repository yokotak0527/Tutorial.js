"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var __privateMap = new WeakMap();

    var BGCanvas = function () {
      /**
      *
      */
      function BGCanvas($param) {
        var _this = this;

        _classCallCheck(this, BGCanvas);

        if (BGCanvas.instance) return BGCanvas.instance;

        var $ = $param.$;
        var $window = $param.$window;
        var $parent = $param.$parent;
        var _$param$bgColor = $param.bgColor;
        var bgColor = _$param$bgColor === undefined ? '0x000000' : _$param$bgColor;
        var _$param$resizeInterva = $param.resizeInterval;
        var resizeInterval = _$param$resizeInterva === undefined ? 250 : _$param$resizeInterva;

        $window = $window ? $(window) : $window;

        this.$ = $;
        this.$window = $window;
        this.$parent = $parent;
        this.bgColor = bgColor;
        this.$cvs = $('<canvas>');
        this.cvs = this.$cvs[0];
        this.ctx = this.cvs.getContext('2d');
        this.resizeInterval = resizeInterval;
        this.timer = null;

        this.cvs.width = $window.innerWidth();
        this.cvs.height = $window.innerHeight();

        $window.on('resize', function () {
          if (_this.timer) clearTimeout(_this.timer);
          _this.timer = setTimeout(function () {
            _this.cvs.width = _this.$window.innerWidth();
            _this.cvs.height = _this.$window.innerHeight();
            _this.draw();
          }, _this.resizeInterval);
        });
        this.$parent.append(this.$cvs);
        BGCanvas.instance = this;
        return this;
      }
      /**
      *
      */

      /**
      *
      */


      _createClass(BGCanvas, [{
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

    var EventContainer = function () {
      /*
      * @constructor EventContainer
      * @param       {String}                      name                       - event container name
      * @param       {CustomEvent | CustomEvent[]} [triggerHookParam = false] -
      * @return      EventContainer
      */
      function EventContainer(name) {
        var mediator = arguments.length <= 1 || arguments[1] === undefined ? new EventMediator() : arguments[1];
        var list = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

        _classCallCheck(this, EventContainer);

        if (EventContainer.instance[name]) return EventContainer.getInstance(name);
        this.name = name;
        this.mediator = mediator;
        this.list = Object.create(null);

        var _ = Object.create(null);
        _.relationList = Object.create(null);
        _.otherContainers = Object.create(null);
        // _.otherContainers = Object.create(null);
        __privateMap.set(this, _);
        // _.relationTargets = Object.create(null);
        // this.relationList = Object.create(null);
        // this.other = Object.create(null);
        if (list) this.addEvent(list);
        this.mediator.addContainer(this.name, this);
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
          var _this2 = this;

          if (!Array.isArray(event)) event = [event];
          event.forEach(function (val) {
            return _this2.list[val.name] = val;
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
          var _this3 = this;

          var _target = __privateMap.get(target);
          var _ = __privateMap.get(this);
          var relationList = _target.relationList;

          if (!relationList[this.name]) relationList[this.name] = Object.create(null);
          relationList = relationList[this.name];

          eventList = typeof eventList === 'string' ? [eventList] : eventList;
          eventList.forEach(function (name) {
            if (target.list[name]) relationList[name] = _this3.list[name];
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

    var EventMediator = function () {
      /**
      * @constructor EventMediator
      */
      function EventMediator() {
        _classCallCheck(this, EventMediator);

        if (EventMediator.instance) return EventMediator.instance;
        this.containerList = Object.create(null);
      }
      /*
      * @function addContainer
      * @memberof EventMediator
      * @param    {string}         name      -
      * @param    {EventContainer} container -
      * @return   EventMediator
      */

      /**
      *
      */


      _createClass(EventMediator, [{
        key: 'addContainer',
        value: function addContainer(name, container) {
          this.containerList[name] = container;
          return this;
        }
        /*
        * @function removeContainer
        * @memberof EventMediator
        * @return   EventMediator
        */

      }, {
        key: 'removeContainer',
        value: function removeContainer(name) {
          if (this.containerList[name]) delete this.containerList[name];
          return this;
        }
        /*
        * @function addRelation
        * @memberof EventMediator
        * @return   EventMediator
        */

      }, {
        key: 'addRelation',
        value: function addRelation() {
          return this;
        }
        /*
        * @function removeRelation
        * @memberof EventMediator
        * @return   EventMediator
        */

      }, {
        key: 'removeRelation',
        value: function removeRelation() {
          return this;
        }

        //getEventNames(){
        //  return Object.keys(this.listener);
        //}
        ///**
        //*
        //*/
        //trigger(name){
        //  if(!this.listener[name]) return;
        //  console.log(this.listener);
        //  for(let key in this.listener[name]){
        //    for(let func in this.listener[name][key]){
        //      this.listener[name][key][func]();
        //    }
        //    // console.log(key);
        //    // console.log(this.listener[name][key]);
        //  }
        //}
        ///**
        //*
        //*/
        //addListenerRelation(name, localListener){
        //  let globalListener = this.listener;
        //  for(let key in globalListener){
        //    if(!localListener[key]) continue;
        //    globalListener[key][name] = localListener[key];
        //  }
        //  // console.log(globalListener);
        //  // for(let key in globalListener) globalListener[key][name] = localListener[key];
        //}
        ///**
        //*
        //*/
        //removeListenerRelation(name, localListener){
        //  let globalListener = this.listener;
        //  for(let key in globalListener){
        //    if(!localListener[key]) continue;
        //    delete globalListener[key][name];
        //  }
        //  console.log(globalListener);
        //    // let globalListener = this.listener;
        //    // for(let key in globalListener) delete globalListener[key][id];
        //}

      }]);

      return EventMediator;
    }();

    EventMediator.instance = undefined;

    EventMediator.getInstance = function () {
      return EventMediator.instance || new EventMediator();
    };

    var DOMManager = function () {
      /**
      *
      */
      function DOMManager(param) {
        _classCallCheck(this, DOMManager);

        if (DOMController.instance) return DOMController.instance;

        var $ = param.$;
        var $window = param.$window;
        var $template = param.$template;
        var zIndex = param.zIndex;
        var $parent = param.$parent;
        var mode = param.mode;


        this.$ = $;
        this.$window = $window;
        this.$template = $template;
        this.$contentWrap = $('.content-wrap', this.$template);
        this.$content = $('.content', this.$template);
        this.$bg = $('.bg', this.$template);
        this.$parent = $parent;
        $template.css({
          'z-index': zIndex,
          'display': 'none',
          'opacity': 0
        });
        this.$contentWrap.css('z-index', zIndex + 2);
        this.$bg.css('z-index', zIndex + 1);

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
      */

      /**
      *
      */


      _createClass(DOMManager, [{
        key: 'get$obj',
        value: function get$obj(name) {
          switch (name) {
            case 'all':
              return this.$template;
              break;
            case 'content-wrap':
              break;
            case 'controller':
              break;
            case 'pager':
              break;
            case 'bg':
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

      return DOMManager;
    }();
    //
    // // class BGCanvas{
    // //   static instance = undefined;
    // //   /**
    // //   *
    // //   */
    // //   static getInstance = ()=>{
    // //     return BGCanvas.instance || false;
    // //   };
    // //   /**
    // //   *
    // //   */
    // //   constructor($param){
    // //     if(BGCanvas.instance) return BGCanvas.instance;
    // //
    // //     let {
    // //       $,
    // //       $window,
    // //       $parent,
    // //       bgColor        = '0x000000',
    // //       resizeInterval = 250
    // //     } = $param;
    // //     $window = $window ? $(window) : $window;
    // //
    // //     this.$              = $;
    // //     this.$window        = $window;
    // //     this.$parent        = $parent;
    // //     this.bgColor        = bgColor;
    // //     this.$cvs           = $('<canvas>');
    // //     this.cvs            = this.$cvs[0];
    // //     this.ctx            = this.cvs.getContext('2d');
    // //     this.resizeInterval = resizeInterval;
    // //     this.timer          = null;
    // //
    // //     this.cvs.width     = $window.innerWidth();
    // //     this.cvs.height    = $window.innerHeight();
    // //
    // //     $window.on('resize', ()=>{
    // //       if(this.timer) clearTimeout(this.timer);
    // //       this.timer = setTimeout(()=>{
    // //         this.cvs.width  = this.$window.innerWidth();
    // //         this.cvs.height = this.$window.innerHeight();
    // //         this.draw();
    // //       }, this.resizeInterval);
    // //     });
    // //     this.$parent.append(this.$cvs);
    // //     BGCanvas.instance = this;
    // //     return this;
    // //   }
    // //   /**
    // //   *
    // //   */
    // //   draw(rect = false){
    // //     this.ctx.fillStyle = this.bgColor;
    // //     this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    // //     this.ctx.fillRect(0, 0, this.cvs.width, this.cvs.height);
    // //     if(rect) rect.forEach((val)=> ctx.clearRect(val[0], val[1], val[2], val[3]) );
    // //   }
    // // }

    DOMManager.instance = undefined;

    DOMManager.getInstance = function () {
      return DOMController.instance || false;
    };

    var InstanceMediator = function () {
      /**
      *
      */
      function InstanceMediator() {
        _classCallCheck(this, InstanceMediator);

        if (InstanceMediator.instance) return InstanceMediator.instance;
        this.active = undefined;
        this.list = Object.create(null);
      }
      /**
      *
      */

      /**
      *
      */


      _createClass(InstanceMediator, [{
        key: 'addInstance',
        value: function addInstance(id, instance, eventManager) {
          // eventManager.relation();
          this.list['instance-' + id] = instance;
        }
        /**
        *
        */

      }, {
        key: 'getInstance',
        value: function getInstance(id) {
          return this.list['instance-' + id];
        }
        /**
        *
        */

      }, {
        key: 'deleteInstance',
        value: function deleteInstance(id) {
          var ins = this.list['instance-' + id];
          if (!ins) return;
          if (ins == this.active) this.active = undefined;
          delete this.list['instance-' + id];
        }
        /**
        *
        */

      }, {
        key: 'getActiveInstance',
        value: function getActiveInstance() {
          return this.active;
        }
        /**
        *
        */

      }, {
        key: 'setActiveInstance',
        value: function setActiveInstance(newActive) {
          this.active = newActive;
        }
      }]);

      return InstanceMediator;
    }();

    InstanceMediator.instance = undefined;

    InstanceMediator.getInstance = function () {
      return InstanceMediator.instance || false;
    };

    var __first = true;
    var __TutorialID = 0;
    /** ============================================================================
    *
    */
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
    Object.seal(__conf);

    var __animate = Object.create(null);

    __animate.show = function (step, deferred) {
      var time = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];

      var _ = __privateMap.get(undefined);
      var conf = __conf;
      var $ = conf.$;
      var $window = conf.$window;
      time = time < 0 ? __conf.fadeinSpeed : time;

      __$tutorial.css('display', '');
      __$tutorial.animate({
        'opacity': 1
      }, time, function () {
        return deferred.resolve();
      });

      // 250mm

      //let $cnt = __$content;
      deferred.resolve();
    };

    __animate.hide = function () {};
    __animate.move = function () {};

    var __adjustStepNum = function __adjustStepNum() {
      var _ = __privateMap.get(this);
      _.num = _.step.length;
    };

    var __addEventListenerRelation = function __addEventListenerRelation() {
      var _ = __privateMap.get(this);
      var id = 'instance-' + this.id;
      var globalListener = __listener;
      var localListener = _.listener;
      for (var key in globalListener) {
        globalListener[key][id] = localListener[key];
      }
    };
    var __removeEventListenerRelation = function __removeEventListenerRelation() {
      var _ = __privateMap.get(this);
      var id = 'instance-' + this.id;
      var globalListener = __listener;
      var localListener = _.listener;
      for (var key in globalListener) {
        delete globalListener[key][id];
      }
    };

    var __changePointer = function __changePointer(order) {
      var _ = __privateMap.get(this);
      if (this.isFire) return order;
      order = typeof order === 'string' ? this.name2index(order) : typeof order === 'number' ? order : _.pointer;
      order = this.getPointer() < order ? this.getPointer() - 1 : order;
      order = order < 0 ? 0 : order;
      _.pointer = order;
      return _.pointer;
    };

    var Tutorial = function () {
      _createClass(Tutorial, null, [{
        key: 'changeConfig',


        /**
        * @function Tutorial.changeConfig
        *
        * @desc  change Tutorial.js configuration.
        * @param {(String|Object[])} name
        * @param {String}            name.name
        * @param {*}                 name.val
        * @param {*}                 [val]
        */
        value: function changeConfig(key, val) {
          var confArr = Array.isArray(key) ? key : [{ 'key': key, 'val': val }];
          confArr.forEach(function (obj) {
            return __conf[obj.key] = obj.val;
          });
        }

        /**
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
        *
        * @return Tutorial
        */

      }]);

      function Tutorial() {
        var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tutorial);

        var conf = __conf;
        var $ = conf.$;
        var instanceMed = new InstanceMediator();

        // set default global events
        if (__first) {
          (function () {
            var events = [];
            conf.defaultEventConf.forEach(function (val) {
              var name = val[0];
              var triggerHook = val[1];
              events.push(new CustomEvent(name, triggerHook));
            });
            new EventContainer('global', new EventMediator(), events);
          })();
        }
        // ---------------------------------------------------------------------------
        // set instance member.
        this.id = 'tutorial-' + __TutorialID;
        // ---------------------------------------------------------------------------
        // set private member.
        var _ = Object.create(null);
        _.step = [];
        _.active = false;
        _.fire = false;
        _.num = 0;
        _.pointer = param.startStep ? param.startStep : 0;
        _.animation = typeof param.animation === 'boolean' ? param.animation : true;
        _.roop = typeof param.roop === 'boolean' ? param.roop : false;
        // _.listener  = Object.create(null);
        if (param.step) {
          this.addStep(param.step);
          _.pointer = param.startStep ? typeof param.startStep === 'string' ? this.name2index(param.startStep) : param.startStep : 0;
        }

        var events = [];
        conf.defaultEventConf.forEach(function (val) {
          var name = val[0];
          var triggerHook = val[1];
          events.push(new CustomEvent(name, triggerHook));
        });
        _.event = new EventContainer(this.id, new EventMediator(), events);

        _.event.addEventListener('resize', function (param) {
          console.log('ok');
        });
        // _.event.trigger('resize');

        var gEvent = EventContainer.getInstance('global');
        _.event.addRelation(gEvent, 'resize');
        if (__first) _.event.removeAllRelation();
        // _.event.addRelation(gEvent, 'resize');

        gEvent.trigger('resize');

        //   // Object.seal(_.listener);
        //   __privateMap.set(this, _);
        //
        //
        //   // console.log(_.listener);
        //   // eventMgr.addListenerRelation(this.id, _.listener);
        //
        //   // _.listener['resize']['test'] = ()=>{
        //     // console.log('ok');
        //   // };
        //
        //
        //   // eventMgr.trigger('resize');
        //   // eventMgr.removeListenerRelation(this.id, _.listener);
        //   // instanceMgr.addInstance(this.id, this, eventMgr);
        //
        //   // ---------------------------------------------------------------------------
        //   // set event relation.
        //   __addEventListenerRelation.call(this);
        //   __adjustStepNum.call(this);
        //
        //   // if first instance
        //   if(__first){
        //
        //     if(conf.$window === null) conf.$window = $(window);
        //     if(conf.$parent === null) conf.$parent = $('body');
        //     if(conf.$scroll === null) conf.$scroll = $('body');
        //
        //     let domCtrl = new DOMController({
        //       '$'         : $,
        //       '$window'   : conf.$window,
        //       '$template' : $(conf.template()),
        //       'zIndex'    : conf.zIndex,
        //       '$parent'   : conf.$parent
        //     });
        //
        //     if(conf.mode === 'focus') domCtrl.addMode('focus', conf.focusBGColor, conf.resizeInterval);
        //
        //
        //     // add resize event.
        //     let resizeTimer = null;
        //     conf.$window.on('resize', (e)=>{
        //       if(resizeTimer) clearTimeout(resizeTimer);
        //       resizeTimer = setTimeout(()=>{
        //         let w        = conf.$window.innerWidth();
        //         let h        = conf.$window.innerHeight();
        //         let listener = __listener['resize'];
        //         for(let instance in listener){
        //           let self = __instanceList[instance];
        //           for(let key in listener[instance]){
        //             listener[instance][key].call(self, e, {w:w, h:h});
        //           }
        //         }
        //       }, conf.resizeInterval);
        //     });
        //
        //     //// add click skip btn event.
        //     //$('.controller .skip span', $cnt).on('click', (e)=>{
        //     //  if(__activeInstance) __activeInstance.skip();
        //     //});
        // //
        //     //// add click prev btn event.
        //     //$('.controller .prev span', $cnt).on('click', (e)=>{
        //     //  if(__activeInstance) __activeInstance.prev();
        //     //});
        // //
        //     //// add click next btn event.
        //     //$('.controller .next span', $cnt).on('click', (e)=>{
        //     //    if(__activeInstance) __activeInstance.next();
        //     //});
        // //
        //     //// add click end btn event.
        //     //$('.controller .end span', $cnt).on('click', (e)=>{
        //     //  if(__activeInstance) __activeInstance.end();
        //     //});
        //
        if (__first) __first = false;
        __TutorialID++;
      }

      /**
      * @function addStep
      *
      * @memberof Tutorial
      * @instance
      * @param    {Object | Object[]} step
      */


      _createClass(Tutorial, [{
        key: 'addStep',
        value: function addStep(step) {
          var steps = Array.isArray(step) ? step : [step];
          var _ = __privateMap.get(this);
          steps.forEach(function (obj) {
            return _.step.push(obj);
          });
          __adjustStepNum.call(this);
          return this;
        }

        /**
        * @function removeStep
        *
        * @memberof Tutorial
        * @instance
        * @param    {String | Number | Array.<String|Number>} order
        */

      }, {
        key: 'removeStep',
        value: function removeStep(order) {
          var _this4 = this;

          var _ = __privateMap.get(this);
          if (order === undefined) {
            _.step = [];
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this4.indexByName(val) : val;
            });
            var newStep = _.step.filter(function (val, i) {
              var flg = true;
              for (var _i = 0, _l = order.length; _i < _l; _i++) {
                if (order[_i] === i) {
                  flg = false;
                  break;
                }
              }
              if (flg) return val;
            });
            _.step = newStep;
          }
          __adjustStepNum.call(this);
          return this;
        }

        /**
        * @function changeeStep
        *
        * @memberof Tutorial
        * @instance
        * @param {String | Number} order
        * @param {Object}          step
        */

      }, {
        key: 'changeStep',
        value: function changeStep(order, step) {
          var _ = __privateMap.get(this);
          order = typeof order === 'string' ? this.indexByName(order) : order;
          if (order < 0) return;
          _.step[order] = step;
        }

        /**
        *
        */

      }, {
        key: 'prev',
        value: function prev(step) {
          var _ = __privateMap.get(this);

          this.show(_.pointer);
          return this;
        }

        /**
        *
        */

      }, {
        key: 'next',
        value: function next(step) {
          var _ = __privateMap.get(this);
          // _.active = true;
          this.show(_.pointer);
          return this;
        }

        /**
        * @function hide
        *
        * @memberof Tutorial
        * @instance
        */

      }, {
        key: 'hide',
        value: function hide(step) {
          if (!__activeInstance) return this;
          var _ = __privateMap.get(this);
          __$content.empty();
          __activeInstance = undefined;
          _.active = false;
          return this;
        }

        /**
        * @function show
        *
        * @memberof Tutorial
        * @instance
        * @return {Number | String} [order]
        */

      }, {
        key: 'show',
        value: function show(order) {
          var animationDisable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];


          var _ = __privateMap.get(this);
          var $ = __conf.$;
          var d = new $.Deferred();

          // if(this.isFire) this.stop();

          order = __changePointer.call(this, order);
          var step = _.step[order];

          if (__activeInstance && __activeInstance === this) __$content.empty();
          if (__activeInstance && __activeInstance !== this) __activeInstance.destroy();

          _.fire = true;
          _.active = true;

          d.done(function () {
            console.log("dds");
          });

          __activeInstance = this;

          if (animationDisable || !_.animation) __animate.show.call(this, step, d, 0);else __animate.show.call(this, step, d);

          // if((__activeInstance && __activeInstance === this)){
          // console.log("ok");
          // }


          // this.id
          // let _ = privateMap.get(this);
          // order = order || _.pointer;


          // _.animation
        }

        /**
        *
        */

      }, {
        key: 'getPointer',
        value: function getPointer() {
          var _ = __privateMap.get(this);
          return _.step.length;
        }

        /**
        * @function addEventListener
        *
        * @memberof Tutorial
        * @instance
        * @param    {String}   eventName
        * @param    {String}   [name]
        * @param    {Function} callback
        
        * @return {String} - event listener name.
        */

      }, {
        key: 'addEventListener',
        value: function addEventListener(eventName, name, callback) {
          var _ = __privateMap.get(this);
          var conf = __conf;
          var listener = _.listener;
          if (typeof name === 'function') {
            callback = name;
            name = 'el-' + this.id + '-' + Math.random().toString(36).slice(-10);
          }
          if (!listener[eventName]) return '';
          listener[eventName][name] = callback;
          return name;
        }

        /**
        * @function removeEventListener
        *
        * @memberof Tutorial
        * @instance
        * @param    {String}   eventName
        * @param    {String}   [name]
        */

      }, {
        key: 'removeEventListener',
        value: function removeEventListener(eventName, name) {}

        /**
        * @function isActive
        *
        * @memberof Tutorial
        * @instance
        * @return {Boolean}
        */

      }, {
        key: 'isActive',
        value: function isActive() {
          var _ = __privateMap.get(this);
          return _.active;
        }

        /**
        * @function isFire
        *
        * @memberof Tutorial
        * @instance
        * @return {Boolean}
        */

      }, {
        key: 'isFire',
        value: function isFire() {
          var _ = __privateMap.get(this);
          return _.fire;
        }

        /**
        * @function indexByName
        *
        * @memberof Tutorial
        * @instance
        * @param    {String} name - step name.
        * @return   {Number|Number[]}
        */

      }, {
        key: 'indexByName',
        value: function indexByName(name) {
          if (typeof name !== 'string') return -1;
          var _ = __privateMap.get(this);
          var arr = [];
          _.step.forEach(function (el, i) {
            if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.name === name) arr.push(i);
          });
          return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
        }
      }]);

      return Tutorial;
    }();

    window.Tutorial = Tutorial;
  })();
}