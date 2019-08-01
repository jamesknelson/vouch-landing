const admin = require('firebase-admin')
const functions = require('firebase-functions')
const addToMailchimpAudience = require('./util/addToMailchimpAudience')

admin.initializeApp()

const MailchimpConfig = functions.config().mailchimp

exports.joinMailingList = functions.https.onCall(async data => {
  let { email, name } = data
  let { key: apiKey, audience_id: audienceId } = MailchimpConfig
  let result = await addToMailchimpAudience({
    email,
    name,
    apiKey,
    audienceId,
  })

  return result
})
