/**
 *
 * NAME: Run_AgentC.js
 *
 * DECSRIPTION: Run_AgentC
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

var AgentC = require('./AgentC.js');
var FileConfig = require('./FileConfig.js');
var WebSocketClient = require('ws');
var Logger = require('./Logging.js');

var agentC;

exports.start = function (configFilePath, callback) {
  console.log("Starting agentc with config folder: '" + configFilePath + "'");

  if (configFilePath === undefined) {
    configFilePath = "./config";
  }

  var fileConfig = new FileConfig(configFilePath, 'agentc.json');
  Logger.setupLogger(fileConfig.loggingConfig());

  agentC = new AgentC(fileConfig, WebSocketClient);
  agentC.start();
  callback();
};

exports.stop = function (callback) {
  console.log("Stopping agentc");

  if (agentC) {
    agentC.stop();
  }
  callback();
};
