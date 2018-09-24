#!/bin/sh

HOME_DIR=`pwd`

mqsibackupbroker @broker@ -d . -f -v mqsibackuptrace.txt

cd ${HOME_DIR}

