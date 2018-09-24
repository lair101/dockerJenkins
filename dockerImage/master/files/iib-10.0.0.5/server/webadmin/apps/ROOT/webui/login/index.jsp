<%@ page import="com.ibm.broker.webui.LocaleUtils" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd" data-page="login">
<!-- 
  <copyright 
  notice="lm-source" 
  pids="5724-J06,5724-J05,5724-J04,5697-J09,5655-M74,5655-M75,5648-C63,5655-AB1,5655-AB2" 
  years="2011,2016" 
  crc="1680118286" > 
  Licensed Materials - Property of IBM  
   
  5724-J06,5724-J05,5724-J04,5697-J09,5655-M74,5655-M75,5648-C63,5655-AB1,5655-AB2 
   
  (C) Copyright IBM Corp. 2011, 2016 All Rights Reserved.  
  </copyright> 
 -->
<html style="height:100%">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Force no compatibility modes for IE. Not HTML5 compliant! -->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  
    <META HTTP-EQUIV="PRAGMA" CONTENT="NO-CACHE">  
    <META HTTP-EQUIV="CACHE-CONTROL" CONTENT="NO-CACHE"> 
    <title>IBM Integration Bus</title>
    <!--  Do not add more stylesheets here - @import them in login.css as we can optimise downloads during the build this way -->
    <link rel='stylesheet' href='/webui/login/css/login.css' type='text/css'/>
  
    <script type="text/javascript">
      var dojoConfig = {
        parseOnLoad: true,
        locale: "<%=LocaleUtils.getDojoLocaleString(request)%>",
        deps: ["/webui/webui.js", "/idx/main.js"],
        gfxRenderer: 'svg,canvas,vml'
      };
    </script>
    <script type="text/javascript" src="/dojo/dojo.js"></script>
    <script type="text/javascript">
      require(
        [
          "dojo/i18n!webui/login/nls/web",
          "dojo/dom-class",
          "dojo/has",
          "webui/login/config/Resources",
          "dojo/_base/sniff",
          "webui/login/widgets/SignIn",
          "dojo/domReady!"
        ],
        function(
          NLS, // TODO: is this used?
          domClass,
          has,
          Resources
        ){
          // Check if the browser is supported - IE11 not supported by current dojo has method hence the check for Trident
          if((has("ie") >= 8) || (has("ff") >= 17) || (has("chrome") >= 26) || this.navigator.userAgent.search("Trident\/7.0")){
            domClass.add("_unsupportedLoginID","_common_hideDiv ");
          } else {
            var userAgentArray= this.navigator.userAgent.match(/(msie|firefox|opera|chrome|safari)\/?\s*(\.?\d+(\.\d+)*)/i);
            if((userAgentVersion = navigator.userAgent.match(/version\/([\.\d]+)/i))&& userAgentArray != null){
              userAgentArray[2] = userAgentVersion[1];
            }
            userAgentArray = userAgentArray? [userAgentArray[1], userAgentArray[2]]: [this.navigator.appName, navigator.appVersion, '-?'];
            console.error(this.navigator.userAgent);
            console.error(userAgentArray);
          }
        }
      );      		
    </script>
  </head>
  <body class="tundra" style="height:100%">	
    <div class="unsupportedBrowser _common_hideDiv " id="_unsupportedLoginID">
        
    </div>
  	<div data-dojo-type="webui.login.widgets.SignIn" id="login"></div>
  </body>
</html>
