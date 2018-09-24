/**
 *
 * NAME: iib-loopback-request-connector.js
 *
 * DECSRIPTION: Connector class for the IIB Loopback Connector
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

//
// Set up our log destinations
var log4js = require("log4js");
var logger = require('log4js').getLogger('IIBJSConnector');


//////////////////////////////////////////////////////////////////////////
// NAME:        iibLoopbackRequestConnector
//
// DESCRIPTION: Java-script connector used to issue requests for the
//              specified data-source. 
function iibLoopbackRequestConnector( name, shortName, dataSourceName, connectorName, properties, securityIdentity ) {

    var iib = require('ibm-integration-bus');

/* TODO uncomment for logging in windows unit test build [
    log4js.setGlobalLogLevel('ALL');
    log4js.configure({ appenders: [{type: "console"},{type: "file",filename: "IIBJSConnector.log",category: 'IIBJSConnector'}]});
    var logger = log4js.getLogger('IIBJSConnector');
    logger.debug("iib-loopback-request-connector.js::iibLoopbackRequestConnector() Reset log4js");
// TODO uncomment for logging in windows unit test build ]  */

    this.dataSourceName = dataSourceName;
    this.name = name;
    this.shortName = shortName;
    this.connectorName = connectorName;
    this.properties = properties;
    this.securityIdentity = securityIdentity;

    logger.debug("iibLoopbackConnector: Constructor - name: " + this.name + " dataSourceName: " + this.dataSourceName + " connectorName: " + this.connectorName);
    // Create the dataSorce options
    if ((typeof this.properties.dataSourceFileLocation !== 'string') ||
        (this.properties.dataSourceFileLocation.length === 0)) {

        throw new iib.Error( 'iib-loopback-request-connector',
                             'constructor',
                             'BIP3869',
                             'Property dataSourceFileLocation has not been supplied or is an invalid type',
                             'dataSourceFileLocation',
                             JSON.stringify(this.properties.dataSourceFileLocation));
    }

    logger.debug("iibLoopbackConnector: Constructor - Reading dataSourceFileLocation: " + this.properties.dataSourceFileLocation);
    var fs = require("fs");
    try {
      this.dataSourcesFileTextContent = fs.readFileSync(this.properties.dataSourceFileLocation).toString();
    } catch (e) {
        throw new iib.Error( 'iib-loopback-request-connector',
                             'constructor',
                             'BIP3877',
                             'datasource file is not valid',
                             this.properties.dataSourceFileLocation,
                             e.toString() );
    }
    logger.debug("iibLoopbackConnector: Constructor - About to parse datasource file content : " + this.dataSourcesFileTextContent);
    try {
    	this.dataSourcesFileJsonContent = JSON.parse( this.dataSourcesFileTextContent );
    } catch (e) {
        throw new iib.Error( 'iib-loopback-request-connector',
                             'constructor',
                             'BIP3877',
                             'datasources.json is not valid JSON file',
                             this.properties.dataSourceFileLocation,
                             e.toString() );
    }
    this.dataSourceOptions = this.dataSourcesFileJsonContent[this.dataSourceName];
    if (typeof this.dataSourceOptions == 'undefined') {
        throw new iib.Error( 'iib-loopback-request-connector',
                             'constructor',
                             'BIP3878',
                             'datasource cannot be located in datasources.json file',
                             this.dataSourceName,
                             this.properties.dataSourceFileLocation);
    }
    logger.debug("iibLoopbackConnector: Constructor - Properties for this dataSourceName: " + JSON.stringify(this.dataSourceOptions));

    if (typeof this.properties.timeoutMilliseconds !== 'undefined') {
        this.timeoutMilliseconds = this.properties.timeoutMilliseconds;
        if ((isNaN(this.timeoutMilliseconds)) ||
            (this.timeoutMilliseconds <= 0)) {
            throw new iib.Error( 'iib-loopback-request-connector',
                                 'constructor',
                                 'BIP3869',
                                 'Property timeoutMilliseconds is invalid',
                                 'timeoutMilliseconds',
                                 JSON.stringify(this.properties.timeoutMilliseconds));
        }
    }
    else { 
        this.timeoutMilliseconds = 120000; // 2 minute default
    }
    this.dataSourceOptions.connectionTimeout = this.timeoutMilliseconds;
    this.dataSourceOptions.configureLog4js = false;

    // Here we want to setup the dataSource and verify it is valid.
    var dataSource = require('loopback').createDataSource( this.dataSourceOptions );

    // TODO We would like to check this dataSource can connect to Loopback
    // here, perhaps a ping() request but we need to check that ping() does
    // not interfere with other connectors.

    // Add the datasource we just created to the hashmap in the connector
    // TODO I changed the first part from a fixed literal, but is this unique enough?
    this.dataSources = {};
    var dataSourceIndex = this.dataSourceName + "." + this.timeoutMilliseconds.toString();
    this.dataSources[ dataSourceIndex ] = { 'dataSource': dataSource, 'models': {}};
    logger.debug("Created dataSource for " + this.dataSourceName + " " + dataSourceIndex);

    this.createRequestInteraction = function() {
        logger.debug("iibLoopbackConnector: Creating IIBLoopbackRequestInteraction");
        var Interaction = require('./iib-loopback-interaction.js');

        return new Interaction( this );
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibLoopbackRequestConnector;
