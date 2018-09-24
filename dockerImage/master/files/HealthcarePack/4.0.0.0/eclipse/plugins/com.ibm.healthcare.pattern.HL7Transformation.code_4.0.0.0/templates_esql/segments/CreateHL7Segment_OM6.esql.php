<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_OM6 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'OM6';
		SET OutRef.ns:"OM6.1.SequenceNumberTestObservationMasterFile" = AssignValue;
		SET OutRef.ns:"OM6.2.DerivationRule" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>