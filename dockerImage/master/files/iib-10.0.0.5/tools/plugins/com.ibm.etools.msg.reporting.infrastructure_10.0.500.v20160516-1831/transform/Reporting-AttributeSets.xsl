<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format">
	<!-- ********************** Definition of XSL attribute sets ******** -->
	<!-- ********************** Cover Styles  ********************************* -->
	<xsl:attribute-set name="Cover_Default">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Cover_Title1">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<!--xsl:attribute name="font-size"><xsl:value-of select="$pageheight"/>*0.035353535</xsl:attribute-->
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.037610144</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Cover_Title2">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.017551401</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Cover_Label">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<!--xsl:attribute name="font-size">from-nearest-specified-value(font-size) * 2</xsl:attribute-->
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.017551401</xsl:attribute>
		<xsl:attribute name="color">rgb(112,112,112)</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Cover_Text">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.017551401</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** Document Header ************************* -->
	<xsl:variable name="LineStyle">solid</xsl:variable>				
	<xsl:variable name="LineColor">rgb(112,112,112)</xsl:variable>
	<xsl:variable name="LineWeight">1pt</xsl:variable>
	<xsl:attribute-set name="Header_Chapter">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
		<xsl:attribute name="hyphenate">false</xsl:attribute>
		<xsl:attribute name="text-align">left</xsl:attribute>		
		<xsl:attribute name="border-bottom-style"><xsl:value-of select="$LineStyle"/></xsl:attribute>				
		<xsl:attribute name="border-bottom-color"><xsl:value-of select="$LineColor"/></xsl:attribute>						
		<xsl:attribute name="border-bottom-width"><xsl:value-of select="$LineWeight"/></xsl:attribute>				
	</xsl:attribute-set>
	<xsl:attribute-set name="Header_Label">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color">rgb(112,112,112)</xsl:attribute>
		<xsl:attribute name="hyphenate">false</xsl:attribute>
		<xsl:attribute name="text-align">right</xsl:attribute>		
		<xsl:attribute name="border-bottom-style"><xsl:value-of select="$LineStyle"/></xsl:attribute>				
		<xsl:attribute name="border-bottom-color"><xsl:value-of select="$LineColor"/></xsl:attribute>						
		<xsl:attribute name="border-bottom-width"><xsl:value-of select="$LineWeight"/></xsl:attribute>				
	</xsl:attribute-set>	
	<xsl:attribute-set name="Header_Text">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
		<xsl:attribute name="hyphenate">false</xsl:attribute>
		<xsl:attribute name="text-align">right</xsl:attribute>		
		<xsl:attribute name="border-bottom-style"><xsl:value-of select="$LineStyle"/></xsl:attribute>				
		<xsl:attribute name="border-bottom-color"><xsl:value-of select="$LineColor"/></xsl:attribute>						
		<xsl:attribute name="border-bottom-width"><xsl:value-of select="$LineWeight"/></xsl:attribute>				
	</xsl:attribute-set>		
	<!-- ********************** Document Footer ************************* -->	
	<xsl:attribute-set name="Footer_Text">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color">rgb(112,112,112)</xsl:attribute>
		<xsl:attribute name="text-align">center</xsl:attribute>		
	</xsl:attribute-set>	
	<!-- ********************** Toc Styles  ********************************* -->
	<xsl:attribute-set name="TOC_Default">
		<xsl:attribute name="font-family"><xsl:value-of select="$TableOfContentsChapterFont"/></xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.011283043</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<!-- for TOC title the ChapterTopLevelText settings are used
		xsl:attribute-set name="TOC_Title">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.017551401</xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>
	</xsl:attribute-set-->
	<xsl:attribute-set name="TOC_Text">
		<xsl:attribute name="font-family"><xsl:value-of select="$TableOfContentsChapterFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$TableOfContentsChapterFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$TableOfContentsChapterFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$TableOfContentsChapterFontSize"/></xsl:attribute>		
		<xsl:attribute name="color"><xsl:value-of select="$TableOfContentsChapterFontColor"/></xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** CrossReference Styles  ********************************* -->
	<xsl:attribute-set name="CrossRef_Default">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.013790386</xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="CrossRef_SubTitle">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>		
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="CrossRef_Text">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>				
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="CrossRef_TableText">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>		
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** Index Styles  ********************************* -->
	<!--
		<xsl:attribute-set name="Index_Default">
		<xsl:attribute name="font-family">Helvetica</xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$pageheightinput"/> *0.01</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Index_Title">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Index_Text">
		<xsl:attribute name="font-family"><xsl:value-of select="$IndexChapterFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$IndexChapterFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$IndexChapterFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$IndexChapterFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$IndexChapterFontColor"/></xsl:attribute>
	</xsl:attribute-set>
-->
	<!-- ********************** Appendix Styles  *********************************
	<xsl:attribute-set name="Appendix_Default">
		<xsl:attribute name="font-family">Helvetica</xsl:attribute>
		<xsl:attribute name="font-weight">normal</xsl:attribute>
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$pageheightinput"/> *0.013</xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Appendix_Title">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color">black</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="Appendix_Title2">
		<xsl:attribute name="font-style">normal</xsl:attribute>
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-size">from-parent(font-size) * 1.5</xsl:attribute>
	</xsl:attribute-set>
 -->
</xsl:stylesheet>
