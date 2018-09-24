@echo off

call mqsireportproperties @broker@ -o BrokerRegistry -r > mqsiBrokerRegistry.txt
