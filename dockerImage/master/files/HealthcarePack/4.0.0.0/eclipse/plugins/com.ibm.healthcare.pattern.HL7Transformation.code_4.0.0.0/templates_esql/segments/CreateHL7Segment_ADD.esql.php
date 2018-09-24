<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_ADD (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'ADD';
		SET OutRef.ns:"ADD.1.AddendumContinuationPointer" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>