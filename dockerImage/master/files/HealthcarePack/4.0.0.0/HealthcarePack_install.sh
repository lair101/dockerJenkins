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
# Accept license function
acceptLicense() {
  MODE=$1
  # Invoke the LAP tool

  # Check permissions
  if [ ! -w "$HEALTHCARE_HOME/license/" ]
  then
    $MSGCMD "You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory."
    exit 1
  fi

  # Are we using a JDK or a JRE?
  MQSI_JAVA=${IIB_HOME}/common/jdk/jre/bin/java
  if [ ! -e "${MQSI_JAVA}" ]
  then
    MQSI_JAVA=${IIB_HOME}/common/jre/bin/java
  fi

  # Usage Restrictions
  # check for silent acceptance
  if [[ "$MODE" = "silently" ]]
  then
    "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement/restrictions" -s "$HEALTHCARE_HOME/license/restrictions" -t 5
  else
    # Check for graphic or text mode
    if [[ ! -n $DISPLAY ]]
    then
      "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement/restrictions" -s "$HEALTHCARE_HOME/license/restrictions" -text_only
    else
      "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement/restrictions" -s "$HEALTHCARE_HOME/license/restrictions"
    fi
  fi

  # Check if usage restrictions was accepted
  if [ $? -eq 3 ]
  then
    $MSGCMD "The IBM Integration Bus Healthcare Pack use restriction was not accepted.
Before using IBM Integration Bus Healthcare Pack you must first accept the use restriction.
To view and accept the use restriction, run 'HealthcarePack_install.sh' again."
    exit 1
  fi

  # Adjust permissions of usage restrictions
  chmod -R go-w $HEALTHCARE_HOME/license/restrictions/license/* > /dev/null 2>&1
  chmod -R a+rx $HEALTHCARE_HOME/license/restrictions/license/* > /dev/null 2>&1

  # Main License
  # check for silent acceptance
  if [[ "$MODE" = "silently" ]]
  then
    "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement" -s "$HEALTHCARE_HOME/license/" -t 5
  else
    # Check for graphic or text mode
    if [[ ! -n $DISPLAY ]]
    then
      "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement" -s "$HEALTHCARE_HOME/license/" -text_only
    else
      "${MQSI_JAVA}" -jar "$HEALTHCARE_HOME/license/agreement/LAPApp.jar" -l "$HEALTHCARE_HOME/license/agreement" -s "$HEALTHCARE_HOME/license/"
    fi
  fi
  chmod -R go-w $HEALTHCARE_HOME/license/license/* > /dev/null 2>&1
  chmod -R a+rx $HEALTHCARE_HOME/license/license/* > /dev/null 2>&1
}

##############################################################################
# Create medical device driver symlinks for RHEL
createRHELsymlinks() {
  # Loop through RHEL drivers and create symlinks to them in the lib directory
  LIBDIR="$HEALTHCARE_HOME/runtime/amd64_linux_2/lib"
  DRIVERDIR="$LIBDIR/RHEL"

  FILELIST=`ls $DRIVERDIR | sort`
  for FILENAME in $FILELIST
  do
    LINKNAME=`echo $FILENAME | cut -d . -f 1`
    LINKNAME=$LINKNAME.so
    ln -fs RHEL/$FILENAME $LIBDIR/$LINKNAME
  done
}

##############################################################################
# Create medical device driver symlinks for SLES and other Linux distributions
createSLESsymlinks() {
  # Loop through SLES drivers and create symlinks to them in the lib directory
  LIBDIR="$HEALTHCARE_HOME/runtime/amd64_linux_2/lib"
  DRIVERDIR="$LIBDIR/SLES"

  FILELIST=`ls $DRIVERDIR | sort`
  for FILENAME in $FILELIST
  do
    LINKNAME=`echo $FILENAME | cut -d . -f 1`
    LINKNAME=$LINKNAME.so
    ln -fs SLES/$FILENAME $LIBDIR/$LINKNAME
  done
}

##############################################################################
# Extend server and toolkit with Healthcare components
setupHealthcare() {
  # Has the license been accepted?
  if [[ -e "$HEALTHCARE_HOME/license/license/status.dat" ]]
  then
    if [[ "$1" != "silently" ]]
    then
      $MSGCMD "License accepted.
Setting up IBM Integration Bus Healthcare Pack."
      echo ""
    fi
    
    monitoring_files=($REG_HOME/common/profiles/HealthcareWebMonitoring_*.sh)
    medicaldevice_files=($REG_HOME/common/profiles/MedicalDeviceInputNode_*.sh)
    
    # Exit install script if files exist from previous installation
    if [[ -e ${monitoring_files[0]} ]] || [[ -e ${medicaldevice_files[0]} ]] || [[ -e $IIB_HOME/tools/links/com.ibm.broker.healthcare.link ]]
    then
      $MSGCMD "IBM Integration Bus Healthcare Pack is already installed.
Uninstall any previous installations of IBM Integration Bus Healthcare Pack and run this installer again."
      exit 1
    else
      # Copy monitoring profile script to correct directory, and alter path
      HEALTHCARE_HOME_ESC=$(sed 's/[[\.*^$/]/\\&/g' <<< "$HEALTHCARE_HOME")
      sed "s/HCP_INSTALL_DIR/$HEALTHCARE_HOME_ESC/g" "$HEALTHCARE_HOME/runtime/HealthcareWebMonitoring.sh" > "$REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh"
      
      # Stop if new file creation fails
      if [ $? -ne 0 ]
      then
        $MSGCMD "Unable to install IBM Integration Bus Healthcare Pack because files could not be created in the IBM Integration Bus registry directory.
Check you have the right permissions to write to this directory before running the installer again."
        exit 1
      fi
      
      # Set permissions on new script file
      chmod a+rx "$REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh"
      
      # Only Linux x86 supports medical devices and Toolkit
      if [[ "$PLATFORM" == "Linux" ]] && [[ "$ARCH" =~ .*x86.* ]]
      then
        sed "s/HCP_INSTALL_DIR/$HEALTHCARE_HOME_ESC/g" "$HEALTHCARE_HOME/runtime/MedicalDeviceInputNode.sh" > "$REG_HOME/common/profiles/MedicalDeviceInputNode_$HEALTHCARE_VERSION.sh"
        # Stop if new file creation fails, and roll back web monitoring profile
        if [ $? -ne 0 ]
        then
          $MSGCMD "Unable to install IBM Integration Bus Healthcare Pack because files could not be created in the IBM Integration Bus registry directory.
Check you have the right permissions to write to this directory before running the installer again."
          rm $REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh
          exit 1
        fi
        
        # Set permissions on new script file
        chmod a+rx "$REG_HOME/common/profiles/MedicalDeviceInputNode_$HEALTHCARE_VERSION.sh"
      
        # Create links directory for Toolkit if it doesn't exist
        if [[ ! -e $IIB_HOME/tools/links ]]
        then
          mkdir $IIB_HOME/tools/links
        fi
      
        # Create link file for Toolkit
        echo "path=$HEALTHCARE_HOME" > $IIB_HOME/tools/links/com.ibm.broker.healthcare.link
        # Stop if link file creation fails, and roll back profiles
        if [ $? -ne 0 ]
        then
          $MSGCMD "Unable to install IBM Integration Bus Healthcare Pack because files could not be created in the IBM Integration Bus installation directory.
Check you have the right permissions to write to this directory before running the installer again."
          rm $REG_HOME/common/profiles/HealthcareWebMonitoring_$HEALTHCARE_VERSION.sh
          rm $REG_HOME/common/profiles/MedicalDeviceInputNode_$HEALTHCARE_VERSION.sh
          exit 1
        fi
        
        # If OS is RHEL, create symlinks to RHEL medical device drivers
        # Otherwise create symlinks to SLES medical device drivers
        if [ -e /etc/redhat-release ]
        then
          createRHELsymlinks
        else
          createSLESsymlinks
        fi
      fi
    fi
 
    if [[ "$1" != "silently" ]]
    then
      # Post-installation steps
			$MSGCMD "IBM Integration Bus Healthcare Pack is installed.
For each integration node to which you want to deploy Healthcare nodes or patterns, complete the following steps:
1. Start the integration node.
2. Complete one of the following steps:
	- If your license entitles you to use all the functionality except the MedicalDeviceInput node, run the following command
		mqsimode <NODENAME> -x healthcare
	- If your license entitles you to use only the MedicalDeviceInput node, run the following command:
		mqsimode <NODENAME> -x medicalDevices
	- If your license entitles you to use all the functionality including the MedicalDeviceInput node, run the following command:
		mqsimode <NODENAME> -x \"healthcare,medicalDevices\""
    fi
  else
    $MSGCMD "The IBM Integration Bus Healthcare Pack license was not accepted.
Before using IBM Integration Bus Healthcare Pack you must first accept the license agreement.
To view and accept the license agreement, stop and run this installer again."
  fi
}
  
##############################################################################
# Process command
HEALTHCARE_HOME=$(cd $(dirname "$0") && pwd -P)

# Check for gettext
if ! command -v gettext > /dev/null
then
  echo "The gettext program must be installed on this system to use the IBM Integration Bus Healthcare Pack installer in a language other than English. The installer will now continue in English."
  MSGCMD='echo'
else
  MSGCMD='gettext -s'
  # Set up locale files for messages
  export TEXTDOMAINDIR="$HEALTHCARE_HOME/locales/"
  export TEXTDOMAIN=messages
fi

if [[ "$4" != "silently" ]]
then
  $MSGCMD "Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION%" | sed -e "s/%HEALTHCARE_VERSION%/$HEALTHCARE_VERSION/"
  echo ""
  if [[ "$PLATFORM" == "Linux" ]] && [[ "$ARCH" =~ .*x86.* ]]
  then
    $MSGCMD "Close the IBM Integration Toolkit and stop any integration nodes that are running before you continue."
    echo ""
  else
    $MSGCMD "Stop any integration nodes that are running before you continue."
    echo ""
  fi
fi

if [[ -e "$1/iib" ]] && [[ $# -ne 0 ]]
then
  if [[ ! -z "$2" ]]
  then
    if [[ "$2" != "accept" ]] || [[ "$3" != "license" ]] || [[ "$4" != "silently" ]]
    then
      $MSGCMD "Unsupported parameters provided.
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer."
      exit 1
    fi
  fi

  IIB_HOME=$1
  # Check user has write permissions for IIB
  if [[ "$PLATFORM" == "Linux" ]] && [[ "$ARCH" =~ .*x86.* ]] && [[ ! -w "$IIB_HOME/tools" ]]
  then
    $MSGCMD "Before installing IBM Integration Bus Healthcare Pack, make sure you have permission to write to your IBM Integration Bus installation directory."
    exit 1
  fi
  
  # Check IIB license has been accepted
  if [[ ! -e "$IIB_HOME/license/status.dat" ]]
  then
    $MSGCMD "You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack."
    exit 1
  fi

  # Set registry directory
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
  
  # Handle license
  acceptLicense "$4"

  # Set up the Healthcare Pack
  setupHealthcare "$4"
else
  $MSGCMD "Unable to install IBM Integration Bus Healthcare Pack.
You must specify an IBM Integration Bus V10 installation directory as the first parameter to this installer."
  exit 1
fi
