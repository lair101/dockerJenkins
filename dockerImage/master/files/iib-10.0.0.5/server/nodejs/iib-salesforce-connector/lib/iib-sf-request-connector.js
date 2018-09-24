/**
 *
 * NAME: iib-sf-request-connector.js
 *
 * DECSRIPTION: Connector class for the IIB Salesforce Connector
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
// NAME:        iibSalesforceRequestConnector
//
// DESCRIPTION: Java-script connector used to issue requests for the
//              specified data-source. 
//
// NOTES:       Currently the connector is hard-coded to use the SalesForce
//              connector and pre-defined credentials but this will be
//              extracted from attributes passed to the connector.
function iibSalesforceRequestConnector( name, shortName, dataSourceName, connectorName, properties, securityIdentity ) {

    var iib = require('ibm-integration-bus');

    this.dataSourceName = dataSourceName;
    this.name = name;
    this.shortName = shortName;
    this.connectorName = connectorName;
    this.properties = properties;
    this.securityIdentity = securityIdentity;

    logger.debug("iibSalesforceConnector: Constructor - name: " + this.name + " dataSourceName: " + this.dataSourceName + " connectorName: " + this.connectorName);

    // Extract the 'url' for the request
    if ((typeof this.properties.url !== 'string') ||
        (this.properties.url.length === 0)) {

        throw new iib.Error( 'iib-sf-request-connector',
                             'constructor',
                             'BIP3859',
                             'Property url has not been supplied or is an invalid type',
                             'url',
                             JSON.stringify(this.properties.url));
    }

    // And extract the credentials
    var credentials = this.securityIdentity.getCredential();
    if (!credentials) {
        throw new iib.Error( 'iib-sf-request-connector',
                             'constructor',
                             'BIP3859',
                             'Property securityIdentity is invalid',
                             'securityIdentity',
                             JSON.stringify(this.securityIdentity));
    }

    var username = credentials.getUserName();
    var password = credentials.getPassword();
    var clientIdentity = credentials.getClientIdentity();
    var clientSecret = credentials.getClientSecret();

    logger.debug("securityIdentity.name: " + username);
    // logger.debug("securityIdentity.password: " + password);
    // logger.debug("securityIdentity.ClientIdentity: " + clientIdentity);
    // logger.debug("securityIdentity.ClientSecret: " + clientSecret);

    if (typeof this.properties.timeoutMilliseconds !== 'undefined') {
        this.timeoutMilliseconds = this.properties.timeoutMilliseconds / 1;
        if ((isNaN(this.timeoutMilliseconds)) ||
            (this.timeoutMilliseconds <= 0)) {
            throw new iib.Error( 'iib-sf-request-connector',
                                 'constructor',
                                 'BIP3859',
                                 'Property timeoutMilliseconds is invalid',
                                 'timeoutMilliseconds',
                                 JSON.stringify(this.properties.timeoutMilliseconds));
        }
    }
    else { 
        this.timeoutMilliseconds = 120000; // 2 minute default
    }

    // Here we want to setup the dataSource and verify it is valid.
    var dataSource = require('loopback').createDataSource({
                    connector: this.dataSourceName,
                    loginUrl: this.properties.url,
                    username : username,
                    password : password,
                    clientId : clientIdentity,
                    clientSecret : clientSecret,
                    connectionTimeout: this.timeoutMilliseconds,
                    configureLog4js: false});

    // TODO We would like to check this dataSource can connect to Salesforce
    // here, perhaps a ping() request but we need to check that ping() does
    // not interfere with other connectors.

    // Add the datasource we just created to the hashmap in the connector
    // using the url as the key.
    this.dataSources = {};
    var dataSourceIndex = this.properties.url + "." + this.timeoutMilliseconds.toString();
    this.dataSources[ dataSourceIndex ] = { 'dataSource': dataSource, 'models': {}};
    logger.debug("Created dataSource for " + this.dataSourceName + " " + dataSourceIndex);

    this.createRequestInteraction = function() {
        logger.debug("iibSalesforceConnector: Creating IIBSalesforceRequestInteraction");
        var Interaction = require('./iib-sf-interaction.js');

        return new Interaction( this );
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibSalesforceRequestConnector;
