var order = require('node-weixin-order');
var weixin = require('node-weixin-api');

var errors = require('web-errors').errors;


export default {
  callback: function(res) {
    return function(error, data) {
      order.notify(error, data);
      res.end();
    };
  },
  unified: function(appConfig, res) {
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
      var prepayData = weixin.pay.prepay(appConfig.app, appConfig.merchant, prepayId);
      res.json({
        code: errors.SUCCESS.code,
        message: errors.SUCCESS.message,
        data: prepayData
      });
    };
  }
};
