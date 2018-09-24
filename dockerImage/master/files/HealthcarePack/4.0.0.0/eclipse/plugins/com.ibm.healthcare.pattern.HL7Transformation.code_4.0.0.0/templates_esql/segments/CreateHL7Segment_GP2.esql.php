<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_GP2 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'GP2';
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.1.RevenueCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.2.NumberofServiceUnits" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.1".ns:"MO.1" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.1".ns:"MO.2" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.2" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.3" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.4" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.3.Charge".ns:"CP.6" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.4.ReimbursementActionCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.5.DenialorRejectionCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.6.OCEEditCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.7.AmbulatoryPaymentClassificationCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.8.ModifierEditCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.9.PaymentAdjustmentCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.10.PackagingStatusCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.1".ns:"MO.1" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.1".ns:"MO.2" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.2" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.3" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.4" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.11.ExpectedHCFAPaymentAmount".ns:"CP.6" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.12.ReimbursementTypeCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.1".ns:"MO.1" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.1".ns:"MO.2" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.2" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.3" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.4" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"GP2.13.CoPayAmount".ns:"CP.6" = AssignValue;
		SET OutRef.ns:"GP2.14.PayRateperUnit" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>