/**
 *
 * NAME: ServerEndpointBroker.js
 *
 * DECSRIPTION: ServerEndpointBroker
 *
 *
 * Licensed Materials - Property of IBM
 *
 * ProgIds: 5724-J05, 5655-AB1, 5655-AB2
 * (C) Copyright IBM Corp. 2016 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 *
 */

"use strict";

var logging = require('./Logging');
var logger = logging.logger("ServerEndpointBroker");
var util = require('util');

function ServerEndpointBroker() {
  logger.debug('Entering ServerEndpointBroker');
  this.endpointRegistration = []; //for port forwarding
  this.callableFlowRegistrations = {}; //for callableFlows (input nodes)
  this.callableInvokeRegistrations = {}; //for callableInvoke nodes
  this.timeSinceLastActivityMilliSec = (new Date()).getTime();
  this.connectionsMade = 0;
  this.connectionsDropped = 0;
  this.bytesOut = 0;
  this.bytesIn = 0;
  this.testConnectionWaitMilliSec = 10000;
  logger.debug('Leaving ServerEndpointBroker');
}

ServerEndpointBroker.prototype =
{
  "getEndpointsReg": function () {
    return this.endpointRegistration;
  },

  "getCallableFlowsReg": function () {
    return this.callableFlowRegistrations;
  },

  "getCallableInvokersReg": function () {
    return this.callableInvokeRegistrations;
  },

  "getEndpoints": function (agentName) {
    logger.debug('Entering ServerEndpointBroker.getEndpoints: ' + agentName);
    var retEndpoints = [];
    for (var i = 0; this.endpointRegistration.length > i ; i++) {
      var reg = this.endpointRegistration[i];
      logger.debug('Registration to check: ' + JSON.stringify(reg.endpointDetails));
      if (reg.sender.getName() === agentName) {
        //logger.debug('Endpoint found: ' + JSON.stringify(reg["endpointDetails"]));
        retEndpoints.push(reg.endpointDetails);
      }
    }
    logger.debug('Leaving ServerEndpointBroker.getEndpoints: ' + retEndpoints);
    return retEndpoints;
  },

  //used for testing endpoints from the cloud UI - just makes sure a connection can be made.
  "testEndpoint": function (agentName, endpointName, callback) {
    logger.debug('Entering ServerEndpointBroker.testEndpoint: ' + agentName + ', ' + endpointName);
    var retTest;
    for (var i = 0; this.endpointRegistration.length > i ; i++) {
      var reg = this.endpointRegistration[i];
      logger.debug('Registration to check: ' + JSON.stringify(reg.endpointDetails));
      if (reg.sender.getName() === agentName && reg.endpointDetails.name === endpointName) {
        logger.debug('Endpoint found: ' + JSON.stringify(reg.endpointDetails));
        // Add workaround to check for early close rather than error
        var closeExpected = false, closed = false;
        var connection = {
          "listenerAgent": {
            "id": 1,
            "sender": {
              "closeEndpoint": function () { // jshint ignore:line
                // Ensure that we don't do a stupid and send two callbacks.
                if (!closed) {
                  closed = true;
                  if (closeExpected) {
                    callback({ "connection": "success" });
                  }
                  else {
                    callback({ "connection": "failure", "reason": "Connection failed" });
                  }
                } else {
                  logger.debug('Already closed, ignoring', agentName, endpointName, connection, closeExpected);
                }
              },
              "errorEndpoint": function (id, error) { callback({ "connection": "failure", "reason": error.errno }); }, // jshint ignore:line
              "sendDataToEndpoint": function () { },
            }
          }
        };

        this.openEndpoint(reg.endpointDetails, connection);
        setTimeout(function () { // jshint ignore:line
          closeExpected = true;
          connection.endpointAgent.sender.closeEndpoint(connection.endpointAgent.id, true);
        }, this.testConnectionWaitMilliSec);
      }
    }
    logger.debug('Leaving ServerEndpointBroker.testEndpoint:');
  },

  //New endpoint registration
  "createEndpointRegistration": function (endpointRegistration) {
    logger.debug('Entering ServerEndpointBroker.createEndpointRegistration');
    this.endpointRegistration.push(endpointRegistration);
    logger.debug('Leaving ServerEndpointBroker.createEndpointRegistration');
  },

  //
  "openEndpoint": function (endpointDefinition, connectionProxy) {
    logger.debug('Entering ServerEndpointBroker.openEndpoint');
    logger.debug('Endpoint to open: ' + JSON.stringify(endpointDefinition));
    for (var i = 0; this.endpointRegistration.length > i ; i++) {
      var reg = this.endpointRegistration[i];
      logger.debug('Registration to check: ' + JSON.stringify(reg.endpointDetails));
      if (reg.endpointDetails.hostname === endpointDefinition.hostname &&
        reg.endpointDetails.port.toString() === endpointDefinition.port.toString()) {
        logger.debug('Endpoint found: ' + JSON.stringify(reg.endpointDetails));
        try {
          reg.sender.openEndpoint(endpointDefinition, connectionProxy);
          connectionProxy.endpointAgent.sender = reg.sender;
          return;
        }
        catch (e) {
          logger.debug('Error: ' + e);
        }
      }
    }
    logger.debug('Leaving ServerEndpointBroker.openEndpoint');
    throw new Error('No endpoint defined with hostname ' + endpointDefinition.hostname + ' and port ' + endpointDefinition.port);
  },

  "removeEndpointRegistration": function (endpointProxy) {
    logger.debug('Entering ServerEndpointBroker.removeEndpointRegistration');
    logger.debug('Registration to remove: ' + JSON.stringify(endpointProxy));
    for (var i = 0; this.endpointRegistration.length > i ; i++) {
      var reg = this.endpointRegistration[i];
      logger.debug('Registration to check: ' + JSON.stringify(reg.endpointDetails));
      if (reg.endpointDetails.hostname === endpointProxy.endpointDetails.hostname &&
            reg.endpointDetails.port.toString() === endpointProxy.endpointDetails.port.toString() &&
            reg.sender === endpointProxy.sender) {
        logger.debug('Remove endpoint reg: ' + JSON.stringify(reg.endpointDetails));
        this.endpointRegistration.splice(i, 1);
        break;
      }
    }
    logger.debug('Leaving ServerEndpointBroker.removeEndpointRegistration');
  },

  "removeAgentRegistrations": function (serverSender) {
    logger.debug('Entering ServerEndpointBroker.removeAgentRegistrations');
    for (var i = 0; this.endpointRegistration.length > i ; i++) {
      logger.debug('Registration number to  check: ' + i);
      var reg = this.endpointRegistration[i];
      logger.debug('Registration to check: ' + JSON.stringify(reg.endpointDetails));
      if (reg.sender === serverSender) {
        logger.debug('Remove endpoint reg: ' + JSON.stringify(reg.endpointDetails));
        this.endpointRegistration.splice(i, 1);
        i--;
      }
    }
    logger.debug('Leaving ServerEndpointBroker.removeEndpointRegistration');
  },

  //New callable flow registration
  "createCallableFlowRegistration": function (callableFlowRegistration) {
    logger.debug('Entering ServerEndpointBroker.createCallableFlowRegistration');
    if (this.callableFlowRegistrations[callableFlowRegistration.details.registrationName] === undefined) {
      //new registration
      logger.debug('Creating new registration for: ' + callableFlowRegistration.details.registrationName);
      this.callableFlowRegistrations[callableFlowRegistration.details.registrationName] =
      {
        registeredFlows: [callableFlowRegistration],
        nextToInvoke: 0
      };

    } else {
      //update existing registration
      logger.debug('Found existing registration for: ' + callableFlowRegistration.details.registrationName);

      //make sure the same agent does not register more than once with the same name
      var current = this.callableFlowRegistrations[callableFlowRegistration.details.registrationName];
      logger.debug('Registration to check: ' + util.inspect(current));
      var match = false;
      for (var i = 0; current.registeredFlows.length > i ; ++i) {
        if (current.registeredFlows[i].sendTo === callableFlowRegistration.sendTo) {
          logger.debug('Matched existing entry: ' + callableFlowRegistration.details.registrationName);
          match = true;
          break;
        } else {
          logger.debug('Not matched current entry: ' + callableFlowRegistration.details.registrationName);
        }
      }

      if (match === false) {
        logger.debug('Updating existing registration for: ' + callableFlowRegistration.details.registrationName);
        this.callableFlowRegistrations[callableFlowRegistration.details.registrationName].registeredFlows.push(callableFlowRegistration);
      }
    }
    logger.debug('Leaving ServerEndpointBroker.createCallableFlowRegistration');
  },

  //Remove existing callable flow registration - remove single entry by name for a given serverSender or serverReceiver
  "removeCallableFlowRegistration": function (callableFlowRegistration) {
    logger.debug('Entering ServerEndpointBroker.removeCallableFlowRegistration');
    logger.debug('Registration to remove: ' + util.inspect(callableFlowRegistration));
    var self = this;
    var current = self.callableFlowRegistrations[callableFlowRegistration.details.registrationName];
    if (current === undefined) {
      logger.debug('Could not remove registration not found' + callableFlowRegistration.details.registrationName);
    } else {
      removeRegistrationInternal(current, callableFlowRegistration.sendTo, callableFlowRegistration.details.registrationName, self, true);
    }
    logger.debug('Leaving ServerEndpointBroker.removeCallableFlowRegistration');
  },

  //Remove existing callable flow registration - remove all entries for a given serverSender or serverReceiver
  "removeCallableFlowRegistrations": function (serverToRemove) {
    logger.debug('Entering ServerEndpointBroker.removeCallableFlowRegistrations');
    var self = this;
    var entries = Object.keys(this.callableFlowRegistrations);
    //logger.debug('All registrations to check: ' + util.inspect(this.callableFlowRegistrations, { depth: 3 }));
    entries.forEach(function (entry) {
      var current = self.callableFlowRegistrations[entry];
      removeRegistrationInternal(current, serverToRemove, entry, self, true);
    });

    logger.debug('Leaving ServerEndpointBroker.removeCallableFlowRegistrations');
  },

  //Locate a callable flow registration
  "findCallableFlowRegistration": function (callableFlowName) {
    logger.debug('Entering ServerEndpointBroker.findCallableFlowRegistration: ' +callableFlowName );
    if (this.callableFlowRegistrations[callableFlowName] === undefined) {
      logger.debug('Could not find: ' + callableFlowName);
      return; //nothing to return
    } else {
      //get entry to return from existing registration.
      //TODO here would be a good place to do any more sophisticated workload balancing amongst identical registered flows.
      var next     = this.callableFlowRegistrations[callableFlowName].nextToInvoke;
      var response = this.callableFlowRegistrations[callableFlowName].registeredFlows[next];
      logger.debug('Found existing registration for: ' + callableFlowName + " : " + next);

      //simple loop over all registered flows in turn - each request gets the next one so all are eventually used...
      var count = this.callableFlowRegistrations[callableFlowName].registeredFlows.length;
      this.callableFlowRegistrations[callableFlowName].nextToInvoke = ((++next) % count);

      logger.debug('Leaving ServerEndpointBroker.findCallableFlowRegistration' + " : " + next + " : " + count);
      return response;
    }
  },

  //New callable invoker registration
  "createCallableInvokerRegistration": function (callableInvokerRegistration) {
    logger.debug('Entering ServerEndpointBroker.createCallableInvokerRegistration');
    if (this.callableInvokeRegistrations[callableInvokerRegistration.details.registrationName] === undefined) {
      //new registration
      logger.debug('Creating new invoker registration for: ' + callableInvokerRegistration.details.registrationName);
      this.callableInvokeRegistrations[callableInvokerRegistration.details.registrationName] =
      {
        registeredFlows: [callableInvokerRegistration]
      };

    } else {
      //update existing registration
      logger.debug('Found existing registration for: ' + callableInvokerRegistration.details.registrationName);

      //make sure the same agent does not register more than once with the same name
      var current = this.callableInvokeRegistrations[callableInvokerRegistration.details.registrationName];
      logger.debug('Registration to check: ' + util.inspect(current));
      var match = false;
      for (var i = 0; current.registeredFlows.length > i ; ++i) {
        if (current.registeredFlows[i].sendTo === callableInvokerRegistration.sendTo) {
          logger.debug('Matched existing entry: ' + callableInvokerRegistration.details.registrationName);
          match = true;
          break;
        } else {
          logger.debug('Not matched current entry: ' + callableInvokerRegistration.details.registrationName);
        }
      }

      if (match === false) {
        logger.debug('Updating existing registration for: ' + callableInvokerRegistration.details.registrationName);
        this.callableInvokeRegistrations[callableInvokerRegistration.details.registrationName].registeredFlows.push(callableInvokerRegistration);
      }
    }
    logger.debug('Leaving ServerEndpointBroker.createCallableInvokerRegistration');
  },

  //Remove existing callable invoker registration - remove single entry by name for a given serverSender or serverReceiver
  "removeCallableInvokerRegistration": function (callableInvokerRegistration) {
    logger.debug('Entering ServerEndpointBroker.removeCallableInvokerRegistration');
    var self = this;
    var current = self.callableInvokeRegistrations[callableInvokerRegistration.details.registrationName];
    if (current === undefined) {
      logger.debug('Could not remove registration not found' + callableInvokerRegistration.details.registrationName);
    } else {
      removeRegistrationInternal(current, callableInvokerRegistration.sendTo, callableInvokerRegistration.details.registrationName, self, false);
    }
    logger.debug('Leaving ServerEndpointBroker.removeCallableInvokerRegistration');
  },

  //Remove existing callable invoker registration - remove all entries for a given serverSender or serverReceiver
  "removeCallableInvokerRegistrations": function (serverToRemove) {
    logger.debug('Entering ServerEndpointBroker.removeCallableInvokerRegistrations');
    var self = this;
    var entries = Object.keys(this.callableInvokeRegistrations);
    //logger.debug('All registrations to check: ' + util.inspect(this.callableInvokeRegistrations, { depth: 3 }));
    entries.forEach(function (entry) {
      var current = self.callableInvokeRegistrations[entry];
      removeRegistrationInternal(current, serverToRemove, entry, self, false);
    });

    logger.debug('Leaving ServerEndpointBroker.removeCallableInvokerRegistrations');
  },

  "markActivity": function () {
    logger.debug('Entering ServerEndpointBroker.markActivity');
    this.timeSinceLastActivityMilliSec = (new Date()).getTime();
    logger.debug('Leaving ServerEndpointBroker.markActivity');
  },

  "markConnectionsMade": function () {
    logger.debug('Entering ServerEndpointBroker.connectionsMade');
    this.connectionsMade++;
    logger.debug('Leaving ServerEndpointBroker.connectionsMade');
  },

  "markConnectionsDropped": function () {
    logger.debug('Entering ServerEndpointBroker.connectionsDropped');
    this.connectionsDropped++;
    logger.debug('Leaving ServerEndpointBroker.connectionsDropped');
  },

  "markBytesOut": function (numOfBytes) {
    logger.debug('Entering ServerEndpointBroker.markBytesOut');
    this.bytesOut = this.bytesOut + numOfBytes;
    logger.debug('Leaving ServerEndpointBroker.markBytesOut');
  },

  "markBytesIn": function (numOfBytes) {
    logger.debug('Entering ServerEndpointBroker.markBytesIn');
    this.bytesIn = this.bytesIn + numOfBytes;
    logger.debug('Leaving ServerEndpointBroker.markBytesIn: ' + this.bytesIn);
  },

  "getTimeSinceLastActivitySec": function () {
    logger.debug('Entering ServerEndpointBroker.getTimeSinceLastActivitySec');
    var returnTime = (new Date()).getTime();
    returnTime = returnTime - this.timeSinceLastActivityMilliSec;
    returnTime = returnTime / 1000;
    logger.debug('Leaving ServerEndpointBroker.getTimeSinceLastActivitySec: ' + returnTime);
    return returnTime;
  },

  "getConnectionsMade": function () {
    return this.connectionsMade;
  },

  "getConnectionsDropped": function () {
    return this.connectionsDropped;
  },

  "getBytesOut": function () {
    return this.bytesOut;
  },

  "getBytesIn": function () {
    return this.bytesIn;
  },

  setTestConnectionWaitMilliSec: function (testConnectionWaitMilliSec) {
    this.testConnectionWaitMilliSec = testConnectionWaitMilliSec;
  },

  reportStatus: function () {
    var self = this;
    var callableFlowRegistrations = Object.keys(this.callableFlowRegistrations)
      .map(function (key) { return self.callableFlowRegistrations[key]; })
      .map(function (reg) {
        var registeredFlows = reg.registeredFlows
          .map(function (flow) {
            return {
              callableProperties: flow.details,
              messageFlowDetails: flow.sendTo.reportStatus ? flow.sendTo.reportStatus() : null
            };
          });
        return {
          registeredFlows: registeredFlows
        };
      });
    var callableInvokeRegistrations = Object.keys(this.callableInvokeRegistrations)
      .map(function (key) { return self.callableInvokeRegistrations[key]; })
      .map(function (reg) {
        var registeredFlows = reg.registeredFlows
          .map(function (flow) {
            return {
              callableProperties: flow.details,
              messageFlowDetails: flow.sendTo.reportStatus ? flow.sendTo.reportStatus() : null
            };
          });
        return {
          registeredFlows: registeredFlows
        };
      });
    return {
      endpointRegistration: this.endpointRegistration,
      callableFlowRegistrations: callableFlowRegistrations,
      callableInvokeRegistrations: callableInvokeRegistrations,
      timeSinceLastActivityMilliSec: this.timeSinceLastActivityMilliSec,
      connectionsMade: this.connectionsMade,
      connectionsDropped: this.connectionsDropped,
      bytesOut: this.bytesOut,
      bytesIn: this.bytesIn,
      testConnectionWaitMilliSec: this.testConnectionWaitMilliSec
    };
  }
};

function removeRegistrationInternal(current, serverToRemove, entry, self, flowMode)
{
  logger.debug('Entering ServerEndpointBroker.removeRegistrationInternal :' + flowMode);

  logger.debug('Registration to check: ' + util.inspect(current));
  for (var i = 0; current.registeredFlows.length > i ; ++i) {
    if (current.registeredFlows[i].sendTo === serverToRemove) {
      if (current.registeredFlows.length > 1) {
        //remove only the current entry from the array
        logger.debug('Removing current entry: ' + entry);
        current.registeredFlows.splice(i, 1);
        if (flowMode) {
          //only flows care about nextToInvoke
          if (current.nextToInvoke > 0) {
            current.nextToInvoke--; //reduce nextToInvoke by one to keep in sync
          }
        }

      } else {
        //remove the whole registration for the name itself as well
        //as we are removing the last entry
        logger.debug('Removing entire entry: ' + entry);
        if (flowMode) {
          //working on callable flows
          delete self.callableFlowRegistrations[entry];
        } else {
          //working on invokers
          delete self.callableInvokeRegistrations[entry];
        }
      }

    } else {
      logger.debug('Not removing current entry: ' + entry);
    }
  }

  logger.debug('Leaving ServerEndpointBroker.removeRegistrationInternal');
}

module.exports = ServerEndpointBroker;
