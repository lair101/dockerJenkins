<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_FHS (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'FHS';
		SET OutRef.ns:"FHS.1.FileFieldSeparator" = AssignValue;
		SET OutRef.ns:"FHS.2.FileEncodingCharacters" = AssignValue;
		SET OutRef.ns:"FHS.3.FileSendingApplication".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.3.FileSendingApplication".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.3.FileSendingApplication".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"FHS.4.FileSendingFacility".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.4.FileSendingFacility".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.4.FileSendingFacility".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"FHS.5.FileReceivingApplication".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.5.FileReceivingApplication".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.5.FileReceivingApplication".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"FHS.6.FileReceivingFacility".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.6.FileReceivingFacility".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.6.FileReceivingFacility".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"FHS.7.FileCreationDateTime" = AssignValue;
		SET OutRef.ns:"FHS.8.FileSecurity" = AssignValue;
		SET OutRef.ns:"FHS.9.FileNameID" = AssignValue;
		SET OutRef.ns:"FHS.10.FileHeaderComment" = AssignValue;
		SET OutRef.ns:"FHS.11.FileControlID" = AssignValue;
		SET OutRef.ns:"FHS.12.ReferenceFileControlID" = AssignValue;
		SET OutRef.ns:"FHS.13.FileSendingNetworkAddress".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.13.FileSendingNetworkAddress".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.13.FileSendingNetworkAddress".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"FHS.14.FileReceivingNetworkAddress".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"FHS.14.FileReceivingNetworkAddress".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"FHS.14.FileReceivingNetworkAddress".ns:"HD.3" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>