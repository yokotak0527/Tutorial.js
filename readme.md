# Tutorial.js

**DON'T WORK YET.**

Tutorial.js provides introduction function on your WEB site, service, and so on.

## Dependencies

* jQuery

## Support browsers

* iE9+
* Chrome
* safari
* Firefox

## Usage

```
var introduction = new Tutorial({
  'pager'      : false,
  'controller' : true,
  'auto'       : false,
  'step'       : [
    {
      'name'    : 'step1',
      'target'  : $('#target-name'),
      'pos'     : ['right', 'top'],
      'content' : 'step1 message'
    },{
      'name'    : 'step2',
      'pos'     : ['center', 'center'],
      'content' : $('#step2-html').clone()
    }
  ]
});

introduction.start();
```

If you wanna learning Tutorial.js, much further. see here.
