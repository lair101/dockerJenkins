#!/bin/sh

HOME_DIR=`pwd`

mqsiservice @broker@ >> mqsiServiceOutput.txt

cd ${HOME_DIR}

