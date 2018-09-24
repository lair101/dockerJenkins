<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_IPR (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'IPR';
		SET OutRef.ns:"IPR.1.IPRIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"IPR.1.IPRIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"IPR.1.IPRIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"IPR.1.IPRIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"IPR.2.ProviderCrossReferenceIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"IPR.2.ProviderCrossReferenceIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"IPR.2.ProviderCrossReferenceIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"IPR.2.ProviderCrossReferenceIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"IPR.3.PayerCrossReferenceIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"IPR.3.PayerCrossReferenceIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"IPR.3.PayerCrossReferenceIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"IPR.3.PayerCrossReferenceIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"IPR.4.IPRStatus".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"IPR.5.IPRDateTime" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.1".ns:"MO.1" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.1".ns:"MO.2" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.2" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.3" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.4" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"IPR.6.AdjudicatedPaidAmount".ns:"CP.6" = AssignValue;
		SET OutRef.ns:"IPR.7.ExpectedPaymentDateTime" = AssignValue;
		SET OutRef.ns:"IPR.8.IPRChecksum" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>