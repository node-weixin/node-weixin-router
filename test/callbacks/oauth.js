var assert = require('assert');
var validator = require('validator');
import settings from 'node-weixin-settings';

import callbacks from '../../lib/callbacks';

import conf from '../config';

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
    callbacks.oauth.success = function(request, wx) {
      assert.deepEqual(request, req);
      assert.equal(true, wx.openid === json.openid);
      /*eslint camelcase: [2, {properties: "never"}]*/
      assert.equal(true, wx.accessToken === json.access_token);
      assert.equal(true, wx.refreshToken === json.refresh_token);
      done();
    };
    var callback = oauth.success(req, {});
    callback(false, json);
  });
});
