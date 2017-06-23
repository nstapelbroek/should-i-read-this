'use strict';

/**
 * Slack should send a token on each event passed. If this token is missing, we are probably not dealing with a Slack message
 */
exports.verifyTokenPresent = (req, res, next) => {
    if (req.body.token === undefined) {
        return res.status(400).send('no token was found in your request body')
    }
    return next()
};

/**
 * Whenever we are doing setup procedures for a new bot, slack sends a verification request.
 * This middleware should answer this request accordingly and complete the verification
 */
exports.completeVerification = (req, res, next) => {
    if (req.body.type === 'url_verification') {
       return  res.send(req.body.challenge)
    }
    return next()
}