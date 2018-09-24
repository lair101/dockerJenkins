/**
 *
 * NAME: iib-sf-interaction-observers.js
 *
 * DECSRIPTION: Interaction observer functions for the IIB Salesforce Connector
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


var log4js = require("log4js");
var logger = log4js.getLogger('IIBJSConnector');

//////////////////////////////////////////////////////////////////////////
// NAME: iibAccessObserver
// DECSRIPTION: Intercepts 'access' operations and replaces where property
//              with whereSOQL property if it exists.
function iibAccessObserver( ctx, next) {
    if ((typeof ctx.query !== 'undefined') &&
        (typeof ctx.query.whereSOQL !== 'undefined')) {
        ctx.query.where = ctx.query.whereSOQL;
        delete ctx.query.whereSOQL;
    }
    next();
}

// Export the observerr functions
module.exports.iibAccessObserver = iibAccessObserver;
