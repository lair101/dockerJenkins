<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
	<!--*********************************************************************************-->
	<!-- Parameter section:   Values overwritable from caller                          -->
	<!--*********************************************************************************-->
	<!--*************************************************************************-->
	<!-- translation file for this XSLT                                                      -->
	<!--*************************************************************************-->
	<xsl:param name="dictionary" select="'ReportInfrastructure_NLS_Dictionary.xml'"/>
	<xsl:variable name="doc-file" select="$dictionary"/>
	<!---->
	<!--*************************************************************************-->
	<!--Input parameter - background_title_image                                -->
	<!--*************************************************************************-->
	<xsl:param name="background_title_image" select="no_background"/>
	<!---->
	<!--*************************************************************************-->
	<!-- default toc level                                                                     -->
	<!--*************************************************************************-->
	<xsl:param name="toclevel" select="'5'"/>
	<!--Parameters to support settings of bullet signs in later versions -->
	<xsl:param name="DOT_MEDIUM" select="'&#x2022;  '"/>
	<xsl:param name="DOT_LARGE" select="'&#x261E;  '"/>
	<!--page layout settings	-->
	<xsl:param name="pageheightinput" select="'297mm'"/>
	<xsl:param name="pagewidthinput" select="'210mm'"/>
	<xsl:param name="pagemargintopfactor" select="'0.03'"/>
	<xsl:param name="pagemarginbottomfactor" select="'0.03'"/>
	<xsl:param name="pagemarginleftfactor" select="'0.08'"/>
	<xsl:param name="pagemarginrightfactor" select="'0.08'"/>
	<!--cover settings-->
	<xsl:param name="AUTHOR" select="'Sample Author'"/>
	<xsl:param name="TITLE" select="'Sample Title'"/>
	<xsl:param name="CURRENT_DATE" select="'aa.aa.aaaa'"/>
	<!-- -->
	<xsl:variable name="pageheight" select="$pageheightinput"/>
	<xsl:variable name="pagewidth" select="$pagewidthinput"/>
	<xsl:variable name="margintop" select="concat($pageheightinput,  '*' , $pagemargintopfactor)"/>
	<xsl:variable name="marginbottom" select="concat($pageheightinput,  '*', $pagemarginbottomfactor)"/>
	<xsl:variable name="marginleft" select="concat($pagewidthinput,  '*',  $pagemarginleftfactor)"/>
	<xsl:variable name="marginright" select="concat($pagewidthinput,  '*',  $pagemarginrightfactor)"/>
	<!--  is a newline character -->
	<xsl:param name="eol" select="'&#xA;'"/>
	<!--TOC chapter font settings-->
	<xsl:param name="TableOfContentsChapterFont" select="'Helvetica'"/>
	<xsl:param name="TableOfContentsChapterFontStyle" select="'normal'"/>
	<xsl:param name="TableOfContentsChapterFontWeight" select="'normal'"/>
	<xsl:param name="TableOfContentsChapterFontSize">((<xsl:value-of select="$pageheight"/>)-(<xsl:value-of select="$margintop"/>)-(<xsl:value-of select="$marginbottom"/>))*0.011283043</xsl:param>
	<xsl:param name="TableOfContentsChapterFontColor" select="'black'"/>
	<!-- -->
	<!--Index chapter font settings-->
	<!--
	<xsl:param name="IndexChapterFont" select="'Helvetica'"/>
	<xsl:param name="IndexChapterFontStyle" select="'normal'"/>
	<xsl:param name="IndexChapterFontWeight" select="'normal'"/>
	<xsl:param name="IndexChapterFontSize" select="'from-nearest-specified-value(font-size)*1.1'"/>
	<xsl:param name="IndexChapterFontColor" select="'black'"/>
	-->
	<!--  variable for document header line at top of each page  -->
	<xsl:variable name="DocumentHeader">
		<!--Fix for defect 51192-->
		<fo:block text-align-last="justify" border-bottom-style="solid" border-bottom-color="rgb(112,112,112)" border-bottom-width="1pt">
			<fo:retrieve-marker retrieve-class-name="chapter_title"/>
			<fo:inline color="rgb(255,255,255)">.</fo:inline>
			<fo:inline keep-together.within-line="always">
				<fo:leader leader-alignment="reference-area" keep-with-next.within-line="always"/>
				<fo:leader xsl:use-attribute-sets="Header_Text" leader-length="{$pagewidth}*0.01"/>
				<fo:inline xsl:use-attribute-sets="Header_Text">
					<xsl:value-of select="$CURRENT_DATE"/>
				</fo:inline>
			</fo:inline>
			<!-- Defect 51192-->
			<!--<fo:block>
		<fo:table table-layout="fixed" hyphenate="true" width="({$pagewidth})-({$marginleft})-({$marginright})">
			<fo:table-column column-width="proportional-column-width(50)"/>
			<fo:table-column column-width="proportional-column-width(50)"/>
			<fo:table-body>
				<fo:table-row>
					<fo:table-cell>
						<fo:block xsl:use-attribute-sets="Header_Chapter" >-->
			<!-- append an invisible dot, so that there is no gap when the chapetr header is empty -->
			<!--<fo:retrieve-marker retrieve-class-name="chapter_title"/><fo:inline color="rgb(255,255,255)">.</fo:inline>							
						</fo:block>
					</fo:table-cell>
					<fo:table-cell>
						<fo:block xsl:use-attribute-sets="Header_Label">
							<fo:inline xsl:use-attribute-sets="Header_Label">
								<xsl:call-template name="NLS_translation">
									<xsl:with-param name="var_original" select="'nlsDateOnTitlePage'"/>
								</xsl:call-template>
							</fo:inline>
							<fo:leader xsl:use-attribute-sets="Header_Text" leader-length="{$pagewidth}*0.01"/>
							<fo:inline xsl:use-attribute-sets="Header_Text">
								<xsl:value-of select="$CURRENT_DATE"/>
							</fo:inline>
						</fo:block>
					</fo:table-cell>
				</fo:table-row>
			</fo:table-body>
		</fo:table>-->
		</fo:block>
	</xsl:variable>
	<!--  variable for document footer line at bottom of each page  -->
	<xsl:variable name="DocumentFooter">
		<fo:block hyphenate="true">
			<fo:table width="({$pagewidth})-({$marginleft})-({$marginright})" border-collapse="collapse" table-layout="fixed" hyphenate="true">
				<fo:table-column column-width="proportional-column-width(100)"/>
				<fo:table-body>
					<fo:table-row>
						<fo:table-cell>
							<fo:block xsl:use-attribute-sets="Footer_Text">
	 		                    - <fo:page-number/> -
			                 </fo:block>
						</fo:table-cell>
					</fo:table-row>
				</fo:table-body>
			</fo:table>
		</fo:block>
	</xsl:variable>
</xsl:stylesheet>
