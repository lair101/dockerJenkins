
/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef MQCHAR MQCHAR28[28];
#define SMQ_ID_LEN  4

/*********************************************************************/
/* Bad message header.                                               */
/*********************************************************************/
typedef struct tagSMQ_BMH
{
   MQCHAR          Identifier[SMQ_ID_LEN];
   MQLONG          Version;
   MQLONG          ErrorType;
   MQLONG          Reason; 
   MQLONG          Encoding;
   MQLONG          CodedCharSetId;
   MQCHAR8         Format;
   MQLONG          PutApplType;
   MQCHAR28        PutApplName;
   MQCHAR8         PutDate;
   MQCHAR8         PutTime;
} SMQ_BMH;

