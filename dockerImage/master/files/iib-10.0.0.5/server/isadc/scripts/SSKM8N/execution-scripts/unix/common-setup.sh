#!/bin/sh

HOME_DIR=`pwd`

#try to call profile.cmd
#if [ -r "@wmb.root@/bin/mqsiprofile" ]; then
#cd @wmb.root@/bin
#. @wmb.root@/bin/mqsiprofile
#fi

mqsiservice -v > mqsiServiceOutput.txt

mqsilist -d0 > mqsiListOutput.txt

java -fullversion > java_version.txt 2>&1

env > env.txt 

dspmqver > dspmqver.txt

@execution.name@ > operatingSystemDetails.txt

@javacore.name.unix@ > common_error_directory_listing.txt


cd ${HOME_DIR}
