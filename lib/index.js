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
  }
};
