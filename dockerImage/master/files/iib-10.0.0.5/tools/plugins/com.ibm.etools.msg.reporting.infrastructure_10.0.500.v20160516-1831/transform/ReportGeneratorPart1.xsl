<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:fox="http://xml.apache.org/fop/extensions" exclude-result-prefixes="fo ri fox">
	<!--*************************************************************************-->
	<!-- Include section:			                                                        -->
	<!--*************************************************************************-->
	<!-- necessary, because of bug in xslt processor or debugger !!! -->
	<xsl:include href="IncludeDummy.xsl"/>
	<xsl:include href="Common_Parameters.xsl"/>
	<xsl:include href="Common_AttributeSets.xsl"/>
	<xsl:include href="Reporting_Parameters.xsl"/>
	<xsl:include href="Reporting-AttributeSets.xsl"/>
	<!--*****************************************************************************************************************
          ########################################################################
          ####################   Main template   #######################################
          ########################################################################    
      *****************************************************************************************************************-->
	<!--*****************************************************************************
	   **  Key "usedFiles" : key array must be filled, before the whole template mechanisms starts
       ** 
      *****************************************************************************************************************-->
	<xsl:key name="usedFiles" match="//ri:crossrefchapter//ri:reference" use="./@name"/>
	<!--*****************************************************************************
		**  Template-Task :  generate the "report_interim.xml" document 
        **                                out of the "reporttotalimput.xml". This 
        **                                stylesheet includes the complete skelet of 
        **                                 of a report 
        **
	    ** Template for :   "/"
        **  purpose:             starts all necessary actions from here
        **
        **  INFO:  disable-output-escaping = "yes" must be set each time
        **               if an internal value in the xslt represent an quoted character 
        ***              ( e.g. &quot; ) is used, to suppress that the & will 
       **                will be translated to &amp; ( e.g &amp;quot;) 
	    *************************************************************************-->
	<xsl:template match="/">
		<!-- ************************************************************************
		  *  Master patterns for all reports 
		  *****************************************************************************-->
		<xsl:choose>
			<xsl:when test="$language = ''">
				<!-- ************************************************************************
		                 *  Setting of the language attribut into the <fo:root xmlns:fo=""> element 
		                 *  here with "qouted" string, because it is  the way to get a 
		                 *  well-formed  stylesheet document. 
		                 ************************************************************************-->
				<xsl:value-of select="'&lt;fo:root  xmlns:fo= &quot;http://www.w3.org/1999/XSL/Format&quot; xmlns:ri=&quot;http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/&quot; xmlns:fox=&quot;http://xml.apache.org/fop/extensions&quot; language=&quot;en&quot; &gt;'" disable-output-escaping="yes"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="'&lt;fo:root xmlns:fo= &quot;http://www.w3.org/1999/XSL/Format&quot; xmlns:ri=&quot;http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/&quot; xmlns:fox=&quot;http://xml.apache.org/fop/extensions&quot; language=&quot;'" disable-output-escaping="yes"/>
				<xsl:value-of select="$language_code"/>
				<xsl:value-of select="'&quot; &gt;'" disable-output-escaping="yes"/>
			</xsl:otherwise>
		</xsl:choose>
		<fo:layout-master-set>
			<!-- ************************************************************************
  		          *  Layout master sets  define the layouts that can be 
  		          *  used in page master sets
  		          ************************************************************************-->
			<fo:simple-page-master master-name="cover-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$marginleft}" margin-right="{$marginright}">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="cover-body" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			<fo:simple-page-master master-name="toc-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$marginleft}" margin-right="{$marginright}">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="toc-body" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			<fo:simple-page-master master-name="body-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$marginleft}" margin-right="{$marginright}">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="body-body" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			<fo:simple-page-master master-name="plugin-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$marginleft}" margin-right="{$marginright}">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="plugin-body" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			<fo:simple-page-master master-name="cr-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$marginleft}" margin-right="{$marginright}">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="cr-body" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			<!--
			<fo:simple-page-master master-name="index-page" page-height="{$pageheight}" page-width="{$pagewidth}" margin-top="{$margintop}" margin-bottom="{$marginbottom}" margin-left="{$pagewidth}*0.12" margin-right="{$pagewidth}*0.12">
				<fo:region-before region-name="header" extent="from-nearest-specified-value(margin-top)"/>
				<fo:region-body region-name="index-body" column-count="2" column-gap="from-nearest-specified-value(page-width) * 0.12" margin-top="from-nearest-specified-value(margin-top)+1mm" margin-bottom="from-nearest-specified-value(margin-top)+1mm" margin-left="from-nearest-specified-value(page-width) * 0.04" margin-right="from-nearest-specified-value(page-width) * 0.04"/>
				<fo:region-after region-name="footer" extent="from-nearest-specified-value(margin-bottom)"/>
			</fo:simple-page-master>
			-->
			<!-- ************************************************************************
  		           *  page master sets  define the layouts for the different pages 
  		           *  in the report.  
		           *****************************************************************************-->
			<fo:page-sequence-master master-name="Cover">
				<fo:repeatable-page-master-reference master-reference="cover-page"/>
			</fo:page-sequence-master>
			<fo:page-sequence-master master-name="TOC">
				<fo:repeatable-page-master-reference master-reference="toc-page"/>
			</fo:page-sequence-master>
			<fo:page-sequence-master master-name="Body">
				<fo:repeatable-page-master-reference master-reference="body-page"/>
			</fo:page-sequence-master>
			<fo:page-sequence-master master-name="Plugin">
				<fo:single-page-master-reference master-reference="plugin-page"/>
			</fo:page-sequence-master>
			<fo:page-sequence-master master-name="CrossRef">
				<fo:repeatable-page-master-reference master-reference="cr-page"/>
			</fo:page-sequence-master>
			<!--
			<fo:page-sequence-master master-name="Index">
				<fo:repeatable-page-master-reference master-reference="index-page"/>
			</fo:page-sequence-master>
			-->
		</fo:layout-master-set>		
		<!-- ************************************************************************
                *  Report page sequences ( pages of the report )
                *  First page-sequence - Cover page 
           *****************************************************************************-->
		<fo:page-sequence master-reference="Cover" initial-page-number="1" xsl:use-attribute-sets="Cover_Default" id="Cover" space-before="{$pageheight}*0.02" space-after="{$pageheight}*0.02">
			<fo:flow flow-name="cover-body">
				<fo:block hyphenate="true" background-repeat="no-repeat" >
					<fo:block hyphenate="true" xsl:use-attribute-sets="Cover_Title1" text-align="right" space-before.optimum="{$pageheight}*0.20" space-after.optimum="{$pageheight}*0.02">
						<fo:inline id="ProjectName">
							<xsl:value-of select="$TITLE" disable-output-escaping="yes"/>
						</fo:inline>
					</fo:block>
					<!-- implement cover title 2 as empty block, to preserve space for background image -->
					<fo:block hyphenate="true" xsl:use-attribute-sets="Cover_Title2" text-align="right" space-before.optimum="{$pageheight}*0.02" space-after.optimum="{$pageheight}*0.40">
						<xsl:value-of select="' '"/>
					</fo:block>
				</fo:block>
				<!-- end of bakground block -->
				<xsl:choose>
					<xsl:when test="$AUTHOR != ''">
						<fo:block hyphenate="true" xsl:use-attribute-sets="Cover_Label" text-align="left" space-before.optimum="{$pageheight}*0.03" space-after.optimum="{$pageheight}*0.01">
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsAuthorOnTitlePage'"/>
							</xsl:call-template>
							<fo:leader xsl:use-attribute-sets="InlineSpace1"/>
							<fo:inline id="ReportAuthor" xsl:use-attribute-sets="Cover_Text">
								<xsl:value-of select="$AUTHOR" disable-output-escaping="yes"/>
							</fo:inline>
						</fo:block>
					</xsl:when>
					<xsl:otherwise>
						<fo:block hyphenate="true" xsl:use-attribute-sets="Space1"/>
					</xsl:otherwise>
				</xsl:choose>
				<fo:block hyphenate="true" xsl:use-attribute-sets="Cover_Label" text-align="left">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsDateOnTitlePage'"/>
					</xsl:call-template>
					<fo:leader xsl:use-attribute-sets="InlineSpace1"/>
					<fo:inline id="ReportDate" xsl:use-attribute-sets="Cover_Text">
						<xsl:value-of select="$CURRENT_DATE"/>
					</fo:inline>
				</fo:block>
			</fo:flow>
		</fo:page-sequence>
		<!-- ************************************************************************
           *  Report page sequences ( pages of the report )
           *  Second page-sequence - Table of Contents pages 
           *****************************************************************************-->
		<fo:page-sequence master-reference="TOC" xsl:use-attribute-sets="TOC_Default" text-align="left" format="1" id="TOC">
			<fo:static-content flow-name="header">
				<xsl:copy-of select="$DocumentHeader"/>
			</fo:static-content>
			<fo:static-content flow-name="footer">
				<xsl:copy-of select="$DocumentFooter"/>
			</fo:static-content>
			<fo:flow flow-name="toc-body" id="TOC_BODY" xsl:use-attribute-sets="TOC_Text">
				<fo:block hyphenate="true">
					<fo:marker marker-class-name="chapter_title" xsl:use-attribute-sets="Header_Chapter">
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsTableOfContents'"/>
						</xsl:call-template>
					</fo:marker>
				</fo:block>
				<fox:outline internal-destination="TableOfContents">
					<fox:label><xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsTableOfContents'"/>
					</xsl:call-template></fox:label>			
				</fox:outline>				
				<fo:block xsl:use-attribute-sets="h1" keep-with-next="always" id="TableOfContents">					
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsTableOfContents'"/>
					</xsl:call-template>					
				</fo:block>													
				<!-- ************************************************************************************
                    *   ri:toc_here  element added here as a placeholder for the second 
                    *   transformation step that fills in the TOC at this place. 
                    ************************************************************************************** -->                    
				<ri:toc_here/>				
				<ri:bookmarks_here/>
			</fo:flow>
		</fo:page-sequence>		
		<!-- ************************************************************************
           *  Report page sequences ( pages of the report )
           *  one page-sequence for each Report Unit plugin supplied XSLFO snippet
           *
           *  Each following page-sequence must have a flow element whith id-name plugin-body.
           * ( Each found snippet from a Report unit in the combined snippet XML 
           *   will generate one page-sequence for "Plugin" ) 
           *****************************************************************************-->
		<xsl:apply-templates select="root"/>
		<!-- ************************************************************************
           *  Report page sequences ( pages of the report )
           *  Cross Reference pages 
           *****************************************************************************-->
		<xsl:if test="//ri:crossrefchapter/ri:resource">
			<fo:page-sequence master-reference="CrossRef" xsl:use-attribute-sets="CrossRef_Default" text-align="left" id="CrossRef">
				<fo:static-content flow-name="header">
					<xsl:copy-of select="$DocumentHeader"/>
				</fo:static-content>
				<fo:static-content flow-name="footer">
					<xsl:copy-of select="$DocumentFooter"/>
					<!--
				<fo:block hyphenate="true">
					<fo:table width="{$pagewidth} * 0.8" border-collapse="collapse" table-layout="fixed" hyphenate="false">
						<fo:table-column column-width="proportional-column-width(53)"/>
						<fo:table-column column-width="proportional-column-width(47)"/>
						<fo:table-body border-width="0mm">
							<fo:table-row>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
		 		                    - <fo:page-number/> - 
			                    </fo:block>
								</fo:table-cell>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
										<xsl:value-of select="$CURRENT_DATE"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:block>
				-->
				</fo:static-content>
				<fo:flow flow-name="cr-body" xsl:use-attribute-sets="CrossRef_Text">
					<fo:block hyphenate="false">
						<fo:marker marker-class-name="chapter_title" xsl:use-attribute-sets="Header_Chapter">
							<xsl:call-template name="NLS_translation">
								<xsl:with-param name="var_original" select="'nlsCrossReference'"/>
							</xsl:call-template>
						</fo:marker>
					</fo:block>
					<ri:chapter>
						<fo:block hyphenate="true" xsl:use-attribute-sets="h1" keep-with-next="always">
							<ri:heading>
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsCrossReference'"/>
								</xsl:call-template>
							</ri:heading>
						</fo:block>
						<fo:block xsl:use-attribute-sets="SpaceHalf"/>
						<xsl:comment>************** Workspace directory ****************************************</xsl:comment>
						<!--xsl:apply-templates select="//ri:crossrefchapter/ri:workspace" mode="crossref"/-->
						<!---->
						<!-- ********************* header for reference to list  ********************************** -->
							<fo:block hyphenate="true" xsl:use-attribute-sets="PlainTextL1" keep-with-next="always">
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsCrossReferenceDescription'"/>
								</xsl:call-template>
							</fo:block>						
						<fo:block xsl:use-attribute-sets="SpaceHalf"/>
						<xsl:if test="//ri:crossrefchapter/ri:resource">
							<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_SubTitle" keep-with-next="always">
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsReferencedToList'"/>
								</xsl:call-template>
							</fo:block>
							<fo:block xsl:use-attribute-sets="SpaceHalf"/>
							<!-- ********************* create table for reference to list  ********************************** -->
							<fo:table xsl:use-attribute-sets="DefinitionText" table-layout="fixed" hyphenate="true" width="({$pagewidth})-({$marginleft})-({$marginright})" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(47)"/>
								<fo:table-column column-width="proportional-column-width(47)"/>
								<!-- *** create the header column *** -->
								<fo:table-header>
									<fo:table-row>
										<!-- first unvisible cell for indentation -->
										<fo:table-cell padding="2pt">
											<fo:block/>
										</fo:table-cell>
										<!-- *** column "Resource" ***-->
										<xsl:call-template name="MakeHeaderCell">
											<xsl:with-param name="text" select="'nlsResource'"/>
										</xsl:call-template>
										<!-- *** column "References to" ***-->
										<xsl:call-template name="MakeHeaderCell">
											<xsl:with-param name="text" select="'nlsReferencesTo'"/>
										</xsl:call-template>
									</fo:table-row>
								</fo:table-header>
								<fo:table-body>
									<!-- apply template to add row for each resource to be added to the table -->
									<xsl:apply-templates select="//ri:crossrefchapter/ri:resource" mode="cr1"/>
								</fo:table-body>
							</fo:table>
						</xsl:if>
						<fo:block hyphenate="true" xsl:use-attribute-sets="Space1"/>
						<!-- ********************* header for Callee List  ********************************** -->
						<xsl:if test="//ri:crossrefchapter/ri:resource">
							<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_SubTitle" keep-with-next="always">
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsReferencedByList'"/>
								</xsl:call-template>
							</fo:block>
							<!-- ********************* create table for Callers List  ********************************** -->
							<fo:block xsl:use-attribute-sets="SpaceHalf"/>
							<fo:table xsl:use-attribute-sets="DefinitionText" table-layout="fixed" hyphenate="true" width="({$pagewidth})-({$marginleft})-({$marginright})" text-align="left">
								<!-- create empty, invisble first column. This is needed for indentation as workaround, because we found no way for table indentation -->
								<fo:table-column column-width="proportional-column-width({$Percent-L2}*100)"/>
								<fo:table-column column-width="proportional-column-width(47)"/>
								<fo:table-column column-width="proportional-column-width(47)"/>
								<!-- *** create the header column *** -->
								<fo:table-header>
									<fo:table-row>
										<!-- first unvisible cell for indentation -->
										<fo:table-cell padding="2pt">
											<fo:block/>
										</fo:table-cell>
										<!-- *** column "Resource" ***-->
										<xsl:call-template name="MakeHeaderCell">
											<xsl:with-param name="text" select="'nlsResource'"/>
										</xsl:call-template>
										<!-- *** column "Referenced by" ***-->
										<xsl:call-template name="MakeHeaderCell">
											<xsl:with-param name="text" select="'nlsReferencedBy'"/>
										</xsl:call-template>
									</fo:table-row>
								</fo:table-header>
								<fo:table-body>
									<!-- apply template to add row for each resource to be added to the table -->
									<xsl:call-template name="crossRefUsedByTemplate"/>
								</fo:table-body>
							</fo:table>
						</xsl:if>
						<fo:block xsl:use-attribute-sets="Space1"/>
					</ri:chapter>
				</fo:flow>
			</fo:page-sequence>
		</xsl:if>
		<!-- ************************************************************************
           *  Report page sequences ( pages of the report )
           *  INDEX pages  
           *****************************************************************************-->
		<!--
		<fo:page-sequence master-reference="Index" xsl:use-attribute-sets="Index_Default" text-align="left" id="Index">
			<fo:static-content flow-name="header">
				<fo:block hyphenate="true" text-align="center">
					<fo:retrieve-marker retrieve-class-name="chapter_title"/>
				</fo:block>
			</fo:static-content>
			<fo:static-content flow-name="footer">
				<fo:block hyphenate="true">
					<fo:table width="{$pagewidth} * 0.8" border-collapse="collapse" table-layout="fixed" hyphenate="false">
						<fo:table-column column-width="proportional-column-width(53)"/>
						<fo:table-column column-width="proportional-column-width(47)"/>
						<fo:table-body border-width="0mm">
							<fo:table-row>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
		 		                    - <fo:page-number/> - 
			                    </fo:block>
								</fo:table-cell>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
										<xsl:value-of select="$CURRENT_DATE"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:block>
			</fo:static-content>
			<fo:flow flow-name="index-body" xsl:use-attribute-sets="Index_Text">
				<fo:block hyphenate="true">
					<fo:marker color="black" marker-class-name="chapter_title">
					    <xsl:call-template name="NLS_translation">
  						           <xsl:with-param name="var_original" select="'nlsIndex'"/>
					    </xsl:call-template>

					</fo:marker>
				</fo:block>
				<ri:chapter>
					<fo:block hyphenate="true" xsl:use-attribute-sets="Index_Title" space-before.optimum="from-nearest-specified-value(font-size)" space-after.optimum="from-nearest-specified-value(font-size) * 2" keep-with-next="always">
						<ri:heading>
						  <xsl:call-template name="NLS_translation">
  						           <xsl:with-param name="var_original" select="'nlsIndex'"/>
					      </xsl:call-template>
                       </ri:heading>
					</fo:block>
					-->
		<!--*************************************************************************************************************
                               *  Here must be filled in the complete Index content   
							   ***************************************************************************************************************-->
		<!--
	
					<fo:block hyphenate="true" font-size="from-nearest-specified-value(font-size) * 1.3" space-after.optimum="from-nearest-specified-value(font-size)">
					
						<fo:block hyphenate="true" font-weight="bold" space-before.optimum="from-nearest-specified-value(space-after.optimum)" space-after.optimum="from-nearest-specified-value(space-after.optimum)">B</fo:block>
						<fo:block hyphenate="true" space-after.optimum="from-nearest-specified-value(space-after.optimum)">BO Game State, 6, 8</fo:block>
						<fo:block hyphenate="true" font-weight="bold" space-before.optimum="from-nearest-specified-value(space-after.optimum)" space-after.optimum="from-nearest-specified-value(space-after.optimum)">H</fo:block>
						<fo:block hyphenate="true" space-after.optimum="from-nearest-specified-value(space-after.optimum)">Horse Race, 5</fo:block>
						<fo:block hyphenate="true" space-after.optimum="from-nearest-specified-value(space-after.optimum)">Horse Race Process Interface, 6</fo:block>
						<fo:block hyphenate="true" space-after.optimum="from-nearest-specified-value(space-after.optimum)">Horse Race Rules, 5</fo:block>
                        
					</fo:block>
					 *********************************************************** end of index section -->
		<!--		 
				</ri:chapter>
			</fo:flow>
		</fo:page-sequence>
		-->
		<!--**************************************************************************************************
                  *  Now call template that append an additional sequence 
                  *  that contains all necessary informations to create the 
                  *  table of contents in the secong transformation step  
                  **************************************************************************************************-->
		<xsl:call-template name="create_struct"/>
		<!--**************************************************************************************************
                  *  The </fo:root> must be quoted, because the start tag is quoted, too. 
                  ***********************************************************************************************-->
		<xsl:value-of select="'&lt;/fo:root&gt;'" disable-output-escaping="yes"/>
	</xsl:template>
	<!--*****************************************************************************************************************
          ########################################################################
          #################### Child templates #######################################
          ########################################################################
          *****************************************************************************************************************-->
	<!--*************************************************************************
		********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
		**  Template-Task :  insert snippets  
        **
	    ** Template for :  root   (expected only as first level element)
        **  purpose:          select the ri:snippet element ( only one) and call 
        **                           the following templates on that context. 
        **
	    *************************************************************************-->
	<xsl:template match="root">
		<xsl:apply-templates select="ri:snippet"/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  insert snippets  
        **
	    ** Template for :  ri:snippet   (expected only one time found)
        **  purpose:          select all report unit snippets as the new 
        **						      context and call the following templates 
        **                           ( The element structure provided by a report 
        **                              unit starts always with <fo:flow flow-name="plugin-body" .. 
	    *************************************************************************-->
	<xsl:template match="ri:snippet">
		<xsl:apply-templates select="fo:flow[@flow-name = 'plugin-body']" mode="ru-snippet"/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  insert snippets  
        **
	    ** Template for :  fo:flow  flow-name="plugin-body" ( start element of a ru snippet)
        **  purpose:          select all report unit snippets as the new 
        **						      context and call the following templates 
        **                           ( The element structure provided by a report 
        **                              unit starts always with <fo:flow flow-name="plugin-body" .. 
	    *************************************************************************-->
	<xsl:template match="fo:flow" mode="ru-snippet">
		<fo:page-sequence master-reference="Plugin" xsl:use-attribute-sets="PlainText" text-align="left">
			<!-- **************************************************************************************
                   * static- content defines header and footer of each page. 
                   **************************************************************************************-->
			<fo:static-content flow-name="header">
				<xsl:copy-of select="$DocumentHeader"/>
			</fo:static-content>
			<fo:static-content flow-name="footer">
				<xsl:copy-of select="$DocumentFooter"/>
				<!--
				<fo:block hyphenate="true">
					<fo:table width="{$pagewidth} * 0.8" border-collapse="collapse" table-layout="fixed" hyphenate="false">
						<fo:table-column column-width="proportional-column-width(53)"/>
						<fo:table-column column-width="proportional-column-width(47)"/>
						<fo:table-body border-width="0mm">
							<fo:table-row>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
		 		                    - <fo:page-number/> - 
			                    </fo:block>
								</fo:table-cell>
								<fo:table-cell padding="2pt" border-width="0pt">
									<fo:block hyphenate="true" text-align="right" font-size="from-nearest-specified-value(font-size) * 1.1">
										<xsl:value-of select="$CURRENT_DATE"/>
									</fo:block>
								</fo:table-cell>
							</fo:table-row>
						</fo:table-body>
					</fo:table>
				</fo:block>
				-->
			</fo:static-content>
			<!-- **************************************************************************************
                   * flow contains the content for pages 
                   * - a marker is used to set the value for the "header" area  
                   **************************************************************************************-->
			<fo:flow flow-name="plugin-body">
				<fo:block hyphenate="false" font-size="from-nearest-specified-value(font-size) * 1.3">
					<fo:marker marker-class-name="chapter_title" xsl:use-attribute-sets="Header_Chapter">
						<xsl:value-of select="ri:chapter/*/ri:heading[1]"/>
					</fo:marker>
				</fo:block>
				<!-- *************************************************************************
                       ** copy the supplied content of each Report Unit snippet 
                       ** completely in here. 
                       *************************************************************************-->
				<xsl:copy-of select="./*"/>
			</fo:flow>
		</fo:page-sequence>
	</xsl:template>
	<!--*************************************************************************
		********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
		**  Template-Task :  create CrossReference 
        **
	    ** Template for :  ri:workspace  (expected only one time in the whole document)
        **  purpose:          get the value of the workspace directory and 
		**                           create fo:block into the report.
	    *************************************************************************-->
	<xsl:template match="ri:workspace" mode="crossref">
		<!-- ************************************************************************************
            *   fo:block to write the workspace value 
            ************************************************************************************** -->
		<fo:block hyphenate="true" xsl:use-attribute-sets="DefinitionTextL1" keep-with-next="always">
			<xsl:call-template name="NLS_translation">
				<xsl:with-param name="var_original" select="'nlsWorkspaceRootPath'"/>
			</xsl:call-template>
			<fo:leader xsl:use-attribute-sets="InlineSpace1"/>
			<xsl:value-of select="./@value"/>
		</fo:block>
		<fo:block xsl:use-attribute-sets="Space1"/>
	</xsl:template>
	<!-- ************************************************************
        **  Template-Task :  create CrossReference table - Using  
        **
	    ** Template for :  ri:resource  
        **  purpose:          Fill line by line into the Providers list 
	    *************************************************************************-->
	<xsl:template match="ri:resource" mode="cr1">
		<!--FIX: defect 45981 JO-->
		<xsl:for-each select="./ri:reference[generate-id(.)=generate-id(key('usedFiles',./@name)[1])]">
			<xsl:apply-templates select="." mode="cr1"/>
		</xsl:for-each>
		<!--<xsl:apply-templates select="./ri:reference" mode="cr1"/>-->
	</xsl:template>
	<xsl:template match="ri:reference" mode="cr1">
		<fo:table-row>
			<!-- first unvisible dummy row for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_TableText">
					<xsl:value-of select="../@name"/>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_TableText">
					<xsl:value-of select="./@name"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<!-- ************************************************************
        **  Template-Task :  create CrossReference table - UsedBy 
        **
	    ** Template with name: crossRefUsedByTemplate" mode="cr2"
        **  purpose:          Fill line by line into the Callee list 
	    *************************************************************************-->
	<xsl:template name="crossRefUsedByTemplate">
		<!-- ************************************************************
                 ** baue nodeset mit allen wbi:ref elementen und sortiere 
                 ** nach dem Namen attribute
                 *******************************************************************-->
		<!--FIX: defect  45981  JO-->
		<xsl:for-each select="//ri:crossrefchapter//ri:reference[generate-id(.)=generate-id(key('usedFiles',./@name)[1])]">
			<xsl:apply-templates select="." mode="cr2b"/>
		</xsl:for-each>
		<!--	<xsl:apply-templates select="//ri:crossrefchapter/ri:resource/ri:reference" mode="cr2">
		                
		<xsl:sort select="@name" order="ascending" data-type="text"/>
		</xsl:apply-templates>-->
	</xsl:template>
	<!-- ************************************************************
                 ** template for used reference table wird für jedes 
                 ** element der sortierten NodeSets gerufen 
                 ** e.g (  a.wsdl, a.wsdl, b.wsdl, c.wsdl )
                 *******************************************************************-->
	<xsl:template match="ri:reference" mode="cr2">
		<!-- ************************************************************
                 **Regel: Jedes Element in der sortierten Liste darf nur 
                 ** einmal aufgerufen werden. Implementierung ist am 
                 ** einfachsten, wenn das letzte gefunden bearbeitet wird 
                 ** und alle vorgänger ignoriert. 
                 **  Filenamen werden case sensitive betrachtet.
                 *******************************************************************-->
		<!--	<xsl:variable name="currentName" select="@name"/>
		<xsl:variable name="numOfOccurances" select="count(following::name[@name = $currentName])"/>-->
		<!-- ************************************************************
                 ** Prüfen, ob letztes Vorkommen, dann behandeln
                 *******************************************************************-->
		<!--	<xsl:if test="$numOfOccurances = 0 ">-->
		<!-- ************************************************************
                 ** Aus der key liste alle elemente durchgehen, die 
                 ** den aktuellen referenced file namen haben 
                 *******************************************************************-->
		<!--</xsl:if>-->
	</xsl:template>
	<!-- ************************************************************
                 ** template zur Ausgabe jedes Elements aus der Liste. 
                 ** mit den zugehörigen Infos für die Zeile
                 *******************************************************************-->
	<xsl:template match="ri:reference" mode="cr2b">
		<fo:table-row>
			<!-- first unvisible dummy row for indentation -->
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_TableText">
					<xsl:value-of select="./@name"/>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="solid" padding="2pt" border-color="{$borderColor}">
				<fo:block hyphenate="true" xsl:use-attribute-sets="CrossRef_TableText">
					<xsl:value-of select="../@name"/>
				</fo:block>h
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<!--*************************************************************************
		********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:report-settings  (expected only as first level element)
        **  purpose:          create the content for the Appendix chapter 
        **                           that contains the settings for the report.  
        **
	    *************************************************************************-->
	<xsl:template match="ri:report-settings">
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:project-name
        **  purpose:          create a table row that contain the project name
        **
	    *************************************************************************-->
	<xsl:template match="ri:project-name">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsReportGenerationSettingsProjectName'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@name"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:author
        **  purpose:          create a table row that contain the project author
        **
	    *************************************************************************-->
	<xsl:template match="ri:author">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsReportGenerationSettingsReportAuthor'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block id="ProjectAuthor Row" xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@name" disable-output-escaping="no"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:date
        **  purpose:          create a table row that contain the project date
        **
	    *************************************************************************-->
	<xsl:template match="ri:date">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsReportGenerationSettingsReportDate'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block id="ProjectDateRow" xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@creation-date"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:tableofcontents
        **  purpose:          create a table row that contain the defining of 
        **                           toclevel that will come to the table of contents   
	    *************************************************************************-->
	<xsl:template match="ri:tableofcontents">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsReportGenerationSettingsTocLevel'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText" id="ProjectTOCLevel Row">
					<xsl:value-of select="@level"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  create_ReportSettingspage  
        **
	    ** Template for :  ri:layout-template
        **  purpose:          create a table row that contain the layout 
        **                           template name on that the report base on
	    *************************************************************************-->
	<xsl:template match="ri:layout-template">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:call-template name="NLS_translation">
						<xsl:with-param name="var_original" select="'nlsReportGenerationSettingsLayoutTemplate'"/>
					</xsl:call-template>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell>
				<fo:block xsl:use-attribute-sets="DefinitionText" id="ProjectLayoutTemplate Row">
					<xsl:value-of select="@name"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
		<xsl:apply-templates/>
	</xsl:template>
	<!--*************************************************************************
		********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
		**  Template-Task :  create_ReportSettingspage - RU settings 
        **
	    ** Template for :  ri:reportunit  ( called directly by main template) 
        **  purpose:          create a table row that contain the setting for 
        **                           one use report unit plugin and resource 
	    *************************************************************************-->
	<xsl:template match="ri:reportunit" mode="reportchapters">
		<fo:table-row>
			<fo:table-cell>
				<fo:block/>
			</fo:table-cell>
			<fo:table-cell border-style="solid" border-width="1pt" padding="2pt">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@source"/>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border-style="solid" border-width="1pt" padding="2pt">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@name"/>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border-style="solid" border-width="1pt" padding="2pt">
				<fo:block xsl:use-attribute-sets="DefinitionText">
					<xsl:value-of select="@type"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>
	</xsl:template>
	<!--****************************************************************************
        ********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
        **  Template-Task :  do_struct 
        **
	    ** Template for :   ( directly called from main template ) 
        **  purpose: copy all ri:* elements into a ri:structure element 
        **                  for later use to create the TOC. This structure will 
        **                  contain all chapter and heading elements. The 
        **                  chapter elements are assigned an unique 
        **                  chapter_identifier. The rule is: 
        **                  "chptr1", "chptr2"  ... were the number is the 
        **                  position in the input xml file. 
	    *************************************************************************-->
	<xsl:template name="create_struct">
		<ri:structure>
			<!--**********************************************************************
                *  build a new context ( ri:snippet ), on which the chapter 
                *  structure will be build using subsequent templates 
                **********************************************************************-->
			<xsl:apply-templates select="//ri:snippet" mode="do_struct"/>
			<!--**********************************************************************
                *  add elements  to the ri:structure output element for 
                *  ( crossRef and index ) in the same format as the  found chapters 
                *  within the ru snippets are represented. 
                *  Format:  <ri: chapter chapter_identifier="chptr7"> <ri:heading>My Task</ri:heading></ri:chapter>
                **********************************************************************-->
			<xsl:variable name="total_num_of_chapters" select="count(/root/ri:snippet//ri:chapter)"> 
                </xsl:variable>
			<xsl:if test="//ri:crossrefchapter/ri:resource">
				<ri:chapter>
					<xsl:attribute name="chapter_identifier"><xsl:value-of select="concat('chptr',$total_num_of_chapters + 1)"/></xsl:attribute>
					<ri:heading>
						<xsl:call-template name="NLS_translation">
							<xsl:with-param name="var_original" select="'nlsCrossReference'"/>
						</xsl:call-template>
					</ri:heading>
				</ri:chapter>
			</xsl:if>
			<!--
			<ri:chapter>
				<xsl:attribute name="chapter_identifier"><xsl:value-of select="concat('chptr',$total_num_of_chapters + 2)"/></xsl:attribute>
				<ri:heading>Index</ri:heading>
			</ri:chapter>
			-->
		</ri:structure>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  do_struct 
        **
	    ** Template for :   all  ri:chapter | ri:heading
        **  purpose: copy the ri:chapter/ri:heading elements into a ri:structure element 
        **                  for later use to create the TOC 
        **
	    *************************************************************************-->
	<xsl:template match="ri:chapter | ri:heading" mode="do_struct">
		<xsl:copy>
			<!-- *********************************************************
                  * set the chapter_id for all elements of type ri:chapter 
                  * ( the test statement is so complex, because the 
                  * node() function do not work ) <xsl:if test="../ri:chapter = .">
                  **********************************************************-->
			<xsl:if test="name(.) = 'ri:chapter'">
				<xsl:variable name="chapter_pos">
					<xsl:number level="any" count="ri:chapter"> </xsl:number>
				</xsl:variable>
				<xsl:attribute name="chapter_identifier"><xsl:value-of select="concat('chptr', $chapter_pos) "/></xsl:attribute>
			</xsl:if>
			<xsl:apply-templates select="text()|@*" mode="children_of_ri_element"/>
			<xsl:apply-templates mode="do_struct"/>
		</xsl:copy>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  do_struct 
        **
	    ** Template for :   all  elements (*)   ( called in mode do_struct )
        **  purpose: do not copy the elements to output in this mode
        **
	    *************************************************************************-->
	<xsl:template match="*" mode="do_struct">
		<xsl:apply-templates select="node()" mode="do_struct"/>
	</xsl:template>
	<!--*************************************************************************
		**  Template-Task :  do_struct 
        **
	    ** Template for :   all  text and attribute child nodes 
        **  purpose: do not copy the elements to output in this mode 
        **
	    *************************************************************************-->
	<xsl:template match="text()|@*" mode="do_struct">     
       </xsl:template>
	<!--*************************************************************************
		**  Template-Task :  do_struct 
        **
	    ** Template for :  text and attribute nodes 
        **  purpose: copy all text and attribute children of ri:chapter and ri:heading elements 
        **                  to output 
        **
	    *************************************************************************-->
	<xsl:template match="text()|@*" mode="children_of_ri_element">
		<xsl:value-of select="."/>
	</xsl:template>
	<!--********************************************************************************************
		* Utility template :  Create a header cell for the element / attribute table
        *                              As parameter "text" are only values allowed that are 
        *                              values in the NLS_translation 
	    ********************************************************************************************-->
	<xsl:template name="MakeHeaderCell">
		<xsl:param name="text"/>
		<fo:table-cell border="solid" padding="2pt" background-color="{$tableHeaderBackgroundColor}" border-color="{$borderColor}">
			<fo:block hyphenate="true" xsl:use-attribute-sets="DefinitionText">
				<xsl:call-template name="NLS_translation">
					<xsl:with-param name="var_original" select="$text"/>
				</xsl:call-template>
			</fo:block>
		</fo:table-cell>
	</xsl:template>
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
