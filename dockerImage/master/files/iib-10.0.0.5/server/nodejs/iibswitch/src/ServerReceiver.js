﻿/**
 *
 * NAME: ServerReceiver.js
 *
 * DECSRIPTION: ServerReceiver
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
var logger = logging.logger("ServerReceiver");
var op = require("./OperationCodes");

/*
 * Function that is used to send and receive data from websocket tunnel to
 *  Agent that is running the listeners.
 */
function ServerReceiver(ws, newTunnelToAgentId, newServerEndpointBroker, newServerConnectionManager, heartBeatTime) {
  logger.debug('Entering ServerReciever');
  this.serverEndpointBroker = newServerEndpointBroker;
  this.serverConnectionManager = newServerConnectionManager;
  // Socket used for the tunnel to agent
  this.hqWebsocketToAgent = ws;
  if (heartBeatTime === undefined) {
    heartBeatTime = 30000;
  }
  this.heartBeat = setInterval(function () {
    ws.ping("slap", {}, true);
  }, heartBeatTime);

  // The next id to use for the endpoint id
  this.nextEndpointId = 1;
  // Details for the tunnel state
  this.tunnelToAgentId = newTunnelToAgentId;
  this.tunnelOpen = false;
  this.agentXMode = false;
  this.type = 'ServerReceiver'; //allow correct type to be seen in a debugger

  this.endpointConnections = {};
  this.inFlightCallableFlowRequests = {};
  // Most operations received come in two websocket messages:
  // 1, the operation code plus an endpoint id
  // 2, the data assocciated with the command
  this.waitingForOperation = true;
  this.operation = op.OP_NO_OPERATION;
  // Version included for when this gets changed in the future
  this.version = 1;
  this.name = "AgentC:" + this.tunnelToAgentId;
  var self = this;

  // register for 'on' messages so that we can process an operation received on the websocket
  this.hqWebsocketToAgent.on('message', function (data) {
    logger.debug('Entering ServerReceiver.on.message');
    self.operationProcessing(data);
    logger.debug('Leaving ServerReceiver.on.message');
  });

  this.hqWebsocketToAgent.on('close', function () {
    logger.debug('Entering ServerReceiver.on.close');
    self.destroyTunnel();
    logger.debug('Leaving ServerReceiver.on.close');
  });

  this.hqWebsocketToAgent.on('error', function (error) {
    logger.debug('Entering ServerReceiver.on.error');
    self.destroyTunnel();
    logger.debug('Leaving ServerReceiver.on.error');
  });

  this.hqWebsocketToAgent.on('pong', function () {
    logger.debug('Entering ServerReceiver.on.pong');
    if (self.agentXMode === true) {
      logger.debug('Successfully pinged AgentX: ' + self.name);
    } else {
      logger.debug('Successfully pinged AgentC: ' + self.name);
    }
    logger.debug('Leaving ServerReceiver.on.pong');
  });

  this.hqWebsocketToAgent.on('ping', function () {
    logger.debug('Entering ServerReceiver.on.ping');
    logger.debug('Leaving ServerReceiver.on.ping');
  });

  // Try to grab the remote address and remote port.
  // This is relying on a non-external interface to the WebSocket that is the
  // standard answer by the developers of 'ws' on GitHub issue tracker.
  try {
    this.remoteAddress = this.hqWebsocketToAgent._socket.remoteAddress;
    this.remotePort = this.hqWebsocketToAgent._socket.remotePort;
  } catch (e) {
    logger.error('Could not retrieve client socket details from WebSocket');
    this.remoteAddress = '<unknown remote address>';
    this.remotePort = -1;
  }

  logger.debug('Leaving ServerReceiver');
}


ServerReceiver.prototype = {
  "openTunnel": function () {
    logger.debug('Entering ServerReceiver.openTunnel');
    var self = this;
    // register for on message so that we can process any operations received on the websocket

    logger.debug('Leaving ServerReceiver.openTunnel');
  },

  "destroyTunnel": function () {
    logger.debug('Entering ServerReceiver.destroyTunnel');
    clearInterval(this.heartbeat);

    if (this.agentXMode === true) {
      this.inFlightCallableFlowRequests = {};
      this.serverEndpointBroker.removeCallableFlowRegistrations(this);
      this.serverEndpointBroker.removeCallableInvokerRegistrations(this);
    } else {
      for (var id in this.endpointConnections) {
        var connection = this.endpointConnections[id];
        if (connection) {
          logger.debug('Closing listener endpoint: ' + connection.endpointAgent.id);
          try {
            connection.endpointAgent.sender.closeEndpoint(connection.endpointAgent.id);
          }
          catch (e) {
          }
        }
      }
      this.endpointConnections = {};
    }

    if (this.serverConnectionManager !== undefined) {
      this.serverConnectionManager.removeServerReceiver(this);
    }

    this.hqWebsocketToAgent.terminate();
    logger.debug('Leaving ServerReceiver.destroyTunnel');
  },

  "sendDataToEndpoint": function (id, data) {
    //logger.debug('Entering ServerReceiver.sendDataToEndpoint');
    //logger.debug('Sending : ' + op.OP_ENDPOINT_SEND + '. Id: ' + id);
    this.hqWebsocketToAgent.send(new Buffer([op.OP_ENDPOINT_SEND, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    //logger.debug('Sending message: ' + JSON.stringify(data));
    this.hqWebsocketToAgent.send(data, { binary: true, mask: false });
    //logger.debug('Leaving ServerReceiver.sendDataToEndpoint');
  },

  "sendDataToRemoteFlow": function (messageDetails, data, mark, callerOperationId, callingServerReceiver) {
    if (mark && this.serverEndpointBroker !== undefined) {
      this.serverEndpointBroker.markBytesOut(data.length);
    }

    //create the buffer to send. Do this before we store the reply info to avoid a circular reference.
    var headers = new Buffer(JSON.stringify(messageDetails));

    //now store the replyTo info
    messageDetails.replyTo = callingServerReceiver;

    //set up the reply details if it has not already been added
    if (this.inFlightCallableFlowRequests[callerOperationId] === undefined) {
      //in this case we are calling into a "remote" (different) ServerReceiver to the one the
      //request arrived at. So we need to save our caller as the replyTo messageDetails
     // messageDetails.replyTo = callingServerReceiver;
      this.inFlightCallableFlowRequests[callerOperationId] = messageDetails;
    }

    //logger.debug('Entering ServerReceiver.sendDataToRemoteFlow');
    this.hqWebsocketToAgent.send(headers);
    //logger.debug('Sending message: ' + JSON.stringify(data));
    this.hqWebsocketToAgent.send(data, { binary: true, mask: false });
    //logger.debug('Leaving ServerReceiver.sendDataToRemoteFlow');
  },

  "closeEndpoint": function (id) {
    logger.debug('Entering ServerReceiver.closeEndpoint');
    logger.debug('Sending: ' + op.OP_ENDPOINT_CLOSE + '. Id: ' + id);
    this.hqWebsocketToAgent.send(new Buffer([op.OP_ENDPOINT_CLOSE, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    logger.debug('Leaving ServerReceiver.closeEndpoint');

    //remove the entry
    delete this.endpointConnections[id];
  },

  "errorEndpoint": function (id, data) {
    logger.debug('Entering ServerReceiver.errorEndpoint');
    try {
      var opcode;
      if (this.agentXMode === true) {
        opcode = op.OP_CF_SEND_ERROR;
        var header = {
          "opCode" : opcode,
          "requestId": id
        };
        logger.debug('Sending: ' + opcode + '. Id: ' + id);
        this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(header)));
      } else {
        opcode = op.OP_ENDPOINT_ERROR;
        logger.debug('Sending: ' + opcode + '. Id: ' + id);
        this.hqWebsocketToAgent.send(new Buffer([opcode, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
      }

      logger.debug('Sending error: ' + JSON.stringify(data));
      this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(data)));

      //remove the entry
      if (this.agentXMode === true) {
        delete this.inFlightCallableFlowRequests[id];
      } else {
        delete this.endpointConnections[id];
      }

    }
    catch (e) {
      logger.debug('ServerReceiver.errorEndpoint: ' + e);
    }
    logger.debug('Leaving ServerReceiver.errorEndpoint');
  },

  "operationProcessing": function (data) {
    logger.debug('Entering ServerReceiver.operationProcessing: ' + data.length);
    if (this.serverEndpointBroker !== undefined) {
      this.serverEndpointBroker.markActivity();
    }

    // first message will always be the operation to do.
    // we ignore any operation which is not valid
    if (this.waitingForOperation) {
      if (data.length === 5) {
        this.operation = data[0];
        logger.debug('Operation: ' + this.operation);
        this.endpointForOperationId = 0;
        this.endpointForOperationId += data[1] * 256 * 256 * 256;
        this.endpointForOperationId += data[2] * 256 * 256;
        this.endpointForOperationId += data[3] * 256;
        this.endpointForOperationId += data[4];
        logger.debug('Endpoint id: ' + this.endpointForOperationId);
        this.waitingForOperation = false;
        // Test for allowed operations for SenderReceiver
        // this changes based on state of the tunnel
        switch (this.operation) {
          case op.OP_TUNNEL_OPEN_REQUEST:
            if (this.tunnelOpen === true) {
              this.waitingForOperation = true;
              // Not valid operation, just log and ignore
              logger.error('Tunnel already open: ' + this.operation);
              this.operation = op.OP_NO_OPERATION;
              break;
            }
            break;
          case op.OP_ENDPOINT_OPEN:
          case op.OP_ENDPOINT_SEND:
          case op.OP_ENDPOINT_CLOSE:
          case op.OP_ENDPOINT_ERROR:
          case op.OP_CF_REG_FLOW:
          case op.OP_CF_REG_INVOKER:
          case op.OP_CF_UNREG_FLOW:
          case op.OP_CF_UNREG_INVOKER:
            // fail any other command until we have a tunnel open
            if (this.tunnelOpen === false) {
              this.waitingForOperation = true;
              // Not valid operation, just log and ignore
              logger.error('Tunnel not open: ' + this.operation);
              this.operation = op.OP_NO_OPERATION;
              break;
            }
            break;
          // these codes are not valid for server receiver
          // case op.OP_TUNNEL_OPEN_RESPONSE:
          // case op.OP_ENDPOINT_REG:
          // case op.OP_ENDPOINT_UNREG:
          default:
            this.waitingForOperation = true;
            // Not valid operation, just log and ignore
            logger.error('Invalid operation: ' + this.operation);
            this.operation = op.OP_NO_OPERATION;
            break;
        }
      } else if (this.agentXMode === true) {
        var messageX = {};
        try {
          //get the agentx header info
          messageX = JSON.parse(data);
          logger.debug('AgentX operation: ' + messageX.opCode);
          logger.debug('AgentX requestId: ' + messageX.requestId);
          this.operation = messageX.opCode;
          //store the requestId for the second msg
          this.endpointForOperationId = messageX.requestId;
          this.waitingForOperation = false;
          switch (this.operation) {
            case op.OP_CF_SEND_REQUEST:
              try {
                this.inFlightCallableFlowRequests[this.endpointForOperationId] = messageX;
              }
              catch (e) {
                logger.debug('Request Error: ' + e);
                this.errorEndpoint(this.endpointForOperationId, {});
              }

              break;
            case op.OP_CF_SEND_REPLY:
              try {
                logger.debug('AgentX replyId: ' + messageX.replyId);
                //update the previously stored request with the response details.
                //all the info is the same, except there are extra reply fields and the sequenceId has been updated
                //Note: could store as a child of the original request if it's necessary...
                messageX.replyTo = this.inFlightCallableFlowRequests[this.endpointForOperationId].replyTo;
                this.inFlightCallableFlowRequests[this.endpointForOperationId] = messageX;
              }
              catch (e) {
                console.log(e);
                logger.debug('Reply Error: ' + e);
                this.errorEndpoint(this.endpointForOperationId, {});
              }

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
          var result1 = {
            "returnCode": 1,
            "tunnelId": -1,
            "errorMessage": "invalid agentx session request",
            "errorNumber": 1010
          };
        }
      } else {
        this.waitingForOperation = true;
        // Not valid operation, just log and ignore
        logger.error('operation is wrong length:' + data.length);
      }
    }
    else {
      // had a valid operation now process it using the data just received
      this.waitingForOperation = true;
      switch (this.operation) {
        case op.OP_TUNNEL_OPEN_REQUEST:
          this.operation = op.OP_NO_OPERATION;
          logger.debug('data: ' + data);
          var message1 = {};
          try {
            message1 = JSON.parse(data);
          }
          catch (e) {
            var result11 = {
              "returnCode": 1,
              "tunnelId": -1,
              "errorMessage": "invalid session request",
              "errorNumber": 1002
            };

            this.hqWebsocketToAgent.send(new Buffer([op.OP_TUNNEL_OPEN_RESPONSE, 0, 0, 0, 0]));
            this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(result11)));
            this.operation = op.OP_NO_OPERATION;
            return;
          }
          // check the version to see if this tunnel is allowed
          if (message1.version === this.version && message1.eye === op.IIB_EYE_CATCHER_K) {
            var result2 = {
              "eye": op.IIB_EYE_CATCHER_K,
              "returnCode": 0,
              "tunnelId": this.tunnelToAgentId
            };

            this.tunnelOpen = true;
            logger.debug('result2: ' + JSON.stringify(result2));
            if (message1.name !== undefined) {
              this.name = message1.name;
              logger.debug('agent is called: ' + this.name);
            }
            this.hqWebsocketToAgent.send(new Buffer([op.OP_TUNNEL_OPEN_RESPONSE, 0, 0, 0, 0]));
            this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(result2)));
          } else if (message1.version === this.version && message1.eye === op.IIB_EYE_CATCHER_X) {
            var result3 = {
              "eye": op.IIB_EYE_CATCHER_X,
              "returnCode": 0,
              "tunnelId": this.tunnelToAgentId
            };

            this.tunnelOpen = true;
            this.agentXMode = true;
            logger.debug('result3: ' + JSON.stringify(result3));
            this.hqWebsocketToAgent.send(new Buffer([op.OP_TUNNEL_OPEN_RESPONSE, 0, 0, 0, 0]));
            this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(result3)));
            if (message1.name !== undefined) {
              this.name = message1.name;
              logger.debug('agent is called: ' + this.name);
            }
            if (message1.IIB_Node !== undefined) {
              this.agentIIBNode = message1.IIB_Node;
              logger.debug('agentIIBNode is called: ' + this.agentIIBNode);
            }
            if (message1.IIB_Server !== undefined) {
              this.agentIIBServer = message1.IIB_Server;
              logger.debug('agentIIBServer is called: ' + this.agentIIBServer);
            }
          }
          else {
            var result4;
            if (message1.eye !== op.IIB_EYE_CATCHER_K && message1.eye !== op.IIB_EYE_CATCHER_X) {
              result4 = {
                "returnCode": 1,
                "tunnelId": -1,
                "errorMessage": "HQ wrong eye catcher",
                "errorNumber": 1003
              };
            } else {
              result4 = {
                "returnCode": 1,
                "tunnelId": -1,
                "errorMessage": "HQ wrong version",
                "errorNumber": 1001
              };
            }

            this.tunnelOpen = false;
            this.hqWebsocketToAgent.send(new Buffer([op.OP_TUNNEL_OPEN_RESPONSE, 0, 0, 0, 0]));
            this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(result4)));
          }
          break;
        case op.OP_ENDPOINT_OPEN:
          this.operation = op.OP_NO_OPERATION;
          var endpointDefinition = JSON.parse(data);
          var connection1 = {
            "listenerAgent": {
              "id": this.endpointForOperationId,
              "sender": this
            }
          };

          logger.debug('serverEndpointBroker: ' + this.serverEndpointBroker);
          try {
            this.serverEndpointBroker.openEndpoint(endpointDefinition, connection1);

            //we are done, store it safe
            this.endpointConnections[this.endpointForOperationId] = connection1;

          } catch (e) {
            // failed to create an endpoint so return an error
            var result5 = {
              "returnCode": 1,
              "errorMessage": e,
              "errorNumber": 1007
            };

            logger.debug('Sending: ' + op.OP_ENDPOINT_ERROR + '. Id: ' + this.endpointForOperationId);
            var id = this.endpointForOperationId;
            this.hqWebsocketToAgent.send(new Buffer([op.OP_ENDPOINT_ERROR, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
            logger.debug('Sending error: ' + JSON.stringify(result5));
            this.hqWebsocketToAgent.send(new Buffer(JSON.stringify(result5)));
          }

          break;
        case op.OP_ENDPOINT_SEND:
          this.operation = op.OP_NO_OPERATION;
          try {
            var connection2 = this.endpointConnections[this.endpointForOperationId];
            connection2.endpointAgent.sender.sendDataToEndpoint(connection2.endpointAgent.id, data);
          }
          catch (e) {
            logger.debug('Error: ' + e);
            this.errorEndpoint(this.endpointForOperationId, {});
          }
          break;
        case op.OP_ENDPOINT_CLOSE:
          this.operation = op.OP_NO_OPERATION;
          var connection3 = this.endpointConnections[this.endpointForOperationId];
          if (connection3) {
            try {
              connection3.endpointAgent.sender.closeEndpoint(connection3.endpointAgent.id);
              delete this.endpointConnections[this.endpointForOperationId];
            }
            catch (e) {
              logger.debug('Error: ' + e);
              this.errorEndpoint(this.endpointForOperationId, {});
            }
          }
          break;
        case op.OP_ENDPOINT_ERROR:
          this.operation = op.OP_NO_OPERATION;
          var connection4 = this.endpointConnections[this.endpointForOperationId];
          if (connection4 !== undefined) {
            try {
              var message2 = JSON.parse(data);
              connection4.endpointAgent.sender.errorEndpoint(connection4.endpointAgent.id, message2);
              delete this.endpointConnections[this.endpointForOperationId];
            }
            catch (e) { }
          }
          break;
        case op.OP_CF_REG_FLOW:
          this.operation = op.OP_NO_OPERATION;
          var regDetails1 = JSON.parse(data);
          //add details of who to route this call to
          var entry1 = {
            "details": regDetails1,
            "sendTo": this
          };
          this.serverEndpointBroker.createCallableFlowRegistration(entry1);
          break;
        case op.OP_CF_UNREG_FLOW:
          this.operation = op.OP_NO_OPERATION;
          var regDetails2 = JSON.parse(data);
          //add our details so the remove code can make sure it removes the correct entry for us.
          var entry2 = {
            "details": regDetails2,
            "sendTo": this
          };
          this.serverEndpointBroker.removeCallableFlowRegistration(entry2);
          break;
        case op.OP_CF_REG_INVOKER:
          this.operation = op.OP_NO_OPERATION;
          var regDetails3 = JSON.parse(data);
          //add details of who to route this call to
          var entry3 = {
            "details": regDetails3,
            "sendTo": this
          };
          this.serverEndpointBroker.createCallableInvokerRegistration(entry3);
          break;
        case op.OP_CF_UNREG_INVOKER:
          this.operation = op.OP_NO_OPERATION;
          var regDetails4 = JSON.parse(data);
          //add our details so the remove code can make sure it removes the correct entry for us.
          var entry4 = {
            "details": regDetails4,
            "sendTo": this
          };
          this.serverEndpointBroker.removeCallableInvokerRegistration(entry4);
          break;
        case op.OP_CF_SEND_REQUEST:
          this.operation = op.OP_NO_OPERATION;
          try {
            var messageDetails = this.inFlightCallableFlowRequests[this.endpointForOperationId];
            if (messageDetails === undefined) {
              //reply with ERROR - internal error!
              logger.debug('Flow Registration not found.' + this.endpointForOperationId);
              this.errorEndpoint(this.endpointForOperationId, { "Error": 'in flight request not found' });
              break;
            }

            //get the flow to call
            var flowToCall = this.serverEndpointBroker.findCallableFlowRegistration(messageDetails.flowName);
            if (flowToCall === undefined) {
              logger.debug('Flow Registration not found.' + messageDetails.flowName);
              var errorResult1 = {
                "returnCode": 1,
                "errorMessage": "Flow Registration not found.",
                "flowName": messageDetails.flowName,
                "errorNumber": 1015
              };
              this.errorEndpoint(this.endpointForOperationId, errorResult1);
            } else {
              if (this.serverEndpointBroker !== undefined) {
                this.serverEndpointBroker.markBytesIn(data.length);
              }

              //if mark is true then this is a real loopback case - the agent is calling itself
              var mark = (flowToCall.sendTo === this);
              messageDetails.selfCall = mark; //useful for diagnostics

              //make the call - pass ourselves in as the caller so it can set up the correct replyTo details
              flowToCall.sendTo.sendDataToRemoteFlow(messageDetails, data, mark, this.endpointForOperationId, this);

              logger.debug('Request sent to flow: ' + messageDetails.flowName);
            }
          }
          catch (e) {
            logger.debug('Server Receiver CF Request Error: ' + e);
            this.errorEndpoint(this.endpointForOperationId, e.toString());
          }

          break;
        case op.OP_CF_SEND_REPLY:
          this.operation = op.OP_NO_OPERATION;
          try {
            var replyMessageDetails = this.inFlightCallableFlowRequests[this.endpointForOperationId];
            if (replyMessageDetails === undefined) {
              //reply with ERROR - internal error!
              logger.debug('Flow Registration not found.' + this.endpointForOperationId);
              this.errorEndpoint(this.endpointForOperationId, { "Error": 'in flight response not found'});
              break;
            }

            //make the call to send the reply
            var replyTo = replyMessageDetails.replyTo;
            delete replyMessageDetails.replyTo; //avoid circular reference TODO improve this
            replyTo.sendDataToRemoteFlow(replyMessageDetails, data, false, this.endpointForOperationId, this);
            logger.debug('Reply send to flow: ' + replyMessageDetails.flowName);

            //If the call is not a "selfCall" then the entry will be in two lists - the sender and the receiver (ourselves).
            delete this.inFlightCallableFlowRequests[this.endpointForOperationId]; //remove dead entry from ourselves
            if (replyMessageDetails.selfCall === false) {
              delete replyTo.inFlightCallableFlowRequests[this.endpointForOperationId]; //remove dead entry from our peer
            }
          }
          catch (e) {
            logger.debug('Server Receiver CF Reply Error: ' + e);
            this.errorEndpoint(this.endpointForOperationId, e.toString());
          }

          break;
        default: {
          logger.debug('ERROR: No operation found for ID: ' + this.endpointForOperationId + ", op: " + this.operation);
        }
      }
      this.operation = op.OP_NO_OPERATION;
    }
  },

  "getName": function () {
    logger.debug('Entering ServerReciever.getName:');
    logger.debug('Leaving ServerReciever.getName');
    return this.name;
  },

  //for test only
  "getOperation": function () {
    logger.debug('Entering ServerReciever.getOperation:');
    logger.debug('Leaving ServerReciever.getOperation');
    return this.operation;
  },

  //for test only
  "setTunnelOpen": function (open) {
    logger.debug('Entering ServerReciever.setTunnelOpen:');
    this.tunnelOpen = open;
    logger.debug('Leaving ServerReciever.setTunnelOpen');
  },

  //for test only
  "addEndpoint": function (connectionProxy) {
    logger.debug('Entering ServerReceiver.addEndpoint');
    this.endpointConnections[connectionProxy.listenerAgent.id] = connectionProxy;
    logger.debug('Leaving ServerReceiver.addEndpoint');
  },

  //for test only
  "retrieveEndpoints": function () {
    logger.debug('Entering ServerReciever.retrieveEndpoints');
    logger.debug('Leaving ServerReciever.retrieveEndpoints');
    return this.endpointConnections;
  },

  reportStatus: function () {
    var self = this;
    var inFlightCallableFlowRequests = Object.keys(this.inFlightCallableFlowRequests)
      .map(function (key) { return self.inFlightCallableFlowRequests[key]; })
      .map(function (temp) {
        return {
          flowName: temp.flowName,
          trackingId: temp.trackingId,
          oneWayRequest: temp.oneWayRequest,
          timeOutSeconds: temp.timeOutSeconds,
          requestId: temp.requestId
        };
      });
    return {
      nextEndpointId: this.nextEndpointId,
      tunnelToAgentId: this.tunnelToAgentId,
      tunnelOpen: this.tunnelOpen,
      agentXMode: this.agentXMode,
      type: this.type,
      endpointConnections: this.endpointConnections,
      inFlightCallableFlowRequests: inFlightCallableFlowRequests,
      waitingForOperation: this.waitingForOperation,
      operation: this.operation,
      version: this.version,
      name: this.name,
      agentIIBNode: this.agentIIBNode,
      agentIIBServer: this.agentIIBServer,
      remoteAddress: this.remoteAddress,
      remotePort: this.remotePort
    };
  }
};

module.exports = ServerReceiver;