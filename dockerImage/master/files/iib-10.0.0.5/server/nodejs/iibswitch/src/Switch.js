/**
 *
 * NAME: Switch.js
 *
 * DECSRIPTION: Switch Server
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

'use strict';

var logging = require('./Logging');
var logger = logging.logger('Switch');
var ServerConnectionManager = require('./ServerConnectionManager.js');
var ServerManagementInterface = require('./ServerManagementInterface.js');
var ServerEndpointBroker = require('./ServerEndpointBroker.js');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Switch(config) {
  EventEmitter.call(this);
  this.configData = config;
  this.started = false;
  this.serverEndpointBroker = new ServerEndpointBroker();
  this.serverConnectionManager = new ServerConnectionManager(this.configData.config(), this.serverEndpointBroker);
  this.hasServerManagementInterface = (this.configData.config().admin !== undefined);
  if (this.hasServerManagementInterface) {
    this.serverManagementInterface = new ServerManagementInterface(this.configData.config(), this.serverConnectionManager);
  }
  // Ensure that we don't throw when we emit an error event by installing our own
  // default handler - at least one handler, no throws.
  this.on('error', function (error) { });
  // Register for events from the connection manager and management interface.
  // We forward these on.
  var self = this;
  this.serverConnectionManager.on('start', function () { self.emit('start:scm'); });
  this.serverConnectionManager.on('start:bsport', function () { self.emit('start:bsport'); });
  this.serverConnectionManager.on('start:fsport', function () { self.emit('start:fsport'); });
  this.serverConnectionManager.on('stop', function () { self.emit('stop:scm'); });
  this.serverConnectionManager.on('stop:bsport', function () { self.emit('stop:bsport'); });
  this.serverConnectionManager.on('stop:fsport', function () { self.emit('stop:fsport'); });
  this.serverConnectionManager.on('error', function (error) { self.emit('error', error); });
  if (this.hasServerManagementInterface) {
    this.serverManagementInterface.on('start', function () { self.emit('start:smi'); });
    this.serverManagementInterface.on('stop', function () { self.emit('stop:smi'); });
    this.serverManagementInterface.on('error', function (error) { self.emit('error', error); });
  }
}

util.inherits(Switch, EventEmitter);

Switch.prototype.start = function () {
  logger.debug('Entering Switch.start');
  var self = this;
  if (self.started) {
    logger.debug('Switch is already started');
    logger.debug('Leaving Switch.start');
    return Promise.resolve();
  }
  var promise;
  try {
    promise =
      self.serverConnectionManager.start()
        .then(function () {
          if (self.hasServerManagementInterface) {
            return self.serverManagementInterface.start();
          }
        })
        .catch(function (error) {
          logger.error('Failed to start switch', error);
          self.emit('error', error);
        })
        .then(function () {
          self.emit('start');
          self.started = true;
        });
  } catch (error) {
    logger.error('Failed to start switch', error);
    self.emit('error', error);
    promise = Promise.resolve();
  }
  logger.debug('Leaving Switch.start', promise);
  return promise;
};

Switch.prototype.stop = function () {
  logger.debug('Entering Switch.stop');
  var self = this;
  if (!self.started) {
    logger.debug('Switch is already stopped');
    logger.debug('Leaving Switch.stop');
    return Promise.resolve();
  }
  self.started = false;
  var promise;
  try {
    promise =
      self.serverConnectionManager.stop()
        .then(function () {
          if (self.hasServerManagementInterface) {
            return self.serverManagementInterface.stop();
          }
        })
        .then(function () {
          self.emit('stop');
        })
        .catch(function (error) {
          logger.error('Failed to stop switch', error);
        });
    return promise;
  } catch (error) {
    logger.error('Failed to stop switch', error);
    promise = Promise.resolve();
  }
  logger.debug('Leaving Switch.stop', promise);
  return promise;
};

Switch.prototype.getServerEndpointBroker = function () {
  return this.serverEndpointBroker;
};

Switch.prototype.reportStatus = function () {
  return {
    started: this.started,
    serverEndpointBroker: this.serverEndpointBroker.reportStatus(),
    serverConnectionManager: this.serverConnectionManager.reportStatus(),
    hasServerManagementInterface: this.hasServerManagementInterface,
    serverManagementInterface: this.serverManagementInterface.reportStatus()
  };
};

module.exports = Switch;
