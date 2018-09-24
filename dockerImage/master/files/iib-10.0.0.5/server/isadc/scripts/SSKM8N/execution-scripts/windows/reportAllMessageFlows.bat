@echo off

call mqsireportproperties @broker@ -e @executiongroup@ -o AllMessageFlows -r > mqsiAllMessageFlows.txt

