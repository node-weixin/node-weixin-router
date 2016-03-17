/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var validator = require('validator');
var settings = require('node-weixin-settings');

var callbacks = require('../../lib/callbacks');

var conf = require('../config');

var req = {
  session: {
    id: 1
  }
};

settings.set(req.session.id, 'urls', conf.urls, function() {
  it('should test oauth callback success', function(done) {
    var oauth = require('../../lib/callbacks/oauth');
    var callback = oauth.success(req, {
      redirect: function(url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    });
    callback(true, {});
  });

  it('should test oauth callback success', function(done) {
    var oauth = require('../../lib/callbacks/oauth');
    var callback = oauth.success(req, {
      redirect: function(url) {
        assert.equal(true, validator.isURL(url));
        done();
      }
    });
    callback(true, {});
  });

  it('should test oauth callback success', function(done) {
    var oauth = require('../../lib/callbacks/oauth');
    var json = {
      openid: 'openid',
      access_token: 'access_token',
      refresh_token: 'refresh_token'
    };
    var res = {
      df: 'sdfsf'
    };
    callbacks.oauth.success = function(request, response, wx) {
      assert.deepEqual(request, req);
      assert.deepEqual(response, res);
      assert.equal(true, wx.openid === json.openid);
      /* eslint camelcase: [2, {properties: "never"}] */
      assert.equal(true, wx.accessToken === json.access_token);
      assert.equal(true, wx.refreshToken === json.refresh_token);
      done();
    };
    var callback = oauth.success(req, res);
    callback(false, json);
  });
});
