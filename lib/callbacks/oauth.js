/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var weixin = require('node-weixin-api');
var callbacks = require('../callbacks');

function saveSession(session, req, res, data) {
  session.set(req, 'openid', data, function() {
    if (callbacks.oauth.success instanceof Function) {
      console.log('inside success');
      callbacks.oauth.success(req, res, data);
    }
  });
}

module.exports = {
  onProfile: function(session, req, res, urls) {
    return function(error, userInfo) {
      if (error) {
        res.redirect(urls.oauth.access);
        return;
      }
      saveSession(session, req, res, userInfo);
    };
  },
  success: function(settings, session, req, res) {
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
              weixin.oauth.profile(wx.openid, wx.accessToken, self.onProfile(session, req, res));
              break;
            default:
              saveSession(session, req, res, wx);
          }
        });
      });
    };
  }
};
