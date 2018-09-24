<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_SDD (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'SDD';
		SET OutRef.ns:"SDD.1.LotNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"SDD.1.LotNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"SDD.1.LotNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"SDD.1.LotNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"SDD.2.DeviceNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"SDD.2.DeviceNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"SDD.2.DeviceNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"SDD.2.DeviceNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"SDD.3.DeviceName" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"SDD.4.DeviceDataState".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"SDD.5.LoadStatus".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"SDD.6.ControlCode" = AssignValue;
		SET OutRef.ns:"SDD.7.OperatorName" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>