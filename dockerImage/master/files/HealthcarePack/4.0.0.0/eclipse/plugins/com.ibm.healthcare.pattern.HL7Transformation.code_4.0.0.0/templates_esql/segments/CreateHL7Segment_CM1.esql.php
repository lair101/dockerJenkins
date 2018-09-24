<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_CM1 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'CM1';
		SET OutRef.ns:"CM1.1.SetIDCM1" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM1.2.StudyPhaseIdentifier".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM1.3.DescriptionofStudyPhase" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>