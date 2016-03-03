var session = require('node-weixin-session');
var settings = require('node-weixin-settings');
var weixin = require('node-weixin-api');


var callbacks = require('../callbacks');

export default {
  success: function(req, res) {
    return function(error, json) {
      var router = require('../index');
      router.getId(req, function(id) {
        settings.all(id, function(all) {
          var urls = all.urls;
          if (error) {
            res.redirect(urls.oauth.access);
            return;
          }
          var wx = {};
          wx.openid = json.openid;
          wx.accessToken = json.access_token;
          wx.refreshToken = json.refresh_token;

          switch (all.oauth.scope) {
            case '1':
            case 1:
              weixin.oauth.profile(wx.openid, wx.accessToken, function(error1, userInfo) {
                if (error1) {
                  res.redirect(urls.oauth.access);
                  return;
                }
                session.set(req, 'openid', userInfo, function() {
                  if (callbacks.oauth.success instanceof Function) {
                    callbacks.oauth.success(req, res, userInfo);
                  }
                });
              });
              break;
            default:
              session.set(req, 'openid', wx, function() {
                if (callbacks.oauth.success instanceof Function) {
                  callbacks.oauth.success(req, res, wx);
                }
              });
          }
        });
      });
    };
  }
};
