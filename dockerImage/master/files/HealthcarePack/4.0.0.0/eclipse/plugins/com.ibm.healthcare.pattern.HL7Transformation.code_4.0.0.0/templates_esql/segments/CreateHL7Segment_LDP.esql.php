<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_LDP (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'LDP';
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.1".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.1".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.1".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.2".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.2".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.2".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.3".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.3".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.3".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.5" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.6" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.7".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.7".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.7".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.8".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.8".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.8".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.9" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.10".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.10".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.10".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.10".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.11".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.11".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"LDP.1.PrimaryKeyValueLDP".ns:"PL.11".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.2.LocationDepartment".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.3.LocationService".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.4.SpecialtyType".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.5.ValidPatientClasses".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.6.ActiveInactiveFlag" = AssignValue;
		SET OutRef.ns:"LDP.7.ActivationDateLDP" = AssignValue;
		SET OutRef.ns:"LDP.8.InactivationDateLDP" = AssignValue;
		SET OutRef.ns:"LDP.9.InactivatedReason" = AssignValue;
		SET OutRef.ns:"LDP.10.VisitingHours".ns:"VH.1" = AssignValue;
		SET OutRef.ns:"LDP.10.VisitingHours".ns:"VH.2" = AssignValue;
		SET OutRef.ns:"LDP.10.VisitingHours".ns:"VH.3" = AssignValue;
		SET OutRef.ns:"LDP.10.VisitingHours".ns:"VH.4" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.2" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.3" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.4" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.5" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.6" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.7" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.8" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.9" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.10" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.11" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.12" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.13" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.14" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.15".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.17".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.17".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.17".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.17".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"LDP.11.ContactPhone".ns:"XTN.18" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"LDP.12.LocationCostCenter".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>