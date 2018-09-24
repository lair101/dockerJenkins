/**
 *
 * NAME: ModuleTemplate.js
 *
 * DECSRIPTION: ModuleTemplate
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
var logger = logging.logger("Template");

function Template() {
  logger.debug('Entering Template');

  logger.debug('Leaving Template');
}

module.exports = Template;
