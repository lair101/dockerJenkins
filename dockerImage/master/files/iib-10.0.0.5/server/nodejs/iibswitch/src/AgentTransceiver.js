/**
 *
 * NAME: AgentTransceiver.js
 *
 * DECSRIPTION: AgentTransceiver
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
var logger = logging.logger("AgentTransceiver");
var op = require("./OperationCodes");
var util = require("util");


function AgentTransceiver(ws, name) {
  logger.debug('Entering AgentTransceiver');
  this.name = name;
  this.agentXWebsocketToHQ = ws;
  this.tunnelToHQId = -1;
  this.currentOperationId = -1;
  this.sequenceId = 1;
  this.MAX_SEQUENCE_ID = 4294967295;

  //stores the map of in flight requests
  this.inFlightOutboundConnections = {}; //this is for requests we send to the switch
  this.inFlightInboundConnections = {}; //this is for requests sent to us by the switch

  //current operation
  this.operation = op.OP_NO_OPERATION;

  this.tunnelOpen = false;

  this.agentXWebsocketToHQ.on('error', function () {
    logger.debug('Entering AgentTransceiver.on.error');
    logger.debug('Leaving AgentTransceiver.on.error');
  });

  logger.debug('Leaving AgentTransceiver');
}

AgentTransceiver.prototype = {
  "operationProcessing": function (data) {
    logger.debug('Entering AgentTransceiver.operationProcessing');
    if (this.operation === op.OP_NO_OPERATION) {
      if (data.length === 5) {
        this.operation = data[0];
        logger.debug('Operation: ' + this.operation);
        this.currentOperationId = 0;
        this.currentOperationId += data[1] * 256 * 256 * 256;
        this.currentOperationId += data[2] * 256 * 256;
        this.currentOperationId += data[3] * 256;
        this.currentOperationId += data[4];
        logger.debug('Endpoint id: ' + this.currentOperationId);
        switch (this.operation) {
          case op.OP_TUNNEL_OPEN_RESPONSE:
          case op.OP_ENDPOINT_SEND:
          case op.OP_CF_SEND_REPLY:
          break;
          // these codes are not valid for server Transceiver
          // case op.OP_TUNNEL_OPEN_REQUEST:
          // case op.OP_ENDPOINT_REG:
          // case op.OP_ENDPOINT_UNREG:
          // case op.OP_ENDPOINT_OPEN:
          default:
            // Not valid operation, just log and ignore
            logger.error('Invalid operation: ' + this.operation);
            this.operation = op.OP_NO_OPERATION;
            break;
        }

      } else {
        //must be agentX
        var messageX = {};
        try {
          //get the agentx header info
          messageX = JSON.parse(data);
          logger.debug('AgentX operation: ' + messageX.opCode);
          logger.debug('AgentX requestId: ' + messageX.requestId);
          this.operation = messageX.opCode;
          this.currentOperationId = messageX.requestId;
          this.waitingForOperation = false;
          switch (this.operation) {
            case op.OP_CF_SEND_REQUEST:
              try {
                //This means we have received a request
                this.inFlightInboundConnections[this.currentOperationId] = messageX;
                //note if we are calling ourselves, this will already have the correct number
                /*if (messageX.selfCall === undefined) {
                  if (this.inFlightCallableFlowRequests[this.currentOperationId] !== undefined) {
                    //Internal error - shoiuld be empty
                    logger.debug('AgentX error receiving: ' + messageX.id);
                  }
                  this.inFlightCallableFlowRequests[this.currentOperationId] = messageX;
                } else {

                }*/

              }
              catch (e) {
                //logger.debug('Error: ' + e);
                //this.errorEndpoint(this.currentOperationId, {});
              }
              break;
            case op.OP_CF_SEND_ERROR:
            case op.OP_CF_SEND_REPLY:
              break;
            default:
              // All other codes are not valid for AgentX messages
              this.waitingForOperation = true;
              // Not valid operation, just log and ignore
              logger.error('Invalid operation: ' + this.operation);
              this.operation = op.OP_NO_OPERATION;
              break;
          }
        } catch (e) {
          // Not valid operation, just log and ignore
          this.operation = op.OP_NO_OPERATION;
          this.waitingForOperation = true;
          this.operation = op.OP_NO_OPERATION;

          var result1 = {
            "returnCode": 1,
            "tunnelId": -1,
            "errorMessage": "invalid agentx request",
            "errorNumber": 1011
          };
          logger.error('Error:' + JSON.stringify(result1));
        }
      }
    }
    else {
      switch (this.operation) {
        case op.OP_TUNNEL_OPEN_RESPONSE:
          logger.debug('OP_TUNNEL_OPEN_RESPONSE');
          this.operation = op.OP_NO_OPERATION;
          var message = JSON.parse(data);
          logger.debug('response message: ' + JSON.stringify(message));
          if (this.openTunnelToHQCallback) {
            this.openTunnelToHQCallback(message);
          }
          break;
        case op.OP_ENDPOINT_SEND:
          //TODO check we need this
          logger.debug('OP_ENDPOINT_SEND');
          this.operation = op.OP_NO_OPERATION;
          try {
            logger.debug('message: ' + data);
            (this.inFlightOutboundConnections[this.currentOperationId]).onRecieve(data); //call TCPIPConnection.onRecieve
          }
          catch (e) {
            //this.errorEndpoint(this.currentOperationId, {});
          }
          break;
        case op.OP_CF_SEND_REQUEST:
          //TODO check we need this
          logger.debug('OP_CF_SEND_REQUEST');
          this.operation = op.OP_NO_OPERATION;
          var self = this; //for the callback
          try {
            logger.debug('message: ' + data);
            if (this.remotelyCallableFlowManager === undefined) {
              logger.debug('ERROR: AgentTransceiver has no remotelyCallableFlowManager');
            } else {
              var currentMsg = this.inFlightInboundConnections[this.currentOperationId];
              if (currentMsg === undefined) {
                logger.debug('ERROR: AgentTransceiver has no current message');
              } else {
                var destination = this.remotelyCallableFlowManager.lookupFlow(currentMsg.flowName);
                if (destination === undefined) {
                logger.debug('ERROR: AgentTransceiver has no current destination');
                } else {
                  var requestCallback = destination.flowCallback;
                  if (requestCallback === undefined) {
                    logger.debug('ERROR: AgentTransceiver destination has no current requestCallback');
                  } else {
                    logger.debug('Calling into remote flow: ' + currentMsg.flowName);
                    /*
                    var replyCallback = function (replyId, replyData) {
                      logger.debug('AgentTransceiver reply for requestId ' + self.currentOperationId);
                      var requestId = self.currentOperationId;
                      var current = currentMsg;
                      var currentMsg2 = self.inFlightInboundConnections[self.currentOperationId];
                      logger.debug('AgentTransceiver reply callback called for: ' + currentMsg.flowName + " replyId '" + replyId + "' replyData '" + replyData + "' requestId '" + requestId + "'");
                    }

                    requestCallback(currentMsg, data, replyCallback);
                     */


                    //define a new function to capture the variables we need to allow the reply to be made.
                    (function () {
                      //save current state at time of call
                      var transceiver = self;
                      var currentRequestId = self.currentOperationId;
                      var currentMessage = currentMsg;

                      //call the "InputNode" callback, passing in a new callback for the input node to get back to us on to send a reply.
                      var requestMsg = JSON.parse(data);
                      requestCallback(currentMsg.cfName, requestMsg, function (replyData) {
                        ///logger.debug('****REPLY_DATA: ' + util.inspect(replyData, { depth: 3 }));
                        var replyId = replyData.messageUuid;
                        logger.debug('AgentTransceiver reply callback called for: ' + currentMessage.flowName + " replyId '" + replyId + "' replyData '" + replyData + "' requestId '" + currentRequestId + "'");

                        var flowProxy = transceiver.inFlightInboundConnections[currentRequestId];
                        flowProxy.replyId = replyId;

                        logger.debug('AgentTransceiver reply seq:' + flowProxy.sequenceId);
                        //this.inFlightInboundConnections[this.currentOperationId] = messageX;

                        //send the reply back
                        var buffer = new Buffer(JSON.stringify(replyData));
                        transceiver.sendReplyToRemoteFlow(flowProxy, buffer);

                        //remove the flow details now we have replied
                        delete transceiver.inFlightInboundConnections[currentRequestId]; //remove the dead entry

                      });
                    })();

                  }
                }
              }
            }
            //(this.inFlightOutoundConnections[this.currentOperationId]).onRecieve(data); //call TCPIPConnection.onRecieve
          }
          catch (e) {
            logger.debug('ERROR: AgentTransceiver: ' + e);
            //this.errorEndpoint(this.currentOperationId, {});
          }
          break;
        case op.OP_CF_SEND_REPLY:
          this.operation = op.OP_NO_OPERATION;
          logger.debug('MADE REPLY - calling callback: [' + data + "]");

          //call the invokers callback method.
          var flowProxy = this.inFlightOutboundConnections[this.currentOperationId];
          if (flowProxy !== undefined) {
            var responseMsg = JSON.parse(data);
            //logger.debug('****REPLY_DATA_DUMP: ' + util.inspect(flowProxy, { depth: 3 }));
            flowProxy.completionCallback(undefined, flowProxy, responseMsg);
          } else {
            logger.debug('ERROR: No flowProxy for: ' + this.currentOperationId + ": data:" + data);
          }

          //remove the call details
          delete this.inFlightOutboundConnections[this.currentOperationId]; //remove dead entry
          break;
        case op.OP_CF_SEND_ERROR:
          logger.debug('OP_CF_SEND_ERROR');
          this.operation = op.OP_NO_OPERATION;
          try {
            var message2 = JSON.parse(data);
            logger.debug('error message: ' + JSON.stringify(message2));

            //now store the completed object
            var caller = this.inFlightOutboundConnections[this.currentOperationId];

            //pass the error to the callback
            caller.completionCallback(message2, caller);

            //remove the call details
            delete this.inFlightOutboundConnections[this.currentOperationId]; //remove dead entry
          }
          catch (e) {
            logger.debug('AgentSender.operationProcessing error: ' + e);
          }
          break;
      }
    }
    logger.debug('Leaving AgentTransceiver.operationProcessing');
  },

  "openTunnel": function (callback) {
    logger.debug('Entering AgentTransceiver.openTunnel');
    this.tunnelToHQId = 1; //todo: get a tunnel id from HQ
    this.openTunnelToHQCallback = callback;
    var self = this;

    this.agentXWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentTransceiver.on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentTransceiver.on.message');
    });

    // open the ws socket connection and send tunnel info
    this.agentXWebsocketToHQ.on('open', function () {
      logger.debug('Entering AgentTransceiver.on.open');
      logger.debug('Sending ' + op.OP_TUNNEL_OPEN_REQUEST);
      this.send(new Buffer([op.OP_TUNNEL_OPEN_REQUEST, 0, 0, 0, 0]));

      var iibNode = "MY_NODE";
      var iibServer = "MY SERVER";
      try {
        iibNode   = global.ibm.integrationBus.containerInfo.brokerName;
        iibServer = global.ibm.integrationBus.containerInfo.executionGroupLabel;
      } catch (e) { logger.debug('Caught error trying to find broker info: '+e); }

      var request = {
        "name": self.name,
        "version": 1,
        "eye": op.IIB_EYE_CATCHER_X,
        "IIB_Node": iibNode,
        "IIB_Server": iibServer
      };

      logger.debug('Sending message: ' + JSON.stringify(request));
      this.send(new Buffer(JSON.stringify(request)));
      logger.debug('Leaving AgentTransceiver.on.open');
    });

    logger.debug('Leaving AgentTransceiver.openTunnel');
  },

  "destroyTunnel": function () {
    logger.debug('Entering AgentTransceiver.destroyTunnel');
    this.tunnelToHQId = -1;
    this.agentXWebsocketToHQ.terminate();
    for (var connectionId in this.inFlightOutboundConnections) {
      //this.inFlightOutboundConnections[connection].onError("destroy"); //call TCPIPConnection.onError
      delete this.inFlightOutboundConnections[connectionId]; //remove dead entry
    }
    logger.debug('Leaving AgentTransceiver.destroyTunnel');
  },

  "createCallableFlowRegistration": function (flowRegistration) {
    logger.debug('Entering AgentTransceiver.createCallableFlowRegistration');
    this.agentXWebsocketToHQ.send(new Buffer([op.OP_CF_REG_FLOW, 0, 0, 0, 0]));
    logger.debug('Sending reg: ' + JSON.stringify(flowRegistration));
    this.agentXWebsocketToHQ.send(new Buffer(JSON.stringify(flowRegistration)));
    logger.debug('Leaving AgentTransceiver.createCallableFlowRegistration');
  },

  "removeCallableFlowRegistration": function (flowDeregistration) {
    logger.debug('Entering AgentTransceiver.removeCallableFlowRegistration');
    this.agentXWebsocketToHQ.send(new Buffer([op.OP_CF_UNREG_FLOW, 0, 0, 0, 0]));
    logger.debug('Sending unreg: ' + JSON.stringify(flowDeregistration));
    this.agentXWebsocketToHQ.send(new Buffer(JSON.stringify(flowDeregistration)));
    logger.debug('Leaving AgentTransceiver.removeCallableFlowRegistration');
  },

  "createInvokerRegistration": function (flowRegistration) {
    logger.debug('Entering AgentTransceiver.createInvokerRegistration');
    this.agentXWebsocketToHQ.send(new Buffer([op.OP_CF_REG_INVOKER, 0, 0, 0, 0]));
    logger.debug('Sending reg: ' + JSON.stringify(flowRegistration));
    this.agentXWebsocketToHQ.send(new Buffer(JSON.stringify(flowRegistration)));
    logger.debug('Leaving AgentTransceiver.createInvokerRegistration');
  },

  "removeInvokerRegistration": function (flowDeregistration) {
    logger.debug('Entering AgentTransceiver.removeInvokerRegistration');
    this.agentXWebsocketToHQ.send(new Buffer([op.OP_CF_UNREG_INVOKER, 0, 0, 0, 0]));
    logger.debug('Sending unreg: ' + JSON.stringify(flowDeregistration));
    this.agentXWebsocketToHQ.send(new Buffer(JSON.stringify(flowDeregistration)));
    logger.debug('Leaving AgentTransceiver.removeInvokerRegistration');
  },

  //called very freqently - logging too expensive to leave on...
  "sendRequestToRemoteFlow": function (flowProxy, dataToSend, completionCallback) {
    //logger.debug('Entering AgentTransceiver.sendRequestToRemoteFlow');
    var seqId = this.sequenceId;
    flowProxy.sequenceId = seqId;
    flowProxy.opCode = op.OP_CF_SEND_REQUEST;
    this.sequenceId++;

    //for sanity, check to see if we are about to hit the max. If we are, reset
    //to the beginning and hope that all previous connections are finished with!
    if (this.sequenceId >= this.MAX_SEQUENCE_ID) {
      logger.debug('AgentTransceiver.openEndpoint: sequenceId reached MAX_SEQUENCE_ID, resetting');
      this.sequenceId = 1;
    }

    //create a version to send on the wire.
    var buffer = new Buffer(JSON.stringify(flowProxy));

    //add the callback to the original we store after we turned it into a blob
    flowProxy.completionCallback = completionCallback;

    //now store the completed object
    this.inFlightOutboundConnections[flowProxy.requestId] = flowProxy;

    //logger.debug('Sending request: ' + buffer);
    this.agentXWebsocketToHQ.send(buffer);
    //logger.debug('Sending message: ' + JSON.stringify(dataToSend));
    this.agentXWebsocketToHQ.send(dataToSend, { binary: true, mask: false });

    //logger.debug('Leaving AgentTransceiver.sendRequestToRemoteFlow');
  },

  //called very freqently - logging too expensive to leave on...
  "sendReplyToRemoteFlow": function (flowProxy, dataToSend, completionCallback) {
    //logger.debug('Entering AgentTransceiver.sendReplyToRemoteFlow');
    var seqId = this.sequenceId;
    flowProxy.sequenceId = seqId;
    flowProxy.opCode = op.OP_CF_SEND_REPLY;
    this.sequenceId++;

    //for sanity, check to see if we are about to hit the max. If we are, reset
    //to the beginning and hope that all previous connections are finished with!
    if (this.sequenceId >= this.MAX_SEQUENCE_ID) {
      logger.debug('AgentTransceiver.openEndpoint: sequenceId reached MAX_SEQUENCE_ID, resetting');
      this.sequenceId = 1;
    }

    //create a version to send on the wire.
    var buffer = new Buffer(JSON.stringify(flowProxy));

    //add the callback to the original we store after we turned it into a blob
    flowProxy.completionCallback = completionCallback;

    //now store the completed object
    //this.inFlightOutboundConnections[flowProxy.requestId] = flowProxy;

    logger.debug('Sending reply: ' + buffer);
    try {
      this.agentXWebsocketToHQ.send(buffer);
      //logger.debug('Sending message: ' + JSON.stringify(dataToSend));
      this.agentXWebsocketToHQ.send(dataToSend, { binary: true, mask: false });
    } catch (e) {
      logger.debug('Error sending reply: ' + e);
      throw e; //throw back to calling Input or Reply node
    }

    //logger.debug('Leaving AgentTransceiver.sendReplyToRemoteFlow');
  },

  "setRemotelyCallableFlowManager": function (mgr) {
    logger.debug('Entering AgentTransceiver.setRemotelyCallableFlowManager');
    logger.debug('Leaving AgentTransceiver.setRemotelyCallableFlowManager');
    this.remotelyCallableFlowManager = mgr;
  },

  //for debug
  "logState": function () {
    logger.debug('Entering AgentTransceiver.logState');
    logger.debug('***State Outbound: ' + util.inspect(this.inFlightOutboundConnections, { depth: 3 }));
    logger.debug('***State Inbound: ' + util.inspect(this.inFlightInboundConnections, { depth: 3 }));

    logger.debug('Leaving AgentTransceiver.logState');
  },

  //for test only
  "getOperation": function () {
    logger.debug('Entering AgentTransceiver.getOperation: ' + this.operation);
    logger.debug('Leaving AgentTransceiver.getOperation');
    return this.operation;
  },

  //for test only
  "setTunnelOpen": function (open) {
    logger.debug('Entering AgentTransceiver.setTunnelOpen:');
    this.tunnelOpen = open;
    var self = this;
    this.agentXWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentTransceiver.setTunnelOpen.on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentTransceiver.setTunnelOpen.on.message');
    });
    logger.debug('Leaving AgentTransceiver.setTunnelOpen');
  },

  reportStatus: function () {
    var self = this;
    var inFlightInboundConnections = Object.keys(this.inFlightInboundConnections)
      .map(function (key) { return self.inFlightInboundConnections[key]; });
    var inFlightOutboundConnections = Object.keys(this.inFlightOutboundConnections)
      .map(function (key) { return self.inFlightOutboundConnections[key]; });
    return {
      name: this.name,
      tunnelToHQId: this.tunnelToHQId,
      currentOperationId: this.currentOperationId,
      sequenceId: this.sequenceId,
      operation: this.operation,
      tunnelOpen: this.tunnelOpen,
      inFlightInboundConnections: inFlightInboundConnections,
      inFlightOutboundConnections: inFlightOutboundConnections
    };
  }

};

module.exports = AgentTransceiver;
