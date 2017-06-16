'use strict';

exports.getLinks = (messageText) => {
    const regex = /<(.*?)>/igm;
    let matches;
    var urls = [];

    while ((matches = regex.exec(messageText)) !== null) {
        if (matches.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        matches.forEach((match, groupIndex) => {
            if (groupIndex !== 1) {
                return;
            }

            var autocorrectedIndex = match.indexOf('|')
            if (autocorrectedIndex > 0) {
                return urls.push(match.substr(0, autocorrectedIndex));
            }

            return urls.push(match)

        });
    }

    return urls;
}
