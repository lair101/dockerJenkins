<?php
	$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
	$instanceName = $pim->getPatternInstanceName();
	
	if ($_MB['PP']['ppLoggingRequired'] == 'true') {
		mb_pattern_run_template("DICOMService", 
			"DICOMService/mqsi/Log.esql.php", "mqsi/Log.esql");
	}
?>
