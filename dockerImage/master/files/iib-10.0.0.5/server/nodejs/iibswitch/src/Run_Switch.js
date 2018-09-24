/**
 *
 * NAME: Run_Switch.js
 *
 * DECSRIPTION: Run_Switch
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

var Switch = require('./Switch.js');
var FileConfig = require('./FileConfig.js');
var Logger = require('./Logging.js');

var switchVar;

exports.start = function (configFilePath, callback) {
  console.log("Starting switch with config folder: '" + configFilePath + "'");

  if (configFilePath === undefined) {
    configFilePath = "./config";
  }

  var fileConfig = new FileConfig(configFilePath, 'switch.json');
  Logger.setupLogger(fileConfig.loggingConfig());

  switchVar = new Switch(fileConfig);
  switchVar
    .start()
    .then(function () {
      callback();
    })
    .catch(function (error) {
      callback(error);
    });
};

exports.stop = function (callback) {
  console.log("Stopping switch");

  if (switchVar) {
    switchVar
      .stop()
      .then(function () {
        callback();
      })
      .catch(function (error) {
        callback(error);
      });
  } else {
    callback();
  }
};

exports.reportStatus = function () {
  return {
    switch: switchVar ? switchVar.reportStatus() : { started : false }
  };
};
