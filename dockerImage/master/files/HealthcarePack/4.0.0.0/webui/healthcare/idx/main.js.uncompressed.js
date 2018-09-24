/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

require({cache:{
'idx/containers':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * @name idx.containers
 * @class Extension module for ensuring "_idxStyleChildren" from "idx.widgets" is called
 *        whenever "addChild" or "removeChild" method is called on a container.  This is
 *        automatically included with "idx.ext" module.
 */
define(["dojo/_base/lang","idx/main","dijit/_Container","dijit/_WidgetBase","idx/widgets"],
	function(dLang,iMain,dContainer) {
	var iContainers = dLang.getObject("containers", true, iMain);
	
	// get the combo button prototype
	var baseProto  = dContainer.prototype;
    
	// 
	// Get the base functions so we can call them from our overrides
	//
	var baseAddChild  = baseProto.addChild;
	var baseRemoveChild = baseProto.removeChild;
	
    baseProto.addChild = function(child,index) {
    	if (baseAddChild) baseAddChild.call(this, child, index);
    	if (this._started) {
    		this._idxStyleChildren();
    	}
    };
    
    baseProto.removeChild = function(child) {
    	if (baseRemoveChild) baseRemoveChild.call(this, child);
    	if (typeof child == "number") {
    		child = this.getChildren()[child];
    	}
    	if (this._started) {
    		this._idxStyleChildren();
    	}
    };    
    
    return iContainers;
});
},
'idx/app/LoginFrame':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/kernel",
        "dojo/keys",
        "dojo/aspect",
        "dojo/Deferred",
        "dojo/when",
        "dojo/promise/Promise",
        "dojo/promise/all",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dijit/focus",
        "dojo/query",
        "dojo/dom-style",
        "../string",
        "../resources",
        "dojo/text!./templates/LoginFrame.html",
        "dijit/form/Form",
        "dijit/form/Button",
        "dijit/form/ValidationTextBox",
        "idx/form/TextBox",
        "idx/widget/Dialog",
        "dojo/i18n!./nls/LoginFrame",
        "dojo/i18n!idx/widget/nls/ModalDialog",
        "dojo/i18n!idx/widget/nls/base",
        "dojo/i18n!./nls/base",
        "dojo/i18n!../nls/base"
        ],
        function(dDeclare,					// (dojo/_base/declare)
				 dLang,						// (dojo/_base/lang)
				 dKernel,					// (dojo/_base/kernel)
				 dKeys,                     // (dojo/keys)
				 dAspect,					// (dojo/aspect)
				 dDeferred,					// (dojo/Deferred)
				 dWhen,						// (dojo/when)
				 dPromise,					// (dojo/promise/Promise)
				 dPromiseAll,				// (dojo/promise/all)
		         dWidget,					// (dijit/_Widget)
		         dTemplatedMixin,			// (dijit/_TemplatedMixin)
		         dWidgetsInTemplateMixin,	// (dijit/_WidgetsInTemplateMixin)
		         dFocus,					// (dijit/focus)
		         dQuery,					// (dojo/query)
		         dDomStyle,					// (dojo/dom-style) for (dDomStyle.set)
		         iString,					// (idx/string)
		         iResources,				// (idx/resources)
		         templateText)				// (dojo/text!./templates/LoginFrame.html) 
{
	
	/**
	 * @name idx.app.LoginFrame
	 * @class The LoginFrame provides the standard login screen.
	 * @augments dijit._Widget
	 * @augments dijit._TemplatedMixin
	 * 
	 */
return dDeclare("idx.app.LoginFrame", [dWidget,dTemplatedMixin,dWidgetsInTemplateMixin],
		  /**@lends idx.app.LoginFrame#*/		
{
  /**
   * @private
   */
  baseClass: "idxLoginFrame",

  /**
   * The path to the widget template for the dijit._TemplatedMixin base class.
   * 
   * @private
   * @constant
   * @type String
   */
  templateString: templateText,
 
  /** 
   * Allow users to add other components (e.g. hidden fields) under password field
   * 
   * @private
   */
  isContainer: true,
  
  /**
   * The name to assign to the form used by LoginFrame.
   * @default ""
   */
  formName: "",
  
  /**
   * The action for the form.  This defaults to empty-string.  If specified
   * as a non-empty value, this URL is submitted on a hidden iframe in the 
   * LoginFrame widget.  This form submission is needed by some browsers to 
   * cause credentials to be remembered for later auto-completion/auto-fill
   * functionality.  Even though submission occurs you can still handle login
   * via the JavaScript handler. See the "onSubmit" function for how to cancel
   * this submission as well.  If this URL is left blank then no submission is
   * done and auto-complete/auto-fill functionality and-or password vault 
   * extensions/plugins may not function properly.
   */
  formAction: "",
 
  /**
   * The target window/frame for the form submission if the formActio is configured
   * and actual HTML form submission will occur.  By default, the form taget is set
   * to empty-string ("") which is a special value which indicates that a hidden 
   * iframe that is part of the widget should be used as the target.  The hidden 
   * iframe is handy for triggering the browser and extensions/plugins to remember 
   * the credentials for auto-fill of the form at a later date.
   * <p>
   * Alternatively, you can set this to values like "_self", "_parent", "_top", 
   * "_blank" or the name of any frame or window.  Use "_self" if your login frame
   * is a stand-alone page that submits and retrieves the application afer login in
   * order to replace the current page wiht a new page.
   */
  formTarget: "",
  
  /**
   * Title to be displayed above the login form.
   * @public
   * @field
   * @type String
   * @default "Login"
   */
  loginTitle: "",
  
  /**
   * Subtitle to be displayed immediately beneath {@link idx.app.LoginFrame#loginTitle}
   * @public
   * @field
   * @type String
   * @default "Please enter your information"
   */
  loginSubTitle: "",
  
  /**
   * The character sequence to use as a label separator.  Typically a colon (":") in the en_us locale. 
   * @public
   * @field
   * @type String
   * @default ":"
   */
  labelSeparator: "",
  
  /**
   * @private
   */
  _setFormActionAttr: function(value) {
  	this.formAction = value;
  	this._form.set("action", value);
  },
  
  /**
   * @private
   */
  _setFormTargetAttr: function(value) {
  	this.formTarget = value;
  	if (iString.nullTrim(value)) {
  		this._form.set("target", value);
  	} else {
  		this._form.set("target", this._hiddenFrame.name);
  	}
  },
  
  /**
   * @private
   */
  _setLabelSeparatorAttr: function(value) {
	this.labelSeparator = value;
	var separator = this.labelSeparator;
	this.set("labelUserName", this.labelUserName);
	this.set("labelPassword", this.labelPassword);
  },
  
  /**
   * Label that corresponds to the first text field in the form.
   * @public
   * @field
   * @type String
   * @default "User name"
   */
  labelUserName: "",
  
  /**
   * The form field name assigned to the user name field.
   * @default "username"
   */
  userFieldName: "username",
  
  /**
   * Label that corresponds to the second text field in the form.
   * @public
   * @field
   * @type String
   * @default "Password"
   */
  labelPassword: "",

  /**
   * The form field name assigned to the password field.
   * @default "password"
   */
  passwordFieldName: "password",
  
  /**
   * Sets whether or not the user field will allow auto-complete.  Use a boolean value of true
   * to activate auto-complete for user field and a value of false to deactivate it.  NOTE: activating
   * auto-complete can make your application less secure.
   *
   * @default false
   */
  userAutoComplete: false,
  
  /**
   * Sets whether or not the password field will allow auto-complete.  Use a boolean value of true
   * to activate auto-complete for password field and a value of false to deactivate it.  NOTE: activating
   * auto-complete can make your application less secure.
   *
   * @default false
   */
  passwordAutoComplete: false,
  
  /**
   * Map the label attributes.
   * @private
   */
  attributeMap: dLang.delegate(dWidget.prototype.attributeMap, {
		inactivityMessage: {node: "inactivityMessageNode", type: "innerHTML"},
		loginTitle: {node: "loginTitleNode", type: "innerHTML"},
		loginSubTitle: {node: "loginSubtitleNode", type: "innerHTML"},
		loginCopyright: {node: "copyrightNode", type: "innerHTML"}
  }),
  
  /**
   * Constructor.
   */
  constructor: function() {
  	this._allowingSubmit = false;
  	this._userAutoComplete = "off";
  	this._pwdAutoComplete = "off";
  },

  /**
   *
   * @private
   */
  _setLabelUserNameAttr: function(value) {
  	this.labelUserName = value;
  	var sep = iString.nullTrim(this.labelSeparator);
  	if (iString.nullTrim(value)) this.loginUserName.set("label", value + (sep?sep:""));
  	else this.loginUserName.set("label", "");
  },
  
  /**
   * @private
   */
  _setUserFieldNameAttr: function(value) {
  	this.userFieldName = value;
  	if (iString.nullTrim(value)) this.loginUserName.set("name", value);
  	else this.loginUserName.set("name", "username");
  },
  
  /**
   *
   * @private
   */
  _setLabelPasswordAttr: function(value) {
  	this.labelPassword = value;
  	var sep = iString.nullTrim(this.labelSeparator);
  	if (iString.nullTrim(value)) this.loginPassword.set("label", value + (sep?sep:""));
  	else this.loginPassword.set("label", "");
  },
  
  /**
   * @private
   */
  _setPasswordFieldNameAttr: function(value) {
  	this.passwordFieldName = value;
  	if (iString.nullTrim(value)) this.loginPassword.set("name", value);
  	else this.loginPassword.set("name", "password");
  },
  
  /**
   * @private
   */
  _setUserAutoCompleteAttr: function(value) {
  	this.userAutoComplete = value;
  	this._userAutoComplete = (value) ? "on" : "off";
  	if (this.loginUserName) this.loginUserName.set("autocomplete", this._userAutoComplete);
  },
  
  /**
   * @private
   */
  _setPasswordAutoCompleteAttr: function(value) {
  	this.passwordAutoComplete = value;
  	this._pwdAutoComplete = (value) ? "on" : "off";
  	if (this.loginPassword) this.loginPassword.set("autocomplete", this._pwdAutoComplete);
  },
  
  /**
   * Informational message to be displayed directly above the form's buttons.
   * 
   * @type String
   * @default Please note, after some time of inactivity, the system will sign you out automatically and ask you to sign in again.
   */
  inactivityMessage: "",
  
  /**
   * Copyright statement to be displayed below the form.
   * 
   * @type String
   */
  loginCopyright: "",
  
  /**
   * Label to be displayed on the submission/login button.
   * 
   * @type String
   * @default Login
   */
  labelSubmitButton: "",
  
  /**
   * 
   */
  _setLabelSubmitButtonAttr: function(value) {
	  this.labelSubmitButton = value;
	  this.loginButton.set("label", this.labelSubmitButton);
  },
  
  /**
   * Error message to be displayed when required input
   * user name or password is empty or blank.
   * @type String
   * @default A valid value has not been entered in both required fields."
   */
  invalidMessage: "",
  
  /**
   * Error message dialog title when login button clicked 
   * with invalid username or password.
   * @public
   * @field
   * @type String
   * @default Invalid Login Attempt."
   */
  invalidMessageTitle: "",
  
  /**
   * @private
   * @function
   */
  _setInvalidMessageAttr: function(value) {
  	this.invalidMessage = value;
  	this.loginUserName.set("invalidMessage", this.invalidMessage);
  	this.loginUserName.set("missingMessage", this.invalidMessage);
  	this.loginPassword.set("invalidMessage", this.invalidMessage);
  	this.loginPassword.set("missingMessage", this.invalidMessage);
	this.invalidMessageNode.innerHTML = this.invalidMessage;
  },
  
  /**
   * @private
   * @function
   */
  _setInvalidMessageTitleAttr: function(value) {
	  this.invalidMessageTitle = value;
	  this.invalidLoginDialog.set("title", this.invalidMessageTitle);	  
  },
  
  /**
   * Error dialog OK button label
   * @type String
   * @default "OK" 
   */
  labelOkButton: "",
  
  /**
   * @private
   * @function
   */
  _setLabelOkButtonAttr: function(value) {
	  this.labelOkButton = value;
	  this.dialogOKButton.set("label", value);
  },
  
  /**
   * Regular expression for user name and password 
   * validation that user can override.
   * @type String
   * @default  null
   * @deprecated
   */
  regExp: null, // to restrict to numbers,letters and underscore, use "[\w]+"
  
  /**
   * Regular expression for user name validation that can be overridden.
   * This replaces the "regExp" attribute which has been deprecated.  If
   * "regExp" is provided, but "userPattern" is not, then "regExp" will be used.
   * To restrict to numbers,letters and underscore, use "[\w]+"
   * @type String|RegExp
   * @default ".*"
   */
  userPattern: ".*",
  
  /**
   * Regular expression for password validation that can be overridden.
   * This replaces the "regExp" attribute which has been deprecated.  If
   * "regExp" is provided, but "passwordPattern" is not, then "regExp" 
   * will be used.  To restrict to numbers,letters and underscore, use "[\w]+"
   * @type String|RegExp
   * @default ".*"
   */
  passwordPattern: ".*",
  
  /**
   * Message to be displayed on the cancel button.
   * 
   * @type String
   * @default Cancel
   */
  labelCancelButton: "",
  
  /**
   * @private
   * @function
   */
  _setLabelCancelButtonAttr: function(value) {
	  this.labelCancelButton = value;
	  this.cancelButton.set("label", this.labelCancelButton);
  },
  
  /**
   * Specifies whether this LoginFrame should include a Cancel button
   * @public
   * @field
   * @type boolean
   * @default false
   */
  showCancelButton: false,

  /**
   * @private
   * @function
   */
  _setShowCancelButtonAttr: function(b)
  {
      if(b)
      {
          dDomStyle.set(this.cancelButton.domNode,{visibility:"visible",display:"inline"});
      }
      else
      {
          dDomStyle.set(this.cancelButton.domNode,{visibility:"hidden",display:"none"});
      }
  },

  postMixInProperties: function() {
	this._postCreated = false;
	this.inherited(arguments);
	if ("userPattern" in this.params) {
		this._explicitUserPattern = true;
	}
	if ("passwordPattern" in this.params) {
		this._explicitPasswordPattern = true;
	}
	
	var resources = iResources.getResources("idx/app/LoginFrame", this.lang);
	if(!this.loginTitle){
		this.loginTitle = resources.loginTitle;
	}
	if(!this.labelUserName){
		this.labelUserName = resources.labelUserName;
	}
	if(!this.labelPassword){
		this.labelPassword = resources.labelPassword;
	}
	if(!this.labelSubmitButton){
		this.labelSubmitButton = resources.loginTitle;
	}
	if(!this.invalidMessage){
		this.invalidMessage = resources.invalidMessage;
	}
	if(!this.invalidMessageTitle){
		this.invalidMessageTitle = resources.invalidMessageTitle;
	}
	resources = iResources.getResources("idx/widget/ModalDialog", this.lang);
	if(!this.labelOkButton){
		this.labelOkButton = resources.executeButtonLabel;
	}
	if(!this.labelCancelButton){
		this.labelCancelButton = resources.cancelButtonLabel;
	}
	if(!this.labelSeparator){
		this.labelSeparator = iResources.getLabelFieldSeparator("idx/app/LoginFrame", this.lang);
	}
	this._postMixedIn = true;
  },

  postCreate: function() {
	this.connect(this.loginUserName.domNode, "onkeypress", this._onKeyPress);
	this.connect(this.loginUserName, "onFocus", this._onUserFieldFocus);
	this.connect(this.loginUserName.focusNode, "onfocus", this._onUserFieldFocus);
	this.connect(this.loginPassword.domNode, "onkeypress", this._onKeyPress);
	this.connect(this.loginPassword, "onFocus", this._onPasswordFieldFocus);
	this.connect(this.loginPassword.focusNode, "onfocus", this._onPasswordFieldFocus);
	this._postCreated = true;
  },
  
  startup: function() {
  	this.inherited(arguments);
  	
  	var sep = iString.nullTrim(this.labelSeparator);
  	
  	this.loginUserName.set("label", this.labelUserName + (sep?sep:""));
  	this.loginPassword.set("label", this.labelPassword + (sep?sep:""));
  	this.loginUserName.set("invalidMessage", this.invalidMessage);
  	this.loginUserName.set("missingMessage", this.invalidMessage);
  	this.loginPassword.set("invalidMessage", this.invalidMessage);
  	this.loginPassword.set("missingMessage", this.invalidMessage);
  },
  
  _onUserFieldFocus: function() {
  	this._lastFocus = this.loginUserName;
  },
  
  _onPasswordFieldFocus: function() {
  	this._lastFocus = this.loginPassword;
  },
  
  focus: function() {
	  this.inherited(arguments);
	  if (this._lastFocus) {
	  	this._lastFocus.focus();
	  	this._lastFocus = null;
	  } else {
		  this.loginUserName.focus();
	  }
  },
    
  /**
   * Handle enter key pressed in username or password fields
   */
  _onKeyPress: function(e) {
	 
	 this.inherited(arguments);
	 if(e && e.keyCode && e.keyCode == dKeys.ENTER) {
		 this._onSubmitClick(e);
	 }
  },

  /**
   * Prevent form submission.
   */
  _onFormSubmit: function() {
  	if (this._allowingSubmit) {
  		this._allowingSubmit = false;
  		return true;
  	} else {
  		return false;
  	}
  },
  
  /**
   * @private
   */
  _setRegExpAttr: function(value) {
	  dKernel.deprecated("idx/app/LoginFrame 'regExp' attribute:", "Use 'userPattern' or 'passwordPattern' instead.", "2.0");
	  if (this._explicitUserPattern) {
		  console.warn("Setting 'regExp' attribute will have no effect on user field pattern because an explicit 'userPattern' has been provided.");
	  } else {
		  this.loginUserName.set("pattern", value);
	  }
	  if (this._explicitPasswordPattern) {
		  console.warn("Setting 'regExp' attribute will have no effecton password field pattern because an explicit 'passwordPattern' has been provided.");
	  } else {
		  this.loginPassword.set("pattern", value);
	  }
	  this.regExp = value;
  },
  
  /**
   * @private
   */
  _setUserPatternAttr: function(value) {
	  if (("userPattern" in this.params) || (this._postCreated)) {
		  this._explicitUserPattern = true;
	  }
	  this.loginUserName.set("pattern", value);
	  this.userPattern = value;
  },
  
  /**
   * @private
   */
  _setPasswordPatternAttr: function(value) {
	  if (("passwordPattern" in this.params) || (this._postCreated)) {
		  this._explicitPasswordPattern = true;
	  }
	  this.loginPassword.set("pattern", value);
	  this.passwordPattern = value;
  },
  
  /**
   * Called when login button pressed
   * Calls user 'onSubmit' method after
   * trimming fields. Displays error message
   * if fields invalid.
   * @private
   * @function
   * @param {Event} e
   */
  _onSubmitClick: function(/*Event*/ e)
  {
  	  var lastFocus = this._lastFocus;
	  // Do some validation here before continuing 
	  // Trim fields and display error dialog if invalid
	  // Caller could have specified their own regExp for additional validation
	  var name = this.loginUserName.value;
	  if(name && name != "") {
		  name = name.replace(/^\s+|\s+$/g, '');
		  this.loginUserName.set("value",name) ; // remove leading/trailing blanks
	  }
	  var pwd  = this.loginPassword.value;
	  if(pwd && pwd != "") {
		  pwd = pwd.replace(/^\s+|\s+$/g, '');
		  this.loginPassword.set("value",pwd) ; // remove leading/trailing blanks
	  }
  
	  //force validation to show error icon if invalid (in case user hasn't already clicked in and out of field defect #5876)
	  var isPasswordValid = this.loginPassword.isValid();
      
	  var isUserNameValid = this.loginUserName.isValid();
	  
	  this.loginPassword.focus();
	  this.loginUserName.focus();
	  
	  if( !isUserNameValid || !isPasswordValid ) {
	    // focus the button to trigger the validation tooltips to fade out
	  	this.loginButton.focus();
	  	
		// show the dialog  	
  		this.invalidLoginDialog.show();
		var dialogHandle = null;
		
		// wait for dialog to close to revalidate the form and focus the first bad field
		var self = this;
		dialogHandle = dAspect.after(this.invalidLoginDialog, "onHide", function() {
		   if( !isPasswordValid ) {
    			//note: validate() wouldn't update styling if field was not in focus, so forcing focus to field first
    			self.loginPassword.focus();
      			self.loginPassword.validate(false);
  	   		}
  	   		if( !isUserNameValid ) {
  	   			self.loginUserName.focus();
      			self.loginUserName.validate(false);
    	   	}
      	   	if (dialogHandle) dialogHandle.remove();
	  	});
	  } else {
	  	var d = this.onSubmit(this.loginUserName.value,this.loginPassword.value,this.loginForm);
	  	var self = this;
	  	dWhen(d, function() {
	  		var submitForm = false;
	  		if ((d == true) || (d == false)) {
	  			submitForm = d;
	  		} else if ((d instanceof dDeferred) || (d instanceof dPromise)) {
	  			submitForm = d.isResolved(); 
	  		} else {
	  			submitForm = true;
	  		}
	  		
	  		if ((submitForm)&&(iString.nullTrim(self.formAction))) {
	  			self._allowingSubmit = true;
	  			self._form.submit();
	  			self._allowingSubmit = false;
	  		}
	  	});
	  }
	  lastFocus && lastFocus.focus();
  },

  /**
   * Callback function when the end-user clicks the submit/login button. Users of this class
   * should override this function to provide intended submission behavior.  If this function
   * returns true (the default) then the form is form is submitted to a hidden iframe.  To 
   * cancel form submission you can return false or alternative return a dojo/Deferred that
   * if "resolved" will trigger form submission, but if "rejected" or "cancelled" will prevent
   * form submission.  Form submission only occurs if the "formAction" attribute is non-empty.
   *
   * @public
   * @function
   * @param {String} username The username that was entered
   * @param {String} password The password that was entered
   */
  onSubmit: function(/*String*/ username, /*String*/ password)
  {
  	return true;
  },
  
  /**
   * @private
   * @function
   */
  _onCancelClick: function(/*Event*/ e)
  {	  
	  return this.onCancel();
  },
  
  /**
   *  Callback function when the end-user clicks the cancel button.  Users of this class should
   *  override this function to provide intended cancel behavior
   * @public
   * @function
   */
  onCancel: function()
  {

  }
});
});

},
'idx/nls/base':function(){
define({root:
//begin v1.x content
({

})
//end v1.x content
});

},
'idx/app/nls/ConsoleLayout':function(){
define({root:
//begin v1.x content
({
	about:				"About",
	help:			      "Help",
	logout:				"Log out",
	login:				"Log in",
	userNameMessage:  "Welcome ${username}"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});

},
'idx/widget/HoverHelpTooltip':function(){
/*
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
define(["dojo/_base/declare", "dojo/_base/fx", // fx.fadeIn fx.fadeOut
 "dojo/keys", // keys
 "dojo/_base/array", // array.forEach array.indexOf array.map
 "dojo/dom", // dom.byId
 "dojo/on",
 "dojo/aspect",
 "dojo/when", 
 "dojo/Deferred",
 "dojo/dom-attr", // domAttr.set
 "dojo/_base/lang", // lang.hitch lang.isArrayLike
 "dojo/_base/sniff", // has("ie")
 "dijit/popup",
 "dijit/focus", "dojo/_base/event", // event.stop
 "dojo/dom-geometry", // domGeometry.getMarginBox domGeometry.position
 "dojo/dom-construct",
 "dojo/dom-class",
 "dijit/registry",
 "dijit/place", "dijit/a11y", // _getTabNavigable
 "dojo/dom-style", // domStyle.set, domStyle.get
 "dojo/_base/window", // win.body
 "dijit/_base/manager", // manager.defaultDuration
 "dijit/_Widget", "dijit/_TemplatedMixin", "dijit/Tooltip", 
 "dojo/has!dojo-bidi?../bidi/widget/HoverHelpTooltip",
 "dojo/text!./templates/HoverHelpTooltip.html", "dijit/dijit", 
 "dojo/i18n!./nls/Dialog", "dojo/i18n!./nls/HoverHelpTooltip"
], function(declare, fx, keys, array, dom, on, aspect, when, Deferred, domAttr, lang, has, popup, dijitfocus, event, domGeometry, domConstruct, domClass, registry, place, 
 a11y, domStyle, win, manager, _Widget, _TemplatedMixin, Tooltip, bidiExtension, template, dijit, dialogNls, hoverHelpTooltipNls){
	var oneuiRoot = lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2
	
    /**
     * @name idx.widget.HoverHelpTooltip
     * @class HoverHelpTooltip provides pop-up information that displays when users hover the mouse pointer over an help indicator.
     * HoverHelpTooltip is implemented following the standard and specified IBM One UI(tm)
     * <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y20&vsub=*&hsub=*&openpanes=1111111111">Hover Help</a></b>
     * @augments dijit.Tooltip
     * @example
     &lt;span data-dojo-type="idx.widget.HoverHelpTooltip" data-dojo-props='
     connectId:["anchor"],
     forceFocus: true,
     showLearnMore:true,
     learnMoreLinkValue:"http://www.ibm.com"'
     style="width: 300px"&gt;
     Passwords must be between 5 and 20 characters. There must be a combination of alphanumeric characters, starting with a letter and at least one number.&lt;br /&gt;&lt;br /&gt;
     &lt;/span&gt;
     * @see dijit.Tooltip
     **/
    var HoverHelpTooltip = declare("idx.widget.HoverHelpTooltip", Tooltip, {
        /** @lends idx.widget.HoverHelpTooltip.prototype */
        showDelay: 500,
        hideDelay: 800,
        /**
         * Whether to show Learn more link
         * @type Boolean
         */
        showLearnMore: false,
        /**
         * Learn more link value
         * @type String
         */
        learnMoreLinkValue: "#updateme",
        
        showCloseIcon: true,
        /**
         * Focus HoverHelpTooltip once it shown.
         * @type Boolean
         */
        forceFocus: false,
		
		textDir: "auto",

        _onHover: function(/*Event*/e){
            // summary:
            //		Despite the name of this method, it actually handles both hover and focus
            //		events on the target node, setting a timer to show the HoverHelpTooltip.
            // tags:
            //		private
            if (!HoverHelpTooltip._showTimer) {
                var target = e.target;
                HoverHelpTooltip._showTimer = setTimeout(lang.hitch(this, function(){
                    this.open(target)
                }), this.showDelay);
            }
            if (HoverHelpTooltip._hideTimer) {
                clearTimeout(HoverHelpTooltip._hideTimer);
                delete HoverHelpTooltip._hideTimer;
            }
        },
        
        _onUnHover: function(/*Event*/ /*===== e =====*/){
            // summary:
            //		Despite the name of this method, it actually handles both mouseleave and blur
            //		events on the target node, hiding the HoverHelpTooltip.
            // tags:
            //		private
            
            // keep a HoverHelpTooltip open if the associated element still has focus (even though the
            // mouse moved away)
            if (HoverHelpTooltip._showTimer) {
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
            if (!HoverHelpTooltip._hideTimer) {
                HoverHelpTooltip._hideTimer = setTimeout(lang.hitch(this, function(){
                    this.close()
                }), this.hideDelay);
            }
        },
        
        /**
         * Display the HoverHelpTooltip
         * @private
         */
        open: function(/*DomNode*/target){
            // summary:
            //		
            // tags:
            //		private
            if (HoverHelpTooltip._showTimer) {
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
			var ariaLabel = domAttr.get(this.domNode, "aria-label");
            HoverHelpTooltip.show(
				this.content || this.label || this.domNode.innerHTML, 
				target, this.position, !this.isLeftToRight(), 
				this.textDir, this.showLearnMore, this.learnMoreLinkValue, 
				this.showCloseIcon, this.forceFocus, ariaLabel);
            this._connectNode = target;
            this.onShow(target, this.position);
        },
		
        close: function(force){
            // summary:
            //		Hide the tooltip or cancel timer for show of tooltip
            // tags:
            //		private
            if (this._connectNode) {
                // if tooltip is currently shown
            	
            	// CHANGE FROM BARRY -- CREATED A DEFERRED OBJECT THAT GETS RESOLVED WHEN THE
            	// ANIMATION FOR HIDING COMPLETES AND RETURN IT FORM THIS METHOD SO THE CALLER
            	// CAN OPT TO WAIT FOR ANIMATION TO COMPLETE BEFORE TAKING A NEXT STEP
            	// -- I NEEDED THIS AT ONE POINT, BUT AFTER FIXING AN ISSUE WITH INTERFERENCE OF
            	// MULTIPLE TOOLTIPS IN RACE CONDITIONS IT WAS NO LONGER NEEDED.  I LEFT IT HERE
            	// SINCE IT CANNOT HURT TO GIVE THE CALLER THIS OPTION OF USING dojo/promise API
                var anim = HoverHelpTooltip.hide(this._connectNode, force);
                delete this._connectNode;
                this.onHide();
                if (anim) {
                   // create the deferred object
              	   var d = new Deferred();
              	   var handles = [];
              	   
              	   // define the function to resolve the deferred
              	   var resolve = function() {
              		   // mark the deferred as resolved (fulfill the promise)
              		   if (d) d.resolve();
              		   
              		   // for each aspect handle, remove it
              		   array.forEach(handles, function(handle) {
              			   if (handle) handle.remove();
              		   });
              	   };
              	   
              	   // use aspect.after to attach to the "onEnd" and "onStop" methods and
              	   // fire the "resolve" callback when one of these fires
              	   handles.push(aspect.after(anim, "onEnd", resolve));
              	   handles.push(aspect.after(anim, "onStop", resolve));
              	   
              	   // double-check if the animation already stopped and our deferred missed the event
              	   if ((anim.status() == "stopped") && (!d.isResolved())) {
              		   resolve();
              	   }
              	   
              	   // return the dojo/Deferred "promise"
              	   return d;
                 } else {
                   // if no animation then return null for dojo/when API
              	   return null;
                 }             	
            }
            if (HoverHelpTooltip._showTimer) {
                // if tooltip is scheduled to be shown (after a brief delay)
                clearTimeout(HoverHelpTooltip._showTimer);
                delete HoverHelpTooltip._showTimer;
            }
        },
        _setConnectIdAttr: function(/*String|String[]*/newId){
            // summary:
            //		Connect to specified node(s)
            
            // Remove connections to old nodes (if there are any)
            array.forEach(this._connections || [], function(nested){
                array.forEach(nested, lang.hitch(this, "disconnect"));
            }, this);
            
            // Make array of id's to connect to, excluding entries for nodes that don't exist yet, see startup()
            this._connectIds = array.filter(lang.isArrayLike(newId) ? newId : (newId ? [newId] : []), function(id){
                return dom.byId(id);
            });
            
            // Make connections
            this._connections = array.map(this._connectIds, function(id){
                var node = dom.byId(id);
                return [
                    // TODO - NOTE FROM BARRY: consider "onclick" triggering focus but "onmouseenter" NOT triggering focus
					this.connect(node, "onmouseenter", "_onHover"),
					this.connect(node, "onmouseleave", "_onUnHover"), 
					this.connect(node, "onclick", "_onHover"),
					this.connect(node, "onkeypress", "_onConnectIdKey")
				];
            }, this);
            
            this._set("connectId", newId);
        },
        _onConnectIdKey: function(/*Event*/evt){
            // summary:
            //		Handler for keyboard events
            // description:
            // tags:
            //		private
            var node = evt.target;
            
            if (evt.charOrCode == keys.ENTER || evt.charOrCode == keys.SPACE || evt.charOrCode == " " || evt.charOrCode == keys.F1) {
                // Use setTimeout to avoid crash on IE, see #10396.
                HoverHelpTooltip._showTimer = setTimeout(lang.hitch(this, function(){
                    this.open(node)
                }), this.showDelay);
                
                event.stop(evt);
            }
        }
        
    });
    
    var baseClassName = has("dojo-bidi")? "idx.widget._MasterHoverHelpTooltip_" : "idx.widget._MasterHoverHelpTooltip";
    var MasterHoverHelpTooltipBase = declare(baseClassName, [_Widget, _TemplatedMixin], {
		/**
		 * Milliseconds to fade in/fade out
		 * @type Integer
		 */
        duration: manager.defaultDuration,
        
        templateString: template,
		
        learnMoreLabel: "",
        
        /**
         * draggable: Boolean
         *		Toggles the moveable aspect of the HoverHelpTooltip. If true, HoverHelpTooltip
         *		can be dragged by it's grippy bar. If false it will remain positioned
         *		relative to the attached node
         *		@type boolean
         **/
        draggable: true,
        
        _firstFocusItem: null,
		
        _lastFocusItem: null,
        
        postMixInProperties: function(){
            this.learnMoreLabel = hoverHelpTooltipNls.learnMoreLabel;
			this.buttonClose = dialogNls.closeButtonLabel;
        },
        postCreate: function(){
            win.body().appendChild(this.domNode);
            
            //this.bgIframe = new BackgroundIframe(this.domNode);
            
            // Setup fade-in and fade-out functions.
            this.fadeIn = fx.fadeIn({
                node: this.domNode,
                duration: this.duration,
                onEnd: lang.hitch(this, "_onShow")
            });
            this.fadeOut = fx.fadeOut({
                node: this.domNode,
                duration: this.duration,
                onEnd: lang.hitch(this, "_onHide")
            });
            this.connect(this.domNode, "onkeypress", "_onKey");
            this.connect(this.domNode, "onmouseenter", lang.hitch(this, function(e){
				if(HoverHelpTooltip._hideTimer) {
	                clearTimeout(HoverHelpTooltip._hideTimer);
	                delete HoverHelpTooltip._hideTimer;
	            }

				// check if another tooltip is already deck
				if (!this._onDeck) {
					// CHANGE FROM BARRY - ONLY RESTORE A DYING TOOLTIP IF ANOTHER IS NOT ON DECK
					// no tooltip on deck so refocus this one and keep showing it
					
					if (this.forceFocus && this.showLearnMore) this.focus(); // NOTE FROM BARRY: consider removing this unless clicked
					this._keepShowing = true;
					
					// restore the previous state that was cleared out in forceHide
					if (this._prevState) {
						lang.mixin(this, this._prevState);
						this._prevState = null;
					}
					this.fadeOut.stop();
					this.fadeIn.play();
				} else {
					// CHANGE FROM BARRY -- IGNORE THE MOUSE LEAVE EVENT AS THE TOOLTIP CLOSES SINCE ANOTHER IS ON DECK
					// another tooltip is already deck so signal that the mouse leave event on the
					// current tooltip should not trigger a close
					this._ignoreMouseLeave = true;
				}
            }));
			this.connect(this.domNode, "onmouseleave", lang.hitch(this, function(e){
				this._keepShowing = false;
				if (this._ignoreMouseLeave) {
					// mouseenter occurred on previous tooltip and mouseleave is now firing
					// ignore this mouseleave event since the mouseenter was not for this tooltip
					// and we don't want to close the current tooltip
					delete this._ignoreMouseLeave;
					return;
				}
				HoverHelpTooltip._hideTimer = setTimeout(lang.hitch(this, function(){this.hide(this.aroundNode)}), this.hideDelay);
			}));
        },
        show: function(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, 
			learnMoreLinkValue, showCloseIcon, forceFocus, ariaLabel){
			this._lastFocusNode = aroundNode;
            if (showLearnMore) {
                this.learnMoreNode.style.display = "inline";
                this.learnMoreNode.href = learnMoreLinkValue;
            }
            else {
                this.learnMoreNode.style.display = "none";
            }
            if (showCloseIcon || showCloseIcon == null) 
                this.closeButtonNode.style.display = "inline";
            else {
                this.closeButtonNode.style.display = "none";
            }
            //in case connectorNode was hidden on a previous call to hide
            this.connectorNode.hidden = false;
            
            if (this.aroundNode && this.aroundNode === aroundNode && this.containerNode.innerHTML == innerHTML) {
                return;
            }
            
            // reset width; it may have been set by orient() on a previous HoverHelpTooltip show()
            this.domNode.width = "auto";
            
            if (this.fadeOut.status() == "playing") {
                // previous HoverHelpTooltip is being hidden; wait until the hide completes then show new one
                this._onDeck = arguments;
                return;
            }
			
			
			//this._attachPopParent();
			//domStyle.set(this._popupWrapper, "display", "");
            
            this.containerNode.innerHTML = innerHTML;
			if(ariaLabel)domAttr.set(this.domNode, "aria-label", ariaLabel);
            
            this.set("textDir", textDir);
            this.containerNode.align = rtl ? "right" : "left"; //fix the text alignment
            var pos = place.around(this.domNode, aroundNode, position && position.length ? position : HoverHelpTooltip.defaultPosition, !rtl, lang.hitch(this, "orient"));
            
            // Position the HoverHelpTooltip connector for middle alignment.
            // This could not have been done in orient() since the HoverHelpTooltip wasn't positioned at that time.
            var aroundNodeCoords = pos.aroundNodePos;
            if (pos.corner.charAt(0) == 'M' && pos.aroundCorner.charAt(0) == 'M') {
                this.connectorNode.style.top = aroundNodeCoords.y + ((aroundNodeCoords.h - this.connectorNode.offsetHeight) >> 1) - pos.y + "px";
                this.connectorNode.style.left = "";
            }
            else if (pos.corner.charAt(1) == 'M' && pos.aroundCorner.charAt(1) == 'M') {
                this.connectorNode.style.left = aroundNodeCoords.x + ((aroundNodeCoords.w - this.connectorNode.offsetWidth) >> 1) - pos.x + "px";
            }
			
			////Set order in popup stack
			//this._addToPopupStack(); 
			
            // show it
            domStyle.set(this.domNode, "opacity", 0);
			domClass.add(this.domNode, "dijitPopup");
			//this._popupWrapper.appendChild(this.domNode);
            this.fadeIn.play();
            this.isShowingNow = true;
			this.aroundNode = aroundNode;
			// Add WAI-ARIA attribute to the hover tooltip container
			var sourceId = domAttr.get(aroundNode, "id")
			if(typeof sourceId == "string"){
				dijit.setWaiState(this.containerNode, "labelledby", sourceId);
			}
			if (forceFocus) {
                this.focus();
            }
			return;
        },
		
		/*_addToPopupStack: function(){
			var stack = popup._stack;
			domStyle.set(this.domNode, "zIndex", popup._beginZIndex + stack.length);
			popup._stack.push({
				widget: this,
				handlers: []
			});
		},
        _attachPopParent: function(){
			//This is for focusManager to find popup parent of HHT
			if(!this._popupWrapper){
				this._popupWrapper = domConstruct.create("div", {
					style: {"display": "none"}
				}, this.ownerDocumentBody);
			}
			if(this.aroundNode && this.aroundNode.id){
				domAttr.set(this._popupWrapper, "dijitPopupParent", this.aroundNode.id);
			}else{
				this._popupWrapper.dijitPopupParent = this.aroundNode;
			}
		},
        _removeFromPopupStack: function(){
			popup._stack.pop();
		},*/
        orient: function(/*DomNode*/node, /*String*/ aroundCorner, /*String*/ HoverHelpTooltipCorner, /*Object*/ spaceAvailable, /*Object*/ aroundNodeCoords){
            // summary:
            //		Private function to set CSS for HoverHelpTooltip node based on which position it's in.
            //		This is called by the dijit popup code.   It will also reduce the HoverHelpTooltip's
            //		width to whatever width is available
            // tags:
            //		protected
            this.connectorNode.style.top = ""; //reset to default
            //Adjust the spaceAvailable width, without changing the spaceAvailable object
            var HoverHelpTooltipSpaceAvaliableWidth = spaceAvailable.w - this.connectorNode.offsetWidth;
            
            node.className = "idxOneuiHoverHelpTooltip " +
            {
                "MR-ML": "idxOneuiHoverHelpTooltipRight",
                "ML-MR": "idxOneuiHoverHelpTooltipLeft",
                "TM-BM": "idxOneuiHoverHelpTooltipAbove",
                "BM-TM": "idxOneuiHoverHelpTooltipBelow",
                "BL-TL": "idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABLeft",
                "TL-BL": "idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABLeft",
                "BR-TR": "idxOneuiHoverHelpTooltipBelow idxOneuiHoverHelpTooltipABRight",
                "TR-BR": "idxOneuiHoverHelpTooltipAbove idxOneuiHoverHelpTooltipABRight",
                "BR-BL": "idxOneuiHoverHelpTooltipRight",
                "BL-BR": "idxOneuiHoverHelpTooltipLeft",
                "TR-TL": "idxOneuiHoverHelpTooltipRight"
            }[aroundCorner + "-" + HoverHelpTooltipCorner];
            
            // reduce HoverHelpTooltip's width to the amount of width available, so that it doesn't overflow screen
            this.domNode.style.width = "auto";
            var size = domGeometry.getContentBox(this.domNode);
            
            var width = Math.min((Math.max(HoverHelpTooltipSpaceAvaliableWidth, 1)), size.w);
            var widthWasReduced = width < size.w;
            
            this.domNode.style.width = width + "px";
            
            //Adjust width for HoverHelpTooltips that have a really long word or a nowrap setting
            if (widthWasReduced) {
                this.containerNode.style.overflow = "auto"; //temp change to overflow to detect if our HoverHelpTooltip needs to be wider to support the content
                var scrollWidth = this.containerNode.scrollWidth;
                this.containerNode.style.overflow = "visible"; //change it back
                if (scrollWidth > width) {
                    scrollWidth = scrollWidth + domStyle.get(this.domNode, "paddingLeft") + domStyle.get(this.domNode, "paddingRight");
                    this.domNode.style.width = scrollWidth + "px";
                }
            }
            
            // Reposition the HoverHelpTooltip connector.
            if (HoverHelpTooltipCorner.charAt(0) == 'B' && aroundCorner.charAt(0) == 'B') {
                var mb = domGeometry.getMarginBox(node);
                var HoverHelpTooltipConnectorHeight = this.connectorNode.offsetHeight;
                if (mb.h > spaceAvailable.h) {
                    // The HoverHelpTooltip starts at the top of the page and will extend past the aroundNode
                    var aroundNodePlacement = spaceAvailable.h - ((aroundNodeCoords.h + HoverHelpTooltipConnectorHeight) >> 1);
                    this.connectorNode.style.top = aroundNodePlacement + "px";
                    this.connectorNode.style.bottom = "";
                }
                else {
                    // Align center of connector with center of aroundNode, except don't let bottom
                    // of connector extend below bottom of HoverHelpTooltip content, or top of connector
                    // extend past top of HoverHelpTooltip content
                    this.connectorNode.style.bottom = Math.min(Math.max(aroundNodeCoords.h / 2 - HoverHelpTooltipConnectorHeight / 2, 0), mb.h - HoverHelpTooltipConnectorHeight) +
                    "px";
                    this.connectorNode.style.top = "";
                }
            }
            else {
                // reset the HoverHelpTooltip back to the defaults
                this.connectorNode.style.top = "";
                this.connectorNode.style.bottom = "";
            }
            
            return Math.max(0, size.w - HoverHelpTooltipSpaceAvaliableWidth);
        },
        
        focus: function(){
			if(this._focus){return;}
            this._getFocusItems(this.outerContainerNode);
            this._focus = true;
            dijitfocus.focus(this._firstFocusItem);
        },
        
        _onShow: function(){
            // summary:
            //		Called at end of fade-in operation
            // tags:
            //		protected
            if (has("ie")) {
                // the arrow won't show up on a node w/an opacity filter
                this.domNode.style.filter = "";
            }
            domAttr.set(this.containerNode, "tabindex", "0");
            domAttr.set(this.learnMoreNode, "tabindex", "0");
            domAttr.set(this.closeButtonNode, "tabindex", "0");
        },
        
        hide: function(aroundNode, force){
            // summary:
            //		Hide the HoverHelpTooltip
            if(this._keepShowing){
            	this._keepShowing = false; 
            	if (!force) return;
            }
            if (this._onDeck && this._onDeck[1] == aroundNode) {
                // this hide request is for a show() that hasn't even started yet;
                // just cancel the pending show()
                this._onDeck = null;
            }
            else if(this.aroundNode === aroundNode){
                    // this hide request is for the currently displayed HoverHelpTooltip
                return this._forceHide();
            }
        },
        hideOnClickClose: function(){
            // summary:
            //		Hide the HoverHelpTooltip
            // this hide request is for the currently displayed HoverHelpTooltip    
            this._forceHide(true);
        },
        
        // CHANGE FROM BARRY: added "refocus" parameter so that refocus only happens on hiding the tooltip
        // if the user initiated the hide via "hideOnClickClose" or "ESC" key.  this prevents toltips that
        // are disappearing because their associated field blurred focus from refocusing the field that was
        // just blurred.  programmatic hiding/showing of the tooltip makes this problem evident
        _forceHide: function(refocus){
        	// CHANGE FROM BARRY
        	// only refocus if flag is set and the node is defined
            if (refocus && this._lastFocusNode) {
            	// check if the defined node has an enclosing widget with a "refocus" method
            	var currentWrapWidget = registry.getEnclosingWidget(this._lastFocusNode);
            	
            	// if the widget is found and has a refocus method then call it, else focus the node
            	if (currentWrapWidget && lang.isFunction(currentWrapWidget.refocus)) currentWrapWidget.refocus();
            	else dijitfocus.focus(this._lastFocusNode);
            }
            
            // CHANGE FROM BARRY
            // We save the state of this instance in case the "_forceHide" is cancelled by a "mouseenter"
            // event.  We need to restore the state after cancellingt he fadeOut and fading the tooltip 
            // back in.
            if ((this.aroundNode)||(this._lastFocusNode)) {
            	this._prevState = {
            			_lastFocusNode: this._lastFocusNode,
            			_firstFocusItem: this._firstFocusItem,
            			_lastFocusItem: this._lastFocusItem,
            			_focus: this._focus,
            			isShowingNow: this.isShowingNow,
            			aroundNode: this.aroundNode
            	};
            }
			this._lastFocusNode = null;
			this._firstFocusItem = null;
			this._lastFocusItem = null;
            this._focus = false;
            this.fadeIn.stop();
            this.isShowingNow = false;
			this.aroundNode = null; // moved this to here, similar to dijit.Tooltip
			//this._removeFromPopupStack();
            return this.fadeOut.play();
        },
        _getFocusItems: function(){
            // summary:
            //		Finds focusable items in tooltip,
            //		and sets this._firstFocusItem and this._lastFocusItem
            // tags:
            //		protected
			
			if(this._firstFocusItem){
				this._firstFocusItem = this.closeButtonNode;
				return;
			}
			var elems = a11y._getTabNavigable(this.containerNode),
				endFocusableNode = domStyle.get(this.learnMoreNode, "display") == "none" ? this.closeButtonNode : this.learnMoreNode;
			this._firstFocusItem = elems.lowest || elems.first || endFocusableNode;
			this._lastFocusItem = elems.last || elems.highest || endFocusableNode;
        },
        _onKey: function(/*Event*/evt){
            // summary:
            //		Handler for keyboard events
            // description:
            // tags:
            //		private
            
            var node = evt.target;
            if (evt.charOrCode === keys.TAB) {
                this._getFocusItems(this.outerContainerNode);
            }
            var singleFocusItem = (this._firstFocusItem == this._lastFocusItem);
            if (evt.charOrCode == keys.ESCAPE) {
                // Use setTimeout to avoid crash on IE, see #10396.
                setTimeout(lang.hitch(this, "hideOnClickClose"), 0);
                event.stop(evt);
            }
            else 
                if (node == this._firstFocusItem && evt.shiftKey && evt.charOrCode === keys.TAB) {
                    if (!singleFocusItem) {
                        dijitfocus.focus(this._lastFocusItem); // send focus to last item in dialog
                    }
                    event.stop(evt);
                }
                else 
                    if (node == this._lastFocusItem && evt.charOrCode === keys.TAB && !evt.shiftKey) {
                        if (!singleFocusItem) {
                            dijitfocus.focus(this._firstFocusItem); // send focus to first item in dialog
                        }
                        event.stop(evt);
                    }
                    else 
                        if (evt.charOrCode === keys.TAB) {
                            // we want the browser's default tab handling to move focus
                            // but we don't want the tab to propagate upwards
                            evt.stopPropagation();
                        }
        },
        _onHide: function(){
            // summary:
            //		Called at end of fade-out operation
            // tags:
            //		protected
            this._prevState = null;
            this.domNode.style.cssText = ""; // to position offscreen again
            this.containerNode.innerHTML = "";
			//domStyle.set(this._popupWrapper, "display", "none");
            domAttr.remove(this.containerNode, "tabindex");
            domAttr.remove(this.learnMoreNode, "tabindex");
            domAttr.remove(this.closeButtonNode, "tabindex");      
			domAttr.remove(this.domNode, "aria-label");      
            if (this._onDeck) {
            	var args = this._onDeck;
            	this._onDeck = null;
                // a show request has been queued up; do it now
                this.show.apply(this, args);
            }
        },
        onBlur: function(){
            this._forceHide();
        }
    }); //end declare
    //    var MasterHoverHelpTooltip = Tooltip._MasterTooltip;
    HoverHelpTooltip._MasterHoverHelpTooltip = MasterHoverHelpTooltip = has("dojo-bidi")? declare("idx.widget._MasterHoverHelpTooltip",[MasterHoverHelpTooltipBase,bidiExtension]) : MasterHoverHelpTooltipBase; // for monkey patching
    // summary:
    //		Static method to display HoverHelpTooltip w/specified contents in specified position.
    //		See description of idx.widget.HoverHelpTooltip.defaultPosition for details on position parameter.
    //		If position is not specified then idx.widget.HoverHelpTooltip.defaultPosition is used.
    // innerHTML: String
    //		Contents of the HoverHelpTooltip
    // aroundNode: dijit.__Rectangle
    //		Specifies that HoverHelpTooltip should be next to this node / area
    // position: String[]?
    //		List of positions to try to position HoverHelpTooltip (ex: ["right", "above"])
    // rtl: Boolean?
    //		Corresponds to `WidgetBase.dir` attribute, where false means "ltr" and true
    //		means "rtl"; specifies GUI direction, not text direction.
    // textDir: String?
    //		Corresponds to `WidgetBase.textdir` attribute; specifies direction of text.	
    HoverHelpTooltip.show = idx.widget.showHoverHelpTooltip = function(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, learnMoreLinkValue, showCloseIcon, forceFocus, ariaLabel){
    
        if (!HoverHelpTooltip._masterTT) {
            idx.widget._masterTT = HoverHelpTooltip._masterTT = new MasterHoverHelpTooltip();
        }
        return HoverHelpTooltip._masterTT.show(innerHTML, aroundNode, position, rtl, textDir, showLearnMore, learnMoreLinkValue, showCloseIcon, forceFocus, ariaLabel);
    };
    
    // summary:
    //		Static method to hide the HoverHelpTooltip displayed via showHoverHelpTooltip()
    HoverHelpTooltip.hide = idx.widget.hideHoverHelpTooltip = function(aroundNode){
    
        return HoverHelpTooltip._masterTT && HoverHelpTooltip._masterTT.hide(aroundNode);
    };
    
    HoverHelpTooltip.defaultPosition = ["after-centered", "before-centered", "below", "above"];
    
    // for IDX 1.2 compatibility
	oneuiRoot.HoverHelpTooltip = HoverHelpTooltip;

    return HoverHelpTooltip;
    
});

},
'idx/resources':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang",
        "idx/main",
        "dojo/i18n",
        "./string",
        "./util",
        "dojo/i18n!./nls/base"],
        function(dLang,iMain,dI18n,iString,iUtil)
{
  /**
   * @name idx.resources
   * @namespace Provides functionality for overriding and obtaining resource bundles in a hierarchal
   *            manner so that resources can be defined globally, at the package level, and at the module
   *            level with each more specific level taking greater precedence.  Functions in this namespace
   *            typically refer to a "resource scope".  The scope looks like a module path for Dojo such 
   *            as "idx/layout/HeaderPane".  In order to build the resources for "idx/layout/HeaderPane"
   *            scope we get the merger of of the following dojo/i18n NLS files:
   *			   - idx/nls/base.js
   *               - idx/layout/nls/base.js
   *               - idx/layout/nls/HeaderPane.js 
   */
  var iResources = dLang.getObject("resources", true, iMain);
  
  /**
   * @private
   * @name idx.resources._legacyScopeMap
   * @field 
   * @description Internal map of legacy scope names to new scope names for IDX 1.2+.
   */
  iResources._legacyScopeMap = {
		  "": 								"idx/",
		  ".":								"idx/",
		  "app": 							"idx/app/",
		  "app._Launcher": 					"idx/app/_Launcher",
		  "app.A11yPrologue": 				"idx/app/A11yPrologue",
		  "app.WorkspaceType": 				"idx/app/WorkspaceType",
		  "app.WorkspaceTab": 				"idx/app/WorkspaceTab",
		  "dialogs":						"idx/dialogs",
		  "form": 							"idx/form/",
		  "form.buttons":					"idx/form/buttons",
		  "grid": 							"idx/grid/",
		  "grid.prop":	 					"idx/grid/",
		  "grid.prop.PropertyGrid":			"idx/grid/PropertyGrid",
		  "grid.prop.PropertyFormatter":	"idx/grid/PropertyGrid",
		  "layout": 						"idx/layout/",
		  "layout.BorderContainer": 		"idx/layout/BorderContainer",
		  "widget": 						"idx/widget/",
		  "widget.ModalDialog":				"idx/widget/ModalDialog",
		  "widget.TypeAhead":				"idx/widget/TypeAhead",
		  "widget.HoverHelp":				"idx/widget/HoverHelp",
		  "widget.EditController":			"idx/widget/EditController"
  };
  
  /**
   * @private
   * @name idx.resources._defaultResources
   * @field 
   * @description The default resources
   * @type Array
   */
  iResources._defaultResources = {
	dateFormatOptions: {formatLength: "medium", fullYear: true, selector: "date"},
	timeFormatOptions: {formatLength: "medium", selector: "time"},
	dateTimeFormatOptions: {formatLength: "medium", fullYear: true},
	decimalFormatOptions: {type: "decimal"},
	integerFormatOptions: {type: "decimal", fractional: false, round: 0},
	percentFormatOptions: {type: "percent", fractional: true, places: 2},
	currencyFormatOptions: {type: "currency"},
	labelFieldSeparator: ":"
  };

  /**
   * @private
   * @name idx.resources._localResources
   * @field 
   * @description The cache (by locale) of default resources.  Each locale name points to
   *              another array that maps bundle names to bundles that have been loaded. 
   * @type Array
   * @default []
   */
  iResources._localResources = [ ];

  /**
   * @private
   * @name idx.resources._currentResources
   * @field
   * @description The cache (by locale) of current resources.  Each locale name points to
   *              another array that maps bundle names to bundles that have been loaded
   *              and possibly modified.
   * @type Array
   * @default []
   */
  iResources._currentResources = [ ];

  /**
   * @private
   * @name idx.resources._scopedResources
   * @field
   * @description The cache (by locale and then scope) of flattened scope-resources
   * @type Array
   * @default []
   */
  iResources._scopeResources = [ ];

  /**
   * @private
   * @name idx.resources._normalizeScope
   * @function
   * @description Converts the previous "foo.bar" scopes to "idx/foo/bar" scopes.
   * 			  This allows legacy usage to continue to function while allowing
   * 			  product applications to use idx.resources as well for say "my/foo/bar".
   * 			  The new preferred format is "[pkgA]/[pkgB]/[module]".
   * @param {String} scope The optional scope to normalize.
   * @return The normalized scope.
   */
  iResources._normalizeScope = function(/*String*/scope) {
	  if ((! scope)||(scope.length == 0)) {
		  return "idx/";
	  }
	  if (iResources._legacyScopeMap[scope]) {
		  return iResources._legacyScopeMap[scope];
	  }
	  return scope;
  };

  /**
   * @private
   * @name idx.resources._getBundle
   * @function
   * @description Internal method for obtaining the bundle for a given name.
   * 
   * @param {String} packageName The name of the package.
   * @param {String} bundleName The name of the bundle within the package.
   * @param {String} locale The optional locale name.
   */  
  iResources._getBundle = function(/*String*/packageName,/*String*/bundleName,/*String?*/locale) {
	  locale = dI18n.normalizeLocale(locale);
	  var scope = packageName + "." + bundleName;
	  var curResources = iResources._currentResources[locale];
	  if (!curResources) {
		  curResources = [ ];
		  iResources._currentResources[locale] = curResources;
	  }
	  var locResources = iResources._localResources[locale];
	  if (!locResources) {
		  locResources = [ ];
		  iResources._localResources[locale] = locResources;
	  }
	  
	  var bundle = curResources[scope];
	  if (!bundle) {
		  var locBundle = locResources[scope];
		  if (!locBundle) {
			  locBundle = dI18n.getLocalization(packageName, bundleName, locale);
			  if (!locBundle) locBundle = new Object();
			  locResources[scope] = locBundle;
		  }
		  bundle = new Object();
		  dLang.mixin(bundle,locBundle);
		  curResources[scope] = bundle;
	  }
	  
	  // return the bundle
	  return bundle;
  };
  
  /**
   * @public
   * @function
   * @name idx.resources.clearLocalOverrides
   * @descritpion Clears any resource overrides and resets to the default resources for the 
   *              specified (or default) locale, restoring the default resources.
   * 
   * @param {String} locale The optional locale for which the overrides should be cleared.  If
   *                        not specified then the default locale is assumed.
   */
  iResources.clearLocalOverrides = function(/*String?*/ locale) {
	 locale = dI18n.normalizeLocale(locale);
     iResources._currentResources[locale] = null;
     iResources._scopeResources[locale] = null;
  };

  /**
   * @public
   * @function
   * @name idx.resources.clearOverrides
   * @description Clears all resource overrides for all locales.
   */
  iResources.clearOverrides = function() {
     iResources._currentResources = [ ];
     iResources._scopeResources = [ ];
  };

  /**
   * @public
   * @function
   * @name idx.resources.install
   * @description Installs new resources and/or overrides existing resources being either in
   *              the base resource scope or in a specified scope.  The specified scope 
   *              might look like "idx/layout/HeaderPane", "idx/layout" or "ibm/myproduct".
   *              Resources should only be installed during application startup and then should
   *              be left unchanged to maximize efficiency.
   * @param {Object} resources The new resources to override the old ones -- this is mixed in
   *                           as a layer on top of the default resources.
   * @param {String} scope The optional string to override resources in a specific scope.  If not
   *                       specified then the global scope is assumed.
   * @param {String} locale The optional locale to override for.  If not specified then the 
   *                        default locale is assumed.
   */
  iResources.install = function(/*Object*/  resources, 
                                /*String*/  scope,
                                /*String?*/ locale) {
	locale = dI18n.normalizeLocale(locale);
	scope = iResources._normalizeScope(scope);
	var lastIndex = scope.lastIndexOf("/");
	
	var packageName = "";
	var bundleName  = "";
	if (lastIndex == scope.length - 1) {
		bundleName = "base";
		packageName = scope.substr(0,scope.length-1);
	} else if (lastIndex >= 0) {
		bundleName = scope.substr(lastIndex+1);
		packageName = scope.substr(0, lastIndex);
	}
    var bundle = iResources._getBundle(packageName, bundleName, locale);
    dLang.mixin(bundle, resources);
    iResources._clearResourcesCache(locale, scope);
  };

  /**
   * @public 
   * @function
   * @name idx.resources.getResources
   *
   * @description Obtains the resources for the specified scope.  The specified scope 
   *              might look like "idx/layout/HeaderPane", "idx/layout" or "ibm/myproduct".
   * 
   * @param {String} scope The optional string to override resources in a specific scope.  If not
   *                       specified then the global scope is assumed.
   * @param {String} locale The optional locale for which the resources are being requested.  If not
   *                        specified then the default locale is assumed.
   * @returns {Object} Returns a flattened resources object containing all resources for the optionally
   *                   specified scope.
   */
  iResources.getResources = function(/*String?*/ scope, /*String?*/ locale) {
    locale = dI18n.normalizeLocale(locale);
    scope = iResources._normalizeScope(scope);
    var scopeResources = iResources._scopeResources[locale];
    if (! scopeResources) {
       scopeResources = [ ];
       iResources._scopeResources[locale] = scopeResources;
    }

    var resourcesByScope = scopeResources[scope];

    // if we have a cached array of the resources, return it
    if (resourcesByScope) return resourcesByScope;

    resourcesByScope = new Object();

    var scopes = scope.split("/");
    var index = 0;
    var pkg = "";
    var prefix = "";
    for (index = 0; index < scopes.length; index++) {
    	var bundleName = "base";
    	if (index < scopes.length-1) {
    		pkg = pkg + prefix + scopes[index];
    		prefix = ".";
    	} else {
    		bundleName = scopes[index];
    	}
    	var bundle = iResources._getBundle(pkg,bundleName,locale);
    	if (!bundle) continue;
    	for (var field in bundle) {
    		resourcesByScope[field] = bundle[field];
    	}
    }
  
  	// cache for later
  	scopeResources[scope] = resourcesByScope;

  	// return the resources
    return resourcesByScope;     
  };

  /**
   * @public
   * @function
   * @description Legacy method for obtaining only the string resources.  This has been 
   *              superceeded by the more robust "getResources" method.
   * @param {String} scope The optional string to override resources in a specific scope.  If not
   *                       specified then the global scope is assumed.
   * @param {String} locale The optional locale for which the resources are being requested.  If not
   *                        specified then the default locale is assumed.
   * @returns {Object} Returns the result from idx.resouce.getResources.
   * @deprecated Use idx.resources.getResources instead
   */
  iResources.getStrings = function(/*String?*/ scope, /*String?*/ locale) {
	  return iResources.getResources(scope,locale);
  };
  
  /**
   * @private
   * @name idx.resources._clearResourcesCache
   * @function
   * @description Clears out any cached objects represnting the resources by scope for a
   *              particular locale.  This is called whenever new resources are installed 
   *              for the locale (which should not be very often).
   * @param {String} locale
   */
  iResources._clearResourcesCache = function(/*String?*/ locale,/*String?*/scope) {
	locale = dI18n.normalizeLocale(locale);
	if (iResources._scopeResources[locale]) {
		if (!scope) {
			iResources._scopeResources[locale] = null;
		} else {
			var cache = iResources._scopeResources[locale];
			for (field in cache) {
				if (iString.startsWith(field,scope)) {
					cache[field] = null;
				}
			}
		}
	}
  };

  /**
   * @public
   * @function
   * @name idx.resources.get
   * @description  Gets the named resource in the specified scope.  If the name is not found
   *               in the specified scope then the parent scope is searched and then its 
   *               parent up until the root scope.  If the resources is not found then null
   *               is returned.  If the scope is not specified then the root scope is assumed.
   *               The locale may be optionally specified as well.
   * @param {String} name The name of the resource to obtain from the hierarchical bundle.
   * @param {String} scope The optional scope, if not specified then the global scope is used.
   * @param {String} locale The optional locale, if not specified the default locale is used.
   * @returns {String} The value for the resource or null if not found.
   */
  iResources.get = function(/*String*/  name, 
                            /*String?*/ scope,
                            /*String?*/ locale) {
	locale = dI18n.normalizeLocale(locale);
	scope = iResources._normalizeScope(scope);
    var scopes = scope.split("/");
    var index = 0;
    for (index = 0; index < scopes.length; index++) {
    	var bundleName = (index == 0) ? scopes[scopes.length-1] : "base";
    	var pkgName = "";
    	var prefix = "";
    	var pkgMax = (index == 0) ? (scopes.length - index - 1) : (scopes.length - index);
    	for (var idx2 = 0; idx2 < pkgMax; idx2++) {
    		pkgName = pkgName + prefix + scopes[idx2];
    		prefix = ".";
    	}
    	var bundle = iResources._getBundle(pkgName,bundleName,locale);
    	if (!bundle) continue;
    	if (name in bundle) return bundle[name];
    }
    if(name in iResources._defaultResources){
    	return iResources._defaultResources[name];
    }
    return null;
  };

  /**
   * @public
   * @function
   * @name idx.resources.getLabelFieldSeparator
   * @description Returns the resource to use for separating labels from their fields.
   *              Typically this is a ":" or something to that effect.
   * @return Returns the resource to use for separating labels from their fields.
   *         Typically this is a ":" or something to that effect.
   */
  iResources.getLabelFieldSeparator = function(/*String?*/ scope,
                                                  /*String?*/ locale) {
      return iResources.get("labelFieldSeparator", scope, locale);  
  };
  
  /**
   * @public
   * @function
   * @name idx.resources.getDateFormatOptions
   * @description Getter for date format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The date format options for the given scope.
   */
  iResources.getDateFormatOptions = function(/*String?*/ scope, 
                                                /*String?*/ locale) {
     return iResources.get("dateFormatOptions", scope, locale);
  };
  
  /**
   * @public
   * @function
   * @name idx.resources.getTimeFormatOptions
   * @description Getter for time format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The time format options for the given scope.
   */
  iResources.getTimeFormatOptions = function(/*String?*/ scope,
                                                /*String?*/ locale) {
     return iResources.get("timeFormatOptions", scope, locale);
  };

  /**
   * @public
   * @function
   * @name idx.resources.getDateTimeFormatOptions
   * @description Getter for date/time format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The date/time format options for the given scope.
   */
  iResources.getDateTimeFormatOptions = function(/*String?*/ scope,
                                                    /*String?*/ locale) {
     return iResources.get("dateTimeFormatOptions", scope, locale);
  };

  /**
   * @public
   * @function
   * @name idx.resources.getDecimalFormatOptions
   * @description Getter for date format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The decimal format options for the given scope.
   */
  iResources.getDecimalFormatOptions = function(/*String?*/ scope,
                                                   /*String?*/ locale) {
     return iResources.get("decimalFormatOptions", scope, locale);
  };

  /**
   * @public
   * @function
   * @name idx.resources.getIntegerFormatOptions
   * @description Getter for integer format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The integer format options for the given scope.
   */
  iResources.getIntegerFormatOptions = function(/*String?*/ scope, 
                                                   /*String?*/ locale) {
     return iResources.get("integerFormatOptions", scope, locale);
  };

  /**
   * @public
   * @function
   * @name idx.resources.getPercentFormatOptions
   * @description Getter for percent format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The percent format options for the given scope.
   */
  iResources.getPercentFormatOptions = function(/*String?*/ scope,
                                                   /*String?*/ locale) {
     return iResources.get("percentFormatOptions", scope, locale);
  };

  /**
   * @public
   * @function
   * @name idx.resources.getCurrencyFormatOptions
   * @description Getter for currency format options
   * @param {String} scope The optional scope, if not specified then the global scope is assumed.
   * @param {String} locale The optional locale, if not specified then the default locale is assumed.
   * @returns {Object} The currency format options for the given scope.
   */
  iResources.getCurrencyFormatOptions = function(/*String?*/ scope,
                                                    /*String?*/ locale) {
     return iResources.get("currencyFormatOptions", scope, locale);
  };
  
  return iResources;
});
},
'idx/widget/nls/HoverHelpTooltip':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define({ root:
//begin v1.x content
({
	learnMoreLabel: "Learn more"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});
},
'idx/form/_CssStateMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
"dojo", 
"dijit/dijit", 
"dijit/_WidgetBase", 
"dojo/_base/array", 
"dojo/has", 
"dojo/ready", 
"dojo/on", 
"dojo/_base/window", 
"dijit/registry",
"dojo/dom", 
"dojo/dom-class"], 
function(dojo, dijit, widgetBase, array, has, ready, on, win, registry, dom, domClass){

var CssStateMixin =  dojo.declare("idx.form._CssStateMixin", [], {
	
	cssStateNodes: {},
	hovering: false,
	active: false,

	// stateNode
	//		The original dijit domNode (inner field widget)
	
	// oneuiBaseClass
	//		The original dijit baseClass (inner field widget)

	_applyAttributes: function(){
		widgetBase.prototype._applyAttributes.apply(this, arguments);

		// Monitoring changes to disabled, readonly, etc. state, and update CSS class of root node
		dojo.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active", "required"], function(attr){
			this.watch(attr, dojo.hitch(this, "_setStateClass"));
		}, this);

		// Events on sub nodes within the widget
		for(var ap in this.cssStateNodes){
			this._trackMouseState(this[ap], this.cssStateNodes[ap]);
		}
		this._trackMouseState(this.stateNode, this.oneuiBaseClass);
		// Set state initially; there's probably no hover/active/focus state but widget might be
		// disabled/readonly/checked/selected so we want to set CSS classes for those conditions.
		this._setStateClass();
	},

	_cssMouseEvent: function(/*Event*/ event){
		// summary:
		//	Sets hovering and active properties depending on mouse state,
		//	which triggers _setStateClass() to set appropriate CSS classes for this.domNode.
		if(!this.disabled){
			switch(event.type){
				case "mouseover":
					this._set("hovering", true);
					this._set("active", this._mouseDown);
					break;
				case "mouseout":
					this._set("hovering", false);
					this._set("active", false);
					break;
				case "mousedown":
				case "touchstart":
					this._set("active", true);
					break;
				case "mouseup":
				case "touchend":
					this._set("active", false);
					break;
			}
		}
	},
	
	_setStateClass: function(){
		// Compute new set of classes
		var newStateClasses = this._getModifiedClasses(this.oneuiBaseClass);
		this._applyStateClass(this.stateNode, newStateClasses);
		newStateClasses = this._getModifiedClasses(this.baseClass);
		this._applyStateClass(this.domNode, newStateClasses);
	},
	
	_getModifiedClasses: function(/*String*/className){
		var clazz = className.split(" ");
		function multiply(modifier){
			clazz = clazz.concat(dojo.map(clazz, function(c){ return c+modifier; }), "dijit"+modifier);
		}

		if(!this.isLeftToRight()){
			// For RTL mode we need to set an addition class like dijitTextBoxRtl.
			multiply("Rtl");
		}

		var checkedState = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
		if(this.checked){
			multiply(checkedState);
		}
		if(this.state){
			multiply(this.state);
		}
		if(this.selected){
			multiply("Selected");
		}
		if(this.required){
			multiply("Required");
		}
		if(this.disabled){
			multiply("Disabled");
		}else if(this.readOnly){
			multiply("ReadOnly");
		}else{
			if(this.active){
				multiply("Active");
			}else if(this.hovering){
				multiply("Hover");
			}
		}

		if(this.focused){
			multiply("Focused");
		}
		return clazz;
	},
	
	_applyStateClass: function(/*DomNode*/ node, /*Array*/classes){
		// Compute new set of classes
		// Remove old state classes and add new ones.
		// For performance concerns we only write into stateNode.className and domNode.className once.
		var classHash = {};	// set of all classes (state and otherwise) for node
		
		dojo.forEach(node.className.split(" "), function(c){ classHash[c] = true; });

		if("_stateClasses" in node){
			dojo.forEach(node._stateClasses, function(c){ delete classHash[c]; });
		}

		dojo.forEach(classes, function(c){ classHash[c] = true; });

		var newClasses = [];
		for(var c in classHash){
			newClasses.push(c);
		}
		node.className = newClasses.join(" ");
		node._stateClasses = classes;
	},
	
	_subnodeCssMouseEvent: function(node, clazz, evt){
		// summary:
		//		Handler for hover/active mouse event on widget's subnode
		if(this.disabled || this.readOnly){
			return;
		}
		var classSet = clazz.split(/\s+/);
		function hover(isHovering){
			array.forEach(classSet, function(clazz){
				domClass.toggle(node, clazz+"Hover", isHovering);
			})
		}
		function active(isActive){
			array.forEach(classSet, function(clazz){
				domClass.toggle(node, clazz+"Active", isActive);
			})
		}
		function focused(isFocused){
			array.forEach(classSet, function(clazz){
				domClass.toggle(node, clazz+"Focused", isFocused);
			})
		}
		switch(evt.type){
			case "mouseover":
				hover(true);
				break;
			case "mouseout":
				hover(false);
				active(false);
				break;
			case "mousedown":
			case "touchstart":
				active(true);
				break;
			case "mouseup":
			case "touchend":
				active(false);
				break;
			case "focus":
			case "focusin":
				focused(true);
				break;
			case "blur":
			case "focusout":
				focused(false);
				break;
		}
	},

	_trackMouseState: function(/*DomNode*/ node, /*String*/ clazz){
		// summary:
		//		Track mouse/focus events on specified node and set CSS class on that node to indicate
		//		current state.   Usually not called directly, but via cssStateNodes attribute.
		// description:
		//		Given class=foo, will set the following CSS class on the node
		//
		//		- fooActive: if the user is currently pressing down the mouse button while over the node
		//		- fooHover: if the user is hovering the mouse over the node, but not pressing down a button
		//		- fooFocus: if the node is focused
		//
		//		Note that it won't set any classes if the widget is disabled.
		// node: DomNode
		//		Should be a sub-node of the widget, not the top node (this.domNode), since the top node
		//		is handled specially and automatically just by mixing in this class.
		// clazz: String
		//		CSS class name (ex: dijitSliderUpArrow)

		// Flag for listener code below to call this._cssMouseEvent() or this._subnodeCssMouseEvent()
		// when node is hovered/active
		node._cssState = clazz;
	}
});
ready(function(){
	// Document level listener to catch hover etc. events on widget root nodes and subnodes.
	// Note that when the mouse is moved quickly, a single onmouseenter event could signal that multiple widgets
	// have been hovered or unhovered (try test_Accordion.html)
	function handler(evt){
		// Poor man's event propagation.  Don't propagate event to ancestors of evt.relatedTarget,
		// to avoid processing mouseout events moving from a widget's domNode to a descendant node;
		// such events shouldn't be interpreted as a mouseleave on the widget.
		if(!dom.isDescendant(evt.relatedTarget, evt.target)){
			for(var node = evt.target; node && node != evt.relatedTarget; node = node.parentNode){
				// Process any nodes with _cssState property.   They are generally widget root nodes,
				// but could also be sub-nodes within a widget
				if(node._cssState){
					var widget = registry.getEnclosingWidget(node);
					if(widget){
						if(node == widget.oneuiBaseNode){
							widget._cssMouseEvent(evt);
						}else{
							if(node == widget.domNode){
								// event on the widget's root node
								widget._cssMouseEvent(evt);
							}else{
								// event on widget's sub-node
								widget._subnodeCssMouseEvent(node, node._cssState, evt);
							}
						}
					}
				}
			}
		}
	}
	function ieHandler(evt){
		evt.target = evt.srcElement;
		handler(evt);
	}

	// Use addEventListener() (and attachEvent() on IE) to catch the relevant events even if other handlers
	// (on individual nodes) call evt.stopPropagation() or event.stopEvent().
	// Currently typematic.js is doing that, not sure why.
	// Don't monitor mouseover/mouseout on mobile because iOS generates "phantom" mouseover/mouseout events when
	// drag-scrolling, at the point in the viewport where the drag originated.   Test the Tree in api viewer.
	var body = win.body(),
		types = (has("touch") ? [] : ["mouseover", "mouseout"]).concat(["mousedown", "touchstart", "mouseup", "touchend"]);
	array.forEach(types, function(type){
		if(body.addEventListener){
			body.addEventListener(type, handler, true);	// W3C
		}else{
			body.attachEvent("on"+type, ieHandler);	// IE
		}
	});

	// Track focus events on widget sub-nodes that have been registered via _trackMouseState().
	// However, don't track focus events on the widget root nodes, because focus is tracked via the
	// focus manager (and it's not really tracking focus, but rather tracking that focus is on one of the widget's
	// nodes or a subwidget's node or a popup node, etc.)
	// Remove for 2.0 (if focus CSS needed, just use :focus pseudo-selector).
	on(body, "focusin, focusout", function(evt){
		var node = evt.target;
		if(node._cssState && !node.getAttribute("widgetId")){
			var widget = registry.getEnclosingWidget(node);
			widget._subnodeCssMouseEvent(node, node._cssState, evt);
		}
	});
});
return CssStateMixin;
});
},
'idx/app/nls/base':function(){
define({root:
//begin v1.x content
({
  
})
//end v1.x content
});

},
'idx/util':function(){
﻿/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
define(["dojo/_base/lang",
        "idx/main",
        "dojo/_base/kernel",
        "dojo/has",
        "dojo/_base/xhr",
        "dojo/_base/window",
        "dojo/_base/url",
        "dojo/date/stamp",
        "dojo/json",
        "dojo/string",
        "dojo/dom-class",
        "dojo/dom-style",
        "dojo/dom-attr",
        "dojo/dom-construct",
        "dojo/dom-geometry",
        "dojo/io-query",
        "dojo/query",
        "dojo/NodeList-dom",
        "dijit/registry",
        "dijit/form/_FormWidget",
        "dijit/_WidgetBase",
        "dojo/_base/sniff",
        "dijit/_base/manager"], // temporarily resolve dijit.byid() uncaught exception issue in aprser 
		function(dLang,				// dojo/_base/lang
				 iMain,				// idx
		         dKernel, 			// dojo/_base/kernel
		     	 dHas,				// dojo/has
		     	 dXhr,				// dojo/_base/xhr
   		    	 dWindow,			// dojo/_base/window
   		     	 dURL,				// dojo/_base/url
   		     	 dDateStamp,		// dojo/date/stamp
	   		     dJson,				// dojo/json
	   		     dString,			// dojo/string
				 dDomClass,			// dojo/dom-class (for dDomClass.add)
				 dDomStyle,			// dojo/dom-style (for dDomStyle.getComputedStyle/set)
				 dDomAttr,			// dojo/dom-attr
				 dDomConstruct,		// dojo/dom-construct
				 dDomGeo,			// dojo/dom-geometry (for dDomGeo.getMarginBox)
				 dIOQuery,			// dojo/io-query
				 dQuery,			// dojo/query
				 dNodeList,			// dojo/NodeList-dom
				 dRegistry,			// dijit/registry
				 dFormWidget,		// dijit/form/_FormWidget
				 dWidget)			// dijit/_WidgetBase
{
    /**
 	 * @name idx.util
 	 * @namespace Provides Javascript utility methods in addition to those provided by Dojo.
 	 */
	var iUtil = dLang.getObject("util", true, iMain);
	
	/**
  	 * @public
  	 * @function
 	 * @name idx.util.getVersion
 	 * @description Returns the IDX toolkit version string from the "version.txt" file embedded in the toolkit.
 	 * @param {Boolean} full A boolean value indicating if the full version or partial version is desired.
 	 */
	iUtil.getVersion = function(full) {
		var params = {
			url: dKernel.moduleUrl("idx", "version.txt"),
			showProgress: false,
			handleAs: "json",
			load: function(response, ioArgs) {
				var msg = response.version;
				if(full) {
					msg += "-";
					msg += response.revision;
				}
				console.debug(msg);
			},
			error: function(response, ioArgs) {
				console.debug(response);
				return;
			}
		};
		dXhr.xhrGet(params);
	};
	
	/**
  	 * @public
  	 * @function
 	 * @name idx.util.getOffsetPosition
 	 * @description Returns the pixel offset from top-left for a given node relative to a "root" node.
 	 * @param {Node} node The node for which the offset is desired.
 	 * @param {Node} root The optional ancestor node of the first specified node.  If not specified
 	 *                    then the Window body tag is used.
 	 * @return {Object} The returned value has two fields: "l" and "t" representing "left offset" and 
 	 *                  "top offset", respectively.  Results are undefined if the "root" node is not an
 	 *                  ancestor of the first specified node.
 	 */
	iUtil.getOffsetPosition = function(node, root) {
		var body = dWindow.body();
		root = root || body;
		var n = node;
		
		var l = 0;
		var t = 0;
		
		while (n !== root) {
			// avoid infinite loop if root is not ancestor of node
			if (n === body) throw "idx.util.getOffsetPosition: specified root is not ancestor of specified node";
			
			// otherwise accumulate the offsets and move on to the parent
			l += n.offsetLeft;
			t += n.offsetTop;
			n = n.offsetParent;
		}
		return {l: l, t: t};
	};

	/**
  	 * @public
  	 * @function
 	 * @name idx.util.typeOfObject
 	 * @description Provides a type for the specified object based on the locally-scoped
 	 *              "val2type" function from "dojo/parser" module.
 	 * @param {Any} value The value for which the type is desired.
 	 * @return {String} Possible return values include: "string", "undefined", "number", "boolean", 
 	 *                  "function", "array", "date", "url" and "object".
 	 */
	iUtil.typeOfObject = function(/*Object*/ value){
		// summary:
		//		Returns name of type of given value.

		if(dLang.isString(value)){ return "string"; }
		if(typeof value == "undefined") { return "undefined"; }
		if(typeof value == "number"){ return "number"; }
		if(typeof value == "boolean"){ return "boolean"; }
		if(dLang.isFunction(value)){ return "function"; }
		if(dLang.isArray(value)){ return "array"; } // typeof [] == "object"
		if(value instanceof Date) { return "date"; } // assume timestamp
		if(value instanceof dURL){ return "url"; }
		return "object";
	};

	/**
  	 * @public
  	 * @function
 	 * @name idx.util.typeOfObject
 	 * @description Provides conversion of one object (or string) to another type based on
 	 *              the locally-scoped "str2obj" function from the "dojo/parser" module.
 	 * @param {String|Any} value The value to be converted.
 	 * @param {String} type The Type to convert the object to ("string", "number", "boolean", 
 	 *                      "function", "array", "date", or "url").  If not provided then 
 	 *                      string values are parsed as JSON and non-string value are returned as-is.
 	 * 
 	 * @return {Object} The converted value of the object according to the specified "type".
 	 */
	iUtil.parseObject = function(/*Object*/ value, /*String*/ type){
		// summary:
		//		Convert given string value to given type
		switch(type){
			case "string":
				return "" + value;
			case "number":
				if (typeof value == "number") return value;
				return value.length ? Number(value) : NaN;
			case "boolean":
				// for checked/disabled value might be "" or "checked".  interpret as true.
				return (typeof value == "boolean") ? value : !(value.toLowerCase()=="false");
			case "function":
				if(dLang.isFunction(value)){
					// IE gives us a function, even when we say something like onClick="foo"
					// (in which case it gives us an invalid function "function(){ foo }"). 
					//  Therefore, convert to string
					value=value.toString();
					value=dLang.trim(value.substring(value.indexOf('{')+1, value.length-1));
				}
				try{
					if(value === "" || value.search(/[^\w\.]+/i) != -1){
						// The user has specified some text for a function like "return x+5"
						return new Function(value);
					}else{
						// The user has specified the name of a function like "myOnClick"
						// or a single word function "return"
						return dLang.getObject(value, false) || new Function(value);
					}
				}catch(e){ return new Function(); }
			case "array":
				if (dLang.isArray(value)) return value;
				return value ? value.split(/\s*,\s*/) : [];
			case "date":
				if (value instanceof Date) return value;
				switch(value){
					case "": return new Date("");	// the NaN of dates
					case "now": return new Date();	// current date
					default: {
						return dDateStamp.fromISOString(value);
					}
				}
			case "url":
				if(value instanceof dURL){ return value; }
				return dKernel.baseUrl + value;
			default:
				if (iUtil.typeOfObject(value) == "string") {
					return dJson.parse(value);
				} else {
					return value;
				}
		}
	};

	/**
  	 * @public
  	 * @function
 	 * @name idx.util.getCSSOptions
 	 * @description Creates a temporary div as a child of the optional parent (otherwise the body node),
 	 *              applies the specified CSS class to the div and extracts the query-string from the 
 	 *              background image of the created div to determine the CSS options.  The parameters in
 	 *              query string are converted to specific object types according to the optionally specified
 	 *              "guide" object which is checked for attributes with names in common with the provided 
 	 *              parameters (see idx.util.mixin).  This conversion is done in much the same way Dojo 1.6 
 	 *              parser converted string attribute values to the proper type for the created widget's attributes.
 	 * @param {String} className The CSS class name to use for getting the options.
 	 * @param {Node} parentNode The optional (but recommended) parent node parameter for the scope in which
 	 *                          to create the temporary node.
 	 * @param {Object} guide The optional guide to help in converting the CSS options to objects. 
 	 * 
 	 * @return {Object} The Object containing the CSS options with the attribute types matching the
 	 *                  specified guide where applicable.
 	 */
    iUtil.getCSSOptions = function(/*String*/  className,
                                   /*Node?*/   parentNode,
                                   /*Object?*/ guide,
                                   /*Object?*/ fallback) {
            var body = dWindow.body();
            if ((! parentNode) || (("canHaveHTML" in parentNode) && (! parentNode.canHaveHTML))) {
                parentNode = body;
            }
            
            // determine if the parent node is rooted in the body
            var rooted = false;
            var trav = parentNode;
            while (trav && (!rooted)) {
            	if (trav === body) rooted = true;
            	trav = trav.parentNode;
            }
            var root = null;
			if (!rooted) {
				trav = parentNode;
				var classes = [];
				while (trav) {
					classes.push(dDomAttr.get(trav, "class"));
					trav = trav.parentNode;
				}
				classes.reverse();
				var root = dDomConstruct.create("div",{style: "visibility: hidden; display: none;"},body,"last");
				var trav = root; 
				for (var index = 0; index < classes.length; index++) {
					var classAttr = classes[index];
					if (classAttr) classAttr = dString.trim(classAttr);
					if (classAttr && classAttr.length == 0) classAttr = null;
					var attrs = (classAttr) ? {"class": classAttr} : null;
					trav = dDomConstruct.create("div", attrs, trav, "last");
				}					
				parentNode = trav;
			}
			            
            var optionElem = dDomConstruct.create("div", null, parentNode);
        	dDomClass.add(optionElem, className);
        	var myStyle = dDomStyle.getComputedStyle(optionElem);
        	var bgImage = null;
        	if (myStyle) {
        		bgImage = "" + myStyle.backgroundImage;
        	}
        	dDomConstruct.destroy(optionElem);
            if (root) dDomConstruct.destroy(root);
            
            var noURL = ((! bgImage)
            			  || (bgImage.length < 5) 
            			  || (bgImage.toLowerCase().substring(0, 4) != "url(")
            			  || (bgImage.charAt(bgImage.length - 1) != ")"));
            			  
            var options = null;
            if (noURL && (bgImage == null || bgImage == "none") && fallback && (!dLang.isString(fallback))) {
            	options = fallback;
            } 
            
            if (! options) {
            	var cssOpts = null;
	            if (noURL && (bgImage == null || bgImage == "none") && fallback && dLang.isString(fallback)) {
            		cssOpts = fallback;
            		
            	} else if (!noURL) {
		            // remove the "url(" prefix and ")" suffix
    		        bgImage = bgImage.substring(4, bgImage.length - 1);
            
        			// check if our URL is quoted
	        	    if (bgImage.charAt(0) == "\"") {
    	        	    // if not properly quoted then we don't parse it
        	        	if (bgImage.length < 2) return null;
            	    	if (bgImage.charAt(bgImage.length - 1) != "\"") return null;
                
	                	// otherwise remove the quotes
    	            	bgImage = bgImage.substring(1, bgImage.length - 1);
            		}
            
	        		// find the query string
    	        	var queryIdx = bgImage.lastIndexOf("?");
            		var slashIdx = bgImage.lastIndexOf("/");
            		if (queryIdx < 0) return null;
            		if (queryIdx < slashIdx) return null;
            
        			// get just the query string from the URL
            		cssOpts = bgImage.substring(queryIdx + 1, bgImage.length);
            	}         
            	if (cssOpts == null) return null;
            	if (cssOpts.length == 0) return null;
            
        		// parse the query string and return the result
            	options = dIOQuery.queryToObject(cssOpts);
            }
            return (guide) ? iUtil.mixin({}, options, guide) : options;
        };
        
	/**
  	 * @public
  	 * @function
 	 * @name idx.util.mixinCSSDefaults
 	 * @description Obtains the "CSS Options" using idx.util.getCSSOptions via the specified CSS class name
 	 *              and optional parent node using the specified target object as the "guide" and mixing the
 	 *              CSS options directly into the target object via idx.util.mixin.  Any CSS options not 
 	 *              matching an attribute of the target object are ignored.
	 * 	 
 	 * @param {Object} target The target object to mix the CSS defaults into.
 	 * @param {String} className The CSS class name passed to idx.util.getCSSOptions.
 	 * @param {Node} parentNode The optional (but recommended) parent node passed to idx.util.getCSSOptions.
 	 * 
 	 * @return {Object} The Object containing the CSS options with the attribute types matching the
 	 *                  specified guide where applicable.
 	 */
    iUtil.mixinCSSDefaults = function(/*Object*/ target,
                                      /*String*/ className,
                                      /*Node?*/  parentNode) {
            if (!target) return null;
            var opts = iUtil.getCSSOptions(className, parentNode);

            if (!opts) return null;
            
            iUtil.mixin(target, opts);
            
            return opts;
        };

	/**
  	 * @public
  	 * @function
 	 * @name idx.util.mixin
 	 * @description Provides a restricted version of dojo.lang.mixin.  This function Mixes the attributes of the 
 	 *              specified "source" into the specified "target" but only if the specified target object (or
 	 *              optionally specified "guide" object) already has the attribute from the source object.  Further,
 	 *              the type of each attribute that is mixed in is interpretted to match the type of the same 
 	 *              attribute in the target (or rather the "guide" object if provided).  If no guide is specified, 
 	 *              then the target object is used as a guide.  If a guide is specified the the target object simply
 	 *              becomes the landing zone for the mixed-in attributes.
	 * 	 
 	 * @param {Object} target The target object to mix the attributes into.
 	 * @param {Object} source The source object to pull the attributes from.
 	 * @param {Object} guide The optional object whose attributes and types of those attributes will be used 
 	 *                       as a guide for converting the source attributes to the target attribute.
 	 * @return The specified target object is returned.
 	 */
     iUtil.mixin = function(/*Object*/  target,
                            /*Object*/  source,
                            /*Object?*/ guide) {
     	if (!target) return null; 	// cannot mixin to null
        if (!source) return target;	// if nothing to mixin then do nothing
        if (!guide) guide = target;	// if no guide is specified then use the target as the guide
        
        var src = { };
        // if we have the class info, then parse the fields of the options
        for (var field in source) {
	       	if (! (field in guide)) continue;
    	        var attrType = iUtil.typeOfObject(guide[field]);
                src[field] = iUtil.parseObject(source[field], attrType);
        }
            
         // mixin the options
         dLang.mixin(target, src);
         return target;
     };
        
    /**
  	 * @public
  	 * @function
 	 * @name idx.util.recursiveMixin
 	 * @description Recursively mixes in the second specified object into the first, optionally using
 	 *              the specifed options.  Recursion occurs when the attribute is contained in both
 	 *              the first and second object and is of type "object" in both cases.  Recursion can
 	 *              be made optional via the "options" parameter by specifying the name of a "controlField"
 	 *              and "controlValue".  In such cases the first object is checked for the presence of the
 	 *              "controlField" and if it exists and the value is equal to the specified "controlValue"
 	 *              then recusion occurs, otherwise it does not.  When recursion does not occur an an object
 	 *              value from the second object is copied it may optionally be cloned by setting "options.clone"
 	 *              to true.
     * @param {Object} first The object the attributes will be mixed into
     * @param {Object} second The object that holds the attributes to mixin
     * @param {Objet} options (includes "clone", "controlField" and "controlValue").  If "clone" is 
     *                        specified then attributes whose values are of type object in the second 
     *                        object are cloned before being set in the first object.  The "controlField"
     *                        and "controlValue" options are used to determine if an object in the first
     *                        object should be recursively mixed in.  If "controlField" is provided, but
     *                        not "controlValue" then "controlValue" is defaulted to true.
     */
     iUtil.recursiveMixin = function(first, second, options) {
        	var clone = null;
        	var controlField = null;
        	var controlValue = null;
        	if (options) {
        		clone = options.clone;
        		controlField = options.controlField;
        		if ("controlValue" in options) {
        			controlValue = options.controlValue;
        		} else {
        			controlValue = true;
        		}
        	}
        	
        	for (field in second) {
        		if (field in first) {
        			// get the field values
        			var firstValue = first[field];
        			var secondValue = second[field];
        			
        			// get the types for the values
        			var firstType = iUtil.typeOfObject(firstValue);
        			var secondType = iUtil.typeOfObject(secondValue);

        			// check if they are not the same type
        			if ((firstType == secondType) && (firstType == "object")
        				&& ((!controlField) || (firstValue[controlField] == controlValue))) {
        				// if both are objects then mix the second into the first
        				iUtil.recursiveMixin(firstValue, secondValue, options);
        				
        			} else {
        				// otherwise overwrite the first with the second
        				first[field] = (clone) ? dLang.clone(secondValue) : secondValue;
        			}
        		} else {
        			first[field] = (clone) ? dLang.clone(second[field]) : second[field];
        		}
        	}
        };
        
        
    /**
  	 * @public
  	 * @function
 	 * @name idx.util.nullify
 	 * @description Accepts a target object, an object that represents arguments passed
     *              to construct the target object (usually via mixin). and an
     *              and an array of property names for which the value should be null if
     *              not otherwise specified.  For each of the specified properties, if 
     *              the construction arguments does not specify a value for that property, 
     *              then the same property is set to null on the target object.  If a 
     *              property name is found not to exist in the target object then it is 
     *              ignored.
     *
     * @param {Object} target Usually the object being constructed.
     * 
     * @param {Object} ctorArgs The objects that would specify attributes on the target.
     * 
     * @param {Object} props The array of property names for properties to be set to null
     *                       if none of the objects in the argsArray specify them.
     */
    iUtil.nullify = function(target,ctorArgs,props) {
        var index = 0;
        for (index = 0; index < props.length; index++) {
            var prop = props[index];
            if (! (prop in target)) continue;
            if ((ctorArgs) && (prop in ctorArgs)) continue;
            target[prop] = null;
        }
    };
        
    /**
  	 * @private
  	 * @function
 	 * @name idx.util._getNodeStyle
     * @description Internal method to get the node's style as an object.  This method does not
     *              normalize the style fields so it will need to be extended to make it more
     *              robust for the general case.  idx.util only needs this for things like "position",
     *              "width" and "height" in order to reset values on a node after changing them.
     */
    iUtil._getNodeStyle = function(node) {
        	var nodeStyle = dDomAttr.get(node, "style");
        	if (!nodeStyle) return null;
        	var result = null;
       		if (iUtil.typeOfObject(nodeStyle) == "string") {
       			result = {};
       			var tokens = nodeStyle.split(";");
       			for (var index = 0; index < tokens.length; index++) {
       				var token = tokens[index];
       				var colonIndex = token.indexOf(":");
       				if (colonIndex < 0) continue;
       				var field = token.substring(0, colonIndex);
       				var value = "";
       				if (colonIndex < token.length - 1) {
       					value = token.substring(colonIndex+1);
       				}
       				result[field] = value;
       			}
     		} else {
     			result = nodeStyle;
     		}
       		return result;
        };

    /**
  	 * @private
  	 * @function
 	 * @name idx.util._getNodePosition
     * @description Internal method to get the node's specific position and detect when none is specifically
     *              assigned to the node.
     */
    iUtil._getNodePosition = function(node) {
        	var style = iUtil._getNodeStyle(node);
        	if (! style) return "";
        	if (! style.position) return "";
        	return style.position;
    };
        
    /**
  	 * @public
  	 * @function
 	 * @name idx.util.fitToWidth
     * @description Sizes a parent to fit the child node as if the child node's positioning was
     *              NOT absolute.  Absolutely positioned elements due not "reserve" space, so this
     *              method will temporarily position the element as "static", then determine the
     *              result size of the parent, set the parent's width explicitly, and then return the
     *              child to the default previously set positioning.  This is especially handy in that
     *              it allows the parent to define padding which will be respected.
     *
     * @param {Node} parent The parent node -- no checking is done to ensure this node is actually 
     *                      a parent of the specified child.
     * @param {Node} child The child node -- no checking is done to ensure this node is actually a
     *                     child of the specified parent.
     */
    iUtil.fitToWidth = function(/*Node*/ parent, /*Node*/ child) {
        	var pos = iUtil._getNodePosition(child);
            dDomStyle.set(parent, {width: "auto"});
            dDomStyle.set(child, {position: "static"});
            var dim = dDomGeo.getMarginBox(parent);
            dDomStyle.set(parent, {width: dim.w + "px"});
            dDomStyle.set(child, {position: pos});  
            return dim;
    };
        
    /**
  	 * @public
  	 * @function
 	 * @name idx.util.fitToHeight
 	 * @description Sizes a parent to fit the child node as if the child node's positioning was
 	 *              NOT absolute.  Absolutely positioned elements due not "reserve" space, so 
 	 *              this method will temporarily position the element as "static", then determine
 	 *              the result size of the parent, set the parent's height explicitly, and then 
 	 *              return the child to the default previously set positioning.  This is especially
 	 *              handy in that it allows the parent to define padding which will be respected.
     *
     * @param {Node} parent The parent node -- no checking is done to ensure this node is actually 
     *                      a parent of the specified child.
	 * @param {Node} child The child node -- no checking is done to ensure this node is actually a
	 *                     child of the specified parent.
 	 */
    iUtil.fitToHeight = function(/*Node*/ parent, /*Node*/ child) {
        	var pos = iUtil._getNodePosition(child);
            dDomStyle.set(parent, {height: "auto"});
            dDomStyle.set(child, {position: "static"});
            var dim = dDomGeo.getMarginBox(parent);
            dDomStyle.set(parent, {height: dim.h + "px"});
            dDomStyle.set(child, {position: pos});  
            return dim;
    };
       
    /**
  	 * @public
  	 * @function
 	 * @name idx.util.fitToSize
 	 * @description Sizes a parent to fit the child node as if the child node's positioning was 
 	 *              NOT absolute.  Absolutely positioned elements due not "reserve" space, so this
 	 *              method will temporarily position the element as "static", then determine the 
 	 *              result size of the parent, set the parent's size explicitly, and then return the
	 *              child to the default previously set positioning.  This is especially handy in 
	 *              that it allows the parent to define padding which will be respected.
	 * 
     * @param {Node} parent The parent node -- no checking is done to ensure this node is actually 
     *                      a parent of the specified child.
     *
     * @param {Node} child The child node -- no checking is done to ensure this node is actually a 
     *                     child of the specified parent.
     */
    iUtil.fitToSize = function(/*Node*/ parent, /*Node*/ child) {
        	var pos = iUtil._getNodePosition(child);
            dDomStyle.set(parent, {width: "auto", height: "auto"});
            dDomStyle.set(child, {position: "static"});
            var dim = dDomGeo.getMarginBox(parent);
            dDomStyle.set(parent, {width: dim.w + "px", height: dim.h + "px"});
            dDomStyle.set(child, {position: pos});
            return dim;
        };
     
     /**
      * @public
  	  * @function
 	  * @name idx.util.getStaticSize
 	  * @description Determines the  dimensions of the specified node if it were to use static positioning.
      *
      * @param {Node} node The node to work with.
      */  
     iUtil.getStaticSize = function(/*Node*/ node) {
        	var style = iUtil._getNodeStyle(node);
        	var pos = (style && style.position) ? style.position: "";
            var width  = (style && style.width) ? style.width : "";
            var height = (style && style.height) ? style.height : "";
            dDomStyle.set(node, {position: "static", width: "auto", height: "auto"});
            var dim = dDomGeo.getMarginBox(node);
            dDomStyle.set(node, {position: pos, width: width, height: height});
            return dim;
        };
        
     /**
      * @public
  	  * @function
 	  * @name idx.util.reposition
 	  * @description Determines the  dimensions of the specified node if it were to use static positioning.
      *
      * @param {Node} node The node to work with.
      * @param {String} position The CSS position to use.
      */  
     iUtil.reposition = function(/*Node*/ node, /*String*/ position) {
        	var oldpos = iUtil._getNodePosition(node);
            dDomStyle.set(node, {position: position});
            return oldpos;
     };

		        
     /**
      * @public
  	  * @function
 	  * @name idx.util.getParentWidget
 	  * @description Determines the widget that is the parent of the specified widget or node.  This 
 	  *              is determined by obtaining the parent node for the specified node or "widget.domNode"
 	  *              and then calling dijit.getEnclosingWidget().  This method may return null if no widget
 	  *              parent exists.
      *
      * @param {Node|Widget} child The node or dijit._WidgetBase child for which the parent is being requested.
      * @param {Type} widgetType The optional type of widget for the parent.  The method recursively looks for 
      *                          the first ancestor of this type until found or we run out of ancestors.
      *
      * @return {Widget} The parent or ancestor widget.
      */  
     iUtil.getParentWidget = function(/*Node|Widget*/ child,
     								  /*Type*/        widgetType) {
            // get the widget node
            var childNode = (child instanceof dWidget) ? child.domNode : child;
            
            // get the parent node of the DOM node
            var parentNode = childNode.parentNode;
            
            // check the parent node
            if (parentNode == null) return null;
            
            // get the widget for the node
            var parent = dRegistry.getEnclosingWidget(parentNode);
            
            // check if looking for a specific widget type
            while ((widgetType) && (parent) && (! (parent instanceof widgetType))) {
            	parentNode = parent.domNode.parentNode;
            	parent = null;
            	if (parentNode) {
            		parent = dRegistry.getEnclosingWidget(parentNode);
            	}
            } 
            
            // return the parent
            return parent;
    };

     /**
      * @public
  	  * @function
 	  * @name idx.util.getSiblingWidget
 	  * @description Determines the widget that is the first next or previous sibling of the 
 	  *              specified widget or node that is a widget (optionally of a specific type).  This
 	  *              is determined by obtaining the parent node for the specified node or "widget.domNode",
 	  *              finding the first next or previous sibling node that is the domNode for a widget, and
 	  *              if not moving on to the next.  This method may return null if no widget sibling exists.
      *
      * @param {Node|Widget} target The node or dijit._WidgetBase for which the sibling is being requested.
      * @param {Boolean} previous Optional parameter for indicating which sibling.  Specify true if the 
      *                           previous sibling is desired and false if the next sibling.  If omitted then
      *                           false is the default.
      * @param {Type} widgetType The optional type of widget for the sibling.  If specified, this method ignores
      *                          any sibling that is not of the specified type.
      *
      * @return {Widget} The sibling widget or null if no widget matching the criteria is found..
      */  
    iUtil.getSiblingWidget = function(/*Node|Widget*/ target, 
        	 						  /*Boolean*/     previous,
        							  /*Type*/        widgetType) {        	
            // get the widget node
            var widgetNode = (target instanceof dWidget) ? target.domNode : target;
            
            // get the parent node of the DOM node
            var parentNode = widgetNode.parentNode;
            
            // check the parent node
            if (parentNode == null) return null;
            
            // get the children of the parent
            var children = parentNode.childNodes;
            if (! children) return null;
            
            // find the index for the child
            var index = 0;
            for (index = 0; index < children.length; index++) {
            	if (children[index] == widgetNode) break;
            }
            
            if (index == children.length) return null;
            
            // work forward are backward from the index
            var step = (previous) ? -1: 1;
            var limit = (previous) ? -1 : children.length;
            var sibindex = 0;
            var sibling  = null;
            for (sibindex = (index + step); sibindex != limit; (sibindex += step)) {
            	var sibnode = children[sibindex];
            	
            	// get the widget for the node
                var sibwidget = dRegistry.getEnclosingWidget(sibnode);
                if (! sibwidget) continue;
                if (sibwidget.domNode == sibnode) {
                	if ((!widgetType) || (sibwidget instanceof widgetType)) {
                		sibling = sibwidget;
                		break;
                	}
                }
            }
            
            // return the sibling
            return sibling;
    };
        

     /**
      * @public
  	  * @function
 	  * @name idx.util.getChildWidget
 	  * @description Determines the widget that is the first or last child of the specified widget 
 	  *              or node that is a widget (optionally of a specified type).  This is determined
 	  *              by obtaining the widget for the specified parent, obtaining the children widgets
 	  *              and returning either the first or last that is optionally of a specified type.
      *              This method may return null if no widget child exists.
      *
      * @param {Node|Widget} parent The node or dijit._WidgetBase for which the child is being requested.
      * @param {Boolean} last Optional parameter for indicating which child.  Specify true if the 
      *                       last child is desired and false if the first child.  If omitted then
      *                       false is the default.
      * @param {Type} widgetType The optional type of widget for the child.  If specified, this method ignores
      *                          any child that is not of the specified type.
      *
      * @return {Widget} The child widget or null if no widget matching the criteria is found.
      */  
     iUtil.getChildWidget = function(/*Node|Widget*/ parent, 
        								   /*Boolean*/     last,
        								   /*Type*/        widgetType) {
            // get the widget node
        	if (! (parent instanceof dWidget)) {
            	var widget = dRegistry.getEnclosingWidget(parent);
            	if (widget) parent = widget;
            }

            var children = null;
            if (parent instanceof dWidget) {
            	children = parent.getChildren();
            } else {
                children = parent.childNodes;
            }
            
            // check the children
            if (! children) return null;
            if (children.length == 0) return null;

            // setup the looping variables
            var start = (last) ? (children.length - 1) : 0;
            var step  = (last) ? -1 : 1;
            var limit = (last) ? -1 : children.length;

            // work forward are backward from the index
            var childIndex = 0;
            var child      = null;
            for (childIndex = start; childIndex != limit; (childIndex += step)) {
            	var widget = children[childIndex];
            	if (! (widget instanceof dWidget)) {
                	// get the widget for the node
                    var node = widget;
                    widget = dRegistry.getEnclosingWidget(node);
                    if (! widget) continue;
                    if (widget.domNode != node) continue;
            	}
            	if ((!widgetType) || (widget instanceof widgetType)) {
            		child = widget;
            		break;
            	}
            }
            
            // return the child
            return child;
        };

     /**
      * @public
  	  * @function
 	  * @name idx.util.getFormWidget
 	  * @description Determines the widget (derived from dijit.form._FormWidget) that is a child of the 
 	  *              specified node or widget (usually a dijit.form.Form) that has the specified form 
 	  *              field name.  If the found form field is found to be an instance of dijit.form._FormWidget
 	  *              then it is returned, otherwise null is returned.
      *
      * @param {String} formFieldName The name of the form field widget that is being requested.
      * @param {Node|Widget} parent Optional root node or root widget under which to look for the form 
      *                             widgets. If not specified then the entire document body is searched.
      * @return The form field widget with the specified name or null if not found.
      */  
     iUtil.getFormWidget = function(/*String*/ 			formFieldName,
        							/*Node|Widget?*/	parent) {
        	// get the widget node
        	var rootNode = null;
        	if (!parent) {
        		parent = dWindow.body();
        	} else if (parent instanceof dWidget) {
        		rootNode = parent.domNode;
        	} else {
        		rootNode = form;
        	}
        			
        	var formWidget = null;
        	var nodeList = dQuery("[name='" + formFieldName + "']", rootNode);
        	for (var index = 0; (!formWidget) && (index < nodeList.length);index++) {
        		var node = nodeList[index];
        		var widget = dRegistry.getEnclosingWidget(node);
        		if (!widget) continue;
        		if (! (widget instanceof dFormWidget)) {
        			continue;
        		}
        		var name = widget.get("name");
        		if (name != formFieldName) {
        			continue;
        		}
        		formWidget = widget;
        	}
        	return formWidget;
   };
        
        
     /**
      * @public
  	  * @function
 	  * @name idx.util.isNodeOrElement
 	  * @description Attempts to determine if the specified object is a DOM node.  This is needed since IE does
 	  *              not recognize the "Node" type, and only IE-8 recognizes the "Element" type.
      *
      * @param {Object|Node|Element} obj The object to check.
      * @return The result is true if the specified object is a node or element, otherwise false.
      */  
     iUtil.isNodeOrElement = function(/*Object*/ obj) {
         return ((obj.parentNode) && (obj.childNodes) && (obj.attributes)) ? true : false;
     };

     /**
      * @public
  	  * @function
 	  * @name idx.util.debugObject
 	  * @description Generates a diagnostic string describing the specified object.
      *
      * @param {Object} obj The object to debug
      * @return The debug string for the object.
      */  
     iUtil.debugObject = function(/*Object*/ obj) {
        	return iUtil._debugObject(obj, "/", [ ]);
     };
        
     /**
      * @private
  	  * @function
 	  * @name idx.util._debugObject
 	  * @description Recursively generates a diagnostic string describing the specified object
 	  *              and tries to detect circular references.
      *
      * @param {Object} obj The object to debug
      * @param {String} path The current attribute path within the object.
      * @param {Object} seen The associative array of paths to boolean values to check if already seen in 
      *                      order to avoid circular recursion.
      * @return The debug string for the object.
      */  
     iUtil._debugObject = function(/*Object*/ obj, /*String*/ path, /*Array*/ seen) {
           if (obj === null) return "null";
           var objType = iUtil.typeOfObject(obj);
           switch (objType) {
           case 'object':
        	   for (var index = 0; index < seen.length; index++) {
        		   if (seen[index].obj == obj) {
        			   return "CIRCULAR_REFERENCE[ " + seen[index].path + " ]";
        		   }
        	   }
        	   seen.push({obj: obj, path: path});
        	   var result = "{ ";
        	   var prefix = "";
        	   for (field in obj) {
        	     result = (result + prefix + '"' + field + '": ' 
        	    		   + iUtil._debugObject(obj[field], 
        	    				   				   path + '/"' + field + '"', 
        	    				   				   seen));
        	     prefix = ", ";
        	   }
        	   result = result + " }";
        	   return result;
           case 'date':
        	   return "DATE[ " + dDateStamp.toISOString(obj) + " ]";
           default:
        	   return dJson.stringify(obj);
           }
        };
     
     /**
      * @public
  	  * @field
 	  * @name idx.util.isBrowser
 	  * 
 	  * @description Equivalent to "dojo.isBrowser" in Dojo 1.6 and dojo/ 1  in Dojo 1.7+
 	  * @deprecated Use dojo/ 1  instead.
 	  */
      iUtil.isBrowser = dHas("host-browser");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isIE
 	  * 
 	  * @description Equivalent to "dojo.isIE" in Dojo 1.6 and dojo/has("ie") in Dojo 1.7+
 	  * @deprecated Use dojo/has("ie") instead.
 	  */
      iUtil.isIE = dHas("ie");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isFF
 	  * 
 	  * @description Equivalent to "dojo.isFF" in Dojo 1.6 and dojo/has("ff") in Dojo 1.7+
 	  * @deprecated Use dojo/has("ff") instead.
 	  */
      iUtil.isFF = dHas("ff");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isSafari
 	  * 
 	  * @description Equivalent to "dojo.isSafari" in Dojo 1.6 and dojo/has("safari") in Dojo 1.7+
 	  * @deprecated Use dojo/has("safari") instead.
 	  */
      iUtil.isSafari = dHas("safari");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isChrome
 	  * 
 	  * @description Equivalent to "dojo.isChrome" in Dojo 1.6 and dojo/has("chrome") in Dojo 1.7+
 	  * @deprecated Use dojo/has("chrome") instead.
 	  */
      iUtil.isChrome = dHas("chrome");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isMozilla
 	  * 
 	  * @description Equivalent to "dojo.isMozilla" in Dojo 1.6 and dojo/has("mozilla") in Dojo 1.7+
 	  * @deprecated Use dojo/has("mozilla") instead.
 	  */
      iUtil.isMozilla = dHas("mozilla");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isOpera
 	  * 
 	  * @description Equivalent to "dojo.isOpera" in Dojo 1.6 and dojo/has("opera") in Dojo 1.7+
 	  * @deprecated Use dojo/has("opera") instead.
 	  */
      iUtil.isOpera = dHas("opera");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isKhtml
 	  * 
 	  * @description Equivalent to "dojo.isKhtml" in Dojo 1.6 and dojo/has("khtml") in Dojo 1.7+
 	  * @deprecated Use dojo/has("khtml") instead.
 	  */
      iUtil.isKhtml	= dHas("khtml");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isAIR
 	  * 
 	  * @description Equivalent to "dojo.isAIR" in Dojo 1.6 and dojo/has("air") in Dojo 1.7+
 	  * @deprecated Use dojo/has("air") instead.
 	  */
      iUtil.isAIR = dHas("air");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isQuirks
 	  * 
 	  * @description Equivalent to "dojo.isQuirks" in Dojo 1.6 and dojo/has("quirks") in Dojo 1.7+
 	  * @deprecated Use dojo/has("quirks") instead.
 	  */
      iUtil.isQuirks = dHas("quirks");
      
     /**
      * @public
  	  * @field
 	  * @name idx.util.isWebkit
 	  * 
 	  * @description Equivalent to "dojo.isWebkit" in Dojo 1.6 and dojo/has("webkit") in Dojo 1.7+
 	  * @deprecated Use dojo/has("webkit") instead.
 	  */
      iUtil.isWebKit = dHas("webkit");
        

        // idx.util.fromJson is copied from IBM Dojo Toolkit 1.7.x implementation of dojox.secure.fromJson
        // because that module lacks AMD support in Dojo 1.7 and early releases of Dojo 1.8.  The original 
        // implementation of dojox.secure.fromJson includes the following notice:
        //
        // Used with permission from Mike Samuel of Google (has CCLA), from the json-sans-eval project:
        // http://code.google.com/p/json-sans-eval/
        //	Mike Samuel <mikesamuel_at_gmail_dot_com>

     /**
      * @public
  	  * @function
 	  * @name idx.util.fromJson
 	  * @description Generates a diagnostic string describing the specified object.  Parses a string 
 	  *              of well-formed JSON text without exposing the application to cross-site request
 	  *              forgery attacks.  Use this in place of dojo.fromJson().  The code is copied from 
 	  *              IBM Dojo Toolkit 1.7.x implementation of dojox.secure.fromJson module which lacks 
 	  *              support for AMD as of Dojo 1.7 & Dojo 1.8 RC1.
      * 
      *              Parses a string of well-formed JSON text. If the input is not well-formed, then behavior
      *              is undefined, but it is deterministic and is guaranteed not to modify any object other 
      *              than its return value.
      *
	  * 			 This does not use `eval` so is less likely to have obscure security bugs than json2.js.
	  *              It is optimized for speed, so is much faster than json_parse.js.
	  *
	  *              This library should be used whenever security is a concern (when JSON may
	  *              come from an untrusted source), speed is a concern, and erroring on malformed
      *              JSON is *not* a concern.
	  *	
	  *              json2.js is very fast, but potentially insecure since it calls `eval` to
	  *              parse JSON data, so an attacker might be able to supply strange JS that
      *              looks like JSON, but that executes arbitrary javascript.
      * 
	  * @param {String} json JSON text per RFC 4627
	  * 
	  * @param {Function (this:Object, string, *)} optReviver Optional function that reworks JSON objects post-parse
	  *                                                       per Chapter 15.12 of EcmaScript3.1.  If supplied, the
	  *                                                       function is called with a string key, and a value.
	  * 													  The value is the property of 'this'.	The reviver should
	  *                                                       return the value to use in its place.	So if dates were
	  *                                                       serialized as {@code { "type": "Date", "time": 1234 }},
	  *                                                       then a reviver might look like 
	  *	  {@code 
	  *			function (key, value) {
      * 			if (value && typeof value === 'object' && 'Date' === value.type) {
	  *				return new Date(value.time);
	  *			} else {
	  * 				return value;
	  *			}
	  * 		}}.
	  * 		If the reviver returns {@code undefined} then the property named by key
	  *		will be deleted from its container.
	  *		{@code this} is bound to the object containing the specified property.
	  * 
	  * @return {Object|Array} representing the parsed object.
      */
     iUtil.fromJson = typeof JSON != "undefined" ? JSON.parse :
        	(function () {
        		var number
        			= '(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)';
        		var oneChar = '(?:[^\\0-\\x08\\x0a-\\x1f\"\\\\]'
        			+ '|\\\\(?:[\"/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        		var string = '(?:\"' + oneChar + '*\")';

        		// Will match a value in a well-formed JSON file.
        		// If the input is not well-formed, may match strangely, but not in an unsafe
        		// way.
        		// Since this only matches value tokens, it does not match whitespace, colons,
        		// or commas.
        		var jsonToken = new RegExp(
        				'(?:false|true|null|[\\{\\}\\[\\]]'
        				+ '|' + number
        				+ '|' + string
        				+ ')', 'g');

        		// Matches escape sequences in a string literal
        		var escapeSequence = new RegExp('\\\\(?:([^u])|u(.{4}))', 'g');

        		// Decodes escape sequences in object literals
        		var escapes = {
        				'"': '"',
        				'/': '/',
        				'\\': '\\',
        				'b': '\b',
        				'f': '\f',
        				'n': '\n',
        				'r': '\r',
        				't': '\t'
        		};
        		function unescapeOne(_, ch, hex) {
        			return ch ? escapes[ch] : String.fromCharCode(parseInt(hex, 16));
        		}

        		// A non-falsy value that coerces to the empty string when used as a key.
        		var EMPTY_STRING = new String('');
        		var SLASH = '\\';

        		// Constructor to use based on an open token.
        		var firstTokenCtors = { '{': Object, '[': Array };

        		var hop = Object.hasOwnProperty;

        		return function (json, opt_reviver) {
        			// Split into tokens
        			var toks = json.match(jsonToken);
        			// Construct the object to return
        			var result;
        			var tok = toks[0];
        			var topLevelPrimitive = false;
        			if ('{' === tok) {
        				result = {};
        			} else if ('[' === tok) {
        				result = [];
        			} else {
        				// The RFC only allows arrays or objects at the top level, but the JSON.parse
        				// defined by the EcmaScript 5 draft does allow strings, booleans, numbers, and null
        				// at the top level.
        				result = [];
        				topLevelPrimitive = true;
        			}

        			// If undefined, the key in an object key/value record to use for the next
        			// value parsed.
        			var key;
        			// Loop over remaining tokens maintaining a stack of uncompleted objects and
        			// arrays.
        			var stack = [result];
        			for (var i = 1 - topLevelPrimitive, n = toks.length; i < n; ++i) {
        				tok = toks[i];

        			var cont;
        			switch (tok.charCodeAt(0)) {
        			default:	// sign or digit
        				cont = stack[0];
        				cont[key || cont.length] = +(tok);
        				key = void 0;
        				break;
        			case 0x22:	// '"'
        				tok = tok.substring(1, tok.length - 1);
        				if (tok.indexOf(SLASH) !== -1) {
        					tok = tok.replace(escapeSequence, unescapeOne);
        				}
        				cont = stack[0];
        				if (!key) {
        					if (cont instanceof Array) {
        						key = cont.length;
        					} else {
        						key = tok || EMPTY_STRING;	// Use as key for next value seen.
        						break;
        					}
        				}
        				cont[key] = tok;
        				key = void 0;
        				break;
        			case 0x5b:	// '['
        				cont = stack[0];
        				stack.unshift(cont[key || cont.length] = []);
        				key = void 0;
        				break;
        			case 0x5d:	// ']'
        				stack.shift();
        				break;
        			case 0x66:	// 'f'
        				cont = stack[0];
        				cont[key || cont.length] = false;
        				key = void 0;
        				break;
        			case 0x6e:	// 'n'
        				cont = stack[0];
        				cont[key || cont.length] = null;
        				key = void 0;
        				break;
        			case 0x74:	// 't'
        				cont = stack[0];
        				cont[key || cont.length] = true;
        				key = void 0;
        				break;
        			case 0x7b:	// '{'
        				cont = stack[0];
        				stack.unshift(cont[key || cont.length] = {});
        				key = void 0;
        				break;
        			case 0x7d:	// '}'
        				stack.shift();
        				break;
        			}
        		}
        		// Fail if we've got an uncompleted object.
        		if (topLevelPrimitive) {
        			if (stack.length !== 1) { throw new Error(); }
        			result = result[0];
        		} else {
        			if (stack.length) { throw new Error(); }
        		}

        		if (opt_reviver) {
        			// Based on walk as implemented in http://www.json.org/json2.js
        			var walk = function (holder, key) {
        				var value = holder[key];
        				if (value && typeof value === 'object') {
        					var toDelete = null;
        					for (var k in value) {
        						if (hop.call(value, k) && value !== holder) {
        							// Recurse to properties first.	This has the effect of causing
        							// the reviver to be called on the object graph depth-first.

        							// Since 'this' is bound to the holder of the property, the
        							// reviver can access sibling properties of k including ones
        							// that have not yet been revived.

        							// The value returned by the reviver is used in place of the
        							// current value of property k.
        							// If it returns undefined then the property is deleted.
        							var v = walk(value, k);
        							if (v !== void 0) {
        								value[k] = v;
        							} else {
        								// Deleting properties inside the loop has vaguely defined
        								// semantics in ES3 and ES3.1.
        								if (!toDelete) { toDelete = []; }
        								toDelete.push(k);
        							}
        						}
        					}
        					if (toDelete) {
        						for (var i = toDelete.length; --i >= 0;) {
        							delete value[toDelete[i]];
        						}
        					}
        				}
        				return opt_reviver.call(holder, key, value);
        			};
        			result = walk({ '': result }, '');
        		}

        		return result;
        		};
        	})();
        
     /**
      * @private
  	  * @function
 	  * @name idx.util._getFontMeasurements
 	  * @description Internal function for computing the measurements of on-screen fonts.
 	  */ 
     function _getFontMeasurements(measurements,fontSize){
    		// initialize heights to the specified fontMeasurements parameter
    		var heights = measurements;
    		
    		// if it does not yet exist then create it
    		if (!heights) {
    			heights = {
    				'1em': -1, '1ex': -1, '100%': -1, '12pt': -1, '16px': -1, 'xx-small': -1,
	    			'x-small': -1, 'small': 1, 'medium': -1, 'large': -1, 'x-large': -1,
    				'xx-large': -1
    			};
    		}
    		
    		// check if a specific font size was requested in addition to defaults
    		if (fontSize && (! (fontSize in heights))) {
    			heights[fontSize] = -1;
    		}
    		
    		var p;
    		if(dHas("ie")){
    			dWindow.doc.documentElement.style.fontSize="100%";
    		}
    		var div = dDomConstruct.create("div", {style: {
    				position: "absolute",
    				left: "0",
    				top: "-100000px",
    				width: "30px",
    				height: "1000em",
    				borderWidth: "0",
    				margin: "0",
    				padding: "0",
    				outline: "none",
    				lineHeight: "1",
    				overflow: "hidden"
    			}}, dWindow.body());
    		for(p in heights){
    			// check if the given font size was already calculated and skip it
    			if (heights[p] >= 0) {
    				continue;
    			}
    			
    			// set the font size
    			dDomStyle.set(div, "fontSize", p);
    			
    			// get the measurement
    			heights[p] = Math.round(div.offsetHeight * 12/16) * 16/12 / 1000;
    		}

    		dWindow.body().removeChild(div);
    		return heights; //object
    };
    
     /**
      * @private
      * @function
      * @name idx.util._toFontSize
      * @description Internal function to convert a node to a font size string.
      * @param fontSizeOrNode The font size as a string or a node.
      */
     function _toFontSize(fontSize) {
     		var fontSizeType = iUtil.typeOfObject(fontSize);
     		
     		if ((fontSizeType == "object")&&(iUtil.isNodeOrElement(fontSize))) {
    			var compStyle = dDomStyle.getComputedStyle(fontSize);
     			fontSize = compStyle["fontSize"];
     		} else if (fontSizeType != "string") {
     			fontSize = "" + fontSize;
     		}
     		return fontSize;
     };
     
     /**
      * @private
  	  * @function
 	  * @name idx.util._getCachedFontMeasurements
 	  * @description Internal function for computing and cacheing the measurements of on-screen fonts.
 	  */ 
	 var fontMeasurements = null;
     function _getCachedFontMeasurements(fontSize,recalculate){
     		var fontSizeType = iUtil.typeOfObject(fontSize);
     		
     		if(fontSizeType == "boolean"){ 
     			recalculate = fontSize;
     			fontSize = null;
     			
     		} else {
     			fontSize = _toFontSize(fontSize);
     		}
     		
     		// if recalculating then clear out old calculations
     		if (fontMeasurements && recalculate) {
     			if (fontSize) {
     				if (fontMeasurements[fontSize]) delete fontMeasurements[fontSize];
     			} else {
     				fontMeasurements = null;
     			}
     		}
     		
    		if(recalculate || !fontMeasurements || (fontSize && !fontMeasurements[fontSize])){
    			fontMeasurements = _getFontMeasurements(fontMeasurements, fontSize);
    		}
    		return fontMeasurements;
	};
   
   		 	
     /**
      * @public
  	  * @function
 	  * @name idx.util.normalizedLength
 	  * @description Converts non-percentage CSS widths from various units to pixels.
 	  * @param len The CSS length with optional units.
 	  * @param fontSizeOrNode The optional font size or node for which the font size is computed (defaults to "12pt").
 	  * @return The length/width in pixels.
 	  */ 
     iUtil.normalizedLength = function(len,fontSize) {
    		if(len.length === 0){ return 0; }
    		if(!fontSize) fontSize = "12pt";
    		else fontSize = _toFontSize(fontSize);
    		if(len.length > 2){
				// we don't want to use the fontSize parameter if the
				// specified length is not font-based units
				var units = len.slice(-2);
				var fontUnits = (units == "em" || units == "ex");
				if (! fontUnits) fontSize = "12pt";     		
    			var fm = _getCachedFontMeasurements(fontSize);
    			var px_in_pt = fm["12pt"] / 12;
    			var px_in_em = fm[fontSize];
    			var px_in_ex = px_in_em / 2;
    			var val = parseFloat(len);
    			switch(len.slice(-2)){
    				case "px": return val;
    				case "em": return val * px_in_em;
    				case "ex": return val * px_in_ex;
    				case "pt": return val * px_in_pt;
    				case "in": return val * 72 * px_in_pt;
    				case "pc": return val * 12 * px_in_pt;
    				case "mm": return val * g.mm_in_pt * px_in_pt;
    				case "cm": return val * g.cm_in_pt * px_in_pt;
    			}
    		}
    		return parseFloat(len);	// Number
    };
	/**
	 * @public
	 * @function
	 * @name idx.util.isPercentage
	 * @description Attempts to determine if the value is a percentage 
	 * @param value to be check 
	 * @return return true if value is a percentage
	 */
	iUtil.isPercentage = function(value){
		return  /^\d+%$/.test(value);
	};
	/**
	 * @public
	 * @function
	 * @name idx.util.includeValidCSSWidth
	 * @description Attempts to determine if the value includes a valid CSS width
	 * @param value to be check
	 * @return return ture if the value includes a valid CSS width
	 */
	iUtil.includeValidCSSWidth = function(value){
		return /width:\s*\d+(%|px|pt|in|pc|mm|cm)/.test(value)
	};
	iUtil.getValidCSSWidth = function(style){
		var styleType = iUtil.typeOfObject(style);
		if (styleType != "string") {
			if ("width" in style) {
				style = "width: " + style.width + ";";
			} else {
				style = "width: " + style + ";";
			}
		}
		return /width:\s*\d+(%|px|pt|in|pc|mm|cm|em|ex)/.test(style) ? 
			style.match(/width:\s*(\d+(%|px|pt|in|pc|mm|cm|em|ex))/)[1] : "";
	};

	/**
	 * Compares to widgets to see if they are identical or alternatively compares
	 * strings to strings or strings to widgets, treating the strings as the ID of
	 * a widget.  The widget for the specified ID need not exist yet in the registry
	 * for this function to compare since it relies on the "id" field of any specified
	 * widget to perform a string compare.
	 *
	 * @param {String|Widget} w1 The first widget or the ID for the first widget.
	 * @param {String|Widget| w2 The second widget or the ID for the second widget.
	 *
	 * @return {boolean} Returns true if equal, otherwise false.
	 */
	iUtil.widgetEquals = function(w1,w2) {
		if (w1 === w2) return true;
		if (!w1 && w2) return false;
		if (w1 && !w2) return false;
		if ((!dLang.isString(w1)) && ("id" in w1)) w1 = w1.id;
		if ((!dLang.isString(w2)) && ("id" in w2)) w2 = w2.id;
		return (w1 == w2);
	};
        
    return iUtil;
});
},
'idx/form/Select':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/event",
	"dojo/_base/window",
	"dojo/_base/lang",
	"dojo/_base/kernel",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/has",	
	"dojo/keys",
	"dojo/query",
	"dojo/when",
	"dijit/registry",
	"idx/widget/HoverHelpTooltip",
	"dijit/form/Select",
	"dijit/form/_FormSelectWidget",
	"dijit/form/_FormValueWidget",
	"dijit/_HasDropDown",
	"dijit/_WidgetsInTemplateMixin",
	"../util",
	"./_CompositeMixin",
	"./_CssStateMixin",
	// ====================================================================================================================
	// ------
	// Load _TemplatePlugableMixin and PlatformPluginRegistry if on "mobile" or if on desktop, but using the 
	// platform-plugable API.  Any prior call to PlaformPluginRegistry.setGlobalTargetPlatform() or 
	// PlatformPluginRegistry.setRegistryDefaultPlatform() sets "platform-plugable" property for dojo/has.
	// ------
	"dojo/has!mobile?idx/_TemplatePlugableMixin:platform-plugable?idx/_TemplatePlugableMixin", 
	"dojo/has!mobile?idx/PlatformPluginRegistry:platform-plugable?idx/PlatformPluginRegistry",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	//"dojo/has!idx_form_Select-desktop?dojo/text!./templates/Select.html"  // desktop widget, load the template
	//	+ ":idx_form_Select-mobile?"									// mobile widget, don't load desktop template
	//	+ ":desktop?dojo/text!./templates/Select.html"					// global desktop platform, load template
	//	+ ":mobile?"													// global mobile platform, don't load
	//	+ ":dojo/text!./templates/Select.html", 						// no dojo/has features, load the template
	"dojo/text!./templates/Select.html",
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"dojo/has!idx_form_Select-mobile?./plugins/phone/SelectPlugin"			// mobile widget, load the plugin
		+ ":idx_form_Select-desktop?"										// desktop widget, don't load plugin
		+ ":mobile?./plugins/phone/SelectPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin

	// ====================================================================================================================
], function(declare, array, event, win, lang, kernel, domGeometry, domClass, domStyle, domAttr, has, keys, query, when, registry,
			HoverHelpTooltip, Select, _FormSelectWidget, _FormValueWidget, _HasDropDown, _WidgetsInTemplateMixin, iUtil, _CompositeMixin, 
			_CssStateMixin,	TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	
	
	var baseClassName = "idx.form.Select";
	if (has("mobile") || has("platform-plugable")) {
		baseClassName = baseClassName + "Base";
	}
	if (has("dojo-bidi")) {
		baseClassName = baseClassName + "_";
	}
	
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2

	/**
	 * @name idx.form.Select
	 * @class idx.form.Select is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y28&vsub=*&hsub=*&openpanes=0000010000">Drop-Down Lists Standard</a></b>.
	 * It is a composite widget which enhanced dijit.form.Select with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in label positioning</li>
	 * <li>Built-in required attribute</li>
	 * <li>One UI theme support</li>
	 * </ul>
	 * @augments dijit.form.Select
	 * @augments idx.form._CssStateMixin
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._ValidationMixin
	 */
	iForm.Select = declare(baseClassName, [Select, _CompositeMixin, _CssStateMixin],
	/**@lends idx.form.Select.prototype*/
	{
		// summary:
		//		One UI version Select control
		
		templateString: desktopTemplate,
		
		baseClass: "idxSelectWrap",
		
		oneuiBaseClass: "dijitSelect",
		
		// summary:
		//		Default maxHeight to limit to space available in viewport
		maxHeight: -1,
		
		/**
		 * Place holder of the drop down button.
		 * @type String
		 */
		placeHolder: "",
		
		cssStateNodes: {
			"titleNode": "dijitDownArrowButton"
		},
		/**
		 * Provide a method to move the attribute form domNode to oneuiBaseNode
		 * @param {Object} String : arrtributeName
		 */
		
		_exchangeAttribute: function(/*String*/ arrtributeName){
			if ( this.domNode.hasAttribute(arrtributeName) ){
				this.oneuiBaseNode.setAttribute( arrtributeName, this.domNode.getAttribute(arrtributeName) );
				this.domNode.removeAttribute(arrtributeName);
			}
		},
		/**
		 * Override the method in _HasDropDown.js to move the attribute
		 * # Defect 9173
		 */
		closeDropDown: function(){
			this.inherited(arguments);
			this._exchangeAttribute("aria-expanded");			
		},
		/**
		 * Override the method in _HasDropDown.js to move the attribute
		 * # Defect 9173
		 */
		openDropDown: function(){
			this.inherited(arguments);
			this._exchangeAttribute("aria-expanded");
		},
		
		postCreate: function(){
			var tempDomNode = this.domNode;
			this.domNode = this.oneuiBaseNode;
			this.inherited(arguments);
			// comment out for Defect 10859
			//domAttr.set(this.domNode, "aria-activedescendant", domAttr.get(this.domNode,"id") );
			this.domNode = tempDomNode;
			
			//this.domNode.setAttribute("role", "region");
			//this.domNode.setAttribute("aria-label",this.id+"_arialable");

			this._resize();
		},
		
		/**
		 * Provides a method to return focus to the widget without triggering
		 * revalidation.  This is typically called when the validation tooltip
		 * is closed.
		 */
		refocus: function() {
			this._refocusing = true;
			this.focus();
			this._refocusing = false;
		},
		_isEmpty: function(){
			return this.value === 0 || (/^\s*$/.test(this.value || ""));
		},
		getErrorMessage: function(){
			return (this.required && this._isEmpty()) ? this._missingMsg : this.invalidMessage;
		},
		validate: function(/*Boolean*/ isFocused){
			// summary:
			//		Called by oninit, onblur, and onkeypress, and whenever required/disabled state changes
			// description:
			//		Show missing or invalid messages if appropriate, and highlight textbox field.
			//		Used when a select is initially set to no value and the user is required to
			//		set the value.
			var isValid = this.disabled || this.isValid(isFocused);
			this._set("state", isValid ? "" : (this._hasBeenBlurred ? "Error" : "Incomplete"));
			this.focusNode.setAttribute("aria-invalid", isValid ? "false" : "true");
			var message = isValid ? "" : this.getErrorMessage();
			this._set("message", message);
			if (this._hasBeenBlurred) {
                this.displayMessage(message);
            }
			return isValid;
		},
		
		displayMessage: function(/*String*/ message){
			// summary:
			//		Overridable method to display validation errors/hints.
			//		By default uses a tooltip.
			// tags:
			//		extension
			if(message){
				if(!this.messageTooltip){
					this.messageTooltip = new HoverHelpTooltip({
						connectId: [this.iconNode],
						label: message,
						position: this.tooltipPosition,
						forceFocus: false
					});
				}else{
					this.messageTooltip.set("label", message);
				}
				if(this.focused){
					var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
					this.messageTooltip.open(node);
				}
			}else{
				this.messageTooltip && this.messageTooltip.close();
			}
		},
		_setValueAttr: function(/*anything*/ newValue, /*Boolean?*/ priorityChange){
			// summary:
			//		Overwrite dijit.form._FormSelectWidget._setValueAttr to support "placeHolder"
			if(!this._onChangeActive){ priorityChange = null; }
			if(this._loadingStore){
				// Our store is loading - so save our value, and we'll set it when
				// we're done
				this._pendingValue = newValue;
				return;
			}
			var opts = this.getOptions() || [];
			if(!lang.isArray(newValue)){
				newValue = [newValue];
			}
			array.forEach(newValue, function(i, idx){
				
				if(!lang.isObject(i) && !(typeof i === "number") ){
					i = i + "";
				}
				if(typeof i === "string" || typeof i === "number" ){
					newValue[idx] = array.filter(opts, function(node){
						return node.value === i;
					})[0] || {value: "", label: ""};
				}
			}, this);

			// Make sure some sane default is set
			newValue = array.filter(newValue, function(i){ return i && i.value; });
			if(!this.placeHolder && (!newValue[0] || !newValue[0].value) && opts.length){
				newValue[0] = opts[0];
			}
			array.forEach(opts, function(i){
				i.selected = array.some(newValue, function(v){ return v.value === i.value; });
			});
			var	val = array.map(newValue, function(i){ return i.value; }),
				disp = array.map(newValue, function(i){ return i.label; });

			//if(typeof val == "undefined" || typeof val[0] == "undefined"){ return; } // not fully initialized yet or a failed value lookup
			
			// Use placeHolder
			var strDisp = this.multiple ? disp : disp[0];
			if(!strDisp){
				strDisp = this.placeHolder;
			}
			this._setDisplay(strDisp);
			if (this.fieldWidth) {
				var selectContent = query("span.idxSelectWrapLabel", this.containerNode);
				if ( selectContent.length > 0)
					selectContent = selectContent[0];
				domClass.add(selectContent, "dojoxEllipsis");
			}
			var _previousValue = this.get("value");
			_FormValueWidget.prototype._setValueAttr.apply(this, [ this.multiple ? val : val[0], priorityChange ]);
			this._updateSelection();
			
			var _currentValue =  this.get("value");
			domAttr.set(this.valueNode, "value", this.get("value"));
			
			if(_previousValue != _currentValue){
				this.validate(this.focused);
			}
		},
		
		/**
		 * private function for supporting multichannel feature
		 */
		_createDropDown: function(){
			return new dijit.form._SelectMenu({ id: this.id + "_menu", parentWidget: this });
		},
		/**
		 * 
		 */
		_fillContent: function(){
			// summary:
			//		Overwrite dijit.form._FormSelectWidget._fillContent to support empty value.
				
			if(!this.options){
				this.options =
					this.srcNodeRef
					? query("> *", this.srcNodeRef).map(
						function(node){
							if(node.getAttribute("type") === "separator"){
								return { value: "", label: "", selected: false, disabled: false };
							}
							return {
								value: (node.getAttribute("data-" + kernel._scopeName + "-value") || node.getAttribute("value")),
								label: String(node.innerHTML),
								// FIXME: disabled and selected are not valid on complex markup children (which is why we're
								// looking for data-dojo-value above.  perhaps we should data-dojo-props="" this whole thing?)
								// decide before 1.6
								selected: node.getAttribute("selected") || false,
								disabled: node.getAttribute("disabled") || false
							};
						},
						this)
					: [];
			}
			if(!this.value){
				this._set("value", this._getValueFromOpts());
			}else if(this.multiple && typeof this.value == "string"){
				this._set("value", this.value.split(","));
			}
			// Create the dropDown widget
			when(this._createDropDown(), lang.hitch(this, function(dropDown) {
				if (dropDown) {
					this.dropDown = dropDown;
					domClass.add(this.dropDown.domNode, this.baseClass + "Menu");
				}
			}));
			
		},
		
		_getValueFromOpts: function(){
			// summary:
			//		Overwrite dijit.form._FormSelectWidget._getValueFromOpts to support empty value.
			var opts = this.getOptions() || [];
			if(opts.length){
				// Mirror what a select does - choose the first one
				var opt = array.filter(opts, function(i){
					return i.selected;
				})[0];
				if(opt && opt.value){
					return opt.value;
				}else if(!this.placeHolder){
					opts[0].selected = true;
					return opts[0].value;
				}
			}
			return "";
		},
			
		_onFocus: function(){
			if (this._hasBeenBlurred && (!this._refocusing)){
				this.validate(true);
			}
			_FormSelectWidget.prototype._onFocus.apply(this, arguments);
		},
		
		_onBlur: function(){
			this.displayMessage("");
			_HasDropDown.prototype._onBlur.apply(this, arguments);
			this.validate(this.focused);
		},
		
		_onDropDownMouseUp: function(/*Event?*/ e){
			// summary:
			//		Overwrite dijit._HasDropDown._onDropDownMouseUp
			//		Focus the selected items once open the drop down menu.
				
			if(e && this._docHandler){
				this.disconnect(this._docHandler);
			}
			var dropDown = this.dropDown, overMenu = false;
	
			if(e && this._opened){
				// This code deals with the corner-case when the drop down covers the original widget,
				// because it's so large.  In that case mouse-up shouldn't select a value from the menu.
				// Find out if our target is somewhere in our dropdown widget,
				// but not over our _buttonNode (the clickable node)
				var c = domGeometry.position(this._buttonNode, true);
				if(!(e.pageX >= c.x && e.pageX <= c.x + c.w) ||
					!(e.pageY >= c.y && e.pageY <= c.y + c.h)){
					var t = e.target;
					while(t && !overMenu){
						if(domClass.contains(t, "dijitPopup")){
							overMenu = true;
						}else{
							t = t.parentNode;
						}
					}
					if(overMenu){
						t = e.target;
						if(dropDown.onItemClick){
							var menuItem;
							while(t && !(menuItem = registry.byNode(t))){
								t = t.parentNode;
							}
							if(menuItem && menuItem.onClick && menuItem.getParent){
								menuItem.getParent().onItemClick(menuItem, e);
							}
						}
						return;
					}
				}
			}
			if (this._opened) {
				if (dropDown.focus && dropDown.autoFocus !== false) {
					// Focus the dropdown widget - do it on a delay so that we
					// don't steal our own focus.
					this.focusSelectedItem();
				}
			}
			else {
				this.defer("focus");
			}
			
			if(has("touch")){
				this._justGotMouseUp = true;
				this.defer(function(){
					this._justGotMouseUp = false;
				
				});
			}
		},
		
		_onKeyUp: function(){
			// summary:
			//		Overwrite dijit._HasDropDown._onKeyUp
			//		Focus the selected items once open the drop down menu.
			
			if(this._toggleOnKeyUp){
				delete this._toggleOnKeyUp;
				this.toggleDropDown();
				var d = this.dropDown;	// drop down may not exist until toggleDropDown() call
				if(d && d.focus){
					setTimeout(lang.hitch(this, "focusSelectedItem"), 1);
				}
			}
		},
		
		_setReadOnlyAttr: function(value){
			this.inherited(arguments);
			if(this.dropDown){
				this.dropDown.set("readOnly", value);
			}
		},
		
//		_setFieldWidthAttr: function(/*String*/width){
//			domClass.toggle(this.oneuiBaseNode, this.oneuiBaseClass + "FixedWidth", !!width);
//			if(!width){ return; }
//			var widthInPx = iUtil.normalizedLength(width);
//			if(dojo.isFF){
//				var borderWidthInPx = iUtil.normalizedLength(domStyle.get(this.oneuiBaseNode,"border-left-width")) +
//				iUtil.normalizedLength(domStyle.get(this.oneuiBaseNode,"border-right-width"));
//				widthInPx += borderWidthInPx;
//			}else if(dojo.isIE){
//				widthInPx += 2;
//			}
//			domStyle.set(this.oneuiBaseNode, "width", widthInPx + "px");
//		},
		resize: function(){
			if (iUtil.isPercentage(this._styleWidth)) {
				domStyle.set(this.containerNode, "width","");
			}
			this.inherited(arguments);
		},		
		_resize: function(){
			if (this._deferResize()) return;			
			domStyle.set(this.containerNode, "width","");
			this.inherited(arguments);
			
			if(this.oneuiBaseNode.style.width){
				var styleSettingWidth = this.oneuiBaseNode.style.width,
					contentBoxWidth = domGeometry.getContentBox(this.oneuiBaseNode).w;
				if ( styleSettingWidth.indexOf("px") || dojo.isNumber(styleSettingWidth) ){
					styleSettingWidth = parseInt(styleSettingWidth);
					contentBoxWidth = ( styleSettingWidth < contentBoxWidth || contentBoxWidth <= 0 )? styleSettingWidth : contentBoxWidth;
				}
					
				domStyle.set(this.containerNode, "width", contentBoxWidth - 40 + "px");
			}
		},
		focusSelectedItem: function(){
			// summary:
			//		Focus the item according to the value of the widget.
			
			var val = this.value,
				isFocused = false;
			if(!lang.isArray(val)){
				val = [val];
			}
			if(val && val[0]){
				isFocused = array.some(this._getChildren(), function(child){
					// child.option == undefined when this is an instance of MenuSeparator
					var isSelected = ( child.option && (val[0] === child.option.value) );
					if ( isSelected ){
						this.dropDown.focusChild(child);
					}
					return isSelected;
				}, this);

			}else{
				this.dropDown.focusFirstChild();
			}
			if(!isFocused){
				this.dropDown.focusFirstChild();
			}

		},
		
		_setPlaceHolderAttr: function(/*String*/ value){
			this.placeHolder = value;
			this.set("value", "");		
		}

	});
	
	if ( has("mobile") || has("platform-plugable")) {
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/Select", 
				{	
					desktop: "inherited",	// no plugin for desktop, use inherited methods  
				 	mobile: MobilePlugin	// use the mobile plugin if loaded
				});
		
		iForm.Select = declare("idx.form.Select",[iForm.Select, TemplatePlugableMixin, _WidgetsInTemplateMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			templatePath: require.toUrl("idx/form/templates/Select.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			
			/**
			 * Stub Plugable method
			 */
			onCloseButtonClick: function(){
				return this.doWithPlatformPlugin(arguments, "onCloseButtonClick", "onCloseButtonClick");
			},
			/**
			 * 
			 * @param {Object} item
			 * @param {Object} checked
			 */
			onCheckStateChanged: function(item, checked){
				return this.doWithPlatformPlugin(arguments, "onCheckStateChanged", "onCheckStateChanged",item, checked);
			},
			/**
			 * Stub Plugable method
			 */
			_onDropDownMouseDown: function(){
				return this.doWithPlatformPlugin(arguments, "_onDropDownMouseDown", "_onDropDownMouseDown");
			},
			/**
			 * Stub Plugable method
			 */
			_createDropDown : function(){
				return this.doWithPlatformPlugin(arguments, "_createDropDown", "_createDropDown");
			},
			/**
			 * Stub Plugable method
			 */
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage",message);
			},
			/**
			 * Stub Plugable method
			 * @param {Object} helpText
			 */
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "_setHelpAttr",helpText);
			}
		});
	}
	
	
	return iForm.Select;
});

},
'idx/form/TextBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/has",
	"dojo/dom-style",
	"dijit/form/ValidationTextBox",
	"idx/widget/HoverHelpTooltip",
	"./_CssStateMixin",
	"./_CompositeMixin",
	
	"dojo/has!mobile?idx/_TemplatePlugableMixin:platform-plugable?idx/_TemplatePlugableMixin", 
	"dojo/has!mobile?idx/PlatformPluginRegistry:platform-plugable?idx/PlatformPluginRegistry",
	
	//"dojo/has!idx_form_TextBox-desktop?dojo/text!./templates/TextBox.html"  // desktop widget, load the template
	//	+ ":idx_form_TextBox-mobile?"										// mobile widget, don't load desktop template
	//	+ ":desktop?dojo/text!./templates/TextBox.html"						// global desktop platform, load template
	//	+ ":mobile?"														// global mobile platform, don't load
	//	+ ":dojo/text!./templates/TextBox.html", 							// no dojo/has features, load the template
	"dojo/text!./templates/TextBox.html",
		
	"dojo/has!idx_form_TextBox-mobile?./plugins/mobile/TextBoxPlugin"		// mobile widget, load the plugin
		+ ":idx_form_TextBox-desktop?"										// desktop widget, don't load plugin
		+ ":mobile?./plugins/mobile/TextBoxPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin
		
], function(declare, lang, has, domStyle, ValidationTextBox, HoverHelpTooltip, _CssStateMixin, _CompositeMixin, 
	_TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2
	/**
	 * @name idx.form.TextBox
	 * @class One UI version.
	 */
	var TextBox = declare([ValidationTextBox, _CompositeMixin, _CssStateMixin], {
		/**@lends idx.form.TextBox*/
		
		// summary:
		//		Base class for textbox widgets with the ability to validate content of various types and provide user feedback.
		// tags:
		//		protected
		// instantValidate: Boolean
		//		Fire validation when widget get input by set true, 
		//		fire validation when widget get blur by set false
		instantValidate: false,
		
		templateString: desktopTemplate,
		baseClass: "idxTextBoxWrap",
		oneuiBaseClass: "dijitTextBox dijitValidationTextBox",
		/**
		 * Deprecated, use "help" instead
		 */
		hoverHelpMessage: "",
		
		postCreate: function(){
			this.inherited(arguments);
			if (this.instantValidate) {
				this.connect(this, "_onFocus", function(){
					if (this._hasBeenBlurred && (!this._refocusing)) {
						this.validate(true);
					}
				});
				this.connect(this, "_onInput", function(){
					this.validate(true);
				});
			}
			else {
				this.connect(this, "_onFocus", function(){
					if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
						this.displayMessage(this.message);
					}
				})
			}
			this._resize();
		},
		
		/**
		 * Provides a method to return focus to the widget without triggering
		 * revalidation.  This is typically called when the validation tooltip
		 * is closed.
		 */
		refocus: function(){
			this._refocusing = true;
			this.focus();
			this._refocusing = false;
		},
		
		/**
		 * deprecated,
		 * @param {string | number} width
		 * Unit of "pt","em","px" will be normalized to "px", and "px" by default for numeral value.
		 */
		_setHoverHelpMessageAttr: function(message){
			this.set("help", message);
		},
		/**
		* Overridable method to display validation errors/hints
		*/
		displayMessage: function(/*String*/ message, /*Boolean*/ force){
			if(message){
				if(!this.messageTooltip){
					this.messageTooltip = new HoverHelpTooltip({
						connectId: [this.iconNode],
						label: message,
						position: this.tooltipPosition,
						forceFocus: false
					});
				}else{
					this.messageTooltip.set("label", message);
				}
				if(this.focused || force){
					var node = domStyle.get(this.iconNode, "visibility") == "hidden" ? this.oneuiBaseNode : this.iconNode;
					this.messageTooltip.open(node);
				}
			}else{
				this.messageTooltip && this.messageTooltip.close();
			}
		}
	});
	
	if(has("mobile") || has("platform-plugable")){
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/TextBox", {	
			desktop: "inherited",	// no plugin for desktop, use inherited methods  
			mobile: MobilePlugin	// use the mobile plugin if loaded
		});
		
		TextBox = declare([TextBox,_TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			
			
			templatePath: require.toUrl("idx/form/templates/TextBox.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			 			
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			}
		});
	}
	return iForm.TextBox = declare("idx.form.TextBox", TextBox);
});
},
'idx/widget/nls/SingleMessage':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define({ root:
//begin v1.x content
({
	viewAll: "View All ({num})&lrm;",
	viewDetails: "More Details",
	refresh: "Refresh",
	showDetails: "Show Details",
	hideDetails: "Hide Details"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});
},
'idx/form/formWidgets':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/dom-attr","dijit/form/_FormWidget","../string"],
		function(dLang,			// (dojo/_base/lang)
				 iMain,			// (idx)
				 dDomAttr,		// (dojo/dom-attr) for (dDomAttr.set)
				 dFormWidget,	// (dijit/form/_FormWidget)
				 iString) 		// (../string)
{
	var iFormWidgets = dLang.getObject("form.formWidgets", iMain);
	
	/**
	 * @name idx.form.formWidgets
	 * @class Extension to dijit.form._FormWidget to add support for an "accessKey" attribute that gets
	 *        set on the INPUT node if it is also the "focus node".  This allows for keyboard shortcuts
	 *        to be created for form widgets (e.g.: global search fields).
	 */
dojo.extend(dFormWidget, /** @lends idx.form.formWidgets# */ {	
	/**
	 * The desired access key for this form widget. 
	 */
	accessKey: "",
	
	/**
	 * If the focus node is the INPUT node, then set its access key.
	 * @function
	 * @private
	 */
	_setAccessKeyAttr: function(accessKey) {
		this.accessKey = accessKey;
		if (iString.nullTrim(accessKey)) {
			if ((this.focusNode) && (this.focusNode.tagName == "INPUT")) {
				dDomAttr.set(this.focusNode, "accessKey", accessKey);
			}
		}
	}
});

	return iFormWidgets;
});

},
'idx/widget/nls/Dialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define({ root:
//begin v1.x content
({
	closeButtonLabel: "Close"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});
},
'idx/widget/SingleMessage':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/event",
	"dojo/_base/lang",
	"dojo/_base/sniff",
	"dojo/date/locale",
	"dojo/dom-class",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-geometry",
	"dojo/i18n",
	"dojo/keys",
	"dijit/focus",
	"dijit/_Widget",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dojo/has!dojo-bidi?../bidi/widget/SingleMessage",
	"dojo/text!./templates/SingleMessage.html",
	"dojo/i18n!./nls/SingleMessage",
	"dojo/i18n!dijit/nls/common",
	"dojox/html/ellipsis"
], function(declare, array, event, lang, has, locale, domClass, domAttr, domStyle, domGeometry, i18n, keys,focus, _Widget, _TemplatedMixin,
			_WidgetsInTemplateMixin, bidiExtension, template, singleMessageNls, commonNls){
	var iMessaging = lang.getObject("idx.oneui.messaging", true); // for backward compatibility with IDX 1.2
	
	/**
	 * @name idx.widget.SingleMessage
	 * @class SingleMessage is implemented according to IBM One UI(tm) 
	 * <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y11&vsub=*&hsub=*&options=M&openpanes=0000011000">Messaging Standard</a></b>.
	 * It provides a convenient way to create One UI compliant messages in a designated area. SingleMessage is highly configurable with following options:
	 * <ul>
	 *    <li><b>Message type</b>: SingleMessage supports 7 different message types. It can be configured via setting the 'type' property.</li>
	 *    <li><b>Message ID</b>: The ID of a SingleMessage can be configured via  setting the 'messageId' property. Setting the 'showId' property can trun on/off the Message ID.</li>
	 *    <li><b>Timestamp</b>: The timestamp of a SingleMessage can be configured via  setting the 'date' property. In addtion, the date format can be set with the
	 *    'dateFormat' property</li>
	 *    <li><b>Message text</b>: The message text can be configured via setting the 'title' property. The message text gets truncated with an ellipsis automatically when a SingleMessage resizes.</li>
	 *    <li><b>Explanation</b>: The message explanation can be confgiured via setting the 'description' property.</li>
	 *    <li><b>Refresh Button</b>: A SingleMessage contains a refresh link after the message explanation by default. It can be turned off by setting 'showRefresh' property to false.</li>
	 *    <li><b>View All</b> link: A SingleMessage contains a View All(n) link by default. The message number 'n' can be configured with 'messageNumber' property. It can be turned off by setting
	 *     'showAction' property to false.
	 *    </li>
	 * </ul>
	 * @augments dijit._Widget
	 * @augments dijit._TemplatedMixin
	 * @augments dijit._WidgetsInTemplateMixin
	 * @example
	 * Programmatic Example:
	 * <pre>
	 * new idx.widget.SingleMessage({
	 *  type: 'error',
	 *  title: 'Error message with long timestamp',
	 *  dateFormat: {datePattern: 'dd MMMM y &nbsp', timePattern: 'hh:mm a'},
	 *  messageId: 'CAT123456',
	 *  messageNumber: 7,
	 *  style: 'width: 970px;',
	 *  description: 'Here is the detail message description, it can be configured via setting the \'description\' parameter of a SingleMessage widget. By default the message description is the same as the message title.'
	 * }, domNode);
	 * </pre>
	 * Declarative Example:
	 * <pre>
	 *    &lt;div data-dojo-type="idx.widget.SingleMessage" data-dojo-props="type: 'error', title: 'Error message with long timestamp',
	 *    dateFormat:{datePattern: 'dd MMMM y &nbsp', timePattern: 'hh:mm a'}, messageId: 'CAT123456', messageNumber: 7, style: 'width: 970px;', description: 'Here is the detail message description, it can be configured via setting the \'description\' parameter of a SingleMessage widget. By default the message description is the same as the message title.'"></div>
	 * </pre>
	 */
	var baseClassName = has("dojo-bidi")? "idx.widget.SingleMessage_" : "idx.widget.SingleMessage";
	iMessaging.SingleMessage = declare(baseClassName, [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],
	/**@lends idx.widget.SingleMessage.prototype*/
	{
		templateString: template,
		
		baseClass: "idxSingleMessage",
		
		tabIndex: "0",
		
		/**
		 * The ID of a SingleMessage. Can be turned off by setting 'showId' to false.
		 * For message type 'error', 'warning', 'critical', message id is required.
		 * @type String
		 */
		messageId: "",
		
		/**
		 * The type of a Single Message. Can be one of 'error', 'warning', 'success',
		 * 'information', 'critical', 'attention', 'compliance'.
		 * @type String
		 * @default "error"
		 */
		type: "error",

		
		/**
		 * The timestamp of a Single Message. The timestamp format can be configured with 'dateFormat'.
		 * Example:
		 * date: new Date()
		 * @type Date
		 */
		date: new Date(),
		
		/**
		 * The options being used for format the timestamp.
		 * Example:
		 * <pre>
		 * dateFormat: {
		 * 	formatLength: "medium",
		 * 	locale: this.lang
		 * }
		 * </pre>
		 * @type dojo.date.locale.__FormatOptions
		 */
		dateFormat: {
			formatLength: "medium",
			locale: this.lang
		},
		
		/**
		 * The message text of a SingleMessage. It will be trancated with an ellipsis if needed when
		 * SingleMessage resizes.
		 * @type String
		 */
		title: "",
		
		/**
		 * The text of the action link. By default, the action link is used as the View All link.
		 * The value is loaded from the nls bundle. In most cases, you should not change it. But in special cases,
		 * you still can change it with a string.
		 * @type String
		 */
		actionText: "",
		
		/**
		 * 'showId' decides whether to show the message ID. By default, for success message and information message, it is
		 * turned off.
		 * Note: For error, critical, warning messages, message ID is required and cannot be turned off.
		 * @type Boolean
		 * @default true
		 */
		showId: true,
		
		/**
		 * 'showAction' decides whether to show the action link (ususally, it's View All link).
		 * @type Boolean
		 * @default true
		 */
		showAction: true,
		
		/**
		 * 'showRefresh' decides whether to show the refresh link in the message description part.
		 * @type Boolean
		 * @default true
		 */
		showRefresh: true,
		
		/**
		 * 'showDetailsLink' decides whether to show the More Details link in the message description part.
		 * @type Boolean
		 * @default true
		 */
		showDetailsLink: true,
		
		/**
		 * 'showTimestamp' decides whether to show the timestamp.
		 * @type Boolean
		 * @default true
		 */
		showTimestamp: true,
		
		/**
		 * The message number to be put in the View All link 'View All(n)'.
		 * @type Integer | String
		 * @default "n"
		 */
		messageNumber: "n",
		
		/**
		 * The explanation of a SingleMessage.
		 * @type String
		 */
		description: "",
		
		/**
		 * 'collapsed' decides whether the explanation part is hidden.
		 * @type Boolean
		 */
		collapsed: true,
		
		/**
		 * 'closable' decides whether the SingleMessage can be closed.
		 * @type Boolean
		 */
		closable: true,
		
		/**
		 * Alt text for message icons
		 * @private
		 * @type Object
		 */
		_iconTextMap: {
			"error": "X",
			"warning": "!",
			"information": "i",
			"success": "&#8730;",
			"critical": "X",
			"attention": "&#9670",
			"compliance": "&#9671"
		},
		
		
		/**
		 * Constructor
		 * Initialize the Object variable in new Instance 
		 */
		constructor: function() {
			this.date = new Date();
		},
		
		/**
		 * Possible message types
		 * @private
		 * @type Array
		 * @default ["error", "warning", "information", "success", "critical", "attention", "compliance"]
		 */
		_allowedTypes: ["error", "warning", "information", "success", "critical", "attention", "compliance"],
		
		postMixInProperties: function(){
			this.inherited(arguments);
			this._nlsResources = singleMessageNls;
			this.type = array.indexOf(this.type.toLowerCase()) ? this.type.toLowerCase() : "error";
			if(!this.description){
				this.description = this.title;
			}
			
			
		},
		
		postCreate: function(){
			// summary:
			//		Set tab index and time stamp for the message
			this.inherited(arguments);
			this._created = true;
			if(!this.actionText){
				this.set("actionText", this._nlsResources.viewAll);
			}
			domAttr.set(this.viewDetailsNode, "innerHTML", this._nlsResources.viewDetails);
			domAttr.set(this.refreshNode, "innerHTML", this._nlsResources.refresh);
			domAttr.set(this.closeNode, "title", commonNls.itemClose);
			domAttr.set(this.closeNode.childNodes[0], "title", commonNls.itemClose);
			this.set("title", this.title);
						
			if ( has("safari") ){
				//domAttr.remove(this.viewDetailsNode, "href");
				domAttr.remove(this.actionNode, "href");
			}
			var ariaLiveMap = {
				"error": "assertive", 
				"warning": "assertive", 
				"information": "polite", 
				"success": "polite", 
				"critical": "assertive", 
				"attention": "assertive", 
				"compliance": "polite"
			}
			var ariaLiveValue = ariaLiveMap[this.type.toLowerCase()];
			if ( ariaLiveValue ){
				domAttr.set(this.domNode, "aria-live", ariaLiveValue);
			}
		},
		
		startup: function(){
			this.inherited(arguments);
			this.resize();
			//this.titleNode.focus();
		},
		_setActionTextAttr: function(value){
			this._set("actionText", value);
			domAttr.set(this.actionNode, "innerHTML", lang.replace(value, {num: this.messageNumber}));
		},
		
		_setTitleAttr: function(value){
			this._set("title", value);
			this._resizeTitle();
			domAttr.set(this.fakeTitleNode, "innerHTML", value + "&nbsp;&nbsp;");
		},
		
		
		_setDescriptionAttr: function(value){
			this._set("description", value);
			domAttr.set(this.descriptionNode, "innerHTML", value);
		},
		
		_setMaxLengthAttr: function(value){
			this._set("maxLength", value);
			this._resizeTitle();
		},
		
		_setMessageIdAttr: function(/*String*/ value){
			domAttr.set(this.idNode, "innerHTML", value);
			this._set("messageId", value);
			this._resizeTitle();
			domAttr.set(this.fakeIdNode, "innerHTML", value);
		},
		
		_setTypeAttr: function(/*String*/ value){
			domAttr.set(this.typeNode, "innerHTML", this._iconTextMap[value]);
			domClass.toggle(this.domNode, this.type + "Message", false);
			domClass.toggle(this.domNode, value + "Message", true);
			this._set("type", value);
			this._toggleId();
		},
		
		_setDateAttr: function(/*Date*/ value){
			this._set("date", value);
			domAttr.set(this.timestampNode, "innerHTML", locale.format(this.date, this.dateFormat));
			this._resizeTitle();
		},
		
		_setDateFormatAttr: function(/*dojo.date.locale.__FormatOptions?*/ value){
			this._set("dateFormat", value);
			domAttr.set(this.timestampNode, "innerHTML", locale.format(this.date, this.dateFormat));
			this._resizeTitle();
		},
		
		_setMessageNumberAttr: function(/*Integer|String*/ value){
			this._set("messageNumber", value);
			this.set("actionText", this.actionText);
			this._resizeTitle();
		},
		
		_setShowIdAttr: function(/*Boolean*/ value){
			this._set("showId", value);
			this._toggleId();
			this._resizeTitle();
		},
		
		_setShowActionAttr: function(/*Boolean*/ value){
			this._set("showAction", value);
			domClass.toggle(this.actionNode, "dijitHidden", !this.showAction);
			domClass.toggle(this.separatorNode, "dijitHidden", !(this.showAction && this.showTimestamp));
			if(has("ie") == 6 || has("ie") == 7){
				domClass.toggle(this.timestampNode, "idxMessageTimeStampMargin", !value);
			}
			this._resizeTitle();
		},
		
		_setShowRefreshAttr: function(/*Boolean*/ value){
			this._set("showRefresh", value);
			domClass.toggle(this.refreshNode, "dijitHidden", !this.showRefresh);
		},
		
		_setShowDetailsLinkAttr: function(/*Boolean*/ value){
			this._set("showDetailsLink", value);
			domClass.toggle(this.viewDetailsNode, "dijitHidden", !this.showDetailsLink);
		},
		
		_setClosableAttr: function(/*Boolean*/ value){
			this._set("closable", value);
			domStyle.set(this.closeNode, {
				"visibility": this.closable ? "visible" : "hidden"
			});
		},
		
		_setShowTimestampAttr: function(/*Boolean*/ value){
			this._set("showTimestamp", value);
			domClass.toggle(this.separatorNode, "dijitHidden", !(this.showAction && this.showTimestamp));
			domClass.toggle(this.timestampNode, "dijitHidden", !this.showTimestamp);
		},
		
		_toggleId: function(){
			if(this.type == "information" || this.type == "success" || this.type == "attention" || this.type == "compliance"){
				domClass.toggle(this.idNode, "dijitHidden", !this.showId);
				domClass.toggle(this.fakeIdNode, "dijitHidden", !this.showId);
			}
		},
		
		_resizeTitle: function(){
			if(!this._created){
				return;
			}
			domStyle.set(this.titleNode, {"width": "auto"});
			domAttr.set(this.titleNode, {"innerHTML": ''});
			if(this.collapsed){
				var idWidth = domGeometry.getMarginBox(this.idNode).w;
				var width = domGeometry.getContentBox(this.domNode).w - domGeometry.getMarginBox(this.iconNode).w
							- domGeometry.getMarginBox(this.infoNode).w - idWidth;
				domAttr.set(this.titleNode, {"innerHTML": '<div class="messageTitles">' + this.title + '&nbsp&nbsp</div>'});
				var currentWidth = domStyle.get(this.titleNode, "width");
				if(width > 20){
					width = width - 10;
				}

				if(currentWidth > width){
					if(width < 0){
						width = 0;
					}
					domStyle.set(this.titleNode, {"width": width + "px"});
					domAttr.set(this.titleNode, {"innerHTML": '<div class="messageTitles dojoxEllipsis">' + this.title + '&nbsp&nbsp</div>'});
					//console.log("idWidth:" + idWidth + ",width:" + width + ", currentWidth:" + currentWidth);
					domStyle.set(this.fakeFocusNode, {"width": width + idWidth + "px"});
				}else{
					domAttr.set(this.titleNode, {"innerHTML": '<div class="messageTitles">' + this.title + '&nbsp&nbsp</div>'});
				}
			}else{
				var idWidth = domGeometry.getMarginBox(this.fakeIdNode).w;
				var width = domGeometry.getContentBox(this.domNode).w - domGeometry.getMarginBox(this.iconNode).w
							- domGeometry.getMarginBox(this.infoNode).w - idWidth;
				var currentWidth = domStyle.get(this.fakeTitleNode, "width");
				if(width > 20){
					width = width - 10;
				}
				domStyle.set(this.fakeFocusNode, {"width": width + idWidth + "px"});
			}
			this._enforceTitleDirection();
		},
		
		_enforceTitleDirection: function(){
		},
		
		_setCollapsedAttr: function(value){
			if(value){
				domAttr.set(this.focusNode, "aria-label", this._nlsResources.showDetails);
			}else{
				domAttr.set(this.fakeFocusNode, "aria-label", this._nlsResources.hideDetails);
			}
			
			domClass.toggle(this.domNode, "idxMessageCollapsed", value);
			if(has("ie") == 6 || has("ie") == 7){
				if(value){
					domStyle.set(this.domNode, {"height": "33px"});
				}else{
					domStyle.set(this.domNode, {"height": "auto"});
				}
			}
			domClass.toggle(this.focusNode, "dijitHidden", !value);
			domClass.toggle(this.fakeFocusNode, "dijitHidden", value);
			this._set("collapsed", value);
			this._resizeTitle();
			
			if(has("ie") == 6){
				this.resize();
			}
		},
		
		_onClick: function(e){
			this.set("collapsed", !this.collapsed);
			focus.focus(this.collapsed ? this.focusNode : this.fakeFocusNode);
			this.onClick(e);
		},
		
		_onClose: function(e){
			this.onClose(e);
			this.destroy();
		},
		/**
		 * Ajust the content of the SingleMessage.
		 */
		resize: function(){
			this._resizeTitle();
		},
		
		/**
		 * Event triggered  when the close button is clicked. Before 'destroy' method is called. 
		 */
		onClose: function(e){
		},
		
		/**
		 * Event triggered when mouse enter the icon image.
		 */
		onIconEnter: function(e){
		},
		
		/**
		 * Event triggered when mouse leave the icon image.
		 */
		onIconLeave: function(e){
		},
		
		/**
		 * Event triggered when message title is clicked.
		 */
		onClick: function(e){
		},
		
		/**
		 * Event triggered when action link 'View All' is clicked.
		 */
		onAction: function(e){
		},
		
		/**
		 * Event triggered when action link 'Refresh' is clicked.
		 */
		onRefresh: function(e){
		},
		
		/**
		 * Event triggered when action link 'More Details' is clicked.
		 */
		onMoreDetails: function(e){
		}
	});
	return has("dojo-bidi")? declare("idx.widget.SingleMessage",[iMessaging.SingleMessage,bidiExtension]) : iMessaging.SingleMessage;
});




},
'idx/form/Link':function(){
define([
	"dojo/_base/declare",
	"dojo/has",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_CssStateMixin",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/keys",
    "dojo/_base/event",
    "dojo/has!dojo-bidi?../bidi/form/Link",
    "dojo/text!./templates/Link.html"
], function (dDeclare,			// (dojo/_base/declare)
			 has,				// (dojo/has)
			 dWidget,			// (dijit/_Widget)
			 dTemplatedMixin,		// (dijit/_TemplatedMixin)
			 dCssStateMixin,	// (dijit/_CssStateMixin)
			 dLang,				// (dojo/_base/lang)
			 dDomAttr,			// (dojo/dom-attr) for (dDomAttr.set)
			 dDomClass,			// (dojo/dom-class) for (dDomClass.add)
			 dKeys,				// (dojo/keys)
			 dEvent,			// (dojo/_base/event) for (dEvent.stop),
			 bidiExtension,		// (../bidi/form/Link)
			 templateText) 		// (dojo/text!./templates/Link.html)
{
	/**
	 * @name idx.form.Link
	 * @class Simple link for application to handle as a widget.
	 *	Optional attributes are provided to control disabled and selected states.
	 * @augments dijit._Widget
	 * @augments dijit._TemplatedMixin
	 */
var baseClassName = has("dojo-bidi")? "idx.form.Link_" : "idx.form.Link";
var linkBase = dDeclare(baseClassName, [dWidget,dTemplatedMixin,dCssStateMixin],
		/**@lends idx.form.Link#*/
{
	/**
	 * Template string.
	 * @type String
	 * @private
	 */
	templateString: templateText,

	/**
	 * Alternative text.
   	 * @type String
   	 * @default ""
	 */
	alt: "",
	
	/**
	 * Base CSS class.
   	 * @type String
   	 * @default "idxLink"
	 */
	baseClass: "idxLink",
	
	/**
	 * Derived CSS class.
   	 * @type String
   	 * @default "idxLinkDerived"
	 */
	idxBaseClass: "idxLinkDerived",
	
	/**
	 * Specifies the disabled state.
   	 * @type Boolean
   	 * @default false
	 */
	disabled: false,
	
	/**
	 * Label string.
	 * @type String
	 * @default ""
	 */
	label: "",

	/**
	 * URL for the link.
	 * @type String
	 * @default ""
	 */
	href: "",

	/**
	 * Target for the link.
	 * @type String
	 * @default ""
	 */
	target: "",

	/**
	 * Specifies the selected state.
	 * @type Boolean
	 * @default false
	 */
	selected: false,

	/**
	 * Tab index.
	 * @type Number
	 * @default 0
	 */
	tabIndex: 0,
	
	/**
	 * Stops the click event propagation.
	 * In cases where a click listener is added to a parent and not to the Link
	 * directly you need the event to bubble. For instance, a Link rendered for each
	 * row in a grid, you may want to avoid listeners on each and every link and just
	 * have a single listener on the grid.
	 * @type Boolean
	 * @default false, for backwards compatibility
	 */
	bubbleClickEvent: false,
	
	/**
	 * Attribute map.
	 * @type Object
	 * @private
	 */
	attributeMap: dLang.delegate(dWidget.prototype.attributeMap, {
		label: {node: "linkNode", type: "innerHTML"},
		title: {node: "linkNode", type: "attribute", attribute: "title"}
	}),

	/**
	 * Sets up attributes for the link.
	 * @private as part of widget life cycle
	 */
	postCreate: function(){
		this.inherited(arguments);

		if(this.href && this.href != "javascript:;"){
			dDomAttr.set(this.linkNode, "href", this.href);
		}else if(!this.selected){
			dDomAttr.set(this.linkNode, "href", "javascript:;");
			this.connect(this.linkNode, "onkeypress", this._onKeyPress);
			this.connect(this.linkNode, "onclick", this._onClick);
		}
		if(this.selected){
			dDomClass.add(this.linkNode, "idxLinkSelected");
		}
		if(this.target){
			dDomAttr.set(this.linkNode, "target", this.target);
		}
	},

	/**
	 * Handles focus.
	 */
	focus: function() {
		this.focusNode.focus();
	},

	/**
	 * Updates tabIndex.
	 * @private
	 */
	_setStateClass: function(){
		this.inherited(arguments);

		dDomAttr.set(this.focusNode, "tabIndex", (this.disabled ? -1 : this.tabIndex));
	},

	/**
	 * Handles key press event.
	 * @private 
	 * @param {Object} event
	 */
	_onKeyPress: function(/*Event*/ e) {
		if (this.disabled || e.altKey || e.ctrlKey) {
			return;
		}
		switch (e.charOrCode) {
		case dKeys.ENTER:
		case dKeys.SPACE:
		case " ":
			this.onClick(e);
			if (e && !this.bubbleClickEvent) {
				dEvent.stop(e);
			}
			break;
		default:
				// do nothing
		} 
	},
	
	/**
	 * Handles click event.
	 * @private 
	 * @param {Object} event
	 */
	_onClick: function(/*Event*/ event) {
		if (event && !this.bubbleClickEvent) dEvent.stop(event);
		if (this.disabled) return;
		this.onClick(event);
	},
	
	/**
	 * Callback called when the link is clicked.
	 * @param {Event} event
	 */
	onClick: function(/*Event*/event){
		if (!this.bubbleClickEvent) {
			dEvent.stop(event);			
		}
	}
});
return has("dojo-bidi")? dDeclare("idx.form.Link",[linkBase,bidiExtension]) : linkBase;
});

},
'idx/form/dropDownButtons':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/dom-class","dijit/form/DropDownButton"],
	   function(dLang,				// (dojo/_base/lang)
		        iMain,				// (idx)
		        dDomClass,			// (dojo/dom-class) for (dDomclass.add/remove)
		        dDropDownButton) 	// (dijit/form/DropDownButton)
{
	/**
	 * @name idx.form.dropDownButtons
	 * @class Extension to dijit.form.DropDownButton to add the "idxDropDownOpen" CSS class whenever
	 *        the DropDownButton is opened.  This allows for alternate styling on the widget when it is
	 *        has its drop-down in the open state.  This is included with "idx.ext".
	 */
	var iDropDownButtons = dLang.getObject("form.dropDownButtons", true, iMain);
	
	// get the dropDown button prototype
    var dropDownProto  = dDropDownButton.prototype;
    
	// 
	// Get the base functions so we can call them from our overrides
	//
	var baseDropDownOpen  = dropDownProto.openDropDown;
	var baseDropDownClose = dropDownProto.closeDropDown;
	
	/**
	 * Overrides dijit.form.Button.buildRendering to respect CSS options.
	 */
	if (baseDropDownOpen) {
		dropDownProto.openDropDown = function() {
			var result = baseDropDownOpen.apply(this, arguments);
			if (this._opened) dDomClass.add(this.domNode, "idxDropDownOpen");
			return result;
		};
	};
	
	if (baseDropDownClose) {
		dropDownProto.closeDropDown = function(focus) {
			var result = baseDropDownClose.apply(this, arguments);
			dDomClass.remove(this.domNode, "idxDropDownOpen");
			return result;
		};
	}	
	
	return iDropDownButtons;
});
},
'idx/app/Banner':function(){
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/sniff",
	"dojo/aspect",
	"dojo/dom-style",
	"dojo/_base/array",
	"dijit/_Widget",
	"dijit/_Container",
	"dijit/_TemplatedMixin",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/form/DropDownButton",
	"dijit/form/Button",
	"dijit/Menu",
	"dijit/MenuItem",
	"idx/util",
	"idx/string",
	"idx/resources",
	"dojo/has!dojo-bidi?../bidi/app/Banner",
	"dojo/text!./templates/Banner.html",
	"dojo/i18n!./nls/base",
	"dojo/i18n!./nls/ConsoleLayout"
], function(dojo_declare, dojo_lang, has, dojo_aspect, dojo_dom_style, dojo_array, dijit_Widget, dijit_Container, dijit_TemplatedMixin, dijit_WidgetsInTemplateMixin, dijit_form_DropDownButton, dijit_form_Button, dijit_Menu, dijit_MenuItem, idx_util, idx_string, idx_resources, bidiExtension, templateString){

var placeHolder = new function() {};

/**
 * @name idx.app.Banner
 * @class Application banner with built-in and custom links.
 * @augments dijit._Widget
 * @augments dijit._Container
 * @augments dijit._TemplatedMixin
 * @augments dijit._WidgetsInTemplateMixin
 */
var baseClassName = has("dojo-bidi")? "idx.app.Banner_" : "idx.app.Banner";
var Banner = dojo_declare(baseClassName, [ dijit_Widget, dijit_Container, dijit_TemplatedMixin, dijit_WidgetsInTemplateMixin ],
/** @lends idx.app.Banner# */
{
	/**
	 * Template string.
	 * @type String
	 * @private
	 */
	templateString: templateString,

	/**
	 * Label string for username.
	 * 
	 * @type String
	 * @default ""
	 */
	usernameLabel: "",

	/**
	 * Username.
	 * 
	 * @type String
	 * @default ""
	 */
	username: "",

	/**
	 * Label string for log out link.
	 * 
	 * @type String
	 * @default "Log out"
	 */
	logoutLabel: "",

	/**
	 * Function to call when the user clicks the log out menu item.
	 * 
	 * @type Function
	 * @default null
	 */
	logoutFunc: placeHolder,

	/**
	 * Label string for help link.
	 * 
	 * @type String
	 * @default "Help"
	 */
	helpLabel: "",

	/**
	 * Function to call when the user clicks the help button.
	 * 
	 * @type Function
	 * @default null
	 */
	helpFunc: placeHolder,

	/**
	 * Label string for about link.
	 * 
	 * @type String
	 * @default "About"
	 */
	aboutLabel: "",

	/**
	 * Function to call when the user clicks the about menu item.
	 * 
	 * @type Function
	 * @default null
	 */
	aboutFunc: placeHolder,

	/**
	 * 
	 */
	vendorName: "IBM",
	
	/**
	 *
	 */
	_setVendorNameAttr: function(name) {
		this.vendorName = name;
		this.logoTextNode.innerHTML = this.vendorName;
	},
	
	/**
	 * 
	 */
	postMixInProperties: function() {
	    idx_util.nullify(this, this.params, ["helpFunc", "aboutFunc", "logoutFunc"]);
		this.inherited(arguments);
	},
	
	/**
	 * Creates a trailer section.
	 * @private as part of widget life cycle
	 */
	buildRendering: function() {
		var resources = idx_resources.getResources("idx/app/ConsoleLayout", this.lang);
		if(!this.logoutLabel){
			this.logoutLabel = resources.logout;
		}
		if(!this.helpLabel){
			this.helpLabel = resources.help;
		}
		if(!this.aboutLabel){
			this.aboutLabel = resources.about;
		}

		this.inherited(arguments);

		this._actionsMenuItemCount = 0;
		dojo_dom_style.set(this.actionsButton.domNode, {display: 'none', visibility: 'hidden'});
		dojo_dom_style.set(this.helpButton.domNode, {display: 'none', visibility: 'hidden'});
		dojo_aspect.after(this.actionsMenu, "addChild", dojo_lang.hitch(this, "_onActionMenuAddChild"));
		dojo_aspect.after(this.actionsMenu, "removeChild", dojo_lang.hitch(this, "_onActionMenuRemoveChild"));
	},

	/**
	 *
	 */
	_setUsernameAttr: function(value) {
		this.username = value;
		this._updateActionsButtonDisplay();
	},
	
	/**
	 *
	 */
	_setUsernameLabelAttr: function(value) {
		this.usernameLabel = value;
		this._updateActionsButtonDisplay();
	},
	
	/**
	 *
	 */
	_updateActionsButtonDisplay: function() {
		var label = idx_string.nullTrim(this.usernameLabel);
		if (!label) label = idx_string.nullTrim(this.username);
		this.actionsButton.set("label", (label ? label : ""));
		if (label || this._actionsMenuItemCount > 0) {
			dojo_dom_style.set(this.actionsButton.domNode, {display: '', visibility: 'visible'});
		} else {
			this._actionsMenuItemCount = 0;
			dojo_dom_style.set(this.actionsButton.domNode, {display: 'none', visibility: 'hidden'});
		}		
	},
	
	/**
	 *
	 */
	_setLogoutFuncAttr: function(value) {
		if (this._logoutItemValue === value) return;
		this.logoutFunc = value;
		if (this._logoutItem) {
			this.actionsMenu.removeChild(this._logoutItem);
			this._logoutItem.destroy();
			this._logoutItem = null;
		}
		if (this.logoutFunc && this.logoutFunc !== placeHolder) {
			this._logoutItem = new dijit_MenuItem({
				label: this.logoutLabel,
				onClick: this.logoutFunc
			});
			this._logoutItemValue = value;
			this.actionsMenu.addChild(this._logoutItem);
		}		
	},
	
	/**
	 *
	 */
	_setAboutFuncAttr: function(value) {
		if (this._aboutItemValue === value) return;
		this.aboutFunc = value;
		if (this._aboutItem) {
			this.actionsMenu.removeChild(this._aboutItem);
			this._aboutItem.destroy();
			this._aboutItem = null;
		}
		if (this.aboutFunc && this.aboutFunc !== placeHolder) {
			this._aboutItem = new dijit_MenuItem({
				label: this.aboutLabel,
				onClick: this.aboutFunc
			});
			this._aboutItemValue = value;
			this.actionsMenu.addChild(this._aboutItem);
		}		
	},
	
	/**
	 *
	 */
	_setHelpFuncAttr: function(value) {
		this.helpFunc = value;
		if (this.helpFunc && this.helpFunc !== placeHolder) {
			this.helpButton.onClick = this.helpFunc;
			dojo_dom_style.set(this.helpButton.domNode, {display: '', visibility: 'visible'});
		} else {			
			dojo_dom_style.set(this.helpButton.domNode, {display: 'none', visibility: 'hidden'});
		}
	},
	
	
	/**
	 * 
	 */
	_onActionMenuAddChild: function() {
		this._actionsMenuItemCount++;
		this._updateActionsButtonDisplay();
	},
	
	/**
	 * 
	 */
	_onActionMenuRemoveChild: function() {
		this._actionsMenuItemCount--;
		this._updateActionsButtonDisplay();		
	},
	
	/**
	 * Adds items to the action menu drop-down.
	 * 
	 * @param {Array} actionMenusItems 
	 *				An array of dijit.MenuItem objects to add to the action menu drop-down.
	 */
	addMenuItems: function(actionMenusItems) {
		if (actionMenusItems && actionMenusItems.length > 0) {
			var self = this;

			dojo_array.forEach(actionMenusItems, function(actionMenuItem) {
				self.actionsMenu.addChild(actionMenuItem);
			});
		}
	}
});
return has("dojo-bidi")? dojo_declare("idx.app.Banner",[Banner,bidiExtension]) : Banner;
});

},
'idx/form/_FocusManager':function(){
define([
	"dijit/focus",
	"dojo/_base/window",
	"dojo/window",
	"dojo/dom", // dom.isDescendant
	"dojo/dom-attr",
	"dojo/dom-class",
	"dojo/_base/declare", // declare
	"dojo/_base/lang", // lang.extend	
	"dijit/registry"
], function(focus, win, winUtils, dom, domAttr, domClass, declare, lang, registry){
	focus._onTouchNode = function(/*DomNode*/ node, /*String*/ by){
		var srcNode = node;
		if(this._clearActiveWidgetsTimer){
			clearTimeout(this._clearActiveWidgetsTimer);
			delete this._clearActiveWidgetsTimer;
		}
		var newStack=[];
		try{
			while(node){
				var popupParent = domAttr.get(node, "dijitPopupParent");
				if(typeof node.dijitPopupParent == "object"){
					node = node.dijitPopupParent;
				}else if(popupParent){
					node = registry.byId(popupParent) ? 
						registry.byId(popupParent).domNode :
						dom.byId(popupParent);
				}else if(node.tagName && node.tagName.toLowerCase() == "body"){
					if(node === win.body()){
						break;
					}
					node=winUtils.get(node.ownerDocument).frameElement;
				}else{
					var id = node.getAttribute && node.getAttribute("widgetId"),
						widget = id && registry.byId(id);
					if(widget && !(by == "mouse" && widget.get("disabled"))){
						if(!widget._isValidFocusNode || widget._isValidFocusNode(srcNode)){
							newStack.unshift(id);
						}
					}
					node=node.parentNode;
				}
			}
		}catch(e){}
		this._setStack(newStack, by);
	}
	return focus;
});

},
'idx/trees':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * @name idx.trees
 * @class Provides "labelType" attribute support on dijit/tree/TreeStoreModel which can be
 *        set to "html" or "text" (defaults to "text").  This allows trees to use markup in 
 *        their tree node labels.  This was also added to dijit/tree/ObjectStoreModel for
 *        Dojo 1.9 as part of the fix to work item 9500; however, this excluded the 
 *        TreeStoreModel according to the comments and was not available for Dojo 1.8 or earlier.
 */
define(["dojo/_base/lang","idx/main","dojo/dom","dojo/dom-construct","dijit/Tree","dijit/tree/TreeStoreModel","dijit/tree/ObjectStoreModel"],
		function (dLang,iMain,dDom,dDomConstruct,dTree,dTreeStoreModel,dObjectStoreModel) {
	var iTrees = dLang.getObject("trees", true, iMain);
	
	// get the tree prototype
	var baseProto = dTree.prototype;
    
	dLang.extend(dTree._TreeNode, {
		_setLabelAttr: function(value) {
			this.label = value;
			if (("labelType" in this.tree.model) && (this.tree.model.labelType == "html")) {
				var html = (value) ? value : "";
				this.labelNode.innerHTML = html;
			} else {
				var text = document.createTextNode((value) ? value : "");
				dDomConstruct.place(text, this.labelNode, "only");
			}
		}
	});
	
	dLang.extend(dTreeStoreModel, {
		labelType: "text"
	});

	dLang.extend(dObjectStoreModel, {
		labelType: "text"
	});
	
	
	return iTrees;
});



},
'idx/form/_CompositeMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare", 
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/dom-attr",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-geometry",
	"dojo/i18n", 
	"dojo/query", 
	"dojo/dom-class", 
	"dojo/dom-style",
	"dojo/on",
	"dijit/_base/wai", 
	"idx/widget/HoverHelpTooltip",
	"../util",
	"../string",
	"./_FocusManager"
], function(declare, lang, aspect, domAttr, dom, domConstruct, domGeometry, i18n, query, domClass, domStyle, on, wai, HoverHelpTooltip, iUtil, iString, _focusManager) {
	/**
	 * @public
	 * @name idx.form._CompositeMixin
	 * @class Mix-in class to provide customized label, hint, unit, and field layout, implemented according to 
	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y29&vsub=*&hsub=*&openpanes=0000010000">Text Areas & Fields</a></b>.
	 * It takes the assumption that a composite widget will follow the dom structure below
	 * <br>
	 &lt;div class="idxComposite"&gt;
		&lt;div class="idxLabel"&gt;
			&lt;span&gt;*&lt;/span&gt;
				&lt;label dojotAttachPoint="compLabelNode"&gt;Label Text&lt;/label&gt;
		&lt;/div&gt;
		&lt;div&gt;other dom structure...&lt;/div&gt;&lt;div dojoAttachPoint="compUnitNode"&gt;unit text&lt;/div&gt;
		&lt;div dojoAttachPoint="compHintNode" class="idxHint dijitHidden"&gt;hint text&lt;/div&gt;
	 &lt;/div>
	 * <br>
	 * @aguments idx.form._FocusManager
	 */

	
	return declare("idx.form._CompositeMixin", null, 
	/**@lends idx.form._CompositeMixin#*/
	{
		/**
		 * Layout of the label and the field, "horizontal" or "vertical", implemented according to 
		 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y16&vsub=*&hsub=*&openpanes=0000011100">Field & Label Alignment</a></b>
		 * @type String
		 * @default "horizontal"
		 */
		labelAlignment: "horizontal",
		
		/**
		 * Label text
		 * @type String
		 */
		label: "",
		
		/**
		 * Width from the left of label to the left of corresponding field, this parameter works in the composite widget layout of "horizontal".
		 * @type String | Number
		 */
		labelWidth: "",
		
		/**
		 * Width of the field with a hidden validation icon
		 * @type String | Number
		 */
		fieldWidth: "",
		
		/**
		 * For input widgets only. The position of the hint text: "inside" / "outside", inner the field input or not.
		 * @type String
		 * @default "inside"
		 */
		hintPosition: "inside",
		
		/**
		 * For input widgets only. The hint text.
		 * @type String
		 */
		hint: "",
		
		/**
		 * Indicates that it's a required field or not. A required field will have a red asterisk.
		 * implemented according to 
	 	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y17&vsub=*&hsub=*&openpanes=0000011100">Required Fields</a></b>.
		 * @type boolean
		 * @default false
		 */
		required: false,
		
		/**
		 * The text of unit for the numerical value input widget.
		 * @type String
		 */
		unit: "",
		
		/**
		 * Focus manager for all composite widget
		 * @type idx.form.FocusManager
		 * @private
		 */
		_focusManager: _focusManager,
		
		
		/**
		 * Help message popup from help icon follows label.
		 * @type String
		 */
		help:"",
		
		_errorIconWidth: 27,
		
		/**
		 * Handles resizing form widgets.
		 */
		resize: function() {
			
			if(this._holdResize()){
				return;
			}
			
			// if percentage style width then clear the label and field widths so the parent container
			// has the opportunity to resize
			if (iUtil.isPercentage(this._styleWidth)) {
				domStyle.set(this.labelWrap, {width: ""});
				domStyle.set(this.oneuiBaseNode, {width: ""});
			}
			
			// schedule a resize
			if (this._resizeTimeout) {
				clearTimeout(this._resizeTimeout);
				delete this._resizeTimeout;
			}
			this._resizeTimeout = setTimeout(lang.hitch(this, this._resize), 250);
		},
		/**
		 * Check if resize action should be hold, by widget visibility and applied width
		 */
		_holdResize: function(widgetInvisible){
			if(!this.domNode){return true;}
			var hasFixedWidth = 
				(this._styleWidth && !iUtil.isPercentage(this._styleWidth)) ||
				(this.fieldWidth && !iUtil.isPercentage(this.fieldWidth)) ||
				(this.labelWidth && !iUtil.isPercentage(this.labelWidth)),
				widgetInvisible = domGeometry.getContentBox(this.domNode).w <= 0;
			return (!hasFixedWidth) && widgetInvisible;
		},
		/**
		 * Handles deferring the resize until the widget is started.  This function returns true
		 * if the resize should be deferred.
		 */
		_deferResize: function() {
			// check if the widget has no fixed width -- there is no point in resizing until the widget's 
			// DOM node is properly placed in the DOM since percentage width cannot be computed  before that
			if (!this._started) {
				// if we have not yet created a resize callback on "startup", then use aspect to do that
				if (!this._resizeHandle) {
					this._resizeHandle = aspect.after(this, "startup", lang.hitch(this, this._resize));
				}
				return true; // defer until startup
			}
			else {
				// if we are started and previously created a resizeHandle, then remove it
				if (this._resizeHandle) {
					this._resizeHandle.remove();
					delete this._resizeHandle;
				}
				
				return false;
			}	
		},
		
		_resize: function(){
			if (this._resizeTimeout) { 
				clearTimeout(this._resizeTimeout); 
				delete this._resizeTimeout; 
			}
			var deferring = this._deferResize();
			if (deferring) {
				return;
			}
			if(this._holdResize()){
				return;
			}
			
			var labelWidth = this.labelWidth,
				fieldWidth = this.fieldWidth,
				styleWidth = this._styleWidth;

			if(!(labelWidth || fieldWidth || styleWidth)){
				domStyle.set(this.labelWrap, {width: ""});
				domStyle.set(this.oneuiBaseNode, {width: ""});				
				return;
			}
			var	realWidth = domGeometry.getContentBox(this.domNode).w,
				realWidth = ((realWidth <= 0) && styleWidth)? iUtil.normalizedLength(styleWidth,this.domNode) : realWidth;

			if (!styleWidth) {
				if (iUtil.isPercentage(labelWidth)) domStyle.set(this.labelWrap, "width", "");
				if (iUtil.isPercentage(fieldWidth)) domStyle.set(this.oneuiBaseNode, "width", "");				
			}
			
			if(this.label && this.labelAlignment == "horizontal"){
				if(labelWidth){
					if(iUtil.isPercentage(labelWidth)){
						labelWidth = Math.floor(realWidth * parseInt(labelWidth)/100) - 10;
					}
					domStyle.set(this.labelWrap, "width", iUtil.normalizedLength(labelWidth,this.domNode) + "px");
				} else {
					domStyle.set(this.labelWrap, "width", "");
				}
				if(fieldWidth){
					var isFieldWidthPercentage = iUtil.isPercentage(fieldWidth);
					if(isFieldWidthPercentage){
						fieldWidth = Math.floor(realWidth * parseInt(fieldWidth)/100);
					}
					domStyle.set(this.oneuiBaseNode, "width", 
						iUtil.normalizedLength(fieldWidth,this.domNode) - (isFieldWidthPercentage ? (this._errorIconWidth + 2) : 0) + "px");
				} else {
					domStyle.set(this.oneuiBaseNode, "width", "");
				}
				if (styleWidth && !fieldWidth) {
					var compLabelWidth = domGeometry.getMarginBox(this.labelWrap).w;
					var compFieldWidth = realWidth - this._errorIconWidth - compLabelWidth - 2;
					if (compFieldWidth > 0) {
						domStyle.set(this.oneuiBaseNode, "width", compFieldWidth + "px");
					}
				}
			}else{
				if(styleWidth){
					domStyle.set(this.oneuiBaseNode, "width", realWidth - this._errorIconWidth - 2 + "px");
				}else if(fieldWidth && !iUtil.isPercentage(fieldWidth)){
					domStyle.set(this.oneuiBaseNode, "width", iUtil.normalizedLength(fieldWidth,this.domNode) + "px");
				} else {
					domStyle.set(this.oneuiBaseNode, "width", "");
				}
			}
			this._resizeHint();
		},
		_resizeHint: function(){
			if(this.hint && (this.hintPosition == "outside") && this._created){
				var inputWidth = domStyle.get(this.oneuiBaseNode, "width");
				domStyle.set(this.compHintNode, "width", inputWidth? inputWidth + "px" : "");
			}
		},
		_setStyleAttr: function(style){
			// If there's no label share the widget width with field,
			// field would occupy whole widget width if "width" is specified in given style.
			this.inherited(arguments);
			this._styleWidth = iUtil.getValidCSSWidth(style);
			this._created && this._resize();
		},
				/**
		 * Set the width of label, the width is from the start of label to the start of the field.
		 * @public
		 * @param {string | number} width 
		 * Unit of "pt","em","px" will be normalized to "px", and "px" by default for numeral value.
		 */
		_setLabelWidthAttr: function(/*String | Integer*/width){
			domStyle.set(this.labelWrap, "width", width);
			this._set("labelWidth", width);
			this._created && this._resize();
		},
		
		/**
		 * Set the width of field with a hidden validation icon.
		 * @public
		 * @param {string | number} width 
		 * Unit of "pt","em","px" will be normalized to "px", and "px" by default for numeral value.
		 */
		_setFieldWidthAttr: function(/*String | Integer*/width){
			if(!iUtil.isPercentage(width)){
				domStyle.set(this.oneuiBaseNode, "width", width);
			}
			this._set("fieldWidth", width);
			this._created && this._resize();
		},
		
		/**
		 * Set the alignment for the label and field,  update the style of the label node to make 
		 * it be at the right place.
		 * @public
		 * @param {string} alignment
		 * The alignment of the label and field. Can be "vertical" or "horizontal".
		 * If "vertical" is used, the label is put above the TextBox.
		 * If "horizontal" is used, the label is put on the left of the TextBox (on
		 * the right of the TextBox if RTL language is used).
		 */
		_setLabelAlignmentAttr: function(/*String*/ alignment){
			var h = alignment == "horizontal";
			domClass.toggle(this.labelWrap, "dijitInline", h);
			query(".idxCompContainer", this.domNode).toggleClass("dijitInline", h);
			this._set("labelAlignment", alignment);
			this._resize();
		},
		
		_setupHelpListener: function() {
			if (this._helpListener) return;
			var blurHandler = function(e) {
				if (this.widget.helpTooltip) {
					this.widget.helpTooltip.close(true);
				}
				if (this.handle) {
					this.handle.remove();
					delete this.handle;
					this.widget._blurHandler = null;
				}
			};
			var keyHandler = function(e) {
				var charOrCode = e.keyCode;
				if(e.type == "keydown"){
					if(e.ctrlKey && e.shiftKey && (charOrCode == 191) && this.helpTooltip && this._help) {
						this.helpTooltip.open(this.helpNode);
				
						if (e.target && !this._blurHandler) {
							var scope = {
									handle: null,
									widget: this
							};
							this._blurHandler = scope.handle = on(e.target, "blur", lang.hitch(scope, blurHandler));
						}
					}
				}
			};
			var node = (this.oneuiBaseNode) ? this.oneuiBaseNode : this.focusNode;
			if (node) {
				this._keyListener = this.own(on(node, "keydown", lang.hitch(this, keyHandler)));
			}
		},
		
		_setHelpAttr: function(/*String*/ helpText){
			this.help = helpText; // set the help to what the caller provided
			this._help = helpText = iString.nullTrim(helpText); // set the internal value to the trimmed version
			if (helpText) {
				if (!this.helpNode) {
					this.helpNode = domConstruct.toDom("<div class='dijitInline idxTextBoxHoverHelp'><span class='idxHelpIconAltText'>?</span></div>");
					domConstruct.place(this.helpNode, this.compLabelNode, "after");
					this.helpTooltip = new HoverHelpTooltip({
						connectId: [this.helpNode],
						label: helpText,
						position: ['above', 'below'],
						forceFocus: false,
						textDir: this.textDir
					});
					this._setupHelpListener();
					
				}
				else {
					this._setupHelpListener();
					this.helpTooltip.set("label", helpText);
					domClass.remove(this.helpNode, "dijitHidden");
				}
			}
			else {
				if (this.helpNode) {
					this.helpTooltip.set("label", "");
					domClass.add(this.helpNode, "dijitHidden");
				}
			}
		},
		
		/**
		 * Set the label text. Update the content of the label node.
		 * @public
		 * @param {string} label
		 * The text will be displayed as the content of the label. If text is null or
		 * empty string, nothing would be displayed.
		 */
		_setLabelAttr: function(/*String*/ label){
			this.compLabelNode.innerHTML = label;
			var islabelEmpty = /^\s*$/.test(label);
			domAttr[islabelEmpty?"remove":"set"](this.compLabelNode, "for", this.id);
			domClass.toggle(this.labelWrap, "dijitHidden", islabelEmpty);
			this._set("label", label);
		},
		
		/**
		 * Set this field as a required field or not. If this field is required,
		 * a red asterisk will be shown at the start of label.
		 * @public
		 * @param {boolean} required
		 */
		_setRequiredAttr: function(/*Boolean*/ required){
			wai.setWaiState(this.focusNode, "required", required + "");
			this._set("required", required);
			this._refreshState();
		},
		
		_refreshState: function(){
			if(!this._created){return;}
			if(this.disabled){
				this._set("state", "");
			}else if(this.required && this._isEmpty(this.value) && (this.state == "")){
				this._set("state", "Incomplete");
			}
		},
		_setValueAttr: function(){
			// summary:
			//		Hook so set('value', ...) works.
			this.inherited(arguments);
			this.validate(this.focused);
		},
		
		/**
		 * Set position of the hint text. If position is "outside", update the content
		 * of the hint node. If position is "inside" and the value of the TextBox is
		 * null, set the value of the TextBox to the hintText
		 * @protected
		 * @param {string} position
		 * The position of the label. Can be "outside" or "inside".
		 * If "outside" is used, the hint text is put below the TextBox.
		 * If "inside" is used and the TextBox has a value, display the value in the TextBox. Once
		 * the value of the TextBox is null, display the hint text inside the TextBox in a specified
		 * color (e.g: gray).
		 */
		_setHintPositionAttr: function(/*String*/ position){
			if(!this.compHintNode){ return; }
			domClass.toggle(this.compHintNode, "dijitVisible", position != "inside");
			this._set("hintPosition", position);
			this.set("hint", this.hint);
			this._resizeHint();
		},
		
		/**
		 * Set the hint text
		 * @public
		 * @param {string} hint
		 * The text will be displayed inside or below the TextBox per the "position" attribute.
		 */
		_setHintAttr: function(/*String*/ hint){
			this.set("placeHolder", this.hintPosition == "inside" ? hint : "");
			if(!this.compHintNode){ return; }
			this.compHintNode.innerHTML = this.hintPosition == "inside" ? "" : hint;
			
			if(this.hintPosition == "outside"){
				domAttr.set(this.compHintNode, "id", this.id + "_hint_outside");
			}
			if(this._placeholder === undefined || this._placeholder === false){
				wai.setWaiState(this.focusNode, "describedby", this.id + "_hint_" + this.hintPosition);
			}
			this._set("hint", hint);
			this._resizeHint();
		},
		
		_setPlaceHolderAttr: function(v){
			this._set("placeHolder", v);
			if(v === null || v === undefined){
				v = "";
			}
			if(this.focusNode.placeholder !== undefined && this._placeholder !== false){
				domAttr.set(this.focusNode, "placeholder", v);
				this._placeholder = v;
			}else{
				if(!this._phspan){
					this._attachPoints.push('_phspan');
					this._phspan = dojo.create('span',{
						className:'dijitPlaceHolder dijitInputField',
						id: this.id + "_hint_inside"
					},this.focusNode,'after');
				}
				this._phspan.innerHTML = "";
				this._phspan.appendChild(document.createTextNode(v));
				this._phspan.style.display=(this.placeHolder&&!this.focused&&!this.textbox.value)?"":"none";
			}
		},
		
		/**
		 * Set the text of unit
		 * @public
		 * @param {string} unit
		 * The unit will be displayed on the right of the input box(on the left of the input
		 * box if RTL language is used).
		 */
		_setUnitAttr: function(/*String*/ unit){
			if(!this.compUnitNode){ return; }
			this.compUnitNode.innerHTML = unit;
			domClass.toggle(this.compUnitNode, "dijitHidden", /^\s*$/.test(unit));
			this._set("unit", unit);
		},
		_isValidFocusNode: function(mousedownNode){
			return dom.isDescendant(mousedownNode, this.oneuiBaseNode) ||
				!dom.isDescendant(mousedownNode, this.domNode);
		},
		
		/**
		 * Reset the value and state of the composite widget.
		 * @public
		 */
		reset: function(){
			this.set("state", this.required ? "Incomplete" : "");
			this.message = "";
			this.inherited(arguments);
		},
		/**
		 * Validate value, directly get focus and show error if turn out to be invalid.
		 * @public
		 */
		validateAndFocus: function(){
			if(this.validate && !this.disabled){
				var hasBeenBlurred = this._hasBeenBlurred;
				this._hasBeenBlurred = true;
				var valid = this.validate();
				if(!valid){
					this.focus();
				}
				this._hasBeenBlurred = hasBeenBlurred
				return valid;
			}
			return true;
		}
	});
});

},
'idx/form/buttons':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang",
        "idx/main",
        "dojo/string",
        "dojo/dom-construct",
        "dojo/dom-class",
        "dojo/dom-attr",
        "dojo/aspect",
        "dojo/_base/event",
        "dijit/form/Button",
        "dojo/data/ItemFileReadStore",
        "../string",
        "../resources",
        "../html",
        "dojo/i18n!../nls/base",
        "dojo/i18n!./nls/base",
        "dojo/i18n!./nls/buttons",
        "../ext"], // needed for "idxBaseClass" to be properly used
		function(dLang, 				// (dojo/_base/lang)					
				 iMain,					// (idx)
				 dString,				// (dojo/string)
				 dDomConstruct,			// (dojo/dom-construct)
				 dDomClass,				// (dojo/dom-class) for (dDomClass.add/remove/contains)
				 dDomAttr,				// (dojo/dom-attr) for (dDomAttr.get/set)
				 dAspect,				// (dojo/aspect)
				 dEvent,				// (dojo/_base/event) for (dEvent.stop)
				 dButton,				// (dijit/form/Button)
				 dItemFileReadStore,	// (dojo/date/ItemFileReadStore)
				 iString,				// (../string)
				 iResources, 			// (../resources)
				 iHTML)					// (../html)
{
	/**
	 * @name idx.form.buttons
	 * @class Extension to dijit.form.Button to add functionality and features to all instances of
	 *        dijit.form.Button and its descendants.  These extensions provide things like well-defined
	 *        button "type" attribute for common button types as well as alternate "placement", 
	 *        "displayMode", and "profile" as well as styling the button with additional 
	 *        CSS class to make it easier to style buttons of any type with a CSS selector.
	 */
	var iButtons = dLang.getObject("form.buttons", true, iMain);
	
    /**
     * This defines the known display modes:
     *   - "labelOnly"
     *   - "iconOnly"
     *   - "iconAndLabel"
     *   
     * @private
     */
    iButtons._displayModes= {
      labelOnly: { showIcon: false, showLabel: true, cssClass: "idxButtonLabelOnly" },
      iconOnly: { showIcon: true, showLabel: false, cssClass: "idxButtonIconOnly" },
      iconAndLabel: { showIcon: true, showLabel: true, cssClass: "idxButtonIconAndLabel" }
    };
    
    var displayModes = iButtons._displayModes;
    
	/**
	 * This defines the possible button profiles with the current definition
	 * for the button profile.  The possible values include:
	 * - "standard"
	 * - "compact"
	 */
	iButtons._buttonProfiles = {
			standard: { cssClass: null },
			compact: { cssClass: "idxButtonCompact" }
	};
	var buttonProfiles = iButtons._buttonProfiles;
	
    /**
     * This defines the possible button placements with the current definition 
     * for the button placement.  The possible values include:
     * - "primary"
     * - "secondary"
     * - "toolbar"
     * - "special"
     * 
     * @private
     */
	iButtons._buttonPlacements = {
			primary: { cssClass: null, defaultDisplayMode: "iconAndLabel", defaultProfile: "standard"},
			secondary: { cssClass: "idxButtonSecondary", defaultDisplayMode: "labelOnly", defaultProfile: "standard"},
			toolbar: { cssClass: "idxButtonToolbar", defaultDisplayMode: "iconOnly", defaultProfile: "standard"},
			special: { cssClass: "idxButtonSpecial", defaultDisplayMode: "iconAndLabel", defaultProfile: "standard"}
	};
	var buttonPlacements = iButtons._buttonPlacements;	
	
    /**
     * @public
     * @function
     * @name idx.form.buttons.setDefaultDisplayMode
     * @description Sets the default display mode for either all possible button placement positions
     *              or for a specific one.
     * 
     * @param {String} displayModeName A string that can be one of "labelOnly", "iconOnly", 
     *                                 or "iconAndLabel"
     *                        
     * @param {String} placementName If null then the call affects all possible button placements, otherwise
     *                               this should be one of "primary", "secondary", "special" or "toolbar".  
     * 
     */
    iButtons.setDefaultDisplayMode = function(/*String*/ displayModeName,/*String*/ placementName) {
    	var mode = displayModes[displayModeName];
    	
    	// error out if we got a bad mode
    	if (!mode) {
    		throw new Error("Invalid mode display mode name: " + displayModeName);
    	}
    	
    	if (! placementName) {
    		for (placementName in buttonPlacements) {
    			buttonPlacements[placementName].defaultDisplayMode = displayModeName;
    		}
    	} else {
    		var placement = buttonPlacements[placementName];
    		if (!placement) throw new Error("Invalid button placement name: " + placementName);
    		placement.defaultDisplayMode = displayModeName;
    	}
    };

    /**
     * @public
     * @function
     * @name idx.form.buttons.setDefaultProfile
     * @description Sets the default "profile" for either all possible button placement positions
     *              or for a specific one.
     * 
     * @param {String} profileName A string that can be one of "standard" or "compact".
     *                        
     * @param {String} placementName If null then the call affects all possible button placements, otherwise
     *                                this should be one of "primary", "secondary", "special" or "toolbar".  
     * 
     */
    iButtons.setDefaultProfile = function(/*String*/ profileName,/*String?*/ placementName) {
    	var profile = buttonProfiles[profileName];
    	
    	// error out if we got a bad mode
    	if (!profile) {
    		throw new Error("Invalid mode profile name: " + profileName);
    	}
    	
    	if (! placementName) {
    		for (placementName in buttonPlacements) {
    			buttonPlacements[placementName].defaultProfile = profileName;
    		}
    	} else {
    		var placement = buttonPlacements[placementName];
    		if (!placement) throw new Error("Invalid button placement: " + placement);
    		placement.defaultProfile = profileName;
    	}
    };


    /**
     * This defines the standard button types.
     * 
	 * Possible values are:
	 *   
	 *	"close",
	 *  "configure"
	 *	"edit"
	 *	"filter"
	 *	"clearFilter"
	 *	"toggleFilter"
	 *	"help"
	 *	"info"
	 *	"minimize"
	 *	"maximize"
	 *	"print"
	 *	"refresh"
	 *	"restore"
	 *	"maxRestore"
	 *	"nextPage"
	 *	"previousPage"
	 *	"lastPage"
	 *	"firstPage"
     * 
     * @private
     */
	iButtons._stdButtonTypes = {
			close: { iconClass: "idxCloseIcon", iconSymbol: ['X','X'], labelKey: "closeLabel", titleKey: "closeTip" },
			configure: { iconClass: "idxConfigureIcon", iconSymbol: ['\u2699','\u2699'], labelKey: "configureLabel", titleKey: "configureTip" },
			edit: { iconClass: "idxEditIcon", iconSymbol: ['\u270E','\u270E'], labelKey: "editLabel", titleKey: "editTip" },
			filter: { iconClass: "idxFilterIcon", iconSymbol: ['\u2A52','\u2A52'], labelKey: "filterLabel", titleKey: "filterTip" },
			clearFilter: { iconClass: "idxClearFilterIcon", iconSymbol: ['\u2A5D','\u2A5D'], labelKey: "clearFilterLabel", titleKey: "clearFilterTip"},
			toggleFilter: { toggleButtonTypes: [ "filter", "clearFilter" ] },
			help: { iconClass: "idxHelpIcon", iconSymbol: ['?','\u061F'], labelKey: "helpLabel", titleKey: "helpTip" },
			info: { iconClass: "idxInfoIcon", iconSymbol: ['\u24D8','\u24D8'], labelKey: "infoLabel", titleKey: "infoTip" },
			minimize: { iconClass: "idxMinimizeIcon", iconSymbol: ['\u2193','\u2193'], labelKey: "minimizeLabel", titleKey: "minimizeTip" },
			maximize: { iconClass: "idxMaximizeIcon", iconSymbol: ['\u2197','\u2196'], labelKey: "maximizeLabel", titleKey: "maximizeTip" },
			print: { iconClass: "idxPrintIcon", iconSymbol: ['\uD83D\uDCF0','\uD83D\uDCF0'], labelKey: "printLabel", titleKey: "printTip" },
			refresh: { iconClass: "idxRefreshIcon", iconSymbol: ['\u21BA','\u21BB'], labelKey: "refreshLabel", titleKey: "refreshTip" },
			restore: { iconClass: "idxRestoreIcon", iconSymbol: ['\u2199','\u2198'], labelKey: "restoreLabel", titleKey: "restoreTip" },
			maxRestore: { toggleButtonTypes: [ "maximize", "restore" ] },
			nextPage: { iconClass: "idxNextPageIcon", iconSymbol: ['\u21D2','\u21D0'], labelKey: "nextPageLabel", titleKey: "nextPageTip" },
			previousPage: { iconClass: "idxPreviousPageIcon", iconSymbol: ['\u21D0','\u21D2'], labelKey: "previousPageLabel", titleKey: "previousPageTip" },
			lastPage: { iconClass: "idxLastPageIcon", iconSymbol: ['\u21DB','\u21DA'], labelKey: "lastPageLabel", titleKey: "lastPageTip" },
			firstPage: { iconClass: "idxFirstPageIcon", iconSymbol: ['\u21DA','\u21DB'], labelKey: "firstPageLabel", titleKey: "firstPageTip" }
	};

	/**
	 * @public
	 * @function 
	 * @name idx.form.buttons.getButtonTypes
	 * @description Returns an array of strings containing the possible button type names.
	 * @return {String[]} The array of strings contianing the button type names that are recognized. 
	 * @see idx.form.buttons.getButtonTypeStore
	 */
	iButtons.getButtonTypes = function() {
		var result = [ ];
		for (field in iButtons._stdButtonTypes) {
			result.push(field);
		}
		return result;
	};
	
	/**
	 * @public
	 * @function
	 * @name idx.form.buttons.getButtonTypeStore
	 * @description Returns a dojo.data.ItemFileReadStore containing the possible button type names.
	 * @return {dojo.data.ItemFileReadStore} A read store containing all possuble button types.
	 * @see idx.form.buttons.getButtonTypes 
	 */
	iButtons.getButtonTypeStore = function(withEmpty) {
		
		var result = { identifier: 'value', label: 'name', items: [ ] };
		
		if (withEmpty) {
			result.items.push({name: "[none]", value: " "});
		}
		for (field in iButtons._stdButtonTypes) {
			result.items.push({name: field, value: field});
		}
		return new dItemFileReadStore({data: result});
	};
	
	// 
	// Get the base functions so we can call them from our overrides
	//
    var buttonProto = dButton.prototype;	
	var setLabelFunc = buttonProto._setLabelAttr;
	var setIconClassFunc = buttonProto._setIconClassAttr;
	var setShowLabelFunc = buttonProto._setShowLabelAttr;
	
	/**
	 * Overrides _setLabelAttr from dijit.form.Button
	 */
	buttonProto._setLabelAttr = function(label) {
		// setup the explicit label if starting up
		if ((!this._started) && (! ("_explicitLabel" in this)) && (this.params) && ("label" in this.params)) {
			this._explicitLabel = this.params.label;
		}
		
		// determine the explicit value so we can revert
		var abt = this._applyingButtonType;
		this._applyingButtonType = false; // clear the flag

		if (! abt) {
			this._explicitLabel = label;
		} else {
			var el = this._explicitLabel;
			if (iString.nullTrim(el)) {
				// we have an explicit label -- ignore button type label
				this.label = el;
				label = el;
			}
		}
		
		if (setLabelFunc) {
			var current = this._setLabelAttr;
			this._setLabelAttr = setLabelFunc;
			this.set("label", label);
			this._setLabelAttr = current;
		} else {
			this.label = label;
			if (this._attrToDom && ("label" in this.attributeMap)) {
				this._attrToDom("label", label);
			}
		}
		
		if ((!abt) && (! iString.nullTrim(this.label))
			&& (this._buttonTypes)) {
			var bt = this._buttonTypes[this._toggleIndex];
			this._applyButtonTypeLabel(bt);
		}
	};
	
	/**
	 * Overrides _setIconClassAttr from dijit.form.Button
	 */
	buttonProto._setIconClassAttr = function(iconClass) {
		// setup the explicit iconClass if starting up
		if ((!this._started) && (! ("_explicitIconClass" in this)) && (this.params) 
				&& ("iconClass" in this.params) && (this.params.iconClass != "dijitNoIcon")) {
			this._explicitIconClass = this.params.iconClass;
		}
		
		// determine the explicit value so we can revert
		var abt = this._applyingButtonType;
		this._applyingButtonType = false; // clear the flag
		if (! abt) { 
			dDomClass.remove(this.domNode, "idxButtonIcon");
			if (iconClass != "dijitNoIcon") this._explicitIconClass = iconClass;
		} else {
			var eic = this._explicitIconClass;
			if (iString.nullTrim(eic)) {
				// we have an explicit icon class -- ignore button type icon class
				this.iconClass = eic;
				iconClass = eic;
				dDomClass.remove(this.domNode, "idxButtonIcon");
			} else {
				dDomClass.add(this.domNode, "idxButtonIcon");
			}
		}
		if (setIconClassFunc) {
			var current = this._setIconClassAttr;
			this._setIconClassAttr = setIconClassFunc;
			this.set("iconClass", iconClass);
			this._setIconClassAttr = current;
		} else {
			this.iconClass = iconClass;
			if (this._attrToDom && ("iconClass" in this.attributeMap)) {
				this._attrToDom("iconClass", iconClass);
			}
		}
		if ((!abt) && (! iString.nullTrim(this.iconClass))
				&& (this._buttonTypes)) {
				var bt = this._buttonTypes[this._toggleIndex];
				this._applyButtonTypeIconClass(bt);
		}
	};
	
	/**
	 * Overrides _setIconClassAttr from dijit.form.Button
	 */
	buttonProto._setShowLabelAttr = function(show) {
		// check if we need to set the explicit value
		if ((!this._started) && (this.params) && ("showLabel" in this.params) && (! ("_explicitShowLabel" in this))) {
			this._explicitShowLabel = this.params.showLabel;
		}
	
		// check if we are applying the display mode
		var adm = this._applyingDisplayMode;
		this._applyingDisplayMode = false; // clear the flag
		
		if (! adm) {
			// if not applying display mode, then store the value
			this._explicitShowLabel = show;
		} 
		if (setShowLabelFunc) {
			var current = this._setShowLabelAttr;
			this._setShowLabelAttr = setShowLabelFunc;
			this.set("showLabel", show);
			this._setShowLabelAttr = current;
		} else {
			this.showLabel = show;
		}
	};
	
	var afterBuildRendering = buttonProto.idxAfterBuildRendering;
	// override to idxAfterBuildRendering to apply displayMode, placement,
	// and profile after we have a dom node.  Also, modifies the button
	// DOM to get screen readers to ignore the value node if the role & waiRole
	// are not set and the value node is being rendered off screen and the value
	// node is not the focus node.  TODO(bcaceres): file defect against dojo
	buttonProto.idxAfterBuildRendering = function() {
		if (afterBuildRendering) afterBuildRendering.call(this);
		
		// reapply these once we are sure we have a dom node
		if (this._displayMode) {
			this._applyDisplayMode(this._displayMode);
		}
		if (this._placement) {
			this._applyPlacement(this._placement);
		}
		if (this._profile) {
			this._applyProfile(this._profile);
		}
		if ((this.valueNode) && (this.valueNode != this.focusNode)
				&& (dDomClass.contains(this.valueNode, "dijitOffScreen"))
				&& (!iString.nullTrim(dDomAttr.get(this.valueNode, "role")))
				&& (!iString.nullTrim(dDomAttr.get(this.valueNode, "wairole")))) {
			// get the screen readers to ignore the value node
			dDomAttr.set(this.valueNode, {role: "presentation", wairole: "presentation"});
		}
	};
	
	
	dLang.extend(dButton, /**@lends idx.form.buttons# */{	
	/**
	 * @public
	 * @field
	 * @descritpion Sets the idxBaseClass so we can be aware of all button-derived widgets.
	 * @default "idxButtonDerived"
	 */
	idxBaseClass: "idxButtonDerived",
	
	/**
	 * <p>The buttonType can be used to provide a default "iconClass" and "label" if an 
	 * explicit one is not defined.  Certain button types also provide automatic 
	 * toggling of the icon and label through a series of possibilities (usually two)
	 * with each click of the button.  This is useful for buttons that change state
	 * when clicked (e.g.: "maximize / restore" or "filter / clear filter")
	 * </p>
	 *
	 * <p>Possible values are:
	 *	<ul><li>"close"</li>
	 *      <li>"configure"</li>
	 *      <li>"edit"</li>
	 *      <li>"filter"</li>
	 *      <li>"clearFilter"</li>
	 *      <li>"toggleFilter"</li>
	 *      <li>"help"</li>
	 *      <li>"info"</li>
	 *      <li>"minimize"</li>
	 *      <li>"maximize"</li>
	 *      <li>"print"</li>
	 *      <li>"refresh"</li>
	 *      <li>"restore"</li>
	 *      <li>"maxRestore"</li>
	 *      <li>"nextPage"</li>
	 *      <li>"previousPage"</li>
	 *      <li>"lastPage"</li>
	 *      <li>"firstPage"</li>
	 *  </ul>
	 * </p>
	 * @public
	 * @field
	 */
	buttonType: "",
	
	/**
	 * <p>
	 * The placement can be used to indicate the location of a button to help
	 * provide a hint for styling it in some themes.  The placement can also
	 * govern the default "displayMode" and "profile" if not explicitly set 
	 * otherwise.
	 * </p>
	 * <p>The possible values for placement are:
     *	<ul><li>"primary"</li>
     *	    <li>"secondary"</li>
     *	    <li>"special"</li>
     *	    <li>"toolbar"</li>
     *  </ul></p>
     *   
	 * @public
	 * @field
     */
	placement: "",
	
	/**
	 * <p>
	 * The display mode controls whether to show the icon, label, or both.
	 * If not set then the default for the specified "placement" is used.
	 * </p>
	 *
	 * <p>The possible values for displayMode are:
     *	<ul><li>"labelOnly"</li>
     *		<li>"iconOnly"</li>
     *	    <li>"iconAndLabel"</li>
     *  </ul></p>
     *   
	 * @public
	 * @field
	 */
	displayMode: "",
	
	/**
	 * <p>
	 * The profile controls the minimum size for the button in some themes.
	 * If not set then the default for the specified "placement" is used.
	 * </p>
	 *
	 * <p>The possible values for profile are:
     * 	<ul><li>"standard"</li>
     * 	    <li>"compact"</li>
     *  </ul></p>
     *
	 * @public
	 * @field
	 */
	profile: "",
	
	/**
	 * The character symbol to show for an icon in high-contrast mode.  This
	 * symbol will be hidden (in favor of the actual icon) if not in high-contrast
	 * mode.
	 * @public
	 * @field
	 * @default ""
	 */
	iconSymbol: "",
	
	/**
	 * Setter function for the iconSymbol attribute.
	 * 
	 * @private
	 */
	_setIconSymbolAttr: function(symbol) {
		// setup the explicit iconClass if starting up
		if ((!this._started) && (! ("_explicitIconSymbol" in this)) && (this.params) 
				&& ("iconSymbol" in this.params)) {
			this._explicitIconSymbol = this.params.iconSymbol;
		}
				
		// determine the explicit value so we can revert if button type removed
		var abt = this._applyingButtonType;
		this._applyingButtonType = false; // clear the flag
		if (! abt) {
			this._explicitIconSymbol = symbol;			  
		} else {
			var eis = this._explicitIconSymbol;
			if (iString.nullTrim(eis)) {
				// we have an explicit symbol -- ignore button type symbol
				this.iconSymbol = eis;
				symbol = eis;
			}
		}

		// set the symbol		
		this.iconSymbol = symbol;
		this._applyIconSymbol(symbol);
		
		if ((!abt) && (! iString.nullTrim(this.iconSymbol))
			&& (this._buttonTypes)) {
			var bt = this._buttonTypes[this._toggleIndex];
			this._applyButtonTypeIconSymbol(bt);
		}

	},
	
	/**
	 * Internal method to apply the icon symbol.
	 *
	 * @private
	 */
	_applyIconSymbol: function(symbol) {
		if (iString.nullTrim(symbol)) {
			if (!this._iconSymbolNode) {
				this._iconSymbolNode = dDomConstruct.create("div", {"class":"idxButtonIconSymbol"}, this.iconNode);
				dDomClass.add(this.domNode, "idxButtonHasIconSymbol");
			}
			this._iconSymbolNode.innerHTML = iHTML.escapeHTML(symbol);
			
		} else {
			if (this._iconSymbolNode) {
				dDomConstruct.destroy(this._iconSymbolNode);
				dDomClass.remove(this.DomNode, "idxButtonHasIconSymbol");
				delete this._iconSymbolNode;
			} 
		}
	},
	
	/**
	 * Applies the icon symbol for the button type.
	 * @private
	 */
	_applyButtonTypeIconSymbol: function(buttonType) {
		var symbols = buttonType.iconSymbol;
		var symbol  = "";
		if (symbols) {
			if (dLang.isString(symbols)) {
				symbol = symbols;
			} else {
				var ltr = this.isLeftToRight();
				symbol = symbols[(ltr ? 0 : 1)];	
			}
		}		
		if (!symbol) symbol = "";
		this._applyingButtonType = true;
		this.set("iconSymbol", symbol);
		this._applyingButtonType = false;		
			
	},
	
	/**
	 * @private
	 */
	_getIDXResources: function() {
	  if (!this._idxResources) {
		  this._idxResources = iResources.getResources("idx/form/buttons", this.lang);
	  }
	  return this._idxResources;
	},
	
	/**
	 * @private
	 */
	_removeButtonType: function() {
		var iconClass = ("_explicitIconClass" in this) ? this._explicitIconClass : "";
		var label = ("_explicitLabel" in this) ? this._explicitLabel : "";
		
		this.set("iconClass", iconClass);
		this.set("label", label);
	},
	
	/**
	 * @private
	 */
	_applyButtonTypeLabel: function(buttonType) {
		var res = this._getIDXResources();
		var btLabel = res[buttonType.labelKey];
		if (!btLabel) btLabel = "";
		
		this._applyingButtonType = true;
		this.set("label", btLabel);
		this._applyingButtonType = false;		
	},
	
	/**
	 * @private
	 */
	_applyButtonTypeIconClass: function(buttonType) {
		var btIconClass = buttonType.iconClass;
		if (!btIconClass) btIconClass = "";
		this._applyingButtonType = true;
		this.set("iconClass", btIconClass);
		this._applyingButtonType = false;		
	},
	
	/**
	 * @private
	 */
	_applyButtonTypeTitle: function(buttonType) {
		var res = this._getIDXResources();
		var btTitle = res[buttonType.titleKey];
		if (!btTitle) btTitle = "";
		
		this._applyingButtonType = true;
		this.set("title", btTitle);
		this._applyingButtonType = false;		
	},
	
	/**
	 * @private
	 * Sets the button type which will override the label and icon class.
	 */
	_applyButtonType: function(buttonType) {
		this._applyButtonTypeLabel(buttonType);
		this._applyButtonTypeIconClass(buttonType);
		this._applyButtonTypeIconSymbol(buttonType);		
		this._applyButtonTypeTitle(buttonType);
	},
	
	/**
	 * @private
	 */
	_applyDisplayModeShowLabel: function(show) {
		this._applyingDisplayMode = true;
		this.set("showLabel", show);
		this._applyingDisplayMode = false;
	},

	/**
	 * Sets the button type which will override the label and icon class.
	 * @private
	 */
	_applyDisplayMode: function(displayMode) {
		this._displayMode = displayMode;
		var showLabel     = displayMode.showLabel;
		var showIcon      = displayMode.showIcon;
		var cssClass      = displayMode.cssClass;
		
		if (cssClass) dDomClass.add(this.domNode, cssClass);
		if (!showIcon) dDomClass.add(this.domNode, "idxButtonHideIcon");
		
		this._applyDisplayModeShowLabel(showLabel);
	},
	
	/**
	 * @private
	 */
	_removeDisplayMode: function() {
		if (! this._displayMode) return;
		
		var showLabel = this._displayMode.showLabel;
		var showIcon  = this._displayMode.showIcon;
		var cssClass  = this._displayMode.cssClass;
		
		if (cssClass) dDomClass.remove(this.domNode, cssClass);
		if (!showIcon) dDomClass.remove(this.domNode, "idxButtonHideIcon");
		
		showLabel = ("_explicitShowLabel" in this) ? this._explicitShowLabel : true;
		this.set("showLabel", showLabel);
	},

	/**
	 * @private
	 */
	_applyPlacementDisplayMode: function(placement) {
		var displayMode   = placement.defaultDisplayMode;
		if (! displayMode) displayMode = "";
		
		this._applyingPlacement = true;
		this.set("displayMode", displayMode);
		this._applyingPlacement = false;
	},

	/**
	 * Sets the profile.
	 * @private
	 */
	_applyProfile: function(profile) {
		this._profile = profile;
		var cssClass = profile.cssClass;
		
		if (cssClass) dDomClass.add(this.domNode, cssClass);		
	},
	
	/**
	 * @private
	 */
	_removeProfile: function() {
		if (! this._profile) return;
		
		var cssClass  = this._profile.cssClass;
		
		if (cssClass) dDomClass.remove(this.domNode, cssClass);
	},

	/**
	 * @private
	 */
	_applyPlacementProfile: function(placement) {
		var profile   = placement.defaultProfile;
		if (! profile) profile = "";
		
		this._applyingPlacement = true;
		this.set("profile", profile);
		this._applyingPlacement = false;
	},

	/**
	 * Sets the button type which will override the label and icon class.
	 * @private
	 */
	_applyPlacement: function(placement) {
		this._placement   = placement;
		var cssClass      = placement.cssClass;
		
		if (cssClass) dDomClass.add(this.domNode, cssClass);
		this._applyPlacementDisplayMode(placement);
		this._applyPlacementProfile(placement);
	},
	
	/**
	 * @private
	 */
	_removePlacement: function() {
		if (! this._placement) return;
		
		var cssClass  	= this._placement.cssClass;
		var displayMode	= this._placement.defaultDisplayMode;
		
		if (cssClass) dDomClass.remove(this.domNode, cssClass);
		
		var displayMode = ("_explicitDisplayMode" in this) ? this._explicitDisplayMode : "";
		
		this.set("displayMode", displayMode);
	},
	
	/**
	 * @private
	 */
	_buttonTypeClick: function(e) {
		var buttonTypeState = this.buttonType;
		if (this._toggleButtonTypes && (this._toggleButtonTypes.length > 1)) {
			buttonTypeState = this._toggleButtonTypes[this._toggleIndex];
		}
		this.onButtonTypeClick(e, buttonTypeState);
		this._toggleButtonType();
	},
	
	/**
	 * @public
	 * @function
	 * @description An on-click event added to dijit.form.Button that also communicates the 
	 *              "buttonTypeState" associated with the button type.  For "maxRestore" button 
	 *              type the "buttonTypeState" will either be "maximize" or "restore".  For 
	 *              "toggleFilter" button type the "buttonTypeState" will either be "filter" or 
	 *              "clearFilter".  For non-toggle button types then the button type state is 
	 *              always equal to the button type that was set.
	 * @param {Event} e The event.
	 * @param {String} buttonTypeState The toggle state for the button or the button type itself.
	 */
	onButtonTypeClick: function(/*Event*/ e, /*String*/ buttonTypeState) {
		
	},
	
	/**
	 * @private
	 */
	_buttonTypeDblClick: function(e) {
		var buttonTypeState = this.buttonType;
		if (this._toggleButtonTypes && (this._toggleButtonTypes.length > 1)) {
			buttonTypeState = this._toggleButtonTypes[this._toggleIndex];
		}
		this.onButtonTypeDblClick(e, buttonTypeState);
		this._toggleButtonType();
	},
	
	/**
	 * @public
	 * @function
	 * @description An on-double-click event added to dijit.form.Button that also communicates the 
	 *              "buttonTypeState" associated with the button type.  For "maxRestore" button type
	 *              the "buttonTypeState" will either be "maximize" or "restore".  For "toggleFilter" 
	 *              button type the "buttonTypeState" will either be "filter" or "clearFilter".  For
	 *              non-toggle button types then the button type state is always equal to the button 
	 *              type that was set.
	 * @param {Event} e The event.
	 * @param {String} buttonTypeState The toggle state for the button or the button type itself.
	 * 
	 */
	onButtonTypeDblClick: function(/*Event*/ e, /*String*/ buttonTypeState) {
		
	},
	
	/**
	 * @private
	 */
	_toggleButtonType: function() {
		if ((! this._buttonTypes) || (this._buttonTypes.length < 2)) return;

		// get the old button type and remove it
		var oldBT = this._buttonTypes[this._toggleIndex];
		this._removeButtonType(oldBT);
		
		// increment the index
		this._toggleIndex++;
		if (this._toggleIndex >= this._buttonTypes.length) this._toggleIndex = 0;
		
		// get the new button type and apply it
		var newBT = this._buttonTypes[this._toggleIndex];
		this._applyButtonType(newBT);
	},
	
	/**
	 * @private
	 */
	_setButtonTypeAttr: function(/*String*/ buttonType) {
		// attach to "onClick"
		if (!this._hasButtonTypeClickHandle) {
			this._hasButtonTypeClickHandle = true;
			var callback = dLang.hitch(this, this._buttonTypeClick);
			this.own(dAspect.after(this, "onClick", callback, true));
		}	
		if (!this._hasButtonTypeDblClickHandle) {
			this._hasButtonTypeDblClickHandle = true;
			var callback = dLang.hitch(this, this._buttonTypeDblClick);
			this.own(dAspect.after(this, "onDblClick", callback, true));
		}
		// set the button type
		this.buttonType = dString.trim(buttonType);
		var sbt = iButtons._stdButtonTypes;
	    var bt = sbt[buttonType];
		if (this._buttonTypes) {
			var currentBT = this._buttonTypes[this._toggleIndex];
		
			this._buttonTypes = null;
			this._removeButtonType(currentBT);
		}
		if (bt) {
			if (bt.toggleButtonTypes) {
				this._buttonTypes = [ ];
				var tbt = bt.toggleButtonTypes;
				for (var index = 0; index < tbt.length; index++) {
					var btName = tbt[index];
					this._buttonTypes.push(sbt[btName]);
				}
				this._toggleButtonTypes = bt.toggleButtonTypes;
			} else {
				this._buttonTypes = [ bt ];
				this._toggleButtonTypes = [ this.buttonType ]; 
			}
			
			this._toggleIndex = 0;
		 
		  var currentBT = this._buttonTypes[this._toggleIndex];
		  this._applyButtonType(currentBT);
		  
	    } else{
	    	this._buttonTypes = null;
	    }
	    
	},
	
	/**
	 * @private
	 */
	_setPlacementAttr: function(/*String*/ placement) {
		// remove the current placement if any
		this._removePlacement();
		
		// set the placement key
		this.placement = placement;
		
		// lookup the actual placement if we have a key
		if (this.placement) {
			var newPlacement = iButtons._buttonPlacements[this.placement];
			
			// if an actual display mode exists for key then apply it
			if (newPlacement) {
				this._applyPlacement(newPlacement);
			}
		}		
	},
	
	/**
	 * @private
	 */
	_setDisplayModeAttr: function(/*String*/ displayMode) {
		// setup the explicit display mode if starting up
		if ((!this._started) && (! ("_explicitDisplayMode" in this)) && (this.params) && ("displayMode" in this.params)) {
			this._explicitDisplayMode = this.params.displayMode;
		}
		
		// check if we are applying the placement
		var ap = this._applyingPlacement;
		this._applyingPlacement = false; // clear the flag
		
		
		if (! ap) {
			// if not applying placement, then store the value
			this._explicitDisplayMode = displayMode;
		} else {
			var edm = this._explicitDisplayMode;
			if (iString.nullTrim(edm)) {
				// we have an explicit display mode -- ignore placement display mode
				displayMode = edm;
				this.displayMode = edm;
			}
		}

		// remove the old display mode (does nothing if none)
		this._removeDisplayMode();
		
		// set the display mode text key
		this.displayMode = displayMode;
		
		// lookup the actual display mode if we have a key
		if (this.displayMode) {
			var newDM = iButtons._displayModes[this.displayMode];
			this._displayMode = newDM;
			
			// if an actual display mode exists for key then apply it
			if (newDM) {
				this._applyDisplayMode(newDM);
			}
		}
		if ((!ap) && (! iString.nullTrim(this.displayMode))
			&& (this._placement)) {
			this._applyPlacementDisplayMode(this._placement);
		}
		
	},
	
	/**
	 * @private
	 */
	_setProfileAttr: function(/*String*/ profile) {
		// setup the explicit profile if starting up
		if ((!this._started) && (! ("_explicitProfile" in this)) && (this.params) && ("profile" in this.params)) {
			this._explicitProfile = this.params.profile;
		}
		
		// check if we are applying the placement
		var ap = this._applyingPlacement;
		this._applyingPlacement = false; // clear the flag
		
		
		if (! ap) {
			// if not applying placement, then store the value
			this._explicitProfile = profile;
		} else {
			var ep = this._explicitProfile;
			if (iString.nullTrim(ep)) {
				// we have an explicit profile -- ignore placement profile
				profile = ep;
				this.profile = ep;
			}
		}

		// remove the old profile (does nothing if none)
		this._removeProfile();
		
		// set the profile text key
		this.profile = profile;
		
		// lookup the actual profile if we have a key
		if (this.profile) {
			var newProf = iButtons._buttonProfiles[this.profile];
			this._profile = newProf;
			
			// if an actual profile exists for key then apply it
			if (newProf) {
				this._applyProfile(newProf);
			}
		}
		if ((!ap) && (! iString.nullTrim(this.profile))
			&& (this._placement)) {
			this._applyPlacementProfile(this._placement);
		}
		
	},

	/**
	 * @private
	 */
	_killEvent: function(e) {
		if (e) dEvent.stop(e);
	}
}); // end dojo.extend
	
	return iButtons;
	
});
},
'idx/ext':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2011, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 * @name idx.ext
 * @class This module is a placeholder to automatically require all "extension" modules
 *        from IDX.  Extensions modules typically perform prototype modification of the
 *        Dojo modules to either work around known defects (often with respect to BiDi or
 *        a11y) or to add features or additional styling capabilities to the base dojo 
 *        widgets.
 */
define(["dojo/_base/lang",
        "idx/main",
        "./widgets",
        "./containers",
        "./trees",
        "./form/formWidgets",
        "./form/buttons",
        "./form/comboButtons",
        "./form/dropDownButtons",
        "./grid/treeGrids",
        "dijit/_base/manager"],  // temporarily resolves parser issue with dijit.byId
        function(dLang,iMain) {
	return dLang.getObject("ext", true, iMain);
});

},
'idx/widget/Dialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"require",
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/connect", // connect._keypress
	"dojo/_base/declare", // declare
	"dojo/_base/Deferred", // Deferred
	"dojo/dom", // dom.isDescendant
	"dojo/dom-class", // domClass.add domClass.contains
	"dojo/dom-construct",
	"dojo/dom-geometry", // domGeometry.position
	"dojo/dom-style", // domStyle.set
	"dojo/dom-attr", // attr.has
	"dojo/_base/event", // event.stop
	"dojo/_base/fx", // fx.fadeIn fx.fadeOut
	"dojo/i18n", // i18n.getLocalization
	"dojo/_base/kernel", // kernel.isAsync
	"dojo/keys",
	"dojo/_base/lang", // lang.mixin lang.hitch
	"dojo/on",
	"dojo/ready",
	"dojo/_base/sniff", // has("ie") has("opera")
	"dojo/_base/window", // win.body
	"dojo/window", // winUtils.getBox
	"dijit/focus",
	"dijit/a11y",
	"dijit/_base/manager",	// manager.defaultDuration
	"dijit/Dialog",
	"dijit/form/Button",
	"dojo/text!./templates/Dialog.html",
	"dijit",			// for back-compat, exporting dijit._underlay (remove in 2.0)
	"dojo/i18n!./nls/Dialog"
], function(require, array, connect, declare, Deferred,
			dom, domClass, domConstruct, domGeometry, domStyle, domAttr, event, fx, i18n, kernel, keys, lang, on, ready, has, win, winUtils,
			focus, a11y, manager, Dialog, Button, template, dijit, dialogNls){
	var oneuiRoot = lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2
	
	/**
	 * Creates a new idx.widget.Dialog
	 * @name idx.widget.Dialog
	 * @class idx.widget.Dialog enhanced dijit.Dialog with specified structure following IBM One UI standard
	 * <b><a href="http://mds.torolab.ibm.com/IBM_OneUI/UI_DesignSignature_Workstream/UI_design_signature/9%2E%20%20Forms_Dialog%20Box/VS_DialogBox_BP_Mar-21-12%2Epng">Dialog Box</a></b> 
	 * @augments dijit.Dialog
	 * @example
	 * var dialog = new idx.widget.Dialog({
			id: "dialog",
			title: "Dialog Title",
			instruction: "Instructional information goes here.",
			content: "&lt;div style='height:80px'&gt;Lorem ipsum dolor sit amet, consectetuer adipiscing elit.&lt;/div&gt;",
			reference: {
				name: "Link goes here",
				link: "http://dojotoolkit.org/"
			},
			closeButtonLabel: "Cancel"
		}, "div");
	 */
	var Dialog = declare("idx.widget.Dialog", Dialog, {
	/**@lends idx.widget.Dialog.prototype*/
		templateString: template,
		baseClass: "idxDialog",
		
		draggable: true,
		/**
		 * Dialog title
		 * @type String
		 */
		title: "",
		/**
		 * Dialog instruction, just below the title
		 * @type String
		 */
		instruction: "",
		/**
		 * Dialog content
		 * @type String | dijit.layout.TabContainer
		 */
		content: "",
		/**
		 * Referance link of Dialog, reference.name for link name, and reference.link for link url
		 * @type Object
		 */
		reference: {
			name: "",
			link: ""
		},
		/**
		 * Action buttons for Dialog in the action bar
		 * @type Array [dijit.form.Button]
		 */
		buttons: null,
		/**
		 * Label on Dialog close button
		 * @type String
		 */
		closeButtonLabel: "",
		
		referenceName: "",
		referenceLink: "",
		
		executeOnEnter: true,
		
		postCreate: function(){
			this.inherited(arguments);
			this.closeButton = new Button({
				label: this.closeButtonLabel || dialogNls.closeButtonLabel,
				onClick: lang.hitch(this, function(evt){
					this.onCancel();
					event.stop(evt);
				})
			}, this.closeButtonNode);
			array.forEach(this.buttons, function(button){
				if(button.declaredClass == "dijit.form.Button"){
					if(!domClass.contains(this.closeButton.domNode, "idxSecondaryButton")){
						domClass.add(this.closeButton.domNode, "idxSecondaryButton");
					}
					domConstruct.place(button.domNode, this.closeButton.domNode, "before");
				}
			}, this);
		},
		startup: function(){
			this.inherited(arguments);
			//display content and make it as tab stop
			if(this.containerNode.innerHTML || this.href){
				domAttr.set(this.containerNode, "tabindex", 0);
				domStyle.set(this.contentWrapper, "display", "block");
			}
			//re-style content if it's a tabcontainer
			if(this.containerNode.children[0] && 
			domClass.contains(this.containerNode.children[0], "dijitTabContainer")){
				domStyle.set(this.contentWrapper, {
					borderTop: "0 none",
					paddingTop: "0"
				});
			}
		},
		_size: function(){
			this.inherited(arguments);
			//resize the Dialog to wrap the content
			var children = this.containerNode.children,
				innerWidth = 0;
			array.forEach(children, function(child){
				innerWidth = Math.max(domStyle.get(child, "width"), innerWidth);
			});
			if(innerWidth > domStyle.get(this.containerNode, "width")){
				domStyle.set(this.domNode, {
					width:"auto"
				});
				domStyle.set(this.containerNode, {
					width:"auto",
					height:"auto"
				})
			}
		},
		/*_onKey: function(evt){
			this.inherited(arguments);
			if(!this.executeOnEnter){return;}
			var node = evt.target;
			if(domAttr.has(node, "href")){return;}
			if(node == this.closeButton.domNode){return;}
			while(node){
				if(node == this.domNode || domClass.contains(node, "dijitPopup")){
					if(evt.keyCode == keys.ENTER){
						if(this.isValid()){
							this.onExecute();
						}else{
							this.validate();
						}
					}else{
						return; // just let it go
					}
				}
				node = node.parentNode;
			}
			event.stop(evt);
		},*/
		_getFocusItems: function(){
			//	summary:
			//		override _DialogMixin._getFocusItems.
			if(this._firstFocusItem){
				this._firstFocusItem = this._getFirstItem();
				if(!this._firstFocusItem){
					var elems = a11y._getTabNavigable(this.containerNode);
					this._firstFocusItem = elems.lowest || elems.first || this.closeButton.focusNode || this.domNode;
				}
				return;
			}
			var elems = a11y._getTabNavigable(this.containerNode);
			this._firstFocusItem = elems.lowest || elems.first || this.closeButton.focusNode;
			this._lastFocusItem = this.closeButton.focusNode;
		},
		hide: function(){
			var promise = this.inherited(arguments);
			this._firstFocusItem = null;
			return promise;
		},
		_getFirstItem: function(){
			if(this.title){return this.titleNode;}
			if(this.instruction){return this.instructionNode;}
			return null;
		},
		_setTitleAttr: function(title){
			this.titleNode.innerHTML = title;
			domAttr.set(this.titleNode, "tabindex", title ? 0 : -1);
		},
		_setInstructionAttr: function(instruction){
			this.instructionNode.innerHTML = instruction;
			domAttr.set(this.instructionNode, "tabindex", instruction ? 0 : -1);
		},
		_setContentAttr: function(content){
			this.inherited(arguments);
			var isEmpty = this.containerNode.innerHTML;
			domAttr.set(this.containerNode, "tabindex", isEmpty ? 0 : -1);
			domStyle.set(this.contentWrapper, "display", isEmpty ? "block" : "none");
		},
		_setReferenceAttr: function(reference){
			this.reference = reference;
			this.referenceName = (this.reference && this.reference.name) ? this.reference.name : "";
			this.referenceLink = (this.reference && this.reference.link) ? this.reference.link : "";
			this._updateReferenceLink();
		},
		_setReferenceNameAttr: function(name){
			this.referenceName = name;
			this._updateReferenceLink();
		},
		_setReferenceLinkAttr: function(link){
			this.referenceLink = link;
			this._updateReferenceLink();
		},
		_updateReferenceLink: function(){
			var referenceLinkNodeHidden = !this.referenceLink || !this.referenceName;
			domClass.toggle(this.referenceNode, "referenceLinkHidden", referenceLinkNodeHidden);
			domAttr.set(this.referenceNode, {
				"href": referenceLinkNodeHidden ? "about:blank": this.referenceLink, 
				innerHTML: referenceLinkNodeHidden ? "NO LINK" : this.referenceName
			});
		}
	});

	// Back compat w/1.6, remove for 2.0
	if(!kernel.isAsync){
		ready(0, function(){
			var requires = ["dijit/TooltipDialog"];
			require(requires);	// use indirection so modules not rolled into a build
		});
	}

	// for IDX 1.2 compatibility
	oneuiRoot.Dialog = Dialog;
	
	return Dialog;
});

},
'idx/string':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/string"], function (dLang,iMain,dString)
{
    /**
 	 * @name idx.string
 	 * @namespace Provides Javascript utility methods in addition to those provided by Dojo.
 	 */
	var iString = dLang.getObject("string", true, iMain);
	
	/**
	 * @public 
	 * @function
	 * @name idx.string.startsWith
	 * @description Checks if the specified text starts with the specified prefix.
	 * @param {String} text The text to look at.
	 * @param {String} prefix The prefix to check for.
	 * @returns {Boolean} Return true if string "text" starts with "prefix"
	 */
	iString.startsWith = function(/*string*/ text, /*string*/ prefix){
		return (dLang.isString(text) && dLang.isString(prefix) && text.indexOf(prefix) === 0); // Boolean
	};
	
	/**
	 * @public 
	 * @function
	 * @name idx.string.endsWith
	 * @description Checks if the specified text ends with the specified suffix.
	 * @param {String} text The text to look at.
	 * @param {String} suffix The suffix to check for.
	 * @returns {Boolean} Return true if string "text" ends with "suffix"
	 */
	iString.endsWith = function(/*string*/ text, /*string*/ suffix){
		return (dLang.isString(text) && dLang.isString(suffix) && text.lastIndexOf(suffix) === text.length - suffix.length); // Boolean
	};

	/**	
	 * @public 
	 * @function
	 * @name idx.string.equalsIgnoreCase
	 * @description Case insensitive check for string equality.
	 * @param {String} s1 The first string.
	 * @param {String} s2 The second string.
	 * @returns {Boolean} Return true if string "s1" equals to "s2" with ignoring case
	 */
	iString.equalsIgnoreCase = function(/*string*/ s1, /*string*/ s2){
		return (dLang.isString(s1) && dLang.isString(s2) && s1.toLowerCase() === s2.toLowerCase()); // Boolean
	};
	
	/**	
	 * @public 
	 * @function
	 * @name idx.string.isNumber
	 * @description Checks if the specified parameter is a number and is finite.
	 * @param {Number} n The value to check.
	 * @returns {Boolean} Return true if 'n' is a Number
	 */
	iString.isNumber = function(/*number*/ n){
		return (typeof n == "number" && isFinite(n)); // Boolean
	};
	
	/**
	 * @public 
	 * @function
	 * @name idx.string.nullTrim
	 * @description Trims the specified string, and if it is empty after trimming, returns null.  
	 *              If the specified parameter is null or undefined, then null is returned.
	 * @param {String} str the string to trim
	 * @returns {String} Trimmed string or null if nothing left
	 */
    iString.nullTrim = function(/*String*/ str) {
            if (! str) return null;
            var result = dString.trim(str);
            return (result.length == 0) ? null : result;
        };
        
     /**
	 * @public 
	 * @function
	 * @name idx.string.propToLabel
	 * @description Converts a property name that is typically separated by camel case into a
	 *              psuedo label (i.e.: one that is not translated but based off the property
	 *              name but formatted nicer).  This method converts dots/periods into slashes. 
	 * @param {String} propName The property name to convert.
	 * @returns {String} The converted psuedo-label.
      *
      */
     iString.propToLabel = function(/*String*/ propName) {
     	if (!propName) return propName;
     	
	    // split the property name at any case switches or underscores
	    propName = dString.trim(propName);
	    var upperProp = propName.toUpperCase();
	    var lowerProp = propName.toLowerCase();
	    var index = 0;
	    var result = "";
	    var prevResult = "";
	    var prevUpper = false;
	    var prevLower = false;

		for (index = 0; index < propName.length; index++) {
	    	var upperChar = upperProp.charAt(index);
	        var lowerChar = lowerProp.charAt(index);
	        var origChar  = propName.charAt(index);

	        var upper = ((upperChar == origChar) && (lowerChar != origChar));
	        var lower = ((lowerChar == origChar) && (upperChar != origChar));

	        // check for spaces or underscores
	        if ((origChar == "_") || (origChar == " ")) {
	        	if (prevResult == " ") continue;
	         	prevResult = " ";
	            prevUpper  = upper;
	            prevLower  = lower;
	            result = result + prevResult;
	            continue;
	        }
	           
	        // check for dot notation
	        if (origChar == ".") {
	        	prevResult = "/";
	        	prevUpper = upper;
	        	prevLower = lower;
	        	result = result + " " + prevResult + " ";
	        	continue;
	        }

	        // check if this is the first character
	        if ((index == 0) || (prevResult == " ")) {
	        	prevResult = upperChar; 
	            prevUpper  = upper;
	            prevLower  = lower;
	            result = result + prevResult;
	            continue;
	        }

	        if ((!upper) && (!lower)) {
	        	if (prevUpper || prevLower) {
	            	result = result + " ";
	            }

	            // the character is not alphabetic, and neither is this one
	            prevUpper = upper;
	            prevLower = lower;
	            prevResult = origChar;

	            result = result + prevResult;
	            continue;
	        }

	        if ((!prevUpper) && (!prevLower)) {
	        	// previous character was non-alpha, but this one is alpha
	        	var prevSlash = (prevResult == "/");
	            prevUpper = upper;
	            prevLower = lower;
	            prevResult = upperChar;
	            if (prevSlash) {
	            	result = result + prevResult;
	            } else {
	            	result = result + " " + prevResult;
	            }
	            continue;
	        }

	        // if we get here then both the previous and current character are
	        // alphabetic characters so we need to detect shifts in case
	        if (upper && prevLower) {
	        	// we have switched cases
	            prevResult = upperChar;
	            prevUpper  = upper;
	            prevLower = lower;
	            result = result + " " + prevResult;
	            continue;
	        }

	        // if we get here then we simply use the lower-case version
	        prevResult = lowerChar;
	        prevUpper  = upper;
	        prevLower  = lower;
	        result = result + prevResult;
	 	}
	    
	    // return the result
	    return result;        
     };
     
     return iString;
});

},
'idx/widget/nls/ModalDialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define({ root:
//begin v1.x content
({
	Error: "Error",
	Warning: "Warning",
	Information: "Information",
	Success: "Success",
	Confirmation: "Confirmation",
	Question: "Question",
	Progress: "Progress",
	closeButtonLabel: "Close",
	cancelButtonLabel: "Cancel",
	executeButtonLabel: "OK",
	checked: "Do not ask again"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});
},
'idx/app/nls/LoginFrame':function(){
define({root:
//begin v1.x content
({
	loginTitle: "Login",
	labelUserName: "User name",
	labelPassword: "Password",
	invalidMessageTitle: "Invalid Login Attempt",
	invalidMessage: "A valid value has not been entered in both required fields."
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});

},
'idx/html':function(){
define([
	"idx/main",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom-geometry"
], function (iMain,
			 dLang,
			 dWindow,
			 dDomConstruct,
			 dDomGeo) {
	
/**
 * @name idx.html
 * @namespace Provides convenient functions to handle HTML and DOM.
 */
	var iHTML = dLang.getObject("html", true, iMain);

/**
 * @public
 * @function
 * @name idx.html.getOffsetPosition
 * @description Obtains position of a node from the specified root node.
 * @param {Element} node
 * @param {Element} root If omitted, body is used.
 * @returns {Object} position with "l" and "t" properties
 */
	iMain.getOffsetPosition = iHTML.getOffsetPosition = function(node, root) {
		root = root || dWindow.body();
		var n = node;
		
		var l = 0;
		var t = 0;
		
		while (n != root) {
			l += n.offsetLeft;
			t += n.offsetTop;
			n = n.offsetParent;
		}
		return {l: l, t: t};
	};
	
/**
 * @public
 * @function
 * @name idx.html.containsNode
 * @description Tests whether a node contains another node as its descendant.
 * @param {Element} parent Possible ancestor
 * @param {Element} node Possible descendant
 * @returns {Boolean}
 */
	iMain.containsNode = iHTML.containsNode = function(parent, node) {
		var n = node;
		while (n && n != dWindow.body()) {
			if (n == parent) {
				return true;
			}
			if (n.parentNode) {
				n = n.parentNode;	
			} else {
				break;
			}
		}
		return false;
	};
	
/**
 * @public
 * @function
 * @name idx.html.containsCursor
 * @description Tests whether a node contains the mouse cursor of an event.
 * @param {Element} node
 * @param {Event} evt
 * @returns {Boolean}
 */
	iMain.containsCursor = iHTML.containsCursor = function(node, evt) {
		var pos = dDomGeo.position(node);
		var l = pos.x;
		var t = pos.y;
		var r = l + pos.w;
		var b = t + pos.h;
		var cx = evt.clientX;
		var cy = evt.clientY;
		
		var contained = cx > l && cx < r && cy > t && cy < b;
		return contained;
	};
	
/**
 * @public
 * @function
 * @name idx.html.setTextNode
 * @description Creates single child of text node with the specified string.
 * @param {Element} node
 * @param {String} text
 */
	iMain.setTextNode = iHTML.setTextNode = function(/*node*/ node, /*string*/ text){
		if(!node){
			return;
		}
		dDomConstruct.place(dWindow.doc.createTextNode(text), node, "only");
	};
	
/**
 * @public
 * @function
 * @name idx.html.escapeHTML
 * @description Converts a string escaping HTML special characters (<>&").
 * @param {String} s
 * @returns {String}
 */
	iMain.escapeHTML = iHTML.escapeHTML = function(/*string*/ s){
		if(!dLang.isString(s)){
			return s;
		}
		return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
	};
	
/**
 * @public
 * @function
 * @name idx.html.unescapeHTML
 * @description Converts a string with restoring character entities for HTML special characters (<>&").
 * @param {String} s
 * @returns {String}
 */
	iMain.unescapeHTML = iHTML.unescapeHTML = function(/*string*/s){
		if(!dLang.isString(s)){
			return s;
		}
		return s.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,"\"").replace(/&amp;/g,"&");
	};

	return iHTML;

});

},
'idx/form/comboButtons':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/dom-attr","dojo/dom-class","dijit/form/ComboButton","../widgets"],
		function(dLang,			// (dojo/_base/lang)
				 iMain,			// (idx)
				 dDomAttr,		// (dojo/dom-attr) for (dDomAttr.set)
				 dDomClass,		// (dojo/dom-class) for (dDomClass.add/remove)
				 dComboButton) 	// (dijit/form/ComboButton)
{
	/**
	 * @name idx.form.comboButtons
	 * @class Extension to dijit.form.ComboButton to add the "idxDropDownOpen" CSS class whenever
	 *        the ComboButton is opened to allow for alternate styling when the ComboButton is in the 
	 *        open state.  This also adds proper tab stops in ComboButtons for keyboard navigation.
	 *        This is included with "idx.ext".
	 */
	var iComboButtons = dLang.getObject("form.comboButtons", true, iMain);
	
	// get the combo button prototype
    var comboProto  = dComboButton.prototype;
    
	// 
	// Get the base functions so we can call them from our overrides
	//
	var baseComboOpen  = comboProto.openDropDown;
	var baseComboClose = comboProto.closeDropDown;
	
	/**
	 * Overrides dijit.form.Button.buildRendering to respect CSS options.
	 */
	if (baseComboOpen) {
		comboProto.openDropDown = function() {
			var result = baseComboOpen.apply(this, arguments);
			if (this._opened) dDomClass.add(this.domNode, "idxDropDownOpen");
			return result;
		};
	};
	
	if (baseComboClose) {
		comboProto.closeDropDown = function(focus) {
			var result = baseComboClose.apply(this, arguments);
			dDomClass.remove(this.domNode, "idxDropDownOpen");
			return result;
		};
	};
	
	var afterBuildRendering = comboProto.idxAfterBuildRendering;
	comboProto.idxAfterBuildRendering = function() {
		if (afterBuildRendering) {
			afterBuildRendering.call(this);
		}
		if (this.titleNode) {
			dDomAttr.set(this.titleNode, "tabindex", ((this.tabIndex) ? (""+this.tabIndex) : "0"));
		}
		if (this._buttonNode) {
			dDomAttr.set(this._buttonNode, "tabindex", ((this.tabIndex) ? (""+this.tabIndex) : "0"));
		}		
	};
	return iComboButtons;
});	

},
'idx/widget/nls/base':function(){
define({root:
//begin v1.x content
({

})
//end v1.x content
});

},
'idx/form/nls/buttons':function(){
define({root:
//begin v1.x content
({
	closeLabel: "Close",
	configureLabel: "Configure",
	editLabel: "Edit",
	filterLabel: "Filter",
	clearFilterLabel: "Clear",
	helpLabel: "Help",
	infoLabel: "Info",
	minimizeLabel: "Minimize",
	maximizeLabel: "Maximize",
	printLabel: "Print",
	refreshLabel: "Refresh",
	restoreLabel: "Restore",
	nextPageLabel: "Next",
	previousPageLabel: "Previous",
	lastPageLabel: "Last",
	firstPageLabel: "First",
		
	closeTip: "Close",
	configureTip: "Configure",
	editTip: "Edit",
	filterTip: "Filter",
	clearFilterTip: "Clear Filter",
	helpTip: "Get Help",
	infoTip: "Get Information",
	minimizeTip: "Minimize",
	maximizeTip: "Maximize",
	printTip: "Print",
	refreshTip: "Refresh",
	restoreTip: "Restore",
	nextPageTip: "Next Page",
	previousPageTip: "Previous Page",
	lastPageTip: "Last Page",
	firstPageTip: "First Page"
})
//end v1.x content
,
"zh": true,
"zh-tw": true,
"tr": true,
"th": true,
"sv": true,
"sl": true,
"sk": true,
"ru": true,
"ro": true,
"pt": true,
"pt-pt": true,
"pl": true,
"nl": true,
"nb": true,
"ko": true,
"kk": true,
"ja": true,
"it": true,
"hu": true,
"fr": true,
"fi": true,
"es": true,
"el": true,
"de": true,
"da": true,
"cs": true,
"ca": true,
"ar": true,
"bg": true,
"he": true,
"hr": true,
"uk": true
});

},
'idx/widgets':function(){
﻿/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang",
        "idx/main",
        "dojo/dom",	
        "dojo/dom-class",			
        "dijit/_WidgetBase",
        "dijit/_base/manager",
        "./string", 
        "./util"],
        function(dLang,			// (dojo/_base/lang)
				 iMain,			// (idx)
		 		 dDom, 			// (dojo/dom) for (dDom.byId)
				 dDomClass, 	// (dojo/dom-class) for (dDomClass.add/remove)
				 dWidget,		// (dijit/_WidgetBase)
				 dijitMgr,		// (dijit/_base/manager)
				 iString,		// (idx/string)
				 iUtil) 		// (idx/util)
{
	/**
 	 * @name idx.widgets
 	 * @class Provides extensions for all descendants of dijit._WidgetBase.
 	 */
	var iWidgets = dLang.getObject("widgets", true, iMain);
	
	dLang.extend(dWidget, 
	/**@lends idx.widgets#*/{	
	/**
	 * Used for when the the default dijit base class needs to be left 
	 * unmodified, but a child widget or extension needs its a separate
	 * base class with an "idx" prefix. 
	 *
	 * @field
	 * @type String
	 * @default ""
	 */
	idxBaseClass: "",
	
	/**
	 * A comma-separated list of additional CSS class names to add to the DOM node
	 * of this widget.
	 * @field
	 * @type String
	 * @default ""
	 */
	idxExtraClasses: "",
	
	/**
	 * The explicit CSS class to be used for finding the CSS defaults for
	 * the widget.
	 *
	 * @field
	 * @type String
	 * @default ""
	 */
	idxDefaultsClass: "",
	
	/**
	 * The CSS defaults to use of high-contrast mode is detected (i.e.: no background image found).
	 * This can be an Object containing the properties or a String containing a query string.
	 * @field
	 * @type Object|String
	 * @default null
	 */
	idxHCDefaults: null,

	/**
	 * The child class to be applied to children.  This
	 * should not contain spaces or commas and should be
	 * a single CSS class. 
	 *
	 * @field
	 * @type String
	 * @default ""
	 */
	idxChildClass: "",

	/**
	 * The arguments to directly mixin.  This allows you to specify references
	 * to other objects for string properties if you like.  These will get
	 * automatically mixed through the postMixInProperties() implementation, 
	 * so if you override that function make sure to call the inherited 
	 * version before doing other work.
	 *
	 * @field
	 * @type Object
	 * @default null
	 */
	mixinArgs: null,
	
	/**
	 * Called by all widgets prior to the "postMixinProperties" function.
	 * This allows for "postMixinProperties" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @function
	 * @public
	 */
	idxBeforePostMixInProperties: function() {
		// store the original mixin args
		var origMixInArgs = this.mixinArgs;
		
	    // we use a while loop in case the mixin args contain another "mixinArgs"
	    // in such a case there may be a nested mixinArgs 
	    while (this.mixinArgs != null) {
	    	// copy the reference
	    	var args = this.mixinArgs;

	    	// clear the reference
	    	this.mixinArgs = null;

	    	// perform the mixin
	    	dLang.mixin(this, args);
	    	if (! this.params) this.params = {};
	    	dLang.mixin(this.params, args); 
	    }
	     
	    // reset the mixin args back to original settings
	    this.mixinArgs = origMixInArgs;
	    if (this.params) {
	    	this.params.mixinArgs = origMixInArgs;
	    } else {
	    	this.params = { mixinArgs: origMixInArgs };
	    }		
	},
	
	/**
	 * Called by all widgets aftr the "postMixinProperties" function.
	 * This allows for "postMixinProperties" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @function
	 * @public
	 */
	idxAfterPostMixInProperties: function() {
		// do nothing
	},
	
	/**
	 * Called by all widgets prior to the "buildRendering" function.
	 * This allows for "buildRendering" to be overridden while still
	 * maintaining the call to this function.
	 * 
	 * @function
	 * @public
	 */
	idxBeforeBuildRendering: function() {
		// do nothing
	},
	
	/**
	 * Called by all widgets after the "buildRendering" function.
	 * This allows for "buildRendering" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @public
	 * @function
	 */
	idxAfterBuildRendering: function() {
		// apply the IDX base class
		if ((this.domNode) && (iString.nullTrim(this.idxBaseClass))) {
			dDomClass.add(this.domNode, this.idxBaseClass);
		}
		if ((this.domNode) && (iString.nullTrim(this.idxExtraClasses))) {
			var classes = this.idxExtraClasses.split(",");
			for (var index = 0; index < classes.length; index++) {
				var cssClass = classes[index];
				dDomClass.add(this.domNode, cssClass);
			}
		}
	},
	
	/**
	 * Called by all widgets prior to the "postCreate" function.
	 * This allows for "postCreate" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @public
	 * @function
	 */
	idxBeforePostCreate: function() {
		// do nothing
	},
	
	/**
	 * Called by all widgets after the "postCreate" function.
	 * This allows for "postCreate" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @public
	 * @function
	 */
	idxAfterPostCreate: function() {
		// do nothing
	},
	
	/**
	 * Called by all widgets prior to the "startup" function.
	 * This allows for "startup" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @public
	 * @function
	 */
	idxBeforeStartup: function() {
		// do nothing
	},
	
	/**
	 * Called by all widgets after the "startup" function.
	 * This allows for "startup" to be overridden while still
	 * maintaining the call to this function.
	 *
	 * @public
	 * @function
	 */
	idxAfterStartup: function() {
    	var children = this.getChildren();
		
    	// get child nodes that are part of this widget and style them
    	if ((this.domNode) && (iString.nullTrim(this.idxChildClass))) {
    		this._idxStyleChildNodes(this.idxChildClass, this.domNode);
    	}
		
    	// now style the children
    	this._idxStyleChildren();
    },
	
	/**
	 * Private function that is used to replace "postMixInProperties"
	 * in the constructor so that we can ensure the "before" and "after"
	 * functions get called before and after the defined "postMixInProperties"
	 * function.
	 *
	 * @private
	 */
	_idxWidgetPostMixInProperties: function() {
		// ensure we don't clobber the postMixInProperties() function
		if (! ("_idxWidgetOrigPostMixInProperties" in this)) return;
		if (! this._idxWidgetOrigPostMixInProperties) return;
		
		// restore the postMixInProperties() function to its original state
		this.postMixInProperties = this._idxWidgetOrigPostMixInProperties;
		
	    // call the "before" function
	    this.idxBeforePostMixInProperties();
	    
		// proceed with normal postMixInProperties()
		this.postMixInProperties();
		
	    // call the "after" function
	    this.idxAfterPostMixInProperties();
	},
	
	/**
	 * Private function that is used to replace "buildRendering"
	 * in the constructor so that we can ensure the "before" and "after"
	 * functions get called before and after the defined "buildRendering"
	 * function.
	 *
	 * @private
	 */
	_idxWidgetBuildRendering: function() {
		// ensure we don't clobber the buildRendering() function
		if (! ("_idxWidgetOrigBuildRendering" in this)) return;
		if (! this._idxWidgetOrigBuildRendering) return;
		
		// restore the buildRendering() function to its original state
		this.buildRendering = this._idxWidgetOrigBuildRendering;
		
		// call the "before" function
		this.idxBeforeBuildRendering();
		
		// proceed with normal buildRendering()
		this.buildRendering();
		
		// call the "after" function
		this.idxAfterBuildRendering();
	},
	
	/**
	 * Private function that is used to replace "postCreate"
	 * in the constructor so that we can ensure the "before" and "after"
	 * functions get called before and after the defined "postCreate"
	 * function.
	 *
	 * @private
	 */
	_idxWidgetPostCreate: function() {
		// ensure we don't clobber the postCreate() function
		if (! ("_idxWidgetOrigPostCreate" in this)) return;
		if (! this._idxWidgetOrigPostCreate) return;
		
		// restore the postCreate() function to its original state
		this.postCreate = this._idxWidgetOrigPostCreate;
		
		// call the before function
		this.idxBeforePostCreate();
		
		// proceed with normal postCreate()
		this.postCreate();
		
		// call the after function
		this.idxAfterPostCreate();
	},

	/**
	 * Private function that is used to replace "startup"
	 * in the constructor so that we can ensure the "before" and "after"
	 * functions get called before and after the defined "startup"
	 * function.
	 *
	 * @private
	 */	
	_idxWidgetStartup: function() {
		// ensure we don't clobber the startup() function
		if (! ("_idxWidgetOrigStartup" in this)) return;
		if (! this._idxWidgetOrigStartup) return;
		
		// restore the startup() function to its original state
		this.startup = this._idxWidgetOrigStartup;
		
		// call the before function
		this.idxBeforeStartup();
		
		// proceed with normal startup
		this.startup();
		
		// call the after function
		this.idxAfterStartup();
	},
	
	/**
	 * The function for applying classes to the child widgets if the
	 * idxChildClass attribute is non-empty.
	 *
	 * @private
	 */
	_idxStyleChildren: function() {
		if (! iString.nullTrim(this.idxChildClass)) return;
		if (! iString.nullTrim(this.baseClass)) return;

		// find all children that were previously styled
		var prevChildren = this._idxPrevStyledChildren;
		if ((prevChildren) && (prevChildren.length > 0)) {
			var childBase = this._idxPrevChildBase;
			var childClass = childBase + "-idxChild";
			var firstChildClass = childBase + "-idxFirstChild";
			var midChildClass = childBase + "-idxMiddleChild";
			var lastChildClass = childBase + "-idxLastChild";
			var onlyChildClass = childBase + "-idxOnlyChild";
			
			// loop through the previously styled children
			for (var index = 0; index < prevChildren.length; index++) {
				var child = prevChildren[index];
				
				if (! child.domNode) continue;
				if (child._idxUnstyleChildNodes) {
					child._idxUnstyleChildNodes(child.domNode, childBase);
				} else {
					dRemoveClass(child.domNode, childClass);
					dRemoveClass(child.domNode, firstChildClass);
					dRemoveClass(child.domNode, midChildClass);
					dRemoveClass(child.domNode, lastChildClass);
					dRemoveClass(child.domNode, onlyChildClass);
				}
			}
		}
		
		// clear the previous settings
		this._idxPrevStyledChildren = null;
		this._idxPrevChildBase = null;
		
		
		// get the children currently in the container node in order
		var index = 0;
		var children = this.getChildren();
    	if ((children) && (children.length > 0)) {
    		// create the prefix for the child class
    		var childBase = this.baseClass + "-" + this.idxChildClass;
    		var childClass = childBase + "-idxChild";
    		var firstChildClass = childBase + "-idxFirstChild";
    		var midChildClass = childBase + "-idxMiddleChild";
    		var lastChildClass = childBase + "-idxLastChild";
    		var onlyChildClass = childBase + "-idxOnlyChild";
    		
    		// set up the variables for next time to unstyle
    		this._idxPrevStyledChildren = [ ];
    		this._idxPrevChildBase = childBase;

    		// setup the classes
    		for (index = 0; index < children.length; index++) {
    			var child = children[index];
			
    			// check for a dom node
    			if (! child.domNode) continue;
    			this._idxPrevStyledChildren.push(child);
    			
    			// add the appropriate classes to the children
    			if (child._idxStyleChildNodes) child._idxStyleChildNodes(childClass, child.domNode);
    			else dDomClass.add(child.domNode, childClass);

    			if (index == 0) {
    				if (child._idxStyleChildNodes) child._idxStyleChildNodes(firstChildClass, child.domNode);
    				else dDomClass.add(child.domNode, firstChildClass); 
    			}

    			if ((index > 0) && (index < (children.length - 1))) {
    				if (child._idxStyleChildNodes) child._idxStyleChildNodes(midChildClass, child.domNode);
    				else dDomClass.add(child.domNode, midChildClass);
    			}

    			if (index == (children.length - 1)) {
    				if (child._idxStyleChildNodes) child._idxStyleChildNodes(lastChildClass, child.domNode);
    				else dDomClass.add(child.domNode, lastChildClass);
    			}

    			if (children.length == 1) {
    				if (child._idxStyleChildNodes) child._idxStyleChildNodes(onlyChildClass, child.domNode);
    				else dDomClass.add(child.domNode, onlyChildClass);
    			}
    			
    		}
    	}
    	
	},
	
	/**
	 * The function for removing previously applied classes to the child 
	 * widgets if the idxChildClass attribute is non-empty.
	 * 
	 * @private
	 */
	_idxUnstyleChildNodes: function(rootNode, childBase) {
		if (!rootNode) rootNode = this.domNode;
		if (!rootNode) return;
		
		var childClass = childBase + "-idxChild";
		var firstChildClass = childBase + "-idxFirstChild";
		var midChildClass = childBase + "-idxMiddleChild";
		var lastChildClass = childBase + "-idxLastChild";
		var onlyChildClass = childBase + "-idxOnlyChild";
		
		dRemoveClass(rootNode, childClass);
		dRemoveClass(rootNode, firstChildClass);
		dRemoveClass(rootNode, midChildClass);
		dRemoveClass(rootNode, lastChildClass);
		dRemoveClass(rootNode, onlyChildClass);
		
		var childNodes = rootNode.childNodes;
		if (!childNodes) return;
		for (var index = 0; index < childNodes.length; index++) {
			var childNode = childNodes[index];
			if (dijitMgr.getEnclosingWidget(childNode) == this) {
				this._idxUnstyleChildNodes(childNode, childBase);
			}
		}
	},
	
	/**
	 * The function that styles the nodes under the specified root
	 * using the specified "child class".  This is called for this
	 * widget's nodes but with different classes for the nodes of
	 * the children of this widget.
	 *
	 * @private
	 */
	_idxStyleChildNodes: function(childClass, rootNode) {
		if (!rootNode) rootNode = this.domNode;
		if (!rootNode) return;
		dDomClass.add(rootNode, childClass);
		var childNodes = rootNode.childNodes;
		if (!childNodes) return;
		for (var index = 0; index < childNodes.length; index++) {
			var childNode = childNodes[index];
			if (childNode.nodeType != 1) continue;
			if (dijitMgr.getEnclosingWidget(childNode) == this) {
				this._idxStyleChildNodes(childClass, childNode);
			}
		}
	}
	
	});

	// get the base prototype
    var widgetProto  = dWidget.prototype;
    
	// 
	// Get the base functions so we can call them from our overrides
	//
	var baseCreate = widgetProto.create;

	/**
	 * Replaces dijit._WidgetBase.create() function with one that calls the
	 * function defined by dijit._WidgetBase, but not before replacing all
	 * lifecycle methods with ones that gurantee calling of the "before" and
	 * "after" methods.  This version of "create()" will also perform argument
	 * mixin with defaults determined by the CSS theme via the "idxDefaultsClass"
	 * or the defaults class derived from the "idxBaseClass".
	 *
	 * @name idx.widgets#create
	 * @public
	 *
	 * @param params The parameters passed for widget creation.
	 * @param srcNodeRef The optional node reference for creating the widget.
	 */
	widgetProto.create = function(params,srcNodeRef) {
		var defaultsBase = "";
		var needsSuffix  = false;
		if (params) {
			if (params.idxDefaultsClass) {
				defaultsBase = params.idxDefaultsClass;
				defaultsBase = iString.nullTrim(defaultsBase);
				needsSuffix = false;
			}
			if ((! defaultsBase) && params.idxBaseClass) {
				defaultsBase = params.idxBaseClass;
				defaultsBase = iString.nullTrim(defaultsBase);
				needsSuffix = true;
			}
			if ((! defaultsBase) && params.baseClass) {
				defaultsBase = params.baseClass;
				defaultsBase = iString.nullTrim(defaultsBase);
				needsSuffix = true;
			}
		}
		if (! defaultsBase) {
			defaultsBase = iString.nullTrim(this.idxDefaultsClass);
			needsSuffix = false;
		}
		if (! defaultsBase) {
			defaultsBase = iString.nullTrim(this.idxBaseClass);
			needsSuffix = true;
		}
		if (! defaultsBase) {
			defaultsBase = iString.nullTrim(this.baseClass);
			needsSuffix = true;
		}
		if ((defaultsBase) && (srcNodeRef)) {
			// check if we need a suffix
			if (needsSuffix) defaultsBase = defaultsBase + "_idxDefaults";
			// get the CSS defaults - make sure to pass in a DOM node and not just an id
			var cssDefaults = iUtil.getCSSOptions(defaultsBase, dDom.byId(srcNodeRef), this, this.idxHCDefaults);
			if (cssDefaults != null) {
				for (var field in cssDefaults) {
					if (! (field in params)) {
						params[field] = cssDefaults[field];
					}
				}
			}
		}
		
		// override the buildRendering function 
		if (! this._idxWidgetOrigBuildRendering) {
			this._idxWidgetOrigBuildRendering = this.buildRendering;
		}
		this.buildRendering = this._idxWidgetBuildRendering;			
		
		// override the postMixInProperties function
		if (! this._idxWidgetOrigPostMixInProperties) {
			this._idxWidgetOrigPostMixInProperties = this.postMixInProperties;
		}
		// replace the postMixInProperties() function temporarily
		this.postMixInProperties = this._idxWidgetPostMixInProperties;
		
		// override the post-create function
		if (! this._idxWidgetOrigPostCreate) {
			this._idxWidgetOrigPostCreate = this.postCreate;
		}
		// replace the postCreate() function temporarily
		this.postCreate = this._idxWidgetPostCreate;
		
		// override the startup function
		if (! this._idxWidgetOrigStartup) {
			this._idxWidgetOrigStartup = this.startup;
		}
		// replace the startup() function temporarily
		this.startup = this._idxWidgetStartup;
		
		// perform the base create function
		return baseCreate.call(this, params, srcNodeRef);		
	};
	
	return iWidgets;
});

},
'idx/form/nls/base':function(){
define({root:
//begin v1.x content
({
  
})
//end v1.x content
});

},
'idx/grid/treeGrids':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang",
        "idx/main",
        "dojo/_base/kernel",
        "dojo/_base/connect",
        "dojo/dom",
        "dojo/dom-attr",
        "dojo/keys",
        "dijit/focus",
        "dojox/grid/TreeGrid",
        "dojox/grid/_TreeView"], 
        function(dLang,iMain,dKernel,dConnect,dDom,dDomAttr,dKeys,dFocus,dTreeGrid,dTreeView) {
	
	/**
	 * @name idx.grid.treeGrids
	 * @class Extension to dojox.grid.TreeGrid to add a "setOpen" function to programmatically expand
	 *        or collapse a tree node for a given row index path.
	 */
	var iTreeGrids = dLang.getObject("grid.treeGrids", true, iMain);
	console.log("************************EXTENDING dojox.grid.TreeGrid with 'setOpen' function");
	dLang.extend(dTreeGrid, /** @lends idx.grid.treeGrids# */ {
		/**
		 * Programmatically expands or collapses an row in a dojox.grid.TreeGrid.
		 * 
		 * @public
		 * @function
		 * @param {String} rowIndexPath The slash-separated path to the row index.
		 * @param {Boolean} open Set to true to expand, and false to collapse.
		 * @param {Function} callback The function to call once the expansion or collapse has completed
		 *                            since this operation may require loading children that are not
		 *                            yet loaded.
		 */
		setOpen: function(rowIndexPath, open, callback) {
			var rootIndex = parseInt(rowIndexPath.split("/")[0], 10);
			var rootRow = this._by_idx[rootIndex];
			if (! rootRow) {
				console.log("NO ROOT ROW FOUND FOR: " + rootIndex);
				return;
			}
			var rootIdty = rootRow.idty;
			for (var index = 0; index < this.views.views.length; index++) {
				var view = this.views.views[index];
				if (!view) {
					continue;
				}
				if (view._expandos) {
					var expandos = view._expandos[rootIdty];
					if (!expandos) {
						continue;
					}
					var expandoKey = "dojoxGridRowToggle-" + rowIndexPath.replace(/\//g,"-");
					var expando = expandos[expandoKey];
					if (!expando) {
						console.log("NO EXPANDO FOUND FOR " + expandoKey);
						for (var expandoKey in expandos) console.log(expandoKey);
						continue;
					}					
					if (callback) {
						var openConnection = null;

						var openCallback = function(open) {
							if (openConnection) {
								dConnect.disconnect(openConnection);
								delete openConnection;
								openConnection = null;
							}
							callback();
						};
						openConnection = dConnect.connect(expando, "_setOpen", openCallback);
					}
					expando.setOpen(open);
				}
			}
		}
	});
	
	// get the combo button prototype
	var baseProto = dTreeGrid.prototype;
    
	// 
	// Get the base functions so we can call them from our overrides
	//
	var baseKeyDown  = baseProto.onKeyDown;
	
	console.log("************************REPLACING dojox.grid.TreeGrid.onKeyDown");
	var overrideKeyDown = function(e){
		if((e.ctrlKey || e.metaKey || e.altKey) && e.shiftKey){
			var ltr = dKernel._isBodyLtr();
			var openKey = (ltr) ? dKeys.RIGHT_ARROW : dKeys.LEFT_ARROW;
			var closeKey = (ltr) ? dKeys.LEFT_ARROW : dKeys.RIGHT_ARROW;
			var expandoCell = this.layout.cells[this.expandoCell];
			var focusCellIndex = this.focus.cell.index;
			switch(e.keyCode){
				case openKey:
				case closeKey:
					var focusRow = this.focus.rowIndex;
					var treeGrid = this;
					var refocus = function() {
						var cell = treeGrid.getCell(focusCellIndex);
						var view = null;
						for (var vi = 0; vi < treeGrid.views.views.length; vi++) {
							if (treeGrid.views.views[vi] instanceof dTreeView) {
								view = treeGrid.views.views[vi];
								break;
							}
						}
						var cellNode = view.getCellNode(focusRow, focusCellIndex);
						
						//dFocus.focus(treeGrid.domNode);
						treeGrid.focus.setFocusIndex("0", 0);
						treeGrid.focus.setFocusIndex(focusRow, focusCellIndex);
						view.focus();
						//dFocus.focus(treeGrid.domNode);
						//treeGrid.focus.focusGrid();
						dDomAttr.set(cellNode, "tabindex", "0");
						dFocus.focus(cellNode);
						dDomAttr.set(cellNode, "tabindex", "-1");
						
					};
					var callback = function() {
						// TODO(bcaceres): this is a bit of a hack because focus is lost when the
						// grid structure changes.  Sometimes we refocus a cell node, but the node is
						// erased and replaced afterward.  I have not been able to find the correct
						// method to latch onto to avoid the timing issue.  Worst case scenario is the
						// user needs to tab back into the grid and navigate back to the cell that they
						// had previously focused.  This is still better than what Dojo provided by default.
						refocus();
						setTimeout(refocus, 500);
					}
					this.setOpen(focusRow, (e.keyCode == openKey), callback);
					break;
				default:
					this.onKeyDown = baseKeyDown;
					this.onKeyDown(e);
					this.onKeyDown = overrideKeyDown;
					break;
			}
		} else {
			this.onKeyDown = baseKeyDown;
			this.onKeyDown(e);
			this.onKeyDown = overrideKeyDown;
		}
	};
	baseProto.onKeyDown = overrideKeyDown;
	
	return iTreeGrids;
});
},
'url:idx/widget/templates/Dialog.html':"<div class=\"idxDialog\" role=\"dialog\" aria-labelledby=\"${id}_title\" aria-describedby=\"${id}_desc\"\r\n\t><div class=\"dijitDialogTitle\" dojoAttachPoint=\"titleBar\"\r\n\t\t><span id=\"${id}_title\" dojoAttachPoint=\"titleNode\" tabindex=\"-1\">${title}</span\r\n\t></div\r\n\t><div class=\"dijitDialogInstruction\"\r\n\t\t><span id=\"${id}_desc\" dojoAttachPoint=\"instructionNode\" tabindex=\"-1\">${instruction}</span\r\n\t></div\r\n\t><div dojoAttachPoint=\"contentWrapper\" class=\"dijitDialogPaneContentWrapper compact\" style=\"display:none\"\r\n\t\t><div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\" tabindex=\"-1\"></div\r\n\t></div\r\n\t><div class=\"dijitDialogPaneActionBar\"\r\n\t\t><span class=\"idxDialogActionBarLead\" \r\n\t\t\t><a dojoAttachPoint=\"referenceNode\" class=\"referenceLinkHidden\" href=\"${referenceLink}\">${referenceName}</a\r\n\t\t></span\r\n\t\t><span class=\"idxDialogActionBarEnd\"\r\n\t\t><input dojoAttachPoint=\"closeButtonNode\"/\r\n\t\t></span\r\n\t></div\r\n></div>",
'url:idx/form/templates/TextBox.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span\r\n\t\t><label dojoAttachPoint=\"compLabelNode\"></label\r\n\t></div\r\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\r\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\r\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\r\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'\r\n\t\t\t/></div\r\n\t\t></div\r\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class='dijitValidationIcon'\r\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\r\n\t\t/></div\r\n\t></div\r\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\r\n\t></div\r\n></div>\r\n",
'url:idx/form/templates/Link.html':"<a class=\"${baseClass} ${idxBaseClass}\" dojoAttachPoint=\"containerNode, linkNode, focusNode\" class=\"idxLink\"\r\n   tabIndex=\"${tabIndex}\" alt=\"${alt}\" role=\"link\" wairole=\"link\"></a>",
'url:idx/app/templates/Banner.html':"<div class=\"idxBanner\">\r\n\t<div class=\"idxBannerInnerContainer\">\r\n\t\t<div data-dojo-attach-point=\"containerNode\" class=\"idxBannerContainer\"\r\n\t\t\t id=\"${id}_Container\"></div>\r\n\t\t<div data-dojo-attach-point=\"_trailerNode\" class=\"idxBannerTrailer\">\r\n\t\t\t<div data-dojo-attach-point=\"actionsButton\" \r\n\t\t\t\t\tdata-dojo-type=\"dijit.form.DropDownButton\"\r\n\t\t\t\t\tdata-dojo-props=\"iconClass: 'idxBannerActionButtonIcon'\">\r\n\t\t\t\t<span></span>\r\n\t\t\t\t<div data-dojo-type=\"dijit.Menu\" data-dojo-attach-point=\"actionsMenu\" data-dojo-props=\"style: 'display: none;'\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div data-dojo-attach-point=\"helpButton\" \r\n\t\t\t\t\tdata-dojo-type=\"dijit.form.Button\"\r\n\t\t\t\t\tdata-dojo-props=\"showLabel: false, iconClass: 'idxBannerHelpButtonIcon'\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"idxBannerLogoArea\">\r\n\t\t\t<div class=\"idxBannerLogo\" role=\"img\" aria-labelledby=\"${id}_logoText\"><span \r\n\t\t\t\tid=\"${id}_logoText\" class=\"idxBannerLogoText\" data-dojo-attach-point=\"logoTextNode\"></span></div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"idxBannerBottomBar\"></div>\r\n</div>\r\n",
'url:idx/form/templates/Select.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\" dojoAttachPoint=\"_popupStateNode\"\r\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label dojoAttachPoint=\"compLabelNode\" id=\"${id}_arialabel\"></label></div\r\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\r\n\t\t><table class=\"dijit dijitReset dijitInline dijitLeft\" dojoAttachPoint=\"_aroundNode,_buttonNode,tableNode,focusNode,stateNode,oneuiBaseNode\" cellspacing='0' cellpadding='0' aria-labelledby=\"${id}_arialabel\" role=\"listbox\" aria-haspopup=\"true\"\r\n\t\t\t><tbody role=\"presentation\"\r\n\t\t\t\t><tr role=\"presentation\"\r\n\t\t\t\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\r\n\t\t\t\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\" dojoAttachPoint=\"containerNode\"></span\r\n\t\t\t\t\t\t><input type=\"hidden\" ${!nameAttrSetting}  dojoAttachPoint=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"/\r\n\t\t\t\t\t></td\r\n\t\t\t\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\" dojoAttachPoint=\"titleNode\" role=\"presentation\"\r\n\t\t\t\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\r\n\t\t\t\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\r\n\t\t\t\t\t></td\r\n\t\t\t\t></tr\r\n\t\t\t></tbody\r\n\t\t></table\r\n\t></div\r\n\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\r\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\r\n\t\t><div class=\"dijitValidationIcon\"\r\n\t\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\r\n\t\t></div\r\n\t></div\r\n></div>",
'url:idx/widget/templates/SingleMessage.html':"<div class=\"dijit dijitReset\" aria-labelledby=\"${id}_messageTitle\"\r\n\t><div class=\"idxMessageHead\" \r\n\t\t><span id=\"${id}_title\" style=\"position: absolute;clip: rect(0px 0px 0px 0px);\"  >${type} type message</span\r\n\t\t><div class=\"dijitInline idxMessageIcon\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onmouseenter: onIconEnter, onmouseleave: onIconLeave\" role=\"presentation\" aria-labelledby=\"${id}_title\"\r\n\t\t\t><span id=\"${id}_type\" dojoAttachPoint=\"typeNode\" class=\"idxMessageIconText idxMessageContent idxMessageAltText\"></span\r\n\t\t></div\r\n\t\t><span class=\"dijitInline idxMessageContent\" dojoAttachPoint=\"focusNode\" dojoAttachEvent=\"ondijitclick: _onClick\" tabIndex=\"${tabIndex}\" role=\"button\" aria-describedby=\"${id}_messageTitle\"\r\n\t\t\t><span class=\"dijitInline idxMessageTitle\" dojoAttachPoint=\"titleNode\" id=\"${id}_messageTitle\"></span\r\n\t\t\t><span class=\"dijitInline idxMessageId messagesContrast\" dojoAttachPoint=\"idNode\"></span\r\n\t\t></span\r\n\t\t><span class=\"idxMessageFakeContent\" dojoAttachPoint=\"fakeFocusNode\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"ondijitclick: _onClick\" role=\"button\" aria-describedby=\"${id}_messageFakeTitle\"\r\n\t\t\t><span class=\"idxMessageTitle\" dojoAttachPoint=\"fakeTitleNode\" id=\"${id}_messageFakeTitle\"></span\r\n\t\t\t><span class=\"idxMessageId messagesContrast\" dojoAttachPoint=\"fakeIdNode\"></span\r\n\t\t></span\r\n\t\t><div class=\"dijitInline idxMessageRightAligned\" dojoAttachPoint=\"infoNode\"\r\n\t\t\t><div class=\"dijitInline idxMessageTimestamp messagesContrast\" dojoAttachPoint=\"timestampNode\" >03 March 2011  12:00 PM</div\r\n\t\t\t><div class=\"dijitInline idxMessageSeparator\" dojoAttachPoint=\"separatorNode\" aria-hidden=\"true\">|</div\r\n\t\t\t><a class=\"dijitInline idxMessageAction\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"actionNode\" role=\"button\" dojoAttachEvent=\"ondijitclick: onAction\" href=\"javascript: void(0);\"></a\r\n\t\t\t><div class=\"dijitInline idxMessageCloseIcon\" role=\"button\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"ondijitclick: _onClose\" dojoAttachPoint=\"closeNode\"><span class=\"idxMessageContent idxMessageAltText\">X</span></div\r\n\t\t></div\r\n\t></div\r\n\t><div class=\"idxMessageSplitter\" src=\"${_blankGif}\"></div\r\n><div class=\"idxMessageBody\" dojoAttachPoint=\"bodyNode\" role=\"document\" aria-labelledby=\"${id}_detailedMessage\"\r\n\t><span id=\"${id}_detailedMessage\" class=\"idxMessageDetail\" dojoAttachPoint=\"descriptionNode\" tabIndex=\"${tabIndex}\"></span\r\n\t><a class=\"idxMessageViewDetails\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"viewDetailsNode\" href=\"javascript: void(0);\" dojoAttachEvent=\"ondijitclick: onMoreDetails\"></a\r\n></div\r\n><div class=\"idxMessageRefresh\"\r\n\t><span tabIndex=\"${tabIndex}\" dojoAttachPoint=\"refreshNode\" dojoAttachEvent=\"ondijitclick: onRefresh\" role=\"button\"></span\r\n></div></div>\r\n",
'url:idx/app/templates/LoginFrame.html':"<div class=\"${baseClass}\">\r\n    <div class=\"${baseClass}BoxWithShadow\">\r\n      <div class=\"${baseClass}Box\">\r\n\r\n       <div class=\"${baseClass}BoxInner\">\r\n   \r\n          <h1 data-dojo-attach-point=\"loginTitleNode\" class=\"${baseClass}Title\">${loginTitle}</h1>\r\n          \r\n          <iframe data-dojo-attach-point=\"_hiddenFrame\"\r\n          \t\t  style=\"visibility: hidden; display: none, width: 0px; height: 0px\" name=\"SubmitFrame${id}\"></iframe>\r\n          \r\n          <form data-dojo-type=\"dijit/form/Form\"\r\n          \t\tdata-dojo-attach-point=\"_form\" \r\n          \t\tdata-dojo-attach-event=\"onSubmit:_onFormSubmit\"\r\n          \t\tdata-dojo-props=\"autocomplete:'on',method:'post',name:'${formName}',action:'${formAction}',target:'SubmitFrame${id}'\">\r\n          \t\r\n            <div data-dojo-attach-point=\"loginSubtitleNode\" class=\"${baseClass}SubTitle\">${loginSubTitle}</div>\r\n\r\n            <input data-dojo-attach-point=\"loginUserName\" type=\"text\" data-dojo-type=\"idx/form/TextBox\" \r\n            \t   data-dojo-props=\"name:'${userFieldName}', required: true, value:'', intermediateChanges: false, autocomplete: '${_userAutoComplete}',\r\n            \t   \t\t\t\t\tlabel: '_', labelAlignment: 'vertical', instantValidate: false\"\r\n            \t   \t></input><br>\r\n            \r\n            <input type=\"password\" data-dojo-type=\"idx/form/TextBox\" data-dojo-attach-point=\"loginPassword\" \r\n            \t   data-dojo-props=\"id:'${id}Password', name:'${passwordFieldName}', required:'true', intermediateChanges: false, autocomplete: '${_pwdAutoComplete}',\r\n            \t   \t\t\t\t\tlabel: '_', labelAlignment: 'vertical', instantValidate: false,\r\n            \t   \t\t\t\t\tvalue:'', 'class': '${baseClass}Field'\"\r\n            \t   \t></input>\r\n\t\t\t<div data-dojo-attach-point=\"containerNode\"></div>\r\n\r\n            <div data-dojo-attach-point=\"inactivityMessageNode\" class=\"idxLoginFrameInactivityMessage\">${inactivityMessage}</div>\r\n            \r\n\r\n            <div class=\"${baseClass}ButtonBar\">\r\n              <button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"loginButton\" data-dojo-attach-event=\"onClick:_onSubmitClick\"\r\n              \t\t  data-dojo-props=\"name:'login'\">${labelSubmitButton}</button>\r\n              <button data-dojo-type=\"dijit.form.Button\" data-dojo-attach-point=\"cancelButton\" data-dojo-attach-event=\"onClick:_onCancelClick\"\r\n              \t\t  data-dojo-props=\"name:'cancel', 'style':'visibility:hidden;display:none;'\">${labelCancelButton}</button>\r\n            </div>\r\n          </form>\r\n            \r\n          <div data-dojo-attach-point=\"copyrightNode\" class=\"${baseClass}Copyright\">${loginCopyright}</div>\r\n\r\n       </div>\r\n       \r\n      </div>\r\n      <div class=\"${baseClass}ShadowTop\"><div class=\"${baseClass}ShadowInner\"></div></div>\r\n      <div class=\"${baseClass}ShadowMiddle\"><div class=\"${baseClass}ShadowInner\"></div></div>\r\n      <div class=\"${baseClass}ShadowBottom\"><div class=\"${baseClass}ShadowInner\"></div></div>\r\n    </div>\r\n    \r\n\t<div data-dojo-attach-point=\"invalidLoginDialog\" data-dojo-type=\"dijit/Dialog\" data-dojo-props=\"'style':'display:none;'\">\r\n\t\t<div class=\"dijitDialogPaneContentArea\" style=\"width: 350px; height: 90px; overflow: auto;\">\r\n\t\t\t<table role=\"presentation\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td><div class=\"idxDialogIconError\" /></td>\r\n\t\t\t\t\t<td><span data-dojo-attach-point=\"invalidMessageNode\" class='idxDialogIconText'>${invalidMessage}</span></td>\r\n\t\t\t\t</tr>\r\n\t\t\t</table>\t\t\r\n\t\t</div>\t\t\t\r\n\t\t<div class=\"dijitDialogPaneActionBar\">\r\n\t\t\t<button data-dojo-attach-point=\"dialogOKButton\" data-dojo-type=\"dijit/form/Button\" data-dojo-props=\"type: 'submit'\" ></button>\t\r\n\t\t</div>\r\n\t</div>\r\n\t\r\n</div>\r\n",
'url:idx/widget/templates/HoverHelpTooltip.html':"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"alert\"\r\n\t><div\r\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" \r\n\t\t\tdata-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" aria-label=\"${buttonClose}\"\r\n\t\t\t><span class=\"idxHoverHelpCloseText\">x</span\r\n\t\t></span\r\n\t></div\r\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\r\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\r\n\t\t><a target=\"_blank\" href=\"#updateme\" role=\"link\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\r\n\t></div\r\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\r\n></div>",
'*now':function(r){r(['dojo/i18n!*preload*idx/nls/main*["de","es","fr","ja","pl","pt-br","tr","zh-cn","zh-tw"]']);}
}});
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
define("idx/main", ["require","dojo/_base/lang","dojo/_base/kernel","dojo/_base/window","dojo/dom-class"], 
	   function(dRequire,dLang,dKernel,dWindow,dDomClass) {
  /**
   * @name idx.main
   * @namespace This serves as the main module for the "idx" package when using "packages" in the "dojo config".
   *            This module's only action is to apply a CSS class to the body tag that identifies the Dojo version
   *            being utilized on the page. 
   */
	var iMain = dLang.getObject("idx", true);
	
	var applyDojoVersionClass = function() {
		var bodyNode = dWindow.body();
		var versionClass = "idx_dojo_" + dKernel.version.major + "_" + dKernel.version.minor;
		dDomClass.add(bodyNode, versionClass);		
	};
	
	var majorVersion = dKernel.version.major;
	var minorVersion = dKernel.version.minor;
	if ((majorVersion < 2) && (minorVersion < 7)) {
		// for dojo 1.6 we need to use "addOnLoad" to ensure the body exists first
		dojo.addOnLoad(applyDojoVersionClass);
	} else {
		// for dojo 1.7 or later we rely on the "dojo/domReady!" dependency
		dRequire(["dojo/domReady!"],applyDojoVersionClass);
	}
	
	return iMain;
});