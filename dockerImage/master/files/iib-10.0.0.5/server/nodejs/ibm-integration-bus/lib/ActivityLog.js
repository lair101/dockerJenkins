"use strict";

function ActivityLogEntry(className, methodName, messageKey) {
  this.className = className;
  this.methodName = methodName;
  this.messageKey = messageKey;
  this.tags = {};
  this.inserts = [];
  for (var i = 3; i < arguments.length; i++) {
    this.inserts.push(arguments[i]);
  }
}

ActivityLogEntry.prototype.__addTag = function (name, value) {
  this.tags[name] = value;
};

ActivityLogEntry.prototype.resourceManager = function (resourceManager) {
  this.__addTag('RM', resourceManager);
  return this;
};

ActivityLogEntry.prototype.end = function () {
  global.ibm.integrationBus.activityLog.writeTraceEvent(this);
  return this;
};

function writeTraceEvent(className, methodName, messageKey) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String)) {
    var args = [ null ];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    return new (ActivityLogEntry.bind.apply(ActivityLogEntry, args))();
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeTraceEvent = writeTraceEvent;
