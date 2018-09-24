<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_OM4 (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'OM4';
		SET OutRef.ns:"OM4.1.SequenceNumberTestObservationMasterFile" = AssignValue;
		SET OutRef.ns:"OM4.2.DerivedSpecimen" = AssignValue;
		SET OutRef.ns:"OM4.3.ContainerDescription" = AssignValue;
		SET OutRef.ns:"OM4.4.ContainerVolume" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.5.ContainerUnits".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.6.Specimen".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.7.Additive".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM4.8.Preparation" = AssignValue;
		SET OutRef.ns:"OM4.9.SpecialHandlingRequirements" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.1" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.10.NormalCollectionVolume".ns:"CQ.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.1" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.11.MinimumCollectionVolume".ns:"CQ.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"OM4.12.SpecimenRequirements" = AssignValue;
		SET OutRef.ns:"OM4.13.SpecimenPriorities" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.1" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"OM4.14.SpecimenRetentionTime".ns:"CQ.2".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>