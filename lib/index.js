var handlers = require('./handlers');
var callbacks = require('./callbacks');

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
  callbacks: callbacks,
  onOauthAccess: function(cb) {
    callbacks.oauth.access = cb;
  },
  onOauthSuccess: function(cb) {
    callbacks.oauth.success = cb;
  },
  onOrderCreate: function(cb) {
    callbacks.order.create = cb;
  },
  onOrderNotify: function(cb) {
    callbacks.order.notify = cb;
  },
  name: '__appId',
  getId: function(req, cb) {
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
