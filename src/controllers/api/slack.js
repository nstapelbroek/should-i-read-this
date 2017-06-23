'use strict';
const messageParser = require('../../helpers/slackMessageParser')
const messageEvent = require('../../models/slack/messageEvent')
const textRazorClient = require('../../clients/textRazor')
const slackClient = require('../../clients/slack')
const util = require('util');

/**
 * POST /api/slack/event
 * Handle a slack event hook
 */
exports.postEvent = (req, res) => {
    if (req.body.event === undefined) {
        return badRequestError('no event given', res)
    }

    const event = new messageEvent(req.body.event)
    if (event.getType() === undefined) {
        return badRequestError('event type undefined', res)
    }

    if (event.isHidden()) {
        return finishRequest('dropped', 'Event is marked hidden', res)
    }

    if (!event.isOfType('message')) {
        return finishRequest('dropped', util.format('Event of type %s is unused in this application', event.type), res)
    }

    if (event.hasSubType()) {
        return finishRequest('dropped', 'Subtype hooks are currently not supported', res)
    }

    var links = messageParser.getLinks(event.getText())
    links.forEach(function (link) {
        textRazorClient.analyzeUrl(link, (err, response, body) => {
            if (err) {
                console.log(err)
            }

            const jsonBody = JSON.parse(body);
            var text = "";
            if (jsonBody.ok == false) {
                text = util.format('I was unable to read your article, reason: %s', jsonBody.error)
            } else {
                var topics = jsonBody.response.topics.slice(0, 3)
                text = util.format(
                    'After reading this link (%s) I think it\'s about: %s, %s and %s',
                    link,
                    topics[0].label,
                    topics[1].label,
                    topics[2].label,
                )
            }

            slackClient.startThread(event.getChannel(), event.getTimestamp(), text)
        })
    });

    return finishRequest('accepted', 'URL will be analyzed', res)
};

const badRequestError = (reason, res) => {
    return res.status(400).send(reason)
}

const finishRequest = (status, reason, res) => {
    return res.status(202).json({ "status": status, "reason": reason })
}