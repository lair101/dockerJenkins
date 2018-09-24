#!/bin/sh
# Added by Healthcare Pack installer, do not modify
# This script extends mqsiprofile for the Healthcare Pack's Web-based Monitoring feature
echo mqsiprofile extended for Healthcare Pack Web-based Monitoring

# Set default value of minimum fixpack level to 0
MINIMUM_V900_FIXPACK=0

# If version 9.0.0.x then set minimum fixpack level to 1
if [ $MQSI_VERSION_V = 9 ] ; then
   if [ $MQSI_VERSION_R = 0 ] ; then
      if [ $MQSI_VERSION_M = 0 ] ; then
         MINIMUM_V900_FIXPACK=1
      fi
   fi
fi

# Only extend broker for Healthcare if broker is version 9.0.0.1 or above
if [ $MQSI_VERSION_V -ge 9 ] ; then
   if [ $MQSI_VERSION_F -ge $MINIMUM_V900_FIXPACK ] ; then
      export MQSI_HEALTHCARE_FILEPATH=HCP_INSTALL_DIR

      if [ -z $MQSI_ADDITIONAL_CONTEXT_ROOTS ] ; then
         export MQSI_ADDITIONAL_CONTEXT_ROOTS=$MQSI_HEALTHCARE_FILEPATH/webui/healthcare
      else
         export MQSI_ADDITIONAL_CONTEXT_ROOTS=${MQSI_ADDITIONAL_CONTEXT_ROOTS}:$MQSI_HEALTHCARE_FILEPATH/webui/healthcare
      fi
   fi
fi
