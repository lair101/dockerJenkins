<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_FTS (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'FTS';
		SET OutRef.ns:"FTS.1.FileBatchCount" = AssignValue;
		SET OutRef.ns:"FTS.2.FileTrailerComment" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>