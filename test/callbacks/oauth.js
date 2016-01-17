var assert = require('assert');
var validator = require('validator');
import settings from 'node-weixin-settings';

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
    callback(false, {});
  });
});
