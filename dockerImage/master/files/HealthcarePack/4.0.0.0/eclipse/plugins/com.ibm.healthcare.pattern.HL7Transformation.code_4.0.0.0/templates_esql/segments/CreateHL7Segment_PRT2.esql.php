<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_PRT2 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'PRT2';
	END;
ESQL;
?>