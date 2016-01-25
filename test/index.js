import assert from 'assert';
import nodeWeixinRouter from '../lib';
import validator from 'validator';
import session from 'node-weixin-session';
import settings from 'node-weixin-settings';

import conf from './config';

var errors = require('../lib/errors');


import express from 'express';

var Router = express.Router;
var router = new Router();

var req = {
  session: {
    id: 1
  }
};

var wxRouter = require('../lib/');


session.registerGet(function(r, key) {
  return conf[key];
});

session.registerSet(function(r, key, value) {
  conf[key] = value;
});

var conf1 = {};
var handlers = null;
var app = null;


settings.registerGet(function(r, key, cb) {
  cb(conf1[key]);
});

settings.registerSet(function(r, key, value, cb) {
  conf1[key] = value;
  cb();
});

var id = wxRouter.getId(req);
console.log(id);

var async = require('async');
async.series([
    function(cb) {
      settings.set(id, 'app', conf.app, function() {
        console.log('set app');
        cb(null);
      });
    },
    function(cb) {
      settings.set(id, 'merchant', conf.merchant, function() {
        console.log('set merchant');
        cb(null);
      });
    },
    function(cb) {
      settings.set(id, 'certificate', conf.certificate, function() {
        console.log('set certificate');
        cb(null);
      });
    },
    function(cb) {
      settings.set(id, 'urls', conf.urls, function() {
        console.log('set urls');
        cb(null);
      });
    },
    function(cb) {
      settings.set(id, 'oauth', conf.oauth, function() {
        console.log('set oauth');
        cb(null);
      });
    },
    function(cb) {
      settings.get(id, 'app', function(data) {
        app = data;
        cb(null);
      });
    }
  ],
  function() {

    // var app = settings.get(id, 'app');

    console.log('log end of async');
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
            id: 1
          }
        };
        var res = {
          json: function(data) {
            assert.equal(true, data.code === errors.Success.code);
            assert.equal(true, data.message === errors.Success.message);
            assert.equal(true, data.data.appId === app.id);
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
            id: 1
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
            id: 1
          }
        };
        var res = {
          redirect: function(url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        session.set(req1, 'oauth', {
          state: 'state',
          scope: 0
        });
        handlers.oauth.access(req1, res);
      });

      it('should be able to handle oauth success', function(done) {
        var req1 = {
          query: {},
          session: {
            id: id
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
        });
        handlers.oauth.success(req1, res);
      });

      it('should be able to handle oauth success', function(done) {
        var req1 = {
          query: {
            code: '133'
          },
          session: {
            id: 1
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
            id: 1
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
            id: 13
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
