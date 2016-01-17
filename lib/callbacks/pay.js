var order = require('node-weixin-order');
var weixin = require('node-weixin-api');

var errors = require('web-errors').errors;

var settings = require('node-weixin-settings');

export default {
  callback: function(res) {
    return function(error, data) {
      order.notify(error, data);
      res.end();
    };
  },
  unified: function(req, res) {
    return function(error, pay) {
      if (error) {
        res.json({
          code: errors.ERROR.code,
          message: errors.ERROR.message,
          data: error
        });
        return;
      }
      var prepayId = pay.prepay_id;
      var router = require('../index');

      var id = router.getId(req);
      settings.get(id, 'app', function(app) {
        settings.get(id, 'merchant', function(merchant) {
          var prepayData = weixin.pay.prepay(app, merchant, prepayId);
          res.json({
            code: errors.SUCCESS.code,
            message: errors.SUCCESS.message,
            data: prepayData
          });
        });
      });
    };
  }
};
