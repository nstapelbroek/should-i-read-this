const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const slackApiController = require('./src/controllers/api/slack')
const slackEventMiddleware = require('./src/middleware/slackEvent')
const signalHandler = require('./src/helpers/signalHandler')()

const app = express()
app.use(bodyParser.json())

const API_KEY = process.env.RAZOR_API_KEY;
const config = {
  mode: 'cleanHTML',
  extractors: 'topics'
}

app.post('/api/slack/event', slackEventMiddleware.verifyTokenPresent, slackEventMiddleware.completeVerification, slackApiController.postEvent);

app.listen(3000)
