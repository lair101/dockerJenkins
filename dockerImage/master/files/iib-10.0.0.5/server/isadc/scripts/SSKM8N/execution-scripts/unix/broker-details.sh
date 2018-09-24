#!/bin/sh

HOME_DIR=`pwd`

mqsireportbroker @broker@ > mqsiReportBrokerOutput.txt
mqsilist @broker@ -d0 > mqsiListBrokerOutput.txt
mqsilist @broker@ > mqsiListBroker.txt
mqsibrowse @broker@ -t brokeraaeg > mqsiBrowseOutput.txt
mqsiservice @broker@ > mqsiServiceOutput.txt
mqsicvp @broker@ > mqsicvpOutput.txt

cd ${HOME_DIR}
