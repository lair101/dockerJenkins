<?php
    $pim = $_MB["PATTERN_INSTANCE_MANAGER"];
    $piname = $pim->getPatternInstanceName();
    $continuation = $_MB['PP']['continuation'];
    if ($continuation == '1') {
        print_r("Running the main PHP script\n");
        
        // Receiver ESQL template
        print_r("Starting the receiver ESQL template\n");
        mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/Receiver/Receiver.esql.php", "Receiver/Receiver.esql");

        // ReceiverExceptionHandler ESQL template
        print_r("Starting the receiver exception handler ESQL template\n");
         mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/Receiver/ReceiverExceptionHandler.esql.php", "Receiver/ReceiverExceptionHandler.esql");

        // Journal ESQL template if required
        if ($_MB['PP']['journalling'] == 'standard') {
            print_r("Starting the receiver journal ESQL template\n");
            mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/Receiver/Journal.esql.php", "Receiver/Journal.esql");
        }
    }

    print_r("Starting the transform and route ESQL template\n");
    mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/TransformAndRoute/TransformAndRoute.esql.php", "TransformAndRoute/TransformAndRoute.esql");

    // Message filtering template (for all destinations) 
    print_r("Starting the message filters ESQL template\n");
    mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/TransformAndRoute/DestinationFilters.esql.php", "TransformAndRoute/DestinationFilters.esql");

    print_r("Starting the sender ESQL template\n"); 
    mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/Senders/Sender.esql.php", "Senders/Sender.esql");

    // Segment filtering template (for all destinations) 
    print_r("Starting the segment filters ESQL template\n");
    mb_pattern_run_template("HL7toHL7DFDL", "HL7toHL7DFDL/TransformAndRoute/SegmentFiltering.esql.php", "TransformAndRoute/SegmentFilters.esql");

    print_r("Starting the configurable service templates\n");
    $split = $_MB['PP']['separateSeqQs'];
    if ($split == 'true') {
        mb_pattern_run_template("HL7toHL7DFDL", "scripts/resequence.configurableservice.php", $piname."_setSeqQs.resequence.configurableservice");
    }

    if ($_MB['PP']['scripts']== 'true') {
        print_r("Running the MQSC template\n");
        mb_pattern_run_template("HL7toHL7DFDL", "scripts/queues.mqsc.php", "queues.mqsc");
    }
    print_r("End of main PHP script\n");    
?>

