var weixin = require('node-weixin-api');
var errors = require('web-errors').errors;
var validator = require('validator');

module.exports = function(appConfig) {
  return {
    config: function(req, res) {
      var url = null;
      var keys = ['body', 'query', 'params'];
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (req[k] && req[k].url) {
          url = req[k].url;
          break;
        }
      }
      if (!url || !validator.isURL(url)) {
        return res.json({
          code: errors.ERROR.code,
          message: errors.ERROR.message
        });
      }
      weixin.jssdk.prepare(appConfig.app, weixin.auth, url, function(error, data) {
        if (error) {
          return res.json({
            code: errors.ERROR.code,
            message: errors.ERROR.message,
            data: data
          });
        }
        return res.json({
          code: errors.SUCCESS.code,
          message: errors.SUCCESS.message,
          data: data
        });
      });
    }
  };
};
