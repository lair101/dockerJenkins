"use strict";

function writeServiceTraceEntry(className, methodName) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String)) {
    global.ibm.integrationBus.logging.writeServiceTraceEntry.apply(null, arguments);
  } else {
    throw new Error('className and methodName must be specified, and must be strings');
  }
}
module.exports.writeServiceTraceEntry = writeServiceTraceEntry;

function writeServiceTraceExit(className, methodName) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String)) {
    global.ibm.integrationBus.logging.writeServiceTraceExit.apply(null, arguments);
  } else {
    throw new Error('className and methodName must be specified, and must be strings');
  }
}
module.exports.writeServiceTraceExit = writeServiceTraceExit;

function writeServiceTrace(className, methodName, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeServiceTrace.apply(null, arguments);
  } else {
    throw new Error('className, methodName, and traceText must be specified, and must be strings');
  }
}
module.exports.writeServiceTrace = writeServiceTrace;

function writeSystemLogError(className, methodName, messageKey, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeSystemLogError.apply(null, arguments);
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeSystemLogError = writeSystemLogError;

function writeSystemLogWarning(className, methodName, messageKey, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeSystemLogWarning.apply(null, arguments);
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeSystemLogWarning = writeSystemLogWarning;

function writeSystemLogInformation(className, methodName, messageKey, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeSystemLogInformation.apply(null, arguments);
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeSystemLogInformation = writeSystemLogInformation;

function writeUserTraceDebug(className, methodName, messageKey, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeUserTraceDebug.apply(null, arguments);
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeUserTraceDebug = writeUserTraceDebug;

function writeUserTraceNormal(className, methodName, messageKey, traceText) {
  if ((typeof className === 'string' || className instanceof String) &&
      (typeof methodName === 'string' || methodName instanceof String) &&
      (typeof messageKey === 'string' || messageKey instanceof String) &&
      (typeof traceText === 'string' || traceText instanceof String)) {
    global.ibm.integrationBus.logging.writeUserTraceNormal.apply(null, arguments);
  } else {
    throw new Error('className, methodName, messageKey, and traceText must be specified, and must be strings');
  }
}
module.exports.writeUserTraceNormal = writeUserTraceNormal;
