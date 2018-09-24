<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_ECR">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="ECR"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.1.CommandResponse/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.2.DateTimeCompleted\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ECR.3.CommandResponseParameters\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>