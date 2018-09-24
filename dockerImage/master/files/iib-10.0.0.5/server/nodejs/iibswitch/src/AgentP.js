/**
 *
 * NAME: AgentP.js
 *
 * DECSRIPTION: AgentP
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
var logger = logging.logger("AgentP");
var EndpointManager = require('./EndpointManager.js');
var AgentReceiver = require('./AgentReceiver.js');

function AgentP(config, WebSocketClient) {
  config.registerForChange(this.refresh);
  this.configData = config;
  this.WebSocketClient = WebSocketClient;
  this.started = false;
}

AgentP.prototype = {
  "start": function (callback) {
    logger.debug('Entering AgentP.start');
    /* istanbul ignore else */
    if (this.started === false) {
      this.started = true;
      this.startInner(callback);
    }
    logger.debug('Leaving AgentP.start');
  },

  "startInner": function (callback) {
    logger.debug('Entering AgentP.startInner');
    try {
      /* istanbul ignore else */
      if (this.started === true) {
        this.client = new this.WebSocketClient(this.configData.config().switch.url, this.configData.config().switch.certs);
        this.endpointManager = new EndpointManager(this.configData.config());
        this.name = 'AgentP';
        /* istanbul ignore else */
        if (this.configData.config().name !== undefined) {
          this.name = this.configData.config().name;
        }

        this.agentReceiver = new AgentReceiver(this.client, this.endpointManager, this.name);
        var self = this;

        this.client.on('error', function (error) {
          logger.debug('Entering AgentP.on.error: ' + error);
          /* istanbul ignore else */
          if (self.started === true) {
            logger.error('tunnel connection error: ' + error);
            self.agentReceiver.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
            setTimeout(
              function () { self.startInner(); }, 5000
            );
          }
          logger.debug('Leaving AgentReceiver.on.error');
        });

        this.client.on('close', function () {
          logger.debug('Entering AgentReceiver.on.close');
          /* istanbul ignore else */
          if (self.started === true) {
            logger.error('tunnel connection close: ');
            self.agentReceiver.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
            setTimeout(
              function () { self.startInner(); }, 5000
            );
          }
          logger.debug('Leaving AgentReceiver.on.close');
        });

        this.agentReceiver.openTunnel(function (tunnelDetails) {
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

          self.endpointManager.start(self.agentReceiver);
          /* istanbul ignore else */
          if (callback !== undefined) {
            callback();
          }

        });
      }
    }
    catch (e) {
      logger.error('Failed to startInner AgentP');
    }
    logger.debug('Leaving AgentP.startInner');
  },

  "refresh": function () {
    logger.debug('Entering AgentP.refresh');
    /* istanbul ignore else */
    if (this.endpointManager !== undefined) {
      logging.setupLogger(this.configData.loggingConfig());
      this.endpointManager.refresh(this.configData.config());
    }
    logger.debug('Leaving AgentP.refresh');
  },

  "stop": function () {
    logger.debug('Entering AgentP.stop');
    try {
      if (this.started !== false) {
        this.started = false;
        // probably should try to close nicely but just destroy for now
        /* istanbul ignore else */
        if (this.agentReceiver !== undefined) {
          this.agentReceiver.destroyTunnel();
        }
      }
      else {
        throw new Error("AgentP not started");
      }
    }
    catch (e) {
      logger.error('Failed to stop AgentP');
    }
    logger.debug('Leaving AgentP.stop');
  },

  "getWS": function () {
    return this.client;
  }
};

module.exports = AgentP;
