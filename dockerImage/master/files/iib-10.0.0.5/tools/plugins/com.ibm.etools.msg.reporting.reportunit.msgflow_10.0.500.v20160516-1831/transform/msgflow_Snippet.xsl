<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" xmlns:xmi="http://www.omg.org/XMI" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:java="http://xml.apache.org/xalan/java" extension-element-prefixes="java" exclude-result-prefixes="fo ri svg">	
	<xsl:include href="Common_Parameters.xsl"/>
	<xsl:include href="Common_AttributeSets.xsl"/>
	<xsl:param name="flow_FileName" select="''"/>
	<xsl:param name="flow_FileLocation" select="''"/>
	<xsl:param name="overviewGraphic" select="''"/>
	<xsl:param name="flow_File" select="''"/>
	<xsl:param name="dictionary" select="'BO_NLS_Dictionary.xml'"/>
	<xsl:param name="nameTypePairs"/>
	<xsl:variable name="doc-file" select="$dictionary"/>
	<xsl:template match="/">
		<fo:flow flow-name="plugin-body">
			<xsl:apply-templates select="//ecore:EPackage"/>
		</fo:flow>
	</xsl:template>
	<!--***********************************************************************************-->
	<!--*  Template: for root element ecore:EPackage                                            -->
	<!--**********************************************************************************	-->
	<xsl:template match="ecore:EPackage">
		<ri:chapter>
					<fo:block xsl:use-attribute-sets="h1">
						<ri:heading><xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsMessageFlow'"/>
							</xsl:call-template><fo:leader xsl:use-attribute-sets="InlineSpace1"/> "<xsl:value-of select="$flow_FileName"/><xsl:if test="eClassifiers/version"> - v<xsl:value-of select="eClassifiers/version/@string"/></xsl:if>"</ri:heading>							
					</fo:block>
					<fo:block >
							<xsl:value-of select="$flow_FileLocation"/>
						</fo:block>				
					<ri:chapter>
						<fo:block xsl:use-attribute-sets="h2">
					<ri:heading><xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsOverview'"/>
							</xsl:call-template></ri:heading>
				</fo:block>
				<fo:block text-align="center">
							<xsl:value-of disable-output-escaping="yes" select="$overviewGraphic"/>
				</fo:block>
				<xsl:if test="eClassifiers/shortDescription">
				<ri:chapter>
				<fo:block xsl:use-attribute-sets="h3">
						<ri:heading><xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsShortDescription'"/>
							</xsl:call-template></ri:heading>
					</fo:block>
				<fo:block xsl:use-attribute-sets="DescAndDocTextL1">
						<fo:block xsl:use-attribute-sets="Space1 DescAndDocTextL2">
							<xsl:value-of select="eClassifiers/shortDescription/@string"/>
						</fo:block>
					</fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
					</ri:chapter>
					</xsl:if>
					<xsl:if test="eClassifiers/longDescription">
				<ri:chapter>
				<fo:block xsl:use-attribute-sets="h3">
						<ri:heading><xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsLongDescription'"/>
							</xsl:call-template></ri:heading>
					</fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
				<fo:block xsl:use-attribute-sets="DescAndDocTextL1">
						<fo:block xsl:use-attribute-sets="Space1 DescAndDocTextL2">
							<xsl:value-of select="eClassifiers/longDescription/@string"/>
						</fo:block>
					</fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
					</ri:chapter>
					</xsl:if>					
			</ri:chapter>
					<xsl:apply-templates select="//nodes"/>
				</ri:chapter>
	</xsl:template>
	<xsl:template match="nodes">
		<ri:chapter>			
			<fo:block xsl:use-attribute-sets="h1">
				<ri:heading><xsl:if test="translation/@string">
					<!-- The argument in the concat used to be java:get($nameTypePairs,string(translation/@string))
						which I guess is to call the get method on the map, $nameTypePairs with a key of the
						translated string.  But the XSLT parser doesn't understand it.
					--> 
					<xsl:value-of select="translation/@string"/>
				</xsl:if><xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsNode'"/>
							</xsl:call-template> - "<xsl:choose>
				<xsl:when test="translation/@string">
					<xsl:value-of select="translation/@string"/>
				</xsl:when>
				<xsl:otherwise>
					<xsl:value-of select="substring-after(translation/@key,'.')"/>
				</xsl:otherwise>
				</xsl:choose>"</ri:heading>
			</fo:block>	
			<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:block>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsShortDescription'"/>
									<xsl:with-param name="value" select="shortDescription/@string"/>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsLongDescription'"/>
									<xsl:with-param name="value" select="longDescription/@string"/>									
								</xsl:call-template>	
								<xsl:choose>
									<xsl:when test="starts-with(@xmi:type,'ComIbmCompute.msgnode')">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsESQLFile'"/>
											<xsl:with-param name="value" select="java:com.ibm.etools.msg.reporting.reportunit.msgflow.LoadUtils.getReferencedFileName($flow_File,@computeExpression)"/>									
										</xsl:call-template>										
									</xsl:when>
									<xsl:when test="starts-with(@xmi:type,'ComIbmJavaCompute.msgnode')">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsJavaClass'"/>
											<xsl:with-param name="value" select="java:com.ibm.etools.msg.reporting.reportunit.msgflow.LoadUtils.getReferencedFileName($flow_File,@javaClass)"/>									
										</xsl:call-template>
									</xsl:when>
									<xsl:when test="starts-with(@xmi:type,'ComIbmMapping.msgnode')">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsMapFile'"/>
											<xsl:with-param name="value" select="java:com.ibm.etools.msg.reporting.reportunit.msgflow.LoadUtils.getReferencedFileName($flow_File,@mappingExpression)"/>									
										</xsl:call-template>
									</xsl:when>
									<xsl:when test="@wsdlFileName">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsWsdlFile'"/>
											<xsl:with-param name="value" select="@wsdlFileName"/>									
										</xsl:call-template>
									</xsl:when>	
									<xsl:when test="contains(@xmi:type,'.msgflow')">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsSubflow'"/>
											<xsl:with-param name="value" select="substring-before(@xmi:type,':')"/>									
										</xsl:call-template>
									</xsl:when>
									<xsl:when test="contains(@xmi:type,'.subflow')">
										<xsl:call-template name="AddAttributeRow">
											<xsl:with-param name="name" select="'nlsSubflow'"/>
											<xsl:with-param name="value" select="substring-before(@xmi:type,':')"/>									
										</xsl:call-template>
									</xsl:when>												
								</xsl:choose>														
								</fo:table-body>
							</fo:table>
						
							</fo:block>	
			
		</ri:chapter>
	</xsl:template>	
	
	<!--  Values for each individual node -->
	<xsl:template name="AddAttributeRow">
		<xsl:param name="name"/>
		<xsl:param name="value"/>
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
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$value"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	
	<!--********************************************************************************************-->
	<!--* Utility template :  NLS_translationor NLS                                                      -->
	<!--*                          For translation of words and sentences.                               -->
	<!--*                          Default language is english (en) .                                        -->
	<!--********************************************************************************************-->
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