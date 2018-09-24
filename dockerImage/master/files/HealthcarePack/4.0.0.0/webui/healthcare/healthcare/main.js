/*
 * <copyright notice="oco-source" pids="5725-C18" years="2015" /> 
 */
//>>built
require({cache:{"healthcare/config":function(){define(["dojo/i18n!healthcare/nls/web","dojo/_base/declare","webui/Trace"],function(_1,_2,_3){"use strict";var _4=_2([],{});_4.nls=_1;_4.selectorConfig={titleString:_1.title+" "+_1.version,applicationMonitoringTitle:_1.applicationMonitoringTitle,applicationMonitoring:[{widget:"healthcare.widgets.ClinicalMonitoring"}],operationalMonitoring:[{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"XDSConsumer",patternDescription:_1.XDSConsumerPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"FHIRTransformation",patternDescription:_1.FHIRTransformationPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"HIPAAtoXML",patternDescription:_1.HIPAAtoXMLPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"HL7toHL7DFDL",patternDescription:_1.HL7toHL7DFDLPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"HL7toHL7",patternDescription:_1.HL7toHL7Pattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"HomeHealth",patternDescription:_1.HomeHealthPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"MedicalDevicesEMR",patternDescription:_1.DevicesEMRPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"PIXManager",patternDescription:_1.PIXManagerPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"PDQSupplier",patternDescription:_1.PDQSupplierPattern}},{widget:"webui.widgets.OperationalMonitoring",config:{patternId:"WebDICOM",patternDescription:_1.WebDICOMPattern}}]};_4.supportedBrowsers=[{"name":"Google Chrome 31+","test":"chrome","minimum":31},{"name":"Microsoft Internet Explorer 10","test":"ie","minimum":10},{"name":"Microsoft Internet Explorer 11","test":"trident","minimum":7},{"name":"Mozilla Firefox 24+","test":"ff","minimum":24},{"name":"Apple Safari 7+","test":"safari","minimum":7}];return _4;});},"healthcare/widgets/ClinicalMonitoring":function(){define(["dojo/i18n!healthcare/nls/web","dojo/i18n!webui/nls/web","dojo/text!./templates/ClinicalMonitoring.html","dojo/domReady!","dojo/_base/lang","dojo/_base/declare","dojo/_base/array","dojo/store/Memory","dojo/dom-construct","dijit/_WidgetBase","dijit/_TemplatedMixin","gridx/Grid","gridx/core/model/cache/Sync","gridx/modules/ColumnResizer","gridx/modules/extendedSelect/Row","gridx/modules/Tree","gridx/modules/CellWidget","gridx/modules/VirtualVScroller","gridx/modules/TouchScroll","gridx/modules/CellWidget","gridx/modules/SingleSort","idx/form/Link","healthcare/clinicalAppUtils","webui/BrokerStore","webui/websocketManager","webui/Trace"],function(_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_15,_18,_19,_1a,_1b,_1c,_1d){var _1e="healthcare.widgets.ClinicalMonitoring";"use strict";var _1f=_a([_e,_f],{widgetName:_1e,templateString:_7,title:_5.applicationMonitoringTitle,baseClass:"clinicalmonitoring",expandAllString:_5.expandAll,collapseAllString:_5.collapseAll,loadingIcon:null,grid:null,store:null,structure:null,headerGroups:null,constructor:function(_20,_21){_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.ENTRY,"constructor",[_20]);_9.mixin(this,_20);var _22="110px";var _23=this;this.structure=[{id:"col_inApp",field:"inApp",name:_5.clinicalMonitoring_InApp,width:_22},{id:"col_inOpen",field:"inOpen",name:_5.clinicalMonitoring_InOpen,width:_22},{id:"col_inFailed",field:"inFailed",name:_5.clinicalMonitoring_InFailed,width:_22},{id:"col_inMessages",field:"inMessages",name:_5.clinicalMonitoring_InMessages,width:_22},{id:"col_inAck",field:"inAck",name:_5.clinicalMonitoring_InAck,width:"132px"},{id:"col_patternInstance",field:"patternDesc",name:_5.clinicalMonitoring_PatternInstance,width:"160px","widgetsInCell":true,decorator:function(){return "<div data-dojo-attach-point=\"patternLink\" data-dojo-type=\"idx/form/Link\"></div>";},"setCellValue":function(_24,_25,_26){if(typeof _24!=="undefined"){_26.patternLink.set("label",_24);}},"getCellWidgetConnects":function(_27,_28){return [[_27.patternLink,"onClick",function(e){_23._viewPattern(_27,_28,e);}]];}},{id:"col_outMessages",field:"outMessages",name:_5.clinicalMonitoring_OutMessages,width:_22},{id:"col_outAck",field:"outAck",name:_5.clinicalMonitoring_OutAck,width:"132px"},{id:"col_outOpen",field:"outOpen",name:_5.clinicalMonitoring_OutOpen,width:_22},{id:"col_outFailed",field:"outFailed",name:_5.clinicalMonitoring_OutFailed,width:_22},{id:"col_outApp",field:"outApp",name:_5.clinicalMonitoring_OutApp,width:_22}];this.brokerStore=_1b.getBrokerStore();_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.EXIT,"constructor");},postCreate:function(){_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.ENTRY,"postCreate");var _29=this;this.loadingIcon.title=_6.loading;_1a.getClinicalApps().then(function(_2a){_1d.trace(_29.widgetName+" ("+_29.id+")",_1d.levels.ENTRY,"postCreate.then");_29.store=new _c({data:_2a,});_29.grid=new _10({store:_29.store,structure:_29.structure,cacheClass:_11,bodyEmptyInfo:_5.clinicalMonitoring_NoValidPatternsMsg,modules:[_14,_16,_17,_12,_13,_15,_18]});_29.grid.placeAt(_29.gridId);_29.brokerStore.getBroker().then(function(_2b){var _2c=_1c.subscribe("$SYS/Broker/"+_2b.name+"/Statistics/JSON/Resource/#",function(_2d){var _2e=_2d.destinationName.split("/")[6];payloadObj=_2d.payloadObj.ResourceStatistics;var _2f=payloadObj.ResourceType;for(var _30=0;_30<_2f.length;_30++){if(_2f[_30].name==="TCPIPServerNodes"){var _31=_2f[_30].resourceIdentifier;for(var _32=0;_32<_31.length;_32++){for(var _33=0;_33<_2a.length;_33++){if(_2a[_33].inConnection===_31[_32].name&&_2e===_2a[_33].intServer){_2a[_33].inOpen=+_31[_32].OpenConnections;_2a[_33].inFailed=+_31[_32].FailedSSLConnections;_2a[_33].inMessages=+_31[_32].MessagesReceived;_2a[_33].inAck=+_31[_32].MessagesSent;}}}}else{if(_2f[_30].name==="TCPIPClientNodes"){var _31=_2f[_30].resourceIdentifier;for(var _32=0;_32<_31.length;_32++){for(var _33=0;_33<_2a.length;_33++){if(_2a[_33].outConnection===_31[_32].name&&_2e===_2a[_33].intServer){_2a[_33].outOpen=+_31[_32].OpenConnections;_2a[_33].outFailed=+_31[_32].FailedConnections;_2a[_33].outMessages=+_31[_32].MessagesSent;_2a[_33].outAck=+_31[_32].MessagesReceived;}}}}}}_29.grid.model.clearCache();_29.grid.model.store.setData(_2a);_29.grid.body.refresh();});});_1d.trace(_29.widgetName+" ("+_29.id+")",_1d.levels.EXIT,"postCreate.then");});_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.EXIT,"postCreate");},startup:function(){_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.ENTRY,"startup");var _34=this;_1a.getClinicalApps().then(function(){_1d.trace(_34.widgetName+" ("+_34.id+")",_1d.levels.ENTRY,"startup.then");_d.destroy(_34.loadingIcon);_34.grid.startup();if(_34.gridId.offsetHeight<200){_1d.trace(_34.widgetName+" ("+_34.id+")",_1d.levels.INFO,"startup(): Got very small space for grid \""+_34.gridId.offsetHeight+"\" (probably on android/ios), forcing a new size");_34.grid.resize({h:800});}_1d.trace(_34.widgetName+" ("+_34.id+")",_1d.levels.EXIT,"startup.then");});_1d.trace(this.widgetName+" ("+this.id+")",_1d.levels.EXIT,"startup");},resize:function(){if(this.grid){this.grid.resize();}},uninitialize:function(){_1d.trace(this.widgetName,_1d.levels.ENTRY,"uninitialize");_1d.trace(this.widgetName,_1d.levels.EXIT,"uninitialize");},_viewPattern:function(_35,_36,e){_1d.trace(this.widgetName,_1d.levels.ENTRY,"_viewPattern",[_35,_36,e]);window.selector.loadNewWidget("webui.widgets.OperationalMonitoring",{patternId:_36.row.item().patternName,patternInstance:_36.row.item().patternInstanceName});_1d.trace(this.widgetName,_1d.levels.EXIT,"_viewPattern");}});_1f.getTitleString=function(_37){_1d.trace(_1e,_1d.levels.ENTRY,"getTitleString",[_37]);var ret=_5.applicationMonitoringTitle;_1d.trace(_1e,_1d.levels.EXIT,"getTitleString",[ret]);return ret;};return _1f;});},"healthcare/nls/web":function(){define({root:({version:"4.0.0.0",legalText:"Licensed Materials - Property of IBM Corp. 5725-C18 © Copyright 2015 IBM Corporation. IBM and the IBM logo are trademarks of IBM Corporation, registered in many jurisdictions worldwide. This Program is licensed under the terms of the license agreement accompanying the Program. This license agreement may be either located in a Program directory folder or library identified as &quot;License&quot;, if applicable, or provided as a printed license agreement. Please read this agreement carefully before using the Program. By using the Program, you agree to these terms.",title:"Welcome to IBM Integration Bus Healthcare Pack",headerTitle:"IBM Integration Bus Healthcare Pack",applicationMonitoringTitle:"Clinical Application Monitoring",XDSConsumerPattern:"Cross-Enterprise Document Sharing Consumer",FHIRTransformationPattern:"FHIR Transformation",HIPAAtoXMLPattern:"HIPAA to XML",HL7toHL7DFDLPattern:"HL7 to HL7 DFDL",HL7toHL7Pattern:"HL7 to HL7",HomeHealthPattern:"Home Health",DevicesEMRPattern:"Medical devices to EMR",PIXManagerPattern:"Patient Identifier Cross-reference Manager",PDQSupplierPattern:"Patient Demographics Query Supplier",WebDICOMPattern:"Web service to DICOM",UserDefinedPattern:"User-defined",clinicalMonitoring_InApp:"Source Applications",clinicalMonitoring_InAppTooltip:"Name of the source application",clinicalMonitoring_InOpen:"Open Inbound Connections",clinicalMonitoring_InOpenTooltip:"Number of open connections between the source application and IBM Integration Bus (since you started the integration server)",clinicalMonitoring_InFailed:"Rejected Inbound Connections",clinicalMonitoring_InFailedTooltip:"Number of SSL connections between the source application and IBM Integration Bus that were rejected (since you started the integration server)",clinicalMonitoring_InMessages:"Received Messages",clinicalMonitoring_InMessagesTooltip:"Total number of messages received by IBM Integration Bus from the source application (since you started the integration server)",clinicalMonitoring_InAck:"Sent Acknowledgments",clinicalMonitoring_InAckTooltip:"Total number of acknowledgments sent from IBM Integration Bus to the destination application (since you started the integration server)",clinicalMonitoring_PatternInstance:"Pattern Instance",clinicalMonitoring_PatternInstanceTooltip:"Pattern instance that transforms and routes messages between the source application and the destination application (and the integration server to which it is deployed)",clinicalMonitoring_OutMessages:"Sent Messages",clinicalMonitoring_OutMessagesTooltip:"Total number of messages sent from IBM Integration Bus to the destination application (since you started the integration server)",clinicalMonitoring_OutAck:"Received Acknowledgments",clinicalMonitoring_OutAckTooltip:"Total number of acknowledgments received by IBM Integration Bus from the destination application (since you started the integration server)",clinicalMonitoring_OutOpen:"Open Outbound Connections",clinicalMonitoring_OutOpenTooltip:"Number of open connections between IBM Integration Bus and the destination application (since you started the integration server).",clinicalMonitoring_OutFailed:"Failed Outbound Connections",clinicalMonitoring_OutFailedTooltip:"Number of connections that failed to connect between IBM Integration Bus and the destination application (since you started the integration server)",clinicalMonitoring_OutApp:"Destination Applications",clinicalMonitoring_OutAppTooltip:"Name of the destination application",clinicalMonitoring_UnknownApp:"Not Defined",clinicalMonitoring_Filter:"Filter:",clinicalMonitoring_FilterClear:"Clear Filter",clinicalMonitoring_FilterResults:"Showing filtered results",clinicalMonitoring_FilterNoResults:"No results",clinicalMonitoring_OperationalLinkTooltip:"Open Operational Monitoring for this pattern instance in a new tab",clinicalMonitoring_NoValidPatternsMsg:"There are no pattern instances deployed to this integration node that support connectivity between clinical applications. Deploy at least one pattern instance that supports clinical application connectivity, then reload this page.",clinicalMonitoring_Loading:"Loading...",expandAll:"Expand all",collapseAll:"Collapse all"}),"de":true,"es":true,"fr":true,"ja":true,"pl":true,"pt-br":true,"tr":true,"zh-cn":true,"zh-tw":true});},"healthcare/clinicalAppUtils":function(){define(["dojo/i18n!healthcare/nls/web","dojo/i18n!webui/nls/web","dojo/_base/declare","dojo/_base/array","dojo/_base/lang","dojo/promise/all","webui/Trace"],function(_38,NLS,_39,_3a,_3b,all,_3c){"use strict";var _3d="healthcare.clinicalAppUtils";function _3e(){_3c.trace(_3d,_3c.levels.ENTRY,"getClinicalApps");var ret=window.selector.brokerStore.getAllMessageFlows({"loadDesign":true,"loadProperties":true}).then(function(_3f){_3c.trace(_3d,_3c.levels.ENTRY,"getClinicalApps.then",[_3f]);var _40=[];var _41=[];var _42=false;var _43=0;_3a.forEach(_3f,function(_44){var _45=_44.getFlowDesign().then(function(_46){var _47=_46.userDefinedProperties;_43++;var _48=false;for(var _49=0;_49<_47.length;_49++){if(_47[_49].name==="Identifier1"){var _4a=_47[_49].value;}else{if(_47[_49].name==="Identifier2"){var _4b=_47[_49].value;}else{if(_47[_49].name==="Identifier3"){var _4c=_47[_49].value;}else{if(_47[_49].name==="TCPIPNode"){_48=true;_42=true;var _4d=_47[_49].value.split("/")[1];}}}}}if(_48===true){var _4e=_44.getFlowProperties().then(function(_4f){var _50=_4f.customDescProperties.PatternName;var _51=_44.parentEG.name;if(_4b==="Source"){var _52=false;for(_49=0;_49<_41.length;_49++){if(_41[_49].patternDesc===(_4a+" ("+_51+")")&&_41[_49].patternName===_50){_41[_49].inApp=_4c;_41[_49].inConnection=_4d;_52=true;}}if(_52===false){_41.push({flowname:_44.name,patternInstanceName:_4a,patternDesc:_4a+" ("+_51+")",patternName:_50,inApp:_4c,inConnection:_4d,outApp:_38.clinicalMonitoring_UnknownApp,intServer:_51,placeholder:true,id:_41.length});}}else{if(_4b==="Destination"){var _52=false;for(_49=0;_49<_41.length;_49++){if(_41[_49].patternDesc===(_4a+" ("+_51+")")&&_41[_49].patternName===_50){if(_41[_49].placeholder){_41[_49].outApp=_4c;_41[_49].outConnection=_4d;_41[_49].placeholder=false;}else{_41.push({flowname:_44.name,inApp:_41[_49].inApp,inConnection:_41[_49].inConnection,patternInstanceName:_4a,patternDesc:_4a+" ("+_51+")",patternName:_50,outApp:_4c,outConnection:_4d,intServer:_51,id:_41.length});}_52=true;break;}}if(_52===false){_41.push({flowname:_44.name,inApp:_38.clinicalMonitoring_UnknownApp,patternInstanceName:_4a,patternDesc:_4a+" ("+_51+")",patternName:_50,outApp:_4c,outConnection:_4d,intServer:_51,id:_41.length});}}}});}});_40.push(_45);});var _53=all(_40).then(function(_54){_3c.trace(_3d,_3c.levels.ENTRY,"getClinicalApps.then.all.then",[_54]);_3c.trace(_3d,_3c.levels.EXIT,"getClinicalApps.then.all.then",[_41]);return _41;});_3c.trace(_3d,_3c.levels.ENTRY,"getClinicalApps.then",[_53]);return _53;});_3c.trace(_3d,_3c.levels.EXIT,"getClinicalApps",[ret]);return ret;};return {getClinicalApps:_3e};});},"url:healthcare/widgets/templates/ClinicalMonitoring.html":"<div id=\"_id\" class=\"clinicalmonitoring main\" data-dojo-attach-point='selectorDijitId'>\r\n\r\n    <h1>${title}</h1>\r\n    <div data-dojo-attach-point='gridId' class=\"gridxContainer\">\r\n        <div class=\"${baseClass} toolbar\">\r\n             <!-- <button class=\"${baseClass} toolbar_icon expand_all\" data-dojo-attach-event=\"onclick: expandAll\">\r\n                 ${expandAllString}</button>\r\n             <button class=\"${baseClass} toolbar_icon collapse_all\" data-dojo-attach-event=\"onclick: collapseAll\">\r\n                 ${collapseAllString}</button> -->\r\n             <div data-dojo-attach-point='loadingIcon' class=\"widget loadingIcon\"></div>\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n\r\n","*now":function(r){r(["dojo/i18n!*preload*healthcare/nls/main*[\"de\",\"es\",\"fr\",\"ja\",\"pl\",\"pt-br\",\"tr\",\"zh-cn\",\"zh-tw\"]"]);}}});