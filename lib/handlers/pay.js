var order = require('node-weixin-order');
var weixin = require('node-weixin-api');
var session = require('node-weixin-session');

var errors = require('web-errors').errors;
var pay = require('../callbacks/pay');

module.exports = {
  _unified: function (req, res) {
    return function (error, data) {
      if (error) {
        return res.json({
          code: errors.ERROR.code,
          message: errors.ERROR.message,
          data: error
        });
      }
      weixin.pay.api.order.unified(session.all(req), data, pay.unified(session.all(req), res));
    };
  },
  init: function (req, res) {
    order.create(req, res, this._unified(res));
  },
  callback: function (req, res) {
    var app = session.get(req, 'app');
    var merchant = session.get(req, 'merchant');

    weixin.pay.callback.notify(app, merchant, req, res, pay.callback(res));
  }
};
