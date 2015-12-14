var order = require('node-weixin-order');
// var conf = require('node-weixin-config');

var Emitter = require('events').EventEmitter;

var routerEmitter = new Emitter();
var handlers = require('./handlers');
var auth = require('./callbacks/auth');


export default {
  handlers: handlers,
  init: function(router, appConfig) {
    var hs = this.handlers(appConfig, routerEmitter, auth.ack);
    for (var entity in hs) {
      for (var key in hs[entity]) {
        router.all('/' + entity + '/' + key, hs[entity][key]);
      }
    }
    return hs;
  },
  onOauth: function(cb) {
    routerEmitter.once('oauth', cb);
  },
  onCreate: function(cb) {
    order.addListener('create', cb);
  },
  onNotify: function(cb) {
    order.addListener('notify', cb);
  }
};
