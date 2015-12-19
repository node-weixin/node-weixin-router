var weixin = require('node-weixin-api');
var session = require('node-weixin-session');

var oauth = require('../callbacks/oauth');

module.exports = {
  access: function (req, res) {
    var app = session.get(req, 'app');
    var urls = session.get(req, 'urls');
    var oauthData = session.get(req, 'oauth');
    var url = weixin.oauth.createURL(app.id, urls.success,
      oauthData.state,
      oauthData.scope);
    res.redirect(url);
  },
  success: function (req, res) {
    var code = null;
    if (req.query && req.query.code) {
      code = req.query.code;
    }
    if (!code) {
      var urls = session.get(req, 'urls');
      res.redirect(urls.access);
      return;
    }
    var app = session.get(req, 'app');
    weixin.oauth.success(app, code, oauth.success(req, res));
  }
};
