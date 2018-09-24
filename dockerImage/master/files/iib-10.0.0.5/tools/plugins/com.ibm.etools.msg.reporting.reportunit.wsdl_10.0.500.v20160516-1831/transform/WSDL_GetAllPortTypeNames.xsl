<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<!--
	* Stylesheet to extract all portType names from a "WSDL" file.
	*
	* Each collected file name is terminated by separation characters defined by the variable "sepChar"
	*
	* Parameters: No input parameters are supported.
	* Return: 		A string containing the names of all port types. Each name is terminated by the sepChar.
	*					The output format ist "text", this means flat text file without any XML tags
 -->
<xsl:stylesheet version="1.0"  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/">
	<xsl:output method="text"/>
	<xsl:variable name="sepChar" select="'&lt;&gt;'"/>
	<!---->
	<xsl:template match="/">
		<xsl:apply-templates select="wsdl:definitions"/>
	</xsl:template>
	<!---->
	<xsl:template match="wsdl:definitions">
		<xsl:apply-templates select="wsdl:portType"/>
	</xsl:template>	
	<!---->
	<xsl:template match="wsdl:portType">
		<xsl:value-of select="@name"/>
		<xsl:value-of select="$sepChar"/>
	</xsl:template>
</xsl:stylesheet>