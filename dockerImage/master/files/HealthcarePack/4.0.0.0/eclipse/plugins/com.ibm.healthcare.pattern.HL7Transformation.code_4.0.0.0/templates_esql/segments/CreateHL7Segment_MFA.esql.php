<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_MFA (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'MFA';
		SET OutRef.ns:"MFA.1.RecordLevelEventCode" = AssignValue;
		SET OutRef.ns:"MFA.2.MFNControlID" = AssignValue;
		SET OutRef.ns:"MFA.3.EventCompletionDateTime" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MFA.4.MFNRecordLevelErrorReturn".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MFA.6.PrimaryKeyValueTypeMFA" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>