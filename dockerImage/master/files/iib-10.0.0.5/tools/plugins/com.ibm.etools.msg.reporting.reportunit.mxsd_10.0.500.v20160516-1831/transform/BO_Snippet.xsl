<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:svg="http://www.w3.org/2000/svg" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:java="http://xml.apache.org/xalan/java" extension-element-prefixes="java" exclude-result-prefixes="fo ri svg">
	<!---->
	
	<!--include files-->
	<xsl:include href="BO_Parameters.xsl"/>
	<xsl:include href="Common_Parameters.xsl"/>
	<xsl:include href="Common_AttributeSets.xsl"/>
	<xsl:include href="BO_OverviewGraphic.xsl"/>
	<xsl:include href="BO_Attributes.xsl"/>
	<xsl:include href="BO_Restrictions.xsl"/>
	<xsl:include href="BO_SimpleType.xsl"/>
	<xsl:include href="BO_Namespaces.xsl"/>
	<!---->
	<xsl:template match="/">
		<fo:flow flow-name="plugin-body">
			<xsl:apply-templates select="//xsd:schema"/>
		</fo:flow>
	</xsl:template>
	
	<xsl:variable name="namespaceTarget">
  	<xsl:choose>
  		<xsl:when test="/xsd:schema/@targetNamespace">
  			<xsl:value-of select="/xsd:schema/@targetNamespace"/>
  		</xsl:when>
  	</xsl:choose>
  </xsl:variable>
	
  <xsl:variable name="namespacePrefix">
  	<xsl:choose>
  		<xsl:when test="/xsd:schema/@targetNamespace">
			<xsl:for-each select="/xsd:schema/namespace::*">
				<xsl:if test="self::node() = $namespaceTarget">
		  			<xsl:value-of select="local-name()"/>
				</xsl:if>
			</xsl:for-each>
  		</xsl:when>
  	</xsl:choose>
  </xsl:variable>
  
	<!--***********************************************************************************-->
	<!--*  Template: for root element xsd:schema                                            -->
	<!--**********************************************************************************	-->
	<xsl:template match="xsd:schema">
		<!--******************************************************************************************-->
				<!--*  The whole XSD files should be reported.                                                    -->
				<!--*  Insert chapter and header for Datatypes chapter containg the XSD file name -->
				<!--******************************************************************************************-->
				<ri:chapter>
					<fo:block xsl:use-attribute-sets="h1">
						<ri:heading>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsMessageDefinitionFile'"/>
							</xsl:call-template>
							<fo:leader xsl:use-attribute-sets="InlineSpace1"/> "<xsl:value-of select="$XSD_FileName"/>"</ri:heading>	
							</fo:block>						
							<fo:block >
							<xsl:value-of select="$XSD_FileLocation"/>
						</fo:block>	
							<fo:block xsl:use-attribute-sets="Space1"/>							
							<ri:chapter>
							<fo:block xsl:use-attribute-sets="h1">
							<ri:heading>
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsSettings'"/>
							</xsl:call-template>							
							</ri:heading>
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
									<xsl:with-param name="name" select="'nlsPrefix'"/>
									<xsl:with-param name="value" select="$namespacePrefix"/>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsTargetNamespace'"/>
									<xsl:with-param name="value" select="$namespaceTarget"/>									
								</xsl:call-template>	
								<xsl:call-template name="AddEmptyRow"/>	
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsLocalElements'"/>
									<xsl:with-param name="value">
									<xsl:choose>
						  				<xsl:when test="@elementFormDefault='qualified'">
						  					<xsl:value-of select="$namespaceTarget"/>
						  				</xsl:when>
						  				<xsl:otherwise>
							  				<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
											</xsl:call-template>
						  				</xsl:otherwise>
						  			</xsl:choose>
									</xsl:with-param>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsLocalAttributes'"/>
									<xsl:with-param name="value">
										<xsl:choose>
							  				<xsl:when test="@attributeFormDefault='qualified'">
							  					<xsl:value-of select="$namespaceTarget"/>
							  				</xsl:when>
							  				<xsl:otherwise>
							  					<xsl:call-template name="NLS_translation">
													<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
												</xsl:call-template>
							  				</xsl:otherwise>
							  			</xsl:choose>
									</xsl:with-param>									
								</xsl:call-template>	
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsDefaultBlock'"/>
									<xsl:with-param name="value" select="@blockDefault"/>
									<xsl:with-param name="default" select="'None'"/>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsDefaultFinal'"/>
									<xsl:with-param name="value" select="@finalDefault"/>
									<xsl:with-param name="default" select="'None'"/>								
								</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>														
								</fo:table-body>
							</fo:table>
						
							</fo:block>
							</ri:chapter>	
					
					
					<xsl:call-template name="messages" />
					<xsl:call-template name="types" />
					<xsl:call-template name="groups" />
					<xsl:call-template name="elementsAndAttributes" />
					
				</ri:chapter>
	</xsl:template>
	
	<xsl:template name="messages">
	<ri:chapter>
		<fo:block xsl:use-attribute-sets="Space2"/>
		<fo:block xsl:use-attribute-sets="h1">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsMessages'"/>
					</xsl:call-template>				
				</ri:heading>
			</fo:block>

    <xsl:for-each select="/xsd:schema/xsd:element//*[local-name()='MRMessage']">
		<xsl:apply-templates select="." mode="message"/>
	</xsl:for-each>
	</ri:chapter>
  </xsl:template>
  
    <xsl:template match="*[local-name()='MRMessage']" mode="message">

  	<xsl:variable name="atname" select="ancestor::xsd:element/@name" />

  	<xsl:variable name="attype">
  		<xsl:choose>
  			<xsl:when test="ancestor::xsd:element/xsd:complexType">
	  			<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsLocalComplexType'"/>
					</xsl:call-template>
  			</xsl:when>
  			<xsl:when test="ancestor::xsd:element/@type">
  				<xsl:for-each select="ancestor::xsd:element">
					<xsl:call-template name="getelementtype"/>
  				</xsl:for-each>
  			</xsl:when>
  			<xsl:otherwise>
  				<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsNoType'"/>
					</xsl:call-template>
  			</xsl:otherwise>
  		</xsl:choose>
  	</xsl:variable>
  	 	
	<xsl:for-each select="ancestor::xsd:element">
		<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="concat($atname,' (',$attype,')')"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsMessageAlias'"/>
									<xsl:with-param name="value" select=".//@messageAlias"/>
									<xsl:with-param name="default" select="'None'"/>
								</xsl:call-template>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
				</fo:block>
			</fo:block>
		</ri:chapter>
	</xsl:for-each> 	

  </xsl:template>
  
    	<xsl:template name="getelementtype">
	<xsl:choose>
		<xsl:when test="xsd:simpleType/xsd:restriction/@base">
  			<xsl:value-of select="concat(xsd:simpleType/xsd:restriction/@base,' -')" />
		</xsl:when>
		<xsl:when test="xsd:simpleType/xsd:list/@itemType">
  			<xsl:value-of select="concat(xsd:simpleType/xsd:list/@itemType,' -')" />
		</xsl:when>
		<xsl:when test="xsd:simpleType/xsd:union">
  			<xsl:value-of select="concat('union',' -')" />
		</xsl:when>
		<xsl:when test="xsd:complexType/xsd:simpleContent">
  			<xsl:value-of select="concat(xsd:complexType/xsd:simpleContent/xsd:extension/@base,' +')" />
		</xsl:when>
		<xsl:when test="xsd:complexType/xsd:complexContent/xsd:extension/@base">
  			<xsl:value-of select="concat(xsd:complexType/xsd:complexContent/xsd:extension/@base,' +')" />
		</xsl:when>
		<xsl:when test="xsd:complexType/xsd:complexContent/xsd:restriction/@base">
  			<xsl:value-of select="concat(xsd:complexType/xsd:complexContent/xsd:restriction/@base,' -')" />
		</xsl:when>
		<xsl:when test="xsd:complexType">
  			<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsLocalComplexType'"/>
					</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="@type" />
		</xsl:otherwise>
	</xsl:choose>
	</xsl:template>
	
	<xsl:template name="types">

		<ri:chapter>
		<fo:block xsl:use-attribute-sets="Space2"/>
		<fo:block xsl:use-attribute-sets="h1">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsTypes'"/>
					</xsl:call-template>				
				</ri:heading>
			</fo:block>

    <xsl:for-each select="/xsd:schema/xsd:complexType | /xsd:schema/xsd:simpleType">
      <xsl:apply-templates select="."/>
    </xsl:for-each>
    </ri:chapter>
  </xsl:template>
  
    <xsl:template match="xsd:complexType">
  	
  	<xsl:variable name="myname">
  		<xsl:choose>
  			<xsl:when test="@name">
  				<xsl:value-of select="@name" />
  			</xsl:when>
  			<xsl:otherwise>
  				  	<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsLocalComplexType'"/>
					</xsl:call-template>
  			</xsl:otherwise>
  		</xsl:choose>
  	</xsl:variable>

  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$myname"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsBaseType'"/>
									<xsl:with-param name="value">
									<xsl:choose>
						  				<xsl:when test="xsd:simpleContent/xsd:extension/@base">
					  						<xsl:value-of select="xsd:simpleContent/xsd:extension/@base" />
						  				</xsl:when>
						  				<xsl:when test="xsd:complexContent/xsd:extension/@base">
						  					<xsl:value-of select="xsd:complexContent/xsd:extension/@base" />
						  				</xsl:when>
						  				<xsl:when test="xsd:complexContent/xsd:restriction/@base">
						  					<xsl:value-of select="xsd:complexContent/xsd:restriction/@base" />
						  				</xsl:when>
						  				<xsl:otherwise>
						  					<xsl:value-of select="'None'" />
						  				</xsl:otherwise>
						  			</xsl:choose>
									</xsl:with-param>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsDerivedBy'"/>
									<xsl:with-param name="value">
									<xsl:choose>
						  				<xsl:when test="xsd:complexContent/xsd:extension|xsd:simpleContent/xsd:extension">
						  					<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsExtension'"/>
											</xsl:call-template>
						  				</xsl:when>
						  				<xsl:otherwise>
						  					<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsRestriction'"/>
											</xsl:call-template>
						  				</xsl:otherwise>
						  			</xsl:choose>
									</xsl:with-param>
								</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name">
									<xsl:choose>
										<xsl:when test="xsd:group[@ref]">
							  				<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsGroupReference'"/>
											</xsl:call-template>
								  		</xsl:when>
								  		<xsl:otherwise>
								  			<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsLocalGroup'"/>
											</xsl:call-template>
								  		</xsl:otherwise>
								  	</xsl:choose>
									</xsl:with-param>
									<xsl:with-param name="value">
									<xsl:choose>
										  		<xsl:when test="xsd:annotation/xsd:appinfo/MRComplexType/@composition">
										  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRComplexType/@composition" />										  			
										  		</xsl:when>
										  		<xsl:when test="xsd:all">
										  			<xsl:value-of select="'all'" />
										  		</xsl:when>
										  		<xsl:when test="xsd:choice">
										  			<xsl:value-of select="'choice'" />
										  		</xsl:when>
										  		<xsl:when test="xsd:sequence">
										  			<xsl:value-of select="'sequence'" />
										  		</xsl:when>
										  		<xsl:when test="xsd:complexContent/*/xsd:sequence">
										  			<xsl:value-of select="'sequence'" />
										  		</xsl:when>
										  		<xsl:when test="xsd:complexContent/*/xsd:choice">
										  			<xsl:value-of select="'choice'" />
										  		</xsl:when>
										  		<xsl:when test="xsd:group[@ref]">
										  			<xsl:value-of select="xsd:group/@ref" />
										  		</xsl:when>
										  		<xsl:otherwise>
										  			<xsl:value-of select="'empty'" />
										  		</xsl:otherwise>
										  	</xsl:choose>
									</xsl:with-param>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsContentValidation'"/>
									<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/*[local-name()='MRComplexType']/@content"/>	
									<xsl:with-param name="default" select="'closed'"/>
								</xsl:call-template>
								<xsl:call-template name="AddAttributeRow">
									<xsl:with-param name="name" select="'nlsMixed'"/>
									<xsl:with-param name="value" select="@mixed"/>	
									<xsl:with-param name="default" select="'false'"/>								
								</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:choose>
									<xsl:when test="xsd:sequence">
									  	<xsl:for-each select="xsd:sequence">
										  	<xsl:call-template name="AddEmptyRow"/>										  	
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>																				
											</xsl:call-template>
									  	</xsl:for-each>
									</xsl:when>
									<xsl:when test="xsd:group/@ref">
									  	<xsl:for-each select="xsd:group">
									  		<xsl:call-template name="AddEmptyRow"/>										  	
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>		
												<xsl:with-param name="default" select="'1'"/>							
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>		
												<xsl:with-param name="default" select="'1'"/>																			
											</xsl:call-template>
									  	</xsl:for-each>
									</xsl:when>
									<xsl:when test="xsd:complexContent/*/xsd:sequence or xsd:complexContent/*/xsd:choice">
									  	<xsl:for-each select="xsd:complexContent/*/xsd:sequence | xsd:complexContent/*/xsd:choice">
									  		<xsl:call-template name="AddEmptyRow"/>										  	
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>																				
											</xsl:call-template>
									  	</xsl:for-each>
									</xsl:when>
								</xsl:choose>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsFinal'"/>
												<xsl:with-param name="value" select="@final"/>	
												<xsl:with-param name="default" select="'None'"/>									
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsBlock'"/>
												<xsl:with-param name="value" select="@block"/>
												<xsl:with-param name="default" select="'None'"/>									
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsAbstract'"/>
												<xsl:with-param name="value" select="@abstract"/>
												<xsl:with-param name="default" select="'false'"/>
											</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
				</fo:block>
			</fo:block>
			<xsl:for-each select="*">
  		<xsl:choose>
  			<xsl:when test="local-name()='sequence' or local-name()='choice' or local-name()='all' or local-name()='group'">
  				<xsl:apply-templates select="." mode="notreeentry"/>
  			</xsl:when>
  			<xsl:when test="local-name()='element' or local-name()='attribute' or local-name()='attributeGroup' or local-name()='anyAttribute'">
  				<xsl:apply-templates select="." />
  			</xsl:when>
  			<xsl:when test="local-name()='simpleContent'">
  				<xsl:apply-templates select="xsd:extension"/>  					
  			</xsl:when>
  			<xsl:when test="local-name()='complexContent'">
  				<xsl:apply-templates select="xsd:extension/*/*|xsd:extension/xsd:attribute|xsd:extension/xsd:anyAttribute"/>  					
  			</xsl:when>
  		</xsl:choose>
  	</xsl:for-each>
	</ri:chapter>

 	  	
 	

  </xsl:template>
  
    <xsl:template match="xsd:sequence|xsd:choice|xsd:all" mode="notreeentry">

         <xsl:for-each select="*">
             <xsl:choose>
                 <xsl:when test="local-name(..)='sequence' and local-name()='element' and @maxOccurs='0' and @minOccurs='0' and starts-with(@type,'ComIbmMrm_Anon')">
                     <xsl:apply-templates select="." mode="embeddedsimpletype"/>
                 </xsl:when>
                 <xsl:otherwise>
                     <xsl:apply-templates select="."/>
                 </xsl:otherwise>
             </xsl:choose>
         </xsl:for-each>
<!--
  -->
  </xsl:template>
  
    <xsl:template match="xsd:group[@ref]" mode="notreeentry">

  	<xsl:apply-templates/>

  </xsl:template>
	

  <xsl:template match="xsd:simpleType">

  	<xsl:variable name="myname">
  		<xsl:choose>
  			<xsl:when test="@name">
  				<xsl:value-of select="@name" />
  			</xsl:when>
            <xsl:when test="xsd:restriction">
                <xsl:value-of select="concat(xsd:restriction/@base,' -')" />
            </xsl:when>
  			<xsl:otherwise>
  				<xsl:call-template name="NLS_translation">
												<xsl:with-param name="var_original" select="'nlsLocalSimpleType'"/>
											</xsl:call-template>
  			</xsl:otherwise>
  		</xsl:choose>
  	</xsl:variable>
 	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$myname"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>
								<xsl:choose>
									<xsl:when test="xsd:restriction">
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsBaseType'"/>
												<xsl:with-param name="value">									
												<xsl:choose>
									  				<xsl:when test="xsd:extension/@base">
									  					<xsl:value-of select="xsd:extension/@base" />
									  				</xsl:when>
									  				<xsl:when test="xsd:restriction/@base">
									  					<xsl:value-of select="xsd:restriction/@base" />
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:value-of select="'None'" />
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>
											</xsl:call-template>
							  		</xsl:when>
							  		<xsl:when test="xsd:list">
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsItemType'"/>
												<xsl:with-param name="value">									
												<xsl:choose>
									  				<xsl:when test="xsd:list/@itemType">
									  					<xsl:value-of select="xsd:list/@itemType" />
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:value-of select="'None'" />
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>
											</xsl:call-template>
							  		</xsl:when>							  		
							  	</xsl:choose>
							  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsVariety'"/>
												<xsl:with-param name="value">									
												<xsl:choose>									  				
													
														<xsl:when test="xsd:restriction">
													<xsl:value-of select="'atomic'"/>
													</xsl:when>
													
														<xsl:when test="xsd:list">
													<xsl:value-of select="'list'"/>
													</xsl:when>
													
														<xsl:when test="xsd:union">
													<xsl:value-of select="'union'"/>
													</xsl:when>
													
														<xsl:otherwise>
													<xsl:value-of select="'None'"/>
													</xsl:otherwise>
													</xsl:choose>									  			
												</xsl:with-param>
											</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="processSimpleTypeFacets"/>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
				</ri:chapter>	

    </xsl:template>
    
      <xsl:template name="groups">

	<ri:chapter>
		<fo:block xsl:use-attribute-sets="Space2"/>
		<fo:block xsl:use-attribute-sets="h1">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsGroups'"/>
					</xsl:call-template>				
				</ri:heading>
			</fo:block>

   <xsl:for-each select="/xsd:schema/xsd:group | /xsd:schema/xsd:attributeGroup">
      <xsl:apply-templates select="."/>
    </xsl:for-each>
    </ri:chapter>
	
    
  </xsl:template>
  
  
    <xsl:template match="xsd:group[@name]">
  	
<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="@name"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>								
							  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">									
												<xsl:choose>
	  			<xsl:when test="xsd:annotation/xsd:appinfo/MRGlobalGroup/@composition">
		  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRGlobalGroup/@composition" />
	  			</xsl:when>
	  			<xsl:when test="xsd:choice">
	  				<xsl:value-of select="'choice'" />
	  			</xsl:when>
	  			<xsl:when test="xsd:sequence">
	  				<xsl:value-of select="'sequence'" />
	  			</xsl:when>
	  			<xsl:when test="xsd:all">
	  				<xsl:value-of select="'all'" />
	  			</xsl:when>
	  			<xsl:otherwise>
<xsl:value-of select="'ERROR - UNEXPECTED CONTENT MODEL'"/>
</xsl:otherwise>
  			</xsl:choose>
												</xsl:with-param>
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsContentValidation'"/>
												<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRGlobalGroup/@content"/>
												<xsl:with-param name="default" select="'closed'"/>
											</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:for-each select="*">
  		<xsl:for-each select="*">
  			<xsl:apply-templates select="."/>  				
  		</xsl:for-each>
  	</xsl:for-each>
				</ri:chapter>	


  </xsl:template>
  
  <!--
  ####   #####    ####   #    #  #####   
 #    #  #    #  #    #  #    #  #    #  
 #       #    #  #    #  #    #  #    #  
 #  ###  #####   #    #  #    #  #####   
 #    #  #   #   #    #  #    #  #       
  ####   #    #   ####    ####   #       
-->
  <xsl:template match="xsd:group[@ref]">
  	
<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="@ref"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>								
							  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:apply-templates/>  
				</ri:chapter>	
   	    	
  </xsl:template>
  
    <xsl:template match="xsd:attributeGroup[@name]">

<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="@name"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>								
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:apply-templates/>  
				</ri:chapter>

  </xsl:template>

<!--
   ##     #####   #####  #####      #    #####   #    #   #####  ######   ####  
  #  #      #       #    #    #     #    #    #  #    #     #    #       #    # 
 #    #     #       #    #    #     #    #####   #    #     #    #####   #      
 ######     #       #    #####      #    #    #  #    #     #    #       #  ### 
 #    #     #       #    #   #      #    #    #  #    #     #    #       #    # 
 #    #     #       #    #    #     #    #####    ####      #    ######   ####  
-->
  <xsl:template match="xsd:attributeGroup[@ref]">
<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="@ref"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>								
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:apply-templates/>  
				</ri:chapter>
  </xsl:template>
  
  	<xsl:template name="elementsAndAttributes">
	<ri:chapter>
		<fo:block xsl:use-attribute-sets="Space2"/>
		<fo:block xsl:use-attribute-sets="h1">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsElementsAndAttributes'"/>
					</xsl:call-template>				
				</ri:heading>
			</fo:block>

    <xsl:for-each select="/xsd:schema/xsd:element | /xsd:schema/xsd:attribute">
		<xsl:apply-templates select="."/>
	</xsl:for-each>
	</ri:chapter>
  </xsl:template>
  
  <xsl:template match="xsd:element[@name]">

  	
	<xsl:choose>
		<!-- 
			Compound elements have specific rules.
			Modify this line as the rules alter
		-->
		<xsl:when test="xsd:complexType/@mixed='true' and xsd:complexType/xsd:sequence/xsd:element/@maxOccurs='0' and xsd:complexType/xsd:sequence/xsd:element/@minOccurs='0' and starts-with(xsd:complexType/xsd:sequence/xsd:element/@type,'ComIbmMrm_BaseValue') and starts-with(xsd:complexType/xsd:sequence/xsd:element/@name,'ComIbmMrm_21')">
  	
  	<xsl:variable name="nameandtype">
  		<xsl:value-of select="@name"/>
		<xsl:text> (</xsl:text>
		<xsl:value-of select="xsd:complexType/xsd:sequence/xsd:element/@type"/>
		<xsl:text>)</xsl:text>
  	</xsl:variable>
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$nameandtype"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
								<xsl:for-each select="xsd:complexType/xsd:sequence/xsd:element">
									<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNillable'"/>
												<xsl:with-param name="value" select="@nillable"/>	
												<xsl:with-param name="default" select="'false'"/>					
									</xsl:call-template>
								</xsl:for-each>		
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsAbstract'"/>
												<xsl:with-param name="value" select="@abstract"/>
												<xsl:with-param name="default" select="'false'"/>
									</xsl:call-template>										
								<xsl:for-each select="xsd:complexType/xsd:sequence/xsd:element">
									<xsl:choose>
								  		<xsl:when test="@fixed">
								  			<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsFixed'"/>
												<xsl:with-param name="value" select="@fixed"/>									
											</xsl:call-template>	
								  		</xsl:when>
								  		<xsl:otherwise>
								  			<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsDefault'"/>
												<xsl:with-param name="value" select="@default"/>
												<xsl:with-param name="default" select="'None'"/>									
											</xsl:call-template>								  			
								  		</xsl:otherwise>
								  	</xsl:choose>
								</xsl:for-each>		
								<xsl:call-template name="AddEmptyRow"/>	
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>
								<xsl:call-template name="AddEmptyRow"/>	
								<xsl:for-each select="xsd:complexType">
										<xsl:choose>
									  		<xsl:when test="xsd:annotation/xsd:appinfo/MRComplexType/@composition">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRComplexType/@composition"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:all">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'all'"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:choice">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'choice'"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:sequence">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'sequence'"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:complexContent/*/xsd:sequence">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'sequence'"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:complexContent/*/xsd:choice">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'choice'"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:when test="xsd:group[@ref]">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsGroupReference'"/>
													<xsl:with-param name="value" select="xsd:group/@ref"/>
												</xsl:call-template>
									  		</xsl:when>
									  		<xsl:otherwise>
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsLocalGroup'"/>
													<xsl:with-param name="value" select="'empty'"/>
												</xsl:call-template>
									  		</xsl:otherwise>
									  	</xsl:choose>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/*[local-name()='MRComplexType']/@content"/>
												</xsl:call-template>
									  	<xsl:for-each select="xsd:sequence">
											<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsGroupReference'"/>
													<xsl:with-param name="value" select="xsd:group/@ref"/>
												</xsl:call-template>
									  	</xsl:for-each>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsMixed'"/>
													<xsl:with-param name="value" select="@mixed"/>
													<xsl:with-param name="default" select="'false'"/>
												</xsl:call-template>
								  	</xsl:for-each>
								  	<xsl:call-template name="AddEmptyRow"/>	
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								<xsl:for-each select="xsd:complexType">
									<xsl:call-template name="AddDocumentationRowNoTitle">
										<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
									</xsl:call-template>
								</xsl:for-each>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:apply-templates/>  
				</ri:chapter>
		</xsl:when>
		<xsl:otherwise>
			<xsl:variable name="nameandtype">
		  		<xsl:value-of select="@name"/>
				<xsl:text> (</xsl:text>
				<xsl:call-template name="getelementtype"/>
				<xsl:text>)</xsl:text>
		  	</xsl:variable>
		  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$nameandtype"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
								<xsl:choose>
									<xsl:when test="xsd:simpleType">
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsType'"/>
													<xsl:with-param name="value">
														<xsl:choose>
															<xsl:when test="xsd:simpleType/xsd:restriction/@base">
											  					<xsl:value-of select="concat(xsd:simpleType/xsd:restriction/@base,' -')" />
															</xsl:when>
															<xsl:when test="xsd:simpleType/xsd:list/@itemType">
											  					<xsl:value-of select="concat(xsd:simpleType/xsd:list/@itemType,' -')" />
															</xsl:when>
															<xsl:when test="xsd:simpleType/xsd:union">
											  					<xsl:value-of select="concat('union',' -')" />
															</xsl:when>
											  			</xsl:choose>
													</xsl:with-param>
												</xsl:call-template>
									</xsl:when>
									<xsl:when test="xsd:complexType/xsd:simpleContent">
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsType'"/>
													<xsl:with-param name="value" select="concat(xsd:complexType/xsd:simpleContent/xsd:extension/@base,' +')"/>														
												</xsl:call-template>
									</xsl:when>
									<xsl:when test="xsd:complexType/xsd:complexContent">
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsType'"/>
													<xsl:with-param name="value">														
														<xsl:choose>
											  				<xsl:when test="xsd:complexType/xsd:complexContent/xsd:extension/@base">
													  			<xsl:value-of select="concat(xsd:complexType/xsd:complexContent/xsd:extension/@base,' +')" />
											  				</xsl:when>
											  				<xsl:when test="xsd:complexType/xsd:complexContent/xsd:restriction/@base">
													  			<xsl:value-of select="concat(xsd:complexType/xsd:complexContent/xsd:restriction/@base,' -')" />
											  				</xsl:when>
											  			</xsl:choose>
													</xsl:with-param>
										</xsl:call-template>
									</xsl:when>
									<xsl:when test="xsd:complexType">
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsType'"/>
													<xsl:with-param name="value">														
														<xsl:call-template name="NLS_translation">
															<xsl:with-param name="var_original" select="'nlsLocalComplexType'"/>
														</xsl:call-template>
													</xsl:with-param>
										</xsl:call-template>
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsType'"/>
													<xsl:with-param name="value" select="@type"/>														
										</xsl:call-template>
									</xsl:otherwise>
								</xsl:choose>
								<xsl:call-template name="AddEmptyRow"/>
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNamespace'"/>
												<xsl:with-param name="value">
												<xsl:choose>
									  				<xsl:when test="count(ancestor::*)=1">
											  			<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='qualified'">
									  					<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='unqualified'">
									  					<xsl:call-template name="NLS_translation">
															<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
														</xsl:call-template>
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:choose>
									  						<xsl:when test="/xsd:schema/@attributeFormDefault='qualified'">
											  					<xsl:value-of select="$namespaceTarget"/>
									  						</xsl:when>
									  						<xsl:otherwise>
											  					<xsl:call-template name="NLS_translation">
																	<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
																</xsl:call-template>
									 						</xsl:otherwise>
									  					</xsl:choose>
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>
										<xsl:if test="not(name(parent::*) = 'xsd:schema')">
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>
												<xsl:with-param name="default" select="'1'"/>									
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>
											<xsl:call-template name="AddEmptyRow"/>	
										</xsl:if>
										<xsl:choose>
									  		<xsl:when test="@fixed">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsFixed'"/>
													<xsl:with-param name="value" select="@fixed"/>									
												</xsl:call-template>									  			
									  		</xsl:when>
									  		<xsl:otherwise>
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsDefault'"/>
													<xsl:with-param name="value" select="@default"/>
													<xsl:with-param name="default" select="'None'"/>									
												</xsl:call-template>									  			
									  		</xsl:otherwise>
									  	</xsl:choose>	
									  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNillable'"/>
												<xsl:with-param name="value" select="@nillable"/>
												<xsl:with-param name="default" select="'false'"/>									
									</xsl:call-template>
									  	<xsl:call-template name="AddEmptyRow"/>
									  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsFinal'"/>
												<xsl:with-param name="value" select="@final"/>
												<xsl:with-param name="default" select="'None'"/>										
											</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsBlock'"/>
												<xsl:with-param name="value" select="@block"/>	
												<xsl:with-param name="default" select="'None'"/>								
											</xsl:call-template>
											<fo:table-row>
												<!-- first empty column, invisible cell for indentation -->
												<fo:table-cell>
													<fo:block/>
												</fo:table-cell>
												<fo:table-cell>
													<fo:block xsl:use-attribute-sets="DefinitionText">Substitution Group:</fo:block>
												</fo:table-cell>
												<!-- column for property value -->
												<fo:table-cell>
													<fo:block xsl:use-attribute-sets="DefinitionText">
														<xsl:choose>
														<xsl:when test="@substitutionGroup">
															<xsl:value-of select="@substitutionGroup"/>
														</xsl:when>
														<xsl:otherwise>
															<xsl:value-of select="'None'"/>
														</xsl:otherwise>
														</xsl:choose>
													</fo:block>
												</fo:table-cell>
											</fo:table-row>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsAbstract'"/>
												<xsl:with-param name="value" select="@abstract"/>
												<xsl:with-param name="default" select="'false'"/>
											</xsl:call-template>
											<xsl:call-template name="AddEmptyRow"/>
											<xsl:call-template name="AddDocumentationRow">
												<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
											</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
				</fo:block>						
				<xsl:apply-templates/>
			</ri:chapter>
			
		</xsl:otherwise>
	</xsl:choose>
	
  </xsl:template>
  
  <xsl:template match="xsd:element[@ref]">

  	
  	<xsl:variable name="nameandtype">
  		<xsl:value-of select="@ref"/>
  	</xsl:variable>
  	
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$nameandtype"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>
												<xsl:with-param name="default" select="'1'"/>									
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>
											<xsl:call-template name="AddEmptyRow"/>	
								<xsl:call-template name="AddDocumentationRow">
									<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
								</xsl:call-template>
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>
					<xsl:apply-templates/>
				</ri:chapter>     	
  </xsl:template>
  
  	<xsl:template name="getattributetype">
		<xsl:choose>
			<xsl:when test="xsd:simpleType/xsd:restriction/@base">
  				<xsl:value-of select="concat(xsd:simpleType/xsd:restriction/@base,' -')" />
			</xsl:when>
			<xsl:when test="xsd:simpleType/xsd:list/@itemType">
  				<xsl:value-of select="concat(xsd:simpleType/xsd:list/@itemType,' -')" />
			</xsl:when>
			<xsl:when test="xsd:simpleType/xsd:union">
  				<xsl:value-of select="concat('union',' -')" />
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="@type" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
  
  
    <xsl:template match="xsd:attribute[@name]">

 	<xsl:variable name="nameandtype">
  		<xsl:value-of select="@name"/>
		<xsl:text> (</xsl:text>
		<xsl:call-template name="getattributetype"/>
		<xsl:text>)</xsl:text>
  	</xsl:variable>
  	
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$nameandtype"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
								<xsl:choose>
									<xsl:when test="xsd:simpleType">
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsType'"/>
												<xsl:with-param name="value">									
												<xsl:choose>
													<xsl:when test="xsd:simpleType/xsd:restriction/@base">
									  					<xsl:value-of select="concat(xsd:simpleType/xsd:restriction/@base,' -')" />
													</xsl:when>
													<xsl:when test="xsd:simpleType/xsd:list/@itemType">
									  					<xsl:value-of select="concat(xsd:simpleType/xsd:list/@itemType,' -')" />
													</xsl:when>
													<xsl:when test="xsd:simpleType/xsd:union">
									  					<xsl:value-of select="concat('union',' -')" />
													</xsl:when>
									  			</xsl:choose>
												</xsl:with-param>
										</xsl:call-template>										
									</xsl:when>
									<xsl:otherwise>
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsType'"/>
												<xsl:with-param name="value" select="@type"/>									
										</xsl:call-template>		
									</xsl:otherwise>
								</xsl:choose>
								<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNamespace'"/>
												<xsl:with-param name="value">
												<xsl:choose>
									  				<xsl:when test="count(ancestor::*)=1">
											  			<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='qualified'">
									  					<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='unqualified'">
									  					<xsl:call-template name="NLS_translation">
															<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
														</xsl:call-template>
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:choose>
									  						<xsl:when test="/xsd:schema/@attributeFormDefault='qualified'">
											  					<xsl:value-of select="$namespaceTarget"/>
									  						</xsl:when>
									  						<xsl:otherwise>
											  					<xsl:call-template name="NLS_translation">
																	<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
																</xsl:call-template>
									 						</xsl:otherwise>
									  					</xsl:choose>
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>
										<xsl:choose>
									  		<xsl:when test="@fixed">
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsFixed'"/>
													<xsl:with-param name="value" select="@fixed"/>									
												</xsl:call-template>									  			
									  		</xsl:when>
									  		<xsl:otherwise>
									  			<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsDefault'"/>
													<xsl:with-param name="value" select="@default"/>
													<xsl:with-param name="default" select="'None'"/>																						
												</xsl:call-template>									  			
									  		</xsl:otherwise>
									  	</xsl:choose>	
									  	<xsl:call-template name="AddEmptyRow"/>
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsUsage'"/>
													<xsl:with-param name="value" select="@use"/>
													<xsl:with-param name="default" select="'optional'"/>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
					<xsl:apply-templates/>				
				</ri:chapter>     	      	
  </xsl:template>


  <xsl:template match="xsd:attribute[@ref]">
  	

    <xsl:variable name="type" select="@ref"/>

  	

  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:value-of select="$type"/>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
		
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsUsage'"/>
													<xsl:with-param name="value" select="@use"/>
													<xsl:with-param name="default" select="'optional'"/>
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
					<xsl:apply-templates/>				
				</ri:chapter>     	      	
      	
  </xsl:template>
  
  <xsl:template match="xsd:any">
    <ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsWildcardElement'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>			
									  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNamespace'"/>
												<xsl:with-param name="value">
												<xsl:choose>
									  				<xsl:when test="count(ancestor::*)=1">
											  			<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='qualified'">
									  					<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='unqualified'">
									  					<xsl:call-template name="NLS_translation">
															<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
														</xsl:call-template>
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:choose>
									  						<xsl:when test="/xsd:schema/@attributeFormDefault='qualified'">
											  					<xsl:value-of select="$namespaceTarget"/>
									  						</xsl:when>
									  						<xsl:otherwise>
											  					<xsl:call-template name="NLS_translation">
																	<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
																</xsl:call-template>
									 						</xsl:otherwise>
									  					</xsl:choose>
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>									
										</xsl:call-template>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsProcessContent'"/>
													<xsl:with-param name="value" select="@processContents"/>
													<xsl:with-param name="default" select="'strict'"/>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
					<xsl:apply-templates/>				
				</ri:chapter>     	      	
  </xsl:template>  
  
  <xsl:template match="xsd:anyAttribute">
   <ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsWildcardAttribute'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>			
									  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsNamespace'"/>
												<xsl:with-param name="value">
												<xsl:choose>
									  				<xsl:when test="count(ancestor::*)=1">
											  			<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='qualified'">
									  					<xsl:value-of select="$namespaceTarget"/>
									  				</xsl:when>
									  				<xsl:when test="@form='unqualified'">
									  					<xsl:call-template name="NLS_translation">
															<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
														</xsl:call-template>
									  				</xsl:when>
									  				<xsl:otherwise>
									  					<xsl:choose>
									  						<xsl:when test="/xsd:schema/@attributeFormDefault='qualified'">
											  					<xsl:value-of select="$namespaceTarget"/>
									  						</xsl:when>
									  						<xsl:otherwise>
											  					<xsl:call-template name="NLS_translation">
																	<xsl:with-param name="var_original" select="'nlsNoTargetNamespace'"/>
																</xsl:call-template>
									 						</xsl:otherwise>
									  					</xsl:choose>
									  				</xsl:otherwise>
									  			</xsl:choose>
												</xsl:with-param>									
										</xsl:call-template>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsProcessContent'"/>
													<xsl:with-param name="value" select="@processContents"/>
													<xsl:with-param name="default" select="'strict'"/>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
					<xsl:apply-templates/>				
				</ri:chapter>     	      	
  </xsl:template>
  
  <xsl:template match="xsd:sequence">
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsSequence'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>			
									  	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">
													<xsl:choose>
											  			<xsl:when test="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition">
												  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition" />
											  			</xsl:when>
											  			<xsl:otherwise>
											  				<xsl:value-of select="local-name()" />
											  			</xsl:otherwise>
										  			</xsl:choose>
												</xsl:with-param>																			
										</xsl:call-template>
										<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRLocalGroup/@content"/>									
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
					<xsl:apply-templates/>				
				</ri:chapter>     	      	
  </xsl:template>
  
  <xsl:template match="xsd:element" mode="embeddedsimpletype">
  	
<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:choose>
						<xsl:when test="xsd:element/@type">
								<xsl:value-of select="xsd:element/@type"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="'UNNAMED ENTITY'"/>
						</xsl:otherwise>
					</xsl:choose>

				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>			
									  	<xsl:for-each select="xsd:annotation/xsd:appinfo/elemAppInfo">
										 	<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>
												<xsl:with-param name="default" select="'1'"/>									
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>	
										</xsl:for-each>														
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>							
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
									
				</ri:chapter>  


  </xsl:template>
  
  <xsl:template match="xsd:sequence[xsd:annotation/xsd:appinfo/MRLocalGroup/@composition='orderedSet']">
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsOrderedSet'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">
													<xsl:choose>
											  			<xsl:when test="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition">
												  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition" />
											  			</xsl:when>
											  			<xsl:otherwise>
											  				<xsl:value-of select="local-name()" />
											  			</xsl:otherwise>
										  			</xsl:choose>
												</xsl:with-param>																			
										</xsl:call-template>		
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRLocalGroup/@content"/>
													<xsl:with-param name="default" select="'closed'"/>												
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>										
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
						<xsl:apply-templates/>			
				</ri:chapter>  

  </xsl:template>

  <xsl:template match="xsd:sequence[xsd:annotation/xsd:appinfo/MRLocalGroup/@composition='unorderedSet']">
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsUnorderedSet'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">
													<xsl:choose>
											  			<xsl:when test="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition">
												  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition" />
											  			</xsl:when>
											  			<xsl:otherwise>
											  				<xsl:value-of select="local-name()" />
											  			</xsl:otherwise>
										  			</xsl:choose>
												</xsl:with-param>																			
										</xsl:call-template>		
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRLocalGroup/@content"/>
													<xsl:with-param name="default" select="'closed'"/>										
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>		
												<xsl:with-param name="default" select="'1'"/>							
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>										
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
						<xsl:apply-templates/>			
				</ri:chapter>  
  </xsl:template>
  
<!--
  ####   #    #   ####      #     ####   ######      
 #    #  #    #  #    #     #    #    #  #           
 #       ######  #    #     #    #       #####       
 #       #    #  #    #     #    #       #           
 #    #  #    #  #    #     #    #    #  #           
  ####   #    #   ####      #     ####   ######      
-->
  <xsl:template match="xsd:choice">
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsChoice'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">
													<xsl:choose>
											  			<xsl:when test="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition">
												  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition" />
											  			</xsl:when>
											  			<xsl:otherwise>
											  				<xsl:value-of select="local-name()" />
											  			</xsl:otherwise>
										  			</xsl:choose>
												</xsl:with-param>																			
										</xsl:call-template>		
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRLocalGroup/@content"/>
													<xsl:with-param name="default" select="'closed'"/>										
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>										
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
						<xsl:apply-templates/>			
				</ri:chapter>  
  </xsl:template>

<!--
   ##    #       #      
  #  #   #       #      
 #    #  #       #      
 ######  #       #      
 #    #  #       #      
 #    #  ######  ###### 
-->
  <xsl:template match="xsd:all">
  	<ri:chapter>
			<fo:block xsl:use-attribute-sets="h2">
				<ri:heading>
					<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsAll'"/>
					</xsl:call-template>
				</ri:heading>
				<fo:block>
					<fo:block xsl:use-attribute-sets="Space1"/>
							<fo:table table-layout="fixed" width="{$pagewidth}" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(30)"/>
								<fo:table-column column-width="proportional-column-width(70)"/>
								<fo:table-body>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsComposition'"/>
												<xsl:with-param name="value">
													<xsl:choose>
											  			<xsl:when test="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition">
												  			<xsl:value-of select="xsd:annotation/xsd:appinfo/MRLocalGroup/@composition" />
											  			</xsl:when>
											  			<xsl:otherwise>
											  				<xsl:value-of select="local-name()" />
											  			</xsl:otherwise>
										  			</xsl:choose>
												</xsl:with-param>																			
										</xsl:call-template>		
									  	<xsl:call-template name="AddAttributeRow">
													<xsl:with-param name="name" select="'nlsContentValidation'"/>
													<xsl:with-param name="value" select="xsd:annotation/xsd:appinfo/MRLocalGroup/@content"/>
													<xsl:with-param name="default" select="'closed'"/>										
										</xsl:call-template>
										<xsl:call-template name="AddEmptyRow"/>	
										<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMinOccurs'"/>
												<xsl:with-param name="value" select="@minOccurs"/>	
												<xsl:with-param name="default" select="'1'"/>								
												</xsl:call-template>
											<xsl:call-template name="AddAttributeRow">
												<xsl:with-param name="name" select="'nlsMaxOccurs'"/>
												<xsl:with-param name="value" select="@maxOccurs"/>
												<xsl:with-param name="default" select="'1'"/>												
											</xsl:call-template>						
											<xsl:call-template name="AddEmptyRow"/>			
										<xsl:call-template name="AddDocumentationRow">
											<xsl:with-param name="value" select="xsd:annotation/xsd:documentation"/>
										</xsl:call-template>										
								</fo:table-body>
							</fo:table>
						</fo:block>
					</fo:block>	
						<xsl:apply-templates/>			
				</ri:chapter>  
  </xsl:template>
  <!--
 #####   ######   ####    #####  #####      #     ####    #####     #     ####  
 #    #  #       #          #    #    #     #    #    #     #       #    #    # 
 #    #  #####    ####      #    #    #     #    #          #       #    #    # 
 #####   #            #     #    #####      #    #          #       #    #    # 
 #   #   #       #    #     #    #   #      #    #    #     #       #    #    # 
 #    #  ######   ####      #    #    #     #     ####      #       #     ####  
-->
  <xsl:template match="xsd:restriction">
  	<xsl:apply-templates/>
  </xsl:template>

<!--
 ######  #    #   #####  ######  #    #   ####      #     ####   #    #
 #        #  #      #    #       ##   #  #          #    #    #  ##   #
 #####     ##       #    #####   # #  #   ####      #    #    #  # #  #
 #         ##       #    #       #  # #       #     #    #    #  #  # #
 #        #  #      #    #       #   ##  #    #     #    #    #  #   ##
 ######  #    #     #    ######  #    #   ####      #     ####   #    #
-->
  <xsl:template match="xsd:extension">
  	<xsl:apply-templates/>
  </xsl:template>
  
  <xsl:template name="processSimpleTypeFacets">
	<xsl:variable name="baseValue">
<xsl:value-of select="xsd:restriction/@base"/>
    38866 Done
</xsl:variable>

	<xsl:variable name="localBaseValue">

	<xsl:choose>

	<xsl:when test="contains($baseValue,':')">
<xsl:value-of select="substring-after($baseValue,':')"/>
</xsl:when>

	<xsl:otherwise>
<xsl:value-of select="$baseValue"/>
</xsl:otherwise>
</xsl:choose>
</xsl:variable>

	<xsl:choose>

	<xsl:when test="$localBaseValue='anyURI'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='base64Binary'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='ENTITY'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='hexBinary'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='ID'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='IDREF'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='language'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='Name'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='NCName'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='NMTOKEN'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='normalizedString'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='NOTATION'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='QName'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='string'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='token'">
<xsl:call-template name="processStringFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='ENTITIES'">
<xsl:call-template name="processStringFacetsNoPattern"/>
</xsl:when>

	<xsl:when test="$localBaseValue='IDREFS'">
<xsl:call-template name="processStringFacetsNoPattern"/>
</xsl:when>

	<xsl:when test="$localBaseValue='NMTOKENS'">
<xsl:call-template name="processStringFacetsNoPattern"/>
</xsl:when>

	<xsl:when test="$localBaseValue='boolean'">
<xsl:call-template name="processBooleanFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='byte'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='decimal'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='int'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='integer'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='long'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='negativeInteger'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='nonNegativeInteger'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='nonPositiveInteger'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='positiveInteger'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='short'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='unsignedByte'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='unsignedInt'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='unsignedLong'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='unsignedShort'">
<xsl:call-template name="processIntFacets"/>
</xsl:when>

	<xsl:when test="$localBaseValue='date'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='dateTime'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='double'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='duration'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='float'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='gDay'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='gMonth'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='gMonthDay'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='gYear'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='gYearMonth'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:when test="$localBaseValue='time'">
<xsl:call-template name="processIntFacetsNoDigits"/>
</xsl:when>

	<xsl:otherwise>
<!-- Cannot determine the type -->
<!-- Could just output whatever we find - but not yet -->
</xsl:otherwise>
</xsl:choose>
</xsl:template>

<xsl:template name="processIntFacets">
<!-- Inclusive Constraints -->
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Inclusive Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minInclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Inclusive Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxInclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddEmptyRow"/>	
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Exclusive Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minExclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Exclusive Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxExclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddEmptyRow"/>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Fraction Digits:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:fractionDigits/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Total Digits:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:totalDigits/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'White Space:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:whiteSpace/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<!-- Enumerations -->

	<xsl:if test="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Enumeration:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
<!-- Patterns -->

	<xsl:if test="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Pattern:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
</xsl:template>

	<xsl:template name="processIntFacetsNoDigits">
<!-- Inclusive Constraints -->
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Inclusive Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minInclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Inclusive Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxInclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddEmptyRow"/>	
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Exclusive Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minExclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Exclusive Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxExclusive/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>

<!-- Enumerations -->

	<xsl:if test="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Enumeration:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
<!-- Patterns -->

	<xsl:if test="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Pattern:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>

</xsl:template>

	<xsl:template name="processStringFacets">
<!-- Length Constraints -->
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Length:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:length/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minLength/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxLength/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<!-- Whitespace -->
<xsl:call-template name="AddEmptyRow"/>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'White Space:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:whiteSpace/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<!-- Enumerations -->

	<xsl:if test="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Enumeration:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
<!-- Patterns -->

	<xsl:if test="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Pattern:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
</xsl:template>

	<xsl:template name="processStringFacetsNoPattern">
<!-- Length Constraints -->
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Length:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:length/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Min:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:minLength/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Max:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:maxLength/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<!-- Whitespace -->
<xsl:call-template name="AddEmptyRow"/>
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'White Space:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:whiteSpace/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
<!-- Enumerations -->

	<xsl:if test="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:enumeration">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Enumeration:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
</xsl:template>

	<xsl:template name="processBooleanFacets">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'White Space:'"/>
	<xsl:with-param name="value" select="xsd:restriction/xsd:whiteSpace/@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
	<xsl:if test="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddEmptyRow"/>

	<xsl:for-each select="xsd:restriction/xsd:pattern">
<xsl:call-template name="AddAttributeRowHardcoded">
	<xsl:with-param name="name" select="'Pattern:'"/>
	<xsl:with-param name="value" select="@value"/>
	<xsl:with-param name="default" select="'None'"/>
</xsl:call-template>
</xsl:for-each>

</xsl:if>
</xsl:template>
  
  	
	<!--********************************************************************************************-->
	<!--* Utility Templates                                                                                         -->
	<!--*                                                                                                                  -->
	<!-- *******************************************************************************************-->
	<!---->
	<!--********************************************************************************************-->
	<!--	* Utility template :  MakeHeaderCell                                                            -->
	<!--	*                           Create a header cell for the element / attribute table         -->	
    <!--   *                                                                                                               -->
	<!--   ****************************************************************************************	-->
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