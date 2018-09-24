<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_OM5">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="OM5"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.1.SequenceNumberTestObservationMasterFile\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"OM5.3.ObservationIDSuffixes\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>