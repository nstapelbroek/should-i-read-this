'use strict';

class messageEvent {
    constructor(requestBody) {
        this.setType(requestBody.type)
        this.setSubType(requestBody.subtype)
        this.setUser(requestBody.user)
        this.setText(requestBody.text)
        this.setTimestamp(requestBody.ts)
        this.setChannel(requestBody.channel)
        this.setEventTimestamp(requestBody.event_ts)
        this.setHidden(requestBody.hidden)
    }

    getText() {
        return this.text;
    }
    getTimestamp() {
        return this.timestamp;
    }
    getChannel() {
        return this.channel;
    }
    getEventTimestamp() {
        return this.event_ts;
    }
    getType() {
        return this.type;
    }
    getSubType() {
        return this.sub_type
    }
    getUser() {
        return this.user;
    }
    isHidden() {
        return this.hidden;
    }

    setText(text) {
        this.text = text
    }
    setTimestamp(timestamp) {
        this.timestamp = timestamp
    }
    setChannel(channel) {
        this.channel = channel
    }
    setEventTimestamp(eventTimestamp) {
        this.event_ts = eventTimestamp
    }
    setType(type) {
        this.type = type;
    }
    setSubType(subType) {
        this.sub_type = subType
    }
    setUser(user) {
        this.user = user;
    }
    setHidden(hidden) {
        this.hidden = hidden
    }


    isOfType(type) {
        return (this.type === type)
    }
    hasSubType() {
        return (typeof this.sub_type != "undefined" && this.sub_type)
    }
}

module.exports = messageEvent;