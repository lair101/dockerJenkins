<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_BHS (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'BHS';
		SET OutRef.ns:"BHS.1.BatchFieldSeparator" = AssignValue;
		SET OutRef.ns:"BHS.2.BatchEncodingCharacters" = AssignValue;
		SET OutRef.ns:"BHS.3.BatchSendingApplication".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.3.BatchSendingApplication".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.3.BatchSendingApplication".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BHS.4.BatchSendingFacility".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.4.BatchSendingFacility".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.4.BatchSendingFacility".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BHS.5.BatchReceivingApplication".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.5.BatchReceivingApplication".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.5.BatchReceivingApplication".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BHS.6.BatchReceivingFacility".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.6.BatchReceivingFacility".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.6.BatchReceivingFacility".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BHS.7.BatchCreationDateTime" = AssignValue;
		SET OutRef.ns:"BHS.8.BatchSecurity" = AssignValue;
		SET OutRef.ns:"BHS.9.BatchNameIDType" = AssignValue;
		SET OutRef.ns:"BHS.10.BatchComment" = AssignValue;
		SET OutRef.ns:"BHS.11.BatchControlID" = AssignValue;
		SET OutRef.ns:"BHS.12.ReferenceBatchControlID" = AssignValue;
		SET OutRef.ns:"BHS.13.BatchSendingNetworkAddress".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.13.BatchSendingNetworkAddress".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.13.BatchSendingNetworkAddress".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"BHS.14.BatchReceivingNetworkAddress".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"BHS.14.BatchReceivingNetworkAddress".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"BHS.14.BatchReceivingNetworkAddress".ns:"HD.3" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>