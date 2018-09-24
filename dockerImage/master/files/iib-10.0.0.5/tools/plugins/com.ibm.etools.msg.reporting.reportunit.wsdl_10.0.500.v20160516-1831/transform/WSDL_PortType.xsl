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
	<!-- template to report the portType (=Interface)                        -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:portType">
		<ri:chapter>
			<!--*************************************************************************************-->
			<!-- * Interface header with interface name                                                 * -->
			<!--*************************************************************************************-->
			<xsl:if test="$selectedInterface = ''">
				<fo:block xsl:use-attribute-sets="Space2"/>
			</xsl:if>
			<fo:block xsl:use-attribute-sets="h1">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsIF'"/>
					</xsl:call-template>"<xsl:value-of select="@name"/>"</ri:heading>
			</fo:block>
			<!--*************************************************************************************-->
			<!-- * Documentation                                                                                * -->
			<!--*************************************************************************************-->
			<xsl:choose>
				<xsl:when test="normalize-space(wsdl:documentation)">
					<fo:block xsl:use-attribute-sets="DescAndDocTextL1">
						<xsl:apply-templates select="wsdl:documentation"/>
					</fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
				</xsl:when>
			</xsl:choose>
			<!--******************************************************************************************-->
			<!-- * Interface Overview Graphic only if a specidied interface should be reported * -->
			<!--***************************************************************************************** -->
			
			<!--*************************************************************************************-->
			<!-- * Interface Settings                                                                            * -->
			<!--*************************************************************************************-->
			<ri:chapter>
				<fo:block xsl:use-attribute-sets="h2">
					<ri:heading>
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsInterfaceSettings'"/>
						</xsl:call-template>
					</ri:heading>
				</fo:block>
				<!--*************************************************************************************-->
				<!-- * namespace  and WSDL Type?????? DefinitionText Table                   * -->
				<!--*************************************************************************************-->
				<fo:table table-layout="fixed" hyphenate="true" width="{$pagewidth}" text-align="left">
					<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
					<fo:table-column column-width="proportional-column-width({$Percent-L1}*100)"/>
					<fo:table-column column-width="proportional-column-width(27)"/>
					<fo:table-column column-width="proportional-column-width(70)"/>
					<fo:table-body>
						<!-- add row for namspace -->
						<xsl:call-template name="AddNameValueRow">
							<xsl:with-param name="name" select="'nlsNameSpace'"/>
							<xsl:with-param name="hyphen-push-value" select="3"/>
							<xsl:with-param name="value" select="java:com.ibm.etools.msg.reporting.reportunit.wsdl.NamespaceUtils.convertUriToNamespace(//wsdl:definitions/@targetNamespace)"/>							
						</xsl:call-template>
						<!-- add row for WSDL Type -->
						<!--
					<xsl:call-template name="AddNameValueRow">
						<xsl:with-param name="name" select="'nlsWSDLType'"/>
						<xsl:with-param name="value" select="'????????????????????????????'"/>
					</xsl:call-template>
					-->
					</fo:table-body>
				</fo:table>
				<fo:block xsl:use-attribute-sets="SpaceHalf"/>
				<!--*************************************************************************************-->
				<!-- * Operations chapter                                                                         * -->
				<!--*************************************************************************************-->
				<xsl:if test="wsdl:operation">
					<ri:chapter>
						<fo:block xsl:use-attribute-sets="h3">
							<ri:heading>
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsOperations'"/>
								</xsl:call-template>
							</ri:heading>
						</fo:block>
						<!--*************************************************************************************-->
						<!-- * chapter for each operation                                                                * -->
						<!--*************************************************************************************-->
						<xsl:apply-templates select="wsdl:operation"/>
					</ri:chapter>
				</xsl:if>
				<!--*************************************************************************************-->
				<!-- * Namespaces chapter                                                                         * -->
				<!--*************************************************************************************-->
				<ri:chapter>
					<fo:block xsl:use-attribute-sets="h3">
						<ri:heading>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsNamespaces'"/>
							</xsl:call-template>
						</ri:heading>
					</fo:block>
					<xsl:call-template name="Namespaces"/>
				</ri:chapter>
			</ri:chapter>
		</ri:chapter>
	</xsl:template>
</xsl:stylesheet>
