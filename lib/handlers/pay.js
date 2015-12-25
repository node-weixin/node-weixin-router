var order = require('node-weixin-order');
var weixin = require('node-weixin-api');
var settings = require('node-weixin-settings');

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
      var router = require('../index');
      var id = router.getId(req);
      var app = settings.get(id, 'app');
      var merchant = settings.get(id, 'merchant');
      var certificate = settings.get(id, 'certificate');
      var conf = {app: app, merchant: merchant, certifcate: certificate};

      weixin.pay.api.order.unified(conf,
        data, pay.unified(req, res));
    };
  },
  init: function (req, res) {
    order.create(req, res, this._unified(res));
  },
  callback: function (req, res) {
    var router = require('../index');
    var id = router.getId(req);
    var app = settings.get(id, 'app');
    var merchant = settings.get(id, 'merchant');

    weixin.pay.callback.notify(app, merchant, req, res, pay.callback(res));
  }
};
