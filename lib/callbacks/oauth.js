var emitter = require('node-weixin-events');
var session = require('node-weixin-session');

export default {
  success: function(req, res) {
    return function(error, json) {
      var urls = session.get(req, 'urls');
      if (error) {
        res.redirect(urls.access);
        return;
      }
      var wx = {};
      wx.openid = json.openid;
      wx.accessToken = json.access_token;
      wx.refreshToken = json.refresh_token;
      session.set(req, 'openid', wx);
      emitter.emit(emitter.OAUTH_SUCCESS, [req, wx]);
      res.redirect(urls.redirect);
    };
  }
};
