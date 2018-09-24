#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -c AllTypes -o AllReportableEntityNames -r > mqsiAllReportableEntity.txt

cd ${HOME_DIR}

