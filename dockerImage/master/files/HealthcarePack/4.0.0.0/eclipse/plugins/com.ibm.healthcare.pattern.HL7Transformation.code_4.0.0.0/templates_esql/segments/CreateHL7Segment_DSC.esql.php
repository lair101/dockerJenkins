<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_DSC (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'DSC';
		SET OutRef.ns:"DSC.1.ContinuationPointer" = AssignValue;
		SET OutRef.ns:"DSC.2.ContinuationStyle" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>