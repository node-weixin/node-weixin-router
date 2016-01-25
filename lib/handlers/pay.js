var order = require('node-weixin-order');
var weixin = require('node-weixin-api');
var settings = require('node-weixin-settings');

var pay = require('../callbacks/pay');
var errors = require('../errors');


var self = {
  _unified: function _unified(req, res) {
    return function(error, data) {
      if (error) {
        return res.json({
          name: errors.Error.name,
          code: errors.Error.code,
          message: errors.Error.message,
          data: error
        });
      }
      var router = require('../index');
      var id = router.getId(req);
      // var app = settings.get(id, 'app');
      // var merchant = settings.get(id, 'merchant');
      // var certificate = settings.get(id, 'certificate');
      // var conf = { app: app, merchant: merchant, certificate: certificate };
      settings.get(id, function(conf) {
        weixin.pay.api.order.unified(conf, data, pay.unified(req, res));
      })
    };
  },
  init: function init(req, res) {
    order.create(req, res, self._unified(req, res));
  },
  callback: function callback(req, res) {
    var router = require('../index');
    var id = router.getId(req);
    // var app = settings.get(id, 'app');
    // var merchant = settings.get(id, 'merchant');
    settings.get(id, function(conf) {
      weixin.pay.callback.notify(conf.app, conf.merchant, req, res, pay.callback(res));
    });
  }
};

module.exports = self;
