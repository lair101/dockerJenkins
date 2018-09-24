#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -e @executiongroup@ -o HTTPSConnector -r > mqsiDFEHTTPSConnectorProperties.txt
mqsireportproperties @broker@ -e @executiongroup@ -o HTTPConnector -r > mqsiDFEHTTPConnectorProperties.txt

cd ${HOME_DIR}

