************************************************************************************
* This script should be run against the broker's queue manager using the command:
*   runmqsc <broker queue manager name> < queues.mqsc
************************************************************************************

<?php

$qprefix = $_MB['PP']['queuePrefix'];
$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$piname = $pim->getPatternInstanceName();
if (($qprefix == NULL ) OR ($qprefix == ' ')){
    $qprefix = preg_replace("/[^a-zA-Z0-9\s]/", "", $piname);
}

if ($_MB['PP']['publish'] == 'queue') {
    echo "* This script defines the queues required on the queue manager for pattern instance $piname\n";

    if ($_MB['PP']['journaling'] != 'none') {
        echo "* Standard journal messages are written to this queue:\n";
        echo "DEF QL('".$qprefix.".JRNL') REPLACE\n\n";
    }

    if ($_MB['PP']['canonicalFeed'] == 'true') {
        echo "* The queue for canonical messages:\n";
        echo "DEF QL('".$qprefix.".CAN') REPLACE\n\n";
    }

} else {

    echo "* This script defines the queues and topics required on the queue manager for pattern instance $piname\n";

    if ($_MB['PP']['journaling'] != 'none') {
        echo "* Standard journal messages are published to this topic:\n";
        echo "DEFINE TOPIC('Journal') TOPICSTR('".$piname."/Journal') REPLACE\n\n";
    }

    if ($_MB['PP']['canonicalFeed'] == 'true') {
        echo "* Topic for canonical messages:\n";
        echo "DEFINE TOPIC('Canonical') TOPICSTR('".$piname."/Canonical') REPLACE\n\n";
    }
}

echo "* Queue for delivering messages to the destination:\n";
echo "DEF QL('".$qprefix.".DEST') REPLACE\n\n";

echo "* Queue for error messages:\n";
echo "DEF QL('".$qprefix.".ERR') REPLACE\n\n";

echo "* Queue for transformation and routing:\n";
echo "DEF QL('".$qprefix.".RXF') REPLACE\n\n";

echo "* Queue for expired device messages:\n";
echo "DEF QL('".$qprefix.".EXP') REPLACE\n\n";

if ($_MB['PP']['patientIdentifiers'] == 'database') {
    if ($_MB['PP']['createService'] == 'true') {
        echo "* Queue for logging web service requests:\n";
        echo "DEF QL('".$qprefix.".LOG') REPLACE\n\n";
    }
}

if ($_MB['PP']['patientIdentifiers'] == 'database') {
    echo "* Queue for no matching patient identifiers:\n";
    echo "DEF QL('".$qprefix.".NOMATCH') REPLACE\n\n";
}

