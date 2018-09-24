/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef long MQLONG;
typedef unsigned char MQBYTE;
typedef MQCHAR MQCHAR4[4];
typedef MQCHAR MQCHAR8[8];
typedef MQCHAR MQCHAR12[12];
typedef MQCHAR MQCHAR28[28];
typedef MQCHAR MQCHAR32[32];
typedef MQCHAR MQCHAR48[48];
typedef MQBYTE MQBYTE24[24]; 
typedef MQBYTE MQBYTE16[16];
typedef MQBYTE MQBYTE32[32]; 

 /*********************************************************************/
 /*  MQWIH Structure -- Work Information Header                       */
 /*********************************************************************/

 typedef struct tagMQWIH {
   MQCHAR4   StrucId;         /* Structure identifier */
   MQLONG    Version;         /* Structure version number */
   MQLONG    StrucLength;     /* Length of MQWIH structure */
   MQLONG    Encoding;        /* Numeric encoding of data that follows
                                 MQWIH */
   MQLONG    CodedCharSetId;  /* Character-set identifier of data that
                                 follows MQWIH */
   MQCHAR8   Format;          /* Format name of data that follows
                                 MQWIH */
   MQLONG    Flags;           /* Flags */
   MQCHAR32  ServiceName;     /* Service name */
   MQCHAR8   ServiceStep;     /* Service step name */
   MQBYTE16  MsgToken;        /* Message token */
   MQCHAR32  Reserved;        /* Reserved */
 } MQWIH;

