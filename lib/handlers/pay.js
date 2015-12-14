var order = require('node-weixin-order');
var weixin = require('node-weixin-api');
var errors = require('web-errors').errors;
var pay = require('../callbacks/pay');

module.exports = function(appConfig) {
  return {
    _unified: function(res) {
      return function(error, data) {
        if (error) {
          return res.json({
            code: errors.ERROR.code,
            message: errors.ERROR.message,
            data: error
          });
        }
        console.log('_unified');
        weixin.pay.api.order.unified(appConfig, data, pay.unified(appConfig, res));
      };
    },
    init: function(req, res) {
      order.create(req, res, this._unified(res));
    },
    callback: function(req, res) {
      weixin.pay.callback.notify(appConfig.app, appConfig.merchant, req, res, pay.callback(res));
    }
  };
};
