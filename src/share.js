const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');
const channels = require('./channels');

const sendMessage = (userID, channelID, text) => {
  const body = {
    token: process.env.SLACK_ACCESS_TOKEN,
    channel: channelID,
    user: userID,
    text: text
  }
  return axios.post('https://slack.com/api/chat.postEphemeral', qs.stringify(body))
};

// Share post to target channel
const post = (userID, fromChannelID, channelName, text) => {
  channels.findByName(channelName).then((channel) => {
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

      axios.post('https://slack.com/api/chat.postMessage', messageBody).then((result) => {
        const text = `Your post has been shared to <#${channel.id}>!`;
        sendMessage(userID, fromChannelID, text).then((res) => console.log('Sucess sent'));
      }).catch((err) => {
        debug('Share post error: %o', err);
        console.error(err);
      });
    } else {
      const text = `A public channel named "${channelName}" was not found`;
      sendMessage(userID, fromChannelID, text).then((res) => console.log('Not found message sent'));
    }
  }).catch((err) => {
    debug('Share channel find error: %o', err);
    console.error(err);
  });
};

module.exports = { post };