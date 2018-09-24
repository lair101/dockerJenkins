"use strict";

var util = require('util');

function IIBError(className, methodName, messageKey, traceText) {
  var i;
  if (!(this instanceof Error)) {
    // This is a "throw iib.Error(...)" call and needs converting into the
    // equivalent of "throw new iib.Error(...)" - so we need to call ourselves.
    // We have to copy the arguments array - not safe to reuse it apparently!
    var args = [ null ];
    for (i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    return new (IIBError.bind.apply(IIBError, args))();
  }
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    Error.captureStackTrace(this, this.constructor);
    this.className = className;
    this.methodName = methodName;
    this.messageKey = messageKey;
    this.traceText = traceText;
    this.inserts = [];
    for (i = 4; i < arguments.length; i++) {
      this.inserts.push(arguments[i]);
    }
    var logger = require('log4js').getLogger();
    logger.debug("Constructing IIBError(" + className + ":" + methodName + " " + messageKey + " " + traceText + " " + JSON.stringify(this.inserts) +")");
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}

util.inherits(IIBError, Error);

module.exports = IIBError;
