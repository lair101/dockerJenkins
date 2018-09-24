#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -e @executiongroup@ -o AllMessageFlows -r > mqsiAllMessageFlows.txt

cd ${HOME_DIR}

