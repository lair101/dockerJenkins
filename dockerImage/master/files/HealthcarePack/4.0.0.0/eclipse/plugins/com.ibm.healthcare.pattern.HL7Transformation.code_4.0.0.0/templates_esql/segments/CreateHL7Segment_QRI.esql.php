<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_QRI (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'QRI';
		SET OutRef.ns:"QRI.1.CandidateConfidence" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"QRI.2.MatchReasonCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"QRI.3.AlgorithmDescriptor".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>