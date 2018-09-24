<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_BLG (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'BLG';
		SET OutRef.ns:"BLG.1.WhentoCharge".ns:"CCD.1" = AssignValue;
		SET OutRef.ns:"BLG.1.WhentoCharge".ns:"CCD.2" = AssignValue;
		SET OutRef.ns:"BLG.2.ChargeType" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"BLG.3.AccountID".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"BLG.4.ChargeTypeReason".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>