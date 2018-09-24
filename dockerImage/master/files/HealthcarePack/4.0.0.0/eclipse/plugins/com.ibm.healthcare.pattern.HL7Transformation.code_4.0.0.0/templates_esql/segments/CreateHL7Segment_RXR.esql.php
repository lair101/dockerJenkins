<?php
$assignValue=$_MB['PP']['ppAssignValue'];
echo 	"CREATE PROCEDURE CreateHL7Segment_RXR (IN ns NAMESPACE, IN OutRef REFERENCE)";
echo 	"\tBEGIN\n";
echo 	"\t\tDECLARE AssignValue CHARACTER '$assignValue';\n";
echo <<<ESQL
		CREATE LASTCHILD OF OutRef AS OutRef NAMESPACE ns NAME 'RXR';
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.1.Route".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.2.AdministrationSite".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.3.AdministrationDevice".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.4.AdministrationMethod".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.5.RoutingInstruction".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.1" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.2" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.3" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.4" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.5" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.6" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.7" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.8" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.9" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.10" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.11" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.12" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.13" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.14" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.15" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.16" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.17" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.18" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.19" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.20" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.21" = AssignValue;
		SET OutRef.ns:"RXR.6.AdministrationSiteModifier".ns:"CWE.22" = AssignValue;
		SET OutRef.ns:Remainder = AssignValue;
	END;
ESQL;
?>