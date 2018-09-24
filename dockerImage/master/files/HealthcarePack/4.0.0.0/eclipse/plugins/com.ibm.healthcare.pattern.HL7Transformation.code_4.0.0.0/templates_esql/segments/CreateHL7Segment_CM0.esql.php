<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_CM0 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'CM0';
		SET OutRef.ns:"CM0.1.SetIDCM0" = AssignValue;
		SET OutRef.ns:"CM0.2.SponsorStudyID".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"CM0.2.SponsorStudyID".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"CM0.2.SponsorStudyID".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"CM0.2.SponsorStudyID".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"CM0.3.AlternateStudyID".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"CM0.3.AlternateStudyID".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"CM0.3.AlternateStudyID".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"CM0.3.AlternateStudyID".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"CM0.4.TitleofStudy" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.2".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.2".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.2".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.2".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.2".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.6" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.7" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.8".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.9".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.9".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.9".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.10" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.11" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.12" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.13" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.14".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.14".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.14".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.15" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.17".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.17".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.18" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.19" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.20" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.21" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.23".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.24" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:"XCN.25" = AssignValue;
		SET OutRef.ns:"CM0.5.ChairmanofStudy".ns:Remainder = AssignValue;
		SET OutRef.ns:"CM0.6.LastIRBApprovalDate" = AssignValue;
		SET OutRef.ns:"CM0.7.TotalAccrualtoDate" = AssignValue;
		SET OutRef.ns:"CM0.8.LastAccrualDate" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.2".ns:"FN.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.2".ns:"FN.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.2".ns:"FN.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.2".ns:"FN.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.2".ns:"FN.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.6" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.7" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.8".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.9".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.9".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.9".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.10" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.11" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.12" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.13" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.14".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.14".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.14".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.15" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.17".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.17".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.18" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.19" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.20" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.21" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.23".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.24" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:"XCN.25" = AssignValue;
		SET OutRef.ns:"CM0.9.ContactforStudy".ns:Remainder = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.2" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.3" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.4" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.5" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.6" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.7" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.8" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.9" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.10" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.11" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.12" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.13" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.14" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.15".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.16".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.17".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.17".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.17".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.17".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"CM0.10.ContactsTelephoneNumber".ns:"XTN.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.1".ns:"SAD.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.1".ns:"SAD.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.1".ns:"SAD.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.4" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.5" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.6" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.7" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.8" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.11" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.12".ns:"DR.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.12".ns:"DR.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.13" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.14" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.15".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.16" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.17" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.19" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.20" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.21" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.22".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.23".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.23".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.23".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"CM0.11.ContactsAddress".ns:"XAD.23".ns:"EI.4" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>