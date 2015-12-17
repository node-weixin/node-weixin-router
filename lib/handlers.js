
module.exports = function(appConfig) {
  return {
    auth: require('./handlers/auth')(appConfig.app),
    oauth: require('./handlers/oauth')(appConfig),
    jssdk: require('./handlers/jssdk')(appConfig),
    pay: require('./handlers/pay')(appConfig)
  };
};
