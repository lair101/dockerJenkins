/**
 *
 * NAME: AgentSender.js
 *
 * DECSRIPTION: AgentSender
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
var logger = logging.logger("AgentSender");
var op = require("./OperationCodes");


function AgentSender(ws, name) {
  logger.debug('Entering AgentSender');
  this.name = name;
  this.agentWebsocketToHQ = ws;
  this.tunnelToHQId = -1;
  this.endpointForOperationId = -1;
  this.nextEndpointId = 1;
  this.MAX_OPERATION_ID = 4294967295;

  //stores the map of in flight endpoints
  this.endpointConnections = {};

  //current operation
  this.operation = op.OP_NO_OPERATION;

  this.tunnelOpen = false;

  this.agentWebsocketToHQ.on('error', function () {
    logger.debug('Entering AgentSender.on.error');
    logger.debug('Leaving AgentSender.on.error');
  });

  logger.debug('Leaving AgentSender');
}

AgentSender.prototype = {
  "operationProcessing": function (data) {
    logger.debug('Entering AgentSender.operationProcessing');
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
            break;
          // these codes are not valid for server sender
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
        case op.OP_ENDPOINT_SEND:
          logger.debug('OP_ENDPOINT_SEND');
          this.operation = op.OP_NO_OPERATION;
          try {
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
          try {
            var message2 = JSON.parse(data);
            logger.debug('error message: ' + JSON.stringify(message2));
            (this.endpointConnections[this.endpointForOperationId]).onError(message2); //call TCPIPConnection.onError
            delete this.endpointConnections[this.endpointForOperationId]; //remove dead entry
          }
          catch (e) {
            logger.debug('AgentSender.operationProcessing error: ' + e);
          }
          break;
      }
    }
    logger.debug('Leaving AgentSender.operationProcessing');
  },

  "openTunnel": function (callback) {
    logger.debug('Entering AgentSender.openTunnel');
    this.tunnelToHQId = 1; //todo: get a tunnel id from HQ
    this.openTunnelToHQCallback = callback;
    var self = this;

    this.agentWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentSender.on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentSender.on.message');
    });

    // open the ws socket connection and send tunnel info
    this.agentWebsocketToHQ.on('open', function () {
      logger.debug('Entering AgentSender.on.open');
      logger.debug('Sending ' + op.OP_TUNNEL_OPEN_REQUEST);
      this.send(new Buffer([op.OP_TUNNEL_OPEN_REQUEST, 0, 0, 0, 0]));
      var request = {
        "name": self.name,
        "version": 1,
        "eye": op.IIB_EYE_CATCHER_K
      };

      logger.debug('Sending message: ' + JSON.stringify(request));
      this.send(new Buffer(JSON.stringify(request)));
      logger.debug('Leaving AgentSender.on.open');
    });

    logger.debug('Leaving AgentSender.openTunnel');
  },

  "destroyTunnel": function () {
    logger.debug('Entering AgentSender.destroyTunnel');
    this.tunnelToHQId = -1;
    this.agentWebsocketToHQ.terminate();
    for (var connection in this.endpointConnections) {
      this.endpointConnections[connection].onError("destroy"); //call TCPIPConnection.onError
      delete this.endpointConnections[connection.id]; //remove dead entry
    }
    logger.debug('Leaving AgentSender.destroyTunnel');
  },

  "openEndpoint": function (endpointDefinition, endpointProxy) {
    logger.debug('Entering AgentSender.openEndpoint');
    endpointProxy.id = this.nextEndpointId;
    this.nextEndpointId++;

    //for sanity, check to see if we are about to hit the max. If we are, reset
    //to the beginning and hope that all previous connections are finished with!
    if (this.nextEndpointId >= this.MAX_OPERATION_ID) {
      logger.debug('AgentSender.openEndpoint: nextEndpointId reached MAX_OPERATION_ID, resetting');
      this.nextEndpointId = 1;
    }
    this.endpointConnections[endpointProxy.id] = endpointProxy;
    var id = endpointProxy.id;
    logger.debug('Sending: ' + op.OP_ENDPOINT_OPEN + '. Id: ' + endpointProxy.id);
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_OPEN , id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    logger.debug('Sending message: ' + JSON.stringify(endpointDefinition));
    this.agentWebsocketToHQ.send(new Buffer(JSON.stringify(endpointDefinition)));
    logger.debug('Leaving AgentSender.openEndpoint');
  },

  //called very freqently - logging too expensive to leave on...
  "sendDataToEndpoint": function (id, data) {
    //logger.debug('Entering AgentSender.sendDataToEndpoint');
    //logger.debug('Sending OP_ENDPOINT_SEND. Id: ' + id);
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_SEND, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    //logger.debug('Sending message: ' + JSON.stringify(data));
    this.agentWebsocketToHQ.send(data, { binary: true, mask: false });
    //logger.debug('Leaving AgentSender.sendDataToEndpoint');
  },

  "closeEndpoint": function (id) {
    logger.debug('Entering AgentSender.closeEndpoint');
    logger.debug('Sending OP_ENDPOINT_CLOSE. Id: ' + id);
    this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_CLOSE, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
    this.agentWebsocketToHQ.send(new Buffer([]));
    delete this.endpointConnections[id]; //remove dead entry
    logger.debug('Leaving AgentSender.closeEndpoint');
  },

  "errorEndpoint": function (id, data) {
    logger.debug('Entering AgentSender.errorEndpoint');
    logger.debug('Sending OP_ENDPOINT_ERROR. Id: ' + id);
    try {
      this.agentWebsocketToHQ.send(new Buffer([op.OP_ENDPOINT_ERROR, id / (256 * 256 * 256), id / (256 * 256), id / (256), id]));
      this.agentWebsocketToHQ.send(new Buffer(JSON.stringify(data)));
      delete this.endpointConnections[id]; //remove dead entry
    }
    catch (e) {
      logger.warn('AgentSender.errorEndpoint: ' + e);
    }
    logger.debug('Leaving AgentSender.errorEndpoint');
  },

  //for test only
  "getOperation": function () {
    logger.debug('Entering AgentSender.getOperation: ' + this.operation);
    logger.debug('Leaving AgentSender.getOperation');
    return this.operation;
  },

  //for test only
  "setTunnelOpen": function (open) {
    logger.debug('Entering AgentSender.setTunnelOpen:');
    this.tunnelOpen = open;
    var self = this;
    this.agentWebsocketToHQ.on('message', function (data) {
      logger.debug('Entering AgentSender.setTunnelOpen..on.message');
      self.operationProcessing(data);
      logger.debug('Leaving AgentSender.setTunnelOpen.on.message');
    });
    logger.debug('Leaving AgentSender.setTunnelOpen');
  }

};

module.exports = AgentSender;
