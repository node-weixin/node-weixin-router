/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var weixin = require('node-weixin-api');
var pay = require('../callbacks/pay');
var errors = require('../errors');
var callbacks = require('../callbacks');

var self = {
  _unified: function _unified(settings, req, res) {
    return function(error, data, json) {
      if (error) {
        return res.json({
          name: errors.Failure.name,
          code: errors.Failure.code,
          message: errors.Failure.message,
          data: {
            json: json,
            validate: data
          }
        });
      }
      var router = require('../index');
      router.getId(req, function(id) {
        settings.all(id, function(conf) {
          weixin.pay.api.order.unified(conf, data, pay.unified(settings, req, res));
        });
      });
    };
  },
  init: function init() {
    return function(req, res) {
      if (callbacks.order.create instanceof Function) {
        callbacks.order.create(req, res, self._unified(req, res));
      }
    };
  },
  callback: function callback(settings) {
    return function(req, res) {
      var router = require('../index');
      router.getId(req, function(id) {
        settings.all(id, function(conf) {
          weixin.pay.callback.notify(conf.app, conf.merchant, req, res, pay.callback(res));
        });
      });
    };
  }
};

module.exports = self;
