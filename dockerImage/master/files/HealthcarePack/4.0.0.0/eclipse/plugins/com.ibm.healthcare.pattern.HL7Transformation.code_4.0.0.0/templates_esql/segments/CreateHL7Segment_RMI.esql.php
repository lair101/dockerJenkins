<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_RMI (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'RMI';
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RMI.1.RiskManagementIncidentCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RMI.2.DateTimeIncident" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RMI.3.IncidentTypeCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>