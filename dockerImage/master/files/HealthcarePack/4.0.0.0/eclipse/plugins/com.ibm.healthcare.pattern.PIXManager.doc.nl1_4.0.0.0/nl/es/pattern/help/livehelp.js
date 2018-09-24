/* <copyright         */
/* notice="lm-source" */
/* pids="5725-C18"    */
/* years="2014"       */
/* crc="2853580753" > */
/* Licensed Materials - Property of IBM  */
/*                    */
/* 5725-C18           */
/*                    */
/* (C) Copyright IBM Corp. 2014 All Rights Reserved.  */
/* </copyright>       */


function runPatternLiveAction(pluginId, className, argument) {
	var encodedArg = encodeURIComponent(argument);
	var url = "livehelp/?pluginId=" + pluginId + "&class=" + className + 
		"&argument=" + encodedArg + "&sequence=" + Math.random();

	window.status = url; // This fires a status changed event..!
	
	// Has the event been handled?
	if (window.status.length > 0) {
		liveAction(pluginId, className, argument);
	}
}
