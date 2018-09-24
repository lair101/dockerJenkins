<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_DSP (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'DSP';
		SET OutRef.ns:"DSP.1.SetIDDSP" = AssignValue;
		SET OutRef.ns:"DSP.2.DisplayLevel" = AssignValue;
		SET OutRef.ns:"DSP.3.DataLine" = AssignValue;
		SET OutRef.ns:"DSP.4.LogicalBreakPoint" = AssignValue;
		SET OutRef.ns:"DSP.5.ResultID" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>