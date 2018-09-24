"use strict";

var Logging = require('./Logging.js');

var className = 'ServiceTraceAppender';

function serviceTraceAppender() {
    return function (loggingEvent) {
        var methodName = 'serviceTraceAppender';

        try {
            var logString = JSON.stringify(loggingEvent.data);
            Logging.writeServiceTrace(className, methodName, String(loggingEvent.level.levelStr),logString);
        }
        catch(err) {
            Logging.writeServiceTrace(className, methodName, String('ERROR'),err.message);
        }
    };
}

function configure() {
    return serviceTraceAppender;
}

function installLog4jsAppender() {
  var log4js = require('log4js');
  log4js.clearAppenders();
  log4js.addAppender(serviceTraceAppender());

  // Default the log level to 'OFF' so that we don't waste time calling C++.
  // Nobody can see these log entries unless service trace is enabled.
  // It defaults to 'TRACE' which sends every single one to C++, which is expensive.
  var defaultLogLevel = 'OFF';

  // Set the environment variable MQSI_NODEJS_LOG_DESTINATION to
  // also write log4js trace to the named file.
  if (typeof process.env.MQSI_NODEJS_LOG_DESTINATION === 'string') {
    log4js.loadAppender('file');
    var logDestination;
    logDestination = process.env.MQSI_NODEJS_LOG_DESTINATION;
    log4js.addAppender(log4js.appenders.file(logDestination));
    // Ensure that all the log entries end up being sent to the named file.
    defaultLogLevel = 'ALL';
  }

  // Set the global log level to the default.
  log4js.setGlobalLogLevel(defaultLogLevel);

  // Listen out for log filter changes from the node.js manager inside the
  // DataFlowEngine. If it enables service tracing, then we want to ensure
  // that all logging goes to service trace. Otherwise, ensure that the
  // configured logging level is restored.
  process.on('iib:logFilter', function (logFilter) {
    if (logFilter === 'tracing' || logFilter === 'debugTracing') {
      log4js.setGlobalLogLevel('ALL');
    } else {
      log4js.setGlobalLogLevel(defaultLogLevel);
    }
  });
}

module.exports.appender = serviceTraceAppender;
module.exports.configure = configure;
module.exports.__installLog4jsAppender = installLog4jsAppender;
