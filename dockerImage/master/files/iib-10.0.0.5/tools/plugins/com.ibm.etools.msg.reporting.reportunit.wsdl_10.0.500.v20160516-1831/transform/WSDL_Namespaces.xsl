<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

-->
<xsl:stylesheet version="1.0" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:java="http://xml.apache.org/xalan/java" extension-element-prefixes="java" exclude-result-prefixes="fo ri">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<!--*********************************************************************-->
	<!-- template to report all namespaces of the interface              -->
	<!-- and create the namespace table                                	   -->
	<!--*********************************************************************-->
	<xsl:template name="Namespaces">
		<fo:table table-layout="fixed" hyphenate="true" width="{$pagewidth}" text-align="left">
			<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
			<fo:table-column column-width="proportional-column-width({$Percent-L1}*100)"/>
			<fo:table-column column-width="proportional-column-width(28)"/>
			<fo:table-column column-width="proportional-column-width(68)"/>
			<!-- call template to create the namespace table header row -->
			<xsl:call-template name="MakeNamespaceHeader"/>
			<!--*********************************************************************-->
			<!-- template to handle operation input and output                    -->
			<!--*********************************************************************-->
			<fo:table-body>
				<!-- add row for each namespace -->				
				<!--xsl:for-each select="namespace::*[name()!='']"-->
				<xsl:for-each select="namespace::*">
					<xsl:call-template name="MakeNamespaceRow">
						<xsl:with-param name="name" select="name()"/>
						<xsl:with-param name="namespace" select="java:com.ibm.etools.msg.reporting.reportunit.wsdl.NamespaceUtils.convertUriToNamespace(.)"/>
					</xsl:call-template>
				</xsl:for-each>
			</fo:table-body>
		</fo:table>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create the header row for the Namespace table
        *               
	    ********************************************************************************************-->
	<xsl:template name="MakeNamespaceHeader">
		<!-- *** create the header column *** -->
		<fo:table-header>
			<fo:table-row>
				<!-- first unvisible cell for indentation -->
				<fo:table-cell padding="2pt">
					<fo:block/>
				</fo:table-cell>
				<!-- *** Namespace name ***-->
				<xsl:call-template name="MakeNamespaceHeaderCell">
					<xsl:with-param name="text" select="'nlsPrefix'"/>
				</xsl:call-template>
				<!-- *** Namespace value ***-->
				<xsl:call-template name="MakeNamespaceHeaderCell">
					<xsl:with-param name="text" select="'nlsNameSpaceHeader'"/>
				</xsl:call-template>
			</fo:table-row>
		</fo:table-header>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create a header cell for Namespace table
        *               
	    ********************************************************************************************-->
	<xsl:template name="MakeNamespaceHeaderCell">
		<xsl:param name="text"/>
		<fo:table-cell border="solid" padding="2pt" background-color="{$tableHeaderBackgroundColor}" border-color="{$borderColor}">
			<fo:block xsl:use-attribute-sets="DefinitionText">
				<xsl:call-template name="NLS_translation">
					<xsl:with-param name="var_original" select="$text"/>
				</xsl:call-template>
			</fo:block>
		</fo:table-cell>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create a table row for each namespace containinf the
        * the namespace prefix and the namespace
	    ********************************************************************************************-->
	<xsl:template name="MakeNamespaceRow">
		<xsl:param name="name"/>
		<xsl:param name="namespace"/>
		<fo:table-row>
			<!-- first unvisible cell for indentation -->
			<fo:table-cell padding="2pt" border-color="{$borderColor}">
				<fo:block/>
			</fo:table-cell>
			<!-- *** namespace name ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$name"/>
				</fo:block>
			</fo:table-cell>
			<!-- *** namespace value ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText" hyphenation-character=" ">
					<xsl:attribute name="hyphenation-push-character-count">3</xsl:attribute>
					<xsl:value-of select="$namespace"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
</xsl:stylesheet>