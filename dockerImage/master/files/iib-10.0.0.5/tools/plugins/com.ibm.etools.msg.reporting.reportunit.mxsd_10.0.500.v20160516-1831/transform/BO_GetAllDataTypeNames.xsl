<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<!--
	* Stylesheet to extract all datatype names from a "XSD" file.
	*
	* Each collected file name is terminated by separation characters defined by the variable "sepChar"
	*
	* Parameters: No input parameters are supported.
	* Return: 		A string containing the names of all data types. Each name is terminated by the sepChar.
	*					The output format ist "text", this means flat text file without any XML tags
 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<xsl:output method="text"/>
	<xsl:variable name="sepChar" select="'&lt;&gt;'"/>
	<!---->
	<xsl:template match="/">
		<xsl:apply-templates select="xsd:schema/xsd:complexType"/>
		<xsl:apply-templates select="xsd:schema/xsd:simpleType"/>		
		<xsl:apply-templates select="xsd:schema/xsd:element"/>		
	</xsl:template>
	<!---->
	<xsl:template match="xsd:complexType">
		<xsl:value-of select="@name"/>
		<xsl:value-of select="$sepChar"/>
	</xsl:template>
	<!---->
	<xsl:template match="xsd:simpleType">
		<xsl:value-of select="@name"/>
		<xsl:value-of select="$sepChar"/>
	</xsl:template>	
	<!---->
	<xsl:template match="xsd:element">
		<xsl:if test="xsd:complexType">
			<xsl:apply-templates select="@name"/>
			<xsl:value-of select="$sepChar"/>			
		</xsl:if>
	</xsl:template>	
</xsl:stylesheet>