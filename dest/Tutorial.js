"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {
    var first = true;
    var conf = Object.create(null);
    conf.mode = 'focus'; // focus | arrow
    conf.resizeInterval = 250;
    conf.scrollSpeed = 500;
    conf.skipLabel = 'Skip';
    conf.prevLabel = 'Prev';
    conf.nextLabel = 'Next';
    conf.endLabel = 'End';
    conf.$parent = null;
    conf.template = function () {
      return '\n<div class="tutorial">\n <div class="content-wrap">\n   <ol class="pager"></ol>\n   <div class="content"></div>\n   <div class="controller">\n     <ul class="left">\n       <li class="skip"><span>' + conf.skipLabel + '</span></li>\n     </ul>\n     <ul class="right">\n       <li class="prev"><span>' + conf.prevLabel + '</span></li>\n       <li class="next"><span>' + conf.nextLabel + '</span></li>\n       <li class="end"><span>' + conf.endLabel + '</span></li>\n     </ul>\n   </div>\n </div>\n <div class="bg"></div>\n</div>\n';
    };
    Object.seal(conf);
    // ---------------------------------------------------------------------------
    var setup = function setup() {
      if (conf.$parent === null) conf.$parent = $('body');
      conf.$parent.append(conf.template());
      first = false;
    };
    // ===========================================================================

    var Tutorial = function () {
      function Tutorial() {
        _classCallCheck(this, Tutorial);

        if (first) setup.call(this);
      }

      _createClass(Tutorial, [{
        key: 'publicFunc',
        value: function publicFunc() {
          console.log('public function');
        }
      }], [{
        key: 'staticFunc',
        value: function staticFunc() {
          console.log('static function');
        }
      }]);

      return Tutorial;
    }();

    window.Tutorial = Tutorial;
  })();
}