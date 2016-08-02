var weixin = require('node-weixin-api');
var errors = require('../errors');
var callbacks = require('../callbacks');

function register(events, obj, cb) {
  for (var i = 0; i < events.length; i++) {
    var func = obj[events[i]];
    func(cb);
  }
}

var auth = {
  onMessage: function (req, res) {
    if (!req.body) {
      return;
    }

    var xml = String(req.body);

    if (!xml) {
      console.error('req.body must not be empty!');
      return;
    }
    var message = weixin.message.messages;
    if (callbacks.auth.message instanceof Function) {
      var types = ['text', 'image', 'voice', 'video', 'shortvideo', 'location', 'link'];
      register(types, message.on, callbacks.auth.message, req, res);
    }
    if (callbacks.auth.event instanceof Function) {
      var eventTypes = ['subscribe', 'unsubscribe', 'scan', 'location', 'click', 'view', 'templatesendjobfinish'];
      register(eventTypes, message.event.on, callbacks.auth.event, req, res);
    }
    message.onXML(xml, res, function callback() {
    });
  },
  ack: function (req, res) {
    return function (error, data) {
      if (!error) {
        res.send(data);
        if (!data) {
          auth.onMessage(req, res);
        }
        return;
      }
      if (data.key) {
        res.send(errors.InputInvalid);
        return;
      }
      switch (data) {
        case 2:
          res.send(errors.SignatureNotMatch);
          break;
        default:
          res.send(errors.UnknownError);
          break;
      }
    };
  }
};

module.exports = auth;
