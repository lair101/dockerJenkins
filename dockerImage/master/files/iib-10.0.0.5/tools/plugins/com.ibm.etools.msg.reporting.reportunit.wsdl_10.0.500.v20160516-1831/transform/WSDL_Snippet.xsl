<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="fo ri svg">
	<!---->
	<!--include files-->
	<xsl:include href="WSDL_Parameters.xsl"/>
	<xsl:include href="Common_Parameters.xsl"/>
	<xsl:include href="Common_AttributeSets.xsl"/>
	<xsl:include href="WSDL_Utilities.xsl"/>
	<xsl:include href="WSDL_PortType.xsl"/>
	<xsl:include href="WSDL_Operation.xsl"/>
	<xsl:include href="WSDL_Namespaces.xsl"/>
	<!---->
	<xsl:template match="/">
		<fo:flow flow-name="plugin-body">
			<xsl:apply-templates select="wsdl:definitions"/>
		</fo:flow>
	</xsl:template>
	<!--
	************************************************************************************
    * Template: for root element wsdl:definitions
     *********************************************************************************
	-->
	<xsl:template match="wsdl:definitions">
		<xsl:choose>
			<xsl:when test="$selectedInterface = ''">
				<!--*************************************************************************************-->
				<!-- *   The whole WSDL file should be reported with all containig interfaces    -->
				<!-- *   The chapter title is :  Interfaces (wsdlFilename.wsdl)                          -->
				<!-- *   Then a chapter with collection of all interface graphics                        -->
				<!-- *   Then a chapter for each interface without a graphic                             -->
				<!--*************************************************************************************-->
				<ri:chapter>
					<!--*************************************************************************************-->
					<!-- * Main chapter heading: Interfaces(x.wsdl)                                             -->
					<!--*************************************************************************************-->
					<fo:block xsl:use-attribute-sets="h1">
						<ri:heading>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsIFs'"/>
							</xsl:call-template>
							<fo:leader xsl:use-attribute-sets="InlineSpace1"/> "<xsl:value-of select="$WSDL_FileName"/>"</ri:heading>
					</fo:block>
					<fo:block >
							<xsl:value-of select="$WSDL_FileLocation"/>
						</fo:block>	
					<!--*************************************************************************************-->
					<!-- * Overview Graphics with collection of all interfaces within the WSDL file   -->
					<!--*************************************************************************************-->
					<!--
					<ri:chapter>
						<fo:block xsl:use-attribute-sets="h2">
							<ri:heading>
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsOverview'"/>
								</xsl:call-template>
							</ri:heading>
						</fo:block>
						<xsl:call-template name="OverviewGraphic"/>
					</ri:chapter>
					-->
					<!--*************************************************************************************-->
					<!-- * chapter for each interface without a graphic                                         -->
					<!--*************************************************************************************-->			
					<xsl:apply-templates select="wsdl:portType"/>					
				</ri:chapter>
			</xsl:when>
			<xsl:otherwise>
				<!--******************************************************************************************** -->
				<!-- *   Only the interface passed in parameter selectedInterface should be reported  -->
				<!-- *   Create a chapter for each interface with a graphic                                        -->
				<!--******************************************************************************************** -->
				<xsl:apply-templates select="wsdl:portType[@name = $selectedInterface]"/>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
