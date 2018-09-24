/**
 *
 * NAME: iib-loopback-factory.js
 *
 * DECSRIPTION: Factory class for the IIB Loopback Connector
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
    logger = log4js.getLogger('IIBJSConnector');

//////////////////////////////////////////////////////////////////////////
// NAME: IIB Loopback Connector Factory
// 
// DESCRIPTION: Connector Factory for Loopback java-script connector
function iibLoopbackConnectorFactory( factoryProperties ) {
    this.name = 'iib-loopback-connector';
    this.shortName = "Loopback";

    var iib = require('ibm-integration-bus');

/* TODO uncomment for logging in windows unit test build [
    log4js.setGlobalLogLevel('ALL');
    log4js.configure({ appenders: [{type: "console"},{type: "file",filename: "IIBJSConnector.log",category: 'IIBJSConnector'}]});
    var logger = log4js.getLogger('IIBJSConnector');
    logger.debug("iibLoopbackConnectorFactory.js::iibLoopbackConnectorFactory() Reset log4js");
// TODO uncomment for logging in windows unit test build ]  */
    logger.debug("IIBJsFactory(loopback): Constructor");

    this.createRequestConnector = function(connectorName, properties, securityIdentity) {
        logger.debug("iibLoopbackConnectorFactory(factoryProperties): Creating connector" + this.name);
        var Connector = require('./iib-loopback-request-connector.js');

        if ((typeof properties.dataSource === 'undefined') ||
            (properties.dataSource.length === 0)) {
            logger.debug("iibLoopbackConnectorFactory(factoryProperties): Error missing dataSource property");
            throw new iib.Error( 'iib-loopback-request-connector',
                                 'iibLoopbackConnectorFactory constructor',
                                 'BIP3869',
                                 'Property dataSource has not been set or is an invalid type',
                                 'dataSource',
                                 JSON.stringify(properties));
        }

        return new Connector( this.name, this.shortName, properties.dataSource, connectorName, properties, securityIdentity );
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibLoopbackConnectorFactory;
