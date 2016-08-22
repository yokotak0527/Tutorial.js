"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var privateMap = new WeakMap();
    // ===========================================================================
    var first = true;
    var TutorialID = 0;
    var conf = Object.create(null);
    conf.mode = 'focus'; // focus | arrow
    conf.resizeInterval = 250;
    conf.scrollSpeed = 500;
    conf.skipLabel = 'Skip';
    conf.prevLabel = 'Prev';
    conf.nextLabel = 'Next';
    conf.endLabel = 'End';
    conf.$parent = null;
    conf.$scroll = null;
    conf.zIndex = 9000;
    conf.$ = $;
    conf.template = function () {
      return '\n<div class="tutorial">\n <div class="content-wrap center-middle">\n   <ol class="pager">\n    <li><span class="active">1</span></li>\n    <li><span>2</span></li>\n    <li><span>3</span></li>\n    <li><span>4</span></li>\n    <li><span>5</span></li>\n   </ol>\n   <div class="content"></div>\n   <div class="controller">\n     <ul class="left">\n       <li class="skip"><span>' + conf.skipLabel + '</span></li>\n     </ul>\n     <ul class="right">\n       <li class="prev"><span>' + conf.prevLabel + '</span></li>\n       <li class="next"><span>' + conf.nextLabel + '</span></li>\n       <li class="end"><span>' + conf.endLabel + '</span></li>\n     </ul>\n   </div>\n </div>\n <div class="bg"></div>\n</div>\n';
    };
    Object.seal(conf);
    // ================================================================================
    // called when first instance.
    var setup = function setup() {
      var $ = conf.$;
      if (conf.$parent === null) conf.$parent = $('body');
      if (conf.$scroll === null) conf.$scroll = $('body');
      var $cnt = $(conf.template());
      $cnt.css('z-index', conf.zIndex);
      conf.$parent.append($cnt);
      first = false;
    };
    // ================================================================================
    var adjustStepNum = function adjustStepNum() {
      var _ = privateMap.get(this);
      _.num = _.step.length;
    };

    var Tutorial = function () {

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
      function Tutorial() {
        var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Tutorial);

        if (first) setup.call(this);
        var _ = Object.create(null);
        _.step = [];
        _.active = false;
        _.num = 0; // step num
        _.pointer = 0;
        _.roop = typeof param.roop === 'boolean' ? param.roop : false;
        // @stepNum       = 0     # stepの総数
        // @stepPointer   = 0     # 現在のステップの位置
        // @stepIsActive  = false # ステップが表示されているか
        this.id = TutorialID;
        TutorialID++;
        // make private properties
        privateMap.set(this, _);

        adjustStepNum.call(this);
        if (param.step) this.addStep(param.step);
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


      _createClass(Tutorial, [{
        key: 'add',

        // =========================================================================
        /**
        * @function add
        *
        * @memberof Tutorial
        * @instance
        * @param    {Object | Object[]} step
        */
        value: function add(step) {
          var steps = Array.isArray(step) ? step : [step];
          var _ = privateMap.get(this);
          steps.forEach(function (obj) {
            return _.step.push(obj);
          });
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

      }, {
        key: 'remove',
        value: function remove() {
          var _this = this;

          var order = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

          var _ = privateMap.get(this);
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
          adjustStepNum.call(this);
          return this;
        }
        /**
        *
        */

      }, {
        key: 'change',
        value: function change(name, step) {}

        /**
        *
        */

      }, {
        key: 'next',
        value: function next(step) {}
        /**
        *
        */

      }, {
        key: 'prev',
        value: function prev(step) {}
        /**
        *
        */

      }, {
        key: 'show',
        value: function show(step) {}
        /**
        *
        */

      }, {
        key: 'hide',
        value: function hide(step) {}
        /**
        *
        */

      }, {
        key: 'destory',
        value: function destory(tutorial) {}

        // =========================================================================
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
          var _ = privateMap.get(this);
          var arr = [];
          _.step.forEach(function (el, i) {
            if ((typeof el === 'undefined' ? 'undefined' : _typeof(el)) === 'object' && el.name === name) arr.push(i);
          });
          return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : -1;
        }
        // =========================================================================
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
          var _ = privateMap.get(this);
          return _.active;
        }
      }], [{
        key: 'changeConfig',
        value: function changeConfig(key, val) {
          var confArr = Array.isArray(key) ? key : [{ 'key': key, 'val': val }];
          confArr.forEach(function (obj) {
            return conf[obj.key] = obj.val;
          });
        }
      }]);

      return Tutorial;
    }();

    window.Tutorial = Tutorial;
  })();
}