<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<!-- ********************************************************************************************************************** -->
<!-- ********************************************************************************************************************** --> 
<!--                                                      !!!!!!! WARNING !!!!!!!!!                                                                  -->
<!--   This common reporting infrastructure include file exists in each report untit plugin and                       -->
<!--                                                                                                                                                     -->
<!--                                                MUST BE KEPT in SYNC                                                                -->       
<!--                                                MUST BE KEPT in SYNC                                                                -->       
<!--    If any change is made within this file, the same change must be applied to any report unit plugin       -->
<!-- ********************************************************************************************************************** -->
<!-- ********************************************************************************************************************** -->  
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
	<xsl:include href="Common_OverviewGraphic.xsl"/>
	<!-- ********************************************************************************************************************** -->
	<!-- * Global XSLT parameters used by all IBM provided reporting infratructure XSLT style sheets                -->
	<!-- ********************************************************************************************************************** -->
	<!--*************************************************************************-->
	<!--Input parameters with default values if no specified by caller  -->
	<!--*************************************************************************-->
	<xsl:param name="language" select="'en_US'"/>
	<xsl:variable name="country" select="substring-after($language,'_')"/>
	<xsl:variable name="language_code" select="substring-before($language,'_')"/>
	<xsl:param name="borderColor" select="'rgb(165,165,165)'"/>
	<xsl:param name="tableHeaderBackgroundColor" select="'rgb(236,233,216)'"/>
	<xsl:param name="commonOverviewGraphic"/>
	<xsl:param name="reporttype" select="'detailed'"/>
	<!---->
	<!-- Plain Text font settings -->
	<xsl:param name="PlainTextFont" select="'Helvetica'"/>
	<xsl:param name="PlainTextFontStyle" select="'normal'"/>
	<xsl:param name="PlainTextFontWeight" select="'normal'"/>
	<xsl:param name="PlainTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.012536715</xsl:param>
	<xsl:param name="PlainTextFontColor" select="'black'"/>	
	<!---->
	<!-- Chapter Title Text Top Level font settings-->
	<xsl:param name="ChapterTopLevelTextFont" select="'Helvetica'"/>
	<xsl:param name="ChapterTopLevelTextFontStyle" select="'normal'"/>
	<xsl:param name="ChapterTopLevelTextFontWeight" select="'bold'"/>
	<xsl:param name="ChapterTopLevelTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.017551401</xsl:param>
	<xsl:param name="ChapterTopLevelTextFontColor" select="'black'"/>
	<!---->
	<!--Source Code  Text font settings-->
	<xsl:param name="SourceCodeTextFont" select="'Courier'"/>
	<xsl:param name="SourceCodeTextFontStyle" select="'normal'"/>
	<xsl:param name="SourceCodeTextFontWeight" select="'normal'"/>
	<xsl:param name="SourceCodeTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.012536715</xsl:param>
	<xsl:param name="SourceCodeTextFontColor" select="'black'"/>
	<!---->
	<!-- Caption Text  font settings; e.g. for table column headers -->
	<xsl:param name="CaptionTextFont" select="'Helvetica'"/>
	<xsl:param name="CaptionTextFontStyle" select="'normal'"/>
	<xsl:param name="CaptionTextFontWeight" select="'bold'"/>
	<xsl:param name="CaptionTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.011283043</xsl:param>
	<xsl:param name="CaptionTextFontColor" select="'black'"/>
	<!---->
	<!--Definition Text font settings, used for "Name -value pairs outside tables -->
	<xsl:param name="DefinitionTextFont" select="'Helvetica'"/>
	<xsl:param name="DefinitionTextFontStyle" select="'normal'"/>
	<xsl:param name="DefinitionTextFontWeight" select="'normal'"/>
	<xsl:param name="DefinitionTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.012536715</xsl:param>
	<xsl:param name="DefinitionTextFontColor" select="'black'"/>
	<!---->
	<!-- SubHeader Text font settings -->
	<xsl:param name="SubHeaderFont" select="'Helvetica'"/>
	<xsl:param name="SubHeaderFontStyle" select="'normal'"/>
	<xsl:param name="SubHeaderFontWeight" select="'bold'"/>
	<xsl:param name="SubHeaderFontSize">
		<xsl:value-of select="$pageheight"/>*0.013790386</xsl:param>
	<xsl:param name="SubHeaderFontColor" select="'black'"/>
	<!---->
	<!--Link  Text font settings-->
	<xsl:param name="LinkTextFont" select="'Helvetica'"/>
	<xsl:param name="LinkTextFontStyle" select="'normal'"/>
	<xsl:param name="LinkTextFontWeight" select="'normal'"/>
	<xsl:param name="LinkTextFontSize">
		<xsl:value-of select="$pageheight"/>*0.012536715</xsl:param>
	<xsl:param name="LinkTextFontColor" select="'blue'"/>
	<xsl:param name="Text-decoration" select="'underline'"/>
	<!---->
	<!--Global Variables-->
	<!-- Indentation levels for this reporting unit    -->
	<!-- This is the indentation used within the available print area, in addition to the overall "margins" -->
	<!-- percentage value used to calculate the real size in mm, reference is the pagewidth -->
	<xsl:variable name="Percent-L1" select="0.03"/>
	<xsl:variable name="Percent-L2" select="0.06"/>
	<xsl:variable name="Percent-L3" select="0.09"/>
	<xsl:variable name="Percent-L4" select="0.12"/>
	<xsl:variable name="Percent-L5" select="0.15"/>
	<xsl:variable name="Percent-L6" select="0.18"/>	
	<xsl:variable name="Percent-Vertical1" select="0.01"/>
	<xsl:variable name="Percent-Vertical2" select="0.02"/>
	<!-- calcualtion of the indent values in mm -->
	<!---->
	<!-- calcualtion of the indent values in mm -->
	<xsl:variable name="Indent-Vertical1">
		<xsl:value-of select="$pageheight"/>*<xsl:value-of select="$Percent-Vertical1"/>
	</xsl:variable>
	<xsl:variable name="Indent-Vertical">
		<xsl:value-of select="$pageheight"/>*<xsl:value-of select="$Percent-Vertical2"/>
	</xsl:variable>
	<xsl:variable name="Indent-L1">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L1"/>
	</xsl:variable>
	<xsl:variable name="Indent-L2">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L2"/>
	</xsl:variable>
	<xsl:variable name="Indent-L3">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L3"/>
	</xsl:variable>
	<xsl:variable name="Indent-L4">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L4"/>
	</xsl:variable>	
	<xsl:variable name="Indent-L5">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L5"/>
	</xsl:variable>		
	<xsl:variable name="Indent-L6">
		<xsl:value-of select="$pagewidth"/>*<xsl:value-of select="$Percent-L6"/>
	</xsl:variable>			
</xsl:stylesheet>
