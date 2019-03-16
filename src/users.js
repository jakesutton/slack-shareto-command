const axios = require('axios');
const debug = require('debug')('slash-command-template:ticket');
const qs = require('querystring');

const find = (slackUserId) => {
  const body = { 
    token: process.env.SLACK_ACCESS_TOKEN, 
    user: slackUserId 
  };
  return axios.post('https://slack.com/api/users.info', qs.stringify(body));
};

module.exports = { find };
