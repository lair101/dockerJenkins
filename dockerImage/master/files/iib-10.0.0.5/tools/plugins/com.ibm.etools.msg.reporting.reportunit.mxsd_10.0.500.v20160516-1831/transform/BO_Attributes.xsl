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
	<!-- key to select nodes "xsd:element" by its attributre "@name"-->
	<xsl:key name="Elements" match="xsd:element" use="@name"/>
	<xsl:key name="Group" match="xsd:group" use="@name"/>
	<xsl:key name="AttributeGroup" match="xsd:attributeGroup" use="@name"/>

	<xsl:template name="HandleAttributeRow">
		<fo:table-row>
			<!-- first unvisible dummy row for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<!-- *** attribute name ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:choose>
						<xsl:when test="@name">
							<xsl:value-of select="@name"/>
						</xsl:when>
						<xsl:when test="@ref">
							<xsl:value-of select="substring-after(@ref,':')"/>
						</xsl:when>
					</xsl:choose>
				</fo:block>
			</fo:table-cell>
			<!-- *** attribute type ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<!-- *** attribute has either @type attribute or a refenece to an element or a simpleType***-->
					<xsl:choose>
						<xsl:when test="@type != ''">
							<xsl:value-of select="@type"/>
						</xsl:when>
						<xsl:when test="@ref">
							<xsl:choose>
								<xsl:when test="key('Elements', substring-after(@ref,':'))/@type">
									<!--xsl:value-of select="substring-after(key('Elements', substring-after(@ref,':'))/@type,':')"/-->
									<xsl:value-of select="key('Elements', substring-after(@ref,':'))/@type"/>
								</xsl:when>
								<xsl:otherwise>
									<xsl:value-of select="@ref"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="xsd:simpleType/xsd:restriction/@base">
							<xsl:value-of select="xsd:simpleType/xsd:restriction/@base"/>
						</xsl:when>
						<xsl:when test="xsd:complexType and not(xsd:complexType/@name)">
							<xsl:value-of select="@name"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="'xsd:anyType'"/>
						</xsl:otherwise>
					</xsl:choose>
				</fo:block>
			</fo:table-cell>
			<!-- *** attribute default value ***-->
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@default"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>

	<!---->
	<xsl:template name="HandleAttributeTable">
		<fo:block xsl:use-attribute-sets="Space1"/>
		<!-- *** header with attribute name *** -->
		<fo:block xsl:use-attribute-sets="SpaceHalf SubHeaderL1">
			<xsl:choose>
				<xsl:when test="@name">
					<xsl:value-of select="@name"/>
				</xsl:when>
				<xsl:when test="@ref">
					<xsl:value-of select="substring-after(@ref,':')"/>
				</xsl:when>
			</xsl:choose>
		</fo:block>
		<!-- *** element documentation *** -->
		<xsl:if test="xsd:annotation/xsd:documentation">
			<fo:block xsl:use-attribute-sets="Space1 DescAndDocTextL2">
				<xsl:apply-templates select="xsd:annotation/xsd:documentation"/>
			</fo:block>
		</xsl:if>
		<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
			<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
			<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
			<fo:table-column column-width="proportional-column-width(30)"/>
			<fo:table-column column-width="proportional-column-width(70)"/>
			<fo:table-body>
				<!-- ************************ add row: element Type -->
				<xsl:variable name="attributeType">
					<xsl:choose>
						<xsl:when test="@type != ''">
							<!--xsl:value-of select="substring-after(@type,':')"/-->
							<xsl:value-of select="@type"/>
						</xsl:when>
						<xsl:when test="@ref">
							<xsl:choose>
								<xsl:when test="key('Elements', substring-after(@ref,':'))/@type">
									<!--xsl:value-of select="substring-after(key('Elements', substring-after(@ref,':'))/@type,':')"/-->
									<xsl:value-of select="key('Elements', substring-after(@ref,':'))/@type"/>
								</xsl:when>
								<xsl:otherwise>
									<!--xsl:value-of select="substring-after(@ref,':')"/-->
									<xsl:value-of select="@ref"/>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:when>
						<xsl:when test="substring-after(xsd:simpleType/xsd:restriction/@base,':')">
							<!--xsl:value-of select="substring-after(xsd:simpleType/xsd:restriction/@base,':')"/-->
							<xsl:value-of select="xsd:simpleType/xsd:restriction/@base"/>
						</xsl:when>
						<xsl:when test="xsd:complexType and not(xsd:complexType/@name)">
							<xsl:value-of select="@name"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="'xsd:anyType'"/>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:call-template name="AddAttributeRow">
					<xsl:with-param name="name" select="'nlsAttributeType'"/>
					<xsl:with-param name="value" select="$attributeType"/>
				</xsl:call-template>
				<!-- ************************ add row: List: yes or No  -->
				<xsl:variable name="attributeList">
					<xsl:choose>
						<xsl:when test="@maxOccurs = 'unbounded'">
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsYes'"/>
							</xsl:call-template>
						</xsl:when>
						<xsl:when test="@maxOccurs > '1'">
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsYes'"/>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsNo'"/>
							</xsl:call-template>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:call-template name="AddAttributeRow">
					<xsl:with-param name="name" select="'nlsAttributeList'"/>
					<xsl:with-param name="value" select="$attributeList"/>
				</xsl:call-template>
				<!-- ************************ add row: Required -->
				<xsl:variable name="required">
					<xsl:choose>
						<xsl:when test="@minOccurs = 0">
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsNo'"/>
							</xsl:call-template>
						</xsl:when>
						<xsl:otherwise>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsYes'"/>
							</xsl:call-template>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:call-template name="AddAttributeRow">
					<xsl:with-param name="name" select="'nlsRequired'"/>
					<xsl:with-param name="value" select="$required"/>
				</xsl:call-template>
				<!-- ************************ add row: Min Occurs  -->
				<xsl:variable name="minOccurs">
					<xsl:choose>
						<xsl:when test="@minOccurs">
							<xsl:value-of select="@minOccurs"/>
						</xsl:when>
						<xsl:otherwise>1</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:call-template name="AddAttributeRow">
					<xsl:with-param name="name" select="'nlsMinOccurs'"/>
					<xsl:with-param name="value">
						<xsl:value-of select="$minOccurs"/>
					</xsl:with-param>
				</xsl:call-template>
				<!-- ************************ add row: Max Occurs  -->
				<xsl:variable name="maxOccurs">
					<xsl:choose>
						<xsl:when test="@maxOccurs">
							<xsl:value-of select="@maxOccurs"/>
						</xsl:when>
						<xsl:otherwise>1</xsl:otherwise>
					</xsl:choose>
				</xsl:variable>
				<xsl:call-template name="AddAttributeRow">
					<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
					<xsl:with-param name="value">
						<xsl:value-of select="$maxOccurs"/>
					</xsl:with-param>
				</xsl:call-template>
				<!-- ************************ add row: Min Length  -->
				<xsl:if test="xsd:simpleType/xsd:restriction/xsd:minLength/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMinLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:minLength/@value"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: Max Length exclusive  -->
				<xsl:if test="xsd:simpleType/xsd:restriction/xsd:maxLength/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMaxLength'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:maxLength/@value"/>
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: minInclusive  -->
				<xsl:if test="xsd:simpleType/xsd:restriction/xsd:minInclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMinValue'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:minInclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsInclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: maxInclusive  -->
				<xsl:if test="xsd:simpleType/xsd:restriction/xsd:maxInclusive/@value">
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsMaxValue'"/>
						<xsl:with-param name="value">
							<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:maxInclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsInclusive'"/>
							</xsl:call-template> )
						</xsl:with-param>
					</xsl:call-template>
				</xsl:if>
				<!-- ************************ add row: minExclusive  -->
				<xsl:choose>
					<xsl:when test="xsd:simpleType/xsd:restriction/xsd:minExclusive/@value">
						<xsl:call-template name="AddAttributeRow">
							<xsl:with-param name="name" select="'nlsMinValue'"/>
							<xsl:with-param name="value">
								<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:minExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsExclusive'"/>
								</xsl:call-template> )
						</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:minExclusive/@value">
						<xsl:call-template name="AddAttributeRow">
							<xsl:with-param name="name" select="'nlsMinValue'"/>
							<xsl:with-param name="value">
								<xsl:value-of select="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:minExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsExclusive'"/>
								</xsl:call-template> )
						</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
				</xsl:choose>
				<!-- ************************ add row: maxExclusive  -->
				<xsl:choose>
					<xsl:when test="xsd:simpleType/xsd:restriction/xsd:maxExclusive/@value">
						<xsl:call-template name="AddAttributeRow">
							<xsl:with-param name="name" select="'nlsMaxValue'"/>
							<xsl:with-param name="value">
								<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:maxExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsExclusive'"/>
								</xsl:call-template> )
						</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:maxExclusive/@value">
						<xsl:call-template name="AddAttributeRow">
							<xsl:with-param name="name" select="'nlsMaxValue'"/>
							<xsl:with-param name="value">
								<xsl:value-of select="key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:maxExclusive/@value"/> (
							<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsInclusive'"/>
								</xsl:call-template> )
						</xsl:with-param>
						</xsl:call-template>
					</xsl:when>
				</xsl:choose>
				<!-- ************************ add row: whitespace handling  -->
				<xsl:if test="xsd:simpleType/xsd:restriction/xsd:whiteSpace/@value">
					<xsl:variable name="whiteSpace">
						<xsl:value-of select="xsd:simpleType/xsd:restriction/xsd:whiteSpace/@value"/>
					</xsl:variable>
					<xsl:call-template name="AddAttributeRow">
						<xsl:with-param name="name" select="'nlsWhiteSpace'"/>
						<xsl:with-param name="value" select="$whiteSpace"/>
					</xsl:call-template>
				</xsl:if>
			</fo:table-body>
		</fo:table>
		<!-- ************************call template to create the restriction (only permit certain values) table  -->
		<xsl:if test="xsd:simpleType/xsd:restriction/xsd:enumeration | xsd:simpleType/xsd:restriction/xsd:pattern | key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:enumeration | key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:pattern">
			<xsl:variable name="permit">
				<xsl:choose>
					<xsl:when test="xsd:simpleType/xsd:restriction/xsd:enumeration | key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:enumeration">
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsEnumeration'"/>
						</xsl:call-template>
					</xsl:when>
					<xsl:when test="xsd:simpleType/xsd:restriction/xsd:pattern | key('sTypes', substring-after(@type,':'))/xsd:restriction/xsd:pattern">
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
	
	<!---->
	<!--********************************************************************************************
		* Utility Templates
        *                   
	    ********************************************************************************************-->
	<!---->
	<!--*******************************************************************************************************
		* Utility template :  Create row in the elemen / attribute table for each element / attribute
        *               
	    ********************************************************************************************************-->
	<xsl:template name="AddAttributeRow">
		<xsl:param name="name"/>
		<xsl:param name="value"/>
		<xsl:param name="default"/>
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
					<xsl:choose>
					<xsl:when test="$value">
						<xsl:value-of select="$value"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$default"/>
					</xsl:otherwise>
					</xsl:choose>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<xsl:template name="AddAttributeRowHardcoded">
		<xsl:param name="name"/>
		<xsl:param name="value"/>
		<xsl:param name="default"/>
		<fo:table-row>
			<!-- first empty column, invisible cell for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="$name"/>
				</fo:block>
			</fo:table-cell>
			<!-- column for property value -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:choose>
					<xsl:when test="$value">
						<xsl:value-of select="$value"/>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="$default"/>
					</xsl:otherwise>
					</xsl:choose>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<xsl:template name="AddEmptyRow">
		<fo:table-row>
			<!-- first empty column, invisible cell for indentation -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="Space1"/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="Space1"/>
			</fo:table-cell>
			<!-- column for property value -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="Space1"/>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<xsl:template name="AddDocumentationRowNoTitle">
		<xsl:param name="value"/>
		<fo:table-row>
			<!-- first empty column, invisible cell for indentation -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="Space1"/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="Space1"/>
			</fo:table-cell>
			<!-- column for property value -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DescAndDocTextL1">
					<xsl:choose>
					<xsl:when test="$value">
						<xsl:call-template name="decode">
						<xsl:with-param name="text" select="$value"/>
					</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="'None'"/>
					</xsl:otherwise>
					</xsl:choose>					
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<xsl:template name="AddDocumentationRow">
		<xsl:param name="value"/>
		<fo:table-row>
			<!-- first empty column, invisible cell for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsDocumentation'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<!-- column for property value -->
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DescAndDocTextL1">
					<xsl:choose>
					<xsl:when test="$value">
						<xsl:call-template name="decode">
						<xsl:with-param name="text" select="$value"/>
					</xsl:call-template>
					</xsl:when>
					<xsl:otherwise>
						<xsl:value-of select="'None'"/>
					</xsl:otherwise>
					</xsl:choose>					
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<xsl:template name="decode">
  	<xsl:param name="text" />
		<xsl:value-of disable-output-escaping="yes" select="concat('&lt;','![CDATA[')"/>
  			<xsl:call-template name="decodespecial">
  				<xsl:with-param name="text">
  					<xsl:call-template name="decodespecial">
  						<xsl:with-param name="text">
  							<xsl:call-template name="decodespecial">
  								<xsl:with-param name="text" select="$text" />
  								<!--
	  							<xsl:call-template name="decodespecial">
  									<xsl:with-param name="text" select="$text" />
  									<xsl:with-param name="special" select="&lt;" />
  									<xsl:with-param name="replace">&amp;lt;</xsl:with-param>
  								</xsl:call-template>
  								-->
  								<xsl:with-param name="special" select="'\r\n'" />
  								<xsl:with-param name="replace"><xsl:value-of disable-output-escaping="yes" select="'&#13;'" /></xsl:with-param>
  							</xsl:call-template>
  						</xsl:with-param>
  						<xsl:with-param name="special" select="'\t'" />
  						<xsl:with-param name="replace" select="' '" />
  					</xsl:call-template>
  				</xsl:with-param>
  				<xsl:with-param name="special" select="'\s'" />
  				<xsl:with-param name="replace" select="' '" />
  			</xsl:call-template>
  		<xsl:value-of disable-output-escaping="yes" select="concat(']]','&gt;')"/>		
  </xsl:template>

<!--
 #####   ######   ####    ####   #####   ######   ####   #####   ######   ####  
 #    #  #       #    #  #    #  #    #  #       #       #    #  #       #    # 
 #    #  #####   #       #    #  #    #  #####    ####   #    #  #####   #      
 #    #  #       #       #    #  #    #  #            #  #####   #       #      
 #    #  #       #    #  #    #  #    #  #       #    #  #       #       #    # 
 #####   ######   ####    ####   #####   ######   ####   #       ######   ####  
-->
  <xsl:template name="decodespecial">
  	<xsl:param name="text" select="'No text supplied.'" />
  	<xsl:param name="special" select="'x'" />
  	<xsl:param name="replace" select="'X'" />

  	<xsl:variable name="sb" select="substring-before($text,$special)" />
  	<xsl:variable name="sa" select="substring-after($text,$special)" />

  	<xsl:choose>
  		<xsl:when test="$sb and $sa">
  			<xsl:call-template name="decodespecial">
  				<xsl:with-param name="text" select="$sb" />
  				<xsl:with-param name="special" select="$special" />
				<xsl:with-param name="replace" select="$replace" />
  			</xsl:call-template>
  			<xsl:value-of disable-output-escaping="yes" select="$replace" />
  			<xsl:call-template name="decodespecial">
  				<xsl:with-param name="text" select="$sa" />
  				<xsl:with-param name="special" select="$special" />
				<xsl:with-param name="replace" select="$replace" />
  			</xsl:call-template>
  		</xsl:when>
  		<xsl:when test="$sb">
  			<xsl:call-template name="decodespecial">
  				<xsl:with-param name="text" select="$sb" />
  				<xsl:with-param name="special" select="$special" />
				<xsl:with-param name="replace" select="$replace" />
  			</xsl:call-template>
  		</xsl:when>
  		<xsl:when test="$sa">
  			<xsl:call-template name="decodespecial">
  				<xsl:with-param name="text" select="$sa" />
  				<xsl:with-param name="special" select="$special" />
				<xsl:with-param name="replace" select="$replace" />
  			</xsl:call-template>
  		</xsl:when>
  		<xsl:otherwise>
  			<xsl:value-of disable-output-escaping="yes" select="$text" />
  		</xsl:otherwise>
  	</xsl:choose>
  </xsl:template>
</xsl:stylesheet>
