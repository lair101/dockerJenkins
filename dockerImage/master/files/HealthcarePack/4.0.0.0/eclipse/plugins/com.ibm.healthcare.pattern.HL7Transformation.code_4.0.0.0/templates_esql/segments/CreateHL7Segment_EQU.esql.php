<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_EQU (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'EQU';
		SET OutRef.ns:"EQU.1.EquipmentInstanceIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"EQU.1.EquipmentInstanceIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"EQU.1.EquipmentInstanceIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"EQU.1.EquipmentInstanceIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"EQU.2.EventDateTime" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"EQU.3.EquipmentState".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"EQU.4.LocalRemoteControlState".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"EQU.5.AlertLevel".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>