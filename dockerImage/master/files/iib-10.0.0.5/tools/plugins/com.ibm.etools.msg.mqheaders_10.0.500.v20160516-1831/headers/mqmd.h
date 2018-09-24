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
 /*  MQMD Structure -- Message Descriptor                             */
 /*********************************************************************/

 typedef struct tagMQMD {
   MQCHAR4   StrucId;           /* Structure identifier */
   MQLONG    Version;           /* Structure version number */
   MQLONG    Report;            /* Options for report messages */
   MQLONG    MsgType;           /* Message type */
   MQLONG    Expiry;            /* Message lifetime */
   MQLONG    Feedback;          /* Feedback or reason code */
   MQLONG    Encoding;          /* Numeric encoding of message data */
   MQLONG    CodedCharSetId;    /* Character set identifier of message
                                   data */
   MQCHAR8   Format;            /* Format name of message data */
   MQLONG    Priority;          /* Message priority */
   MQLONG    Persistence;       /* Message persistence */
   MQBYTE24  MsgId;             /* Message identifier */
   MQBYTE24  CorrelId;          /* Correlation identifier */
   MQLONG    BackoutCount;      /* Backout counter */
   MQCHAR48  ReplyToQ;          /* Name of reply queue */
   MQCHAR48  ReplyToQMgr;       /* Name of reply queue manager */
   MQCHAR12  UserIdentifier;    /* User identifier */
   MQBYTE32  AccountingToken;   /* Accounting token */
   MQCHAR32  ApplIdentityData;  /* Application data relating to
                                   identity */
   MQLONG    PutApplType;       /* Type of application that put the
                                   message */
   MQCHAR28  PutApplName;       /* Name of application that put the
                                   message */
   MQCHAR8   PutDate;           /* Date when message was put */
   MQCHAR8   PutTime;           /* Time when message was put */
   MQCHAR4   ApplOriginData;    /* Application data relating to
                                   origin */
   MQBYTE24  GroupId;           /* Group identifier */
   MQLONG    MsgSeqNumber;      /* Sequence number of logical message
                                   within group */
   MQLONG    Offset;            /* Offset of data in physical message
                                   from start of logical message */
   MQLONG    MsgFlags;          /* Message flags */
   MQLONG    OriginalLength;    /* Length of original message */
 } MQMD;

