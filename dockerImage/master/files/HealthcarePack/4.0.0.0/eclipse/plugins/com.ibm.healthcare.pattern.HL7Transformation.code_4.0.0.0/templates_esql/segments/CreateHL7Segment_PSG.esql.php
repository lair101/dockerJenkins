<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_PSG (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'PSG';
		SET OutRef.ns:"PSG.1.ProviderProductServiceGroupNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PSG.1.ProviderProductServiceGroupNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PSG.1.ProviderProductServiceGroupNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PSG.1.ProviderProductServiceGroupNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PSG.2.PayerProductServiceGroupNumber".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"PSG.2.PayerProductServiceGroupNumber".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"PSG.2.PayerProductServiceGroupNumber".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"PSG.2.PayerProductServiceGroupNumber".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"PSG.3.ProductServiceGroupSequenceNumber" = AssignValue;
		SET OutRef.ns:"PSG.4.AdjudicateasGroup" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.1".ns:"MO.1" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.1".ns:"MO.2" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.2" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.3" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.4" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"PSG.5.ProductServiceGroupBilledAmount".ns:"CP.6" = AssignValue;
		SET OutRef.ns:"PSG.6.ProductServiceGroupDescription" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>