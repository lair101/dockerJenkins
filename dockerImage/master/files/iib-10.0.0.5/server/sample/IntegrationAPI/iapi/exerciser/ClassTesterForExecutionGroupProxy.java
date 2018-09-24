/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2004.                     
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

import com.ibm.broker.config.proxy.AdminQueueEntry;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.DeployResult;
import com.ibm.broker.config.proxy.DeployedObject;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.ResourceManagerProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;

/*****************************************************************************
 * <p>Each ExecutionGroup object represents an execution
 * group for a single integration node. 
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take a ExecutionGroupProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy b = BrokerProxy.getLocalInstance("TESTNODE");
 * ExecutionGroupProxy e = b.getExecutionGroupByName("eg1");
 * </pre>
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForExecutionGroupProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test ExecutionGroupProxy APIs
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
 * 25103.7  2004-03-18  HDMPL           v6 Release
 * 35108.6  2006-01-24  HDMPL           Support for 64-bit execution groups
 * 80006.1  2011-02-02  HDCAB           v8 Release:
 *                                        Added support for applications and libraries
 *                                        Added support for resource managers
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForExecutionGroupProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForExecutionGroupProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForExecutionGroupProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the commands to change
     * eg properties
     * @param object Selected AdministeredObject
     * @param newName New name of the object
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    public void testModifyEGProperties(ExecutionGroupProxy object,
                                        String newName,
                                        String shortDesc,
                                        String longDesc) throws ConfigManagerProxyLoggedException {

        ClassTesterForAdministeredObject.testModifyStandardProperties(exerciser, object, newName, shortDesc, longDesc);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Asks the integration node to start the integration server's 
     * process. 
     * @param eg Selected ExecutionGroupProxy object
     */
    public void testStartEG(ExecutionGroupProxy eg) throws ConfigManagerProxyLoggedException {    
        eg.start();
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Asks the integration node to stop the integration server's 
     * process. 
     * @param eg Selected ExecutionGroupProxy object
     */
    public void testStopEG(ExecutionGroupProxy eg) throws ConfigManagerProxyLoggedException {
        eg.stop();
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Gives a quick test of the Configuration Manager Proxy's deployment
     * functionality.
     * @param eg
     * @param barfile
     */
    public void testDeployBAR(ExecutionGroupProxy eg, String barfile) {
        try {
            boolean isSynchronous = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (isSynchronous) {
                DeployResult ds = eg.deploy(barfile,
                        ResourcesHandler.getUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, true),
                        1000*ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30));
                exerciser.reportDeployResult(ds);
            } else {
                eg.deploy(barfile,
                        ResourcesHandler.getUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, true),
                        AttributeConstants.DEPLOYRESULT_SUPPRESSION);
                exerciser.reportActionSubmitted();
            }
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's start
     * applications functionality. 
     * @param eg
     */
    public void testStartApplications(ExecutionGroupProxy eg) {
        try {
            eg.startApplications();
            exerciser.reportActionSubmitted();
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's stop
     * applications functionality. 
     * @param eg
     */
    public void testStopApplications(ExecutionGroupProxy eg) {
        try {
            eg.stopApplications();
            exerciser.reportActionSubmitted();
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's start
     * application functionality. 
     * @param eg
     */
    public void testStartApplication(ApplicationProxy appl) {
        try {
            appl.start();
            exerciser.reportActionSubmitted();
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's stop
     * application functionality. 
     * @param eg
     */
    public void testStopApplication(ApplicationProxy appl) {
        try {
            appl.stop();
            exerciser.reportActionSubmitted();
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the Configuration Manager Proxy's deployment
     * deletion functionality.
     * @param eg
     * @param objectNamesToDelete deployed objects names to delete
     */
    public void testDeleteDeployed(ExecutionGroupProxy eg, String objectNamesToDelete) {
        try {
            String[] toDelete = objectNamesToDelete.split(";");
            boolean isSynchronous = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (isSynchronous) {
                DeployResult ds = eg.deleteDeployedObjectsByName(toDelete,
                		1000*ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30));
                exerciser.reportDeployResult(ds);
            } else {
                eg.deleteDeployedObjectsByName(toDelete, AttributeConstants.DEPLOYRESULT_SUPPRESSION);
                exerciser.reportActionSubmitted();
            }
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the setting of a runtime property.
     * @param eg Integration Server parent
     * @param propertyName Name of the object's property (e.g. "ComIbmJVMManager/maxJVMHeapSize")
     * @param propertyValue Value to give to the property (e.g. 10000000)
     */
    public void testSetRuntimeProperty(ExecutionGroupProxy eg, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        eg.setRuntimeProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the execute action on the Integration Server allowing
     * the passing in of semi colon delimited parameters and 
     * properties. 
     * @param eg A valid ExecutionGroupProxy
     * @param actionName name of the action to execute (e.g. Report) 
     * @param objectName name of the object on which to perform the 
     *                   action. (e.g. HTTPConnector)
     * @param propertyName Name of an action parameter (e.g. 
     *                     "recursive")
     * @param propertyValue Value of an action parameter (e.g. yes) 
                                                                    */
    public void testExecute(ExecutionGroupProxy eg, 
                            String actionName, 
                            String actionParametersStr, 
                            String objectName, 
                            String objectPropertiesStr) throws ConfigManagerProxyLoggedException {

        if(eg != null) {
            Properties actionParms = exerciser.delimitedStringToProperties(actionParametersStr, ";", "=");
            Properties objectProperties = exerciser.delimitedStringToProperties(objectPropertiesStr, ";", "=");

            AdminQueueEntry result = eg.execute(actionName, actionParms, objectName, objectProperties);
            exerciser.reportActionSubmitted();
            //Now we wait for the action to be completed by the integration node.
            if(result != null) {
              boolean executionCompleted = result.hasBeenCompletedByBroker(true);
              //Display the contents of the AdminQueueEntry
              exerciser.reportAdminQueueEntry(result);
            } 
        }
    }
    
    /**
     * Enables statistics for a given resource type.
     * @param eg Integration Server parent
     * @param resourceTypeName Name of the resource type, or the value of the
     * translated property ResourcesHandler.EG_RESOURCE_STATISTICS_ALL to signify
     * all resource types.
     */
    public void testEnableResourceTypeStats(ExecutionGroupProxy eg, String resourceTypeName) throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException {
        if (ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ALL).equals(resourceTypeName)) {
            // User selected "all", which means that null should be
            // supplied as the resourceType parameter to the
            // setResourceTypeStatisticsEnabled() method.
            resourceTypeName = null;
        }
        eg.setResourceStatisticsEnabled(resourceTypeName, true);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Disables statistics for a given resource type.
     * @param eg Integration Server parent
     * @param resourceTypeName Name of the resource type, or the value of the
     * translated property ResourcesHandler.EG_RESOURCE_STATISTICS_ALL to signify
     * all resource types.
     */
    public void testDisableResourceTypeStats(ExecutionGroupProxy eg, String resourceTypeName) throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException {
        if (ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ALL).equals(resourceTypeName)) {
            // User selected "all", which means that null should be
            // supplied as the resourceType parameter to the
            // setResourceTypeStatisticsEnabled() method.
            resourceTypeName = null;
        }
        eg.setResourceStatisticsEnabled(resourceTypeName, false);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Sets the debug port for the Integration Server 
     * @param eg Integration Server parent
     * @param newDebugPort New port value (or 0 to disable)
     */
    public void testSetDebugPort(ExecutionGroupProxy eg, String newDebugPort) throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException {
        try {
            int i = Integer.parseInt(newDebugPort);
            eg.setDebugPort(i);
            exerciser.reportActionSubmitted();
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESTART_NEEDED));
        } catch (NumberFormatException ex) {
            // User did not enter a number.
            exerciser.consoleLogger.logThrowing(ex);
        }
    }
    
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some ExecutionGroupProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param eg A valid ExecutionGroupProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(ExecutionGroupProxy eg, Properties p) {
        
        StringBuffer key;
        StringBuffer value;
        
        // ---------- run state ----------
        try {
            p.setProperty("isRunning()", ""+eg.isRunning());
            if (exerciser.getPropertyDisplayLevel()>0) {
                
                // ---------- configuration ----------
                try {
                    p.setProperty("getQueues()", ""+IntegrationAPIExerciser.formatStringArray(eg.getQueues()));
                    p.setProperty("getNodeTypes()", ""+IntegrationAPIExerciser.formatStringArray(eg.getNodeTypes()));
                    p.setProperty("isRunEnabled()", ""+eg.isRunEnabled());
                    p.setProperty("getDebugPort()", ""+eg.getDebugPort());
                    p.setProperty("isDebugPortActive()", ""+eg.isDebugPortActive());
                    p.setProperty("getDeployedPolicySetNames()", IntegrationAPIExerciser.formatObjectArray(eg.getDeployedPolicySetNames()));
                    p.setProperty("getDeployedPolicySetBindingsNames()", IntegrationAPIExerciser.formatObjectArray(eg.getDeployedPolicySetBindingsNames()));
                        // In order to work with policy set names and bindings, applications might
                        // want to query individual parameters through the MessageFlowProxy.PolicySetName
                        // and MessageFlowProxy.PolicySetBindingsName objects rather than simply calling
                        // toString() on the returned object, which is effectively what we're doing here!
                } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                    exerciser.consoleLogger.logThrowing(ex);
                }

                // ---------- Display application and library information ----------
                try {

                    // ---------- Display Libraries ----------
                    key = new StringBuffer("getApplications(null)");
                    value = new StringBuffer();
                    Enumeration<ApplicationProxy> e = eg.getApplications(null);
                
                    if (e == null) {
                      value.append(""+e);
                    } else {
                      int count = 0;
                      while (e.hasMoreElements()) {
                         count++;
                         key.append("\n    ["+count+"]");
                         value.append("\n");
                         ApplicationProxy currentApplication = (ApplicationProxy)e.nextElement();
                         value.append(IntegrationAPIExerciser.formatAdminObject(currentApplication));
                         /* String stringValue = "unknown (null)";
                         if(currentApplication != null) 
                         {
                           stringValue = currentApplication.getName();
                         }
                         value.append(stringValue); */
                      }
                    }
                    p.setProperty(""+key, ""+value);

                   } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                      exerciser.consoleLogger.logThrowing(ex);
                   }

                try {
                    // ---------- Display Libraries ----------
                    key = new StringBuffer("getLibraries(null)");
                    value = new StringBuffer();
                    Enumeration<LibraryProxy> e = eg.getLibraries(null);
                
                    if (e == null) {
                      value.append(""+e);
                    } else {
                      int count = 0;
                      while (e.hasMoreElements()) {
                         count++;
                         key.append("\n    ["+count+"]");
                         value.append("\n");
                         LibraryProxy currentLibrary = (LibraryProxy)e.nextElement();
                         value.append(IntegrationAPIExerciser.formatAdminObject(currentLibrary));
                         /*String stringValue = "unknown (null)";
                         if(currentApplication != null) 
                         {
                           stringValue = currentApplication.getName();
                         }
                         value.append(stringValue); */
                      }
                    }
                    p.setProperty(""+key, ""+value);

                   } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                      exerciser.consoleLogger.logThrowing(ex);
                   }


                   // ---------- Display message flows ----------
                   try {
                      setMessageFlowEnumerationProperties(eg.getMessageFlows(null), p);
                   } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                      exerciser.consoleLogger.logThrowing(e1);
                   }

                   // ---------- Display subflows ----------
                   try {
                      setSubFlowEnumerationProperties(eg.getSubFlows(null), p);
                   } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                      exerciser.consoleLogger.logThrowing(e1);
                   }

                   // ---------- Display resource managers ----------
                   try {
                      setResourceManagerEnumerationProperties(eg.getResourceManagers(null), p);
                   } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                      exerciser.consoleLogger.logThrowing(e1);
                   }
                
                //----------- Display runtime properties -----------
                String[] runtimeProperties = eg.getRuntimePropertyNames();
                key = new StringBuffer("getRuntimePropertyNames()");
                value = new StringBuffer();
                if (runtimeProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : runtimeProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+eg.getRuntimeProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);
                
                // ----------- Resource Types -----------
                p.setProperty("getResourceStatisticsEnabled(any)",
                        ""+eg.getResourceStatisticsEnabled(null));
                String[] resTypeNames = ((BrokerProxy)eg.getParent()).getResourceTypeNames();
                if (resTypeNames != null) {
                    for (String thisResType : resTypeNames) {
                        p.setProperty("getResourceStatisticsEnabled(\""+thisResType+"\")",
                                ""+eg.getResourceStatisticsEnabled(thisResType));
                    }
                }
            }
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
        
        
        // ---------- Message Flow Dependencies ----------
        // Could also use getMessageFlows(), getMessageSets() or
        // getDeployedObjects() for similar information.
        try {
          setDeployedObjectEnumerationProperties(eg.getMessageFlowDependencies(), "getMessageFlowDependencies()", p);
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

/**
 * Adds to the supplied Properties table a set of key/value pairs that
 * describe a resource manager enumeration.
 * @param rmEnum an enumeration containing ResourceManagerProxy 
 *                 objects
 * @param p A valid Properties object
 */
public void setResourceManagerEnumerationProperties(Enumeration<ResourceManagerProxy> rmEnum, Properties p) {

        StringBuffer key;
        StringBuffer value;

        // ---------- Display message flows ----------
        key = new StringBuffer("getResourceManagers()");
        value = new StringBuffer();
                
        if (rmEnum == null) {
          value.append(""+rmEnum);
        } else {
          int count = 0;
          while (rmEnum.hasMoreElements()) {
            count++;
            key.append("\n    ["+count+"]");
            value.append("\n");
            ResourceManagerProxy rm = (ResourceManagerProxy)rmEnum.nextElement();
            value.append(IntegrationAPIExerciser.formatAdminObject(rm));
          }
        }
        p.setProperty(""+key, ""+value);
}
    
}
