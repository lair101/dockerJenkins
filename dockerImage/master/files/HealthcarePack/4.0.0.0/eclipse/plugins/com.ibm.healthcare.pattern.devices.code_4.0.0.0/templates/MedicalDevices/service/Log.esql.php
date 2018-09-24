BROKER SCHEMA service

-- $MQSI restrictedTo=healthcare MQSI$
DECLARE LoggingOn EXTERNAL BOOLEAN TRUE;
CREATE Filter MODULE CheckLogging
    CREATE FUNCTION main() RETURNS BOOLEAN 
    BEGIN
        RETURN LoggingOn;
    END;
END MODULE; 

CREATE Compute MODULE CreateLogMessage
    CREATE FUNCTION main() RETURNS BOOLEAN
    BEGIN
        SET OutputRoot.Properties = NULL;
        CREATE FIRSTCHILD OF OutputRoot DOMAIN ('MQMD') NAME 'MQMD';
        DECLARE MQMDReference REFERENCE TO OutputRoot.MQMD;
        SET MQMDReference.Format = MQFMT_RF_HEADER_2;
        SET MQMDReference.Version = MQMD_CURRENT_VERSION;
        SET MQMDReference.CodedCharSetId = InputRoot.Properties.CodedCharSetId;
        SET MQMDReference.Encoding = InputRoot.Properties.Encoding;

        DECLARE OutReference REFERENCE TO OutputRoot;
        CREATE NEXTSIBLING OF MQMDReference AS OutReference DOMAIN('MQRFH2') NAME 'MQRFH2';
        SET OutputRoot.MQRFH2.(MQRFH2.Field)Version = 2;
        SET OutReference.usr.BrokerName = SQL.BrokerName;
        MOVE OutReference TO OutReference.usr;
        SET OutReference.MessageFlowLabel = SQL.MessageFlowLabel;
        SET OutReference.DTSTAMP = CURRENT_TIMESTAMP;
        
        -- Add service information
        SET OutReference.StatusCode = InputLocalEnvironment.Variables.StatusCode;
        SET OutReference.ServiceName = InputRoot.SOAP.Context.service;
        SET OutReference.ServiceNameSpace = InputRoot.SOAP.Context.Namespace;
        SET OutReference.ServicePort = InputRoot.SOAP.Context.port;
        SET OutReference.ServicePortType = InputRoot.SOAP.Context.portType;
        SET OutReference.ServiceOperation = InputRoot.SOAP.Context.operation;
        SET OutReference.ServiceSOAPVersion = InputRoot.SOAP.Context.SOAP_Version;
        CREATE NEXTSIBLING OF OutputRoot.MQRFH2 DOMAIN('XMLNSC') NAME 'XMLNSC';
        
        SET OutputRoot.XMLNSC.Message = InputBody;
    END;
END MODULE;

CREATE Compute MODULE CreateTraceData
    CREATE FUNCTION main() RETURNS BOOLEAN 
    BEGIN
        DECLARE PatternReference REFERENCE TO Environment.PatternVariables; 

        SET PatternReference.DTSTAMP = CURRENT_TIMESTAMP;
        SET PatternReference.BrokerName = SQL.BrokerName;
        SET PatternReference.MessageFlowlabel = SQL.MessageFlowLabel;
        SET PatternReference.Action = InputRoot.SOAP.Context.operation;
        
        -- Add service information
        SET PatternReference.Service.(XMLNSC.PCDataField)name = InputRoot.SOAP.Context.service;
        SET PatternReference.Service.nameSpace = InputRoot.SOAP.Context.Namespace;
        SET PatternReference.Service.(XMLNSC.PCDataField)port = InputRoot.SOAP.Context.port;
        SET PatternReference.Service.(XMLNSC.PCDataField)portType = InputRoot.SOAP.Context.portType;
        SET PatternReference.Service.(XMLNSC.PCDataField)operation = InputRoot.SOAP.Context.operation;
        SET PatternReference.Service.(XMLNSC.PCDataField)SOAPVersion = InputRoot.SOAP.Context.SOAP_Version;
    END;
END MODULE;
