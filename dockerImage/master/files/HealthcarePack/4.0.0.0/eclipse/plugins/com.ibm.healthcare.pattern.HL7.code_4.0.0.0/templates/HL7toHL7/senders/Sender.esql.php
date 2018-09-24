BROKER SCHEMA senders

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE hl7 NAMESPACE 'urn:hl7-org:v2xml';
DECLARE supportNS NAMESPACE 'http://ibm/healthcare/support';
DECLARE retryCount SHARED INTEGER 0;
DECLARE SenderMessageSet CONSTANT CHARACTER 'HL7v25P';
DECLARE SenderMessageType CONSTANT CHARACTER 'HL7';
DECLARE SenderMessageFormat CONSTANT CHARACTER 'HL7';

CREATE FILTER MODULE RemoveDummies
    -- Dummy messages are passed to the sender flows so that messages from source can be sequenced
    -- This filter ensures that only required messages are processed
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        IF Root.XMLNSC.supportNS:MaintainSequence.MessageGeneratedToMaintainSequence IS TRUE THEN
            RETURN FALSE;
        END IF;
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetupGetSequenceData
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN       
        DECLARE MessageControlBlob BLOB CAST(Environment.PatternVariables.DestinationSequenceGroup AS BLOB CCSID 1208); -- Convert to BLOB
        DECLARE x BLOB REPLICATE(x'00', 24); -- Create a 24 byte NULL BLOB 
        SET x = OVERLAY(x PLACING MessageControlBlob FROM 1); -- Overlay one blob over the other, the NULLs pad out any shortfall
        SET Environment.PatternVariables.SequenceCorrelID = x;
        SET OutputRoot.Properties = InputRoot.Properties;
        CREATE LASTCHILD OF OutputRoot DOMAIN('MQMD');
        SET OutputRoot.Properties.ReplyIdentifier = Environment.PatternVariables.SequenceCorrelID;
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SequenceToEnvironment
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET Environment.PatternVariables.DestinationSequenceNumber = InputRoot.MRM.hl7:MSH.hl7:"MSH.13.SequenceNumber";
        SET Environment.PatternVariables.DestinationSequenceGroup = InputRoot.MQRFH2.usr.DestinationSequenceGroup;
        SET Environment.PatternVariables.SourceSequenceNumber = InputRoot.MQRFH2.usr.SourceSequenceNumber;
        SET Environment.PatternVariables.SourceSequenceGroup = InputRoot.MQRFH2.usr.sequenceGroup;
        SET OutputLocalEnvironment = InputLocalEnvironment;
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SaveSequenceData
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        -- Save the latest sequence number for a destination
        SET OutputRoot.Properties = InputRoot.Properties;
        CREATE LASTCHILD OF OutputRoot DOMAIN('MQMD');
        SET OutputRoot.MQMD.Version = MQMD_CURRENT_VERSION;
        SET OutputRoot.MQMD.Format = MQFMT_STRING;
        SET OutputRoot.Properties.Persistence = TRUE;
        SET OutputRoot.Properties.ReplyIdentifier = Environment.PatternVariables.SequenceCorrelID;
        SET OutputRoot.XMLNSC.supportNS:SequenceState.supportNS:SourceSequenceNumber = Environment.PatternVariables.SourceSequenceNumber;
        SET OutputRoot.XMLNSC.supportNS:SequenceState.supportNS:SourceSequenceGroup = Environment.PatternVariables.SourceSequenceGroup;
        SET OutputRoot.XMLNSC.supportNS:SequenceState.supportNS:DestinationSequenceNumber = Environment.PatternVariables.DestinationSequenceNumber;
        SET OutputRoot.XMLNSC.supportNS:SequenceState.supportNS:DestinationSequenceGroup = Environment.PatternVariables.DestinationSequenceGroup;
        SET OutputRoot.XMLNSC.supportNS:SequenceState.supportNS:TimeStamp = CURRENT_TIMESTAMP;
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetupHL7FailureException
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
        -- Check if this was an AE return
        -- AE implies not retry so do not throw error just log this
        -- Also if AR received and configured number of retries exceeded do not throw
        IF (Environment.PatternVariables.FlowMilestoneReached = 'ACKAE') OR
            (Environment.PatternVariables.FlowMilestoneReached = 'ACKARTOOMANYREPEATS') OR
            (Environment.PatternVariables.FlowMilestoneReached = 'ACKERROR') OR
            (Environment.PatternVariables.FlowMilestoneReached = 'RECEIVEACK')
                THEN SET Environment.PatternVariables.Throw = 'NO';
        ELSE
            SET Environment.PatternVariables.Throw = 'YES';
        END IF;
        RETURN TRUE;
    END;
END MODULE; 

CREATE COMPUTE MODULE SetupLogException
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        -- This is used for logging retries to the error queue
        -- Do not throw error as retry loop will continue trying
        SET OutputRoot = InputRoot;
        SET Environment.PatternVariables.Throw = 'NO';
        RETURN TRUE;
    END;
END MODULE; 

CREATE COMPUTE MODULE SetupMQFailureException
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        -- This is an MQ failure so check the backout so we don't duplicate error messages
        SET OutputRoot = InputRoot;
        SET Environment.PatternVariables.Throw = 'YES';
        DECLARE env REFERENCE TO Environment.PatternVariables;
        IF OutputRoot.MQMD.BackoutCount > 0 THEN
            THROW USER EXCEPTION MESSAGE 3001 VALUES('Error reading message from queue in HL7 Sender flow');
        END IF;    

        SET env.FlowMilestoneReached = 'READFROMSENDERQUEUE';
        SET env.ErrorCondition = 'Error reading message from queue in HL7 Sender flow';
        SET OutputRoot.MQRFH2.usr.ErrorCondition = 'Error Occurred at : ' || env.FlowMilestoneReached || ' Error Condition : ' || env.ErrorCondition;

        RETURN TRUE;
    END;
END MODULE; 

CREATE COMPUTE MODULE CheckAndThrow
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;     
        IF Environment.PatternVariables.Throw = 'YES' THEN
            THROW USER EXCEPTION VALUES(Environment.PatternVariables.ErrorCondition);
        ELSE
            RETURN FALSE;
        END IF;
    END;
END MODULE;

CREATE COMPUTE MODULE InitSequenceRetry
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        -- Sequencing causes retries after rollback
        -- These variables are used to filter number of retries to 1,2,4,8,16,.....
        SET OutputLocalEnvironment = InputLocalEnvironment;     
        SET Environment.PatternVariables.SeqRetry = 1;
        SET Environment.PatternVariables.SeqLog = 1;        
    END;
END MODULE;

CREATE COMPUTE MODULE InitNoSequenceRetry
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;     
        -- No sequencing so setting to 0 ensures all attempts logged / reported
        SET Environment.PatternVariables.SeqRetry = 1;
        SET Environment.PatternVariables.SeqLog = 0;        
    END;
END MODULE;

CREATE COMPUTE MODULE AddErrorInformation
    CREATE PROCEDURE LogOutput() RETURNS BOOLEAN BEGIN
        -- When retries come from sequencing node we do not log every repeat from the sequencing node
        -- Log only at 1,2,4,8,16,32 ....................
        -- If sequencing not inplace SeqLog is always 0 and always log
        IF Environment.PatternVariables.SeqRetry < Environment.PatternVariables.SeqLog THEN
            SET Environment.PatternVariables.SeqRetry = Environment.PatternVariables.SeqRetry + 1;
            RETURN FALSE;
        ELSE
            SET Environment.PatternVariables.SeqRetry = Environment.PatternVariables.SeqRetry + 1;
            SET Environment.PatternVariables.SeqLog = 2 * Environment.PatternVariables.SeqLog;
            RETURN TRUE;
        END IF;
    END;

    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;
        SET OutputRoot = InputRoot;
        DECLARE env REFERENCE TO Environment.PatternVariables;
    
        IF LogOutput() THEN 
            IF FIELDTYPE(OutputRoot.MQMD) IS NULL THEN
                CREATE NEXTSIBLING OF OutputRoot.Properties DOMAIN 'MQMD';
                SET OutputRoot.MQMD.CodedCharSetId = OutputRoot.Properties.CodedCharSetId;
                SET OutputRoot.MQMD.Encoding = OutputRoot.Properties.Encoding; 
             END IF;

            IF FIELDTYPE(OutputRoot.MQRFH2) IS NULL THEN
                CREATE NEXTSIBLING OF OutputRoot.MQMD DOMAIN 'MQRFH2';  
            END IF; 

            SET OutputRoot.MQRFH2.(MQRFH2.Field)Format = 'MQSTR';
            SET OutputRoot.MQRFH2.(MQRFH2.Field)Version = 2;
            SET OutputRoot.MQRFH2.(MQRFH2.Field)NameValueCCSID = 1208;
            SET OutputRoot.MQRFH2.(MQRFH2.Field)CodedCharSetId = OutputRoot.Properties.CodedCharSetId;

            -- Set the flow and error condition to help user to identify error  
            SET OutputRoot.MQRFH2.usr.ErrorCondition = env.Attempt || ' Error Occurred at : ' || env.FlowMilestoneReached || ' Error Condition : ' || env.ErrorCondition;
            RETURN TRUE;
        ELSE
            PROPAGATE TO TERMINAL 'out1';
            RETURN FALSE;
        END IF;
    END;
END MODULE;

CREATE COMPUTE MODULE Setup
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;
        SET Environment.PatternVariables = InputLocalEnvironment.HL7;
        RETURN TRUE;
    END;
END MODULE;