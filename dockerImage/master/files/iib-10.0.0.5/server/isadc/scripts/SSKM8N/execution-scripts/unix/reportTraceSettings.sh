#!/bin/sh

HOME_DIR=`pwd`

mqsireporttrace @broker@ > mqsiTraceSettings.txt

cd ${HOME_DIR}

