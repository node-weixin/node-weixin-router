var assert = require('assert');
var validator = require('validator');

it('should test oauth callback success', function (done) {
  var oauth = require('../../lib/callbacks/oauth');
  var callback = oauth.success({
    urls: {
      redirect: 'http://www.sina.com/',
      access: 'http://www.sina.com/'
    }
  }, {
    redirect: function (url) {
      assert.equal(true, validator.isURL(url));
      done();
    }
  });
  callback(true, {});
});

it('should test oauth callback success', function (done) {
  var oauth = require('../../lib/callbacks/oauth');
  var callback = oauth.success({
    urls: {
      redirect: 'http://www.sina.com/',
      access: 'http://www.sina.com/'
    }
  }, {
    redirect: function (url) {
      assert.equal(true, validator.isURL(url));
      done();
    }
  });
  callback(false, {});
});
