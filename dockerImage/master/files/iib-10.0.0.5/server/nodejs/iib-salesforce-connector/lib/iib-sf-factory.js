/**
 *
 * NAME: iib-salesforce-factory.js
 *
 * DECSRIPTION: Factory class for the IIB Salesforce Connector
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
// NAME: IIB Salesforce Connector Factory
// 
// DESCRIPTION: Connector Factory for Salesforce java-script connector
function iibSalesforceConnectorFactory( factoryProperties ) {
    this.name = 'iib-salesforce-connector';
    this.shortName = "Salesforce";
    this.dataSourceName = "salesforce";

    logger.debug("IIBJsFactory: Constructor");

    this.createRequestConnector = function(connectorName, properties, securityIdentity) {
        logger.debug("IIBJsFactory: Creating connector" + this.name);
        var Connector = require('./iib-sf-request-connector.js');

        return new Connector( this.name, this.shortName, this.dataSourceName, connectorName, properties, securityIdentity );
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibSalesforceConnectorFactory;
