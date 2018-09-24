/**
 *
 * NAME: IIBProxy.js
 *
 * DECSRIPTION: A proxy module that acts as an interface between the simplon code
 * and IIBs 'ibm-integration-bus' module which may or may not be present.
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

var logger = require('./Logging.js').logger('IIBProxy');

var iib = null;
try {
  iib = require('ibm-integration-bus');
  // This is only required because of the "unusual" unit test environment.
  if (global.ibm && global.ibm.integrationBus && global.ibm.integrationBus.logging) {
    logger.debug('Successfully loaded ibm-integration-bus module, will use it!');
  } else {
    logger.debug('Successfully loaded ibm-integration-bus, but globals not available?');
    iib = null;
  }
} catch (e) {
  logger.debug('Failed to load ibm-integration-bus module, will use empty stubs!', e);
}

function writeSystemLogError(className, methodName, messageKey, traceText) {
  if (iib) {
    iib.Logging.writeSystemLogError.apply(null, arguments);
  } else {
    logger.debug('Ignoring writeSystemLogError call', className, methodName, messageKey, traceText);
  }
}
module.exports.writeSystemLogError = writeSystemLogError;

function writeSystemLogWarning(className, methodName, messageKey, traceText) {
  if (iib) {
    iib.Logging.writeSystemLogWarning.apply(null, arguments);
  } else {
    logger.debug('Ignoring writeSystemLogWarning call', className, methodName, messageKey, traceText);
  }
}
module.exports.writeSystemLogWarning = writeSystemLogWarning;

function writeSystemLogInformation(className, methodName, messageKey, traceText) {
  if (iib) {
    iib.Logging.writeSystemLogInformation.apply(null, arguments);
  } else {
    logger.debug('Ignoring writeSystemLogInformation call', className, methodName, messageKey, traceText);
  }
}
module.exports.writeSystemLogInformation = writeSystemLogInformation;
