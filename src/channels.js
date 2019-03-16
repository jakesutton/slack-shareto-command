const qs = require('querystring');
const axios = require('axios');

const all = () => {
  const body = { token: process.env.SLACK_ACCESS_TOKEN, exclude_archived: true };  
  return axios.post('https://slack.com/api/conversations.list', qs.stringify(body));
};

const findByName = (name) => {
  name = name.replace("#", "");
  return new Promise((resolve, reject) => {
    resolve(
      all().then((result) => {
        console.log('result: %o', result);
        const channels = result.data.channels
        console.log('channels: %o', channels);
        return channels.find(channel => channel.name == name);
      }).catch((err) => {
        return undefined;
      })
    );
  });
  
};

module.exports = { findByName };
