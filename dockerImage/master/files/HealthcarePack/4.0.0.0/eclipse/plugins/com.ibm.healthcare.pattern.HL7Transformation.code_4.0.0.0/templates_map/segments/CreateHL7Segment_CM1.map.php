<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_CM1">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="CM1"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.1.SetIDCM1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.2.StudyPhaseIdentifier/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"CM1.3.DescriptionofStudyPhase\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>