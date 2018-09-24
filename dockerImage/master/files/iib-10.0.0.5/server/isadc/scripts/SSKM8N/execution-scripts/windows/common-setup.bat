@echo off

rem if exist "@wmb.root@/bin/mqsiprofile.cmd" call "@wmb.root@/bin/mqsiprofile.cmd"

call mqsiservice -v > mqsiServiceOutput.txt
call mqsilist -d0 > mqsiListOutput.txt
call java -fullversion > java_version.txt 2>&1
call SET > env.txt
call dspmqver > dspmqver.txt
call ver > operatingSystemDetails.txt
call dir "@javacore.name.win@" > common_error_directory_listing.txt
