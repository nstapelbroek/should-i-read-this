const request = require('request')

const API_KEY = process.env.RAZOR_API_KEY;

request.post({
  url: 'https://api.textrazor.com/',
  headers: {
    'x-textrazor-key': API_KEY,
  },
  form: {
    'cleanup.mode': 'cleanHTML',
    extractors: 'topics',
    url: 'https://enrise.com/2016/03/an-introduction-to-service-discovery/'
  }
}, (err, response, body) => {
  const json = JSON.parse(body);
  console.log(json.response.topics.slice(0, 3))
})
