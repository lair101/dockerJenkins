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

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.List;
import java.util.Properties;
import java.util.StringTokenizer;

import javax.swing.JTree;
import javax.swing.tree.DefaultMutableTreeNode;

import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.BrokerConnectionParameters;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurableService;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.IntegrationNodeConnectionParameters;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.SecurityIdentity;

import iapi.common.ResourcesHandler;

/*****************************************************************************
 * <p>The BrokerProxy object represents a single broker definition.
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take a BrokerProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy b = BrokerProxy.getLocalInstance("TESTNODE");
 * </pre>
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForBrokerProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test BrokerProxy methods
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
 * 40083.3  2008-01-15  HDMPL           Support for Modes of Operation
 * 51619.1  2008-07-15  HDMPL           v7 Release
 * 61984.1  2011-11-11  HDCAB           v8 release:
 *                                         Added getModesOfOperation()
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForBrokerProxy {

    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;

    /**
     * True only if a connection attempt is already in progress.
     */
    boolean isConnecting = false;

    /**
     * Instantiates a new ClassTesterForBrokerProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForBrokerProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }

    /**
     * Gives a quick test of the commands to change
     * broker properties
     * @param object Selected AdministeredObject
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    public void testModifyBrokerProperties(BrokerProxy object,
                                            String shortDesc,
                                            String longDesc) throws ConfigManagerProxyLoggedException {
        ClassTesterForAdministeredObject.testModifyStandardProperties(exerciser, object, null, shortDesc, longDesc);
        exerciser.reportActionSubmitted();
    }


    /**
     * Tests the Administration API's integration server creation.
     * @param broker Broker parent
     * @param egName Name of the integration server to create
     */
    public void testCreateEG(BrokerProxy broker, String egName) throws ConfigManagerProxyLoggedException {

        // The Integration API Exerciser uses a separate timeout parameter for
        // integration server creates, so substitute it in while we invoke it,
        // but only if the user has enabled synchronous requests.
        int existingSynchronousParameter = broker.getSynchronous();
        try {
            boolean synchronousRequests = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (synchronousRequests) {
                int maxEGCreateWaitTimeSecs = ResourcesHandler.getUserSettingInt(ResourcesHandler.EG_CREATE_WAIT_TIME_SECS, 30);
                broker.setSynchronous(maxEGCreateWaitTimeSecs*1000);
            }

            // The following line does the actual integration server creation.
            broker.createExecutionGroup(egName);
            // (BrokerProxy.createExecutionGroup() returns an object of type
            // ExecutionGroupProxy, but this method doesn't use it.)

            exerciser.reportActionSubmitted();
        } finally {
            broker.setSynchronous(existingSynchronousParameter);
        }

    }

    /**
     * Tests the Administration API's policy set retrieval
     * @param broker Broker parent
     * @param policySetName Name of the policy set
     */
    public void testGetPolicySet(BrokerProxy broker, String policySetName) {
        try {
            exerciser.consoleLogger.logFine(IntegrationAPIExerciser.formatInputStream(broker.getPolicySet(BrokerProxy.PolicyType.WS_SECURITY, policySetName)));
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the Administration API's policy set bindings retrieval
     * @param broker Broker parent
     * @param policySetBindingsName Name of the policy set bindings
     */
    public void testGetPolicySetBindings(BrokerProxy broker, String policySetBindingsName) {
        try {
            exerciser.consoleLogger.logFine(IntegrationAPIExerciser.formatInputStream(broker.getPolicySetBindings(BrokerProxy.PolicyType.WS_SECURITY, policySetBindingsName)));
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the Administration API's method to create a new policy set
     * @param broker Broker parent
     * @param policySetPathFileName Path and file name of the file to be imported
     */
    public void testImportPolicySet(BrokerProxy broker, String policySetPathFileName) {
        try {
            FileInputStream fis = new FileInputStream(policySetPathFileName);
            broker.setPolicySet(BrokerProxy.PolicyType.WS_SECURITY, generatePolicySetName(policySetPathFileName), fis);
            fis.close();
            exerciser.consoleLogger.logFine("Import PolicySet " + policySetPathFileName);
        } catch (FileNotFoundException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        } catch (ConfigManagerProxyLoggedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        } catch (IOException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the Administration API's method to create a new policy set bindings
     * @param broker Broker parent
     * @param policySetBindingsPathFileName Path and file name of the file to be imported
     */
    public void testImportPolicySetBindings(BrokerProxy broker, String policySetBindingsPathFileName) throws ConfigManagerProxyLoggedException, IOException {
        FileInputStream fis = new FileInputStream(policySetBindingsPathFileName);
        broker.setPolicySetBindings(BrokerProxy.PolicyType.WS_SECURITY, generatePolicySetName(policySetBindingsPathFileName), fis);
        fis.close();
        exerciser.consoleLogger.logFine("Import PolicySet " + policySetBindingsPathFileName);
    }

    /**
     * Generates the name of a policy set or policy set binding, based on its
     * name in the filesystem.
     * User-written applications need not generate names of policy sets and
     * policy set bindings in this way, but can instead choose to invent
     * more meaningful names.
     * @param pathFileName Path and file name
     * @return String fileName
     */
    private String generatePolicySetName(String pathFileName) {
        File f = new File(pathFileName);
        String fileName = f.getName();

        // Remove any file extension
        int i = fileName.lastIndexOf(".");
        if (i>0) {
            fileName = fileName.substring(0, i);
        }

        // Keep the name simple; strip out some non-standard characters
        String retVal = "";
        StringTokenizer st = new StringTokenizer(fileName, " ,!\u00a3$%^&*()-=+[]{};:'@#~,<.>?|");
        while (st.hasMoreTokens()) {
            retVal = retVal + st.nextToken();
        }

        return retVal;
    }

    /**
     * Tests the Administration API's method to delete a new policy set
     * @param broker Broker parent
     * @param policySetName Name of the policy set
     */
    public void testDeletePolicySet(BrokerProxy broker, String policySetName) throws ConfigManagerProxyLoggedException, IOException {
        broker.setPolicySet(BrokerProxy.PolicyType.WS_SECURITY, policySetName, null);
        exerciser.consoleLogger.logFine("Delete PolicySet " + policySetName);
    }

    /**
     * Tests the Administration API's method to delete a new policy set bindings
     * @param broker Broker parent
     * @param policySetBindingsName Name of the policy set bindings
     */
    public void testDeletePolicySetBindings(BrokerProxy broker, String policySetBindingsName) throws ConfigManagerProxyLoggedException, IOException {
        broker.setPolicySetBindings(BrokerProxy.PolicyType.WS_SECURITY, policySetBindingsName, null);
        exerciser.consoleLogger.logFine("Delete PolicySetBindings " + policySetBindingsName);
    }

    /**
     * Tests the setting of a HTTPListener runtime property.
     * @param broker Broker parent
     * @param propertyName Name of the object's property (e.g. "HTTPConnector/port")
     * @param propertyValue Value to give to the property (e.g. 8080)
     */
    public void testSetHTTPListenerRuntimeProperty(BrokerProxy broker, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        broker.setHTTPListenerProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the setting of a configurable service runtime property.
     * @param broker Broker parent
     * @param serviceName Name of the affected service
     * @param objectName Name of the affected object
     * @param propertyName Name of the object's property
     * @param propertyValue Value to give to the property
     */
    public void testSetConfigurableServiceRuntimeProperty(BrokerProxy broker, String serviceName, String objectName, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        broker.setConfigurableServiceProperty(serviceName+AttributeConstants.OBJECT_NAME_DELIMITER+objectName+AttributeConstants.OBJECT_NAME_DELIMITER+propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the setting of a registry property.
     * @param broker Broker parent
     * @param propertyName Property to change (e.g. "BrokerRegistry/brokerKeystoreType")
     * @param propertyValue Value to give to the property (e.g. JKS)
     */
    public void testSetRegistryRuntimeProperty(BrokerProxy broker, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        broker.setRegistryProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the setting of a security cache property.
     * @param broker Broker parent
     * @param propertyName Property to change (e.g. "SecurityCache/cacheSweepInterval")
     * @param propertyValue Value to give to the property (e.g. 10)
     */
    public void testSetSecurityCacheRuntimeProperty(BrokerProxy broker, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException{
        broker.setSecurityCacheProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests setting the variables that define how long Administration API
     * methods should block before timing out.
     * @param synchronousRequests Only if this parameter is true, all
     * requests will be sent synchronously to the broker; i.e. the
     * IBM Integration API (CMP) Exerciser will wait for responses
     * before returning control to the user.
     * @param maxDeployWaitTimeSecs The amount of time (in seconds) the
     * Administration API should wait for broker responses when deploying.
     * This parameter is only used if synchronousRequests is true.
     * @param maxEGCreateWaitTimeSecs The amount of time (in seconds) the
     * Administration API should wait for integration servers to be
     * created. This parameter is only used if synchronousRequests
     * is true.
     * @param maxOtherWaitTimeSecs The amount of time (in seconds) the
     * Administration API should wait for broker responses.
     */
    public void testRetryCharacteristics(boolean synchronousRequests, int maxDeployWaitTimeSecs,
                                         int maxEGCreateWaitTimeSecs, int maxOtherWaitTimeSecs,
                                         int maxPolicyWaitTimeSecs) {

        // Make these settings active for this session
        // (maxDeployWaitTimeSecs, maxEGCreateWaitTimeSecs isn't set here, as it's instead accessed
        // via the relevant deploy/deleteDeployedObjects()/createExecutionGroup() methods.)
        BrokerProxy.setRetryCharacteristics(maxOtherWaitTimeSecs*1000);

        if (exerciser.broker != null) {
            if (synchronousRequests) {
                exerciser.broker.setSynchronous(maxOtherWaitTimeSecs*1000);
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS_ENABLED));
            } else {
                exerciser.broker.setSynchronous(0);
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS_DISABLED));
            }

        }

        // Save all these settings for future sessions
        ResourcesHandler.setUserSetting(ResourcesHandler.SYNCHRONOUS_REQUESTS, ""+synchronousRequests);
        ResourcesHandler.setUserSetting(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, ""+maxDeployWaitTimeSecs);
        ResourcesHandler.setUserSetting(ResourcesHandler.EG_CREATE_WAIT_TIME_SECS, ""+maxEGCreateWaitTimeSecs);
        ResourcesHandler.setUserSetting(ResourcesHandler.OTHER_WAIT_TIME_SECS, ""+maxOtherWaitTimeSecs);
        ResourcesHandler.setUserSetting(ResourcesHandler.POLICY_WAIT_TIME_SECS, ""+maxPolicyWaitTimeSecs);
        ResourcesHandler.saveUserSettings();
    }

    /**
     * Gives a quick test of the Administration API's integration
     * server deletion.
     * @param eg Integration server to delete
     */
    public void testDeleteEG(ExecutionGroupProxy eg) throws ConfigManagerProxyException {
        String egName = eg.getName();
        BrokerProxy b = (BrokerProxy) eg.getParent();
        b.deleteExecutionGroup(egName);
        exerciser.reportActionSubmitted();
    }

    /**
     * Enables batch mode for the current broker handle
     * @throws ConfigManagerProxyLoggedException if a batch
     * could not be started for whatever reason.
     */
    public void testBatchStart() throws ConfigManagerProxyLoggedException {
        BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
        if (broker != null) {
            broker.beginUpdates();
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.BATCH_START));
        }
    }

    /**
     * Enables batch mode for the current broker handle
     * @throws ConfigManagerProxyException if a batch
     * could not be sent for whatever reason.
     */
    public void testBatchSend() throws ConfigManagerProxyException {
        BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
        if (broker != null) {
            broker.sendUpdates();
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.BATCH_SENT));
        }
    }

    /**
     * Enables batch mode for the current broker handle
     */
    public void testBatchClear() {
        BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
        if (broker != null) {
            broker.clearUpdates();
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.BATCH_CLEARED));
        }
    }

    /**
     * Tests a connection to the broker
     * @param ip Hostname or IP address (or empty String, to use MQ Java Bindings)
     * @param port Port on which the SVRCONN channel is listening (a valid port number,
     * or the empty string to use MQ Java Bindings)
     * @param qmgr Queue Manager on which the broker is
     * running (or empty String to use the default queue manager)
     * @param svrconn SVRCONN channel name
     * @param secexit Optional security Exit
     * @param secexitURLString Optional URL describing where the security
     * exit can be found (for use in Eclipse environments where the security
     * exit is not necessarily available on the CLASSPATH).
     */
    public void testConnectToRemoteBroker(String ip, String port, String username, String password, String useSSL) {

        try {
            // Disconnect if we're already connected.
            BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
            if (broker != null) {
                exerciser.disconnect();
            }

            // Issue the new connect action
            int portNum = 0;
            if (!"".equals(port)) {
                portNum = Integer.parseInt(port);
            }

            boolean bUseSSL = ("true".equalsIgnoreCase(useSSL));
            BrokerConnectionParameters bcp = new IntegrationNodeConnectionParameters(ip,portNum,username, password, bUseSSL);
            doRemoteConnectAction(bcp);
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }

    }

    /**
     * Tests a connection to the broker using a *.broker file
     * @param filename Path and name of the *.broker
     * file that contains the connection parameters.
     */
    public void testConnectToLocalBroker(String brokerName) {
        try {
            String notRunningSuffix = " ("+ResourcesHandler.getNLSResource(ResourcesHandler.NOT_RUNNING)+")";
            if((brokerName != null) && (!brokerName.endsWith(notRunningSuffix)))
            {
              // Disconnect if we're already connected.
              BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
              if (broker != null) {
                  exerciser.disconnect();
              }

              doLocalConnectAction(brokerName);
            }
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Asks the broker to create a configurable service of the supplied type and name.
     * @param b
     * @param csType
     * @param csName
     */
    public void testCreateConfigurableService(BrokerProxy b, String csType, String csName) throws ConfigManagerProxyLoggedException {
        b.createConfigurableService(csType, csName);
        exerciser.reportActionSubmitted();
    }

    /**
     * Asks the broker to delete the supplied configurable service.
     * @param cs Configurable service to delete
     */
    public void testDeleteConfigurableService(ConfigurableService cs) throws ConfigManagerProxyLoggedException {
        cs.delete();
        exerciser.reportActionSubmitted();
    }

    /**
     * Asks the broker to modify a property of the supplied configurable service.
     * @param cs Configurable service to modify
     * @param propertyName Name of the property to change
     * @param csName New value for the property
     */
    public void testModifyConfigurableService(ConfigurableService cs, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException{
        cs.setProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }



    /**
     * Connects to the broker with the supplied connection information.
     * @param cmcp
     */
    private void doRemoteConnectAction(BrokerConnectionParameters bcp) {

        // If we're already trying to connect, don't allow a new connect action
        // to take place.
        if (isConnecting) {
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_IN_PROGRESS));
        } else {

            // Initialise some parameters required by this specific application. You probably
            // won't need these if you're writing your own Configuration Manager Proxy application.
            // 'isConnecting' will stop further connection attempts until this one succeeds.
            isConnecting = true;

            // Now do the important stuff.
            BrokerProxy broker = null;
            try {
                // The next statement is THE most important one in this method. When writing a
                // Message Broker Administration application, this is the one you NEED to call. It
                // starts up the connection to the broker.
                broker = BrokerProxy.getInstance(bcp);
                setupExerciserForConnectedBroker(broker);

            } catch (ConfigManagerProxyLoggedException e) {
                // thrown by getInstance() only
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_FAILED));
                exerciser.consoleLogger.logThrowing(e);
            } finally {
                // Release the lock to allow future connection attempts to happen
                isConnecting = false;

                if (!exerciser.isHeadless()) {
                    exerciser.connectBrokerContextSensitiveMenuItem.setEnabled(true);
                    exerciser.connectBrokerMenuItem.setEnabled(true);
                }
            }
        }
    }

    /**
     * Connects to the local broker with the supplied name.
     * @param cmcp
     */
    private void doLocalConnectAction(String brokerName) {

        // If we're already trying to connect, don't allow a new connect action
        // to take place.
        if (isConnecting) {
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_IN_PROGRESS));
        } else {
            //The list of brokers presented for local connection could have the word (stopped) after it.
            //We should check for this string at the end of the broker string
            if(brokerName != null)
            {
              int bracketPos = brokerName.indexOf(" (");
              if(bracketPos != -1)
              {
                brokerName = brokerName.substring(0, bracketPos);
              }
            }

            // Initialise some parameters required by this specific application. You probably
            // won't need these if you're writing your own CMP application.
            // 'isConnecting' will stop further connection attempts until this one succeeds.
            isConnecting = true;

            // Now do the important stuff.
            BrokerProxy broker = null;
            try {
                // The next statement is THE most important one in this method. When writing a
                // CMP application, this is the one you NEED to call. It
                // starts up the connection to the broker.
                broker = BrokerProxy.getLocalInstance(brokerName);
                setupExerciserForConnectedBroker(broker);

            } catch (ConfigManagerProxyLoggedException e) {
                // thrown by getLocalInstance() only
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_FAILED));
                exerciser.consoleLogger.logThrowing(e);
            } finally {
                // Release the lock to allow future connection attempts to happen
                isConnecting = false;

                if (!exerciser.isHeadless()) {
                    exerciser.connectBrokerContextSensitiveMenuItem.setEnabled(true);
                    exerciser.connectBrokerMenuItem.setEnabled(true);
                }
            }
        }
    }

    /**
     * Configures the API Exerciser to display information for the
     * newly connected broker.
     * @param broker
     */
    private void setupExerciserForConnectedBroker(BrokerProxy broker) {

        // These two hashtables will contain handles to all the domain objects that the exerciser knows about.
        exerciser.cmpObjectsToNodes = new Hashtable<Object,DefaultMutableTreeNode>();
        exerciser.nodesToCMPObjects = new Hashtable<DefaultMutableTreeNode,Object>();

        // Now that we're trying to connect, remove the 'connect' menus if we're running the exerciser with a GUI.
        if (!exerciser.isHeadless()) {
            exerciser.connectBrokerContextSensitiveMenuItem.setEnabled(false);
            exerciser.connectBrokerMenuItem.setEnabled(false);
        }

        // We're connected to a running broker.
        exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER));

        // Check if we have heard back from the broker
        boolean brokerIsResponding = broker.hasBeenPopulatedByBroker(true);

        if(brokerIsResponding) {

            exerciser.setBrokerProxyConnectedInstance(broker);
            exerciser.updateStatusLine();

            // If we're running with a GUI, set up the Window to show the domain objects.
            // If we're running without a GUI, just set up the tree that would otherwise
            // show these domain objects.
            if (!exerciser.isHeadless()) {
                exerciser.initWindow();
                exerciser.setupJTable(broker);
                exerciser.setupSelectedMenu(broker);
            } else {
                exerciser.root = exerciser.getTree(broker);
                exerciser.tree = new JTree(exerciser.root);
                exerciser.tree.setCellRenderer(exerciser.treeCellRenderer);
                exerciser.initialiseMappingOfIdentifyingStringsToNodes(exerciser.root);
            }

            // The broker objects are available at this point.
            exerciser.selectedCMPObject = broker;
            exerciser.treeFullyPopulated = true;

            // Configure this newly connected BrokerProxy for synchronous updates, if necessary.
            boolean synchronousRequests = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (synchronousRequests) {
                int maxOtherWaitTimeSecs = ResourcesHandler.getUserSettingInt(ResourcesHandler.OTHER_WAIT_TIME_SECS, 10);
                exerciser.broker.setSynchronous(maxOtherWaitTimeSecs*1000);
            } else {
                exerciser.broker.setSynchronous(0);
            }

            // Connect to the broker has succeeded.
            // Display some navigation help in the log if
            // we're running with a GUI
            if (!exerciser.isHeadless()) {
                exerciser.consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTION_COMPLETED_BROKER));
                if (synchronousRequests) {
                    exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS_ENABLED));
                } else {
                    exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS_DISABLED));
                }
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS_HELP));
            }
            exerciser.isFullyConnected = true;

        } else {
            // If the broker's not responding, don't bother going any further.
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.NO_RESPONSE_FROM_BROKER));
            exerciser.disconnect();
        }
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some BrokerProxy-specific
     * methods related to Configurable Services that may be invoked on the
     * supplied object, and the returned value from those methods.
     * @param b A valid BrokerProxy
     * @param p A valid Properties object
     * @param subtype The type of Configurable Services to query;
     * null or "" means all Configurable Services should be queried.
     */
    public void discoverGeneralConfigurableServiceProperties(BrokerProxy b, Properties p, String subtype) {

        try {
            // ----------- Display configurable services -----------
            ConfigurableService[] configurableServices = b.getConfigurableServices(subtype);
            StringBuffer key = new StringBuffer("getConfigurableServices(\""+subtype+"\")");
            StringBuffer value = new StringBuffer();
            if (configurableServices == null) {
                value.append(""+configurableServices);
            } else {
                int i=0;
                for (ConfigurableService thisCS : configurableServices) {
                    key.append("\n    ["+(i++)+"]");
                    value.append("\n"+thisCS);
                }
            }
            p.setProperty(""+key, ""+value);

            // ----------- Display configurable service types (top level only) -----------
            if ((subtype == null) || ("".equals(subtype))) {
                String[] configurableServiceTypes = b.getConfigurableServiceTypes();
                key = new StringBuffer("getConfigurableServiceTypes()");
                value = new StringBuffer();
                if (configurableServiceTypes == null) {
                    value.append(""+configurableServiceTypes);
                } else {
                    int i=0;
                    for (String thisCSType : configurableServiceTypes) {
                        key.append("\n    ["+(i++)+"]");
                        value.append("\n"+thisCSType);
                    }
                }
                p.setProperty(""+key, ""+value);


                // ----------- Display all configurable services properties (top level only) -----------
                String[] configurableServiceProperties = b.getConfigurableServicePropertyNames();
                key = new StringBuffer("getConfigurableServicePropertyNames()");
                value = new StringBuffer();
                if (configurableServiceProperties == null) {
                    value.append(""+configurableServiceProperties);
                } else {
                    for (String thisProperty : configurableServiceProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+exerciser.formatRemoveNewlines(b.getConfigurableServiceProperty(thisProperty)));
                    }
                }
                p.setProperty(""+key, ""+value);

            }
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some ConfigurableService-specific
     * methods that may be invoked on the supplied object, and the returned value from
     * those methods.
     * @param cs A valid ConfigurableService
     * @param p A valid Properties object
     */
    public void discoverConfigurableServiceProperties(ConfigurableService cs, Properties p) {

        p.setProperty("getName()", ""+cs.getName());
        p.setProperty("getType()", ""+cs.getType());

        StringBuffer csPropertiesKey = new StringBuffer("getProperties()");
        StringBuffer csPropertiesValue = new StringBuffer("");
        Properties csProperties = cs.getProperties();
        Enumeration<?> propertiesEnum = csProperties.keys();
        while (propertiesEnum.hasMoreElements()) {
            String propertiesKey = ""+propertiesEnum.nextElement();
            String propertiesValue = csProperties.getProperty(propertiesKey);
            csPropertiesKey.append("\n     "+propertiesKey);
            csPropertiesValue.append("\n"+exerciser.formatRemoveNewlines(propertiesValue));
        }
        p.setProperty(""+csPropertiesKey, ""+csPropertiesValue);
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some BrokerProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param b A valid BrokerProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(BrokerProxy b, Properties p) {

        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        try {
            p.setProperty("isRunning()", ""+b.isRunning());
            p.setProperty("isAdminSecurityEnabled()", ""+b.isAdminSecurityEnabled());
            p.setProperty("getQueueManagerName()", ""+b.getQueueManagerName());
            p.setProperty("getBrokerVersion()", ""+b.getBrokerVersion());
            p.setProperty("getBrokerLongVersion()", ""+b.getBrokerLongVersion());
            p.setProperty("getBrokerOSArch()", ""+b.getBrokerOSArch());
            p.setProperty("getBrokerOSName()", ""+b.getBrokerOSName());
            p.setProperty("getBrokerOSVersion()", ""+b.getBrokerOSVersion());
            p.setProperty("getAdministrationAPIVersion()", ""+b.getAdministrationAPIVersion());

            if (exerciser.getPropertyDisplayLevel()>0) {

                // ---------- Display integration servers ----------
                StringBuffer key = new StringBuffer("getExecutionGroups()");
                StringBuffer value = new StringBuffer();
                Enumeration<ExecutionGroupProxy> e = b.getExecutionGroups(null);
                if (e == null) {
                    value.append(""+e);
                } else {
                    int count = 0;
                    while (e.hasMoreElements()) {
                        count++;
                        key.append("\n    ["+count+"]");
                        value.append("\n");
                        ExecutionGroupProxy c = e.nextElement();
                        value.append(IntegrationAPIExerciser.formatAdminObject(c));
                    }
                }
                p.setProperty(""+key, ""+value);

                // ----------- Display HTTP Listener properties -----------
                String[] httpListenerProperties = b.getHTTPListenerPropertyNames();
                key = new StringBuffer("getHTTPListenerPropertyNames()");
                value = new StringBuffer();
                if (httpListenerProperties == null) {
                    value.append(""+e);
                } else {
                    for (String thisProperty : httpListenerProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+b.getHTTPListenerProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);

                // ----------- Display Broker Registry properties -----------
                String[] brokerRegistryProperties = b.getRegistryPropertyNames();
                key = new StringBuffer("getRegistryPropertyNames()");
                value = new StringBuffer();
                if (brokerRegistryProperties == null) {
                    value.append(""+e);
                } else {
                    for (String thisProperty : brokerRegistryProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+b.getRegistryProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);

                // ----------- Display Security Cache Listener properties -----------
                String[] securityCacheProperties = b.getSecurityCachePropertyNames();
                key = new StringBuffer("getSecurityCachePropertyNames()");
                value = new StringBuffer();
                if (securityCacheProperties == null) {
                    value.append(""+e);
                } else {
                    for (String thisProperty : securityCacheProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+b.getSecurityCacheProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);

                // ------------ Modes of Operation ------------
                p.setProperty("getOperationMode()", b.getOperationMode());
                p.setProperty("getOperationModeValidity()", ""+b.getOperationModeValidity());
                key = new StringBuffer("getOperationModeViolations()");
                value = new StringBuffer();
                List<LogEntry> violations = b.getOperationModeViolations();
                if (violations == null) {
                    value.append(""+e);
                } else {
                    int i=0;
                    for (LogEntry thisViolation : violations) {
                        key.append("\n    ["+(i++)+"]");
                        value.append("\n"+thisViolation.getDetail());
                    }
                }
                p.setProperty(""+key, ""+value);
                p.setProperty("getModesOfOperation()", IntegrationAPIExerciser.formatStringArray(b.getModesOfOperation()));

                // ----------- Resource Types -----------
                String[] resTypeNames = b.getResourceTypeNames();
                p.setProperty("getResourceTypeNames()", IntegrationAPIExerciser.formatStringArray(resTypeNames));
                if (resTypeNames != null) {
                    for (String thisResType : resTypeNames) {
                        p.setProperty("getResourceTypeStatisticsPropertyNames(\""+thisResType+"\")",
                                IntegrationAPIExerciser.formatStringArray(b.getResourceTypeStatisticsPropertyNames(thisResType)));
                    }
                }

                // ----------- Other properties -----------
                p.setProperty("getQueues()", IntegrationAPIExerciser.formatStringArray(b.getQueues()));
                p.setProperty("getNodeTypes()", IntegrationAPIExerciser.formatStringArray(b.getNodeTypes()));
                p.setProperty("getPolicySetNames()", IntegrationAPIExerciser.formatObjectArray(b.getPolicySetNames()));
                p.setProperty("getPolicySetBindingsNames()", IntegrationAPIExerciser.formatObjectArray(b.getPolicySetBindingsNames()));

                List<SecurityIdentity> securityIdentities = b.getSecurityIdentities();
                String securityIdentityKey = "getSecurityIdentities()", securityIdentityValue = "";
                if (securityIdentities.isEmpty()) {
                  securityIdentityValue = "<none>";
                } else {
                  for (int i = 0; i < securityIdentities.size(); i++) {
                    securityIdentityKey += "\n    ["+i+"]";
                    securityIdentityValue += "\n" + securityIdentities.get(i);
                  }
                }
                p.setProperty(securityIdentityKey, securityIdentityValue);

                p.setProperty("getDataCapturePolicyUri()", b.getDataCapturePolicyUri());

            }
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }




}
