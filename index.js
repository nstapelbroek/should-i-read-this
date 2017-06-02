const request = require('request')
const express = require('express')

const app = express()

const API_KEY = process.env.RAZOR_API_KEY;
const config = {
  mode: 'cleanHTML',
  extractors: 'topics'
}

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
    console.log(json.response.topics.slice(0, 3))
  })
})

app.listen(3000)
