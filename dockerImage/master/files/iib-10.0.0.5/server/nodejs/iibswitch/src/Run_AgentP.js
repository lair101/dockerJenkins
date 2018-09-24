/**
 *
 * NAME: Run_AgentP.js
 *
 * DECSRIPTION: Run_AgentP
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

var AgentP = require('./AgentP.js');
var FileConfig = require('./FileConfig.js');
var WebSocketClient = require('ws');
var Logger = require('./Logging.js');

var agentP;

exports.start = function (configFilePath, callback) {
  console.log("Starting agentp with config folder: '" + configFilePath + "'");

  if (configFilePath === undefined) {
    configFilePath = "./config";
  }

  var fileConfig = new FileConfig(configFilePath, 'agentp.json');
  Logger.setupLogger(fileConfig.loggingConfig());

  agentP = new AgentP(fileConfig, WebSocketClient);
  agentP.start();
  callback();
};

exports.stop = function (callback) {
  console.log("Stopping agentp");

  if (agentP) {
    agentP.stop();
  }
  callback();
};
