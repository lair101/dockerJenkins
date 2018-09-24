/**
 *
 * NAME: FileConfig.js
 *
 * DECSRIPTION: FileConfig
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
var logger = logging.logger("FileConfig");
var fs = require('fs');

function FileConfig(configPath, configFile) {
  logger.debug('Entering FileConfig');
  var self = this;
  this.configFullPath = configPath + '/' + configFile;
  this.configLogPath = configPath + '/logging.json';
  try {
    this.refresh();
  }
  catch (e) {
    logger.debug('FileConfig error: ' + e);
  }
  logger.debug('Leaving FileConfig');
}

FileConfig.prototype = {
  "config": function () {
    logger.debug('Entering FileConfig.endpointsConfig');
    logger.debug('Leaving FileConfig.endpointsConfig');
    return this.config_json;
  },

  "loggingConfig": function () {
    logger.debug('Entering FileConfig.loggingConfig');
    logger.debug('Leaving FileConfig.loggingConfig');
    return this.logging_json;
  },

  "registerForChange": function (callback) {
    logger.debug('Entering FileConfig.registerForChange');

    var self = this;
    // Comment out dynamic updates for first release
    //fs.watch(this.configLogPath, function () {
    //  logger.debug('Entering FileConfig.registerForChange.watch');
    //  self.refresh();
    //  callback();
    //  logger.debug('Leaving FileConfig.registerForChange.watch');
    //})
    //fs.watch(this.configFullPath, function () {
    //  logger.debug('Entering FileConfig.registerForChange.watch');
    //  self.refresh();
    //  callback();
    //  logger.debug('Leaving FileConfig.registerForChange.watch');
    //})
    logger.debug('Leaving FileConfig.registerForChange');
  },

  "refresh": function () {
    logger.debug('Entering FileConfig.refresh');
    if (fs.existsSync(this.configFullPath) === false) {
      throw new Error(this.configFullPath + " does not exist");
    }

    this.config_json = JSON.parse(fs.readFileSync(this.configFullPath));
    if (fs.existsSync(this.configLogPath)) {
      this.logging_json = JSON.parse(fs.readFileSync(this.configLogPath));
    }
    else {
      this.logging_json = { "level": "INFO" };
      fs.writeFileSync(this.configLogPath, '{\"level\": \"INFO\"}');
    }
    logger.debug('Leaving FileConfig.refresh');
  }
};

module.exports = FileConfig;
