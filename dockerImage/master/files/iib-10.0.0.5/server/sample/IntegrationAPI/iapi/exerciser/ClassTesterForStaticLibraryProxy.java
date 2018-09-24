/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2011.                     
 * All Rights Reserved * Licensed Materials - Property of IBM
 *
 * This sample program is provided AS IS and may be used, executed,
 * copied and modified without royalty payment by customer
 *
 * (a) for its own instruction and study,
 * (b) in order to develop applications designed to run with an IBM
 *     product, either for customer's own internal use or for
 *     redistribution by customer, as part of such an application, in
 *     customer's own products.
 */
package iapi.exerciser;

import iapi.common.ResourcesHandler;

import java.util.Enumeration;
import java.util.Properties;

import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.DeployResult;
import com.ibm.broker.config.proxy.DeployedObject;
import com.ibm.broker.config.proxy.DeployedObjectGroupProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;

/*****************************************************************************
 * <p>Each LibraryProxy object represents a library within a specific integration server.
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take an LibraryProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy b = BrokerProxy.getLocalInstance("TESTNODE");
 * ExecutionGroupProxy e = b.getExecutionGroupByName("eg1");
 * LibraryProxy library = e.getLibraryByName("library1");
 * </pre>
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForStaticLibraryProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test LibraryProxy APIs
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *       <LI><TT>cmp.ResourcesHandler</TT>
 *       <LI><TT>cmp.exerciser.IntegrationAPIExerciser</TT>
 *     </UL>
 *   </TD>
 * </TR>
 * </TABLE>
 * <pre>
 *
 * Change Activity:
 * -------- ----------- -------------   ------------------------------------
 * Reason:  Date:       Originator:     Comments:
 * -------- ----------- -------------   ------------------------------------
 * 80006.1  2011-02-02  HDCAB           v8 Release:
 *                                        Initial Creation
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForStaticLibraryProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForStaticLibraryProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForStaticLibraryProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the commands to change library 
     * properties 
     * @param object Selected AdministeredObject
     * @param newName New name of the object
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    public void testModifyLibraryProperties(LibraryProxy object,
                                            String newName,
                                            String shortDesc,
                                            String longDesc) throws ConfigManagerProxyLoggedException {

        ClassTesterForAdministeredObject.testModifyStandardProperties(exerciser, object, newName, shortDesc, longDesc);
        exerciser.reportActionSubmitted();
    }
       
    /**
     * Gives a quick test of the Configuration Manager Proxy's deployment
     * functionality.
     * @param lib
     * @param barfile
     */
    public void testDeployBAR(LibraryProxy lib, String barfile) {
        try {
            boolean isSynchronous = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (isSynchronous) {
                DeployResult ds = lib.deploy(barfile,
                        ResourcesHandler.getUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, true),
                        1000*ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30));
                exerciser.reportDeployResult(ds);
            } else {
                lib.deploy(barfile,
                        ResourcesHandler.getUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, true),
                        AttributeConstants.DEPLOYRESULT_SUPPRESSION);
                exerciser.reportActionSubmitted();
            }
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's deployment
     * deletion functionality.
     * @param lib
     * @param objectNamesToDelete deployed objects names to delete
     */
    public void testDeleteDeployed(LibraryProxy lib, String objectNamesToDelete) {
        try {
            String[] toDelete = objectNamesToDelete.split(";");
            boolean isSynchronous = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (isSynchronous) {
                DeployResult ds = lib.deleteDeployedObjectsByName(toDelete,
                		1000*ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30));
                exerciser.reportDeployResult(ds);
            } else {
                lib.deleteDeployedObjectsByName(toDelete, AttributeConstants.DEPLOYRESULT_SUPPRESSION);
                exerciser.reportActionSubmitted();
            }
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Attempts to remove the supplied library
     * This is a deploy action that requires a running integration 
     * node. 
     * @param object The library to be removed.
     */
    public void testDeleteLibrary(LibraryProxy object) {

        try {
            DeployedObjectGroupProxy parent = (DeployedObjectGroupProxy)object.getParent();
            boolean isSynchronous = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (isSynchronous) {
                DeployResult dr = parent.deleteDeployedObjectsByName(new String[] {object.getFullName()},
                        1000*ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30));
                exerciser.reportDeployResult(dr);
            } else {
                parent.deleteDeployedObjectsByName(new String[] {object.getFullName()}, AttributeConstants.DEPLOYRESULT_SUPPRESSION);
                exerciser.reportActionSubmitted();
            }
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the setting of a runtime property.
     * @param lib LibraryProxy parent
     * @param propertyName Name of the object's property (e.g. "ComIbmJVMManager/maxJVMHeapSize")
     * @param propertyValue Value to give to the property (e.g. 10000000)
     */
    public void testSetRuntimeProperty(LibraryProxy lib, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        lib.setRuntimeProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }
           
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some LibraryProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param lib valid LibraryProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(LibraryProxy lib, Properties p) {
        
        StringBuffer key;
        StringBuffer value;
        
        try {
            if (exerciser.getPropertyDisplayLevel()>0) {
                
                // ---------- configuration ----------
                try {
                    p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(lib.getExecutionGroup()));
                    p.setProperty("getDeployedObjectsCount()", ""+lib.getDeployedObjectsCount(null));
                    p.setProperty("getDeployTime()", ""+IntegrationAPIExerciser.formatDate(lib.getDeployTime()));
                    p.setProperty("getModifyTime()", ""+IntegrationAPIExerciser.formatDate(lib.getModifyTime()));
                    p.setProperty("getBARFileName()", ""+lib.getBARFileName());
                    p.setProperty("getFileExtension()", ""+lib.getFileExtension());
                    p.setProperty("getFullName()", ""+lib.getFullName());
                    p.setProperty("getVersion()", ""+lib.getVersion());

                    // Display the keywords for that object
                    value = new StringBuffer();
                    String[] keywords = lib.getKeywords();
                    if (keywords != null) {
                      for (int i=0; i<keywords.length; i++) {
                        if (i!=0) {
                          value.append(", ");
                        }
                        value.append(keywords[i]);
                      }
                    } else {
                      value.append(""+keywords);
                    }
                    p.setProperty("getKeywords()", value.toString());
        
                    // ------- Each keyword -------
                    if (keywords != null) {
                      for (int i=0; i<keywords.length; i++) {
                        p.setProperty("getKeywordValue(\""+keywords[i]+"\")", ""+lib.getKeywordValue(keywords[i]));
                      }
                    }

                    p.setProperty("getQueues()", ""+IntegrationAPIExerciser.formatStringArray(lib.getQueues()));
                    p.setProperty("getNodeTypes()", ""+IntegrationAPIExerciser.formatStringArray(lib.getNodeTypes()));
                    p.setProperty("getDeployedPolicySetNames()", IntegrationAPIExerciser.formatObjectArray(lib.getDeployedPolicySetNames()));
                    p.setProperty("getDeployedPolicySetBindingsNames()", IntegrationAPIExerciser.formatObjectArray(lib.getDeployedPolicySetBindingsNames()));
                    // In order to work with policy set names and bindings, libraries might
                    // want to query individual parameters through the MessageFlowProxy.PolicySetName
                    // and MessageFlowProxy.PolicySetBindingsName objects rather than simply calling
                    // toString() on the returned object, which is effectively what we're doing here!
                } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                    exerciser.consoleLogger.logThrowing(ex);
                }

                 // ---------- Display message flows ----------
                 try {
                    setMessageFlowEnumerationProperties(lib.getMessageFlows(null), p);
                 } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                    exerciser.consoleLogger.logThrowing(e1);
                 }

                 // ---------- Display subflows ----------
                 try {
                    setSubFlowEnumerationProperties(lib.getSubFlows(null), p);
                 } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                    exerciser.consoleLogger.logThrowing(e1);
                 }
                
                //----------- Display runtime properties -----------
                String[] runtimeProperties = lib.getRuntimePropertyNames();
                key = new StringBuffer("getRuntimePropertyNames()");
                value = new StringBuffer();
                if (runtimeProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : runtimeProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+lib.getRuntimeProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);
                //----------- Display deploy properties -----------
                Properties deployTimeProperties = lib.getDeployProperties();
                key = new StringBuffer("getDeployProperties()");
                value = new StringBuffer();
                if (deployTimeProperties == null) {
                    value.append("");
                } else {
                    Enumeration<?> propertyNames = deployTimeProperties.propertyNames();
                    while (propertyNames.hasMoreElements()) {
                        String thisPropertyName = (String)propertyNames.nextElement();
                        key.append("\n    "+thisPropertyName);
                        value.append("\n"+deployTimeProperties.getProperty(thisPropertyName));
                    }
                }
                p.setProperty(""+key, ""+value);
            }
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
        
        
        // ---------- Message Flow Dependencies ----------
        // Could also use getMessageFlows(), getMessageSets() or
        // getDeployedObjects() for similar information.
        try {
          setDeployedObjectEnumerationProperties(lib.getMessageFlowDependencies(), "getMessageFlowDependencies()", p);
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

/**
 * Adds to the supplied Properties table a set of key/value pairs that
 * describe a message flow enumeration.
 * @param flowEnum an enumeration containing MessageFlowProxy 
 *                 objects
 * @param p A valid Properties object
 */
public void setMessageFlowEnumerationProperties(Enumeration<MessageFlowProxy> flowEnum, Properties p) {

        // ---------- Display message flows ----------
        StringBuffer key = new StringBuffer("getMessageFlows()");
        StringBuffer value = new StringBuffer();
                
        if (flowEnum == null) {
          value.append(""+flowEnum);
        } else {
          int count = 0;
          while (flowEnum.hasMoreElements()) {
            count++;
            key.append("\n    ["+count+"]");
            value.append("\n");
            MessageFlowProxy mf = (MessageFlowProxy)flowEnum.nextElement();
            value.append(IntegrationAPIExerciser.formatAdminObject(mf));
          }
        }
        p.setProperty(""+key, ""+value);
}

/**
 * Adds to the supplied Properties table a set of key/value pairs that
 * describe a subflow enumeration.
 * @param subflowEnum an enumeration containing SubFlowProxy
 *                 objects
 * @param p A valid Properties object
 */
public void setSubFlowEnumerationProperties(Enumeration<SubFlowProxy> subflowEnum, Properties p) {

        // ---------- Display subflows ----------
        StringBuffer key = new StringBuffer("getSubFlows()");
        StringBuffer value = new StringBuffer();
          
        if (subflowEnum == null) {
          value.append(""+subflowEnum);
        } else {
          int count = 0;
          while (subflowEnum.hasMoreElements()) {
            count++;
            key.append("\n    ["+count+"]");
            value.append("\n");
            SubFlowProxy mf = (SubFlowProxy)subflowEnum.nextElement();
            value.append(IntegrationAPIExerciser.formatAdminObject(mf));
          }
        }
        p.setProperty(""+key, ""+value);
}

/**
 * Adds to the supplied Properties table a set of key/value pairs that
 * describe a deployed object enumeration
 * @param flowEnum an enumeration containing MessageFlowProxy 
 *                 objects
 * @param p A valid Properties object
 */
public void setDeployedObjectEnumerationProperties(Enumeration<DeployedObject> doEnum, String theGroupName, Properties p) 
{
    try {
        StringBuffer key;
        StringBuffer value;

        // ---------- Display message flows ----------
        key = new StringBuffer(theGroupName);
        value = new StringBuffer();
                
        if (doEnum == null) {
          value.append(""+doEnum);
        } else {
          int count = 0;
          while (doEnum.hasMoreElements()) {
            count++;
            DeployedObject dobj = (DeployedObject)doEnum.nextElement();
            key.append("\n    ["+count+"]");
            value.append("\n"+dobj.getFullName());
          }
        }

        p.setProperty(""+key, ""+value);
    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
        exerciser.consoleLogger.logThrowing(e);
    }
}

    
}
