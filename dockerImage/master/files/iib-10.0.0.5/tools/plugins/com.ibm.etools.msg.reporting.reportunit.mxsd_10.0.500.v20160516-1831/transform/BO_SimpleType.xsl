<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="fo ri">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="xsd:simpleType" mode="SimpleType">
		<fo:block xsl:use-attribute-sets="Space1"/>
		<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
			<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
			<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
			<fo:table-column column-width="proportional-column-width(30)"/>
			<fo:table-column column-width="proportional-column-width(70)"/>
			<fo:table-body>
				<!-- ************************ add row: minLength  -->
				<xsl:if test="xsd:restriction/xsd:minLength/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMinLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:minLength/@value"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: maxLength  -->
				<xsl:if test="xsd:restriction/xsd:maxLength/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMaxLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:maxLength/@value"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: minInclusive  -->
				<xsl:if test="xsd:restriction/xsd:minInclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMinLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:minInclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsInclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: maxInclusive  -->
				<xsl:if test="xsd:restriction/xsd:maxInclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMaxLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:maxInclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsInclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: minExclusive  -->
				<xsl:if test="xsd:restriction/xsd:minExclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMinLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:minExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsExclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: maxExclusive  -->
				<xsl:if test="xsd:restriction/xsd:maxExclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMaxLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:restriction/xsd:maxExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsExclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: whitespace handling  -->
				<xsl:if test="xsd:restriction/xsd:whiteSpace/@value">
					<xsl:variable name="whiteSpace">
						<xsl:value-of select="xsd:restriction/xsd:whiteSpace/@value"/>
					</xsl:variable>
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsWhiteSpace'"/>
						<xsl:with-param name="value" select="$whiteSpace"/>
					</xsl:call-template>
				</xsl:if>
			</fo:table-body>
		</fo:table>
		<!-- ************************call template to create the restriction (only permit certain values) table  -->
		<xsl:if test="xsd:restriction/xsd:enumeration">
			<xsl:variable name="permit">
				<xsl:choose>
					<xsl:when test="xsd:restriction/xsd:enumeration | key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:enumeration">
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsEnumeration'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="xsd:restriction/xsd:pattern">
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsPattern'"/>
						</xsl:call-template>
					</xsl:when>
				</xsl:choose>
			</xsl:variable>
			<xsl:call-template name="MakeRestrictionTable">
				<xsl:with-param name="headerText" select="$permit"/>
			</xsl:call-template>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
