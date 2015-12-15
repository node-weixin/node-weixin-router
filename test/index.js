import assert from 'assert';
import nodeWeixinRouter from '../lib';
import validator from 'validator';


var errors = require('web-errors').errors;

import express from 'express';

var Router = express.Router;
var router = new Router();

var appConfig = require('./config');

var handlers = null;

describe('node-weixin-router', function () {
  it('should be able to add order listeners', function () {
    try {
      nodeWeixinRouter.onCreate(function () {
      });
      nodeWeixinRouter.onNotify(function () {
      });
      assert(true, true);
    } catch (e) {
      assert(true, false);
    }

  });

  it('should be able to add oauth listener', function () {
    try {
      nodeWeixinRouter.onOauth(function () {
      });
      assert(true, true);
    } catch (e) {
      assert(true, false);
    }
  });

  it('should be able to init', function () {
    handlers = nodeWeixinRouter.init(router, appConfig);
    assert(true, true);
  });

  it('should be able to handle auth', function (done) {
    var req = {};
    var res = {
      send: function () {
        done();
      }
    };
    handlers.auth.ack(req, res);
  });

  it('should be able to handle jssdk without data', function (done) {
    var req = {};
    var res = {
      json: function (data) {
        assert.equal(true, data.code === errors.ERROR.code);
        assert.equal(true, data.message === errors.ERROR.message);
        done();
      }
    };
    handlers.jssdk.config(req, res);
  });


  it('should be able to handle jssdk with url', function (done) {
    var req = {query: {url: 'http://www.sina.com/'}};
    var res = {
      json: function (data) {
        assert.equal(true, data.code === errors.SUCCESS.code);
        assert.equal(true, data.message === errors.SUCCESS.message);
        assert.equal(true, data.data.appId === appConfig.app.id);
        done();
      }
    };
    handlers.jssdk.config(req, res);
  });

  it('should be able to handle jssdk with bad app info', function (done) {
    var req = {query: {url: 'http://www.sina.com/'}};
    var res = {
      json: function (data) {
        assert.equal(true, data.code === errors.ERROR.code);
        assert.equal(true, data.message === errors.ERROR.message);
        done();
      }
    };
    var bads = nodeWeixinRouter.init(router, {app: {}});

    bads.jssdk.config(req, res);
  });

  it('should be able to handle oauth access', function (done) {
    var req = {query: {url: 'http://www.sina.com/'}};
    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    handlers.oauth.access(req, res);
  });

  it('should be able to handle oauth success', function (done) {
    var req = {query: {}};
    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    handlers.oauth.success(req, res);
  });

  it('should be able to handle oauth success', function (done) {
    var req = {query: {code: '133'}};
    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    handlers.oauth.success(req, res);
  });


  it('should be able to handle pay back', function () {
    var req = {body: {}};
    var res = {
      end: function () {

      }
    };
    handlers.pay.callback(req, res);
  });


  it('should be able to handle pay init', function () {
    var req = {};
    var res = {
      json: function () {
      }
    };
    handlers.pay.init(req, res);
  });

  it('should be able to handle pay _unified failed', function () {
    var res = {
      json: function () {
      }
    };
    var callback = handlers.pay._unified(res);
    callback(true, {});
  });

  it('should be able to handle pay _unified success', function () {
    var res = {
      json: function () {
      }
    };
    var callback = handlers.pay._unified(res);
    callback(false, {});
  });

});
