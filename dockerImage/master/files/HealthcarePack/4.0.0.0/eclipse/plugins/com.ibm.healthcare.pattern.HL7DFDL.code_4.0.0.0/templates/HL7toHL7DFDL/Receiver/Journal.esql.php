BROKER SCHEMA Receiver

-- $MQSI restrictedTo=healthcare MQSI$
CREATE COMPUTE MODULE StandardJournal
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        
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
        SET OutputRoot.MQRFH2.usr.BrokerName = SQL.BrokerName;
        DECLARE OutRef REFERENCE TO OutputRoot.MQRFH2.usr;
        SET OutRef.MessageFlowLabel = SQL.MessageFlowLabel; 
        SET OutRef.DTSTAMP = CURRENT_TIMESTAMP;

<?php 

$pim = $_MB["PATTERN_INSTANCE_MANAGER"];
$piname = $pim->getPatternInstanceName();
echo "        SET OutRef.PatternInstance = '".$piname."';\n";
echo "        SET OutRef.SourceIdentifier = '".$_MB['PP']['sourceIdentifier']."';\n";
echo "        SET OutRef.SourceFacility = '".$_MB['PP']['sourceFacility']."';\n";

if($_MB['PP']['publish'] == 'Publish') {
    echo "        SET OutputRoot.Properties.Topic  = '".$piname."/Receiver/Journal';\n";    
}
?>
        
        RETURN TRUE;
    END;
END MODULE;

