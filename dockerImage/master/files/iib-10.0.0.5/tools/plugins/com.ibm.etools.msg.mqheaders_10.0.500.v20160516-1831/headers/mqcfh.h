/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef long MQLONG;

/*********************************************************************/
/*  MQCFH Structure -- PCF Header                                    */
/*********************************************************************/

typedef struct tagMQCFH {
   MQLONG  Type;            /* Structure type */
   MQLONG  StrucLength;     /* Structure length */
   MQLONG  Version;         /* Structure version number */
   MQLONG  Command;         /* Command identifier */
   MQLONG  MsgSeqNumber;    /* Message sequence number */
   MQLONG  Control;         /* Control options */
   MQLONG  CompCode;        /* Completion code */
   MQLONG  Reason;          /* Reason code qualifying completion code */
   MQLONG  ParameterCount;  /* Count of parameter structures */
} MQCFH;

