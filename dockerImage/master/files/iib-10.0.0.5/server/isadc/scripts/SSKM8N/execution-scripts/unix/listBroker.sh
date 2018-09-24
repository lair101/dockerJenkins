#!/bin/sh

HOME_DIR=`pwd`

mqsiservice @broker@ > mqsiListBroker.txt

cd ${HOME_DIR}

