<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_SLT (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'SLT';
		SET OutRef.ns:"SLT.1.DeviceNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"SLT.1.DeviceNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"SLT.1.DeviceNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"SLT.1.DeviceNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"SLT.2.DeviceName" = AssignValue;
		SET OutRef.ns:"SLT.3.LotNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"SLT.3.LotNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"SLT.3.LotNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"SLT.3.LotNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"SLT.4.ItemIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"SLT.4.ItemIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"SLT.4.ItemIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"SLT.4.ItemIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"SLT.5.BarCode" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>