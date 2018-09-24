#!/bin/bash
# Licensed Materials - Property of IBM
# 5725-C18 
# (c) Copyright IBM Corp. 2015.
# All Rights Reserved
##############################################################################
# Set Healthcare Pack version
HEALTHCARE_VERSION="4.0.0.0"

##############################################################################
# Detect OS and architecture
PLATFORM=`uname`
ARCH=`uname -m`

##############################################################################
# Extend server and toolkit with Healthcare components
removeHealthcare() { 
  # Remove Integration Toolkit link
  if [[ -e $IIB_HOME/tools/links/com.ibm.broker.healthcare.link ]]
  then
    rm $IIB_HOME/tools/links/com.ibm.broker.healthcare.link
    if [[ $? -ne 0 ]]
    then
      UNINSTALL_FAILED=1
    fi
  fi
  
  # Remove profile scripts
  if [[ -e $REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh ]]
  then
    rm $REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh
    if [[ $? -ne 0 ]]
    then
      UNINSTALL_FAILED=1
    fi
  fi
    
  if [[ -e $REG_HOME/common/profiles/MedicalDeviceInputNode_$HEALTHCARE_VERSION.sh ]]
  then
    rm $REG_HOME/common/profiles/MedicalDeviceInputNode_$HEALTHCARE_VERSION.sh
    if [[ $? -ne 0 ]]
    then
      UNINSTALL_FAILED=1
    fi
  fi
  
  # Remove generated license files
  if [[ -e $HEALTHCARE_HOME/license/license ]]
  then
    rm -rf $HEALTHCARE_HOME/license/license
    if [[ $? -ne 0 ]]
    then
      UNINSTALL_FAILED=1
    fi
  fi
  
  if [[ -e $HEALTHCARE_HOME/license/restrictions ]]
  then
    rm -rf $HEALTHCARE_HOME/license/restrictions
    if [[ $? -ne 0 ]]
    then
      UNINSTALL_FAILED=1
    fi
  fi
  
  # Display warning if above operations failed
  if [[ "$1" != "silently" ]]
  then
    if [[ $UNINSTALL_FAILED -eq 1 ]]
    then
      $MSGCMD "It was not possible to remove one or more files. Remove the files listed in the error(s) above to complete uninstallation of IBM Integration Bus Healthcare Pack."
    else
      $MSGCMD "Uninstallation successful."
    fi
  fi
}
  
##############################################################################
# Process command
HEALTHCARE_HOME=$(cd $(dirname "$0") && pwd -P)

# Check for gettext
if ! command -v gettext > /dev/null
then
  echo "The gettext program must be installed on this system to use the IBM Integration Bus Healthcare Pack uninstaller in a language other than English. The uninstaller will now continue in English."
  MSGCMD='echo'
else
  MSGCMD='gettext -s'
  # Set up locale files for messages
  export TEXTDOMAINDIR="$HEALTHCARE_HOME/locales/"
  export TEXTDOMAIN=messages
fi

if [[ "$2" != "silently" ]]
then
  $MSGCMD "IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Uninstallation" | sed -e "s/%HEALTHCARE_VERSION%/$HEALTHCARE_VERSION/"
  echo ""
fi

if [[ -e "$1/iib" ]] && [[ $# -ne 0 ]]
then
  IIB_HOME=$1
  if [[ -e "$IIB_HOME/common/GLOBAL_REG" ]]
  then
    read REGVAL < "$IIB_HOME/common/GLOBAL_REG"
    GLOBAL=true
    REG_HOME="$REGVAL"
  else
    GLOBAL=false
    if [[ ! -n "$REG_HOME" ]]
    then
      REG_HOME="$HOME/iibconfig"
    fi
  fi
  removeHealthcare "$2"
else
  $MSGCMD "Unable to uninstall IBM Integration Bus Healthcare Pack.
You must specify an IBM Integration Bus V10 installation directory as the first parameter to this uninstaller."
  exit 1
fi

