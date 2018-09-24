/**
 *
 * NAME: AgentC.js
 *
 * DECSRIPTION: AgentC
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
var logger = logging.logger("AgentC");
var TCPIPListenerManager = require('./TCPIPListenerManager.js');
var AgentSender = require('./AgentSender.js');

function AgentC(config, WebSocketClient) {
  this.configData = config;
  this.WebSocketClient = WebSocketClient;
  this.started = false;
}

AgentC.prototype = {
  "start": function (callback) {
    logger.debug('Entering AgentC.start');
    /* istanbul ignore else */
    if (this.started === false) {
      this.started = true;
      this.startInner(callback);
    }
    logger.debug('Leaving AgentC.start');
  },

  "startInner": function (callback) {
    logger.debug('Entering AgentC.startInner');
    try {
      if (this.started === true) {
        this.wsClient = new this.WebSocketClient(this.configData.config().switch.url, this.configData.config().switch.certs);
        this.name = 'AgentC';
        /* istanbul ignore else */
        if (this.configData.config().name !== undefined) {
          this.name = this.configData.config().name;
        }
        this.agentSender = new AgentSender(this.wsClient, this.name);
        var self = this;

        this.wsClient.on('error', function (error) {
          logger.debug('Entering AgentC.on.error: ' + error);
          /* istanbul ignore else */
          if (self.started === true) {
            logger.error('tunnel connection error: ' + error);
            self.agentSender.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
            /* istanbul ignore else */
            if (self.tcpipListenerManager !== undefined) {
              self.tcpipListenerManager.stop();
            }

            setTimeout(
              function () { self.startInner(); }, 5000
            );
          }
          logger.debug('Leaving AgentC.on.error');
        });

        this.wsClient.on('close', function () {
          logger.debug('Entering AgentC.on.close');
          /* istanbul ignore else */
          if (self.started === true) {
            logger.error('tunnel connection close: ');
            self.agentSender.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
            /* istanbul ignore else */
            if (self.tcpipListenerManager !== undefined) {
              self.tcpipListenerManager.stop();
            }

            setTimeout(
              function () { self.startInner(); }, 5000
            );
          }
          logger.debug('Leaving AgentC.on.close');
        });

        self.agentSender.openTunnel(function (tunnelDetails) {
          logger.debug('opentunnel result: ' + JSON.stringify(tunnelDetails));
          if (tunnelDetails.returnCode !== 0) {
            logger.error('failed to create a tunnel to server HQ: ' + JSON.stringify(tunnelDetails));
            self.startInner(callback);
            /* istanbul ignore else */
            if (callback !== undefined) {
              callback(tunnelDetails);
            }
            return;
          }

          //create the listeners for connections from the DFE
          self.tcpipListenerManager = new TCPIPListenerManager(self.agentSender, self.configData.config());
          self.tcpipListenerManager.start();

          /* istanbul ignore else */
          if (callback !== undefined) {
            callback();
          }

        });
      }
    }
    catch (e) {
      logger.error('Failed to startInner AgentC');
    }
    logger.debug('Leaving AgentC.startInner');
  },

  "stop": function () {
    logger.debug('Entering AgentC.stop');
    try {
      if (this.started === true) {
        this.started = false;
        /* istanbul ignore else */
        if (this.agentSender !== undefined) {
          this.agentSender.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
        }
        /* istanbul ignore else */
        if (this.tcpipListenerManager !== undefined) {
          this.tcpipListenerManager.stop();
        }
      }
      else {
        throw new Error("AgentC not started");
      }
    }
    catch (e) {
      logger.error('Failed to stop AgentC');
    }
    logger.debug('Leaving AgentC.stop');
  },

  "getWS": function () {
    return this.wsClient;
  }

};

module.exports = AgentC;
