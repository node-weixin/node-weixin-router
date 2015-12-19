var weixin = require('node-weixin-api');
var auth = require('../callbacks/auth');
var session = require('node-weixin-session');

module.exports = {
  ack: function (req, res) {
    var ackData = weixin.auth.extract(req.query);
    var app = session.get(req, 'app');
    weixin.auth.ack(app.token, ackData, auth.ack(res));
  }
};
