BROKER SCHEMA healthcare

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE ReceiverMessageSet CONSTANT CHARACTER 'HL7v25P';
DECLARE ReceiverMessageType CONSTANT CHARACTER 'HL7';
DECLARE ReceiverMessageFormat CONSTANT CHARACTER 'HL7';
DECLARE FieldSeparator CONSTANT CHARACTER '|';
DECLARE ServiceString CONSTANT CHARACTER '^~\&';
DECLARE SendingApplication CONSTANT CHARACTER 'BROKER.RECEIVER';
DECLARE SendingFacility CONSTANT CHARACTER ' ';
DECLARE ReceivingApplication CONSTANT CHARACTER ' ';
DECLARE ReceivingFacility CONSTANT CHARACTER ' ';
DECLARE ProcessingID CONSTANT CHARACTER 'P';
DECLARE DefaultMessageControlID CONSTANT CHARACTER '123456789';
DECLARE FailureCount SHARED INTEGER 0;

-- Return unique identifier of 20 bytes length to be
-- used as message control ID in the ACK messages
CREATE FUNCTION GetUUID() RETURNS CHARACTER
BEGIN
    DECLARE UID CHARACTER;
    SET UID = REPLACE(UUIDASCHAR,'-');
    SET UID = RIGHT(UID,20);
    RETURN UID;
END;

-- The following procedure builds the MSH segment for ACK messages
-- Environment.PatternVariables and OutputRoot are passed as reference
CREATE PROCEDURE BuildACKMSH(IN MSHEnv REFERENCE, IN MSHFields REFERENCE) 
BEGIN
    -- Assign the FieldSeparator value from input message if it is present
    IF MSHEnv.Field1 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.1.FieldSeparator" = MSHEnv.Field1;
    ELSE
        SET MSHFields.hl7:"MSH.1.FieldSeparator" = FieldSeparator;
    END IF;

    -- Assign the ServiceString value from input message if it is present
    IF MSHEnv.Field2 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.2.ServiceString" = MSHEnv.Field2;
    ELSE
        SET MSHFields.hl7:"MSH.2.ServiceString" = ServiceString;
    END IF;

    -- Get the values from UDPs and assign to field 3 and 4
    SET MSHFields.hl7:"MSH.3.SendingApplication".hl7:"HD.1" = SendingApplication;
    SET MSHFields.hl7:"MSH.4.SendingFacility".hl7:"HD.1" = SendingFacility;

    -- Assign the SendingApplication value from input message if it is present
    IF MSHEnv.Field3 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.5.ReceivingApplication".hl7:"HD.1" = MSHEnv.Field3;
    ELSE
        SET MSHFields.hl7:"MSH.5.ReceivingApplication".hl7:"HD.1" = ReceivingApplication;
    END IF;

    -- Assign the SendingFacility value from input message if it is present
    IF MSHEnv.Field4 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.6.ReceivingFacility".hl7:"HD.1" = MSHEnv.Field4;
    ELSE
        SET MSHFields.hl7:"MSH.6.ReceivingFacility".hl7:"HD.1" = ReceivingFacility;
    END IF;

    -- Compute date time in YYYYMMddHHmmss format
    SET MSHFields.hl7:"MSH.7.DateTimeOfMessage".hl7:"TS.1" = CAST(CURRENT_TIMESTAMP AS CHARACTER FORMAT 'YYYYMMddHHmmss');

    -- Type of message - ACK in case of acknowledgement
    SET MSHFields.hl7:"MSH.9.MessageType".hl7:"MSG.1" = 'ACK';

    -- Get the 20 bytes length of UID and assign it as message control ID
    SET MSHFields.hl7:"MSH.10.MessageControlID" = GetUUID();

    -- Assign the ProcessingID value from the input message
    IF MSHEnv.Field11 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.11.ProcessingID".hl7:"PT.1" = MSHEnv.Field11;
    ELSE
        SET MSHFields.hl7:"MSH.11.ProcessingID".hl7:"PT.1" = ProcessingID;
    END IF;

    -- Assign the VersionID value from the input message - by default it is 2.2
    IF MSHEnv.Field12 IS NOT NULL THEN
        SET MSHFields.hl7:"MSH.12.VersionID".hl7:"VID.1" = MSHEnv.Field12;
    ELSE
        SET MSHFields.hl7:"MSH.12.VersionID".hl7:"VID.1" = '2.2';
    END IF;
END;

CREATE PROCEDURE BuildACKMSA(IN MSHEnv REFERENCE, IN MSAFields REFERENCE, IN AckCode CHARACTER, IN ErrorText CHARACTER) 
BEGIN
    -- Assign the ACK code sent from BuildACK or BuildNACK nodes
    SET MSAFields.hl7:"MSA.1.AcknowledgementCode" = AckCode;

    -- Get the message control ID from the input message and assign it
    IF MSHEnv.Field10 IS NOT NULL THEN
        SET MSAFields.hl7:"MSA.2.MessageControlID" = MSHEnv.Field10;
    ELSE
        SET MSAFields.hl7:"MSA.2.MessageControlID" = DefaultMessageControlID;
    END IF;

    -- Error text in case of ACK AE or ACK AR
    SET MSAFields.hl7:"MSA.3.TextMessage" = ErrorText;

    -- Get the sequence number from input message if present
    IF MSHEnv.Field13 IS NOT NULL THEN
        SET MSAFields.hl7:"MSA.4.ExpectedSequenceNumber" = MSHEnv.Field13;
    END IF;
END;

CREATE COMPUTE MODULE BuildACK
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;

        SET OutputLocalEnvironment= InputLocalEnvironment;
        SET env.FlowMilestoneReached = 'BUILDACK';
        SET env.SendNACK = 'YES';
        SET env.EndConnection = 'NO';
        SET env.HL7RC = 'AR';
        SET env.ErrorCondition = 'Error while building ACK message';

        -- Create MSH and MSA segment under OutputRoot.MRM
        CREATE FIELD OutputRoot.MRM.hl7:MSH;
        CREATE FIELD OutputRoot.MRM.hl7:MSA;

        -- Build MSH Segment
        CALL BuildACKMSH(env.InputMSH, OutputRoot.MRM.hl7:MSH);
        -- Build MSA Segment with ACK Code AA. No error text in this case.
        CALL BuildACKMSA(env.InputMSH, OutputRoot.MRM.hl7:MSA, 'AA', ' ');

        SET env.FlowMilestoneReached = 'SENDACK';
        SET env.SendNACK = 'YES';
        SET env.EndConnection = 'NO';
        SET env.HL7RC = 'AR';
        SET env.ErrorCondition = 'Error while sending ACK message';

        -- Serialize the message
        DECLARE hl7BitStream BLOB
            ASBITSTREAM(OutputRoot.MRM
                ENCODING InputRoot.Properties.Encoding
                CCSID InputRoot.Properties.CodedCharSetId
                SET ReceiverMessageSet
                TYPE ReceiverMessageType
                FORMAT ReceiverMessageFormat);

        -- Leading MLLP byte is set as a pattern parameter
        DECLARE LeadingMLLPBytes  BLOB  X'<?php echo $_MB['PP']['Leading']?>';
        SET OutputRoot.BLOB.BLOB = LeadingMLLPBytes || hl7BitStream;
        SET OutputRoot.MRM = NULL;

        -- Send the acknowledgement message to the sending application
        -- Any failure in delivering the message, the exception will be thrown by the 
        -- TCPIPServerOutput node which will be caught by the TCPIPServerInput node's catch terminal
        PROPAGATE TO TERMINAL 'out' MESSAGE OutputRoot;

        -- Reset the flow milestone as it is successful case
        SET env.FlowMilestoneReached = ' ';
        SET env.SendNACK = ' ';
        SET env.EndConnection = ' ';
        SET env.HL7RC = ' ';
        SET env.ErrorCondition = ' ';
        SET FailureCount = 0;

        RETURN FALSE;
    END;

END MODULE;

CREATE COMPUTE MODULE MilestoneHL7ToProcessing
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;
        SET OutputLocalEnvironment = InputLocalEnvironment;
        SET env.FlowMilestoneReached = 'TOPROCESSING';
        SET env.SendNACK = 'YES';
        SET env.EndConnection = 'NO';
        SET env.HL7RC = 'AR';
        SET env.ErrorCondition = 'Error while committing a message into processor queue';

        RETURN TRUE;
    END;
END MODULE;

<?php 
    if($_MB['PP']['sequencing'] == 'contentBased'){
        echo <<<SEQ
CREATE COMPUTE MODULE PrepareForSequence
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;
        SET OutputRoot = InputRoot;
        -- For content based sequencing the sequence group is taken from the 
        -- field in the MSH header and the sequence number from MSH.Field13
        SET OutputRoot.MQRFH2.usr.sequenceGroup = InputRoot.MRM.hl7:MSH.hl7:"MSH.3.SendingApplication".hl7:"HD.1";
        IF env.InputMSH.Field13 IS NULL THEN
            SET env.FlowMilestoneReached = 'SEQUENCE';
            SET env.SendNACK = 'YES';
            SET env.EndConnection = 'NO';
            SET env.HL7RC = 'AR';
            SET env.ErrorCondition = 'missing sequence number in input message';
            THROW USER EXCEPTION VALUES('Missing sequence number in input');
        ELSE
            SET OutputRoot.MQRFH2.usr.sequenceNumber = env.InputMSH.Field13;
        END IF;

        SET env.FlowMilestoneReached = 'TOPROCESSING';
        SET env.SendNACK = 'YES';
        SET env.EndConnection = 'NO';
        SET env.HL7RC = 'AR';
        SET env.ErrorCondition = 'Error while committing a message into processor queue';

        RETURN TRUE;
    END;
END MODULE;
SEQ;
    }
    if($_MB['PP']['sequencing'] == 'arrivalBased'){
echo <<<SEQ 
CREATE COMPUTE MODULE PrepareForSequence
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;
        SET OutputRoot = InputRoot;
        -- For arrival based sequencing the sequence group is taken from the application 
        -- field in the MSH header and sequence number is added by following Sequence node
        SET OutputRoot.MQRFH2.usr.sequenceGroup = InputRoot.MRM.hl7:MSH.hl7:"MSH.3.SendingApplication".hl7:"HD.1";

        SET env.FlowMilestoneReached = 'SEQUENCE';
        SET env.SendNACK = 'YES';
        SET env.EndConnection = 'NO';
        SET env.HL7RC = 'AR';
        SET env.ErrorCondition = 'An internal failure in the sequence node';

        RETURN TRUE;
    END;
END MODULE;
SEQ;
    }
?>

CREATE COMPUTE MODULE SetTopic
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
<?php 
$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$piname = $pim->getPatternInstanceName();
echo "        SET OutputRoot.Properties.Topic  = '".$piname."/Receiver/Source';";
?>

        RETURN TRUE;
    END;
END MODULE;
