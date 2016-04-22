/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var express = require('express');
var request = require('supertest');
var assert = require('assert');
var session = require('node-weixin-session');
var settings = require('node-weixin-settings');

var app = express();
var nodeWeixinRouter = require('../lib');
nodeWeixinRouter.express(settings, session, app, '/aaa');

nodeWeixinRouter.onOrderNotify(function(error, data, res) {
  assert.equal(true, typeof error !== 'undefined');
  assert(typeof data !== 'undefined');
  if (res && res.end instanceof Function) {
    // 仅为测试添加， 真正的场景下，一定要记得不要使用res与res.end
    res.end();
  }
});

nodeWeixinRouter.onOauthAccess(function(req, res) {
  assert.equal(true, req !== null);
  assert.equal(true, res !== null);
  assert.equal(true, res.send instanceof Function);
  assert(true);
});

nodeWeixinRouter.onOauthSuccess(function(req, data) {
  assert.equal(true, req !== null);
  assert.equal(true, data !== null);
  assert(true);
});

function getTest(url) {
  it('get ' + url, function(done) {
    request(app)
      .get(url)
      .expect(200)
      .end(function() {
        done();
      });
  });
}

function postTest(url) {
  it('post ' + url, function(done) {
    request(app)
      .post(url)
      .expect(200)
      .end(function() {
        done();
      });
  });
}

function myTest(url) {
  getTest(url);
  postTest(url);
}

describe('express', function() {
  describe('auth', function() {
    myTest('/aaa/auth/ack');
  });
  describe('jssdk', function() {
    myTest('/aaa/jssdk/config');
  });

  describe('oauth', function() {
    myTest('/aaa/oauth/access');
    myTest('/aaa/oauth/success');
  });
  describe('pay', function() {
    myTest('/aaa/pay/callback');
    myTest('/aaa/pay/unified');
  });
});
