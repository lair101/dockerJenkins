#!/bin/sh

HOME_DIR=`pwd`

mqsireportflowmonitoring @broker@ -e @executiongroup@ -j >  mqsiFlowMonitoringDetails.txt

cd ${HOME_DIR}

