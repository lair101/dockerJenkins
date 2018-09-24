@echo off

call mqsireportproperties @broker@ -e @executiongroup@ -o ExecutionGroup -r > mqsiEGproperties.txt


