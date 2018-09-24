************************************************************************************
* This script should be run against the broker's queue manager using the command:
*   runmqsc <broker queue manager name> < queues.mqsc
************************************************************************************

<?php

$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$piname = $pim->getPatternInstanceName();

echo "* Test queues used to exercise the pattern instance\n";
echo "DEF QL('".$piname.".RXF1') REPLACE\n";
echo "DEF QL('".$piname.".DEST1') REPLACE\n";

?>