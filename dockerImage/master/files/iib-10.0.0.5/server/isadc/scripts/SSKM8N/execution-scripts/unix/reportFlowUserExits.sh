#!/bin/sh

HOME_DIR=`pwd`

mqsireportflowuserexits @broker@ -e @executiongroup@ > mqsiFlowUserExits.txt

cd ${HOME_DIR}

