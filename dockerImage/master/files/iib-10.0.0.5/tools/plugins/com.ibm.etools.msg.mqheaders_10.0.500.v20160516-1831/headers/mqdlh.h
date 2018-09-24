/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef MQCHAR MQCHAR4[4];
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef MQCHAR MQCHAR28[28];
typedef MQCHAR MQCHAR48[48];
typedef unsigned char MQBYTE;
typedef MQBYTE MQBYTE24[24]; 

 /*********************************************************************/
 /*  MQDLH Structure -- Dead Letter Header                            */
 /*********************************************************************/

 typedef struct tagMQDLH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    Reason;          /* Reason message arrived on dead-letter
                                 (undelivered-message) queue */
   MQCHAR48  DestQName;       /* Name of original destination queue */
   MQCHAR48  DestQMgrName;    /* Name of original destination queue
                                 manager */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQDLH */
   MQLONG    CodedCharSetId;  /* Character set identifier of data that
                                 follows MQDLH */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQDLH */
   MQLONG    PutApplType;     /* Type of application that put message on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR28  PutApplName;     /* Name of application that put message on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR8   PutDate;         /* Date when message was put on
                                 dead-letter (undelivered-message)
                                 queue */
   MQCHAR8   PutTime;         /* Time when message was put on the
                                 dead-letter (undelivered-message)
                                 queue */
 } MQDLH;

