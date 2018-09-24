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

echo "* Test queues used to exercise the pattern instance\n";
echo "* These are not used in production and can be deleted\n";
echo "DEF QL('HL7_TEST_IN') REPLACE\n";
echo "DEF QL('HL7_TEST_OUT') REPLACE\n";
echo "DEF QL('HL7_TEST_RECEIVE_OUT') REPLACE\n\n";
        
if ($_MB['PP']['publish'] == 'Queue') {
    echo "* This script defines the queues required on the queue manager for pattern instance $piname\n";

    if ($_MB['PP']['sourceFeed'] == 'true') {
        echo "* If the Receiver writes a copy of the source message it will use this queue:\n";
        echo "DEF QL('".$qprefix.".SRC') REPLACE\n\n";
    }

    if ($_MB['PP']['journalling'] != 'none') {
        echo "* If the Receiver writes a standard journal message it will use this queue:\n";
        echo "DEF QL('".$qprefix.".JRNL') REPLACE\n\n";
    }


    if ($_MB['PP']['reportRemainders'] == 'true') {
        echo "* Queue for messages with remainders:\n";
        echo "DEF QL('".$qprefix.".REM') REPLACE\n\n";
    }

    if ($_MB['PP']['canonicalFeed'] == 'true') {
        echo "* The queue for canonical messages:\n";
        echo "DEF QL('".$qprefix.".CAN') REPLACE\n\n";
    }

} else {

    echo "* This script defines the queues and topics required on the queue manager for pattern instance $piname\n";

    if ($_MB['PP']['sourceFeed'] == 'true') {
        echo "* If the Receiver writes a copy of the source message it will use this topic:\n";
        echo "DEFINE TOPIC('Source') TOPICSTR('".$piname."/Receiver/Source') REPLACE\n\n";
    }

    if ($_MB['PP']['journalling'] != 'none') {
        echo "* If the Receiver writes a standard journal message it will use this topic:\n";
        echo "DEFINE TOPIC('Journal') TOPICSTR('".$piname."/Receiver/Journal') REPLACE\n\n";
    }


    if ($_MB['PP']['reportRemainders'] == 'true') {
        echo "* Topic for messages with remainders:\n";
        echo "DEFINE TOPIC('Remainders') TOPICSTR('".$piname."/Remainders') REPLACE\n\n";
    }

    if ($_MB['PP']['canonicalFeed'] == 'true') {
        echo "* Topic for canonical messages:\n";
        echo "DEFINE TOPIC('Canonical') TOPICSTR('".$piname."/Canonical') REPLACE\n\n";
    }
}

if ($_MB['PP']['checkDuplicates'] == 'true') {
    echo "* If the Receiver checks duplicates message it will use this queue:\n";
    echo "DEF QL('".$qprefix.".DUPID') REPLACE\n\n";
}

echo "* One queue for each destination:\n";
$dests = $_MB['PP']['destNum'];
for ($i=1;$i<= $dests ;$i++ ) {
    echo "DEF QL('".$qprefix.".DEST".$i."') REPLACE\n";
}

echo "* The queue for messages which cannot be processed correctly:\n";
echo "DEF QL('".$qprefix.".ERR') REPLACE\n\n";
    
echo "\n* The queues for storing sequence information:\n";
echo "DEF QL('".$qprefix.".SEQNOS') REPLACE\n";
echo "DEF QL('".$qprefix.".SEQNTFY') REPLACE\n\n";

echo "* The Receiver writes messages for the transform and route flow to these queues\n";
echo "* There is one queue for each transform and route flow in the pattern instance:\n";

$dests = $_MB['PP']['destNum'];
$con = $_MB['PP']['continuation'];
$qs = ($dests+5)/6;
for ($i=1;$i<= $qs ;$i++ ) {
    echo "DEF QL('".$qprefix.".RXF".$i."') REPLACE\n";
}
