/**
 *
 * NAME: TCPIPConnection.js
 *
 * DECSRIPTION: TCPIPConnection
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
var logger = logging.logger("TCPIPConnection");
/*
 *
 * TCPIP connection structure to tie local socket to remote endpoint socket
 * The listenerDescription has the form:
 *     var listenerDescription = {
 *       "localPort": 15001,
 *       "remoteHostname": "work.com",
 *       "remotePort": 1455,
 *   }
 */
function TCPIPConnection(agentSenderOrReceiver, listenerDescription, localSocket, senderMode) {
  logger.debug('Entering TCPIPConnection');
  var self = this;
  this.owningAgentSenderOrReceiver = agentSenderOrReceiver;
  logger.debug('listenerDescription: ' + JSON.stringify(listenerDescription));
  this.listenerDescription = listenerDescription;
  this.socket = localSocket;

  // send request to remote agent to open the real remote connection
  if (senderMode) {
    var endpointDetails = {
      "hostname": listenerDescription.remoteHostname,
      "port": listenerDescription.remotePort
    };

    //note: this call sets the "self.id" property on this TCPIPConnection object
    this.endpointProxy = agentSenderOrReceiver.openEndpoint(endpointDetails, this);
  }

  // register the local socket events so that the remote endpoint gets called when things happen to it
  // For example: if it gets sent data then it will send the data to the remote endpoint connection.
  localSocket.on("data", function (data) {
    logger.debug('Entering TCPIPConnection data: ' + data);
    self.owningAgentSenderOrReceiver.sendDataToEndpoint(self.id, data);
    logger.debug('Leaving TCPIPConnection data');
  });

  localSocket.on("end", function () {
    logger.debug('Entering TCPIPConnection close');
    self.owningAgentSenderOrReceiver.closeEndpoint(self.id);
    logger.debug('Leaving TCPIPConnection close');
  });

  localSocket.on("destroy", function () {
    logger.debug('Entering TCPIPConnection close');
    self.owningAgentSenderOrReceiver.closeEndpoint(self.id);
    logger.debug('Leaving TCPIPConnection close');
  });

  localSocket.on("error", function (error) {
    logger.debug('Entering TCPIPConnection error: ' + error);
    self.owningAgentSenderOrReceiver.errorEndpoint(self.id, error);
    logger.debug('Leaving TCPIPConnection error');
  });

  logger.debug('Leaving TCPIPConnection');
}

TCPIPConnection.prototype = {
  // list of functions that will be called when events arrive from the remote endpoint
  // For example: if the remote end point receives data then onReceive is called with the data
  // so that it can be sent to local socket connection
  "onError": function (result) {
    logger.debug('Entering TCPIPConnection.onError');
    this.socket.destroy();
    logger.debug('Leaving TCPIPConnection.onError');
  },

  "onRecieve": function (data) {
    logger.debug('Entering TCPIPConnection.onRecieve');
    this.socket.write(data);
    logger.debug('Leaving TCPIPConnection.onRecieve');
  },

  "onClose": function (reason) {
    logger.debug('Entering TCPIPConnection.onClose');
    this.socket.end();
    logger.debug('Leaving TCPIPConnection.onClose');
  }
};

module.exports = TCPIPConnection;
