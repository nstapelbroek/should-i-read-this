'use strict';
const request = require('request')

exports.analyzeUrl = (link, callback) => {
    request.post({
        url: 'https://api.textrazor.com/',
        headers: {
            'x-textrazor-key': process.env.RAZOR_API_KEY,
        },
        form: {
            'cleanup.mode': 'cleanHTML',
            extractors: 'topics',
            url: link
        }
    }, callback)
}
