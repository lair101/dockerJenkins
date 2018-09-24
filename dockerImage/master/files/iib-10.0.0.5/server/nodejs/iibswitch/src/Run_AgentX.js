/**
 *
 * NAME: Run_AgentX.js
 *
 * DECSRIPTION: Run_AgentX
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

var AgentX = require('./AgentX.js');
var FileConfig = require('./FileConfig.js');
var WebSocketClient = require('ws');
var Logger = require('./Logging.js');

var agentX;

exports.start = function (configFilePath, callback) {
  console.log("Starting agentx with config folder: '" + configFilePath + "'");

  if (configFilePath === undefined) {
    configFilePath = "./config";
  }

  var fileConfig = new FileConfig(configFilePath, 'agentx.json');
  Logger.setupLogger(fileConfig.loggingConfig());

  agentX = new AgentX(fileConfig, WebSocketClient);
  agentX.start();
  callback();

  return agentX;
};

exports.stop = function (callback) {
  console.log("Stopping agentX");

	if (agentX) {
	  agentX.stop();
	}
  callback();
};

exports.reportStatus = function () {
  return {
    agentx: agentX ? agentX.reportStatus() : null
  };
};
