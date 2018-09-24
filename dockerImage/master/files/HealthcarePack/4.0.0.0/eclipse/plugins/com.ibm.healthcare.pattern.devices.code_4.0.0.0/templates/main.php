<?php
    $pim = $_MB["PATTERN_INSTANCE_MANAGER"];
    $piname = $pim->getPatternInstanceName();
    print_r("Running the main PHP script\n");
    
    if ($_MB['PP']['journaling'] == 'standard') {
        print_r("Starting the journal ESQL template\n");
        mb_pattern_run_template("MedicalDevices", "MedicalDevices/healthcare/Journal.esql.php", "healthcare/Journal.esql");
    }

    print_r("Starting the medical devices ESQL template\n");
    mb_pattern_run_template("MedicalDevices", "MedicalDevices/healthcare/MedicalDevices.esql.php", "healthcare/MedicalDevices.esql");
    print_r("Starting the transform and route ESQL template\n");
    mb_pattern_run_template("MedicalDevices", "MedicalDevices/healthcare/TransformAndRoute.esql.php", "healthcare/TransformAndRoute.esql");
    print_r("Starting the sender ESQL template\n");
    mb_pattern_run_template("MedicalDevices", "MedicalDevices/healthcare/Sender.esql.php", "healthcare/Sender.esql");

    $class = $pim->getPluginClass("com.ibm.healthcare.pattern.devices.code", "com.ibm.healthcare.pattern.devices.utility.PatternUtility");
    $prefix = $class->getConfigurableServicePrefix($pim);
    print_r("Running the configurable service template\n");
    mb_pattern_run_template("MedicalDevices", "scripts/MedicalDevices.configurableservice.php", $prefix."MedicalDevices.configurableservice");

    if ($_MB['PP']['patientIdentifiers'] == 'database') {
        if ($_MB['PP']['createService'] == 'true') {
            print_r("Running the log service template\n");
            mb_pattern_run_template("MedicalDevices", "MedicalDevices/service/Log.esql.php", "service/Log.esql");
            print_r("Running the error service template\n");
            mb_pattern_run_template("MedicalDevices", "MedicalDevices/service/Error.esql.php", "service/Error.esql");
            print_r("Running the patient identifiers service template\n");
            mb_pattern_run_template("MedicalDevices", "MedicalDevices/service/PatientIdentifiers.esql.php", "service/PatientIdentifiers.esql");
        }
    }

    if ($_MB['PP']['scripts']== 'true') {
        print_r("Running the MQSC template\n");
        mb_pattern_run_template("MedicalDevices", "scripts/queues.mqsc.php", "queues.mqsc");
    }
    print_r("End of main PHP script\n");    
?>

