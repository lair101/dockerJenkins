/**
 *
 * NAME: AgentX.js
 *
 * DECSRIPTION: AgentX
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
var logger = logging.logger("AgentX");
var RemotelyCallableFlowManager = require('./RemotelyCallableFlowManager.js');
var AgentTransceiver = require('./AgentTransceiver.js');
var IIBProxy = require('./IIBProxy.js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var RateLimiter = require('./RateLimiter.js');

function AgentX(config, WebSocketClient) {
  EventEmitter.call(this);
  this.configData = config;
  this.WebSocketClient = WebSocketClient;
  this.started = false;
  this.url = null;
  this.rl = new RateLimiter();
  // Ensure that we don't throw when we emit an error event by installing our own
  // default handler - at least one handler, no throws.
  this.on('error', function (error) { });
}

util.inherits(AgentX, EventEmitter);

AgentX.prototype.start = function (callback) {
  logger.debug('Entering AgentX.start');
  /* istanbul ignore else */
  if (this.started === false) {
    this.started = true;
    this.startInner(callback);
  }
  logger.debug('Leaving AgentX.start');
};

AgentX.prototype.startInner = function (callback) {
  logger.debug('Entering AgentX.startInner');
  try {
    if (this.started === true) {
      this.url = this.configData.config().switch.url;
      this.wsClient = new this.WebSocketClient(this.url, this.configData.config().switch.certs);
      this.name = 'AgentX';
      /* istanbul ignore else */
      if (this.configData.config().name !== undefined) {
        this.name = this.configData.config().name;
      }
      if (this.injectedAgentTransceiver) {
        this.agentTransceiver = this.injectedAgentTransceiver;
      } else {
        this.agentTransceiver = new AgentTransceiver(this.wsClient, this.name);
      }
      var self = this;

      this.wsClient.on('error', function (error) {
        logger.debug('Entering AgentX.on.error: ' + error);
        /* istanbul ignore else */
        if (self.started === true) {
          logger.error('tunnel connection error: ' + error);
          self.agentTransceiver.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
          /* istanbul ignore else */
          if (self.remotelyCallableFlowManager !== undefined) {
            self.remotelyCallableFlowManager.stop();
          }

          // Write an error message to syslog.
          self.emit('error', error);
          self.rl.limit(function () {
            IIBProxy.writeSystemLogError('AgentX', 'on(\'error\')', 'BIP6453', 'AgentX unexpectedly disconnected from switch, will attempt to reconnect', self.url, error);
          });

          setTimeout(
            function () { self.startInner(); }, 5000
          );
        }
        logger.debug('Leaving AgentX.on.error');
      });

      this.wsClient.on('close', function () {
        logger.debug('Entering AgentX.on.close');
        /* istanbul ignore else */
        if (self.started === true) {
          logger.error('tunnel connection close: ');
          self.agentTransceiver.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
          /* istanbul ignore else */
          if (self.remotelyCallableFlowManager !== undefined) {
            self.remotelyCallableFlowManager.stop();
          }

          // Write an error message to syslog.
          self.emit('error', null);
          self.rl.limit(function () {
            IIBProxy.writeSystemLogError('AgentX', 'on(\'close\')', 'BIP6454', 'AgentX unexpectedly disconnected from switch, will attempt to reconnect', self.url);
          });

          setTimeout(
            function () { self.startInner(); }, 5000
          );
        }
        logger.debug('Leaving AgentX.on.close');
      });

      self.agentTransceiver.openTunnel(function (tunnelDetails) {
        logger.debug('AgentX opentunnel result: ' + JSON.stringify(tunnelDetails));
        if (tunnelDetails.returnCode !== 0) {
          logger.error('AgentX failed to create a tunnel to server HQ: ' + JSON.stringify(tunnelDetails));

          // Write an error message to syslog.
          self.emit('error', JSON.stringify(tunnelDetails));
          self.rl.limit(function () {
            IIBProxy.writeSystemLogError('AgentX', 'openTunnel callback', 'BIP6452', 'AgentX failed to connect to switch, will attempt to reconnect', self.url, JSON.stringify(tunnelDetails));
          });

          //self.startInner(callback);
          setTimeout(
            function () { self.startInner(callback); }, 5000
          );

          /* istanbul ignore else */
          if (callback !== undefined) {
            callback(tunnelDetails);
          }
          return;
        }

        if (self.remotelyCallableFlowManager === undefined) {
          self.remotelyCallableFlowManager = new RemotelyCallableFlowManager(self.agentTransceiver);
          self.remotelyCallableFlowManager.start();

          //register the global object that allows the outside world to communicate with us.
          if (global.ibm === undefined) {
            global.ibm = {};
          }
          if (global.ibm.integrationBus === undefined) {
            global.ibm.integrationBus = {};
          }
          if (global.ibm.integrationBus.callableFlow === undefined) {
            global.ibm.integrationBus.callableFlow = {};
          }

          //store the global reference to our mgr
          global.ibm.integrationBus.callableFlow.remotelyCallableFlowManager = self.remotelyCallableFlowManager;

        } else {
          //restart passing in the new transceiver we created above.
          self.remotelyCallableFlowManager.restart(self.agentTransceiver);
        }

        // Write an informational message to syslog.
        self.emit('start');
        IIBProxy.writeSystemLogInformation('AgentX', 'startInner', 'BIP6450', 'AgentX successfully connected to switch', self.url);

        // Reset the rate limiter.
        self.rl.reset();

        /* istanbul ignore else */
        if (callback !== undefined) {
          callback();
        }

      });
    }
  }
  catch (e) {
    logger.error('Failed to startInner AgentX');
  }
  logger.debug('Leaving AgentX.startInner');
};

AgentX.prototype.stop = function () {
  logger.debug('Entering AgentX.stop');
  try {
    if (this.started === true) {
      this.started = false;
      /* istanbul ignore else */
      if (this.agentTransceiver !== undefined) {
        this.agentTransceiver.destroyTunnel(); // make sure any thing to do with the tunnel is destroyed
      }
      /* istanbul ignore else */
      if (this.remotelyCallableFlowManager !== undefined) {
        this.remotelyCallableFlowManager.stop();
      }

      // Write an informational message to syslog.
      this.emit('stop');
      IIBProxy.writeSystemLogInformation('AgentX', 'stop', 'BIP6451', 'AgentX successfully disconnected from switch', this.url);

      // Reset the rate limiter.
      this.rl.reset();
    }
    else {
      throw new Error("AgentX not started");
    }
  }
  catch (e) {
    logger.error('Failed to stop AgentX', e);
  }
  logger.debug('Leaving AgentX.stop');
};

AgentX.prototype.getWS = function () {
  return this.wsClient;
};

AgentX.prototype.reportStatus = function () {
  return {
    url: this.configData.config().switch.url,
    started: this.started,
    name: this.name,
    agentTransceiver: this.agentTransceiver ? this.agentTransceiver.reportStatus() : null,
    remotelyCallableFlowManager: this.remotelyCallableFlowManager ? this.remotelyCallableFlowManager.reportStatus() : null
  };
};

module.exports = AgentX;
