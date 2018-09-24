@echo off

call mqsireportproperties @broker@ -e @executiongroup@ -o ComIbmJVMManager -a > mqsiDFEJVMSettings.txt

