<%@ page import="com.ibm.broker.webui.LocaleUtils" %>
<!DOCTYPE html>
<!--   
  <copyright 
  notice="lm-source" 
  pids="5724-J06,5724-J05,5724-J04,5697-J09,5655-M74,5655-M75,5648-C63,5655-AB1,5655-AB2" 
  years="2011,2016" 
  crc="2547500599" > 
  Licensed Materials - Property of IBM  
   
  5724-J06,5724-J05,5724-J04,5697-J09,5655-M74,5655-M75,5648-C63,5655-AB1,5655-AB2 
   
  (C) Copyright IBM Corp. 2011, 2016 All Rights Reserved.  
  </copyright> 
-->
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- Force no compatibility modes for IE. Not HTML5 compliant! -->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">

    <META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">  
    <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE"> 

    <!--  Do not add more stylesheets here - @import them in Main.css as we can optimise downloads during the build this way -->
    <link rel='stylesheet' href='/webui/widgets/common/css/Main.css' type='text/css'/>

    <script>
      if(window.WebSocket){
        document.write("<script src='/thirdparty/mqttws31.js' type='text/javascript'><\/script>"); 
      };
    </script>  
    
    <script type="text/javascript">
      var dojoConfig = {
        "async": true,
        "locale": "<%=LocaleUtils.getDojoLocaleString(request)%>",
        "parseOnLoad": true,
        "packages": [
          { "location": "/thirdparty/d3js", "name": "d3js", "main": "d3.v3.min" }
        ],
        "deps": ["/idx/main.js.uncompressed.js", "/webui/webui.js.uncompressed.js"],
        "gfxRenderer": "svg,canvas,vml",
        "callback": function() {
          require([
            "dojo/dom-class",
            "dojo/has",
            "dijit/layout/BorderContainer",
            "webui/widgets/common/CurrentUser",
            "webui/widgets/common/WMBConsole",
            "dojo/domReady!"
          ], function(
            domClass,
            has,
            BorderContainer,
            CurrentUser,
            WMBConsole
          ) {
            // Test browser versions and show message if not right - IE11 not supported by current dojo has method hence the check for Trident
            if(has("ie") >= 8 || has("ff") >= 17 || has("chrome") >= 26 || this.navigator.userAgent.search("Trident\/7.0")){
              //Hide div if browser looks ok
              domClass.add("_unsupportedLoginID","_common_hideDiv ");
            } else {
              var userAgentArray = this.navigator.userAgent.match(/(msie|firefox|opera|chrome|safari)\/?\s*(\.?\d+(\.\d+)*)/i);
              if((userAgentVersion = navigator.userAgent.match(/version\/([\.\d]+)/i)) && userAgentArray != null){
                userAgentArray[2] = userAgentVersion[1];
              }
              userAgentArray = userAgentArray ? [userAgentArray[1], userAgentArray[2]] : [this.navigator.appName, navigator.appVersion, '-?'];
                  
              console.error(this.navigator.userAgent);
              console.error(userAgentArray);
            }
      
            window.currentuser = new CurrentUser();
            window.currentuser.populate().then(function(result) {
              if(result === true) {
                window.wmbConsole = new WMBConsole();
              } else {
                // Do nothing. The user has been shown the error message
                // and will be logged out when they click OK
              }
            });
          });
        }
      };
    </script>
    
    <script type="text/javascript" src="/dojo/dojo.js.uncompressed.js"></script>
    
    <title>IBM Integration</title>
  </head>
  
  <body class="oneui">
    <div id="header"></div>
    <div data-dojo-type="dijit.layout.BorderContainer" id="_explorerBorderContainer_ID" data-dojo-props="gutters:true"
    data-dojo-attach-point="_explorerTree_borderContainer" style="width:100%;height:100%;padding:0px">    
      <div data-dojo-type="dijit.layout.ContentPane" style="width: 200px" data-dojo-attach-point="_explorerTree_treeContainer"
      id="_explorerTree_treeContainer" data-dojo-props="splitter:true, region:'leading'">
        <div id="_tree_filtering_options" class="filtering_options_anchor" data-dojo-attach-point="_filtering_options" ></div>
        <div data-dojo-attach-point="_tree" id="_tree_ID" class="explorerTree_tree"></div>
      </div>
      <div data-dojo-type="dijit.layout.ContentPane" id="_explorerTree_infoPaneContainer" data-dojo-props="region:'center'"
      class="_explorerTree_infoPaneContainer">
        <div id="messageContainer" class="infoPane_messages"></div>
        <div id="_infoPaneTitleBranding" class="UI_TopRight_BrandingBanner"></div>
        <div id="titleContainer">
          <div id="_infoPaneTitleImageID"></div>
          <div id="_infoPaneTitleID" class="pageHeader2 _infoPaneTitle"></div>
        </div>
        <div id="_explorerTree_infoPane"  class="_explorerTree_infoPane"></div>
      </div>
    </div>
    <div id="errorDialog"></div>
    <div class="unsupportedBrowser _common_hideDiv " id="_unsupportedLoginID"></div>
  </body>
</html>
