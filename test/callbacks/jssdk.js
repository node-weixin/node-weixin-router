var assert = require('assert');
var errors = require('web-errors').errors;

it('should test jssdk callback prepared', function(done) {
  var jssdk = require('../../lib/callbacks/jssdk');
  var res = {
    json: function(data) {
      assert.equal(true, errors.ERROR.code === data.code);
      assert.equal(true, data.data === 'message');
      done();
    }
  };
  var callback = jssdk.prepared(res);
  callback(true, 'message');
});
