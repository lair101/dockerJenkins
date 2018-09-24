<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_PRT (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'PRT';
		SET OutRef.ns:"PRT.1.ParticipationInstanceID".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PRT.1.ParticipationInstanceID".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PRT.1.ParticipationInstanceID".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PRT.1.ParticipationInstanceID".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PRT.2.ActionCode" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.3.ActionReason".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.4.Participation".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.2".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.2".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.2".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.2".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.2".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.6" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.7" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.8".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.9".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.9".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.9".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.10" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.11" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.12" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.13" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.14".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.14".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.14".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.15" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.17".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.17".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.18" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.19" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.20" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.21" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.23".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.24" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:"XCN.25" = AssignValue;
		SET OutRef.ns:"PRT.5.ParticipationPerson".ns:Remainder = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.6.ParticipationPersonProviderType".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.7.ParticipantOrganizationUnitType".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.1" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.3" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.4" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.5" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.7" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.8".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.8".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.8".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.9" = AssignValue;
		SET OutRef.ns:"PRT.8.ParticipationOrganization".ns:"XON.10" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.1".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.1".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.1".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.2".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.2".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.2".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.3".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.3".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.3".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.5" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.6" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.7".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.7".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.7".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.8".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.8".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.8".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.9" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.10".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.10".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.10".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.10".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.11".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.11".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"PRT.9.ParticipantLocation".ns:"PL.11".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"PRT.10.ParticipationDevice".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PRT.10.ParticipationDevice".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PRT.10.ParticipationDevice".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PRT.10.ParticipationDevice".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PRT.11.ParticipationBeginDateTime" = AssignValue;
		SET OutRef.ns:"PRT.12.ParticipationEndDateTime" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.13.ParticipationQualitativeDuration".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.1".ns:"SAD.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.1".ns:"SAD.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.1".ns:"SAD.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.4" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.5" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.6" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.7" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.8" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.11" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.12".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.12".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.13" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.14" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.15".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.16" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.17" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.18" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.19" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.20" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.21" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.23".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.23".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.23".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PRT.14.ParticipationAddress".ns:"XAD.23".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.2" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.3" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.4" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.5" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.6" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.7" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.8" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.9" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.10" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.11" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.12" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.13" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.14" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.15".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.17".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.17".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.17".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.17".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PRT.15.ParticipantTelecommunicationAddress".ns:"XTN.18" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>