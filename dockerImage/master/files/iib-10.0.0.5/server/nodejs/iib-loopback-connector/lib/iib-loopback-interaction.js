/**
 *
 * NAME: iib-loopback-interaction.js
 *
 * DECSRIPTION: Interaction class for the IIB Loopback Connector
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
        logger.debug("IIBLoopbackRequestInteraction::Making request");

        // logger.debug("Received Properties:" + JSON.stringify(requestProperties));
        // Extract the 'object' for the request
        if ((typeof requestProperties.object !== 'string') ||
            (requestProperties.object.length === 0)) {

            throw new iib.Error('iib-loopback-interaction',
                                'request',
                                'BIP3869',
                                'Property object has not been supplied or is an invalid type',
                                JSON.stringify(requestProperties.object));
        }
        var modelName = requestProperties.object;
        logger.debug(this.connector.dataSourceName + " connector object:" + modelName);

        // Extract the 'timeout' for the request if specified
        var timeoutMilliseconds;
        if (typeof requestProperties.timeoutMilliseconds !== 'undefined') {
            timeoutMilliseconds = requestProperties.timeoutMilliseconds / 1;

            if ((isNaN(timeoutMilliseconds) === true) || (timeoutMilliseconds < 0)) {
                throw new iib.Error( 'iib-loopback-interaction',
                                     'request',
                                     'BIP3869',
                                     'Property timeoutMilliseconds is an invalid type or is a negative value',
                                     'timeoutMilliseconds',
                                     JSON.stringify(requestProperties.timeoutMilliseconds));
            }
        } 
        else {
            timeoutMilliseconds = this.connector.timeoutMilliseconds;
        }

        // TODO I changed this from a fixed literal - but is it enough, and note must be insync with connector
        var dataSourceIndex =  this.connector.dataSourceName + "." + timeoutMilliseconds.toString();

        var dataSourceEntry = this.connector.dataSources[ dataSourceIndex ];
        if (typeof dataSourceEntry === 'undefined') {

            throw new iib.Error( 'iib-loopback-interaction',
                                 'request',
                                 'BIP3869',
                                 'Unable to find dataSource',
                                 'dataSource',
                                 'dataSourceIndex'); // TODO BIP3865E:A JavaScript exception ''Uncaught TypeError: Converting circular structure to JSON'' was caught in module ''iib-loopback-interaction.js'' at line '79', offset '38'-'39'. Stack: 'TypeError: Converting circular structure to JSON   WAS : JSON.stringify(this.connector.dataSources));
        } 
        else {
          logger.debug("Reusing dataSource for " + this.connector.dataSourceName + " " + dataSourceIndex);
        }

        // Now see if we have a matching model.
        var dataModel;
        if (typeof dataSourceEntry.models[modelName] === 'undefined') {
            logger.debug("Model: " + modelName + " does not exist so creating.");
            dataModel = dataSourceEntry.dataSource.createModel( modelName, { 'Id': { 'type': 'string', 'id': true } } );

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
            throw new iib.Error('iib-loopback-interaction',
                                'request',
                                'BIP3869',
                                'Property operation has not been supplied or is an invalid type',
                                'operation',
                                JSON.stringify(requestProperties.operation));
        }
        var Operation = requestProperties.operation;
        logger.debug(this.connector.dataSourceName + " connector operation:" + Operation);

        switch (Operation.toUpperCase())
        {
            case "CREATE":
                var createRequest = require('./iib-loopback-interaction-create.js');
                createRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "RETRIEVE":
                var retrieveRequest = require('./iib-loopback-interaction-retrieve.js');
                retrieveRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "UPDATE":
                var updateRequest = require('./iib-loopback-interaction-update.js');
                updateRequest(dataModel, this, requestProperties, data, callback);
                break;
            case "DELETE":
                var deleteRequest = require('./iib-loopback-interaction-delete.js');
                deleteRequest(dataModel, this, requestProperties, data, callback);
                break;
            default:
                throw new iib.Error('iib-loopback-interaction',
                                    'request',
                                    'BIP3869',
                                    'Property operation has an invalid value',
                                    'operation',
                                    JSON.stringify(requestProperties.operation));
        }
    };
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibCreateRequestInteraction;
