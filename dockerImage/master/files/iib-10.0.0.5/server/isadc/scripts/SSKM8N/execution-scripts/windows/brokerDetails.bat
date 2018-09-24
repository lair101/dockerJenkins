@echo off

call mqsilist -a -d 2 -r > mqsiRuntimes.txt
call mqsireportbroker @broker@ > mqsiReportBrokerOutput.txt
call mqsilist @broker@ -d2 > mqsiListBrokerOutput.txt

