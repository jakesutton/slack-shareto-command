const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const channels = require('./channels');

// Share post to target channel
const post = async (userID, fromChannelID, channelName, text) => {
  let channel = await channels.findByName(channelName)
  if (channel) {
    const messageAttachments = [ 
      { 
        pretext: `Hi! <@${userID}> wanted to share this with you all:`,
        text: text,
        mrkdwn_in: ["text"]
      } 
    ]
    const messageBody = qs.stringify({
      token: process.env.SLACK_ACCESS_TOKEN,
      channel: channel.id,
      attachments: JSON.stringify(messageAttachments),
      icon_emoji: ":raised_hands:"
    });

    let result = await axios.post('https://slack.com/api/chat.postMessage', messageBody)
    return `Your post has been shared to <#${channel.id}>!`;
  } else {
    return `A public channel named "${channelName}" was not found`;
  }
};

module.exports = { post };