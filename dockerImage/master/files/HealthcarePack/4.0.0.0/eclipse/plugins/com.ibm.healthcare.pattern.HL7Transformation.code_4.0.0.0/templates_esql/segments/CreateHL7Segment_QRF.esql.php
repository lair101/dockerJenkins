<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_QRF (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'QRF';
		SET OutRef.ns:"QRF.1.WhereSubjectFilter" = AssignValue;
		SET OutRef.ns:"QRF.2.WhenDataStartDateTime".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"QRF.2.WhenDataStartDateTime".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"QRF.3.WhenDataEndDateTime".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"QRF.3.WhenDataEndDateTime".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"QRF.4.WhatUserQualifier" = AssignValue;
		SET OutRef.ns:"QRF.5.OtherQRYSubjectFilter" = AssignValue;
		SET OutRef.ns:"QRF.6.WhichDateTimeQualifier" = AssignValue;
		SET OutRef.ns:"QRF.7.WhichDateTimeStatusQualifier" = AssignValue;
		SET OutRef.ns:"QRF.8.DateTimeSelectionQualifier" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.1".ns:"CQ.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.2".ns:"RI.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.3" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.4".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.4".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.5".ns:"TS.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.5".ns:"TS.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.6" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.7" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.8" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.9" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.1" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.2" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.3" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.4" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.5" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.6" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.7" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.8" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.9" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.10" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.10".ns:"OSD.11" = AssignValue;
		SET OutRef.ns:"QRF.9.WhenQuantityTimingQualifier".ns:"TQ.12" = AssignValue;
		SET OutRef.ns:"QRF.10.SearchConfidenceThreshold" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>