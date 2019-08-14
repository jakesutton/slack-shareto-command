const qs = require('querystring');
const axios = require('axios');

const all = () => {
  const body = { token: process.env.SLACK_ACCESS_TOKEN, exclude_archived: true, limit: 1000 };  
  return axios.post('https://slack.com/api/conversations.list', qs.stringify(body));
};

const findByName = (name) => {
  name = name.replace("#", "");
  return new Promise((resolve, reject) => {
    resolve(
      all().then((result) => {
        const channels = result.data.channels
        return channels.find(channel => channel.name == name);
      }).catch((err) => {
        return undefined;
      })
    );
  });
  
};

module.exports = { findByName };
