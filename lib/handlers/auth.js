/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var weixin = require('node-weixin-api');
var auth = require('../callbacks/auth');
var settings = require('node-weixin-settings');

module.exports = {
  ack: function(req, res) {
    var ackData = weixin.auth.extract(req.query);
    var router = require('../index');
    router.getId(req, function(id) {
      settings.get(id, 'app', function(app) {
        weixin.auth.ack(app.token, ackData, auth.ack(res));
      });
    });
  }
};
