<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="fo ri">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<!-- key to select nodes "xsd:simpleType" by its attributre "@name"-->
	<xsl:key name="sTypes" match="xsd:simpleType" use="@name"/>
	<!--
	****************************************************************************************************
	* template to create the table for the data type restrictions (onlypermitz certain values)
	****************************************************************************************************
	-->
	<xsl:template name="MakeRestrictionTable">
		<xsl:param name="headerText"/>
		<fo:block xsl:use-attribute-sets="Space1"/>
		<fo:block xsl:use-attribute-sets="DefinitionTextL2">
			<xsl:call-template name="NLS_translation">
				<xsl:with-param name="var_original" select="$headerText"/>
			</xsl:call-template>:
		</fo:block>
		<fo:block xsl:use-attribute-sets="SpaceHalf"/>
		<fo:table table-layout="fixed" hyphenate="true" width="{$pagewidth}" text-align="left">
			<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
			<fo:table-column column-width="proportional-column-width({$Percent-L3}*100)"/>
			<fo:table-column column-width="proportional-column-width(91)"/>
			<fo:table-body>
				<!-- apply template to add row for each enumeratin restriction -->
				<xsl:apply-templates select="xsd:simpleType/xsd:restriction/xsd:enumeration"/>
				<xsl:apply-templates select="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:enumeration"/>
				<!-- apply template to add row for each pattern restriction -->
				<xsl:apply-templates select="xsd:simpleType/xsd:restriction/xsd:pattern"/>
				<xsl:apply-templates select="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:pattern"/>
				<!-- do it also directly for simple types-->
				<xsl:apply-templates select="xsd:restriction/xsd:enumeration"/>
				<xsl:apply-templates select="xsd:restriction/xsd:pattern"/>
			</fo:table-body>
		</fo:table>
	</xsl:template>
	<!--
	**************************************************************************************************
	* template to create a  row for each restriction within the restriction table
	**************************************************************************************************
	-->
	<xsl:template match="xsd:simpleType/xsd:restriction/xsd:enumeration | xsd:simpleType/xsd:restriction/xsd:pattern | xsd:restriction/xsd:enumeration  | xsd:restriction/xsd:pattern">
		<fo:table-row>
			<!-- first unvisible dummy row for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<!-- *** attribute name ***-->
			<fo:table-cell border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="PlainText">
					<ri:bullet type="dot_medium"/>
					<xsl:value-of select="@value"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
</xsl:stylesheet>
