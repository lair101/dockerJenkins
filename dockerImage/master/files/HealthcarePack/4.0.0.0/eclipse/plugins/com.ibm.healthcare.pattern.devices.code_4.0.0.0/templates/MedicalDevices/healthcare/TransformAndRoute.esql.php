BROKER SCHEMA healthcare

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE SenderMessageSet CONSTANT CHARACTER 'HL7v25P';
DECLARE SenderMessageType CONSTANT CHARACTER 'HL7';
DECLARE SenderMessageFormat CONSTANT CHARACTER 'HL7';
DECLARE hl7 NAMESPACE 'urn:hl7-org:v2xml';
DECLARE dns NAMESPACE 'http://www.ibm.com/WMBDevice/V1';
DECLARE var NAMESPACE 'http://www.ibm.com/WMBVariable/V1';

CREATE FUNCTION BuildMSH(InputRoot REFERENCE, OutputRoot REFERENCE)
BEGIN    
    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'MSH';
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:MSH;
    SET SegmentReference.hl7:"MSH.1.FieldSeparator" = '|';
    SET SegmentReference.hl7:"MSH.2.ServiceString" = '^~\&';

    SET SegmentReference.hl7:"MSH.3.SendingApplication".hl7:"HD.1" = '<?php echo $_MB['PP']['sourceIdentifier']; ?>';
    SET SegmentReference.hl7:"MSH.4.SendingFacility".hl7:"HD.1" = '<?php echo $_MB['PP']['sourceFacility']; ?>';
    SET SegmentReference.hl7:"MSH.5.ReceivingApplication".hl7:"HD.1" = '<?php echo $_MB['PP']['destinationIdentifier']; ?>';
    SET SegmentReference.hl7:"MSH.6.ReceivingFacility".hl7:"HD.1" = '<?php echo $_MB['PP']['destinationFacility']; ?>';

    DECLARE DateTime CHARACTER InputReference.dns:RequestTime;

    SET DateTime = REPLACE(DateTime, ' ', '');
    SET DateTime = REPLACE(DateTime, ':', '');
    SET DateTime = REPLACE(DateTime, '-', '');

    DECLARE Identifier CHARACTER UUIDASCHAR;
<?php
    if ($_MB['PP']['messageIdentifiers'] == 'dateTime') {
        echo "    SET Identifier = CAST(CURRENT_TIMESTAMP AS CHARACTER FORMAT 'yyyyMMddHHmmssSSSSSS');\n";
    }
?>    
    SET Identifier = REPLACE(Identifier, ' ', '');
    SET Identifier = REPLACE(Identifier, '-', '');
    SET Identifier = UPPER(Identifier);

    SET SegmentReference.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1" = DateTime;
    SET SegmentReference.hl7:"MSH.9.MessageType".hl7:"MSG.1" = 'ORU';
    SET SegmentReference.hl7:"MSH.9.MessageType".hl7:"MSG.2" = 'R01';
    SET SegmentReference.hl7:"MSH.9.MessageType".hl7:"MSG.3" = 'ORU_R01';
    SET SegmentReference.hl7:"MSH.10.MessageControlID" = Identifier;
    SET SegmentReference.hl7:"MSH.11.ProcessingID".hl7:"PT.1" = 'P';
    SET SegmentReference.hl7:"MSH.12.VersionID".hl7:"VID.1" = '2.5';
END;

CREATE FUNCTION BuildPID(InputRoot REFERENCE, OutputRoot REFERENCE)
BEGIN
    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'PID';
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:PID;
<?php
    if ($_MB['PP']['patientIdentifiers'] == 'deviceMessage') {
        echo "    SET OutputRoot.MRM.hl7:PID.hl7:\"PID.3.PatientIdentifierList\".hl7:\"CX.1\" = InputReference.dns:PatientId;\n";
    } else if ($_MB['PP']['patientIdentifiers'] == 'database') {
        echo "    SET OutputRoot.MRM.hl7:PID.hl7:\"PID.3.PatientIdentifierList\".hl7:\"CX.1\" = InputReference.dns:DeviceId;\n";
    }
?>
END;

CREATE FUNCTION BuildPV1(InputRoot REFERENCE, OutputRoot REFERENCE)
BEGIN
    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'PV1';
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:PV1;
    
    SET SegmentReference.hl7:"PV1.2.PatientClass" = '<?php echo $_MB['PP']['patientClass']; ?>';
    IF FIELDTYPE(InputReference.dns:Location) IS NOT NULL THEN
        SET SegmentReference.hl7:"PV1.3.AssignedPatientLocation".hl7:"PL.1" = InputReference.dns:Location;
    END IF;
END;

CREATE FUNCTION BuildOBR(InputRoot REFERENCE, OutputRoot REFERENCE)
BEGIN
    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'OBR';
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:OBR;
    
    SET SegmentReference.hl7:"OBR.7.ObservationDateTime".hl7:"TS.1" = OutputRoot.MRM.hl7:MSH.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1";    
    IF FIELDTYPE(InputReference.dns:Location) IS NOT NULL THEN
        SET SegmentReference.hl7:"OBR.10.CollectorIdentifier".hl7:"XCN.1" = InputReference.dns:Location;
    END IF;
END;

CREATE FUNCTION BuildOBXVariable(InputRoot REFERENCE, OutputRoot REFERENCE) RETURNS BOOLEAN
BEGIN
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    IF (InputReference.var:Variable.var:Validity <> 'CM_VALID') THEN
        RETURN FALSE;
    END IF;

    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'OBX';
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:OBX;
    SET SegmentReference.hl7:"OBX.1.SetIDOBX" = '1';
    SET SegmentReference.hl7:"OBX.2.ValueType" = 'ST';
    
    SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.1" = InputReference.var:Variable.var:PrimaryId;
    SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.2" = InputReference.var:Variable.var:Name;
    IF FIELDTYPE(InputReference.var:Variable.var:SubId) IS NOT NULL THEN
        SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.4" = InputReference.var:Variable.var:SubId;
    END IF;
    
    SET SegmentReference.hl7:"OBX.5.ObservationValue" = InputReference.var:Variable.var:VarValue;
    SET SegmentReference.hl7:"OBX.6.Units".hl7:"CE.1" = InputReference.var:Variable.var:VarUnits;
    SET SegmentReference.hl7:"OBX.11.ObservationResultStatus" = 'F';
    SET SegmentReference.hl7:"OBX.14.DateTimeoftheObservation".hl7:"TS.1" =
        OutputRoot.MRM.hl7:MSH.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1";

    RETURN TRUE;
END;

CREATE FUNCTION BuildOBXAlert(InputRoot REFERENCE, OutputRoot REFERENCE) RETURNS BOOLEAN
BEGIN
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    IF (InputReference.var:Alert.var:Validity <> 'CM_VALID') THEN
        RETURN FALSE;
    END IF;

    CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'OBX';
    DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:OBX;
    SET SegmentReference.hl7:"OBX.1.SetIDOBX" = '1';
    SET SegmentReference.hl7:"OBX.2.ValueType" = 'ST';
        
    SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.1" = InputReference.var:Alert.var:PrimaryId;
    SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.2" = InputReference.var:Alert.var:Name;
    IF FIELDTYPE(InputReference.var:Alert.var:SubId) IS NOT NULL THEN
        SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.4" = InputReference.var:Alert.var:SubId;
    END IF;
    
    SET SegmentReference.hl7:"OBX.5.ObservationValue" = InputReference.var:Alert.var:VarValue;
    SET SegmentReference.hl7:"OBX.6.Units".hl7:"CE.1" = InputReference.var:Alert.var:VarUnits;
    SET SegmentReference.hl7:"OBX.11.ObservationResultStatus" = 'F';
    SET SegmentReference.hl7:"OBX.14.DateTimeoftheObservation".hl7:"TS.1" =
        OutputRoot.MRM.hl7:MSH.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1";

    RETURN TRUE;
END;

CREATE FUNCTION BuildOBXWaveform(InputRoot REFERENCE, OutputRoot REFERENCE) RETURNS BOOLEAN
BEGIN
    DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    
    DECLARE Total INTEGER 0;
    DECLARE Index INTEGER 1;
    DECLARE Count INTEGER;
    
    SET Count = CARDINALITY(InputReference.var:Waveform.var:Samples.var:Sample[]);
    WHILE Index < Count DO
        CREATE LASTCHILD OF OutputRoot.MRM NAMESPACE hl7 NAME 'OBX';
        DECLARE SegmentReference REFERENCE TO OutputRoot.MRM.hl7:OBX[Index];
        DECLARE CurrentSample REFERENCE TO InputReference.var:Waveform.var:Samples.var:Sample[Index];    
        IF (CurrentSample.var:Validity = 'CM_VALID') THEN

            SET SegmentReference.hl7:"OBX.1.SetIDOBX" = CAST(Index AS CHARACTER);
            SET SegmentReference.hl7:"OBX.2.ValueType" = 'ST';      
            SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.1" = InputReference.var:Waveform.var:PrimaryId;
            SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.2" = InputReference.var:Waveform.var:Name;

            IF FIELDTYPE(InputReference.var:Waveform.var:SubId) IS NOT NULL THEN
                SET SegmentReference.hl7:"OBX.3.ObservationIdentifier".hl7:"CE.4" = InputReference.var:Waveform.var:SubId;
            END IF;
        
            SET SegmentReference.hl7:"OBX.5.ObservationValue" = CurrentSample.var:VarValue;
            SET SegmentReference.hl7:"OBX.11.ObservationResultStatus" = 'F';
            SET SegmentReference.hl7:"OBX.14.DateTimeoftheObservation".hl7:"TS.1" =
                OutputRoot.MRM.hl7:MSH.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1";

            SET Total = Total + 1;
        END IF;

        SET Index = Index + 1;    
    END WHILE;

    IF (Total > 0) THEN
        RETURN TRUE;
    ELSE 
        RETURN FALSE;
    END IF;
END;

CREATE COMPUTE MODULE DestinationToHL7
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
    
        SET OutputRoot.Properties.MessageSet = SenderMessageSet;
        SET OutputRoot.Properties.MessageType = SenderMessageType;
        SET OutputRoot.Properties.MessageFormat = SenderMessageFormat;
        SET OutputRoot.Properties.Encoding = InputRoot.Properties.Encoding;
        SET OutputRoot.Properties.CodedCharSetId = InputRoot.Properties.CodedCharSetId;
        
        IF FIELDTYPE(OutputRoot.MQMD) IS NULL THEN
            CREATE NEXTSIBLING OF OutputRoot.Properties DOMAIN 'MQMD';
            SET OutputRoot.MQMD = InputRoot.MQMD;
        END IF;
        
        IF FIELDTYPE(OutputRoot.MQRFH2) IS NULL THEN
            CREATE NEXTSIBLING OF OutputRoot.MQMD DOMAIN 'MQRFH2';    
            SET OutputRoot.MQRFH2 = InputRoot.MQRFH2;
        END IF; 
        
        CREATE LASTCHILD OF OutputRoot DOMAIN 'MRM';
        
        CALL BuildMSH(InputRoot, OutputRoot);
        CALL BuildPID(InputRoot, OutputRoot);
        CALL BuildPV1(InputRoot, OutputRoot);
        CALL BuildOBR(InputRoot, OutputRoot);
        
        DECLARE Valid BOOLEAN FALSE;
        IF FIELDTYPE(InputReference.var:Variable) IS NOT NULL THEN
            SET Valid = BuildOBXVariable(InputRoot, OutputRoot);
        ELSEIF FIELDTYPE(InputReference.var:Alert) IS NOT NULL THEN
            SET Valid = BuildOBXAlert(InputRoot, OutputRoot);
        ELSEIF FIELDTYPE(InputReference.var:Waveform) IS NOT NULL THEN
            SET Valid = BuildOBXWaveform(InputRoot, OutputRoot);
        END IF;

        IF (Valid = FALSE) THEN
            SET OutputRoot = InputRoot;
            PROPAGATE TO TERMINAL 'out1';
            RETURN FALSE;
        END IF;

        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetCanonicalTopic
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
<?php
    $pim = $_MB["PATTERN_INSTANCE_MANAGER"];
    $name = $pim->getPatternInstanceName();
    $topic = $name."/Canonical";   
    echo "        SET OutputRoot.Properties.Topic = '".$topic."';";
?>  
        SET Environment.PatternVariables.FlowMilestoneReached = 'PUBLISHCANONICAL';    
        RETURN TRUE;
    END;
END MODULE;

<?php
    if ($_MB['PP']['patientIdentifiers'] == 'database') {
echo <<<ESQL
CREATE COMPUTE MODULE LookupPatientIdentifiers
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;     

        DECLARE env REFERENCE TO Environment.PatternVariables;
        SET env.FlowMilestoneReached = 'LOOKUPPATIENTIDENTIFIERS';    
        DECLARE DevicePatientId REFERENCE TO OutputRoot.MRM.hl7:PID.hl7:"PID.3.PatientIdentifierList".hl7:"CX.1";

        SET env.PatientIdentifiers[] = (
            SELECT P.PATIENTID
                FROM Database.PATIENTS as P 
                WHERE P.DEVICEID = DevicePatientId); 
        
        -- Writes to the NOMATCH identifier queue
        IF NOT EXISTS(env.PatientIdentifiers[]) THEN
            PROPAGATE TO TERMINAL 'out1';
            RETURN FALSE;
        END IF;

        SET DevicePatientId = env.PatientIdentifiers[1].PATIENTID;      
        RETURN TRUE;
    END;
END MODULE;  
ESQL;
    }
?>  

