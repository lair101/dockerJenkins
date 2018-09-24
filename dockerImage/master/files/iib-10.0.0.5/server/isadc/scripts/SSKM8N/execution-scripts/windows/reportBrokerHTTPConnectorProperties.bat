@echo off

call mqsireportproperties @broker@ -b httplistener -o HTTPSConnector -r > mqsiHTTPSConnectorProperties.txt
call mqsireportproperties @broker@ -b httplistener -o HTTPConnector -r > mqsiHTTPConnectorProperties.txt