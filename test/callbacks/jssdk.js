/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var errors = require('../../lib/errors');

it('should test jssdk callback prepared', function(done) {
  var jssdk = require('../../lib/callbacks/jssdk');
  var res = {
    json: function(data) {
      assert.equal(true, errors.Failure.code === data.code);
      assert.equal(true, data.data === 'message');
      done();
    }
  };
  var callback = jssdk.prepared(res);
  callback(true, 'message');
});
