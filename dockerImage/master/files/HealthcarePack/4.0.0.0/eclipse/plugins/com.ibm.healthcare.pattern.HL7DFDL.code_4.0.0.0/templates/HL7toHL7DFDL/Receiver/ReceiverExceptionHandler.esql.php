BROKER SCHEMA Receiver

-- $MQSI restrictedTo=healthcare MQSI$
<?php 
if ($_MB['PP']['ack'] == 'true') {
    echo <<<ESQL
CREATE COMPUTE MODULE ReceiverExceptionHandlerBuildNACK
            
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE hl7 NAMESPACE 'urn:hl7-org:v2xml';
        DECLARE env REFERENCE TO Environment.PatternVariables;      

        SET OutputRoot.Properties = InputRoot.Properties;
        SET OutputLocalEnvironment = InputLocalEnvironment;
        -- Copy environment variables into local environment
        -- This helps if the exception occurs in this compute node itself
        SET OutputLocalEnvironment.PatternVariables = Environment.PatternVariables;
        
        -- Reset the environment variables
        -- The filter node routes message to false terminal when exception occurs here
        SET env.FlowMilestoneReached = ' ';
        SET env.SendNACK = ' ';
        SET env.EndConnection = ' ';
        SET env.HL7RC = ' ';
        SET env.ErrorCondition = ' ';
        
        DECLARE LocalEnv REFERENCE TO OutputLocalEnvironment.PatternVariables;
        
        -- Create MSH and MSA segment under OutputRoot.DFDL
        CREATE FIELD OutputRoot.DFDL.hl7:HL7.hl7:MSH;
        CREATE FIELD OutputRoot.DFDL.hl7:HL7.hl7:anyHL7Segment.hl7:MSA;   

        IF (LocalEnv.FlowMilestoneReached IS NOT NULL) THEN
            IF (LocalEnv.SendNACK = 'YES') THEN
                -- Build MSH segment for acknowledgement message
                CALL Receiver.BuildACKMSH(LocalEnv.InputMSH, OutputRoot.DFDL.hl7:HL7.hl7:MSH);             
                -- Build MSA segment for acknowledgement message
                CALL Receiver.BuildACKMSA(LocalEnv.InputMSH, OutputRoot.DFDL.hl7:HL7.hl7:anyHL7Segment.hl7:MSA, LocalEnv.HL7RC, LocalEnv.ErrorCondition);                
            END IF;
        ELSE
            SET LocalEnv.HL7RC = 'AR';
            DECLARE MessageNumber INTEGER 0;
            DECLARE MessageText CHARACTER ' ';
            CALL GetLastExceptionDetail(InputExceptionList, MessageNumber, MessageText);            

            IF MessageNumber > 0 THEN
                SET LocalEnv.ErrorCondition = ('BIP') || (CAST (MessageNumber AS CHARACTER)) || (' : ') || (MessageText);
                -- Build MSH segment for acknowledgement message
                CALL Receiver.BuildACKMSH(LocalEnv.InputMSH, OutputRoot.DFDL.hl7:HL7.hl7:MSH);             
                -- Build MSH segment for acknowledgement message
                CALL Receiver.BuildACKMSA(LocalEnv.InputMSH, OutputRoot.DFDL.hl7:HL7.hl7:anyHL7Segment.hl7:MSA, LocalEnv.HL7RC, LocalEnv.ErrorCondition);                

                SET OutputLocalEnvironment.SendNACK = 'YES';
            END IF;
        END IF;
        
        SET FailureCount = FailureCount + 1; -- Increase the failure count
        
        IF LocalEnv.SendNACK = 'YES' THEN
            DECLARE hl7BitStream BLOB
                ASBITSTREAM(OutputRoot.DFDL
                    CCSID OutputRoot.Properties.CodedCharSetId
                    ENCODING OutputRoot.Properties.Encoding
                    SET ReceiverMessageSet
                    TYPE ReceiverMessageType
                    FORMAT ReceiverMessageFormat);
ESQL;
        echo "\n         DECLARE LeadingMLLPBytes BLOB X'".$_MB['PP']['Leading']."';";
        echo <<<ESQL

            -- Add leading MLLP bytes       
            SET OutputRoot.BLOB.BLOB = LeadingMLLPBytes||hl7BitStream;  

            SET OutputRoot.DFDL = NULL; -- Delete the DFDL tree
            PROPAGATE TO TERMINAL 'out1' Message OutputRoot DELETE NONE; -- Propagates the ACK message to TCPIPServerOutput node
            SET OutputRoot.BLOB.BLOB = NULL; -- This statement gets executed if the propagate statement is successful in delivering the ACK message
        END IF;     

        -- Close the TCPIP connection if the following condition is satisfied
        -- Also reset the failure count
        -- Error limit is defined by the pattern parameter
        DECLARE ErrorLimit INTEGER;
ESQL;
echo "\n     SET ErrorLimit =  ".$_MB['PP']['errorLimit'].";\n";
echo <<<ESQL
        IF ((LocalEnv.EndConnection = 'YES') OR ((ErrorLimit > 0) AND (FailureCount > ErrorLimit))) THEN
            SET FailureCount = 0;
            PROPAGATE TO TERMINAL 'out2' DELETE NONE;
        END IF;
        SET OutputRoot = InputRoot;             
        RETURN TRUE;    
    END;    

    CREATE PROCEDURE GetLastExceptionDetail(IN InputTree REFERENCE, OUT MessageNumber INTEGER, OUT MessageText CHARACTER)
    BEGIN
        -- Create a reference to the first child of the exception list
        DECLARE PtrException reference to InputTree.*[1];
        -- Keep looping while the moves to the child of exception list work
        WHILE LASTMOVE(PtrException) DO
            -- Store the current values for the error number and text
            IF PtrException.Number IS NOT NULL THEN
                SET MessageNumber = PtrException.Number;
                SET MessageText = PtrException.Text;
            END IF;
            -- Now move to the last child which should be the next exception list
            MOVE PtrException LASTCHILD;
        END WHILE;
    END;
END MODULE;

CREATE COMPUTE MODULE ReceiverExceptionHandlerAddErrorInformation
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;
        SET OutputRoot = InputRoot; 

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

        -- Add the ACK code and error text into MQRFH2 header
        -- This will help user to identify the error
        SET OutputRoot.MQRFH2.usr.ErrorCondition = 'ACK code : ' || Environment.PatternVariables.HL7RC || ' Error Condition : ' || Environment.PatternVariables.ErrorCondition;
        RETURN TRUE;
    END;
END MODULE;

CREATE FILTER MODULE ReceiverExceptionHandlerFilterErrors
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;
        IF (env.FlowMilestoneReached IS NOT NULL) AND (env.FlowMilestoneReached <> ' ') THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END;
END MODULE;
ESQL;
} else {
    echo <<<ESQL
CREATE COMPUTE MODULE ReceiverExceptionHandlerAddErrorInformation
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;
        SET OutputRoot = InputRoot; 

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

        -- Add the ACK code and error text into MQRFH2 header
        -- This will help user to identify the error
        SET OutputRoot.MQRFH2.usr.ErrorCondition = 'ACK code : ' || Environment.PatternVariables.HL7RC || ' Error Condition : ' || Environment.PatternVariables.ErrorCondition;
        RETURN TRUE;
    END;
END MODULE;
ESQL;
}
echo <<<ESQL
CREATE COMPUTE MODULE ReceiverExceptionHandlerCountErrors
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        DECLARE env REFERENCE TO Environment.PatternVariables;
        -- Send a close if failure count exceeded
        -- ErrorLimit is defined by the pattern parameter
        DECLARE ErrorLimit INTEGER;
ESQL;
echo "\n        SET ErrorLimit =  ".$_MB['PP']['errorLimit'].";\n";
echo <<<ESQL
        SET FailureCount = FailureCount + 1;
        IF  (ErrorLimit > 0) AND (FailureCount > ErrorLimit) THEN
            SET FailureCount = 0;
            PROPAGATE TO TERMINAL 'out2' DELETE NONE;
        END IF;     
        RETURN TRUE;
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
ESQL;

