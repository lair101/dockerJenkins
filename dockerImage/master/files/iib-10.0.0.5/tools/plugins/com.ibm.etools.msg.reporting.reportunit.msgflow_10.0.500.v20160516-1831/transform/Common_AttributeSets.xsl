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
	<!-- ********************************************************************************************************************** -->
	<!-- ********************** Definition of XSL attribute sets ********************************************************** -->
	<!-- ********************************************************************************************************************** -->
	<!-- ************* Plain Text attribute sets *************************************************************************** -->
	<!-- ************* No Indentation  -->
	<xsl:attribute-set name="PlainText">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 1 Indentation  -->
	<xsl:attribute-set name="PlainTextL1">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 2 Indentation  -->
	<xsl:attribute-set name="PlainTextL2">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 3 Indentation  -->
	<xsl:attribute-set name="PlainTextL3">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L3"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<!-- ********************** Headings attribute sets ***************************************************************** -->
	<xsl:attribute-set name="h1">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<xsl:attribute-set name="h2">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.9</xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>		
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<xsl:attribute-set name="h3">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.8</xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>		
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<xsl:attribute-set name="h4">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.8</xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$ChapterTopLevelTextFontColor"/></xsl:attribute>		
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 2 Indentation  -->
	<!--xsl:attribute-set name="h4L">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.8</xsl:attribute>
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.006</xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
	</xsl:attribute-set-->	
	<!---->
	<xsl:attribute-set name="h5">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.8</xsl:attribute>
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.01</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!--xsl:attribute-set name="h5L">
		<xsl:attribute name="font-family"><xsl:value-of select="$ChapterTopLevelTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$ChapterTopLevelTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$ChapterTopLevelTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$ChapterTopLevelTextFontSize"/>*0.7</xsl:attribute>
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.005</xsl:attribute>
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.003</xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
	</xsl:attribute-set-->	
	<!-- ********************** Source Code text attribute sets ************************************************************ -->
	<!-- ************* Level NO Indentation  -->
	<xsl:attribute-set name="SourceCodeText">
		<xsl:attribute name="font-family"><xsl:value-of select="$SourceCodeTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SourceCodeTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SourceCodeTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SourceCodeTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SourceCodeTextFontColor"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>	
	<!-- ************* Level 1 Indentation  -->
	<xsl:attribute-set name="SourceCodeTextL1">
		<xsl:attribute name="font-family"><xsl:value-of select="$SourceCodeTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SourceCodeTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SourceCodeTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SourceCodeTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SourceCodeTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 2 Indentation  -->
	<xsl:attribute-set name="SourceCodeTextL2">
		<xsl:attribute name="font-family"><xsl:value-of select="$SourceCodeTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SourceCodeTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SourceCodeTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SourceCodeTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SourceCodeTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** Caption text  attribute sets ***************************************************************** -->
	<!-- ************* Level NO Indentation  -->
	<xsl:attribute-set name="CaptionText">
		<xsl:attribute name="font-family"><xsl:value-of select="$CaptionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$CaptionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$CaptionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$CaptionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$CaptionTextFontColor"/></xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** Definition text  attribute sets ****************************************************************** -->
	<!-- ************* Level NO Indentation  -->
	<xsl:attribute-set name="DefinitionText">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 1 Indentation  -->
	<xsl:attribute-set name="DefinitionTextL1">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 2 Indentation  -->
	<xsl:attribute-set name="DefinitionTextL2">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 3 Indentation  -->
	<xsl:attribute-set name="DefinitionTextL3">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L3"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 4 Indentation  -->
	<xsl:attribute-set name="DefinitionTextL4">
		<xsl:attribute name="font-family"><xsl:value-of select="$DefinitionTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$DefinitionTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$DefinitionTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$DefinitionTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$DefinitionTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L4"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>	
	<!-- ********************** Emphasized text  attribute sets ****************************************************************** -->
	<!-- ************* No Indentation  -->
	<xsl:attribute-set name="SubHeader">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 1 Indentation  -->
	<xsl:attribute-set name="SubHeaderL1">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>	
	<!-- ************* Level 2 Indentation  -->
	<xsl:attribute-set name="SubHeaderL2">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 3 Indentation  -->
	<xsl:attribute-set name="SubHeaderL3">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L3"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>	
	<!-- ************* Level 4 Indentation  -->
	<xsl:attribute-set name="SubHeaderL4">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L4"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>		
	<!-- ************* Level 5 Indentation  -->
	<xsl:attribute-set name="SubHeaderL5">
		<xsl:attribute name="font-family"><xsl:value-of select="$SubHeaderFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$SubHeaderFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$SubHeaderFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$SubHeaderFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$SubHeaderFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L5"/></xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>			
	<!-- ********************** Link text  attribute sets ****************************************************************** -->
	<xsl:attribute-set name="LinkText">
		<xsl:attribute name="font-family"><xsl:value-of select="$LinkTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$LinkTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$LinkTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$LinkTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$LinkTextFontColor"/></xsl:attribute>
		<xsl:attribute name="text-decoration"><xsl:value-of select="$Text-decoration"/></xsl:attribute>
	</xsl:attribute-set>
	<!-- ********************** description and documentation text  attribute sets ************************************ -->
	<!-- It's the same as PlainText, but with hyphenation enabled and .....................-->
	<!-- ************* No Indentation  -->
	<xsl:attribute-set name="DescAndDocText">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 1 Indentation  -->
	<xsl:attribute-set name="DescAndDocTextL1">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L1"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 2 Indentation  -->
	<xsl:attribute-set name="DescAndDocTextL2">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L2"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 3 Indentation  -->
	<xsl:attribute-set name="DescAndDocTextL3">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L3"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>
	<!-- ************* Level 4 Indentation  -->
	<xsl:attribute-set name="DescAndDocTextL4">
		<xsl:attribute name="font-family"><xsl:value-of select="$PlainTextFont"/></xsl:attribute>
		<xsl:attribute name="font-weight"><xsl:value-of select="$PlainTextFontWeight"/></xsl:attribute>
		<xsl:attribute name="font-style"><xsl:value-of select="$PlainTextFontStyle"/></xsl:attribute>
		<xsl:attribute name="font-size"><xsl:value-of select="$PlainTextFontSize"/></xsl:attribute>
		<xsl:attribute name="color"><xsl:value-of select="$PlainTextFontColor"/></xsl:attribute>
		<xsl:attribute name="margin-left"><xsl:value-of select="$Indent-L4"/></xsl:attribute>
		<xsl:attribute name="white-space-collapse">false</xsl:attribute>
		<xsl:attribute name="hyphenate">true</xsl:attribute>
	</xsl:attribute-set>	
	<!-- ********************** Graphic Blocks ********************************* -->
	<xsl:attribute-set name="GraphicBlock">
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.02</xsl:attribute>
		<xsl:attribute name="text-align">center</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<!-- ********************** Inline ItalicBold  ********************************* -->
	<xsl:attribute-set name="InlineItalicBold">
		<xsl:attribute name="font-weight">bold</xsl:attribute>
		<xsl:attribute name="font-style">italic</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<!-- ********************** InlineItalic  ************************************** -->
	<xsl:attribute-set name="InlineItalic">
		<xsl:attribute name="font-style">italic</xsl:attribute>
	</xsl:attribute-set>
	<!---->
	<!-- ********************** Space Blocks  ************************************** -->
	<xsl:attribute-set name="Space1">
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.02</xsl:attribute>
	</xsl:attribute-set>
	<xsl:attribute-set name="SpaceHalf">
		<xsl:attribute name="space-after"><xsl:value-of select="$pageheight"/>*0.02 * 0.5</xsl:attribute>
	</xsl:attribute-set>	
	<xsl:attribute-set name="Space2">
		<xsl:attribute name="space-before"><xsl:value-of select="$pageheight"/>*0.02</xsl:attribute>
	</xsl:attribute-set>	
	<xsl:attribute-set name="InlineSpace1">
		<xsl:attribute name="leader-length"><xsl:value-of select="$pagewidth"/>*0.02</xsl:attribute>
		<xsl:attribute name="leader-pattern">space</xsl:attribute>
	</xsl:attribute-set>
</xsl:stylesheet>
