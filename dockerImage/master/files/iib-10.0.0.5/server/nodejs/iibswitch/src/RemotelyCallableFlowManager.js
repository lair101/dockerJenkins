/**
 *
 * NAME: RemotelyCallableFlowManager.js
 *
 * DECSRIPTION: RemotelyCallableFlowManager
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
var TCPIPConnection = require('./TCPIPConnection.js');
var net = require('net');
var logger = logging.logger("RemotelyCallableFlowManager");

function RemotelyCallableFlowManager(newAgentTransceiver) {
  logger.debug('Entering RemotelyCallableFlowManager');
  this.agentTransceiver = newAgentTransceiver;
  this.registeredFlows = {}; //this keeps a list of registered CallableInput Nodes
  this.registeredCallers = {}; //this keeps a list of registered CallableInvoke Nodes
  logger.debug('Leaving RemotelyCallableFlowManager');
}

RemotelyCallableFlowManager.prototype = {
  // Registers all the callable flows
  "start": function () {
    var self = this;
    logger.debug('Entering RemotelyCallableFlowManager.start');

    //store a reference to us on the transceiver
    self.agentTransceiver.setRemotelyCallableFlowManager(self);

    var flows = Object.keys(self.registeredFlows);
    flows.forEach(function (flow) {
      var current = self.registeredFlows[flow];
      current.registrationTime = new Date(); //reset the registration to the new current time
      self.agentTransceiver.createCallableFlowRegistration(current);
    });

    var callers = Object.keys(self.registeredCallers);
    callers.forEach(function (caller) {
      var current = self.registeredCallers[caller];
      current.registrationTime = new Date(); //reset the registration to the new current time
      self.agentTransceiver.createInvokerRegistration(current);
    });

    logger.debug('Leaving RemotelyCallableFlowManager.start');
  },

  "createFlowRegistration": function (flow) {
    logger.debug('Entering RemotelyCallableFlowManager.createFlowRegistration');
    var self = this;

    if (flow.application === undefined || flow.application.length === 0) {
      throw new Error("Invalid registration - missing or invalid application");
    }

    if (flow.endpoint === undefined || flow.endpoint.length === 0) {
      throw new Error("Invalid registration - missing or invalid target endpoint");
    }

    var registrationName = flow.application + ":" + flow.endpoint;
    if (self.registeredFlows[registrationName] === undefined) {
      logger.debug('Creating registration for: '+ registrationName);

      //fill in the registration extra details...
      flow.registrationName = registrationName;
      flow.registrationType = 'input';
      flow.registrationTime = new Date();

      //store the registration locally
      self.registeredFlows[registrationName] = flow;

      //register the registration with the switch remotely
      self.agentTransceiver.createCallableFlowRegistration(flow);
    } else {
      throw new Error("duplicate flow registration: " + registrationName);
    }

    logger.debug('Leaving RemotelyCallableFlowManager.createFlowRegistration');
  },

  "removeFlowRegistration": function (flow) {
    logger.debug('Entering RemotelyCallableFlowManager.removeFlowRegistration' + flow);

    if (flow.application === undefined || flow.application.length === 0) {
      throw new Error("Invalid unregistration - missing or invalid application");
    }

    if (flow.endpoint === undefined || flow.endpoint.length === 0) {
      throw new Error("Invalid unregistration - missing or invalid target endpoint");
    }

    var registrationName = flow.application + ":" + flow.endpoint;

    if (this.registeredFlows[registrationName] !== undefined) {
      delete this.registeredFlows[registrationName];
      //deregister the registration with the switch
      this.agentTransceiver.removeCallableFlowRegistration({
        registrationName: registrationName
      });
    }

    logger.debug('Leaving RemotelyCallableFlowManager.removeFlowRegistration');
  },

  "lookupFlow": function (flow) {
    logger.debug('Entering RemotelyCallableFlowManager.lookupFlow: ' + flow);
    /*
    if (flow.application === undefined || flow.application.length === 0) {
      throw new Error("Invalid registration - missing or invalid application");
    }

    if (flow.endpoint === undefined || flow.endpoint.length === 0) {
      throw new Error("Invalid registration - missing or invalid target endpoint");
    }

    var registrationName = flow.application + ":" + flow.endpoint;
    */
    if (this.registeredFlows[flow] !== undefined) {
      return this.registeredFlows[flow];
    }

    logger.debug('Leaving RemotelyCallableFlowManager.lookupFlow');
  },

  "createInvokeRegistration": function (invoker) {
    logger.debug('Entering RemotelyCallableFlowManager.createInvokeRegistration');
    var self = this;

    if (invoker.application === undefined || invoker.application.length === 0) {
      throw new Error("Invalid registration - missing or invalid application");
    }

    if (invoker.endpoint === undefined || invoker.endpoint.length === 0) {
      throw new Error("Invalid registration - missing or invalid target endpoint");
    }

    var registrationName = invoker.application + ":" + invoker.endpoint;
    if (self.registeredCallers[registrationName] === undefined) {
      logger.debug('Creating registration for: ' + registrationName);

      //fill in the registration extra details...
      invoker.registrationName = registrationName;
      invoker.registrationType = 'caller';
      invoker.registrationTime = new Date();

      //store the registration locally
      self.registeredCallers[registrationName] = invoker;

      //register the registration with the switch remotely
      self.agentTransceiver.createInvokerRegistration(invoker);
    } else {
      throw new Error("duplicate invoker registration: " + registrationName);
    }

    logger.debug('Leaving RemotelyCallableFlowManager.createInvokeRegistration');
  },

  "removeInvokeRegistration": function (invoker) {
    logger.debug('Entering RemotelyCallableFlowManager.removeInvokeRegistration' + invoker);

    if (invoker.application === undefined || invoker.application.length === 0) {
      throw new Error("Invalid unregistration - missing or invalid application");
    }

    if (invoker.endpoint === undefined || invoker.endpoint.length === 0) {
      throw new Error("Invalid unregistration - missing or invalid target endpoint");
    }

    var registrationName = invoker.application + ":" + invoker.endpoint;

    if (this.registeredCallers[registrationName] !== undefined) {
      delete this.registeredCallers[registrationName];
      //deregister the registration with the switch
      this.agentTransceiver.removeInvokerRegistration({
        registrationName: registrationName
      });
    }

    logger.debug('Leaving RemotelyCallableFlowManager.removeInvokeRegistration');
  },

  "lookupInvoke": function (invoker) {
    logger.debug('Entering RemotelyCallableFlowManager.lookupInvoke: ' + invoker);
    /*
    if (invoker.application === undefined || invoker.application.length === 0) {
      throw new Error("Invalid registration - missing or invalid application");
    }

    if (invoker.endpoint === undefined || invoker.endpoint.length === 0) {
      throw new Error("Invalid registration - missing or invalid target endpoint");
    }

    var registrationName = invoker.application + ":" + invoker.endpoint;
    */
    if (this.registeredCallers[invoker] !== undefined) {
      return this.registeredCallers[invoker];
    }

    logger.debug('Leaving RemotelyCallableFlowManager.lookupInvoke');
  },

  "stop": function () {
    logger.debug('Entering RemotelyCallableFlowManager.stop');

    logger.debug('Leaving RemotelyCallableFlowManager.stop');
  },

  "restart": function (newAgentTransceiver) {
    logger.debug('Entering RemotelyCallableFlowManager.restart');
    this.agentTransceiver = newAgentTransceiver;
    this.start(); //restart us with the new stansceiver
    logger.debug('Leaving RemotelyCallableFlowManager.restart');
  },

  /*
   IN:    invoke(name, id, input_data, callback1)
   REPLY: callback1(id, reply_data)
   */

  "invokeCallableFlow": function (flow, trackingId, dataToSend, completionCallback, oneWayRequest, timeOutSeconds, requestId ) {
    var self = this;
    logger.debug('Entering RemotelyCallableFlowManager.invokeCallableFlow' + " " + flow + " " + requestId) ;

    if (flow.application === undefined || flow.application.length === 0) {
      throw new Error("Invalid registration - missing or invalid application");
    }

    if (flow.endpoint === undefined || flow.endpoint.length === 0) {
      throw new Error("Invalid registration - missing or invalid target endpoint");
    }

    var registrationName = flow.application + ":" + flow.endpoint;

    //note do not put the callback into the proxy
    var flowProxy = {
      "flowName" : registrationName,
      "trackingId": trackingId,
      "oneWayRequest": oneWayRequest,
      "timeOutSeconds" : timeOutSeconds,
      "requestId": requestId,
      "cfName" : flow
    };

    //send to switch
    var buffer = new Buffer(JSON.stringify(dataToSend));
    self.agentTransceiver.sendRequestToRemoteFlow(flowProxy, buffer, completionCallback);

    logger.debug('Leaving RemotelyCallableFlowManager.invokeCallableFlow');
  },

  //for debug
  "logState": function () {
    logger.debug('Entering RemotelyCallableFlowManager.logState');
    this.agentTransceiver.logState();
    logger.debug('Leaving RemotelyCallableFlowManager.logState');
  },

  reportStatus: function () {
    return {
      registeredFlows: this.registeredFlows,
      registeredCallers: this.registeredCallers
    };
  },

  getRegisteredFlows: function () {
    var self = this;
    return Object.keys(self.registeredFlows).map(function (key) { return self.registeredFlows[key]; });
  },

  getRegisteredInvokers: function () {
    var self = this;
    return Object.keys(self.registeredCallers).map(function (key) { return self.registeredCallers[key]; });
  }

};

module.exports = RemotelyCallableFlowManager;
