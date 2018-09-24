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

import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;
import java.util.Vector;

import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AdminQueueProxy;
import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurationObjectType;
import com.ibm.broker.config.proxy.EventManagerProxy;
import com.ibm.broker.config.proxy.EventProxy;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.LogProxy;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.PolicyManagerProxy;
import com.ibm.broker.config.proxy.PolicyProxy;
import com.ibm.broker.config.proxy.ResourceManagerProxy;
import com.ibm.broker.config.proxy.RestApiProxy;
import com.ibm.broker.config.proxy.SharedLibraryProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;
import com.ibm.broker.config.proxy.WLMPolicyProxy;


/*****************************************************************************
 * <p>The AdministeredObject class is the superclass of all
 * objects managed by the integration node. This includes
 * all BrokerProxy, ExecutionGroupProxy, ApplicationProxy, LibraryProxy, SharedLibraryProxy,
 * MessageFlowProxy, SubFlowProxy, ResourceManagerProxy and LogProxy objects.
 * <p>As such, this class tester is used to test methods
 * common to all administered object instances.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForAdministeredObject</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test general AdministeredObject APIs
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
 * 51617    2009-02-17  HDMPL           v7 Release
 * 80006    2011-04-18  HDCAB           v8 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForAdministeredObject {

    /** GUI object to which the tester is linked */
    IntegrationAPIExerciser exerciser;

    /** BrokerProxy class tester to which the tester is linked */
    private ClassTesterForBrokerProxy classTesterBroker;
    /** LogProxy class tester to which the tester is linked */
    private ClassTesterForLogProxy classTesterLog;
    /** ActivityLogProxy class tester to which the tester is
     *  linked */
    private ClassTesterForActivityLogProxy classTesterActivityLog;
    /** AdminQueueProxy class tester to which the tester is linked */
    private ClassTesterForAdminQueueProxy classTesterAdminQueue;
    /** ExecutionGroupProxy class tester to which the tester is linked */
    private ClassTesterForExecutionGroupProxy classTesterEG;
    /** MessageFlowProxy class tester to which the tester is linked */
    private ClassTesterForMessageFlowProxy classTesterFlow;
    /** SubFlowProxy class tester to which the tester is linked */
    private ClassTesterForSubFlowProxy classTesterSubFlow;
    /** ApplicationProxy class tester to which the tester is
     *  linked */
    private ClassTesterForApplicationProxy classTesterApplication;
    /** RestApiProxy class tester to which the tester is
     *  linked */
    private ClassTesterForRestApiProxy classTesterRestApi;
    /** LibraryProxy class tester to which the tester is
     *  linked */
    private ClassTesterForStaticLibraryProxy classTesterLibrary;
    /** LibraryProxy class tester to which the tester is
     *  linked */
    private ClassTesterForSharedLibraryProxy classTesterSharedLibrary;
    /** ResourceManagerProxy class tester to which the tester is
     *  linked */
    private ClassTesterForResourceManagerProxy classTesterRM;
    /** PolicyManagerProxy class tester to which the tester is
     *  linked */
    private ClassTesterForPolicyManagerProxy classTesterPM;
    /** PolicyProxy class tester to which the tester is linked */
    private ClassTesterForPolicyProxy classTesterPolicy;
    /** EventManagerProxy class tester to which the tester is
     *  linked */
    private ClassTesterForEventManagerProxy classTesterEM;
    /** EventProxy class tester to which the tester is linked */
    private ClassTesterForEventProxy classTesterEvent;

    /**
     * Instantiates a new ClassTesterForAdministeredObject that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     * @param classTesterBroker
     * @param classTesterEG
     * @param classTesterFlow
     * @param classTesterLog
     * @param classTesterActivityLog
     * @param classTesterAdminQueue
     * @param classTesterApplication
     * @param classTesterRestApi
     * @param classTesterLibrary
     * @param classTesterSharedLibrary
     * @param classTesterRM
     * @param classTesterPM
     * @param classTesterPolicy
     * @param classTesterEM
     * @param classTesterEvent
     */
    ClassTesterForAdministeredObject(IntegrationAPIExerciser exerciser,
            ClassTesterForBrokerProxy classTesterBroker,
            ClassTesterForExecutionGroupProxy classTesterEG,
            ClassTesterForMessageFlowProxy classTesterFlow,
            ClassTesterForSubFlowProxy classTesterSubFlow,
            ClassTesterForLogProxy classTesterLog,
            ClassTesterForActivityLogProxy classTesterActivityLog,
            ClassTesterForAdminQueueProxy classTesterAdminQueue,
            ClassTesterForApplicationProxy classTesterApplication,
            ClassTesterForRestApiProxy classTesterRestApi,
            ClassTesterForStaticLibraryProxy classTesterLibrary,
            ClassTesterForSharedLibraryProxy classTesterSharedLibrary,
            ClassTesterForResourceManagerProxy classTesterRM,
            ClassTesterForPolicyManagerProxy classTesterPM,
            ClassTesterForPolicyProxy classTesterPolicy,
            ClassTesterForEventManagerProxy classTesterEM,
            ClassTesterForEventProxy classTesterEvent) {
        this.exerciser=exerciser;
        this.classTesterBroker = classTesterBroker;
        this.classTesterEG = classTesterEG;
        this.classTesterFlow = classTesterFlow;
        this.classTesterSubFlow = classTesterSubFlow;
        this.classTesterLog = classTesterLog;
        this.classTesterActivityLog = classTesterActivityLog;
        this.classTesterAdminQueue = classTesterAdminQueue;
        this.classTesterApplication = classTesterApplication;
        this.classTesterRestApi = classTesterRestApi;
        this.classTesterLibrary = classTesterLibrary;
        this.classTesterSharedLibrary = classTesterSharedLibrary;
        this.classTesterRM = classTesterRM;
        this.classTesterPM = classTesterPM;
        this.classTesterPolicy = classTesterPolicy;
        this.classTesterEM = classTesterEM;
        this.classTesterEvent = classTesterEvent;
    }

    /**
     * Tests the AdministeredObject refresh functionality.
     * @param obj
     */
    public void testRefresh(AdministeredObject obj) {
        try {
            obj.refresh();
            exerciser.reportActionSubmitted();
        } catch (Exception e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }

    /**
     * Displays in the log the complete property table for the current object.
     * @param obj
     */
    public void testShowRawPropertyTable(AdministeredObject obj) {
        try {
            StringBuffer props = new StringBuffer();
            Properties p = obj.getProperties();
            Enumeration<?> e = sortEnumeration(p.keys());
            while (e.hasMoreElements()) {
                String key = (String) e.nextElement();
                String value = p.getProperty(key);
                props.append("\n"+key+" = "+value);
            }
            exerciser.consoleLogger.logFine(props.toString());

            /*Properties p = obj.getProperties();
            Enumeration<?> e = sortEnumeration(p.keys());
            while (e.hasMoreElements()) {
                String key = (String) e.nextElement();
                String value = p.getProperty(key);
                exerciser.consoleLogger.logFine(key+" = "+value);
            }*/
        } catch (Exception e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }

    /**
     * Returns an Enumeration that is a logically sorted
     * version of the supplied Enumeration
     * @param e
     * @return Enumeration
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
	private Enumeration sortEnumeration(Enumeration e) {
    	Enumeration retVal = null;
    	try {
    		if (e != null) {
    			List list = Collections.list(e);
    			Collections.sort(list);
    			retVal = Collections.enumeration(list);
    		}
    	} catch (Exception ex) {
    	    exerciser.consoleLogger.logThrowing(ex);
        }
    	return retVal;
    }

    /**
     * Gives a quick test of the commands to change
     * an arbitrary administered object's properties
     * If any supplied value is null, the value will not be changed.
     * @param exerciser Handler (for logging capabilities)
     * @param object Selected AdministeredObject
     * @param newName New name
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    static void testModifyStandardProperties(IntegrationAPIExerciser exerciser,
            								 AdministeredObject object,
                                             String newName,
                                             String shortDesc,
                                             String longDesc) throws ConfigManagerProxyLoggedException {
        String oldName = "";
        String oldShortDesc = "";
        String oldLongDesc = "";

        try {
            oldName = object.getName();
            oldShortDesc = object.getShortDescription();
            oldLongDesc = object.getLongDescription();
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }

        if ((newName != null) && (!newName.equals(oldName))) {
            object.setName(newName);
        }

        if ((shortDesc != null) && (!shortDesc.equals(oldShortDesc))) {
            object.setShortDescription(shortDesc);
        }

        if ((longDesc != null) && (!longDesc.equals(oldLongDesc))) {
            object.setLongDescription(longDesc);
        }

    }


    /**
     * Populates the supplied Properties object with a set of key/value pairs that
     * describe some methods that may be invoked on the supplied
     * object, and the returned value from those methods.
     * @param obj
     * @return Properties
     */
    protected Properties discoverProperties(AdministeredObject obj, Properties p) {

        if (obj != null) {
            // Discover the properties that are found in every administered
            // object type

            // ---------- Misc info ----------
            p.setProperty("getConfigurationObjectType()", ""+IntegrationAPIExerciser.formatConfigurationObjectType(obj.getConfigurationObjectType()));
            p.setProperty("getUUID()", ""+obj.getUUID());
            if (exerciser.getPropertyDisplayLevel()>0) {
                p.setProperty("getTimeOfLastUpdate()", IntegrationAPIExerciser.formatGC(obj.getTimeOfLastUpdate()));
                p.setProperty("getTimeOfLastCompletionCode()", IntegrationAPIExerciser.formatGC(obj.getTimeOfLastCompletionCode()));
                p.setProperty("getLastCompletionCode()", ""+obj.getLastCompletionCode());
                p.setProperty("hasBeenPopulatedByBroker()", ""+obj.hasBeenPopulatedByBroker());
                p.setProperty("hasBeenRestrictedByBroker()", ""+obj.hasBeenRestrictedByBroker());
                p.setProperty("getConfigurationObjectTypeOfParent()", ""+IntegrationAPIExerciser.formatConfigurationObjectType(obj.getConfigurationObjectTypeOfParent()));
                p.setProperty("getType()", ""+obj.getType());
            }

            // ---------- Last BIP Messages ----------
            // Display one message per line
            Vector<LogEntry> v = obj.getLastBIPMessages();
            StringBuffer key = new StringBuffer("getLastBIPMessages()");
            StringBuffer value = new StringBuffer();
            if (v == null) {
                value.append(""+v);
            } else {
                Enumeration<LogEntry> e = v.elements();
                int count = 1;
                while (e.hasMoreElements()) {
                    LogEntry le = e.nextElement();
                    key.append("\n    ["+(count++)+"]");
                    value.append("\n"+IntegrationAPIExerciser.getFirstLine(le.getDetail()));
                }
            }
            p.setProperty(""+key, ""+value);

            // ---------- More Misc info ----------
            // These methods set may fail with a
            // ConfigManagerProxyPropertyNotInitialisedException, which means
            // that the property was not supplied by the integration node.
            try {
                p.setProperty("getName()", ""+obj.getName());
            } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                exerciser.consoleLogger.logThrowing(ex);
            }

            // Only display other properties if the user's view of this
            // object has not been restricted.
            if (!obj.hasBeenRestrictedByBroker()) {
                try {
                    p.setProperty("getLongDescription()", ""+obj.getLongDescription());
                    p.setProperty("getShortDescription()", ""+obj.getShortDescription());
                    p.setProperty("getName()", ""+obj.getName());

                    if (exerciser.getPropertyDisplayLevel()>0) {
                        p.setProperty("getNumberOfSubcomponents()", ""+obj.getNumberOfSubcomponents());
                    }
                } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                    exerciser.consoleLogger.logThrowing(ex);
                }

                // ---------- Parent info ----------
                String parent;
                try {
                    parent = IntegrationAPIExerciser.formatAdminObject(obj.getParent());
                } catch (ConfigManagerProxyLoggedException e1) {
                    exerciser.consoleLogger.logThrowing(e1);
                    parent = "...?";
                }
                p.setProperty("getParent()", ""+parent);

                //----------- Display basic properties -----------
                try {
                  Properties basicProperties = obj.getBasicProperties();
                  key = new StringBuffer("getBasicProperties()");
                  value = new StringBuffer();
                  if (basicProperties == null) {
                    value.append("");
                  } else {
                     Enumeration<?> propertyNames = basicProperties.propertyNames();
                     while (propertyNames.hasMoreElements()) {
                         String thisPropertyName = (String)propertyNames.nextElement();
                         key.append("\n    "+thisPropertyName);
                         value.append("\n"+basicProperties.getProperty(thisPropertyName));
                     }
                  }
                  p.setProperty(""+key, ""+value);
                } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                  exerciser.consoleLogger.logThrowing(ex);
                }

                //----------- Display advanced properties -----------
                try {
                  Properties advancedProperties = obj.getAdvancedProperties();
                  key = new StringBuffer("getAdvancedProperties()");
                  value = new StringBuffer();
                  if (advancedProperties == null) {
                    value.append("");
                  } else {
                     Enumeration<?> propertyNames = advancedProperties.propertyNames();
                     while (propertyNames.hasMoreElements()) {
                         String thisPropertyName = (String)propertyNames.nextElement();
                         key.append("\n    "+thisPropertyName);
                         value.append("\n"+advancedProperties.getProperty(thisPropertyName));
                     }
                  }
                  p.setProperty(""+key, ""+value);
                } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                  exerciser.consoleLogger.logThrowing(ex);
                }

                // Discover the properties that are specific to individual types.
                ConfigurationObjectType type = obj.getConfigurationObjectType();
                if (type == ConfigurationObjectType.broker) {
                    classTesterBroker.discoverProperties((BrokerProxy)obj, p);
                } else if (type == ConfigurationObjectType.executiongroup) {
                    classTesterEG.discoverProperties((ExecutionGroupProxy)obj, p);
                } else if (type == ConfigurationObjectType.messageflow) {
                    classTesterFlow.discoverProperties((MessageFlowProxy)obj, p);
                } else if (type == ConfigurationObjectType.subflow) {
                    classTesterSubFlow.discoverProperties((SubFlowProxy)obj, p);
                } else if (type == ConfigurationObjectType.restapi) {
                    classTesterRestApi.discoverProperties((RestApiProxy)obj, p);
                } else if (type == ConfigurationObjectType.application) {
                    classTesterApplication.discoverProperties((ApplicationProxy)obj, p);
                } else if (type == ConfigurationObjectType.library) {
                    classTesterLibrary.discoverProperties((LibraryProxy)obj, p);
                } else if (type == ConfigurationObjectType.sharedLibrary) {
                    classTesterSharedLibrary.discoverProperties((SharedLibraryProxy)obj, p);
                } else if (type == ConfigurationObjectType.log) {
                    classTesterLog.discoverProperties((LogProxy)obj, p);
                } else if (type == ConfigurationObjectType.activitylog) {
                    classTesterActivityLog.discoverProperties((ActivityLogProxy)obj, p);
                } else if (type == ConfigurationObjectType.administrationqueue) {
                    classTesterAdminQueue.discoverProperties((AdminQueueProxy)obj, p);
                } else if (type == ConfigurationObjectType.resourcemanager) {
                    classTesterRM.discoverProperties((ResourceManagerProxy)obj, p);
                } else if (type == ConfigurationObjectType.policyManager) {
                    classTesterPM.discoverProperties((PolicyManagerProxy)obj, p);
                } else if (type == ConfigurationObjectType.policyObject) {
                    classTesterPolicy.discoverProperties((PolicyProxy)obj, p);
                } else if (type == ConfigurationObjectType.wlmPolicyObject) {
                    classTesterPolicy.discoverWLMProperties((WLMPolicyProxy)obj, p);
                } else if (type == ConfigurationObjectType.eventmanager) {
                    classTesterEM.discoverProperties((EventManagerProxy)obj, p);
                } else if (type == ConfigurationObjectType.event) {
                    classTesterEvent.discoverProperties((EventProxy)obj, p);
                }
            }
        }

        return p;
   }

}
