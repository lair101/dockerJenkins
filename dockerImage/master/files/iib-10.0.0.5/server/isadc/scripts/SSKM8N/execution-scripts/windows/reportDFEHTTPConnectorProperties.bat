@echo off

call mqsireportproperties @broker@ -e @executiongroup@ -o HTTPSConnector -r > mqsiDFEHTTPSConnectorProperties.txt
call mqsireportproperties @broker@ -e @executiongroup@ -o HTTPConnector -r > mqsiDFEHTTPConnectorProperties.txt