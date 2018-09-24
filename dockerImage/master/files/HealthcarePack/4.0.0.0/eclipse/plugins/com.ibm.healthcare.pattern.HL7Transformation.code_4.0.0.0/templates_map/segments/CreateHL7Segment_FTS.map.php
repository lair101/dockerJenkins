<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_FTS">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="FTS"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"FTS.1.FileBatchCount\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"FTS.2.FileTrailerComment\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>