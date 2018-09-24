<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_MRG (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'MRG';
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.1.PriorPatientIdentifierList".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.2.PriorAlternatePatientID".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.3.PriorPatientAccountNumber".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.4.PriorPatientID".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.5.PriorVisitNumber".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"MRG.6.PriorAlternateVisitID".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.1".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.1".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.1".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.1".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.1".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.2" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.3" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.4" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.5" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.6" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.7" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.8" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.10".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.10".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.11" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.12" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.13" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.14" = AssignValue;
		SET OutRef.ns:"MRG.7.PriorPatientName".ns:"XPN.15" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>