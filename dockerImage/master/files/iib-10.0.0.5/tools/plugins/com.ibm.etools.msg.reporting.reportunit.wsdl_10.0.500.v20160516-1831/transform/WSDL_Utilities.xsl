<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo ri svg">
	<!---->
	<!--********************************************************************************************
		* Utility Templates
        *                   
	    ********************************************************************************************-->
	<!---->
	<!--*******************************************************************************************************
		* Utility template :  AddNameValueRow
		*
		* Adds a Name/Value Row to a table without a border
		* Input parameters: name: contents of the name cell
        *                            velue: conents of the value cell 
		*
	    ********************************************************************************************************-->
	<xsl:template name="AddNameValueRow">
		<xsl:param name="name"/>
		<xsl:param name="value"/>
		<xsl:param name="hyphen-push-value"/>
		<fo:table-row>
			<!-- first empty column, invisible cell for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="$name"/>
					</xsl:call-template>
						</fo:block>
			</fo:table-cell>
			<!-- column for property value -->
			<fo:table-cell>
				<xsl:choose>
					<xsl:when test="$hyphen-push-value!='' ">
						<fo:block xsl:use-attribute-sets="DefinitionText" hyphenation-character=" ">
							<xsl:attribute name="hyphenation-push-character-count">
								<xsl:value-of select="$hyphen-push-value"/>
							</xsl:attribute>
							<xsl:value-of select="$value"/>
						</fo:block>
					</xsl:when>
					<xsl:otherwise>
						<fo:block xsl:use-attribute-sets="DefinitionText" hyphenation-character=" ">
							<xsl:value-of select="$value"/>
						</fo:block>
					</xsl:otherwise>
				</xsl:choose>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<!---->
	<!--********************************************************************************************
		* template :  for NLS translation of words and sentences. 
        *                    default language is english (en) . 
	    ********************************************************************************************-->
	<xsl:template name="NLS_translation">
		<xsl:param name="var_original"/>
		<xsl:choose>
			<xsl:when test="document($doc-file)/locale/*[name()=  $var_original]/*[name()=$language]">
				<xsl:value-of select="document($doc-file)/locale/*[name()=$var_original]/*[name()=$language]"/>
			</xsl:when>
			<xsl:when test="document($doc-file)/locale/*[name()=  $var_original]/*[name()='en']">
				<xsl:value-of select="document($doc-file)/locale/*[name()=$var_original]/*[name()='en']"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$var_original"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>