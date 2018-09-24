<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_SFT (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'SFT';
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.1" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.3" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.4" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.5" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.7" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.8".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.8".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.8".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.9" = AssignValue;
		SET OutRef.ns:"SFT.1.SoftwareVendorOrganization".ns:"XON.10" = AssignValue;
		SET OutRef.ns:"SFT.2.SoftwareCertifiedVersionorReleaseNumber" = AssignValue;
		SET OutRef.ns:"SFT.3.SoftwareProductName" = AssignValue;
		SET OutRef.ns:"SFT.4.SoftwareBinaryID" = AssignValue;
		SET OutRef.ns:"SFT.5.SoftwareProductInformation" = AssignValue;
		SET OutRef.ns:"SFT.6.SoftwareInstallDate" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>