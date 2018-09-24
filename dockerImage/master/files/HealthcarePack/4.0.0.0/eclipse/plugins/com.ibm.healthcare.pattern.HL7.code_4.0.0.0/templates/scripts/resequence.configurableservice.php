<?xml version="1.0" encoding="UTF-8"?>
<configurableservice 
csName="<?php 
	$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
    $piname = $pim->getPatternInstanceName();
	echo $piname; ?>_setSeqQs"
csType="Resequence" 
endSequenceSeconds="" 
missingMessageTimeoutSeconds="" 
queuePrefix="<?php echo $_MB['PP']['queuePrefix']; ?>"
startSequenceSeconds=""/>