# Tutorial.js

**THIS STILL HAVEN'T WORK.**

Tutorial.js provides introduction function on your WEB site, service, and so on.

## Dependencies

* jQuery

## Support browsers

* iE10+
* Chrome
* safari
* Firefox

## Support IE9

```
<!--[if IE 9]>
<script src="./polyfill.min.js"></script>
<![endif]-->
```

## Usage

```
var introduction = new Tutorial({
  'pager'      : false,
  'controller' : true,
  'auto'       : false,
  'startStep'  : 0,
  'step'       : [
    {
      'name'   : 'step1',
      'target' : $('#target-name'),
      'pos'    : ['right', 'top'],
      '$cnt'   : 'step1 message'
    },{
      'name' : 'step2',
      'pos'  : ['center', 'center'],
      '$cnt' : $('#step2-html').clone()
    }
  ]
});

introduction.show();
```
