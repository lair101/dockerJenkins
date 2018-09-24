#!/bin/bash
#
# /* IBM Confidential
#  *
#  * OCO Source Materials
#  *
#  * 5724-E11
#  * 5724-E26
#  * (C) Copyright IBM Corp. 2004, 2008
#  *
#  * The source code for this program is not published or otherwise
#  * divested of its trade secrets, irrespective of what has been deposited
#  * with the U.S. Copyright office
#  */
#
#  $1 - The DB2 instance profile script
#  $2 - The path to this shell script
#  $3 - The mqsiprofile script
#  $4 - The Command number to perform (see EouTaskNumbers.java)
#  $5+ - Command args
#

# Always make sure the bash environment is set up properly - DB2 will depend on this
if [ -f ~/.bashrc ]; then
  . ~/.bashrc > /dev/null 2>&1
fi
if [ -f ~/.bash_profile ]; then
  . ~/.bash_profile > /dev/null 2>&1
fi

MQSI_PROFILE_SCRIPT=`echo $3 | sed -e 's/\"//g'`
if [ -f $MQSI_PROFILE_SCRIPT ]; then
  . $MQSI_PROFILE_SCRIPT > /dev/null 2>&1
fi

# DB2_PROFILE_SCRIPT=$1
# if [ -f $DB2_PROFILE_SCRIPT ]; then
#  . $DB2_PROFILE_SCRIPT > /dev/null 2>&1
# fi

case "$4" in 

"-22" ) # drop a DB2 database and delete it's ODBC connection - TASK_DROP_DB2_DB #
      # $5 - DB Name

  if [ -n "$DB2DIR" ]; then
  	$INSTHOME/sqllib/adm/db2start
    $DB2DIR/bin/db2 terminate
    $DB2DIR/bin/db2 drop database $5
    $DB2DIR/bin/db2 terminate
    
    # Merant stuff
    # Scan odbc.ini file and remove any lines from "[$4]" to first line starting "Database*".

    # Check the ODBC.ini file exists, but check $ODBC is defined first
    if [ -z "$ODBCINI" ]; then
      echo "MQSI_WIZ_DROP_DB_SUCCESS"
      exit;
    fi
    if [ ! -e "$ODBCINI" ]; then
      # No ODBC file to remove definition from.
      echo "MQSI_WIZ_DROP_DB_SUCCESS"
      exit;
    fi
  
    rm -f $ODBCINI.tmpForDCW

    # For each line in the file - preserve spaces as "++SPACE-" and empty lines as "\n"
    outputODBCLine="1"
    for line in $(cat $ODBCINI | sed -e 's/$/\\n/g; s/\ /\+\+SPACE-/g'); do
      # Put the line of text back to normal
      entry=$(echo "$line" | sed -e 's/\\n//g; s/\+\+\SPACE-/\ /g') 
    
      if [ "$outputODBCLine" == "1" ]; then
        # If we're outputting, check for the sample's DB definition
        if [[ "$entry" == "[$5]" ]]; then
          # Ignore this DB definitions
          outputODBCLine="0"
        else
          if [[ "$entry" == "$5"* ]]; then
            # Ignore header definition for the DB
            :
          else
            # Output the line
            echo $entry >> $ODBCINI.tmpForDCW
          fi
        fi
      else
        # Then ignore all text until we find a line starting with "Database".  Continue outputting after that line.
        if [[ $entry == Database* ]]; then
          outputODBCLine="1"
        fi
      fi
    done
  
    mv -f $ODBCINI.tmpForDCW $ODBCINI
    
  fi

  echo "MQSI_WIZ_DROP_DB_SUCCESS"
  ;;

"-24" ) # A Generic command, expected to be an mqsi... command - TASK_RUN_WMQI_COMMAND #
# TODO Noel Remove  $INSTHOME/sqllib/adm/db2start
#  export MQSI_UTILITY_OUTPUT_CP=1208
  $5
  ;;

"-29" ) # Delete an MQ queue - TASK_DELETE_MQ_QUEUE #
  echo "DELETE $5($6) PURGE" | runmqsc $7
  ;;

"-30" ) # Delete an MQ model queue - TASK_DELETE_MQ_MODEL_QUEUE #
  echo "DELETE $5($6)" | runmqsc $7
  ;;

"-32" ) # Delete an MQ channel - TASK_DELETE_MQ_CHNL #
  echo "DELETE CHANNEL($5)" | runmqsc $6
  ;;

"-34" ) # stop a queue manager - TASK_STOP_QM
	endmqm -w $5
    dspmq -m $5  
	reason=$?
	if [ $reason -eq 0 ]; then
		echo "WMQI_WIZ_COMMAND_SUCCESS"
	fi
  ;;

"-35" ) # delete a queue manager - TASK_DEL_QM
	dltmqm $5
    dspmq -m $5  
  ;;

"-44" ) # drop a DB2 database and delete its ODBC connection - TASK_DROP_GENERIC_DB_AND_JDBCPROVIDER #
      # $5 - DB Name

  if [ -n "$DB2DIR" ]; then
  	$INSTHOME/sqllib/adm/db2start
    $DB2DIR/bin/db2 terminate
    $DB2DIR/bin/db2 drop database $5
    $DB2DIR/bin/db2 terminate
    
    # Merant stuff
    # Scan odbc.ini file and remove any lines from "[$5]" to first line starting "Database*".

    # Check the ODBC.ini file exists, but check $ODBC is defined first
    if [ -z "$ODBCINI" ]; then
      echo "MQSI_WIZ_DROP_DB_SUCCESS"
      exit;
    fi
    if [ ! -e $ODBCINI ]; then
      # No ODBC file to remove definition from.
      echo "MQSI_WIZ_DROP_DB_SUCCESS"
      exit;
    fi
  
    rm -f $ODBCINI.tmpForSamples

    # For each line in the file - preserve spaces as "++SPACE-" and empty lines as "\n"
    outputODBCLine="1"
    for line in $(cat $ODBCINI | sed -e 's/$/\\n/g; s/\ /\+\+SPACE-/g'); do
      # Put the line of text back to normal
      entry=$(echo "$line" | sed -e 's/\\n//g; s/\+\+\SPACE-/\ /g') 
    
      if [ "$outputODBCLine" == "1" ]; then
        # If we're outputting, check for the sample's DB definition
        if [ "$entry" == "[$5]" ]; then
          # Ignore this DB definitions
          outputODBCLine="0"
        else
          if [[ "$entry" == "$5"* ]]; then
            # Ignore header definition for the DB
            :
          else
            # Output the line
            echo $entry >> $ODBCINI.tmpForSamples
          fi
        fi
      else
        # Then ignore all text until we find a line starting with "Database".  Continue outputting after that line.
        if [[ $entry == Database* ]]; then
          outputODBCLine="1"
        fi
      fi
    done
  
    mv -f $ODBCINI.tmpForSamples $ODBCINI
  
  mqsideleteconfigurableservice IB9NODE -c JDBCProviders -o $6
    
  fi

  echo "MQSI_WIZ_DROP_DB_SUCCESS"
  ;;
  
"-45" ) # TASK_STOP_BROKER #
#  export MQSI_UTILITY_OUTPUT_CP=1208
  $5
  ;;
   
esac
