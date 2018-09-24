#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -b agent -o ComIbmJVMManager -r > mqsiAgentJVMSettings.txt

cd ${HOME_DIR}

