var weixin = require('node-weixin-api');
var auth = require('../callbacks/auth');
var settings = require('node-weixin-settings');

module.exports = {
  ack: function (req, res) {
    var ackData = weixin.auth.extract(req.query);
    var router = require('../index');
    var id = router.getId(req);
    settings.get(id, 'app', function(app) {
      weixin.auth.ack(app.token, ackData, auth.ack(res));
    });
  }
};
