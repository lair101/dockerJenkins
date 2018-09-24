<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_EQP (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'EQP';
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"EQP.1.Eventtype".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"EQP.2.FileName" = AssignValue;
		SET OutRef.ns:"EQP.3.StartDateTime" = AssignValue;
		SET OutRef.ns:"EQP.4.EndDateTime" = AssignValue;
		SET OutRef.ns:"EQP.5.TransactionData" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>