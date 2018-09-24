<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_RFI (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'RFI';
		SET OutRef.ns:"RFI.1.RequestDate" = AssignValue;
		SET OutRef.ns:"RFI.2.ResponseDueDate" = AssignValue;
		SET OutRef.ns:"RFI.3.PatientConsent" = AssignValue;
		SET OutRef.ns:"RFI.4.DateAdditionalInformationWasSubmitted" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>