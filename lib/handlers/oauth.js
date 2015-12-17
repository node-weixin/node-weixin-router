var weixin = require('node-weixin-api');

var oauth = require('../callbacks/oauth');

module.exports = function(appConfig) {
  return {
    access: function(req, res) {
      var url = weixin.oauth.createURL(appConfig.app.id, appConfig.urls.success,
        appConfig.oauth.state,
        appConfig.oauth.scope);
      res.redirect(url);
    },
    success: function(req, res) {
      var code = null;
      if (req.query && req.query.code) {
        code = req.query.code;
      }
      if (!code) {
        res.redirect(appConfig.urls.access);
        return;
      }
      weixin.oauth.success(appConfig.app, code, oauth.success(appConfig, res));
    }
  };
};
