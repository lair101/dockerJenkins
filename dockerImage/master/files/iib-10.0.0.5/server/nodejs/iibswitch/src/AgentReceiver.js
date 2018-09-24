/**
 *
 * NAME: AgentReceiver.js
 *
 * DECSRIPTION: AgentReceiver
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
var logger = logging.logger("AgentReceiver");
var op = require("./OperationCodes");
var WebSocketClient = require('ws');

function AgentReceiver(ws, newEndpointManager, name) {
  logger.debug('Entering AgentReceiver');
  this.name = name;
  this.agentWebsocketToHQ = ws;
  this.endpointManager = newEndpointManager;
  this.tunnelToHQId = -1;
  this.endpointForOperationId = -1;
  this.nextEndpointId = 1;
  this.endpointConnections = {};
  this.operation = op.OP_NO_OPERATION;
  var self = this;
  logger.debug('Leaving AgentReceiver');
}

AgentReceiver.prototype = {
  "operationProcessing": function (data) {
    if (this.operation === op.OP_NO_OPERATION) {
      if (data.length === 5) {
        this.operation = data[0];
        logger.debug('Operation: ' + this.operation);
        this.endpointForOperationId = 0;
        this.endpointForOperationId += data[1] * 256 * 256 * 256;
        this.endpointForOperationId += data[2] * 256 * 256;
        this.endpointForOperationId += data[3] * 256;
        this.endpointForOperationId += data[4];

        logger.debug('Endpoint id: ' + this.endpointForOperationId);
        switch (this.operation) {
          case op.OP_ENDPOINT_CLOSE:
            logger.debug('OP_ENDPOINT_CLOSE');
            this.operation = op.OP_NO_OPERATION;
            try {
              (this.endpointConnections[this.endpointForOperationId]).onClose(); //call TCPIPConnection.onClose
            }
            catch (e) {
              this.errorEndpoint(this.endpointForOperationId, {});
            }
            break;
          case op.OP_TUNNEL_OPEN_RESPONSE:
          case op.OP_ENDPOINT_SEND:
          case op.OP_ENDPOINT_ERROR:
          case op.OP_ENDPOINT_OPEN:
          case op.OP_ENDPOINT_REG:
          case op.OP_ENDPOINT_UNREG:
            break;
          // these codes are not valid for server receiver
          //case op.OP_TUNNEL_OPEN_REQUEST:
          default:
            // Not valid operation, just log and ignore
            logger.error('Invalid operation: ' + this.operation);
            this.operation = op.OP_NO_OPERATION;
            break;

        }
      }
      else {
        // Not valid operation, just log and ignore
        logger.error('operation is wrong length:' + data.length);
        this.operation = op.OP_NO_OPERATION;
      }
    }
    else {
      switch (this.operation) {
        case op.OP_TUNNEL_OPEN_RESPONSE:
          logger.debug('OP_TUNNEL_OPEN_RESPONSE');
          this.operation = op.OP_NO_OPERATION;
          var message1 = JSON.parse(data);
          logger.debug('response message: ' + JSON.stringify(message1));
          if (this.openTunnelToHQCallback) {
            this.openTunnelToHQCallback(message1);
          }
          break;
        case op.OP_ENDPOINT_OPEN:
          logger.debug('OP_ENDPOINT_OPEN');
          try {
            this.operation = op.OP_NO_OPERATION;
            var message2 = JSON.parse(data);
            logger.debug('message: ' + JSON.stringify(message2));
            var connection = this.endpointManager.openEndpoint(message2, this.endpointForOperationId);
            connection.id = this.endpointForOperationId;
            (this.endpointConnections[this.endpointForOperationId]) = connection;
          }
          catch (e) {
            this.errorEndpoint(this.endpointForOperationId, {});
          }
          break;
        case op.OP_ENDPOINT_SEND:
          try {
            logger.debug('OP_ENDPOINT_SEND');
            this.operation = op.OP_NO_OPERATION;
            logger.debug('message: ' + data);
            (this.endpointConnections[this.endpointForOperationId]).onRecieve(data); //call TCPIPConnection.onRecieve
          }
          catch (e) {
            this.errorEndpoint(this.endpointForOperationId, {});
          }
          break;
        case op.OP_ENDPOINT_ERROR:
          logger.debug('OP_ENDPOINT_ERROR');
          this.operation = op.OP_NO_OPERATION;
          var message3 = JSON.parse(data);
          logger.debug('error message: ' + JSON.stringify(message3));
          try {
            (this.endpointConnections[this.endpointForOperationId]).onError(message3); //call TCPIPConnection.onError
            delete this.endpointConnections[this.endpointForOperationId]; //remove dead entry
          }
          catch (e) {

          }
          break;
      }
    }
  },

  "openTunnel": function (callback) {
    logger.debug('Entering AgentReceiver.openTunnel');

    this.openTunnelToHQCallback = callback;
    var self = this;

    this.agentWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentReceiver.on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentReceiver.on.message');
    });

    // open the ws socket connection and send tunnel info
    this.agentWebsocketToHQ.on('open', function () {
      logger.debug('Entering AgentReceiver.on.open');
      logger.debug('Sending ' + op.OP_TUNNEL_OPEN_REQUEST);
      this.send(new Buffer([op.OP_TUNNEL_OPEN_REQUEST, 0, 0, 0, 0]));
      var request = {
        "name": self.name,
        "version": 1,
        "eye": op.IIB_EYE_CATCHER_J
      };

      logger.debug('Sending message: ' + JSON.stringify(request));
      this.send(new Buffer(JSON.stringify(request)));
      logger.debug('Leaving AgentReceiver.on.open');
    });

    logger.debug('Leaving AgentReceiver.openTunnel');
  },

  "destroyTunnel": function () {
    logger.debug('Entering AgentReceiver.destroyTunnel');
    this.tunnelToHQId = -1;
    this.agentWebsocketToHQ.terminate();
    for (var connectionId in this.endpointConnections) {
      this.endpointConnections[connectionId].onError("destroy"); //call TCPIPConnection.onError
      delete this.endpointConnections[connectionId]; //remove dead entry
    }
    logger.debug('Leaving AgentReceiver.destroyTunnel');
  },

  "createEndpointRegistration": function (endpointRegistration) {
    logger.debug('Entering AgentReceiver.createEndpointRegistration');
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_REG, 0, 0, 0, 0]));
    logger.debug('Sending reg: ' + JSON.stringify(endpointRegistration));
    this.agentWebsocketToHQ.send(new Buffer(JSON.stringify(endpointRegistration)));
    logger.debug('Leaving AgentReceiver.createEndpointRegistration');
  },

  "removeEndpointRegistration": function (endpointRegistration) {
    logger.debug('Entering AgentReceiver.removeEndpointRegistration');
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_UNREG, 0, 0, 0, 0]));
    logger.debug('Sending reg: ' + JSON.stringify(endpointRegistration));
    this.agentWebsocketToHQ.send(new Buffer(JSON.stringify(endpointRegistration)));
    logger.debug('Leaving AgentReceiver.removeEndpointRegistration');
  },

  "sendDataToEndpoint": function (id, data) {
    //logger.debug('Entering AgentReceiver.sendDataToEndpoint');
    //logger.debug('Sending OP_ENDPOINT_SEND. Id: ' + id);
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_SEND, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    //logger.debug('Sending message: ' + JSON.stringify(data));
    this.agentWebsocketToHQ.send(data, { binary: true, mask: false });
    //logger.debug('Leaving AgentReceiver.sendDataToEndpoint');
  },

  "errorEndpoint": function (id, data) {
    logger.debug('Entering AgentReceiver.errorEndpoint');
    logger.debug('Sending OP_ENDPOINT_ERROR. Id: ' + id);
    logger.debug('Sending Error: ' + data);
    try {
      this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_ERROR, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
      this.agentWebsocketToHQ.send(new Buffer(JSON.stringify(data)));
      delete this.endpointConnections[id]; //remove dead entry
    }
    catch (e) {
      logger.warn('AgentReceiver.errorEndpoint: ' + e);
    }
    logger.debug('Leaving AgentReceiver.errorEndpoint');
  },

  "closeEndpoint": function (id) {
    logger.debug('Entering AgentReceiver.closeEndpoint');
    logger.debug('Sending OP_ENDPOINT_CLOSE. Id: ' + id);
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_CLOSE, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    this.agentWebsocketToHQ.send(new Buffer([]));
    delete this.endpointConnections[id]; //remove dead entry
    logger.debug('Leaving AgentReceiver.closeEndpoint');
  },

  "setEndpointConnections": function (newEndpointConnections) {
    logger.debug('Entering AgentReceiver.setEndpointConnections');
    this.endpointConnections = newEndpointConnections;
    logger.debug('Leaving AgentReceiver.setEndpointConnections');
  },

  //for test only
  "getOperation": function () {
    logger.debug('Entering AgentReceiver.getOperation: ' + this.operation);
    logger.debug('Leaving AgentReceiver.getOperation');
    return this.operation;
  },

  //for test only
  "setTunnelOpen": function (open) {
    logger.debug('Entering AgentReceiver.setTunnelOpen:');
    this.tunnelOpen = open;
    var self = this;
    this.agentWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentReceiver.on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentReceiver.on.message');
    });
    logger.debug('Leaving AgentReceiver.setTunnelOpen');
  }
};

module.exports = AgentReceiver;
