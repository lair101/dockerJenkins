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

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.Vector;

import javax.swing.JFileChooser;
import javax.swing.filechooser.FileFilter;
import javax.swing.tree.DefaultMutableTreeNode;

import com.ibm.broker.config.proxy.ActivityLogEntry;
import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.BarEntry;
import com.ibm.broker.config.proxy.BarFile;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.DeploymentDescriptor;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.LocalBrokerUtilities;
import com.ibm.broker.config.proxy.MessageFlowProxy;

/*****************************************************************************
 * <p>This class contains tests for the Administration API
 * that didn't really fit into any of the other tester classes.
 * Either the tests are not associated with a particular
 * AdministeredObject type, or they affect multiple types. 
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForMiscellaneousActions</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test miscellaneous APIs
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
 * 51619    2008-09-02  HDMPL           v7 Release
 * 80006.1  2011-09-16  HDCAB           v8 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForMiscellaneousActions {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * True if and only if MQ Java client tracing is enabled
     * This value is not persistent.
     */
    boolean mqTraceEnabled = false;
    
    /**
     * True if and only if IBM Integration API (CMP) system tracing 
     * is enabled This value is not persistent. 
     */
    boolean cmpTraceEnabled = false;

    /**
     * Instantiates a new ClassTesterForMiscellaneousActions that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForMiscellaneousActions(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    
    /**
     * Gives a quick test of the Administration API's start
     * message flows command.
     * @param object The Integration node, integration server, 
     * application, library or flow whose flow(s) are to be started.
     */
    public void testStartMsgFlows(AdministeredObject object) throws ConfigManagerProxyException {
        if (object instanceof BrokerProxy) {
            ((BrokerProxy) object).startMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) object).startMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof ApplicationProxy) {
            ((ApplicationProxy) object).startMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof LibraryProxy) {
            ((LibraryProxy) object).startMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof MessageFlowProxy) {
            ((MessageFlowProxy) object).start();
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }

    /**
     * Gives a quick test of the Administration API's stop message flows methods.
     * @param object The integration node, integration server, 
     *               application, library or message flow whose
     *               flows are to be stopped.
     */
    public void testStopMsgFlows(AdministeredObject object) throws ConfigManagerProxyException {
        if (object instanceof BrokerProxy) {
            ((BrokerProxy) object).stopMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) object).stopMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof ApplicationProxy) {
            ((ApplicationProxy) object).stopMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof LibraryProxy) {
            ((LibraryProxy) object).stopMessageFlows();
            exerciser.reportActionSubmitted();
        } else if (object instanceof MessageFlowProxy) {
            ((MessageFlowProxy) object).stop();
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }


    
    /**
     * Gives a quick test to start user trace.
     * @param selectedObject integration node, integration server, 
     * application, library or message flow whose user trace 
     * settings are to change. 
     */
    public void testStartUserTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {
        if (selectedObject instanceof BrokerProxy) {
            ((BrokerProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof ApplicationProxy) {
            ((ApplicationProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof LibraryProxy) {
            ((LibraryProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof MessageFlowProxy) {
            ((MessageFlowProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }        
    }
    
    /**
     * Gives a quick test to stop user trace.
     * @param selectedObject integration node, integration server, 
     * application, library or message flow whose user trace 
     * settings are to change. 
     */
    public void testStopUserTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {

        try {
            if (selectedObject instanceof BrokerProxy) {
                ((BrokerProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.none);
                exerciser.reportActionSubmitted();
            } else if (selectedObject instanceof ExecutionGroupProxy) {
                ((ExecutionGroupProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.none);
                exerciser.reportActionSubmitted();
            } else if (selectedObject instanceof ApplicationProxy) {
                ((ApplicationProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.none);
                exerciser.reportActionSubmitted();
            } else if (selectedObject instanceof LibraryProxy) {
                ((LibraryProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.none);
                exerciser.reportActionSubmitted();
            } else if (selectedObject instanceof MessageFlowProxy) {
                ((MessageFlowProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.none);
                exerciser.reportActionSubmitted();
            } else {
                // Internal error
                exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
            }
        } catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }
    
    /**
     * Gives a quick test to start debug user trace.
     * @param selectedObject integration node, integration server, 
     * application, library or message flow whose user trace 
     * settings are to change. 
     */
    public void testStartDebugUserTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {
        if (selectedObject instanceof BrokerProxy) {
            ((BrokerProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof ApplicationProxy) {
            ((ApplicationProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof LibraryProxy) {
            ((LibraryProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof MessageFlowProxy) {
            ((MessageFlowProxy) selectedObject).setUserTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }
    
    /**
     * Gives a quick test to start service trace.
     * @param selectedObject integration server or message flow
     * whose service trace settings are to change.
     */
    public void testStartServiceTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {
        if (selectedObject instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof MessageFlowProxy) {
            ((MessageFlowProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.normal);
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }
    
    /**
     * Gives a quick test to stop service trace.
     * @param selectedObject integration server or message flow
     * whose service trace settings are to change.
     */
    public void testStopServiceTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {
        if (selectedObject instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.none);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof MessageFlowProxy) {
            ((MessageFlowProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.none);
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }
    
    /**
     * Gives a quick test to start debug service trace.
     * @param selectedObject integration server or message flow
     * whose service trace settings are to change.
     */
    public void testStartDebugServiceTrace(AdministeredObject selectedObject) throws ConfigManagerProxyException {
        if (selectedObject instanceof ExecutionGroupProxy) {
            ((ExecutionGroupProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else if (selectedObject instanceof MessageFlowProxy) {
            ((MessageFlowProxy) selectedObject).setServiceTrace(MessageFlowProxy.UserTrace.debug);
            exerciser.reportActionSubmitted();
        } else {
            // Internal error
            exerciser.consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_TYPE));
        }
    }
    
    /**
     * Tests a disconnection for any connected integration node.
     */
    public void testDisconnect() {
        BrokerProxy broker = exerciser.getConnectedBrokerProxyInstance();
        if (broker != null) {
            broker.disconnect();
        }
        
        exerciser.isFullyConnected = false;
        exerciser.setBrokerProxyConnectedInstance(null);
        exerciser.treeFullyPopulated = false;
        if (!exerciser.isHeadless()) {
            exerciser.initWindow();
            exerciser.setupJTable(null);
            exerciser.selectedCMPObject = null;
            exerciser.cmpObjectsToNodes = new Hashtable<Object,DefaultMutableTreeNode>();
            exerciser.nodesToCMPObjects = new Hashtable<DefaultMutableTreeNode,Object>();
            exerciser.updateStatusLine();
        }
        exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.DISCONNECTED));
    }

    
    
    /**
     * Toggles whether the IBM Integration API (CMP) system tracing 
     * is enabled This setting is non persistent. 
     */
    public void toggleCMPTrace() {
        String filename = null;
        
        cmpTraceEnabled = !cmpTraceEnabled;
        if (cmpTraceEnabled) {
            filename = getTraceFilename();
            if (filename == null) {
                cmpTraceEnabled = false;
            }
        }
            
        if (cmpTraceEnabled) {
            try {
                BrokerProxy.enableAdministrationAPITracing(filename);
            } catch (ConfigManagerProxyLoggedException e) {
                cmpTraceEnabled = false;
                exerciser.consoleLogger.logThrowing(e);
            }
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CMP_TRACE_STARTED)+" "+filename);
        }
        
        if (!cmpTraceEnabled) {
            BrokerProxy.disableAdministrationAPITracing();
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CMP_TRACE_STOPPED));
        }
        
        // Make the checkbox reflect the actual value of trace
        exerciser.cmpTraceEnabledMenuItem.setState(cmpTraceEnabled);
    }
    
    /**
     * Prompts the user with a dialog box that
     * asks the user for a trace output file
     * @return String Filename of the requested file.
     * If null, the action was cancelled.  
     */
    private String getTraceFilename() {
        String filename = null;
        JFileChooser chooser = new JFileChooser(ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_TRACE_OUTPUT));
        chooser.addChoosableFileFilter(new FileFilter() {
            public boolean accept(File arg0) {
                return ((arg0.getName().endsWith("trc")) || (arg0.isDirectory()));
            }
            public String getDescription() {
                return "*.trc";
            }
        });
        
        chooser.setDialogType(JFileChooser.SAVE_DIALOG);
        int result = chooser.showDialog(exerciser, null);
        if (result == JFileChooser.APPROVE_OPTION) {
            filename = chooser.getSelectedFile().getAbsolutePath();    
            int lastDot = filename.lastIndexOf(".");
            int lastFileSeparator = filename.lastIndexOf(File.separator);
            
            // Do we need to append the filetype filter?
            if ((lastDot == -1) || (lastDot<lastFileSeparator)) {
                filename = filename + ".trc";
            }
        }
        return filename;
    }
    
    
    /**
     * Attempts to load the BARFile on the local filesystem and view its contents 
     */
    public void testViewBarFile(BarFile barFile) {
        
        // Read the BAR file contents
        Enumeration<String> bes = barFile.getBarEntryNames();
        exerciser.consoleLogger.logFine(barFile.getFullName()+":");
        
        // Look through the deployable items
        while (bes.hasMoreElements()) {
            String name = bes.nextElement();
            
            BarEntry be = barFile.getBarEntryByName(name);
            String[] keywords = be.getKeywords();
            String modTime = new SimpleDateFormat().format(be.getModifyTime());
            
            exerciser.consoleLogger.logFine("  "+be.getFullName() + " ("+modTime+"):");
            for (String keyword : keywords) {
                String value = be.getKeywordValue(keyword);
                exerciser.consoleLogger.logFine("    " + keyword + " = "+value);
            }
        }
        
        // Get the deployment descriptor
        DeploymentDescriptor d = barFile.getDeploymentDescriptor();
        if (d != null) {
            Enumeration<String> p1 = d.getPropertyIdentifiers();
            if (p1.hasMoreElements()) {
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.BAR_DEPLOY_DESCRIPTOR));
                while (p1.hasMoreElements()) {
                    String prop = p1.nextElement();
                    String override = d.getOverride(prop);
                    if (override == null) {
                        exerciser.consoleLogger.logFine("    "+prop);
                    } else {
                        exerciser.consoleLogger.logFine("    "+prop+" = "+override);
                    }
                }
            }
        }
    }
    
    
    /**
     * Attempts to redeploy the supplied BAR File to an execution 
     * group, application or library. Assumes that the BarFile 
     * exists on the local filesystem and that the API Exerciser can 
     * map from the BarFile instance to an Integration server, 
     * Application or library that originally deployed it. 
     * @throws UnsupportedOperationException if the parent node of the BAR file's
     * node in the JTree does not refer to an integration server.
     */
    public void testRedeployBarFile(BarFile barFile) throws UnsupportedOperationException {
        
        // Look up the owning integration server from the API Exerciser.
        // Get the node in the JTree that refers to the BarFile then
        // look up that node's parent. This is the owning integration server.
        DefaultMutableTreeNode dmtn = exerciser.cmpObjectsToNodes.get(barFile);
        DefaultMutableTreeNode executionGroupParent = (DefaultMutableTreeNode) dmtn.getParent();
        Object owningObject = exerciser.nodesToCMPObjects.get(executionGroupParent);
        
        if (owningObject instanceof ExecutionGroupProxy) {
            ExecutionGroupProxy owningEG = (ExecutionGroupProxy) owningObject;
            exerciser.classTesterEG.testDeployBAR(owningEG, barFile.getFullName());
        } else if (owningObject instanceof ApplicationProxy) {
            ApplicationProxy owningAppl = (ApplicationProxy) owningObject;
            exerciser.classTesterAppl.testDeployBAR(owningAppl, barFile.getFullName());
        } else if (owningObject instanceof LibraryProxy) {
            LibraryProxy owningLib = (LibraryProxy) owningObject;
            exerciser.classTesterLib.testDeployBAR(owningLib, barFile.getFullName());
        } else {
            // It is not possible to redeploy the BAR file because
            // the parent node of the BAR file does not refer to an integration server.
            throw new UnsupportedOperationException("Bar file node's parent is not an integration server");
        }
    }
    
    
    /**
     * Clears the console text
     */
    public void clearConsole() {
        exerciser.consoleLogger.clear();
    }
    
    
    /**
     * Toggles whether deployment is incremental or not.
     * <P>
     * An incremental BAR file deploy means that existing
     * message flows and sets will continue to run in the
     * Integration Server after deployment.
     * <P>
     * A non-incremental BAR file deploy means that the integration 
     * server will be cleared of all message flows and sets before 
     * deployment occurs. 
     * <P>
     * An incremental topology or topic tree deploy means
     * that only changes to the topology or topic tree
     * are communicated to integration nodes.
     * <P>
     * A non-incremental topology or topic tree deploy means
     * that the entire topology or topic tree is sent.
     */
    public void toggleIsIncremental() {
        ResourcesHandler.toggleUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, false);
            // If the value didn't exist previously, then it's now the opposite of the default (i.e. false)
        ResourcesHandler.saveUserSettings();
    }
    
    /**
     * Configures the API Exerciser to show only basic information.
     */
    public void setPropertyDisplayLevelBasic() {
        exerciser.displayLevel0.setSelected(true);
        exerciser.displayLevel1.setSelected(false);
        exerciser.displayLevel2.setSelected(false);
        doSetPropertyDisplayLevel(0);
    }
    
    /**
     * Configures the API Exerciser to show advanced information.
     */
    public void setPropertyDisplayLevelAdvanced() {
        exerciser.displayLevel0.setSelected(false);
        exerciser.displayLevel1.setSelected(true);
        exerciser.displayLevel2.setSelected(false);
        doSetPropertyDisplayLevel(1);
    }
    
    /**
     * Configures the API Exerciser to show everything.
     */
    public void setPropertyDisplayLevelEverything() {
        exerciser.displayLevel0.setSelected(false);
        exerciser.displayLevel1.setSelected(false);
        exerciser.displayLevel2.setSelected(true);
        doSetPropertyDisplayLevel(2);
    }
    
    /**
     * Changes the level of detail shown by the API Exerciser.
     * @param int New level of detail (0=least, 2=most)
     */
    private void doSetPropertyDisplayLevel(int newLevel) {
        exerciser.setPropertyDisplayLevel(newLevel);
        ResourcesHandler.setUserSetting(ResourcesHandler.VIEW, ""+newLevel);
        ResourcesHandler.saveUserSettings();
        exerciser.refreshTableAndTree();
    }
    
    /**
     * Toggles whether resources beneath the integration server are 
     * grouped according to which BAR file they were deployed in. 
     */
    public void toggleGroupByBAR() {
        boolean newValue = ResourcesHandler.toggleUserSettingBoolean(ResourcesHandler.GROUP_BY_BAR, false);
        // If the value didn't exist previously, then it's now the opposite of the default (i.e. false; don't group by BAR)
        ResourcesHandler.saveUserSettings();
        exerciser.groupResourcesByBAR = newValue;
        exerciser.refreshTableAndTree();
    }

    /**
     * Toggles whether policies are displayed in the tree 
     */
    public void toggleDisplayPolicies() {
        boolean newValue = ResourcesHandler.toggleUserSettingBoolean(ResourcesHandler.DISPLAY_POLICIES, false);
        // If the value didn't exist previously, then it's now the opposite of the default (i.e. false; don't display policies)
        ResourcesHandler.saveUserSettings();
        exerciser.displayPolicies = newValue;
        exerciser.refreshTableAndTree();
    }
    
    /**
     * Reports information relating to the WMB runtime installs on
     * the local machine.
     */
    public void testReportInstallInfo() {
        
        // Make sure that the information reported is up to date.
        LocalBrokerUtilities.clearCache();
        
        // ---------- First Install location by Version ----------
        try {
            exerciser.consoleLogger.logFine("");
            exerciser.consoleLogger.logFine("LocalBrokerUtilities.getLocalBrokerInstallLocations() : ");
            HashMap<String, String> installLocations = LocalBrokerUtilities.getLocalBrokerInstallLocations();
            if (installLocations == null) {
                exerciser.consoleLogger.logFine(" "+null);
            } else {
                Iterator<String> instances = installLocations.keySet().iterator();
                while (instances.hasNext()) {
                    String instanceName = instances.next();
                    String installLocation = installLocations.get(instanceName);
                    exerciser.consoleLogger.logFine(" "+instanceName+" : "+installLocation);
                }
            }
        } catch(IOException ioex) {
            // Thrown by LocalBrokerUtilities.getInstallLocations()
            exerciser.consoleLogger.logThrowing(ioex);
        }

        // ---------- All Install locations ----------
        try {
            exerciser.consoleLogger.logFine("");
            exerciser.consoleLogger.logFine("LocalBrokerUtilities.getAllLocalBrokerInstallLocations() : ");
            HashMap<String, Vector<String>> allInstallLocations = LocalBrokerUtilities.getAllLocalBrokerInstallLocations();
            if (allInstallLocations == null) {
                exerciser.consoleLogger.logFine(" "+null);
            } else {
                Iterator<String> instances = allInstallLocations.keySet().iterator();
                while (instances.hasNext()) {
                  String instanceName = instances.next();
                  Vector<String> installLocations = allInstallLocations.get(instanceName);
                  if(installLocations != null) {
                     Enumeration<String> installLocationsEnum = installLocations.elements();
                     while(installLocationsEnum.hasMoreElements()) {
                        String installLocation = installLocationsEnum.nextElement();
                        exerciser.consoleLogger.logFine(" "+instanceName+" : "+installLocation);
                     }
                   }
                }
            }
        } catch(IOException ioex) {
            // Thrown by LocalBrokerUtilities.getInstallLocations()
            exerciser.consoleLogger.logThrowing(ioex);
        }
        
        // ---------- Local Integration nodes ----------
        try {
            exerciser.consoleLogger.logFine("");
            exerciser.consoleLogger.logFine("LocalBrokerUtilities.getLocalBrokerNames() : ");
            String[] brokerNames = LocalBrokerUtilities.getLocalBrokerNames();
            if (brokerNames == null) {
                exerciser.consoleLogger.logFine(" "+null);
            } else {
                for (String brokerName : brokerNames) {
                    
                    // Display the process ID
                    String pidDesc = "";
                    int pid = LocalBrokerUtilities.getLocalBrokerPID(brokerName);
                    if (pid == 0) {
                        pidDesc = ResourcesHandler.getNLSResource(ResourcesHandler.NOT_RUNNING);
                    } else {
                        pidDesc = "PID="+pid;
                    }
                    
                    // Display the FAD, and convert it into something more recognisable, if we can
                    int fad = LocalBrokerUtilities.getLocalBrokerFAD(brokerName);
                    String fadDesc = LocalBrokerUtilities.getVersionFromFAD(fad);
                    if (!"".equals(fadDesc)) {
                        fadDesc = " (V"+fadDesc+")";
                    }
                    String workpath = LocalBrokerUtilities.getLocalBrokerWorkpath(brokerName);
                    if (workpath == null) workpath = "[default]";
                    exerciser.consoleLogger.logFine(" "+brokerName+": "+pidDesc+", FAD="+fad+fadDesc+", workpath="+workpath);
                }
            }
        } catch (ConfigManagerProxyLoggedException ex) {
            // Thrown by LocalBrokerUtilities.getLocalBrokerNames()
            exerciser.consoleLogger.logThrowing(ex);
        } catch(IOException ioex) {
            // Thrown by LocalBrokerUtilities.getLocalBrokerFAD()
            // Thrown by LocalBrokerUtilities.getLocalBrokerWorkpath()
            exerciser.consoleLogger.logThrowing(ioex);
        }
        exerciser.consoleLogger.logFine("");
    }
    
    /**
     * Reports information the contents of an Activity Log
     */
    static public void testDisplayActivityLog(IntegrationAPIExerciser exerciser, ActivityLogProxy alp) {
        
       
        // ---------- First Install location by Version ----------
        try {
            exerciser.consoleLogger.logFine("ActivityLogProxy.getName() = " + alp.getName());
            exerciser.consoleLogger.logFine("ActivityLogProxy.getUUID() = " + alp.getUUID());
            exerciser.consoleLogger.logFine("ActivityLogProxy.getConfigurationObjectType() = " + alp.getConfigurationObjectType());
            exerciser.consoleLogger.logFine("ActivityLogProxy.getConfigurationObjectTypeOfParent() = " + alp.getConfigurationObjectTypeOfParent());
            try
            {
              exerciser.consoleLogger.logFine("ActivityLogProxy.getParent() = " + IntegrationAPIExerciser.formatAdminObject(alp.getParent()));
            } catch (ConfigManagerProxyLoggedException e1) {
              exerciser.consoleLogger.logFine("ActivityLogProxy.getParent() = <unknown>");
            }

            exerciser.consoleLogger.logFine("ActivityLogProxy.hasBeenPopulatedByBroker() = " + alp.hasBeenPopulatedByBroker());
            exerciser.consoleLogger.logFine("ActivityLogProxy.hasBeenRestrictedByBroker() = " + alp.hasBeenRestrictedByBroker());
            exerciser.consoleLogger.logFine("ActivityLogProxy.getSize() = " + alp.getSize());
            exerciser.consoleLogger.logFine("ActivityLogProxy.elements() : ");

            Enumeration<ActivityLogEntry> alEntries = alp.elements();
            int entryCount = 0;
            while(alEntries.hasMoreElements()) 
            {
              ActivityLogEntry ale = alEntries.nextElement();              
              exerciser.consoleLogger.logFine(++entryCount + ": " + ale.toString());      
            }

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }

        exerciser.consoleLogger.logFine("");
    }
}
