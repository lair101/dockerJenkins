#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -b httplistener -o HTTPSConnector -r > mqsiHTTPSConnectorProperties.txt
mqsireportproperties @broker@ -b httplistener -o HTTPConnector -r > mqsiHTTPConnectorProperties.txt

cd ${HOME_DIR}

