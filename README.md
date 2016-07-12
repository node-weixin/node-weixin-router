# node-weixin-router [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> 

## Installation

```sh
$ npm install --save node-weixin-router
```

## Usage

```js
var express = require('express');
var request = require('supertest');
var session = require('node-weixin-session');
var settings = require('node-weixin-settings');

var app = express();
var nodeWeixinRouter = require('node-weixin-router');

// 初始化
// 其中‘/aaa'是微信的处理前缀地址

// node-weixin的自动接口地址如下：
// 1. auth/ack
//    服务器自动检验地址
// 2. jssdk/config 
//    jssdk的配置请求地址，将会返回配置的json串
// 3. oauth/access
//    Oauth发起请求的地址
// 4. oauth/success
//    OAuth成功后的回调地址
// 5. pay/callback
//    支付成功或者失败的回调地址
// 6. pay/unified
//    统一支付发起的接口，由微信的客户端（包括JSSDK）发起。

nodeWeixinRouter.express(settings, session, app, '/aaa');


// 添加对订单的处理
nodeWeixinRouter.onOrderNotify(function(error, data, res) {

});


// 添加对Oauth访问的处理，
//这里不能调用res.end/res.send等引起res结束的语句
nodeWeixinRouter.onOauthAccess(function(req, res) {

});

// 添加对Oauth调用成功的处理
nodeWeixinRouter.onOauthSuccess(function(req, data) {

});

// 自定义getId函数
nodeWeixinRouter.getId = function(req, next) {
};
```
## License

Apache-2.0 © [calidion](calidion.github.io)


[npm-image]: https://badge.fury.io/js/node-weixin-router.svg
[npm-url]: https://npmjs.org/package/node-weixin-router
[travis-image]: https://travis-ci.org/node-weixin/node-weixin-router.svg?branch=master
[travis-url]: https://travis-ci.org/node-weixin/node-weixin-router
[daviddm-image]: https://david-dm.org/node-weixin/node-weixin-router.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/node-weixin/node-weixin-router
[coveralls-image]: https://coveralls.io/repos/node-weixin/node-weixin-router/badge.svg
[coveralls-url]: https://coveralls.io/r/node-weixin/node-weixin-router
