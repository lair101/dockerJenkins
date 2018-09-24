<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_NPU (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'NPU';
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.1".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.1".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.1".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.2".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.2".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.2".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.3".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.3".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.3".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.5" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.6" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.7".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.7".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.7".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.8".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.8".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.8".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.9" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.10".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.10".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.10".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.10".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.11".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.11".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"NPU.1.BedLocation".ns:"PL.11".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"NPU.2.BedStatus".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>