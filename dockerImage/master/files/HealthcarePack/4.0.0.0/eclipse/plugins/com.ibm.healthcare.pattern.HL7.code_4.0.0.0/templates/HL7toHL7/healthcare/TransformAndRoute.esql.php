BROKER SCHEMA healthcare

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE hl7 NAMESPACE 'urn:hl7-org:v2xml';

CREATE COMPUTE MODULE TransformXMLToHL7
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET Environment.PatternVariables.FlowMilestoneReached = 'XMLTOHL7';
        CALL CopyMessageHeaders();
        CREATE LASTCHILD OF OutputRoot DOMAIN('MRM');
        SET OutputRoot.MRM = InputRoot.XMLNSC.*:*[1];
        SET Environment.PatternVariables.FlowMilestoneReached = 'CUSTOMISATION';
        RETURN TRUE;
    END;

    CREATE PROCEDURE CopyMessageHeaders() BEGIN
        DECLARE I INTEGER 1;
        DECLARE J INTEGER;
        SET J = CARDINALITY(InputRoot.*[]);
        WHILE I < J DO
            SET OutputRoot.*[I] = InputRoot.*[I];
            SET I = I + 1;
        END WHILE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetRemaindersTopic
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
        SET Environment.PatternVariables.FlowMilestoneReached = 'PUBLISHREMAINDERS';
<?php
$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$pinst = $pim->getPatternInstanceName();
$topic = $pinst."/Remainders";  
echo "        SET OutputRoot.Properties.Topic  = '".$topic."';\n";
?>
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetCanonicalTopic
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
<?php
$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$pinst = $pim->getPatternInstanceName();
$topic = $pinst."/Canonical";   
echo "      SET OutputRoot.Properties.Topic  = '".$topic."';\n";
?>  
        SET Environment.PatternVariables.FlowMilestoneReached = 'PUBLISHCANONICAL';    
        RETURN TRUE;
    END;
END MODULE;

CREATE FILTER MODULE CheckBackout
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        IF (Root.MQMD.BackoutCount = 0) THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END;
END MODULE;

CREATE COMPUTE MODULE AddException
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot; 

        IF FIELDTYPE(OutputRoot.MQRFH2) IS NULL THEN
            CREATE NEXTSIBLING OF OutputRoot.MQMD DOMAIN 'MQRFH2';
        END IF;

        SET OutputRoot.MQRFH2.(MQRFH2.Field)Format = 'MQSTR';
        SET OutputRoot.MQRFH2.(MQRFH2.Field)Version = 2;
        SET OutputRoot.MQRFH2.(MQRFH2.Field)NameValueCCSID = 1208;
        SET OutputRoot.MQRFH2.(MQRFH2.Field)CodedCharSetId = OutputRoot.Properties.CodedCharSetId;

        SET OutputRoot.MQRFH2.usr.ErrorCondition = 'ACK code : ' || OutputLocalEnvironment.PatternVariables.HL7RC || ' Error Condition : ' || OutputLocalEnvironment.PatternVariables.ErrorCondition;
        RETURN TRUE;
    END;
END MODULE;

