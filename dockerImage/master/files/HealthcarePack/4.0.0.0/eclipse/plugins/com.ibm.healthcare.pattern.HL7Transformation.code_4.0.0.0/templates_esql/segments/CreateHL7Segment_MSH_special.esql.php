<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo <<<ESQL
	CREATE PROCEDURE CreateHL7Segment_MSH (IN ns NAMESPACE, IN OutRef REFERENCE)
		BEGIN
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'MSH';

		SET OutRef.ns:"MSH.1.FieldSeparator" = '{$_MB['PP']['ppMSH1']}';
		SET OutRef.ns:"MSH.2.ServiceString".ns:ComponentSeparator = '{$_MB['PP']['ppMSH2ComponentSep']}';
		SET OutRef.ns:"MSH.2.ServiceString".ns:RepeatSeparator = '{$_MB['PP']['ppMSH2RepeatSep']}';
		SET OutRef.ns:"MSH.2.ServiceString".ns:EscapeCharacter = '{$_MB['PP']['ppMSH2EscapeChar']}';
		SET OutRef.ns:"MSH.2.ServiceString".ns:SubComponentSeparator = '{$_MB['PP']['ppMSH2SubCompSep']}';
		SET OutRef.ns:"MSH.3.SendingApplication".ns:"HD.1" = '{$_MB['PP']['ppMSH3HD1']}';
		SET OutRef.ns:"MSH.3.SendingApplication".ns:"HD.2" = '{$_MB['PP']['ppMSH3HD2']}';
		SET OutRef.ns:"MSH.3.SendingApplication".ns:"HD.3" = '{$_MB['PP']['ppMSH3HD3']}';
		SET OutRef.ns:"MSH.4.SendingFacility".ns:"HD.1" = '{$_MB['PP']['ppMSH4HD1']}';
		SET OutRef.ns:"MSH.4.SendingFacility".ns:"HD.2" = '{$_MB['PP']['ppMSH4HD2']}';
		SET OutRef.ns:"MSH.4.SendingFacility".ns:"HD.3" = '{$_MB['PP']['ppMSH4HD3']}';
		SET OutRef.ns:"MSH.5.ReceivingApplication".ns:"HD.1" = '{$_MB['PP']['ppMSH5HD1']}';
		SET OutRef.ns:"MSH.5.ReceivingApplication".ns:"HD.2" = '{$_MB['PP']['ppMSH5HD2']}';
		SET OutRef.ns:"MSH.5.ReceivingApplication".ns:"HD.3" = '{$_MB['PP']['ppMSH5HD3']}';
		SET OutRef.ns:"MSH.6.ReceivingFacility".ns:"HD.1" = '{$_MB['PP']['ppMSH6HD1']}';
		SET OutRef.ns:"MSH.6.ReceivingFacility".ns:"HD.2" = '{$_MB['PP']['ppMSH6HD2']}';
		SET OutRef.ns:"MSH.6.ReceivingFacility".ns:"HD.3" = '{$_MB['PP']['ppMSH6HD3']}';
		SET OutRef.ns:"MSH.7.DateTimeOfMessage" = '{$_MB['PP']['ppMSH7']}';
		SET OutRef.ns:"MSH.8.Security" = '{$_MB['PP']['ppMSH8']}';
		SET OutRef.ns:"MSH.9.MessageType".ns:"MSG.1" = '{$_MB['PP']['ppMSH9MSG1']}';
		SET OutRef.ns:"MSH.9.MessageType".ns:"MSG.2" = '{$_MB['PP']['ppMSH9MSG2']}';
		SET OutRef.ns:"MSH.9.MessageType".ns:"MSG.3" = '{$_MB['PP']['ppMSH9MSG3']}';
		SET OutRef.ns:"MSH.10.MessageControlID" = '{$_MB['PP']['ppMSH10']}';
		SET OutRef.ns:"MSH.11.ProcessingID".ns:"PT.1" = '{$_MB['PP']['ppMSH11PT1']}';
		SET OutRef.ns:"MSH.11.ProcessingID".ns:"PT.2" = '{$_MB['PP']['ppMSH11PT2']}';
		SET OutRef.ns:"MSH.12.VersionID".ns:"VID.1" = '{$_MB['PP']['ppMSH12VID1']}';
		SET OutRef.ns:"MSH.13.SequenceNumber" = '{$_MB['PP']['ppMSH13']}';
		SET OutRef.ns:"MSH.14.ContinuationPointer" = '{$_MB['PP']['ppMSH14']}';
		SET OutRef.ns:"MSH.15.AcceptAcknowledgmentType" = '{$_MB['PP']['ppMSH15']}';
		SET OutRef.ns:"MSH.16.ApplicationAcknowledgmentType" = '{$_MB['PP']['ppMSH16']}';
		SET OutRef.ns:"MSH.17.CountryCode" = '{$_MB['PP']['ppMSH17']}';
		SET OutRef.ns:"MSH.18.CharacterSet" = '{$_MB['PP']['ppMSH18']}';
		SET OutRef.ns:"MSH.19.PrincipalLanguageOfMessage".ns:"CWE.1" = '{$_MB['PP']['ppMSH19CWE1']}';
		SET OutRef.ns:"MSH.20.AlternateCharacterSetHandlingScheme" = '{$_MB['PP']['ppMSH20']}';
		SET OutRef.ns:"MSH.21.MessageProfileIdentifier".ns:"EI.1" = '{$_MB['PP']['ppMSH21EI1']}';
		SET OutRef.ns:"MSH.21.MessageProfileIdentifier".ns:"EI.2" = '{$_MB['PP']['ppMSH21EI2']}';
		SET OutRef.ns:"MSH.21.MessageProfileIdentifier".ns:"EI.3" = '{$_MB['PP']['ppMSH21EI3']}';
		SET OutRef.ns:"MSH.21.MessageProfileIdentifier".ns:"EI.4" = '{$_MB['PP']['ppMSH21EI4']}';
		SET OutRef.ns:"MSH.22.SendingResponsibleOrganization".ns:"XON.1" = '{$_MB['PP']['ppMSH22XON1']}';
		SET OutRef.ns:"MSH.23.ReceivingResponsibleOrganization".ns:"XON.1" = '{$_MB['PP']['ppMSH23XON1']}';
		SET OutRef.ns:"MSH.24.SendingNetworkAddress".ns:"HD.1" = '{$_MB['PP']['ppMSH24HD1']}';
		SET OutRef.ns:"MSH.24.SendingNetworkAddress".ns:"HD.2" = '{$_MB['PP']['ppMSH24HD2']}';
		SET OutRef.ns:"MSH.24.SendingNetworkAddress".ns:"HD.3" = '{$_MB['PP']['ppMSH24HD3']}';
		SET OutRef.ns:"MSH.25.ReceivingNetworkAddress".ns:"HD.1" = '{$_MB['PP']['ppMSH25HD1']}';
		SET OutRef.ns:"MSH.25.ReceivingNetworkAddress".ns:"HD.2" = '{$_MB['PP']['ppMSH25HD2']}';
		SET OutRef.ns:"MSH.25.ReceivingNetworkAddress".ns:"HD.3" = '{$_MB['PP']['ppMSH25HD3']}';
		SET OutRef.ns:Remainder = '{$assignValue}';
	END;
ESQL;
?>

