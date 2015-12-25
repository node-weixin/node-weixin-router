var app = {
  id: process.env.APP_ID,
  secret: process.env.APP_SECRET,
  token: process.env.APP_TOKEN
};

var merchant = {
  id: process.env.MERCHANT_ID,
  key: process.env.MERCHANT_KEY
};

var certificate = {
  pfx: process.env.PFX_BUFFER,
  pfxKey: process.env.MERCHANT_ID + ''
};

var urls = {
  oauth: {
    success: 'http://www.sina.com/',
    access: 'http://www.sina.com/',
    redirect: 'http://www.sina.com/'
  }
};

var oauth = {
  state: 'STATE',
  scope: 0
};

var appConfig = {
  app: app,
  merchant: merchant,
  certificate: certificate,
  urls: urls,
  oauth: oauth
};

module.exports = appConfig;
