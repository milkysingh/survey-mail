const keys = require('../config/keys');
const domain = process.env.MAILGUN_DOMAIN || 'sandbox69e5d78673fd4bf09917f589412bfe22.mailgun.org';
console.log(domain)
const mailgun = require('mailgun-js')({ apiKey: keys.mailGunKey, domain: domain});
const axios = require('axios');


class Bailer {
  constructor({ subject, recipients}, content) {
    this.subject = subject;
    this.to = this.formatAddresses(recipients); 
    this.html = content;
    this.from = 'Mailgun Sandbox <postmaster@sandbox55c863ce6cc84c35ab390493d159acf8.mailgun.org>'
    this.data = this.toJSON();

  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return email;
    }).join(',')
  }

  toJSON() {
    return {
      subject: this.subject,
      from: this.from,
      to: this.to,
      html: this.html
    }
  }

  send() {
    return mailgun.messages().send(this.data);
  }
}

module.exports = Bailer;
