/**
 *
 * NAME: iib-loopback-interaction-retrieve.js
 *
 * DECSRIPTION: Interaction-retrieve class for the IIB Loopback Connector
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
// NAME: iibLBInteractionRetrieve
function iibLBInteractionRetrieve( dataModel, interaction, requestProperties, data, callback ) {

    logger.debug("Retrieve Interaction " + interaction.connector.dataSourceName);
    var intValue;
    var iib = require('ibm-integration-bus');
    var lbUtils = require("./iib-loopback-utilities.js");

    // Filter properties
    // Note: in our documentation we do state we do not support the
    // 'include' clause but we do not validate it, or any other
    // value is supplied.
    // We support: where, limit, skip, order, fields
    var tofind = {};
    var positiveFields = { }; 
    var negativeFields = { }; 

    if (typeof requestProperties.filterString !== 'undefined') {
        if (typeof requestProperties.filterString !== 'string') {
            throw new iib.Error( 'iib-loopback-interaction',
                               'retrieve',
                               'BIP3869',
                               'Property filterString is the wrong type',
                               'filterString',
                               JSON.stringify(requestProperties.filterString));
        }

        // A string containing the complete filter has been supplied, so we
        // must convert it into a JSON object. 
        try {
            tofind = JSON.parse(requestProperties.filterString);
        } catch (error) {
            logger.debug("Failed to parse filterString(" + requestProperties.filterString + ") Error(" + JSON.stringify(error) +").");

            throw new iib.Error( 'iib-loopback-interaction',
                                 'retrieve',
                                 'BIP3869',
                                 'Failed to parse filterString property',
                                 'filterString',
                                 JSON.stringify(requestProperties.filterString));
        }
    }
    else if (typeof requestProperties.filter !== 'undefined') {
        if (typeof requestProperties.filter.where !== 'undefined') {
            if (typeof requestProperties.filter.where !== 'string') {
                throw new iib.Error( 'iib-loopback-interaction',
                                   'retrieve',
                                   'BIP3869',
                                   'Property filter.where is the wrong type',
                                   'filter.where',
                                   JSON.stringify(requestProperties.filter.where));
            }

            // The where clause is supplied as JSON string, we could parse it here 
            // to ensure it is valid, but let's not do that yet.
            // tofind.where = requestProperties.filter.where; 
            try {
                tofind.where = JSON.parse(requestProperties.filter.where); 
            } catch (error) {
            logger.debug("Failed to parse where(" + requestProperties.filter.where + ") Error(" + JSON.stringify(error) +").");

            throw new iib.Error( 'iib-loopback-interaction',
                                 'retrieve',
                                 'BIP3869',
                                 'Failed to parse filter.where property',
                                 'filterString',
                                 JSON.stringify(requestProperties.filter.where));
            }
        }

        if (typeof requestProperties.filter.limit !== 'undefined') {
            intValue = requestProperties.filter.limit / 1;
            if ((isNaN(intValue) === true) || (intValue < 0)) {
                throw new iib.Error( 'iib-loopback-interaction',
                                   'retrieve',
                                   'BIP3869',
                                   'Property filter.limit is an invalid type or is a negative value',
                                   'filter.limit',
                                   JSON.stringify(requestProperties.filter.limit));
            }

            tofind.limit = intValue;
        }
      
        if (typeof requestProperties.filter.skip !== 'undefined') {
            intValue = requestProperties.filter.skip / 1;
            if ((isNaN(intValue) === true) || (intValue < 0)) {
                throw new iib.Error( 'iib-loopback-interaction',
                                   'retrieve',
                                   'BIP3869',
                                   'Property filter.skip is an invalid type or is a negative value',
                                   'filter.skip',
                                   JSON.stringify(requestProperties.filter.skip));
            }
            tofind.skip = intValue;
        }

        var propName;
        var i;
        var element;
        if (typeof requestProperties.filter.order !== 'undefined') {
            if (typeof requestProperties.filter.order !== 'object') {
                throw new iib.Error( 'iib-loopback-interaction',
                                   'retrieve',
                                   'BIP3869',
                                   'Property filter.order is the wrong type',
                                   'filter.order',
                                   JSON.stringify(requestProperties.filter.order));
            }
            
            // If there is more than one order field we will have an array,
            // however if there is only one order field we may just have a
            // simple object to deal with, so convert it into an array 
            var orderArray = [];
            tofind.order= [];
            if (Array.isArray(requestProperties.filter.order) === false) {
                orderArray[0] = requestProperties.filter.order;
            }
            else {
                orderArray = requestProperties.filter.order;
            }

            // And validate the order fields provided
            for (i=0; i < orderArray.length; i++) {
                if (typeof orderArray[i] != 'object') {
                    // It must be an object
                    propName = "filter.order[" + i + "]";
                    throw new iib.Error( 'iib-loopback-interaction',
                                         'retrieve',
                                         'BIP3872',
                                         'Property filter.order is not a correctly constructed object',
                                         propName );
                }
 
                if (Object.keys(orderArray[i]).length !== 1) {
                    // It must have only one property
                    propName = "filter.order[" + i + "]";
                    throw new iib.Error( 'iib-loopback-interaction',
                                         'retrieve',
                                         'BIP3872',
                                         'Property filter.order has an invalid number of keys',
                                         propName );
                }

                // And the value can be ASC or DESC (any case)
                for (element in orderArray[i]) {
                    if (typeof orderArray[i][element] !== 'string') {
                        propName = "filter.order[" + i + "]";
                        throw new iib.Error( 'iib-loopback-interaction',
                                             'retrieve',
                                             'BIP3872',
                                             'Property filter.order is the wrong type',
                                             propName );
                    }
 
                    var value = orderArray[i][element].toUpperCase();
                    if ((value !== 'ASC') && (value !== 'DESC')) {
                        propName = "filter.order[" + i + "]";
                        throw new iib.Error( 'iib-loopback-interaction',
                                             'retrieve',
                                             'BIP3872',
                                             'Property filter.order is the wrong type',
                                             propName );
                    }
                    
                    // the string is valid
                    tofind.order[i] = element + " " + value;
                }
            }
        }

        if (typeof requestProperties.filter.field !== 'undefined') {
            if (typeof requestProperties.filter.field !== 'object') {
                throw new iib.Error( 'iib-loopback-interaction',
                                   'retrieve',
                                   'BIP3869',
                                   'Property filter.field is the wrong type',
                                   'filter.field',
                                   JSON.stringify(requestProperties.filter.field));
            }
            
            // If there is more than one 'field' field we will have an array,
            // however if there is only one 'field' field we may just have a
            // simple object to deal with, so convert it into an array 
            var fieldArray = [];
            if (Array.isArray(requestProperties.filter.field) === false) {
                fieldArray[0] = requestProperties.filter.field;
            }
            else {
                fieldArray = requestProperties.filter.field;
            }

            // And validate the 'field' fields provided
            var fieldCount = 0;
            for (i=0; i < fieldArray.length; i++) {
                if (typeof fieldArray[i] != 'object') {
                    // It must be an object
                    propName = "filter.field[" + i + "]";
                    throw new iib.Error( 'iib-loopback-interaction',
                                         'retrieve',
                                         'BIP3872',
                                         'Property filter.field is not a correctly constructed object',
                                         propName );
                }

                if (Object.keys(fieldArray[i]).length !== 1) {
                    // It must have only one property
                    propName = "filter.field[" + i + "]";
                    throw new iib.Error( 'iib-loopback-interaction',
                                         'retrieve',
                                         'BIP3872',
                                         'Property filter.field has an invalid number of keys',
                                         propName );
                }

                for (element in fieldArray[i]) {
                    if (typeof fieldArray[i][element] === 'boolean') {
                        if (fieldArray[i][element] === true) {
                            positiveFields[element] = true;
                        }
                        else {
                            negativeFields[element] = false;
                        }
                    }
                    else {
                        intValue = fieldArray[i][element] / 1;
                        if (intValue === 1) {
                            positiveFields[element] = true;
                        }
                        else if (intValue === 0) {
                            negativeFields[element] = false;
                        }
                        else {   // Not 0 or 1 or Not-A-Number
                            // The value must be a zero or a one
                            propName = "filter.field[" + i + "]";
                            throw new iib.Error( 'iib-loopback-interaction',
                                                 'retrieve',
                                                 'BIP3872',
                                                 'Property filter.field is the wrong type',
                                                 propName );
                        }
                    }
                }
            }

            if (Object.keys(positiveFields).length > 0) {
                // We have at least on positive field to be returned so
                // add it to the filter.
                tofind.fields = positiveFields;

                // If the user has not requested "Id" then add it to the
                // fields to be removed
                if (typeof positiveFields.Id === 'undefined') {
                    negativeFields.Id = false;
                }

                logger.debug("Positive fields: " + JSON.stringify(positiveFields));

            }

            if (Object.keys(negativeFields).length > 0) {
                logger.debug("Negative fields: " + JSON.stringify(negativeFields));

            }
        }
    }

    // In addition to a filter, the user may also explicitly request 
    // a single Id to be returned. In this case we use findById rather
    // than find. When findById is being used, most of the filter fields 
    // are ignore, but we don't care.
    // Note. We accept "Id" or "id" in the LE override, but the order and
    // fields clauses must use the "Id" form. All orther LE overrides must
    // use the corrrect case.
    var findId;
    if (typeof requestProperties.id !== 'undefined') {
        findId = requestProperties.id;
    }
    else if (typeof requestProperties.Id !== 'undefined') {
        findId = requestProperties.Id;
    }
    else if (typeof requestProperties.externalIdName !== 'undefined') {
        if (typeof requestProperties.externalIdName !== 'string') {
            throw new iib.Error( 'iib-loopback-interaction',
                               'retrieve',
                               'BIP3869',
                               'Property externalIdName is the wrong type',
                               'externalIdName',
                               JSON.stringify(requestProperties.externalIdName));
        }

        if (typeof requestProperties.externalId === 'undefined') {
            // An external Id name has been supplied but no value, so 
            // we ignore the external Id, but write a trace entry
            logger.debug("externalIdName '" + requestProperties.externalIdName +"' specified without specifying a value so ignoring externalId.");
        }
        else {
            // Becuase an external Id has been specified we will be
            // matching using  it. Note this will override any other 
            // where filter already specified.
            // Note: this mechanism does not validate the types specified, Loopback
            // will do that.
            delete tofind.where;

            tofind.where = { };
            tofind.where[requestProperties.externalIdName] = requestProperties.externalId;
            logger.debug("Retrieve using externalId: " + JSON.stringify(tofind.where));
        }
    }

    // Activity Log
    iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13055', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object).resourceManager(interaction.connector.shortName).end();

    if (typeof findId !== 'undefined') {
        logger.debug("Request to find explicit id: " + findId + " filter: " + JSON.stringify(tofind));

        dataModel.findById( findId, tofind, function (err, rest) {
            var ErrorObject = null;
            var ResultObject = null;
 
            if (err) {
                logger.debug("Failed to find record " + findId + ". Error name: " + err.name + " - " + err.message);

                 // Activity Log
                 iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13057', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, findId, err.name, err.message).resourceManager(interaction.connector.shortName).end();

                // Pass the error back to our caller
		ErrorObject = lbUtils.createLBError( err, 'iib-loopback-interaction', 'retrieve', 'Loopback Retrieve using Id failed', err.name, 'Retrieve', err.message );
            } else if (rest === null) {
                logger.debug("iibLBInteractionRetrieveById: No record found for id: " + findId);

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13056', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, findId).resourceManager(interaction.connector.shortName).end();
            } else {
                logger.debug("iibLBInteractionRetrieveById: Got result for id: " + findId);
                // logger.debug(JSON.stringify(rest));

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13056', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, findId).resourceManager(interaction.connector.shortName).end();

                // Pass the object back to our caller
                ResultObject = rest.toJSON();

                // If there is a set of fields to be removed then do so now
                if (Object.keys(negativeFields).length > 0) {
                    for (var element in negativeFields) {
                        delete ResultObject[element];
                    }
                }
            }
            callback(ErrorObject, ResultObject);
        });
    } else {
        logger.debug("Request to find filter: " + JSON.stringify(tofind));

        // And call loopback to perform the find. 
        dataModel.find( tofind, function (err, rest) {
            var ErrorObject = null;
            var ResultObject = null;
 
            if (err) {
                logger.debug("Failed to find record. Error name: " + err.name + " - " + err.message);

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13057', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, '', err.name, err.message).resourceManager(interaction.connector.shortName).end();

                // Pass the error back to our caller
                ErrorObject = lbUtils.createLBError( err, 'iib-loopback-interaction', 'retrieve', 'Loopback Retrieve failed', err.name, 'Retrieve', err.message);
            }
            else {
                logger.debug("iibLBInteractionRetrieve: Got " + rest.length + " record(s) returned");
                // logger.debug(JSON.stringify(rest));

                // Activity Log
                iib.ActivityLog.writeTraceEvent('iib-loopback-interaction', 'retrieve', 'BIP13056', interaction.connector.dataSourceName, 'Retrieve', requestProperties.object, '').resourceManager(interaction.connector.shortName).end();

                // Pass the object back to our caller
                ResultObject = [];
                for (var i=0; i < rest.length; i++) {
                    var localResult = rest[i].toJSON();

                    // If there is a set of fields to be removed then do so now
                    if (Object.keys(negativeFields).length > 0) {
                        for (var element in negativeFields) {
                            delete localResult[element];
                        }
                    }
             
                    ResultObject[i] = localResult;
                }
            }
            callback(ErrorObject, ResultObject);
        });
    }
}

//////////////////////////////////////////////////////////////////////////
// Export the factory class
module.exports = iibLBInteractionRetrieve;
