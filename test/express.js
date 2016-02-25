import express from 'express';
import request from 'supertest';
var app = express();
import nodeWeixinRouter from '../lib';
nodeWeixinRouter.express(app, '/aaa');

function getTest(url) {
  it('get ' + url, function(done) {
    request(app).
    get(url)
    .expect(200)
    .end(function() {
      done();
    });
  });
}

function postTest(url) {
  it('post ' + url, function(done) {
    request(app).
    post(url)
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
