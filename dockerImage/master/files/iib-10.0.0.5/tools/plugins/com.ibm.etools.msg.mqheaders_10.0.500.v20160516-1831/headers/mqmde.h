/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef MQCHAR MQCHAR4[4];
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef MQCHAR MQCHAR12[12];
typedef MQCHAR MQCHAR28[28];
typedef MQCHAR MQCHAR32[32];
typedef MQCHAR MQCHAR48[48];
typedef unsigned char MQBYTE;
typedef MQBYTE MQBYTE24[24]; 
typedef MQBYTE MQBYTE16[16];
typedef MQBYTE MQBYTE32[32];

 /*********************************************************************/
 /*  MQMDE Structure -- Message Descriptor Extension                  */
 /*********************************************************************/

 typedef struct tagMQMDE {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQMDE structure */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQMDE */
   MQLONG    CodedCharSetId;  /* Character-set identifier of data that
                                 follows MQMDE */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQMDE */
   MQLONG    Flags;           /* General flags */
   MQBYTE24  GroupId;         /* Group identifier */
   MQLONG    MsgSeqNumber;    /* Sequence number of logical message
                                 within group */
   MQLONG    Offset;          /* Offset of data in physical message from
                                 start of logical message */
   MQLONG    MsgFlags;        /* Message flags */
   MQLONG    OriginalLength;  /* Length of original message */
 } MQMDE;

