/*********************************************************************/
/*  Simple Data Types                                                */
/*********************************************************************/
typedef char MQCHAR;
typedef MQCHAR MQCHAR4[4];
typedef long MQLONG;
typedef MQCHAR MQCHAR8[8];
typedef unsigned char MQBYTE;
typedef MQBYTE MQBYTE24[24];
typedef MQBYTE MQBYTE8[8];
typedef MQCHAR MQCHAR48[48];

/*********************************************************************/
 /*  MQCIH Structure -- CICS Information Header                       */
 /*********************************************************************/

 typedef struct tagMQCIH {
   MQCHAR4  StrucId;             /* Structure identifier */
   MQLONG   Version;             /* Structure version number */
   MQLONG   StrucLength;         /* Length of MQCIH structure */
   MQLONG   Encoding;            /* Reserved */
   MQLONG   CodedCharSetId;      /* Reserved */
   MQCHAR8  Format;              /* MQ format name of data that follows
                                    MQCIH */
   MQLONG   Flags;               /* Flags */
   MQLONG   ReturnCode;          /* Return code from bridge */
   MQLONG   CompCode;            /* MQ completion code or CICS
                                    EIBRESP */
   MQLONG   Reason;              /* MQ reason or feedback code, or CICS
                                    EIBRESP2 */
   MQLONG   UOWControl;          /* Unit-of-work control */
   MQLONG   GetWaitInterval;     /* Wait interval for MQGET call issued
                                    by bridge task */
   MQLONG   LinkType;            /* Link type */
   MQLONG   OutputDataLength;    /* Output COMMAREA data length */
   MQLONG   FacilityKeepTime;    /* Bridge facility release time */
   MQLONG   ADSDescriptor;       /* Send/receive ADS descriptor */
   MQLONG   ConversationalTask;  /* Whether task can be
                                    conversational */
   MQLONG   TaskEndStatus;       /* Status at end of task */
   MQBYTE8  Facility;            /* Bridge facility token */
   MQCHAR4  Function;            /* MQ call name or CICS EIBFN
                                    function */
   MQCHAR4  AbendCode;           /* Abend code */
   MQCHAR8  Authenticator;       /* Password or passticket */
   MQCHAR8  Reserved1;           /* Reserved */
   MQCHAR8  ReplyToFormat;       /* MQ format name of reply message */
   MQCHAR4  RemoteSysId;         /* Reserved */
   MQCHAR4  RemoteTransId;       /* Reserved */
   MQCHAR4  TransactionId;       /* Transaction to attach */
   MQCHAR4  FacilityLike;        /* Terminal emulated attributes */
   MQCHAR4  AttentionId;         /* AID key */
   MQCHAR4  StartCode;           /* Transaction start code */
   MQCHAR4  CancelCode;          /* Abend transaction code */
   MQCHAR4  NextTransactionId;   /* Next transaction to attach */
   MQCHAR8  Reserved2;           /* Reserved */
   MQCHAR8  Reserved3;           /* Reserved */
   MQLONG   CursorPosition;      /* Cursor position */
   MQLONG   ErrorOffset;         /* Offset of error in message */
   MQLONG   InputItem;           /* Reserved */
   MQLONG   Reserved4;           /* Reserved */
 } MQCIH;

