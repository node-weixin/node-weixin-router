var weixin = require('node-weixin-api');
var auth = require('../callbacks/auth');
module.exports = function(app) {
  return {
    ack: function(req, res) {
      var ackData = weixin.auth.extract(req.query);
      weixin.auth.ack(app.token, ackData, auth.ack(res));
    }
  };
};
