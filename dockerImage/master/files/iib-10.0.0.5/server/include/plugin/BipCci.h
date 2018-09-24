/*
 * Licensed Materials - Property of IBM
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 * (C) Copyright IBM Corp. 1999, 2001
 */

#ifndef BipCci_h
#define BipCci_h
#ifdef __cplusplus
extern "C" {
#endif

/* Platform specific header file */
#include <BipCos.h>

/* Version Id */
#define CCI_VERSION 0x00010001

/******************************************************************************/
/*                                                                            */
/* Utility function return and reason codes                                   */
/*                                                                            */
/******************************************************************************/
#define CCI_NULL_ADDR                 0
#define CCI_FAILURE                  -1

#define CCI_SUCCESS                   0
#define CCI_INV_FACTORY_NAME          8
#define CCI_INV_FACTORY_OBJECT        9
#define CCI_INV_NODE_NAME            10
#define CCI_INV_NODE_OBJECT          11
#define CCI_INV_TERMINAL_NAME        12
#define CCI_INV_TERMINAL_OBJECT      13
#define CCI_INV_MESSAGE_OBJECT       14
#define CCI_INV_ELEMENT_OBJECT       15
#define CCI_INV_PARSER_NAME          16
#define CCI_INV_PARSER_OBJECT        17
#define CCI_INV_VFTP                 18
#define CCI_INV_DATA_POINTER         19
#define CCI_INV_LENGTH               20
#define CCI_NAME_EXISTS              21
#define CCI_BUFFER_TOO_SMALL         22
#define CCI_NO_BUFFER_EXISTS         23
#define CCI_PARSER_NAME_TOO_LONG     24
#define CCI_NO_EXCEPTION_EXISTS      25
#define CCI_INV_MESSAGE_CONTEXT      26
#define CCI_INV_DATA_BUFLEN          27
#define CCI_MISSING_IMPL_FUNCTION    28
#define CCI_INV_OBJECT_NAME          29
#define CCI_INV_LOG_TYPE             30
#define CCI_INV_SQL_EXPR_OBJECT      31
#define CCI_INV_TRANSACTION_TYPE     32
#define CCI_INV_STATEMENT            33
#define CCI_INV_CODEPAGE             34
#define CCI_INV_CHARACTER            35
#define CCI_NO_THREADS_AVAILABLE     36
#define CCI_INV_NODE_ENV             37
#define CCI_INV_IMPL_FUNCTION        38
#define CCI_INV_THREAD_CONTEXT       39
#define CCI_INV_ESQL_PATH_EXPR       40
#define CCI_PATH_NOT_NAVIGABLE       41
#define CCI_ATTRIBUTE_UNKNOWN        42
#define CCI_INV_USER_EXIT_NAME       43
#define CCI_DUP_USER_EXIT_NAME       44
#define CCI_INV_ATTR_NAME            45
#define CCI_INV_CONNECTION_OBJECT    46
#define CCI_INV_BROKER_INFO_ST       47
#define CCI_INV_XPATH_VALUE_TYPE     48

#define CCI_EXCEPTION                64
#define CCI_EXCEPTION_UNKNOWN        65
#define CCI_EXCEPTION_FATAL          66
#define CCI_EXCEPTION_RECOVERABLE    67
#define CCI_EXCEPTION_CONFIGURATION  68
#define CCI_EXCEPTION_PARSER         69
#define CCI_EXCEPTION_CONVERSION     70
#define CCI_EXCEPTION_DATABASE       71
#define CCI_EXCEPTION_USER           72
#define CCI_TIMEOUT                 100
#define CCI_SUCCESS_CONTINUE        101
#define CCI_SUCCESS_RETURN          102
#define CCI_FAILURE_CONTINUE        103
#define CCI_FAILURE_RETURN          104

/******************************************************************************/
/*                                                                            */
/* Options                                                                    */
/*                                                                            */
/******************************************************************************/
#define CCI_FINALIZE_NONE          0x00000000
#define CCI_FINALIZE_VALIDATE      0x00000001
#define CCI_SQL_TRANSACTION_AUTO   1
#define CCI_SQL_TRANSACTION_COMMIT 2

/******************************************************************************/
/*                                                                            */
/* Log Types                                                                  */
/*                                                                            */
/******************************************************************************/
typedef enum LogType {
  CCI_LOG_ERROR,
  CCI_LOG_WARNING,
  CCI_LOG_INFORMATION
} CCI_LOG_TYPE;

/******************************************************************************/
/*                                                                            */
/* Exception Types                                                            */
/*                                                                            */
/******************************************************************************/
typedef enum ExceptionType {
  CCI_FATAL_EXCEPTION,
  CCI_RECOVERABLE_EXCEPTION,
  CCI_CONFIGURATION_EXCEPTION,
  CCI_PARSER_EXCEPTION,
  CCI_CONVERSION_EXCEPTION,
  CCI_DATABASE_EXCEPTION,
  CCI_USER_EXCEPTION
} CCI_EXCEPTION_TYPE;

/******************************************************************************/
/*                                                                            */
/* Thread Callback Types                                                      */
/*                                                                            */
/******************************************************************************/
#define CCI_THREAD_STATE_TERMINATION  1
#define CCI_THREAD_STATE_INSTANCE_END 2
#define CCI_THREAD_STATE_IDLE         4

/******************************************************************************/
/*                                                                            */
/* Thread Callback Return codes                                               */
/*                                                                            */
/******************************************************************************/
typedef enum  {
   CCI_THREAD_STATE_REGISTRATION_RETAIN = 0,
   CCI_THREAD_STATE_REGISTRATION_REMOVE = 1
}CciRegCallbackStatus;

/******************************************************************************/
/*                                                                            */
/* Trace Types                                                                */
/*                                                                            */
/******************************************************************************/
typedef int CCI_TRACE_TYPE;
#define CCI_TRACE_NONE            0
#define CCI_USER_NORMAL_TRACE     1
#define CCI_USER_DEBUG_TRACE      2
#define CCI_SERVICE_NORMAL_TRACE  4
#define CCI_SERVICE_DEBUG_TRACE   8
#define CCI_USER_TRACE            3
#define CCI_SERVICE_TRACE         12

/******************************************************************************/
/*                                                                            */
/* Various defines                                                            */
/*                                                                            */
/******************************************************************************/
#define CCI_MAX_FUNCTION_NAME_SIZE 64
#define CCI_MAX_EXCEPTION_INSERTS  32

/******************************************************************************/
/*                                                                            */
/* Type definitions                                                           */
/*                                                                            */
/******************************************************************************/
typedef char   CciBool;
typedef char   CciByte;
typedef int    CciCompareMode;
typedef void   CciContext;
typedef void   CciElement;
typedef int    CciElementType;
typedef void   CciElementValue;
typedef void   CciFactory;
typedef void   CciMessage;
typedef void   CciMessageContext;
typedef void   CciNode;
typedef void   CciParser;
typedef void   CciObject;
typedef double CciReal;
typedef int    CciSize;
typedef void   CciSqlExpression;
typedef int    CciSqlTransaction;
typedef void   CciTerminal;
typedef int    CciValueType;
typedef int    CciValueState;
typedef void   CciThreadContext;
typedef void   CciDataContext;
typedef void   CciSqlPathExpression;
typedef int    CciCallbackType;
typedef void   CciXPath;
typedef void   CciNamespaceBindings;
typedef void   CciXPathVariables;
typedef void   CciXPathValue;
typedef int    CciXPathValueType;

/*
 * The following types have platform-specific implementations, as
 * defined in BipCos.h:
 *
 * CciChar : a UCS-2 Unicode character
 * CciInt  : a 64-bit integer
 */

/* Various structures */
struct CciDate      {int year; int month; int day;};
struct CciTime      {int hour; int minute; float second;};
struct CciTimestamp {int year; int month; int day; int hour; int minute; float second;};
struct CciByteArray {void* pointer; int size;};
struct CciBitArray  {void* pointer; int size;};

/******************************************************************************/
/*                                                                            */
/* Values relating to the CNI_VFT structure                                   */
/*                                                                            */
/******************************************************************************/

/* Structure Identifier */
#define CNI_VFT_STRUC_ID "NVFT"

/* Structure Identifier (array form) */
#define CNI_VFT_STRUC_ID_ARRAY 'N','V','F','T'

/* Structure Version Number */
#define CNI_VFT_VERSION_1       1L
/* Structure Version Number */
#define CNI_VFT_VERSION_3       3L
/* Structure Version Number (IIB v10) */
#define CNI_VFT_VERSION_4       4L

#ifndef BipCci_h_CNI_VFT

/* Current version */
#define CNI_VFT_CURRENT_VERSION CNI_VFT_VERSION_4


/* Message flow node implementation function pointer table */
typedef struct cniVft {
    int     reserved;
    char    StrucId[4];
    int     Version;
    void*   (*iFpCreateNodeContext) (CciFactory*, CciChar*, CciNode*);
    void    (*iFpDeleteNodeContext) (CciContext*);
    int     (*iFpGetAttributeName)  (CciContext*, int, CciChar*, int);
    int     (*iFpSetAttribute)      (CciContext*, CciChar*, CciChar*);
    int     (*iFpGetAttribute)      (CciContext*, CciChar*, CciChar*, int);
    void    (*iFpEvaluate)          (CciContext*, CciMessage*, CciMessage*, CciMessage*);
    void    (*iFpEvaluate2)         (CciContext*, CciMessage*, CciMessage*, CciMessage*, CciMessage*, CciTerminal*);
    int     (*iFpRun)               (CciContext*, CciMessage*, CciMessage*, CciMessage*);
    CciSize (*iFpGetAttribute2)     (int*,CciContext*,CciChar*, CciChar*, int);
    CciSize (*iFpGetAttributeName2) (int*,CciContext*,int, CciChar*, int);
    void    (*iFpInitialize)        (CciContext*);
} CNI_VFT;

#define CNI_VFT_DEFAULT 0L,\
                        {CNI_VFT_STRUC_ID_ARRAY},\
                        CNI_VFT_CURRENT_VERSION,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L
#endif

typedef struct cniVftCompat {
    void* (*iFpCreateNodeContext) (CciFactory*, CciChar*, CciNode*);
    void  (*iFpDeleteNodeContext) (CciContext*);
    int   (*iFpGetAttributeName)  (CciContext*, int, CciChar*, int);
    int   (*iFpSetAttribute)      (CciContext*, CciChar*, CciChar*);
    int   (*iFpGetAttribute)      (CciContext*, CciChar*, CciChar*, int);
    void  (*iFpEvaluate)          (CciContext*, CciMessage*, CciMessage*, CciMessage*);
} COMPAT_CNI_VFT;

/******************************************************************************/
/*                                                                            */
/* Values relating to the CPI_VFT structure                                   */
/*                                                                            */
/******************************************************************************/

/* Structure Identifier */
#define CPI_VFT_STRUC_ID "PVFT"

/* Structure Identifier (array form) */
#define CPI_VFT_STRUC_ID_ARRAY 'P','V','F','T'

/* Structure Version Number */
#define CPI_VFT_VERSION_1       1L

#ifndef BipCci_h_CPI_VFT

/* Current version */
#define CPI_VFT_CURRENT_VERSION CPI_VFT_VERSION_1

/* Parser implementation function pointer table */
typedef struct cpiVft {
    int                    reserved;
    char                   StrucId[4];
    int                    Version;
    CciContext*            (*iFpCreateContext)            (CciParser*);
    void                   (*iFpDeleteContext)            (CciParser*, CciContext*);
    int                    (*iFpParseBuffer)              (CciParser*, CciContext*, int);
    void                   (*iFpParseFirstChild)          (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParseLastChild)           (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParsePreviousSibling)     (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParseNextSibling)         (CciParser*, CciContext*, CciElement*);
    int                    (*iFpWriteBuffer)              (CciParser*, CciContext*);
    void                   (*iFpSetElementValue)          (CciParser*, CciElement*, CciElementValue*);
    const CciElementValue* (*iFpElementValue)             (CciParser*, CciElement*);
    void                   (*iFpNextParserClassName)      (CciParser*, CciContext*, CciChar*, int);
    void                   (*iFpSetNextParserClassName)   (CciParser*, CciContext*, CciChar*, CciBool);
    int                    (*iFpNextParserEncoding)       (CciParser*, CciContext*);
    int                    (*iFpNextParserCodedCharSetId) (CciParser*, CciContext*);
    CciBool                (*iFpParserType)               (CciParser*, CciContext*);
    int                    (*iFpParseBufferEncoded)       (CciParser*, CciContext*, int, int);
    int                    (*iFpParseBufferFormatted)     (CciParser*, CciContext*, int, int, CciChar*, CciChar*, CciChar*);
    int                    (*iFpWriteBufferEncoded)       (CciParser*, CciContext*, int, int);
    int                    (*iFpWriteBufferFormatted)     (CciParser*, CciContext*, int, int, CciChar*, CciChar*, CciChar*);
} CPI_VFT;

#define CPI_VFT_DEFAULT 0L,\
                        {CPI_VFT_STRUC_ID_ARRAY},\
                        CPI_VFT_VERSION_1,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L
#endif

typedef struct cpiVftCompat {
    CciContext*            (*iFpCreateContext)            (CciParser*);
    void                   (*iFpDeleteContext)            (CciParser*, CciContext*);
    int                    (*iFpParseBuffer)              (CciParser*, CciContext*, int);
    void                   (*iFpParseFirstChild)          (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParseLastChild)           (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParseLeftSibling)         (CciParser*, CciContext*, CciElement*);
    void                   (*iFpParseRightSibling)        (CciParser*, CciContext*, CciElement*);
    int                    (*iFpWriteBuffer)              (CciParser*, CciContext*);
    void                   (*iFpSetValue)                 (CciParser*, CciElement*, CciElementValue*);
    const CciElementValue* (*iFpValue)                    (CciParser*, CciElement*);
    void                   (*iFpNextParserClassName)      (CciParser*, CciContext*, CciChar*, int);
    void                   (*iFpSetNextParserClassName)   (CciParser*, CciContext*, CciChar*, CciBool);
    int                    (*iFpNextParserEncoding)       (CciParser*, CciContext*);
    int                    (*iFpNextParserCodedCharSetId) (CciParser*, CciContext*);
    CciBool                (*iFpIsHeaderParser)           (CciParser*, CciContext*);
} COMPAT_CPI_VFT;

/******************************************************************************/
/*                                                                            */
/* General definitions                                                        */
/*                                                                            */
/******************************************************************************/

/* Structure to return string data */
typedef struct string_st {
    CciChar*   buffer;        /* INPUT: Address of caller's buffer to receive string data */
    long       bufferLength;  /* INPUT: Length of caller's buffer */
    long       bytesOutput;   /* OUTPUT: Number of bytes written to buffer */
    long       dataLength;    /* OUTPUT: Actual length of string data */
} CCI_STRING_ST;

#define CCI_STRING_ST_DEFAULT NULL, \
                              0L,   \
                              0L,   \
                              0L

/******************************************************************************/
/*                                                                            */
/* Values relating to the CCI_EXCEPTION_ST structure                          */
/*                                                                            */
/******************************************************************************/

/* Description of a broker exception */
#define CCI_EXCEPTION_ST_VERSION_1       0x00010001
#define CCI_EXCEPTION_ST_CURRENT_VERSION CCI_EXCEPTION_ST_VERSION_1

typedef struct exception_st {
    int           versionId;                           /* Structure version identification */
    int           type;                                /* Type of exception */
    int           messageNumber;                       /* Message number */
    int           insertCount;                         /* Number of message inserts */
    CCI_STRING_ST inserts[CCI_MAX_EXCEPTION_INSERTS];  /* Array of message insert areas */
    const char*   fileName;                            /* Source: file name */
    int           lineNumber;                          /* Source: line number in file */
    const char*   functionName;                        /* Source: function name */
    const char*   traceText;                           /* Trace text associated with exception */
    CCI_STRING_ST objectName;                          /* Object name */
    CCI_STRING_ST objectType;                          /* Object type */
} CCI_EXCEPTION_ST;

typedef struct exception_st_w {
    int           versionId;                           /* Structure version identification */
    int           type;                                /* Type of exception */
    int           messageNumber;                       /* Message number */
    int           insertCount;                         /* Number of message inserts */
    CCI_STRING_ST inserts[CCI_MAX_EXCEPTION_INSERTS];  /* Array of message insert areas */
    const char*   fileName;                            /* Source: file name */
    int           lineNumber;                          /* Source: line number in file */
    const char*   functionName;                        /* Source: function name */
    CCI_STRING_ST traceText;                           /* Trace text associated with exception */
    CCI_STRING_ST objectName;                          /* Object name */
    CCI_STRING_ST objectType;                          /* Object type */
} CCI_EXCEPTION_ST_W;


#define CCI_EXCEPTION_ST_DEFAULT CCI_EXCEPTION_ST_CURRENT_VERSION,\
                                 0,\
                                 0,\
                                 0,\
                                 {{CCI_STRING_ST_DEFAULT}},\
                                 NULL,\
                                 0,\
                                 NULL,\
                                 NULL,\
                                 {CCI_STRING_ST_DEFAULT},\
                                 {CCI_STRING_ST_DEFAULT}

/* Values defined for "type" member of CCI_EXCEPTION_ST */
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_BASE           1
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_TERMINATION    2
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_FATAL          3
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_RECOVERABLE    4
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_CONFIGURATION  5
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_PARSER         6
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_CONVERSION     7
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_DATABASE       8
#define CCI_EXCEPTION_ST_TYPE_EXCEPTION_USER           9

/******************************************************************************/
/*                                                                            */
/* Values relating to the CNI_BROKER_INFO_ST                                  */
/*                                                                            */
/******************************************************************************/

/* Structure to return broker environment data */
#define CNI_BROKER_INFO_ST_VERSION_1       0x00010001
#define CNI_BROKER_INFO_ST_VERSION_2       0x00010002
#define CNI_BROKER_INFO_ST_CURRENT_VERSION CNI_BROKER_INFO_ST_VERSION_2

typedef struct broker_info_st {
  int           versionId;              /* Structure version identification                        */
  CCI_STRING_ST brokerName;             /* The label of the broker                                 */
  CCI_STRING_ST executionGroupName;     /* The label of the current execution group                */
  CCI_STRING_ST messageFlowName;        /* The label of the current message flow                   */
  CCI_STRING_ST queueManagerName;       /* The name of the MQ Queue Manager for the broker         */
  int           commitCount;            /* Commit count value                                      */
  int           commitInterval;         /* Commit interval value                                   */
  int           coordinatedTransaction; /* Flag: coordinatedTransaction: 0=no, 1=yes               */
  CCI_STRING_ST dataSourceUserId;       /* The userid broker connects to datasource as             */
  CCI_STRING_ST applicationName;        /* The label of the application that owns the message flow */
  CCI_STRING_ST libraryName;            /* The label of the library that owns the message flow     */
} CNI_BROKER_INFO_ST;

#define CNI_BROKER_INFO_ST_DEFAULT CNI_BROKER_INFO_ST_CURRENT_VERSION,\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   1,\
                                   5,\
                                   0,\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT}

/******************************************************************************/
/*                                                                            */
/* Values relating to the CCI_BROKER_INFO_ST                                  */
/*                                                                            */
/******************************************************************************/

/* Structure to return broker environment data */
#define CCI_BROKER_INFO_ST_VERSION_1       0x00010001
#define CCI_BROKER_INFO_ST_CURRENT_VERSION CCI_BROKER_INFO_ST_VERSION_1

typedef struct cci_broker_info_st {
  int           versionId;              /* Structure version identification                */
  CCI_STRING_ST brokerName;             /* The label of the broker                         */
  CCI_STRING_ST executionGroupName;     /* The label of the current execution group        */
  CCI_STRING_ST queueManagerName;       /* The name of the MQ Queue Manager for the broker */
  CCI_STRING_ST dataSourceUserId;       /* The userid broker connects to datasource as     */
} CCI_BROKER_INFO_ST;

#define CCI_BROKER_INFO_ST_DEFAULT CCI_BROKER_INFO_ST_CURRENT_VERSION,\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT},\
                                   {CCI_STRING_ST_DEFAULT}


/******************************************************************************/
/*                                                                            */
/* General definitions                                                        */
/*                                                                            */
/******************************************************************************/

/* Element type definitions */
#define CCI_ELEMENT_TYPE_UNKNOWN       0x00000000
#define CCI_ELEMENT_TYPE_NAME          0x01000000
#define CCI_ELEMENT_TYPE_VALUE         0x02000000
#define CCI_ELEMENT_TYPE_NAME_VALUE    0x03000000

/* Element type masks */
#define CCI_ELEMENT_TYPE_MASK_GENERIC  0xFF000000
#define CCI_ELEMENT_TYPE_MASK_SPECIFIC 0x00FFFFFF

/* Value type definitions */
#define CCI_VALUE_TYPE_UNKNOWN       0
#define CCI_VALUE_TYPE_BOOL          1
#define CCI_VALUE_TYPE_INTEGER       2
#define CCI_VALUE_TYPE_REAL          3
#define CCI_VALUE_TYPE_DECIMAL       4
#define CCI_VALUE_TYPE_CHAR          5
#define CCI_VALUE_TYPE_TIME          6
#define CCI_VALUE_TYPE_GMTTIME       7
#define CCI_VALUE_TYPE_DATE          8
#define CCI_VALUE_TYPE_TIMESTAMP     9
#define CCI_VALUE_TYPE_GMTTIMESTAMP 10
#define CCI_VALUE_TYPE_INTERVAL     11
#define CCI_VALUE_TYPE_BYTEARRAY    12
#define CCI_VALUE_TYPE_BITARRAY     13

/* XPath value type definitions */
#define CCI_XPATH_VALUE_TYPE_UNKNOWN   0
#define CCI_XPATH_VALUE_TYPE_BOOLEAN   1
#define CCI_XPATH_VALUE_TYPE_REAL      2
#define CCI_XPATH_VALUE_TYPE_CHARACTER 3
#define CCI_XPATH_VALUE_TYPE_NODESET   4

/* Value state definitions */
#define CCI_VALUE_STATE_UNDEFINED 0
#define CCI_VALUE_STATE_VALID     1
#define CCI_VALUE_STATE_INVALID   2

/* Compare mode definitions */
#define CCI_COMPARE_MODE_NULL                      0
#define CCI_COMPARE_MODE_SPECIFIC_TYPE             1
#define CCI_COMPARE_MODE_GENERIC_TYPE              2
#define CCI_COMPARE_MODE_FULL_TYPE                 3
#define CCI_COMPARE_MODE_NAME                      4
#define CCI_COMPARE_MODE_NAME_SPECIFIC_TYPE        5
#define CCI_COMPARE_MODE_NAME_GENERIC_TYPE         6
#define CCI_COMPARE_MODE_NAME_FULL_TYPE            7
#define CCI_COMPARE_MODE_SPACE                     8
#define CCI_COMPARE_MODE_SPACE_SPECIFIC_TYPE       9
#define CCI_COMPARE_MODE_SPACE_GENERIC_TYPE        10
#define CCI_COMPARE_MODE_SPACE_FULL_TYPE           11
#define CCI_COMPARE_MODE_SPACE_NAME                12
#define CCI_COMPARE_MODE_SPACE_NAME_SPECIFIC_TYPE  13
#define CCI_COMPARE_MODE_SPACE_NAME_GENERIC_TYPE   14
#define CCI_COMPARE_MODE_SPACE_NAME_FULL_TYPE      15

/*for backward compatibility*/
#define CCI_COMPARE_MODE_FULL                7

/* BitStream generation options*/
#define CCI_BITSTREAM_OPTIONS_ROOT     0x00000000
#define CCI_BITSTREAM_OPTIONS_FOLDER   0x00010000
#define CCI_BITSTREAM_OPTIONS_EMBEDDED 0x00020000




/******************************************************************************/
/*                                                                            */
/* Thread callback function pointer type                                      */
/*                                                                            */
/******************************************************************************/
typedef CciRegCallbackStatus (* CciRegCallback) (CciDataContext *, CciCallbackType);

/******************************************************************************/
/*                                                                            */
/* C Node Interface Public Utility functions                                  */
/*                                                                            */
/* These are functions which may be used by node implementations              */
/*                                                                            */
/******************************************************************************/

/* Throw an exception */
void ImportExportPrefix ImportExportSuffix cciLog(
  int*               returnCode,
  CCI_LOG_TYPE       type,
  char*              file,
  int                line,
  char*              function,
  CciChar*           messageSource,
  int                messageNumber,
  char*              traceText,
  ...
);


void ImportExportPrefix ImportExportSuffix cciLogW(
  int*               returnCode,
  CCI_LOG_TYPE       type,
  char*              file,
  int                line,
  char*              function,
  CciChar*           messageSource,
  int                messageNumber,
  CciChar*           traceText,
  ...
);

/* Write to the log with a specified list of inserts */
void ImportExportPrefix ImportExportSuffix cciLogWithInserts(
  int*               returnCode,
  CCI_LOG_TYPE       type,
  const char*        file,
  int                line,
  const char*        function,
  const CciChar*     messageSource,
  int                messageNumber,
  const char*        traceText,
  const char**       inserts,
  CciSize            numInserts
);

/* Write to the log with a specified list of UCS-2 Unicode inserts */
void ImportExportPrefix ImportExportSuffix cciLogWithInsertsW(
  int*               returnCode,
  CCI_LOG_TYPE       type,
  const char*        file,
  int                line,
  const char*        function,
  const CciChar*     messageSource,
  int                messageNumber,
  const CciChar*     traceText,
  const CciChar**    inserts,
  CciSize            numInserts
);

/* Get data about the last exception */
void ImportExportPrefix * ImportExportSuffix cciGetLastExceptionData(
  int*              returnCode,
  CCI_EXCEPTION_ST* exception_st
);


void ImportExportPrefix * ImportExportSuffix cciGetLastExceptionDataW(
  int*                returnCode,
  CCI_EXCEPTION_ST_W* exception_st
);

/* Rethrow the last exception */
void ImportExportPrefix ImportExportSuffix cciRethrowLastException(
  int* returnCode
);

/* Throw an exception */
void ImportExportPrefix ImportExportSuffix cciThrowException(
  int*               returnCode,
  CCI_EXCEPTION_TYPE type,
  char*              file,
  int                line,
  char*              function,
  CciChar*           messageSource,
  int                messageNumber,
  char*              traceText,
  ...
);


void ImportExportPrefix ImportExportSuffix cciThrowExceptionW(
  int*               returnCode,
  CCI_EXCEPTION_TYPE type,
  char*              file,
  int                line,
  char*              function,
  CciChar*           messageSource,
  int                messageNumber,
  CciChar*           traceText,
  ...
);

/* Throw an exception with a specified list of inserts */
void ImportExportPrefix ImportExportSuffix cciThrowExceptionWithInserts(
  int*               returnCode,
  CCI_EXCEPTION_TYPE type,
  const char*        file,
  int                line,
  const char*        function,
  const CciChar*     messageSource,
  int                messageNumber,
  const char*        traceText,
  const char**       inserts,
  CciSize            numInserts
);

/* Throw an exception with a specified list of UCS-2 Unicode inserts */
void ImportExportPrefix ImportExportSuffix cciThrowExceptionWithInsertsW(
  int*               returnCode,
  CCI_EXCEPTION_TYPE type,
  const char*        file,
  int                line,
  const char*        function,
  const CciChar*     messageSource,
  int                messageNumber,
  const CciChar*     traceText,
  const CciChar**    inserts,
  CciSize            numInserts
);

/* Convert a sbcs/mbcs/dbcs string to UCS-2 Unicode */
int ImportExportPrefix ImportExportSuffix cciMbsToUcs(
  int*        returnCode,
  const char* mbString,
  CciChar*    ucsString,
  int         ucsStringLength,
  int         codePage
);

/* Convert a UCS-2 Unicode string into sbcs/mbcs/dbcs */
int ImportExportPrefix ImportExportSuffix cciUcsToMbs(
  int*           returnCode,
  const CciChar* ucsString,
  char*          mbString,
  int            mbStringLength,
  int            codePage
);

/* Convert a sbcs/mbcs/dbcs string to UCS-2 Unicode with callback */
void ImportExportPrefix ImportExportSuffix cciMbsToUcsWithCallback(
  int*        returnCode,
  const char* mbString,
  int         codePage,
  void        (*callback)(void*, const CciChar*, int),
  void*       context
);

/* Convert a UCS-2 Unicode string into sbcs/mbcs/dbcs with callback */
void ImportExportPrefix ImportExportSuffix cciUcsToMbsWithCallback(
  int*           returnCode,
  const CciChar* ucsString,
  int            codePage,
  void           (*callback)(void*, const char*, int),
  void*          context
);

/* Get the codepage for the current application */
int ImportExportPrefix ImportExportSuffix cciGetLocaleCodePage(
  int* returnCode
);

void ImportExportPrefix ImportExportSuffix cciRegisterForThreadStateChange(
  int*              returnCode,
  CciThreadContext* threadContext,
  CciDataContext*   userContext,
  CciRegCallback    callback,
  CciCallbackType   type);


void ImportExportPrefix ImportExportSuffix cciUserTrace(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const char*    traceText,
  ...
);

void ImportExportPrefix ImportExportSuffix cciUserTraceW(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const CciChar* traceText,
  ...
);

/* Write to user trace with a specified list of inserts */
void ImportExportPrefix ImportExportSuffix cciUserTraceWithInserts(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const char*    traceText,
  const char**   inserts,
  CciSize        numInserts
);

/* Write to user trace with a specified list of UCS-2 Unicode inserts */
void ImportExportPrefix ImportExportSuffix cciUserTraceWithInsertsW(
  int*            returnCode,
  CciObject*      object,
  const CciChar*  messageSource,
  int             messageNumber,
  const CciChar*  traceText,
  const CciChar** inserts,
  CciSize         numInserts
);

void ImportExportPrefix ImportExportSuffix cciUserDebugTrace(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const char*    traceText,
  ...
);

void ImportExportPrefix ImportExportSuffix cciUserDebugTraceW(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const CciChar* traceText,
  ...
);

/* Write to debug user trace with a specified list of inserts */
void ImportExportPrefix ImportExportSuffix cciUserDebugTraceWithInserts(
  int*           returnCode,
  CciObject*     object,
  const CciChar* messageSource,
  int            messageNumber,
  const char*    traceText,
  const char**   inserts,
  CciSize        numInserts
);

/* Write to debug user trace with a specified list of UCS-2 Unicode inserts */
void ImportExportPrefix ImportExportSuffix cciUserDebugTraceWithInsertsW(
  int*            returnCode,
  CciObject*      object,
  const CciChar*  messageSource,
  int             messageNumber,
  const CciChar*  traceText,
  const CciChar** inserts,
  CciSize         numInserts
);

void ImportExportPrefix ImportExportSuffix cciServiceTrace(
  int*           returnCode,
  CciObject*     object,
  const char*    traceText
);

void ImportExportPrefix ImportExportSuffix cciServiceTraceW(
  int*           returnCode,
  CciObject*     object,
  const CciChar* traceText
);

void ImportExportPrefix ImportExportSuffix cciServiceDebugTrace(
  int*           returnCode,
  CciObject*     object,
  const char*    traceText
);

void ImportExportPrefix ImportExportSuffix cciServiceDebugTraceW(
  int*           returnCode,
  CciObject*     object,
  const CciChar* traceText
);

CCI_TRACE_TYPE ImportExportPrefix ImportExportSuffix cciIsTraceActive(
  int*           returnCode,
  CciObject*     object);


/******************************************************************************/
/*                                                                            */
/* User Exit API                                                              */
/*                                                                            */
/******************************************************************************/

typedef int CciMessageOrigin;
#define CCI_MESSAGE_ORIGIN_BITSTREAM 1
#define CCI_MESSAGE_ORIGIN_TREE      2

typedef int CciUserExitState;
#define CCI_USER_EXIT_STATE_ACTIVE   1
#define CCI_USER_EXIT_STATE_INACTIVE 2

typedef int CciTransactionEventType;
#define CCI_TRANSACTION_EVENT_BEGIN    1
#define CCI_TRANSACTION_EVENT_COMMIT   2
#define CCI_TRANSACTION_EVENT_ROLLBACK 3

typedef void CciConnection;
typedef void (*cciPropagatedMessageCallback)(
                                 CciDataContext* userContext,
                                 CciMessage*     message,
                                 CciMessage*     localEnvironment,
                                 CciMessage*     exceptionList,
                                 CciMessage*     environment,
                                 CciConnection*  connection);

typedef void (*cciNodeCompletionCallback)   (
                                 CciDataContext* userContext,
                                 CciMessage*     message,
                                 CciMessage*     localEnvironment,
                                 CciMessage*     exceptionList,
                                 CciMessage*     environment,
                                 CciConnection*  connection,
                                 int             reasonCode);

typedef void (*cciInputMessageCallback)     (
                                 CciDataContext*  userContext,
                                 CciMessage*      message,
                                 CciMessage*      localEnvironment,
                                 CciMessage*      exceptionList,
                                 CciMessage*      environment,
                                 CciMessageOrigin messageOrigin,
                                 CciNode*         inputNode);

typedef void (*cciTransactionEventCallback) (
                                 CciDataContext*         userContext,
                                 CciTransactionEventType type,
                                 CciMessage*             environment,
                                 CciNode*                inputNode);

typedef void (*cciOutputMessageCallback) (
                                 CciDataContext*  userContext,
                                 CciMessage*      message,
                                 CciMessage*      localEnvironment,
                                 CciMessage*      exceptionList,
                                 CciMessage*      environment,
                                 CciNode*         node);

typedef struct cci_UEVft {
    int                           reserved;
    char                          StrucId[4];
    int                           Version;
    cciInputMessageCallback       iFpInputMessageCallback;
    cciTransactionEventCallback   iFpTransactionEventCallback;
    cciPropagatedMessageCallback  iFpPropagatedMessageCallback;
    cciNodeCompletionCallback     iFpNodeCompletionCallback;
    cciOutputMessageCallback      iFpOutputMessageCallback;
} CCI_UE_VFT;

#define CCI_UE_VFT_VERSION_1       1
#define CCI_UE_VFT_VERSION_2       2
#define CCI_UE_VFT_CURRENT_VERSION CCI_UE_VFT_VERSION_2

#define CCI_UE_VFT_DEFAULT 0L,\
                        {'X','V','F','T'},\
                        CCI_UE_VFT_CURRENT_VERSION,\
                        0L,\
                        0L,\
                        0L,\
                        0L,\
                        0L

void ImportExportPrefix ImportExportSuffix cciRegisterUserExit (
  int*                             returnCode,
  const CciChar*                   name,
  CciDataContext*                  userContext,
  CCI_UE_VFT*                      functionTable);

CciNode ImportExportPrefix * ImportExportSuffix  cciGetSourceNode(int*                    returnCode,
                           CciConnection*          connection);

CciNode ImportExportPrefix * ImportExportSuffix  cciGetTargetNode(int*                    returnCode,
                           CciConnection* connection);

CciSize  ImportExportPrefix ImportExportSuffix cciGetNodeName (int*           returnCode,
                         CciNode*       node,
                         CciChar*       value,
                         CciSize        length);

CciSize  ImportExportPrefix ImportExportSuffix cciGetNodeAttribute (int*           returnCode,
                         CciNode*       node,
                         const CciChar*       name,
                         CciChar*       value,
                         CciSize        length);

CciSize ImportExportPrefix ImportExportSuffix cciGetNodeType (int*           returnCode,
                         CciNode*       node,
                         CciChar*       value,
                         CciSize        length);

CciSize ImportExportPrefix ImportExportSuffix cciGetTargetTerminalName (int*           returnCode,
                                   CciConnection* connection,
                                   CciChar*       value,
                                   CciSize        length);

CciSize ImportExportPrefix ImportExportSuffix cciGetSourceTerminalName (int*           returnCode,
                                   CciConnection* connection,
                                   CciChar*       value,
                                   CciSize        length);

void    ImportExportPrefix ImportExportSuffix cciGetBrokerInfo(
                                   int*                returnCode,
                                   CCI_BROKER_INFO_ST* broker_info_st);

CciSize ImportExportPrefix ImportExportSuffix cniGetResourceProperty(
                                   int*           returnCode,
                                   const CciChar* resourceManager,
                                   const CciChar* propertyName,
                                   CciChar*       value,
                                   CciSize        length);

const CciTerminal ImportExportPrefix * ImportExportSuffix cniGetOutputTerminal(
                                   int*           returnCode,
                                   const CciNode* nodeObject,
                                   const CciChar* name);

const CciElement ImportExportPrefix * ImportExportSuffix cniGetComplexAttribute(
                                   int*           returnCode,
                                   const CciNode* nodeObject,
                                   const CciChar* attributeName);

#ifdef __cplusplus
}
#endif

#endif
