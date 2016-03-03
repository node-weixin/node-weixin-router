# node-weixin-router [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> node weixin router for specified requests

负责路由分发和api事件的回调与注册

## Installation

```sh
$ npm install --save node-weixin-router
```

## Usage

```js
var nodeWeixinRouter = require('node-weixin-router');
var express = require('express');

var router = express.Router;



//侦听订单创建
//需要调用next方法回到后继续操作中
nodeWeixinRouter.onOrderCreate(function (req, res, next) {
});
//侦听订单通知
//data是返回数据的json格式
nodeWeixinRouter.onOrderNotify(function (error, data) {
});
//侦听Oauth成功返回
//需要通过res返回页面信息
nodeWeixinRouter.onOauthSuccess(function (req, res, weixin) {
});
//侦听OAuth访问处理
//用于记录OAuth的用户信息，比如refer
nodeWeixinRouter.onOauthAccess(function (req, res) {
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
