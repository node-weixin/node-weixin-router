# node-weixin-router [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> node weixin router for specified requests

负责路由注册，分发以及事件的回调

## Installation

```sh
$ npm install --save node-weixin-router
```

## Usage

```js
var nodeWeixinRouter = require('node-weixin-router');
var express = require('express');

var router = express.Router;

//
nodeWeixinRouter.onCreate(function () {
});
//
nodeWeixinRouter.onNotify(function () {
});
//
nodeWeixinRouter.onOauth(function () {
});
//
nodeWeixinRouter.init(router);


```
## License

 © [node-weixin](www.node-weixin.com)


[npm-image]: https://badge.fury.io/js/node-weixin-router.svg
[npm-url]: https://npmjs.org/package/node-weixin-router
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-router.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-router
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-router.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-router
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-router/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-router
