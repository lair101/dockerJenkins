#!/bin/sh
# Added by Healthcare Pack installer, do not modify
# This script extends mqsiprofile for the Healthcare Pack's MedicalDeviceInput node
echo mqsiprofile extended for Healthcare Pack MedicalDeviceInput node

# Set default value of minimum fixpack level to 0
MINIMUM_V800_FIXPACK=0

# If version 8.0.0.x then set minimum fixpack level to 2
if [ $MQSI_VERSION_V = 8 ] ; then
   if [ $MQSI_VERSION_R = 0 ] ; then
      if [ $MQSI_VERSION_M = 0 ] ; then
         MINIMUM_V800_FIXPACK=2
      fi
   fi
fi

# Detect if runtime is 32-bit or 64-bit. This determines which plug-ins are used
if [ $MQSI_PROCESSOR_ARCHITECTURE = 32 ] ; then
   PLUGINS_VERSION=x86_linux_2
else
   PLUGINS_VERSION=amd64_linux_2
fi

# Only extend broker for Healthcare if broker is version 8.0.0.2 or above
if [ $MQSI_VERSION_V -ge 8 ] ; then
   if [ $MQSI_VERSION_F -ge $MINIMUM_V800_FIXPACK ] ; then
      export MQSI_HEALTHCARE_FILEPATH=HCP_INSTALL_DIR

      if [ -z $MQSI_LILPATH ] ; then
         export MQSI_LILPATH=$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/lib
      else
         export MQSI_LILPATH=${MQSI_LILPATH}:$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/lib
      fi

      if [ -z $LD_LIBRARY_PATH ] ; then
         export LD_LIBRARY_PATH=$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/lib:
      else
         export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/lib
      fi

      if [ -z $NLSPATH ] ; then
         export NLSPATH=$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/messages/En_US/
      else
         export NLSPATH=${NLSPATH}:$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/messages/En_US/
      fi

      if [ -z $MQSI_CONSOLE_NLSPATH ] ; then
         export MQSI_CONSOLE_NLSPATH=$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/messages/En_US/
      else
         export MQSI_CONSOLE_NLSPATH=${NLSPATH}:$MQSI_HEALTHCARE_FILEPATH/runtime/$PLUGINS_VERSION/messages/En_US/
      fi
   fi
fi
