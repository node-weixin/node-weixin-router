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
  express: function(app, prefix) {
    prefix = prefix || '';
    var hs = handlers;
    for (var entity in hs) {
      for (var key in hs[entity]) {
        app.all(prefix + '/' + entity + '/' + key, hs[entity][key]);
      }
    }
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
  name: '__appId',
  getId: function(req, cb) {
    console.info('You should replace getId with yours');
    var name = this.name;
    if (req.params && req.params[name]) {
      return cb(req.params[name]);
    }
    if (req.session && req.session[name]) {
      return cb(req.session[name]);
    }
    cb(process.env.APP_ID);
  }
};
