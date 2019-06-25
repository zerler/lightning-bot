# GroupMe NodeJS Lightning Bot

## Introduction

This project was primarily a means to familiarize myself with the behavior of NodeJS. I had the idea for this project while lifeguarding, thinking it would be helpful to get a notification when there's lightning near me to know when to close the pool! This project was built with NodeJS and receives lightning data through the Aeris Weather API.

## Contents

  * [Quickly get our sample bot up and running in your groups](#deploy)
    * Deploy the code to heroku
    * Create a bot
    * Configure to your bot's credentials
  * [Make changes to the bot](#pull)
    * Pull the code down to your local machine
    * Configure the local environment variables to your bot's credentials
    * Configure the id and secret for Aeris API

## Requirements:

  * GroupMe account
  * Heroku account
  * Aeris Weather account
  * [Heroku Toolbelt](https://toolbelt.heroku.com/)

# Get your bot up and running<a name="deploy"></a>

## Deploy to Heroku:

Clone this repository to your computer, run 'npm install' in a terminal from the directory containing all of your files, then [follow the directions](https://devcenter.heroku.com/articles/git) listed in your heroku project to deploy your files to your remote heroku project.

## Next, create a GroupMe Bot:

Go to:
https://dev.groupme.com/session/new

Use your GroupMe credentials to log into the developer site.

![Log into dev.groupme.com](https://i.groupme.com/640x292.png.38c9e590383149c1a01424fc61cdce4e)

Once you have successfully logged in, go to https://dev.groupme.com/bots/new

![Create your new bot](http://i.groupme.com/567x373.png.242d18352d7742858cf9a263f597c5d9)

Fill out the form to create your new bot:

  * Select the group where you want the bot to live
  * Give your bot a name
  * Paste in the url to your newly deply heroku app
    * `http://your-app-name-here.herokuapp.com/`
  * (Optional) Give your bot an avatar by providing a url to an image
  * Click submit

## Find your Bot ID:<a name="get-bot-id"></a>

Go here to view all of your bots:
https://dev.groupme.com/bots

Click on the one you just created.

![Select your new bot](http://i.groupme.com/1174x422.png.a911e2a2feab491783c7821b58100f16)

On your Bot's page, copy the Bot Token (aka your Bot ID)

![Copy your Bot ID](http://i.groupme.com/685x371.png.215bafa0a50c4b868df7c3003fd7ffc0)

## Add your Bot ID to your Heroku app:

Go here to see all of your Heroku apps and select the one you just created before:

https://dashboard-next.heroku.com/apps

![Select your heroku app](http://i.groupme.com/920x722.png.46154d6b95f249539c594b129ddb7732)

On your app page, click settings in the top navigation:

![Go to your app's settings](http://i.groupme.com/722x127.png.27c0a2e83c524064bd41bb66df76d14c)

On your app's setting page, find the Config Vars section and click the Reveal Config Vars button:

![Reveal your environment variables](http://i.groupme.com/606x181.png.94d5157963bc419886e98e038e3195c3)

Then click edit:

![Edit your environment variables](http://i.groupme.com/796x212.png.b8979454fc4742c7bae688ac67262755)

Fill out the form to add an environment variable to your app:

  * In the "key" field type: BOT_ID
  * In the "value" field paste your Bot ID that you copied in the previous steps
  * Click the save button

![Add the Bot ID environment variable](http://i.groupme.com/790x167.png.8696884639c6406b859fbb90693760c2)

## Now go test your bot!

Go to GroupMe and type "/cool guy" in the group where your bot lives to see it in action.

![Test your Bot](http://i.groupme.com/821x587.png.7bcf55bed1c64acab83fa2c2ad0b0862)

# Make it your own<a name="pull"></a>

## Pull the code to your local machine

Within terminal, change directory to the location where you would like the files to live, then run this command:

    $ heroku git:clone -a YOUR_APP_NAME_HERE

And then change directory into the new folder

    $ cd YOUR_APP_NAME_HERE

## Configure your local BOT_ID environment variable

Open the file `.env` from your local files in your text editor of choice.
Find where it says "YOUR_BOT_ID_HERE" and replace it with the ID of your new bot.

If you don't know what your Bot ID is, please refer back to [this](#get-bot-id) section,
where it is explained how to retrieve it.

If your Bot ID is 12345678910, then:

    BOT_ID="YOUR_BOT_ID_HERE"

becomes:

    BOT_ID="12345678910"

## Configure your Aeries Client ID and Secret

Open the file 'bot.js' from your local files in your text editor of choice.
On lines 10-11, you'll need to change the value of these variables to your own Client ID and Secret, found within your Aeris account.

After logging into [Aeris](https://www.aerisweather.com/), follow these steps to get your ID and secret:
* Click 'Apps' from your dashboard
* Click 'New Application' and come up with a name for your project
* It should now show up under 'Registered Apps', listing the client ID and secret
* Copy and paste these into the aforementioned 'bot.js' file

If your Bot ID is 987654321, then:

    const clientID = 'YOUR_CLIENT_ID';

becomes:

    const clientID = '987654321';

The same should follow for the 'secret' variable declared below it, simply change the value to the secret listed in your registered app.

## All done! Go play around and make the bot your own.

