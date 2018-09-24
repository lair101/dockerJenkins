
 /*********************************************************************/
 /*  MQSAPH Structure -- Work Information Header                       */
 /*********************************************************************/

/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef long MQLONG;
typedef unsigned char MQBYTE;
typedef MQCHAR MQCHAR2[2];
typedef MQCHAR MQCHAR3[3];
typedef MQCHAR MQCHAR4[4];
typedef MQCHAR MQCHAR8[8];
typedef MQCHAR MQCHAR12[12];
typedef MQCHAR MQCHAR28[28];
typedef MQCHAR MQCHAR32[32];
typedef MQCHAR MQCHAR48[48];
typedef MQBYTE MQBYTE24[24]; 
typedef MQBYTE MQBYTE16[16];
typedef MQBYTE MQBYTE32[32]; 

#define SMQ_ID_LEN           4
#define SMQ_SYSNUM_LEN       2
#define SMQ_CLIENT_LEN       3


/*********************************************************************/
/* IDOC message header.                                              */
/*********************************************************************/
typedef struct tagMQSAPH
{
  MQCHAR4          StrucId;                       /* Structure Id    */
  MQLONG           Version;                       /* Struct. version */
  MQLONG           StrucLength;                   /* Struct. length  */
  MQLONG           Encoding;                      /* Data encoding   */
  MQLONG           CodedCharSetId;                /* Data CCSID      */
  MQCHAR8          Format;                        /* Message format  */
  MQLONG           Flags;                         /* Flags           */
  MQCHAR           Client[SMQ_CLIENT_LEN];        /* R/3 Client Id   */
  MQCHAR           Language;                      /* R/3 language    */
  MQCHAR48         HostName;                      /* R/3 host name   */
  MQCHAR12         UserId;                        /* R/3 user Id     */
  MQCHAR8          Password;                      /* R/3 password    */
  MQCHAR           SystemNumber[SMQ_SYSNUM_LEN];  /* R/3 systen no.  */
  MQBYTE           Reserved[2];                    /* Dummy field     */
} MQSAPH;


