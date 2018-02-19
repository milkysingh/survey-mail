// prod.js - production keys here!
module.exports = {
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	mongoURI: 'mongodb://brucewong21:1ilovealice22190@ds161493.mlab.com:61493/bruce-dev',
	cookieKey: process.env.COOKIE_KEY,
	stripePublishableKey: 'pk_test_QH0ob0ZfEfjF3t5yGU6ZjZEq',
	stripeSecretKey: 'sk_test_eD3N0AkG3p6BInLxCShEs2Wj',
  sendGridKey: process.env.SEND_GRID_KEY,
  mailGunKey: process.env.MAIL_GUN_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN
};