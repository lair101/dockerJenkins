<?php    
$segmentname = $_MB['PP']['ppSegmentsInternalOnly']; 
mb_pattern_run_template("HL7v27TransformLibrary", "segments/CreateHL7Segment_".$segmentname.".map.php", "CreateHL7Segment_" . $segmentname . ".map");
?>