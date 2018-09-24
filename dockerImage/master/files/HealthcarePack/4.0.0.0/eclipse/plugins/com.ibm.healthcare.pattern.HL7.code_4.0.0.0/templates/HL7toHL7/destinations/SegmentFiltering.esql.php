BROKER SCHEMA destinations

-- $MQSI restrictedTo=healthcare MQSI$
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

        echo "CREATE COMPUTE MODULE Dest".$startNumber."XMLToHL7\n";
        if ($_MB['PP']['dest'.$currentDestination.'SegFilter'] == 'false') {
            echo <<<ESQL
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        CALL CopyMessageHeaders();
ESQL;
            echo "\n        SET OutputRoot.MQRFH2.usr.DestinationSequenceGroup = 'DEST".$startNumber."';";
            echo "\n        SET OutputRoot.MQRFH2.usr.SourceSequenceNumber = InputRoot.MQRFH2.usr.sequenceNumber;";
            echo <<<ESQL
   
        CREATE LASTCHILD OF OutputRoot DOMAIN('MRM');
        SET OutputRoot.MRM = InputRoot.XMLNSC.*:*[1];
ESQL;
            if (($_MB['PP']['seqAction'.$currentDestination] == 'strict') OR ($_MB['PP']['seqAction'.$currentDestination] == 'lax')){
                echo "\n        CALL SetSequenceField();\n";
            }   
    
            echo "\n        SET Environment.PatternVariables.FlowMilestoneReached = 'COMPLETEDSEGMENTFILTERS".$startNumber."';\n";
            echo <<< ESQL
    RETURN TRUE;
    END;

    CREATE PROCEDURE CopyMessageHeaders()
        BEGIN
        DECLARE I INTEGER 1; 
        DECLARE J INTEGER CARDINALITY(InputRoot.*[]); 
        WHILE I < J DO
            SET OutputRoot.*[I] = InputRoot.*[I];
            SET I = I + 1;
        END WHILE; 
    END;
    
    CREATE PROCEDURE SetSequenceField() BEGIN
        -- Check that there is a sequence number field so it can be updated by the output sequence node
        IF InputRoot.MRM.hl7:MSH.hl7:"MSH.13.SequenceNumber" IS NULL THEN
           -- Version ID is mandatory, therefore we can create the sequence number as next sibling
           CREATE NEXTSIBLING OF OutputRoot.MRM.hl7:MSH.hl7:"MSH.12.VersionID" NAMESPACE hl7 NAME 'MSH.13.SequenceNumber' VALUE ' ';
        END IF;  
    END; 
END MODULE;
ESQL;
        } else {
            echo <<<ESQL
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE input REFERENCE to InputRoot; 
        DECLARE output REFERENCE to OutputRoot; 
        CALL CopyMessageHeaders();
        DECLARE ref REFERENCE TO InputRoot.XMLNSC.hl7:HL7.*:*[1];

    
ESQL;
            echo "    DECLARE IncludeSegment BOOLEAN;\n";
        
            $pim = $_MB["PATTERN_INSTANCE_MANAGER"];
            $class = $pim->getPluginClass("com.ibm.healthcare.pattern.HL7.code", "com.ibm.healthcare.pattern.HL7.SegmentFilters");
            $obj = $class->newInstance();
            $count = $obj->getSize($pim,"segmentFiltersDest".$currentDestination);
            
            $segmentIndex = 0;
        
            for ($current = 0; $current < $count; $current++) {
                $segmentName = $_MB['PP']['segmentFiltersDest'.$currentDestination][$current]['seg'];
                if ($segmentName !== 'MSH') {
                    $segmentIndex = $segmentIndex + 1;
                    echo "        SET Environment.PatternVariables.SegFilter[".$segmentIndex."] = '".$segmentName."';\n";
                }
            }

            echo "        SET OutputRoot.MQRFH2.usr.DestinationSequenceGroup = 'DEST".$startNumber."';\n";
            echo "        SET OutputRoot.MQRFH2.usr.SourceSequenceNumber = InputRoot.MQRFH2.usr.sequenceNumber;\n";
            echo "        WHILE LASTMOVE(ref) DO\n";
            echo "            DECLARE CurrentFieldName CHAR FIELDNAME(ref);\n";
            if ($segmentIndex > 0) {
                echo "            SET IncludeSegment = TRUE;\n";
                for ($current = 0; $current < $count; $current++) {
                    $segmentIndex = $current + 1;
                    if ($segmentIndex == 1) {
                        echo "            IF CurrentFieldName = Environment.PatternVariables.SegFilter[".$segmentIndex."] THEN\n";
                    }
                    if ($segmentIndex > 1) { 
                        echo "            ELSEIF CurrentFieldName = Environment.PatternVariables.SegFilter[".$segmentIndex."] THEN\n";
                    }
                    echo "                SET IncludeSegment = FALSE;\n";
                }
                echo "            END IF;\n";
                echo "            IF IncludeSegment THEN \n";  
                echo "                CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME CurrentFieldName;\n";
                echo "                SET OutputRoot.MRM.*:*[<] = ref;\n";
                echo "            END IF;\n";
            }
            echo <<<ESQL
            MOVE ref NEXTSIBLING;
        END WHILE;         
ESQL;
            if (($_MB['PP']['seqAction'.$currentDestination] == 'strict') OR ($_MB['PP']['seqAction'.$currentDestination] == 'lax')){
                echo "\n        CALL SetSequenceField();\n";
            }   
ECHO <<< ESQL

        SET Environment.PatternVariables.FlowMilestoneReached = 'COMPLETEDSEGMENTFILTERS';
        RETURN TRUE;
    END;
      
    CREATE PROCEDURE CopyMessageHeaders() 
    BEGIN
        DECLARE I INTEGER 1;
        DECLARE J INTEGER;
        SET J = CARDINALITY(InputRoot.*[]);
        WHILE I < J DO
            SET OutputRoot.*[I] = InputRoot.*[I];
            SET I = I + 1;
        END WHILE;
    END;

    CREATE PROCEDURE SetSequenceField() BEGIN
        -- Check that there is a sequence number field so it can be updated by the output sequence node
        IF InputRoot.MRM.hl7:MSH.hl7:"MSH.13.SequenceNumber" IS NULL THEN
           -- Version ID is mandatory, therefore we can create the sequence number as next sibling
           CREATE NEXTSIBLING OF OutputRoot.MRM.hl7:MSH.hl7:"MSH.12.VersionID" NAMESPACE hl7 NAME 'MSH.13.SequenceNumber' VALUE ' ';
        END IF;  
    END; 
END MODULE; 
ESQL;
        }
    }
?>

