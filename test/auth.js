var assert = require('assert');
var errors = require('../lib/errors');

it('should test auth callback success', function (done) {
  var auth = require('../lib/callbacks/auth');
  var callback = auth.ack({}, {
    send: function (data) {
      assert.equal(true, data.code === 0);
      assert.equal(true, data.message === '成功!');
      done();
    }
  });
  callback(false, {
    code: 0,
    message: '成功!'
  });
});

it('should test auth callback success with message', function (done) {
  var auth = require('../lib/callbacks/auth');
  var callback = auth.ack({}, {
    send: function (data) {
      assert(!data);
      setTimeout(function () {
        done();
      });
    }
  });
  callback(false);
});

it('should test auth callback with key', function (done) {
  var auth = require('../lib/callbacks/auth');
  var callback = auth.ack({},
    {
      send: function (data) {
        assert.equal(true, data === errors.InputInvalid);
        done();
      }
    });
  callback(true, {
    key: 1
  });
});

it('should test auth callback with signature not match', function (done) {
  var auth = require('../lib/callbacks/auth');
  var callback = auth.ack({}, {
    send: function (data) {
      assert.equal(true, data === errors.SignatureNotMatch);
      done();
    }
  });
  callback(true, 2);
});

it('should test auth callback with unkown error', function (done) {
  var auth = require('../lib/callbacks/auth');
  var callback = auth.ack({}, {
    send: function (data) {
      assert.equal(true, data === errors.UnknownError);
      done();
    }
  });
  callback(true, 3);
});

it('should handle auth with req.body', function () {
  var auth = require('../lib/callbacks/auth');
  auth.onMessage({
  });
});

it('should handle auth with req.body', function () {
  var auth = require('../lib/callbacks/auth');
  auth.onMessage({
    body: new Buffer('')
  });
});

it('should handle auth with req.body', function () {
  var auth = require('../lib/callbacks/auth');
  auth.onMessage({
    body: new Buffer('<xml>' +
      '<ToUserName><![CDATA[toUser]]></ToUserName>' +
      '<FromUserName><![CDATA[fromUser]]></FromUserName>' +
      '<CreateTime>1348831860</CreateTime>' +
      '<MsgType><![CDATA[text]]></MsgType>' +
      '<Content><![CDATA[this is a test]]></Content>' +
      '<MsgId>1234567890123456</MsgId>' +
      '</xml>')
  });
});

it('should handle auth with req.body', function () {
  var auth = require('../lib/callbacks/auth');
  var callbacks = require('../lib/callbacks');
  callbacks.auth.message = function () {

  };
  callbacks.auth.event = function () {

  };
  auth.onMessage({
    body: new Buffer('<xml>' +
      '<ToUserName><![CDATA[toUser]]></ToUserName>' +
      '<FromUserName><![CDATA[fromUser]]></FromUserName>' +
      '<CreateTime>1348831860</CreateTime>' +
      '<MsgType><![CDATA[text]]></MsgType>' +
      '<Content><![CDATA[this is a test]]></Content>' +
      '<MsgId>1234567890123456</MsgId>' +
      '</xml>')
  });
});
