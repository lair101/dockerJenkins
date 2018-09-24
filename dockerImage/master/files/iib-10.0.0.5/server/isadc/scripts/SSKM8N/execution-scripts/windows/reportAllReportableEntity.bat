@echo off

call mqsireportproperties @broker@ -c AllTypes -o AllReportableEntityNames -r > mqsiAllReportableEntity.txt
