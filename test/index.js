import assert from 'assert';
import nodeWeixinRouter from '../lib';
import validator from 'validator';
import settings from 'node-weixin-settings';

import conf from './config';

var errors = require('../lib/errors');


import express from 'express';

var Router = express.Router;
var router = new Router();

var req = {
  session: {
    __appId: 1
  }
};

var wxRouter = require('../lib/');

var conf1 = {};
var handlers = null;


settings.registerGet(function(r, key, cb) {
  cb(conf1[key]);
});

settings.registerSet(function(r, key, value, cb) {
  conf1[key] = value;
  cb();
});
settings.registerAll(function(r, cb) {
  cb(conf1);
});

var id = wxRouter.getId(req);

var async = require('async');
async.series([(cb) => {
    settings.set(id, 'app', conf.app, function() {
      cb(null);
    });
  }, (cb) => {
    settings.set(id, 'merchant', conf.merchant, function() {
      cb(null);
    });
  }, (cb) => {
    settings.set(id, 'certificate', conf.certificate, function() {
      cb(null);
    });
  }, (cb) => {
    settings.set(id, 'urls', conf.urls, function() {
      cb(null);
    });
  }, (cb) => {
    settings.set(id, 'oauth', conf.oauth, function() {
      cb(null);
    });
  }, (cb) => {
    settings.get(id, 'app', function(data) {
      assert.deepEqual(conf.app, data);
      cb(null);
    });
  }, (cb) => {
    settings.get(id, 'merchant', function(data) {
      assert.deepEqual(conf.merchant, data);
      cb(null);
    });
  }, (cb) => {
    settings.get(id, 'certificate', function(data) {
      assert.deepEqual(conf.certificate, data);
      cb(null);
    });
  }, (cb) => {
    settings.get(id, 'urls', function(data) {
      assert.deepEqual(conf.urls, data);
      cb(null);
    });
  }, (cb) => {
    settings.get(id, 'oauth', function(data) {
      assert.deepEqual(conf.oauth, data);
      cb(null);
    });
  }, (cb) => {
    settings.all(id, function(data) {
      assert.deepEqual(conf, data);
      cb(null);
    });
  }],
  function() {
    describe('node-weixin-router', function() {
      it('should be able to add order listeners', function() {
        try {
          nodeWeixinRouter.onCreate(function() {});
          nodeWeixinRouter.onNotify(function() {});
          assert(true, true);
        } catch (e) {
          assert(true, false);
        }
      });

      it('should be able to add oauth listener', function() {
        try {
          nodeWeixinRouter.onOauth(function() {});
          assert(true, true);
        } catch (e) {
          assert(true, false);
        }
      });

      it('should be able to init', function() {

        handlers = nodeWeixinRouter.init(router);
        assert(true, true);
      });

      it('should be able to handle auth', function(done) {
        var res = {
          send: function() {
            done();
          }
        };
        handlers.auth.ack(req, res);
      });

      it('should be able to handle jssdk without data', function(done) {
        var res = {
          json: function(data) {
            assert.equal(true, data.code === errors.Error.code);
            assert.equal(true, data.message === errors.Error.message);
            done();
          }
        };
        handlers.jssdk.config(req, res);
      });


      it('should be able to handle jssdk with url', function(done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            __appId: id
          }
        };
        var res = {
          json: function(data) {
            assert.equal(true, data.code === errors.Success.code);
            assert.equal(true, data.message === errors.Success.message);
            assert.equal(true, data.data.appId === conf1.app.id);
            done();
          }
        };
        handlers.jssdk.config(req1, res);
      });

      it('should be able to handle jssdk with bad app info', function(done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            __appId: 1
          }
        };
        var res = {
          json: function(data) {
            assert.equal(true, data.code === errors.Error.code);
            assert.equal(true, data.message === errors.Error.message);
            done();
          }
        };
        var id1 = wxRouter.getId(req1);
        settings.set(id1, 'app', {}, function() {
          var bads = nodeWeixinRouter.init(router);

          bads.jssdk.config(req, res);
        });

      });

      it('should be able to handle oauth access', function(done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            __appId: 1
          }
        };
        var res = {
          redirect: function(url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        settings.set(id, 'oauth', {
          state: 'state',
          scope: 0
        }, function() {
          handlers.oauth.access(req1, res);
        });
      });

      it('should be able to handle oauth success', function(done) {
        var req1 = {
          query: {},
          session: {
            __appId: id
          }
        };

        var res = {
          redirect: function(url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        settings.set(id, 'oauth', {
          state: 'state',
          scope: 0
        }, function() {
          handlers.oauth.success(req1, res);
        });
      });

      it('should be able to handle oauth success', function(done) {
        var req1 = {
          query: {
            code: '133'
          },
          session: {
            __appId: 1
          }
        };

        var res = {
          redirect: function(url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        handlers.oauth.success(req1, res);
      });


      it('should be able to handle pay back', function() {
        var req1 = {
          body: {},
          session: {
            __appId: 1
          }
        };

        var res = {
          end: function() {

          }
        };
        handlers.pay.callback(req1, res);
      });


      it('should be able to handle pay init', function() {
        var res = {
          json: function() {}
        };
        handlers.pay.init(req, res);
      });

      it('should be able to handle pay _unified failed', function() {
        var res = {
          json: function() {}
        };
        var callback = handlers.pay._unified(req, res);
        callback(true, {});
      });

      it('should be able to handle pay _unified success', function() {
        var res = {
          json: function() {}
        };
        var callback = handlers.pay._unified(req, res);
        callback(false, {});
      });

      it('should be able to get id by params', function() {
        var req2 = {
          params: {
            __appId: 13
          }
        };
        var id2 = wxRouter.getId(req2);
        assert.equal(true, id2 === 13);
      });

      it('should be able to get id', function() {
        var req3 = {};
        var id3 = wxRouter.getId(req3);
        assert.equal(true, id3 === process.env.APP_ID);
      });
    });
  });
