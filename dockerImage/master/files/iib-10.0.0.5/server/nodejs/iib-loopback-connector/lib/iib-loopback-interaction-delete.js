/**
 *
 * NAME: iib-loopback-interaction-delete.js
 *
 * DECSRIPTION: Interaction-delete class for the IIB Loopback Connector
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


//////////////////////////////////////////////////////////////////////////
// NAME: iibLBInteractionDelete
function iibLBInteractionDelete( dataModel, interaction, requestProperties, data, callback ) {
    var logger = require("log4js").getLogger('IIBJSConnector');

    logger.info("Delete Interaction " + interaction.connector.dataSourceName);

    var iib = require('ibm-integration-bus');
    var lbUtils = require("./iib-loopback-utilities.js");

    logger.info("Received request properties: " + JSON.stringify(requestProperties));

    var result = null;

    var findId;
    if (typeof requestProperties.id !== 'undefined') {
      findId = requestProperties.id;
    }
    else if (typeof requestProperties.Id !== 'undefined') {
      findId = requestProperties.Id;
    }

    if (typeof findId !== 'undefined') {
        logger.debug("Request to delete id: " + findId);

        // Activity Log
        iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'delete', 'BIP13055', interaction.connector.dataSourceName, 'Delete', requestProperties.object).resourceManager(interaction.connector.shortName).end();

        dataModel.destroyById(findId, function (err) {

            if (err) {
                logger.debug("Failed to destroy record " + findId + ". Error name: " + err.name + " - " + err.message);

                 // Activity Log
                 iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'delete', 'BIP13057', interaction.connector.dataSourceName, 'Delete', requestProperties.object, findId, err.name, err.message).resourceManager(interaction.connector.shortName).end();

                // Pass the error back to our caller
                if (err.errorCode === 'NOT_FOUND'){
                    callback(new iib.Error( 'iib-loopback-interaction', 'delete', 'BIP3873', 'The id could not be found in Loopback', findId, 'Delete', requestProperties.object), null);
                }
                else {
                    callback( lbUtils.createLBError( err, 'iib-loopback-interaction', 'delete', 'Loopback Delete failed', err.name, 'Delete', err.message ), null);
                }
            }
            else {
                logger.debug("iibLBInteractionDelete: Deleted id: " + findId);

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'delete', 'BIP13056', interaction.connector.dataSourceName, 'Delete', requestProperties.object, findId).resourceManager(interaction.connector.shortName).end();

                result = { Id: findId };  
                logger.debug("iibLBInteractionDelete: Sending back this result: " + JSON.stringify(result));
                // Pass the object or error back to our caller
                callback(err, result);
            }

        });
    }
    else {

        throw new iib.Error( 'iib-loopback-interaction',
                             'delete',
                             'BIP3871',
                             'Received no ID for the delete operation',
                             'delete');

    }


}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibLBInteractionDelete;



