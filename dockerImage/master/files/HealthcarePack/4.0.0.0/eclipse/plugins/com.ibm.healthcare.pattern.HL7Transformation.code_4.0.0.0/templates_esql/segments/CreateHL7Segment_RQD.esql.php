<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_RQD (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'RQD';
		SET OutRef.ns:"RQD.1.RequisitionLineNumber" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.2.ItemCodeInternal".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.3.ItemCodeExternal".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.4.HospitalItemCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.5.RequisitionQuantity" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.6.RequisitionUnitofMeasure".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.1" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.2" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.3" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.4".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.4".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.4".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.5" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.6".ns:"HD.1" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.6".ns:"HD.2" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.6".ns:"HD.3" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.7" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.8" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.9".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.10".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.11" = AssignValue;
		SET OutRef.ns:"RQD.7.DeptCostCenter".ns:"CX.12" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.8.ItemNaturalAccountCode".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RQD.9.DeliverToID".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RQD.10.DateNeeded" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>