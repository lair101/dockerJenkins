<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_BTS (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'BTS';
		SET OutRef.ns:"BTS.1.BatchMessageCount" = AssignValue;
		SET OutRef.ns:"BTS.2.BatchComment" = AssignValue;
		SET OutRef.ns:"BTS.3.BatchTotals" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>