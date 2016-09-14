# Tutorial.js

**まだ動作しません。**

Tutorial.js はWEBサイトやサービスなどのチュートリアル機能を提供します。

## 依存しているライブラリ、フレームワーク

* jQuery

## 動作サポート

* iE9+
* Chrome
* safari
* Firefox

## 使い方

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

# Tutorial.jsの設定

Tutorial.jsの設定はTutorial.js自体の設定と各チュートリアルの設定の２つに分かれます。

Tutorial.js自体の設定はTutorial.changeConfig()を使って変更します。

## Tutorial.changeConfig(key, val)
