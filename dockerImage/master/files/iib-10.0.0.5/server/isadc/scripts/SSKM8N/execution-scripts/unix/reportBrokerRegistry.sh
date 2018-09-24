#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -o BrokerRegistry -r > mqsiBrokerRegistry.txt

cd ${HOME_DIR}
