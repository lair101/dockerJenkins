/*
 * <copyright notice="oco-source" pids="5725-C18" years="2015" /> 
 */
require({cache:{
'healthcare/config':function(){
define(['dojo/i18n!healthcare/nls/web', 'dojo/_base/declare', 'webui/Trace'],
  function(NLS, declare, Trace ) {
   'use strict';

    var config = declare([], {
        // any methods?
    });


    //Set public properties

    // nls strings
    config.nls = NLS;
    // main selector config options
    config.selectorConfig = {
                titleString: NLS.title + ' ' + NLS.version,

                //Application specific monitoring
                applicationMonitoringTitle: NLS.applicationMonitoringTitle,
                //initialise contents of selector
                applicationMonitoring: [
                                        {widget: 'healthcare.widgets.ClinicalMonitoring'}
                                       ],

                //General operational monitoring
                //operationalMonitoringTitle: ... // If we wanted to override the title, we could...
                operationalMonitoring: [
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'XDSConsumer', patternDescription: NLS.XDSConsumerPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'FHIRTransformation', patternDescription: NLS.FHIRTransformationPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'HIPAAtoXML', patternDescription: NLS.HIPAAtoXMLPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'HL7toHL7DFDL', patternDescription: NLS.HL7toHL7DFDLPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'HL7toHL7', patternDescription: NLS.HL7toHL7Pattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'HomeHealth', patternDescription: NLS.HomeHealthPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'MedicalDevicesEMR', patternDescription: NLS.DevicesEMRPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'PIXManager', patternDescription: NLS.PIXManagerPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'PDQSupplier', patternDescription: NLS.PDQSupplierPattern}},
                                        {widget: 'webui.widgets.OperationalMonitoring', config: {patternId: 'WebDICOM', patternDescription: NLS.WebDICOMPattern}}
                                       ]
            };
    //Browser configs
    config.supportedBrowsers = [
                {'name': 'Google Chrome 31+', 'test': 'chrome', 'minimum': 31},
                {'name': 'Microsoft Internet Explorer 10', 'test': 'ie', 'minimum': 10},
                {'name': 'Microsoft Internet Explorer 11', 'test': 'trident', 'minimum': 7},
                {'name': 'Mozilla Firefox 24+', 'test': 'ff', 'minimum': 24},
                {'name': 'Apple Safari 7+', 'test': 'safari', 'minimum': 7}
            ];


    //now return our object
    return config;
});

},
'healthcare/widgets/ClinicalMonitoring':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="2472599907" > 
// IBM Confidential 
//  
// OCO Source Materials 
//  
// 5725-C18 
//  
// (C) Copyright IBM Corp. 2015 
//  
// The source code for the program is not published 
// or otherwise divested of its trade secrets, 
// irrespective of what has been deposited with the 
// U.S. Copyright Office. 
// </copyright> 
//

/**
 * The Clinical Application monitoring modules contains the {@link healthcare.webui.ClinicalMonitoring}
 * widget and some helper functions so it can be queried by {@link webui.widgets.Selector}
 * @module healthcare/widgets/ClinicalMonitoring
 * @See healthcare.widgets.OperationalMonitoring
 */

// @formatter:off
define([
  'dojo/i18n!healthcare/nls/web',
  'dojo/i18n!webui/nls/web',
  'dojo/text!./templates/ClinicalMonitoring.html',
  'dojo/domReady!',
  'dojo/_base/lang',
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/store/Memory',
  'dojo/dom-construct',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',

  'gridx/Grid',
  'gridx/core/model/cache/Sync',
  'gridx/modules/ColumnResizer',
  'gridx/modules/extendedSelect/Row',
  'gridx/modules/Tree',
  'gridx/modules/CellWidget',
  'gridx/modules/VirtualVScroller',
  'gridx/modules/TouchScroll',
  'gridx/modules/CellWidget',
  'gridx/modules/SingleSort',

  'idx/form/Link',

  'healthcare/clinicalAppUtils',

  'webui/BrokerStore',
  'webui/websocketManager',
  'webui/Trace'
], function(
    packNLS,
    NLS,
    TemplateHtml,
    ready,
    lang,
    declare,
    array,
    Store,
    domConstruct,

    WidgetBase,
    TemplatedMixin,

    Grid,
    Cache,
    ColumnResizer,
    SelectRow,
    Tree,
    CellWidget,
    VirtualVScroller,
    TouchScroll,
    CellWidget,
    SingleSort,

    Link,

    clinicalAppUtils,

    BrokerStore,
    websocketManager,
    Trace
    ) {
  // @formatter:on

  var widgetName = 'healthcare.widgets.ClinicalMonitoring';

  'use strict';
  /**
   * @class healthcare.widgets.clinicalMonitoring
   * @extends webui.widgets.AbstractWebuiWidget
   * @classdesc clinicalMonitoring is a widget for viewing data about connected clinical applications
   *
   *
   * The widget scans all deployed flows in order to find message flows that have the correct user-defined
   * properties (UDPs) set in order to track clinical application data. This is done via 
   * {@link module:healthcare/clinicalAppUtils.getClinicalApps}
   *
   * Once all flows with the UDPs have been identified, a gridx tree grid showing the clinical applications is
   * constructed, with source applications on the left, and associated destination applications on the right.
   * Links are provided to the {@link webui.widgets.OperationalMonitoring} view if it is part of a structured pattern.
   * 
   * A subscription is made to the JSON Resource Statistics topic, and statistics are updated in the appropriate cells
   * as they are received every 20 seconds.
   *
   * This class extends the abstract {@link webui.widgets.AbstractWebuiWidget} class
   *
   * @desc create a new Clinical Application Monitoring widget
   * @param {Object} kwArgs - default properties
   * @param {Object} urlOptions - override properties from URI (may not be sanitised)
   *
   * @desc Currently neither are used for any real purpose
   */
  var widget = declare([WidgetBase, TemplatedMixin], /** @lends healthcare.widgets.ClinicalMonitoring.prototype */ {

    // base vars
    widgetName: widgetName,
    templateString: TemplateHtml,

    //constructor properties
    //...

    // fill in template vars
    title: packNLS.applicationMonitoringTitle,
    baseClass: 'clinicalmonitoring',
    expandAllString: packNLS.expandAll,
    collapseAllString: packNLS.collapseAll,

    //widget anchors
    loadingIcon: null,
    //gridId: // grid target

    // other properties
    grid: null,
    store: null,
    structure: null,
    headerGroups: null,


    //see class jsdoc
    constructor: function(/*Object*/kwArgs, urlOptions ) {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'constructor', [kwArgs]);
      lang.mixin(this, kwArgs);

      var colWidth = '110px';
      var self = this;
      this.structure = [
        { id: 'col_inApp', field: 'inApp', name: packNLS.clinicalMonitoring_InApp, width: colWidth },
        { id: 'col_inOpen', field: 'inOpen', name: packNLS.clinicalMonitoring_InOpen, width: colWidth },
        { id: 'col_inFailed', field: 'inFailed', name: packNLS.clinicalMonitoring_InFailed, width: colWidth },
        { id: 'col_inMessages', field: 'inMessages', name: packNLS.clinicalMonitoring_InMessages, width: colWidth },
        { id: 'col_inAck', field: 'inAck', name: packNLS.clinicalMonitoring_InAck, width: '132px' },
        { id: 'col_patternInstance', field: 'patternDesc', name: packNLS.clinicalMonitoring_PatternInstance, width: '160px',
          'widgetsInCell': true,
          decorator: function() {
            return '<div data-dojo-attach-point="patternLink" data-dojo-type="idx/form/Link"></div>';
          },
          'setCellValue': function(gridData, storeData, cellWidget) {
            if (typeof gridData !== 'undefined') {
              cellWidget.patternLink.set('label', gridData);
            }
          },
          'getCellWidgetConnects': function(cellWidget, cell) {
            // return an array of connection arguments
            return [
              [cellWidget.patternLink, 'onClick', function(e) {self._viewPattern(cellWidget, cell, e);}]
            ];
          }
        },
        { id: 'col_outMessages', field: 'outMessages', name: packNLS.clinicalMonitoring_OutMessages, width: colWidth },
        { id: 'col_outAck', field: 'outAck', name: packNLS.clinicalMonitoring_OutAck, width: '132px' },
        { id: 'col_outOpen', field: 'outOpen', name: packNLS.clinicalMonitoring_OutOpen, width: colWidth },
        { id: 'col_outFailed', field: 'outFailed', name: packNLS.clinicalMonitoring_OutFailed, width: colWidth },
        { id: 'col_outApp', field: 'outApp', name: packNLS.clinicalMonitoring_OutApp, width: colWidth }
      ];
      
      this.brokerStore = BrokerStore.getBrokerStore();
      
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'constructor');
    },

    /** */
    postCreate: function() {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'postCreate');
          ;// Get a DOM node reference to the overall parent node of the widget itself
          ;// var domNode = this.domNode;
      var self = this;

      this.loadingIcon.title=NLS.loading;
      
      

      // Get a reference to a child node in a widget that will contain any other widgets that are defined outside of your widget definition.
      // var container = this.containerNode;
      clinicalAppUtils.getClinicalApps().then(function(clinicalAppsData) {
        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.ENTRY, 'postCreate.then');

        //TODO: override filter so we can do a proper tree filter
        // Tree filter needs to include any node which matches, and also the parents of that node
        // Probably only a quick filter
        self.store = new Store({
          data: clinicalAppsData,
          // summary:
          //          Check whether a row has child rows. This function should not throw any error.
          // id: String|Number
          //          The row ID
          // item: Object
          //          The store item
          // returns:
          //          True if the given row has children, false otherwise.
          //hasChildren: function(id, item) {
            // we should be very careful here, because hasChildren should not throw.
          //  return item && item.children && item.children.length;
          //},
          // summary:
          //          Get an array of the child items of the given row item.
          // item: Object
          //          The store item
          // returns:
          //          An array of the child items of the given row item.
          //getChildren: function(item) {
          //  return item.children;
          //}
        });

        self.grid = new Grid({
          store: self.store,
          structure: self.structure,
          cacheClass: Cache,
          bodyEmptyInfo: packNLS.clinicalMonitoring_NoValidPatternsMsg,
          modules: [
                        Tree,
                        VirtualVScroller,
                        TouchScroll,
                        ColumnResizer,
                        SelectRow,
                        CellWidget,
                        SingleSort
          ]
        });

        self.grid.placeAt(self.gridId);

        //setup stats callback
        self.brokerStore.getBroker().then(function(broker) {
          var subscription = websocketManager.subscribe("$SYS/Broker/" + broker.name + "/Statistics/JSON/Resource/#", function(message) {
            
            // Get integration server for this message
            var messageIntServer = message.destinationName.split("/")[6];
  
            // Remove that first key
            payloadObj = message.payloadObj.ResourceStatistics;
  
            // Update the "Last update at..." message
            //this._updateTimestampDiv();
  
            // Get resourceTypes so we can inspect node resource stats
            var resourceTypes = payloadObj.ResourceType;
                  
            // Inspect all the items in resourceTypes to look for items matching the TCPIP nodes that are
            // inside the HL7 nodes, so we can get the relevant information
            // For each connection, the details we want are extract from the resource stats and added to
            // the array that populates the grid
            for(var count = 0; count < resourceTypes.length; count++) {
              if(resourceTypes[count].name === 'TCPIPServerNodes') {
                var resourceIdentifiers = resourceTypes[count].resourceIdentifier;
                for(var count2 = 0; count2 < resourceIdentifiers.length; count2++) {
                  for(var count3 = 0; count3 < clinicalAppsData.length; count3++) {
                    // Go through the existing array of clinical applications, if the name in the array
                    // matches the name from the resource stats, and is for the corrent integration server
                    // then use this information to update the array
                    if(clinicalAppsData[count3].inConnection === resourceIdentifiers[count2].name && messageIntServer === clinicalAppsData[count3].intServer) {
                      clinicalAppsData[count3].inOpen = +resourceIdentifiers[count2].OpenConnections;
                      clinicalAppsData[count3].inFailed = +resourceIdentifiers[count2].FailedSSLConnections;
                      clinicalAppsData[count3].inMessages = +resourceIdentifiers[count2].MessagesReceived;
                      clinicalAppsData[count3].inAck = +resourceIdentifiers[count2].MessagesSent;
                    }
                  }
                }
              } else if(resourceTypes[count].name === 'TCPIPClientNodes') {
                var resourceIdentifiers = resourceTypes[count].resourceIdentifier;
                for(var count2 = 0; count2 < resourceIdentifiers.length; count2++) {
                  for(var count3 = 0; count3 < clinicalAppsData.length; count3++) {
                    // Again, go through the existing array of clinical applications, if the name in the array
                    // matches the name from the resource stats, , and is for the corrent integration server
                    // then use this information to update the array
                    if(clinicalAppsData[count3].outConnection === resourceIdentifiers[count2].name && messageIntServer === clinicalAppsData[count3].intServer) {
                      clinicalAppsData[count3].outOpen = +resourceIdentifiers[count2].OpenConnections;
                      clinicalAppsData[count3].outFailed = +resourceIdentifiers[count2].FailedConnections;
                      clinicalAppsData[count3].outMessages = +resourceIdentifiers[count2].MessagesSent;
                      clinicalAppsData[count3].outAck = +resourceIdentifiers[count2].MessagesReceived;
                    }
                  }
                }
              }
            }
  
            //This is enough for now, but if the table starts getting lots of updates, we want to do the updates above,
            //then batch together calls to the below so that we don't redraw the grid too often as it can be expensive!
            self.grid.model.clearCache();
            self.grid.model.store.setData(clinicalAppsData);
            self.grid.body.refresh();
          });
        });

        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.EXIT, 'postCreate.then');
      });

      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'postCreate');
    },

    /** */
    startup: function() {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'startup');
      var self = this;
      clinicalAppUtils.getClinicalApps().then(function() {
        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.ENTRY, 'startup.then');
        domConstruct.destroy(self.loadingIcon);
        self.grid.startup();
        
        if(self.gridId.offsetHeight < 200){
          Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.INFO, 'startup(): Got very small space for grid "'
            +self.gridId.offsetHeight+'" (probably on android/ios), forcing a new size');
          self.grid.resize({h:800});
        }

        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.EXIT, 'startup.then');
      });
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'startup');
    },

    /** */
    resize: function() {
      if (this.grid) {
        this.grid.resize();
      }
    },

    /** */
    uninitialize: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'uninitialize');
      Trace.trace(this.widgetName, Trace.levels.EXIT, 'uninitialize');
    },

    /** @private */
    _viewPattern: function(cellWidget, cell, e) {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_viewPattern', [cellWidget, cell, e]);

      window.selector.loadNewWidget('webui.widgets.OperationalMonitoring', {
        patternId: cell.row.item().patternName,
        patternInstance: cell.row.item().patternInstanceName
      });
      Trace.trace(this.widgetName, Trace.levels.EXIT, '_viewPattern');
    }

  });

  //
  // Static functions used by Selector
  //

  /**
   * @function getTitleString
   * @static
   * Used by {@link webui.widgets.Selector} to calculate the main splash page title string.
   * @param {Object} [config] - this widget doesn't use a config yet
   */
  widget.getTitleString = function(config) {
    Trace.trace(widgetName, Trace.levels.ENTRY, 'getTitleString', [config]);
    var ret = packNLS.applicationMonitoringTitle;
    Trace.trace(widgetName, Trace.levels.EXIT, 'getTitleString', [ret]);
    return ret;
  };

  return widget;

});


},
'healthcare/nls/web':function(){
// NLS_CHARSET=UTF-8
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="3156286945" > 
// IBM Confidential 
//  
// OCO Source Materials 
//  
// 5725-C18 
//  
// (C) Copyright IBM Corp. 2015 
//  
// The source code for the program is not published 
// or otherwise divested of its trade secrets, 
// irrespective of what has been deposited with the 
// U.S. Copyright Office. 
// </copyright> 
//
define({ root:
//begin v4.x content
({
    // START NON-TRANSLATABLE
    version: "4.0.0.0",
    // END NON-TRANSLATABLE
    
    //legal notice - this should match what we have in the installer
    legalText: "Licensed Materials - Property of IBM Corp. 5725-C18 © Copyright 2015 IBM Corporation. IBM and the IBM logo are trademarks of IBM Corporation, registered in many jurisdictions worldwide. This Program is licensed under the terms of the license agreement accompanying the Program. This license agreement may be either located in a Program directory folder or library identified as &quot;License&quot;, if applicable, or provided as a printed license agreement. Please read this agreement carefully before using the Program. By using the Program, you agree to these terms.",

    title: "Welcome to IBM Integration Bus Healthcare Pack",
    headerTitle: "IBM Integration Bus Healthcare Pack",
    applicationMonitoringTitle: "Clinical Application Monitoring",

    // Pattern names
    XDSConsumerPattern:        "Cross-Enterprise Document Sharing Consumer",
    FHIRTransformationPattern: "FHIR Transformation",
    HIPAAtoXMLPattern:         "HIPAA to XML",
    HL7toHL7DFDLPattern:       "HL7 to HL7 DFDL",
    HL7toHL7Pattern:           "HL7 to HL7",
    HomeHealthPattern:         "Home Health",
    DevicesEMRPattern:         "Medical devices to EMR",
    PIXManagerPattern:         "Patient Identifier Cross-reference Manager",
    PDQSupplierPattern:        "Patient Demographics Query Supplier",
    WebDICOMPattern:           "Web service to DICOM",
    UserDefinedPattern:        "User-defined",
    
    // CLINICAL MONITORING DATAGRID
    clinicalMonitoring_InApp:                  "Source Applications",
    clinicalMonitoring_InAppTooltip:           "Name of the source application",
    clinicalMonitoring_InOpen:                 "Open Inbound Connections",
    clinicalMonitoring_InOpenTooltip:          "Number of open connections between the source application and IBM Integration Bus (since you started the integration server)",
    clinicalMonitoring_InFailed:               "Rejected Inbound Connections",
    clinicalMonitoring_InFailedTooltip:        "Number of SSL connections between the source application and IBM Integration Bus that were rejected (since you started the integration server)",
    clinicalMonitoring_InMessages:             "Received Messages",
    clinicalMonitoring_InMessagesTooltip:      "Total number of messages received by IBM Integration Bus from the source application (since you started the integration server)",
    clinicalMonitoring_InAck:                  "Sent Acknowledgments",
    clinicalMonitoring_InAckTooltip:           "Total number of acknowledgments sent from IBM Integration Bus to the destination application (since you started the integration server)",
    clinicalMonitoring_PatternInstance:        "Pattern Instance",
    clinicalMonitoring_PatternInstanceTooltip: "Pattern instance that transforms and routes messages between the source application and the destination application (and the integration server to which it is deployed)",
    clinicalMonitoring_OutMessages:            "Sent Messages",
    clinicalMonitoring_OutMessagesTooltip:     "Total number of messages sent from IBM Integration Bus to the destination application (since you started the integration server)",
    clinicalMonitoring_OutAck:                 "Received Acknowledgments",
    clinicalMonitoring_OutAckTooltip:          "Total number of acknowledgments received by IBM Integration Bus from the destination application (since you started the integration server)",
    clinicalMonitoring_OutOpen:                "Open Outbound Connections",
    clinicalMonitoring_OutOpenTooltip:         "Number of open connections between IBM Integration Bus and the destination application (since you started the integration server).",
    clinicalMonitoring_OutFailed:              "Failed Outbound Connections",
    clinicalMonitoring_OutFailedTooltip:       "Number of connections that failed to connect between IBM Integration Bus and the destination application (since you started the integration server)",
    clinicalMonitoring_OutApp:                 "Destination Applications",
    clinicalMonitoring_OutAppTooltip:          "Name of the destination application",
    clinicalMonitoring_UnknownApp:             "Not Defined",
    clinicalMonitoring_Filter:                 "Filter:",
    clinicalMonitoring_FilterClear:            "Clear Filter",
    clinicalMonitoring_FilterResults:          "Showing filtered results",
    clinicalMonitoring_FilterNoResults:        "No results",
    clinicalMonitoring_OperationalLinkTooltip: "Open Operational Monitoring for this pattern instance in a new tab",
    clinicalMonitoring_NoValidPatternsMsg:     "There are no pattern instances deployed to this integration node that support connectivity between clinical applications. Deploy at least one pattern instance that supports clinical application connectivity, then reload this page.",
    clinicalMonitoring_Loading:                "Loading...",
    expandAll: "Expand all",
    collapseAll: "Collapse all"


}),
"de": true,
"es": true,
"fr": true,
"ja": true,
"pl": true,
"pt-br": true,
"tr": true,
"zh-cn": true,
"zh-tw": true
});

},
'healthcare/clinicalAppUtils':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2016" 
// crc="3421017990" > 
// IBM Confidential 
//  
// OCO Source Materials 
//  
// 5725-C18 
//  
// (C) Copyright IBM Corp. 2016 
//  
// The source code for the program is not published 
// or otherwise divested of its trade secrets, 
// irrespective of what has been deposited with the 
// U.S. Copyright Office. 
// </copyright> 
//

/**
 * @module healthcare/clinicalAppUtils
 * @desc A collection of Clinical Application utils which could be quite useful to several
 * Clinical Application widgets
 */

// @formatter:off
define(
    [
      'dojo/i18n!healthcare/nls/web',
      'dojo/i18n!webui/nls/web',
      'dojo/_base/declare',
      'dojo/_base/array',
      'dojo/_base/lang',
      'dojo/promise/all',

      'webui/Trace'
    ],
    function(
    packNLS,
    NLS,
    declare,
    array,
    lang,
    all,

    Trace
    ) {
      // @formatter:on
      'use strict';
      var widgetName = 'healthcare.clinicalAppUtils';

      // ////////////
      // Public methods (exported at end of file)
      // ///////////



     /** Queries all deployed flows to find ones with the right user-defined properties to detail clinical applications
      *
      * A promise for an Array of {node: node, tag: "asd"} objects, where node is the node object the tag is on,
      * and the tag is the / separated tag hierarchy, leading with the server uri (encoded with encodeURIComponent())
      * @return {external:Promise} clinicalAppsData - An array of connected clinical applications
      * @function getClinicalApps
      * @static
      */
      function getClinicalApps() {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'getClinicalApps');
        var ret = window.selector.brokerStore.getAllMessageFlows({
          'loadDesign': true,
          'loadProperties' : true
        }).then(function(flows ) {
          Trace.trace(widgetName, Trace.levels.ENTRY, 'getClinicalApps.then', [flows]);
          var promises = [];
          var clinicalAppsData = [];
          var foundSupportedPattern = false;
          var flowsReturned = 0;
          // For each message flow, get the UDPs
          array.forEach(flows, function(flow ) {
            var promise = flow.getFlowDesign().then(function(flowDesign ) {
              var userDefinedProperties = flowDesign.userDefinedProperties;
              
              flowsReturned++;
                var foundTCPIPNode = false;
                for(var count = 0; count < userDefinedProperties.length; count++) {
                  if(userDefinedProperties[count].name === 'Identifier1') {
                    var identifier1 = userDefinedProperties[count].value;
                  } else if(userDefinedProperties[count].name === 'Identifier2') {
                    var identifier2 = userDefinedProperties[count].value;
                  } else if(userDefinedProperties[count].name === 'Identifier3') {
                    var identifier3 = userDefinedProperties[count].value;
                  } else if(userDefinedProperties[count].name === 'TCPIPNode') {
                    foundTCPIPNode = true;
                    foundSupportedPattern = true;
                    var nodeConnection = userDefinedProperties[count].value.split("/")[1];
                  }
                }
              
              // If a flow has the TCPIPNode UDP, then we can use it in our table
              if(foundTCPIPNode === true) {
                  // Now get the long description for this flow
                  var promise2 = flow.getFlowProperties().then(function(flowProperties ) {
                    var patternName = flowProperties.customDescProperties.PatternName;
                    var intServer = flow.parentEG.name;
                    // Use this UDP to determine if this flow is related to the source or destination application
                    if(identifier2 === 'Source') {
                      var rowExists = false;
                      // Iterate the existing array to see if there are any existing destination apps for this
                      // pattern instance to which we can add source app details
                      for(count = 0; count < clinicalAppsData.length; count++) {
                        if(clinicalAppsData[count].patternDesc === (identifier1 + " (" + intServer + ")") && clinicalAppsData[count].patternName === patternName) {
                          clinicalAppsData[count].inApp = identifier3;
                          clinicalAppsData[count].inConnection = nodeConnection;
                          rowExists = true;
                        }
                      }
                      // If there are no destination apps for this pattern instance, create a new row
                      if(rowExists === false) {
                        clinicalAppsData.push({
                          flowname: flow.name,
                          patternInstanceName: identifier1,
                          patternDesc: identifier1 + " (" + intServer + ")",
                          patternName: patternName,
                          inApp: identifier3,
                          inConnection: nodeConnection,
                          outApp: packNLS.clinicalMonitoring_UnknownApp,
                          intServer: intServer,
                          placeholder: true,
                          id: clinicalAppsData.length
                        });
                      }
                    } else if(identifier2 === 'Destination') {
                      var rowExists = false;
                      // Iterate the existing array to see if there are any existing source apps for this
                      // pattern instance to which we can add destination app details
                      for(count = 0; count < clinicalAppsData.length; count++) {
                        if(clinicalAppsData[count].patternDesc === (identifier1 + " (" + intServer + ")") && clinicalAppsData[count].patternName === patternName) {
                          if(clinicalAppsData[count].placeholder) {
                            clinicalAppsData[count].outApp = identifier3;
                            clinicalAppsData[count].outConnection = nodeConnection;
                            clinicalAppsData[count].placeholder = false;
                          } else {
                            clinicalAppsData.push({
                              flowname: flow.name,
                              inApp: clinicalAppsData[count].inApp,
                              inConnection: clinicalAppsData[count].inConnection,
                              patternInstanceName: identifier1,
                              patternDesc: identifier1 + " (" + intServer + ")",
                              patternName: patternName,
                              outApp: identifier3,
                              outConnection: nodeConnection,
                              intServer: intServer,
                              id: clinicalAppsData.length
                            });
                          }
                          rowExists = true;
                          break;
                        }
                      }
                      // If there are no source apps for this pattern instance, create a new row
                      if(rowExists === false) {
                        clinicalAppsData.push({
                          flowname: flow.name,
                          inApp: packNLS.clinicalMonitoring_UnknownApp,
                          patternInstanceName: identifier1,
                          patternDesc: identifier1 + " (" + intServer + ")",
                          patternName: patternName,
                          outApp: identifier3,
                          outConnection: nodeConnection,
                          intServer: intServer,
                          id: clinicalAppsData.length
                        });
                      }
                    }
                  });
                }
              
            });
            promises.push(promise);
          });
          //now that we have all flows and all tags, return the final array
          var allPromised = all(promises).then(function(results ) {
            Trace.trace(widgetName, Trace.levels.ENTRY, 'getClinicalApps.then.all.then', [results]);
            Trace.trace(widgetName, Trace.levels.EXIT, 'getClinicalApps.then.all.then', [clinicalAppsData]);
            return clinicalAppsData;
          });
          Trace.trace(widgetName, Trace.levels.ENTRY, 'getClinicalApps.then', [allPromised]);
          return allPromised;
        });
        Trace.trace(widgetName, Trace.levels.EXIT, 'getClinicalApps', [ret]);
        return ret;
      }





      // ////////////
      // Private methods
      // ///////////


      //return static public functions
      return {
        getClinicalApps: getClinicalApps
      };


    });

},
'url:healthcare/widgets/templates/ClinicalMonitoring.html':"<div id=\"_id\" class=\"clinicalmonitoring main\" data-dojo-attach-point='selectorDijitId'>\r\n\r\n    <h1>${title}</h1>\r\n    <div data-dojo-attach-point='gridId' class=\"gridxContainer\">\r\n        <div class=\"${baseClass} toolbar\">\r\n             <!-- <button class=\"${baseClass} toolbar_icon expand_all\" data-dojo-attach-event=\"onclick: expandAll\">\r\n                 ${expandAllString}</button>\r\n             <button class=\"${baseClass} toolbar_icon collapse_all\" data-dojo-attach-event=\"onclick: collapseAll\">\r\n                 ${collapseAllString}</button> -->\r\n             <div data-dojo-attach-point='loadingIcon' class=\"widget loadingIcon\"></div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n",
'*now':function(r){r(['dojo/i18n!*preload*healthcare/nls/main*["de","es","fr","ja","pl","pt-br","tr","zh-cn","zh-tw"]']);}
}});
/* stub file - replaced during build */
