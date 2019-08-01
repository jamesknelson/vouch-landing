Build a landing page with React, Firebase & Mailchimp - A Walkthrough
=====================================================================

This is the companion repository to a free [video walkthrough](), where I guide you through the process of creating and deploying a small landing page app using Firebase, React, and Mailchimp. By the time you're done, it'll look something like this:

**gif**

You can also find the finished landing page app at [vouch.chat](https://vouch.chat) -- at least until Vouch itself is ready to launch!

My goal with this walkthrough is to throw something together with the minimum time and effort possible -- after all, *it's just a landing page*. As a result, I've treated it literally as *just a walkthrough*, and haven't gone into any detailed explanation. But with that said, if you find this helpful and would like to learn more, I recommend that you check out my [React, Firebase & Bacon](https://frontarm.com/bacon) course. It goes into detail on everything that you need to build this landing page:

- Create React App
- Firebase Hosting and Functions
- Styled Components
- Basic Hooks

If you're at all interested, pop on over to the course page and take a look -- you can pick up a free CLI cheatsheet while you're there!

**[Watch the video]()**


Getting the example working
---------------------------

If you just want to get the landing page working without the full workthrough, then here's what you need to do.

### 1. Accounts

Before starting, you'll need to create Mailchimp account, and a Firebase app *with a plan that requires you to enter your billing details*, for example the *Blaze* plan. This is required as Firebase does not allow you to communicate with external APIs like Mailchimp on the default plan. Don't worry though -- the *Blaze* plan includes a free quota, so it likely won't cost you anything to try out.

Once your accounts are set up, you'll need to prepare the following information:

- Your Firebase config object
- Your Mailchimp API key
- Your Mailchimp Audience ID

#### Mailchimp settings

![Mailchimp settings](./gifs/mailchimp-settings.gif)

### 2. Clone and install

Once you've got the config ready, start by cloning the repository and installing its dependencies

```bash
git clone git@github.com:frontarm/vouch-landing.git vouch-landing
cd vouch-landing
npm install
```

### 3. Configuration files

To actually build and deploy the app, you'll need to create some configuration files, and add the settings you prepared earlier.

```bash
cp .env.example .env.development.local
cp .env.example .env.production.local
cp functions/.runtimeconfig.json.example functions/.runtimeconfig.json
```

Once you've created your configuration files, you'll need to add the following settings:

- Add your Mailchimp API key and Audience ID to `.runtimeconfig.json`
- Add your Firebase config to `.env.development.local` and `.env.production.local`

The end result should look something like this:

```js
// .runtimeconfig.json
{
  "mailchimp": {
    "audience_id": "hahahahaha",
    "key": "hahahahahahahahahahahahahahahaha-us3"
  }
}

// .env files
REACT_APP_FIREBASE_API_KEY=qwertyuiopasdfgh_asdfasdfasdfasdfasdfas
REACT_APP_FIREBASE_AUTH_DOMAIN=something.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://something.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=something
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=111111111111
REACT_APP_FIREBASE_APP_ID=1:111111111111:web:1rstarstarstarst
```

The configuration files are all listed in `.gitignore`, so that you don't accidentally push any configuration to a public repository.


### 4. Link a firebase app

The Firebase CLI tool looks for the current project's app ID in a file could `.firebaserc` -- which you'll need to create. The easiest way to do this is by running `firebase init`, and proceeding through the prompts *without* selecting anything to initialize:

```bash
firebase init
```


### 5. Start the dev server

You can test your configuration by starting the development server:

```bash
npm start
```

This should open a browser window to <http://localhost:3000/>, which should display the landing page. You should be able to submit the form, and see your email address appear in your Mailchimp account after a refresh.


### 6. Deploy!

Deploy your app to the internets is simple:

```bash
npm run build
```

This will build your app's distributable files with `react-scripts`, then deploy these to Firebase Hosting -- along with your `addToMailchimpAudience` function. Once complete, your new app's URL will be printed to the console.

If everything is set up correctly, you should be able to submit the form with another email address at the new URL, and see it appear in your Mailchimp account after a refresh. Congratulations -- you've got your landing page working! All that's left is to play with the styles to make it work for your brand.


### 7. Bonus step: add a domain

Within the [Firebase Console](https://console.firebase.google.com)'s *Hosting* area, you can add a domain name for your landing page -- so that it looks a little more official.


How does this all work though?
------------------------------

Give someone the source for a landing page, well, they have the source for a landing page. But teach them to make a landing page? It turns out that the same concepts apply to all sorts of problems -- and you'll be able to build *all manner of stuff*.

Although a landing page is still a pretty great place to start.

Want to learn to build your own landing pages, or customize the one in this repository? Or maybe you'd like to see how a *real-world* app with authentication and payments works on top of that? Then check out [React, Firebase & Bacon](https://frontarm.com/bacon) -- and while you're there, pick up a free CLI cheatsheet with many of the commands from this guide. I'll see you there!

*- James K Nelson*


License
-------

Code is licensed under the MIT license. Images are not licensed.