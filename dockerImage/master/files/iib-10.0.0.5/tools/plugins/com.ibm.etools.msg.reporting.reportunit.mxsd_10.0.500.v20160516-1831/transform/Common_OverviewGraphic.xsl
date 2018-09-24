<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="fo ri">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<!--*********************************************************************-->
	<!-- template to create overview graphic                                  -->
	<!--*********************************************************************-->
	<xsl:template name="CommonOverviewGraphic">
		<xsl:choose>
			<xsl:when test="$commonOverviewGraphic">
				<xsl:choose>
					<xsl:when test="$selectedDataType = ''">
						<fo:block text-align="center">
							<!--xsl:value-of disable-output-escaping="yes" select="$overviewGraphic"/-->
							<xsl:variable name="BOStart" select="concat('&lt;ri:', @name, '>')"/>
							<xsl:variable name="BOEnd" select="concat('&lt;/ri:', @name, '>')"/>
							<xsl:variable name="svgStart" select="substring-after($commonOverviewGraphic, $BOStart)"/>
							<xsl:variable name="svg" select="substring-before($svgStart, $BOEnd)"/>
							<xsl:choose>
								<xsl:when test="$svg =''">
									<fo:block xsl:use-attribute-sets="PlainTextL1 SpaceHalf">
										<xsl:call-template name="NLS_translation">
											<xsl:with-param name="var_original" select="'nlsNoOverviewGraphic'"/>
										</xsl:call-template>
									</fo:block>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of disable-output-escaping="yes" select="$svg"/>
								</xsl:otherwise>
							</xsl:choose>
						</fo:block>
					</xsl:when>
					<xsl:otherwise>
						<fo:block text-align="center">
							<xsl:value-of disable-output-escaping="yes" select="$commonOverviewGraphic"/>
						</fo:block>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<fo:block xsl:use-attribute-sets="PlainTextL1">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsNoOverviewGraphic'"/>
					</xsl:call-template>
				</fo:block>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>