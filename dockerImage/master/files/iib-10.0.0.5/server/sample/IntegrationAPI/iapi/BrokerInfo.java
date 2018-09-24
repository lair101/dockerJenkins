/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2004-2009.                     
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
package iapi;

import iapi.common.ResourcesHandler;

import java.text.DateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.ListIterator;
import java.util.Locale;
import java.util.Properties;

import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.AdministeredObjectListener;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.BrokerConnectionParameters;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.CompletionCodeType;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.IntegrationNodeConnectionParameters;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.MessageFlowProxy;

/*****************************************************************************
 * <P>An application to display information on objects in a specified integration node.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>BrokerInfo</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Provides example code that shows how to use the
 *    IBM Integration API (CMP) to display integration node information.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *       <LI><TT>cmp.ResourcesHandler</TT>
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
 * 25103.6  2004-04-08  HDMPL           v6 Release
 * 51619.1  2008-07-16  HDMPL           v7 Release
 * 63273    2011-11-22  HDMPL           v8 Release (added support for applications)
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/

public class BrokerInfo implements AdministeredObjectListener {
    
    /**
     * Object that defines the connection to the integration node
     */
    BrokerProxy connectedInstance;
    
    /**
     * Indentation to use when displaying integration node 
     * information 
     */
    private final static String BROKER_INDENT = "";
    
    /**
     * Indentation to use when displaying integration server 
     * information 
     */
    private final static String EG_INDENT = "  ";
    
    /**
     * Indentation to use when displaying application information
     */
    private final static String APP_INDENT = "    ";
    
    /**
     * Indentation to use when displaying message flow information
     */
    private final static String MF_INDENT = "    ";
    
    /**
     * True if and only if the application will run continuously;
     * that is, wait for incoming state changes.
     */
    private boolean interactiveMode;

    /**
     * The default name of the integration node if it is not 
     * supplied 
     */
    private final static String DEFAULT_BROKER_NAME = "TESTNODE_"+System.getProperty("user.name");
    
    /**
     * The default host name of the integration node if it is not 
     * supplied 
     */
    private final static String DEFAULT_BROKER_HOSTNAME = "localhost";
    
    /**
     * The default port of the integration node if it is not 
     * supplied 
     */
    private final static int DEFAULT_BROKER_PORT = 4414;
        
    /**
     * Main method. Starts an instance of the integration node 
     * information program. 
     * @param args use -i to enter interactive mode.
     */
    public static void main(String[] args) {
        
        boolean interactiveMode = false;
        boolean finished = false;
        String brokerParameter = null;
        
        // Parse the command line arguments
        for (int i=0; i<args.length; i++) {
            if ((args[i].equals("-i")) || (args[i].equals("/i"))) {
                interactiveMode = true;
            } else if ((args[i].equals("-h")) ||
                       (args[i].equals("-help")) ||
                       (args[i].equals("-?")) ||
                       (args[i].equals("/h")) ||
                       (args[i].equals("/help")) ||
                       (args[i].equals("/?"))) {
                displayUsageInfo();
                finished = true;
            } else {
                // An unflagged parameter was supplied.
                if (brokerParameter == null) {
                    brokerParameter = args[i];
                } else {
                    // Unrecognized parameter
                    finished = true;
                    displayUsageInfo();
                }
            }
        }
        
        if (!finished) {
            BrokerInfo di = null;
            if(brokerParameter != null) 
            {
              String brokerHost = null;
              int    brokerPort = 0;
              String tokens[] = brokerParameter.split(":",2);
              if(tokens.length == 2)
              {
                brokerHost = tokens[0];
                brokerPort = Integer.parseInt(tokens[1]);
                di = new BrokerInfo(brokerHost, brokerPort, interactiveMode);
              }
            }

            if(di == null) 
            {
              di = new BrokerInfo(brokerParameter, interactiveMode);
            }

            if(di != null) 
            {
              di.go();       
            }
        }
    }

    /**
     * Connects to an integration node using the supplied parameters
     * and asks it to return complete information on it. 
     * @param brokerName The name of the local integration node
     * May be null, in which case the default parameters will be used. 
     * @param interactiveMode if and only if the value is true,
     * the application will listen for changes to the runstate
     * indefinitely once the initial information has been displayed.
     */
    public BrokerInfo(String brokerName, boolean interactiveMode) {
        this.interactiveMode = interactiveMode;
        connectedInstance = connect(brokerName);
        
        if (connectedInstance == null) {
            displayUsageInfo();
        }
    }
    
    /**
     * Connects to an integration node using the supplied parameters
     * and asks it to return complete information on it. 
     * @param brokerHost The host name of the integration node
     * May be null, in which case the default parameters will be used. 
     * @param brokerPort The web administration port number of the 
     * integration node. May be 0, in which the case the default 
     * parameters will be used. 
     * @param interactiveMode if and only if the value is true,
     * the application will listen for changes to the runstate
     * indefinitely once the initial information has been displayed.
     */
    public BrokerInfo(String brokerHost, int brokerPort, boolean interactiveMode) {
        this.interactiveMode = interactiveMode;
        connectedInstance = connect(brokerHost, brokerPort);
        
        if (connectedInstance == null) {
            displayUsageInfo();
        }
    }
    
    /**
     * Displays the syntax for the BrokerInfo command.
     */
    private static void displayUsageInfo() {
        System.err.println("\n"+ResourcesHandler.getNLSResource(ResourcesHandler.BROKERINFO_HELP));
    }

    /**
     * Displays information on objects in the integration node. If 
     * the IBM Integration API (CMP) could not connect to the 
     * integration node using the parameters described on the 
     * constructor, this method does nothing. 
     */
    private void go() {
        if (connectedInstance!=null) {
            try {
                displayBrokerInfo(connectedInstance);
                
                if (interactiveMode) {
                    log(ResourcesHandler.getNLSResource(ResourcesHandler.LISTENING));
                    
                    // In interactive mode, the IBM Integration API (CMP)
                    // will call the methods beginning 'process...' whenever
                    // the state of the registered integration node objects changes.
                    // This happens on a separate notification thread.
                    // 
                    // At this point, the application can do no
                    // more but listen for these state changes. However,
                    // if the main thread were to finish, the JVM would exit
                    // straight away (as the notification thread used by the
                    // API is daemonic).
                    //
                    // Therefore, the following loop prevents the application
                    // from finishing. One could improve the application by
                    // waiting for user input here (e.g. a 'quit' command).
                    while (true) {
	                    try {
	                        Thread.sleep(10000);
	                    } catch (InterruptedException ex) {
	                        // ignore
	                    }
                    }
                }
                connectedInstance.disconnect();
                log(ResourcesHandler.getNLSResource(ResourcesHandler.DISCONNECTED));
            } catch (ConfigManagerProxyException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * Connects, using the parameters to the web administration port
     * on which an integration node is listening on the named host.
     * @param brokerHost The host name of the integration node
     * May be null, in which case the default parameters will be used. 
     * @param brokerPort The web administration port number of the 
     * integration node 
     * @return BrokerProxy connected instance. If the connection
     * could not be established, null is returned.
     */
    private BrokerProxy connect(String brokerHost, int brokerPort) {
        BrokerProxy b = null;

        String brokerHostName = brokerHost;
        int    brokerPortNumber = brokerPort;
        if(brokerHostName == null) 
        {
          brokerHostName = DEFAULT_BROKER_HOSTNAME;
        }
        if(brokerPortNumber == 0) 
        {
          brokerPortNumber = DEFAULT_BROKER_PORT;
        }

        BrokerConnectionParameters bcp = new IntegrationNodeConnectionParameters(brokerHostName, brokerPortNumber);
        
        try {
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTING));
            b = BrokerProxy.getInstance(bcp);
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER));
            
            // Ensure the integration node is actually talking to us.
            // (This step isn't necessary - although it does allow us to
            // catch comms failures early.)
            boolean brokerIsResponding = b.hasBeenPopulatedByBroker(true);
            
            if (brokerIsResponding) {
                log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER));
            } else {
                log(ResourcesHandler.getNLSResource(ResourcesHandler.NO_RESPONSE_FROM_BROKER));
                b.disconnect();
                b = null;
            }
            
        } catch (ConfigManagerProxyLoggedException e) {
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_FAILED));
        }
        return b;
    }

    /**
     * Connects to a local integration node
     * @param localBrokerName The host name of the integration node
     * May be null, in which case the default parameters will be used. 
     * @return BrokerProxy connected instance. If the connection
     * could not be established, null is returned.
     */
    private BrokerProxy connect(String localBrokerName) {
        BrokerProxy b = null;

        String brokerName = localBrokerName;
        if(brokerName == null) 
        {
          brokerName = DEFAULT_BROKER_NAME;
        }
        
        try {
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTING));
            b = BrokerProxy.getLocalInstance(brokerName);
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER));
            
            // Ensure the integration node is actually talking to us.
            // (This step isn't necessary - although it does allow us to
            // catch comms failures early.)
            boolean brokerIsResponding = b.hasBeenPopulatedByBroker(true);
            
            if (brokerIsResponding) {
                log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER));
            } else {
                log(ResourcesHandler.getNLSResource(ResourcesHandler.NO_RESPONSE_FROM_BROKER));
                b.disconnect();
                b = null;
            }
            
        } catch (ConfigManagerProxyLoggedException e) {
            log(ResourcesHandler.getNLSResource(ResourcesHandler.CONNECT_FAILED));
        }
        return b;
    }

    /**
     * Sends to the log name and runstate information for
     * each integration server and message flow in the integration 
     * node, optionally registering listeners for each object. 
     * @param b Integration node for which information
     * is to be displayed.
     * @throws ConfigManagerProxyException
     * if communication problems with the integration node meant 
     * that the required information could not be determined. 
     */
    private void displayBrokerInfo(BrokerProxy b)
    throws ConfigManagerProxyException {
        
        // First, register the BrokerProxy for changes if necessary.
        if (interactiveMode) {
            b.registerListener(this);
        }
        
        displayBrokerRunstate(b);
        
        // Get an unfiltered enumeration of all the integration servers in this integration node
        Enumeration<ExecutionGroupProxy> allEGsInThisBroker = b.getExecutionGroups(null);
        while (allEGsInThisBroker.hasMoreElements()) {
            ExecutionGroupProxy thisEG = allEGsInThisBroker.nextElement();
            if (interactiveMode) {
                thisEG.registerListener(this);
            }
            displayExecutionGroupRunstate(thisEG);
            
            // Get an unfiltered enumeration of all applications in this integration server
            Enumeration<ApplicationProxy> allAppsInThisEG = thisEG.getApplications(null);
            while (allAppsInThisEG.hasMoreElements()) {
                ApplicationProxy thisApp = allAppsInThisEG.nextElement();
                if (interactiveMode) {
                    thisApp.registerListener(this);
                }
                displayApplicationRunstate(thisApp);
            }
            
            // Get an unfiltered enumeration of all message flows in this integration server
            Enumeration<MessageFlowProxy> allFlowsInThisEG = thisEG.getMessageFlows(null);
            while (allFlowsInThisEG.hasMoreElements()) {
                MessageFlowProxy thisFlow = allFlowsInThisEG.nextElement();
                if (interactiveMode) {
                    thisFlow.registerListener(this);
                }
                displayMessageFlowRunstate(thisFlow);
            }
            
        }
        
    }

    /**
     * Sends to the log a line of text describing the integration 
     * node and whether it is running 
     * @param thisBroker BrokerProxy object representing an 
     *                   integration node
     * @throws ConfigManagerProxyPropertyNotInitializedException
     * if communication problems with the integration node meant 
     * that the required information could not be determined. 
     */
    private void displayBrokerRunstate(BrokerProxy thisBroker)
    throws ConfigManagerProxyPropertyNotInitializedException {
        
        boolean isRunning = thisBroker.isRunning();
        String brokerName = thisBroker.getName();
        if (isRunning) {
            log(BROKER_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.BROKER_RUNNING,
                    new String[] {brokerName}));
        } else {
            log(BROKER_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.BROKER_STOPPED,
                    new String[] {brokerName}));
        }
    }
    
    /**
     * Sends to the log a line of text describing the integration 
     * server and whether it is running 
     * @param thisExecutionGroup ExecutionGroupProxy object representing
     * an integration server
     * @throws ConfigManagerProxyPropertyNotInitializedException
     * if communication problems with the integration node meant 
     * that the required information could not be determined. 
     * @throws ConfigManagerProxyLoggedException if the parent
     * could not be accessed.
     */
    private void displayExecutionGroupRunstate(ExecutionGroupProxy thisExecutionGroup)
    throws ConfigManagerProxyPropertyNotInitializedException, ConfigManagerProxyLoggedException {
        boolean isRunning = thisExecutionGroup.isRunning();
        String executionGroupName = thisExecutionGroup.getName();
        String brokerName = thisExecutionGroup.getParent().getName();
        
        if (isRunning) {
            log(EG_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.EG_RUNNING,
                    new String[] {executionGroupName, brokerName}));
        } else {
            log(EG_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.EG_STOPPED,
                    new String[] {executionGroupName, brokerName}));
        }
    }
    
    /**
     * Sends to the log a line of text describing a deployed
     * application and whether it is running
     * @param thisApp ApplicationProxy object representing an
     * application that has been deployed to an integration server
     * @throws ConfigManagerProxyPropertyNotInitializedException
     * if communication problems with the integration node meant 
     * that the required information could not be determined. 
     * @throws ConfigManagerProxyLoggedException if the parent
     * object could not be discovered.
     */
    private void displayApplicationRunstate(ApplicationProxy thisApp)
    throws ConfigManagerProxyPropertyNotInitializedException, ConfigManagerProxyLoggedException {
        boolean isRunning = thisApp.isRunning();
        String applicationName = thisApp.getName();
        String executionGroupName = thisApp.getParent().getName();
        String brokerName = thisApp.getParent().getParent().getName();
        
        if (isRunning) {
            log(APP_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.APP_RUNNING,
                    new String[] {applicationName, executionGroupName, brokerName}));
        } else {
            log(APP_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.APP_STOPPED,
                    new String[] {applicationName, executionGroupName, brokerName}));
        }
    }
    
    /**
     * Sends to the log a line of text describing a deployed
     * message flow and whether it is running
     * @param thisFlow MessageFlowProxy object representing a
     * message flow that has been deployed to an integration server
     * @throws ConfigManagerProxyPropertyNotInitializedException
     * if communication problems with the integration node meant 
     * that the required information could not be determined. 
     * @throws ConfigManagerProxyLoggedException if the parent
     * object could not be discovered.
     */
    private void displayMessageFlowRunstate(MessageFlowProxy thisFlow)
    throws ConfigManagerProxyPropertyNotInitializedException, ConfigManagerProxyLoggedException {
        boolean isRunning = thisFlow.isRunning();
        String messageFlowName = thisFlow.getName();
        String executionGroupName = thisFlow.getParent().getName();
        String brokerName = thisFlow.getParent().getParent().getName();
        
        if (isRunning) {
            log(MF_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.MF_RUNNING,
                    new String[] {messageFlowName, executionGroupName, brokerName}));
        } else {
            log(MF_INDENT+ResourcesHandler.getNLSResource(
                    ResourcesHandler.MF_STOPPED,
                    new String[] {messageFlowName, executionGroupName, brokerName}));
        }
    }

   

    /**
     * Prefixes the supplied string with the current timestamp
     * and sends it to System.err.
     * @param string String to be displayed
     */
    private static void log(String string) {
        DateFormat df = DateFormat.getDateTimeInstance(DateFormat.SHORT, DateFormat.MEDIUM, Locale.getDefault());
        String formattedDate = df.format(new Date());
        System.err.println("("+formattedDate+") "+string);
    }

    /**
     * In interactive mode, this method is called by the
     * IBM Integration API (CMP) whenever one of the integration 
     * node's objects changes. If the change is to the run-state of 
     * an object, or if a new object has been added to the 
     * integration node, the change is reported. 
     * @param affectedObject The object which has changed. The
     * attributes of the object will already have been updated
     * to contain the new information.
     * @param changedAttributes list containing the attribute
     * key names that have changed.
     * @param newSubcomponents list containing the object's
     * subcomponents which were added by the latest change.
     * Each entry is of the form "componenttype+UUID"
     * such as "ExecutionGroup+123-123-123". A list of valid component
     * types can be found in the typedef-enumeration
     * com.ibm.broker.config.common.ConfigurationObjectType.
     * @param removedSubcomponents List containing the object's
     * subcomponents which were removed by the latest change.
     * Same format as for newChildren.
     */
    public void processModify(AdministeredObject affectedObject,
    		                  List<String> changedAttributes,
    		                  List<String> newSubcomponents,
    		                  List<String> removedSubcomponents) {
        
        try {
	        // We want to check for two types of modification:
	        // 1. new integration servers and message flows
	        // 2. start and stop messages
	        // We don't need to check for removed objects here, because we
	        // will catch those in processDelete().
	       
	        // 1. Check for new objects first.
	        ListIterator<String> e = newSubcomponents.listIterator();
	        while (e.hasNext()) {
	            String representation = e.next();
	            AdministeredObject newObject = affectedObject.getManagedSubcomponentFromStringRepresentation(representation);
	            
		        // Report a new integration server
		        if (newObject instanceof ExecutionGroupProxy) {
		            String executionGroupName = newObject.getName();
		            String brokerName = newObject.getParent().getName();
		            log(EG_INDENT+ResourcesHandler.getNLSResource(
		                    ResourcesHandler.EG_ADDED,
		                    new String[] {executionGroupName, brokerName}));
		            displayExecutionGroupRunstate((ExecutionGroupProxy)newObject);
		        }
		        
		        // Report a new application
                else if (newObject instanceof ApplicationProxy) {
                    String applicationName = newObject.getName();
                    String executionGroupName = newObject.getParent().getName();
                    String brokerName = newObject.getParent().getParent().getName();
                    log(APP_INDENT+ResourcesHandler.getNLSResource(
                            ResourcesHandler.APP_ADDED,
                            new String[] {applicationName, executionGroupName, brokerName}));
                    displayApplicationRunstate((ApplicationProxy)newObject);
                }
                
                // Report a new message flow
		        else if (newObject instanceof MessageFlowProxy) {
		            String messageFlowName = newObject.getName();
		            String executionGroupName = newObject.getParent().getName();
		            String brokerName = newObject.getParent().getParent().getName();
		            log(MF_INDENT+ResourcesHandler.getNLSResource(
		                    ResourcesHandler.MF_ADDED,
		                    new String[] {messageFlowName, executionGroupName, brokerName}));
		            displayMessageFlowRunstate((MessageFlowProxy)newObject);
		        }
		        
		        // Register the new object if necessary - request an
		        // immediate notification to ensure that the initial
                // runstate of the new object is displayed in a
                // processModify() invocation.
                if (interactiveMode) {
		            newObject.registerListener(this);
		        }
	            
	        }
	        
	        
	        // 2. Display the run-state if the list of changed
	        // attributes supplied to us includes the run-state key. 
	        ListIterator<String> e2 = changedAttributes.listIterator();
	        while (e2.hasNext()) {
	            String keyName = e2.next();
	            if (keyName.equals(AttributeConstants.OBJECT_RUNSTATE_PROPERTY)) {
	                if (affectedObject instanceof BrokerProxy) {
	                    displayBrokerRunstate((BrokerProxy)affectedObject);
	                } else if (affectedObject instanceof ExecutionGroupProxy) {
	                    displayExecutionGroupRunstate((ExecutionGroupProxy)affectedObject);
	                } else if (affectedObject instanceof ApplicationProxy) {
	                    displayApplicationRunstate((ApplicationProxy)affectedObject);
	                } else if (affectedObject instanceof MessageFlowProxy) {
                        displayMessageFlowRunstate((MessageFlowProxy)affectedObject);
                    }
	            }
	        }
	        
        } catch (ConfigManagerProxyException ex) {
            // Could not getParent() or getName()
            ex.printStackTrace();
        }
        
    }

    /**
     * In interactive mode, this method is called by the IBM 
     * Integration API (CMP) if an object within the integration 
     * node is deleted. 
     * @param deletedObject AdministeredObject which has been deleted.
     */
    public void processDelete(AdministeredObject deletedObject) {
        
        try {
	        
            // Report a deleted integration server
	        if (deletedObject instanceof ExecutionGroupProxy) {
	            String executionGroupName = deletedObject.getName();
	            String brokerName = deletedObject.getParent().getName();
	            log(EG_INDENT+ResourcesHandler.getNLSResource(
	                    ResourcesHandler.EG_DELETED,
	                    new String[] {executionGroupName, brokerName}));
	        }
	        
	        // Report a deleted application
	        else if (deletedObject instanceof ApplicationProxy) {
                String applicationName = deletedObject.getName();
                String executionGroupName = deletedObject.getParent().getName();
                String brokerName = deletedObject.getParent().getParent().getName();
                log(APP_INDENT+ResourcesHandler.getNLSResource(
                        ResourcesHandler.APP_DELETED,
                        new String[] {applicationName, executionGroupName, brokerName}));
            }
	        
	        // Report a deleted message flow
	        else if (deletedObject instanceof MessageFlowProxy) {
	            String messageFlowName = deletedObject.getName();
	            String executionGroupName = deletedObject.getParent().getName();
	            String brokerName = deletedObject.getParent().getParent().getName();
	            log(MF_INDENT+ResourcesHandler.getNLSResource(
	                    ResourcesHandler.MF_DELETED,
	                    new String[] {messageFlowName, executionGroupName, brokerName}));
	        }
	        
	        // Listeners are deregistered automatically by the API after a delete.
	        
        } catch (ConfigManagerProxyException e) {
            // Could not getParent() or getName()
            e.printStackTrace();
        }
        
    }

    /**
     * This method is not used by the BrokerInfo application
     * and is included here in order to fully implement the
     * AdministeredObjectListener interface.
     * @param affectedObject The object on which a command was
     * attempted.
     * @param ccType The overall completion code of the action
     * @param bipMessages an unmodifiable list of
     * com.ibm.broker.config.proxy.LogEntry classes that contains
     * any localized BIP Messages associated with the action.
     * @param referenceProperties Properties of the Request that
     * caused this Action Response.
     */
    public void processActionResponse(AdministeredObject affectedObject, CompletionCodeType ccType, List<LogEntry> bipMessages, Properties referenceProperties) {
        // This utility doesn't attempt to change state and so
        // monitoring responses to our submitted actions is pointless.
    }

    
}
