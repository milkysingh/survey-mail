const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
	app.post('/api/stripe', requireLogin, (req, res) => {
		if (!req.user) {
			return res.status(401).send({ error: 'You must log in!' });
		}
		stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id
		}, (err, charge) => {
			req.user.credits += 5;
			req.user.save()
				.then((user) => {
					res.send(user);
				})
		})
	});
}