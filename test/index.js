
var assert = require('assert');
var nodeWeixinRouter = require('../lib');
var validator = require('validator');
var settings = require('node-weixin-settings');
var session = require('node-weixin-session');

var conf = require('./config');

var errors = require('../lib/errors');

var express = require('express');

var Router = express.Router;
var router = new Router();

var req = {
  session: {
    id: 1
  }
};

var wxRouter = require('../lib/');

var conf1 = {};
var handlers = null;

settings.registerGet(function (r, key, cb) {
  cb(conf1[key]);
});

settings.registerSet(function (r, key, value, cb) {
  conf1[key] = value;
  cb();
});
settings.registerAll(function (r, cb) {
  cb(conf1);
});

var id = null;

var async = require('async');

var functions = [
  function (cb) {
    wxRouter.getId(req, function (data) {
      id = data;
      cb(null);
    });
  },
  function (cb) {
    settings.set(id, 'app', conf.app, function () {
      cb(null);
    });
  },
  function (cb) {
    settings.set(id, 'merchant', conf.merchant, function () {
      cb(null);
    });
  },
  function (cb) {
    settings.set(id, 'certificate', conf.certificate, function () {
      cb(null);
    });
  },
  function (cb) {
    settings.set(id, 'urls', conf.urls, function () {
      cb(null);
    });
  },
  function (cb) {
    settings.set(id, 'oauth', conf.oauth, function () {
      cb(null);
    });
  },
  function (cb) {
    settings.get(id, 'app', function (data) {
      assert.deepEqual(conf.app, data);
      cb(null);
    });
  },
  function (cb) {
    settings.get(id, 'merchant', function (data) {
      assert.deepEqual(conf.merchant, data);
      cb(null);
    });
  },
  function (cb) {
    settings.get(id, 'certificate', function (data) {
      assert.deepEqual(conf.certificate, data);
      cb(null);
    });
  },
  function (cb) {
    settings.get(id, 'urls', function (data) {
      assert.deepEqual(conf.urls, data);
      cb(null);
    });
  },
  function (cb) {
    settings.get(id, 'oauth', function (data) {
      assert.deepEqual(conf.oauth, data);
      cb(null);
    });
  },
  function (cb) {
    settings.all(id, function (data) {
      assert.deepEqual(conf, data);
      cb(null);
    });
  }
];
async.series(functions,
  function () {
    describe('node-weixin-router', function () {
      it('should be able to add order listeners', function () {
        try {
          nodeWeixinRouter.onOrderCreate(function () {

          });
          nodeWeixinRouter.onOrderNotify(function () { });
          assert(true, true);
        } catch (e) {
          assert(false);
        }
      });

      it('should be able to add oauth listener', function () {
        try {
          nodeWeixinRouter.onOauthAccess(function () { });
          nodeWeixinRouter.onOauthSuccess(function () { });
          assert(true, true);
        } catch (e) {
          assert(false);
        }
      });

      it('should be able to add oauth listener', function () {
        try {
          nodeWeixinRouter.onOauthSuccess(function () { });
          assert(true, true);
        } catch (e) {
          assert(false);
        }
      });

      it('should be able to init', function () {
        handlers = nodeWeixinRouter.init(settings, session, router);
        assert(true, true);
      });

      it('should be able to handle auth ack', function (done) {
        req.query = {};
        var res = {
          send: function () {
            done();
          }
        };
        handlers.auth.ack(settings)(req, res);
      });

      it('should be able to handle auth message', function (done) {
        nodeWeixinRouter.onAuthMessage(function (message) {
          assert.deepEqual(message, {
            ToUserName: 'toUser',
            FromUserName: 'fromUser',
            CreateTime: '1348831860',
            MsgType: 'image',
            PicUrl: 'this is a url',
            MediaId: 'media_id',
            MsgId: '1234567890123456'
          });
        });

        req.body = '<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>1348831860</CreateTime><MsgType><![CDATA[image]]></MsgType><PicUrl><![CDATA[this is a url]]></PicUrl><MediaId><![CDATA[media_id]]></MediaId><MsgId>1234567890123456</MsgId></xml>';

        var res = {
          send: function () {
            done();
          }
        };
        handlers.auth.ack(settings, session)(req, res);
      });

      it('should be able to handle auth events', function (done) {
        nodeWeixinRouter.onAuthEvent(function (message) {
          assert.deepEqual(message, {
            ToUserName: 'toUser',
            FromUserName: 'fromUser',
            CreateTime: '123456789',
            MsgType: 'event',
            Event: 'subscribe'
          }
          );
        });

        req.body = '<xml><ToUserName><![CDATA[toUser]]></ToUserName><FromUserName><![CDATA[fromUser]]></FromUserName><CreateTime>123456789</CreateTime><MsgType><![CDATA[event]]></MsgType><Event><![CDATA[subscribe]]></Event></xml>';

        var res = {
          send: function () {
            done();
          }
        };
        handlers.auth.ack(settings, session)(req, res);
      });

      it('should be able to handle jssdk without data', function (done) {
        var res = {
          json: function (data) {
            assert.equal(true, data.code === errors.Failure.code);
            assert.equal(true, data.message === errors.Failure.message);
            done();
          }
        };
        handlers.jssdk.config(settings)(req, res);
      });

      it('should be able to handle jssdk with url', function (done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            id: id
          }
        };
        var res = {
          json: function (data) {
            assert.equal(true, data.code === errors.Success.code);
            assert.equal(true, data.message === errors.Success.message);
            assert.equal(true, data.data.appId === conf1.app.id);
            done();
          }
        };
        handlers.jssdk.config(settings)(req1, res);
      });

      it('should be able to handle jssdk with bad app info', function (done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            id: 1
          }
        };
        var res = {
          json: function (data) {
            assert.equal(true, data.code === errors.Failure.code);
            assert.equal(true, data.message === errors.Failure.message);
            done();
          }
        };
        wxRouter.getId(req1, function (id1) {
          settings.set(id1, 'app', {}, function () {
            var bads = nodeWeixinRouter.init(settings, session, router);

            bads.jssdk.config(settings, session)(req, res);
          });
        });
      });

      it('should be able to handle oauth access', function (done) {
        var req1 = {
          query: {
            url: 'http://www.sina.com/'
          },
          session: {
            id: 1
          }
        };
        var res = {
          redirect: function (url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        settings.set(id, 'oauth', {
          state: 'state',
          scope: 0
        }, function () {
          handlers.oauth.access(settings, session)(req1, res);
        });
      });

      it('should be able to handle oauth success', function (done) {
        var req1 = {
          query: {},
          session: {
            id: id
          }
        };

        var res = {
          redirect: function (url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        settings.set(id, 'oauth', {
          state: 'state',
          scope: 0
        }, function () {
          handlers.oauth.success(settings, session)(req1, res);
        });
      });

      it('should be able to handle oauth success with scope 1', function (done) {
        var req1 = {
          query: {},
          session: {
            id: id
          }
        };

        var res = {
          redirect: function (url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        settings.set(id, 'oauth', {
          state: 'state',
          scope: 1
        }, function () {
          handlers.oauth.success(settings, session)(req1, res);
        });
      });

      it('should be able to handle oauth success 1', function (done) {
        var req1 = {
          query: {
            code: '133'
          },
          session: {
            id: 1
          }
        };

        var res = {
          redirect: function (url) {
            assert.equal(true, validator.isURL(url));
            done();
          }
        };
        handlers.oauth.success(settings, session)(req1, res);
      });

      it('should be able to handle pay back', function () {
        var req1 = {
          body: {},
          session: {
            id: 1
          }
        };

        var res = {
          end: function () {

          }
        };
        handlers.pay.callback(settings, session)(req1, res);
      });

      it('should be able to handle pay init', function () {
        var res = {
          json: function () { }
        };
        handlers.pay.init(settings, session)(req, res);
      });

      it('should be able to handle pay _unified failed', function () {
        var res = {
          json: function () { }
        };
        var callback = handlers.pay._unified(settings, req, res);
        callback(true, {});
      });

      it('should be able to handle pay _unified success', function () {
        var res = {
          json: function () { }
        };
        var callback = handlers.pay._unified(settings, req, res);
        callback(false, {});
      });

      it('should be able to get id by params', function (done) {
        var req2 = {
          params: {
            id: 13
          }
        };
        wxRouter.getId(req2, function (id2) {
          assert.equal(true, id2 === 13);
          done();
        });
      });

      it('should be able to get id', function (done) {
        var req3 = {};
        wxRouter.getId(req3, function (id3) {
          assert.equal(true, id3 === process.env.APP_ID);
          done();
        });
      });
    });
  });
