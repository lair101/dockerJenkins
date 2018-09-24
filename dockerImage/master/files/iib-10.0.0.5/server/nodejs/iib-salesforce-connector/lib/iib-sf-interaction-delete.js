/**
 *
 * NAME: iib-sf-interaction-delete.js
 *
 * DECSRIPTION: Interaction-delete class for the IIB Salesforce Connector
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
// NAME: iibSFInteractionDelete
function iibSFInteractionDelete( dataModel, interaction, requestProperties, data, callback ) {
    var logger = require("log4js").getLogger('IIBJSConnector');

    logger.info("Delete Interaction " + interaction.connector.dataSourceName);

    var iib = require('ibm-integration-bus');
    var sfutils = require("./iib-sf-utilities.js");

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
        iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'delete', 'BIP13052', 'Delete', requestProperties.object, requestProperties.url).resourceManager(interaction.connector.shortName).end();

        dataModel.destroyById(findId, function (err) {

            if (err) {
                logger.debug("Failed to destroy record " + findId + ". Error name: " + err.name + " - " + err.message);

                 // Activity Log
                 iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'delete', 'BIP13054', 'Delete', findId, requestProperties.object, err.name, err.message).resourceManager(interaction.connector.shortName).end();

                // Pass the error back to our caller
                if (err.errorCode === 'NOT_FOUND'){
                    callback(new iib.Error( 'iib-sf-interaction', 'delete', 'BIP3863', 'The id could not be found in Salesforce', findId, 'Delete', requestProperties.object), null);
                }
                else {
                    callback( sfutils.createSFError( err, 'iib-sf-interaction', 'delete', 'Salesforce Delete failed', err.name, 'Delete', err.message ), null);
                }
            }
            else {
                logger.debug("iibSFInteractionDelete: Deleted id: " + findId);

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'delete', 'BIP13053', 'Delete', requestProperties.object, findId).resourceManager(interaction.connector.shortName).end();

                result = { Id: findId };  
                logger.debug("iibSFInteractionDelete: Sending back this result: " + JSON.stringify(result));
                // Pass the object or error back to our caller
                callback(err, result);
            }

        });
    }
    else {

        throw new iib.Error( 'iib-sf-interaction',
                             'delete',
                             'BIP3861',
                             'Received no ID for the delete operation',
                             'delete');

    }


}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibSFInteractionDelete;



