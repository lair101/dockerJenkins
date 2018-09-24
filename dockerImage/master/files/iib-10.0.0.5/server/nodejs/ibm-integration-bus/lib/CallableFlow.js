"use strict";

var Logging = require('./Logging.js').Logging;

/*
 * The "cfName" argument below is an object of the form
 *
 * { "application": appNme,
 *   "endpoint": epName,
 *   "node": nodeName,
 *   "terminal": terminalName,
 *   "version": versionString }
 *
 * and mirrors the CallableFlowName structure in ImbCallableFlowManager.
 *
 *
 * The "data" argument below is an object of the form
 *
 * { "replyIdentifier": stringFormOfID,
 *   "messageBuffer": messageData,
 *   "localEnvironmentBuffer": leData,
 *   "exceptionListBuffer": excListData,
 *   "requestTimeoutInSeconds": 120,
 *   "messageUuid": uuidAsString }
 *
 * and mirrors the FlowMessage structure in ImbCallableFlowManager.
 * The same data object is used for replies, but the ID and timeout
 * fields are not populated.
 *
 */

function callLocalFlow(cfName, data, cb) {
  global.ibm.integrationBus.callableFlow.callLocalFlow.apply(null, arguments);
}
module.exports.callLocalFlow = callLocalFlow;

function setRemoteFlowHandler(remoteHandlerFunction) {
  global.ibm.integrationBus.callableFlow.remoteHandlerFunction = remoteHandlerFunction;
}
module.exports.setRemoteFlowHandler = setRemoteFlowHandler;

// Assumes global C++ callback function has been set up; only exported
// because mocha needs to be able to see it!
/* istanbul ignore next */
function sendRemoteReplyBackToCPlusPlus(data, id) {
    global.ibm.integrationBus.callableFlow.remoteReplyCallback(undefined, id, data);
}
module.exports.sendRemoteReplyBackToCPlusPlus = sendRemoteReplyBackToCPlusPlus;

// Assumes global C++ callback function has been set up; only exported
// because mocha needs to be able to see it!
/* istanbul ignore next */
function sendRemoteReplyBackToCPlusPlusFromSwitch(err, ctx, data) {
    global.ibm.integrationBus.callableFlow.remoteReplyCallback(err, ctx.trackingId, data);
}
module.exports.sendRemoteReplyBackToCPlusPlusFromSwitch = sendRemoteReplyBackToCPlusPlusFromSwitch;

// Assumes global C++ callback function has been set up, and that someone
// has populated remoteHandlerFunction.
/* istanbul ignore next */
function invokeRemoteFlowFromCPlusPlus(cfName, data, id) {
  if (global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager === undefined) {

    if ( global.ibm.integrationBus.callableFlow.remoteHandlerFunction === undefined )
    {
       throw new Error("Remote flow invocation not initialised");
    }
    global.ibm.integrationBus.callableFlow.remoteHandlerFunction(cfName, data, id, sendRemoteReplyBackToCPlusPlus);

    return;

  }

    global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.invokeCallableFlow(
    cfName,
    id,
    data,
    sendRemoteReplyBackToCPlusPlusFromSwitch,
    false,
    data.requestTimeoutInSeconds,
    data.messageUuid);

}
module.exports.invokeRemoteFlowFromCPlusPlus = invokeRemoteFlowFromCPlusPlus;

// Dummy function
if (global.ibm === undefined)
  global.ibm = {};
if (global.ibm.integrationBus === undefined)
  global.ibm.integrationBus = {};
if (global.ibm.integrationBus.callableFlow === undefined)
  global.ibm.integrationBus.callableFlow = {};
/* istanbul ignore next */
global.ibm.integrationBus.callableFlow.remoteRegistrationFunction = function (op, type, cfName) {

  /* istanbul ignore next */
  if (global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager === undefined)
  {
    throw new Error("Remote flow registration not initialised");
  }

  if (op === "add") {

    if (type === "input") {

      cfName.flowCallback = callLocalFlow;

      global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.createFlowRegistration(cfName);

    } else if (type === "invoke") {

      global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.createInvokeRegistration(cfName);

    }

  } else if (op === "delete") {

    if (type === "input") {

      global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.removeFlowRegistration(cfName);

    } else if (type === "invoke") {

      global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.removeInvokeRegistration(cfName);

    }

  }
};

/* istanbul ignore next */
function setRemoteRegistrationHandler(remoteRegistrationFunction) {
  global.ibm.integrationBus.callableFlow.remoteRegistrationFunction = remoteRegistrationFunction;
}
module.exports.setRemoteRegistrationHandler = setRemoteRegistrationHandler;

// Assumes that someone has populated remoteRegistrationFunction.
/* istanbul ignore next */
function registerInputNode(cfName) {
  if ( global.ibm.integrationBus.callableFlow.remoteRegistrationFunction === undefined )
  {
    throw new Error("Remote flow registration not initialised");
  }
  global.ibm.integrationBus.callableFlow.remoteRegistrationFunction("add", "input", cfName);
}
module.exports.registerInputNode = registerInputNode;

// Assumes that someone has populated remoteRegistrationFunction.
/* istanbul ignore next */
function registerInvokeNode(cfName) {
  if ( global.ibm.integrationBus.callableFlow.remoteRegistrationFunction === undefined )
  {
    throw new Error("Remote flow registration not initialised");
  }
  global.ibm.integrationBus.callableFlow.remoteRegistrationFunction("add", "invoke", cfName);
}
module.exports.registerInvokeNode = registerInvokeNode;

// Assumes that someone has populated remoteUnregistrationFunction.
/* istanbul ignore next */
function unregisterInputNode(cfName) {
  if ( global.ibm.integrationBus.callableFlow.remoteRegistrationFunction === undefined )
  {
    throw new Error("Remote flow registration not initialised");
  }
  global.ibm.integrationBus.callableFlow.remoteRegistrationFunction("delete", "input", cfName);
}
module.exports.unregisterInputNode = unregisterInputNode;

// Assumes that someone has populated remoteUnregistrationFunction.
/* istanbul ignore next */
function unregisterInvokeNode(cfName) {
  if ( global.ibm.integrationBus.callableFlow.remoteRegistrationFunction === undefined )
  {
    throw new Error("Remote flow registration not initialised");
  }
  global.ibm.integrationBus.callableFlow.remoteRegistrationFunction("delete", "invoke", cfName);
}
module.exports.unregisterInvokeNode = unregisterInvokeNode;

// Assumes that someone has populated remotelyCallableFlowManager.
/* istanbul ignore next */
function getRegisteredFlows() {
  if (global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager === undefined) {
    throw new Error("Remote flow registration not initialised");
  }
  return global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.getRegisteredFlows();
}
module.exports.getRegisteredFlows = getRegisteredFlows;

// Assumes that someone has populated remotelyCallableFlowManager.
/* istanbul ignore next */
function getRegisteredInvokers() {
  if (global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager === undefined) {
    throw new Error("Remote flow registration not initialised");
  }
  return global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager.getRegisteredInvokers();
}
module.exports.getRegisteredInvokers = getRegisteredInvokers;
