# Tutorial.js

**まだ動作しません。**

Tutorial.js はWEBサイトやサービスなどのチュートリアル機能を提供します。

## デモ

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

introduction.show();
```

## Tutorial.jsの設定

Tutorial.jsの設定はTutorial.js自体の設定と各チュートリアルの設定の２つに分かれます。  
Tutorial.js自体の設定はTutorial.changeConfig()を使って変更します。

### Tutorial.changeConfig(key, val)

```js
Tutorial.changeConfig('resizeInterval', 500);
```

このように指定することで設定を変更することができます。  
またObjectを渡すことで一括で変更することも可能です。

```js
Tutorial.changeConfig({
  'resizeInterval' : 500,
  'showSpeed'      : 250
});
```

| key                 | val               | 初期値               | 説明 |
|---------------------|-------------------|----------------------|------|
| resizeInterval      | Number            | 250                  | |
| showSpeed           | Number            | 500                  | |
| hideSpeed           | Number            | 500                  | |
| animation           | Boolean \| Object | Object               | |
| animation.show      | Boolean           | true                 | |
| animation.hide      | Boolean           | true                 | |
| animation.move      | Boolean           | true                 | |
| animation.focus     | Boolean           | true                 | |
| animation.skipLabel | String            | 'Skip'               | |
| animation.prevLabel | String            | 'Prev'               | |
| animation.nextLabel | String            | 'Next'               | |
| animation.endLabel  | String            | 'End'                | |
| $                   | jQuery            | $                    | |
| $window             | jQuery            | $('widnow')          | |
| $parent             | jQuery            | $('body')            | |
| $scroll             | jQuery            | $('body')            | |
| zIndex              | Number            | 9000                 | |
| bgColor             | String            | 'rgba(0, 0, 0, 0.5)' | |

※ このメソッドはTutorial.jsのインスタンスが無い場合のみ利用できます。
