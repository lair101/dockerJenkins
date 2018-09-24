#!/bin/bash

# First check the workspace dir which must be supplied as 1st param to this script.
workspacedir=$1
if [ -z "${workspacedir?}" ]
then
  echo "Error: no workspace dir supplied to list-db2-instances.sh"
  exit 1
fi

# We can use the db2ilist and db2usrinf from any DB2 v8 installation
#   to get info about all V8 instances.
ilist=`( ls /opt/ibm/db2/V9*/bin/db2ilist || ls /opt/IBM/db2/V8*/bin/db2ilist ) | tail -n 1 2>/dev/null`
if [ -z "${ilist?}" ]
then
  echo "no DB2 V8 or V9 installed"
  exit 1 
fi

usrinf=`dirname $ilist`/db2usrinf

# fiddle with db2set to enable the db2ilist command to work
db2dir=`dirname $ilist`
cp `dirname $db2dir`/adm/db2set $workspacedir
chmod 750 $workspacedir/db2set
PATH=$PATH:$workspacedir

# now get the home directory for each instance
$ilist | xargs $usrinf -d
