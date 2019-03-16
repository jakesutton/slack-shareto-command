# Sharing great things using a Slash Command

Use a slash command to share to a public channel regardless of your membership in that channel. This is useful if you don't usually hang out in a channel but you find an intersting link that you know the members in that channel would love.

## Setup

### 1. Remix this Glitch repo

[![Remix on Glitch](https://cdn.glitch.com/2703baf2-b643-4da7-ab91-7ee2a2d00b5b%2Fremix-button.svg)](https://glitch.com/edit/#!/remix/vivid-methane)

### 2. Create a Slack app

1. Create an app at [https://api.slack.com/apps](https://api.slack.com/apps)
2. Add a Slash command (See *Add a Slash Command* section below)
3. Navigate to **Bot Users** and click "Add a Bot User" to create one.
4. Navigate to the **OAuth & Permissions** page and make sure the following scopes are pre-selected:
    * `commands`
    * `bot`
5. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)

#### Add a Slash Command
1. Go back to the app settings and click on Slash Commands.
1. Click the 'Create New Command' button and fill in the following:
    * Command: `/shareto`
    * Request URL: Your server or Glitch URL + `/command`
    * Short description: `Share to public channels regardless of membership`
    * Usage hint: `#public-channel [text you want to share]`

If you did "Remix" on Glitch, it auto-generate a new URL with two random words, so your Request URL should be like: `https://fancy-feast.glitch.me/command`. 


## Run this App

Set Environment Variables and run:

1. Set the following environment variables to `.env` (see `.env.sample`):
    * `SLACK_ACCESS_TOKEN`: Your bot token, `xoxb-` (available on the **OAuth & Permissions** once you install the app)
    * `SLACK_SIGNING_SECRET`: Your app's Signing Secret (available on the **Basic Information** page)
2. If you're running the app locally, run the app (`npm start`). Or if you're using Glitch, it automatically starts the app.

## Credits

I based a lot of this code on the example I found [here](https://glitch.com/~slack-slash-command-and-dialogs-blueprint)