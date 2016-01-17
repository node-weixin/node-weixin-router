var weixin = require('node-weixin-api');
var settings = require('node-weixin-settings');

var oauth = require('../callbacks/oauth');

module.exports = {
  access: function(req, res) {
    var router = require('../index');
    var id = router.getId(req);
    // var app = settings.get(id, 'app');
    // var urls = settings.get(id, 'urls');
    // var oauthData = settings.get(id, 'oauth');
    settings.all(id, function(all) {
      var url = weixin.oauth.createURL(all.app.id, all.urls.oauth.success,
        all.oauthData.state,
        all.oauthData.scope);
      res.redirect(url);
    })
  },
  success: function(req, res) {
    var code = null;
    if (req.query && req.query.code) {
      code = req.query.code;
    }
    var router = require('../index');
    var id = router.getId(req);
    // var app = settings.get(id, 'app');
    // var urls = settings.get(id, 'urls');
    settings.all(id, function(all) {
      var urls = all.urls;
      var app = all.app;

      if (!code) {
        res.redirect(urls.oauth.access);
        return;
      }
      weixin.oauth.success(app, code, oauth.success(req, res));
    });
  }
};
