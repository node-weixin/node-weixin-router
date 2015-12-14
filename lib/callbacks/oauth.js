export default {
  success: function(appConfig, emitter, res) {
    return function(error, json) {
      if (error) {
        res.redirect(appConfig.urls.access);
        return;
      }
      var wx = {};
      wx.openid = json.openid;
      wx.accessToken = json.access_token;
      wx.refreshToken = json.refresh_token;
      emitter.emit('oauth', wx);
      res.redirect(appConfig.urls.redirect);
    };
  }
};
