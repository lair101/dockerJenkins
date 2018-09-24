BROKER SCHEMA healthcare

-- $MQSI restrictedTo=healthcare MQSI$
CREATE COMPUTE MODULE AddExpiryTime
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

        DECLARE InputReference REFERENCE TO InputRoot.DataObject.dns:DataMessage;
        SET OutputRoot.MQRFH2.usr.StartTime = InputReference.dns:RequestTime;        
        SET OutputRoot.MQRFH2.usr.BrokerName = SQL.BrokerName;
<?php 
if (strlen($_MB['PP']['expiryTime']) > 0) {
    $expiryTime = $_MB['PP']['expiryTime'];
    if ($expiryTime > 0) {
        echo "        SET OutputRoot.MQRFH2.usr.ExpiryTimeInSeconds = '".$expiryTime."';";    
    }
}
?>        
    END;
END MODULE;
