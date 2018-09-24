@echo off

call mqsireportproperties @broker@ -b agent -o ComIbmJVMManager -r > mqsiAgentJVMSettings.txt

