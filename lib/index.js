var handlers = require('./handlers');
var emitter = require('node-weixin-events');

export default {
  init: function(router) {
    var hs = handlers;
    for (var entity in hs) {
      for (var key in hs[entity]) {
        router.all('/' + entity + '/' + key, hs[entity][key]);
      }
    }
    return hs;
  },
  onOauth: function(cb) {
    emitter.on(emitter.OAUTH_SUCCESS, cb);
  },
  onCreate: function(cb) {
    emitter.on(emitter.ORDER_CREATE, cb);
  },
  onNotify: function(cb) {
    emitter.on(emitter.ORDER_NOTIFY, cb);
  },
  getId: function(req) {
    if (req.params && req.params.id) {
      return req.params.id;
    }
    if (req.session && req.session.id) {
      return req.session.id;
    }
    return process.env.APP_ID;
  }
};
