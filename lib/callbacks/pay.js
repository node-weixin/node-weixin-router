/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var weixin = require('node-weixin-api');
var callbacks = require('../callbacks');

var errors = require('../errors');

module.exports = {
  callback: function(res) {
    return function(error, data) {
      if (callbacks.order.notify instanceof Function) {
        callbacks.order.notify(error, data, res);
      }
    };
  },
  unified: function(settings, req, res) {
    return function(error, pay, json) {
      if (error) {
        res.json({
          name: errors.Failure.name,
          code: errors.Failure.code,
          message: errors.Failure.message,
          data: error,
          json: json
        });
        return;
      }
      var prepayId = pay.prepay_id;
      var router = require('../index');

      router.getId(req, function(id) {
        settings.get(id, 'app', function(app) {
          settings.get(id, 'merchant', function(merchant) {
            var prepayData = weixin.pay.prepay(app, merchant, prepayId);
            res.json({
              name: errors.Success.name,
              code: errors.Success.code,
              message: errors.Success.message,
              data: prepayData
            });
          });
        });
      });
    };
  }
};
