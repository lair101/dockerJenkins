<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_MSA (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'MSA';
		SET OutRef.ns:"MSA.1.AcknowledgementCode" = AssignValue;
		SET OutRef.ns:"MSA.2.MessageControlID" = AssignValue;
		SET OutRef.ns:"MSA.3.TextMessage" = AssignValue;
		SET OutRef.ns:"MSA.4.ExpectedSequenceNumber" = AssignValue;
		SET OutRef.ns:"MSA.5.DelayedAcknowledgmentType" = AssignValue;
		SET OutRef.ns:"MSA.7.MessageWaitingNumber" = AssignValue;
		SET OutRef.ns:"MSA.8.MessageWaitingPriority" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>