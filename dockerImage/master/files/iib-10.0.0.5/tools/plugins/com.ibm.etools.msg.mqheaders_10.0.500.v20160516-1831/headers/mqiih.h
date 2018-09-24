/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef MQCHAR MQCHAR4[4];
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef unsigned char MQBYTE;
typedef MQBYTE MQBYTE24[24]; 
typedef MQBYTE MQBYTE16[16];
 
 /*********************************************************************/
 /*  MQIIH Structure -- IMS Information Header                        */
 /*********************************************************************/

 typedef struct tagMQIIH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQIIH structure */
   MQLONG    Encoding;        /* Reserved */
   MQLONG    CodedCharSetId;  /* Reserved */
   MQCHAR8   Format;          /* MQ format name of data that follows
                                 MQIIH */
   MQLONG    Flags;           /* Flags */
   MQCHAR8   LTermOverride;   /* Logical terminal override */
   MQCHAR8   MFSMapName;      /* Message format services map name */
   MQCHAR8   ReplyToFormat;   /* MQ format name of reply message */
   MQCHAR8   Authenticator;   /* RACF password or passticket */
   MQBYTE16  TranInstanceId;  /* Transaction instance identifier */
   MQCHAR    TranState;       /* Transaction state */
   MQCHAR    CommitMode;      /* Commit mode */
   MQCHAR    SecurityScope;   /* Security scope */
   MQCHAR    Reserved;        /* Reserved */
 } MQIIH;

