/**
 *
 * NAME: TCPIPListener.js
 *
 * DECSRIPTION: TCPIPListener
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
var logger = logging.logger("TCPIPListener");

var TCPIPConnection = require('./TCPIPConnection.js');
var net = require('net');
/*
 * TCPIP listener to listen on the local port for socket connections
 * It then binds the socket to the actual endpoint using a TCPIPConection
 *
 */
function TCPIPListener(agentProcessor, listenerDetails) {
  logger.debug('Entering TCPIPListener');
  var self = this;
  this.owningAgentProcessor = agentProcessor;
  logger.debug('listenerDescription: ' + JSON.stringify(listenerDetails));
  this.listenerDetails = listenerDetails;
  this.server = net.createServer();
  logger.debug('Leaving TCPIPListener');
}

TCPIPListener.prototype = {
  // function to start the listener listening on the required local port
  "start": function () {
    logger.debug('Entering TCPIPListener.start');
    this.initializeServer(this.server);
    logger.debug('Leaving TCPIPListener.start');
  },

  "stop": function () {
    logger.debug('Entering TCPIPListener.stop');
    try {
      this.server.close();
    }
    catch (e) { logger.warn('TCPIPListener.stop: ' + e); }
    logger.debug('Leaving TCPIPListener.stop');
  },

  // fuction to expose the start to allow the use of a server object to allow mocking for tetsing
  "initializeServer": function (server) {
    logger.debug('Entering TCPIPListener.initializeServer: ' + this.listenerDetails);
    var self = this;
    this.server = server;

    server.on('connection', function (socket) {
      logger.debug('Entering TCPIPListener server.connection');
      new TCPIPConnection(self.owningAgentProcessor, self.listenerDetails, socket, true);
      logger.debug('Leaving TCPIPListener server.connection');
    });

    server.on('error', function (err) {
      logger.debug('Entering TCPIPListener server.error');
      logger.debug('Leaving TCPIPListener server.error');
    });

    logger.debug('localPort: ' + this.listenerDetails.localPort);
    server.listen(this.listenerDetails.localPort, function () {
      logger.debug('Entering TCPIPListener server.listen: ' + server.address().port);
      logger.debug('Leaving TCPIPListener server.listen');
    });
  },
  // Test function to get listenerDetails list
  "details": function () {
    logger.debug('Entering TCPIPListener.details');
    logger.debug('Leaving TCPIPListener.details');
    return this.listenerDetails;
  }

};

module.exports = TCPIPListener;
