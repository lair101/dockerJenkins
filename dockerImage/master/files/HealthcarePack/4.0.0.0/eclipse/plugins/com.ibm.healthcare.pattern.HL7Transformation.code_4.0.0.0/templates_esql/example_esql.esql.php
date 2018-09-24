<?php
$messageName = $_MB['PP']['ppFirstMessageSelectedInternalOnly']; 
echo 	"CREATE COMPUTE MODULE Example_Compute_$messageName\n";
echo 	"\tCREATE FUNCTION Main() RETURNS BOOLEAN\n";
echo 	"\tBEGIN\n";
echo 	"\t\tSET OutputRoot.Properties = InputRoot.Properties;\n";
echo 	"\t\tCREATE LASTCHILD OF OutputRoot DOMAIN('DFDL');\n";
echo 	"\t\tDECLARE OutRef REFERENCE TO OutputRoot.DFDL;\n";
echo 	"\t\tCALL CreateHL7Segment_$messageName('urn:hl7-org:v2xml', OutRef);\n";
echo 	"\t\tRETURN TRUE;\n";
echo 	"\tEND;\n";
echo 	"END MODULE;\n";
?>
