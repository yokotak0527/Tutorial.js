"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var __privateMap = new WeakMap();

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
    __conf.eventNames = ['resize', 'scroll'];
    Object.seal(__conf);
    /** ============================================================================
    *
    */
    var __listener = Object.create(null);
    __listener.resize = Object.create(null);
    __listener.scroll = Object.create(null);
    {
      var e = ['AddStep', 'RemoveStep', 'ChangeStep', 'Show', 'Next', 'Prev', 'Hide', 'Destory', 'Skip'];
      e.forEach(function (val, i) {
        __listener['before' + val] = Object.create(null);
        __listener['after' + val] = Object.create(null);
      });
    }
    Object.seal(__listener);
    /** ============================================================================
    *
    */
    var __instanceList = Object.create(null);
    /** ============================================================================
    *
    */

    var __$content = void 0;
    var __activeInstance = void 0;

    var __canvasParam = Object.create(null);

    var __animate = Object.create(null);

    __animate.show = function (deferred) {
      var time = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];

      time = time < 0 ? __conf.fadeinSpeed : time;

      //let _    = __privateMap.get(this);
      //let $    = __conf.$;
      //let $cnt = __$content;
      deferred.resolve();
    };

    __animate.hide = function () {};
    __animate.move = function () {};

    var __adjustStepNum = function __adjustStepNum() {
      var _ = __privateMap.get(this);
      _.num = _.step.length;
    };

    var __canvasBGSetup = function __canvasBGSetup($parent) {
      var conf = __conf;
      var $ = conf.$;
      var $win = conf.$window;
      var $canvas = $('<canvas>');

      var param = __canvasParam;
      param.w = 0;
      param.h = 0;
      param.bgColor = conf.focusBGColor;
      param.rect = [[0, 0, 0, 0]]; // x, y, w, h
      param.$cvs = $canvas;
      param.cvs = param.$cvs[0];
      param.ctx = param.cvs.getContext('2d');

      $win.on('resize', function () {
        var timer = null;
        var w = null;
        var h = null;
        return function () {
          if (timer) clearTimeout(timer);
          timer = setTimeout(function () {
            w = $win.innerWidth();
            h = $win.innerHeight();
            param.cvs.width = w;
            param.cvs.height = h;
            param.ctx.fillStyle = param.bgColor;
            param.ctx.clearRect(0, 0, w, h);
            param.ctx.fillRect(0, 0, w, h);
            if (param.rect) param.rect.forEach(function (val) {
              return param.ctx.clearRect(val[0], val[1], val[2], val[3]);
            });
          }, conf.resizeInterval);
        };
      }());

      $parent.append($canvas);
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
        * @param  {Object}   [param]                   - Tutorial instance setting parameter
        * @param  {Boolean}  [param.auto  = false]     - auto start.
        * @param  {Boolean}  [param.skip  = true]      - use skip button.
        * @param  {Boolean}  [param.pager = true]      - use pager.
        * @param  {Boolean}  [param.controller = true] - use controller.
        * @param  {Object[]} [param.step]
        *
        * @return Tutorial
        */

      }]);

      function Tutorial() {
        var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tutorial);

        var conf = __conf;
        var $ = conf.$;
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
        _.pointer = param.startStep ? typeof param.startStep === 'string' ? this.name2index(param.startStep) : param.startStep : 0;
        _.listener = Object.create(null);
        Object.keys(__listener).forEach(function (val, i) {
          return _.listener[val] = Object.create(null);
        });
        Object.seal(_.listener);
        __privateMap.set(this, _);

        // ---------------------------------------------------------------------------
        // set instance member.
        this.id = __TutorialID;

        __instanceList['instance-' + this.id] = this.id;

        // ---------------------------------------------------------------------------
        // set event relation.
        __addEventListenerRelation.call(this);
        __adjustStepNum.call(this);

        // if first instance
        if (__first) {
          (function () {

            if (conf.$window === null) conf.$window = $(window);
            if (conf.$parent === null) conf.$parent = $('body');
            if (conf.$scroll === null) conf.$scroll = $('body');

            // add HTML
            var $cnt = $(conf.template());
            $cnt.css('z-index', conf.zIndex);
            $('.content-wrap', $cnt).css('z-index', conf.zIndex + 2);
            $('.bg', $cnt).css('z-index', conf.zIndex + 1);
            conf.$parent.append($cnt);
            __$content = $('.content', $cnt);
            if (conf.mode === 'focus') {
              $cnt.addClass('focus');
              __canvasBGSetup($('.bg', $cnt));
            }

            // add resize event.
            var resizeTimer = null;
            conf.$window.on('resize', function (e) {
              if (resizeTimer) clearTimeout(resizeTimer);
              resizeTimer = setTimeout(function () {
                var w = conf.$window.innerWidth();
                var h = conf.$window.innerHeight();
                var listener = __listener['resize'];
                for (var instance in listener) {
                  var self = __instanceList[instance];
                  for (var key in listener[instance]) {
                    listener[instance][key].call(self, e, { w: w, h: h });
                  }
                }
              }, conf.resizeInterval);
            });

            // add click skip btn event.
            $('.controller .skip span', $cnt).on('click', function (e) {
              if (__activeInstance) __activeInstance.skip();
            });

            // add click prev btn event.
            $('.controller .prev span', $cnt).on('click', function (e) {
              if (__activeInstance) __activeInstance.prev();
            });

            // add click next btn event.
            $('.controller .next span', $cnt).on('click', function (e) {
              if (__activeInstance) __activeInstance.next();
            });

            // add click end btn event.
            $('.controller .end span', $cnt).on('click', function (e) {
              if (__activeInstance) __activeInstance.end();
            });

            __first = false;
          })();
        }
        // if param has step property. set step to private member
        if (param.step) this.addStep(param.step);
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
          var _this = this;

          var _ = __privateMap.get(this);
          if (order === undefined) {
            _.step = [];
          } else {
            if (!Array.isArray(order)) order = [order];
            order = order.map(function (val) {
              return typeof val === 'string' ? _this.indexByName(val) : val;
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

          if (this.isFire) this.fastForward();

          order = __changePointer.call(this, order);
          var step = _.step[order];
          console.log(step);

          if (__activeInstance && __activeInstance === this) __$content.empty();
          if (__activeInstance && __activeInstance !== this) __activeInstance.destroy();

          _.active = true;

          d.done(function () {
            console.log("dds");
          });

          __activeInstance = this;

          if (animationDisable || !_.animation) __animate.show.call(this, d, 0);else __animate.show.call(this, d);

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