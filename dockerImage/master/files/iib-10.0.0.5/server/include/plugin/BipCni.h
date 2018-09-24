/*
 * Licensed Materials - Property of IBM
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 * (C) Copyright IBM Corp. 1999, 2000
*/

#ifndef BipCni_h
#define BipCni_h
#ifdef __cplusplus
extern "C" {
#endif

#include <BipCci.h>

/******************************************************************************/
/*                                                                            */
/* C Node Interface Public Implementation functions                           */
/*                                                                            */
/* These are functions which must be implemented by node implementations      */
/*                                                                            */
/******************************************************************************/

/* Create any plug-in context for an instance of a node object */
CciContext* cniCreateNodeContext(
  CciFactory* factoryObject, 
  CciChar*    nodeName, 
  CciNode*    nodeObject
);

/* Delete any plug-in context for an instance of a node object */
void cniDeleteNodeContext(
  CciContext* context
);

/* Get the name of a node attribute using an index */
/*this version is deprecated. cniGetAttributeName2 should be implemented instead*/
int cniGetAttributeName(
  CciContext* context, 
  int         index,
  CciChar*    buffer,
  int         bufsize
);

/* Get the name of a node attribute using an index */
CciSize cniGetAttributeName2(
  int*        returnCode,
  CciContext* context, 
  CciChar*    attrName,
  CciChar*    buffer,
  int         bufsize
);

/* Set the value of an attribute on a specific node instance */
int cniSetAttribute(
  CciContext* context, 
  CciChar*    attrName, 
  CciChar*    attrValue
);

/* Get the value of an attribute on a specific node instance */
/*this version is deprecated. cniGetAttribute2 should be implemented instead*/
int cniGetAttribute(
  CciContext* context, 
  CciChar*    attrName,
  CciChar*    buffer,
  int         bufsize
);

/* Get the value of an attribute on a specific node instance */
CciSize cniGetAttribute2(
  int*        returnCode,
  CciContext* context, 
  CciChar*    attrName,
  CciChar*    buffer,
  int         bufsize
);

/* Perform node processing */
void cniEvaluate(
  CciContext* context, 
  CciMessage* destinationList,
  CciMessage* exceptionList, 
  CciMessage* message
);

/* Input node run function */
int cniRun(
  CciContext* context, 
  CciMessage* destinationList,
  CciMessage* exceptionList, 
  CciMessage* message
);

/******************************************************************************/
/*                                                                            */
/* C Node Interface Public Utility functions                                  */
/*                                                                            */
/* These are functions which may be used by node implementations              */
/*                                                                            */
/******************************************************************************/

/* Create a new plug-in node factory */
CciFactory ImportExportPrefix * ImportExportSuffix cniCreateNodeFactory(
  int*     returnCode,
  CciChar* name
);

/* Define a node to the plug-in node factory */
void ImportExportPrefix ImportExportSuffix cniDefineNodeClass(
  int*        returnCode,
  CciFactory* factoryObject, 
  CciChar*    name, 
  CNI_VFT*    functbl
);

/* Add an input terminal to a node instance */
CciTerminal ImportExportPrefix * ImportExportSuffix cniCreateInputTerminal(
  int*     returnCode,
  CciNode* nodeObject, 
  CciChar* name
);

/* Add an output terminal to a node instance */
CciTerminal ImportExportPrefix * ImportExportSuffix cniCreateOutputTerminal(
  int*     returnCode,
  CciNode* nodeObject, 
  CciChar* name
);

/* Check if a terminal is attached to a connector */
int ImportExportPrefix ImportExportSuffix cniIsTerminalAttached(
  int*         returnCode,
  CciTerminal* terminalObject
);

/* Propagate a message to a named terminal on the node instance */
int ImportExportPrefix ImportExportSuffix cniPropagate(
  int*         returnCode,
  CciTerminal* terminalObject,  
  CciMessage*  destinationList,
  CciMessage*  exceptionList,
  CciMessage*  message
);

/* Get a pointer to the buffer associated with a message */
const CciByte ImportExportPrefix * ImportExportSuffix cniBufferPointer(
  int*        returnCode, 
  CciMessage* message
);

/* Get the size of the buffer associated with a message */
CciSize ImportExportPrefix ImportExportSuffix cniBufferSize(
  int*        returnCode,
  CciMessage* message
);

/* Get a byte from the buffer associated with a message */
CciByte ImportExportPrefix ImportExportSuffix cniBufferByte(
  int*        returnCode,
  CciMessage* message,
  CciSize     index
);

/* Create a message object */
CciMessage ImportExportPrefix * ImportExportSuffix cniCreateMessage(
  int*               returnCode,
  CciMessageContext* messageContext
);

/* Get the message context associated with a given message */
CciMessageContext ImportExportPrefix * ImportExportSuffix cniGetMessageContext(
  int*        returnCode,
  CciMessage* message
);

/* Delete a message object */
void ImportExportPrefix ImportExportSuffix cniDeleteMessage(
  int*        returnCode,
  CciMessage* message
);						 

/* Get the root element for a message */
CciElement ImportExportPrefix * ImportExportSuffix cniRootElement(
  int*        returnCode,
  CciMessage* message
);

/* Create an element before the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementBefore(
  int*        returnCode,
  CciElement* targetElement
);

/* Create an element before the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementBeforeUsingParser(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* parserClassName
);

/* Create an element after the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAfter(
  int*        returnCode,
  CciElement* targetElement
);

/* Create an element after the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAfterUsingParser(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* parserClassName
);

/* Create an element as a first child of the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAsFirstChild(
  int*        returnCode,
  CciElement* targetElement
);

/* Create an element as a first child of the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAsFirstChildUsingParser(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* parserClassName
);

/* Create an element as a last child of the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAsLastChild(
  int*        returnCode,
  CciElement* targetElement
);

/* Create an element as a last child of the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAsLastChildUsingParser(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* parserClassName
);

/* Create an element as a last child of the specified element */
CciElement ImportExportPrefix * ImportExportSuffix cniCreateElementAsLastChildFromBitstream (
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciByteArray* value,
  const CciChar*             parserClassName,
  CciChar*                   messageType,
  CciChar*                   messageSet,
  CciChar*                   messageFormat,
  int                        encoding,
  int                        ccsid,
  int                        options);

/* Get the parser class name for a specified element */
CciSize ImportExportPrefix ImportExportSuffix cniGetParserClassName(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Add an element before a target element */
void ImportExportPrefix ImportExportSuffix cniAddBefore(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);

/* Add an element after a target element */
void ImportExportPrefix ImportExportSuffix cniAddAfter(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);

/* Add an element as a first child of a target element */
void ImportExportPrefix ImportExportSuffix cniAddAsFirstChild(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);
  
/* Add an element as a last child of a target element */
void ImportExportPrefix ImportExportSuffix cniAddAsLastChild(
  int*        returnCode,
  CciElement* targetElement,
  CciElement* newElement
);
  
/* Detach the target element */
void ImportExportPrefix ImportExportSuffix cniDetach(
  int*        returnCode, 
  CciElement* targetElement
);

/* Delete the target element */
void ImportExportPrefix ImportExportSuffix cniDelete(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the parent of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cniParent(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the previous sibling of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cniPreviousSibling(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the next sibling of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cniNextSibling(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the first child of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cniFirstChild(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the last child of a target element */
CciElement ImportExportPrefix * ImportExportSuffix cniLastChild(
  int*        returnCode,
  CciElement* targetElement
);

/* Set the type attribute of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementType(
  int*           returnCode,
  CciElement*    targetElement,
  CciElementType type
);

/* Set the name attribute of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementName(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* name
);

/* Set the namespace attribute of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementNamespace(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* nameSpace
);

/* Set the value attribute of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementValueValue(
  int*             returnCode, 
  CciElement*      targetElement,
  CciElementValue* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementBooleanValue(
  int*        returnCode,
  CciElement* targetElement,
  CciBool     value
);

/* Set the value of a target element to null */
void ImportExportPrefix ImportExportSuffix cniSetElementNullValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementIntegerValue(
  int*        returnCode,
  CciElement* targetElement,
  CciInt      value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementRealValue(
  int*        returnCode,
  CciElement* targetElement,
  CciReal     value);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementCharacterValue(
  int*           returnCode, 
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementDateValue(
  int*                  returnCode, 
  CciElement*           targetElement,
  const struct CciDate* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementTimeValue(
  int*                  returnCode,
  CciElement*           targetElement,
  const struct CciTime* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementByteArrayValue(
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciByteArray* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementTimestampValue(
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciTimestamp* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementGmtTimestampValue(
  int*                       returnCode,
  CciElement*                targetElement,
  const struct CciTimestamp* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementGmtTimeValue(
  int*                  returnCode,
  CciElement*           targetElement,
  const struct CciTime* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementDecimalValue(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value
);

/* Set the value of a target element */
void ImportExportPrefix ImportExportSuffix cniSetElementBitArrayValue(
  int*                      returnCode, 
  CciElement*               targetElement, 
  const struct CciBitArray* value
);

/* Return the type attribute of a target element */
CciElementType ImportExportPrefix ImportExportSuffix cniElementType(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the name attribute of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementName(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the namespace attribute of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementNamespace(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of a target element */
const CciElementValue ImportExportPrefix * ImportExportSuffix cniElementValueValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of a target element */
CciBool ImportExportPrefix ImportExportSuffix cniElementBooleanValue(
  int*        returnCode,
  CciElement* targetElement
); 

/* Return the value of a target element */
CciInt ImportExportPrefix ImportExportSuffix cniElementIntegerValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of a target element */
CciReal ImportExportPrefix ImportExportSuffix cniElementRealValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementCharacterValue(
  int*           returnCode, 
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of a target element */
struct CciDate ImportExportPrefix ImportExportSuffix cniElementDateValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of a target element */
struct CciTime ImportExportPrefix ImportExportSuffix cniElementTimeValue(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the value of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementByteArrayValue(
  int*                       returnCode, 
  CciElement*                targetElement,
  const struct CciByteArray* value
);

/* Return the value of a target element */
struct CciTimestamp ImportExportPrefix ImportExportSuffix cniElementTimestampValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of a target element */
struct CciTimestamp ImportExportPrefix ImportExportSuffix cniElementGmtTimestampValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of a target element */
struct CciTime ImportExportPrefix ImportExportSuffix cniElementGmtTimeValue(
  int*        returnCode, 
  CciElement* targetElement
);

/* Return the value of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementDecimalValue(
  int*           returnCode,
  CciElement*    targetElement,
  const CciChar* value,
  CciSize        length
);

/* Return the value of a target element */
CciSize ImportExportPrefix ImportExportSuffix cniElementBitArrayValue(
  int*                      returnCode, 
  CciElement*               targetElement,
  const struct CciBitArray* value
);

/*Return the bitstream representation of the target element*/
CciSize ImportExportPrefix ImportExportSuffix cniElementAsBitstream(
  int*                       returnCode,
  CciElement*                element,
  const struct CciByteArray* value,
  CciChar*                   messageType,
  CciChar*                   messageSet,
  CciChar*                   messageFormat,
  int                        encoding,
  int                        ccsid,
  int                        options);

/* Copy part of an element tree to a target element */
void ImportExportPrefix ImportExportSuffix cniCopyElementTree(
  int*        returnCode,
  CciElement* sourceElement,
  CciElement* targetElement
);

/* Search the previous sibling chain for a matching element */ 
CciElement ImportExportPrefix * ImportExportSuffix cniSearchPreviousSibling(
  int*           returnCode,
  CciElement*    targetElement,
  CciCompareMode mode,
  CciElementType type,
  CciChar*       name
);

/* Search the previous sibling chain for a matching element in a specified namespace*/ 
CciElement ImportExportPrefix * ImportExportSuffix cniSearchPreviousSiblingInNamespace(
  int*           returnCode,
  CciElement*    targetElement,
  CciCompareMode mode,
  CciChar*       nameSpace,
  CciChar*       name,
  CciElementType type
);

/* Search the next sibling chain for a matching element */
CciElement ImportExportPrefix * ImportExportSuffix cniSearchNextSibling(
  int*           returnCode, 
  CciElement*    targetElement,
  CciCompareMode mode,
  CciElementType type,
  CciChar*       name
);

/* Search the next sibling chain for a matching element in a specified namespace*/ 
CciElement ImportExportPrefix * ImportExportSuffix cniSearchNextSiblingInNamespace(
  int*           returnCode, 
  CciElement*    targetElement,
  CciCompareMode mode,
  CciChar*       nameSpace,
  CciChar*       name,
  CciElementType type
);

/* Search the sibling chain from the first child for a matching element */
CciElement ImportExportPrefix * ImportExportSuffix cniSearchFirstChild(
  int*           returnCode, 
  CciElement*    targetElement,
  CciCompareMode mode,
  CciElementType type,
  CciChar*       name
);

/* Search the sibling chain from the first child for a matching element in a specified namespace*/ 
CciElement ImportExportPrefix * ImportExportSuffix cniSearchFirstChildInNamespace(
  int*           returnCode, 
  CciElement*    targetElement,
  CciCompareMode mode,
  CciChar*       nameSpace,
  CciChar*       name,
  CciElementType type
);

/* Search the sibling chain from the last child for a matching element */
CciElement ImportExportPrefix * ImportExportSuffix cniSearchLastChild(
  int*           returnCode,
  CciElement*    targetElement,
  CciCompareMode mode,
  CciElementType type,
  CciChar*       name
);

/* Search the sibling chain from the last child for a matching element in a specified namespace*/
CciElement ImportExportPrefix * ImportExportSuffix cniSearchLastChildInNamespace(
  int*           returnCode, 
  CciElement*    targetElement,
  CciCompareMode mode,
  CciChar*       nameSpace,
  CciChar*       name,
  CciElementType type
);

/* Return the type attribute of the value of a target element */
CciValueType ImportExportPrefix ImportExportSuffix cniElementValueType(
  int*        returnCode,
  CciElement* targetElement
);

/* Return the state attribute of the value of a target element */
CciValueState ImportExportPrefix ImportExportSuffix cniElementValueState(
  int*        returnCode,
  CciElement* targetElement
);

/* Finalize a message for further processing */
void ImportExportPrefix ImportExportSuffix cniFinalize(
  int*        returnCode,
  CciMessage* message,
  int         options
);

/* Write the syntax element tree for a message into the bitstream */
void ImportExportPrefix ImportExportSuffix cniWriteBuffer(
  int*        returnCode,
  CciMessage* message
);

/* Create an SQL statement */
CciSqlExpression ImportExportPrefix * ImportExportSuffix cniSqlCreateStatement( 
  int*              returnCode,
  CciNode*          nodeObject,
  CciChar*          dataSourceName,
  CciSqlTransaction transaction,
  CciChar*          statement
);

/* Execute an SQL expression */
void ImportExportPrefix ImportExportSuffix cniSqlExecute(
  int*              returnCode,
  CciSqlExpression* sqlExpression,
  CciMessage*       destinationList,
  CciMessage*       exceptionList,
  CciMessage*       message
);

/* Execute an SQL expression */
void ImportExportPrefix ImportExportSuffix cniSqlSelect(
  int*              returnCode,
  CciSqlExpression* sqlExpression,
  CciMessage*       destinationList,
  CciMessage*       exceptionList,
  CciMessage*       message,
  CciMessage*       outputMessage
);

/* Delete an SQL statement */
void ImportExportPrefix ImportExportSuffix cniSqlDeleteStatement(
  int*              returnCode,
  CciSqlExpression* sqlExpression
);

/* Return information on broker environment */
void ImportExportPrefix ImportExportSuffix cniGetBrokerInfo(
  int*                returnCode,
  CciNode*            nodeObject,
  CNI_BROKER_INFO_ST* broker_info_st
);

/* Get the environment for a message */
CciMessage ImportExportPrefix * ImportExportSuffix cniGetEnvironmentMessage(
  int*        returnCode,
  CciMessage* message 
);

/* Set the input buffer for receipt of input data */
void ImportExportPrefix ImportExportSuffix cniSetInputBuffer(
  int*        returnCode,
  CciMessage* message,
  void*       data,
  CciInt      length
);

/* Dispatch a thread from the message flow thread pool */
int ImportExportPrefix ImportExportSuffix cniDispatchThread( 
  int*     returnCode,
  CciNode* nodeObject
);

/* Creates a non-modifiable ESQL Path Expression */
CciSqlPathExpression ImportExportPrefix * ImportExportSuffix cniSqlCreateReadOnlyPathExpression( 
  int* returnCode,
  CciNode* nodeObject,
  CciChar* dataSourceName,
  CciChar* path
);

/* Creates a modifiable ESQL Path Expression */
CciSqlPathExpression ImportExportPrefix * ImportExportSuffix cniSqlCreateModifiablePathExpression( 
  int* returnCode,
  CciNode* nodeObject,
  CciChar* dataSourceName,
  CciChar* path
);


/* Navigates an ESQL Path Expression */
CciElement ImportExportPrefix * ImportExportSuffix cniSqlNavigatePath( 
  int* returnCode,
  CciSqlPathExpression* sqlPathExpression,
  CciMessage* inputMessageRoot,
  CciMessage* inputLocalEnvironment,
  CciMessage* inputExceptionList,       
  CciMessage* outputMessageRoot,
  CciMessage* outputLocalEnvironment,
  CciMessage* outputExceptionList
);

/* Deletes an ESQL Path Expression */
void ImportExportPrefix ImportExportSuffix cniSqlDeletePathExpression( 
  int* returnCode,
  CciSqlPathExpression* sqlPathExpression 
);

/* Acquire a thread context for this thread from a message context */
CciThreadContext ImportExportPrefix * ImportExportSuffix cniGetThreadContext( 
  int*               returnCode,
  CciMessageContext* messageContext
);

/* Create an XPath expression object */
CciXPath ImportExportPrefix * ImportExportSuffix cniCreateXPath(
  int* returnCode,
  const CciChar* expression,
  CciNamespaceBindings* namespaceBindings
);

/* Delete an XPath expression object */
void ImportExportPrefix ImportExportSuffix cniDeleteXPath(
  int* returnCode,
  CciXPath* xpath
);

/* Set the namespace bindings on an XPath expression object */
void ImportExportPrefix ImportExportSuffix cniXPathSetNamespaceBindings(
  int* returnCode,
  CciXPath* xpath,
  CciNamespaceBindings* namespaceBindings
);

/* Create an object to hold namespace bindings */
CciNamespaceBindings ImportExportPrefix * ImportExportSuffix cniCreateNamespaceBindings(
  int* returnCode
);

/* Delete an object that holds namespace bindings */
void ImportExportPrefix ImportExportSuffix cniDeleteNamespaceBindings(
  int* returnCode,
  CciNamespaceBindings* namespaceBindings
);

/* Add a new namespace binding to an object that holds namespace bindings */
void ImportExportPrefix ImportExportSuffix cniNamespaceBindingsAddBinding(
  int* returnCode,
  CciNamespaceBindings* namespaceBindings,
  const CciChar* prefix,
  const CciChar* uri
);

/* Remove an existing namespace binding from an object that holds namespace bindings */
void ImportExportPrefix ImportExportSuffix cniNamespaceBindingsRemoveBinding(
  int* returnCode,
  CciNamespaceBindings* namespaceBindings,
  const CciChar* prefix
);

/* Set the default namespace on an object that holds namespace bindings */
void ImportExportPrefix ImportExportSuffix cniNamespaceBindingsSetDefaultNamespace(
  int* returnCode,
  CciNamespaceBindings* namespaceBindings,
  const CciChar* uri
);

/* Create an object to hold XPath variable bindings */
CciXPathVariables ImportExportPrefix * ImportExportSuffix cniCreateXPathVariables(
  int* returnCode
);

/* Delete an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniDeleteXPathVariables(
  int* returnCode,
  CciXPathVariables* xpathVariables
);

/* Assign a boolean variable to an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesAssignBoolean(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable,
  CciBool value
);

/* Assign a real variable to an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesAssignReal(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable,
  CciReal value
);

/* Assign a character variable to an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesAssignCharacter(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable,
  const CciChar* value
);

/* Assign an element variable to an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesAssignElement(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable,
  CciElement* value
);

/* Assign a multiple elements variable to an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesAssignElements(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable,
  CciElement** values,
  CciSize numValues
);

/* Remove all variables from an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesRemoveAll(
  int* returnCode,
  CciXPathVariables* xpathVariables
);

/* Remove a variable from an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesRemove(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  const CciChar* variable
);

/* Set the root element on an object that holds XPath variable bindings */
void ImportExportPrefix ImportExportSuffix cniXPathVariablesSetRootElement(
  int* returnCode,
  CciXPathVariables* xpathVariables,
  CciElement* rootElement
);

/* Evaluate an XPath expression on an element using an XPath expression object */
CciXPathValue ImportExportPrefix * ImportExportSuffix cniElementEvaluateXPath(
  int* returnCode,
  CciElement* element,
  CciXPath* xpath,
  CciXPathVariables* xpathVariables
);

/* Evaluate an XPath expression on an element using an XPath expression string */
CciXPathValue ImportExportPrefix * ImportExportSuffix cniElementEvaluateXPathExpression(
  int* returnCode,
  CciElement* element,
  const CciChar* xpathExpression,
  CciNamespaceBindings* namespaceBindings,
  CciXPathVariables* xpathVariables
);

/* Evaluate an XPath expression on a message using an XPath expression object */
CciXPathValue ImportExportPrefix * ImportExportSuffix cniMessageEvaluateXPath(
  int* returnCode,
  CciMessage* message,
  CciXPath* xpath,
  CciXPathVariables* xpathVariables
);

/* Evaluate an XPath expression on a message using an XPath expression string */
CciXPathValue ImportExportPrefix * ImportExportSuffix cniMessageEvaluateXPathExpression(
  int* returnCode,
  CciMessage* message,
  const CciChar* xpathExpression,
  CciNamespaceBindings* namespaceBindings,
  CciXPathVariables* xpathVariables
);

/* Delete the result of evaluating an XPath expression */
void ImportExportPrefix ImportExportSuffix cniDeleteXPathValue(
  int* returnCode,
  CciXPathValue* xpathValue
);

/* Get the type of the value from the result of evaluating an XPath expression */
CciXPathValueType ImportExportPrefix ImportExportSuffix cniXPathValueType(
  int* returnCode,
  CciXPathValue* xpathValue
);

/* Get the real value from the result of evaluating an XPath expression */
CciBool ImportExportPrefix ImportExportSuffix cniXPathValueBooleanValue(
  int* returnCode,
  CciXPathValue* xpathValue
);

/* Get the real value from the result of evaluating an XPath expression */
CciReal ImportExportPrefix ImportExportSuffix cniXPathValueRealValue(
  int* returnCode,
  CciXPathValue* xpathValue
);

/* Get the character value from the result of evaluating an XPath expression */
CciSize ImportExportPrefix ImportExportSuffix cniXPathValueCharacterValue(
  int* returnCode,
  CciXPathValue* xpathValue,
  const CciChar* value,
  CciSize length
);

/* Get the size of the nodeset value from the result of evaluating an XPath expression */
CciSize ImportExportPrefix ImportExportSuffix cniXPathValueNodesetSize(
  int* returnCode,
  CciXPathValue* xpathValue
);

/* Get the nodeset value from the result of evaluating an XPath expression */
CciSize ImportExportPrefix ImportExportSuffix cniXPathValueNodesetValue(
  int* returnCode,
  CciXPathValue* xpathValue,
  CciElement** values,
  CciSize numValues
);

#ifdef __cplusplus
}
#endif

#endif

