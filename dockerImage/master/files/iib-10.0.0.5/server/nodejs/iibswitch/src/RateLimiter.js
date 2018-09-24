/**
 * Source File Name: RateLimiterTest.js
 *
 * Description:
 *
 * IBM Confidential
 *
 * OCO Source Materials.
 *
 * ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *
 * (C) Copyright IBM Corporation 2016.
 *
 * The Source code for this program is not published or otherwise divested of
 * its trade secrets, irrespective of what has been deposited with the U.S.
 * Copyright office.
 *
 */

'use strict';

function RateLimiter() {
  this.messagesIssued = 0;
	this.lastMessageMillis = -1;
  this.messageIntervals = [
    0, 10, 10, 10, // 30 sec
    30, 30, 30, 30, 30, 30, 30, 30, // 5 minutes
    300
  ];
}

RateLimiter.prototype.limit = function (callback) {
  var messageInterval = this.messageIntervals[Math.min(this.messagesIssued, this.messageIntervals.length - 1)];
	var nowMillis = Date.now();
	var timeSinceLastMessage = (nowMillis - this.lastMessageMillis) / 1000;
	if (this.messagesIssued === 0 || timeSinceLastMessage >= messageInterval)
	{
		callback();
		this.messagesIssued++;
		this.lastMessageMillis = nowMillis;
	}
};

RateLimiter.prototype.reset = function () {
  this.messagesIssued = 0;
  this.lastMessageMillis = -1;
};

module.exports = RateLimiter;
