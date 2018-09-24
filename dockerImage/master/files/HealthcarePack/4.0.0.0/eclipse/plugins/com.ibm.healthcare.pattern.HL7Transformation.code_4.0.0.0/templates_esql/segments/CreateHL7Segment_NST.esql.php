<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_NST (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'NST';
		SET OutRef.ns:"NST.1.StatisticsAvailable" = AssignValue;
		SET OutRef.ns:"NST.2.SourceIdentifier" = AssignValue;
		SET OutRef.ns:"NST.3.SourceType" = AssignValue;
		SET OutRef.ns:"NST.4.StatisticsStart" = AssignValue;
		SET OutRef.ns:"NST.5.StatisticsEnd" = AssignValue;
		SET OutRef.ns:"NST.6.ReceiveCharacterCount" = AssignValue;
		SET OutRef.ns:"NST.7.SendCharacterCount" = AssignValue;
		SET OutRef.ns:"NST.8.MessagesReceived" = AssignValue;
		SET OutRef.ns:"NST.9.MessagesSent" = AssignValue;
		SET OutRef.ns:"NST.10.ChecksumErrorsReceived" = AssignValue;
		SET OutRef.ns:"NST.11.LengthErrorsReceived" = AssignValue;
		SET OutRef.ns:"NST.12.OtherErrorsReceived" = AssignValue;
		SET OutRef.ns:"NST.13.ConnectTimeouts" = AssignValue;
		SET OutRef.ns:"NST.14.ReceiveTimeouts" = AssignValue;
		SET OutRef.ns:"NST.15.ApplicationcontrollevelErrors" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>