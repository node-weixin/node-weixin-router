var assert = require('assert');
//var validator = require('validator');
var pay = require('../../lib/callbacks/pay');
var appConfig = require('../config');
var errors = require('web-errors').errors;


it('should test pay callback', function (done) {
  var callback = pay.callback({
    end: function () {
      done();
    }
  });
  callback(true, {});
});

it('should test pay unified config', function (done) {
  var unified = pay.unified(appConfig, {
    json: function(data) {
      assert.equal(true, data.code === errors.SUCCESS.code);
      assert.equal(true, data.message === errors.SUCCESS.message);
      assert.equal(true, data.data.appId === appConfig.app.id);
      done();
    }
  });
  unified(false, {
    /*eslint camelcase: [2, {properties: "never"}]*/
    prepay_id: 'sdfsf'
  });
});
