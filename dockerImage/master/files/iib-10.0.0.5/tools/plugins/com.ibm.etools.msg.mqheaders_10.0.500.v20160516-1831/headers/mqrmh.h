/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef MQCHAR MQCHAR4[4];
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef unsigned char MQBYTE;
typedef MQBYTE MQBYTE24[24];

 /*********************************************************************/
 /*  MQRMH Structure -- Reference Message Header                      */
 /*********************************************************************/

 typedef struct tagMQRMH {
   MQCHAR4   StrucId;             /* Structure identifier */
   MQLONG    Version;             /* Structure version number */
   MQLONG    StrucLength;         /* Total length of MQRMH, including
                                     strings at end of fixed fields, but
                                     not the bulk data */
   MQLONG    Encoding;            /* Numeric encoding of bulk data */
   MQLONG    CodedCharSetId;      /* Character set identifier of bulk
                                     data */
   MQCHAR8   Format;              /* Format name of bulk data */
   MQLONG    Flags;               /* Reference message flags */
   MQCHAR8   ObjectType;          /* Object type */
   MQBYTE24  ObjectInstanceId;    /* Object instance identifier */
   MQLONG    SrcEnvLength;        /* Length of source environment
                                     data */
   MQLONG    SrcEnvOffset;        /* Offset of source environment
                                     data */
   MQLONG    SrcNameLength;       /* Length of source object name */
   MQLONG    SrcNameOffset;       /* Offset of source object name */
   MQLONG    DestEnvLength;       /* Length of destination environment
                                     data */
   MQLONG    DestEnvOffset;       /* Offset of destination environment
                                     data */
   MQLONG    DestNameLength;      /* Length of destination object
                                     name */
   MQLONG    DestNameOffset;      /* Offset of destination object
                                     name */
   MQLONG    DataLogicalLength;   /* Length of bulk data */
   MQLONG    DataLogicalOffset;   /* Low offset of bulk data */
   MQLONG    DataLogicalOffset2;  /* High offset of bulk data */
 } MQRMH;
