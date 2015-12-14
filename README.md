# node-weixin-router [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> node weixin router for specified requests

## Installation

```sh
$ npm install --save node-weixin-router
```

## Usage

```js
var nodeWeixinRouter = require('node-weixin-router');
var express = require('express');

var Router = express.Router;
var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

var merchant = {
  id: process.env.MERCHANT_ID,
  key: process.env.MERCHANT_KEY
};

var certificate = {
  pfx: process.env.PFX_BUFFER,
  pfxKey: process.env.MERCHANT_ID + ''
};

var urls = {
  success: 'http://www.sina.com/',
  access: 'http://www.sina.com/',
  redirect: 'http://www.sina.com/'
};

var oauth = {
  state: 'STATE',
  scope: 0
};

var appConfig = {
  app: app,
  merchant: merchant,
  certificate: certificate,
  urls: urls,
  oauth: oauth
};

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
nodeWeixinRouter.init(router, appConfig);


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
