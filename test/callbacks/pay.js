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

var id = router.getId(req);

settings.set(id, 'app', appConfig.app, function() {
  settings.set(id, 'merchant', appConfig.merchant, function() {
    settings.set(id, 'certificate', appConfig.certificate, function() {

      it('should test pay callback', function (done) {
        var callback = pay.callback({
          end: function () {
            done();
          }
        });
        callback(true, {});
      });

      it('should test pay unified config', function (done) {
        var unified = pay.unified(req, {
          json: function (data) {
            console.log(data);
            console.log(errors.Success);
            assert.equal(true, data.code === errors.Success.code);
            assert.equal(true, data.message === errors.Success.message);
            assert.equal(true, data.data.appId === appConfig.app.id);
            done();
          }
        });
        unified(false, {
          /*eslint camelcase: [2, {properties: "never"}]*/
          prepay_id: 'sdfsf'
        });
      });
    });

  });
});
