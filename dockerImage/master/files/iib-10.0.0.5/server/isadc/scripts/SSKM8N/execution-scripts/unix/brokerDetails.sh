#!/bin/sh

HOME_DIR=`pwd`

mqsilist -a -d 2 -r > mqsiRuntimes.txt
mqsireportbroker @broker@ > mqsiReportBrokerOutput.txt
mqsilist @broker@ -d2 > mqsiListBrokerOutput.txt

cd ${HOME_DIR}

