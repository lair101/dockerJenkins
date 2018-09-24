/*
 * Licensed Materials - Property of IBM
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 * (C) Copyright IBM Corp. 1999, 2000
*/

#ifndef BipCpi_h
#define BipCpi_h
#ifdef __cplusplus
extern "C" {
#endif

#include <BipCci.h>

/******************************************************************************/
/*                                                                            */
/* C Parser Interface Public Implementation functions                         */
/*                                                                            */
/* These are functions which must be implemented by parser implementations    */
/*                                                                            */
/******************************************************************************/

/* Create plug-in context associated with parser object */
CciContext* cpiCreateContext(
  CciParser* parser
);

/* Prepare parser for parsing a new message */
int cpiParseBuffer(
  CciParser*  parser,
  CciContext* context,
  int         offset
);

/* Parse the first child of a specified element */
void cpiParseFirstChild(
  CciParser*  parser,
  CciContext* context,
  CciElement* currentElement
);

/* Parse the last child of a specified element */
void cpiParseLastChild(
  CciParser*  parser,
  CciContext* context,
  CciElement* currentElement
);

/* Parse the previous sibling of a specified element */
void cpiParsePreviousSibling(
  CciParser*  parser,
  CciContext* context,
  CciElement* currentElement
);

/* Parse the next sibling of a specified element */
void cpiParseNextSibling(
  CciParser*  parser,
  CciContext* context,
  CciElement* currentElement
);

/* Write an element tree to the message buffer */
int cpiWriteBuffer(
  CciParser*  parser,
  CciContext* context
);

/* Delete plug-in context*/
void cpiDeleteContext(
  CciParser*  parser,
  CciContext* context
);

/* Return the next parser class name in the chain (if any) */
void cpiNextParserClassName(
  CciParser*  parser,
  CciContext* context,
  CciChar*    buffer,
  int         size
);

/* Set the name of the next parser class in the chain (if any) */
void cpiSetNextParserClassName(
  CciParser*  parser,
  CciContext* context,
  CciChar*    name,
  CciBool     parserType
);

/* Is our parser capable of parsing MQ headers? */
CciBool cpiParserType(
  CciParser*  parser,
  CciContext* context
);

/* Override behaviour when an element value is set */
void cpiSetElementValue(
  CciParser*       parser,
  CciElement*      currentElement,
  CciElementValue* value
);

/* Override behaviour when retrieving element values */
const CciElementValue* cpiElementValue(
  CciParser*  parser,
  CciElement* currentElement
);

/* Return the encoding of the next parser in the chain (if any) */
int cpiNextParserEncoding(
  CciParser*  parser,
  CciContext* context
);

/* Return the CCSID of the next parser in the chain (if any) */
int cpiNextParserCodedCharSetId(
  CciParser*  parser,
  CciContext* context
);

/******************************************************************************/
/*                                                                            */
/* C Parser Interface Public Utility functions                                */
/*                                                                            */
/* These are functions which may be used by parser implementations            */
/*                                                                            */
/******************************************************************************/

/* Create a new plug-in parser factory */
CciFactory ImportExportPrefix * ImportExportSuffix cpiCreateParserFactory(
  int*     returnCode,
  CciChar* name
);

/* Define a message class to the plug-in parser factory */
void ImportExportPrefix ImportExportSuffix cpiDefineParserClass(
  int*        returnCode,
  CciFactory* factoryObject, 
  CciChar*    name,
  CPI_VFT*    functbl
);

/* Return a pointer to the bitstream buffer */
const CciByte ImportExportPrefix * ImportExportSuffix cpiBufferPointer(
  int*       returnCode,
  CciParser* parser
);

/* Return the size of the bitstream buffer */
CciSize ImportExportPrefix ImportExportSuffix cpiBufferSize(
  int*       returnCode, 
  CciParser* parser
);

/* Return a byte from the bitstream buffer */
CciByte ImportExportPrefix ImportExportSuffix cpiBufferByte(
  int*       returnCode,
  CciParser* parser,
  CciSize    index
);

/* Append data to the bitstream buffer */
void ImportExportPrefix ImportExportSuffix cpiAppendToBuffer(
  int*       returnCode, 
  CciParser* parser, 
  CciByte*   data, 
  CciSize    length
);

/* Return the root element */
CciElement ImportExportPrefix * ImportExportSuffix cpiRootElement(
  int*       returnCode, 
  CciParser* parser
);

/* Create an uninitialized element */
CciElement ImportExportPrefix * ImportExportSuffix cpiCreateElement(
  int*       returnCode,
  CciParser* parser
);

/* Create an initialized element */
CciElement ImportExportPrefix * ImportExportSuffix cpiCreateAndInitializeElement(
  int*           returnCode,
  CciParser*     parser,
  CciElementType type,
  const CciChar* name,
  CciBool        firstChildComplete,
  CciBool        lastChildComplete
);

/* Set the type attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementType(
  int*           returnCode,
  CciElement*    targetElement,
  CciElementType type
);

/* Set the name attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementName(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* name
);

/* Set the namespace attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementNamespace(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* nameSpace
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementValueValue(
  int*             returnCode,
  CciElement*      targetElement,
  CciElementValue* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementBooleanValue(
  int*        returnCode,
  CciElement* targetElement,
  CciBool     value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementIntegerValue(
  int*        returnCode,
  CciElement* targetElement,
  CciInt      value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementRealValue(
  int*        returnCode,
  CciElement* targetElement,
  CciReal     value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementCharacterValue(
  int*           returnCode, 
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementDateValue(
  int*                  returnCode, 
  CciElement*           targetElement, 
  const struct CciDate* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementTimeValue(
  int*                  returnCode,
  CciElement*           targetElement,
  const struct CciTime* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementByteArrayValue(
  int*                       returnCode, 
  CciElement*                targetElement, 
  const struct CciByteArray* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementTimestampValue(
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciTimestamp* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementGmtTimestampValue(
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciTimestamp* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementGmtTimeValue(
  int*                  returnCode,
  CciElement*           targetElement,
  const struct CciTime* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementDecimalValue(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value
);

/* Set the value attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementBitArrayValue(
  int*                      returnCode, 
  CciElement*               targetElement, 
  const struct CciBitArray* value
);

/* Set the "complete previous" attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementCompletePrevious(
  int*        returnCode,
  CciElement* targetElement,
  CciBool     value
);

/* Set the "complete next" attribute of an element */
void ImportExportPrefix ImportExportSuffix cpiSetElementCompleteNext(
  int*        returnCode,
  CciElement* targetElement,
  CciBool     value
);

/* Return the type attribute of an element */
CciElementType ImportExportPrefix ImportExportSuffix cpiElementType(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the name attribute of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementName(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the namespace attribute of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementNamespace(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of an element */
const CciElementValue ImportExportPrefix * ImportExportSuffix cpiElementValueValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of an element */
CciBool ImportExportPrefix ImportExportSuffix cpiElementBooleanValue(
  int*        returnCode,
  CciElement* targetElement
); 

/* Return the value of an element */
CciInt ImportExportPrefix ImportExportSuffix cpiElementIntegerValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of an element */
CciReal ImportExportPrefix ImportExportSuffix cpiElementRealValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementCharacterValue(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of an element */
struct CciDate ImportExportPrefix ImportExportSuffix cpiElementDateValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of an element */
struct CciTime ImportExportPrefix ImportExportSuffix cpiElementTimeValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementByteArrayValue(
  int*                 returnCode, 
  CciElement*          targetElement,
  const struct CciByteArray* value
);

/* Return the value of an element */
struct CciTimestamp ImportExportPrefix ImportExportSuffix cpiElementTimestampValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of an element */
struct CciTimestamp ImportExportPrefix ImportExportSuffix cpiElementGmtTimestampValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of an element */
struct CciTime ImportExportPrefix ImportExportSuffix cpiElementGmtTimeValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementDecimalValue(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of an element */
CciSize ImportExportPrefix ImportExportSuffix cpiElementBitArrayValue(
  int*                      returnCode, 
  CciElement*               targetElement,
  const struct CciBitArray* value
);

/* Return the "complete previous" attribute of an element */
CciBool ImportExportPrefix ImportExportSuffix cpiElementCompletePrevious(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the "complete next" attribute of an element */
CciBool ImportExportPrefix ImportExportSuffix cpiElementCompleteNext(
  int*        returnCode, 
  CciElement* targetElement
);

/* Add a sibling element before a target element */
void ImportExportPrefix ImportExportSuffix cpiAddBefore(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);

/* Add a sibling element after a target element */
void ImportExportPrefix ImportExportSuffix cpiAddAfter(
  int*        returnCode, 
  CciElement* targetElement, 
  CciElement* newElement
);

/* Add a sibling element as a first child of a target element */
void ImportExportPrefix ImportExportSuffix cpiAddAsFirstChild(
  int*        returnCode, 
  CciElement* targetElement,
  CciElement* newElement
);  

/* Add a sibling element as a last child of a target element */
void ImportExportPrefix ImportExportSuffix cpiAddAsLastChild(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);  

/* Return the parent element of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cpiParent(
  int*              returnCode,
  const CciElement* targetElement
);

/* Return the previous sibling of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cpiPreviousSibling(
  int*              returnCode, 
  const CciElement* targetElement
);

/* Return the next sibling of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cpiNextSibling(
  int*              returnCode, 
  const CciElement* targetElement
);

/* Return the first child of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cpiFirstChild(
  int*              returnCode,
  const CciElement* targetElement
);

/* Return the last child of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cpiLastChild(
  int*              returnCode,
  const CciElement* targetElement
);

/* Set the name attribute of an element from a buffer */
void ImportExportPrefix ImportExportSuffix cpiSetNameFromBuffer(
  int*           returnCode,
  CciElement*    targetElement, 
  const CciChar* name,
  CciSize        length
);

/* Set the value attribute of an element from a buffer */
void ImportExportPrefix ImportExportSuffix cpiSetCharacterValueFromBuffer(
  int*           returnCode,
  CciElement*    targetElement, 
  const CciChar* value,
  CciSize        length
);

#ifdef __cplusplus
}
#endif

#endif

