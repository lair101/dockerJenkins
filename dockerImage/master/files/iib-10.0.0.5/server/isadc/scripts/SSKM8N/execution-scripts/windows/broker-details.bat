@echo off


call mqsireportbroker @broker@ > mqsiReportBrokerOutput.txt
call mqsilist @broker@ -d0 > mqsiListBrokerOutput.txt
call mqsilist @broker@ > mqsiListBroker.txt
call mqsibrowse @broker@ -t brokeraaeg > mqsiBrowseOutput.txt
call mqsiservice @broker@ > mqsiServiceOutput.txt
call mqsicvp @broker@ > mqsicvpOutput.txt
