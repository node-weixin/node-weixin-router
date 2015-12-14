
module.exports = function(appConfig, emitter) {
  return {
    auth: require('./handlers/auth')(appConfig.app),
    oauth: require('./handlers/oauth')(appConfig, emitter),
    jssdk: require('./handlers/jssdk')(appConfig),
    pay: require('./handlers/pay')(appConfig)
  };
};
