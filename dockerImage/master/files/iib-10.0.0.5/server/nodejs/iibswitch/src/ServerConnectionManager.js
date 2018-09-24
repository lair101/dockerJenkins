/**
 *
 * NAME: ServerConnectionManager.js
 *
 * DECSRIPTION: ServerConnectionManager
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

var logger = require('./Logging').logger('ServerConnectionManager');
var ServerReceiver = require('../src/ServerReceiver');
var ServerSender = require('../src/ServerSender');
var WebSocketServer = require('ws').Server;
var https = require('https');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var IIBProxy = require('../src/IIBProxy.js');
var RateLimiter = require('./RateLimiter.js');

function ServerConnectionManager(newTunnelConfig, newServerEndpointBroker) {
  logger.debug('Entering ServerConnectionManager');
  EventEmitter.call(this);
  this.tunnelConfig = newTunnelConfig;
  this.serverEndpointBroker = newServerEndpointBroker;
  this.nextTunnelId = 1;
  this.serverReceiverList = {};
  this.serverSenderList = {};
  if (this.tunnelConfig.agentC) {
    this.configuredAgentCPort = this.tunnelConfig.agentC.port;
    if (this.tunnelConfig.agentC.disabled) {
      this.disabledAgentC = true;
    } else {
      this.disabledAgentC = false;
    }
  } else {
    this.configuredAgentCPort = 0;
    this.disabledAgentC = true;
  }
  if (this.tunnelConfig.agentP) {
    this.configuredAgentPPort = this.tunnelConfig.agentP.port;
    if (this.tunnelConfig.agentP.disabled) {
      this.disabledAgentP = true;
    } else {
      this.disabledAgentP = false;
    }
  } else {
    this.configuredAgentPPort = 0;
    this.disabledAgentP = true;
  }
  this.actualAgentCPort = 0;
  this.actualAgentPPort = 0;
  this.started = false;
  this.serverReceiverRL = new RateLimiter();
  this.serverSenderRL = new RateLimiter();
  // Ensure that we don't throw when we emit an error event by installing our own
  // default handler - at least one handler, no throws.
  this.on('error', function (error) { });
  logger.debug('Leaving ServerConnectionManager');
}

util.inherits(ServerConnectionManager, EventEmitter);

ServerConnectionManager.prototype.start = function () {
  logger.debug('Entering ServerConnectionManager.start');
  var promise;
  if (!this.started) {
    this.started = true;
    promise = this.startInner();
  } else {
    logger.debug('ServerConnectionManager already started, ignoring');
    promise = Promise.resolve();
  }
  logger.debug('Leaving ServerConnectionManager.start', promise);
  return promise;
};

ServerConnectionManager.prototype.startInner = function () {
  logger.debug('Entering ServerConnectionManager.startInner');
  var promise;
  if (this.started) {
    var self = this;
    var isAgentC = true, startedAgentC = false, startedAgentP = true, caughtError = false;
    try {
      promise =
        this.startServerReceiverListener()
          .then(function () {
            isAgentC = false;
            startedAgentC = true;
          })
          .then(function () {
            return self.startServerSenderListener();
          })
          .then(function () {
            startedAgentP = true;
          })
          .catch(function (error) {
            caughtError = true;
            self.emit('error', error);
            if (isAgentC) {
              self.serverReceiverRL.limit(function () {
                IIBProxy.writeSystemLogError('Switch', 'startInner', 'BIP6463', 'Back side port failed to start', self.configuredAgentCPort, error);
              });
            } else {
              self.serverSenderRL.limit(function () {
                IIBProxy.writeSystemLogError('Switch', 'startInner', 'BIP6460', 'Front side port failed to start', self.configuredAgentPPort, error);
              });
            }
            return self
              .stop(true)
              .then(function () {
                setTimeout(function () {
                  self.startInner();
                }, 5000);
              });
          })
          .then(function () {
            if (!caughtError) {
              if (startedAgentC) {
                self.emit('start:bsport');
                IIBProxy.writeSystemLogInformation('Switch', 'startInner', 'BIP6461', 'Back side port started', self.actualAgentCPort);
                self.serverReceiverRL.reset();
              }
              if (startedAgentP) {
                self.emit('start:fsport');
                IIBProxy.writeSystemLogInformation('Switch', 'startInner', 'BIP6458', 'Front side port started', self.actualAgentPPort);
                self.serverSenderRL.reset();
              }
              if (startedAgentC || startedAgentP) {
                self.emit('start');
              }
            }
          });
    } catch (e) {
      logger.debug('Caught exception in ServerConnectionManager.startInner, will attempt to restart', e);
      self.emit('error', e);
      self.serverReceiverRL.limit(function () {
        IIBProxy.writeSystemLogError('Switch', 'startInner', 'BIP6463', 'Back side port failed to start', self.configuredAgentCPort, e);
      });
      setTimeout(function () {
        self
          .stop(true)
          .then(function () {
            self.startInner();
          });
      }, 5000);
      promise = Promise.resolve();
    }
  } else {
    logger.debug('ServerConnectionManager not started, ignoring');
    promise = Promise.resolve();
  }
  logger.debug('Leaving ServerConnectionManager.startInner', promise);
  return promise;
};

ServerConnectionManager.prototype.stop = function (restart) {
  logger.debug('Entering ServerConnectionManager.stop', restart);
  var promise;
  if (this.started) {
    if (restart === undefined) { restart = false; }
    if (!restart) { this.started = false; }
    var self = this;
    var agentCPort = self.actualAgentCPort;
    var agentPPort = self.actualAgentPPort;
    promise =
      this.stopServerReceiverListener()
        .then(function () {
          if (!restart) {
            self.emit('stop:bsport');
            IIBProxy.writeSystemLogInformation('Switch', 'stop', 'BIP6462', 'Back side port stopped', agentCPort);
            self.serverReceiverRL.reset();
            self.actualAgentCPort = 0;
          }
        })
        .then(function () {
          return self.stopServerSenderListener();
        })
        .then(function () {
          if (!restart) {
            self.emit('stop:fsport');
            IIBProxy.writeSystemLogInformation('Switch', 'stop', 'BIP6459', 'Front side port stopped', agentPPort);
            self.serverSenderRL.reset();
            self.actualAgentPPort = 0;
          }
        })
        .then(function () {
          if (!restart) {
            self.emit('stop');
          }
        });
  } else {
    logger.debug('ServerConnectionManager already stopped, ignoring');
    promise = Promise.resolve();
  }
  logger.debug('Leaving ServerConnectionManager.stop', promise);
  return promise;
};

ServerConnectionManager.prototype.createServer = function (certs) {
  return https.createServer(certs);
};

ServerConnectionManager.prototype.startServerReceiverListener = function () {
  logger.debug('Entering ServerConnectionManager.startServerReceiverListener');

  var promise;
  if (!this.disabledAgentC) {
    var self = this;
    var errorCallback;
    promise = new Promise(function (resolve, reject) {
      self.httpsServerForServerReceiverListener = self.createServer(self.tunnelConfig.agentC.certs);
      errorCallback = function (error) {
        logger.debug('ServerConnectionManager.startServerReceiverListener caught async error', error);
        reject(error);
      };
      self.httpsServerForServerReceiverListener.on('error', errorCallback);
      self.httpsServerForServerReceiverListener.listen(self.tunnelConfig.agentC.port, resolve);
    }).then(function () {
      self.httpsServerForServerReceiverListener.removeListener('error', errorCallback);
      self.actualAgentCPort = self.httpsServerForServerReceiverListener.address().port;
      self.wssServerForServerReceiverListener = new WebSocketServer({
        server: self.httpsServerForServerReceiverListener,
        perMessageDeflate: false
      });
      self.configureServerReceiverListener(self.wssServerForServerReceiverListener);
    });
  } else {
    logger.debug('ServerConnectionManager not starting back side port as disabledAgentC === true');
    promise = Promise.resolve();
  }

  logger.debug('Leaving ServerConnectionManager.startServerReceiverListener', promise);
  return promise;
};

ServerConnectionManager.prototype.configureServerReceiverListener = function (wss) {
  logger.debug('Entering ServerConnectionManager.configureServerReceiverListener');
  var self = this;

  wss.on('connection', function (ws) {
    logger.debug('Entering ServerConnectionManager.configureServerReceiverListener.connection');
    var serverReceiver = new ServerReceiver(ws, self.nextTunnelId, self.serverEndpointBroker, self);

    serverReceiver.openTunnel();
    self.serverReceiverList[self.nextTunnelId] = serverReceiver;
    self.nextTunnelId++;
    logger.debug('Leaving ServerConnectionManager.configureServerReceiverListener,connection');
  });

  wss.on('error', function (message) {
    logger.debug('Entering ServerConnectionManager.configureServerReceiverListener.error');
    logger.error('websocket server error:' + message);
    logger.debug('Leaving ServerConnectionManager.configureServerReceiverListener.error');
  });

  logger.debug('Leaving ServerConnectionManager.configureServerReceiverListener');
};

ServerConnectionManager.prototype.stopServerReceiverListener = function () {
  logger.debug('Entering ServerConnectionManager.stopServerReceiverListener');

  var self = this;
  var promise = new Promise(function (resolve, reject) {
    for (var recvEntry in self.serverReceiverList) {
      var serverReceiver = self.serverReceiverList[recvEntry];
      if (serverReceiver) {
        serverReceiver.destroyTunnel();
      }
    }
    self.serverReceiverList = {};

    if (self.wssServerForServerReceiverListener) {
      self.wssServerForServerReceiverListener.close();
    }
    self.wssServerForServerReceiverListener = null;
    if (self.httpsServerForServerReceiverListener) {
      self.httpsServerForServerReceiverListener.close(resolve);
      self.actualAgentCPort = 0;
      self.httpsServerForServerReceiverListener = null;
    } else {
      resolve();
    }
  });

  logger.debug('Leaving ServerConnectionManager.stopServerReceiverListener', promise);
  return promise;
};

ServerConnectionManager.prototype.startServerSenderListener = function () {
  logger.debug('Entering ServerConnectionManager.startServerSenderListener');

  var promise;
  if (!this.disabledAgentP) {
    var self = this;
    var errorCallback;
    promise = new Promise(function (resolve, reject) {
      self.httpsServerForServerSenderListener = self.createServer(self.tunnelConfig.agentP.certs);
      errorCallback = function (error) {
        logger.debug('ServerConnectionManager.startServerSenderListener caught async error', error);
        reject(error);
      };
      self.httpsServerForServerSenderListener.on('error', errorCallback);
      self.httpsServerForServerSenderListener.listen(self.tunnelConfig.agentP.port, resolve);
    }).then(function () {
      self.httpsServerForServerSenderListener.removeListener('error', errorCallback);
      self.actualAgentPPort = self.httpsServerForServerSenderListener.address().port;
      self.wssServerForServerSenderListener = new WebSocketServer({
        server: self.httpsServerForServerSenderListener,
        perMessageDeflate: false
      });
      self.configureServerSenderListener(self.wssServerForServerSenderListener);
    });
  } else {
    logger.debug('ServerConnectionManager not starting front side port as disabledAgentP === true');
    promise = Promise.resolve();
  }

  logger.debug('Leaving ServerConnectionManager.startServerSenderListener', promise);
  return promise;
};

ServerConnectionManager.prototype.configureServerSenderListener = function (wss) {
  logger.debug('Entering ServerConnectionManager.configureServerSenderListener');
  var self = this;

  wss.on('connection', function (ws) {
    logger.debug('Entering ServerConnectionManager.configureServerSenderListener.connection');
    self.serverSenderList[self.nextTunnelId] = new ServerSender(ws, self.nextTunnelId, self.serverEndpointBroker, self);
    self.nextTunnelId++;
    logger.debug('Leaving ServerConnectionManager.configureServerSenderListener.connection');
  });

  wss.on('error', function (message) {
    logger.debug('Entering ServerConnectionManager.configureServerSenderListener.error');
    logger.error('websocket server error:' + message);
    logger.debug('Leaving ServerConnectionManager.configureServerSenderListener.error');
  });

  logger.debug('Leaving ServerConnectionManager.configureServerSenderListener');
};

ServerConnectionManager.prototype.stopServerSenderListener = function () {
  logger.debug('Entering ServerConnectionManager.stopServerSenderListener');

  var self = this;
  var promise = new Promise(function (resolve, reject) {
    for (var sndrEntry in self.serverSenderList) {
      var serverSender = self.serverSenderList[sndrEntry];
      if (serverSender) {
        serverSender.destroyTunnel();
      }
    }
    self.serverSenderList = {};

    if (self.wssServerForServerSenderListener) {
      self.wssServerForServerSenderListener.close();
    }
    self.wssServerForServerSenderListener = null;
    if (self.httpsServerForServerSenderListener) {
      self.httpsServerForServerSenderListener.close(resolve);
      self.actualAgentPPort = 0;
      self.httpsServerForServerSenderListener = null;
    } else {
      resolve();
    }
  });

  logger.debug('Leaving ServerConnectionManager.stopServerSenderListener', promise);
  return promise;
};

ServerConnectionManager.prototype.getAllAgentNames = function () {
  logger.debug('Entering ServerConnectionManager.getAllAgentNames');
  var retVal = [];

  for (var sender in this.serverSenderList) {
    var sndrEntry = this.serverSenderList[sender];
    if (sndrEntry) {
      retVal.push(sndrEntry.getName());
    }
  }

  for (var receiver in this.serverReceiverList) {
    var recvEntry = this.serverReceiverList[receiver];
    if (recvEntry) {
      retVal.push(recvEntry.getName());
    }
  }

  logger.debug('Leaving ServerConnectionManager.getAllAgentNames: ' + retVal.length);
  return retVal;
};

//for callable input-reply nodes
ServerConnectionManager.prototype.getAllRegisteredFlows = function () {
  logger.debug('Entering ServerConnectionManager.getAllRegisteredFlows');
  var allFlows = this.serverEndpointBroker.getCallableFlowsReg();
  var retVal = {};
  var entries = Object.keys(allFlows);
  logger.debug('All registrations to check: ' + util.inspect(allFlows, { depth: 3 }));
  entries.forEach(function (entry) {
    var current = allFlows[entry];
    logger.debug('Registration to check: ' + entry + ' : ' + util.inspect(current, { depth: 2 }));
    //create place holder
    retVal[entry] = { registeredInputNodes: [] };
    for (var i = 0; current.registeredFlows.length > i ; ++i) {
      var value = {
        details: current.registeredFlows[i].details,
        originator: current.registeredFlows[i].sendTo.agentIIBNode + ':' + current.registeredFlows[i].sendTo.agentIIBServer
      };

      //add into result
      retVal[entry].registeredInputNodes.push(value);

    }
  });
  logger.debug('Leaving ServerConnectionManager.getAllRegisteredFlows');
  return retVal;
};

//for invoke nodes
ServerConnectionManager.prototype.getAllRegisteredCallers = function () {
  logger.debug('Entering ServerConnectionManager.getAllRegisteredCallers');
  var allInvokers = this.serverEndpointBroker.getCallableInvokersReg();
  var retVal = {};
  var entries = Object.keys(allInvokers);
  logger.debug('All registrations to check: ' + util.inspect(allInvokers, { depth: 3 }));
  entries.forEach(function (entry) {
    var current = allInvokers[entry];
    logger.debug('Registration to check: ' + entry + ' : ' + util.inspect(current, { depth: 2 }));
    //create place holder
    retVal[entry] = { registeredInvokeNodes: [] };
    for (var i = 0; current.registeredFlows.length > i ; ++i) {
      var value = {
        details: current.registeredFlows[i].details,
        originator: current.registeredFlows[i].sendTo.agentIIBNode + ':' + current.registeredFlows[i].sendTo.agentIIBServer
      };

      //add into result
      retVal[entry].registeredInvokeNodes.push(value);

    }
  });
  logger.debug('Leaving ServerConnectionManager.getAllRegisteredCallers');
  return retVal;
};

ServerConnectionManager.prototype.getAgentDetails = function (agentName) {
  logger.debug('Entering ServerConnectionManager.getAgentDetails: ' + agentName);
  var retVal;
  var self = this;
  for (var sender in this.serverSenderList) {
    var sndrEntry = this.serverSenderList[sender];
    logger.debug('Entering ServerConnectionManager.entry to match', sndrEntry);
    if (sndrEntry && sndrEntry.getName() === agentName) {
      retVal = {
        name: agentName,
        type: 'P',
        endpoints: self.serverEndpointBroker.getEndpoints(agentName)
      };
    }
  }

  for (var receiver in this.serverReceiverList) {
    var recvEntry = this.serverReceiverList[receiver];
    logger.debug('Entering ServerConnectionManager.entry to match', recvEntry);
    if (recvEntry && recvEntry.getName() === agentName) {
      retVal = {
        name: agentName,
        type: 'C'
      };
    }
  }

  logger.debug('Leaving ServerConnectionManager.getAgentDetails: ' + JSON.stringify(retVal));
  return retVal;
};

ServerConnectionManager.prototype.getEndpointDetails = function (agentName, endpointName) {
  logger.debug('Entering ServerConnectionManager.getEndpointDetails: ' + agentName + ', ' + endpointName);
  var retVal;
  var self = this;
  for (var sender in this.serverSenderList) {
    var entry = this.serverSenderList[sender];
    if (entry && entry.getName() === agentName) {
      var endpoints = self.serverEndpointBroker.getEndpoints(agentName);
      logger.debug('getEndpointDetails getEndpoints: ' + util.inspect(endpoints));
      for( var i = 0; i < endpoints.length; ++i) {
        var endpoint = endpoints[i];
        if (endpoint.name === endpointName) {
          logger.debug('Leaving ServerConnectionManager.getEndpointDetails: ' + endpoint.name);
          return endpoint;
        }
      }
    }
  }

  logger.debug('Leaving ServerConnectionManager.getEndpointDetails');
  return retVal;
};

ServerConnectionManager.prototype.testEndpoint = function (agentName, endpointName, callback) {
  logger.debug('Entering ServerConnectionManager.testEndpoint: ' + agentName);
  var self = this;
  if (this.getEndpointDetails(agentName, endpointName) === undefined) {
    callback(undefined);
  }
  else {
    this.serverEndpointBroker.testEndpoint(agentName, endpointName, callback);
  }
  logger.debug('Leaving ServerConnectionManager.testEndpoint: ');
};


ServerConnectionManager.prototype.getData = function () {
  logger.debug('Entering ServerConnectionManager.getData: ');
  var retVaue = {
    timeSinceLastActivitySec: this.serverEndpointBroker.getTimeSinceLastActivitySec(),
    connectionsMade: this.serverEndpointBroker.getConnectionsMade(),
    connectionsDropped: this.serverEndpointBroker.getConnectionsDropped(),
    bytesOut: this.serverEndpointBroker.getBytesOut(),
    bytesIn: this.serverEndpointBroker.getBytesIn()
  };

  logger.debug('Leaving ServerConnectionManager.getData');
  return retVaue;
};

ServerConnectionManager.prototype.logState = function () {
  logger.debug('Entering ServerConnectionManager.logState: ');
  var retVal = {
    serverSenders: [],
    serverReceivers: [],
  };

  for (var recvEntry in this.serverReceiverList) {
    var serverReceiver = this.serverReceiverList[recvEntry];
    if (serverReceiver) {
      retVal.serverReceivers.push(Object.keys(serverReceiver.inFlightCallableFlowRequests));
    }
  }

  for (var sndrEntry in this.serverSenderList) {
    var serverSender = this.serverSenderList[sndrEntry];
    if (serverSender) {
      retVal.serverSenders.push(Object.keys(serverSender.inFlightCallableFlowRequests));
    }
  }

  logger.debug('Leaving ServerConnectionManager.logState');
  return retVal;
};

ServerConnectionManager.prototype.removeServerSender = function (sender) {
  delete this.serverSenderList[sender.tunnelToAgentId];
};

ServerConnectionManager.prototype.removeServerReceiver = function (receiver) {
  delete this.serverReceiverList[receiver.tunnelToAgentId];
};

//test only
ServerConnectionManager.prototype.addServerSender = function (ws) {
  var serverSender = new ServerSender(ws, this.nextTunnelId, this.serverEndpointBroker);
  this.serverSenderList[this.nextTunnelId] = serverSender;
  this.nextTunnelId++;
};

//test only
ServerConnectionManager.prototype.addServerReceiver = function (ws) {
  var serverReceiver = new ServerReceiver(ws, this.nextTunnelId, this.serverEndpointBroker);
  this.serverReceiverList[this.nextTunnelId] = serverReceiver;
  this.nextTunnelId++;
};

ServerConnectionManager.prototype.reportStatus = function () {
  var self = this;
  var serverReceivers = Object.keys(self.serverReceiverList)
    .map(function (key) { return self.serverReceiverList[key]; })
    .filter(function (receiver) { return !!receiver; })
    .map(function (receiver) { return receiver.reportStatus(); });
  var serverSenders = Object.keys(self.serverSenderList)
    .map(function (key) { return self.serverSenderList[key]; })
    .filter(function (sender) { return !!sender; })
    .map(function (sender) { return sender.reportStatus(); });
  return {
    nextTunnelId: this.nextTunnelId,
    serverReceivers: serverReceivers,
    serverSenders: serverSenders,
    configuredAgentCPort: this.configuredAgentCPort,
    configuredAgentPPort: this.configuredAgentPPort,
    actualAgentCPort: this.actualAgentCPort,
    actualAgentPPort: this.actualAgentPPort
  };
};

module.exports = ServerConnectionManager;
