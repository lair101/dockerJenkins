BROKER SCHEMA service

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE ErrorLoggingOn EXTERNAL BOOLEAN TRUE;

CREATE COMPUTE MODULE BuildSOAPFault
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        -- An unspecified error has occurred before successful completion of service call
        DECLARE soapenv NAMESPACE 'http://schemas.xmlsoap.org/soap/envelope/';
        SET OutputRoot.SOAP.Context.Namespace.(SOAP.NamespaceDecl)xmlns:soapenv = 'http://schemas.xmlsoap.org/soap/envelope/';
        SET OutputRoot.SOAP.Body.soapenv:Fault.faultcode = 'soapenv:Server';    
        SET OutputRoot.SOAP.Body.soapenv:Fault.faultstring = 'Service call not completed';
        SET OutputRoot.SOAP.Body.soapenv:Fault.detail.Message = 'Error detected while processing request';
        SET OutputLocalEnvironment.Destination.SOAP.Reply.Transport.HTTP.ReplyStatusCode = 500;
        
        -- Add some exception data (error and text only)
        DECLARE Error INTEGER;
        DECLARE Text CHARACTER;
        DECLARE Label CHARACTER;
        DECLARE Index INTEGER 1;
        DECLARE CurrentException REFERENCE TO InputExceptionList.*[1];

        WHILE CurrentException.Number IS NOT NULL DO 
            SET Label = CurrentException.Label;
            SET Error = CurrentException.Number;
            
            IF Error = 3001 THEN
                SET Text = CurrentException.Insert.Text;
            ELSE
                SET Text = CurrentException.Text;
            END IF;
            
            -- Don't include the caught exception and rethrowing message
            IF Error <> 2230 THEN
                SET OutputRoot.SOAP.Body.soapenv:Fault.detail.Exceptions[Index].Error = Error;
                SET OutputRoot.SOAP.Body.soapenv:Fault.detail.Exceptions[Index].Text = Text;
                SET Index = Index + 1; 
            END IF;
            
            -- Move to the last child of the field to which it currently points
            MOVE CurrentException LASTCHILD;

        END WHILE;
        RETURN TRUE;
    END;
END MODULE;

CREATE COMPUTE MODULE BuildErrorMessage
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot.Properties = NULL;
        
        -- No MQMD header so create domain 
        CREATE FIRSTCHILD OF OutputRoot DOMAIN 'MQMD' NAME 'MQMD';
        DECLARE MQMDReference REFERENCE TO OutputRoot.MQMD;
        SET MQMDReference.Version = MQMD_CURRENT_VERSION;
        SET MQMDReference.ApplIdentityData = SQL.BrokerName;
        SET MQMDReference.CodedCharSetId = InputRoot.Properties.CodedCharSetId;
        SET MQMDReference.Encoding = InputRoot.Properties.Encoding;
    
        CREATE NEXTSIBLING OF MQMDReference DOMAIN('XMLNSC') NAME 'XMLNSC';
        
        DECLARE OutReference REFERENCE TO OutputRoot.XMLNSC;
        SET OutReference.Error.BrokerName = SQL.BrokerName;
        MOVE OutReference TO OutputRoot.XMLNSC.Error;
        SET OutReference.MessageFlowLabel = SQL.MessageFlowLabel; 
        SET OutReference.DTSTAMP = CURRENT_TIMESTAMP;  
        SET OutReference.StatusCode = InputLocalEnvironment.Variables.StatusCode;
        SET OutReference.Service.name = InputRoot.SOAP.Context.service;
        SET OutReference.Service.nameSpace = InputRoot.SOAP.Context.Namespace;
        SET OutReference.Service.port = InputRoot.SOAP.Context.port;
        SET OutReference.Service.portType = InputRoot.SOAP.Context.portType;
        SET OutReference.Service.operation = InputRoot.SOAP.Context.operation;
        
        Call AddExceptionData();
    END;
        
    CREATE PROCEDURE AddExceptionData() 
    BEGIN   
        DECLARE ErrorReference REFERENCE TO OutputRoot.XMLNSC.Error; 
    
        DECLARE Error INTEGER;
        DECLARE Text CHARACTER;
        DECLARE Label CHARACTER;
        DECLARE Index INTEGER 1;
        DECLARE InsertIndex INTEGER;
        DECLARE CurrentException REFERENCE TO InputExceptionList.*[1];
    
        WHILE CurrentException.Number IS NOT NULL DO 
            SET Label = CurrentException.Label;
            SET Error = CurrentException.Number;
            IF Error = 3001 THEN
                SET Text = CurrentException.Insert.Text;
            ELSE
                SET Text = CurrentException.Text;
            END IF;
            
            -- Don't include the caught exception and rethrowing message
            IF Error <> 2230 THEN
                DECLARE Inserts Character;
                SET Inserts = '';
                -- Are there any inserts for this exception
                IF EXISTS (CurrentException.Insert[]) THEN
                    -- If yes add them to inserts string
                    SET Inserts = Inserts || COALESCE(CurrentException.Insert[1].Text, 'NULL')|| ' / ';
                    SET InsertIndex = 1;
                    INSERTS: LOOP
                        IF CARDINALITY(CurrentException.Insert[]) > InsertIndex 
                        THEN 
                            SET Inserts = Inserts || COALESCE(CurrentException.Insert[InsertIndex + 1].Text, 'NULL')|| ' / ';
                        -- No more inserts to process
                        ELSE 
                            LEAVE INSERTS;
                        END IF;
                    SET InsertIndex = InsertIndex + 1;
                    END LOOP INSERTS;
                END IF;
                
                SET ErrorReference.Exception[Index].Label = Label;
                SET ErrorReference.Exception[Index].Error = Error;
                SET ErrorReference.Exception[Index].Text = Text;
                Set ErrorReference.Exception[Index].Inserts = COALESCE(Inserts, '');
                
                SET Index = Index + 1;          
            END IF;
            
            -- Move to the last child of the field to which it currently points
            MOVE CurrentException LASTCHILD;
                
        END WHILE;
    END;
END MODULE;

CREATE FILTER MODULE CheckErrorLoggingOn
    CREATE FUNCTION Main() RETURNS BOOLEAN
    BEGIN
        RETURN ErrorLoggingOn;
    END;
END MODULE;