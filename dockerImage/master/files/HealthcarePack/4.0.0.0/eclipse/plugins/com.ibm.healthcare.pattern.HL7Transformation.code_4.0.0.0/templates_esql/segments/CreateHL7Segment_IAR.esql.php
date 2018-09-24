<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_IAR (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'IAR';
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"IAR.1.AllergyReactionCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"IAR.2.AllergySeverityCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"IAR.3.SensitivitytoCausativeAgentCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"IAR.4.Management" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>