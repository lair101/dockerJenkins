/**
 *
 * NAME: iib-sf-interaction-update.js
 *
 * DECSRIPTION: Interaction-update class for the IIB Salesforce Connector
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
// NAME: iibSFInteractionUpdate
function iibSFInteractionUpdate( dataModel, interaction, requestProperties, data, callback ) {

    logger.info("Update Interaction " + interaction.connector.dataSourceName);
    var iib = require('ibm-integration-bus');
    var sfutils = require("./iib-sf-utilities.js");

    logger.info("Received data: " + JSON.stringify(data));
    logger.info("Received requestProperties: " + JSON.stringify(requestProperties));

    if (data === null){

        logger.debug("Throwing BIP2111: Received null data for the update operation");

        throw new iib.Error( 'iib-sf-interaction',
                             'update',
                             'BIP2111',
                             'Received null data for the update operation',
                             'The update interaction used by the Salesforce Request connector received null data.');

    }

    if (Array.isArray(data)){

        logger.debug("Throwing BIP3864: Received data for the update operation which was a JSON array, but a JSON object was expected");

        throw new iib.Error( 'iib-sf-interaction',
                             'update',
                             'BIP3864',
                             'Received data for the update operation which was a JSON array, but a JSON object was expected',
                             'update');
    }

    if (Buffer.isBuffer(data)){

        logger.debug("Throwing BIP3860: Received data for the update operation which was not in JSON format");

        throw new iib.Error( 'iib-sf-interaction',
                             'update',
                             'BIP3860',
                             'Received data for the update operation which was not in JSON format',
                             'Update');
    }


    // If the Salesforce ID has been defined in the Local Environment it will be set in requestProperties.id 
    // If the Salesforce ID has not been defined in the Local Environment, look in the input data.
    // If no Salesforce ID provided, look for an external ID in the Local Environment.
    // If no identifier specified throw an error.
    var findId;
    var useUpdateAll = false;
    var externalIdName;
    var externalIdValue;

    if (typeof requestProperties.id !== 'undefined') {
      findId = requestProperties.id;     // Check for LE containing a value for OutputLocalEnvironment.Destination.Salesforce.Request.id (lowercase id)
    }
    else if (typeof requestProperties.Id !== 'undefined') {
      findId = requestProperties.Id;     // Check for LE containing a value for OutputLocalEnvironment.Destination.Salesforce.Request.Id (uppercase id)
    }
    else if (typeof data.Id !== 'undefined') {
      findId = data.Id;                  // Check for data containing the id
    }
    else if (typeof requestProperties.externalIdName !== 'undefined') {
        if (typeof requestProperties.externalIdName !== 'string') {

            logger.debug("Throwing BIP3859: Property externalIdName is the wrong type");

            throw new iib.Error( 'iib-sf-interaction',
                               'Update',
                               'BIP3859',
                               'Property externalIdName is the wrong type',
                               'externalIdName',
                               JSON.stringify(requestProperties.externalIdName));
        }
        else {
            // Because an external Id has been specified we will be updating the Salesforce record using it. 
            externalIdName  = requestProperties.externalIdName;
            externalIdValue = requestProperties.externalId;
            findId = requestProperties.externalId;
            useUpdateAll = true;
            logger.debug("externalIdName '" + externalIdName +"' specified with value '" + externalIdValue + "'");
        }

    }

    if (typeof findId === 'undefined') {

       logger.debug("Throwing BIP3866: Received no ID for the update operation");

       throw new iib.Error( 'iib-sf-interaction',
                            'Update',
                            'BIP3866',
                            'Received no ID for the update operation',
                            'Update');
    }
    else {

      if (useUpdateAll.valueOf() === true){
          logger.debug("Checking external id name : " + externalIdName + " external id value: " + externalIdValue);

          logger.debug("Request to update Salesforce record using an external id: " + externalIdName + " with value: " + externalIdValue + " so using updateAll()");

          var extId = {};
          extId[externalIdName] = externalIdValue;

          logger.debug("extId = " + JSON.stringify(extId));

          // Keep a copy of the data that comes in as the loopback salesforce connector augments it with the external Id !!
          var inputData = JSON.parse(JSON.stringify(data));

          dataModel.updateAll( extId , data, function (err, rest) {

                 var result = null;

                 if (err) {
                        logger.debug("Failed to update Data Source." + JSON.stringify(err));
                        // Pass the error back to our caller
                        callback( sfutils.createSFError( err, 'iib-sf-interaction', 'update', 'Salesforce UpdateAll failed', err.name, 'Update', err.message ), null);
                 } else {

                        // The Salesforce record was successfully updated
                        logger.debug("iibSFInteractionUpdate: received: " + JSON.stringify(rest));

                        if (typeof rest.id === 'undefined') {
                           // Send back the data that was passed in 
                           // The Salesforce ID was never specified so result cannot be augmented with it
                           result = inputData;
                        }
                        else {
                           // The updateAll() did an upsert operation so send back the id for thew newly created record.
                           // Send back the data that was passed in 
                           // The Salesforce ID was never specified so result cannot be augmented with it
                           logger.debug("iibSFInteractionUpdate: augmenting result with id.");
                           result = inputData;
                           result.Id = rest.id;
                        }

                        logger.debug("iibSFInteractionUpdate: sending back: " + JSON.stringify(result));
             
                        // Pass the object back to our caller
                        callback(err, result);

                 }

          });

      }            // if useUpdateAll() === true
      else {

          logger.debug("Request to update id: " + findId + " so using findById() and updateAttributes()");
    
          // Activity Log
          iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'update', 'BIP13052', 'Update', requestProperties.object, requestProperties.url).resourceManager(interaction.connector.shortName).end();
    
          dataModel.findById( findId , [], function (err, modelInst) {
    
              var result = null;
        
              if (err) {
                   logger.debug("Failed to find record " + findId + " as part of update request. Error name: " + err.name + " - " + err.message);
    
                   // Activity Log
                   iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'update', 'BIP13054', 'Update', findId, requestProperties.object, err.name, err.message).resourceManager(interaction.connector.shortName).end();
    
                   // Pass the error back to our caller
                   callback( sfutils.createSFError( err, 'iib-sf-interaction', 'update', 'Salesforce FindById prior to Update failed', err.name, 'Update', err.message ), null);
              } else {
    
                   if (modelInst === null){
                       logger.debug("findById() returned err=undefined, modelInst=null so returning an error!");
                       // The object could not be found, so pass the error back to our caller
                       callback(new iib.Error( 'iib-sf-interaction', 'update', 'BIP3863', 'The id could not be found in Salesforce', findId, 'Update', requestProperties.object), null);
                   }
                   else {
                      logger.debug("Found object: " + JSON.stringify(modelInst));
    
                      try {
                         modelInst.updateAttributes( data, function (err, resp) {
                            if (err) {
                              logger.debug("Failed to update record " + findId + ". Error name: " + err.name + " - " + err.message);
    
                              // Activity Log
                                  iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'update', 'BIP13054', 'Update', findId, requestProperties.object, err.name, err.message).resourceManager(interaction.connector.shortName).end();
    
                              // Pass the error back to our caller
                              callback( sfutils.createSFError( err, 'iib-sf-interaction', 'update', 'Salesforce UpdateAttributes failed', err.name, 'Update', err.message ), null);
                            }
                            else {
                              logger.debug("iibSFInteractionUpdate: received: " + JSON.stringify(resp));
    
                              // Activity Log
                              iib.ActivityLog.writeTraceEvent('iib-sf-interaction', 'update', 'BIP13053', 'Update', requestProperties.object, findId).resourceManager(interaction.connector.shortName).end();
    
                              // Send back the data that was passed in augmented with the Id
                              result = data;
                              result.Id = findId;
    
                              logger.debug("iibSFInteractionUpdate: sending back: " + JSON.stringify(result));
    
                              // Pass the object back to our caller
                              callback(err, result);
                            }
    
                         });   // updateAttributes
    
                      }
                      catch (exception) {
                          // Pass the error back to our caller
                          logger.debug("iibSFInteractionUpdate: received exception from updateAttributes(): " + JSON.stringify(exception));
                          callback( sfutils.createSFError( exception, 'iib-sf-interaction', 'update', 'UpdateAttributes generated an exception', exception.name, 'Update', exception.message ), null);
                      }
    
                   } // else modelInst != null
    
              }  // else err === null
    
          });    // findById

      }  // else useUpdateAll.valueOf === false

    }  // else  findId != 'undefined'
  
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibSFInteractionUpdate;
