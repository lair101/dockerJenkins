BROKER SCHEMA healthcare

-- $MQSI restrictedTo=healthcare MQSI$
CREATE COMPUTE MODULE CheckExpired
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot = InputRoot;
        DECLARE CurrentTime TIMESTAMP;
        SET CurrentTime = CURRENT_TIMESTAMP;        
        
        IF (InputRoot.MQRFH2.usr.ExpiryTimeInSeconds IS NULL) THEN
            RETURN TRUE;
        END IF;
        
        DECLARE StartTime TIMESTAMP CAST(InputRoot.MQRFH2.usr.StartTime AS TIMESTAMP);        
        DECLARE ExpiryTimeInSeconds INTEGER CAST(InputRoot.MQRFH2.usr.ExpiryTimeInSeconds AS INTEGER);      
        DECLARE EndTime TIMESTAMP StartTime + CAST(ExpiryTimeInSeconds AS INTERVAL SECOND);

        -- Write to the expired queue       
        IF (CurrentTime > EndTime) THEN
            PROPAGATE TO TERMINAL 'out1';
            RETURN FALSE;
        END IF;
         
        RETURN TRUE;
    END;
END MODULE;

