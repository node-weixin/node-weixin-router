var weixin = require('node-weixin-api');
var errors = require('web-errors').errors;
var validator = require('validator');
var session = require('node-weixin-session');

module.exports = {
  config: function (req, res) {
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
    var app = session.get(req, 'app');
    weixin.jssdk.prepare(app, weixin.auth, url, function (error, data) {
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
