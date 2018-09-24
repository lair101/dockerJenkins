BROKER SCHEMA destinations

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE hl7 NAMESPACE 'urn:hl7-org:v2xml';

<?php 
    $totalDestinations = (int) $_MB['PP']['destNum'];
    $continuation = (int) $_MB['PP']['continuation'];
    $destinations = $totalDestinations - ($continuation - 1) * 6;
    if ($destinations > 6) {
        $destinations = 6;
    }

    $startNumber = ($continuation - 1) * 6;
    for ($currentDestination = 1; $currentDestination <= $destinations; $currentDestination++) {
        $startNumber = $startNumber + 1;
        echo "CREATE FILTER MODULE MessageFilter".$startNumber;
    
echo <<<ESQL

    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE MSG1 CHAR;
        DECLARE MSG2 CHAR;

        SET MSG1 = Root.XMLNSC.hl7:HL7.hl7:MSH.hl7:"MSH.9.MessageType".hl7:"MSG.1";
        SET MSG2 = Root.XMLNSC.hl7:HL7.hl7:MSH.hl7:"MSH.9.MessageType".hl7:"MSG.2";     

ESQL;
        if($_MB['PP']['msgFilter'.$currentDestination] == 'false') {
            echo <<<ESQL
        
        RETURN TRUE;
    END;
END MODULE;
        
ESQL;
        
        } else {
                $pim = $_MB["PATTERN_INSTANCE_MANAGER"];
                $class = $pim->getPluginClass("com.ibm.healthcare.pattern.HL7.code", "com.ibm.healthcare.pattern.HL7.SegmentFilters");
                $obj = $class->newInstance();
                $count = $obj->getSize($pim,"msgfilters".$currentDestination);

                for ($segmentIndex = 0; $segmentIndex < $count; $segmentIndex++) {
                    $segmentIndexPlusOne = $segmentIndex + 1;       
                    echo "        SET Environment.PatternVariables.CodeFilter[".$segmentIndexPlusOne."] = '".$_MB['PP']['msgfilters'.$currentDestination][$segmentIndex]['messagecode']."';\n";
                    echo "        SET Environment.PatternVariables.EventFilter[".$segmentIndexPlusOne."] = '".$_MB['PP']['msgfilters'.$currentDestination][$segmentIndex]['messageevent']."';\n";
                }    

                echo "\n";

                for ($segmentIndex = 1; $segmentIndex <= $count; $segmentIndex++) {
                    echo "        IF MSG1 = Environment.PatternVariables.CodeFilter[".$segmentIndex."]\n";
                    echo "            AND ((MSG2 = Environment.PatternVariables.EventFilter[".$segmentIndex."])\n";
                    echo "                OR (Environment.PatternVariables.EventFilter[".$segmentIndex."] = '*'))\n";
                    echo "                    THEN RETURN TRUE;\n";
                    echo "        END IF;\n";
                }
echo <<<ESQL

        RETURN FALSE;
    END;
END MODULE;

ESQL;
        } 

        echo "\nCREATE COMPUTE MODULE SetDest".$startNumber."Milestone\n";
        echo "    CREATE FUNCTION Main() RETURNS BOOLEAN\n";
        echo "    BEGIN\n";
        echo "        SET OutputLocalEnvironment = InputLocalEnvironment;\n";
        echo "        SET Environment.PatternVariables.FlowMilestoneReached = 'MESSAGEFILTERSDESTINATION".$startNumber."';\n";
        echo "        RETURN TRUE;\n";
        echo "    END;\n";
        echo "END MODULE;   \n";
    }
?>
