var assert = require('assert');
var validator = require('validator');

var req = {
  session: {
    id: 1
  }
};

var session = require('node-weixin-session');
session.set(req, 'urls', {
  redirect: 'http://www.sina.com/',
  access: 'http://www.sina.com/'
});

it('should test oauth callback success', function (done) {
  var oauth = require('../../lib/callbacks/oauth');
  var callback = oauth.success(req, {
    redirect: function (url) {
      assert.equal(true, validator.isURL(url));
      done();
    }
  });
  callback(true, {});
});

it('should test oauth callback success', function (done) {
  var oauth = require('../../lib/callbacks/oauth');
  var callback = oauth.success(req, {
    redirect: function (url) {
      assert.equal(true, validator.isURL(url));
      done();
    }
  });
  callback(false, {});
});
