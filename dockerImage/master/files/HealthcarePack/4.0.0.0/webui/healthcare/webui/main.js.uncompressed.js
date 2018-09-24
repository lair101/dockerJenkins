/*
 * <copyright notice="oco-source" pids="5725-C18" years="2015" /> 
 */
require({cache:{
'webui/widgets/OperationalMonitoring':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="944112584" > 
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
 * The operational monitoring modules contains the {@link webui.widgets.OperationalMonitoring} widget
 * and some helper functions so it can be queried by {@link webui.widgets.Selector}
 * @module webui/widgets/OperationalMonitoring
 * @See webui.widgets.OperationalMonitoring
 */
// @formatter:off
define([
  'dojo/i18n!webui/nls/web',
  'dojo/text!./templates/OperationalMonitoring.html',
  'dojo/_base/lang',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/string',
  'dojo/dom-construct',
  'dojo/date/locale',
  'dojo/store/Memory',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/form/Button',

  'idx/form/buttons',
  'idx/form/Link',

  'gridx/Grid',
  'gridx/core/model/cache/Sync',
  'gridx/modules/ColumnResizer',
  'gridx/modules/VirtualVScroller',
  'gridx/modules/TouchScroll',
  'gridx/modules/Filter',
  'gridx/modules/filter/QuickFilter',
  'gridx/modules/SingleSort',
  'gridx/modules/CellWidget',

  'webui/BrokerStore',
  'webui/websocketManager',
  'webui/Trace'
], function(
    NLS,
    TemplateHtml,
    lang,
    array,
    declare,
    string,
    domConstruct,
    locale,
    Store,

    WidgetBase,
    TemplatedMixin,
    Button,

    idx_buttons,
    Link,

    Grid,
    Cache,
    ColumnResizer,
    VirtualVScroller,
    TouchScroll,
    Filter,
    QuickFilter,
    SingleSort,
    CellWidget,


    BrokerStore,
    websocketManager,
    Trace
    ) {
  // @formatter:on

  var widgetName = 'webui.widgets.OperationalMonitoring';

  'use strict';
  /**
   * @class webui.widgets.OperationalMonitoring
   * @extends webui.widgets.AbstractWebuiWidget
   *
   * @classdesc Operational Monitoring is a widget for viewing an instance of a pattern.
   * The flows in the pattern need to be tagged with the right pattern id/name/instance properties
   * so we can find them.
   *
   * Once a pattern instance has been selected via {@link webui.widgets.Selector} and
   * an OperationalMonitoring instance created, this widgets shows all flows which are part
   * of that pattern, and their place in the deployment, as well as message rate and approximate
   * last message time
   *
   * Live stats are provided via {@link module:webui/websocketManager}
   *
   * This class extends the abstract {@link webui.widgets.AbstractWebuiWidget} class
   *
   * @desc create a new Operational Monitoring widget. One of kwargs or urlOptions must be provided
   * @param {Object} [kwArgs]                        - Options provided from existing widget config
   * @param {String} [kwArgs.patternDescription]     - descriptive name of the pattern instance
   * @param {String} kwArgs.patternId                - ID of the pattern
   * @param {String} kwArgs.patternInstance          - Instance name of the pattern
   * @param {Object} [urlOptions]                    - Options as provided from direct url (may not be sanitised)
   * @param {String} [urlOptions.patternDescription] - descriptive name of the pattern instance
   * @param {String} urlOptions.patternId            - ID of the pattern
   * @param {String} urlOptions.patternInstance      - Instance name of the pattern
   * */
  var widget = declare([WidgetBase, TemplatedMixin], /** @lends webui.widgets.OperationalMonitoring.prototype */{

    // base vars
    widgetName: widgetName,
    templateString: TemplateHtml,

    //constructor properties
    patternDescription: null,
    patternId: null,
    patternIntance: null,

    // fill in template vars
    titleString: '',//set explicitly in constructor

    //widget anchors
    loadingIcon: null,

    //member variables
    grid: null,
    store: null,
    structure: null,
    brokerStore: null,
    subscriptions: null,


    // See main class jsdoc
    constructor: function(/*Object*/kwArgs, urlOptions ) {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'constructor', [kwArgs]);
      this.widgetName += ' (' + this.id + ')';
      lang.mixin(this, kwArgs);

      //Check we have all options set, if not load them from the urlOptions as an override. Have to be careful though as urlOptions
      //cloud be an attempt at XSS
      this.patternDescription = this.patternDescription || urlOptions.patternDescription;
      this.patternInstance = this.patternInstance || urlOptions.patternInstance;
      this.patternId = this.patternId || urlOptions.patternId;

      //If we have no patternInstance or patternId and exception should get thrown, caught by Selector and the main page shown

      if(!this.patternDescription){
        //set a default
        this.patternDescription = this.patternId;
        //search config from selector to see if we have a widget name available
        array.forEach(window.selector.operationalMonitoring, function(OpMonWidgetInstance){
          if(OpMonWidgetInstance.config.patternId === this.patternId){
            this.patternDescription = OpMonWidgetInstance.config.patternDescription;
          }
        }, this);
      }

      this.titleString = string.substitute(NLS.operationalMonitoringTitleString, [this.patternDescription, this.patternInstance]);
      this.subscriptions = [];

      var colWidth = 'auto';
      var self = this;
      this.structure = [
        { id: 'col_eg', field: 'egName', name: NLS.operationalMonitoringIntegrationServerHeaderTitle, width: colWidth },
        { id: 'col_container', field: 'containerName', name: NLS.operationalMonitoringContainerHeaderTitle, width: colWidth,
          formatter: function(row) { return "<a href='" + row._flowObj.parentContainer.statsHref + "' aria-label='" + row.containerName + "' role='gridcell'>" + row.containerName + '</a>';}
        },
        { id: 'col_flow', field: 'flowName', name: NLS.operationalMonitoringMessageFlowHeaderTitle, width: colWidth,
          formatter: function(row) {return "<a href='" + row._flowObj.statsHref + "'>" + row.flowName + '</a>';}
        },
        { id: 'col_stats', field: 'stats', name: NLS.operationalMonitoringChangeStatsHeaderTitle, width: '100px',
          // Need to use two widgets here. A button to allow stats to be turned on or off, and a link just to hold text if the flow is stopped.
          // We need to explicitly show one and hide the other whenever we refresh the grid.
          'widgetsInCell': true, decorator: function() {return "<div  data-dojo-type='dijit/form/Button' data-dojo-props=\"profile: 'compact'\""
                                                             + " data-dojo-attach-point='statsButton'></div>"
                                                             + "<div data-dojo-type='idx/form/Link' data-dojo-attach-point='statsText'></div>";},
          'setCellValue': function(gridData, storeData, cellWidget) {
            if (gridData === 'statsOn') {
              cellWidget.statsButton.setLabel(NLS.operationalMonitoringStatsOn);
              cellWidget.statsButton.domNode.style.display = 'block';
              cellWidget.statsText.domNode.style.display = 'none';
            }else if(gridData === 'statsOff') {
              cellWidget.statsButton.setLabel(NLS.operationalMonitoringStatsOff);
              cellWidget.statsButton.domNode.style.display = 'block';
              cellWidget.statsText.domNode.style.display = 'none';
            }else{
              cellWidget.statsText.set('label',NLS.operationalMonitoringFlowOrParentStopped);
              cellWidget.statsText.set('disabled',true);
              cellWidget.statsButton.domNode.style.display = 'none';
              cellWidget.statsText.domNode.style.display = 'block';
            }
          },
          getCellWidgetConnects: function(cellWidget, cell) {
            // return an array of connection arguments
            return [
              [cellWidget.statsButton, 'onClick', function(e) {self._toggleStatsButtonCB(cellWidget, cell, e);}]
            ];
          }
        },
        { id: 'col_inputNodes', field: 'inputNodeNames', name: NLS.operationalMonitoringInputFlowNodesHeaderTitle, width: colWidth },
        { id: 'col_rate', field: 'rate', name: NLS.operationalMonitoringRateHeaderTitle, width: colWidth },
        { id: 'col_lastUpdate', field: 'lastUpdate', name: NLS.operationalMonitoringLastUpdateHeaderTitle, width: colWidth,
          formatter: function(row){
            if(row.lastUpdate){
              return locale.format(row.lastUpdate, {formatLength: 'long'});
            }else{
              return "-";
            }
          }
         }
      ];

      this.brokerStore = BrokerStore.getBrokerStore();

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'constructor');
    },

    /** */
    postCreate: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'postCreate');
      // Get a DOM node reference to the overall parent node of the widget itself
      // var domNode = this.domNode;

      // Get a reference to a child node in a widget that will contain any other widgets that are defined outside of your widget definition.
      // var container = this.containerNode;

      this.loadingIcon.title=NLS.loading;

      var self = this;
      this.brokerStore.getContentsOfPatternInstance(this.patternId, this.patternInstance).then(function(patternContents) {
        var data = self._buildGridData(patternContents);
        self.store = new Store({'data': data});

        self.grid = new Grid({
          'store': self.store,
          'structure': self.structure,
          'cacheClass': Cache,
          'modules': [
            VirtualVScroller,
            ColumnResizer,
            TouchScroll,
            Filter,
            QuickFilter,
            SingleSort,
            CellWidget
          ]
        });
        self.grid.placeAt(self.gridId);
      });
      websocketManager.connect();

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'postCreate');
    },

    /** */
    startup: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'startup');

      var mqtt = websocketManager.connect();

      var self = this;
      this.brokerStore.getContentsOfPatternInstance(this.patternId, this.patternInstance).then(function() {
        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.ENTRY, 'startup.then');
        domConstruct.destroy(self.loadingIcon);
        self.grid.startup();

        // 4297
        if(self.gridId.offsetHeight < 200){
          Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.INFO, 'startup(): Got very small space for grid "'
            +self.gridId.offsetHeight+'" (probably on android/ios), forcing a new size');
          self.grid.resize({h:800});
        }

        Trace.trace(self.widgetName + ' (' + self.id + ')', Trace.levels.EXIT, 'startup.then');
      });

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'startup');
    },

    uninitialize: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'uninitialize');

      array.forEach(this.subscriptions, function(sub) {
        websocketManager.unsubscribe(sub);
      });

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'uninitialize');
    },

    /** */
    resize: function() {
      if (this.grid) {
        this.grid.resize();
      }
    },

    /** @private
     * @desc Attempt to turn stats on or off for a given flow as called from gridX grid
     * @param {Object} cellWidget
     * @param {Object} cell
     * @param {Object} event
     */
    _toggleStatsButtonCB: function(cellWidget, cell, e) {
      Trace.trace(widgetName, Trace.levels.EXIT, '_toggleStatsButtonCB', [cellWidget, cell, e]);
      var rowStoreObj = cell.grid.store.get(cell.row.id);
      //reflect action by disabling button
      cellWidget.statsButton.setDisabled(true);
      //Turning off stats
      if (rowStoreObj.stats == 'statsOn') {
        rowStoreObj.stats = 'statsOff';
        //strip previous values
        rowStoreObj.rate = '-';
        rowStoreObj.lastUpdate = null;
        //try and refresh grid
        this.grid.model.clearCache();
        this.grid.body.refresh();
        //now actually do turn off
        rowStoreObj._flowObj.setSnapshotStatistics('off').then(function() {
          cellWidget.statsButton.setLabel(NLS.operationalMonitoringStatsOff);
          cellWidget.statsButton.setDisabled(false);
        });
      }
      //Turning on stats
      else if( rowStoreObj.stats == 'statsOff'){
        rowStoreObj.stats = 'statsOn';
        rowStoreObj._flowObj.setSnapshotStatistics('on').then(function() {
          cellWidget.statsButton.setLabel(NLS.operationalMonitoringStatsOn);
          cellWidget.statsButton.setDisabled(false);
        });
      }
      Trace.trace(widgetName, Trace.levels.EXIT, '_toggleStatsButtonCB');
    },

    /**
     * @desc take an array of flows which are part of this pattern and build up grid store
     * @param {Object[]} flows
     * @returns {Object} data - data for use in a gridx store
     * @private
     */
    _buildGridData: function(flows) {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_buildGridData', [flows]);

      var self = this;
      var data = [];
      array.forEach(flows, function(flow ) {
        var row = {};

        row.id = flow.flow.uri;
        row.egName = flow.flow.parentEG.name;
        row.containerName = flow.flow.getContainerName();
        row.flowName = flow.flow.name;
        // Need to be a bit more complex for stats field, as it is also going to reflect whether the flow is stopped as the widget has to
        // be different in that case.
        if(flow.flow.isRunning){
          if( flow.flow.snapshotStatistics.enabled && flow.flow.snapshotStatistics.nodeLevel === 'basic'){
            row.stats = 'statsOn';
          }else{
            row.stats = 'statsOff';
          }
        }else{
          row.stats = 'flowNotRuning';
        }
        row.inputNodeNames = (this._getInputNodes(flow.design)).join('<br>');
        row.rate = '-';
        row.lastUpdate;

        // extra data for widgets/callbacks
        row._flowObj = flow.flow;

        data.push(row);

        //setup stats callback
        var subscription = websocketManager.subscribe(flow.flow.snapshotTopic, function(stats) {
          //Don't bother updating a row if we aren't supposed to be displaying it
          if (!row.stats) {
            return;
          }
          row.rate = 0;
          var msgCount = stats.payloadObj.WMQIStatisticsAccounting.MessageFlow.TotalInputMessages;
          var time = self._calcStatsInterval(stats.payloadObj.WMQIStatisticsAccounting.MessageFlow);

          if (time !== 0) {
            row.rate = ( msgCount / time * 1000).toFixed(2);
          }

          if (msgCount !== 0) {
            row.lastUpdate = self._parseStatsEndTime(stats.payloadObj.WMQIStatisticsAccounting.MessageFlow);
          }

          //This is enough for now, but if the table starts getting lots of updates, we want to do the updates above,
          //then batch together calls to the below so that we don't redraw the grid too often as it can be expensive!
          self.grid.model.clearCache();
          self.grid.model.store.setData(data);
          self.grid.body.refresh();
        });
        //store subscription for unsubscribe
        this.subscriptions.push(subscription);

      },this);

      Trace.trace(this.widgetName, Trace.levels.EXIT, '_buildGridData', [data]);
      return data;
    },

    /** Parse a message flow to find any nodes which are considered an input node
     * @param {Object} flowDesign
     * @return {string[]} - array of input node names
     * @private
     */
    _getInputNodes: function(flowDesign) {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_getInputNodes', [flowDesign]);
      var inputNodes = [];
      array.forEach(flowDesign.nodes, function(node ) {
        if (node.type.search(/InputNode$/) !== -1 || node.type === 'ComIbmTimeoutNotificationNode') {
          inputNodes.push(node.name);
        }
      });
      Trace.trace(this.widgetName, Trace.levels.EXIT, '_getInputNodes', [inputNodes]);
      return inputNodes;
    },

    /** Parses the stats end time from the stats data
     * @TODO after v10(?) we should be able to get a proper UTC timestamp for the stats fields.
     * Currently we don't really know the timezone of this data :/
     * @param {Object} msgflowStatsObj - stats object from WMQIStatisticsAccounting.MessageFlow
     * @return {Date} - stats end time
     * @private
     */
    _parseStatsEndTime: function(flowStatsData) {
      Trace.trace(widgetName, Trace.levels.EXIT, '_parseStatsEndTime', [flowStatsData]);
      var time;
      var periodIndex = flowStatsData.EndTime.indexOf('.');
      var numMicros = flowStatsData.EndTime.substring(periodIndex, flowStatsData.EndTime.length).length - 1;
      //microseconds could be 3 or 6 digits, so trim time string
      if (numMicros >= 3) {
        var flowEndTimeString = flowStatsData.EndDate + ' ' + flowStatsData.EndTime.substring(0, periodIndex + 4);
        var time = locale.parse(flowEndTimeString + ' ' + flowStatsData.TimezoneName, {
          datePattern: 'yyyy-M-d H:m:s.SSS vz',
          selector: 'date'
        });
      }else { // in case we ever have <3 milliseconds
        var flowEndTimeString = flowStatsData.EndDate + ' ' + flowStatsData.EndTime.substring(0, periodIndex);
        var time = locale.parse(flowEndTimeString + ' ' + flowStatsData.TimezoneName, {
          datePattern: 'yyyy-M-d H:m:s vz',
          selector: 'date'
        });
      }
      Trace.trace(widgetName, Trace.levels.EXIT, '_parseStatsEndTime', [time]);
      return time;
    },

    /** Parses the stats start time from the stats data
     * @TODO after v10(?) we should be able to get a proper UTC timestamp for the stats fields.
     * Currently we don't really know the timezone of this data :/
     * @param {Object} msgflowStatsObj - stats object from WMQIStatisticsAccounting.MessageFlow
     * @return {Date} - stats start time
     * @private
     */
    _parseStatsStartTime: function(flowStatsData) {
      Trace.trace(widgetName, Trace.levels.EXIT, '_parseStatsStartTime', [flowStatsData]);
      var time;
      var periodIndex = flowStatsData.StartTime.indexOf('.');
      var numMicros = flowStatsData.StartTime.substring(periodIndex, flowStatsData.StartTime.length).length - 1;
      //microseconds could be 3 or 6 digits, so trim time string
      if (numMicros >= 3) {
        var flowStartTimeString = flowStatsData.StartDate + ' ' + flowStatsData.StartTime.substring(0, periodIndex + 4);
        var time = locale.parse(flowStartTimeString + ' ' + flowStatsData.TimezoneName, {
          datePattern: 'yyyy-M-d H:m:s.SSS vz',
          selector: 'date'
        });
      }else { // in case we ever have <3 milliseconds
        var flowStartTimeString = flowStatsData.StartDate + ' ' + flowStatsData.StartTime.substring(0, periodIndex);
        var time = locale.parse(flowStartTimeString + ' ' + flowStatsData.TimezoneName, {
          datePattern: 'yyyy-M-d H:m:s vz',
          selector: 'date'
        });
      }
      Trace.trace(widgetName, Trace.levels.EXIT, '_parseStatsStartTime', [time]);
      return time;
    },

    /** Calculate stats interval in milliseconds
     * @param {Object} msgflowStatsObj - stats object from WMQIStatisticsAccounting.MessageFlow
     * @return int - stats window in milliseconds
     * @private
     */
    _calcStatsInterval: function(statsObj){
      Trace.trace(widgetName, Trace.levels.EXIT, '_calcStatsInterval', [statsObj]);
      var period = Number(this._parseStatsEndTime(statsObj) - this._parseStatsStartTime(statsObj));
      Trace.trace(widgetName, Trace.levels.EXIT, '_parseStatsStartTime', [period]);
      return period;
    }


  }); // end of widget

  //
  // Static functions used by Selector
  //

  /**
   * Used by {@link webui.widgets.Selector} to calculate the main splash page title strings for a specific pattern instance.
   * @param {webui.widgets.OperationalMonitoring~config} config - config chunk for a pattern to operationally monitor instances of this pattern
   * @function getTitleString
   * @static
   */
  widget.getTitleString = function(config) {
    Trace.trace(widgetName, Trace.levels.ENTRY, 'getTitleString', [config]);
    var ret = config.patternDescription;
    Trace.trace(widgetName, Trace.levels.EXIT, 'getTitleString', [ret]);
    return ret;
  };

  /**
   * Used by {@link webui.widgets,Selector} to find instances of our pattern to show in the dropdown
   * @param {webui.widgets.OperationalMonitoring~config} config - config chunk for a pattern to operationally monitor instances of this pattern
   * @static
   * @function getItemSelections
   */
  widget.getItemSelections = function(config) {
    Trace.trace(widgetName, Trace.levels.ENTRY, 'getItemSelections', [config]);
    var ret = window.selector.brokerStore.getInstancesOfPattern(config.patternId);
    Trace.trace(widgetName, Trace.levels.EXIT, 'getItemSelections', [ret]);
    return ret;
  };

   /**
   * The config use for Operational Monuitoring is as follows
   * @typedef {Object} webui.widgets.OperationalMonitoring~config
   * @property {string} patternDescription - Human readable description of the pattern
   * @property {string} patternId - The pattern identifier which represents this pattern
   */


  return widget;
});

},
'webui/widgets/Selector':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="2522403922" > 
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
// @formatter:off
define([
  'dojo/i18n!webui/nls/web',
  'dojo/text!./templates/Selector.html',
  'dojo/_base/lang',
  'dojo/on',
  'dojo/_base/array',
  'dojo/_base/declare',
  'dojo/dom-construct',
  'dojo/io-query',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dijit/form/Button',

  'idx/form/Select',
  'idx/form/buttons',

  'webui/BrokerStore',
  'webui/widgets/OperationalMonitoring',

  'webui/Trace'
], function(
    NLS,
    TemplateHtml,
    lang,
    on,
    array,
    declare,
    domConstruct,
    ioQuery,

    WidgetBase,
    TemplatedMixin,
    Button,

    Select,
    idxformbuttons,

    BrokerStore,
    OperationalMonitoring,

    Trace
    ) {
  // @formatter:on
  'use strict';
  /**
   * @class webui.widgets.Selector
   * @classdesc This widget is a main controller and entry page for a pack webui
   *
   * This widget is responsible for setting up the main selector page as a structured page. It sets links to start up a widget
   * and has a {@Link webui.widgets.Selector#loadNewWidget} call to allow the developer to explicitly load a widget. It will also setup a global resize handler and call
   * the current widgets resize() method.
   *
   * Selector detects back/forward button presses and browser "hash" url changes using html5 and is handled by {@Link webui.widgets.Selector#_onHistoryChangeHandler}
   *
   * This widget is supposed to only be constructed once, and it stores itself as a global. You should probably never try and destroy it
   *
   * When a new widget is loaded/started via {@link loadNewWidget} it is passed two parameters to the constructor.
   * The first parameter is the explicit configuration that this widget knows about, and will come from the config file where possible. The
   * second one is where we may not know the config correctly or not have it at all, such as when invoked via a URL.
   * In this case the second parameters may be used by the widget, but extra care must be taken as these values come
   * straight from the user, so could contain XSS attemps
   *
   *
   *
   * @desc create a new Selector instance.
   *
   * Selector currently supports {@link webui.widgets.OperationalMonitoring} and an application monitoring section (e.g. {@link healthcare.widgets.ClinicalMonitoring} ).
   * If a config is supplied for either of these sections
   *
   * in the constructor, then that section is shown. Each section has its own config
   *
   * @param {Object} Config
   * @param {String} Config.titleString                    - Top level heading to display on selector
   * @param {String} [Config.applicationMonitoringTitle]   - title for application monitoring section (optional)
   * @param {Object[]} [Config.applicationMonitoring]      - widgets to show. If empty, no widgets are shown
   * @param {String} [Config.applicationMonitoring.widget] - widget name to include in application monitoring section
   * @param {String} [Config.operationalMonitoringTitle]   - title for oparational monitoring section (optional)
   * @param {Object[]} [Config.operationalMonitoring]      - widgets to show. If empty, no widgets are shown
   * @param {String} Config.operationalMonitoring.widget   -  title for this operational monitoring row
   * @param {webui.widgets.OperationalMonitoring~config} Config.operationalMonitoring.config - Configuration for this Operational Monitoring row
   *
   * @example
   *     new Selector(
   *     { titleString: NLS.title + ' ' + NLS.version, //set our title
   *
   *       //Application specific monitoring
   *       applicationMonitoringTitle: NLS.applicationMonitoringTitle,
   *       //initialise contents of selector
   *       applicationMonitoring: [
   *           {widget: 'healthcare.widgets.ClinicalMonitoring'}
   *       ],
   *
   *       //General operational monitoring
   *       //operationalMonitoringTitle: ... // If we wanted to override the title, we could...
   *       operationalMonitoring: [
   *           {widget: 'webui.widgets.OperationalMonitoring',
   *           config: {patternId: 'FactoryPublication', patternDescription: 'Factory Publication'}}
   *       ]
   *      });
   *
   */
  var Selector = declare([WidgetBase, TemplatedMixin], /** @lends webui.widgets.Selector.prototype */{

    // base vars
    widgetName: 'webui.widgets.Selector',
    templateString: TemplateHtml,

    //constructor properties
    /** @member {Object[]}  webui.widgets.Selector#applicationMonitoring
     * Config for the application monitoring view as supplied to the constructor. Currently no
     * structure is required
     * */
    applicationMonitoring: [],
    /** @member {Object[]}  webui.widgets.Selector#operationalMonitoring
     * Config for the operational monitoring view as supplied to the constructor. This has a specific
     * structure, see the top of the page.
     * This might be useful if your widget was invoked directly via a URL and Selector isn't sure how
     * to choose which config to pass to it, so the widget itself can look up available configs
     * and see if one is a match
     * */
    operationalMonitoring: [],

    // fill in template vars
    titleString: '',
    applicationMonitoringTitle: NLS.selectorApplicationMonitoring,
    //applicationMonitoringAttach - li tag base
    operationalMonitoringTitle: NLS.selectorOperationalMonitoring,
    operationalMonitoringDesc: NLS.selectorOperationalMonitoring_Desc,
    //operationalMonitoringAttach - table tag base


    //member variables
    brokerStore: null,
    currentWidget: null,
    ourNodes: null,
    knownWidgets: [], // populated in constructor with all 'widget' fields from options

     /** Globally avaliable {@link webui.widgets.Selector}
      * @global
      */
    selector: null,


    //see main class jsdoc
    constructor: function(/*Object*/kwArgs ) {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'constructor', [kwArgs]);
      this.widgetName += ' ('+ this.id + ')';
      lang.mixin(this, kwArgs);
      var self=this;

      //store our selector in the main namespace so others can call us to change the view
      window.selector = this;
      this.ourNodes= [];

      //Start loading all details of all flows - other widgets are going to want it at some point, so might as well start it off early
      this.brokerStore = BrokerStore.getBrokerStore();
      this.brokerStore.getAllMessageFlows({'loadProperties': true, 'loadDesign': true});

      // Build up list of allowed widgets
      array.forEach( [this.applicationMonitoring, this.operationalMonitoring], function(i){
        array.forEach( i, function(j){
          if(j.widget){
            self.knownWidgets.push(j.widget);
          }
        });
      });

      window.addEventListener("popstate", function(e){self._onHistoryChangeHandler(e)});

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'constructor');
    },

    /** */
    postCreate: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'postCreate');
          ;// Get a DOM node reference to the overall parent node of the widget itself
          ;// var domNode = this.domNode;

      // Get a reference to a child node in a widget that will contain any other widgets that are defined outside of your widget definition.
      // var container = this.containerNode;

      // remove loading icon
      domConstruct.destroy('mainLoadingIcon');

      //Add a logout button to the header.
      // Probably want to pull the whole header into Selctor at some point, however need to think about visual laod time
      this.brokerStore.getCurrentUser( ).then( function( currentUser ) {
        if(currentUser.username !== 'Default'){
          var header = dijit.byId('banner');
          header.set('usernameLabel',currentUser.name);
          header.set('username',currentUser.username);
          header.set('logoutFunc', function(){
            require(['dojo/request'], function(request){
              request('/apiv1/logout').then(function(){
                window.location.reload();
              });
            });
          });
        }
      });


      var self = this;
      if (!this.applicationMonitoring || this.applicationMonitoring.length === 0) {
        //remove section if empty
        domConstruct.destroy(this.applicationMonitoringDiv);
      }else {
        array.forEach(this.applicationMonitoring, function(row ) {
          //Need to load widget code so we can use it
          var newWidgetName = row.widget;
          require([newWidgetName.replace(/\./g, '/')], function(Widget) {

            var tr = domConstruct.create('tr', null, self.applicationMonitoringAttach);
            // Might want to define the icon class by asking the widget too
            domConstruct.create('td', {'class': 'treeIcon'}, tr);
            //Ask the widget for a title string
            domConstruct.create('td', { innerHTML: Widget.getTitleString(row.config) }, tr);
            var buttonTd = domConstruct.create('td', { 'class': 'goButton' }, tr);
            var button = domConstruct.create('button', {
                'class':'loadButton', 'title':NLS.selectorLoad, 'onclick': function() {
                      self.loadNewWidget(row.widget)
                    }, innerHTML: '<img src="webui/widgets/images/35px-white-arrow-on-blue.gif"/>'
                 }, buttonTd);

            Trace.trace(self.widgetName + '/require', Trace.levels.EXIT, 'Initialising '+ newWidgetName);
          }).on('error', function(err) {
            Trace.trace(this.widgetName, Trace.levels.ERROR, 'Error loading module '+ newWidgetName, [err]);
          });
        });
      }
      if (!this.operationalMonitoring || this.operationalMonitoring.length === 0) {
        //remove section if empty
        domConstruct.destroy(this.operationalMonitoringDiv);
      }else {
        //TODO? Should the widget return the whole section here? We are really crossing boundaries of who is drawing what...
        // Or are we assuming that we might mix in other widgets into the same table - If so, perhaps the button should be from
        // the widget we are working on?
        array.forEach(this.operationalMonitoring, function(row ) {
          var tr = domConstruct.create('tr', null, self.operationalMonitoringAttach);
          // Might want to define the icon class by asking the widget too
          domConstruct.create('td', {'class': 'flowIcon'}, tr);

          //Ask the widget for a title string
          domConstruct.create('td', { 'innerHTML': OperationalMonitoring.getTitleString(row.config) }, tr);

          //td to hold instance selection and button
          var instanceTd = domConstruct.create('td', { }, tr);
          var spinner = domConstruct.create('div', { 'class': 'loadingIcon', 'title': NLS.loading}, instanceTd);

          var buttonTd = domConstruct.create('td', { 'class': 'goButton' }, tr);

          //Set instance names via callback
          OperationalMonitoring.getItemSelections(row.config).then(function(instances) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'postCreate.eachRow.setInstances', [instances]);

            if (! spinner || ! spinner.parentNode) {
              Trace.trace(self.widgetName, Trace.levels.EXIT, 'postCreate.eachRow.setInstances');
              return;
            }

            if (instances && instances.length > 0) {
              //convert instances to the right options format for the idx Select
              var options = [];
              array.forEach(instances, function(i) {
                options.push({'label': i, 'value': i});
              });

              var selectInstance = new Select({
                'labelAlignment': 'horizontal',
                'compact': true,
                'fieldWidth': '200px',
                'autoWidth': true,
                'options': options
              }, spinner);
              selectInstance.startup();

              var button = domConstruct.create('button',
                        {'class':'loadButton', 'title':NLS.selectorLoad, 'onclick': function() {
                              self.loadNewWidget(row.widget, {
                                patternDescription: row.config.patternDescription, patternId: row.config.patternId,
                                patternInstance: selectInstance.getValue()
                              });
                        }, innerHTML: '<img src="webui/widgets/images/35px-white-arrow-on-blue.gif"/>'
                       }, buttonTd);
            }else {
              domConstruct.create('span', {innerHTML: NLS.operationalMonitoringNoInstances }, spinner, 'replace');
            }

            Trace.trace(self.widgetName, Trace.levels.EXIT, 'postCreate.eachRow.setInstances');
          });
        });
      }

      // If we have a custom url, see if we should load a specific widget
      if(location.hash && location.hash.length>1){
        this._loadWidgetFromUrl();
      }

      Trace.trace(this.widgetName, Trace.levels.EXIT, 'postCreate');
    },

    /**
     * Start widget. As always you should call this as soon after placing the widget as possible
     */
    startup: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'startup');

      // TODO:4080 parse current URL to work out if we should be loading a different widget straight away
      // Should do this either here or the postCreate

      var self = this;
      on(window, 'resize', function() {
        self.resize();
      });
       ;
      Trace.trace(this.widgetName, Trace.levels.EXIT, 'startup');
    },

    /**
     * probably should never call this...
     */
    uninitialize: function() {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'uninitialize');
      Trace.trace(this.widgetName, Trace.levels.EXIT, 'uninitialize');
    },

    /**
     * Loads a new widget into the main UI. This should only be used for explicit JS callbacks/links
     * where we know all the parameters are safe for the target widget. URL parsing and loading is already
     * handled by Selector, so you shouldn't need to do anything
     *
     * @param {String} newWidgetName the name of the new widget
     * @param {Object} options - options object to be passed to the widget after we construct it
     * @param {boolean} noHistory - If true, don't update history (i.e. we detected a hash url change)
     */
    loadNewWidget: function(newWidgetName, options, noHistory) {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, 'loadNewWidget', [newWidgetName, options, noHistory]);
      this._loadNewWidget(newWidgetName, {'config': options, 'noHistory':noHistory});
      Trace.trace(this.widgetName, Trace.levels.EXIT, 'loadNewWidget', [newWidgetName, options, noHistory]);
    },
    /**
     * private interface to loads a new widget into the main UI
     * @param {String} newWidgetName the name of the new widget
     * @param {Object} options
     * @param {Object} options.config - config object to be passed to the widget after we construct it
     * @param {Object} options.urlConfig - options from parsing URL, have to be careful as could be unsafe
     * @param {boolean} options.noHistory - If true, don't update history (i.e. we detected a hash url change)
     * @private
     */
    _loadNewWidget: function(newWidgetName, options) {
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_loadNewWidget', [newWidgetName, options]);
      var self = this;


      Trace.trace(this.widgetName, Trace.levels.DEBUG, 'Requiring '+ newWidgetName);
      require([newWidgetName.replace(/\./g, '/')], function(Widget) {
        Trace.trace(self.widgetName + '/require', Trace.levels.ENTRY, 'Initialising '+ newWidgetName);

        if (typeof currentWidget !== 'undefined' && currentWidget !== null) {
          currentWidget.uninitialize();
        }else{
          //If we are on the selector page, then hide the nodes for reuse later
          for (var i = self.domNode.childNodes.length; i > 0; i--) {
            var targetNode = self.domNode.childNodes[i-1];
            var node = self.domNode.removeChild(targetNode);
            self.ourNodes.push( node );
          };
        }
        domConstruct.empty(self.domNode);

        //make sure we never pass a null
        var configOpts = options.config || [];
        var urlConfig =  options.urlConfig || []

        var newWidget = new Widget(configOpts, urlConfig);

        self.currentWidget = newWidget;
        domConstruct.place(newWidget.domNode, self.domNode);

        newWidget.startup();

        self.resize();

        if(!options.noHistory){
          var hashQuery = lang.clone(configOpts) || [];
          hashQuery.page = newWidgetName;
          history.pushState({'widget':newWidgetName, 'widgetOptions':configOpts}, null, '#'+ioQuery.objectToQuery(hashQuery));
        }

        Trace.trace(self.widgetName + '/require', Trace.levels.EXIT, 'Initialising '+ newWidgetName);
      }).on('error', function(err) {
        Trace.trace(this.widgetName, Trace.levels.ERROR, 'Error loading module '+ newWidgetName, [err]);
      });

      Trace.trace(this.widgetName, Trace.levels.EXIT, '_loadNewWidget');
    },

    /** HTML5 history change callback hander. Registered for "popstate" events in constructor
     * and handles loading a new widget based on back/forward buttons
     * @private
     */
    _onHistoryChangeHandler: function(e){
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_onHistoryChangeHandler', [e, location.hash]);

      // If we have a state object, use that first
      if(e.state && e.state.widget){
        this.loadNewWidget(e.state.widget, e.state.widgetOptions, true);
      }else{
        // No history object, check url to see if we are supposed to do something
        if(location.hash && location.hash.length>1){
          // We have something from the url
          this._loadWidgetFromUrl();
        }else{
          // No state object, no hash url, load selector again
          this._reloadOurselves();
        }
      }
      Trace.trace(this.widgetName, Trace.levels.EXIT, '_onHistoryChangeHandler');
    },

    /** Attempt to load a widget from the current url
     * @private
     */
    _loadWidgetFromUrl: function(){
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_loadWidgetFromUrl');
      var hashObj = ioQuery.queryToObject(location.hash.substr(1));
      if(hashObj.page){
        if(this.knownWidgets.indexOf(hashObj.page)!= -1){
          var newWidgetName = hashObj.page;
          delete hashObj.page;
          try{
            this._loadNewWidget(newWidgetName, {'urlConfig':hashObj, 'noHistory':true});
          }catch(e){
            Trace.trace(this.widgetName, Trace.levels.ERROR, '_loadWidgetFromUrl', ["Error loading widget, reverting to main widget", e]);
            this._reloadOurselves();
          }
        }else{
          this._reloadOurselves();
        }
      }else{
        this._reloadOurselves();
      }
      Trace.trace(this.widgetName, Trace.levels.EXIT, '_loadWidgetFromUrl');
    },

    /** Reload ourselves
     * @private
     */
    _reloadOurselves: function(){
      Trace.trace(this.widgetName, Trace.levels.ENTRY, '_reloadOurselves');
      if (typeof this.currentWidget !== 'undefined' && this.currentWidget !== null) {
        this.currentWidget.uninitialize();
        domConstruct.empty(this.domNode);
        this.currentWidget = null;
      }
      //We stored these in reverse order, so put them back in reverse order
      for (var i = this.ourNodes.length -1; i >= 0; i--) {
        domConstruct.place(this.ourNodes[i], this.domNode);
      };
      this.startup();
      this.resize();
      Trace.trace(this.widgetName, Trace.levels.EXIT, '_reloadOurselves');
    },

    /** Resize this and child widgets
     */
    resize: function() {
      if (this.currentWidget && this.currentWidget.resize) {
        this.currentWidget.resize();
      }
    }

  });
  return Selector;
});

},
'webui/websocketManager':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="2776023167" > 
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
 * @desc setups up a websocket connection back to the broker. Subscriptions are made with a
 * callback ref to be notified on data. This module manages those subscriptions
 *
 * @module webui/websocketManager
 */
// @formatter:off
define(
    [
     // these modules will be loaded automatically
     'dojo/_base/array',
     'dojo/_base/lang',
     'dojo/Deferred',
     'dojo/json',
     'dojo/promise/all',

     'webui/Trace'

     //'thirdparty/mqttws31.js', // Not an AMD module and breaks dojo build being imported here. Load in main html file
    ],
    function(
    array,
    lang,
    Deferred,
    json,
    all,

    Trace

    //Messaging, // Not an AMD module
    ) {
      // @formatter:on
      'use strict';
      var widgetName = 'webui.websocketManager';

      // MQTT doesn't let us query this, so we have to track it manually.
      var _subscriptions = {};
      // Or this
      var _connected = false;
      // Key = topic string; value = latest publication. Might be useful in debug... or not
      var _lastUpdate = {};
      var _client;
      var _connectionPromise;

      /**
       * @function connect
       * @desc Connect to the broker's websocket and establish an MQTT subscription
       * @return A promise which when fulfilled means the connection is read and subscrptions can be processed
       * @static
       */
      function connect() {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'connect');
        if (_connectionPromise) {
          Trace.trace(widgetName, Trace.levels.EXIT, 'connect (secondary)', [_connectionPromise]);
          return _connectionPromise;
        }
        //deferred promise which we are going to return when we have started connecting
        _connectionPromise = new Deferred();

        var host = window.location.hostname;
        var port = parseInt(window.location.port);
        var clientId = 'Client' + new Date().getTime();
        _client = new Messaging.Client(host, port, clientId);

        // Process a message when it arrives
        _client.onMessageArrived = function(message ) {
          _newMessageArrived(message);
        };

        // What to do when we lose our connection.
        _client.onConnectionLost = function(response ) {
          _connected = false;
          //TODO: retry logic? Reject/cancel deferrred?
          Trace.trace(widgetName, Trace.levels.ERROR, 'connection lost', [response]);
        };

        // Build up set of arguments for connect
        var useSSL = window.location.protocol === 'https:';
        var onSuccess = function(response ) {
          _connected = true;
          _connectionPromise.resolve();
          Trace.trace(widgetName, Trace.levels.INFO, 'connection onSuccess', [response, _connectionPromise]);
        };
        var onFailure = function(response ) {
          _connected = false;
          //TODO retry logic?
          // Reject/cancel deferrred?
          Trace.trace(widgetName, Trace.levels.ERROR, 'connection onFailure', [response]);
        };

        // Aaaaand GO
        var c = _client.connect({
          'useSSL': useSSL,
          'onSuccess': onSuccess,
          'onFailure': onFailure
        });

        Trace.trace(widgetName, Trace.levels.EXIT, 'connect', [_connectionPromise]);
        return _connectionPromise;
      }


      // internal new mesasge handler, called by client.onMessageArrived()
      function _newMessageArrived(message ) {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'client.onMessageArrived', [message]);
        try {
          if (message.payloadString) {
            message.payloadObj = json.parse(message.payloadString, true);
          // like {"1378393840000to1378393845000":30.3,...}
          } else {
            message.payloadObj = {};
          }

          //stash last updates
          _lastUpdate = {
            time: new Date(),
            topic: message.destinationName,
            contents: message.payloadObj
          };

          array.forEach(Object.keys(_subscriptions), function(sub ) {
            // Check each message against subscriptions to determine whether to run callback
            var subArray = sub.split("/");
            var runCallback = false;
            
            // If the subscription ends with a #, this is a wildcard subscription
            // Start of topic matched against wildcard subscription to determine callback
            // Otherwise, check for complete match
            //TODO_extension: Add support for '+' wildcards
            if (subArray.pop() === '#' ) {
              var newSub = subArray.join("/");
              if(_startsWith(message.destinationName,newSub)) {
                runCallback = true;
              }
            } else if (sub === message.destinationName) {
              runCallback = true;
            }
            
            if(runCallback) {
              array.forEach(_subscriptions[sub], function(callback ) {
                try {
                  if (typeof callback !== 'undefined') {
                    Trace.trace(widgetName, Trace.levels.DEBUG, 'client.onMessageArrived (invoking callback)', [callback, message]);
                    callback(message);
                  }
                } catch (e) {
                  Trace.trace(widgetName, Trace.levels.ERROR, 'client.onMessageArrived (callback error)', [e, message]);
                }
              });
            }
          });

        } catch (e) {
          Trace.trace(widgetName, Trace.levels.ERROR, 'client.onMessageArrived (parsing error)', [e, message]);
        }
        Trace.trace(widgetName, Trace.levels.EXIT, 'client.onMessageArrived', [message.destinationName, message]);
      }

    /**
     * @param {Object} message - MQTT message object of published data (with a few additions)
     * @callback  module:webui/websocketManager~publishCb
     * @desc Callback signature for subscribe calls
     *
     * The message object passed is the basic one from MQTT, however a few extra properties have been set.
     *
     * MQTT provides the message.payloadString, we provide a json parsed message.paylodaObj
     */

      /**
      * @function subscribe
      * @param {string} topic - MQTT topic string to subscribe to, \n
      *                         eg "$SYS/Broker/IB9NODE/Statistics/JSON/SnapShot/default/applications/ManTest/messageflows/UA_DA_read"
      * @param {module:webui/websocketManager~publishCb} callback - function reference to callback when we get data on the above topic
      * @desc subscribe to a topic
      *
      * Does not currently support '+' wildcard topics
      * @return subscription reference. Use with {@link module:webui/websocketManager.unsubscribe} to remove this subscription
      * @static 
      */
      function subscribe(topic, callback ) {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'subscribe', [topic, callback]);

        if (topic.search(/\+/) !== -1) {
          //TODO_extension: If implementing wildcard support, need to resolve wildcards in subscriptions to see if they
          // should match the current topic, if so run callback
          Trace.trace(widgetName, Trace.levels.ERROR, 'subscribe - Error, \'+\' pubsub wildcards are not imlplemented yet! Get coding!', [topic, callback]);
          return;
        }

        //First store subscription so we can return a ref to caller
        if (_subscriptions[topic]) {
          _subscriptions[topic].push(callback);
        } else {
          _subscriptions[topic] = [callback];
        }

        //Now actually attempt to setup real subscription as soon as we are connected
        connect().then(function() {
          Trace.trace(widgetName, Trace.levels.DEBUG, 'subscribing on mqtt to', [topic]);
          _client.subscribe(topic, {
            'onSuccess': function() {
              Trace.trace(widgetName, Trace.levels.INFO, 'subscribe subscribed to', [topic]);
            }
            //TODO: on error/failure? Does it have one?
          });
        });

        Trace.trace(widgetName, Trace.levels.EXIT, 'subscribe', [callback]);
        // Return the callback as a unique entry to use when unsubscribing. Note that this may not necessarily
        // prove unique enough in the long run. Any two callbacks which pass something like "this.someMethod" will
        // essentially be using the same callback reference, so we might end up unsubscribing both when we get to it.
        // This will not apply if each callback is "function(){this.SomeMethod()}" but that is obviously different code.
        // Not solving this now though as I think it is probably unlikely we will ever care as unsubscribing is almost
        // non-existent right now
        return callback;
      }



      /**
      * @function unsubscribe
      * @param {Object} subRef - subscription reference as supplied by {@link module:webui/websocketManager.subscribe} 
      * @desc unsubscribes from a topic
      * @static 
      */
      function unsubscribe(codeRef ) {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'unsubscribe', [codeRef]);
        array.forEach(Object.keys(_subscriptions), function(key) {
          var i = _subscriptions[key].indexOf(codeRef);
          if (i >= 0) {
            if (_subscriptions[key].length === 1) {
              delete _subscriptions[key];
            }else {
              _subscriptions[key].splice(i, 1);
            }

          }
        });
        Trace.trace(widgetName, Trace.levels.EXIT, 'unsubscribe');
      }

      return {
        connect: connect,
        subscribe: subscribe,
        unsubscribe: unsubscribe
      };
      
      function _startsWith(string, match) {
        return string.indexOf(match) === 0;
      }

    });

},
'webui/widgets/SupportedBrowser':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="1224340059" > 
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

// The splash page widget.

// @formatter:on
define([
  'dojo/i18n!webui/nls/web',
  'dojo/_base/lang',
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/sniff',
  'dojo/dom-construct',
  'dojo/dom-style',
  'dijit/_WidgetBase',

  'idx/widget/SingleMessage',

  'webui/Trace'
], function(
    NLS,
    Lang,
    declare,
    Array,
    Sniff,
    domConstruct,
    domStyle,
    WidgetBase,

    SingleMessage,

    Trace
    ) {
  // @formatter:on
  'use strict';
  /** @class webui.widgets.SupportedBrowser
   * @classdesc This widget shows a warning box if the browser does not match the supplied config.
   *
   * @param {Object} config
   * @param {webui.widgets.SupportedBrowser~config[]} config.Tests - Supported browser config
   */
  return declare([WidgetBase], /** @lends webui.widgets.SupportedBrowser.prototype */ {

    // base vars
    widgetName: 'webui.widgets.SupportedBrowser',

    //constructor properties
    tests: [],

    //supportedList
    dismiss: NLS.dismiss,

    //other member vars
    isSupported: true,
    allowedBrowsersNode: null,



    constructor: function(/*Object*/kwArgs ) {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'constructor', [kwArgs]);
      Lang.mixin(this, kwArgs);
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'constructor');
    },

    /** */
    postCreate: function() {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'postCreate');
          ;// Get a DOM node reference to the overall parent node of the widget itself
          ;// var domNode = this.domNode;

      // Get a reference to a child node in a widget that will contain any other widgets that are defined outside of your widget definition.
      // var container = this.containerNode;
       ;
      // Test browsers
      var browserMeetsRequirements = false;

      this.allowedBrowsersNode = domConstruct.create('ul');
      Array.forEach(this.tests, function(req ) {
        if (Sniff(req.test) >= req.minimum) {
          browserMeetsRequirements = true;
        }
        domConstruct.create('li', { innerHTML: req.name }, this.allowedBrowsersNode);

      },this);
      this.isSupported = browserMeetsRequirements;

      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'postCreate');
    },

    /** */
    startup: function() {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'startup');
      if (!this.isSupported) {
        var singleMessageInstance = new SingleMessage({
          type: 'error',
          title: NLS.unsupported,
          messageNumber: 1,
          description: NLS.supported+this.allowedBrowsersNode.outerHTML,
          onMoreDetails: function(){window.open("http://www.ibm.com/software/integration/wbimessagebroker/requirements/");},
          showRefresh: false,
          showTimestamp: false,
          showAction: false
        });
        singleMessageInstance.placeAt(this.domNode);
        singleMessageInstance.startup();
      }
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'startup');
    },

    /** */
    uninitialize: function() {
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.ENTRY, 'uninitialize');
      Trace.trace(this.widgetName + ' (' + this.id + ')', Trace.levels.EXIT, 'uninitialize');
    }



  });

  /**
   * @typedef {Object} webui.widgets.SupportedBrowser~config
   * @property {string} name    - human description of the name of the browser and version
   * @property {string} test    - dojo sniff id for browser
   * @property {string} minimum - minimum supported version
   *
   * @example [
   *     {'name': 'Google Chrome 31+', 'test': 'chrome', 'minimum': 30},
   *     {'name': 'Microsoft Internet Explorer 10', 'test': 'ie', 'minimum': 10},
   *     {'name': 'Microsoft Internet Explorer 11', 'test': 'trident', 'minimum': 7},
   *     {'name': 'Mozilla Firefox 24+', 'test': 'ff', 'minimum': 24}
   * ]
   */

});

},
'webui/nls/web':function(){
// NLS_CHARSET=UTF-8
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="1285032603" > 
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
      //begin v1.x content
      ({
        //LogIn page
        loginInstruction: 'Please enter your credentials.',
        failedLogin: 'Invalid username or password, please re-enter your credentials.',

        //Selector
        selectorApplicationMonitoring: 'Application Monitoring',
        selectorOperationalMonitoring: 'Operational Monitoring',
        selectorOperationalMonitoring_Desc: 'Select a pattern instance to monitor',
        selectorLoad: 'Open',

        //OperationalMonitoring
        operationalMonitoringNoInstances: 'No instances of this pattern are deployed.',
        operationalMonitoringTitleString: 'Operational Monitoring: ${1} instance of ${0} pattern',
        operationalMonitoringIntegrationServerHeaderTitle: 'Integration Server',
        operationalMonitoringContainerHeaderTitle: 'Container',
        operationalMonitoringMessageFlowHeaderTitle: 'Message Flow',
        operationalMonitoringChangeStatsHeaderTitle: 'Statistics',
        operationalMonitoringInputFlowNodesHeaderTitle: 'Input Flow Nodes',
        operationalMonitoringRateHeaderTitle: 'Messages per Second',
        operationalMonitoringLastUpdateHeaderTitle: 'Last Message',
        operationalMonitoringStatsOn: 'Disable',
        operationalMonitoringStatsOff: 'Enable',
        operationalMonitoringFlowOrParentStopped: 'Flow or container stopped',

        //SupportedBrowsers
        unsupported: 'You are using an unsupported web browser.',
        supported: 'Supported browsers are:',

        //More general terms/buttons
        dismiss: 'Dismiss',
        loading: 'Loading...'
      }),
  'de': true,
  'es': true,
  'fr': true,
  'ja': true,
  'pl': true,
  'pt-br': true,
  'tr': true,
  'zh-cn': true,
  'zh-tw': true
});

},
'webui/BrokerStore':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="3471890882" > 
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
* A promise object provided by dojo
* @external Promise
* @see {@link https://dojotoolkit.org/reference-guide/1.10/dojo/promise.html}
*/


/**
 * @module webui/BrokerStore
 */
// @formatter:off
define(
    [
     // these modules will be loaded automatically
     'dojo/_base/declare',
     'dojo/_base/array',
     'dojo/_base/lang',
     'dojo/Deferred',
     'dojo/json',
     'dojo/promise/all',
     'dojo/request/xhr',
     'webui/Trace'
    ],
    function(
    declare,
    array,
    lang,
    Deferred,
    json,
    all,
    xhr,
    Trace
    ) {
      // @formatter:on

      'use strict';
      var widgetName = 'webui.BrokerStore';
      /**
      * @class webui.BrokerStore
      * @classdesc This class represents the running broker and its deployed artefacts.
      * <p>
      * Each top-level path of the broker's restful api is represented here by a getter method which
      * returns a {@link external:promise}:
      * <p>
      * Once called, the promises will be fulfilled and so available straight away.
      * Each getter method (apart from getBroker) will do a full depth query so that as much
      * as possible is available straight away.
      * <p>
      * Many of the objects returned via the REST API lack certain important pieces
      * of data. This code adds those pieces of data back in. For example, the
      * "href" property of an artifact is the URL where it can be seen in the main
      * web UI. And an execution group will have a "broker" property added, making
      * it possible to navigate "up" the artifact tree.
      * <p>
      * NOTE: that at the moment only objects under execution groups have been implemented
      * <p>
      * @example
      * e.g. this.getBroker()
      *      this.getExecutionGroups();
      *
      * @desc
      * Don't use the constructor - this should have been a static module, not an instantiable class.
      * Instead use {@link module:webui/BrokerStore.getBrokerStore}
      */
      var widget = declare([], /** @lends webui.BrokerStore.prototype */{
        server: '//' + window.location.hostname + ':' + parseInt(window.location.port),
        apiRoot: '/apiv1',
        baseUri: null, //set in constructor

        widgetName: widgetName,
        _broker: undefined,
        _executionGroups: undefined,
        _allMessageFlows: undefined,

        // ////////////
        // Public methods
        // ///////////
        constructor: function() {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'constructor');

          this.baseUri = this.server + this.apiRoot;
          this._allMessageFlows = [];

          Trace.trace(this.widgetName, Trace.levels.EXIT, 'constructor', [this]);
        },

        /** Returns a promise to the basic properties of a broker
        * @returns {external:Promise} for the json object which is basically the same as calling /apiv1/
        */
        getBroker: function() {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'getBroker');
          if (typeof this._broker === 'undefined') {
            this._refreshBroker();
          }
          Trace.trace(this.widgetName, Trace.levels.EXIT, 'getBroker', [this._broker]);
          return this._broker;
        },

        /** Returns a promise to the executiongroups and all their children (we do a depth=7 call)
        * Basic set of properties for all deployed objects on the broker. Use a .then() call to work with the values
        * Result is cached (not yet written a way for force the cache to be refreshed)
        * <p>
        * We add some extra data to the output, and sort some things, because apparently they don't always arrive sorted.
        * The extra data added includes:
        * "href" is the path to use to find this artifact in the main web UI.
        * "statsHref" is the path for this artifacts stats page.
        * <p>
        * For message flows, we add "snapshotTopic" as the topic to subscribe to if you want to receive
        * accounting and statistics publications. See http://pic.dhe.ibm.com/infocenter/wmbhelp/v9r0m0/index.jsp?topic=%2Fcom.ibm.etools.mft.doc%2Faq20080_.htm
        * @returns { external:Promise} for the json object which is basically the same as calling /apiv1/executionGroups
        */
        getExecutionGroups: function() {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'getExecutionGroups', []);
          if (typeof this._executionGroups === 'undefined') {
            this._refreshExecutionGroups();
          }
          Trace.trace(this.widgetName, Trace.levels.EXIT, 'getExecutionGroups', [this._executionGroups]);
          return this._executionGroups;
        },

        /** Returns a promise to every message flow deployed to the broker.
        * Can be called at any time (i.e. you don't need to have called getBroker or getExecutionGroups previously)
        *
        * @param {object} opts
        * @param {boolean} [opts.loadProparties=false] - If true, we will also load the flow properties before returning
        * @param {boolean} [opts.loadDesign=false]     - If true, we will also load the flow design before returning
        * @returns {external:Promise} for an array of message flow objects
        */
        getAllMessageFlows: function(opts) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'getAllMessageFlows', [opts]);
          var self = this;
          var promise;
          if (opts && (opts.loadProperties || opts.loadDesign)) {
            promise = this._refreshAllFlows(opts).then(function() {
              Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getAllMessageFlows.then');
              Trace.trace(self.widgetName, Trace.levels.EXIT, 'getAllMessageFlows.then', [self._allMessageFlows]);
              return self._allMessageFlows;
            }, function(err) {
              Trace.trace(self.widgetName, Trace.levels.ERROR, 'getAllMessageFlows().then', [err]);
            });
          }else {
            promise = this.getExecutionGroups().then(function() {
              Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getAllMessageFlows.then');
              Trace.trace(self.widgetName, Trace.levels.EXIT, 'getAllMessageFlows.then', [self._allMessageFlows]);
              return self._allMessageFlows;
            }, function(err) {
              Trace.trace(self.widgetName, Trace.levels.ERROR, 'getAllMessageFlows().then', [err]);
            });
          }
          Trace.trace(this.widgetName, Trace.levels.EXIT, 'getAllMessageFlows', [promise]);
          return promise;
        },

        /** Returns a promise to a list of all instances of a specific pattern
        * @param {string} patternName - name of the pattern to find instances of
        * @returns {external:Promise} for an array of pattern instance names
        */
        getInstancesOfPattern: function(patternName) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'getInstancesOfPattern', [patternName]);

          var self = this;
          return this.getAllMessageFlows({loadProperties: 'true'}).then(function(allFlows) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getInstancesOfPattern.then', [patternName]);
            var promises = [];
            var instanceNames = [];
            array.forEach(allFlows, function(flow) {
              var promise = flow.getFlowProperties().then(function(flowProperties) {
                Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getInstancesOfPattern.then.flowProperties', [flowProperties]);
                if (flowProperties.customDescProperties && flowProperties.customDescProperties.PatternName) {
                  var thisPatternName = flowProperties.customDescProperties.PatternName;
                  var instanceName = flowProperties.customDescProperties.PatternInstanceName;
                  if (thisPatternName === patternName && instanceNames.indexOf(instanceName) === -1) {
                    instanceNames.push(instanceName);
                  }
                }
                Trace.trace(self.widgetName, Trace.levels.EXIT, 'getInstancesOfPattern.then.flowProperties');
              });
              promises.push(promise);
            });

            // Return a promise for all the data
            var allPromises = all(promises).then(function(results) {
              //Finally have all the data, now resolve promise to data
              return instanceNames;
            });
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getInstancesOfPattern.then', [allPromises]);
            return allPromises;
          });

          Trace.trace(this.widgetName, Trace.levels.EXIT, 'getInstancesOfPattern');
        },


        /** Returns a promise to a list of the contents of an instance of a pattern
        * Response is an array of {flow:flow, properties:flowProperties, design:flowDesign} objects
        * @param {string} patternName         - name of the pattern to look for
        * @param {string} patternInstanceName - instance name of the pattern to look for
        * @returns {external:Promise} for an array of message flows which are part of a the pattern instance
        */
        getContentsOfPatternInstance: function(patternName, patternInstanceName) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, 'getContentsOfPatternInstance', [patternName, patternInstanceName]);

          var self = this;
          return this.getAllMessageFlows({loadProperties: 'true', loadFlowDesign: 'true'}).then(function(allFlows) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getContentsOfPatternInstance.then', [patternName, patternInstanceName]);
            var promises = [];
            var matchingFlows = [];
            array.forEach(allFlows, function(flow) {
              var promise = flow.getFlowProperties().then(function(flowProperties) {
                return flow.getFlowDesign().then(function(flowDesign) {
                  Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getContentsOfPatternInstance.then.flowProperties', [flowProperties, flowDesign]);
                  if (flowProperties.customDescProperties && flowProperties.customDescProperties.PatternName) {
                    var thisPatternName = flowProperties.customDescProperties.PatternName;
                    var thisInstanceName = flowProperties.customDescProperties.PatternInstanceName;
                    if (thisPatternName === patternName && thisInstanceName === patternInstanceName) {
                      matchingFlows.push({'flow': flow, 'properties': flowProperties, 'design': flowDesign});
                    }
                  }
                  Trace.trace(self.widgetName, Trace.levels.EXIT, 'getContentsOfPatternInstance.then.flowProperties');
                });
              });
              promises.push(promise);
            });

            // Return a promise for all the data
            var allPromises = all(promises).then(function(results) {
              Trace.trace(self.widgetName, Trace.levels.ENTRY, 'getContentsOfPatternInstance.resolve', [results]);
              //Finally have all the data, now resolve promise to data
              Trace.trace(self.widgetName, Trace.levels.EXIT, 'getContentsOfPatternInstance.resolve', [matchingFlows]);
              return matchingFlows;
            });

            Trace.trace(self.widgetName, Trace.levels.EXIT, 'getContentsOfPatternInstance.then', [allPromises]);
            return allPromises;
          });

          Trace.trace(this.widgetName, Trace.levels.EXIT, 'getContentsOfPatternInstance');
        },


       /**
        * @returns {external:Promise} for the equivalent of calling /apiv1/security/currentuser
        */
        getCurrentUser: function( ) {
          Trace.trace( this.widgetName, Trace.levels.ENTRY, 'getCurrentUser' );
          var self = this;
          return this._currentUser = this._callXhr( this.baseUri + '/security/currentuser' ).then( function( response ) {
            Trace.trace( self.widgetName, Trace.levels.ENTRY, 'getCurrentUser.then', [response] );
            Trace.trace( self.widgetName, Trace.levels.EXIT, 'getCurrentUser.then' [response] );
            return response;
          } );
          Trace.trace( this.widgetName, Trace.levels.EXIT, 'getCurrentUser' );
        },






        // ////////////
        // Private methods
        // ///////////




        // Sort function used to compare flow,app,etc names
        _compareNames: function(a, b) {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        },

        // We do a lot of xhr calls, so might as well keep the logic close together
        _callXhr: function(uri, depth) {
          //Browsers log the xhr, and can even log to console for us, so don't bother tracing this time
          var query = {};
          if (typeof(depth) !== 'undefined') {
            query.depth = depth;
          }
          var response = xhr(uri, {
            'query' : query,
            'handleAs' : 'json',
            'headers' : {
              'Accept' : 'application/json'
            }
          });
          return response;
        },


        // We do a lot of xhr calls, so might as well keep the logic close together
        _callXhrMethod: function(method, uri, data) {
          //Browsers log the xhr, and can even log to console for us, so don't bother tracing this time
          var response = xhr(uri, {
            'method': method,
            'data': JSON.stringify(data),
            'headers' : {
              'Content-Type': 'application/json',
              'Accept' : 'application/json'
            },
                         'handleAs' : 'json'
          });
          return response;
        },

        // Internal method to actually query the runtime and get the properties of a broker.
        // Return a promise which will be fulfilled with a broker object
        _refreshBroker: function() {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshBroker');
          var self = this;
          this._broker = this._callXhr(this.baseUri).then(
             function(broker) {
               Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshBroker().then', [broker]);
               // Add some useful URLs
               self._buildHrefLinks(broker);
               // We don't recurse through children for performance. Use getExecutionGroups() if you want something deployed to an eg
               Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshBroker().then', [broker]);
               return broker;
             }, function(err) {
               Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshBroker().then', [err]);
             });
          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshBroker');
        },

        // Internal method to actually query the runtime and get the properties of a broker.
        // Returns a promise to the executiongroups and all their children (we do a depth=7 call)
        // Each flow is also annotated with parentEG as a link to the containing ExecutionGroup,
        // a parentContainer object which is the containing app/svc/lib if applicable
        //
        // This method actually adds in the extra data as described in getExecutionGroups
        _refreshExecutionGroups: function() {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshExecutionGroups');
          var self = this;
          this._executionGroups = this._callXhr(this.baseUri + '/executiongroups', 7).then(function(executionGroups) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshExecutionGroups().then', [executionGroups]);
            var ret = self.getBroker().then(function(broker) {
              try {
                Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshExecutionGroups().then.then', [executionGroups]);

                // Execution groups
                executionGroups.executionGroup.sort(self.compareNames);
                array.forEach(executionGroups.executionGroup,
                   function(executionGroup) {
                     this._buildHrefLinks(executionGroup);

                     // Services
                     executionGroup.services.service.sort(this.compareNames);
                     array.forEach(
                     executionGroup.services.service,
                     function(service) {
                       this._buildHrefLinks(service);
                       service.parentEG = executionGroup;


                       // Flows inside services
                       service.messageFlows.messageFlow.sort(this.compareNames);
                       array.forEach(service.messageFlows.messageFlow,
                       function(messageFlow) {
                         this._buildFlowObject(
                         messageFlow,
                         broker,
                         [executionGroup, service]
                         );
                       }, this);

                       // Libraries inside services
                       service.libraries.library.sort(this.compareNames);
                       array.forEach(
                       service.libraries.library,
                       function(library) {
                         this._buildHrefLinks(library);
                         library.parentContainer = service;
                         library.parentEG = executionGroup;

                         // Flows inside libraries inside services
                         library.messageFlows.messageFlow.sort(this.compareNames);
                         array.forEach(library.messageFlows.messageFlow,
                         function(messageFlow) {
                           this._buildFlowObject(
                           messageFlow,
                           broker,
                           [executionGroup, service, library]
                           );
                         }, this);
                       }
                       );
                     }, this);
                     // Applications
                     executionGroup.applications.application.sort(this.compareNames);
                     array.forEach(executionGroup.applications.application,
                     function(application) {
                       this._buildHrefLinks(application);
                       application.parentEG = executionGroup;

                       // Flows inside applications
                       application.messageFlows.messageFlow.sort(this.compareNames);
                       array.forEach(application.messageFlows.messageFlow,
                       function(messageFlow) {
                         this._buildFlowObject(
                         messageFlow,
                         broker,
                         [executionGroup, application]
                         );
                       }, this);

                       // Libraries inside applications
                       application.libraries.library.sort(this.compareNames);
                       array.forEach(application.libraries.library,
                       function(library) {
                         this._buildHrefLinks(library);
                         library.parentContainer = application;
                         library.parentEG = executionGroup;

                         // Flows inside libraries inside applications
                         library.messageFlows.messageFlow.sort(this.compareNames);
                         array.forEach(library.messageFlows.messageFlow,
                         function(messageFlow) {
                           this._buildFlowObject(
                           messageFlow,
                           broker,
                           [executionGroup, application, library]
                           );
                         }, this);
                       },this);
                     },this);//foreach eg

                     // Flows at the EG level
                     executionGroup.messageFlows.messageFlow.sort(this.compareNames);
                     array.forEach(executionGroup.messageFlows.messageFlow,
                     function(messageFlow) {
                       this._buildFlowObject(
                       messageFlow,
                       broker,
                       [executionGroup]
                       );
                     }, this);

                     // Libraries
                     executionGroup.libraries.library.sort(this.compareNames);
                     array.forEach(executionGroup.libraries.library,
                     function(library) {
                       this._buildHrefLinks(library);
                       library.parentEG = executionGroup;

                       // Flows inside libraries at the EG level
                       library.messageFlows.messageFlow.sort(this.compareNames);
                       array.forEach(library.messageFlows.messageFlow,
                       function(messageFlow) {
                         this._buildFlowObject(
                         messageFlow,
                         broker,
                         [executionGroup, library]
                         );
                       }, this);
                     },this);
                   },self);
                return executionGroups;
                Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshExecutionGroups().then.then', [executionGroups]);
              }catch (err) {
                Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshExecutionGroups().then.then', [err]);
              }
            }, function(err) {
              Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshExecutionGroups().then.then', [err]);
            });// end _callXhr
            Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshExecutionGroups().then', [ret]);
            return ret;
          }, function(err) {
            Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshExecutionGroups().then', [err]);
          });
          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshExecutionGroups');
        },

        // Internal method to load the child contents of a flow
        // Options:
        //   flowObject: mandatory - flow object, i.e. a child of getExecutionGroups()
        //   {
        //     loadProperties: optional,boolean - If true, we will also load the flow properties before returning
        //     loadDesign:     optional,boolean - If true, we will also load the flow design before returning
        //   }
        // Returns: a promise to return the flow with the desired properties populated. The properties are accessed via getter methods
        _refreshFlow: function(flowObj, opts) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshFlow', [flowObj, opts]);
          var self = this;

          var flowDesignPromise, flowPropertiesPromise;
          if (opts && opts.loadDesign) {
            flowDesignPromise = flowObj.getFlowDesign();
          }
          if (opts && opts.loadProperties) {
            flowPropertiesPromise = flowObj.getFlowProperties();
          }

          var allPromise = all({
            flowDesign: flowDesignPromise,
            flowProperties: flowPropertiesPromise
          }).then(function(results) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshFlow().all.then', [flowObj]);
            Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshFlow().all.then', [flowObj]);
            return flowObj;
          }, function(err) {
            Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshFlow().then', [err]);
          });

          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshFlow', [allPromise]);
          return allPromise;
        },

        // Internal method to load the flowDesign contents of a flow
        // Options:
        //   flowObject: mandatory - flow object, i.e. a child of getExecutionGroups()
        // Returns: a promise to return the flow design
        _refreshFlowDesign: function(flowObj) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshFlowDesign()', [flowObj]);
          var self = this;
          var promise = this._callXhr(flowObj.flowDesignUri).then(function(flowDesign) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshFlowDesign().then', [flowDesign]);
            Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshFlowDesign().then', [flowDesign]);
            return flowDesign;
          }, function(err) {
            Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshFlowDesign().then', [err]);
          });
          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshFlowDesign()', [promise]);
          return promise;
        },

        // Internal method to load the flowProperties contents of a flow
        // Options:
        //   flowObject: mandatory - flow object, i.e. a child of getExecutionGroups()
        // Returns: a promise to return the flow orioerties
        _refreshFlowProperties: function(flowObj) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshFlowProperties()', [flowObj]);
          var self = this;
          var promise = this._callXhr(flowObj.propertiesUri).then(function(flowProperties) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshProperties().then', [flowProperties]);
            var returnProps = {};

            //Take each of our properties fields and move them from anonymous {name:"A", value:"B"} objects to {A:"B"} objects
            array.forEach(Object.keys(flowProperties), function(key) {
              if (flowProperties[key] instanceof Array) {
                //If an array, we should move the properties down
                var newProps = {};
                array.forEach(flowProperties[key], function(prop) {
                  newProps[prop.name] = prop.value;
                });
                returnProps[key] = newProps;
              }else {
                //Otherwise just set it for output
                returnProps[key] = flowProperties[key];
              }
            });

            // Custom properties from longDescription
            //
            // Extract some extra information from the Long Description property.
            // We have a standard whereby additional keys and values can be encoded here
            // as long as a particular format is used. There is no limit to the number
            // of keys and values which can be so added.
            // e.g. if longDesc is :
            //   $MQSI Industry=Healthcare MQSI$
            //   $MQSI PatternName=HL7DFDL MQSI$ $MQSI PatternInstanceName=instanceA MQSI$
            // then there are 3 new key/value pairs: { "Industry" : "Healthcare",
            // "PatternName" : "HL7DFDL", "PatternInstanceName": "instanceA" }.
            var mqsiKV = /\$MQSI\s+(.*?)=(.*?)\s+MQSI\$/g;
            var customDescProps = {};
            var result;
            while (1) {
              // The RegExp object, mqsiKV, has an internal "lastIndex" property.
              // Each successive exec() call starts from this location in the
              // input string, and advances to the end of the match. So, calling
              // exec() in a loop retrieves all of our key/value pairs.
              result = mqsiKV.exec(returnProps.basicProperties.longDesc);
              if (result == null) {
                break;
              }
              // The result contains our submatches.
              // e.g. basicProperties["PatternName"] = "HL7DFDL";
              customDescProps[result[1]] = result[2];
            }
            returnProps['customDescProperties'] = customDescProps;

            Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshProperties().then', [returnProps]);
            return returnProps;
          }, function(err) {
            Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshProperties().then', [err]);
          });
          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshFlowProperties()', [promise]);
          return promise;
        },


        // Internal method to load child properties of all flows
        // Options:
        //   {
        //     loadProperties: optional,boolean - If true, will load the flow properties before returning
        //     loadDesign:     optional,boolean - If true, will load the flow design before returning
        //   }
        // Returns: a promise to return an array of all flows with properties loaded. The properties are accessed via getter methods
        _refreshAllFlows: function(opts) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_refreshAllFlows', [opts]);
          var self = this;
          var promises = [];
          var ret = this.getAllMessageFlows().then(function(flowArray) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshAllFlows.then', [flowArray, opts]);
            array.forEach(flowArray, function(flow, index) {
              promises.push(self._refreshFlow(flow, opts));
            });

            var allPromise = all(promises).then(function(results) {
              Trace.trace(self.widgetName, Trace.levels.ENTRY, '_refreshAllFlows().all.then', [promises]);
              Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshAllFlows().all.then', [results]);
              return results;
            }, function(err) {
              Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshAllFlows().then', [err]);
            });
            Trace.trace(self.widgetName, Trace.levels.EXIT, '_refreshAllFlows.then', [allPromise]);
            return allPromise;
          }, function(err) {
            Trace.trace(self.widgetName, Trace.levels.ERROR, '_refreshAllFlows().then', [err]);
          });

          Trace.trace(this.widgetName, Trace.levels.EXIT, '_refreshAllFlows', [ret]);
          return ret;
        },


        // Build up the baseURI string, i.e. executiongroups/default/applications/SOAPTest/messageflows/soaptest
        // Also add getters for getFlowProperties(), getFlowDesign(), getContainerName()
        // Options:
        //   flowObject: mandatory       - flow object, i.e. a child of getExecutionGroups()
        //   broker:     mandatory       - broker object i.e. getBroker() (needed to know the broker name)
        //   parentArray:  mandatory,array - Array of parent objects
        //  Returns: undefined
        //TODO: This might be getting big enough to be its own class...
        _buildFlowObject: function(flowObject, broker, parentArray) {
          Trace.trace(this.widgetName, Trace.levels.ENTRY, '_buildFlowObject', [flowObject, broker, parentArray]);

          var self = this;

          this._buildHrefLinks(flowObject);
          var snapshotUri = flowObject.uri.substr(1); //strip leading /
          snapshotUri = snapshotUri.substr(snapshotUri.indexOf('/') + 1); // strip up to next / to drop apiv1/
          snapshotUri = snapshotUri.substr(snapshotUri.indexOf('/')); // strip up to next / to drop executiongroups/
          flowObject.snapshotTopic = ['$SYS', 'Broker', broker.name, 'Statistics', 'JSON', 'SnapShot'].join('/')
         + decodeURI(snapshotUri); // mqtt topics aren't specially escaped

          //Cache the flowProperties inside the below as a closure, so a later call is instant
          var flowProperties = null;
          flowObject.getFlowProperties = function() {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'flow.getFlowProperties()', [flowObject, flowProperties]);
            if (flowProperties === null) {
              flowProperties = self._refreshFlowProperties(flowObject);
            }
            Trace.trace(self.widgetName, Trace.levels.EXIT, 'flow.getFlowProperties()', [flowObject, flowProperties]);
            return flowProperties;
          };

          //Cache the flowDesign inside the below as a closure, so a later call is instant
          var flowDesign = null;
          flowObject.getFlowDesign = function() {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'flow.getFlowDesign()', [flowObject, flowDesign]);
            if (flowDesign === null) {
              flowDesign = self._refreshFlowDesign(flowObject);
            }
            Trace.trace(self.widgetName, Trace.levels.EXIT, 'flow.getFlowDesign()', [flowObject, flowDesign]);
            return flowDesign;
          };

          flowObject.parentContainer = parentArray[parentArray.length - 1];
          flowObject.parentEG = parentArray[0];
          //Define a special getter to get our container name. Returns a / separated path for any parent app/svc/lib, or empty string
          flowObject.getContainerName = function() {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'flow.getContainerName()', [flowObject]);
            var ret = '';

            parentArray.slice(1).map(function(item) {//use slice to copy array, don't use splice as it changes it!
              if (ret) {
                ret += '/';
              }
              ret += item.name;
            });

            Trace.trace(self.widgetName, Trace.levels.EXIT, 'flow.getContainerName()', [ret]);
            return ret;
          };

          // Set a stats setter method for the flow object
          flowObject.setSnapshotStatistics = function(args) {
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'flow.setSnapshotStatistics()', [args]);
            if (typeof(args) === 'string') {
              if (args === 'on') {
                return self._callXhrMethod('PUT', flowObject.uri, {
                  'snapshotStatistics': {
                    'enabled': true,
                    'nodeLevel': 'basic',
                    'threadLevel': 'basic',
                    'outputFormat': {'json': true}
                  }
                });
              }else if (args === 'off') {
                return self._callXhrMethod('PUT', flowObject.uri, {
                  'snapshotStatistics': {
                    'enabled': false
                  }
                });
              }else {
                throw "Error, don't know how to set statistics for " + args;
              }
            }else {
              throw "Error, don't know how to set statistics for " + args;
            }
            Trace.trace(self.widgetName, Trace.levels.ENTRY, 'flow.setSnapshotStatistics()', [args]);
          };

          // Stash this flow in our global list of all flows for easier reference
          this._allMessageFlows.push(flowObject);

          Trace.trace(this.widgetName, Trace.levels.EXIT, '_buildFlowObject', [flowObject]);
        },

        // Set the basic uri properties for a deployed flow artefact, i.e. flow/app/lib
        // Options:
        //   brokerObject: mandatory       - deployed object, i.e. app/lib/flow from getExecutionGroups()
        //  Returns: undefined
        _buildHrefLinks: function(brokerObject) {
          // Trace is too verbose, skip it for this simple method

          //Strip off the base uri element, which was probably /apiv1/
          var uri = brokerObject.uri.substring(brokerObject.uri.indexOf('/', 1));
          brokerObject.href = '../#'+ brokerObject.type + '/0' + uri;
          brokerObject.statsHref = '../#'+ brokerObject.type + '/1' + uri;
        }

      });

      // Static functions


      // Keep a singleton of ourselves
      widget._instance = null;
     /**
      * @function getBrokerStore
      * @desc Singleton method to get a {@link webui.BrokerStore}
      *
      * This module should always have been written as a singleton, so it is best to access it as one as it may change. 
      * (actually it probably should have simply been static, but its done now).
      *
      * The reason we only want one copy in any browser, is that if we refresh part of this store we want everyone to have
      * the latest copy (not that this is implemented yet). Also, when that is implemented we also will want to add 
      * notifications so users can know something is changed
      *
      * @See {@link webui.BrokerStore}
      *
      * @returns {webui.BrokerStore}
      * @static
      */
      widget.getBrokerStore = function() {
        Trace.trace(widgetName, Trace.levels.ENTRY, 'getBrokerStore');
        if (widget._instance === null) {
          widget._instance = new widget();
        }
        Trace.trace(widgetName, Trace.levels.ENTRY, 'getBrokerStore', [widget._instance]);
        return widget._instance;
      };

      return widget;
    });

},
'webui/Trace':function(){
//
// <copyright 
// notice="oco-source" 
// pids="5725-C18" 
// years="2015" 
// crc="478720346" > 
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
 * @module webui/Trace
 * @desc Trace util for logging and tracing effectively. In future it could be extended/finished to post trace back to the server side to coordinate tracing better
 *
 * By default, the trace level is 7, so values of 7 and above are written to the console. This can be changed with the URI argument ?logging={@link module:webui/Trace.levels} or all 
 *
 * Additionally, logging can be filtered to a list of module ids with the ?logComponent flag
 *
 * All log output is to the browser console window
 *
 * @example
 * http://localhost:4414?logging=all
 * http://localhost:4414?logging=debug
 * http://localhost:4414?logging=debug&logComponent=webui.widgets.Selector
 * http://localhost:4414/healthcare/?logging=all&logComponent=webui.widgets.OperationalMonitoring,webui.widgets.Selector
 * http://localhost:4414/healthcare/?logging=all#page=healthcare.widgets.ClinicalMonitoring
 */
define([
  'dojo', 'dojo/string',
  'dojo/_base/array',
  'dojo/json'],
function(dojo, String, Array, json) {
  return {


    // summary:
    //   Global trace settings.
    serverLoggingEnabled: false,

    // trace buffer.  A buffer is used to reduce the number of calls to the server by posting
    // trace in batches.  The contents of the buffer is periodically posted to the server by a
    // timer object.  How often this timer object performs the post is controlled by
    // BUFFER_POST_INTERVAL.  Additionally, if the buffer reaches a size threshold it will be
    // posted to the server immediately, regardless of what the timer object is doing.
    // BUFFER_SIZE_THRESHOLD configures the number of lines of trace that will trigger a post.
    buffer: [],
    BUFFER_SIZE_THRESHOLD: 1000,  // number of lines of trace
    BUFFER_POST_INTERVAL: 5000,  // interval in milliseconds.


    /**
     * Trace levels, use these constants to trace at different levels
     * @enum
     * @static
     */
    levels: {
      /** for tracing method entry */
      ENTRY: { name: 'ENTRY', symbol: '>', level: 1 },
      /** for tracing method exit */
      EXIT: { name: 'EXIT', symbol: '<', level: 1 },
      /** for tracing a publication (probably not used) */
      PUB: { name: 'PUB', symbol: ':', level: 3 },
      /** for tracing a subscription (probably not used) */
      SUB: { name: 'SUB', symbol: ':', level: 3 },
      /** for tracing debug info*/
      DEBUG: { name: 'DEBUG', symbol: ':', level: 4 },
      /** for tracing info, normally output to console */
      INFO: { name: 'INFO', symbol: 'I', level: 7 },
      /** for tracing a warning, output to console */
      WARNING: { name: 'WARNING', symbol: 'W', level: 8 },
      /** for tracing an error, output to console */
      ERROR: { name: 'ERROR', symbol: 'E', level: 9 }
    },

    // WIDGET_NAME_DISPLAY_LENGTH: int
    //   The display width of the widget name in a trace line
    WIDGET_NAME_DISPLAY_LENGTH: 50,

    // SEVERITY_DISPLAY_LENGTH: int
    //   The display width of the severity in a trace line.
    SEVERITY_DISPLAY_LENGTH: 7,

    TRACE_LEVEL: 0,

    TRACE_PACKAGE: 'webui.*',

    // PADDING: String
    //   a space padded string the length of the longest *_DISPLAY_LENGTH
    //   setting.  Used by ui.widgets.BaseWidget.trace function during formatting.
    PADDING: '                                                  ',

    settings: {
      // summary:
      //   The currently enabled trace settings

      // add values here to enable trace.  the name must be one of
      // - a fully qualified widgetname
      // - a widget "package" followed by .*
      // the value must be the minimum level of trace you want to see.  ie
      // INFO is level 7, so if you set it to 7 you will see INFO, WARNING and
      // ERROR messages.
      //
      // Examples: (do these even work?)
      // "webui.widgets.common.wsHandler": 0,  // Debug and above just for this widget
      // "express.*": 0,      // All trace enabled for any widget in the express package
      // now for the default trace level
      '*': 7 // DO NOT DELETE  - ***OR EDIT*** this line even locally. Add lines above.
    },

    // defaultDisabledAlertIssued: boolean
    //   variable to keep track of whether or not an alert has been given
    //   in the case the default trace level has been removed from
    //   ui.Globals.settings.  Such a warning should only be given once, hence
    //   this variable.
    defaultDisabledAlertIssued: false,

    setTraceSpec: function(traceSpec) {
      // traceSpec is a string of colon-seperated trace settings where each setting is class=level.
      var _this = this;
      _this.settings = { '*': 7 }; // always make sure the default value is in there
      if (traceSpec) {
        var elements = traceSpec.split(':');
        dojo.forEach(elements, function(element) {
          try {
            var spec = element.split('=');
            var clas = spec[0];
            var level = spec[1];

            if ('all'== level)
              level = 0;
            else if ('debug'== level)
              level = _this.levels.DEBUG.level;
            else if ('entryExit'== level)
              level = _this.level.ENTRY.level;
            else if ('off'== level)
              level = _this.level.INFO.level;
            else {
              // there was a problem, better to have too much trace than too little
              console.error('Unkown trace level found: '+ element + '.  Defaulting to all');
              level = 0;
            }
            _this.settings[clas] = level;
          } catch (e) {
            console.error('Error setting trace spec level for '+ element + '.  '+ e);
          }
        });
      }
    },

    /**
    * @static trace
    * @desc Traces the message and infoObject to the javascript console if the
    *   severity is greater than or equal to the currently enabled trace level
    *   for this widget.
    * @param {string} widgetName - the name of the widget we are in (including instance ID possible)
    * @param {module:webui/Trace.levels} traceLevel - the severity of this trace statement
    * @param {string} traceMessage - informational string to trace. In the case of entry/exit trace this should be the method name
    * @param {Object} [infoObject] - the name of the widget we are in (including instance ID possible)
    */
    trace: function(/*String*/ widgetName,
        /* element of ui.widgets.BaseWidget.tr.levels */ severity,
        /* String */ message,
        /* Object? */ infoObject) {
      // summary:
      var trace = this;
      try {
        var settings = trace.settings;
        if (!infoObject) {
          infoObject = '';
        }
        var severityNumber = trace.levels.WARNING.level;  // default level in case severity is wrong
        if (severity) {
          severityNumber = severity.level;
        } else {
          console.error('Unknown severity for trace message:', message);
          console.trace();
        }

        var writeTrace = false;

        if (severityNumber != null && widgetName != null) {
          // check if trace at this level is enabled for this widget

          // if trace is found to be enabled for this widget, this value will be
          // the minimum level that is enabled.
          var minSeverityNumber = null;

          var name = widgetName;

          var urlParms = dojo.queryToObject(window.location.search.substr((dojo.doc.location.search[0] === '?' ? 1 : 0)));
          if (typeof urlParms.logging == 'string') {
            switch (urlParms.logging.toLowerCase())
            {
              case 'all':
                minSeverityNumber = 0;
                break;
              case 'debug':
                minSeverityNumber = 3;
                break;
              case 'info':
              case '':
                minSeverityNumber = 7;
                break;
              case 'warning':
                minSeverityNumber = 8;
                break;
              case 'error':
                minSeverityNumber = 9;
                break;

              default:
                console.error('Logging level ' + urlParms.logging + ' is invalid. Valid values: all | debug | info | warning | error');
                minSeverityNumber = 7;
            }
          } else {
            minSeverityNumber = 7;
          }



          // minSeverityNumber should now be the trace level for this widget
          // so enable trace if the requested level is at least the minimum
          writeTrace = (severityNumber >= minSeverityNumber);
        }else {
          //Throw an error because our the widgetName must be specified
          if (!widgetName) {
            console.error(' No widget name specified for trace : '+ severity + ' : ' + message);
            console.trace();
            writeTrace = true;
          }
        }

        if (writeTrace == true) {

          // build up the trace string

          // pad out to 30chars, or trim to right most 30chars
          //                123456789012345678901234567890=30spaces
          var paddedWidgetName = widgetName;
          if (paddedWidgetName.length < trace.WIDGET_NAME_DISPLAY_LENGTH) {
            paddedWidgetName += trace.PADDING.substring(0,
                trace.WIDGET_NAME_DISPLAY_LENGTH - paddedWidgetName.length);
          } else if (paddedWidgetName.length > trace.WIDGET_NAME_DISPLAY_LENGTH) {
            paddedWidgetName = paddedWidgetName.substring(
                paddedWidgetName.length - trace.WIDGET_NAME_DISPLAY_LENGTH,
                paddedWidgetName.length);
          }

          // make severity always be the badded to the right length
          var severityString = severity.name + trace.PADDING;
          severityString = severityString.substring(0,
              trace.SEVERITY_DISPLAY_LENGTH);

          // the string to be shown
          var date = new Date();
          var timestamp = date.getFullYear() + '-' +
              (date.getMonth() + 1) + '-' +
              date.getDate() + ' ' +
              date.getHours() + ':' +
              date.getMinutes() + ':' +
              date.getSeconds() + '.' +
              date.getMilliseconds();

          var traceString = timestamp + ' ' + paddedWidgetName + ' ' + severityString + ' '+ severity.symbol + ' ' + message + ' ';

          //set log filter based on ?logComponent=.... uri parameter
          var traceComponentFilter = '';
          if (urlParms.logComponent) {
            traceComponentFilter = urlParms.logComponent;
          }

          //decide if we should trace based on component name
          var componentMatches = true;
          if (traceComponentFilter.length > 0) {
            var componentArray = traceComponentFilter.split(',');
            componentMatches = Array.some(componentArray, function(item) {
              if (widgetName.substring(0, item.length) == item) {
                return true;
              }else {
                return false;
              }
            });
          }
          if (componentMatches) {
            if (severityNumber < trace.levels.INFO.level) {
              console.debug(traceString, infoObject);
            } else if (severityNumber == trace.levels.DEBUG.level) {
              console.log(traceString, infoObject);
            } else if (severityNumber == trace.levels.INFO.level) {
              console.info(traceString, infoObject);
            } else if (severityNumber == trace.levels.WARNING.level) {
              console.warn(traceString, infoObject);
            } else {
              console.error(traceString, infoObject);
            }
          }

          if (trace.serverLoggingEnabled) {

            // cannot serialize DOM nodes, so need to toString the infoObject in case it's a DOM node.
            // this stops the later dojo.toJson call blowing up
            if (infoObject != null)
              infoObject = ''+ infoObject;
            if (message == undefined)
              message = '';

            var data = {
              widgetName: widgetName,
              severity: severity.name,
              message: message,
              args: infoObject
            };

            // add the trace line to the buffer, and if the buffer has reached it's threshold then
            // post the trace to the server.
            if (trace.buffer.push(data) >= trace.BUFFER_SIZE_THRESHOLD)
            {
              //console.info("Trace buffer reached "+trace.BUFFER_FLUSH_THRESHOLD+". Flushing");
              trace.postTraceBuffer();
            }
          }
        }
      } catch (e) {
        console.error('ERROR while tracing', e, [severity, message, infoObject]);
      }
    },

    postTraceBuffer: function() {
      var buffer = this.buffer;
      //console.info("_postTraceBuffer ");
      //console.info("length is "+buffer.length);

      if (buffer.length > 0) {
        var dataAsString = json.stringify(buffer);
        buffer.length = 0; // empty the array

        // xhrPost is dangerous.  When used heavily used (threshold 1 for example) the many
        // repeated calls appear to cause dojo to process async responses at random times, ie not
        // when the current "thread" has finished, but interrupting current processing.  Things
        // then happen out of order and weird bugs appear.  Switching to using a "raw" ajax call
        // instead of dojo's xhrPost makes the problem go away!  I suspect dojo.xhrPost uses some
        // dojo.connects under the covers and the connect architecture fails under load.
        /*
          dojo.xhrPost( {
            url : "/ui/handler/trace",
            headers: {"Content-Type": "text/json"},
            postData : dataAsString,
            load: function(){},
            error: function(){},
            sync: true
          });
          */
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', '/ui/handler/trace', false);
        xmlhttp.send(dataAsString);
        if (xmlhttp.status != 200) {
          // there was a problem, the trace probably didn't get to the server, if it's
          // intermittent it would be nice to leave a message on the server when it starts
          // working again so we realise things have gone bad.
          buffer.push({
            widgetName: 'ui.Globals',
            severity: this.levels.ERROR.name,
            message: 'Error sending trace to server.  Previous UI trace discarded',
            args: ''
          });
        }
      }
    }
  };

});

},
'url:webui/widgets/templates/Selector.html':"<div id=\"_id\"  data-dojo-attach-point='selectorDijitId' style=\"clear:both\" class=\"webui_selector_container\">\r\n    <h1 class=\"webui_selector\">${titleString}</h1>\r\n\r\n    <div class=\"webui_selector\">\r\n        <div data-dojo-attach-point=\"applicationMonitoringDiv\" role=\"region\" aria-labelledby=\"applicationMonitoringTitle\">\r\n            <h2 id=\"applicationMonitoringTitle\">${applicationMonitoringTitle}</h2>\r\n            <table data-dojo-attach-point=\"applicationMonitoringAttach\" role=\"presentation\"></table>\r\n        </div>\r\n        <div data-dojo-attach-point=\"operationalMonitoringDiv\" role=\"region\" aria-labelledby=\"operationalMonitoringTitle\">\r\n            <h2 id=\"operationalMonitoringTitle\">${operationalMonitoringTitle}</h2>\r\n            <div class=\"subheading\">${operationalMonitoringDesc}</div>\r\n            <table data-dojo-attach-point=\"operationalMonitoringAttach\" role=\"presentation\"></table>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n",
'url:webui/widgets/templates/OperationalMonitoring.html':"<div id=\"_id\"  data-dojo-attach-point='operationalMonitoringDijitId' style=\"clear:both\" class=\"operational_monitoring_container\">\r\n    <h1 class=\"webui_selector\">${titleString}</h1>\r\n    <div class=\"operational_monitoring\" id=\"operationalMonitoringMain\">\r\n        <div data-dojo-attach-point='gridId' class=\"gridxContainer\">\r\n            <div data-dojo-attach-point='loadingIcon' class=\"widget loadingIcon\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n",
'*now':function(r){r(['dojo/i18n!*preload*webui/nls/main*["de","es","fr","ja","pl","pt-br","tr","zh-cn","zh-tw"]']);}
}});
/* stub file - replaced during build */
