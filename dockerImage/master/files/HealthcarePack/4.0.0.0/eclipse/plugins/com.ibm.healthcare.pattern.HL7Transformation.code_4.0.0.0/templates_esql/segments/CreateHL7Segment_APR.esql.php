<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_APR (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'APR';
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"APR.1.TimeSelectionCriteria".ns:"SCV.2" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"APR.2.ResourceSelectionCriteria".ns:"SCV.2" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"APR.3.LocationSelectionCriteria".ns:"SCV.2" = AssignValue;
		SET OutRef.ns:"APR.4.SlotSpacingCriteria" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"APR.5.FillerOverrideCriteria".ns:"SCV.2" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>