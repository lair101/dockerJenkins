<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_NDS">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="NDS"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.1.NotificationReferenceNumber\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.2.NotificationDateTime\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.3.NotificationAlertSeverity/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"NDS.4.NotificationCode/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>