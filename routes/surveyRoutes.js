const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Bailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');
const Path = require('path-parser');
const { URL } = require('url');

module.exports = (app) => {

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys/webhooks', (req, res) => {
		const { url, recipient } = req.body;
		const pathname = new URL(url).pathname;
		const p = new Path('/api/surveys/:surveyId/:choice');
		const match = p.test(pathname);
		if (match) {
			Survey.updateOne({
				_id: match.surveyId, // this is a mongo thing and not a mongoose thing
				recipients: {
					$elemMatch: { email: recipient, responded: false }
				}
			}, {
				$inc: { [match.choice]: 1 },
				$set: { 'recipients.$.responded': true },
				lastResponded: new Date()
			}).exec();
		}
	});

	app.get('/api/surveys', requireLogin, (req, res) => {
		Survey.find({
			_user: req.user.id 
		})
			.select({ recipients: false })
			.then((surveys) => res.send(surveys))
	})


	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title: title,
			subject: subject,
			body: body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id,
			dateSent: Date.now()
		});

		const mailer = new Mailer(survey, surveyTemplate(survey));
		
		mailer.send()
			.then((mailerResponse) => {
				survey.save();
				req.user.credits -= 1;
				req.user.save()
					.then((userResponse) => {
						res.send(userResponse);
					})
			})
			.catch((err) => {
				res.status(422).send(err);
			})
	});
};