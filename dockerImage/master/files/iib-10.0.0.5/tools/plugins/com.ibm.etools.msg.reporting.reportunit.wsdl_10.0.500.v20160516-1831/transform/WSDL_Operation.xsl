<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

-->
<xsl:stylesheet version="1.0" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="fo ri">
	<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:key name="Element" match="xsd:element" use="@name"/>
	<xsl:key name="ComplexType" match="xsd:complexType" use="@name"/>
	<xsl:key name="WSDL_Message" match="wsdl:message" use="@name"/>
	<!--*********************************************************************-->
	<!-- template to create chapter  for rach operation                     -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:operation">
		<ri:chapter>
			<!--*************************************************************************************-->
			<!-- * operation header with name                                                             * -->
			<!--*************************************************************************************-->
			<fo:block xsl:use-attribute-sets="h4">
				<ri:heading>
					<xsl:value-of select="@name"/>
				</ri:heading>
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
			<!--*************************************************************************************-->
			<!-- * table for operation type                                                                    * -->
			<!--*************************************************************************************-->
			<fo:table table-layout="fixed" hyphenate="true" width="{$pagewidth}" text-align="left">
				<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
				<fo:table-column column-width="proportional-column-width({$Percent-L1}*100)"/>
				<fo:table-column column-width="proportional-column-width(20)"/>
				<fo:table-column column-width="proportional-column-width(77)"/>
				<fo:table-body>
					<!-- add row for namspace -->
					<xsl:call-template name="AddNameValueRow">
						<xsl:with-param name="name" select="'nlsOperationType'"/>
						<xsl:with-param name="value">
							<xsl:choose>
								<xsl:when test="wsdl:output">
									<xsl:call-template name="NLS_translation">
										<xsl:with-param name="var_original" select="'nlsRequestResponse'"/>
									</xsl:call-template>
								</xsl:when>
								<xsl:otherwise>
									<xsl:call-template name="NLS_translation">
										<xsl:with-param name="var_original" select="'nlsOneWay'"/>
									</xsl:call-template>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:with-param>
					</xsl:call-template>
				</fo:table-body>
			</fo:table>
			<fo:block xsl:use-attribute-sets="SpaceHalf"/>
			<fo:table table-layout="fixed" hyphenate="true" width="{$pagewidth}" text-align="left">
				<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
				<fo:table-column column-width="proportional-column-width({$Percent-L1}*100)"/>
				<fo:table-column column-width="proportional-column-width(20)"/>
				<fo:table-column column-width="proportional-column-width(38)"/>
				<fo:table-column column-width="proportional-column-width(38)"/>
				<!--fo:table-column column-width="proportional-column-width(15)"/-->
				<!--*************************************************************************************-->
				<!-- * call tempates for input, output, fault to chek if elements exist             * -->
				<!--*************************************************************************************-->
				<xsl:variable name="inputElements">
					<xsl:apply-templates select="wsdl:input" mode="queryElements"/>
				</xsl:variable>
				<xsl:variable name="outputElements">
					<xsl:apply-templates select="wsdl:output" mode="queryElements"/>
				</xsl:variable>
				<xsl:variable name="faultElements">
					<xsl:apply-templates select="wsdl:fault" mode="queryElements"/>
				</xsl:variable>
				<!--*************************************************************************************** -->
				<!-- * apply templates for input, output and fault to build the table rows            * -->
				<!--****************************************************************************************-->
				<xsl:choose>
					<xsl:when test="$inputElements = 'true'">
						<xsl:call-template name="MakeHeader"/>
					</xsl:when>
					<xsl:when test="$outputElements = 'true'">
						<xsl:call-template name="MakeHeader"/>
					</xsl:when>
					<xsl:when test="$faultElements = 'true'">
						<xsl:call-template name="MakeHeader"/>
					</xsl:when>
				</xsl:choose>
				<!--*********************************************************************-->
				<!-- template to handle operation input and output                    -->
				<!--*********************************************************************-->
				<fo:table-body>
					<!-- add row for each input variable -->
					<xsl:apply-templates select="wsdl:input">
						<xsl:with-param name="kind" select="'nlsInputs'"/>
					</xsl:apply-templates>
					<!-- add row for each output variable -->
					<xsl:apply-templates select="wsdl:output">
						<xsl:with-param name="kind" select="'nlsOutputs'"/>
					</xsl:apply-templates>
					<!-- add row for each fault variable -->
					<xsl:apply-templates select="wsdl:fault"/>
				</fo:table-body>
			</fo:table>
			<fo:block xsl:use-attribute-sets="SpaceHalf"/>
		</ri:chapter>
	</xsl:template>
	<!--*********************************************************************-->
	<!-- template to handle operation input and output                    -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:input | wsdl:output">
		<xsl:param name="kind"/>
		<xsl:choose>
			<!-- the variables of the operation is are references to a xsd:element of a xsd:complexType -->
			<xsl:when test="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@element">
				<!-- get the message name and select the corresponding input variable -->
				<xsl:variable name="MessageElement" select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@element"/>
				<xsl:variable name="MessageElementName" select="substring-after($MessageElement,':')"/>
				<!-- *** create row for each varaiable -->
				<xsl:choose>
					<xsl:when test="key('Element',$MessageElementName)/xsd:complexType/xsd:sequence/xsd:element | key('ComplexType',$MessageElementName)/xsd:sequence/xsd:element">
						<xsl:apply-templates select="key('Element',$MessageElementName)/xsd:complexType/xsd:sequence/xsd:element">
							<xsl:with-param name="kind" select="$kind"/>
						</xsl:apply-templates>
						<xsl:apply-templates select="key('ComplexType',$MessageElementName)/xsd:sequence/xsd:element">
							<xsl:with-param name="kind" select="$kind"/>
						</xsl:apply-templates>
					</xsl:when>
					<xsl:otherwise>
						<xsl:apply-templates select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part">
							<xsl:with-param name="kind" select="$kind"/>
						</xsl:apply-templates>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:when>
			<xsl:otherwise>
				<!-- the variables of the operation is directly containes in the message -->
				<xsl:apply-templates select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part">
					<xsl:with-param name="kind" select="$kind"/>
				</xsl:apply-templates>
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<!--*********************************************************************-->
	<!-- template to check if input or output contains elements       -->
	<!--   "return": 'true' when elements exists                               -->
	<!--                'false' when NO elements exists                        -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:input | wsdl:output" mode="queryElements">
		<!-- get the message name and select the corresponding input variable -->
		<xsl:variable name="MessageElement" select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@element"/>
		<xsl:variable name="MessageElementName" select="substring-after($MessageElement,':')"/>
		<xsl:choose>
			<xsl:when test="key('Element',$MessageElementName)/xsd:complexType/xsd:sequence/xsd:element">true</xsl:when>
			<xsl:when test="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@type">true</xsl:when>
			<xsl:when test="key('WSDL_Message', substring-after(@message,':'))/wsdl:part">true</xsl:when>
			<xsl:otherwise>false</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
	<!--*********************************************************************-->
	<!-- template to handle fault                                                    -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:fault">
		<!-- get the message name and select the corresponding input variable -->
		<xsl:variable name="MessageElement" select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@element"/>
		<xsl:variable name="MessageElementName" select="substring-after($MessageElement,':')"/>
		<xsl:call-template name="MakeVariableRow">
			<xsl:with-param name="kind">
				<xsl:choose>
					<xsl:when test="position() = 1">nlsFaults</xsl:when>
					<xsl:otherwise/>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="name">
				<xsl:choose>
					<xsl:when test="@name">
						<xsl:value-of select="@name"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@name"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="type">
				<xsl:choose>
					<xsl:when test="key('Element', $MessageElementName)/@type">
						<xsl:value-of select="key('Element', $MessageElementName)/@type"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="key('WSDL_Message', substring-after(@message,':'))/wsdl:part/@type"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="isArray" select="''"/>
			<xsl:with-param name="isLast">
				<xsl:choose>
					<xsl:when test="following-sibling::*">false
						<!--xsl:choose>
							<xsl:when test="following-sibling::* = ''">true</xsl:when>
							<xsl:otherwise>false</xsl:otherwise>
						</xsl:choose-->
					</xsl:when>
					<xsl:otherwise>true</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="isFirst">
				<xsl:choose>
					<xsl:when test="position() = 1">true</xsl:when>
					<xsl:otherwise>false</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	<!--*********************************************************************-->
	<!-- template to check if a foult elemengt exists                       -->
	<!--   "return": 'true' when fault elements exists                        -->
	<!--                'false' when NO fault elements exists                 -->
	<!--*********************************************************************-->
	<xsl:template match="wsdl:fault" mode="queryElements">true</xsl:template>
	<!--*********************************************************************-->
	<!-- template to create row for each variables                            -->
	<!-- with it's name, type and isArray                                        -->
	<!--*********************************************************************-->
	<xsl:template match="xsd:complexType/xsd:sequence/xsd:element | wsdl:part">
		<xsl:param name="kind"/>
		<xsl:call-template name="MakeVariableRow">
			<xsl:with-param name="kind">
				<xsl:choose>
					<xsl:when test="position() = 1">
						<xsl:value-of select="$kind"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="''"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="name">
				<xsl:choose>
					<xsl:when test="@name">
						<xsl:value-of select="@name"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="ancestor::*/@name"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="type">
				<!-- check here if type is empty, when yes search for the element and get its type-->
				<xsl:choose>
					<xsl:when test="@type">
						<xsl:value-of select="@type"/>
					</xsl:when>
					<xsl:when test="@ref">
						<xsl:value-of select="@ref"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="key('Element',substring-after(@element,':'))/@type"/>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="isArray">
				<xsl:choose>
					<xsl:when test="@maxOccurs = 'unbounded'">
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsTrue'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsFalse'"/>
						</xsl:call-template>
					</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="isLast">
				<xsl:choose>
					<xsl:when test="following-sibling::*">false</xsl:when>
					<xsl:otherwise>true</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
			<xsl:with-param name="isFirst">
				<xsl:choose>
					<xsl:when test="position() = 1">true</xsl:when>
					<xsl:otherwise>false</xsl:otherwise>
				</xsl:choose>
			</xsl:with-param>
		</xsl:call-template>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create a variable row
        *               
	    ********************************************************************************************-->
	<xsl:template name="MakeVariableRow">
		<xsl:param name="kind"/>
		<xsl:param name="name"/>
		<xsl:param name="type"/>
		<xsl:param name="isArray"/>
		<xsl:param name="isLast"/>
		<xsl:param name="isFirst"/>
		<xsl:variable name="border_top_style">
			<xsl:choose>
				<xsl:when test="$isFirst = 'true'">solid</xsl:when>
				<xsl:otherwise>none</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<xsl:variable name="border_bottom_style">
			<xsl:choose>
				<xsl:when test="$isLast = 'true'">solid</xsl:when>
				<xsl:otherwise>none</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<fo:table-row>
			<!-- first unvisible cell for indentation -->
			<fo:table-cell padding="2pt" border-color="{$borderColor}">
				<fo:block>
				</fo:block>			
			</fo:table-cell>
			<!-- *** kind of operation: input/output/fault ***-->
			<fo:table-cell border-left-style="solid" border-right-style="solid" border-top-style="{$border_top_style}" border-bottom-style="{$border_bottom_style}" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="$kind"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<!-- *** variable name ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$name"/>
				</fo:block>
			</fo:table-cell>
			<!-- *** variable type ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$type"/>
				</fo:block>
			</fo:table-cell>
			<!-- *** is array ***-->
			<!--
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$isArray"/>
				</fo:block>
			</fo:table-cell>
			-->
		</fo:table-row>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create a header cell for the element / attribute table
        *               
	    ********************************************************************************************-->
	<xsl:template name="MakeHeaderCell">
		<xsl:param name="text"/>
		<fo:table-cell border="solid" padding="2pt" background-color="{$tableHeaderBackgroundColor}" border-color="{$borderColor}">
			<fo:block xsl:use-attribute-sets="DefinitionText">
				<xsl:call-template name="NLS_translation">
					<xsl:with-param name="var_original" select="$text"/>
				</xsl:call-template>
			</fo:block>
		</fo:table-cell>
	</xsl:template>
	<xsl:template name="MakeHeader">
		<!-- *** create the header column *** -->
		<fo:table-header>
			<fo:table-row>
				<!-- first unvisible cell for indentation -->
				<fo:table-cell padding="2pt">
					<fo:block/>
				</fo:table-cell>
				<!-- *** Input/output/fault ***-->
				<xsl:call-template name="MakeHeaderCell">
					<xsl:with-param name="text" select="'nlsOperation'"/>
				</xsl:call-template>
				<!-- *** variable name ***-->
				<xsl:call-template name="MakeHeaderCell">
					<xsl:with-param name="text" select="'nlsName'"/>
				</xsl:call-template>
				<!-- *** variable type ***-->
				<xsl:call-template name="MakeHeaderCell">
					<xsl:with-param name="text" select="'nlsType'"/>
				</xsl:call-template>
				<!-- *** isArray ***-->
				<!--
				<xsl:call-template name="MakeHeaderCell">
					<xsl:with-param name="text" select="'nlsArray'"/>
				</xsl:call-template>
				-->
			</fo:table-row>
		</fo:table-header>
	</xsl:template>
</xsl:stylesheet>
