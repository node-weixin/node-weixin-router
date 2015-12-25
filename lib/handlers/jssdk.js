var weixin = require('node-weixin-api');
var errors = require('web-errors').errors;
var validator = require('validator');
var settings = require('node-weixin-settings');

var jssdk = require('../callbacks/jssdk');

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
    var router = require('../index');
    var id = router.getId(req);
    var app = settings.get(id, 'app');
    weixin.jssdk.prepare(app, url, jssdk.prepared(res));
  }
};
