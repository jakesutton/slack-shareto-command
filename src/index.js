require('dotenv').config();

const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const share = require('./share');
const signature = require('./verifySignature');
const debug = require('debug')('slash-command-template:index');

const apiUrl = 'https://slack.com/api';

const app = express();

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.get('/', (req, res) => {
  res.send('<h2>The Slash Command to share posts is running</h2> <p>Follow the' +
  ' instructions in the README to configure the Slack App and your environment variables.</p>');
});

/*
 * Endpoint to receive /shareto slash command from Slack.
 * Checks verification token and sends the shared post
 */
app.post('/command', async (req, res) => {
  // Verify the signing secret
  if (signature.isVerified(req)) {
    const { text, user_id, channel_id } = req.body;
    const channelName = text.split(" ")[0];
    const postText = text.substr(text.indexOf(" ") + 1);

    let responseText = await share.post(user_id, channel_id, channelName, postText);
    if (responseText) {
      let message = {
        "response_type": "ephemeral",
        "text": responseText
      };
      res.setHeader('content-type', 'application/json');
      return res.json(message);
    } else {
      return res.send('There was a problem sharing. Maybe try again later?');
    }
  } else {
    debug('Verification token mismatch');
    return res.sendStatus(404);
  }
});

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

