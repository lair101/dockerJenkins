<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_QID (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'QID';
		SET OutRef.ns:"QID.1.QueryTag" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"QID.2.MessageQueryName".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>