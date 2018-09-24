#!/bin/bash
IE02_PATH=$1
if [ -z ${IE02_PATH} ]
then
  echo USAGE: IE02_PATH must be specified as first parameter
else
  LD_LIBRARY_PATH=${IE02_PATH}/lib:${LD_LIBRARY_PATH}
  ODBCSYSINI=${IE02_PATH}/etc
  export IE02_PATH LD_LIBRARY_PATH ODBCSYSINI
fi
