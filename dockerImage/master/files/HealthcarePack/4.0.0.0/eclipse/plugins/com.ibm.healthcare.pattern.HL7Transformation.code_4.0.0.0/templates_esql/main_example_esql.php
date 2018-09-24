<?php    
$messagename = $_MB['PP']['ppFirstMessageSelectedInternalOnly']; 
mb_pattern_run_template("HL7v27TransformLibrary", "example_esql.esql.php", "Example_Compute_".$messagename.".esql");
?>