<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_RDF (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'RDF';
		SET OutRef.ns:"RDF.1.NumberofColumnsperRow" = AssignValue;
		SET OutRef.ns:"RDF.2.ColumnDescription".ns:"RCD.1" = AssignValue;
		SET OutRef.ns:"RDF.2.ColumnDescription".ns:"RCD.2" = AssignValue;
		SET OutRef.ns:"RDF.2.ColumnDescription".ns:"RCD.3" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>