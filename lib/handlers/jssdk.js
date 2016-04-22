/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */
var weixin = require('node-weixin-api');
var validator = require('validator');

var jssdk = require('../callbacks/jssdk');
var errors = require('../errors');

module.exports = {
  config: function(settings) {
    return function(req, res) {
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
          name: errors.Failure.name,
          code: errors.Failure.code,
          message: errors.Failure.message
        });
      }
      var router = require('../index');
      router.getId(req, function(id) {
        settings.get(id, 'app', function(app) {
          weixin.jssdk.prepare(settings, app, url, jssdk.prepared(res));
        });
      });
    };
  }
};
