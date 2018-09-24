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
 /*  MQRFH Structure -- Rules and Formatting Header                   */
 /*********************************************************************/

 typedef struct tagMQRFH {
   MQCHAR4  StrucId;         /* Structure identifier */
   MQLONG   Version;         /* Structure version number */
   MQLONG   StrucLength;     /* Total length of MQRFH including string
                                containing name/value pairs */
   MQLONG   Encoding;        /* Numeric encoding of data that follows
                                NameValueString */
   MQLONG   CodedCharSetId;  /* Character set identifier of data that
                                follows NameValueString */
   MQCHAR8  Format;          /* Format name of data that follows
                                NameValueString */
   MQLONG   Flags;           /* Flags */
 } MQRFH;

