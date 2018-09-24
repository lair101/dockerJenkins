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

import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.DeployResult;
import com.ibm.broker.config.proxy.DeployedObjectGroupProxy;
import com.ibm.broker.config.proxy.MessageFlowDependency;
import com.ibm.broker.config.proxy.MessageFlowProxy;

/*****************************************************************************
 * <p>Each MessageFlowProxy object represents an message flow
 * as deployed in a single integration server.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForMessageFlowProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test MessageFlowProxy APIs
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
 * 35097    2004-09-13  HDMPL           v6 Release
 * 51517    2008-06-13  HDMPL           v7 Release:
 *                                        Added support for nodes and node connections
 * 80006.1  2011-02-02  HDCAB           v8 Release:
 *                                        Added support for applications and libraries
 *                                        Added support for start mode
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForMessageFlowProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForMessageFlowProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForMessageFlowProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Attempts to remove the supplied message flow.
     * This is a deploy action that requires a running integration 
     * node. 
     * @param object The flow to be removed.
     */
    public void testDeleteMsgFlow(MessageFlowProxy object) {

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
     * Attempts to remove the supplied message flow dependency.
     * This is a deploy action that requires a running integration 
     * node. 
     * @param object The flow to be removed.
     */
    public void testDeleteMsgFlowDependency(MessageFlowDependency object) {
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
     * Gives a quick test of the commands to get an activity log
     * @param object Selected MessageFlowProxy
     */
    public void testGetActivityLog(MessageFlowProxy object) throws ConfigManagerProxyLoggedException {

        try
        {
          ActivityLogProxy alp = object.getActivityLog();
          exerciser.reportActionSubmitted();
          ClassTesterForMiscellaneousActions.testDisplayActivityLog(exerciser,alp);
        } 
        catch (ConfigManagerProxyException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }
    
    /**
     * Gives a quick test of the commands to change
     * message flow properties
     * @param object Selected AdministeredObject
     * @param newName New name of the object
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    public void testModifyMFProperties(MessageFlowProxy object,
                                        String newName,
                                        String shortDesc,
                                        String longDesc) throws ConfigManagerProxyLoggedException {

        ClassTesterForAdministeredObject.testModifyStandardProperties(exerciser, object, newName, shortDesc, longDesc);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some MessageFlowProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param mf A valid MessageFlowProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(MessageFlowProxy mf, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {
            
            // ----------- Display node information -----------
            // (Only in 'advanced' view. In 'everything' nodes
            // are displayed separately in tree).
            if (exerciser.getPropertyDisplayLevel()==1) {
                StringBuffer key = new StringBuffer("getNodes()");
                StringBuffer value = new StringBuffer();
                Enumeration<MessageFlowProxy.Node> e = mf.getNodes();
                if (e == null) {
                    value.append(""+e);
                } else {
                    int count = 0;
                    while (e.hasMoreElements()) {
                        count++;
                        MessageFlowProxy.Node n = e.nextElement();
                        if (n == null) {
                            key.append("\n    ["+count+"]");
                            value.append("\nnull");
                        } else {
                            key.append("\n    ["+count+"]");
                            value.append("\n"+n.getName());
                        }
                    }
                }
                p.setProperty(""+key, ""+value);
            }
            
            
            //----------- Display node connection information -----------
            if (exerciser.getPropertyDisplayLevel()>1) {
                StringBuffer key = new StringBuffer("getNodeConnections()");
                StringBuffer value = new StringBuffer();
                Enumeration<MessageFlowProxy.NodeConnection>ec = mf.getNodeConnections();
                if (ec == null) {
                    value.append(""+ec);
                } else {
                    int count = 0;
                    while (ec.hasMoreElements()) {
                        count++;
                        MessageFlowProxy.NodeConnection n = ec.nextElement();
                        if (n == null) {
                            key.append("\n    ["+count+"]");
                            value.append("\nnull");
                        } else {
                            key.append("\n    ["+count+"] getSourceNode()");
                            value.append("\n"+n.getSourceNode());
                            key.append("\n    ["+count+"] getSourceOutputTerminal()");
                            value.append("\n"+n.getSourceOutputTerminal());
                            key.append("\n    ["+count+"] getTargetNode()");
                            value.append("\n"+n.getTargetNode());
                            key.append("\n    ["+count+"] getTargetInputTerminal()");
                            value.append("\n"+n.getTargetInputTerminal());
                        }
                    }
                }
                p.setProperty(""+key, ""+value);
            } else if (exerciser.getPropertyDisplayLevel()>0) {
                StringBuffer key = new StringBuffer("getNodeConnections()");
                StringBuffer value = new StringBuffer();
                Enumeration<MessageFlowProxy.NodeConnection>ec = mf.getNodeConnections();
                if (ec == null) {
                    value.append(""+ec);
                } else {
                    int count = 0;
                    while (ec.hasMoreElements()) {
                        count++;
                        MessageFlowProxy.NodeConnection n = ec.nextElement();
                        if (n == null) {
                            key.append("\n    ["+count+"]");
                            value.append("\nnull");
                        } else {
                            key.append("\n    ["+count+"]");
                            value.append("\n"+n.getSourceNode()+"("+n.getSourceOutputTerminal()+") -> "+n.getTargetNode()+"("+n.getTargetInputTerminal()+")");
                        }
                    }
                }
                p.setProperty(""+key, ""+value);
            }
                
            
            //----------- Display miscellaneous information -----------
            p.setProperty("isRunning()", ""+mf.isRunning());
            if (exerciser.getPropertyDisplayLevel()>0) {
                p.setProperty("getAdditionalInstances()", ""+mf.getAdditionalInstances());
                p.setProperty("getCommitCount()", ""+mf.getCommitCount());
                p.setProperty("getCommitInterval()", ""+mf.getCommitInterval());
                p.setProperty("getCoordinatedTransaction()", ""+mf.getCoordinatedTransaction());
                p.setProperty("getUserTrace()", ""+mf.getUserTrace());
                p.setProperty("getStartMode()", ""+mf.getStartMode());
                p.setProperty("getFileExtension()", ""+mf.getFileExtension());
                p.setProperty("getNodeTypes()", IntegrationAPIExerciser.formatStringArray(mf.getNodeTypes()));
                p.setProperty("getQueues()", IntegrationAPIExerciser.formatStringArray(mf.getQueues()));
                p.setProperty("isRunEnabled()", ""+mf.isRunEnabled());
                p.setProperty("getDeployedPolicySetNames()", IntegrationAPIExerciser.formatObjectArray(mf.getDeployedPolicySetNames()));
                p.setProperty("getDeployedPolicySetBindingsNames()", IntegrationAPIExerciser.formatObjectArray(mf.getDeployedPolicySetBindingsNames()));
                // In order to work with policy set names and bindings, applications might
                // want to query individual parameters through the MessageFlowProxy.PolicySetName
                // and MessageFlowProxy.PolicySetBindingsName objects rather than simply calling
                // toString() on the returned object, which is effectively what we're doing here!

                //----------- Statistics -----------
                p.setProperty("getStatisticsEnabled(snapshot)", ""+mf.getStatisticsEnabled(true));
                p.setProperty("getStatisticsNodeDetailLevel(snapshot)", ""+mf.getStatisticsNodeDetailLevel(true));
                p.setProperty("getStatisticsThreadDetailLevel(snapshot)", ""+mf.getStatisticsThreadDetailLevel(true));
                p.setProperty("getStatisticsOutputFormat(snapshot)", ""+mf.getStatisticsOutputFormat(true));
                p.setProperty("getStatisticsAccountingOrigin(snapshot)", ""+mf.getStatisticsAccountingOrigin(true));
                p.setProperty("getStatisticsEnabled(archive)", ""+mf.getStatisticsEnabled(false));
                p.setProperty("getStatisticsNodeDetailLevel(archive)", ""+mf.getStatisticsNodeDetailLevel(false));
                p.setProperty("getStatisticsThreadDetailLevel(archive)", ""+mf.getStatisticsThreadDetailLevel(false));
                p.setProperty("getStatisticsOutputFormat(archive)", ""+mf.getStatisticsOutputFormat(false));
                p.setProperty("getStatisticsAccountingOrigin(archive)", ""+mf.getStatisticsAccountingOrigin(false));
                
                //----------- Display runtime properties -----------
                String[] runtimeProperties = mf.getRuntimePropertyNames();
                StringBuffer key = new StringBuffer("getRuntimePropertyNames()");
                StringBuffer value = new StringBuffer();
                if (runtimeProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : runtimeProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+mf.getRuntimeProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);
                //----------- Display deploytime properties -----------
                Properties deployTimeProperties = mf.getDeployProperties();
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

                //----------- Display user defined properties -----------
                String[] userDefinedProperties = mf.getUserDefinedPropertyNames();
                key = new StringBuffer("getUserDefinedPropertyNames()");
                value = new StringBuffer();
                if (userDefinedProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : userDefinedProperties) {
                        try {
                            value.append("\n"+mf.getUserDefinedProperty(thisProperty));
                            key.append("\n    "+thisProperty);
                        } catch (ConfigManagerProxyLoggedException ex) {
                            // Ignore invalid properties
                        }
                    }
                }
                p.setProperty(""+key, ""+value);
            }
            p.setProperty("getFullName()", ""+mf.getFullName());
            p.setProperty("getBARFileName()", ""+mf.getBARFileName());
            p.setProperty("getDeployTime()", ""+IntegrationAPIExerciser.formatDate(mf.getDeployTime()));
            p.setProperty("getModifyTime()", ""+IntegrationAPIExerciser.formatDate(mf.getModifyTime()));
            p.setProperty("getVersion()", ""+mf.getVersion());
            try
            {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(mf.getExecutionGroup()));
            } catch (ConfigManagerProxyLoggedException ex) {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(null));
            }
            
            // ------- Keyword list -------
            StringBuffer value = new StringBuffer();
            String[] keywords = mf.getKeywords();
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
                    p.setProperty("getKeywordValue(\""+keywords[i]+"\")", mf.getKeywordValue(keywords[i]));
                }
            }
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some MessageFlowProxy.Node-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param mfn A valid MessageFlowProxy.Node
     * @param p A valid Properties object
     */
    public void discoverNodeProperties(MessageFlowProxy.Node mfn, Properties p) {
        
        p.setProperty("getName()", ""+mfn.getName());
        p.setProperty("getType()", ""+mfn.getType());
        p.setProperty("getUUID()", ""+mfn.getUUID());
        
        StringBuffer nodePropertiesKey = new StringBuffer("getProperties()");
        StringBuffer nodePropertiesValue = new StringBuffer("");
        Properties nodeProperties = mfn.getProperties();
        Enumeration<?> propertiesEnum = nodeProperties.keys();
        while (propertiesEnum.hasMoreElements()) {
            String propertiesKey = ""+propertiesEnum.nextElement();
            String propertiesValue = nodeProperties.getProperty(propertiesKey);
            nodePropertiesKey.append("\n     "+propertiesKey);
            nodePropertiesValue.append("\n"+propertiesValue);
        }
        p.setProperty(""+nodePropertiesKey, ""+nodePropertiesValue);
    }
    
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some MessageFlowProxy.Node-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param mfn A valid MessageFlowProxy.Node
     * @param p A valid Properties object
     */
    public void discoverDependencyProperties(MessageFlowDependency mfd, Properties p) {
        try {
            p.setProperty("getBARFileName()", ""+mfd.getBARFileName());
            p.setProperty("getDeployTime()", ""+IntegrationAPIExerciser.formatDate(mfd.getDeployTime()));
            p.setProperty("getModifyTime()", ""+IntegrationAPIExerciser.formatDate(mfd.getModifyTime()));
            p.setProperty("getFileExtension()", ""+mfd.getFileExtension());
            p.setProperty("getFullName()", ""+mfd.getFullName());
            p.setProperty("getName()", ""+mfd.getName());
            p.setProperty("getVersion()", ""+mfd.getVersion());

            try {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(mfd.getExecutionGroup()));
            } catch (ConfigManagerProxyLoggedException ex) {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(null));
            }
            p.setProperty("getParent()", ""+IntegrationAPIExerciser.formatAdminObject(mfd.getParent()));

            StringBuffer key = new StringBuffer();
            StringBuffer value = new StringBuffer();
            //----------- Display deploy properties -----------
            Properties deployTimeProperties = mfd.getDeployProperties();
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
            
            // Display the keywords for that object
            value = new StringBuffer();
            String[] keywords = mfd.getKeywords();
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
                    p.setProperty("getKeywordValue(\""+keywords[i]+"\")", ""+mfd.getKeywordValue(keywords[i]));
                }
            }
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    

    /**
     * Tests the setting of the additional instances property
     * @param mf Message Flow
     * @param newValue New number of additional instances threads to assign to the flow
     */
    public void testSetAdditionalInstances(MessageFlowProxy mf, int newValue) throws ConfigManagerProxyException {
        mf.setAdditionalInstances(newValue);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Tests the setting of a runtime property.
     * @param mf Message Flow parent
     * @param propertyName Name of the object's property (e.g. "This/userTraceLevel")
     * @param propertyValue Value to give to the property (e.g. "none")
     */
    public void testSetRuntimeProperty(MessageFlowProxy mf, String propertyName, String propertyValue) throws ConfigManagerProxyException {
        mf.setRuntimeProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the setting of a user defined property.
     * @param mf Message Flow parent
     * @param propertyName Name of the property
     * @param propertyValue Value to give to the property 
     */ 
    public void testSetUserDefinedProperty(MessageFlowProxy mf, String propertyName, String propertyValue) throws ConfigManagerProxyException {    
        mf.setUserDefinedProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
        
    }
    
    /**
     * Tests the archive stats reset method
     * @param mf Message Flow
     */
    public void testResetArchiveStatistics(MessageFlowProxy mf) throws ConfigManagerProxyException {
        mf.resetArchiveStatistics();
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Modifies snapshot stats
     * @param mf Message Flow
     * @param enabled Parameter as entered by the user. Must be 'active' or 'inactive'.
     * @param nodeLevel Parameter as entered by the user. Must be 'none', 'basic' or 'advanced'.
     * @param threadLevel Parameter as entered by the user. Must be 'none' or 'basic'
     * @param outputFormat Parameter as entered by the user. Must be 'usertrace', 'xml' or 'smf'
     * @param accountingOrigin Parameter as entered by the user.
     */
    public void testModifyStatisticsSnapshotProperties(MessageFlowProxy mf, String enabled, String nodeLevel, String threadLevel, String outputFormat, String accountingOrigin) {
        // Convert the user-supplied strings into properties
        // that are acceptable to the MessageFlowProxy methods
        boolean newEnabled = false;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPPUBLICATIONON_ACTIVE.equalsIgnoreCase(enabled.trim())) {
            newEnabled = true;
        }
        int newNodeLevel = 0;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_BASIC.equalsIgnoreCase(nodeLevel.trim())) {
            newNodeLevel = 1;
        } else if (AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_ADVANCED.equalsIgnoreCase(nodeLevel.trim())) {
            newNodeLevel = 2;
        }
        int newThreadLevel = 0;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPTHREADDATALEVEL_BASIC.equalsIgnoreCase(threadLevel.trim())) {
            newThreadLevel = 1;
        }
        String newOutputFormat = outputFormat.trim();
        String newAccountingOrigin = accountingOrigin.trim();
        
        boolean currentEnabled = false;
        int currentNodeLevel = 0;
        int currentThreadLevel = 0;
        String currentOutputFormat = AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPOUTPUTFORMAT_USERTRACE;
        String currentAccountingOrigin = "";
        
        try {
            currentEnabled = mf.getStatisticsEnabled(true);
            currentNodeLevel = mf.getStatisticsNodeDetailLevel(true);
            currentThreadLevel = mf.getStatisticsThreadDetailLevel(true);
            currentOutputFormat = mf.getStatisticsOutputFormat(true);
            currentAccountingOrigin= mf.getStatisticsAccountingOrigin(true);
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }

        try {
            if (currentEnabled != newEnabled) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsEnabled(true, "+newEnabled+") :");
                mf.setStatisticsEnabled(true, newEnabled);
                exerciser.reportActionSubmitted();
            }
            
            if (currentNodeLevel != newNodeLevel) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsNodeDetailLevel(true, "+newNodeLevel+") :");
                mf.setStatisticsNodeDetailLevel(true, newNodeLevel);
                exerciser.reportActionSubmitted();
            }
            
            if (currentThreadLevel != newThreadLevel) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsThreadDetailLevel(true, "+newThreadLevel+") :");
                mf.setStatisticsThreadDetailLevel(true, newThreadLevel);
                exerciser.reportActionSubmitted();
            }
            
            if (!newOutputFormat.equals(currentOutputFormat)) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsOutputFormat(true, \""+newOutputFormat+"\") :");
                mf.setStatisticsOutputFormat(true, newOutputFormat);
                exerciser.reportActionSubmitted();
            }
            
            if (!newAccountingOrigin.equals(currentAccountingOrigin)) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsAccountingOrigin(true, \""+newAccountingOrigin+"\") :");
                mf.setStatisticsAccountingOrigin(true, newAccountingOrigin);
                exerciser.reportActionSubmitted();
            }
        } catch (ConfigManagerProxyLoggedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }
    
    /**
     * Modifies archive stats
     * @param mf Message Flow
     * @param enabled Parameter as entered by the user. Must be 'active' or 'inactive'.
     * @param nodeLevel Parameter as entered by the user. Must be 'none', 'basic' or 'advanced'.
     * @param threadLevel Parameter as entered by the user. Must be 'none' or 'basic'
     * @param outputFormat Parameter as entered by the user. Must be 'usertrace', 'xml' or 'smf'
     * @param accountingOrigin Parameter as entered by the user.
     */
    public void testModifyStatisticsArchiveProperties(MessageFlowProxy mf, String enabled, String nodeLevel, String threadLevel, String outputFormat, String accountingOrigin) {
        // Convert the user-supplied strings into properties
        // that are acceptable to the MessageFlowProxy methods
        boolean newEnabled = false;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVALON_ACTIVE.equalsIgnoreCase(enabled.trim())) {
            newEnabled = true;
        }
        int newNodeLevel = 0;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_BASIC.equalsIgnoreCase(nodeLevel.trim())) {
            newNodeLevel = 1;
        } else if (AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_ADVANCED.equalsIgnoreCase(nodeLevel.trim())) {
            newNodeLevel = 2;
        }
        int newThreadLevel = 0;
        if (AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVETHREADDATALEVEL_BASIC.equalsIgnoreCase(threadLevel.trim())) {
            newThreadLevel = 1;
        }
        String newOutputFormat = outputFormat.trim();
        String newAccountingOrigin = accountingOrigin.trim();
        
        boolean currentEnabled = false;
        int currentNodeLevel = 0;
        int currentThreadLevel = 0;
        String currentOutputFormat = AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVEOUTPUTFORMAT_USERTRACE;
        String currentAccountingOrigin = "";
        
        try {
            currentEnabled = mf.getStatisticsEnabled(false);
            currentNodeLevel = mf.getStatisticsNodeDetailLevel(false);
            currentThreadLevel = mf.getStatisticsThreadDetailLevel(false);
            currentOutputFormat = mf.getStatisticsOutputFormat(false);
            currentAccountingOrigin= mf.getStatisticsAccountingOrigin(false);
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }

        try {
            if (currentEnabled != newEnabled) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsEnabled(false, "+newEnabled+") :");
                mf.setStatisticsEnabled(false, newEnabled);
                exerciser.reportActionSubmitted();
            }
            
            if (currentNodeLevel != newNodeLevel) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsNodeDetailLevel(false, "+newNodeLevel+") :");
                mf.setStatisticsNodeDetailLevel(false, newNodeLevel);
                exerciser.reportActionSubmitted();
            }
            
            if (currentThreadLevel != newThreadLevel) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsThreadDetailLevel(false, "+newThreadLevel+") :");
                mf.setStatisticsThreadDetailLevel(false, newThreadLevel);
                exerciser.reportActionSubmitted();
            }
            
            if (!newOutputFormat.equals(currentOutputFormat)) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsOutputFormat(false, \""+newOutputFormat+"\") :");
                mf.setStatisticsOutputFormat(false, newOutputFormat);
                exerciser.reportActionSubmitted();
            }
            
            if (!newAccountingOrigin.equals(currentAccountingOrigin)) {
                exerciser.consoleLogger.logFine("MessageFlowProxy.setStatisticsAccountingOrigin(false, \""+newAccountingOrigin+"\")");
                mf.setStatisticsAccountingOrigin(false, newAccountingOrigin);
                exerciser.reportActionSubmitted();
            }
        } catch (ConfigManagerProxyLoggedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }
    
}
