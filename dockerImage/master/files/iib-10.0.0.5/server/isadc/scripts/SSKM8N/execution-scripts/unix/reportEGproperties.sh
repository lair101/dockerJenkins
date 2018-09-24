#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -e @executiongroup@ -o ExecutionGroup -r > mqsiEGproperties.txt

cd ${HOME_DIR}

