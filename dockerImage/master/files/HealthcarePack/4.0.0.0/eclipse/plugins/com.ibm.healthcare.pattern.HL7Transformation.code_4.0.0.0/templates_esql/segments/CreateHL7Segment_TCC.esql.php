<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_TCC (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'TCC';
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.1.UniversalServiceIdentifier".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.2.TestApplicationIdentifier".ns:"EI.1" = AssignValue;
		SET OutRef.ns:"TCC.2.TestApplicationIdentifier".ns:"EI.2" = AssignValue;
		SET OutRef.ns:"TCC.2.TestApplicationIdentifier".ns:"EI.3" = AssignValue;
		SET OutRef.ns:"TCC.2.TestApplicationIdentifier".ns:"EI.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.1".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.4".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.5".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.6".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.3.SpecimenSource".ns:"SPS.7".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.4.AutoDilutionFactorDefault".ns:"SN.1" = AssignValue;
		SET OutRef.ns:"TCC.4.AutoDilutionFactorDefault".ns:"SN.2" = AssignValue;
		SET OutRef.ns:"TCC.4.AutoDilutionFactorDefault".ns:"SN.3" = AssignValue;
		SET OutRef.ns:"TCC.4.AutoDilutionFactorDefault".ns:"SN.4" = AssignValue;
		SET OutRef.ns:"TCC.5.RerunDilutionFactorDefault".ns:"SN.1" = AssignValue;
		SET OutRef.ns:"TCC.5.RerunDilutionFactorDefault".ns:"SN.2" = AssignValue;
		SET OutRef.ns:"TCC.5.RerunDilutionFactorDefault".ns:"SN.3" = AssignValue;
		SET OutRef.ns:"TCC.5.RerunDilutionFactorDefault".ns:"SN.4" = AssignValue;
		SET OutRef.ns:"TCC.6.PreDilutionFactorDefault".ns:"SN.1" = AssignValue;
		SET OutRef.ns:"TCC.6.PreDilutionFactorDefault".ns:"SN.2" = AssignValue;
		SET OutRef.ns:"TCC.6.PreDilutionFactorDefault".ns:"SN.3" = AssignValue;
		SET OutRef.ns:"TCC.6.PreDilutionFactorDefault".ns:"SN.4" = AssignValue;
		SET OutRef.ns:"TCC.7.EndogenousContentofPreDilutionDiluent".ns:"SN.1" = AssignValue;
		SET OutRef.ns:"TCC.7.EndogenousContentofPreDilutionDiluent".ns:"SN.2" = AssignValue;
		SET OutRef.ns:"TCC.7.EndogenousContentofPreDilutionDiluent".ns:"SN.3" = AssignValue;
		SET OutRef.ns:"TCC.7.EndogenousContentofPreDilutionDiluent".ns:"SN.4" = AssignValue;
		SET OutRef.ns:"TCC.8.InventoryLimitsWarningLevel" = AssignValue;
		SET OutRef.ns:"TCC.9.AutomaticRerunAllowed" = AssignValue;
		SET OutRef.ns:"TCC.10.AutomaticRepeatAllowed" = AssignValue;
		SET OutRef.ns:"TCC.11.AutomaticReflexAllowed" = AssignValue;
		SET OutRef.ns:"TCC.12.EquipmentDynamicRange".ns:"SN.1" = AssignValue;
		SET OutRef.ns:"TCC.12.EquipmentDynamicRange".ns:"SN.2" = AssignValue;
		SET OutRef.ns:"TCC.12.EquipmentDynamicRange".ns:"SN.3" = AssignValue;
		SET OutRef.ns:"TCC.12.EquipmentDynamicRange".ns:"SN.4" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.13.Units".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"TCC.14.ProcessingType".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>