/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var assert = require('assert');
var pay = require('../../lib/callbacks/pay');
var appConfig = require('../config');
var errors = require('../../lib/errors');

var router = require('../../lib/');

var req = {
  session: {
    id: 1
  }
};

var settings = require('node-weixin-settings');

router.getId(req, function(id) {
  settings.set(id, 'app', appConfig.app, function() {
    settings.set(id, 'merchant', appConfig.merchant, function() {
      settings.set(id, 'certificate', appConfig.certificate, function() {
        var cb = function() {
          var callback = pay.callback();
          callback(true, {});
          assert(true);
        };
        it('should test pay callback', cb);

        var cb1 = function(done) {
          var unified = pay.unified(settings, req, {
            json: function(data) {
              assert.equal(true, data.code === errors.Success.code);
              assert.equal(true, data.message === errors.Success.message);
              assert.equal(true, data.data.appId === appConfig.app.id);
              done();
            }
          });
          unified(false, {
            /* eslint camelcase: [2, {properties: "never"}] */
            prepay_id: 'sdfsf'
          });
        };
        it('should test pay unified config', cb1);
      });
    });
  });
});
