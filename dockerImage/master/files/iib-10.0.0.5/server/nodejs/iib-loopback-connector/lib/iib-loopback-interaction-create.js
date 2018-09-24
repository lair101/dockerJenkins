/**
 *
 * NAME: iib-loopback-interaction-create.js
 *
 * DECSRIPTION: Interaction-create class for the IIB Loopback Connector
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
var logger = log4js.getLogger('IIBJSConnector');

//////////////////////////////////////////////////////////////////////////
// NAME: iibLBInteractionCreate
function iibLBInteractionCreate( dataModel, interaction, requestProperties, data, callback ) {


    logger.info("Create Interaction " + interaction.connector.dataSourceName);
    var iib = require('ibm-integration-bus');
    var lbUtils = require("./iib-loopback-utilities.js");

    logger.info("Received data: " + JSON.stringify(data));

    if (data === null){

        logger.debug("Throwing BIP2111: Received null data for the create operation");

        throw new iib.Error( 'iib-loopback-interaction',
                             'create',
                             'BIP2111',
                             'Received null data for the create operation',
                             'The create interaction used by the Loopback Request connector received null data.');

    }

    if (Array.isArray(data)){

        logger.debug("Throwing BIP3864: Received data for the create operation which was a JSON array, but a JSON object was expected");

        throw new iib.Error( 'iib-loopback-interaction',
                             'create',
                             'BIP3874',
                             'Received data for the create operation which was a JSON array, but a JSON object was expected',
                             'create');
    }

    if (Buffer.isBuffer(data)){

        logger.debug("Throwing BIP3860: Received data for the create operation which was not in JSON format");

        throw new iib.Error( 'iib-loopback-interaction',
                             'create',
                             'BIP3870',
                             'Received data for the create operation which was not in JSON format',
                             'create');
    }

    // Activity Log
    iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'create', 'BIP13055', interaction.connector.dataSourceName, 'Create', requestProperties.object).resourceManager(interaction.connector.shortName).end();

    dataModel.create( data, function (err, rest) {
    
       var result = null;
       var Id = null;

       if (err) {
            logger.debug("Failed to create record. Error name: " + err.name + " - " + err.message);

            // Activity Log
            iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'create', 'BIP13057', interaction.connector.dataSourceName, 'Create', requestProperties.object, '', err.name, err.message).resourceManager(interaction.connector.shortName).end();

            // Pass the error back to our caller
            callback(lbUtils.createLBError( err, 'iib-loopback-interaction', 'create', 'Loopback Create failed', err.name, 'Create', err.message), null);
       } else {

            // rest contains a property called id which contains more information than is needed:
            // "id":{"id":"00158000002eFqYAAU","success":true,"errors":[]}
            // so we use a new object to contain the Id and the original data that was passed in

            if (typeof(rest.toJSON) === 'function'){
              result = rest.toJSON();    // Get the result from Loopback.
            }
            else {
              result = rest;    // Get the result from Loopback.
            }

            Id = result.Id.id;         // Get the Id string from 'id'.
            delete result.Id;          // Delete the old 'id'.
            result.Id = Id;            // Set the Id in the result that is sent back to IIB.

            // Activity Log
            iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13056', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, Id).resourceManager(interaction.connector.shortName).end();

            logger.debug("iibLBInteractionCreate: Got result");
            logger.debug(JSON.stringify(result));
       
            // Pass the object back to our caller
            callback(err, result);

       }

    });

}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibLBInteractionCreate;
