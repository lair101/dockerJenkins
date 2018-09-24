@echo off

call mqsireportflowmonitoring @broker@ -e @executiongroup@ -j >  mqsiFlowMonitoringDetails.txt
