@echo off

call mqsireportproperties @broker@ -e @executiongroup@ -o FTEAgent -r > mqsiFTEAgentProperties.txt
