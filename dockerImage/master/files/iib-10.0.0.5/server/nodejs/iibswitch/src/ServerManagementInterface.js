/**
 *
 * NAME: ServerManagementInterface.js
 *
 * DECSRIPTION: ServerManagementInterface
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
var logger = logging.logger("ServerManagementInterface");
var express = require('express');
var https = require('https');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var IIBProxy = require('../src/IIBProxy.js');
var RateLimiter = require('../src/RateLimiter.js');

function ServerManagementInterface(config, scm) {
  logger.debug('Entering ServerManagementInterface');
  EventEmitter.call(this);
  this.serverConnectionManager = scm;
  this.app = express();
  this.server = undefined;
  if (config.admin) {
    this.configuredPort = config.admin.port;
    this.certs = config.admin.certs;
    if (config.admin.disabled) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  } else {
    this.configuredPort = 0;
    this.certs = null;
    this.disabled = true;
  }
  this.baseUrl = '/server/v1';
  this.actualPort = 0;
  this.rl = new RateLimiter();
  // Ensure that we don't throw when we emit an error event by installing our own
  // default handler - at least one handler, no throws.
  this.on('error', function (error) { });
  logger.debug('Leaving ServerManagementInterface');
}

util.inherits(ServerManagementInterface, EventEmitter);

ServerManagementInterface.prototype.start = function (restartTime) {
  logger.debug('Entering ServerManagementInterface.start');
  var promise;
  if (!this.disabled) {
    var self = this;
    promise = new Promise(function (resolve, reject) {
      if (restartTime === undefined) {
        restartTime = 5000;
      }
      self.server = self.createServer(self.certs, self.app);
      self.server.on('error', reject);
      self.server.listen(self.configuredPort, resolve);
    }).then(function () {
      self.actualPort = self.server.address().port;
      self.app.get(self.baseUrl + '/agents', function (req, res) {
        self.getAgents(req, res);
      });
      self.app.get(self.baseUrl + '/registeredflows', function (req, res) {
        //for callable input nodes
        self.getRegisteredFlows(req, res);
      });
      self.app.get(self.baseUrl + '/registeredcallers', function (req, res) {
        //for callable invoke nodes
        self.getRegisteredCallers(req, res);
      });
      self.app.get(self.baseUrl + '/agents/:agentName', function (req, res) {
        logger.debug('Entering ServerManagementInterface./agents/:agent');
        self.getAgent(req, res);
        logger.debug('Leaving ServerManagementInterface./agents/:agent');
      });
      self.app.get(self.baseUrl + '/agents/:agentName/endpoints/:endpointName', function (req, res) {
        logger.debug('Entering ServerManagementInterface./agents/:agent/endpoints/:endpointName');
        self.getEndpoint(req, res);
        logger.debug('Leaving ServerManagementInterface./agents/:agent/endpoints/:endpointName');
      });
      self.app.get(self.baseUrl + '/agents/:agentName/endpoints/:endpointName/test', function (req, res) {
        logger.debug('Entering ServerManagementInterface./agents/:agent/endpoints/:endpointName/test');
        self.getTestEndpoint(req, res);
        logger.debug('Leaving ServerManagementInterface./agents/:agent/endpoints/:endpointName/test');
      });
      self.app.get(self.baseUrl + '/data', function (req, res) {
        logger.debug('Entering ServerManagementInterface./data');
        self.getData(req, res);
        logger.debug('Leaving ServerManagementInterface./data');
      });
      self.app.get(self.baseUrl + '/logState', function (req, res) {
        logger.debug('Entering ServerManagementInterface./logState');
        self.logState(req, res);
        logger.debug('Leaving ServerManagementInterface./logState');
      });
      logger.debug('Listening on: ' + self.server.address().address + " : " + self.server.address().port);
      self.emit('start');
      IIBProxy.writeSystemLogInformation('Switch', 'start', 'BIP6455', 'Server management interface started', self.actualPort);
      self.rl.reset();
    }).catch(function (error) {
      logger.debug('Entering ServerManagementInterface.on.error: ' + error);
      logger.error('ServerManagementInterface.on.error: ' + error);
      self.emit('error', error);
      self.rl.limit(function () {
        IIBProxy.writeSystemLogError('Switch', 'start', 'BIP6457', 'Failed to start server management interface', self.configuredPort, error);
      });
      setTimeout(function () { self.start(restartTime); }, restartTime);
      logger.debug('Leaving ServerManagementInterface.on.error');
    });
  } else {
    logger.debug('ServerManagementInterface not starting admin port as admin.disabled === true or no admin configuration');
    promise = Promise.resolve();
  }
  return promise;
};

ServerManagementInterface.prototype.createServer = function (certs, app) {
  return https.createServer(certs, app);
};

ServerManagementInterface.prototype.stop = function () {
  var self = this;
  var promise = new Promise(function (resolve, reject) {
    if (self.server) {
      self.server.close(resolve);
    } else {
      resolve();
    }
  }).then(function () {
    self.emit('stop');
    IIBProxy.writeSystemLogInformation('Switch', 'stop', 'BIP6456', 'Server management interface stopped', self.actualPort);
    self.rl.reset();
    self.actualPort = 0;
  });
  return promise;
};

ServerManagementInterface.prototype.getAgents = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getAgents');
  try {
    res.json(this.serverConnectionManager.getAllAgentNames());
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getAgents');
};

ServerManagementInterface.prototype.getRegisteredFlows = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getRegisteredFlows');

  try {
    var responseJson = this.serverConnectionManager.getAllRegisteredFlows();
    if (responseJson !== undefined) {
      res.json(responseJson);
    }
    else {
      logger.debug('Sending 404');
      res.status(404).send('{}');
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getRegisteredFlows');
};

ServerManagementInterface.prototype.getRegisteredCallers = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getRegisteredCallers');

  try {
    var responseJson = this.serverConnectionManager.getAllRegisteredCallers();
    if (responseJson !== undefined) {
      res.json(responseJson);
    }
    else {
      logger.debug('Sending 404');
      res.status(404).send('{}');
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getRegisteredCallers');
};

ServerManagementInterface.prototype.getAgent = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getAgent');
  try {
    var responseJson = this.serverConnectionManager.getAgentDetails(req.params.agentName);
    if (responseJson !== undefined) {
      res.json(responseJson);
    }
    else {
      logger.debug('Sending 404');
      res.status(404).send('{}');
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getAgent');
};

ServerManagementInterface.prototype.getEndpoint = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getEndpoint');
  try {
    var responseJson = this.serverConnectionManager.getEndpointDetails(req.params.agentName, req.params.endpointName);
    if (responseJson !== undefined) {
      res.json(responseJson);
    }
    else {
      res.status(404).send('{}');
    }
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getEndpoint');
};

ServerManagementInterface.prototype.getTestEndpoint = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getTestEndpoint');
  try {
    this.serverConnectionManager.testEndpoint(req.params.agentName, req.params.endpointName, function (responseJson) {
      logger.debug('Entering ServerManagementInterface.getTestEndpoint.callback');
      if (responseJson !== undefined) {
        res.json(responseJson);
      }
      else {
        res.status(404).send('{}');
      }
      logger.debug('Leaving ServerManagementInterface.getTestEndpoint.callback');
    });
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getTestEndpoint');
};

ServerManagementInterface.prototype.getData = function (req, res) {
  logger.debug('Entering ServerManagementInterface.getData');
  try {
    var responseJson = this.serverConnectionManager.getData();
    res.json(responseJson);
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.getData');
};

ServerManagementInterface.prototype.logState = function (req, res) {
  logger.debug('Entering ServerManagementInterface.logState');
  try {
    var responseJson = this.serverConnectionManager.logState();
    res.json(responseJson);
  }
  catch (e) {
    res.status(500).send(e);
  }
  logger.debug('Leaving ServerManagementInterface.logState');
};

ServerManagementInterface.prototype.reportStatus = function () {
  return {
    configuredPort: this.configuredPort,
    actualPort: this.actualPort
  };
};

module.exports = ServerManagementInterface;
