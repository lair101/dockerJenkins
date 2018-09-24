/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

require({cache:{
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
		
		postMixInProperties: function(){
			this.tooltipPosition = ["after-centered", "above"];
			this.inherited(arguments);
		},
		/**
		 * Handles resizing form widgets.
		 */
		resize: function() {
			
			if(this._holdResize()){
				return;
			}
			domStyle.set(this.domNode, {visibility: "hidden"});
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
			if(!(this.labelWidth || this.fieldWidth || this._styleWidth)){
				domStyle.set(this.labelWrap, {width: ""});
				domStyle.set(this.oneuiBaseNode, {width: ""});				
				return true;
			}
			var swFixed = (this._styleWidth && !iUtil.isPercentage(this._styleWidth)),
				fwFixed = (this.fieldWidth && !iUtil.isPercentage(this.fieldWidth)),
				lwFixed = (this.labelWidth && !iUtil.isPercentage(this.labelWidth)),
				widthFixed = swFixed || (fwFixed&&lwFixed),				
				widgetInvisible = domGeometry.getContentBox(this.domNode).w <= 0;
				
			return (widthFixed && this._resized) || // If widget width is fixed, and widget has been resized of fit, then skip.
				(!widthFixed) && widgetInvisible; // If widget is invisible with percentage width, then skip.
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
			domStyle.set(this.domNode, {visibility: ""});
			this._resized = true;
		},
		_resizeHint: function(){
			if(this.hint && (this.hintPosition == "outside") && this._created){
				var inputWidth = domStyle.get(this.fieldWrap || this.oneuiBaseNode, "width")/*valication icon placeholder*/;
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
			domStyle.set(this.labelWrap, "width", typeof width === "number" ? width + "px" : width);
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
				domStyle.set(this.oneuiBaseNode, "width", typeof width === "number" ? width + "px" : width);
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
			// Workaround for idt ValidationTextBox defect of #12517
			if(this.focusNode && (!this._hasBeenBlurred)){
				domAttr.remove(this.focusNode, "aria-invalid");
			}
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
			this._set("hintPosition", position);
			domClass.toggle(this.compHintNode, "dijitVisible", position != "inside");
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
					this._phspan = domConstruct.create('span',{
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
'idx/widgets':function(){
/*
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
'idx/app/nls/base':function(){
define({root:
//begin v1.x content
({
  
})
//end v1.x content
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
"uk": true, "vi": true
});
},
'idx/form/comboButtons':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/_base/kernel"],
	   function(dLang,iMain,dKernel) {
	dKernel.deprecated("idx.form.comboButtons","idx.form.comboButtons deprecated. The idx/form/comboButtons module is no longer needed since Dojo 1.8");
	/**
	 * @name idx.form.comboButtons
	 * @class Extension to dijit.form.ComboButton to add the "idxDropDownOpen" CSS class whenever
	 *        the ComboButton is opened to allow for alternate styling when the ComboButton is in the 
	 *        open state.  This also adds proper tab stops in ComboButtons for keyboard navigation.
	 *        This is included with "idx.ext".
	 */
	var iComboButtons = dLang.getObject("form.comboButtons", true, iMain);
	return iComboButtons;
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
			
			if (this.clipNode){
				this.clipNode.innerHTML = this.type + "," + this.title;
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
'idx/widget/_DialogResizeMixin':function(){
define([
"dojo/_base/declare",
"dojo/_base/array",
"dojo/dom-geometry", 
"dojo/dom-style", 
"dojo/window"],function(declare, array, domGeometry, domStyle, winUtils){
	return declare("idx.widget._DialogResizeMixin", null, {
		/**
		 * Override to better handle zooming for accessiblity and to properly resize DOM node.
		 * NOTE: most of this code is copied from the Dojo 1.9.3 implementation and then modified.
		 */
		_size: function(){
			
			var bb = domGeometry.position(this.domNode);

			// Get viewport size but then reduce it by a bit; Dialog should always have some space around it
			// to indicate that it's a popup.  This will also compensate for possible scrollbars on viewport.
			var viewport = winUtils.getBox(this.ownerDocument);
			//var viewport ={w: window.innerWidth, h: window.innerHeight};
			viewport.w *= this.maxRatio;
			viewport.h *= this.maxRatio;
			if(bb.w >= viewport.w || bb.h >= viewport.h){
				// record the preferred width and height
				if (! ("_preferredWidth" in this)) {
					this._preferredWidth = bb.w;
				}
				if (! ("_preferredHeight" in this)) {
					this._preferredHeight = bb.h;
				}
				// Reduce size of dialog contents so that dialog fits in viewport
				var padBorderSize = domGeometry.getPadBorderExtents(this.domNode),
					w = Math.min(bb.w, viewport.w) - padBorderSize.w,
					h = Math.min(bb.h, viewport.h) - padBorderSize.h;
				var hasOverflow = (w < this._preferredWidth) || (h < this._preferredHeight);
				
				domStyle.set(this.domNode, {
					width: w + "px",
					height: h + "px",
					overflow: hasOverflow ? "auto" : "hidden"
				});
			}else{
				if ((this._preferredWidth && this._preferredWidth > bb.w) 
					||(this._preferredHeight && this._preferredHeight > bb.h)) {
					// try to enlarge the dialog back to its original dimensions
					var padBorderSize = domGeometry.getPadBorderExtents(this.domNode),
						w = Math.min(viewport.w,this._preferredWidth) - padBorderSize.w,
						h = Math.min(viewport.h,this._preferredHeight) - padBorderSize.h;
					
					var hasOverflow = (w < this._preferredWidth) || (h < this._preferredHeight);
				
					domStyle.set(this.domNode, {
						width: w + "px",
						height: h + "px",
						overflow: hasOverflow ? "auto" : "hidden"
					});
				} else {
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
				}
			}
		}
		
	})
	
});


},
'idx/has':function(){
define(["dojo/_base/lang","dojo/has"], function(dLang,dHas){
	var iHas = {};
	dLang.mixin(iHas, dHas);
	iHas.normalize = function(id, toAbsMid){
		// summary:
		//	 Resolves id into a module id based on possibly-nested tenary expression that branches on has feature test value(s).
		//
		// toAbsMid: Function
		//	 Resolves a relative module id into an absolute module id
		var
			tokens = id.match(/[\?:]|[^:\?]*/g), i = 0,
			get = function(skip){
				var term = tokens[i++];
				if(term == ":"){
					// empty string module name, resolves to 0
					return 0;
				}else{
					// postfixed with a ? means it is a feature to branch on, the term is the name of the feature
					if(tokens[i++] == "?"){
						if (term.length>1 && term.charAt(0)=="#") term = term.substring(1);
						if(!skip && dHas(term)){
							// matched the feature, get the first value from the options
							return get();
						}else{
							// did not match, get the second value, passing over the first
							get(true);
							return get(skip);
						}
					}
					// a module
					return term || 0;
				}
			};
		id = get();
		return id && toAbsMid(id);
	};
	
	return iHas;
});

},
'idx/form/_AutoCompleteA11yMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare" // declare
],function(declare){
	return declare("idx.form._AutoCompleteA11yMixin",[],{
		_showResultList: function(){
			var temp = this.domNode;
			this.domNode = this.oneuiBaseNode;
			this.inherited(arguments);
			this.domNode = temp;
		},
		
		closeDropDown: function(){
			var temp = this.domNode;
			this.domNode = this.oneuiBaseNode;
			this.inherited(arguments);
			this.domNode = temp;
		},
		
		_announceOption: function(){
			this.inherited(arguments);
			this.focusNode.removeAttribute("aria-activedescendant");
		}
	});
});

},
'idx/form/_ValidationMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare", 
	"dojo/dom-style", 
	"dojo/i18n", 
	"dijit/_base/wai", 
	"idx/widget/HoverHelpTooltip",
	"dojo/i18n!dijit/form/nls/validate"
], function(declare, domStyle, i18n, wai, HoverHelpTooltip){
	/**
	 * @public
	 * @name idx.form._ValidationMixin
	 * @class Mix-in class to enable form widget perform validation, implemented according to 
	 * IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y14&vsub=*&hsub=*&openpanes=0000011100">Validation</a></b>.
	 */
	return declare("idx.form._ValidationMixin", null, 
	/**@lends idx.form._ValidationMixin#*/
	{
		/**
		 * Configurable flag of the validation timing, the widget fires validation when widget get input by setting true, 
		 * fire validation when widget get blur by setting false.
		 * @type boolean
		 * @default false
		 */
		instantValidate: false,
		
		// required: Boolean
		//		Indicate whether this widget must have a value
		/**
		 * Indicate whether this widget must have a value
		 * @type boolean
		 * @default false
		 */
		required: false,
		
		/**
		 * The message to display if value is invalid
		 * @type String
		 */
		invalidMessage: "$_unset_$",
		
		/**
		 * The message to display if value is empty and the field is required
		 * @type String
		 */
		missingMessage: null,
		
		/**
		 * The position of the hoverhelpTooltip
		 * @type String[]
		 */
		tooltipPosition: [], // need to override this class-static value in postMixInProperties
		
		postMixInProperties: function(){
			this.tooltipPosition = ["after-centered", "above"]; // set this to a instance-local value
			this.inherited(arguments);
			var messages = i18n.getLocalization("dijit.form", "validate", this.lang);
			this.missingMessage || (this.missingMessage = messages.missingMessage);
			// check the nls message === null
			this.invalidMessage = (this.invalidMessage == "$_unset_$") ? ( (messages && messages.invalidMessage)? messages.invalidMessage :this.invalidMessage ) : this.invalidMessage;
		},
		buildRendering: function(){
			this.inherited(arguments);
			this.messageTooltip = new HoverHelpTooltip({
				connectId: [this.iconNode],
				label: this.message,
				position: this.tooltipPosition,
				forceFocus: false
			});
		},
		postCreate: function(){
			this.inherited(arguments);
			if(this.instantValidate){
				this.connect(this, this._event["focus"], function(){
					//if (this._hasBeenBlurred && (!this._refocusing)) {
					/* Start validation once instantValidate widget got focus. Fix for #9977 */
					if (!this._refocusing) {
						this.validate(true);
					}
				});
				this.connect(this, this._event["input"], function(){
					this.validate(true);
				});
			}else{
				this.connect(this, this._event["focus"], function(){
					if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
						this.displayMessage(this.message);
					}
				})
			}
		},
		refocus: function() {
			this._refocusing = true;
			this.focus();
			this._refocusing = false;
		},
		
		/**
		 * Tests if value is valid.
		 * Can override with the routine in a subclass.
		 * @public
		 * @param {boolean} isFocused
		 * If the widget focused
		 */
		_isValid: function(/*Boolean*/ isFocused){
			return this.isValid(isFocused) && !(this.required && this._isEmpty());
		},
		
		/**
		 * Checks if value is empty.
		 * Should be override with the routine in a subclass
		 * @public
		 */
		_isEmpty: function(){
			// summary:
			// 		Checks for whitespace. Should be overridden.
			return false;
		},
		
		/**
		 * Extension point for user customizing validation rules.
		 * @param {boolean} isFocused
		 */
		isValid: function(isFocused){
			return true;
		},
		
		/**
		 * Return proper error message according to the error type
		 * @param {boolean} isFocused
		 */
		getErrorMessage: function(/*Boolean*/ isFocused){
			return (this.required && this._isEmpty()) ? this.missingMessage : this.invalidMessage;
		},
		
		/**
		 * Perform validation for the widget, called by "input" event if "instantValidate" setting to true,
		 * called by "blur" event if "instantValidate" setting to false.
		 * @param {boolean} isFocused
		 */
		validate: function(/*Boolean*/ isFocused){
			var message, isValid = this.disabled || this._isValid(isFocused);
			
			this.set("state", isValid ? "" : "Error");
			if(this._hasBeenBlurred){
				wai.setWaiState(this.focusNode, "invalid", !isValid);
			}
			if(this.state == "Error"){
				message = this.getErrorMessage(isFocused);
			}
			this._set("message", message);
			this.displayMessage(message);
			return isValid;
		},
		
		/**
		 * Show error message using a hoverHelpTooltip, hide the tooltip if message is empty.
		 * Overridable method to display validation errors/hints.
		 * By default uses a hoverHelpTooltip.
		 * @protected
		 * @param {string} message
		 * Error message
		 * @param {boolean} force
		 * Force displaying message if the value is true, no matter if the widget got focus or not.
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
		},
		
		_onBlur: function(){
			this.inherited(arguments);
			this.displayMessage("");
		}
	});
});


},
'idx/widget/TooltipDialog':function(){
define([
	"dojo/_base/declare",
	"dojo/_base/lang", 
	"dojo/_base/window",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/on",
	"dojo/keys",
	"dijit/TooltipDialog",
	"idx/util",
	"idx/string",
	"dojo/i18n!./nls/Dialog"
], function(dDeclare, dLang, dWindow, dDomConstruct, dDomAttr, dDomStyle, dDomClass, dOn, dKeys, dTooltipDialog, iUtil, iString, iDialogResources){

	/**
	 * 
	 */
	return dDeclare("idx.widget.TooltipDialog", [dTooltipDialog], {
		/**
		 * The IDX base class.
		 */
		idxBaseClass: "idxTooltipDialog",
		
		/**
		 * The label for the close button. 
		 */
		closeButtonLabel: "",
		
		/**
		 * 
		 */
		_setCloseButtonLabelAttr: function(label) {
			var oldLabel = iString.nullTrim(this.closeButtonLabel);
			this.closeButtonLabel = label;
			var newLabel = iString.nullTrim(label);
			if (newLabel == oldLabel) {
				return;
			}
			if (! newLabel) {
				newLabel = iDialogResources.closeButtonLabel;
			}
			if (this.closeButtonNode) dDomAttr.set(this.closeButtonNode, "aria-label", newLabel);
		},
		
		/**
		 * Set the template text to the IDX template.
		 */
		buildRendering: function() {
			this.inherited(arguments);
			var closeLabel = iString.nullTrim(this.closeButtonLabel);
			if (! closeLabel) { 
				closeLabel = iDialogResources.closeButtonLabel;
			}
			if (! closeLabel) closeLabel = "";
			var shell = dDomConstruct.create("div", null, this.domNode, "first");
			var attrs = { "class": this.idxBaseClass + "CloseIcon",
						  "role": "button",
						  "tabIndex": "0",
						  "aria-label": closeLabel };
						  
			this.closeButtonNode = dDomConstruct.create("span", attrs, shell);
			this.closeTextNode = dDomConstruct.create("span", {"class": this.idxBaseClass + "CloseText"}, this.closeButtonNode);
			this.closeTextNode.innerHTML = "x";
			
			dDomClass.add(this.connectorNode, "idxConnector");
			this.connectorNode.innerHTML = "<span role='presentation' class='idxConnectorBelow'>▲</span>"
										 + "<span role='presentation' class='idxConnectorAbove'>▼</span>"
										 + "<span role='presentation' class='idxConnectorLeft'>▶</span>"
										 + "<span role='presentation' class='idxConnectorRight'>◀</span>";
			
			dOn(this.closeButtonNode, "click", dLang.hitch(this,this._handleCloseClick));
			dOn(this.closeButtonNode, "key", dLang.hitch(this,this._handleCloseKey));
		},
		
		/**
		 * Handles closing the tooltip dialog when the close button is pressed.
		 */
		_handleCloseClick: function() {
			this.defer("onCancel");
		},
		
		/**
		 * Handles closing the tooltip dialog when the close button is pressed.
		 */
		_handleCloseKey: function(evt) {
			if((evt.charOrCode == keys.SPACE) || (evt.charOrCode == keys.ENTER)) {
				this.defer("onCancel");
				return;
			}
			this.inherited(arguments);
		}		
	});
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
	
	"require", 
	"require",
	
	"idx/has!#idx_form_TextBox-desktop?dojo/text!./templates/TextBox.html"  // desktop widget, load the template
		+ ":#idx_form_TextBox-mobile?"										// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/TextBox.html"						// global desktop platform, load template
		+ ":#mobile?"														// global mobile platform, don't load
		+ ":dojo/text!./templates/TextBox.html", 							// no dojo/has features, load the template
		
	"idx/has!#idx_form_TextBox-mobile?./plugins/mobile/TextBoxPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_TextBox-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/mobile/TextBoxPlugin"							// global mobile platform, load plugin
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
'idx/widget/Menu':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang",
        "dojo/_base/array",
		"dojo/_base/declare",
		"dojo/_base/event",
		"dojo/dom-geometry",
		"dijit/_TemplatedMixin",
		"dijit/_WidgetBase",
		"dijit/Menu",
		"dijit/MenuItem",
		"dijit/registry",
		"./_MenuOpenOnHoverMixin",
		"dojo/text!./templates/Menu.html",
		"dojo/text!./templates/_MenuColumn.html",
		"idx/widgets"],
		function(lang,
				array,
				 declare,
				 event,
				 domgeometry,
				 _TemplatedMixin,
				 _WidgetBase,
				 Menu,
				 MenuItem,
				 registry,
				 _MenuOpenOnHoverMixin,
				 template,
				 columntemplate){
				 	
	var icons = {
		"error":        "oneuiErrorMenuItemIcon",
		"warning":      "oneuiWarningMenuItemIcon",
		"confirmation": "oneuiConfirmationMenuItemIcon",
		"information":  "oneuiInformationMenuItemIcon",
		"success":      "oneuiSuccessMenuItemIcon",
		"critical":     "oneuiCriticalMenuItemIcon",
		"attention":    "oneuiAttentionMenuItemIcon",
		"compliance":   "oneuiComplianceMenuItemIcon"
	}

	/**
	 * Creates a new idx.widget.Menu
	 * @name idx.widget.Menu
	 * @class The Menu widget is a substantial extension of dijit.Menu that adds
	 * 3 sets of functionality:
	 * <ol>
	 *   <li>
	 *     It facilitates event routing and functional linkage when used inside
	 *     an idx.widget.MenuDialog (This is a key part of the infrastructure
	 *     for implementing "mega menus")
	 *   </li>
	 *   <li>
	 *     It provides cascade-on-hover behaviour when the menu is used "flat"
	 *     (one important use of which is when one is placed inside an 
	 *     idx.widget.MenuDialog as part of a "mega menu")
	 *   </li>
	 *   <li>
	 *     It provides multi-column menu support including keyboard navigation
	 *   </li>
	 * </ol>
	 * Although the original motivation for adding these functional extensions
	 * to dijit.Menu was to support the creation of "mega menus", items (2) and (3) 
	 * could have broader applications.
	 * <p>
	 * Instances can be supplied as the "popup" parameter for dijit.PopupMenuItem
	 * and dijit.PopupMenuBarItem, and will operate as dijit.Menu. Instances can
	 * operate as popup menus on arbitrary DOM nodes, or for the whole window,
	 * and will operate as dijit.Menu. Instances can be placed "flat" within a
	 * layout in the UI, and will operate as dijit.Menu except that
	 * cascade-on-hover behaviour is available (controlled by the openOnHover
	 * property). Instances can be placed "flat" within an idx.widget.MenuDialog,
	 * and can operate as a drop-down menu in combination with the containing
	 * dialog (controlled by the menuForDialog property).
	 * </p>
	 * <p>
	 * When menu items are added to this widget, the "column" property on each
	 * item can be used to specify the column in which the item should be placed.
	 * Columns will be created as needed to accommodate each new item, and can be
	 * styled by CSS.
	 * </p>
	 * @augments dijit.Menu
	 * @augments idx.widget._MenuOpenOnHoverMixin
	 * @borrows idx.widget._MenuOpenOnHoverMixin#openOnHover as this.openOnHover
	 * @example
	 * &lt;div data-dojo-type="idx.widget.MenuDialog"&gt;
  &lt;div data-dojo-type="idx.widget.Menu"&gt;
    &lt;div data-dojo-type="dijit.MenuItem" onclick="..."&gt;
      ...
    &lt;/div&gt;
      ...
  &lt;/div&gt;</span>
    ...
&lt;/div&gt;
	 */
	var Menu = declare("idx.widget.Menu", [Menu, _MenuOpenOnHoverMixin], 
	/** @lends idx.widget.Menu.prototype */
	{
		/**
		 * Provide an IDX base class to distinguish from Dijit menus in CSS selectors. 
		 */
		idxBaseClass: "idxMenu",
		
		/**
		 * An array of the DOM nodes (tbody's), one per column, that
		 * contain the items that are in each column.
		 * @type DOMNode[]
		 * @private
		 */		
		_containerNodes: null,
		
		/**
		 * An array of the DOM nodes that can be used for styling individual
		 * columns in a multi-column menu. The nodes are ('td's), one per column,
		 * which are in a table row that implements the multiple columns, 
		 * and each of which contains
		 * a single column table containing the menu items. The column nodes
		 * are higher up in the DOM structure than the container nodes, but
		 * have a 1 to 1 relationship. They are externalised as they are more 
		 * suitable for styling the columns than the container nodes.
		 * @type DOMNode[]
		 */ 
		columnNodes: null,
		
		/**
		 * Indicates if this menu should be used by an idx.widget.MenuDialog it
		 * is in to provide the primary menu functionality.
		 * @type boolean 
		 */
		menuForDialog: true,
		
		/**
	 	 * The template HTML for the widget.
		 * @constant
		 * @type string
		 * @private
		 * @default Loaded from idx/widget/templates/Menu.html.
		 */
		templateString: template,
		
		/**
		 * Constructor.
		 * @private
		 */
		constructor: function(){
			this._containerNodes = [];
			this.columnNodes = [];
		},
		
		// define a child selector that finds the menu items in any of our columns
		childSelector: function(/*DOMNode*/ node){
			var widget = registry.byNode(node);
			return (array.indexOf(this._containerNodes, node.parentNode) >= 0) && widget && widget.focus;
		},

		/**
		 * Returns the next or previous focusable child, compared to "child".
		 * Overridden because original does not work if the child widgets are
		 * not immediate peers in the DOM.
		 * <p>THIS IMPLEMENTATION ASSUMES THAT getChildren() RETURNS THE
		 * CHILDREN IN THE CORRECT ORDER FOR NAVIGATION. THIS IS TRUE
		 * AS OF DOJO V1.7</p>
		 * @param {dijit._Widget} child The current widget.
		 * @param {number} dir Integer: 1 = after, -1 = before.
		 */
		_getNextFocusableChild: function(child, dir){
			var nextFocusableChild = null;
			var children = this.getChildren();
			var startIndex;
			if(child != null){
				startIndex = array.indexOf(children, child);
				if (startIndex != -1) {
					startIndex += dir;
					if(startIndex < 0) 
						startIndex = children.length - 1;
					if(startIndex >= children.length) 
						startIndex = 0;
				}
			}
			else if(children.length == 0) 
				startIndex = -1;
			else 
				startIndex = (dir == 1) ? 0 : children.length - 1;
			
			if(startIndex != -1){
				// If there are children and the specifed start child if any
				// is one of them. Then iterate through the array of children
				// starting at the start position plus/minus. If either end of 
				// the array is hit then loop to the other end and continue
				// until a focusable child is found or the start position is
				// reached.
				var i = startIndex;
				do{
					if (children[i].isFocusable()) {
						nextFocusableChild = children[i];
						break;
					}
					i += dir;
					if(i < 0)
						i = children.length - 1;
					if(i >= children.length)
						i = 0;
				}while(i != startIndex);
			}
			
			return nextFocusableChild;
		},
		
		/**
		 * Finds the closest column in the specified direction with one or
		 * more focusable menu items in it and moves focus to the one level
		 * with the top of the currently focused menu item, or next higher or
		 * lower if that is not possible.
		 * @param {number} dir Direction - indicates whether to move focus to
		 * the next (+1) or previous (-1) column.
		 * @returns true if focus sucessfully moved, else false.
		 */
		_moveToColumn: function(dir){
			
			// Identify the column containing the currently focused menu
			// item and determine its y-position.
			if(this.focusedChild){
				for(var i = 0; i < this._containerNodes.length; i++){
					if(this.focusedChild.domNode.parentNode == this._containerNodes[i]){
						var focusedCol = i, yPos = domgeometry.getMarginBox(this.focusedChild.domNode).t;
						break;
					}
				}
			}
			if(focusedCol != undefined){
				// Try to locate the closest column in the appropriate direction
				// with at least one focusable item in it.
				for (i = focusedCol + dir; i >= 0 && i < this._containerNodes.length; i += dir) {
					var children = registry.findWidgets(this._containerNodes[i]);
					var focusableChildren = dojo.filter(children, function(child){ return child.isFocusable() })
					if(focusableChildren.length > 0){
						var targetColumn = i;
						break;
					}
				}
				if(targetColumn != undefined){
					// Iterate through the focusable children and transfer 
					// focus to the item level with the currently focused
					// one, or the next higher, or the next lower, in that
					// order.
					for (i = 0; i < focusableChildren.length; i++){
						var child = focusableChildren[i];
						var childBox = domgeometry.getMarginBox(child.domNode);
						if(yPos >= childBox.t && yPos <= childBox.t + childBox.h - 1){
							this.focusChild(child);
							return true;
						} 
						else if(yPos < childBox.t){
							if(i > 0){
								this.focusChild(focusableChildren[i - 1]);
								return true;
							}else{
								this.focusChild(child);
								return true;
							}
						}else if(i == focusableChildren.length - 1){
							this.focusChild(child);
							return true;
						} 
					}
				}
			}
			
			// If the method didn't get to the point of focusing another menu
			// item then it failed.
			return false;
		},

		/**
		 * We replace _onKeyPress because our base class does NOT stop a
		 * close-sub-menu-key event even when it has handled the event
		 * (by cancelling itself or passing the navigation request to a
		 * parent menu bar). Curiously, it DOES stop the keypress event
		 * when it DOESN'T handle it, and this seems exactly the wrong way
		 * around. If the base class key handling changes so that handled
		 * keypress are also stopped, this override version can be deleted.
		 * @param {Event} evt
		 */		
		_onKeyPress: function(evt){

			if(evt.ctrlKey || evt.altKey){ return; }

			switch(evt.charOrCode){
				case this._openSubMenuKey:
					if (!this._moveToColumn(+1)) {
						this._moveToPopup(evt);
					}
					event.stop(evt);
					break;
				case this._closeSubMenuKey:
					if(!this._moveToColumn(-1)){
						if(this.parentMenu){
							if(this.parentMenu._isMenuBar){
								this.parentMenu.focusPrev();
							}else{
								this.onCancel(false);
							}
						}
					}				
					event.stop(evt);
					break;
			}
		},
		
		/**
		 * Refresh the layout of the menu items in the columns.
		 */
		refresh: function(){

			// Make sure that all child widgets are in the correct columns.
			var children = this.getChildren();
			for(var i = 0; i < children.length; i++){
				this.addChild(children[i]);
			}
		},		

		/**
		 * Standard widget lifecycle buildRendering() method.
		 * @private
		 */		
		buildRendering: function(){

			this.inherited(arguments);
			
			// When the widget is created the container node is associated
			// with column 0 (by the template), so that menu items are 
			// inserted into column 0 by the default template logic. The
			// container node now needs to be moved up the DOM tree so that 
			// it covers all the columns of menu items. (The menu items that
			// were initially loaded into column 0 are moved to other columns
			// in startup(). )
			this.containerNode = this._columnContainerNode;
		},
		
		/**
		 * Standard widget lifecycle startup() method.
		 * @private
		 */		
		startup: function(){

			if(this._started){ return; }
			this._started = true;
			this.inherited(arguments);
			
			// Move the menu items that were initially loaded into column 0 
			// by the default template logic to other columns, if necessary.
			this.refresh();
		},
		
		/**
		 * Override of standard container addChild() method, to allocate
		 * menuitems and separators to specified columns. 
		 * @param {dijit._Widget} widget Menu item, separator or heading to be
		 * added to the menu.
		 * @param {number} insertIndex Optional position to insert the item
		 * into the column in.
		 */
		addChild: function(widget, insertIndex){

			// Create new columns for the menu as necessary, if the item is
			// to be placed in a column that does not exist yet.
			while(this._containerNodes.length <= (widget.column || 0)){
				var node = _TemplatedMixin.getCachedTemplate(columntemplate).cloneNode(true);
				this._attachTemplateNodes(node, function(n,p){ return n.getAttribute(p); });
				this._columnContainerNode.appendChild(node);			
			}
			
			// Add the item to the column by temporarily making the column 
			// node the container node for the widget and then invoking the
			// standard, inherited dijit._Container functionality.
			this.containerNode = this._containerNodes[widget.column || 0];		
			this.inherited(arguments);
			this.containerNode = this._columnContainerNode;
		}
	});
	
	/**
	 * Create a menu item that represents a single message and which
	 * can be inserted into One UI message menus (menus which have the
	 * additional CSS class "oneuiMessageMenu").
	 * @name createMessageMenuItem
	 * @function
	 * @memberOf idx.widget.Menu
	 * @param {Object} args An object containing some the following fields,
	 * which are all optional:
	 * <ul>
	 * 	<li>
	 * 	  type: {string}
	 * 		The type of message. This can be "error", "warning",
	 *          "information", or "success".
	 *  </li>
	 * 	<li>
	 * 	  content: {string}
	 * 		The message content.
	 *  </li>
	 * 	<li>
	 * 	  messageId: {string}
	 * 	    An identifier for the message, displayed alongside the
	 *          content.
	 *  </li>
	 * 	<li>
	 * 	  timestamp: {string}
	 * 	    The date/time that the message was originated, displayed
	 *          alongside the content.
	 *  </li>
	 * </ul>
	 * @example var menuItem = Menu.createMessageMenuItem({
     *	type: "error",    // or "warning", "information" or "success"
     *	content: "Hello, world!",
     *	timestamp: locale.format(new Date(), { formatLength: "medium", 
     *	                                       locale: this.lang }),
     *	messageId: "CAT123456"
     *});
	 */
	Menu.createMessageMenuItem = function(args){

		var label = "";
		
		if(args){
			if(args.timestamp){
				label += '\u200f<span class="messageMenuTimestamp messagesContrast">\u200e' + args.timestamp + '\u200f</span>\u200e';
			}
			
			if(args.content){
				label += '\u200f <span class="messageTitles">\u200e' + args.content + '\u200f</span>\u200e';
			}
			
			if(args.messageId){
				label += '\u200f <span class="messagesContrast">(\u200e' + args.messageId + '\u200f)</span>\u200e';
			}
		}

		return new MenuItem({ label: label, iconClass: args && args.type && icons[args.type] });
	}
	
	var oneuiRoot = lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2
	oneuiRoot.Menu = Menu;
	
	return Menu;
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
'idx/widget/nls/HoverHelp':function(){
define({root:
//begin v1.x content
({
	defaultHrefLabel: "Learn more",

	defaultMessage: "[No help text has been defined]\u200e",

	defaultTitle: "Hover or click to display help"
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
"uk": true, "vi": true
});

},
'idx/util':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
 
define(["dojo/_base/lang",
        "idx/main",
        "dojo/_base/kernel",
        "dojo/has",
		"dojo/aspect",
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
		"dojo/Stateful",
        "dijit/registry",
        "dijit/form/_FormWidget",
        "dijit/_WidgetBase",
        "dojo/_base/sniff",
        "dijit/_base/manager"], // temporarily resolve dijit.byid() uncaught exception issue in aprser 
		function(dLang,				// dojo/_base/lang
				 iMain,				// idx
		         dKernel, 			// dojo/_base/kernel
		     	 dHas,				// dojo/has
				 dAspect,			// dojo/aspect
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
				 dStateful,			// dojo/Stateful
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
		var lastIndex = 0;
		// summary:
		//		Convert given string value to given type
		switch(type){
			case "regex": 
				value = "" + value;
				lastIndex = value.lastIndexOf('/');
				if ((value.length>2) && (value.charAt(0) == '/') && (lastIndex > 0)) {
					return new RegExp(value.substring(1,lastIndex), 
									  ((lastIndex==value.length-1)?undefined:value.substring(lastIndex+1)));
				} else {
					return new RegExp(value);
				}
				break;
			case "null":
				return null;
			case "undefined":
				return undefined;
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
  
	/**
	 * Provides a way to watch an attribute on an object whether it be an instance of
	 * dojo/Stateful or dijit/_WidgetBase.  The "watch()" method does not work on 
	 * dijit/_WidgetBase instances that implement custom setters.
	 *
	 * @param {Stateful|Widget} obj The object that owns the attribute to watch.
	 * @param {String} attr The attribute name to watch.
	 *
	 * @return {Handle} Returns the handle to remove the watch or null if the attribute
	 *         cannot be watched on the specified object.
	 */
	iUtil.watch = function(obj, attr, func) {
		if (!obj) return null;
		if (!attr) return null;
		if  ((! ("watch" in obj)) || (!dLang.isFunction(obj.watch))) {
			// object is not an instance of dojo/Stateful
			return null;
		}
		attr = dString.trim(attr);
		if (attr.length == 0) return null;
		var uc = attr.charAt(0).toUpperCase();
		if (attr.length > 1) {
			uc = uc + attr.substring(1);
		}
		var funcName = "_set" + uc + "Attr";
		if (funcName in obj) {
			return dAspect.around(obj, funcName, function(origFunc) {
				return function(value) {
					var oldValue = obj.get(attr);
					origFunc.apply(obj, arguments);
					var newValue = obj.get(attr);
					if (oldValue != newValue) {
						func.call(undefined, attr, oldValue, newValue);
					}
				};
			});
		} else {
			return obj.watch(attr, func);
		}
	};
  	
    return iUtil;
});
},
'idx/widget/ConfirmationDialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang", // lang.mixin lang.hitch
	"dojo/_base/event", // event.stop
	"dojo/dom-style", // domStyle.set
	"dojo/cookie", // domStyle.set
	"dijit/form/Button",
	"idx/widget/ModalDialog",
	"idx/form/CheckBox",
	"dojo/text!./templates/ConfirmationDialog.html"
], function(declare, lang, event, domStyle, cookie, Button, ModelDialog, CheckBox, template){
	var iMessaging = lang.getObject("idx.oneui.messaging", true); // for backward compatibility with IDX 1.2
	/**
	 * @name idx.widget.ConfirmationDialog
	 * @class The ModalDialog provides the standard OneUI Confirmation Dialog.
	 * Pops up a modal dialog window, blocking access and graying out to the screen
	 * it support "OK/Cancel" option for user to make their decision
	 * @augments dijit.messaging.ConfirmationDialog
	 */
	return iMessaging.ConfirmationDialog = declare("idx.widget.ConfirmationDialog", ModelDialog, {
		/**@lends idx.widget.ConfirmationDialog*/
		
		baseClass: "idxConfirmDialog",
		templateString: template,
		/**
		 * Execute button label
		 * @type String
		 */
		buttonLabel:"",
		/**
		 * Cancel button label
		 * @type String
		 */
		cancelButtonLabel: "",
		
		postCreate: function(){
			this.inherited(arguments);
			domStyle.set(this.confirmAction, "display", "block");
			this.confirmAction = new Button({
				label: this.buttonLabel || this._nlsResources.executeButtonLabel || "OK", 
				onClick: lang.hitch(this, function(evt){
					this.onExecute();
					event.stop(evt);
				})
			}, this.confirmAction);
			this.closeAction.set("label", this.cancelButtonLabel || this._nlsResources.cancelButtonLabel || "Cancel");
			this.closeAction.focusNode && domStyle.set(this.closeAction.focusNode, "fontWeight", "normal");
			
			this.set("type", this.type || "Confirmation");
			
			if(this.checkboxNode && this.dupCheck){
                this.checkbox = new CheckBox({
                    label: this._nlsResources.checked || "Do not ask again",
                    onChange: lang.hitch(this, function(evt){
                        if(this.checkbox.get("value") == "on"){
                            this.check();
                        }else{
                            this.uncheck();
                        }
                    })
                }, this.checkbox);
			    domStyle.set(this.checkboxNode, "display", "");
			}
		},
		_confirmed: function(){
			return cookie(this.id + "_confirmed") == "true";
		},
		/**
		* Check the confirm checkbox
		*/
		check: function(){
			cookie(this.id + "_confirmed", "true");
		},
		/**
		* Un-check the confirm checkbox
		*/
		uncheck: function(){
			cookie(this.id + "_confirmed", null);
			this.checkbox.set("value", false);
		},
		/**
		* Un-check the confirm checkbox
		*/
		confirm: function(action, context){
			if(!this._confirmed()){
				this.show();
				if(this.checkbox && this.checkbox.set){
					this.checkbox.set("value", false);
				}
				this._actionListener && this.disconnect(this._actionListener);
				this._actionListener = this.connect(this, "onExecute", lang.hitch(context, action));
			}else{
				lang.hitch(context, action)();
			}
		},
		
		/**
		 * Sets a label string for OK button.
		 * @param {String} s
		 * @private
		 */
		_setLabelOkAttr: function(label){
			this.confirmAction.set("label", label || this._nlsResources.cancelButtonLabel || "OK");
		}
		
	});
})

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
"uk": true, "vi": true
});
},
'idx/widget/_EventTriggerMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

// This mix-in provides support for binding a widget to one or more DOM nodes 
// and being notified when specified events occur. Support for a "hover" trigger
// is also provided.

define(["dojo/_base/array",
        "dojo/_base/declare",
        "dojo/_base/event",
        "dojo/_base/lang",
        "dojo/dom",
		"dojo/request/iframe",
        "dojo/mouse",
        "dojo/on",
        "dojo/window",
        "dijit/_MenuBase"],
        function(array,
                 declare,
                 event,
                 lang,
                 dom,
				 iframe,
                 mouse,
                 on,
                 winUtils,
                 _MenuBase){
    
	// Ensure we're not relying on the old globals, ready for 2.0.
	var dojo = {}, dijit = {};

	/**
	 * Creates a new idx.widget._EventTriggerMixin
	 * @name idx.widget._EventTriggerMixin
	 * @class This mix-in provides support for binding a widget to one or more
	 * DOM nodes and being notified when specified events occur. Support for a
	 * "hover" trigger is also provided.
	 */
	return declare("idx.widget._EventTriggerMixin", null, 
	/** @lends idx.widget._EventTriggerMixin.prototype */
	{
		/**
		 * An array of "binding" objects that store details of the event
		 * triggers that are currently bound to trigger nodes.
		 * @type Object[]
		 */
		_bindings: null,
    
		/**
		 * A timer that is started at the beginning of a hover event and
		 * triggers the calling of onTrigger() after hoverDuration, unless it
		 * is cancelled.
		 * @type timer handle
		 */
		_hoverTimer: null,
    
		/**
		 * The time in milliseconds that the mouse needs to remain within a DOM
		 * node in order to cause a "hover" event to be reported. Initialised
		 * to match the hover delay used by menus.
		 * @type number
		 */
		hoverDuration: _MenuBase.prototype.popupDelay,
    
		/**
		 * Constructor.
		 * @private
		 */
		constructor: function(){
			this._bindings = [];
		},

		/**
		 * Register a DOM node to act as an event trigger. When the specified
		 * event is detected, the "_onTrigger" method is called, passing a
		 * trigger object containing contextual and event information as the
		 * single argument. The fields in the trigger object are as follows:
		 * <ul>
		 * <li>
		 * triggerNode: {DOMNode} the DOM node that triggered the event
		 * </li>
		 * <li>
		 * eventName: {string} the name of the event (as passed as eventName)
		 * </li>
		 * <li>
		 * event: {Event} the event object (in the case of "hover", this will be
		 * the most recent mouse.enter or mousemove event received
		 * </li>
		 * <li>
		 * additionalData: {Object} the additional data object supplied as additionalData
		 * </li>
		 * </ul>
		 * @param {string | DOMNode} triggerNode The DOM node or node ID that
		 * trigger events are to be detected on.
		 * @param {string} eventName The name of the event to be detected.
		 * As well as regular dojo events the value "hover" can also be used
		 * to configure a hover trigger.
		 * @param {function(params)} filterCallback An optional filter callback
		 * function that can be used to limit the events that are detected.
		 * If the function returns true the event is considered to be a
		 * trigger otherwise it is ignored. The same params object is supplied
		 * to the filter callback that will be passed to the _onTrigger method
		 * if the filter callback returns true. 
		 * @param {Object} additionalData Optional application-specific data
		 * that will be returned when an event is detected.
		 */
		_addEventTrigger: function(triggerNode, eventName, filterCallback, additionalData) {
 			// Resolve node ID (if passed as parameter) and validate DOM node.
			triggerNode = dom.byId(triggerNode);
			if(!triggerNode){
				require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Invalid triggerNode parameter.");
				return;
			}

			// a utility function to check the filter and call onTrigger
			// using data in the closure, hitched this, and a passed event			
			var trigger = lang.hitch(this, function(event){
				var params = { triggerNode: triggerNode, eventName: eventName, event: event, additionalData: additionalData }
				
				// If a filter callback is not defined or it returns true then
				// trigger the event. Otherwise ignore it.
				if (!filterCallback || filterCallback(params)) {
					this._onTrigger(params);
				}
			});
			
			// A utility function to create a 'hover' pseudo-event from real
			// mouse events.
			var createHoverEvent = function(event){
				return {
					type: "hover",
					pageX: event.pageX,
					pageY: event.pageY,
					screenX: event.screenX,
					screenY: event.screenY,
					clientX: event.clientX,
					clientY: event.clientY
				};
			};
      
			// store a binding object per call, containing:
			//   triggerNode: the node we attach a listener/listeners to
			//   connectHandles: an array of currently attached listeners
			//   hoverDuration: if eventName=="hover", the hover duration in ms
			//   hoverTimer: the handle to any currently-running hover timer
			//   bindFunction: a function that attaches the required listener(s)
			//   unbindFunction: a function that removes the listener(s)
			//   iframeOnLoadHandler: if triggerNode is an iframe, a function
			//                         that reattaches the listeners on iframe load
			var binding = { triggerNode: triggerNode, connectHandles: [] }
			
			if(eventName == "hover"){
				binding.hoverDuration = this.hoverDuration;
				binding.hoverTimer = null;
			} 
			
			// Create a function that implements the necessary binding logic.
			binding.bindFunction = function(){
      
				// Determine which node to connect event listeners to, which may need to 
				// be different to the specified trigger node.
				var connectNode;
				if(triggerNode.tagName == "IFRAME"){
					// If the trigger node is an iFrame then we need to attach event 
					// listeners to the <body> element of the iFrame's contents. 
					try{
						var iframeDocNode = iframe.doc(triggerNode);
						connectNode = iframeDocNode ? iframeDocNode.body : null;
					}catch(e){
						require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Error accessing body of document within iframe. " + e);
					}
				}else{
					// Normal trigger node specified - just attach event listeners to it.
					connectNode = triggerNode;
				}
				
				if(!connectNode){
					require.log("ERROR: oneui._EventTriggerMixin._addEventTrigger(): Unable to determine node to attach event listener(s) to.");
					return;
				}
				
				// If the event is "hover" then attach specific event listeners and 
				// callbacks to synthesise it, otherwise just attach the specified
				// event listener.
				if(eventName == "hover"){
					var hoverEvent = null;
					
					// Connect mouseenter and mouseleave event listeners to the 
					// connection node to start/clear the hover timer. Trigger
					// if/when the timer expires. Keep track of the mouse recent
					// mouse event too.
					binding.connectHandles.push(on(connectNode, mouse.enter, lang.hitch(this, function(event){
						hoverEvent = createHoverEvent(event);
						
						// there shouldn't be a running timer, but clear it if there is
						if(binding.hoverTimer){
							clearTimeout(binding.hoverTimer);
						} 
						
						// the hoverEvent may be replaced by the time the hover timer fires
						binding.hoverTimer = setTimeout(function(){ trigger(hoverEvent); }, binding.hoverDuration);
					})));
					
					binding.connectHandles.push(on(connectNode, mouse.leave, lang.hitch(this, function(event){
						if(binding.hoverTimer){
							clearTimeout(binding.hoverTimer);
							binding.hoverTimer = null;
						}
						hoverEvent = undefined;
					})));
					
					binding.connectHandles.push(on(connectNode, "mousemove", function(event){
						hoverEvent = createHoverEvent(event);
					}));
					
				}else{
					// Connect the appropriate event listener to the connect node.
					binding.connectHandles.push(on(connectNode, eventName, function(event){ trigger(event); }));
				}
			}
			
			// Create a disconnect function that removes all the event listeners.
			binding.unbindFunction = function(){
				array.forEach(binding.connectHandles, function(conn){ conn.remove(); });
				
				if(binding.hoverTimer){
					clearTimeout(binding.hoverTimer);
					binding.hoverTimer = null;
				}
			}
			
			// If the trigger node is an iframe then add an onload listener to it, 
			// with a callback that rebinds the handlers to the iframe content if 
			// it changes. Store the connect handle in the binding, so that it can
			// be cleaned up.
			if(triggerNode.tagName === "IFRAME"){
				binding.iframeOnLoadHandler = function(event){
					// Remove all existing event listeners.
					try{
						// This may fail because the iframe content node that the event
						// listeners are bound to has been destroyed.
						binding.unbindFunction();
					}catch(e){
						// Ignore failures - 'best efforts' cleanup.
					}

					// Rebind all of the event listeners to the iframe and new content 
					// document.
					binding.bindFunction();
				}
				
				if(triggerNode.addEventListener){
					triggerNode.addEventListener("load", binding.iframeOnLoadHandler, false);
				}else{
					triggerNode.attachEvent("onload", binding.iframeOnLoadHandler);
				}
			}

			// store the binding data, and call the bind function once now
			this._bindings.push(binding);
			binding.bindFunction(); 
		},

		/**
		 * Callback that is called whenever one of the specified trigger
		 * events (as configured via _addEventTrigger()) is detected on
		 * a DOM node.
		 * @param {Object} trigger An object that describes the triggering 
		 * event. The fields in the trigger object are as follows:
		 * <ul>
		 * <li>
		 * triggerNode: {DOMNode} the DOM node that triggered the event
		 * </li>
		 * <li>
		 * eventName: {string} the name of the event
		 * </li>
		 * <li>
		 * event: {Event} the event object (in the case of "hover", this will be
		 * a pseudo-event with properties of clientX, clientY, pageX, pageY, 
		 * screenX, screenY set when the data is available from the original 
		 * event, and type set to 'hover').
		 * </li>
		 * <li>
		 * additionalData: {Object} the additional data object supplied as
		 * additionalData via _addEventTrigger()
		 * </li>
		 * </ul>
		 */
		_onTrigger: function(trigger) {
			// summary:
			//   Callback that is called whenever one of the specified trigger events
			//   (as configured via _addEventTrigger()) is detected on a DOM node.
			//
			// parameters:
			//   trigger: Object
			//     an object containing data about the event.
			//
			//         triggerNode: DOMNode
			//           the DOM node that the trigger event was detected on.
			//
			//         eventName: String
			//           the name of the event that was detected.
			//
			//         event: Event
			//           the dojo event object describing the event.
			//
			//         additionalData: Object
			//           optional application-specific data that may have been 
			//           supplied when the event trigger was configured via
			//           _addEventTrigger().
			//
			// returns: nothing.
		},
    
		/**
		 * Deregisters a DOM node as an event trigger, by removing all the 
		 * event triggers that have been configured via _addEventTrigger().
		 * @param {string | DOMNode} triggerNode The DOM node or node ID that
		 * trigger events are no longer to be detected on. If undefined or
		 * null all event triggers for all nodes are unbound.
		 */
		_removeEventTriggers: function(triggerNode) {

			// Resolve node ID (if passed as parameter) and validate DOM node.
			if(triggerNode){
				triggerNode = dom.byId(triggerNode);
			}
      
			// Iterate through the array of bindings, unbind the appropriate ones,
			// and remove the binding records.
			for(var i = this._bindings.length - 1; i >= 0; i--){
				var binding = this._bindings[i];
				
				if(!triggerNode || (triggerNode === binding.triggerNode)){
					binding.unbindFunction();
					if(binding.iframeOnLoadHandler){
						if(binding.triggerNode.removeEventListener){
							binding.triggerNode.removeEventListener("load", binding.iframeOnLoadHandler, false);
						}else{
							binding.triggerNode.detachEvent("onload", binding.iframeOnLoadHandler);
						}
					}
					this._bindings.splice(i, 1);
				}
			}
		}
		
	});
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
"uk": true, "vi": true
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
'idx/form/NumberSpinner':function(){
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
	"dojo/_base/event", // event.stop
	"dojo/keys",
	"dijit/_base/wai",
	"dojo/dom-style",
	"dojo/dom-class",
	"dijit/form/_Spinner",
	"dijit/form/NumberTextBox",
	"idx/widget/HoverHelpTooltip",
	"./_CssStateMixin",
	"./_CompositeMixin",
	"require", 
	"require",
	
	"idx/has!#idx_form_NumberSpinner-desktop?dojo/text!./templates/Spinner.html"  // desktop widget, load the template
		+ ":#idx_form_NumberSpinner-mobile?"										// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/Spinner.html"						// global desktop platform, load template
		+ ":#mobile?"														// global mobile platform, don't load
		+ ":dojo/text!./templates/Spinner.html", 							// no dojo/has features, load the template
		
	"idx/has!#idx_form_NumberSpinner-mobile?./plugins/mobile/NumberSpinnerPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_NumberSpinner-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/mobile/NumberSpinnerPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin
		
], function(declare, lang, has, event, keys, wai, domStyle, domClass, _Spinner, NumberTextBox, HoverHelpTooltip, 
	_CssStateMixin, _CompositeMixin, _TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2
	
    /**
	 * @name idx.form.NumberSpinner
	 * @class idx.form.NumberSpinner is a composite widget which enhanced dijit.form.NumberSpinner with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in label positioning</li>
	 * <li>Built-in input hint</li>
	 * <li>Built-in input hint postioning</li>
	 * <li>Built-in 'required' attribute</li>
	 * <li>IBM One UI theme supporting</li>
	 * </ul>
	 * @augments dijit.form.NumberSpinner
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._CssStateMixin
	 * @example 
	 * 		new idx.form.NumberSpinner({ constraints:{ max:300, min:100 }}, "someInput");
	 */
	 
	var NumberSpinner = declare([_Spinner, NumberTextBox.Mixin,  _CompositeMixin, _CssStateMixin], {
		/**@lends idx.form.NumberSpinner*/
		// instantValidate: Boolean
		//		Fire validation when widget get input by set true, 
		//		fire validation when widget get blur by set false
		instantValidate: false,
		templateString: desktopTemplate,
		baseClass: "idxNumberSpinnerWrap",
		oneuiBaseClass: "dijitTextBox dijitSpinner",
		cssStateNodes: {
			"inputNode": "dijitInputContainer",
			"upArrowNode": "dijitUpArrowButton",
			"downArrowNode": "dijitDownArrowButton"
		},
		postCreate: function(){
			this.inherited(arguments);
			if(this.instantValidate){
				this.connect(this, "_onFocus", function(){
					if (this._hasBeenBlurred && (!this._refocusing)) {
						this.validate(true);
					}
				});
				this.connect(this, "_onInput", function(){
					this.validate(true);
				});
				this._computeRegexp(this.constraints);
			}else{
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
		refocus: function() {
			this._refocusing = true;
			this.focus();
			this._refocusing = false;
		},
		adjust: function(/*Object*/ val, /*Number*/ delta){
			// summary:
			//		Change Number val by the given amount
			// tags:
			//		protected
	
			var tc = this.constraints,
				v = isNaN(val),
				gotMax = !isNaN(tc.max),
				gotMin = !isNaN(tc.min)
			;
			if(v && delta != 0){ // blank or invalid value and they want to spin, so create defaults
				val = (delta > 0) ?
					gotMin ? tc.min : gotMax ? tc.max : 0 :
					gotMax ? this.constraints.max : gotMin ? tc.min : 0
				;
			}
			var newval = val + delta;
			if(v || isNaN(newval)){ return val; }
			if(gotMax && (newval > tc.max)){
				newval = tc.max;
			}
			if(gotMin && (newval < tc.min)){
				newval = tc.min;
			}
			return newval;
		},
		_setUnitAttr: function(){
			this.inherited(arguments);
			wai.setWaiState(this.upArrowNode, "describedby", this.id + "_unit");
			wai.setWaiState(this.downArrowNode, "describedby", this.id + "_unit");
		},
		
		_isEmpty: function(){
			var v = this.get("value");
			return (v !== undefined) && isNaN(v);
		},
		_onKeyPress: function(e){
			if(this.disabled || this.readOnly){
				return;
			}
			if((e.charOrCode == keys.HOME || e.charOrCode == keys.END) && !(e.ctrlKey || e.altKey || e.metaKey)
			&& typeof this.get('value') != 'undefined' /* gibberish, so HOME and END are default editing keys*/){
				var value = this.constraints[(e.charOrCode == keys.HOME ? "min" : "max")];
				if(typeof value == "number"){
					this._setValueAttr(value, false);
				}
				// eat home or end key whether we change the value or not
				event.stop(e);
			}
		},
		/**
		 * Show error message using a hoverHelpTooltip, hide the tooltip if message is empty.
		 * @param {string} message
		 * Error message
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
		},
		_onInputContainerEnter: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitSpinnerInputContainerHover", true);
		},
		_onInputContainerLeave: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitSpinnerInputContainerHover", false);
		}
	});
	
	if(has("mobile") || has("platform-plugable")){
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/NumberSpinner", {	
			desktop: "inherited",	// no plugin for desktop, use inherited methods  
			mobile: MobilePlugin	// use the mobile plugin if loaded
		});
		
		NumberSpinner = declare([NumberSpinner,_TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			
			
			templatePath: require.toUrl("idx/form/templates/Spinner.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			 			
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			},
			isFocusable: function(){
				return this.syncDoWithPlatformPlugin(arguments, "isFocusable", "isFocusable");
			},
			_arrowPressed: function(nodePressed, direction, increment){
				return this.doWithPlatformPlugin(arguments, "_arrowPressed", "arrowPressed", nodePressed, direction, increment);
			}
		});
	}
	return iForm.NumberSpinner = declare("idx.form.NumberSpinner", NumberSpinner);
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
		if (bundleName.length == 0) continue;
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
   * @name idx.resources.getDependencies
   *
   * @description Obtains the array of "dojo/i18n!" dependencies for the specified scope.
   * 
   * @param {String} scope The optional string to override resources in a specific scope.  If not
   *                       specified then the global scope is assumed.
   * @returns {String[]} Returns the array of "dojo/i18n!" dependencies.
   */
  iResources.getDependencies = function(/*String?*/ scope) {
    scope = iResources._normalizeScope(scope);
	var dependencies = [];
	var scopes = scope.split("/");
    var index = 0;
    var pkg = "";
    var prefix = "";
	var bundleName = "";
	var dependency = "";
    for (index = 0; index < scopes.length; index++) {
    	bundleName = "base";
    	if (index < scopes.length-1) {
    		pkg = pkg + prefix + scopes[index];
    		prefix = "/";
    	} else {
    		bundleName = scopes[index];
    	}
		if (bundleName.length == 0) continue;
		dependency = "dojo/i18n!" + pkg + prefix + "nls/" +  bundleName;
		dependencies.push(dependency);
    }

	return dependencies;
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
'idx/app/nls/Header':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define({ root:
//begin v1.x content
({
	ibmlogo: "IBM&reg;",
	actionShare: "Share",
	actionSettings: "Settings",
	actionHelp: "Help",
	searchEntry: "Search",
	searchSubmit: "Search",
	primarySearchLabelSuffix: "primary search",
	secondarySearchLabelSuffix: "secondary search",
	homeButton: "Home"
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
"uk": true, "vi": true
});
},
'idx/form/dropDownButtons':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/_base/kernel"],
	   function(dLang,iMain,dKernel) {
	dKernel.deprecated("idx.form.dropDownButtons","idx.form.dropDownButtons deprecated. The idx/form/dropDownButtons module is no longer needed since Dojo 1.8");
	/**
	 * @name idx.form.dropDownButtons
	 * @class Extension to dijit.form.DropDownButton to add the "idxDropDownOpen" CSS class whenever
	 *        the DropDownButton is opened.  This allows for alternate styling on the widget when it is
	 *        has its drop-down in the open state.  This is included with "idx.ext".
	 */
	var iDropDownButtons = dLang.getObject("form.dropDownButtons", true, iMain);
	
	return iDropDownButtons;
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
"uk": true, "vi": true
});
},
'idx/form/_ComboBoxMenu':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/event",
	"dojo/dom-class",
	"dojo/query",
	"dijit/form/_ComboBoxMenu"
], function(declare, event, domClass, query, _ComboBoxMenu){
	
	//	module:
	//		idx/form/_ComboBoxMenu
	//	summary:
	//		One UI version ComboBox Menu

	return declare("idx.form._ComboBoxMenu", [_ComboBoxMenu],{
		// summary:
		//		One UI version ComboBox Menu
		
		_onMouseUp: function(/*Event*/ evt){
			if(!this.readOnly){
				this.inherited(arguments);
			}
		},
		
		_onMouseDown: function(/*Event*/ evt, /*DomNode*/ target){
			event.stop(evt);
			if(this._hoveredNode){
				this.onUnhover(this._hoveredNode);
				this._hoveredNode = null;
			}
			this._isDragging = true;
			
			// Workaround to make code compatible with 1.7 & 1.8
			var node = target;
			
			this._setSelectedAttr(node);
			if(node && node.parentNode == this.containerNode){
				this.onMouseDown(node);
			}
		},
		
		onMouseDown: function(/*DomNode*/ node){
			domClass.add(node, "dijitMenuItemActive");
		},
		onUnMouseDown: function(/*DomNode*/ node){
			query(".dijitMenuItemActive", this.domNode).removeClass("dijitMenuItemActive");
		}
	});
});
},
'idx/widget/ModalDialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/kernel", // kernel.isAsync
	"dojo/_base/array", // array.forEach array.indexOf array.map
	"dojo/_base/declare", // declare
	"dojo/_base/html", // Deferred
	"dojo/_base/event", // event.stop
	"dojo/_base/lang", // lang.mixin lang.hitch
	"dojo/query", // Query
	"dojo/dom-attr", // attr.set
	"dojo/dom-class", // domClass.add domClass.contains
	"dojo/dom-style", // domStyle.set
	"dojo/i18n", // i18n.getLocalization
	"dojo/keys",
	"dojo/on",
	"dojo/ready",
	"dojo/date/locale",
	"dijit/_base/wai",
	"dijit/_base/manager",	// manager.defaultDuration
	"dijit/a11y",
	"dijit/focus",
	"dijit/layout/ContentPane",
	"dijit/Dialog", 
	"idx/widget/_DialogResizeMixin",
	"dijit/layout/TabContainer", 
	"dijit/TitlePane", 
	"dijit/form/Button",
	"dojo/text!./templates/ModalDialog.html",
	"dojo/i18n!./nls/ModalDialog"
], function(kernel, array, declare, html, event, lang, 
		query, domAttr, domClass, domStyle, i18n, keys, on, ready, locale, 
		wai, manager, a11y, focus, ContentPane, Dialog, _DialogResizeMixin,
		TabContainer, TitlePane, Button, template){
	var iMessaging = lang.getObject("idx.oneui.messaging", true); // for backward compatibility with IDX 1.2
	
	/**
	* @name idx.widget.ModalDialog
	* @class The ModalDialog provides the standard OneUI Modal Dialog.
	* Pops up a modal dialog window, blocking access to the screen
	* and also graying out the screen.
	* @augments dijit.Dialog
	* @see The <a href="http://livedocs.dojotoolkit.org/dijit/info">dijit.Dialog</a>.
	*/ 
	return iMessaging.ModalDialog = declare("idx.widget.ModalDialog", [Dialog, _DialogResizeMixin], {
	/**@lends idx.widget.ModalDialog*/ 
		templateString: template,
		widgetsInTemplate: true,
		baseClass: "idxModalDialog",
		alert: false, // Determines if the modal dialog is 'alertdialog' role. 
		_messagingTypeMap: {
			error: "Error",
			warning: "Warning",
			information: "Information",
			success: "Success",
			confirmation: "Confirmation",
			question: "Question",
			progress: "Progress"
		},
		/**
		 * Message type
		 * @type String
		 */
		type: "",
		/**
		 * Message summary 
		 * @type String
		 */
		text: "",
		/**
		 * Message main content, create compact tab container in array
		 * @type String | Array[{title, content}]
		 */
		info: "",
		/**
		 * Message identifier
		 * @type String
		 */
		messageId: "",
		/**
		 * Message additional reference
		 * @type HTML URL
		 */
		messageRef: null,
		/**
		 * Timestamp of Message
		 * @type String | Date
		 */
		messageTimeStamp: new Date(),
		/**
		 * The options being used for format the timestamp.
		 * Example:
		 * <pre>
		 * dateFormat: {
		 * 	formatLength: "medium",
		 * }
		 * </pre>
		 * @type dojo.date.locale.__FormatOptions
		 */
		dateFormat: {
			formatLength: "short"
		},
		/**
		 * Close button label
		 * @type String
		 */
		closeButtonLabel: "",
		/**
		 * Specifies whether to show an action bar with buttons.
		 * @type Boolean
		 * @default true
		 */
		showActionBar: true,
	
		/**
		 * Specifies whether to show an icon.
		 * @type Boolean
		 * @default true
		 */
		showIcon: true,
	
		/**
		 * Specifies whether to show a cancel button.
		 * @type Boolean
		 * @default false
		 */
		showCancel: true,
		
		executeOnEnter: true,
		
		/** @ignore */
		postMixInProperties: function(){
			//	Set "Information" as default messaging type.no 
			this._nlsResources = i18n.getLocalization("idx.widget", "ModalDialog", this.lang);
			this._a11yImageMapping = {
				error: "X",
				warning: "!",
				information: "i",
				success: "√",
				confirmation: "!",
				question: "?",
				progress: "◇"
			}
			this.messageIconText = this._a11yImageMapping[(this.type || "information").toLowerCase()];
			var type = this._messagingTypeMap[(this.type || "information").toLowerCase()],
				title = this._nlsResources[type] || "Information";
			lang.mixin(this, {title: title, type: type});
			lang.mixin(this.params, {type: type});
			//	Set error modal dialog as 'alertdialog' role by default.
			if(!this.alert && (this.type == "Error")){
				this.alert = true;
			}
			this.inherited(arguments);
		},
		/** @ignore */
		buildRendering: function(){
			this.inherited(arguments);
			if(!this.messageId && this.reference){
				domStyle.set(this.reference, "display", "none");
			}
			domAttr.set(this.iconText, "innerHTML", this.messageIconText);
			if(this.info && lang.isArray(this.info)){
				this.tabs = new TabContainer({
					useMenu: false,
					useSlider: false,
					style: "height:175px"
				}, this.containerNode);
				domStyle.set(this.messageWrapper, "borderTop", "0 none");
				array.forEach(this.info, function(item){
					var contentPane = new ContentPane({
						title: item.title,
						content: item.content
					});
					//wai.setWaiRole(contentPane.domNode, "document");
					this.tabs.addChild(contentPane);
				}, this);
			}
			
			this.showActionBarNode(this.showActionBar);
			this.showIconNode(this.showIcon);
		},
		/** @ignore */
		postCreate: function(){
			this.inherited(arguments);
			domStyle.set(this.confirmAction, "display", "none");
			this.closeAction = new Button({
				label: this.closeButtonLabel || this._nlsResources.closeButtonLabel || "Close",
				onClick: lang.hitch(this, function(evt){
					this.onCancel();
					event.stop(evt);
				})
			}, this.closeAction);
			this.showCancelNode(this.showCancel);
			
			if(this.tabs){
				this.connect(this, "show", function(){
					// enable focus indications for message details as static text.
					query(".dijitTabPane",this.messageWrapper).attr("tabindex", 0).style({padding:"6px",margin:"2px"});
					this.tabs.resize();
				});
			}else{
				//wai.setWaiRole(this.containerNode, "document");
				if(this.info){
					this.set("content", this.info);
				}
			}
			if(this.alert){
				wai.setWaiRole(this.domNode, "alertdialog");
			}
			query(".dijitTitlePaneContentInner", this.messageWrapper).attr("tabindex", 0);
			
			if(this.reference){
				if(this.messageRef){
					domAttr.set(this.reference, "href", this.messageRef);
				}else{
					domClass.add(this.reference, "messageIdOnly");
				}
			}
			if(!this.info && !lang.trim(this.containerNode.innerHTML)){
				domStyle.set(this.messageWrapper, "display", "none");
			} 
		},
		_onKey: function(evt){
			this.inherited(arguments);
			if(!this.executeOnEnter){return;}
			var node = evt.target;
			if(domAttr.has(node, "href")){return;}
			if(node == this.closeAction.focusNode || node == this.confirmAction.focusNode){return;}
			while(node){
				if(node == this.domNode || domClass.contains(node, "dijitPopup")){
					if(evt.keyCode == keys.ENTER){
						this.onExecute();
					}else{
						return; // just let it go
					}
				}
				node = node.parentNode;
			}
			event.stop(evt);
		},
		/** @ignore */
		startup: function(){
			if(this.tabs){
				this.tabs.startup();
			}
			this.inherited(arguments);
		},
		_setTypeAttr: function(type){
		    var oldType = this.type;
			this.type = type;
			var title = this._nlsResources[this.type] || "Information";
			this.set("title", title);
			
			var oldTypeName = this._messagingTypeMap[(oldType || "information").toLowerCase()];
			var typeName = this._messagingTypeMap[(this.type || "information").toLowerCase()];
			domClass.remove(this.icon, "message" + oldTypeName + "Icon");
			domClass.add(this.icon, "message" + typeName + "Icon");
		},
		_setTextAttr: function(text){
			this.description.innerHTML = this.text = text;
		},
		/**
		 * Get the focused item in the content of dialog
		 */
		_getFocusItems: function(){
			//	summary:
			//		override _DialogMixin._getFocusItems.
			if(this._firstFocusItem){
				this._firstFocusItem = this.description;
				return;
			}
			if(!this.tabs){
				this._firstFocusItem = this.closeAction.focusNode;
				this._lastFocusItem = //this.messageId == "" ? this.description : this.reference;
					this.closeAction.focusNode;
			}else{
				var elems = a11y._getTabNavigable(this.messageWrapper);
				this._firstFocusItem = elems.lowest || elems.first || this.closeButtonNode || this.domNode;
				this._lastFocusItem = this.closeAction.focusNode;//this.description;
			}
		},
		/**
		* hide the dialog
		*/
		hide: function(){
			this._firstFocusItem = null;
			return this.inherited(arguments);
		},
		
		/**
		 * Shows an action bar.
		 * @param {Boolean} yes
		 */
		showActionBarNode: function(yes){
			domStyle.set(this.actionBar, "display", yes? "": "none");
		},
	
		/**
		 * Shows an icon.
		 * @param {Boolean} yes
		 */
		showIconNode: function(yes){
			domStyle.set(this.icon, "display", yes? "": "none");
		},
	
		/**
		 * Shows a cancel button
		 * @param {Boolean} yes
		 */
		showCancelNode: function(yes){
			domStyle.set(this.closeAction.domNode, "display", yes? "": "none");
		},
		
		/**
		 * Sets a label string for the cancel button.
		 * @param {String} s
		 * @private
		 */
		_setLabelCancelAttr: function(label){
			this.closeAction.set("label", label || this._nlsResources.cancelButtonLabel || "Cancel");
		},
		_setMessageTimeStampAttr: function(date){
			this._set(this.messageTimeStamp, date);
			if(!this.timestamp)return;
			if(this.messageTime && date){
				this.timestamp.innerHTML = locale.format(this.messageTimeStamp, this.dateFormat);
			}else{
				domStyle.set(this.timestamp, "display", "none");
			}
		},
		/**
		 * Callback of reference click, overriden by user
		 */
		onReference: function(event){
			
			return true;
		}
	
	});
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
'idx/nls/base':function(){
define({root:
//begin v1.x content
({

})
//end v1.x content
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
	"require", 
	"require",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	"idx/has!#idx_form_Select-desktop?dojo/text!./templates/Select.html"  // desktop widget, load the template
		+ ":#idx_form_Select-mobile?"									// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/Select.html"					// global desktop platform, load template
		+ ":#mobile?"													// global mobile platform, don't load
		+ ":dojo/text!./templates/Select.html", 						// no dojo/has features, load the template
			
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"idx/has!#idx_form_Select-mobile?./plugins/phone/SelectPlugin"			// mobile widget, load the plugin
		+ ":#idx_form_Select-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/phone/SelectPlugin"							// global mobile platform, load plugin
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
			var self = this;
			return new dijit.form._SelectMenu({ 
				id: this.id + "_menu", 
				parentWidget: this,
				_onUpArrow: function( evt ){
					
					if ( evt.altKey && this.focusedChild && !this._getNext(this.focusedChild, -1) ){
						self.closeDropDown(true);
					}
					else{
						this.focusPrev();	
					}
					
				},
				_onDownArrow: function( evt ){
					if ( evt.altKey && this.focusedChild && !this._getNext(this.focusedChild, 1) ){
						self.closeDropDown(true);
					}
					else{
						this.focusNext();	
					}
				}
			});
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
			if(this._holdResize()){
				return;
			}
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
'idx/widget/nls/base':function(){
define({root:
//begin v1.x content
({

})
//end v1.x content
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
			// Fix for Defect 12350: 
			if(!dom.byId(target)){return;}
			
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
'idx/form/ComboBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/_base/event",
	"dojo/_base/Deferred",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/data/util/filter",
	"dojo/window",
	"dojo/keys",
	"dojo/has",
	"dojo/query", 
	"dijit/form/ComboBox",
	"dijit/_WidgetsInTemplateMixin",
	"idx/widget/HoverHelpTooltip",
	"./_CssStateMixin",
	"./_ComboBoxMenu",
	"./_CompositeMixin",
	"./_AutoCompleteA11yMixin",
	// ====================================================================================================================
	// ------
	// Load _TemplatePlugableMixin and PlatformPluginRegistry if on "mobile" or if on desktop, but using the 
	// platform-plugable API.  Any prior call to PlaformPluginRegistry.setGlobalTargetPlatform() or 
	// PlatformPluginRegistry.setRegistryDefaultPlatform() sets "platform-plugable" property for dojo/has.
	// ------
	"require", 
	"require",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	"idx/has!#idx_form_ComboBox-desktop?dojo/text!./templates/ComboBox.html" 	// desktop widget, load the template
		+ ":#idx_form_ComboBox-mobile?"											// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/ComboBox.html"						// global desktop platform, load template
		+ ":#mobile?"															// global mobile platform, don't load
		+ ":dojo/text!./templates/ComboBox.html", 								// no dojo/has features, load the template
			
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"idx/has!#idx_form_ComboBox-mobile?./plugins/phone/ComboBoxPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_ComboBox-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/phone/ComboBoxPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin

	// ====================================================================================================================
], function(declare, lang, win, event, Deferred, domClass, domStyle, filter, winUtils, keys, has, query, ComboBox, 
			_WidgetsInTemplateMixin, HoverHelpTooltip, _CssStateMixin, _ComboBoxMenu,  _CompositeMixin, _AutoCompleteA11yMixin, 
			TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	
	var baseClassName = "idx.form.ComboBox";
	if (has("mobile") || has("platform-plugable")) {
		baseClassName = baseClassName + "Base";
	}
	if (has("dojo-bidi")) {
		baseClassName = baseClassName + "_";
	}
	
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2
	
	/**
	 * @name idx.form.ComboBox
	 * @class idx.form.ComboBox is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y27&vsub=*&hsub=*&openpanes=0000010000">Combo Boxes Standard</a></b>.
	 * It is a composite widget which enhanced dijit.form.ComboBox with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in label positioning</li>
	 * <li>Built-in hint</li>
	 * <li>Built-in hint positioning</li>
	 * <li>Built-in required attribute</li>
	 * <li>One UI theme support</li>
	 * </ul>
	 * @augments dijit.form.ComboBox
	 * @augments idx.form._CssStateMixin
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._ValidationMixin
	 */
	iForm.ComboBox = declare(baseClassName, [ComboBox, _CssStateMixin, _CompositeMixin],
	/**@lends idx.form.ComboBox.prototype*/
	{
		// summary:
		//		One UI version ComboBox
		
		instantValidate: false,
		
		baseClass: "idxComboBoxWrap",
		
		oneuiBaseClass: "dijitTextBox dijitComboBox",
		
		templateString: desktopTemplate,
		
		dropDownClass: _ComboBoxMenu,
		
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},
		
		startup: function(){
			// summary:
			//		for some case, dynamically create widget
			//		the query module can not find the label when the widget is not place at the dom tree 
			// tags:
			//		protected
			this.inherited(arguments);
			// find any associated label element and add to ComboBox node.
			var label = query('label[for="' + this.id + '"]');
			if(label.length){
				if(!label[0].id){
					label[0].id = this.id + "_label";
				}
			}
		},
		/**
		 * 
		 */
		postCreate: function(){
			this.dropDownClass = _ComboBoxMenu;
			this.inherited(arguments);
			//Defect 11821, remove the aria-labelledby attribute from the dom node
			this.domNode.removeAttribute("aria-labelledby");
			if(this.instantValidate){
				this.connect(this, "_onFocus", function(){
					if (this._hasBeenBlurred && (!this._refocusing)) {
						this.validate(true);
					}
				});
				this.connect(this, "_onInput", function(){
					this.validate(true);
				});
			}else{
				this.connect(this, "_onFocus", function(){
					if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
						this.displayMessage(this.message);
					}
				})
			}
			this._resize();
		},
		/**
		 * Defect 11885
		 * overwrite the method in _CompositeMixin
		 * @param {Object} v
		 */
		_setPlaceHolderAttr: function(){
			this._placeholder = false;
			this.inherited(arguments);
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
		
		/**
		 * Override the method in _HasDropDown.js to move the attribute
		 * # Defect 9469
		 */
		closeDropDown: function(){
			this.inherited(arguments);
			this.domNode.removeAttribute("aria-expanded");			
		},
		
		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			// summary:
			//		Overwrite dijit.form._AutoCompleterMixin._openResultList to focus the selected
			//		item when open the menu.
			
			// ie 11 oninput defect for combobox/filteringselect
			// open dropdown when startup
			this._fetchHandle = null;
			if(	this.disabled ||
				this.readOnly ||
				(query[this.searchAttr] !== this._lastQuery)	// TODO: better way to avoid getting unwanted notify
			){
				return;
			}
			var wasSelected = this.dropDown.getHighlightedOption();
			this.dropDown.clearResultList();
			if(!results.length && options.start == 0){ // if no results and not just the previous choices button
				this.closeDropDown();
				return;
			}
	
			this._nextSearch = this.dropDown.onPage = lang.hitch(this, function(direction){
				results.nextPage(direction !== -1);
				this.focus();
			});
			
			// Fill in the textbox with the first item from the drop down list,
			// and highlight the characters that were auto-completed. For
			// example, if user typed "CA" and the drop down list appeared, the
			// textbox would be changed to "California" and "ifornia" would be
			// highlighted.
			
			// This method does not return any value in 1.8.
			this.dropDown.createOptions(
				results,
				options,
				lang.hitch(this, "_getMenuLabelFromItem")
			);
			
			// Use following code to get child nodes.
			var nodes = this.dropDown.containerNode.childNodes;
	
			// show our list (only if we have content, else nothing)
			this._showResultList();
			this.domNode.removeAttribute("aria-expanded");
			// Focus the selected item
			if( !this._lastInput && this.focusNode.value ){

				for(var i = 0; i < nodes.length; i++){
					var item = this.dropDown.items[nodes[i].getAttribute("item")];
					if(item){
						var queryOption = {};
						queryOption[this.searchAttr] = item[this.searchAttr];
						var value = this.store.query(queryOption);
						if ( value && value.length > 0)
							value = value[0][this.searchAttr];
						
						if(value == this.displayedValue){
							this.dropDown._setSelectedAttr(nodes[i]);
							winUtils.scrollIntoView(this.dropDown.selected);
							break;
						}
					}
				}
			}
			
			// #4091:
			//		tell the screen reader that the paging callback finished by
			//		shouting the next choice
			if(options.direction){
				if(1 == options.direction){
					this.dropDown.highlightFirstOption();
				}else if(-1 == options.direction){
					this.dropDown.highlightLastOption();
				}
				if(wasSelected){
					this._announceOption(this.dropDown.getHighlightedOption());
				}
			}else if(this.autoComplete && !this._prev_key_backspace
				// when the user clicks the arrow button to show the full list,
				// startSearch looks for "*".
				// it does not make sense to autocomplete
				// if they are just previewing the options available.
				&& !/^[*]+$/.test(query[this.searchAttr].toString())){
					this._announceOption(nodes[1]); // 1st real item
			}
		},
		
		_onInputContainerEnter: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", true);
		},
		
		_onInputContainerLeave: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", false);
		},
		
		_setReadOnlyAttr: function(value){
			// summary:
			//		Sets read only (or unsets) all the children as well
			this.inherited(arguments);
			if(this.dropDown){
				this.dropDown.set("readOnly", value);
			}
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
		},
		_setBlurValue: function(){
			// if the user clicks away from the textbox OR tabs away, set the
			// value to the textbox value
			// #4617:
			//		if value is now more choices or previous choices, revert
			//		the value
			var newvalue = this.get('displayedValue');
			var pw = this.dropDown;
			if(pw && (
				newvalue == pw._messages["previousMessage"] ||
				newvalue == pw._messages["nextMessage"]
				)
			){
				this._setValueAttr(this._lastValueReported, true);
			}else if(typeof this.item == "undefined"){
				// Update 'value' (ex: KY) according to currently displayed text
				this.item = null;
				this.set('displayedValue', newvalue);
			}else{
				if(this.value != this._lastValueReported){
					this._handleOnChange(this.value, true);
				}
				this._setValueAttr(newvalue, true);
			}
		}
	});
	
	if ( has("mobile") || has("platform-plugable")) {
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/ComboBox", 
				{	
					desktop: "inherited",	// no plugin for desktop, use inherited methods  
				 	mobile: MobilePlugin	// use the mobile plugin if loaded
				});
		var localDropDownClass = _ComboBoxMenu;
		if (MobilePlugin && MobilePlugin.prototype && MobilePlugin.prototype.dropDownClass){
			localDropDownClass = MobilePlugin.prototype.dropDownClass;
		}
		iForm.ComboBox = declare("idx.form.ComboBox",[iForm.ComboBox, TemplatePlugableMixin, _WidgetsInTemplateMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			templatePath: require.toUrl("idx/form/templates/ComboBox.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			/**
			 * 
			 */
			inProcessInput: false,
			/**
			 * 
			 */
			postCreate: function(){
				// set the dropDownClass into property of an instance
				this.dropDownClass = localDropDownClass;
				return this.doWithPlatformPlugin(arguments, "postCreate", "postCreate");
			},
			/**
			 * Stub Plugable method
			 */
			onCloseButtonClick: function(){
				return this.doWithPlatformPlugin(arguments, "onCloseButtonClick", "onCloseButtonClick");
			},
			/**
			 * Stub Plugable method
			 */
			onInput: function(){
				return this.doWithPlatformPlugin(arguments, "onInput", "onInput");
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
			loadDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "loadDropDown", "loadDropDown");
			},
			/**
			 * Stub Plugable method
			 */
			openDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "openDropDown", "openDropDown");
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
			closeDropDown:function(){
				return this.doWithPlatformPlugin(arguments, "closeDropDown", "closeDropDown");
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
	
	return iForm.ComboBox;
});

},
'idx/form/TimeTextBox':function(){
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
	"dojo/on",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/keys",
	"dijit/_TimePicker",
	"idx/widget/HoverHelpTooltip",
	"./_CssStateMixin",
	"./_DateTimeTextBox",
	"./_CompositeMixin",
	"require", 
	"require",
	
	"idx/has!#idx_form_TimeTextBox-desktop?dojo/text!./templates/DropDownBox.html"  // desktop widget, load the template
		+ ":#idx_form_TimeTextBox-mobile?"										// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/DropDownBox.html"						// global desktop platform, load template
		+ ":#mobile?"														// global mobile platform, don't load
		+ ":dojo/text!./templates/DropDownBox.html", 							// no dojo/has features, load the template
		
	"idx/has!#idx_form_TimeTextBox-mobile?./plugins/mobile/TimeTextBoxPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_TimeTextBox-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/mobile/TimeTextBoxPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin
		
], function(declare, lang, has, on, domStyle, domClass, domConstruct, domAttr, keys, _TimePicker, HoverHelpTooltip,
			_CssStateMixin, _DateTimeTextBox, _CompositeMixin, 
			_TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	var oneuiForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2
	var iForm = lang.getObject("idx.form", true);

	/**
	* @name idx.form.TimeTextBox
	* @class A validating, serializable, range-bound time text box with a drop down time picker
	* @augments idx.form._DateTimeTextBox
	* @augments idx.form._CompositeMixin
	* @augments idx.form._CssStateMixin
	*/ 
	var TimeTextBox = declare("idx.form.TimeTextBox_base", [_DateTimeTextBox, _CompositeMixin, _CssStateMixin], {
	/**@lends idx.form.TimeTextBox*/ 
		// summary:
		//		A validating, serializable, range-bound time text box with a drop down time picker
		templateString: desktopTemplate,
		// instantValidate: Boolean
		//		Fire validation when widget get input by set true, 
		//		fire validation when widget get blur by set false
		instantValidate: false,
		baseClass: "idxTimeTextBoxWrap",
		oneuiBaseClass: "dijitTextBox dijitComboBox dijitTimeTextBox",
		_selector: "time",
		popupClass: "dijit._TimePicker",

		// value: Date
		//		The value of this widget as a JavaScript Date object.  Note that the date portion implies time zone and daylight savings rules.
		//
		//		Example:
		// |	new idx.form.TimeTextBox({value: dojo.date.stamp.fromISOString("T12:59:59", new Date())})
		//
		//		When passed to the parser in markup, must be specified according to locale-independent
		//		`dojo.date.stamp.fromISOString` format.
		//
		//		Example:
		// |	<input dojotype='idx.form.TimeTextBox' value='T12:34:00'>
		value: new Date(""),		// value.toString()="NaN"
		//FIXME: in markup, you have no control over daylight savings
		
		showPickerIcon: false,
		
		/** @ignore */
		postCreate: function(){
			this.inherited(arguments);
			if(this.instantValidate){
				this.connect(this, "_onFocus", function(){
					if (this._hasBeenBlurred && (!this._refocusing)) {
						this.validate(true);
					}
				});
				this.connect(this, "_onInput", function(){
					this.validate(true);
				});
			}else{
				this.connect(this, "_onFocus", function(){
					if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
						this.displayMessage(this.message);
					}
				});
			}
			//domAttr.set(this.oneuiBaseNode, "title", this.iconTitle || this._nlsResources.idxTimeIconTitle || "Click to open time picker");
			
			if(this.showPickerIcon){
				var iconNode = domConstruct.create("div", {
					title: this.iconTitle || this._nlsResources.idxTimeIconTitle || "Click to open time picker",
					//tabIndex: 0,
					className: "dijitInline idxPickerIconLink"
				}, this.oneuiBaseNode);
				
				var iconImage = domConstruct.create("img", {
					alt: this.iconAlt || this._nlsResources.idxTimeIconTitle || "Click to open time picker",
					className: "idxPickerIcon idxTimeIcon",
					src: this._blankGif
				}, iconNode);
				
				//a11y
				var iconImage_a11y = domConstruct.create("div", {
					className: "idxPickerIcon_a11y idxTimeIcon_a11y",
					innerHTML: "&#128338;"
				}, iconNode);
				
				domStyle.set(this.oneuiBaseNode, "position", "relative");
			}
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
		/**
		* key event processor
		*/
		_onKey: function(evt){
			if(this.disabled || this.readOnly){ return; }
			this.inherited(arguments);

			// If the user has backspaced or typed some numbers, then filter the result list
			// by what they typed.  Maybe there's a better way to detect this, like _handleOnChange()?
			switch(evt.keyCode){
				case keys.ENTER:
				case keys.TAB:
				case keys.ESCAPE:
				case keys.DOWN_ARROW:
				case keys.UP_ARROW:
					// these keys have special meaning
					break;
				default:
					// defer() because the keystroke hasn't yet appeared in the <input>,
					// so the get('displayedValue') call below won't give the result we want.
					this.defer(function(){
						// set this.filterString to the filter to apply to the drop down list;
						// it will be used in openDropDown()
						var val = this.get('displayedValue');
						this.filterString = (val && !this.parse(val, this.constraints)) ? val.toLowerCase() : "";

						// close the drop down and reopen it, in order to filter the items shown in the list
						// and also since the drop down may need to be repositioned if the number of list items has changed
						// and it's being displayed above the <input>
						if(this._opened){
							this.closeDropDown();
						}
						this.openDropDown();
					});
			}
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
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/TimeTextBox", {	
			desktop: "inherited",	// no plugin for desktop, use inherited methods  
			mobile: MobilePlugin	// use the mobile plugin if loaded
		});
		
		TimeTextBox = declare([TimeTextBox,_TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			
			
			templatePath: require.toUrl("idx/form/templates/DropDownBox.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			
			openDropDown: function(callback){
				return this.doWithPlatformPlugin(arguments, "openDropDown", "openDropDown", callback);
			},
			closeDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "closeDropDown", "closeDropDown");
			},
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			}
			// _onBlur: function(e){
				// return this.doWithPlatformPlugin(arguments, "_onBlur", "onBlur", e);
			// }
		});
	}
	return iForm.TimeTextBox = declare("idx.form.TimeTextBox", TimeTextBox);
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
"uk": true, "vi": true
});

},
'idx/form/FilteringSelect':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-style",
	"dojo/window",
	"dojo/has",
	"dijit/_WidgetsInTemplateMixin",
	"dijit/form/FilteringSelect",
	"idx/widget/HoverHelpTooltip",
	"./_CompositeMixin",
	"./_CssStateMixin",
	"./_AutoCompleteA11yMixin",
	// ====================================================================================================================
	// ------
	// Load _TemplatePlugableMixin and PlatformPluginRegistry if on "mobile" or if on desktop, but using the 
	// platform-plugable API.  Any prior call to PlaformPluginRegistry.setGlobalTargetPlatform() or 
	// PlatformPluginRegistry.setRegistryDefaultPlatform() sets "platform-plugable" property for dojo/has.
	// ------
	"require", 
	"require",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	"idx/has!#idx_form_FilteringSelect-desktop?dojo/text!./templates/ComboBox.html" 	// desktop widget, load the template
		+ ":#idx_form_FilteringSelect-mobile?"											// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/ComboBox.html"								// global desktop platform, load template
		+ ":#mobile?"																	// global mobile platform, don't load
		+ ":dojo/text!./templates/ComboBox.html", 										// no dojo/has features, load the template
			
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"idx/has!#idx_form_FilteringSelect-mobile?./plugins/phone/FilteringSelectPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_FilteringSelect-desktop?"												// desktop widget, don't load plugin
		+ ":#mobile?./plugins/phone/FilteringSelectPlugin"									// global mobile platform, load plugin
		+ ":"																				// no features, don't load plugin

], function(declare, lang, domClass, domStyle, winUtils, has, _WidgetsInTemplateMixin, FilteringSelect, 
	HoverHelpTooltip, _CompositeMixin, _CssStateMixin, _AutoCompleteA11yMixin, 
	TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin) {
	
	var baseClassName = "idx.form.FilteringSelect";
	if (has("mobile") || has("platform-plugable")) {
		baseClassName = baseClassName + "Base";
	}
	
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2

	/**
	 * @name idx.form.FilteringSelect
	 * @class idx.form.FilteringSelect is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y27&vsub=*&hsub=*&openpanes=0000010000">Combo Boxes Standard</a></b>.
	 * It is a composite widget which enhanced dijit.form.FilteringSelect with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in label positioning</li>
	 * <li>Built-in hint</li>
	 * <li>Built-in hint positioning</li>
	 * <li>Built-in required attribute</li>
	 * <li>One UI theme support</li>
	 * </ul>
	 * @augments dijit.form.FilteringSelect
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._CssStateMixin
	 */
	iForm.FilteringSelect = declare(baseClassName, [FilteringSelect, _CompositeMixin, _CssStateMixin,_AutoCompleteA11yMixin],
	/**@lends idx.form.FilteringSelect.prototype*/
	{
		
		baseClass: "idxFilteringSelectWrap",
		
		oneuiBaseClass: "dijitTextBox dijitComboBox",
		
		templateString: desktopTemplate,
		
		selectOnClick: true,
		
		cssStateNodes: {
			"_buttonNode": "dijitDownArrowButton"
		},
		/**
		 * Defect 11885
		 * overwrite the method in _CompositeMixin
		 * @param {Object} v
		 */
		_setPlaceHolderAttr: function(){
			this._placeholder = false;
			this.inherited(arguments);
		},
		
		postCreate: function() {
			this.dropDownClass = FilteringSelect.prototype.dropDownClass;
			this.inherited(arguments);
			//Defect 11821, remove the aria-labelledby attribute from the dom node
			this.domNode.removeAttribute("aria-labelledby");
			this.connect(this, "_onFocus", function(){
				if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
					this.displayMessage(this.message);
				}
			});
			this._resize();
			//
			//A11y defect to remove the aria-labelledby when the label is empty
			//

			var islabelEmpty = /^\s*$/.test(this.label);
			if ( islabelEmpty ){
				this.oneuiBaseNode.removeAttribute("aria-labelledby");
				this.compLabelNode.innerHTML = "hidden";
			}
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
			return (/^\s*$/.test(this.textbox.value || ""));
		},

		_onBlur: function(){
			this.inherited(arguments);
			this.validate(this.focused);
		},

		_openResultList: function(/*Object*/ results, /*Object*/ query, /*Object*/ options){
			//	Overwrite dijit.form.FilteringSelect._openResultList to focus the selected
			//	item when open the menu.
			this.inherited(arguments);

			// Use following code to get child nodes.
			var nodes = this.dropDown.containerNode.childNodes;
			
			// Focus the selected item
			if(!this._lastInput && this.focusNode.value && this.dropDown.items){
				for(var i = 0; i < nodes.length; i++){
					var item = this.dropDown.items[nodes[i].getAttribute("item")];
					if(item){
						var value = this.store._oldAPI ?	// remove getValue() for 2.0 (old dojo.data API)
								this.store.getValue(item, this.searchAttr) : item[this.searchAttr];
						value = value.toString();
						if(value == this.displayedValue){
							this.dropDown._setSelectedAttr(nodes[i]);
							winUtils.scrollIntoView(this.dropDown.selected);
							break;
						}
					}
				}
			}
			
			
			if(this.item === undefined){ // item == undefined for keyboard search
				// If the search returned no items that means that the user typed
				// in something invalid (and they can't make it valid by typing more characters),
				// so flag the FilteringSelect as being in an invalid state
				this.validate(true);
			}
		},
		
		_onInputContainerEnter: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", true);
		},
		
		_onInputContainerLeave: function(){
			domClass.toggle(this.oneuiBaseNode, "dijitComboBoxInputContainerHover", false);
		},
		
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

	if ( has("mobile") || has("platform-plugable")) {
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/FilteringSelect", 
				{	
					desktop: "inherited",	// no plugin for desktop, use inherited methods  
				 	mobile: MobilePlugin	// use the mobile plugin if loaded
				});
		var localDropDownClass = iForm.FilteringSelect.prototype.dropDownClass;
		if (MobilePlugin && MobilePlugin.prototype && MobilePlugin.prototype.dropDownClass){
			localDropDownClass = MobilePlugin.prototype.dropDownClass;
		}
		iForm.FilteringSelect = declare("idx.form.FilteringSelect",[iForm.FilteringSelect, TemplatePlugableMixin, _WidgetsInTemplateMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			templatePath: require.toUrl("idx/form/templates/ComboBox.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			/**
			 * 
			 */
			inProcessInput: false,
			/**
			 * Dot Not Call inherited function in the plugin stub method
			 */
			postCreate: function(){
				this.dropDownClass = localDropDownClass;
				return this.doWithPlatformPlugin(arguments, "postCreate", "postCreate");
			},
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
			loadDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "loadDropDown", "loadDropDown");
			},
			/**
			 * 
			 */
			_onBlur: function(){
				return this.doWithPlatformPlugin(arguments, "_onBlur", "_onBlur");
			},
			/**
			 * Stub Plugable method
			 */
			openDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "openDropDown", "openDropDown");
			},
			closeDropDown:function(){
				return this.doWithPlatformPlugin(arguments, "closeDropDown", "closeDropDown");
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
	
	return iForm.FilteringSelect;

});

},
'idx/form/formWidgets':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/lang","idx/main","dojo/_base/kernel"],
	   function(dLang,iMain,dKernel) {
	dKernel.deprecated("idx.form.formWidgets","idx.form.formWidgets deprecated. The idx/form/formWidgets module is no longer needed since Dojo 1.7");
	var iFormWidgets = dLang.getObject("form.formWidgets", iMain);
	
	return iFormWidgets;
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
		
		// if the click occurred on the scrollbar of a dropdown, treat it as a click on the dropdown,
		// even though the scrollbar is technically on the popup wrapper (see dojo ticket #10631)
		if(domClass.contains(node, "dijitPopup")){
			node = node.firstChild;
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
'idx/widget/_CheckBoxTreeNode':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/on",
	"dojo/mouse",
	"dojo/keys",
	"dijit/registry",
	"dojo/text!./templates/_CheckBoxTreeNode.html",
	"dijit/Tree"
], function(declare, array, domStyle, domClass, on, mouse, keys, registry, template){
	
	// module:
	//		oneui/_CheckBoxTreeNode
	// summary:
	//		Single node within a CheckBoxTree. This class is used internally
	//		by CheckBoxTree and should not be accessed directly.
	
	return declare("idx.widget._CheckBoxTreeNode", [dijit._TreeNode], {
		// summary:
		//		Single node within a CheckBoxTree. This class is used internally
		//		by CheckBoxTree and should not be accessed directly.
		// tags:
		//		private
		
		templateString: template,
		
		_stateLabels: {
			"False": '&#9633;',
			"True": '&#8730;',
			"Mixed": '&#9632;'
		},

        baseClass: "idxCheckBoxTreeNode",
		/**
		 * 
		 */
		states: [false, "mixed", true],
		/**
		 * The current state of the TriStateCheckBox
		 * @type Integer
		 * @private
		 */
		_currentState: 0,
		//true, false or 'mixed'
		checked : false,
		hasMixState: false, 
		// lastState: Boolean|String
		//		Last check state of the item
		lastState: false,
		
		// For hover effect for tree node, and focus effect for label
		cssStateNodes: {
			rowNode: "dijitTreeRow"
		},
		/**
		 * 
		 * @param {Object} bKeyPress: is this event is triggered by keyboard or mouse 
		 */
		handleCheckBoxClick: function( bKeyPress ){
			this._currentState = (this._currentState + 1) %  this.states.length;
			if ( this._currentState == 1 && !this.hasMixState )
				this._currentState = (this._currentState + 1) %  this.states.length;
			
			var oldState = this._currentState;
			this._currentState = oldState;
			
			var checked = this.states[this._currentState];

			this.updateState(checked);
			
			this.tree.onNodeStateChange(this, checked);
			
			// call dnd selected item
			if ( this.tree && this.tree.dndController)
				this.tree.dndController._onNodeStateChange(this, checked);

			this.tree.focusNode(this);
			//
			// Space key do not need to change the Hover state
			//
			if ( !bKeyPress ){
				domClass.remove(this.checkboxNode, "idxOneuiTriStateCheckBoxCheckedHover");
				domClass.remove(this.checkboxNode, "idxOneuiTriStateCheckBoxHover");
				domClass.remove(this.checkboxNode, "idxOneuiTriStateCheckBoxMixedHover");
				if(checked === true){
					//domClass.add(this.checkboxNode, "idxOneuiTriStateCheckBoxCheckedHover");
				}else if (checked === false){
					//domClass.add(this.checkboxNode, "idxOneuiTriStateCheckBoxHover");
				}
				else if ( checked === 'mixed'){
					//domClass.add(this.checkboxNode, "idxOneuiTriStateCheckBoxMixedHover");
				}
			}
			
		},
		
		postCreate: function(){

			this.set("lastState", false);
			this.connect(this.focusNode, "onkeydown", "_labelKeyDownHandler");
					
			// add event handler to checkboxNode
			// replace of the TriStateCheckBox widget
			var self = this;
			on(this.checkboxNode, mouse.enter, function(event){
				var value = self.getChecked(); 
				if(value === true){
					domClass.add(this, "idxOneuiTriStateCheckBoxCheckedHover");
				}else if (value === false){
					domClass.add(this, "idxOneuiTriStateCheckBoxHover");
				}
				else if ( value === 'mixed'){
					domClass.add(this, "idxOneuiTriStateCheckBoxMixedHover");
				}
			});
			on(this.checkboxNode, mouse.leave, function(event){
				domClass.remove(this, "idxOneuiTriStateCheckBoxCheckedHover");
				domClass.remove(this, "idxOneuiTriStateCheckBoxHover");
				domClass.remove(this, "idxOneuiTriStateCheckBoxMixedHover");
			});
			
		},
		
		updateState: function(/*Boolean|String*/ value){
			// Update the check state for the current node, parent nodes and
			// children nodes.
			if(value == undefined){
				value = this.getChecked();
			}
			else
				this.setChecked(value);
			
			this.set("lastState", value);
			this.updateChildren();
			this.updateParent();
			this.setSelected(value);
			
		},
		
		updateChildren: function(){

			// summmary:
			//		Deal with children
			var children = this.getChildren();
			if(children && children.length > 0){
				if(this.checked == true){
					//Select all children
					array.forEach(children, function(child, idx){
						child.setChecked(true);
						child.updateChildren();
					});
				}else if(this.checked == false){
					//Deselect all children
					array.forEach(children, function(child, idx){
						child.setChecked(false);
						child.updateChildren();
					});
				}else{
					// Resume all children state
					array.forEach(children, function(child, idx){
						var lastState =  child.get("lastState");
						child.setChecked(lastState);
						child.updateChildren();
					});
				}
			}else{
				var self = this;
				// Update the item status in this.tree._itemStatus map
				function updateChildrenStatus(item){
					self.tree.model.getChildren(item, function(items){
						// Loop the items
						for(var i = 0; i < items.length; i++){
							self.tree._itemStatus[self.tree.model.getIdentity(items[i])] = self.checked;
							updateChildrenStatus(items[i]);
						}
					});
				}
				updateChildrenStatus(self.item);
			}
			
		},
		
		updateParent: function(){
			// summary:
			//		Deal with parent node
			var parentNodes = this.tree.getNodesByItem(this.getParent() ? this.getParent().item : null);
			if(parentNodes && parentNodes[0]){
				var parentNode = parentNodes[0];
				parentNode.update();
				parentNode.updateParent();
			}else{
				return;
			}
		},
		/**
		 * Calculate the state of current node according to the children state
		 */
		update: function(){
			// summary:
			//		Update the state of the node according to its' children's states
			var siblings = this.getChildren();
			var checked = 0;
			var mixed = 0;
			for(var i = 0; i < siblings.length; i++){
				var isChecked = siblings[i].getChecked();
				siblings[i].set("lastState", isChecked);
				switch(isChecked){
					case true: checked++;
						break;
					case "mixed": mixed++;
						break;
				}
			}
			this.hasMixState = false;
			if(checked > 0 && checked == siblings.length){
				this.setChecked(true);
			}else if(checked == 0 && mixed == 0){
				this.setChecked(false);
			}else{
				this.hasMixState = true;
				this.setChecked("mixed");
			}
			this.set("lastState", this.checked );
		},
		/**
		 * Public function to get the Checked state of a CheckBoxTreeNode 
		 */
		getChecked: function(){
			return this.checked;
		},
		/**
		 * update the current node checked state and style change
		 * not change parent and children node state
		 * @param {Object} Boolean|String value
		 */
		setChecked: function(/*Boolean|String*/ value){
            if ( this.disabled ){
                return;
            }
			var oldValue = this.checked;
			this.set("checked", value);
			//domClass.remove(this.checkboxNode, "idxOneuiTriStateCheckBoxChecked");
			//domClass.remove(this.checkboxNode, "idxOneuiTriStateCheckBoxMixed");
			this.focusNode.setAttribute("aria-checked", value);
			if(value === true){
				this._currentState = 2;
				//domClass.add(this.checkboxNode, "idxOneuiTriStateCheckBoxChecked");
			}else if (value === false){
				this._currentState = 0;
			}
			else if ( value === 'mixed'){
				this._currentState = 1;
				//domClass.add(this.checkboxNode, "idxOneuiTriStateCheckBoxMixed");
			}
			this.tree._itemStatus[this.tree.model.getIdentity(this.item)] = value;
			// update state for the HC Mode
			var stateValueStr = value ? (value == "mixed" ? "Mixed" : "True") : "False";
			this.stateLabelNode.innerHTML = this._stateLabels[stateValueStr];
			
			//
			// Add here for DND drag drop back defect 11616
			//
			if (oldValue != value){
				this.tree._onNodeStateChange(this, value);
			} 
		},
		
		setSelected: function(/*Boolean*/ selected){
			// summary:
			//		A Tree has a (single) currently selected node.
			//		Mark that this node is/isn't that currently selected node.
			// description
			//		In particular, setting a node as selected involves setting tabIndex
			//		so that when user tabs to the tree, focus will go to that node (only).
			//this.focusNode.setAttribute("aria-selected", selected);
		},
        /**
         * Disabled all of the children nodes, this function has no parent function
         * @param disabled
         */
        _setDisabledAttr: function( disabled ){
            this._set("disabled", disabled);
            var children = this.getChildren();
            array.forEach(children, function(child, idx){
                child.set("disabled", disabled);
            });
        },
		
		getParent: function(){
			// summary:
			// Returns the parent widget of this widget.
			return (this.domNode&&this.domNode.parentNode) ? registry.getEnclosingWidget(this.domNode.parentNode) : null;
		}, 
		
		_labelKeyDownHandler: function(/*Event*/ evt){
			// summary:
			//		Handler key press on the label node.
			var dk = keys;
			if(evt.keyCode == dk.SPACE || evt.keyCode == dk.ENTER ){
				this.handleCheckBoxClick( true );				
			}
		}
	});
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
	var regexChars = "\\[]()^.+*{}?!=-";
	var regexCache = {};
	var regexCacheCount = 0;
	var regexCacheMax = 50;

	/**
	 * @public 
	 * @function
	 * @name idx.string.unescapedIndexOf
	 * @description Searches the specified text for the first unescaped index of
	 *              a character contained in the specified string of characters.
	 * @param {String} text The text to search.
	 * @param {String} chars The characters for which to search (any of these).
	 * @param {String} escaper The optional character to use for escaping (defaults to "\\").
	 * @param {Number} limit The optional limit to the number of indexes desired in case only
	 *                 the first or first few are needed (use null, undefined, zero, false, or
	 * 	               a negative number to indicate no limit).
	 * @returns {Number[]} The array of indexes at which one of the specified characters
	 *                     is found or an empty array if not found.
	 */
	iString.unescapedIndexesOf = function(/*string*/ text, 
										  /*string*/ chars, 
										  /*string*/ escaper,
										  /*number*/ limit) {
		if (!chars || (chars.length == 0)) {
			throw "One or more characters must be provided to search for unescaped characters: "
				  + " chars=[ " + chars + " ], escaper=[ " + escaper + " ], text=[ " + text + " ]";
		}
		if (!escaper || escaper.length == 0) {
			escaper = "\\";
		}
		if (escaper.length > 1) {
			throw "The escaper must be a single character for unescaped character search: "
				  + " escaper=[ " + escaper + " ], chars=[ " + chars
				  + " ], text=[ " + text + " ]";
		}
		if (chars.indexOf(escaper) >= 0) {
			throw "The escaping character cannot also be a search character for unescaped character search: "
				  + " escaper=[ " +  escaper + " ], separators=[ " + separators
				+ " ] text=[ " + text + " ]";
			
		}
		if ((limit === null) || (limit === undefined) || (limit === 0) || (limit === false)) {
			limit = -1;
		}
		if (limit < 0) limit = 0;
		var result = [];
		var index = 0;
		var escaping = false;
		var current = null;
		for (index = 0; index < text.length; index++) {
			current = text.charAt(index);
			if (escaping) {
				escaping = false;
				continue;
			}
			if (current == escaper) {
				escaping = true;
				continue;
			}
			if (chars.indexOf(current) >= 0) {
				result.push(index);
				if (limit && (result.length == limit)) break;
			}
		}
		return result;
	};

	/**
	 * @public 
	 * @function
	 * @name idx.string.unescapedSplit
	 * @description Similar to iString.parseTokens, this function will split the
	 * 	            the specified text on unescaped separator characters, but will 
	 *              NOT remove any escaping in the original text so that the elements
	 *              in the returned array will still contain any original escaping.
	 * @param {String} text The text to split.
	 * @param {String} separators The optional string containing the separator 
	 *                 characters (defaults to ",")
	 * @param {String} escaper The optional character to use for escaping (defaults to "\\").
	 * @param {Number} limit The optional limit to the number of tokens desired in case only
	 *                 the first or first few are needed (use null, undefined, zero, false, or
	 * 	               a negative number to indicate no limit).
	 * @returns {String[]} Return an array of string parts.
	 */
	iString.unescapedSplit = function(/*string*/  text, 
	                                  /*string*/  separators, 
								      /*string*/  escaper,
								  	/*number*/ limit) {
		if (!separators || (separators.length == 0)) {
			separators = ",";
		}
		if (!escaper || escaper.length == 0) {
			escaper = "\\";
		}
		if (escaper.length > 1) {
			throw "The escaper must be a single character for escaped split: "
				  + " escaper=[ " + escaper + " ], separators=[ " + separators
				  + " ], text=[ " + text + " ]";
		}
		if (separators.indexOf(escaper) >= 0) {
			throw "The escaping character cannot also be a separator for escaped split: "
				  + " escaper=[ " +  escaper + " ], separators=[ " + separators
				+ " ] text=[ " + text + " ]";
			
		}
		if ((limit === null) || (limit === undefined) || (limit === 0) || (limit === false)) {
			limit = -1;
		}
		if (limit < 0) limit = 0;
		var result = [];
		var index = 0;
		var escaping = false;
		var current = null;
		var start = 0;
		for (index = 0; index < text.length; index++) {
			current = text.charAt(index);
			if (escaping) {
				escaping = false;
				continue;
			}
			if (current == escaper) {
				escaping = true;
				continue;
			}
			if (separators.indexOf(current) >= 0) {
				if (start == index) {
					result.push("");
				} else {
					result.push(text.substring(start,index));
				}
				start = index + 1;
				if (limit && (result.length == limit)) break;
			}
		}
		if ((!limit) || (limit && result.length < limit)) {
			if (start == text.length) {
				result.push("");
			} else {
				result.push(text.substring(start));
			}
		}
		return result;						
	};
	
	/**
	 * @public 
	 * @function
	 * @name idx.string.parseTokens
	 * @description Similar to iString.unescapedSplit, this function will split the
	 * 	            the specified text on unescaped separator characters, but will 
	 *              also remove any escaping in the original text when creating the
	 *              tokens unless those escaped characters are included in the optional
	 *              "specialChars" parameter (in which case they remain escaped if 
	 *              they are escaped in the original).
	 * @param {String} text The text to split.
	 * @param {String} separators The optional string containing the separator 
	 *        characters (defaults to ",")
	 * @param {String} escaper The optional character to use for escaping (defaults to "\\").
	 * @param {String} specialChars The optional string of special characters that if escaped
	 *                              in the original text should remain escaped in the tokens.
	 * @returns {String[]} Return an array of string parts.
	 */
	iString.parseTokens = function(/*string*/  text, 
	                               /*string*/  separators, 
								   /*string*/  escaper,
								   /*string*/  specialChars) {
		if (!separators || (separators.length == 0)) {
			separators = ",";
		}
		if (!escaper || escaper.length == 0) {
			escaper = "\\";
		}
		if (escaper.length > 1) {
			throw "The escaper must be a single character for token parsing: "
				  + " escaper=[ " + escaper + " ], separators=[ " + separators
				  + " ], text=[ " + text + " ]";
		}
		if (separators.indexOf(escaper) >= 0) {
			throw "The escaping character cannot also be a separator for token parsing: "
				  + " escaper=[ " +  escaper + " ], separators=[ " + separators
				+ " ] text=[ " + text + " ]";
			
		}
		if (specialChars && specialChars.length == 0) {
			specialChars = null;
		}
		var index = 0;
		var result = [];
		var start = 0;
		var escaping = false;
		var part = "";
		var end = -1;
		var current = null;
		for (index = 0; index < text.length; index++) {
			current = text.charAt(index);
			end = -1;
			if (!escaping && current==escaper) {
				if (specialChars && ((index+1)<text.length) 
				    && (specialChars.indexOf(current)>=0)) {
					// we have an escaped special character
					index++;
					continue;
				}
				
				// take the characters up to and excluding the current
				part = part + text.substring(start, index);
				
				// set the starting position to the next character
				start = index + 1;
				escaping = true;
				continue;
			}
			// check if we are escaping
			if (escaping) {
				escaping = false;
				continue;
			}
			// check if the current character is a separator
			if (separators.indexOf(current) >= 0) {
				end = index;
			}
							
			if (end >= 0) {
				part = part + text.substring(start, end);
				start = end + 1;
				result.push(part);
				part = "";
			}
		}
		
		// get the last part
		if ((end < 0) && (start < text.length)) {
			part = part + text.substring(start);
			result.push(part);
		} else if ((end >= 0)||escaping) {
			result.push(part);
		}
				
		return result;
	};
		
	/**
	 * @public 
	 * @function
	 * @name idx.string.escapedChars
	 * @description Escapes the specified characters in the specified text using the 
	 *              specified escape character.  The escape character is also escaped
	 *              using itself.
	 * @param {String} text The text to be escaped.
	 * @param {String} The string containing the characters to be escaped.
	 * @param {String} escaper The optional character to use for escaping (defaults to "\\").
	 * @returns {String[]} Return the escaped text.
	 */
	iString.escapeChars = function(/*string*/ text, /*string*/ chars, /*string*/ escaper) {
		if (!chars || (chars.length == 0)) {
			chars = "";
		}
		if (!escaper || escaper.length == 0) {
			escaper = "\\";
		}
		if (escaper.length > 1) {
			throw "The escaper must be a single character for escaped split: "
				  + " escaper=[ " + escaper + " ], chars=[ " + chars
				  + " ], text=[ " + text + " ]";
		}
		if (chars.indexOf(escaper) >= 0) {
			throw "The escaping character cannot also be a separator for escaped split: "
				  + " escaper=[ " +  escaper + " ], chars=[ " + chars
				+ " ] text=[ " + text + " ]";
			
		}
		var chars = chars + escaper;
		var regex = regexCache[chars];
		var pattern = "";
		if (! regex) {
			pattern = "([";
			for (index = 0; index < chars.length; index++) {
				if (regexChars.indexOf(chars.charAt(index)) >= 0) {
					pattern = pattern + "\\";
				}
				pattern = pattern + chars.charAt(index);
			}
			pattern = pattern + "])";
			try {
				regex = new RegExp(pattern, "g");
			} catch (e) {
				console.log("Pattern: " + pattern);
				throw e;
			}
			if (regexCacheCount < regexCacheMax) {
				regexCache[chars] = regex;
				regexCacheCount++;
			}
		}
		return text.replace(regex, escaper + "$1");
	};
		
	/**
	 * @public 
	 * @function
	 * @name idx.string.escapedJoin
	 * @description Joins the array into a single string separated by the specified 
	 *              separator and using the specified escaper to escape the separator.
	 * @param {String[]} arr The array of objects to join as a string.
	 * @param {String} separator The single-character string containing the separator character.
	 * @param {String} escaper The optional single character to use for escaping (defaults to "\\")
	 * @returns {String[]} Return an array of string parts.
	 */
	iString.escapedJoin = function(/*array*/ arr, /*string*/ separator, /*string*/ escaper) {
		if (!separator || (separator.length == 0)) {
			separator = ",";
		}
		if (separator.length > 1) {
			throw "Only one separator character can be used in escapedJoin: "
					" separator=[ " + separator + " ], text=[ " + text + " ]";
		}
		if (!escaper || escaper.length == 0) {
			escaper = "\\";
		}
		if (escaper.length > 1) {
			throw "The escaper must be a single character for escaped split: "
				  + " escaper=[ " + escaper + " ], separator=[ " + separator
				  + " ], text=[ " + text + " ]";
		}
		if (separator.indexOf(escaper) >= 0) {
			throw "The escaping character cannot also be a separator for escaped split: "
				  + " escaper=[ " +  escaper + " ], separator=[ " + separator
				+ " ] text=[ " + text + " ]";
			
		}
	
		var index = 0;
		var result = "";
		var part = null;
		var prefix = "";
		
		for (index = 0; index < arr.length; index++) {
			part = arr[index];
			part = iString.escapeChars(part, separator, escaper);
			result = result + prefix + part;
			prefix = separator;
		}
		
		return result;
	};
	
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
'idx/form/TriStateCheckBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/kernel",
	"dojo/_base/event",
	"dojo/dom-attr",
	"dojo/query",
	"dojo/has",
	"dijit/form/ToggleButton",
	"./_CssStateMixin",
	"./_CompositeMixin",
	"./_ValidationMixin",
		// ====================================================================================================================
	// ------
	// Load _TemplatePlugableMixin and PlatformPluginRegistry if on "mobile" or if on desktop, but using the 
	// platform-plugable API.  Any prior call to PlaformPluginRegistry.setGlobalTargetPlatform() or 
	// PlatformPluginRegistry.setRegistryDefaultPlatform() sets "platform-plugable" property for dojo/has.
	// ------
	"require", 
	"require",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	"idx/has!#idx_form_TriStateCheckBox-desktop?dojo/text!./templates/TriStateCheckBox.html" 	// desktop widget, load the template
		+ ":#idx_form_TriStateCheckBox-mobile?"													// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/TriStateCheckBox.html"								// global desktop platform, load template
		+ ":#mobile?"																			// global mobile platform, don't load
		+ ":dojo/text!./templates/TriStateCheckBox.html", 										// no dojo/has features, load the template
			
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"idx/has!#idx_form_TriStateCheckBox-mobile?./plugins/phone/TriStateCheckBoxPlugin"			// mobile widget, load the plugin
		+ ":#idx_form_TriStateCheckBox-desktop?"													// desktop widget, don't load plugin
		+ ":#mobile?./plugins/phone/TriStateCheckBoxPlugin"										// global mobile platform, load plugin
		+ ":",																					// no features, don't load plugin

	
	"dojo/NodeList-dom" // NodeList.addClass/removeClass
], function(declare, array, lang, kernel, event, domAttr, query, has, 
			ToggleButton, _CssStateMixin, _CompositeMixin, _ValidationMixin, 
			TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	
	var baseClassName = "idx.form.TriStateCheckBox";
	if (has("mobile") || has("platform-plugable")) {
		baseClassName = baseClassName + "Base";
	}
	if (has("dojo-bidi")) {
		baseClassName = baseClassName + "_";
	}		
		
	var iForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2

	/**
	 * @name idx.form.TriStateCheckBox
	 * @class idx.form.TriStateCheckBox is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y6&vsub=*&hsub=*&openpanes=0100110000">Check Boxes Standard</a></b> 
	 * Compared with dijit.form.CheckBox, TriStateCheckBox has a indeterminate state in addtion to checked state and unchecked state.
	 * The state cycle of TriStateCheckBox is configureable, so you can even create a CheckBox with states cycle such as: 'checked' -> 'indeterminate' -> 'checked' -> 'unchecked'
	 * As idx.form.TriStateCheckBox is a composite widget. You can set a label for it directly rather than adding a label tag mannually.
	 * @augments dijit.form.ToggleButton
	 * @augments idx.form._CssStateMixin
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._ValidationMixin
	 */
	iForm.TriStateCheckBox = declare(baseClassName, [ToggleButton, _CssStateMixin, _CompositeMixin, _ValidationMixin],
	/**@lends idx.form.TriStateCheckBox.prototype*/
	{
		templateString: desktopTemplate,
		
		instantValidate: true,
		
		baseClass: "idxOneuiTriStateCheckBoxWrap",
		
		oneuiBaseClass: "idxOneuiTriStateCheckBox",

		labelAlignment: "horizontal",
		
		/**
		 * States cycle of a TriStateCheckBox. By default it's [false, "mixed", true] which means the state cycles from
		 * 'unchecked' -> 'indeterminate' -> 'checked'.
		 * Note: The value of the 'checked' property of a TriStateCheckBox should be one of these states.
		 * For example, if the 'states' property of a TriStateCheckBox is [false, true], then setting 'checked'
		 * property to 'midex' is invalid.
		 * @type Array|String
		 * @default [false, "mixed", true]
		 */
		states: "",
		
		/**
		 * Alt text used to replace the image to show
		 * current state of TriStateCheckBox in high contrast mode.
		 * @type Object
		 * @default {"False": '&#9633;', "True": '&#8730;', "Mixed": '&#9632;'};
		 * @private
		 */
		_stateLabels: null,
		
		/**
		 * The submit value for each state. By default, "on"/"mixed" will be submitted
		 * if the state of a TriStateCheckBox is checked/indeterminate.
		 * @type Object
		 * @default {"False": false, "True": "on", "Mixed": "mixed"};
		 */
		stateValues: null,
		
		/**
		 * The current state of the TriStateCheckBox
		 * @type Integer
		 * @private
		 */
		_currentState: 0,
		
		/**
		 * The current state type of the TriStateCheckBox.
		 * Could be "False", "True" or "Mixed"
		 * @private
		 */
		_stateType: "False",
		
		/**
		 * Should this widget respond to user input or not.
		 * In markup, this is specified as "readOnly".
		 * Similar to disabled except readOnly form values are submitted.
		 * @type Boolean
		 */
		readOnly: false,
		
		/**
		 * Current check state of the check box. Can be one of element in 'states' property.
		 * @type Boolean|String
		 * @default false
		 */
		checked: "",
		
		constructor: function(){
			// summary:
			//		Runs on widget initialization to setup arrays etc.
			// tags:
			//		private
			this.states = [false, "mixed", true];
			this.checked = false;
			this._stateLabels = {
				"False": '&#9633;',
				"True": '&#8730;',
				"Mixed": '&#9632;'
			};
			this.stateValues = { 
				"False": false,
				"True": "on", 
				"Mixed": "mixed"
			};
		},
		
		_fillContent: function(/*DomNode*/ source){
			// Override Button::_fillContent() since it doesn't make sense for CheckBox,
			// since CheckBox doesn't even have a container
		},
		
		postCreate: function(){
			
			this._event = {
				"input" : "onChange",
				"blur" : "_onBlur",
				"focus" : "_onFocus"
			}
			if(this.instantValidate){
				this.connect(this.focusNode, "onfocus", function(){
					if(this.message == "" || this.mouseFocus){
						this.mouseFocus = false;
						return;
					}
				});
			}
			domAttr.set(this.stateLabelNode, 'innerHTML', this._stateLabels[this._stateType]);
			this.inherited(arguments);
		},
		
		startup: function(){
			this.set("checked", this.params.checked || this.states[this._currentState]);
			domAttr.set(this.stateLabelNode, 'innerHTML', this._stateLabels[this._stateType]);
			this.inherited(arguments);
		},
		
		_isEmpty: function(){
			return !this.get("checked");
		},
		
		_setCheckedAttr: function(/*String|Boolean*/ checked, /*Boolean?*/ priorityChange){
			// summary:
			//		Handler for checked = attribute to constructor, and also calls to
			//		set('checked', val).
			// checked:
			//		true, false or 'mixed'
			// description:
			//		Controls the state of the TriStateCheckBox. Set this.checked, 
			//		this._currentState, value attribute of the <input type="checkbox">
			//		according to the value of 'checked'.
			var stateIndex = array.indexOf(this.states, checked), changed = false;
			if(stateIndex >= 0){
				this._currentState = stateIndex;
				if(checked != this.get("checked")){
					changed = true;
				}
				this._set("checked", checked);
				this._stateType = this._getStateType(checked);
				if(checked == "mixed"){
					domAttr.set(this.focusNode || this.domNode, "checked", true);
				}else{
					domAttr.set(this.focusNode || this.domNode, "checked", checked);
				}
				domAttr.set(this.focusNode, "value", this.stateValues[this._stateType]);
				domAttr.set(this.stateLabelNode, 'innerHTML', this._stateLabels[this._stateType]);
				(this.focusNode || this.domNode).setAttribute("aria-checked", checked);
				if(changed){
					this._handleOnChange(checked, priorityChange);
				}
			}else{
				console.warn("Invalid state!");
			}
		},
		
		setChecked: function(/*String|Boolean*/ checked){
			// summary:
			//		Deprecated.  Use set('checked', true/false) instead.
			kernel.deprecated("setChecked(" + checked + ") is deprecated. Use set('checked'," + checked + ") instead.", "", "2.0");
			this.set('checked', checked);
		},
		
		_setStatesAttr: function(/*Array|String*/ states){
			if(lang.isArray(states)){
				this._set("states", states);
			}else if(lang.isString(states)){
				var map = {
					"true": true,
					"false": false,
					"mixed": "mixed"
				};
				states = states.split(/\s*,\s*/);
				for(var i = 0; i < states.length; i++){
					states[i] = map[states[i]] !== undefined ? map[states[i]] : false;
				}
				this._set("states", states);
			}
		},
		
		_setReadOnlyAttr: function(/*Boolean*/ value){
			this._set("readOnly", value);
			domAttr.set(this.focusNode, "readOnly", value);
		},
		
		_setValueAttr: function(/*String|Boolean*/ newValue, /*Boolean*/ priorityChange){
			// summary:
			//		Handler for value = attribute to constructor, and also calls to
			//		set('value', val).
			// description:
			//		During initialization, just saves as attribute to the <input type=checkbox>.
			//
			//		After initialization,
			//		when passed a boolean or the string 'mixed', controls the state of the
			//		TriStateCheckBox.
			//		If passed a string except 'mixed', changes the value attribute of the
			//		TriStateCheckBox. Sets the state of the TriStateCheckBox to checked.
			if(typeof newValue == "string" && (array.indexOf(this.states, newValue) < 0)){
				if(newValue == ""){
					newValue = "on";
				}
				this.stateValues["True"] = newValue;
				newValue = true;
			}
			if(this._created){
				this._currentState = array.indexOf(this.states, newValue);
				this.set('checked', newValue, priorityChange);
				domAttr.set(this.focusNode, "value", this.stateValues[this._stateType]);
			}
		},
		
		_setValuesAttr: function(/*Array*/ newValues){
			// summary:
			//		Handler for values = attribute to constructor, and also calls to
			//		set('values', val).
			// newValues:
			//		If the length of newValues is 1, it will replace the value of
			//		the TriStateCheckBox in true state. Otherwise, the values of
			//		the TriStateCheckBox in true state and 'mixed' state will be
			//		replaced by the first two values in newValues.
			// description:
			//		Change the value of the TriStateCheckBox in 'mixed' and true states.
			this.stateValues["True"] = newValues[0] ? newValues[0] : this.stateValues["True"];
			this.stateValues["Mixed"] = newValues[1] ? newValues[1] : this.stateValues["Mixed"];
		},
		
		_getValueAttr: function(){
			// summary:
			//		Hook so get('value') works.
			// description:
			//		Returns value according to current state of the TriStateCheckBox.
			return this.stateValues[this._stateType];
		},
		
		reset: function(){
			this._hasBeenBlurred = false;
			this.set("states", this.params.states || [false, "mixed", true]);
			this.stateValues = this.params.stateValues || {
				"False" : false,
				"True" : "on",
				"Mixed" : "mixed"
			};
			this.set("values", this.params.values || []);
			this.set('checked', this.params.checked || this.states[0]);
		},
		
		_onFocus: function(){
			if(this.id){
				query("label[for='" + this.id + "']").addClass("dijitFocusedLabel");
			}
			this.inherited(arguments);
		},
		
		_onBlur: function(){
			if(this.id){
				query("label[for='" + this.id + "']").removeClass("dijitFocusedLabel");
			}
			this.mouseFocus = false;
			this.inherited(arguments);
		},
		
		_onClick: function(/*Event*/ e){
			// summary:
			//		Internal function to handle click actions - need to check
			//		readOnly and disabled
			if(this.readOnly || this.disabled){
				event.stop(e);
				return false;
			}
			this.click();
			return this.onClick(e); // user click actions
		},
		
		click: function(){
			// summary:
			//		Emulate a click on the check box, but will not trigger the 
			//		onClick method.
			if(this._currentState >= this.states.length - 1){
				this._currentState = 0;
			}else{
				if(this._currentState == -1){
					this.fixState();
				}else{
					this._currentState++;
				}
			}
			var oldState = this._currentState;
			this.set("checked", this.states[this._currentState]);
			this._currentState = oldState;
			domAttr.set(this.stateLabelNode, 'innerHTML', this._stateLabels[this._stateType]);
		},
		
		fixState: function(){
			// summary:
			//		Fix _currentState property if it's out of bound.
			this._currentState = this.states.length - 1;
		},
		
		_getStateType: function(/*String|Boolean*/ state){
			//	summary:
			//		Internal function to return the type of a certain state
			//		false: False
			//		true: True
			//		"mixed": Mixed
			return state ? (state == "mixed" ? "Mixed" : "True") : "False";
		},
		
		_onMouseDown: function(){
			this.mouseFocus = true;
		},
		
		_setDisabledAttr: function(){
			this.inherited(arguments);
			this._refreshState();
		},
		
		_setLabelAlignmentAttr: null,
		_setFieldWidthAttr: null,
		_setLabelWidthAttr: null,
		resize:function(){return false;},
		_setIconClassAttr: null
	});
	
	
	if (has("dojo-bidi")) {
		baseClassName = baseClassName.substring(0, baseClassName.length-1);
		var baseTriStateCheckBox = iForm.TriStateCheckBox;
		iForm.TriStateCheckBox = declare(baseClassName,[baseTriStateCheckBox]);
	}
	
	if ( has("mobile") || has("platform-plugable")) {
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/TriStateCheckBox", 
				{	
					desktop: "inherited",	// no plugin for desktop, use inherited methods  
				 	mobile: MobilePlugin	// use the mobile plugin if loaded
				});

		iForm.TriStateCheckBox = declare("idx.form.TriStateCheckBox",[iForm.TriStateCheckBox, TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			templatePath: require.toUrl("idx/form/templates/TriStateCheckBox.html"), 

			// set the plugin registry
			pluginRegistry: pluginRegistry,
			/**
			 * Stub Plugable method
			 */
			postCreate: function(){
				var promise = this.doWithPlatformPlugin(arguments, "postCreate", "postCreate");
				this.inherited(arguments);
				return promise;
			},	 			
			/**
			 * 
			 * @param {Object} message
			 */
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			/**
			 * 
			 * @param {Object} helpText
			 */
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			},
			/**
			 * 
			 * @param {Object} value
			 */
			_setCheckedAttr: function(value){
				this.inherited(arguments);
				this.focusNode.setAttribute("value", this.stateValues[this._stateType]);
				
			}
		});
	}
	
	return iForm.TriStateCheckBox;
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
'idx/app/Header':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/array",
        "dojo/_base/declare",
		"dojo/_base/lang",
		"dojo/_base/window",
		"dojo/aspect",
		"dojo/query",
		"dojo/dom-attr",
		"dojo/dom-class",
		"dojo/dom-construct",
		"dojo/dom-style",
		"dojo/i18n",
		"dojo/keys",
		"dojo/string",
		"dijit/_base/popup",
		"dijit/place",
		"dijit/registry",
		"dijit/_Widget",
		"dijit/_TemplatedMixin",
		"idx/util",
		"idx/resources",
		"dojo/NodeList-dom",
		"dojo/i18n!../nls/base",
		"dojo/i18n!./nls/base",
		"dojo/i18n!./nls/Header" ],
        function(_array,
		         declare,
				 _lang,
				 _window,
				 aspect,
				 query,
				 domattr,
				 domclass,
				 domconstruct,
				 domstyle,
				 i18n,
				 keys,
				 string,
				 popup,
				 place,
				 registry,
				 _Widget,
				 _TemplatedMixin,
				 iUtil,
				 iResources){
		
	var oneuiRoot = _lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2
	
	// ensure we're not relying on the old globals, ready for 2.0
	var dojo = {}, dijit = {};
	
	// these widgets will be loaded later if needed
	var Button = function(){ log.error("dijit/form/Button has been used without being loaded"); }
	var TextBox = function(){ log.error("dijit/form/TextBox has been used without being loaded"); }
	var MenuTabController = function(){ log.error("idx/layout/MenuTabController has been used without being loaded"); }

	/**
	 * Creates a new idx.app.Header
	 * @name idx.app.Header
	 * @class The Header widget generates the HTML and CSS to provide an
	 * IBM One UI header according to the design specification and templates.
	 * <p>
	 * To construct a header, initialise the widget with the required
	 * properties. The appropriate HTML and CSS is created immediately, and
	 * subsidiary dijit components may be created and marshalled. No dynamic
	 * layout is performed: once the HTML has been injected into the DOM,
	 * all layout is delegated to the renderer and associated CSS rules.
	 * </p>
	 * @augments dijit._Widget
	 * @augments dijit._TemplatedMixin
	 * @example
	 * var hdr = new idx.app.Header({ primaryTitle: "Hello" }, "myHeader");
	 */
	return oneuiRoot.Header = declare("idx.app.Header", [_Widget, _TemplatedMixin], 
	/** @lends idx.app.Header.prototype */
	{
		/**
		 * The IBM Brand/product name.
		 * @type string
		 */
		primaryTitle: "",
		
		/**
		 * The desired style of primary (black) banner: "thick" or "thin".
		 * @type string
		 * @default "thin"
		 */
		primaryBannerType: "thin",
		
		/**
		 * A menu bar, which can contain items and popup menu items, which
		 * will be displayed as navigation actions/menus in the header. The
		 * menu bar may be supplied as an instance or by id or as a DOM node.
		 * @type string | dijit.MenuBar | DOMNode
		 */
		navigation: undefined,
		
		/**
		 * True (the default) if navigation menu items that have a popup
		 * menu associated with them are to show a drop-down arrow affordance.
		 * If false, drop-down arrows are not shown on navigation items.
		 * @type boolean
		 */
		showNavigationDropDownArrows: true,

		/**
		 * Specifies that a primary search box should be included in the
		 * header, and supplies the parameters for it. All the properties are
		 * optional:
		 * <ul>
		 * <li>
		 * entryPrompt: {string | function} A string containing the prompt
		 * text for entering the search terms, or a function (which will be
		 * called with no arguments) which returns the prompt text.
		 * </li>
		 * <li>
		 * submitPrompt: {string | function} A string containing the prompt
		 * text for submitting the search, or a function (which will be called
		 * with no arguments) which returns the prompt text.
		 * </li>
		 * <li>onChange: {function} A function which will be called whenever
		 * the text in the search box changes. The function will receive one
		 * argument, which is the text currently in the search box.
		 * </li>
		 * <li>
		 * onSubmit: {function} A function which will be called whenever
		 * the user submits a search (eg, by pressing enter, or activating a
		 * search affordance). The function will receive one argument, which
		 * is the text currently in the search box.
		 * </li>
		 * </ul>
		 * @type Object
		 */
		primarySearch: undefined,
				
		/**
		 * The identity of the user to be included in the header. All
		 * properties are optional.
		 * <ul>
		 * <li>
		 * displayName: {string | function} A string containing the displayable
		 * name of the current user, or a function (which will be called with
		 * no arguments) which returns the displayable name of the current
		 * user. The displayable name may include mark-up (for example,
		 * entities for accented characters, etc). A displayName should always
		 * be supplied whenever feedback of the user's identity is required.
		 * The displayName can be modified after construction by setting the
		 * "userDisplayName" property of the header.
		 * Examples: "Clark, D. J. (Dave)"
		 * </li>
		 * <li>
		 * displayImage: {string | Object | function} A string containing the
		 * URI of an image to be displayed alongside the user name or welcome
		 * message, or an HTML image object (or other suitable mark-up object)
		 * to be used as the image alongside the user name or welcome message,
		 * or a function (which will be called with no arguments) which returns
		 * either a string or an object to specify the image to use. If omitted,
		 * null or undefined, no image is shown. The displayImage can be
		 * modified after construction by setting the "userDisplayName" property
		 * of the header.
		 * </li>
		 * <li>
		 * messageName: {string | function} A string containing the displayable
		 * name of the current user as it should appear in the message shown
		 * in the header to confirm the user's identity, if that is different
		 * from the displayName (for example, a shortened or simplified form
		 * of the user's name might be used as the messageName). If messageName
		 * is not supplied, the displayName is used. Note that displayName
		 * should still be supplied as well as messageName, because although it
		 * is the messageName that is substituted into the message for display,
		 * the displayName is also added as alternative text/title to add clarity
		 * for the user. The messageName can be set or modified after construction
		 * by setting the "userMessageName" property of the header.
		 * Examples: "Dave", "No&euml;l"
		 * </li>
		 * <li>
		 * message: {string | function} A string containing the message to be
		 * shown in the header to confirm the current user's identity, or a
		 * function (which will be called with no arguments) which returns
		 * the message to be shown. The string pattern will have the following
		 * substitutions applied:
		 * 	<ul>
		 * 	<li>
		 * 	${messageName} - the message name of the current user, if supplied,
		 * 	othewise the display name is used, if supplied
		 * 	</li>
		 * 	<li>
		 * 	$(displayName} - the display name of the current user
		 * 	</li>
		 * 	</ul>
		 * The message may include mark-up (for example, entities for accented
		 * characters, etc). If message is not supplied, the message that is
		 * used is "${messageName}". The message can be set or modified after
		 * construction by setting the "userMessage" property of the header.
		 * Examples: "Welcome back, ${messageName}",
		 * "Welcome, new user"
		 * </li>
		 * <li>
		 * actions: {string | dijit.Menu | dijit.MenuItem} A dijit.Menu to be
		 * used as the popup of available actions for the current user. If a
		 * single dijit.MenuItem is supplied, the current user name will be
		 * presented as a simple action and onClick will be triggered on the
		 * menu item when that action is selected. The menu or item may be
		 * supplied as an instance or by id.
		 * </li>
		 * </ul>
		 * @type Object
		 */
		user: undefined,
				
		/**
		 * True (the default) if a drop-down arrow affordance is to be shown
		 * on the user identification when a popup menu of user actions is supplied.
		 * If false, a drop-down arrow is not shown on the user identification.
		 * @type boolean
		 */
		showUserDropDownArrow: true,

		/**
		 * A dijit.Menu to be used as the popup of available site settings
		 * actions. If a single dijit.MenuItem is supplied, a simple site
		 * settings action will be presented and onClick will be triggered on
		 * the menu item when that action is selected.
		 * @type dijit.Menu | dijit.MenuItem
		 */
		settings: undefined,
		
		/**
		 * True (the default) if a drop-down arrow affordance is to be shown on the
		 * site settings icon when a popup menu of site settings items is supplied.
		 * If false, a drop-down arrow is not shown on the site settings icon.
		 * @type boolean
		 */
		showSettingsDropDownArrow: true,

		/**
		 * A dijit.Menu to be used as the popup of available site help actions. 
		 * If a single dijit.MenuItem is supplied, a simple site help action
		 * will be presented and onClick will be triggered on the menu item when
		 * that action is selected.
		 * @type dijit.Menu | dijit.MenuItem
		 */
		help: undefined,
	
		/**
		 * True (the default) if a drop-down arrow affordance is to be shown on the
		 * site help icon when a popup menu of site help items is supplied.
		 * If false, a drop-down arrow is not shown on the site help icon.
		 * @type boolean
		 */
		showHelpDropDownArrow: true,

		/**
		 * The context title which shows users where they are, for example
		 * if they have arrived here by selecting a menu item.
		 * @type string
		 */
		secondaryTitle: "",

		/**
		 * The desired style of secondary (context) banner: "blue" or "lightgrey".
		 * @default "blue"
		 * @type string
		 */
		secondaryBannerType: "blue",
		
		/**
		 * A subtitle which gives additional context information.
		 * @type string
		 */
		secondarySubtitle: "",		
		
		/**
		 * Text containing additional context information, such as when page
		 * content was last updated and by whom.
		 * @type string
		 */
		additionalContext: "",
		
		/**
		 * An array of objects defining actions which will be displayed as
		 * action buttons in the context part of the header. Each object
		 * must contain the following properties:
		 * <ul>
		 * <li>
		 * label: text label for the action
		 * </li>
		 * <li>
		 * onClick: click handler for the action button
		 * </li>
		 * </ul>
		 * @type Object[]
		 */
		actions: undefined,
		
		/**
		 * The id of a content container which is to be controlled by tabs
		 * included in the header, or the widget itself. Each ContentPane in
		 * the StackContainer may additionally include the following properties
		 * (all optional):
		 * <ul>
		 * <li>
		 * closable: {boolean} If true, a close affordance will be displayed on
		 * the corresponding tab and will close the content pane when activated.
		 * If false, or if this property is not set, no close affordance is shown.
		 * </li>
		 * <li>
		 * actions: {dijit.Menu} A menu of items to be presented when the
		 * drop-down affordance on the tab is activated. The drop-down
		 * affordance will be displayed on the tab if this property is set and
		 * either the tab is selected or alwaysShowMenu is true.
		 * </li>
		 * <li>
		 * alwaysShowMenu: {boolean} If true, a drop-down affordance will be
		 * displayed on the tab if the actions property has been set,
		 * regardless of whether the tab is currently selected. If false, a
		 * drop-down affordance will only be displayed on the tab if the
		 * actions property has been set AND the tab is currently selected.
		 * </li>
		 * </ul>
		 * @type string | dijit.StackContainer
		 */
		contentContainer: "",
		
		/**
		 * If true, content tabs will be placed on the same line as a context
		 * title and/or other secondary banner content. If false, the tabs will
		 * occupy their own row within the secondary banner. The default value is false.
		 * @type boolean
		 */
		contentTabsInline: false,		
		
		/**
		 * Specifies that a secondary search box should be included in the
		 * header, and supplies the parameters for it. All the properties are
		 * optional:
		 * <ul>
		 * <li>
		 * entryPrompt: {string | function} A string containing the prompt text
		 * for entering the search terms, or a function (which will be called
		 * with no arguments) which returns the prompt text.
		 * </li>
		 * <li>
		 * submitPrompt: {string | function} A string containing the prompt
		 * text for submitting the search, or a function (which will be called
		 * with no arguments) which returns the prompt text.
		 * </li>
		 * <li>
		 * onChange: {function} A function which will be called whenever the
		 * text in the search box changes. The function will receive one
		 * argument, which is the text currently in the search box.
		 * </li>
		 * <li>
		 * onSubmit: {function} A function which will be called whenever user
		 * submits a search (eg, by pressing enter, or activating a 
		 * search affordance). The function will receive one argument, which
		 * is the text currently in the search box.
		 * </li>
		 * </ul>
		 * @type Object
		 */
		secondarySearch: undefined,
				
		/**
		 * Specifies the desired layout mode, which can be "fixed" for a
		 * fixed-width layout independent of the browser width (extra space
		 * will be left at the side margins, and a scroll bar will appear if
		 * the browser window is too narrow) or "variable" for a variable-width
		 * layout that exploits the full browser window width (extra space will
		 * be left within the layout, which will change as the browser window
		 * is resized). 
		 * @default "variable".
		 * @type string
		 */
		layoutType: "variable",
		
		// The following properties (read-only) can be used to obtain the DOM
		// nodes of key elements of the constructed UI. These properties will
		// not be defined unless the corresponding UI element is used/required.
		//
		// Container nodes:
		//  domNode: outer containing DOM node
		//  primaryBannerNode: container (div) for all primary banner content
		//  navigationNode: contains a menu bar of navigation action items
		//  userNode: contains the user identity and actions display
		//  leadingSecondaryBannerNode: container (div) for all leading secondary banner content
		//  trailingSecondaryBannerNode: container (div) for all trailing secondary banner content
		//
		// Widget and content nodes:
		//  primaryTitleTextNode: contains primary title text/markup
		//  userTextNode: contains user identity text/markup
		//  primarySearchTextNode: the text field for primary search
		//  primarySearchButtonNode: the submit button for primary search
		//  secondaryTitleTextNode: contains secondary title text/markup
		//  secondarySubtitleTextNode: contains secondary subtitle text/markup
		//  contextActionNodes: array of action button nodes
		//  contentControllerNode: the content controller (tab bar)
		//  secondarySearchTextNode: the text field for secondary search
		//  secondarySearchButtonNode: the submit button for secondary search
		//  
		// Other nodes used internally:
		//  containerNode: hidden node used for declarative construction
		//  _mainContainerNode: container for the primary and secondary banners
		//  _leadingGlobalActionsNode: container for leading global actions
		//  _trailingGlobalActionsNode: container for trailing global actions
		//  _secondaryTitleSeparatorNode: text separating secondary title and subtitle
		//  _contextActionsNode: container for all context actions
		//
		/**
	 	 * The template HTML for the widget.
		 * @constant
		 * @type string
		 * @private
		 */
		templateString: '<div role="banner">' +
						'<div style="visibility: hidden; display: none;" data-dojo-attach-point="containerNode">' +
						'</div>' +
		                '<div data-dojo-attach-point="_mainContainerNode">' +
						'</div>' +
						'</div>',

		/**
		 * Return the user identity display name, calling supplied functions
		 * where applicable.
		 * @private
		 */		
		_getComputedUserName: function(){
			return (this.user && (typeof this.user.displayName == "function")) ? this.user.displayName() : (this.user.displayName || "");
		},
		
		/**
		 * Return the user identity display image, calling supplied functions
		 * where applicable.
		 * @private
		 */		
		_getComputedUserImage: function(){
			return (this.user && (typeof this.user.displayImage == "function")) ? this.user.displayImage() : this.user.displayImage;
		},
		
		/**
		 * Return the user identity message, taking into account any custom
		 * message template and calling supplied functions where applicable.
		 * @private
		 */		
		_getComputedUserMessage: function(){
			// name to use in message: if no message name, use display name
			var displayname = this._getComputedUserName(),
				messagename = ((typeof this.user.messageName == "function") ? this.user.messageName() : this.user.messageName) || displayname,
				result = messagename;
			
			if(this.user && this.user.message){
				var message = (typeof this.user.message == "function") ? this.user.message() : this.user.message;
				
				result = string.substitute(message, this.user, function(value, key){
					switch(key){
						case "messageName": return messagename;
						case "displayName": return displayname;
						default: return value || "";
					}
				});
			}
			
			return result;
		},
		
		_setUserDisplayNameAttr: function(value){
			this.user = this.user || {};
			this.user.displayName = value;
			this._refreshUser();
		},
		
		_setUserDisplayImageAttr: function(value){
			this.user = this.user || {};
			this.user.displayImage = value;
			this._refreshUser();
		},
		
		_setUserMessageNameAttr: function(value){
			this.user = this.user || {};
			this.user.messageName = value;
			this._refreshUser();
		},
		
		_setUserMessageAttr: function(value){
			this.user = this.user || {};
			this.user.message = value;
			this._refreshUser();
		},
		
		/**
		 * Prepare a menu or menu bar to be presented from the One UI header widget.
		 *
		 * If cssclasses (array of strings) is specified, the open logic of the
		 * menu is overridden to ensure that if it is used as a popup then there
		 * is an outer wrapper DIV element always in place carrying the specified
		 * CSS class and containing the popup DOM elements. The menu is recursively
		 * processed to ensure this is true of all cascaded/popup menu items
		 * within the menu. Successive elements of the array are applied to each
		 * successive level of cascaded menu, and the last element is applied to 
		 * all subsequent cascade levels.
		 *
		 * if trigger (DOM Node) is specified, the menu is assumed to be a popup
		 * or cascaded menu, and is bound to the trigger.
		 *
		 * if around (DOM Node) is specified, the open logic of the popup is
		 * overridden to position the popup to that node.
		 * 
		 * @private
		 */
		_prepareMenu: function(menu, cssclasses, trigger, around, trailing, handles){
			if (!handles) handles = [];
			//Defect #12296: Place menu back to it's popupWraper after Header refresh.
			if(menu._popupWrapper){
				menu.placeAt(menu._popupWrapper);
			}
			if(cssclasses){
				if(cssclasses[0]){
					var handle2 = null;
					var handle1 = aspect.after(menu, "onOpen", function(){
						if(menu._popupWrapper){
							if(!menu._oneuiWrapper){
								// Create another wrapper <div> for our outermost oneui marker class.
								menu._oneuiWrapper = domconstruct.create("div", { "class": "idxHeaderContainer " + cssclasses[0] }, _window.body());

								var handle3 = null;
								handle3 = aspect.after(menu, "destroy", function(){
									domconstruct.destroy(menu._oneuiWrapper);
									delete menu._oneuiWrapper;
									if (handle3) handle3.remove();
								});
								handles.push(handle3);
							}
							
							menu._oneuiWrapper.appendChild(menu._popupWrapper);
						}
					});
					handle2 = aspect.after(menu, "destroy", function() {
						if (handle1) handle1.remove();
						if (handle2) handle2.remove();
					});
					
					handles.push(handle2);					
					handles.push(handle1);
				}
				
				var nextcssclasses = (cssclasses.length > 1) ? cssclasses.slice(1) : cssclasses,
					me = this;
				_array.forEach(menu.getChildren(), function(child){
					if(child.popup){				
						me._prepareMenu(child.popup, nextcssclasses, undefined, undefined, undefined, handles);
					}
					if(child.currentPage){
						domclass.add(child.domNode, "idxHeaderNavCurrentPage");
					}
				});
			}
			
			if(around){
				var _around = around;
				menu._scheduleOpen = function(/*DomNode?*/ target, /*DomNode?*/ iframe, /*Object?*/ coords){
					if(!this._openTimer){
						var ltr = menu.isLeftToRight(),
							where = place.around(//placeOnScreenAroundElement(
								popup._createWrapper(menu),
								_around,
								/*(menu.isLeftToRight() == (trailing ? false : true)) ? 
									{'BL':'TL', 'BR':'TR', 'TL':'BL', 'TR':'BR'} :
									{'BR':'TR', 'BL':'TL', 'TR':'BR', 'TL':'BL'},*/
								trailing ?
									[ "below-alt", "below", "above-alt", "above" ] : 
									[ "below", "below-alt", "above", "above-alt" ],
								ltr,
								menu.orient ? _lang.hitch(menu, "orient") : null);
							
						if(!ltr){
							where.x = where.x + where.w;
						}
						
						this._openTimer = setTimeout(_lang.hitch(this, function(){
							delete this._openTimer;
							this._openMyself({
								target: target,
								iframe: iframe,
								coords: where
							});
						}), 1);
					}
				}

				menu.leftClickToOpen = true;
			
				if(trigger){
					menu.bindDomNode(trigger);
				}
			}
			return handles;
		},
		
		_refreshUser: function(){
			if(this.userNode){
				// if userNode is unset, initialisation has not yet occurred (in which
				// case this refreshUser() method will be called again once initialisation
				// is complete, or the user area is not active in this header
				
				var name = this._getComputedUserName(),
					imgsrc = this._getComputedUserImage(),
					msg = this._getComputedUserMessage();
					
				domattr.set(this.userNode, "title", name);
				
				domattr.set(this.userImageNode, "src", imgsrc || "");
				domstyle.set(this.userImageNode, "display", imgsrc ? "block" : "none");
				
				this.userTextNode.innerHTML = msg;
				domclass.replace(this.userNode, msg ? "idxHeaderUserName" : "idxHeaderUserNameNoText", "idxHeaderUserName idxHeaderUserNameNoText");
			}
		},
		
		/**
		 * Construct UI from a template, injecting the resulting DOM items
		 * as children on of the supplied container node.
		 * @param {Object} containerNode
		 * @param {Object} templateString
		 */
		_injectTemplate: function(containerNode, templateString){
			
			// this code is generalised from _Templated.buildRendering

			// Look up cached version of template, or download to cache.
			var cached = _TemplatedMixin.getCachedTemplate(templateString, true);

			var node;
			if(_lang.isString(cached)){
				// if the cache returned a string, it contains replacement parameters,
				// so replace them and create DOM
				node = domconstruct.toDom(this._stringRepl(cached));
			}else{
				// if the cache returned a node, all we have to do is clone it
				node = cached.cloneNode(true);
			}

			// recurse through the node, looking for, and attaching to, our
			// attachment points and events, which should be defined on the template node.
			this._attachTemplateNodes(node, function(n,p){ return n.getAttribute(p); });
			
			// append resolved template as child of container
			containerNode.appendChild(node);
		},

		/**
		 * Standard widget lifecycle postMixInProperties() method.
		 * @private
		 */
		postMixInProperties: function(){
			this._nls = iResources.getResources("idx/app/Header", this.lang);
		},
		
		/**
		 * Handles setup of the header.
		 * @private
		 */
		_setup: function(){
			// summary:
			//     Generate the HTML and CSS for the header.
			
			// The following logic allocates all header items into either a
			// primary or a secondary banner, both of which are optional.
			//
			// The primary banner will accommodate:
			//  - primary title (if any)
			//  - navigation links/menus (if any)
			//  - search (if any, and if there's room)
			//  - user identity (if any)
			// The search will only be accommodated if at least one of the
			// other items is omitted; if a primary title, navigation
			// links/menus and user identity are all provided then the search
			// (if required) will be placed into the secondary banner.
			//
			// The primary banner will place the primary title at the top left
			// and the user identity at the top right. The navigation
			// links/menus and search will be placed between them, flowing onto
			// a second line if necessary.
			//
			// The secondary banner will accommodate:
			//  - secondary title (if any)
			//  - action links/menus (if any)
			//  - content controller (if any)
			//  - search (if any, and if not accommodated in primary banner)
			//
			// The secondary banner will place the secondary title at the top
			// left and the search at the top right. The action links/menus and
			// content controller will be placed between them, flowing onto a
			// second line if necessary.
			// 
			// Other layout schemes (eg for mobile) will require separate logic
			// not yet provided here.
			
			// First issue warnings for situations that may not be intended.
			if(this.contentContainer && this.secondaryBannerType && this.secondaryBannerType.toLowerCase() == "white"){
				// content tabs in "white" style are not supported
				require.log('*** Warning: Header will not display content tabs when secondaryBannerType is "white". Specify a different type to see content tabs.');
			}
			
			var show_primary_title = this.primaryTitle,
				show_primary_logo = true,
				show_primary_help = this.help,
				show_primary_sharing = this.sharing,
				show_primary_settings = this.settings,
				show_primary_user = this.user,
				show_primary_navigation = this.navigation,
				show_primary_search = this.primarySearch,
			    show_secondary_title = this.secondaryTitle || this.secondarySubtitle,
			    show_secondary_actions = this.contextActions,
			    show_secondary_search = this.secondarySearch,
			    show_content = this.contentContainer && (!this.secondaryBannerType || (this.secondaryBannerType.toLowerCase() != "white")),  // never show content tabs in "white" style (not supported)
				show_secondary_content = show_content && (this.contentTabsInline || !show_secondary_title),
				show_secondary_border = this.secondaryBannerType && (this.secondaryBannerType.toLowerCase() == "white"),
				show_tertiary_content = show_content && !show_secondary_content,
			    show_primary_items = show_primary_title || show_primary_logo || show_primary_help || show_primary_settings || show_primary_sharing || show_primary_user || show_primary_navigation || show_primary_search,  
			    show_secondary_items = show_secondary_title || show_secondary_actions || show_secondary_search || show_secondary_content,
				show_tertiary_items = show_tertiary_content,
				show_lip;
			
			if(show_primary_items || show_secondary_items || show_tertiary_items){
				domclass.add(this.domNode, "idxHeaderContainer");
				
				if(this.primaryBannerType && (this.primaryBannerType.toLowerCase() == "thick")){
					domclass.add(this._mainContainerNode, "idxHeaderPrimaryThick");
				}else{
					domclass.add(this._mainContainerNode, "idxHeaderPrimaryThin");
				}
				
				if(this.secondaryBannerType && ((this.secondaryBannerType.toLowerCase() == "lightgrey") || (this.secondaryBannerType.toLowerCase() == "lightgray"))){
					domclass.add(this._mainContainerNode, "idxHeaderSecondaryGray");
					domclass.add(this._mainContainerNode, show_tertiary_items ? "idxHeaderSecondaryGrayDoubleRow" : "idxHeaderSecondaryGraySingleRow");
					show_lip = show_primary_items;
				}else if(this.secondaryBannerType && (this.secondaryBannerType.toLowerCase() == "white")){
					domclass.add(this._mainContainerNode, "idxHeaderSecondaryWhite");
					domclass.add(this._mainContainerNode, show_tertiary_items ? "idxHeaderSecondaryWhiteDoubleRow" : "idxHeaderSecondaryWhiteSingleRow");
					show_lip = show_primary_items;
				}else{
					domclass.add(this._mainContainerNode, "idxHeaderSecondaryBlue");
					domclass.add(this._mainContainerNode, (show_tertiary_items) ? "idxHeaderSecondaryBlueDoubleRow" : "idxHeaderSecondaryBlueSingleRow");
					show_lip = show_primary_items && !show_secondary_items && !show_tertiary_items;
				}
				domclass.add(this._mainContainerNode, show_tertiary_items ? "idxHeaderSecondaryDoubleRow" : "idxHeaderSecondarySingleRow");
				
				if(this.layoutType && (this.layoutType.toLowerCase() == "fixed")){
					domclass.add(this._mainContainerNode, "idxHeaderWidthFixed");
				}else{
					domclass.add(this._mainContainerNode, "idxHeaderWidthLiquid");
				}				
			}
			
			// now load any additional modules we know we need
			var modules = [],
			    assigns = [],
				me = this;
			
			if(show_primary_search || show_secondary_search || show_secondary_actions){
				modules.push("dijit/form/Button");
				assigns.push(function(obj){ Button = obj; });
			}
			
			if(show_primary_search || show_secondary_search){
				modules.push("dijit/form/TextBox");
				assigns.push(function(obj){ TextBox = obj; });
			}
			
			if(show_content){
				modules.push("idx/layout/MenuTabController");
				assigns.push(function(obj){ MenuTabController = obj; });
			}
			
			require(modules, function(){
			
				for(var i=0; i<assigns.length; i++){
					assigns[i](arguments[i]);
				}
			
				// create the primary bar
				
				if(show_primary_items){
					me._injectTemplate(me._mainContainerNode,
										 '<div class="idxHeaderPrimary">' +
										 '<div class="idxHeaderPrimaryInner" data-dojo-attach-point="primaryBannerNode">' +
										 '<ul class="idxHeaderPrimaryActionsLeading" data-dojo-attach-point="_leadingGlobalActionsNode">' +
										 '</ul>' +
										 '<ul class="idxHeaderPrimaryActionsTrailing" data-dojo-attach-point="_trailingGlobalActionsNode">' +
										 '</ul>' +
										 '</div>' +
										 '</div>');
				}
				
				if(show_primary_title){
					me._renderPrimaryTitle(me._leadingGlobalActionsNode);
				}
				
				if(show_primary_search){
					me._renderPrimarySearch(me._trailingGlobalActionsNode);
				}			
				
				if(show_primary_user){
					me._renderUser(me._trailingGlobalActionsNode);
				}
				
				if(show_primary_sharing){
					me._renderSharing(me._trailingGlobalActionsNode, show_primary_user);
				}
				
				if(show_primary_settings){
					me._renderSettings(me._trailingGlobalActionsNode, show_primary_user);
				}

				if(show_primary_help){
					me._renderHelp(me._trailingGlobalActionsNode, show_primary_settings || show_primary_sharing || show_primary_user);
				}
				if((me.user&&me.user.actions) || me.sharing || me.settings || me.help){
					me._trailingGlobalActionsNode.setAttribute("role", "menubar");
				}
				
				if(show_primary_logo){
					me._renderLogo(me._trailingGlobalActionsNode);
				}
				
				if(show_primary_navigation){
					var navNode = domconstruct.create("li", {"class": "idxHeaderPrimaryNav"}, me._leadingGlobalActionsNode, "last");
					me._renderNavigation(navNode);
				}
				
				// create the blue lip
				
				if(show_lip){
					me._injectTemplate(me._mainContainerNode,
										 '<div class="idxHeaderBlueLip">' + 
										 '</div>');
				}
				
				// create the secondary bar
				
				if(show_secondary_items){
					me._injectTemplate(me._mainContainerNode,
										 '<div class="idxHeaderSecondary"> ' +
										 '<div class="idxHeaderSecondaryInner" data-dojo-attach-point="secondaryBannerNode"> ' +
										 '<div class="idxHeaderSecondaryLeading" data-dojo-attach-point="leadingSecondaryBannerNode">' + 
										 '</div>' + 
										 '<div class="idxHeaderSecondaryTrailing" data-dojo-attach-point="trailingSecondaryBannerNode">' +
										 '</div>' + 
										 '</div>' + 
										 '</div>');
				}
				
				if(show_secondary_title){
					me._renderSecondaryTitle(me.leadingSecondaryBannerNode);
				}
				
				if(show_secondary_content){
					me._renderContent(me.leadingSecondaryBannerNode, false);
				}

				if(show_secondary_actions){
					me._renderContextActions(me.trailingSecondaryBannerNode);
				}
				
				if(show_secondary_search){
					me._renderSecondarySearch(me.trailingSecondaryBannerNode);
				}			

				if(show_secondary_border){
					me._renderSecondaryInnerBorder(me.secondaryBannerNode);
				}
				
				// create the tertiary bar
				
				if(show_tertiary_content){
					me._renderContent(me._mainContainerNode, true);
				}
				
				// clear the "refresh required" flag
				if (me._refreshing > 0) me._refreshing--;
				if (me._refreshing == 0) {
					me._refreshRequired = false;
				} else {
					me._doRefresh();
				}
			});
		},
		
		/**
		 * Restores the widget to its initial state.
		 * @private
		 */
		_reset: function(){
			domclass.remove(this.domNode, "idxHeaderContainer");
			domclass.remove(this._mainContainerNode, "idxHeaderPrimaryThick");
			domclass.remove(this._mainContainerNode, "idxHeaderPrimaryThin");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryGray");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryGrayDoubleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryGraySingleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryWhite");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryWhiteDoubleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryWhiteSingleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryBlue");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryBlueDoubleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryBlueSingleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondaryDoubleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderSecondarySingleRow");
			domclass.remove(this._mainContainerNode, "idxHeaderWidthFixed");
			domclass.remove(this._mainContainerNode, "idxHeaderWidthLiquid");
			
			// move widgets temporarily to container node	
			if (this.help) {
				this.help = registry.byId(this.help);
				if (this.help) this.help.placeAt(this.containerNode);
			}
			this._clearHandles("_helpHandles");
			
			if (this.settings) {
				this.settings = registry.byId(this.settings);
				if (this.settings) this.settings.placeAt(this.containerNode);
			}
			this._clearHandles("_settingsHandles");
			
			if (this.sharing) {
				this.sharing = registry.byId(this.sharing);
				if (this.sharing) this.sharing.placeAt(this.containerNode);
			}
			
			this._clearHandles("_sharingHandles");
			
			if (this.user && this.user.actions) {
				this.user.actions = registry.byId(this.user.actions);
				if (this.user.actions) this.user.actions.placeAt(this.containerNode);
			}
			this._clearHandles("_actionsHandles");
			
			if (this.navigation) {
				this.navigation = registry.byId(this.navigation);
				if (this.navigation) this.navigation.placeAt(this.containerNode);
			}
			this._clearHandles("_navHandles");
			this._clearHandles("_controllerHandlers");
			
			// find and destroy any widgets in mainContainerNode
			_array.forEach(registry.findWidgets(this._mainContainerNode), function(child) {
				child.destroy();
			});
			
			// now remove the content under the _mainContainerNode
			var childNodes = [];
			_array.forEach(this._mainContainerNode.childNodes, function(node) {
				childNodes.push(node);
			});
			_array.forEach(childNodes, function(node) {
				domconstruct.destroy(node);
			});
			
			// clear out some nodes
			this._leadingGlobalActionsNode = null;
			this._trailingGlobalActionsNode = null;
			this.primaryTitleTextNode = null;
			this.primaryBannerNode = null;
			this.leadingSecondaryBannerNode = null;
			this.trailingSecondaryBannerNode = null;
			this._helpNode = null;
			this._settingsNode = null;
			this._sharingNode = null;
			this.userNode = null;
			this.userImageNode = null;
			this.userTextNode = null;
			this.primarySearchTextNode = null;
			this.primarySearchButtonNode = null;
			this.secondaryTitleTextNode = null;
			this._secondaryTitleSeparatorNode = null;
			this.secondarySubtitleTextNode = null;
			this.additionalContextTextNode = null;
			this._contextActionsNode = null;
			if (this.contextActionNodes) delete this.contextActionNodes;
			this.secondarySearchTextNode = null;
			this.secondarySearchButtonNode = null;
			this.contentControllerNode = null;
		},

		/** 
		 * Constructor
		 * @private
		 */
		constructor: function(args, node) {
			this._refreshing = 0;
		},
		
		/**
		 *
		 */
		destroy: function() {
			if (this.navigation) {
				if (this.navigation.destroyRecursive) this.navigation.destroyRecursive();
				else if (this.navigation.destroy) this.navigation.destroy();
				this.navigation = null;
			}
			this._clearHandles("_navHandles");
			
			if (this._controller) {
				if (this._controller.destroyRecursive) this._controller.destroyRecursive();
				else if (this._controller.destroy) this._controller.destroy();
				delete this._controller;
			}
			this._clearHandles("_controllerHandles");
			
			if (this.settings) {
				if (this.settings.destroyRecursive) this.settings.destroyRecursive();
				else if (this.settings.destroy) this.settings.destroy();
				this.settings = null;
			}
			this._clearHandles("_settingsHandles");
			
			if (this.sharing) {
				if (this.sharing.destroyRecursive) this.sharing.destroyRecursive();
				else if (this.sharing.destroy) this.sharing.destroy();
				this.sharing = null;
			}
			this._clearHandles("_sharingHandles");
			
			if (this.help) {
				if (this.help.destroyRecursive) this.help.destroyRecursive();
				else if (this.help.destroy) this.help.destroy();
				this.help = null;
			}
			this._clearHandles("_helpHandles");
			
			if (this.user && this.user.actions) {
				if (this.user.actions.destroyRecursive) this.user.actions.destroyRecursive();
				else if (this.user.actions.destroy) this.user.actions.destroy();
				this.user.actions = null;
				this.user = null;
			}
			this._clearHandles("_actionsHandles");
			
			this.inherited(arguments);
		},
		
		/**
		 * Clears out the handle array associated with the specified attribute name.
		 */
		_clearHandles: function(name) {
			if (! (name in this)) {
				return;
			}
			var handleArray = this[name];
			_array.forEach(handleArray, function(handle) {
				handle.remove(); 
			} );
			delete this[name];
		},
		
		/**
		 * Standard widget lifecycle buildRendering() method.
		 * @private
		 */
		buildRendering: function(){
			this.inherited(arguments);
			this._setup();
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setContentTabsInlineAttr: function(value) {
			var previous = this.contentTabsInline;
			this.contentTabsInline = value;
			if (previous != value) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setContentContainerAttr: function(value) {
			var previous = this.contentContainer;
			this.contentContainer = value;
			if (!iUtil.widgetEquals(previous, value)) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setActionsAttr: function(value) {
			var previous = this.actions;
			this.actions = value;
			if (previous !== value) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setAdditionalContextAttr: function(value) {
			var previous = this.additionalContext;
			var node = this.additionalContextTextNode;
			this.additionalContext = value;
			if (node) {
				node.innerHTML = (value) ? value : "";
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setSecondaryBannerTypeAttr: function(value) {
			var previous = this.secondaryBannerType;
			this.secondaryBannerType = value;
			if (previous != value) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setPrimaryTitleAttr: function(value) {
			var previous = this.primaryTitle;
			var node = this.primaryTitleTextNode;
			this.primaryTitle = value;
			if ((value && !previous) || (previous && !value)) {
				// check if we have gone from having a value to not having a value or vice versa
				this._refresh();
			} else if (node && value) {
				// if we are simply changing the text then just update it without a refresh
				node.innerHTML = value;
			}
		},

		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setSecondaryTitleAttr: function(value) {
			var previous = this.secondaryTitle;
			var node = this.secondaryTitleTextNode;
			this.secondaryTitle = value;
			if ((value && !previous) || (previous && !value)) {
				// check if we have gone from having a value to not having a value or vice versa
				this._refresh();
			} else if (node && value) {
				// if we are simply changing the text then just update it without a refresh
				node.innerHTML = value;
			}
		},

		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setLayoutTypeAttr: function(value) {
			var previous = this.layoutType;
			this.layoutType = value;

			if (this._mainContainerNode) {			
				if(this.layoutType && (this.layoutType.toLowerCase() == "fixed")){
					domclass.add(this._mainContainerNode, "idxHeaderWidthFixed");
				}else{
					domclass.add(this._mainContainerNode, "idxHeaderWidthLiquid");
				}				
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setSecondarySubtitleAttr: function(value) {
			var previous = this.secondarySubtitle;
			var node = this.secondarySubtitleTextNode;
			this.secondarySubtitle = value;
			if ((value && !previous) || (previous && !value)) {
				// check if we have gone from having a value to not having a value or vice versa
				this._refresh();
			} else if (node && value) {
				// if we are simply changing the text then just update it without a refresh
				node.innerHTML = value;
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setShowHelpDropDownArrowAttr: function(value) {
			var previous = this.showHelpDropDownArrow;
			this.showHelpDropDownArrow = value;
			
			if (this._helpNode) {
				domclass.toggle(this._helpNode, "idxHeaderDropDown", this.showHelpDropDownArrow);
			}
		},
		 
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setShowSettingsDropDownArrowAttr: function(value) {
			var previous = this.showSettingsDropDownArrow;
			this.showSettingsDropDownArrow = value;
			if (this._settingsNode) {
				domclass.toggle(this._settingsNode, "idxHeaderDropDown", this.showSettingsDropDownArrow);
			}			
		},
		 
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setShowSharingDropDownArrowAttr: function(value) {
			var previous = this.showSharingDropDownArrow;
			this.showSharingDropDownArrow = value;
			if (this._sharingNode) {
				domclass.toggle(this._sharingNode, "idxHeaderDropDown", this.showSharingDropDownArrow);
			}			
		},
		 
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setShowUserDropDownArrowAttr: function(value) {
			var previous = this.showUserDropDownArrow;
			this.showUserDropDownArrow = value;
			if (this.userNode) {
				domclass.toggle(this.userNode, "idxHeaderDropDown", this.showUserDropDownArrow);
			}
		},
		 
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setUserAttr: function(value) {
			var previous = this.user;
			this.user = value;
			if (previous === value) {
				// same user or from null to null, so do nothing
				return;
				
			} else if ((previous && !value) || (value && !previous)) {
				// was null, now not, or now null and was previously not null
				this._refresh();
				
			} else if (previous && previous.actions !== value.actions) {
				// previous and new value differ but have different actions
				this._refresh();
				
			} else {
				// we have a new user, but the same state for actions 
				this._refreshUser();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setShowNavigationDropDownArrowsAttr: function(value) {
			var previous = this.showNavigationDropDownArrows;
			this.showNavigationDropDownArrows = value;
			if (previous != value) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setPrimarySearchAttr: function(value) {
			var previous = this.primarySearch;
			this.primarySearch = value;
			if (previous !== value) {
				this._refresh();
			}
		},
		
		/**
		 * Setter to handle re-rendering the widget if needed.
		 * @private
		 */
		_setSecondarySearchAttr: function(value) {
			var previous = this.secondarySearch;
			this.secondarySearch = value;
			if (previous !== value) {
				this._refresh();
			}
		},
		
		/**
		 * Handler for setting the navigation.  This ensures
		 * that the header gets refreshed if needed or that at
		 * least the header gets marked as requiring a refresh.
		 *
		 * @param {Widget} widget The widget to use for the navigation
		 * @private
		 */
		_setNavigationAttr: function(widget) {
			var previous = this.navigation;
			this.navigation = widget;
			if (!iUtil.widgetEquals(previous, widget)) {
				this._refresh();
			}
		},
		
		/**
		 * Handler for setting the settings.  This ensures
		 * that the header gets refreshed if needed or that at
		 * least the header gets marked as requiring a refresh.
		 *
		 * @param {Widget} widget The widget to use for the settings
		 * @private
		 */
		_setSettingsAttr: function(widget) {
			var previous = this.settings;
			this.settings = widget;
			if (!iUtil.widgetEquals(previous, widget)) {
				this._refresh();
			}		
		},
		
		/**
		 * Handler for setting the sharing.  This ensures
		 * that the header gets refreshed if needed or that at
		 * least the header gets marked as requiring a refresh.
		 *
		 * @param {Widget} widget The widget to use for the sharing
		 * @private
		 */
		_setSharingAttr: function(widget) {
			var previous = this.sharing;
			this.sharing = widget;
			if (!iUtil.widgetEquals(previous, widget)) {
				this._refresh();
			}		
		},
		
		/**
		 * Handler for setting the help.  This ensures
		 * that the header gets refreshed if needed or that at
		 * least the header gets marked as requiring a refresh.
		 *
		 * @param {Widget} widget The widget to use for the help
		 * @private
		 */
		_setHelpAttr: function(widget) {
			var previous = this.help;
			this.help = widget;
			if (!iUtil.widgetEquals(previous, widget)) {
				this._refresh();
			}
		},
		
		/**
		 * Sets the flag to defer refresh.  This means that changes to
		 * the header will not immediately change the header but rather
		 * a call to "refresh()" will be required to trigger a change.
		 */
		deferRefresh: function() {
			this._refreshDeferred = true;
		},
		
		/**
		 * Clears the refresh deferral flag and refresshes the header.
		 */
		refresh: function() {
			if (this._refreshDeferred) this._refreshDeferred = false;
			if (this._refreshRequired) this._refresh();
		},
		
		/**
		 * Refreshes the header providing there has not been a deferral
		 * of the refresh, thus requiring a manual call to the public
		 * refresh() function to clear the deferred flag.
		 */
		_refresh: function() {
			this._refreshRequired = true;			
			if (this._started && (! this._refreshDeferred)) {
				this._refreshing++;
				if (this._refreshing == 1) {
					this._doRefresh();
				}
			} else {
				console.log("Deferring header refresh.  started=[ " + this._started + " ], deferred=[ "+ this._refreshDeferred + " ]");
			}
		},

		/**
		 * Handles performing the refresh.
		 */
		_doRefresh: function() {
			this._reset();
			this._setup();
		},
			
		/**
		 * Sets up the child using the region to assign defined
		 * elements like navigation, settings, and help.
		 *
		 * @param {Widget} child The child to setup
		 * @private
		 */
		_setupChild: function(child) {
			if (! ("region" in child)) return;
			
			var region = child.region;
			switch (region) {
			case "navigation":
				this.set("navigation", child);
				break;
			case "settings":
				this.set("settings", child);
				break;
			case "sharing":
				this.set("sharing", child);
				break;
			case "help":
				this.set("help", child);
				break;
			default:
				console.log("WARNING: Found child with unrecognized region: " + region);
				break;
			}			
		},
		
		/**
		 * Overridden so that the child is run through setup after being added
		 * and a refresh is triggered or at least a flag is set indicating it is
		 * needed.
		 */
		addChild: function(child) {
			this.inherited(arguments);
			this._setupChild(child);
		},
		
		/**
		 * Overridden to handle the special children so as to clear out
		 * help, navigation, or settings as needed.
		 */
		removeChild: function(child) {
			// handle the special children
			if (child === this.help) {
				this.set("help", null);
			}
			
			if (child === this.navigation) {
				this.set("navigation", null);
			}
			
			if (child === this.settings) {
				this.set("settings", null);
			}
			
			if (child === this.sharing) {
				this.set("sharing", null);
			}
			
			// defer the base implementation
			// the base implementation will only remove the help, navigation or settings
			// if this header was not setup after they were added as children (i.e.: if
			// they are still children of the hidden containerNode).  Otherwise, the 
			// removed widgets will simply be abandoned by the Header and be destroyed
			// upon the next refresh unless the caller places the child in a different
			// part of the DOM tree (outside the _mainContainerNode)
			this.inherited(arguments);
		},
		
		/**
		 * Standard widget lifecycle startup() method.
		 * @private
		 */
		startup: function(){
			// summary:
			//     Generate the HTML and CSS for the header.

			// call down to apply the template and base widget handling
			this.inherited(arguments);
			
			// defer refreshes
			this.deferRefresh();
			
			// get the children
			var children = this.getChildren();
			for (var index = 0; index < children.length; index++) {
				var child = children[index];
				this._setupChild(child);
			}

			// refresh the widget
			this.refresh();
		},
		
		_renderPrimaryTitle: function(domNode){
			this._injectTemplate(domNode,
			         			 '<li role="presentation">' +
			         			 '<span>' +
			         			 '<div class="idxHeaderPrimaryTitle" id="${id}_PrimaryTitle" data-dojo-attach-point="primaryTitleTextNode">' +
			         			 '${primaryTitle}' +
			         			 '</div>' +
			         			 '</span>' +
			         			 '</li>'); 
		},
		
		_renderLogo: function(domNode){
			this._injectTemplate(domNode,
			         			 '<li role="presentation" class="idxHeaderPrimaryAction idxHeaderEnd">' +
			         			 '<span>' +
			         			 '<div class="idxHeaderLogoBox">' +
			         			 '<div class="idxHeaderLogo" alt="${_nls.ibmlogo}">' +
								 	'<span class="idxTextAlternative">${_nls.ibmlogo}</span>' +
			         			 '</div>' +
			         			 '</div>' +
			         			 '</span>' +
			         			 '</li>'); 
		},
		_renderSeparator: function(domNode){
			this._injectTemplate(domNode,
				'<li role="presentation" class="idxHeaderPrimaryAction idxHeaderSeparator"><span></span></li>');
		},
		_renderHelp: function(domNode, addSeparator){
			if(addSeparator){
				this._renderSeparator(domNode);
			}

			this._injectTemplate(domNode,
			         			 '<li class="idxHeaderPrimaryAction idxHeaderHelp">' +
			         			 '<a tabindex="0" href="javascript://" data-dojo-attach-point="_helpNode" title="${_nls.actionHelp}" role="presentation">' +
									 '<span class="idxHeaderHelpIcon">' +
									 	'<span class="idxTextAlternative">${_nls.actionHelp}</span>' +
									 '</span>' +
							         '<span class="idxHeaderDropDownArrow">' +
									 	'<span class="idxTextAlternative">(v)</span>' +
							         '</span>' +
			         			 '</a>' +
			         			 '</li>');
			
			if(this.help){
				this.help = registry.byId(this.help);
				this._clearHandles("_helpHandles");
				this._helpHandles = this._prepareMenu(this.help, [ "oneuiHeaderGlobalActionsMenu", "oneuiHeaderGlobalActionsSubmenu" ], this._helpNode, this._helpNode, true);
				domclass.toggle(this._helpNode, "idxHeaderDropDown", this.showHelpDropDownArrow);
				this._helpNode.setAttribute("role", "menuitem");
				this._helpNode.setAttribute("aria-haspopup", true);
			}
		},
		
		_renderSettings: function(domNode, addSeparator){
			if(addSeparator){
				this._renderSeparator(domNode);
			}

			this._injectTemplate(domNode,
			         			 '<li class="idxHeaderPrimaryAction idxHeaderTools">' +
			         			 '<a tabindex="0" href="javascript://" data-dojo-attach-point="_settingsNode" title="${_nls.actionSettings}" role="presentation">' +
									 '<span class="idxHeaderSettingsIcon">' +
									 	'<span class="idxTextAlternative">${_nls.actionSettings}</span>' +
									 '</span>' +
							         '<span class="idxHeaderDropDownArrow">' +
									 	'<span class="idxTextAlternative">(v)</span>' +
							         '</span>' +
			         			 '</a>' +
			         			 '</li>'); 
			
			if(this.settings){
				this.settings = registry.byId(this.settings);
				this._clearHandles("_settingsHandles");
				this._settingsHandles = this._prepareMenu(this.settings, [ "oneuiHeaderGlobalActionsMenu", "oneuiHeaderGlobalActionsSubmenu" ], this._settingsNode, this._settingsNode, true);
				domclass.toggle(this._settingsNode, "idxHeaderDropDown", this.showSettingsDropDownArrow);
				this._settingsNode.setAttribute("role", "menuitem");
				this._settingsNode.setAttribute("aria-haspopup", true);
			}
		},

		_renderSharing: function(domNode, addSeparator){
			if(addSeparator){
				this._renderSeparator(domNode);
			}

			this._injectTemplate(domNode,
			         			 '<li class="idxHeaderPrimaryAction idxHeaderTools">' +
			         			 '<a tabindex="0" href="javascript://" data-dojo-attach-point="_sharingNode" title="${_nls.actionShare}" role="presentation">' +
									 '<span class="idxHeaderShareIcon">' +
									 	'<span class="idxTextAlternative">${_nls.actionShare}</span>' +
									 '</span>' +
							         '<span class="idxHeaderDropDownArrow">' +
									 	'<span class="idxTextAlternative">(v)</span>' +
							         '</span>' +
			         			 '</a>' +
			         			 '</li>'); 
			
			if(this.sharing){
				this.sharing = registry.byId(this.sharing);
				this._clearHandles("_sharingHandles");
				this._sharingHandles = this._prepareMenu(this.sharing, [ "oneuiHeaderGlobalActionsMenu", "oneuiHeaderGlobalActionsSubmenu" ], this._sharingNode, this._sharingNode, true);
				domclass.toggle(this._sharingNode, "idxHeaderDropDown", this.showSharingDropDownArrow);
				this._sharingNode.setAttribute("role", "menuitem");
				this._sharingNode.setAttribute("aria-haspopup", true);
			}
		},
		
		_renderUser: function(domNode){
			this._injectTemplate(domNode,
			                     '<li class="idxHeaderPrimaryAction">' + 
									'<a tabindex="0" href="javascript://" data-dojo-attach-point="userNode" class="idxHeaderUserNameNoText" role="presentation">' +
										'<span class="idxHeaderUserIcon">' +
											'<img data-dojo-attach-point="userImageNode" class="idxHeaderUserIcon" alt="" />' +
										'</span>' +
										'<span class="idxHeaderUserText" data-dojo-attach-point="userTextNode">' +
										'</span>' +
								        '<span class="idxHeaderDropDownArrow">' +
								        	'<span class="idxTextAlternative">(v)</span>' +
								        '</span>' +
									'</a>' +
			                     '</li>');			                     
			
			this._refreshUser();

			if(this.user && this.user.actions){
				this.user.actions = registry.byId(this.user.actions);
				this._clearHandles("_actionsHandles");
				this._actionsHandles = this._prepareMenu(this.user.actions, [ "oneuiHeaderGlobalActionsMenu", "oneuiHeaderGlobalActionsSubmenu" ], this.userNode, this.userNode, true);
				domclass.toggle(this.userNode, "idxHeaderDropDown", this.showUserDropDownArrow);
				this.userNode.setAttribute("role", "menuitem");
				this.userNode.setAttribute("aria-haspopup", true);
			}
		},
		
		_renderNavigation: function(domNode){
			this.navigation = ((typeof this.navigation == "object") && ('nodeType' in this.navigation)) ? registry.byNode(this.navigation) : registry.byId(this.navigation);
			
			if(!this.navigation){
				require.log("WARNING: navigation widget not found");
			}else{
				this.navigation.placeAt(domNode);
				this.navigation.startup();
				
				var children = this.navigation.getChildren();
				if((children.length == 1) && (children[0].label == "")){
					// if there is just a single menu bar item with no text, make it a "home" icon
					var homeItem = children[0];
					domclass.toggle(homeItem.containerNode, "idxHeaderNavigationHome", true);
					domclass.toggle(homeItem.containerNode, "idxHeaderNavigationHomeButtonOnly", !homeItem.popup);
					domattr.set(homeItem.domNode, "title", this._nls.homeButton);
					domconstruct.place("<span class='idxTextAlternative'>" + this._nls.homeButton + "</span>", homeItem.containerNode, "first");
				}else if(this.showNavigationDropDownArrows){
					for(var i = 0; i < children.length; i++){
						if(children[i].popup){
							var nodes = query(".idxHeaderDropDownArrow", children[i].focusNode);
							domclass.toggle(children[i].domNode, "idxHeaderDropDown", true);
							if (nodes.length > 0) continue; // skip if arrow already injected
							this._injectTemplate(children[i].focusNode, '<span class="idxHeaderDropDownArrow"><span class="idxTextAlternative">(v)</span></span>'); 
						}
					}
				}
				
				// remove whitespace-only text nodes in the menu-bar, as these
				// can disrupt precise layout of the menu items
				var node = this.navigation.domNode.firstChild, del;
				while(node){
					del = node;
					node = node.nextSibling;
					if((del.nodeType == 3) && (!del.nodeValue.match(/\S/))){
						this.navigation.domNode.removeChild(del);
					}
				}
				
				this._clearHandles("_navHandles");
				this._navHandles = this._prepareMenu(this.navigation, [null, "oneuiHeaderNavigationMenu", "oneuiHeaderNavigationSubmenu"]);
			}
		},
		
		_renderPrimarySearch: function(domNode){
			this._injectTemplate(domNode,
			                     '<li role="search" aria-label="'+ 
								 this.id +
								 ' ${_nls.primarySearchLabelSuffix}" class="idxHeaderSearchContainer">' +
			                     '<input type="text" data-dojo-attach-point="primarySearchTextNode" />' + 
			                     '<input type="image" data-dojo-attach-point="primarySearchButtonNode" />' +
			                     '</li>');
								 
			this.primarySearch.onChange = _lang.isFunction(this.primarySearch.onChange) ? this.primarySearch.onChange : new Function("value", this.primarySearch.onChange);
			this.primarySearch.onSubmit = _lang.isFunction(this.primarySearch.onSubmit) ? this.primarySearch.onSubmit : new Function("value", this.primarySearch.onSubmit);
			
			var me = this,
				entryprompt = ("entryPrompt" in this.primarySearch) ? this.primarySearch.entryPrompt : this._nls.searchEntry,  // ensure "" overrides default
				submitprompt = ("submitPrompt" in this.primarySearch) ? this.primarySearch.submitPrompt : this._nls.searchSubmit;  // ensure "" overrides default
			
			var text = new TextBox({
				trim: true,
				placeHolder: entryprompt,
				intermediateChanges: true,
				title: entryprompt
			},
			this.primarySearchTextNode);
			text.own(aspect.after(text, "onChange", function(){ me._onPrimarySearchChange(text.attr("value")); }));
			text.own(text.on("keyup", function(event){ if(event.keyCode == keys.ENTER){ me._onPrimarySearchSubmit(text.attr("value")); } }));
			
			var button = new Button({
				label: submitprompt,
				showLabel: false,
				iconClass: "idxHeaderSearchButton"
			},
			this.primarySearchButtonNode);
			button.own(aspect.after(button, "onClick", function(){ me._onPrimarySearchSubmit(text.attr("value")); })); 
		},
		
		_renderSecondaryTitle: function(domNode){
			this._injectTemplate(domNode,
			                     '<span class="idxHeaderSecondaryTitleContainer">' +
								 '<span class="idxHeaderSecondaryTitle" id="${id}_SecondaryTitle"  data-dojo-attach-point="secondaryTitleTextNode">' +
			                     '${secondaryTitle}' +
			                     '</span>' +
			                     '<span class="idxHeaderSecondarySubtitle" data-dojo-attach-point="_secondaryTitleSeparatorNode">' +
			                     '&nbsp;&ndash;&nbsp;' +
			                     '</span>' +
			                     '<span class="idxHeaderSecondarySubtitle" data-dojo-attach-point="secondarySubtitleTextNode">' +
			                     '${secondarySubtitle}' +
			                     '</span>' +
								 '&nbsp;&nbsp;' +
			                     '<span class="idxHeaderSecondaryAdditionalContext" data-dojo-attach-point="additionalContextTextNode">' +
			                     '${additionalContext}' +
			                     '</span>' +
								 '</span>');
								 
			domstyle.set(this._secondaryTitleSeparatorNode, "display", (this.secondaryTitle && this.secondarySubtitle) ? "" : "none");
		},
		
		_renderContextActions: function(domNode){
			this._injectTemplate(domNode,
			                     '<div class="idxHeaderSecondaryActions" data-dojo-attach-point="_contextActionsNode"></div>');
			this.contextActionNodes = [];
			
			for(var i=0; i<this.contextActions.length; i++){
				this._injectTemplate(this._contextActionsNode,
									 '<button type="button" data-dojo-attach-point="_nextActionNode"></button>');
				new Button(this.contextActions[i], this._nextActionNode);
				this.contextActionNodes.push(this._nextActionNode);
				delete this._nextActionNode;
			}
		},
		
		_renderSecondarySearch: function(domNode){
			this._injectTemplate(domNode,
			                     '<div role="search" aria-label="' +
								 this.id +
								 ' ${_nls.secondarySearchLabelSuffix}" class="idxHeaderSearchContainer">' +
			                     '<input type="text" data-dojo-attach-point="secondarySearchTextNode" />' + 
			                     '<input type="image" data-dojo-attach-point="secondarySearchButtonNode" />' +
			                     '</div>');
			
			this.secondarySearch.onChange = _lang.isFunction(this.secondarySearch.onChange) ? this.secondarySearch.onChange : new Function("value", this.secondarySearch.onChange);
			this.secondarySearch.onSubmit = _lang.isFunction(this.secondarySearch.onSubmit) ? this.secondarySearch.onSubmit : new Function("value", this.secondarySearch.onSubmit);
			
			var me = this,
				entryprompt = ("entryPrompt" in this.secondarySearch) ? this.secondarySearch.entryPrompt : this._nls.searchEntry,  // ensure "" overrides default
				submitprompt = ("submitPrompt" in this.secondarySearch) ? this.secondarySearch.submitPrompt : this._nls.searchSubmit;  // ensure "" overrides default
			
			var text = new TextBox({
				trim: true,
				placeHolder: entryprompt,
				intermediateChanges: true,
				title: entryprompt
			},
			this.secondarySearchTextNode);
			text.own(aspect.after(text,"onChange",function(){ me._onSecondarySearchChange(text.attr("value")); }));
			text.own(text.on("keyup", function(event){ if(event.keyCode == keys.ENTER){ me._onSecondarySearchSubmit(text.attr("value")); } }));
			
			var button = new Button({
				label: submitprompt,
				showLabel: false,
				iconClass: "idxHeaderSearchButton"
			},
			this.secondarySearchButtonNode);
			
			button.own(aspect.after(button, "onClick", function(){ me._onSecondarySearchSubmit(text.attr("value")); })); 
		},
		
		_renderSecondaryInnerBorder: function(domNode){
			this._injectTemplate(domNode,
			                     '<div class="idxHeaderSecondaryInnerBorder">' +
			                     '</div>');
		},
		
		_renderContent: function(domNode, includeInnerDiv){
			this._injectTemplate(domNode,
			                     '<div class="oneuiContentContainer">' +
								 (includeInnerDiv ? '<div class="oneuiContentContainerInner">' : '') +
			                     '<div data-dojo-attach-point="contentControllerNode"></div>' +
								 (includeInnerDiv ? '</div>' : '') +
			                     '</div>');	
			
			var controller = new MenuTabController({
				containerId: (typeof this.contentContainer === "string") ? this.contentContainer : this.contentContainer.id,
				"class": "dijitTabContainerTop-tabs",
				useMenu: this._tabMenu,
				useSlider: this._tabSlider,
				buttonWidget: _lang.extend(idx.layout._PopupTabButton, { tabDropDownText: "", tabSeparatorText: "|" })
			},
			this.contentControllerNode),
			me = this;
			
			
			this._clearHandles("_controllerHandles");
			this._controllerHandles = this._prepareMenu(controller._menuBtn, [ "oneuiHeader2ndLevMenu", "oneuiHeader2ndLevSubmenu" ]);
			this._controllerHandles.push(aspect.after(controller, "_bindPopup", function(page, tabNode, popupNode, popup){
				me._prepareMenu(popup, [ "oneuiHeader2ndLevMenu", "oneuiHeader2ndLevSubmenu" ], popupNode, tabNode, this._controllerHandles);
			}, true));
			
			controller.startup();
			// override the incredibly large width on the no-wrap tabstrip from Dojo
			domstyle.set(controller.containerNode, "width", "auto");
			this._controller = controller;
			
			// if the content container is already started, ensure the controller initialises correctly
			var container = registry.byId(this.contentContainer);
			if(container && container._started){
				controller.onStartup({ children: container.getChildren(), selected: container.selectedChildWidget });
			}
		},
		
		_onPrimarySearchChange: function(value){
			this.primarySearch.onChange(value);
		},
		
		_onPrimarySearchSubmit: function(value){
			this.primarySearch.onSubmit(value);
		},
		
		_onSecondarySearchChange: function(value){
			this.secondarySearch.onChange(value);
		},
		
		_onSecondarySearchSubmit: function(value){
			this.secondarySearch.onSubmit(value);
		}
		
	});
			
});

},
'idx/widget/checkboxtree/_dndSelector':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/connect",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/event",
	"dojo/_base/window",
	"dojo/mouse",
	"dojo/on",
	"dojo/touch",
	"dijit/a11yclick",
	"dijit/tree/_dndSelector"
], function(declare, connect, array, lang, event, win, mouse, on, touch, a11yclick, _dndSelector){

	// module:
	//		oneui/checkboxtree/_dndSelector
	// summary:
	//		This is a base class for `oneui.checkboxtree.dndSource` , and isn't meant to be used directly.
	//		It's based on `dijit.tree._dndSelector`.

	return declare("idx.widget.checkboxtree._dndSelector", _dndSelector, {
		// summary:
		//		This is a base class for `oneui.checkboxtree.dndSource` , and isn't meant to be used directly.
		//		It's based on `dijit.tree._dndSelector`.
		// tags:
		//		protected
		
		constructor: function(){
			// summary:
			//		Initialization
			// tags:
			//		private

			this.selection={};
			this.anchor = null;

			this.events.push(
				// listeners setup here but no longer used (left for backwards compatibility
				on(this.tree.domNode, touch.press, lang.hitch(this,"onMouseDown")),
				on(this.tree.domNode, touch.release, lang.hitch(this,"onMouseUp")),

				// listeners used in this module
				on(this.tree, "_onNodeStateChange", this, "_onNodeStateChange"),
				on(this.tree.domNode, touch.move, lang.hitch(this,"onMouseMove")),
				on(this.tree.domNode, a11yclick.press, lang.hitch(this,"onClickPress")),
				on(this.tree.domNode, a11yclick.release, lang.hitch(this,"onClickRelease"))
			);
		},
		//	candidateNode: oneui._TreeNode
		candidateNode: null,
		// mouse events
		onMouseDown: function(e){
			// summary:
			//		Event processor for onmousedown
			// e: Event
			//		mouse event
			// tags:
			//		protected

			// ignore click on not an item
			if(!this.current){ return; }

			if(!mouse.isLeft(e)){ return; }	// ignore right-click

			event.stop(e);

			this.candidateNode = this.current;
			
		},
		
		onMouseUp: function(){
			this.candidateNode = null;
		},
		
		setSelection: function(/*dijit/Tree._TreeNode[]*/ newSelection){
			var oldSelection = this.getSelectedTreeNodes();
			array.forEach(this._setDifference(oldSelection, newSelection), lang.hitch(this, function(node){
				if(node.domNode){
					if(node.checked){return;}
					node.setSelected(false);
					if(this.anchor == node){
						delete this.anchor;
					}
					delete this.selection[node.id];
				}else{
					delete this.selection[node.id];
				}
				
			}));
			array.forEach(this._setDifference(newSelection, oldSelection), lang.hitch(this, function(node){
				node.setSelected(true);
				this.selection[node.id] = node;
			}));
			this._updateSelectionProperties();
		},
	
		_onNodeStateChange: function(/*oneui._TreeNode*/ node, /*Boolean*/ checked){
			// If selected an unchecked item, clean the selection first.
			var nodes = this.getSelectedTreeNodes();
			if(nodes.length == 1 && nodes[0].checkboxNode && nodes[0].checkboxNode.checked === false){
				this.selectNone();
			}
			// Add/Remove node
			if(checked == true){
				this.addTreeNode(node, true);
			}else{
				if(this.selection[ node.id ]) {
					this.removeTreeNode( node );
				}
			}
		}
	});
});

},
'idx/widget/_MenuOpenOnHoverMixin':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare", "dojo/sniff","dojo/_base/lang","dojo/_base/window","dojo/dom","dojo/dom-attr","dojo/on","dojo/keys","dijit/Menu"],
        function(declare, has, lang, win, dom, domAttr, on, keys, Menu){
    
	// Ensure we're not relying on the old globals, ready for 2.0.
	var dojo = {}, dijit = {};

  
	/**
	 * Creates a new idx.widget._MenuOpenOnHoverMixin
	 * @name idx.widget._MenuOpenOnHoverMixin
	 * @class This mix-in can be mixed into menus and menu bars to make them
	 * permanently active so that their drop down and cascade menus are
	 * activated by mouse hover without the need for the menu or menu bar to
	 * be clicked on first.
	 */
	return declare("idx.widget._MenuOpenOnHoverMixin", null,
	/** @lends idx.widget._MenuOpenOnHoverMixin.prototype */
	{
		/**
		 * If true, this menu / menu bar will open popup menu items when they
		 * are hovered over at any time. This is in addition to the usual
		 * mouse-click and key activations, which continue to work as
		 * usual. If false, the menu / menu bar will still open popup menu
		 * items on hover when it is "active" (ie, when the user is in the
		 * process of interacting with it), but will NOT open popup menu
		 * items on hover when the menu is inactive: only mouse-click and
		 * key activations work in this case. The default value is true,
		 * enabling menus to be activated by hover.
		 * @type boolean
		 */
		openOnHover: false,

		/**
		 * Used internally to track our true activation state, because when
		 * openOnHover is on we never allow ourselves to become inactive even
		 * when we normally would.
		 * @type boolean
		 */
		_isActuallyActive: false,

		/**
		 * Standard Dojo setter for handling the 'opnOnHover' property via calls to 
		 * set().
		 * @param {Object} newvalue
		 */
		_setOpenOnHoverAttr: function(newvalue){
			this.openOnHover = newvalue;
			if(newvalue){
				this._forceActive();
			}else{
				this._disableActive();
			}
		},
			
		/**
		 * Mark the menubar as active regardless of whether it 'actually' is,
		 * but preserve our memory of our 'actual' active state.
		 */
		_forceActive: function(){
			this.set("activated", this._isActuallyActive = true);
		},
		
		/**
		 * Return to our 'actual' active state after a force.
		 */
		_disableActive: function(){
			this.set("activated", this._isActuallyActive = false);
		},
		
		onItemHover: function(/*MenuItem*/ item){
			if(has("ie") && (has("ie") >= 11)){//for IE11+
			    //TODO
			}else{
			    this.focusChild(item);
			}
			this.inherited(arguments);
		},
		
		_cleanUp: function(){
			this.inherited(arguments);
			this.set("activated", this._isActuallyActive);
		},
		
		bindDomNode: function( node){
			var superBindDomNode = this.getInherited(arguments);
			if (! superBindDomNode) {
				console.log("Attempt to call bindDomNode() on a widget that does not "
							+ "appear to be a dijit/Menu");
				return;
			}
			
			// summary:
			//		Attach menu to given node
			node = dom.byId(node, this.ownerDocument);

			var cn;	// Connect node

			// Support context menus on iframes.  Rather than binding to the iframe itself we need
			// to bind to the <body> node inside the iframe.
			if(node.tagName.toLowerCase() == "iframe"){
				var iframe = node,
					window = this._iframeContentWindow(iframe);
				cn = win.body(window.document);
			}else{
				// To capture these events at the top level, attach to <html>, not <body>.
				// Otherwise right-click context menu just doesn't work.
				cn = (node == win.body(this.ownerDocument) ? this.ownerDocument.documentElement : node);
			}


			// "binding" is the object to track our connection to the node (ie, the parameter to bindDomNode())
			var binding = {
				node: node,
				iframe: iframe
			};

			// Save info about binding in _bindings[], and make node itself record index(+1) into
			// _bindings[] array.  Prefix w/_dijitMenu to avoid setting an attribute that may
			// start with a number, which fails on FF/safari.
			domAttr.set(node, "_dijitMenu" + this.id, this._bindings.push(binding));

			// Setup the connections to monitor click etc., unless we are connecting to an iframe which hasn't finished
			// loading yet, in which case we need to wait for the onload event first, and then connect
			// On linux Shift-F10 produces the oncontextmenu event, but on Windows it doesn't, so
			// we need to monitor keyboard events in addition to the oncontextmenu event.
			var doConnects = lang.hitch(this, function(cn){
				var selector = this.selector,
					delegatedEvent = selector ?
						function(eventType){
							return on.selector(selector, eventType);
						} :
						function(eventType){
							return eventType;
						},
					self = this;
				result = [
					// TODO: when leftClickToOpen is true then shouldn't space/enter key trigger the menu,
					// rather than shift-F10?
					on(cn, delegatedEvent(this.leftClickToOpen ? "click" : "contextmenu"), function(evt){
						// Schedule context menu to be opened unless it's already been scheduled from onkeydown handler
						evt.stopPropagation();
						evt.preventDefault();
						self._scheduleOpen(this, iframe, {x: evt.pageX, y: evt.pageY});
					}),
					on(cn, delegatedEvent("keydown"), function(evt){
						if(evt.shiftKey && evt.keyCode == keys.F10){
							evt.stopPropagation();
							evt.preventDefault();
							self._scheduleOpen(this, iframe);	// no coords - open near target node
						}
					})
				];
				result.push(
					on(cn, delegatedEvent("mouseover"), function(evt){
						if (self.openOnHover) {
							// Schedule context menu to be opened unless it's already been scheduled from onkeydown handler
							evt.stopPropagation();
							evt.preventDefault();
							self._scheduleOpen(this, iframe, {x: evt.pageX, y: evt.pageY});
						}
					})					
				);			
				return result;
			});
			binding.connects = cn ? doConnects(cn) : [];

			if(iframe){
				// Setup handler to [re]bind to the iframe when the contents are initially loaded,
				// and every time the contents change.
				// Need to do this b/c we are actually binding to the iframe's <body> node.
				// Note: can't use connect.connect(), see #9609.

				binding.onloadHandler = lang.hitch(this, function(){
					// want to remove old connections, but IE throws exceptions when trying to
					// access the <body> node because it's already gone, or at least in a state of limbo

					var window = this._iframeContentWindow(iframe),
						cn = win.body(window.document);
					binding.connects = doConnects(cn);
				});
				if(iframe.addEventListener){
					iframe.addEventListener("load", binding.onloadHandler, false);
				}else{
					iframe.attachEvent("onload", binding.onloadHandler);
				}
			}
		}	

	});
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
        "./form/buttons",
        "./grid/treeGrids",
        "dijit/_base/manager"],  // temporarily resolves parser issue with dijit.byId
        function(dLang,iMain) {
	return dLang.getObject("ext", true, iMain);
});

},
'idx/form/CheckBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/has",
	"dojo/_base/lang",
	"dijit/form/CheckBox",
	"./_CssStateMixin",
	"./_CompositeMixin",
	"./_ValidationMixin",
	"dojo/has!dojo-bidi?../bidi/form/CheckBox",
	
	// ====================================================================================================================
	// ------
	// Load _TemplatePlugableMixin and PlatformPluginRegistry if on "mobile" or if on desktop, but using the 
	// platform-plugable API.  Any prior call to PlaformPluginRegistry.setGlobalTargetPlatform() or 
	// PlatformPluginRegistry.setRegistryDefaultPlatform() sets "platform-plugable" property for dojo/has.
	// ------
	"require", 
	"require",
	
	// ------
	// We want to load the desktop template unless we are using the mobile implementation.
	// ------
	"idx/has!#idx_form_CheckBox-desktop?dojo/text!./templates/CheckBox.html" 	// desktop widget, load the template
		+ ":#idx_form_CheckBox-mobile?"											// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/CheckBox.html"						// global desktop platform, load template
		+ ":#mobile?"															// global mobile platform, don't load
		+ ":dojo/text!./templates/CheckBox.html", 								// no dojo/has features, load the template
			
	// ------
	// Load the mobile plugin according to build-time/runtime dojo/has features
	// ------
	"idx/has!#idx_form_CheckBox-mobile?./plugins/phone/CheckBoxPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_CheckBox-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/phone/CheckBoxPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin

	// ====================================================================================================================
], function(declare, has, lang, CheckBox, _CssStateMixin, _CompositeMixin, _ValidationMixin, bidiExtension, 
		TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
			
	
	var baseClassName = "idx.form.CheckBox";
	if (has("mobile") || has("platform-plugable")) {
		baseClassName = baseClassName + "Base";
	}
	if (has("dojo-bidi")) {
		baseClassName = baseClassName + "_";
	}		
		
	
	var iForm = lang.getObject("idx.oneui.form", true);
	
	/**
	 * @name idx.form.CheckBox
	 * @class idx.form.CheckBox is implemented according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y6&vsub=*&hsub=*&openpanes=0100110000">Check Boxes Standard</a></b>.
	 * It is a composite widget which enhanced dijit.form.CheckBox with following features:
	 * <ul>
	 * <li>Built-in label</li>
	 * <li>Built-in required attribute</li>
	 * <li>One UI theme support</li>
	 * </ul>
	 * @augments dijit.form.CheckBox
	 * @augments idx.form._CssStateMixin
	 * @augments idx.form._CompositeMixin
	 * @augments idx.form._ValidationMixin
	 */
	iForm.CheckBox = declare(baseClassName, [CheckBox, _CssStateMixin, _CompositeMixin, _ValidationMixin],
	/**@lends idx.form.CheckBox.prototype*/
	{
		// summary:
		// 		One UI version CheckBox
		
		instantValidate: true,
		
		baseClass: "idxCheckBoxWrap",
		
		oneuiBaseClass: "dijitCheckBox",
		
		labelAlignment: "horizontal",
		
		templateString: desktopTemplate,
		
		postCreate: function(){
			this._event = {
				"input" : "onChange",
				"blur" 	: "_onBlur",
				"focus" : "_onFocus"
			}
			this.inherited(arguments);
		},
		
		_isEmpty: function(){
			return !this.get("checked");
		},
		_onBlur: function(evt){
			this.mouseFocus = false;
			this.inherited(arguments);
		},
		
		_setDisabledAttr: function(){
			this.inherited(arguments);
			this._refreshState();
		},
		
		_setLabelAlignmentAttr: null,
		_setFieldWidthAttr: null,
		_setLabelWidthAttr: null,
		resize: function(){return false;}
	});
	
	if (has("dojo-bidi")) {
		baseClassName = baseClassName.substring(0, baseClassName.length-1);
		var baseCheckBox = iForm.CheckBox;
		iForm.CheckBox = declare(baseClassName,[baseCheckBox,bidiExtension]);
	}
	
	if ( has("mobile") || has("platform-plugable")) {
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/CheckBox", 
				{	
					desktop: "inherited",	// no plugin for desktop, use inherited methods  
				 	mobile: MobilePlugin	// use the mobile plugin if loaded
				});
		var localOneuiBaseClass = iForm.CheckBox.prototype.oneuiBaseClass;
		if (MobilePlugin && MobilePlugin.prototype && MobilePlugin.prototype.oneuiBaseClass != null && MobilePlugin.prototype.oneuiBaseClass != undefined){
			localOneuiBaseClass = MobilePlugin.prototype.oneuiBaseClass;
		}

		iForm.CheckBox = declare("idx.form.CheckBox",[iForm.CheckBox, TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			templatePath: require.toUrl("idx/form/templates/CheckBox.html"),  
			/**
			 * 
			 */
			oneuiBaseClass: localOneuiBaseClass,
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			/**
			 * Stub Plugable method
			 */
			_setCheckedAttr: function(value){
				var node = this.focusNode;
				node.setAttribute("value",value);
				this.inherited(arguments);
			},		 			
			/**
			 * 
			 * @param {Object} message
			 */
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			/**
			 * 
			 * @param {Object} helpText
			 */
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			}
		});
	}
	
	return iForm.CheckBox;
});
},
'idx/widget/MenuDialog':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare",
		"dojo/_base/array",
		"dojo/_base/connect",
		"dojo/_base/event",
		"dojo/_base/lang",
		"dojo/_base/sniff",
		"dojo/_base/window",
		"dojo/aspect",
		"dojo/dom",
		"dojo/dom-class",
		"dojo/dom-geometry",
		"dojo/dom-style",
		"dojo/request/iframe",
		"dojo/keys",
		"dojo/window",
		"dijit/popup",
		"dijit/TooltipDialog",
		"./_EventTriggerMixin",
		"dojo/text!./templates/MenuDialog.html"],
		function(declare, array, connect, event, lang, has, win, aspect, dom, domClass, domGeometry, domStyle, iframe, keys, _window, popup, TooltipDialog, _EventTriggerMixin, template){
	var oneuiRoot = lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2
		
	function nodeUsesArrowKeys(/*DOMNode*/ node){
		// return true if the DOM node is one that uses arrow keys (like
		// a text entry field) but doesn't stop them propagating -- we
		// will ignore arrow keypresses that were originally targetted
		// at such nodes so as not to double-act when the arrow keys are
		// pressed.
		
		return (node.nodeName === "TEXTAREA")
		    || ((node.nodeName === "INPUT") && (node.type === "text"));
	}

	/**
	 * Creates a new idx.widget.MenuDialog
	 * @name idx.widget.MenuDialog
	 * @class The MenuDialog widget is the main container for rich mega-menu
	 * content. It extends dijit.TooltipDialog and adds the necessary 
	 * functionality to enable the resulting popup to act like a menu, and integrate
	 * with the rest of the existing dijit menu framework. This results in a 
	 * widget that 
	 * facilitates the creation of menus with arbitrary dialog content. 
	 * <p>Instances can be supplied as the "popup" parameter for 
	 * dijit.PopupMenuItem and dijit.PopupMenuBarItem, and will work
	 * "as expected". Instances can also operate as popup menus on arbitrary
	 * DOM nodes, or for the whole window.
	 * </p>
	 * <p>Instances can display with a "shark fin" connector to identify
	 * the initiating element or with a thinner border, no shark
	 * fin and abutting the initiating element.
	 * </p>
	 * <p>Instances behave as content panes, and HTML and dijits may be
	 * laid out within them. If a menu with "menuForDialog" set to true is
	 * included within the layout, the menu dialog will operate as a
	 * drop-down menu in combination with the contained	menu.
	 * </p>
	 * @augments dijit.TooltipDialog
	 * @augments idx.widget._EventTriggerMixin
	 * @example
	 * &lt;div data-dojo-type="idx.widget.MenuBar"&gt;
  &lt;div data-dojo-type="dijit.PopupMenuBarItem"&gt;
    &lt;span&gt;Menu #1&lt;/span&gt;
    &lt;div data-dojo-type="idx.widget.MenuDialog"&gt;</span>
      &lt;!-- Arbitrary mega menu content --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
	 */
	return oneuiRoot.MenuDialog = declare("idx.widget.MenuDialog", [TooltipDialog, _EventTriggerMixin],
	/** @lends idx.widget.MenuDialog.prototype */
	{
		/**
		 * CSS class applied to DOM node. Part of standard templated widget 
		 * behavior.
		 * @type string
		 * @constant
		 * @private
		 */
		baseClass: "oneuiMenuDialog",
		
		/**
		 * Flag to indicate whether we need to close ourselves in onBlur. This
		 * flag is only true while we are popped up from a manual open or
		 * bindDomNode trigger.
		 * @type boolean
		 * @private
		 */
		_closeOnBlur: false,
		
		/**
		 * If true, hover will trigger popup whenever the menu dialog is
		 * bound to a DOM node (via bindToDomNode). Otherwise, a mouse
		 * click (or tap on a touch interface) will be required. This setting
		 * does not affect keyboard alternative triggers, which will be
		 * active in the same way in all cases. This value can be overridden
		 * for individual calls to bindToDomNode by including a "hoverToOpen"
		 * property in the (optional) parameters object.
		 * @type boolean
		 */
		hoverToOpen: true,
		
		/**
		 * True if the menu dialog is currently showing, false otherwise. Part
		 * of the standard dijit menu logic.
		 * @type boolean
		 * @private
		 */
		isShowingNow: false,
		
		/**
		 * If true, a left mouse click (or tap on a touch interface) will
		 * trigger popup whenever the menu dialog is bound to a DOM node
		 * (via bindDomNode). Otherwise, a right mouse click will be
		 * required. Furthermore, when leftClickToOpen is true the keyboard
		 * alternative triggers become space-bar and enter key and the popup
		 * is automatically positioned relative to the triggering DOM node,
		 * whilst when leftClickToOpen is false the keyboard alternative
		 * trigger is Shift+F10 and the popup is positioned relative to the
		 * mouse position (when triggered by a mouse event, and relative to
		 * the triggering DOM node otherwise). This value can be overridden
		 * for individual calls to bindDomNode by including a
		 * "leftClickToOpen" property in the (optional) parameters object.
		 * @type boolean
		 */
		leftClickToOpen: false,
		
		/**
		 * Pointer to menu that displayed the MenuDialog. Part
		 * of the standard dijit menu logic.
		 * @type dijit.Widget
		 * @private
		 */
		parentMenu: null,

		/**
		 * Ordered list of positions to try placing the popup at whenever the
		 * menu dialog is bound to a DOM node (via bindToDomNode). The first
		 * position which allows the popup to be fully visible within the
		 * viewport will be used. Possible values are:
		 * <ul>
		 * <li>
		 * before: places drop down to the left of the anchor node/widget, or
		 * to the right in RTL mode
		 * </li>
		 * <li>
		 * after: places drop down to the right of the anchor node/widget, or
		 * to the right in RTL mode
		 * </li>
		 * <li>
		 * above: drop down goes above anchor node/widget
		 * </li>
		 * <li>
		 * above-alt: same as above except right sides aligned instead of left
		 * </li>
		 * <li>
		 * below: drop down goes below anchor node/widget
		 * </li>
		 * <li>
		 * below-alt: same as below except right sides aligned instead of left
		 * </li>
		 * </ul>
		 * This value can be overridden for individual calls to bindToDomNode
		 * by including a "popupPosition" property in the (optional)
		 * parameters object. If no value is provided (or null) a default
		 * sequence of positions (below, below-alt, above, above-alt) is used.
		 * @name popupPosition
		 * @memberOf idx.widget.MenuDialog.prototype
		 * @type string[]
		 */
		
		/**
		 * If true, when this menu dialog closes re-focus the element
		 * which had focus before it was opened.
		 * @type boolean
		 * @private
		 */
		refocus: true,
	
		/**
		 * An array of DOM node ids to which the menu dialog should be
		 * bound during widget initialisation. Note that this array is
		 * processed only once, during creation, and later changes that
		 * may be made will be ignored; also, the array is not updated
		 * if/when further explicit calls to bindDomNode/unbindDomNode are made.
		 * @name targetNodeIds
		 * @memberOf idx.widget.MenuDialog.prototype
		 * @type DOMNode[]
		 */
		targetNodeIds: [], // need to override this class-static value in postMixInProperties
		
		/**
	 	 * The template HTML for the widget.
		 * @constant
		 * @type string
		 * @private
		 * @default Loaded from idx/widget/templates/MenuDialog.html.
		 */
		templateString: template,
		
		/**
		 * If true, the menu will show a "shark-fin" connector linking the
		 * opened popup dialog to the initiating DOM element or menu item.
		 * This value can be overridden for individual calls to bindDomNode
		 * by including a "useConnector" property in the (optional)
		 * parameters object.
		 * @type boolean
		 */
		useConnector: false,

		postMixInProperties: function() {
			this.targetNodeIds = this.targetNodeIds || [];
			this.inherited(arguments);
		},
		
		/**
		 * Standard Widget lifecycle method.
		 * @private
		 */		
		postCreate: function(){
			this.inherited(arguments);
			
			// intercept and process certain navigational keystrokes
			var l = this.isLeftToRight();
			this._nextMenuKey = l ? keys.RIGHT_ARROW : keys.LEFT_ARROW;
			this._prevMenuKey = l ? keys.LEFT_ARROW : keys.RIGHT_ARROW;
			this.connect(this.domNode, "onkeypress", "_onDomNodeKeypress");
			
			// do any initial bindings to DOM nodes requested
			if(this.contextMenuForWindow){
				this.bindDomNode(win.body());
			}else{
				array.forEach(this.targetNodeIds, function(nodeid){
					this.bindDomNode(nodeid);
				}, this);
			}
		},
		
		/**
		 * Handle keypress events at the outer containing DOM node to process
		 * arrow-key navigation.
		 * @param {Event} evt
		 */
		_onDomNodeKeypress: function(evt){
			var target = evt.target || evt.srcElement,
				handled = false;

			if(this.parentMenu && !evt.ctrlKey && !evt.altKey && (!target || !nodeUsesArrowKeys(target))){
				switch(evt.charOrCode){
					case this._nextMenuKey:
						this.parentMenu._getTopMenu().focusNext();
						handled = true;
						break;
						
					case this._prevMenuKey:
						if(this.parentMenu._isMenuBar){
							this.parentMenu.focusPrev();
						}else{
							this.onCancel(false);
						}
						handled = true;
						break;
				}
			}
			
			if(handled){
				event.stop(evt);
			}else{
				this.inherited(arguments);
			}
		},		
		
		/**
		 * Return the menu for the dialog, or undefined if no menu for the
		 * dialog can be found.
		 */
		_getMenuForDialog: function(){
			var children = this.getChildren(),
				result;
				
			for(var i = 0; !result && (i < children.length); i++){
				if(children[i] && children[i].menuForDialog){
					result = children[i];
				}
			}

			return result;
		},
		
		focus: function(){
			// Override focus() method to have no effect if called when the
			// menu dialog already has focus. This is slightly more efficient,
			// but more importantly it avoids a current problem (in Dojo 1.8.0)
			// in which a superfluous second call to focus() when the default
			// focus should go to a menu places focus in another widget because
			// the KeyNavContainer behaviour of the menu has left it temporarily
			// unfocusable -- in Dojo 1.8.0 the Dijit Menubar makes such a
			// superfluous second call when down-arrow is used to transfer focus
			// to an already-open menu. Both of these issues have been reported
			// as Dojo defects via IDT.
			
			if(!this.focused){
				this.inherited(arguments);
			}
		},
		
		/**
		 * Finds focusable items in dialog,	and sets this._firstFocusItem and
		 * this._lastFocusItem.
		 */		
		_getFocusItems: function(){
			this.inherited(arguments);
			
			// if _firstFocusItem or _lastFocusItem have been set to our DOM node,
			// set them to the containerNode instead, which is a better focus target
			if(this._firstFocusItem == this.domNode){
				this._firstFocusItem = this.containerNode;
			}
			if(this._lastFocusItem == this.domNode){
				this._lastFocusItem = this.containerNode;
			}
		},
		
		/**
		 * Called when an event occurs that should result in the MenuDialog
		 * being shown.
		 * <p>
		 * Set timer to display myself. Using a timer rather than displaying
		 * immediately solves two problems:
		 * <ol>
		 * <li>
		 * IE: without the delay, focus work in "open" causes the system
		 * context menu to appear in spite of stopEvent.
		 * </li>
		 * <li>
		 * Avoid double-shows on linux, where shift-F10 generates an 
		 * oncontextmenu event even after a event.stop(e). (Shift-F10 on
		 * windows doesn't generate the oncontextmenu event.)
		 * </p>
		 * @private
		 * @param {Object} params An object containing data about the event. See
		 * {@link idx.widget._EventTriggerMixin#_onTrigger}
		 */
		_onTrigger: function(params){
			var coords = null;
			if(!params.additionalData.leftClickToOpen && ("pageX" in params.event)){
				coords = { x: params.event.pageX, y: params.event.pageY }; 			
				if (params.triggerNode.tagName === "IFRAME") {
					// Specified coordinates are on <body> node of an <iframe>, convert to match main document
					var ifc = domGeometry.position(params.triggerNode, true), scroll = win.withGlobal(_window.get(iframe.doc(params.triggerNode)), "docScroll", domGeometry);
					
					var cs = domStyle.getComputedStyle(params.triggerNode), tp = domStyle.toPixelValue, left = (has("ie") && has("quirks") ? 0 : tp(params.triggerNode, cs.paddingLeft)) + (has("ie") && has("quirks") ? tp(params.triggerNode, cs.borderLeftWidth) : 0), top = (has("ie") && has("quirks") ? 0 : tp(params.triggerNode, cs.paddingTop)) + (has("ie") && has("quirks") ? tp(params.triggerNode, cs.borderTopWidth) : 0);
					
					coords.x += ifc.x + left - scroll.x;
					coords.y += ifc.y + top - scroll.y;
				}
			}
	
			if(!this._openTimer){
				this._openTimer = setTimeout(lang.hitch(this, function(){
					delete this._openTimer;

					this.open({
						around: params.triggerNode,
						coords: coords,
						position: params.additionalData.popupPosition,
						useConnector: params.additionalData.useConnector
					});
				}), 1);
			}
			
			if(params.event.type != "hover")
				event.stop(params.event);
		},
	
		/**
		 * An attach point that is called when the MenuDialog loses focus. 
		 */
		onBlur: function(){
			this.inherited(arguments);

			if(this._closeOnBlur){
				this.close();
			}
		},

		/**
		 * Opens the MenuDialog at the specified position.
		 * @param {Object} args An object containing some the following fields,
		 * which are all optional but at least one of 'around' and 'coords'
		 * should be supplied:
		 * <ul>
		 * <li>
		 * 	around: A DOM node that the popup should be placed around.
		 * </li>
		 * <li>
		 * 	coords: A position (with fields x and y) containing coordinates
		 * 	that the popup should be placed at.
		 * </li>
		 * <li>
		 * 	position: Ordered list of positions to try placing the popup at.
		 * 	The first position which allows the popup to be fully visible
		 * 	within the viewport will be used, or the best available option.
		 * 	Possible values are:
		 * 	<ul>
		 * 		<li>
		 * 			before: places drop down to the left of the around
		 * 			node/coords, or to the right in RTL mode
		 * 		</li>
		 * 		<li>
		 *			after: places drop down to the right of the around
		 *			node/coords, or to the right in RTL mode
		 * 		</li>
		 * 		<li>
		 *			above: drop down goes above around node/coords
		 * 		</li>
		 * 		<li>
		 *			above-alt: same as above except right sides aligned
		 *			instead of left
		 * 		</li>
		 * 		<li>
		 *			below: drop down goes below around node/coords
		 * 		</li>
		 * 		<li>
		 *			below-alt: same as below except right sides aligned instead
		 *			of left
		 * 		</li>
		 * 		</ul>
		 *		If this field is omitted the current value of the widget
		 *		popupPosition property is used.
		 * </li>
		 * <li>
		 *		useConnector: If true, a shark-fin connector is shown linking
		 *		the popup to the around node/coords. If this field is omitted
		 *		the current value of the widget useConnector property is used.
		 * </li>
		 * </ul>
		 */		
		open: function(args){
			// store the node which focus should return to, if necessary, and if possible
			var refocusNode = null;
			if(this.refocus){
				refocusNode = this._focusManager.get("curNode");
				if(!refocusNode || dom.isDescendant(refocusNode, this.domNode)){
					refocusNode = this._focusManager.get("prevNode");
				}
				if(dom.isDescendant(refocusNode, this.domNode)){
					refocusNode = null;
				}
			}
			
			// use coords if supplied, otherwise use the around node if supplied,
			// or use current focus node, or (0,0) as a last resort
			var around = (args && (args.coords ? { x: args.coords.x, y: args.coords.y, w: 0, h: 0 } : args.around)) || refocusNode || this._focusManager.get("curNode") || { x: 0, y: 0, w: 0, h: 0 };
			//work around for popup.open(call "around.getBoundingClientRect" inside)
			if(!around.getBoundingClientRect){
				around.getBoundingClientRect = function(){return around};
			}
			
			var closeFunction = lang.hitch(this, function(){
				if(refocusNode){
					refocusNode.focus();
				}
				
				this.close();
			});
						
			this._useConnectorForPopup = (args && ("useConnector" in args)) ? args.useConnector : this.useConnector;
				
			popup.open({
				popup: this,
				around: around,
				onExecute: closeFunction,
				onCancel: closeFunction,
				orient: (args && ("position" in args)) ? args.position : this.popupPosition
			});
				
			delete this._useConnectorForPopup;
						
			this.focus();
			this._closeOnBlur = true;
		},
		
		/**
		 * Closes the MenuDialog. 
		 */
		close: function(){
			popup.close(this);
		},
		
		/**
		 * Attach the MenuDialog to the specified trigger node.
		 * @param {string|DOMNode} node The node to be used to trigger the
		 * MenuDialog to pop-up. 
		 * @param {Object} params An object that can contain properties that 
		 * override the popupPosition, useConnector, leftClickToOpen,
		 * and hoverToOpen properties of the 
		 * MenuDialog on a per node attachment basis.
		 */
		bindDomNode: function(/*String|DomNode*/ node, /*Object*/ params){
			var settings = lang.delegate(this);
			for(var name in params){
				settings[name] = params[name];
			}
			
			this._addEventTrigger(node, "click", function(fparams){
				return settings.leftClickToOpen;
			}, settings);
			
			this._addEventTrigger(node, "contextmenu", function(fparams){
				return !settings.leftClickToOpen;
			}, settings);
			
			this._addEventTrigger(node, "keydown", function(fparams){
				// if right-click is the trigger, accept Shift+F10 as an equivalent
				// in case the browser doesn't send us the contextmenu event
				return !settings.leftClickToOpen && fparams.event.shiftKey && (fparams.event.keyCode == keys.F10);
			}, settings);
			
			this._addEventTrigger(node, "hover", function(fparams){
				return settings.hoverToOpen;
			}, settings);
		},
	
		/**
		 * Detach menu dialog from given DOM node. If no node is specified,
		 * detach menu dialog from all bound DOM nodes.
		 * @param {string|DOMNode} nodeName The DOM node to dissociate the 
		 * MenuDialog from.
		 */
		unBindDomNode: function(/*String|DomNode*/ nodeName){
			this._removeEventTriggers(nodeName);
		},
		
		/**
		 * Configure the widget to display in a given position. This may be
		 * called several times during popup in order to "try out" different
		 * configurations and then select the best. It will always be called
		 * one final time with the actual configuration to be used.
		 * @param {Object} aroundNodeSize
		 * @param {string} aroundCorner
		 * @param {string} corner
		 * @param {boolean} useConnector
		 */
		_layoutNodes: function(/*Object*/ aroundNodeSize, /*String*/ aroundCorner, /*String*/ corner, /*Boolean*/ useConnector){
			var newcss = useConnector ? "oneuiMenuDialogConnected" : "",
				newparentcss = "",
				cornerv = corner && (corner.length >= 1) && corner.charAt(0),
				cornerh = corner && (corner.length >= 2) && corner.charAt(1),
				mybox = domGeometry.getContentBox(this.domNode),
				displacementProperty, displacementValue,
				getContentBox = function(node){
					var style = node.style,
						oldDisplay = style.display,
						oldVis = style.visibility;
					if(style.display == "none"){
						style.visibility = "hidden";
						style.display = "";
					}
					var result = domGeometry.getContentBox(node);
					style.display = oldDisplay;
					style.visibility = oldVis;
					return result;
				}
			
			// we use a combination of two classes to enable the CSS markup to be applied
			// to position our connector correctly.
			//
			// dijitTooltipAbove, dijitTooltipBelow, dijitTooltipLeft, dijitTooltipRight,
			// indicating which way the popup goes from the position or around node
			//
			// When dijitTooltipAbove or dijitTooltipBelow are used, one of the classes
			// dijitTooltipABLeft, dijitTooltipABRight, dijitTooltipABMiddle is also
			// applied to indicate where on the top/bottom edge the connector should appear.    
			//
			// When dijitTooltipLeft or dijitTooltipRight are used, one of the classes
			// dijitTooltipLRTop, dijitTooltipLRBottom, dijitTooltipLRMiddle is also
			// applied to indicate where on the left/right edge the connector should appear.			
			 
			if( (cornerv === 'M')  // 'ML' or 'MR'
			 || ((cornerh !== 'M') && (cornerh !== aroundCorner.charAt(1)))){  // '?L' against '?R' means a left/right abuttal
				// the popup is going left or right
				newcss += " dijitTooltip" + (cornerh === 'L' ? "Right" : "Left");
				
				switch(cornerv){
					case 'M':
						newcss += " dijitTooltipLRMiddle";
						break;
					case 'T':
						newcss += " dijitTooltipLRTop";
						useConnector && (newparentcss = "connectorNearTopEdge");
						if(aroundNodeSize.h > 0){
							displacementProperty = "top";
							displacementValue = Math.max(4, 4 + Math.min(getContentBox(this.domNode.parentNode).h - 24, aroundNodeSize.h / 2)) + "px"; 
						}
						break;
					case 'B':
						newcss += " dijitTooltipLRBottom";
						useConnector && (newparentcss = "connectorNearBottomEdge");
						if(aroundNodeSize.h > 0){
							displacementProperty = "bottom";
							displacementValue = (4 + Math.min(getContentBox(this.domNode.parentNode).h - 24, aroundNodeSize.h / 2)) + "px"; 
						}
						break;
				}
			}else{  // 'TM' or 'BM', or '?L' against '?L' or '?R' against '?R' which both mean an above/below abuttal
				// the popup is going above or below
				newcss += " dijitTooltip" + (cornerv === 'T' ? "Below" : "Above");
				
				switch(cornerh){
					case 'M':
						newcss += " dijitTooltipABMiddle";
						break;
					case 'L':
						newcss += " dijitTooltipABLeft";
						useConnector && (newparentcss = "connectorNearLeftEdge");
						if(aroundNodeSize.w > 0){
							displacementProperty = "left";
							displacementValue = Math.max(4, 4 + Math.min(getContentBox(this.domNode.parentNode).w - 16, aroundNodeSize.w / 2)) + "px"; 
						}
						break;
					case 'R':
						newcss += " dijitTooltipABRight";
						useConnector && (newparentcss = "connectorNearRightEdge");
						if(aroundNodeSize.h > 0){
							displacementProperty = "right";
							displacementValue = (4 + Math.min(getContentBox(this.domNode.parentNode).w - 24, aroundNodeSize.w / 2)) + "px"; 
						}
						break;
				}
			}
			
			domClass.replace(this.domNode, newcss, this._currentOrientClass || "");
			this._currentOrientClass = newcss;
			
			domClass.replace(this.domNode.parentNode, newparentcss, this._currentConnectorClass || "");
			this._currentConnectorClass = newparentcss;
			
			// remove any previous displacement values that might have been applied
			this.connectorNode.style.top = "";
			this.connectorNode.style.bottom = "";
			this.connectorNode.style.left = "";
			this.connectorNode.style.right = "";
			
			if(displacementProperty){
				this.connectorNode.style[displacementProperty] = displacementValue;
			}
		},
		
		/**
		 * Configure widget to be displayed in given position relative to the
		 * trigger node. This is called from the dijit.popup code, and should
		 * not be called directly.
		 * @private
		 * @param {DOMNode} node
		 * @param {string} aroundCorner
		 * @param {string} corner
		 * @param {Object} spaceAvailable
		 * @param {Object} aroundNodeCoords
		 */
		orient: function(/*DomNode*/ node, /*String*/ aroundCorner, /*String*/ corner, spaceAvailable, aroundNodeCoords){
			this._layoutNodes(aroundNodeCoords, aroundCorner, corner, ("_useConnectorForPopup" in this) ? this._useConnectorForPopup : this.useConnector);
		},

		/**
		 * An attach point that is called when the MenuDialog is opened. 
		 */
		onOpen: function(pos){
			this.isShowingNow = true;
			
			// set up our initial display
			this._layoutNodes(pos.aroundNodePos, pos.aroundCorner, pos.corner, ("_useConnectorForPopup" in this) ? this._useConnectorForPopup : this.useConnector);
			this.reset();
			
			// if there is a menu we are to work with, connect to it now
			var menu = this._getMenuForDialog();
			if(menu){
				// ensure that our menu has parentMenu set to our parent
				// so that focus chains connect up correctly
				if(this._menuparented){
					// this shouldn't happen, but handle it cleanly if it does
					this._menuparented.parentMenu = null;
				}
				menu.parentMenu = this.parentMenu;
				this._menuparented = menu;
				
				// ensure that "execute" events on our menu trigger "execute"
				// events on us, so that the notification passes up the menu
				// cascade chain correctly
				if(this._handleexecute){
					// this shouldn't happen, but handle it cleanly if it does
					this._handleexecute.remove();
				}
				var fireexecute = lang.hitch(this, this.onExecute);
				this._handleexecute = menu.on("execute", fireexecute);
				
				// ensure that "execute" events returning from popup/cascade
				// menus opened in turn by our menu also trigger "execute"
				// events on us. The "execute" events will otherwise terminate
				// there, because our menu will not be in the popup stack; all
				// the child menus cascading from it will be correctly folded
				// away, but we need to pass the notification upwards so that
				// the next segment of the popup stack can also be folded away.
				if(this._handleopen){
					// this shouldn't happen, but handle it cleanly if it does
					this._handleopen.remove();
				}
				this._handleopen = aspect.after(menu, "_openPopup", function(){
					// after _openPopup is called, retrieve the popup stack item just
					// added and hook into its onExecute() method, which will be called
					// when an execute is triggered on a descendant menu item
					var stackitem = popup._stack[popup._stack.length - 1];
					if(!stackitem._menuregistered){
						stackitem._menuregistered = true;
						stackitem.handlers.push(aspect.around(stackitem, "onExecute", function(originalOnExecute){
							return function(){
								// during the default onExecute handling, all the handlers
								// will be removed, so we can't use an 'after'. Instead,
								// we use 'around', call the original, then fire our own
								// 'execute' event. 
								originalOnExecute.apply(this, arguments);
								fireexecute();							
							}
						}));
					}
				}, true);
			}
			
			this._onShow(); // lazy load trigger
		},

		/**
		 * An attach point that is called when the MenuDialog is closed. 
		 */
		onClose: function(){
			this.isShowingNow = false;
			this._closeOnBlur = false;
			
			// if we connected to a menu, disconnect it now
			if(this._handleexecute){
				this._handleexecute.remove();
				this._handleexecute = null;
			}
			if(this._handleopen){
				this._handleopen.remove();
				this._handleopen= null;
			}
			
			// if we set the parent of a menu, reset it now
			if(this._menuparented){
				this._menuparented.parentMenu = null;
				this._menuparented = null;
			}
			
			this.onHide();
		},

		/**
		 * An attach point for the parent menu to listen for the MenuDialog being
		 * cancelled. Calling it will cause this MenuDialog to be closed, 
		 * but not any menus it may have cascaded from.
		 * @name idx.widget.MenuDialog.prototype.onCancel
		 * @function
		 * @public
		 */		

		/**
		 * An attach point for the parent menu to listen for menu items being
		 * executed. Calling it will cause this MenuDialog and any menus it
		 * may have cascaded from to be closed.
		 */		
		onExecute: function(){
		}

	});
});

},
'idx/widget/CheckBoxTree':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/aspect",
	"dojo/on",
	"dojo/dom-prop",
	"dijit/Tree",
	"dijit/_WidgetsInTemplateMixin",
	"idx/form/TriStateCheckBox",
	"./checkboxtree/_dndSelector",
	"./_CheckBoxTreeNode"
], function(declare, array, lang, aspect, on, domProp, Tree, _WidgetsInTemplateMixin, TriStateCheckBox, _dndSelector, _CheckBoxTreeNode){
	var oneuiRoot = lang.getObject("idx.oneui", true); // for backward compatibility with IDX 1.2

	/**
	 * @name idx.widget.CheckBoxTree
	 * @class idx.widget.CheckBoxTree extended dijit.Tree with indirect selection. It supports both
	 * dijit.ForestStoreModel and dijit.TreeStoreModel. The check states of the checkboxes is implemented
	 * according to IBM One UI(tm) <b><a href="http://dleadp.torolab.ibm.com/uxd/uxd_oneui.jsp?site=ibmoneui&top=x1&left=y6&vsub=*&hsub=*&openpanes=0100110000">Check Boxes Standard</a></b>
	 * In addtion, DND feature is avaible for both standard CheckBoxTree and Forest CheckBoxTree .
	 * Note: DND feature is not compliant with server side store such as JSON REST store.<br>
	 * <br>
	 * <b>Example: CheckBoxTree with dijit.tree.TreeStoreModel & DnD feature off</b>
	 * <pre>
	 * &lt;div data-dojo-id="continentStore" data-dojo-type="dojo.data.ItemFileWriteStore" data-dojo-props='url:"_data/countries.json"'>&lt;/div>
	 * &lt;div data-dojo-id="continentModel" data-dojo-type="dijit.tree.TreeStoreModel" data-dojo-props='store:continentStore, query:{id:"ROOT"}, rootId:"continentRoot", rootLabel:"Continents", childrenAttrs:["children"]'>&lt;/div>
	 * &lt;div id="mytree" data-dojo-type="idx.widget.CheckBoxTree" data-dojo-props='model:continentModel, autoExpand:true, openOnClick:true, onLoad:function(){ console.log("loaded mytree (first tree)"); }'>
	 * </pre>
	 * <b>Example: CheckBoxTree with DnD feature on</b>
	 * <pre>
	 * &lt;div data-dojo-id="continentStore" data-dojo-type="dojo.data.ItemFileWriteStore" data-dojo-props='url:"_data/countries.json"'>&lt;/div>
	 * &lt;div data-dojo-id="continentModel" data-dojo-type="dijit.tree.TreeStoreModel" data-dojo-props='store:continentStore, query:{id:"ROOT"}, rootId:"continentRoot", rootLabel:"Continents", childrenAttrs:["children"]'>&lt;/div>
	 * &lt;div id="mytree" data-dojo-type="idx.widget.CheckBoxTree" data-dojo-props='model:continentModel, autoExpand:true, openOnClick:true, dragThreshold:8, betweenThreshold:5, dndController: "idx.widget.checkboxtree.dndSource", onLoad:function(){ console.log("loaded mytree (first tree)"); }'>&lt;/div>
	 * </pre>
	 * @augments dijit.Tree
	 */
	return oneuiRoot.CheckBoxTree = declare("idx.widget.CheckBoxTree", [Tree],
	/**@lends idx.widget.CheckBoxTree.prototype*/
	{
		// summary: extended tree with check boxes
		baseClass: "idxCheckBoxTree",
		
		dndController: _dndSelector,
		
		openOnClick: false,
		
		_itemStatus: null,
			
		postMixInProperties: function(){
			this.inherited(arguments);
			this._itemStatus = {};
		},
		/**
		 * 
		 * @param {Object} Object args
		 */
		_createTreeNode: function(/*Object*/ args){
			// summary:
			//		creates a TreeNode
			// description:
			//		Developers can override this method to define their own TreeNode class;
			//		However it will probably be removed in a future release in favor of a way
			//		of just specifying a widget for the label, rather than one that contains
			//		the children too.
			var checkboxTreeNode = new _CheckBoxTreeNode(args);
			return checkboxTreeNode;
		},
		
		testUpdateChildTimes: 0,
		/**
		 * Aspect the function of _expandNode
		 */
		postCreate: function(){

			this.inherited(arguments);
			var model = this.model,
				_this = this;
			aspect.after(this,"_expandNode",function(defferdRetValue, args){
				var node = args[0],
					nodeState = node.getChecked();
				node.updateState(nodeState);
				return defferdRetValue;
			});
			
			// move the event handler from CheckBoxTreeNode to CheckBoxTree
			// Defect 12155, aspect it before Tree._onClick
			var self = this;
			aspect.before(this, "_onClick", function(nodeWidget, e){
				if ( e.target === nodeWidget.checkboxNode)
					nodeWidget.handleCheckBoxClick();
			});
			//
			// Defect 10928, remove the root tree item when the showRoot equals to false
			//
			if ( !this.showRoot && this.containerNode && this.containerNode.children && this.containerNode.children[0]){
				var node = this.containerNode.children[0];
				node.removeAttribute("role");
			}
		},
		
		/**
		 * Toggle the checkbox of the given tree node.
		 * Happened on DnD drop finished
		 * @param {String|oneui._TreeNode} item
		 * @param {Boolean|String} checked
		 */
		toggleNode: function(/*String|oneui._TreeNode*/ item, /*Boolean|String*/ checked){
			if(lang.isString(item)){
				var nodes = this.getNodesByItem(item);
				item = nodes && nodes[0] ? nodes[0] : undefined;
			}
			if(item){
				if(checked == undefined){
					checked = !item.getChecked();
				}
				item.updateState(checked);
				//add for sync of selection among different trees
				this.dndController._onNodeStateChange(item, checked);
			}
		},
		
		
		_onNodeStateChange: function(/*oneui._TreeNode*/ node, /*Boolean*/ checked){
			// summary:
			//		Called when select/unselect a node,
			//		this is monitored by the DND code
			this.onNodeStateChange(/*oneui._TreeNode*/ node, /*Boolean*/ checked);
		},
		
		/**
		 * Event triggered when the state of a node changed.
		 * @param {oneui._TreeNode} node
		 * @param {Boolean} checked
		 */
		onNodeStateChange: function(/*oneui._TreeNode*/ node, /*Boolean*/ checked){
			// summary:
			//		Callback function when the state of a node changed.
		},

		_onItemChildrenChange: function(/*dojo.data.Item*/ parent, /*dojo.data.Item[]*/ newChildrenList){
			// summary:
			//		Processes notification of a change to an item's children
			var model = this.model,
				identity = model.getIdentity(parent),
				parentNodes = this._itemNodesMap[identity];
			
			if(parentNodes){
				array.forEach(parentNodes,function(parentNode){
					parentNode.setChildItems(newChildrenList);
					parentNode.update();
					parentNode.updateParent();
				});
			}
		},
		
		/**
		 * Get Selected Item through the _itemStatus array 
		 * return an array with value of selected item
		 */
		getSelectedItems: function(){
			var result = [];
			for(var id in this._itemStatus){
				if(this._itemStatus[id] === true){
					result.push(id);
				}
			}
			return result;
		}
	});
});
},
'idx/form/DateTextBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/_base/window",
	"dojo/has",
	"dojo/on",
	"dojo/touch",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/dom-attr",
	"dojo/date/stamp",
	"dijit/_WidgetBase",
	"dijit/Calendar",
	"idx/widget/HoverHelpTooltip",
	"./_CssStateMixin",
	"./_DateTimeTextBox",
	"./_CompositeMixin",
	"require", 
	"require",
	
	"idx/has!#idx_form_DateTextBox-desktop?dojo/text!./templates/DropDownBox.html"  // desktop widget, load the template
		+ ":#idx_form_DateTextBox-mobile?"										// mobile widget, don't load desktop template
		+ ":#desktop?dojo/text!./templates/DropDownBox.html"						// global desktop platform, load template
		+ ":#mobile?"														// global mobile platform, don't load
		+ ":dojo/text!./templates/DropDownBox.html", 							// no dojo/has features, load the template
		
	"idx/has!#idx_form_DateTextBox-mobile?./plugins/mobile/DateTextBoxPlugin"		// mobile widget, load the plugin
		+ ":#idx_form_DateTextBox-desktop?"										// desktop widget, don't load plugin
		+ ":#mobile?./plugins/mobile/DateTextBoxPlugin"							// global mobile platform, load plugin
		+ ":"																// no features, don't load plugin
		
], function(declare, lang, winUtil, has, on, touch, domStyle, domClass, domConstruct, domAttr, stamp, _WidgetBase, Calendar, HoverHelpTooltip,
			_CssStateMixin, _DateTimeTextBox, _CompositeMixin, 
			_TemplatePlugableMixin, PlatformPluginRegistry, desktopTemplate, MobilePlugin){
	var oneuiForm = lang.getObject("idx.oneui.form", true); // for backward compatibility with IDX 1.2
	var iForm = lang.getObject("idx.form", true);
	
	// module:
	//		idx/form/DateTextBox
	// summary:
	//		A validating, serializable, range-bound date text box with a drop down calendar

	/**
	* @name idx.form.DateTextBox
	* @class A validating, serializable, range-bound date text box with a drop down calendar
	* @augments idx.form._DateTimeTextBox
	* @augments idx.form._CompositeMixin
	* @augments idx.form._CssStateMixin
	*/ 
	var DateTextBox = declare("idx.form.DateTextBox_base", [_DateTimeTextBox, _CompositeMixin, _CssStateMixin], {
	/**@lends idx.form.DateTextBox*/ 
		// summary:
		//		A validating, serializable, range-bound date text box with a drop down calendar
		//
		//		Example:
		// |	new dijit.form.DateTextBox({value: new Date(2009, 0, 20)})
		//
		//		Example:
		// |	<input dojotype='dijit.form.DateTextBox' value='2009-01-20'>
		templateString: desktopTemplate,
		// instantValidate: Boolean
		//		Fire validation when widget get input by set true, 
		//		fire validation when widget get blur by set false
		instantValidate: false,
		/**
		* base class of this oneui widget
		*/
		baseClass: "idxDateTextBoxWrap",
		forceWidth: false,
		/**
		* base class of dijit widget
		*/
		oneuiBaseClass: "dijitTextBox dijitComboBox dijitDateTextBox",
		_selector: "date",
		popupClass: "dijit.Calendar",
		// value: Date
		//		The value of this widget as a JavaScript Date object, with only year/month/day specified.
		//		If specified in markup, use the format specified in `dojo.date.stamp.fromISOString`.
		//		set("value", ...) accepts either a Date object or a string.
		value: new Date(""),// value.toString()="NaN"
		
		showPickerIcon: false,
		
		/** @ignore */
		postCreate: function(){
			this.inherited(arguments);
			if(this.instantValidate){
				this.connect(this, "_onFocus", function(){
					if (this._hasBeenBlurred && (!this._refocusing)) {
						this.validate(true);
					}
				});
				this.connect(this, "_onInput", function(){
					this.validate(true);
				});
			}else{
				this.connect(this, "_onFocus", function(){
					if (this.message && this._hasBeenBlurred && (!this._refocusing)) {
						this.displayMessage(this.message);
					}
				})
			}
			
			//domAttr.set(this.oneuiBaseNode, "title", this.iconTitle || this._nlsResources.idxDateIconTitle || "Click to open date picker");
			
			if(this.showPickerIcon){
				var iconNode = domConstruct.create("div", {
					title: this.iconTitle || this._nlsResources.idxDateIconTitle || "Click to open date picker",
					//tabIndex: 0,
					className: "dijitInline idxPickerIconLink"
				}, this.oneuiBaseNode);
				
				var iconImage = domConstruct.create("img", {
					alt: this.iconAlt || this._nlsResources.idxDateIconTitle || "Click to open date picker",
					className: "idxPickerIcon idxCalendarIcon",
					src: this._blankGif
				}, iconNode);
				
				//a11y
				var iconImage_a11y = domConstruct.create("div", {
					className: "idxPickerIcon_a11y idxCalendarIcon_a11y",
					innerHTML: "&#128197;"
				}, iconNode);
				
				domStyle.set(this.oneuiBaseNode, "position", "relative");
			}
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
	
		var pluginRegistry = PlatformPluginRegistry.register("idx/form/DateTextBox", {	
			desktop: "inherited",	// no plugin for desktop, use inherited methods  
			mobile: MobilePlugin	// use the mobile plugin if loaded
		});
		
		DateTextBox = declare([DateTextBox,_TemplatePlugableMixin], {
			/**
		     * Set the template path for the desktop template in case the template was not 
		     * loaded initially, but is later needed due to an instance being constructed 
		     * with "desktop" platform.
	     	 */
			
			
			templatePath: require.toUrl("idx/form/templates/DropDownBox.html"),  
		
			// set the plugin registry
			pluginRegistry: pluginRegistry,
			
			openDropDown: function(callback){
				return this.doWithPlatformPlugin(arguments, "openDropDown", "openDropDown", callback);
			},
			closeDropDown: function(){
				return this.doWithPlatformPlugin(arguments, "closeDropDown", "closeDropDown");
			},
			displayMessage: function(message){
				return this.doWithPlatformPlugin(arguments, "displayMessage", "displayMessage", message);
			},
			_setHelpAttr: function(helpText){
				return this.doWithPlatformPlugin(arguments, "_setHelpAttr", "setHelpAttr", helpText);
			}
		});
	}
	return iForm.DateTextBox = declare("idx.form.DateTextBox", DateTextBox);
});

},
'idx/widget/HoverHelp':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or 
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define(["dojo/_base/declare",
		"dojo/aspect",
        "dijit/_Widget",
        "dijit/_TemplatedMixin",
        "dijit/_WidgetsInTemplateMixin",
        "dojo/_base/lang",
        "dojo/query",
        "dojo/dom-class",
        "dojo/dom-attr",
        "dojo/_base/event",
        "../string",
        "../util",
        "../resources",
        "dojo/text!./templates/HoverHelp.html",
        "dijit/form/DropDownButton",
        "idx/widget/TooltipDialog",
        "../ext",
        "dojo/i18n!../nls/base",
        "dojo/i18n!./nls/base",
        "dojo/i18n!./nls/HoverHelp"
        ],
        function(dDeclare,					// (dojo/_base/declare)
        		 dAspect,					// (dojo/aspect)
		         dWidget,					// (dijit/_Widget)
		         dTemplatedMixin,			// (dijit/_TemplatedMixin)
		         dWidgetsInTemplateMixin, 	// (dijit/_WidgetsInTemplateMixin)
		         dLang,						// (dojo/_base/lang)
		         dQuery,					// (dojo/query)
		         dDomClass,					// (dojo/dom-class) for (dDomClass.add/remove)
		         dDomAttr,					// (dojo/dom-attr) for (dDomAttr.set/remove)  
		         dEvent,					// (dojo/event)          
		         iString,					// (../string)
		         iUtil,						// (../util)
		         iResources,				// (../resources)
		         templateText)				// (dojo/text!./templates/HoverHelp.html)   
{
	// the default profile value
	var defaultProfile = "standard";

	// the lookup table for profile CSS class suffixes
	var profileCSSLookup = {
		standard: "ProfileStandard",
		compact: "ProfileCompact"
	};
	
	/**
	 * @name idx.widget.HoverHelp
	 * @class Provides a button-like widget for context-sensitive hover help.
	 * @augments dijit._Widget
	 * @augments dijit._TemplatedMixin
	 * @augments dijit._WidgetsInTemplateMixin
	 * @example
	   Example usage:
	  	&lt;div dojoType="dijit.form.TextBox">&lt;/div>
	  	&lt;div dojoType="idx.widget.HoverHelp" message="Hello, World!"
	    href="http://www.ibm.com">&lt;/div>
	 */
  var iHoverHelp = dDeclare("idx.widget.HoverHelp",[dWidget,dTemplatedMixin,dWidgetsInTemplateMixin],
		  /**@lends idx.widget.HoverHelp#*/	
{ 
  /**
   * This is the HTML message content to display in the popup.  If this is not 
   * specified, the widget attempts to lookup its content in the resources using 
   * the key formed by concatenating messageKeyPrefix, topicID, and 
   * messageKeySuffix.  If no content can be determined then default text is
   * displayed indicating that no help has been defined.
   * @type String
   * @default ""
   */
  message: "",

  /**
   * The URL or path to use for launching a new window with additional help on 
   * the topic.  If this is not privided then an attempt is made to lookup the
   * href in the resources using the key formed by concatenating hrefKeyPrefix, 
   * topicID, and hrefKeySuffix.  If no href can be found, then no link is shown 
   * for additional help.  If provided, a link is displayed using the
   * "moreInfoLabel".
   * @type String
   * @default 
   */
  href: "",

  /**
   * The prefix to prepend to the provided HREF.  Typically this is set through
   * the provided or installed resources, however, it can be overridden here.
   * If this value is not provided the default value will be taken from resources
   * using the "idx.widget.HoverHelp" scope and the "baseHref" key.  The default
   * value for this is empty-string.
   * @type String
   * @default ""
   */
  baseHref: "",

  /**
   * Alternatively to directly specifying the message or the href, the 
   * message ID can be specified in order to trigger lookup of the message in 
   * the provided resources object.  When looking up the message by message ID 
   * the key used for lookup is constructed by concatenating the 
   * messageKeyPrefix, the topicID, and the messageKeySuffix.  When looking up 
   * the href, the key for lookup is constructed by concatenating the
   * hrefKeyPrefix, topicID, and the hrefKeySuffix.  If no topicID is provided 
   * then no such lookups are performed.
   * @type String
   * @default ""
   */
  topicID: "",

  /**
   * This is the text label to give to the link that launches the external help 
   * system in a new window.  If this is not specified during construction, the
   * default is obtained from resources using the "idx.widget.HoverHelp" scope
   * and the "moreInfoLabel" key.  The default text will be something like 
   * "Learn more...".
   * @type String
   * @default ""
   */
  hrefLabel: "",

 /**
   * The prefix to prepend to the topicID to create the key for looking up the
   * message in the resources.  If this value is not provided the default value
   * will be taken from resources using the "idx.widget.HoverHelp" scope and
   * the "messageKeyPrefix" key.  The default value for this is "topic_".
   * @type String
   * @default ""
   */
  messageKeyPrefix: "",

  /**
   * The suffix to append to the topicID to create the key for looking up the 
   * message in the resources.  If this value is not provided the default value
   * will be taken from resources using the "idx.widget.HoverHelp" scope and
   * the "messageKeySuffix" key.  The default value for this is "_message".
   * @type String
   * @default ""
   */
  messageKeySuffix: "",

  /**
   * The prefix to prepend to the topicID to create the key for looking up the
   * href in the resources.  If this value is not provided the default value
   * will be taken from resources using the "idx.widget.HoverHelp" scope and
   * the "hrefKeyPrefix" key.  The default value for this is "topic_".
   * @type String
   * @default ""
   */
  hrefKeyPrefix: "",

  /**
   * The suffix to append to the topicID to create the key for looking up the
   * href in the resources.  If this value is not provided the default value
   * will be taken from resources using the "idx.widget.HoverHelp" scope and
   * the "hrefKeySuffix" key.  The default value for this is "_href".
   * @type String
   * @default ""
   */
  hrefKeySuffix: "",

  /**
   * The resources to use for optionally obtaining the message and href for this
   * instance.  This is also used to obtain the default resources used by this 
   * instance.  If not specified the default resources are pulled from 
   * idx.resources using the "idx.widget.HoverHelp" scope.  Any resources not 
   * overridden fallback to the default resources.
   *
   * The default resources that are used by this include:
   *   - defaultHrefLabel: The label for the href linking to additional information.
   *   - defaultTitle: Default title to use for the button.
   *   - defaultMessage: Text to display when the message has not been defined.
   *   - baseHref: The base Href to prepend to all hrefs provided.
   *
   * Typically, one would specify a resources attribute that defines messages and
   * hrefs for one or more topicIDs and the same object would be shared among 
   * many instances of this widget, with each one pulling its message and href 
   * using a different topicID.
   * @type Object
   * @default null
   */
  resources: null,
  
  /**
   * The delay (in milliseconds) before the hover help is shown.  This is ignored
   * if "clickToOpen" is set to true since hovering does not open the hover help in
   * that case. 
   */
  showDelay: 400,

  /**
   * The delay (in milliseconds) before the hover help is hidden when hovering ceases.
   * This is ignored if "clickToOpen" is set to true since you must then click to close.
   */
  hideDelay: 800,
    
  /**
   * Set this to true if you want the help message to only open when clicked
   * rather than when hovered.
   */
  clickToOpen: false,
  
  /**
   * The flag indicating if this widget is disabled.
   */
  disabled: false,

  /**
   * Indication of whether or not the "compact" icon is desired instead of the
   * "standard" icon.  Typically the compact icon is used when many form fields
   * are clustered together with HoverHelp in order to prevent the help icons
   * from overwhelming the appearance of the form.  The standard icon is used
   * when the HoverHelp icon needs to stand out on the page and typically when
   * it is one of only a few HoverHelp icons displayed on the page.
   * <p>
   * The default for all instances can be controlled via the 
   * idx.widget.HoverHelp.setDefaultProfile() function.  If not set then the
   * default is "standard". 
   * 
   * @default "standard"
   */
  profile: "",
  
	/**
 	 * Overrides of the base CSS class.
 	 * This string is used by the template, and gets inserted into
 	 * template to create the CSS class names for this widget.
 	 * @private
 	 * @constant
 	 * @type String
 	 * @default "idxHoverHelp"
 	 */
  baseClass: "idxHoverHelp",

  /**
   * Defaults for high-contrast mode (when they cannot be discerned from the theme). 
   */
  idxHCDefaults: "clickToOpen=false&showDelay=600",
  
	/**
	 * The path to the widget template for the dijit._TemplatedMixin base class.
	 * @constant
	 * @type String
	 * @private
	 * @default templateText value
	 */ 
  templateString: templateText,

	/**
	 * Constructor
	 * Handles the reading any attributes passed via markup.
	 * @param {Object} args
	 * @param {Object} node
	 */
  constructor: function(args, node) {
    this._started = false;
    this._built   = false;
  },

  /**
   * Overrides dijit._Widget.postMixInProperties() to ensure
   * that the dijit._Widget.attr() function is called for each
   * property that was set.
   * @see dijit._Widget.postMixInProperties
   */
  postMixInProperties: function() {
	// nullify some fields that were not explicitly set
    iUtil.nullify(this, this.params, 
    		["messageKeyPrefix",
    		 "messageKeySuffix",
    		 "hrefKeyPrefix",
    		 "hrefKeySuffix",
    		 "baseHref",
    		 "title"]);
    
    this.inherited(arguments);
    this._defaultResources 
      = iResources.getResources("idx/widget/HoverHelp", this.lang);
  },

  /**
   * Overridden to update contained entities.
   */
  buildRendering: function() {
    this.inherited(arguments);
    this._built = true;
    this._updateProfile();
    this._updateMessage();
    this._updateHref();
    this._updateTitle();
    this._updateHrefLabel();
  },
  
  
  /**
   * Private method overridden to set the fill message
   * @see dijit._Widget._fillContent
   * @param {String} source
   * @private
   */
  _fillContent: function(source) {
    this.inherited(arguments);
    this._fillMessage = iString.nullTrim(this.containerNode.innerHTML);
  },


  /**
   * Private worker. Sets the language
   * @param {Object} value
   * @private
   */
  _setLangAttr: function(/*Object*/ value) {
    this.inherited(arguments);
    this.lang = value;
    this._resetResources();
  },

  /**
   * Private method.  Sets the disabled flag.
   * @param {Boolean} value
   * @private
   */
  _setDisabledAttr: function(/*Boolean*/ value) {
	this.disabled = value;
	this._button.set("disabled", value);
  },
  
  /**
   * Private worker. Handles resetting the saved resources.
   * @param {Object} value
   * @private
   */
  _setResourcesAttr: function(/*Object*/ value) {
    this.resources = value;
    this._resetResources();
  },

  /**
   * Private worker. Resets resources
   * by calling update methods for each.
   * @param {Object} value
   * @private
   */
  _resetResources: function() {
    this._updateMessage();
    this._updateTitle();
    this._updateHref();
    this._updateHrefLabel();
  },

  /**
   * Private convenience method to look up a resource
   * @param {String} key in resource file
   * @returns {String} result (message)
   * @private
   */
  _resourceLookup: function(key) {
    var result = null;
    if (this.resources) result = this.resources[key];
    if (! result) result = this._defaultResources[key];
    return result;
  },

  /**
   * Called at startup to set state and update all the
   * contained resources like the message and href.
   * Also attaches the contained dialog's orient method
   * for tooltips.
   */
  startup: function() {
    this.inherited(arguments);
    var buttonOpts = iUtil.getCSSOptions(this.baseClass + "ButtonOptions", this.domNode, this._button,
    									 {placement: 'toolbar', buttonType: 'help', displayMode: 'iconOnly'});
    if (buttonOpts) {
    	for (field in buttonOpts) {
    		this._button.set(field, buttonOpts[field]);		
    	}
		this._updateTitle();
    }
    
    this._started = true;
    this._updateMessage();
    this._updateHref();
    this._updateHrefLabel();
    
    // remove/restore title when help is shown/hidden to avoid double-hover
    dAspect.after(this._button, "openDropDown", dLang.hitch(this, this._removeTitle), true);
    dAspect.after(this._button, "closeDropDown", dLang.hitch(this, this._restoreTitle), true);
   	
    // attach for the orentiation callback
    this.own(dAspect.after(this._dialog,"orient",dLang.hitch(this,this._orient), true));
    
    var self = this;
    this._docHandlers = [];
    this._attachCount = 0;
    
    dAspect.before(this._button, "_onDropDownMouseDown", function(e) {
		if(self._button.disabled || self._button.readOnly){ return [e]; }
		var docHandler = self._button._docHandler;
    	if (docHandler) {
    		self._button.disconnect(docHandler);
    		if (self._button._docHandler === docHandler) delete self._button._docHandler;
    		else delete docHandler;
    	}
    	return [e];
    });
    

    dAspect.before(this._button, "_onDropDownMouseUp", function(e) {
    	var docHandler = self._button._docHandler;
    	if (e && docHandler) {
    		self._button.disconnect(docHandler);
    		if (self._button._docHandler === docHandler) delete self._button._docHandler;
    		else delete docHandler;
    	}
    	return [e];
    });
  },

  /**
   * Internal method for handling focus events to route to the button.
   * 
   * @private
   */
  _onFocus: function() {
	 if (this._button.focus)  {
		 this._button.focus();
	 } else if (this._button.focusNode) {
		 this._button.focusNode.focus();
	 }
  },
  
  /**
   * 
   */
  _doOpen: function() {
  	  if (this._hideTimer) {
  			if (this._showTimer) {
  				clearTimeout(this._showTimer);
  				delete this._showTimer;
  			}
  			return;
  	  }
	  if (!this._button._opened) {
		  this._button._onDropDownMouseDown({preventDefault: function(){}});		  
	  }
	  if (this._showTimer) {
	  	clearTimeout(this._showTImer);
	  	delete this._showTimer;
	  }
  },
  
  /**
   * Callback to handle the hover event.
   */
  _handleMouseOver: function(e) {
  	  
	  if (this.clickToOpen) return;
	  this._removeTitle();
	  if (this._hideTimer) {
	  	clearTimeout(this._hideTimer);
	  	delete this._hideTimer;
	  }
	  if (!this._button._opened) {
 	      dEvent.stop(e);
	  	  e.preventDefault();
	  	  if (! this._showTimer) {
			  this._showTimer = setTimeout(dLang.hitch(this, function(){this._doOpen();}), this.showDelay);
		  }
	  }
  },
  
  /**
   *
   */
  _doClose: function(e) {
  		if (this._showTimer) {
  			if (this._hideTimer) {
  				clearTimeout(this._hideTimer);
  				delete this._hideTimer;
  			}
  			return;
  		}
		// avoid stealing focus on simulated "mouse up" action
	  	var prevValue = undefined;
	  	if (this._button.dropDown) {
	  		// cache the old value for "autoFocus" on the dropDown element of the button
	  		prevValue = this._button.dropDown.autoFocus;
	  	  	
	  	  	// set the value to false
	  	  	this._button.dropDown.autoFocus = false;
	  	}
	  	  
	  	// simulate the mouse up action
		this._button._onDropDownMouseUp(e);
		this._button.closeDropDown();
		
		// restore the previous "autoFocus" value on the button's dropDown
		if (this._button.dropDown) {
		  	this._button.dropDown.autoFocus = prevValue;
		}
		
		if (this._hideTimer) {
	  		delete this._hideTimer;
	  		this._hiding = false;
	 	}
		
  },
  
  
  /**
   * Calback to handle the hover-ending event. 
   */
  _handleMouseOut: function(e) {
	  if (this.clickToOpen) return;
	  this._hiding = true;
      this._restoreTitle();    	  
	  if (this._showTimer) {
		  clearTimeout(this._showTimer);
		  delete this._showTimer;
	  }
	  if (this._button._opened) {
	  	  dEvent.stop(e);
	  	  e.preventDefault();
	  	  if (! this._hideTimer) {
	  	  	var event = { pageX: e.pageX, pageY: e.pageY, target: e.target};
	  	  	this._hideTimer = setTimeout(dLang.hitch(this, this._doClose, event), this.hideDelay);
	  	  }
	  }
  },
  
  /**
   * This private method is attached to the TooltipDialog's "orient" method.
   * This allows us to apply an additional CSS class for handling
   * specifics to HoverHelp since "idxHoverHelp" is a peer with the various
   * dijit orientation CSS classes (e.g.: "dijitAbove" or "dijitBelow")
   * @param {Object} node
   * @param {Object} aroundCorner
   * @param {Object} corner
   * @private
   */
  _orient: function(node, aroundCorner, corner) {
	var c = this._currentOrientClass;
	if(c){
		dDomClass.remove(this._dialog.domNode, c);
	}
	c = "idxHoverHelpAB"+(corner.charAt(1) == 'L'?"Left":"Right")+" idxHoverHelp"+(corner.charAt(0) == 'T' ? "Below" : "Above");
	dDomClass.add(this._dialog.domNode, c);
	this._currentOrientClass = c;
  },

  /**
   * Private method that gets the prefix to use when building the message key.
   * @returns {String} msg prefix
   * @private
   */
  _getMessageKeyPrefix : function() {
    if (this.messageKeyPrefix) return this.messageKeyPrefix;
    var prefix = this._resourceLookup("messageKeyPrefix");
    return (prefix) ? prefix : "topic_";
  },


  /**
   * Private method that gets the suffix to use when building the message key.
   * @returns {String} msg suffix
   * @private
   */
  _getMessageKeySuffix : function() {
    if (this.messageKeySuffix) return this.messageKeySuffix;
    var suffix = this._resourceLookup("messageKeySuffix");
    return (suffix) ? suffix : "_message";
  },

  /**
   * Private method that gets the prefix to use when building the href key.
   * @returns {String} msg prefix
   * @private
   */
  _getHrefKeyPrefix : function() {
    if (this.hrefKeyPrefix) return this.hrefKeyPrefix;
    var prefix = this._resourceLookup("hrefKeyPrefix");
    return (prefix) ? prefix : "topic_";
  },

  /**
   * Private method that gets the suffix to use when building the href key.
   * @returns {String} msg prefix
   * @private
   */
  _getHrefKeySuffix : function() {
    if (this.hrefKeySuffix) return this.hrefKeySuffix;
    var suffix = this._resourceLookup("hrefKeySuffix");
    return (suffix) ? suffix : "_href";
  },

  /**
   * Private method that attempts to lookup a label for the
   * property name or construct one if it cannot find the lookup value.
   * @private
   * @returns {String} message
   */
  _getMessage: function() {
     // first check if the message is defined
     if (this.message) return this.message;

     var result = null;
     // check if the topic ID is defined
     if (this.topicID) {
       // attempt to lookup the message
       var result = null;
       var prefix = this._getMessageKeyPrefix();
       var suffix = this._getMessageKeySuffix();
       var key = (prefix + this.topicID + suffix);
       result = this._resourceLookup(key);
     }

     // check if we have fill content
     if ((!result) && (this._built)) {
       result = this._fillMessage;
     }
 
     // check if we don't have a label, and if not try to make one
     if (!result) result = this._resourceLookup("defaultMessage");
     
     return (result ? result : "");
  },

  /**
   * Private setter of message
   * @param {String} value
   * @private
   */
  _setMessageAttr: function(value) {
    this.message = value;
    if (this._built) this._messageNode.innerHTML = this._getMessage();
  },


  /**
   * Private setter of message - key prefix
   * @param {String} value
   * @private
   */
  _setMessageKeyPrefixAttr: function(value) {
    this.message = value;
    if (this._built) this._messageNode.innerHTML = this._getMessage();
  },

  /**
   * Private setter of message - key suffix
   * @param {String} value
   * @private
   */
  _setMessageKeySuffixAttr: function(value) {
    this.message = value;
    if (this._built) this._messageNode.innerHTML = this._getMessage();
  },

  /**
   * Private setter of topic ID
   * @param {String} value
   * @private
   */
  _setTopicIDAttr: function(value) {
    this.topicID = value;
    this._updateMessage();
    this._updateHref();
  },

  /**
   * Private setter of title
   * @param {String} value
   * @private
   */
  _setTitleAttr: function(value) {
    this.title = value;
    this._updateTitle();
  },

  /**
   * Private setter of Href
   * @param {String} value
   * @private
   */
  _setHrefAttr: function(value) {
    this.href = value;
    this._updateHref();
  },

  /**
   * Private setter of Href key prefix
   * @param {String} value
   * @private
   */
  _setHrefKeyPrefixAttr: function(value) {
    this.href = value;
    this._updateHref();
  },

  /**
   * Private setter of Href key suffix
   * @param {String} value
   * @private
   */
  _setHrefKeySuffixAttr: function(value) {
    this.href = value;
  },

  /**
   * Private setter of Href label
   * @param {String} value
   * @private
   */
  _setHrefLabelAttr: function(value) {
     this.hrefLabel = value;
     this._updateHrefLabel(); 
  },

  /**
   * Private method to update message node from message
   * @private
   */
  _updateMessage: function() {
    if (!this._built) return;
    this._messageNode.innerHTML = this._getMessage();
  },

  /**
   * Private method to update Href from Href full
   * @private
   */
  _updateHref: function() {
    if (!this._built) return;
    var href = this._getFullHref();
    if (href) {
      dDomClass.remove(this._linkNode, "idxHoverHelpLinkHidden");
      dDomClass.add(this._linkNode, "idxHoverHelpLink");
    } else {
      dDomClass.remove(this._linkNode, "idxHoverHelpLink");
      dDomClass.add(this._linkNode, "idxHoverHelpLinkHidden");
    }
    dDomAttr.set(this._anchorNode, "href", this._getFullHref());
  },

  /**
   * Removes the button title to avoid the double-hover effect when the 
   * button's help is shown.
   */
  _removeTitle: function() {
	 dDomAttr.remove(this._button.titleNode, "title");
  },
  
  /**
   * Restores the button title when the drop down closes to allow screen 
   * readers to leverage the title.
   */
  _restoreTitle: function() {
	 this._updateTitle();
  },
  
  /**
   * Private method to update title 
   * @private
   */
  _updateTitle: function() {
    if (!this._built) return;
    var titleText = this._getTitle();
    this._button.set("label", titleText);
    this._button.set("title", titleText);    
  },

  /**
   * Private method to update Href label 
   * @private
   */
  _updateHrefLabel: function() {
    if (!this._built) return;
    var label = this._getHrefLabel();
    dDomAttr.set(this._anchorNode, "innerHTML", label);
  },

  /**
   * Private method to look up a label for the property
   * name or construct one if it cannot find the lookup value.
   * @private
   * @returns {String} title
   */
  _getTitle: function() {
     if (iString.nullTrim(this.title)) return this.title;
     var result = this._resourceLookup("defaultTitle");
     return (result ? result : "");
  },

  /**
   * Private method to look up the Href full 
   * @private
   * @returns {String} Href full
   */
  _getFullHref: function() {
     var href = this._getHref();
     if (! href) return null;
     return this._getBaseHref() + href;
  },

  /**
   * Private method to look up the Href base 
   * @private
   * @returns {String} Href base
   */
  _getBaseHref: function() {
     if (this.baseHref) return this.baseHref;
     var result = this._resourceLookup("baseHref");
     return (result) ? result : "";
  },

  /**
   * Private method to look up the Href 
   * @private
   * @returns {String} Href
   */
  _getHref: function() {
     var href = iString.nullTrim(this.href);
     if (href) return href;

     // check if the topic ID is defined
     if (!this.topicID) return "";

     // attempt to lookup the message
     var result = null;
     var prefix = this._getHrefKeyPrefix();
     var suffix = this._getHrefKeySuffix();
     var key = (prefix + this.topicID + suffix);
     result = this._resourceLookup(key);
     
     return iString.nullTrim(result);
  },

  /**
   * Private method to look up the Href label 
   * @private
   * @returns {String} Href label
   */
  _getHrefLabel: function() {
    if (this.hrefLabel) return this.hrefLabel;
    var result = this._resourceLookup("defaultHrefLabel");
    return (result) ? result : "";
  }


});

	/**
	 * Sets the default profile to use for the HoverHelp instances.
	 * If set to an invalid value or not set at all then "standard" is used.
	 * Valid values include: "compact" and "standard".
	 *
	 * @param profile The name of the profile (either "standard" or "compact")
	 * @name idx.widget.HoverHelp.setDefaultProfile
	 * @function
	 */
	iHoverHelp.setDefaultProfile = function(profile) {
		if (profile == "compact") {
			defaultProfile = "compact";
		} else {
			defaultProfile = "standard";
		}
	};
	
	/**
	 * Returns the current default profile to use for HoverHelp instances.
	 * If an invalid value was previously set then "standard" is returned.
	 * 
	 * @return The current default profile.
	 * @name idx.widget.HoverHelp.getDefaultProfile
	 * @function
	 */
	iHoverHelp.getDefaultProfile = function() {
		return defaultProfile;
	};

	/**
	 * Extends HoverHelp to handle profile updates.
	 */
	dLang.extend(iHoverHelp, 
		/**@lends idx.widget.HoverHelp#*/ {
	
	  /**
   	   * Handles the setting of the profile and updating the CSS class.
   	   * @private
   	   */
  	  _setProfileAttr: function(value) {
  	  		this.profile = value;
  	  		this._updateProfile();
	  },

	  /**
   	   * Handles the setting of the profile and updating the CSS class.
   	   * @private
   	   */
  	  _updateProfile: function() {
  	  		if (! this._defaultProfileHandle) {
  	  			var callback = dLang.hitch(this, "_updateProfile");
  	  			this._defaultProfileHandle = this.own(dAspect.after(iHoverHelp, "setDefaultProfile", callback, true));
  	  		}
  	  		if (!this._built) return;
  	  		var newValue = iString.nullTrim(this.profile);
  	  		var defaultValue = iHoverHelp.getDefaultProfile();
  	  		
 		  	if ((!newValue) || (! (newValue in profileCSSLookup))) {
		  		newValue = defaultValue;
  			}
  			
  			if (this._profile == newValue) return;
  		
  			if (this._profile) {
  				var oldValue = this._profile;
  				var oldClass = this.baseClass + profileCSSLookup[oldValue ? oldValue : defaultProfile];
  				if (this.domNode) {
  					dDomClass.remove(this.domNode, oldClass);
  				}
  			}
  			
  			// set the new value
  			this._profile = newValue;
  		
  			// update the CSS class
  			var newClass = this.baseClass + profileCSSLookup[newValue];
  			if (this.domNode) {
  				dDomClass.add(this.domNode, newClass);
  			}
	  }
	});
	
	return iHoverHelp;
});

},
'idx/form/_DateTimeTextBox':function(){
/*
 * Licensed Materials - Property of IBM
 * (C) Copyright IBM Corp. 2010, 2012 All Rights Reserved
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

define([
	"dojo/_base/declare", 
	"dojo/_base/lang",
	"dojo/sniff",
	"dojo/i18n", // i18n.getLocalization
	"dojo/date", 
	"dojo/date/locale", 
	"dojo/date/stamp", 
	"dijit/_base/wai",
	"dojo/dom-attr",
	"dijit/form/RangeBoundTextBox",
	"dijit/form/ValidationTextBox", 
	"dijit/_HasDropDown",
	"./TextBox",
	"dojo/text!./templates/DropDownBox.html",
	"dojo/i18n!./nls/_DateTimeTextBox"
], function(declare, lang, has, i18n, date, locale, stamp, wai, domAttr, RangeBoundTextBox, ValidationTextBox, _HasDropDown, 
		TextBox, template) {

	new Date("X"); // workaround for #11279, new Date("") == NaN
	
	/*=====
	dojo.declare(
		"dijit.form._DateTimeTextBox.__Constraints",
		[dijit.form.RangeBoundTextBox.__Constraints, dojo.date.locale.__FormatOptions], {
		// summary:
		//		Specifies both the rules on valid/invalid values (first/last date/time allowed),
		//		and also formatting options for how the date/time is displayed.
		// example:
		//		To restrict to dates within 2004, displayed in a long format like "December 25, 2005":
		//	|		{min:'2004-01-01',max:'2004-12-31', formatLength:'long'}
	});
	=====*/

	return declare("idx.form._DateTimeTextBox", [RangeBoundTextBox, _HasDropDown], {
		// summary:
		//		Base class for validating, serializable, range-bound date or time text box.

		templateString: template,

		// hasDownArrow: [const] Boolean
		//		Set this textbox to display a down arrow button, to open the drop down list.
		hasDownArrow: false,

		// openOnClick: [const] Boolean
		//		Set to true to open drop down upon clicking anywhere on the textbox.
		openOnClick: true,

		/*=====
		// constraints: dijit.form._DateTimeTextBox.__Constraints
		//		Despite the name, this parameter specifies both constraints on the input
		//		(including starting/ending dates/times allowed) as well as
		//		formatting options like whether the date is displayed in long (ex: December 25, 2005)
		//		or short (ex: 12/25/2005) format.  See `dijit.form._DateTimeTextBox.__Constraints` for details.
		constraints: {},
		======*/

		// Override ValidationTextBox.regExpGen().... we use a reg-ex generating function rather
		// than a straight regexp to deal with locale  (plus formatting options too?)
		regExpGen: locale.regexp,

		// datePackage: String
		//		JavaScript namespace to find calendar routines.	 Uses Gregorian calendar routines
		//		at dojo.date, by default.
		datePackage: "dojo.date",

		// Override _FormWidget.compare() to work for dates/times
		compare: function(/*Date*/ val1, /*Date*/ val2){
			var isInvalid1 = this._isInvalidDate(val1);
			var isInvalid2 = this._isInvalidDate(val2);
			return isInvalid1 ? (isInvalid2 ? 0 : -1) : (isInvalid2 ? 1 : date.compare(val1, val2, this._selector));
		},

		// flag to _HasDropDown to make drop down Calendar width == <input> width
		forceWidth: true,

		format: function(/*Date*/ value, /*dojo.date.locale.__FormatOptions*/ constraints){
			// summary:
			//		Formats the value as a Date, according to specified locale (second argument)
			// tags:
			//		protected
			return value ? this.dateLocaleModule.format(value, constraints) : '';
		},

		"parse": function(/*String*/ value, /*dojo.date.locale.__FormatOptions*/ constraints){
			// summary:
			//		Parses as string as a Date, according to constraints
			// tags:
			//		protected

			return this.dateLocaleModule.parse(value, constraints) || (this._isEmpty(value) ? null : undefined);	 // Date
		},

		// Overrides ValidationTextBox.serialize() to serialize a date in canonical ISO format.
		serialize: function(/*anything*/ val, /*Object?*/ options){
			if(val.toGregorian){
				val = val.toGregorian();
			}
			return stamp.toISOString(val, options);
		},

		// dropDownDefaultValue: Date
		//		The default value to focus in the popupClass widget when the textbox value is empty.
		dropDownDefaultValue : new Date(),

		// value: Date
		//		The value of this widget as a JavaScript Date object.  Use get("value") / set("value", val) to manipulate.
		//		When passed to the parser in markup, must be specified according to `dojo.date.stamp.fromISOString`
		value: new Date(""),	// value.toString()="NaN"

		_blankValue: null,	// used by filter() when the textbox is blank

		// popupClass: [protected extension] String
		//		Name of the popup widget class used to select a date/time.
		//		Subclasses should specify this.
		popupClass: "", // default is no popup = text only


		// _selector: [protected extension] String
		//		Specifies constraints.selector passed to dojo.date functions, should be either
		//		"date" or "time".
		//		Subclass must specify this.
		_selector: "",

		constructor: function(/*Object*/ args){
			var dateClass = args.datePackage ? args.datePackage + ".Date" : "Date";
			this.dateClassObj = lang.getObject(dateClass, false);
			this.value = new this.dateClassObj("");

			this.datePackage = args.datePackage || this.datePackage;
			this.dateLocaleModule = lang.getObject(this.datePackage + ".locale", false);
			this.regExpGen = this.dateLocaleModule.regexp;
			this._invalidDate = idx.form._DateTimeTextBox.prototype.value.toString();
		},
		
		postMixInProperties: function(){
			this._nlsResources = i18n.getLocalization("idx.form", "_DateTimeTextBox", this.lang);
			this.inherited(arguments);
		},

		buildRendering: function(){
			this.inherited(arguments);

			if(!this.hasDownArrow){
				this._buttonNode.style.display = "none";
			}

			// If openOnClick is true, we basically just want to treat the whole widget as the
			// button.  We need to do that also if the actual drop down button will be hidden,
			// so that there's a mouse method for opening the drop down.
			if(this.openOnClick || !this.hasDownArrow){
				this._buttonNode = this.oneuiBaseNode;
				this.oneuiBaseClass += " dijitComboBoxOpenOnClick";
			}
			
			if(has("mobile") && this.textbox){
				domAttr.set(this.textbox, "readOnly", true);
			}
		},

		_setConstraintsAttr: function(/*Object*/ constraints){
			constraints.selector = this._selector;
			constraints.fullYear = true; // see #5465 - always format with 4-digit years
			var fromISO = stamp.fromISOString;
			if(typeof constraints.min == "string"){ constraints.min = fromISO(constraints.min); }
 			if(typeof constraints.max == "string"){ constraints.max = fromISO(constraints.max); }
			this.inherited(arguments, [constraints]);
		},

		_isInvalidDate: function(/*Date*/ value){
			// summary:
			//		Runs various tests on the value, checking for invalid conditions
			// tags:
			//		private
			return !value || isNaN(value) || typeof value != "object" || value.toString() == this._invalidDate;
		},
		_isEmpty: function(value){
			return (this.trim ? /^\s*$/ : /^$/).test(value) || (value&&value.toString() == this._invalidDate);
		},

		_setValueAttr: function(/*Date|String*/ value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
			// summary:
			//		Sets the date on this textbox. Note: value can be a JavaScript Date literal or a string to be parsed.
			if(value !== undefined){
				if(typeof value == "string"){
					value = stamp.fromISOString(value);
				}
				if(this._isInvalidDate(value)){
					value = null;
				}
				if(value instanceof Date && !(this.dateClassObj === Date)){
					value = new this.dateClassObj(value);
				}
			}
			this.inherited(arguments, [value, priorityChange, formattedValue]);
			//wai.setWaiState(this.focusNode, "valuenow", value);
			//TextBox.prototype._setValueAttr.apply(this, arguments);
			if(this.dropDown){
				this.dropDown.set('value', value, false);
			}
		},

		_set: function(attr, value){
			// Avoid spurious watch() notifications when value is changed to new Date object w/the same value
			if(attr == "value" && this.value instanceof Date && this.compare(value, this.value) == 0){
				return;
			}
			this.inherited(arguments);
		},

		_setDropDownDefaultValueAttr: function(/*Date*/ val){
			this.dropDownDefaultvalue = this._isInvalidDate(val) ? new this.dateClassObj() : val;
		},

		openDropDown: function(/*Function*/ callback){
			// rebuild drop down every time, so that constraints get copied (#6002)
			if(this.dropDown){
				this.dropDown.destroy();
			}
			var PopupProto = lang.isString(this.popupClass) ? lang.getObject(this.popupClass, false) : this.popupClass,
				textBox = this,
				value = this.get("value");
			this.dropDown = new PopupProto({
				onChange: function(value){
					// this will cause InlineEditBox and other handlers to do stuff so make sure it's last
					textBox.set('value', value, true);
				},
				id: this.id + "_popup",
				dir: textBox.dir,
				lang: textBox.lang,
				value: value,
				textDir: textBox.textDir,
				currentFocus: !this._isInvalidDate(value) ? value : this.dropDownDefaultValue,
				constraints: textBox.constraints,
				filterString: textBox.filterString, // for TimeTextBox, to filter times shown
				datePackage: textBox.params.datePackage,
				isDisabledDate: function(/*Date*/ date){
					// summary:
					//	disables dates outside of the min/max of the _DateTimeTextBox
					return !textBox.rangeCheck(date, textBox.constraints);
				}
			});

			this.inherited(arguments);
		},

		_getDisplayedValueAttr: function(){
			return this.textbox.value;
		},

		_setDisplayedValueAttr: function(/*String*/ value, /*Boolean?*/ priorityChange){
			this._setValueAttr(this.parse(value, this.constraints), priorityChange, value);
		},
		_onDropDownMouseUp: function(){
			this.inherited(arguments);
			if((!this.dropDown.focus) || (!this.dropDown.autoFocus)){
				setTimeout(lang.hitch(this, "focus"), 0);
			}
		}
	});
});

},
'idx/form/nls/_DateTimeTextBox':function(){
define({root:
//begin v1.x content
({
	idxTimeIconTitle: "Click to open time picker",
	idxDateIconTitle: "Click to open date picker"
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
"uk": true, "vi": true
});

},
'url:idx/form/templates/TextBox.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span\n\t\t><label dojoAttachPoint=\"compLabelNode\"></label\n\t></div\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\n\t\t><div dojoAttachPoint='stateNode,oneuiBaseNode' class=\"dijit dijitReset dijitInline dijitLeft\" role=\"presentation\"\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t\t\t><input class=\"dijitReset dijitInputInner\" dojoAttachPoint='textbox,focusNode' autocomplete=\"off\" ${!nameAttrSetting} type='${type}'\n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t><div class='dijitValidationIcon'\n\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t/></div\n\t></div\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\n\t></div\n></div>\n",
'url:idx/widget/templates/_MenuColumn.html':"<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\n\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\n\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes\">\n<!-- this must be kept in synch with column 0 included in Menu.html -->\n\t\t</tbody>\n\t</table>\n</td>",
'url:idx/form/templates/ComboBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\" \n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"\n\t\t><span class=\"idxRequiredIcon\">*&nbsp</span\n\t\t><label dojoAttachPoint=\"compLabelNode\"\n\t\t></label\n\t></div\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\n\t\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" dojoAttachPoint=\"stateNode,oneuiBaseNode,_aroundNode,_popupStateNode\" aria-labelledby=\"${id}_label\"\n\t\t\t><div class='dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer' dojoAttachPoint=\"_buttonNode\" role=\"presentation\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitArrowButtonInner\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\n\t\t\t${_buttonInputDisabled}\n\t\t\t/></div\n\t\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputContainer\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\n\t\t\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting}  type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\" \n\t\t\t/></div\n\t\t></div\n\t\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"\n\t\t></div\n\t\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t\t><div class=\"dijitValidationIcon\"\n\t\t\t><input class=\"dijitReset dijitInputField  dijitValidationInner\" value=\"&#935;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t\t></div></div\n\t\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\n\t></div\n></div>",
'url:idx/form/templates/Select.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\" dojoAttachPoint=\"_popupStateNode\"\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label dojoAttachPoint=\"compLabelNode\" id=\"${id}_arialabel\"></label></div\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\n\t\t><table class=\"dijit dijitReset dijitInline dijitLeft\" dojoAttachPoint=\"_aroundNode,_buttonNode,tableNode,focusNode,stateNode,oneuiBaseNode\" cellspacing='0' cellpadding='0' aria-labelledby=\"${id}_arialabel\" role=\"listbox\" aria-haspopup=\"true\"\n\t\t\t><tbody role=\"presentation\"\n\t\t\t\t><tr role=\"presentation\"\n\t\t\t\t\t><td class=\"dijitReset dijitStretch dijitButtonContents dijitButtonNode\" role=\"presentation\"\n\t\t\t\t\t\t><span class=\"dijitReset dijitInline dijitButtonText\" dojoAttachPoint=\"containerNode\"></span\n\t\t\t\t\t\t><input type=\"hidden\" ${!nameAttrSetting}  dojoAttachPoint=\"valueNode\" value=\"${value}\" aria-hidden=\"true\"/\n\t\t\t\t\t></td\n\t\t\t\t\t><td class=\"dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton\" dojoAttachPoint=\"titleNode\" role=\"presentation\"\n\t\t\t\t\t\t><div class=\"dijitReset dijitArrowButtonInner\" role=\"presentation\"></div\n\t\t\t\t\t\t><div class=\"dijitReset dijitArrowButtonChar\" role=\"presentation\">&#9660;</div\n\t\t\t\t\t></td\n\t\t\t\t></tr\n\t\t\t></tbody\n\t\t></table\n\t></div\n\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t><div class=\"dijitValidationIcon\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t\t></div\n\t></div\n></div>",
'url:idx/widget/templates/HoverHelpTooltip.html':"<div class=\"idxOneuiHoverHelpTooltip idxOneuiHoverHelpTooltipLeft\" role=\"alert\"\n\t><div\n\t\t><span data-dojo-attach-point=\"closeButtonNode\" class=\"idxOneuiHoverHelpTooltipCloseIcon\" \n\t\t\tdata-dojo-attach-event=\"ondijitclick: hideOnClickClose\" role=\"button\" aria-label=\"${buttonClose}\"\n\t\t\t><span class=\"idxHoverHelpCloseText\">x</span\n\t\t></span\n\t></div\n\t><div data-dojo-attach-point=\"outerContainerNode\" class=\"idxOneuiHoverHelpTooltipContainer idxOneuiHoverHelpTooltipContents\"\n\t\t><div data-dojo-attach-point=\"containerNode\" role=\"presentation\"></div\n\t\t><a target=\"_blank\" href=\"#updateme\" role=\"link\" class=\"idxOneuiHoverHelpTooltipLearnLink\" data-dojo-attach-point=\"learnMoreNode\"><span>${learnMoreLabel}</span></a\n\t></div\n\t><div class=\"idxOneuiHoverHelpTooltipConnector\" data-dojo-attach-point=\"connectorNode\"></div\n></div>",
'url:idx/form/templates/DropDownBox.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label dojoAttachPoint=\"compLabelNode\"></label></div\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\n\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"combobox\" aria-owns=\"${id}_popup\" dojoAttachPoint='_aroundNode,stateNode,oneuiBaseNode'\n\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\"\n\t\t><input class='dijitReset dijitInputInner' ${!nameAttrSetting} type=\"text\" autocomplete=\"off\" dojoAttachPoint=\"textbox,focusNode\" role=\"textbox\" aria-haspopup=\"true\"/\n\t></div\n\t></div\n\t><div class='dijitReset dijitInline oneuiIcon'\n\t\tdojoAttachPoint=\"_buttonNode, _popupStateNode\" role=\"presentation\"\n\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\" ${_buttonInputDisabled}/\n\t></div\n\t><div class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t><div class=\"dijitValidationIcon\"><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t></div></div\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\n\t></div\n></div>",
'url:idx/widget/templates/Menu.html':"<table class=\"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable\" role=\"menu\" tabIndex=\"${tabIndex}\" data-dojo-attach-event=\"onkeypress:_onKeyPress\" cellspacing=\"0\">\n\t<tbody class=\"dijitReset\">\n\t\t<tr data-dojo-attach-point=\"_columnContainerNode\">\n\t\t\t<td class=\"dijitReset oneuiMenuColumn\" data-dojo-attach-point=\"columnNodes\">\n\t\t\t\t<table class=\"dijitReset\" cellspacing=\"0\" width=\"100%\" role=\"presentation\">\n\t\t\t\t\t<tbody class=\"dijitReset\" data-dojo-attach-point=\"_containerNodes,containerNode\">\n<!-- this is column 0, which also starts out as the container node so menu items are initially loaded here.\n     containerNode changes to point to _columnContainerNode once the widget has initialised, so the whole set of columns is the container.\n\t this must be kept in synch with _MenuColumn.html -->\n\t\t\t\t\t</tbody>\n\t\t\t\t</table>\n\t\t\t</td>\n\t\t</tr>\n\t</tbody>\n</table>\n",
'url:idx/form/templates/CheckBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\"\n\t><div class=\"dijit dijitReset dijitInline\" role=\"presentation\" dojoAttachPoint=\"stateNode,oneuiBaseNode\"\n\t\t><input\n\t\t\t${!nameAttrSetting} type=\"${type}\" ${checkedAttrSetting}\n\t\t\tclass=\"dijitReset dijitCheckBoxInput\"\n\t\t\tdojoAttachPoint=\"focusNode\"\n\t\t\trole=\"checkbox\"\n\t\t\taria-checked=\"false\"\n\t\t\tdojoAttachEvent=\"onclick:_onClick\"\n\t/></div\n\t><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"\n\t\t><label dojoAttachPoint=\"compLabelNode\"></label\n\t></div\n\t><div class='dijitReset dijitInline dijitValidationContainer' dojoAttachPoint=\"iconNode\"\n\t\t><div class=\"dijitValidationIcon\"><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t></div></div\n></div>",
'url:idx/form/templates/TriStateCheckBox.html':"<div id=\"widget_${id}\" class=\"dijitReset dijitInline idxComposite\"\n\t><div class=\"dijit dijitReset dijitInline\" role=\"presentation\" dojoAttachPoint=\"stateNode,oneuiBaseNode\"\n\t\t><div class=\"idxOneuiTriStateCheckBoxInner\" dojoAttachPoint=\"stateLabelNode\"></div\n\t\t><input ${!nameAttrSetting} type=\"checkbox\" dojoAttachPoint=\"focusNode\" role=\"checkbox\"\n\t\tclass=\"dijitReset idxOneuiTriStateCheckBoxInput\" dojoAttachEvent=\"onclick:_onClick\"\n\t/></div><div class=\"idxLabel dijitInline dijitHidden\" dojoAttachPoint=\"labelWrap\"\n\t><label dojoAttachPoint=\"compLabelNode\"></label\n\t></div\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t><div class=\"dijitValidationIcon\"><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t></div></div\n></div>",
'url:idx/form/templates/Spinner.html':"<div id=\"widget_${id}\" class=\"dijitInline dijitReset dijitLeft idxComposite\"\n\t><div class=\"idxLabel dijitInline dijitHidden\"  dojoAttachPoint=\"labelWrap\"><span class=\"idxRequiredIcon\">*&nbsp</span><label dojoAttachPoint=\"compLabelNode\"></label></div\n\t><div class=\"dijitInline\" dojoAttachPoint=\"fieldWrap\"\n\t><div class=\"dijit dijitInline dijitReset dijitInlineTable dijitLeft\" role=\"presentation\" dojoAttachPoint='stateNode,oneuiBaseNode'\n\t\t><div class=\"dijitReset dijitButtonNode dijitSpinnerButtonContainer\"\n\t\t\t><input class=\"dijitReset dijitInputField dijitSpinnerButtonInner\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitUpArrowButton\" dojoAttachPoint=\"upArrowNode\"\n\t\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9650;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"\t${_buttonInputDisabled} /\n\t\t\t\t></div\n\t\t\t></div\n\t\t\t><div class=\"dijitReset dijitLeft dijitButtonNode dijitArrowButton dijitDownArrowButton\" dojoAttachPoint=\"downArrowNode\" \n\t\t\t\t><div class=\"dijitArrowButtonInner\"\n\t\t\t\t\t><input class=\"dijitReset dijitInputField\" value=\"&#9660;\" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\" ${_buttonInputDisabled}/\n\t\t\t\t></div\n\t\t\t></div\n\t\t></div\n\t\t><div class=\"dijitReset dijitInputField dijitInputContainer\" dojoAttachPoint=\"inputNode\" dojoAttachEvent=\"onmouseenter: _onInputContainerEnter, onmouseleave: _onInputContainerLeave\"\n\t\t\t><input class='dijitReset dijitInputInner' dojoAttachPoint=\"textbox,focusNode\" type=\"${type}\" dojoAttachEvent=\"onkeypress:_onKeyPress\" role=\"spinbutton\" autocomplete=\"off\" ${!nameAttrSetting}\t/\n\t\t></div\n\t></div\n\t><div id=\"${id}_unit\" class=\"idxUnit dijitInline dijitHidden\" dojoAttachPoint=\"compUnitNode\"></div\n\t><div class='dijitReset dijitValidationContainer dijitInline' dojoAttachPoint=\"iconNode\"\n\t\t><div class='dijitValidationIcon'><input class=\"dijitReset dijitInputField dijitValidationInner\" value=\"&#935; \" type=\"text\" tabIndex=\"-1\" readonly=\"readonly\" role=\"presentation\"/\n\t></div></div\n\t><div class=\"dijitHidden idxHintOutside\" dojoAttachPoint=\"compHintNode\"></div\n\t></div\n></div>\n",
'url:idx/widget/templates/_CheckBoxTreeNode.html':"<div class=\"dijitTreeNode\" role=\"treeitem\"\n\t><div data-dojo-attach-point=\"rowNode,focusNode\" class=\"dijitTreeRow\" tabindex=\"-1\" role=\"checkbox\"\n\t\t><div data-dojo-attach-point=\"indentNode\" class=\"dijitInline\"></div\n\t\t><img src=\"${_blankGif}\" alt=\"\" data-dojo-attach-point=\"expandoNode\" class=\"dijitTreeExpando\" role=\"presentation\"\n\t\t/><span data-dojo-attach-point=\"expandoNodeText\" class=\"dijitExpandoText\" aria-hidden=\"true\" role=\"presentation\"\n\t\t></span\n\t\t><span data-dojo-attach-point=\"contentNode\"\n\t\t\tclass=\"dijitTreeContent\" role=\"presentation\"\n\t\t\t><span states=\"false,true\" class=\"dijitInline stateNode\" data-dojo-attach-point=\"stateNode, checkboxNode\"\n\t\t\t\t><div class=\"idxOneuiTriStateCheckBoxInner\" dojoAttachPoint=\"stateLabelNode\" aria-hidden=\"true\"></div\n\t\t\t></span\n\t\t\t><span data-dojo-attach-point=\"iconNode\" class=\"dijitInline dijitIcon dijitTreeIcon\" role=\"presentation\" aria-hidden=\"true\"></span\n\t\t\t><span data-dojo-attach-point=\"labelNode\" class=\"dijitTreeLabel\" tabindex=\"-1\" role=\"presentation\"></span>\n\t\t</span\n\t></div>\n\t<div data-dojo-attach-point=\"containerNode\" class=\"dijitTreeNodeContainer\" role=\"presentation\" style=\"display: none;\"></div>\n</div>",
'url:idx/widget/templates/ModalDialog.html':"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\" aria-describedby=\"${id}_desc\" style=\"width:416px;\"\n\t><div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\"\n\t\t><span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span\n\t\t><span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\"\n\t\t\t><span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span\n\t\t></span\n\t></div\n\t><div class=\"messageSummary\"\n\t\t><span class=\"imgSpan\">\n\t\t\t<img dojoAttachPoint=\"icon\" class=\"message${type}Icon\" src=\"${_blankGif}\" alt=\"${type}\" />\n\t\t\t<span dojoAttachPoint=\"iconText\" class=\"messageIconText\"></span>\n\t\t</span\n\t\t><span id=\"${id}_desc\" role=\"alert\" dojoAttachPoint=\"description\" class=\"messageDescription\" tabindex=\"0\">${text}</span\n\t></div\n\t><div dojoAttachPoint=\"messageWrapper\" class=\"messageWrapper compact\"\n\t\t><div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\" tabindex=\"0\"\n\t\t></div\n\t></div\n\t><div class=\"messageDialogFooter\" dojoAttachPoint=\"actionBar\"\n\t\t><span class=\"messageRef\"\n\t\t\t><a dojoAttachPoint=\"reference\" dojoAttachEvent=\"ondijitclick: onReference\">${messageId}</a\n\t\t></span\n\t\t><span class=\"messageTimeStamp\" dojoAttachPoint=\"timestamp\"></span\n\t\t><span class=\"messageAction\"\n\t\t\t><input dojoAttachPoint=\"confirmAction\"/\n\t\t\t><input dojoAttachPoint=\"closeAction\"/\n\t\t></span\n\t></div\n></div>",
'url:idx/widget/templates/ConfirmationDialog.html':"<div class=\"dijitDialog\" role=\"alertdialog\" aria-labelledby=\"${id}_title\" aria-describedby=\"${id}_desc\" style=\"width:416px;\">\n\t<div dojoAttachPoint=\"titleBar\" class=\"dijitDialogTitleBar\">\n\t<span dojoAttachPoint=\"titleNode\" class=\"dijitDialogTitle\" id=\"${id}_title\"></span>\n\t<span dojoAttachPoint=\"closeButtonNode\" class=\"dijitDialogCloseIcon\" dojoAttachEvent=\"ondijitclick: onCancel\" title=\"${buttonCancel}\" role=\"button\" tabIndex=\"-1\">\n\t\t<span dojoAttachPoint=\"closeText\" class=\"closeText\" title=\"${buttonCancel}\">x</span>\n\t</span>\n\t</div>\n\t<div class=\"messageSummary\">\n\t\t<img dojoAttachPoint=\"icon\" class=\"message${type}Icon\" src=\"${_blankGif}\" alt=\"${type}\" />\n\t\t<span dojoAttachPoint=\"iconText\" class=\"messageIconText\"></span>\n\t\t<span id=\"${id}_desc\" role=\"alert\" dojoAttachPoint=\"description\" class=\"messageDescription\" tabindex=\"0\">${text}</span>\n\t</div>\t\n\t<div dojoAttachPoint=\"messageWrapper\" class=\"messageWrapper\">\n\t\t<div dojoAttachPoint=\"containerNode\" class=\"dijitDialogPaneContent\" tabindex=\"0\">\n\t\t</div>\n\t</div>\n\t<div class=\"messageDialogFooter\" dojoAttachPoint=\"actionBar\">\n\t\t<span class=\"messageCheckBox\" dojoAttachPoint=\"checkboxNode\" style=\"display: none\">\n\t\t\t<div dojoAttachPoint=\"checkbox\"></div>\n\t\t</span>\n\t\t<span class=\"messageAction\">\n\t\t\t<input dojoAttachPoint=\"confirmAction\"/>\n\t\t\t<input dojoAttachPoint=\"closeAction\"/>\n\t\t</span>\n\t</div>\n</div>",
'url:idx/widget/templates/HoverHelp.html':"<div class=\"${baseClass}\" data-dojo-attach-event=\"onfocus:_onFocus\">\n<div data-dojo-type=\"dijit/form/DropDownButton\" data-dojo-attach-point=\"_button\" data-dojo-attach-event=\"onMouseEnter:_handleMouseOver,onMouseLeave:_handleMouseOut\"\n><div tabindex=\"0\" data-dojo-type=\"idx/widget/TooltipDialog\" data-dojo-props=\"idxExtraClasses:'${baseClass}_TooltipDialog'\" data-dojo-attach-point=\"_dialog\" data-dojo-attach-event=\"onMouseEnter:_handleMouseOver,onMouseLeave:_handleMouseOut\"\n><div tabindex=\"0\" id=\"${id}_wrapper\" aria-labelledby=\"${id}_message\" class=\"${baseClass}InfoWrapper\" data-dojo-attach-point=\"_wrapper\"\n><div id=\"${id}_message\" class=\"${baseClass}Message\" data-dojo-attach-point=\"_messageNode,containerNode\"\n></div><div class=\"${baseClass}Link\" data-dojo-attach-point=\"_linkNode\"\n><a tabindex=\"0\" class=\"${baseClass}Link\" target=\"_blank\" data-dojo-attach-point=\"_anchorNode\"\n></a></div></div></div></div></div>\n",
'url:idx/widget/templates/SingleMessage.html':"<div class=\"dijit dijitReset\" \n\t><div class=\"idxMessageHead\" \n\t\t><span id=\"${id}_title\" dojoAttachPoint=\"clipNode\" class=\"a11yDescription\"  ></span\n\t\t><div class=\"dijitInline idxMessageIcon\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"iconNode\" dojoAttachEvent=\"onmouseenter: onIconEnter, onmouseleave: onIconLeave\" \n\t\t\t><span class=\"a11yDescription\"  >${type}</span\n\t\t\t><span id=\"${id}_type\" dojoAttachPoint=\"typeNode\" class=\"idxMessageIconText idxMessageContent idxMessageAltText\"></span\n\t\t></div\n\t\t><span class=\"dijitInline idxMessageContent\" dojoAttachPoint=\"focusNode\" dojoAttachEvent=\"ondijitclick: _onClick\" tabIndex=\"${tabIndex}\" role=\"button\" aria-describedby=\"${id}_messageTitle\"\n\t\t\t><span class=\"dijitInline idxMessageTitle\" dojoAttachPoint=\"titleNode\" id=\"${id}_messageTitle\"></span\n\t\t\t><span class=\"dijitInline idxMessageId messagesContrast\" dojoAttachPoint=\"idNode\"></span\n\t\t></span\n\t\t><span class=\"idxMessageFakeContent\" dojoAttachPoint=\"fakeFocusNode\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"ondijitclick: _onClick\" role=\"button\" aria-describedby=\"${id}_messageFakeTitle\"\n\t\t\t><span class=\"idxMessageTitle\" dojoAttachPoint=\"fakeTitleNode\" id=\"${id}_messageFakeTitle\"></span\n\t\t\t><span class=\"idxMessageId messagesContrast\" dojoAttachPoint=\"fakeIdNode\"></span\n\t\t></span\n\t\t><div class=\"dijitInline idxMessageRightAligned\" dojoAttachPoint=\"infoNode\"\n\t\t\t><div class=\"dijitInline idxMessageTimestamp messagesContrast\" dojoAttachPoint=\"timestampNode\" >03 March 2011  12:00 PM</div\n\t\t\t><div class=\"dijitInline idxMessageSeparator\" dojoAttachPoint=\"separatorNode\" aria-hidden=\"true\">|</div\n\t\t\t><a class=\"dijitInline idxMessageAction\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"actionNode\" role=\"button\" dojoAttachEvent=\"ondijitclick: onAction\" href=\"javascript: void(0);\"></a\n\t\t\t><div class=\"dijitInline idxMessageCloseIcon\" role=\"button\" tabIndex=\"${tabIndex}\" dojoAttachEvent=\"ondijitclick: _onClose\" dojoAttachPoint=\"closeNode\"><span class=\"idxMessageContent idxMessageAltText\">X</span></div\n\t\t></div\n\t></div\n\t><div class=\"idxMessageSplitter\" src=\"${_blankGif}\"></div\n><div class=\"idxMessageBody\" dojoAttachPoint=\"bodyNode\" role=\"document\" aria-labelledby=\"${id}_detailedMessage\"\n\t><span id=\"${id}_detailedMessage\" class=\"idxMessageDetail\" dojoAttachPoint=\"descriptionNode\" tabIndex=\"${tabIndex}\"></span\n\t><a class=\"idxMessageViewDetails\" tabIndex=\"${tabIndex}\" dojoAttachPoint=\"viewDetailsNode\" href=\"javascript: void(0);\" dojoAttachEvent=\"ondijitclick: onMoreDetails\"></a\n></div\n><div class=\"idxMessageRefresh\"\n\t><span tabIndex=\"${tabIndex}\" dojoAttachPoint=\"refreshNode\" dojoAttachEvent=\"ondijitclick: onRefresh\" role=\"button\"></span\n></div></div>\n",
'url:idx/widget/templates/MenuDialog.html':"<div role=\"presentation\">\n\t<div class=\"dijitTooltipContainer\" role=\"presentation\">\n\t\t<div class =\"dijitTooltipContents dijitTooltipFocusNode\" data-dojo-attach-point=\"containerNode\" role=\"presentation\" tabIndex=\"-1\"></div>\n\t</div>\n\t<div class=\"dijitTooltipConnector idxConnector\" role=\"presentation\" data-dojo-attach-point=\"connectorNode\"\n\t\t><span role=\"presentation\" class=\"idxConnectorBelow\">▲</span\n\t\t><span role=\"presentation\" class=\"idxConnectorAbove\">▼</span\n\t\t><span role=\"presentation\" class=\"idxConnectorLeft\">▶</span\n\t\t><span role=\"presentation\" class=\"idxConnectorRight\">◀</span\n\t></div>\n</div>\n",
'*now':function(r){r(['dojo/i18n!*preload*idx/nls/main*["de","es","fr","it","ja","ko","pl","pt","ru","tr","zh-cn","zh-tw"]']);}
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
	
	var majorVersion = dKernel.version.major;
	var minorVersion = dKernel.version.minor;
	
	var applyExtarClass = function(){
		// apply dojo version class, "idx_dojo_1.x"
		var bodyNode = dWindow.body();
		var versionClass = "idx_dojo_" + dKernel.version.major + "_" + dKernel.version.minor;
		dDomClass.add(bodyNode, versionClass);	
		
		// apply bidi class for hebrew
		if(dojo.locale == "he"){
			dDomClass.add(bodyNode, "idx_i18n_il");
		}
	}
	
	
	if ((majorVersion < 2) && (minorVersion < 7)) {
		// for dojo 1.6 we need to use "addOnLoad" to ensure the body exists first
		dojo.addOnLoad(applyExtarClass);
	} else {
		// for dojo 1.7 or later we rely on the "dojo/domReady!" dependency
		dRequire(["dojo/domReady!"],applyExtarClass);
	}
	
	return iMain;
});