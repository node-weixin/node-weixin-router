var session = require('node-weixin-session');
var settings = require('node-weixin-settings');

var callbacks = require('../callbacks');

export default {
  success: function(req, res) {
    return function(error, json) {
      var router = require('../index');
      router.getId(req, function(id) {
        settings.get(id, 'urls', function(urls) {
          if (error) {
            res.redirect(urls.oauth.access);
            return;
          }
          var wx = {};
          wx.openid = json.openid;
          wx.accessToken = json.access_token;
          wx.refreshToken = json.refresh_token;
          session.set(req, 'openid', wx, function() {
            if (callbacks.oauth.success instanceof Function) {
              callbacks.oauth.success(req, res, wx);
            }
          });
        });
      });
    };
  }
};
