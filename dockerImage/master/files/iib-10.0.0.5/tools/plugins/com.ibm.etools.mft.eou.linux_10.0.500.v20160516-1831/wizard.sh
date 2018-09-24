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

# Always make sure the bash environment is set up properly - DB2 will depend on this if available
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
#   . $DB2_PROFILE_SCRIPT > /dev/null 2>&1
# fi


case "$4" in

"-1" ) # return DB2 PATH - 

  # Get the DB2 directory variable.  If it isn't set, this user doesn't have DB2 access to an instance of DB2
  echo -n $DB2DIR
  ;;

"-2") # List MQSI components -  #
# export MQSI_UTILITY_OUTPUT_CP=1208
  mqsilist $5
  ;;

"-10") # List MQ components -  #
  dspmq
  ;;

"-14") # DB2 groups check -  #
  groups $5
  groups `whoami`
  ;;
  
"-16" ) # list DB2 databases - TASK_LIST_DB2_DB
  $INSTHOME/sqllib/adm/db2start
  $DB2DIR/bin/db2 list db directory 
  ;;

"-17" ) # Create a db2 database - TASK_CREATE_DB2_DB
  # $5 - DB name

  if [ -n "$DB2DIR" ]; then
  	$INSTHOME/sqllib/adm/db2start
    $DB2DIR/bin/db2 terminate  
    $DB2DIR/bin/db2 create database $5
    $DB2DIR/bin/db2 update db cfg for $5 using buffpage 10000
    $DB2DIR/bin/db2 update db cfg for $5 using maxappls 5000
    $DB2DIR/bin/db2 update db cfg for $5 using dbheap 900
  fi
  ;;

"-18" ) # bind to a db2 database - TASK_SET_BINDINGS_ON_DB2_DB # 
      # $5 - DB name

  if [ -n "$DB2DIR" ]; then
  	$INSTHOME/sqllib/adm/db2start
    $DB2DIR/bin/db2 terminate
    $DB2DIR/bin/db2 connect to $5
    $DB2DIR/bin/db2 bind $DB2DIR/bnd/@db2cli.lst grant public
    $DB2DIR/bin/db2 terminate
  fi
  ;;

"-19" ) # grant authorities on a db2 database - TASK_GRANT_AUTH_ON_DB2_DB #
  # $5 - DB Name
  # $6 - user to grant permissions to

  if [ -n "$DB2DIR" ]; then
    $DB2DIR/bin/db2 terminate
    $DB2DIR/bin/db2 connect to $5

    $DB2DIR/bin/db2 grant BINDADD on database to user $6
    $DB2DIR/bin/db2 grant CONNECT on database to user $6
    $DB2DIR/bin/db2 grant CREATETAB on database to user $6
    $DB2DIR/bin/db2 grant CREATE_NOT_FENCED on database to user $6
    $DB2DIR/bin/db2 grant IMPLICIT_SCHEMA on database to user $6
    $DB2DIR/bin/db2 grant DBADM on database to user $6
    $DB2DIR/bin/db2 grant LOAD on database to user $6
    
    $DB2DIR/bin/db2 terminate
  fi

  ;;

"-20" ) # create an ODBC data source for a db2 database - TASK_CREATE_ODBC_DATASOURCE_FOR_DB2_DB
      # $5 - DB Name
  
  if [ -z $ODBCINI ]; then
    echo "\$ODBCINI undefined"
    exit
  fi

  if grep -F $5 $ODBCINI > /dev/null 2>&1; then
    echo "$5 already known in $ODBCINI" #DEBUG
    echo "MQSI_WIZ_CREATE_ODBC_SUCCESS"
    exit
  fi
  
  # Merant interface - echo new DB definition to odbc file.
  # Note we assume V8.1 here - this will be changed to V9 if appropriate
  #  by the sed script we create below.
  echo "" >> $ODBCINI
  echo "[$5]" >> $ODBCINI
  echo "Driver=/opt/IBM/db2/V8.1/lib/libdb2.so" >> $ODBCINI
  echo "Description=$5 DB2 ODBC Database for samples" >> $ODBCINI
  echo "Database=$5" >> $ODBCINI
  echo "" >> $ODBCINI

  # discover bitness, only needed for detecting backwards 32bit machines
  if [ `uname` == "Linux" ]; then
    case `uname -m` in
        i686)
            BITS=32
            ;;
        x86_64)
            BITS=64
            ;;
        *)
            BITS=64
    esac
  else
    BITS=64
  fi
  #create sed scriptlet to run on the ODBCINI file
  SED_ODBCINI=/tmp/dcw-odbcini.sed
  echo "" > $SED_ODBCINI
  #change <Your install directory> to $MQSI_FILEPATH
  printf "s#<Your install directory>#$MQSI_FILEPATH#\n" >> $SED_ODBCINI
  #change <A Directory with plenty of free space> to ${MQSI_WORKPATH}/odbc
  printf "s#<A Directory with plenty of free space>#${MQSI_WORKPATH}/odbc#\n" >> $SED_ODBCINI
  if [ -n `echo $DB2DIR | grep "V9\."` ]; then
  		#change /opt/IBM/db2/V8.1/lib/libdb2.so to `find $DB2DIR -name libdb2.so`
      
  		DB2_ODBC_DRIVER=`find $DB2DIR -name libdb2.so | grep $BITS`
      if [ -z "$DB2_ODBC_DRIVER" ]; then
     		DB2_ODBC_DRIVER=`find $DB2DIR -name libdb2.so`
      fi    
  		printf "s#/opt/IBM/db2/V8.1/lib/libdb2.so#$DB2_ODBC_DRIVER#\n" >> $SED_ODBCINI
  fi
  printf "/\[ODBC Data Sources\]/a%s\n" "\\" >> $SED_ODBCINI
  printf "$5=IBM DB2 ODBC Driver\n" >> $SED_ODBCINI

  sed -f $SED_ODBCINI $ODBCINI > $ODBCINI.tmpForDCW
  mv -f $ODBCINI.tmpForDCW $ODBCINI
  
  echo "MQSI_WIZ_CREATE_ODBC_SUCCESS"
  ;;

"-21" ) # Populate a DB2 database - TASK_POPULATE_DB
      # $5 - DB name
      # $6 - SQL script

  if [ -n "$DB2DIR" ]; then
    tr '\r' ';' <"$6" > "$6.tmp"
    mv -f "$6.tmp" "$6"
    $DB2DIR/bin/db2batch -d $5 -f "$6"
  fi
  ;;

"-22" ) # drop a DB2 database and delete its ODBC connection - TASK_DROP_DB2_DB #
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
    
  fi

  echo "MQSI_WIZ_DROP_DB_SUCCESS"
  ;;

"-24" ) # A Generic command, expected to be an mqsi... command - TASK_RUN_WMQI_COMMAND #
# TODO Noel remove  $INSTHOME/sqllib/adm/db2start
# export MQSI_UTILITY_OUTPUT_CP=1208
  $5
  ;;

"-25" ) # create a broker - TASK_CREATE_BROKER  #
#  export MQSI_UTILITY_OUTPUT_CP=1208
  $5
  ;;

"-27" ) # start broker - TASK_START_BROKER  #
  
  # The command below calls mqsistart and then manually closes STDERR.  It seems that
  # when mqsistart is called against a component which is not yet running, STDERR does 
  # not get closed, causing the wizard to hang, trying to read STDERR.  This is a "bug" in 
  # mqsistart.
  #
  # This is "safe", as we only look at STDOUT to decide if the command worked or not, but it
  # May not provide all of the error output to the user.
#  export MQSI_UTILITY_OUTPUT_CP=1208
  mqsistart $5 2>&-
  ;;

"-28" ) # Create an MQ queue - TASK_CREATE_MQ_QUEUE #
  echo "DEFINE $5($6) REPLACE" | runmqsc $7
  ;;

"-29" ) # Delete an MQ queue - TASK_DELETE_MQ_QUEUE #
  echo "DELETE $5($6) PURGE" | runmqsc $7
  ;;
  
"-30" ) # Delete an MQ model queue -TASK_DELETE_MQ_MODEL_QUEUE  #
  echo "DELETE $5($6)" | runmqsc $7
  ;;

"-31" ) # Create an MQ channel - TASK_CREATE_MQ_CHNL #
  echo "DEFINE CHANNEL($5) CHLTYPE($6) REPLACE" | runmqsc $7
  ;; 

"-32" ) # Delete an MQ channel - TASK_DELETE_MQ_CHNL #
  echo "DELETE CHANNEL($5)" | runmqsc $6
  ;;

"-33" ) # start a queue manager - TASK_START_QM
	strmqm $5
	dspmq -m $5
	reason=$?
	if [ $reason -eq 0 ]; then
		echo "WMQI_WIZ_COMMAND_SUCCESS"
	elif [ $reason -eq 5 ]; then
		echo "WMQI_WIZ_COMMAND_SUCCESS"
	fi

  ;;

"-36" ) # create and start a listener - 
# need to query version
# if version 6 or better use runmqsc
# otherwise use runmqlsr
  if [ $7 -ge 60 ]
  then 
    # version 6
    echo "DEFINE LISTENER($5) TRPTYPE(TCP) PORT($6) CONTROL(QMGR)" | runmqsc $5
    echo "START LISTENER($5)" | runmqsc $5
  else
    # version 5
    runmqlsr -m $5 -t TCP -p $6 >/dev/null 2>&1 &
    sleep 2
    printf "RUNMQLSR_COUNT->%s\n" `ps -ef | grep runmqlsr | grep $5 | grep -v grep | wc -l`
  fi

  ;;

"-40" ) # get MQ version - 
  ver=`(mqver || dspmqver) | sed 's/\.//g'  2> /dev/null | grep Version | awk '{print substr($2,1,2);}'`
  echo WMQVER=$ver
  ;;

"-41" ) # get groups info: we'll look for mqm and mqbrkrs in the output - TASK_CHECK_GROUPS
  groups
  ;;

"-43" ) # Create a db2 database - TASK_CREATE_GENERIC_DB_AND_JDBCPROVIDER
  # $5 - DB name

  if [ -n "$DB2DIR" ]; then
  	$INSTHOME/sqllib/adm/db2start
    $DB2DIR/bin/db2 terminate  
    $DB2DIR/bin/db2 create database $5
    $DB2DIR/bin/db2 update db cfg for $5 using buffpage 10000
    $DB2DIR/bin/db2 update db cfg for $5 using maxappls 5000
    $DB2DIR/bin/db2 update db cfg for $5 using dbheap 900

    # sample jdbc database so also setup the provider details
  	mqsicreateconfigurableservice IB9NODE -c JDBCProviders -o $6 -n connectionUrlFormat,databaseName,description,jarsURL,portNumber,serverName,type4DatasourceClassName,type4DriverClassName -v "jdbc:db2://[serverName]:[portNumber]/[databaseName]:user=[user];password=[password];,$5,Sample Database,$DB2DIR/java,50000,localhost,com.ibm.db2.jcc.DB2XADataSource,com.ibm.db2.jcc.DB2Driver" 
    
  fi
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
  
esac
