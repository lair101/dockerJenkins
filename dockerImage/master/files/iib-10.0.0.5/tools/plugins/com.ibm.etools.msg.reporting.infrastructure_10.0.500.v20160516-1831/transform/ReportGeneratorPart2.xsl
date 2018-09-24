<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:fox="http://xml.apache.org/fop/extensions" exclude-result-prefixes="fo fox">
	<!--*************************************************************************-->
	<!--  Stylesheet:  ReportGenerator Part 2                                     -->
	<!--                                                                                           -->
	<!--************************************************************************-->
	<!-- Include section:			                                                        -->
	<!--*************************************************************************-->
	<xsl:include href="Common_Parameters.xsl"/>		
	<xsl:include href="Common_AttributeSets.xsl"/>
	<xsl:include href="Reporting_Parameters.xsl"/>
	<xsl:include href="Reporting-AttributeSets.xsl"/>

	<!--*****************************************************************************************************************
          ########################################################################
          ####################   Main template   #######################################
          ########################################################################
          *****************************************************************************************************************-->
	<!--***************************************************************************
		**  Template-Task :  generates a complete report in fo format 
        **                                udses the "reportinterim.xml" as input. 
        **
	    ** Template for :   "/"
        **  purpose:             starts all necessary actions from here
        **
	    *************************************************************************-->
	<xsl:template match="/">
		<xsl:apply-templates select="fo:*" mode="do_copy"/>
	</xsl:template>
	<!--****************************************************************************
		**  Template-Task :  copy function 
        **
	    ** Template for :   "/fo:root"
        **  purpose:             copy the whole fo document part from the 
        **                              input to output. Do not copy the additional 
        **                              parts ( like ri:*) from input to output. 
	    *************************************************************************-->
	<xsl:template match="/fo:root" mode="do_copy">
		<xsl:copy>
			<!--*****************************************************************
                   * call template to copy all attrributes of the fo:root 
                   * element to the output 
                   *****************************************************************-->
			<xsl:apply-templates select="./@*" mode="do_copy"/>
			<!--*****************************************************************
                   * call all subelements of fo:root  starting with fo: to 
                   * copy them to them output 
                   *****************************************************************-->
			<xsl:apply-templates select="fo:*" mode="do_copy"/>
		</xsl:copy>
	</xsl:template>
	<!--****************************************************************************
        **  Template-Task :  copy function  
        **
	    ** Template for :   ri:heading
        **  purpose        :   A heading tag will not be copied to the output, 
        **                            only all content will be copied. 
        **                            But it is necessary to add a chapter number 
        **                            at the position where th <heading> is located. 
	    *************************************************************************-->
	<xsl:template match="ri:heading" mode="do_copy">
		<!--******************************************************************************
              * call the ri:chapter template with the chapter element, that is 
              * parent of the <ri:heading> element.
              ******************************************************************************-->
		<xsl:apply-templates select="ancestor::ri:chapter[1]" mode="chapter_numbering"/>
		<!--******************************************************************************
              * go on in copying, be calling susequential elements. 
              ******************************************************************************-->
		<xsl:apply-templates mode="do_copy"/>
	</xsl:template>
		<!--****************************************************************************
        **  Template-Task :  bulleting   
        **  
	    ** Template for :   ri:bullet  
        **  purpose		   :   insert an character entity, that will produce 
        **                            the requested bullet_type  
        *************************************************************************-->
	<xsl:template match="ri:bullet" mode="do_copy">
		<xsl:if test="@type ='dot_medium'">
		   <xsl:value-of select="$DOT_MEDIUM"></xsl:value-of>
		</xsl:if>
		<xsl:if test="@type ='dot_large'">
		   <xsl:value-of select="$DOT_LARGE"></xsl:value-of>
		</xsl:if>
	</xsl:template>
	<!--****************************************************************************
        **  Template-Task :  chapter_numbering   
        **  
	    ** Template for :   ri:chapter
        **  purpose		   :   writes the chapter numbering when called 
        **                            and adds an id in a fo:wrapper element for 
        **                            link destination in form of  "chptr1" ... 
        *************************************************************************-->
	<xsl:template match="ri:chapter" mode="chapter_numbering">
		<xsl:variable name="chapter_pos">
			<xsl:number level="any" count="ri:chapter"> </xsl:number>
		</xsl:variable>
		<xsl:variable name="chapter_id" select="concat('chptr', $chapter_pos) "/>
		<!-- **************************************************************************** 
               * get chapter numbering by reading the structure mirror in ri:structure
               ****************************************************************************-->
		<xsl:apply-templates select="/fo:root/ri:structure//ri:chapter[@chapter_identifier=$chapter_id]" mode="create_chapter_number"/>
		<!-- **************************************************************************** 
               * link destination for Table of content. 
               ****************************************************************************-->
		<fo:wrapper id="{$chapter_id}"/>
	</xsl:template>
	<!--****************************************************************************
        **  Template-Task :  chapter_numbering   
        **  
	    ** Template for :   ri:chapter   ( within ri:structure ) 
        **  purpose		   :   generate real chapter numbers like 4.1.2 
        *************************************************************************-->
	<xsl:template match="ri:chapter" mode="create_chapter_number">
		<xsl:number level="multiple" count="ri:chapter" format="1  "> </xsl:number>
	</xsl:template>
	<!--****************************************************************************
        **  Template-Task :  copy function  
        **
	    ** Template for :   ri:*
        **  purpose        :   copy nothing to output for ri:* elements
	    *************************************************************************-->
	<xsl:template match="ri:*" mode="do_copy">
		<xsl:apply-templates mode="do_copy"/>
	</xsl:template>
	<!--****************************************************************************
        **  Template-Task :  copy function  
        **
	    ** Template for :   ri:*
        **  purpose        :  Copy 1:1 of all elements, that are not  ri::heading, 
        **                            ri::chapter, ri::index ... 
	    *************************************************************************-->
	<xsl:template match="*|@*" mode="do_copy">
		<xsl:copy>
			<xsl:apply-templates select="node()|@*" mode="do_copy"/>
		</xsl:copy>
	</xsl:template>
	<!--****************************************************************************
        ********************* NEXT FUNCTIONALITY *************************
        *****************************************************************************
		**  Template-Task :  create_toc 
        **
	    ** Template for :   ri:toc_here
        **  purpose: fill a table of content to the position, where the 
        **                  place_holder (ri:toc_here) 
        **
	    *************************************************************************-->
	<xsl:template match="ri:toc_here" mode="do_copy">
		<xsl:apply-templates select="/fo:root/ri:structure" mode="create_toc"/>
	</xsl:template>
	
	<xsl:template match="ri:bookmarks_here" mode="do_copy">
		<xsl:apply-templates select="/fo:root/ri:structure/ri:chapter" mode="create_bookmarks"/>
	</xsl:template>
	
	<!--****************************************************************************
		**  Template-Task :  create_toc
        **
	    ** Template for :   "/ri:toc"  in mode create_toc
        **  purpose:             create a toc chapter from the content 
        **                              out of the ri:structure element 
	    *************************************************************************-->
	<xsl:template match="ri:structure" mode="create_toc">
		<xsl:for-each select=".//ri:chapter">		
		     <xsl:variable name="curlevel" select="count(ancestor-or-self::ri:chapter)"/>
		     <!--***********************************************************************
                   * check the toclevel value to decide, if a chapter comes into the 
                   * TOC or not. 
                   ************************************************************************-->
		     <xsl:if test="$curlevel &lt; ($toclevel +1)">
			    <xsl:call-template name="createTocEntry">
			         <xsl:with-param name="curTocLevel" select="$curlevel"/>
			    </xsl:call-template>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	
	<xsl:template match="ri:chapter" mode="create_bookmarks">
		<xsl:variable name="chapter_pos">
			<xsl:number level="any" count="ri:chapter"/>
		</xsl:variable>
		<xsl:variable name="chapter_id" select="concat('chptr', @chapter_identifier)"/>
		<fox:outline internal-destination="{@chapter_identifier}">
			<fox:label><xsl:value-of select=".//ri:heading[1]"/></fox:label>
			<xsl:apply-templates select="ri:chapter" mode="create_bookmarks"/>
		</fox:outline>
	</xsl:template>
	<!--****************************************************************************
		**  Template-Task :  create_toc
        **
	    ** Template for :   "/ri:chapter"  in mode create_toc
        **  purpose:             create a toc chapter from the content 
        **                              out of the ri:structure element 
	    *************************************************************************-->
	<xsl:template name="createTocEntry">
	    <xsl:param name="curTocLevel"/>     
		<fo:block xsl:use-attribute-sets="TOC_Text" hyphenate="true" text-indent="1mm * {$curTocLevel}" space-after.optimum="from-nearest-specified-value(font-size) * 0.2" text-align-last="justify">
			<!-- ******************************************************************************************
               *  - Identifiers for chapters from reportunit snippets get id numbers from 
               *    the position they occur in the xml file ( e.g.  chptr2 ,chptr4 .... ) 
               * 
               ***************************************************************************************** -->
			<xsl:variable name="chapter_id" select="concat('chptr', position( ))"/>
			<fo:basic-link internal-destination="{$chapter_id}">
			    <!--**********************************************************************************************
                      * xsl:number ... count works not on the current context, it works on the 
                      * element tree of the original input element. And on that tree it counts 
                      * the elements on the real leveling. Because of this it is necessary to 
                      * create the toc on base of the pre-build ri:structure. 
                      **********************************************************************************************-->
				<xsl:number level="multiple" count="ri:chapter" format="1  "> </xsl:number>
				<xsl:value-of select=".//ri:heading[1]"/>
				<fo:inline keep-together.within-line="always">
					<fo:leader leader-pattern="dots"/>
					<fo:page-number-citation ref-id="{$chapter_id}"/>
				</fo:inline>
			</fo:basic-link>			
		</fo:block>
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
