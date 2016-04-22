/* eslint space-before-function-paren: [2, "never"] */
/* eslint-env es6 */

var handlers = require('./handlers');
var callbacks = require('./callbacks');

module.exports = {
  init: function(settings, session, router) {
    var hs = handlers;
    for (var entity in hs) {
      if (typeof entity === 'string') {
        for (var key in hs[entity]) {
          if (typeof key === 'string') {
            router.all('/' + entity + '/' + key, hs[entity][key](settings, session));
          }
        }
      }
    }
    return hs;
  },
  express: function(settings, session, app, prefix) {
    prefix = prefix || '';
    var hs = handlers;
    for (var entity in hs) {
      if (typeof entity === 'string') {
        for (var key in hs[entity]) {
          if (typeof key === 'string') {
            app.all(prefix + '/' + entity + '/' + key, hs[entity][key](settings, session));
          }
        }
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
    cb(process.env.APP_ID || 0);
  }
};
