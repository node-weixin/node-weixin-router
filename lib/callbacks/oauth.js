/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var session = require('node-weixin-session');
var settings = require('node-weixin-settings');
var weixin = require('node-weixin-api');

var callbacks = require('../callbacks');

function saveSession(req, res, data) {
  session.set(req, 'openid', data, function() {
    if (callbacks.oauth.success instanceof Function) {
      callbacks.oauth.success(req, res, data);
    }
  });
}

module.exports = {
  onProfile: function(req, res, urls) {
    return function(error, userInfo) {
      if (error) {
        res.redirect(urls.oauth.access);
        return;
      }
      saveSession(req, res, userInfo);
    };
  },
  success: function(req, res) {
    var self = this;
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
              weixin.oauth.profile(wx.openid, wx.accessToken, self.onProfile(req, res));
              break;
            default:
              saveSession(req, res, wx);
          }
        });
      });
    };
  }
};
