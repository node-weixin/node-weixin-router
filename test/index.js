import assert from 'assert';
import nodeWeixinRouter from '../lib';
import validator from 'validator';
import session from 'node-weixin-session';

import conf from './config';


var errors = require('web-errors').errors;

import express from 'express';

var Router = express.Router;
var router = new Router();

var req = {
  session: {
    id: 1
  }
};

session.registerGet(function(r, key) {
  return conf[key];
});

session.registerSet(function(r, key, value) {
  conf[key] = value;
});

var app = session.get(req, 'app');

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

    handlers = nodeWeixinRouter.init(router);
    assert(true, true);
  });

  it('should be able to handle auth', function (done) {
    var res = {
      send: function () {
        done();
      }
    };
    handlers.auth.ack(req, res);
  });

  it('should be able to handle jssdk without data', function (done) {
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
    var req1 = {query: {url: 'http://www.sina.com/'}, session: {id: 1}};
    var res = {
      json: function (data) {
        assert.equal(true, data.code === errors.SUCCESS.code);
        assert.equal(true, data.message === errors.SUCCESS.message);
        assert.equal(true, data.data.appId === app.id);
        done();
      }
    };

    handlers.jssdk.config(req1, res);
  });

  it('should be able to handle jssdk with bad app info', function (done) {
    var req1 = {query: {url: 'http://www.sina.com/'}, session: {id: 1}};
    var res = {
      json: function (data) {
        assert.equal(true, data.code === errors.ERROR.code);
        assert.equal(true, data.message === errors.ERROR.message);
        done();
      }
    };
    session.set(req1, 'app', {});

    var bads = nodeWeixinRouter.init(router);

    bads.jssdk.config(req, res);
  });

  it('should be able to handle oauth access', function (done) {
    var req1 = {query: {url: 'http://www.sina.com/'}, session: {id: 1}};
    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    session.set(req1, 'oauth', {state: 'state', scope: 0});
    handlers.oauth.access(req1, res);
  });

  it('should be able to handle oauth success', function (done) {
    var req1 = {query: {}, session: {id: 1}};

    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    session.set(req1, 'oauth', {state: 'state', scope: 0});
    handlers.oauth.success(req1, res);
  });

  it('should be able to handle oauth success', function (done) {
    var req1 = {query: {code: '133'}, session: {id: 1}};

    var res = {
      redirect: function (url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    };
    handlers.oauth.success(req1, res);
  });


  it('should be able to handle pay back', function () {
    var req1 = {body: {}, session: {id: 1}};

    var res = {
      end: function () {

      }
    };
    handlers.pay.callback(req1, res);
  });


  it('should be able to handle pay init', function () {
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
    var callback = handlers.pay._unified(req, res);
    callback(true, {});
  });

  it('should be able to handle pay _unified success', function () {
    var res = {
      json: function () {
      }
    };
    var callback = handlers.pay._unified(req, res);
    callback(false, {});
  });

});
