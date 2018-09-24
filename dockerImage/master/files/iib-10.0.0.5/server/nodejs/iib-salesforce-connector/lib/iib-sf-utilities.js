
// NAME: createSFError
// DESCRIPTION: This helper function creates and returns an IIBError object
//              on behalf of the caller. In general the error created
//              is a BIP3858 however in the case of a timeout a BIP3867
//              is returned.

exports.createSFError = function(baseError, className, methodName, traceText) {
    var iib = require('ibm-integration-bus');

    // First see if we recognise this as a timeout
    var msgId;
    if ((typeof baseError.name !== 'undefined') &&
        (typeof baseError.message !== 'undefined') &&
        (baseError.name === 'Error') &&
        (baseError.message.match(/^Timeout/))) {
        msgId = 'BIP3867';
        traceText += ' TIMEOUT';
    }
    else {
        msgId = 'BIP3858';
    }

    // And create the iib.Error
    var args = [ null ];
    args.push(className);
    args.push(methodName);
    args.push(msgId);
    args.push(traceText);
    for (i = 4; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    return new (iib.Error.bind.apply(iib.Error, args))();
};

