/**
 *
 * NAME: OperationCodes.js
 *
 * DECSRIPTION: OperationCodes
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

"use strict";

module.exports = {
  //initial state
  "OP_NO_OPERATION": 0,

  //tunnel set up
  "OP_TUNNEL_OPEN_REQUEST": 10,
  "OP_TUNNEL_OPEN_RESPONSE": 11,

  //for port forwarding
  "OP_ENDPOINT_OPEN": 20,
  "OP_ENDPOINT_SEND": 21,
  "OP_ENDPOINT_CLOSE": 22,
  "OP_ENDPOINT_ERROR": 23,
  "OP_ENDPOINT_REG": 24,
  "OP_ENDPOINT_UNREG": 25,

  //for callable flows
  "OP_CF_SEND_REQUEST": 31,
  "OP_CF_SEND_REPLY": 32,
  "OP_CF_SEND_ERROR": 33,
  //"OP_CF_CLOSE": 34, //?
  "OP_CF_REG_FLOW": 35,
  "OP_CF_UNREG_FLOW": 36,
  "OP_CF_REG_INVOKER": 37,
  "OP_CF_UNREG_INVOKER": 38,

  //message eyecatchers
  "IIB_EYE_CATCHER_J": "IIB_SIMPLON_J", //agent_c
  "IIB_EYE_CATCHER_K": "IIB_SIMPLON_K", //agent_p
  "IIB_EYE_CATCHER_X": "IIB_SIMPLON_X"  //agent_x
};
