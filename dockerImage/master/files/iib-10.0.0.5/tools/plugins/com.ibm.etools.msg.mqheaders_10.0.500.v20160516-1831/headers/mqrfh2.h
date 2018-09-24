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
 /*  MQRFH2 Structure -- Rules and Formatting Header 2                */
 /*********************************************************************/

 typedef struct tagMQRFH2 {
   MQCHAR4  StrucId;         /* Structure identifier */
   MQLONG   Version;         /* Structure version number */
   MQLONG   StrucLength;     /* Total length of MQRFH2 including
                                NameValueData */
   MQLONG   Encoding;        /* Numeric encoding of data that follows
                                NameValueData */
   MQLONG   CodedCharSetId;  /* Character set identifier of data that
                                follows NameValueData */
   MQCHAR8  Format;          /* Format name of data that follows
                                NameValueData */
   MQLONG   Flags;           /* Flags */
   MQLONG   NameValueCCSID;  /* Character set identifier of
                                NameValueData */
 } MQRFH2;

