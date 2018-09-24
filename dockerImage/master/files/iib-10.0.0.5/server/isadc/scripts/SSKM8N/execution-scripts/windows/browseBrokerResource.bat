@echo off

call mqsibrowse @broker@ -t brokeraaeg > mqsiExecutionGroupsOutput.txt
call mqsibrowse @broker@ -t brokerresources > mqsiResourcesOutput.txt
call mqsibrowse @broker@ -t deployinfo > mqsiDeployInfoOutput.txt

