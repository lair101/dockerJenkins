#!/bin/sh

HOME_DIR=`pwd`

mqsibrowse @broker@ -t brokeraaeg > mqsiExecutionGroupsOutput.txt
mqsibrowse @broker@ -t brokerresources > mqsiResourcesOutput.txt
mqsibrowse @broker@ -t deployinfo > mqsiDeployInfoOutput.txt

cd ${HOME_DIR}

