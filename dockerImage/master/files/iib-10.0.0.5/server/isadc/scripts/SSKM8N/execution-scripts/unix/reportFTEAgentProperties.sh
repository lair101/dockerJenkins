#!/bin/sh

HOME_DIR=`pwd`

mqsireportproperties @broker@ -e @executiongroup@ -o FTEAgent -r > mqsiFTEAgentProperties.txt

cd ${HOME_DIR}

