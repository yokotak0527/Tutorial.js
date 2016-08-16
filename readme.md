# Tutorial.js

**DON'T WORK YET.**

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
  step : [
    {
      'name'   : 'step1',
      'target' : $('#target-name'),
      'pos'    : ['right', 'top']
    },{
      'name' : 'step2',
      'pos'  : ['center', 'center']
    }
  ]
});

introduction.start();
```
