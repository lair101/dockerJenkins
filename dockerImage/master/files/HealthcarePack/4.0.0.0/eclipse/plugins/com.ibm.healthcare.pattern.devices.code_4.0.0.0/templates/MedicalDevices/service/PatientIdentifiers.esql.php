BROKER SCHEMA service

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE tns NAMESPACE 'http://schemas.xmlsoap.org/soap/envelope/';

CREATE PROCEDURE CopyMessageHeaders(IN InputRoot REFERENCE, IN OutputRoot REFERENCE) BEGIN
    DECLARE I INTEGER 1;
    DECLARE J INTEGER;
    SET J = CARDINALITY(InputRoot.*[]);
    WHILE I < J DO
        SET OutputRoot.*[I] = InputRoot.*[I];
        SET I = I + 1;
    END WHILE;
END;

DECLARE sns NAMESPACE 'urn://com.ibm.healthcare.pattern.devices/patientidentifiers';

CREATE COMPUTE MODULE GetPatientId
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        CALL CopyMessageHeaders(InputRoot, OutputRoot); 
        
        DECLARE env REFERENCE TO Environment.PatternVariables;
        DECLARE InputReference REFERENCE TO InputBody.Body.(XMLNSC.Folder)*[<];
        DECLARE DeviceId CHARACTER InputReference.deviceId;

        SET env.PatientIdentifiers[] = (
            SELECT P.PATIENTID
                FROM Database.PATIENTS as P 
                WHERE P.DEVICEID = DeviceId); 
        
        CREATE FIRSTCHILD OF OutputRoot.XMLNSC NAMESPACE sns NAME 'GetPatientIdResponse';
        DECLARE OutputReference REFERENCE TO OutputRoot.XMLNSC.sns:GetPatientIdResponse;
        SET OutputReference.patientId = env.PatientIdentifiers[1].PATIENTID;      

        RETURN TRUE;
    END;
END MODULE;  

CREATE COMPUTE MODULE SetPatientId
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        CALL CopyMessageHeaders(InputRoot, OutputRoot);
            
        DECLARE InputReference REFERENCE TO InputBody.Body.(XMLNSC.Folder)*[<];
        DECLARE DeviceId CHARACTER InputReference.deviceId;
        DECLARE PatientId CHARACTER InputReference.patientId;
        
        DECLARE env REFERENCE TO Environment.PatternVariables;
        CREATE FIRSTCHILD OF OutputRoot.XMLNSC NAMESPACE sns NAME 'SetPatientIdResponse';
        DECLARE OutputReference REFERENCE TO OutputRoot.XMLNSC.sns:SetPatientIdResponse;

        SET env.PatientIdentifiers[] = (
            SELECT P.PATIENTID
                FROM Database.PATIENTS as P 
                WHERE P.DEVICEID = DeviceId);
             
        IF EXISTS(env.PatientIdentifiers[]) THEN
            UPDATE Database.PATIENTS AS P
                SET PATIENTID = PatientId
                WHERE P.DEVICEID = DeviceId;
        ELSE 
            INSERT INTO Database.PATIENTS(DEVICEID, PATIENTID) VALUES(DeviceId, PatientId);         
        END IF;

        RETURN TRUE;
    END;
END MODULE;  

CREATE COMPUTE MODULE ClearPatientId
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN       
        CALL CopyMessageHeaders(InputRoot, OutputRoot);

        DECLARE InputReference REFERENCE TO InputBody.Body.(XMLNSC.Folder)*[<];
        DECLARE DeviceId CHARACTER InputReference.deviceId;
        DECLARE PatientId CHARACTER InputReference.patientId;        
        
        DELETE FROM Database.PATIENTS AS P WHERE P.DEVICEID = DeviceId AND P.PATIENTID = PatientId;
        CREATE FIRSTCHILD OF OutputRoot.XMLNSC NAMESPACE sns NAME 'ClearPatientIdResponse';
        DECLARE OutputReference REFERENCE TO OutputRoot.XMLNSC.sns:ClearPatientIdResponse;
       
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE SetRouteDestination
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputLocalEnvironment = InputLocalEnvironment;        
        DECLARE InputReference REFERENCE TO InputBody.Body.(XMLNSC.Folder)*[<];
        DECLARE OperationName CHARACTER FIELDNAME(InputReference);
        SET OutputLocalEnvironment.Destination.RouterList.DestinationData[1].labelName = OperationName;
        
        RETURN TRUE;
    END;
END MODULE;


