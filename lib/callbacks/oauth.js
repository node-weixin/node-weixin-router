var emitter = require('node-weixin-events');
export default {
  success: function(appConfig, req, res) {
    return function(error, json) {
      if (error) {
        res.redirect(appConfig.urls.access);
        return;
      }
      var wx = {};
      wx.openid = json.openid;
      wx.accessToken = json.access_token;
      wx.refreshToken = json.refresh_token;
      emitter.emit(emitter.OAUTH_SUCCESS, [req, res, wx]);
      res.redirect(appConfig.urls.redirect);
    };
  }
};
