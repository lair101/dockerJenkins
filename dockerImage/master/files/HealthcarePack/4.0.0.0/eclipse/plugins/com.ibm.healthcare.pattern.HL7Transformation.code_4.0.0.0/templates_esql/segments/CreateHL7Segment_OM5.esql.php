<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_OM5 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'OM5';
		SET OutRef.ns:"OM5.1.SequenceNumberTestObservationMasterFile" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM5.2.TestObservationsIncludedwithinanOrderedTestBattery".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM5.3.ObservationIDSuffixes" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>