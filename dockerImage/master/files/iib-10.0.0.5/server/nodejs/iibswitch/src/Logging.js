/**
 *
 * NAME: Logging.js
 *
 * DECSRIPTION: Logging
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

var log4js = require('log4js');
var loggerMap = {};
var DEBUG_LEVEL = process.env.IIB_SWITCH_DEBUG_LEVEL || 'INFO';
var config = {
  "appenders" : [{
      "type"       : "console"
    }]
};

function setupLogger(loggingConfig) {
  if (loggingConfig.level !== undefined) {
    DEBUG_LEVEL = loggingConfig.level;
  }
  log4js.setGlobalLogLevel(DEBUG_LEVEL);
  var fs = require('fs');
  var path = require('path');
  fs.mkdirParent = function (dirPath, mode) {
    try {
      fs.mkdirSync(dirPath, mode);
    }
    catch (e) {
      if ( (e.errno === 34) || (e.errno === -4058) || (e.errno === -2) ) {
        fs.mkdirParent(path.dirname(dirPath), mode);
        fs.mkdirParent(dirPath, mode);
      }
      else {
        throw e;
      }
    }
  };
  if (process.env.MQSI_WORKPATH !== undefined && process.env.MQSI_WORKPATH !== "") {
    var logdir = path.join(process.env.MQSI_WORKPATH, 'common', 'log');
    var logpath = path.join(process.env.MQSI_WORKPATH, 'common', 'log', 'switch');
    config = {
      "appenders" : [{
          "type"       : "dateFile",
          "filename"   : logpath,
          "pattern"    : "-yyyy-MM-dd.log",
          "alwaysIncludePattern": true,
          "layout" : {
            "type"   : "colored"
          }
        }]
    };
    if (!fs.existsSync(logdir)) {
      try {
        fs.mkdirParent(logdir, 448);
      }
      catch (e)	{
        config = {
          "appenders" : [{
              "type"       : "console"
            }]
        };
      }
    }
  }
  log4js.configure(config);
  // Check to see if the ibm-integration-bus module is available - if it is, then
  // we are most likely in a DataFlowEngine process, and so we should append all
  // of our log entries to the service trace for that DataFlowEngine process.
  var iib = null;
  try {
    iib = require('ibm-integration-bus');
    if (typeof global.ibm                        !== 'object' ||
        typeof global.ibm.integrationBus         !== 'object' ||
        typeof global.ibm.integrationBus.logging !== 'object') {
      iib = null;
    }
  } catch (e) {
    // Ignore this error.
  }
  if (iib) {
    // Add the service trace appender.
    var ServiceTraceAppender = iib.ServiceTraceAppender;
    log4js.addAppender(ServiceTraceAppender.appender());
    // Listen out for log filter changes from the node.js manager inside the
    // DataFlowEngine. If it enables service tracing, then we want to ensure
    // that all logging goes to service trace. Otherwise, ensure that the
    // configured logging level is restored.
    process.on('iib:logFilter', function (logFilter) {
      if (logFilter === 'tracing' || logFilter === 'debugTracing') {
        log4js.setGlobalLogLevel('ALL');
      } else {
        log4js.setGlobalLogLevel(DEBUG_LEVEL);
      }
    });
  }
}

function logger(name) {
  var logger = loggerMap[name];
  if (!logger) {
    log4js.setGlobalLogLevel(DEBUG_LEVEL);
    logger = log4js.getLogger(name);
    loggerMap[name] = logger;
  }
  return logger;
}
function configDetails() {
  return config;
}

module.exports = {
  "logger": logger,
  "setupLogger": setupLogger,
  "configDetails": configDetails
};
