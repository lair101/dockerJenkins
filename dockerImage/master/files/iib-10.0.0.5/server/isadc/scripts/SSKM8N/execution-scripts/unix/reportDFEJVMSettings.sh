#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -e @executiongroup@ -o ComIbmJVMManager -a > mqsiDFEJVMSettings.txt

cd ${HOME_DIR}
