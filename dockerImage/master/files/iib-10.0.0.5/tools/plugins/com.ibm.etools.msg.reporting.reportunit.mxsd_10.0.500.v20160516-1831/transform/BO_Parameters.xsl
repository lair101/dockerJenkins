<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
	<!-- ********************************************************************* -->
	<!-- * XSLT parameters for BO report Unit                             -->
	<!-- ********************************************************************* -->
	<xsl:param name="selectedDataType" select="''"/>
	<xsl:param name="XSD_FileName" select="''"/>
	<xsl:param name="XSD_FileLocation" select="''"/>
	<xsl:param name="resourceFileExtension" select="''"/>
	<xsl:param name="overviewGraphic" select="''"/>
	<xsl:param name="dictionary" select="'BO_NLS_Dictionary.xml'"/>
	<!---->
	<!--page layout settings-->
	<!-- pagewidth and pageheight are NOT the real size of the paper, but it is the real usable "printing area size" -->
	<!-- which can be really used for formatting -->
	<!-- A4 : 210mm * 297mm; LETTER 215,9mm * 279,4mm -->
	<!---->
	<!-- A4 width - margins: 210mm - (2*20mm) -->
	<xsl:param name="pagewidth" select="'176.4mm'"/>
	<!-- A4 width - margins: 210mm - (2*20mm) -->
	<xsl:param name="pageheight" select="'279.18mm'"/>
	<!--*************************************************************************-->
	<!-- translation file for this XSLT                                                      -->
	<!--*************************************************************************-->
	<xsl:variable name="doc-file" select="$dictionary"/>
</xsl:stylesheet>
