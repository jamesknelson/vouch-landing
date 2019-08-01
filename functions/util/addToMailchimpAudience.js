const fetch = require('isomorphic-fetch')
const md5 = require('blueimp-md5')

module.exports = async function addToMailchimpAudience({
  email,
  name,
  audienceId,
  apiKey,
}) {
  let mailchimpInstance = apiKey.split('-')[1]
  let url =
    'https://' +
    mailchimpInstance +
    '.api.mailchimp.com/3.0/lists/' +
    audienceId +
    '/members/' +
    md5(email)
  let response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from('any:' + apiKey).toString('base64'),
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: 'subscribed',
      merge_fields: {
        NAME: name,
      },
    }),
  })

  if (response.status < 300) {
    return {
      status: 'success',
    }
  } else {
    return {
      status: 'failure',
      code: response.status,
      error: response.status < 500 && (await response.json()),
    }
  }
}
