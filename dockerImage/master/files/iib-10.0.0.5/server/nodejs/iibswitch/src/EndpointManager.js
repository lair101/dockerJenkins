/**
 *
 * NAME: EndpointManager.js
 *
 * DECSRIPTION: EndpointManager
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
var TCPIPConnection = require('./TCPIPConnection.js');
var net = require('net');
var logger = logging.logger("EndpointManager");

function EndpointManager(newEndpointDescriptions) {
  logger.debug('Entering EndpointManager');
  this.endpointDescriptions = newEndpointDescriptions;
  logger.debug('Leaving EndpointManager');
}

EndpointManager.prototype = {
  // Registers all the endpoints which wait to be told to connect
  "start": function (newAgentReceiver) {
    var self = this;
    logger.debug('Entering EndpointManager.start');
    this.agentReceiver = newAgentReceiver;
    if (this.endpointDescriptions.endpoints) {
      this.endpointDescriptions.endpoints.forEach(function (endpoint) {
        self.agentReceiver.createEndpointRegistration(endpoint);
      });
    }
    logger.debug('Leaving EndpointManager.start');
  },

  // Registers all the endpoints which wait to be told to connect
  "refresh": function (newEndpointDescriptions) {
    var self = this;
    logger.debug('Entering EndpointManager.refresh');
    var oldEndpointDescriptions = this.endpointDescriptions;
    this.endpointDescriptions = newEndpointDescriptions;
    if (newEndpointDescriptions.endpoints) {
      // add new endpoints
      newEndpointDescriptions.endpoints.forEach(function (endpointNew) {
        var foundEndpoint = false;
        oldEndpointDescriptions.endpoints.forEach(function (endpointExisting) {
          if (endpointExisting.hostname === endpointNew.hostname &&
              endpointExisting.port === endpointNew.port) {
            logger.debug('found a match for: ' + JSON.stringify(endpointExisting));
            foundEndpoint = true;
          }
        });
        if (foundEndpoint === false) {
          logger.debug('found no match so create: ' + JSON.stringify(endpointNew));
          self.agentReceiver.createEndpointRegistration(endpointNew);
        }
      });

      // delete removed endpoints
      oldEndpointDescriptions.endpoints.forEach(function (endpointExisting) {
        var foundEndpoint = false;
        newEndpointDescriptions.endpoints.forEach(function (endpointNew) {
          if (endpointExisting.hostname === endpointNew.hostname &&
              endpointExisting.port === endpointNew.port) {

            logger.debug('found a match for: ' + JSON.stringify(endpointExisting));
            foundEndpoint = true;
          }
        });
        if (foundEndpoint === false) {
          logger.debug('found no match so delete: ' + JSON.stringify(endpointExisting));
          self.agentReceiver.removeEndpointRegistration(endpointExisting);
        }
        foundEndpoint = false;
      });
    }
    this.endpointDescriptions = newEndpointDescriptions;
    logger.debug('Leaving EndpointManager.refresh');
  },

  "openEndpoint": function (endpoint, id) {
    return this.openEndpointInner(endpoint, new net.Socket(), id);
  },

  "openEndpointInner": function (endpoint, destination, id) {
    logger.debug('Entering EndpointManager.openEndpoint');
    for (var i = 0; this.endpointDescriptions.endpoints.length > i ; i++) {
      var ep = this.endpointDescriptions.endpoints[i];
      logger.debug('Endpoint to check: ' + JSON.stringify(ep));
      if (ep.hostname === endpoint.hostname &&
          ep.port === endpoint.port) {
        logger.debug('Endpoint found: ' + JSON.stringify(ep));
        destination.connect(ep.port, ep.hostname, function () {

        });
        logger.debug('Leaving EndpointManager.openEndpoint');
        return new TCPIPConnection(this.agentReceiver, ep, destination, false, id);
      }
    }
    logger.debug('Leaving EndpointManager.openEndpoint');
    throw new Error('No endpoint defined with hostname ' + endpoint.hostname + ' and port ' + endpoint.port);
  }
};

module.exports = EndpointManager;
