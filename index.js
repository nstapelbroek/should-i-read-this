const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')
const signalHandler = require('./src/helpers/signalHandler')()

const app = express()
app.use(bodyParser.json())

const API_KEY = process.env.RAZOR_API_KEY;
const config = {
  mode: 'cleanHTML',
  extractors: 'topics'
}

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/', (req, res) => {
  res.send(req.body.challenge)
})

app.get('/interpet', (req, res) => {
  request.post({
    url: 'https://api.textrazor.com/',
    headers: {
      'x-textrazor-key': API_KEY,
    },
    form: {
      'cleanup.mode': config.mode,
      extractors: config.extractors,
      url: 'https://enrise.com/2016/03/an-introduction-to-service-discovery/'
    }
  }, (err, response, body) => {
    const json = JSON.parse(body);
    res.send(json.response.topics.slice(0, 3))
  })
})

app.listen(3000)
