<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_URD (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'URD';
		SET OutRef.ns:"URD.1.RUDateTime".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"URD.1.RUDateTime".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"URD.2.ReportPriority" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.2".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.2".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.2".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.2".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.2".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.6" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.7" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.8".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.9".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.9".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.9".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.10" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.11" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.12" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.13" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.14".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.14".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.14".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.15" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.17".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.17".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.18" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.19" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.20" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.21" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.23".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.24" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:"XCN.25" = AssignValue;
		SET OutRef.ns:"URD.3.RUWhoSubjectDefinition".ns:Remainder = AssignValue;
		SET OutRef.ns:"URD.6.RUDisplayPrintLocations" = AssignValue;
		SET OutRef.ns:"URD.7.RUResultsLevel" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>