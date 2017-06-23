'use strict';
const request = require('request')

exports.startThread = (channel, timestamp, text) => {
    request.post({
        url: 'https://slack.com/api/chat.postMessage',
        form: {
            "token": process.env.SLACK_API_KEY,
            "channel": channel,
            "thread_ts": timestamp,
            "text": text,
        }
    })
}
