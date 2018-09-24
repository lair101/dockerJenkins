/**
 *
 * NAME: iib-sf-interaction.js
 *
 * DECSRIPTION: Interaction class for the IIB Salesforce Connector
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
// NAME: 
// Return the interaction methed 
function iibCreateRequestInteraction( connector ) {

    logger.debug("Interaction " + connector.dataSourceName);
    var iib = require('ibm-integration-bus');
    this.connector = connector;

    // Declare the function used to execute the loopback requests
    this.request = function(requestProperties, data, callback) {
        logger.debug("IIBSalesforceRequestInteraction::Making request");

        // logger.debug("Received Properties:" + JSON.stringify(requestProperties));
        // Extract the 'object' for the request
        if ((typeof requestProperties.object !== 'string') ||
            (requestProperties.object.length === 0)) {

            throw new iib.Error('iib-sf-interaction',
                                'request',
                                'BIP3859',
                                'Property object has not been supplied or is an invalid type',
                                JSON.stringify(requestProperties.object));
        }
        var modelName = requestProperties.object;
        logger.debug(this.connector.dataSourceName + " connector object:" + modelName);

        // Extract the 'url' for the request
        if ((typeof requestProperties.url !== 'string') ||
            (requestProperties.url.length === 0)) {

            throw new iib.Error('iib-sf-interaction',
                                'request',
                                'BIP3859',
                                'Property url has not been supplied or is an invalid type',
                                'url',
                                JSON.stringify(requestProperties.url));
        }

        // Extract the 'timeout' for the request if specified
        var timeoutMilliseconds;
        if (typeof requestProperties.timeoutMilliseconds !== 'undefined') {
            timeoutMilliseconds = requestProperties.timeoutMilliseconds / 1;

            if ((isNaN(timeoutMilliseconds) === true) || (timeoutMilliseconds < 0)) {
                throw new iib.Error( 'iib-sf-interaction',
                                     'request',
                                     'BIP3859',
                                     'Property timeoutMilliseconds is an invalid type or is a negative value',
                                     'timeoutMilliseconds',
                                     JSON.stringify(requestProperties.timeoutMilliseconds));
            }
        } 
        else {
            timeoutMilliseconds = this.connector.timeoutMilliseconds;
        }

        // See if we already have a datasource for this url
        var dataSourceIndex = requestProperties.url + "." + timeoutMilliseconds.toString();

        var dataSourceEntry = this.connector.dataSources[ dataSourceIndex ];
        if (typeof dataSourceEntry === 'undefined') {
          var credentials = this.connector.securityIdentity.getCredential();

          var username = credentials.getUserName();
          var password = credentials.getPassword();
          var clientIdentity = credentials.getClientIdentity();
          var clientSecret = credentials.getClientSecret();

          logger.debug("securityIdentity.name: " + username);
          // logger.debug("securityIdentity.password: " + password);
          // logger.debug("securityIdentity.ClientIdentity: " + clientIdentity);
          // logger.debug("securityIdentity.ClientSecret: " + clientSecret);

          dataSource = require('loopback').createDataSource({
                          connector: this.connector.dataSourceName,
                          loginUrl: requestProperties.url,
                          username : username,
                          password : password,
                          clientId : clientIdentity,
                          clientSecret : clientSecret,
                          connectionTimeout : timeoutMilliseconds,
                          configureLog4js: false});


          dataSourceEntry = {'dataSource': dataSource, models: {}};
          this.connector.dataSources[ dataSourceIndex ] = dataSourceEntry;

          logger.debug("Created dataSource for " + this.connector.dataSourceName + " " + dataSourceIndex);
        }
        else {
          logger.debug("Reusing dataSource for " + this.connector.dataSourceName + " " + dataSourceIndex);
        }

        // Now see if we have a matching model.
        var dataModel;
        if (typeof dataSourceEntry.models[modelName] === 'undefined') {
            logger.debug("Model: " + modelName + " does not exist so creating.");
            dataModel = dataSourceEntry.dataSource.createModel( modelName, { 'Id': { 'type': 'string', 'id': true } } );

            // For retrieve operations we install a Loopback Operation Hook to
            // allow us to use a SOQL where clause rather than a JSON object.
            dataModel.observe('access', require('./iib-sf-interaction-observers.js').iibAccessObserver);

            dataSourceEntry.models[modelName] = dataModel;
        }
        else {
            logger.debug("Re-using model:" +  modelName + "." );
            dataModel = dataSourceEntry.models[modelName];
        }
        
        logger.info("Received requestProperties: " + JSON.stringify(requestProperties));

        // Extract the 'operation' for the request
        if ((typeof requestProperties.operation !== 'string') ||
            (requestProperties.operation.length === 0)) {
            throw new iib.Error('iib-sf-interaction',
                                'request',
                                'BIP3859',
                                'Property operation has not been supplied or is an invalid type',
                                'operation',
                                JSON.stringify(requestProperties.operation));
        }
        var Operation = requestProperties.operation;
        logger.debug(this.connector.dataSourceName + " connector operation:" + Operation);

        switch (Operation.toUpperCase())
        {
            case "CREATE":
                var createRequest = require('./iib-sf-interaction-create.js');
                createRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "RETRIEVE":
                var retrieveRequest = require('./iib-sf-interaction-retrieve.js');
                retrieveRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "UPDATE":
                var updateRequest = require('./iib-sf-interaction-update.js');
                updateRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "DELETE":
                var deleteRequest = require('./iib-sf-interaction-delete.js');
                deleteRequest(dataModel, this, requestProperties, data, callback);
                break;
            default:
                throw new iib.Error('iib-sf-interaction',
                                    'request',
                                    'BIP3859',
                                    'Property operation has an invalid value',
                                    'operation',
                                    JSON.stringify(requestProperties.operation));
        }
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibCreateRequestInteraction;
