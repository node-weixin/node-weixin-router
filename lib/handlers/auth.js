
var weixin = require('node-weixin-api');
var auth = require('../callbacks/auth');
var callbacks = require('../callbacks');

function register(events, obj, cb) {
  for (var i = 0; i < events.length; i++) {
    var func = obj[events[i]];
    func(cb);
  }
}

module.exports = {
  ack: function (settings) {
    return function (req, res) {
      if (req.query) {
        var ackData = weixin.auth.extract(req.query);
        var router = require('../index');
        router.getId(req, function (id) {
          settings.get(id, 'app', function (app) {
            weixin.auth.ack(app.token, ackData, auth.ack(res));
          });
        });
      }

      if (req.body) {
        var message = weixin.message.messages;
        if (callbacks.auth.message instanceof Function) {
          var types = ['text', 'image', 'voice', 'video', 'shortvideo', 'location', 'link'];
          register(types, message.on, callbacks.auth.message, req, res);
        }
        if (callbacks.auth.event instanceof Function) {
          var eventTypes = ['subscribe', 'unsubscribe', 'scan', 'location', 'click', 'view', 'templatesendjobfinish'];
          register(eventTypes, message.event.on, callbacks.auth.event, req, res);
        }
        message.onXML(req.body, res, function callback() {
        });
      }
    };
  }
};
