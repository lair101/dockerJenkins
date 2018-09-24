/**
 *
 * NAME: TCPIPListenerManager.js
 *
 * DECSRIPTION: TCPIPListenerManager
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
var logger = logging.logger("TCPIPListenerManager");
var TCPIPListener = require('./TCPIPListener.js');
/*
 * Module to manage the creating of a listener for each endpoint
 * that will need to be accessed.
 * listenerDescription has the form:
 *         var listenersDescription = {
 *           "listeners": [ {
 *               "localPort": 15001,
 *               "remoteHostname": "work1.com",
 *               "remotePort": 1455,
 *           },
 *           {
 *               "localPort": 15002,
 *               "remoteHostname": "work2.com",
 *               "remotePort": 1456,
 *           }
 *       ]
 *       A listener for each entry is created.
 */
function TCPIPListenerManager(agentProcessor, listenerDescriptions) {
  logger.debug('Entering TCPIPListenerManager');
  this.listenersArray = [];
  var self = this;
  if (listenerDescriptions.listeners !== undefined) {
    if (listenerDescriptions.listeners !== null) {
      listenerDescriptions.listeners.forEach(function (listener) {
        self.listenersArray.push(new TCPIPListener(agentProcessor, listener));
      });
    }
  }
  logger.debug('Leaving TCPIPListenerManager');
}

TCPIPListenerManager.prototype = {
  // Starts all the listeners, it is at this point they actually start listening
  "start": function () {
    logger.debug('Entering TCPIPListenerManager.start');
    this.listenersArray.forEach(function (listener) {
      listener.start();
    });
    logger.debug('Leaving TCPIPListenerManager.start');
  },

  // Stops listeners when agentc is stopped or errors
  "stop": function () {
    logger.debug('Entering TCPIPListenerManager.stop');
    this.listenersArray.forEach(function (listener) {
      listener.stop();
    });
  },

  // ##### Rest of functions only used for testing #####
  // Testing function that lets the starting get done using fake TCPIP stack
  "initializeServer": function (server) {
    logger.debug('Entering TCPIPListenerManager.initializeServer');
    this.listenersArray.forEach(function (listener) {
      listener.initializeServer(server);
    });
  },

  // Returns a list of listeners, used maninly for testing the manager is setup correctly
  "listeners": function () {
    logger.debug('Entering TCPIPListenerManager.listeners');
    logger.debug('Leaving TCPIPListenerManager.listeners');
    return this.listenersArray;
  },

  // Allows the listeners to be set up manually, used only during testing
  "setListeners": function (newListenersArray) {
    logger.debug('Entering TCPIPListenerManager.setListeners');
    this.listenersArray = newListenersArray;
    logger.debug('Leaving TCPIPListenerManager.setListeners');
  }

};

module.exports = TCPIPListenerManager;
