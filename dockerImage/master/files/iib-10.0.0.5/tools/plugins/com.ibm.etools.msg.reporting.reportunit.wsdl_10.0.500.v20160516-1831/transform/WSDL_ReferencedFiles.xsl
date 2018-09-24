<?xml version="1.0" encoding="UTF-8"?>
<!--
 Licensed Materials - Property of IBM

 5724-I66

 © Copyright IBM Corporation 2000, 2008. All Rights Reserved. 

 Note to U.S. Government Users Restricted Rights:  Use, duplication or disclosure restricted by GSA ADP  Schedule Contract with IBM Corp. 

 -->
<!--
	* Stylesheet to extract the so called "referenced files" for an interface.
	* The input file is an WSDL file and if specified, a parameter when only a special interface within the WSDL file should be used
	* 	
	* The following files are treated as referenced files:
	*
	*	All types (xsd attribute "type" of all input/outoput/fault variables
	*
	* The found referenced files and the according namespaces are returned in XML format as follows:
	*
    * <?xml version="1.0" encoding="UTF-8"?>
    * 	<ri:referencedFiles xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/">
    *		<ri:resource>
    * 			<ri:name>BO_1</ri:name>
    *			<ri:namespace>nameSpace_1</ri:namespace>
    *		</ri:resource>
    *		<ri:resource>
    *			<ri:name>BO_2</ri:name>
    *			<ri:namespace>nameSpace_2</ri:namespace>
    *		</ri:resource>*
    *		<ri:resource>
    *			<ri:name>BO3</ri:name>
    *			<ri:namespace>http://bin/BO3</ri:namespace>
    *		</ri:resource>
    *				.
    *				.	
    *				.
    *				.
    * 	</ri:referencedFiles>
	*
	*
	* Parameters: selectedInterface
	*                    If this paramter is set, only the referenced files for this data type (complexType) are returned.
	*
	* Return: 		A string containing the referenced files as described above.
	*					
 -->
<xsl:stylesheet version="1.0" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:ri="http://www.ibm.com/xmlns/prod/websphere/wbi/ReportingInfrastructure/" exclude-result-prefixes="ri xsd wsdl">
	<xsl:output method="xml"/>
	<!---->
	<xsl:template match="/">
		<ri:referencedFiles>			
			<xsl:apply-templates select="//xsd:schema/xsd:include[@schemaLocation] | //xsd:schema/xsd:import[@schemaLocation]"/>
			<xsl:apply-templates select="//wsdl:import[@location]"/>
		</ri:referencedFiles>
	</xsl:template>
	<!---->
	<xsl:template match="xsd:include[@schemaLocation] | xsd:import[@schemaLocation]">
		<ri:resource>
					<ri:name><xsl:value-of select="@schemaLocation"/></ri:name>
					<ri:namespace><xsl:value-of select="@schemaLocation"/></ri:namespace>						
		</ri:resource>
	</xsl:template>
	<xsl:template match="wsdl:import[@location]">
		<ri:resource>
					<ri:name><xsl:value-of select="@location"/></ri:name>
					<ri:namespace><xsl:value-of select="@location"/></ri:namespace>						
		</ri:resource>
	</xsl:template>
	<!---->	
</xsl:stylesheet>
