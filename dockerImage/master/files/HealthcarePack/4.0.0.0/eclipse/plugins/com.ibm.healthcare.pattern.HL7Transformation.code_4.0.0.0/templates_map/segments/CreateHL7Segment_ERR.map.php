<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<MAP
<?xml version="1.0" encoding="UTF-8"?>
<mappingRoot domainID="com.ibm.msl.mapping.xml" domainIDExtension="mb" mainMap="false" targetNamespace="default" version="8.0.3.0" xmlns="http://www.ibm.com/2008/ccl/Mapping" xmlns:map="default">
	<input path="jar:file://!com/ibm/etools/mft/map/xsds/predefined/BlobMessage.xsd"/>
	<output path="/segments.xsd"/>
	<generation engine="xquery"/>
	<mappingDeclaration name="CreateHL7Segment_ERR">
		<input path="BLOB"/>
		<output namespace="urn:hl7-org:v2xml" path="ERR"/>
MAP;
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.1.ErrorCodeandLocation/ELD.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.1.ErrorCodeandLocation/ELD.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.1.ErrorCodeandLocation/ELD.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.2.ErrorLocation/ERL.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.3.HL7ErrorCode/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.4.Severity\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.5.ApplicationErrorCode/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.6.ApplicationErrorParameter\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.7.DiagnosticInformation\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.8.UserMessage\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.9.InformPersonIndicator/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.10.OverrideType/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.11.OverrideReasonCode/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.15/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.5\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.6\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.7\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.8\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.9\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.10\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.11\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.12\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.13\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.14\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.15\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.16\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.17\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.19\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.20\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.21\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.16/CWE.22\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.17/EI.1\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.17/EI.2\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.17/EI.3\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.17/EI.4\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"ERR.12.HelpDeskContactPoint/XTN.18\"/>\n";
echo			"</assign>\n";
echo			"<assign value=\"$assignValue\">\n";
echo				"<output path=\"Remainder\"/>\n";
echo			"</assign>\n";
echo	"</mappingDeclaration>\n";
echo	"</mappingRoot>\n";
?>