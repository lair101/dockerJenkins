/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2014.                     
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
import com.ibm.broker.config.proxy.DeployedObjectGroupProxy;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;

/*****************************************************************************
 * <p>Each SubFlowProxy object represents a subflow
 * as deployed in a single integration server.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForSubFlowProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test SubFlowProxy APIs
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
 *          2014-06-16  HDCAB           v10 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForSubFlowProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForSubFlowProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForSubFlowProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Attempts to remove the supplied subflow. This is a deploy 
     * action that requires a running integration node. 
     * @param object The flow to be removed.
     */
    public void testDeleteSubFlow(SubFlowProxy object) {

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
     * Gives a quick test of the commands to change
     * subflow properties
     * @param object Selected AdministeredObject
     * @param newName New name of the object
     * @param shortDesc New Short Description
     * @param longDesc New Long Description
     */
    public void testModifySFProperties(SubFlowProxy object,
                                       String newName,
                                       String shortDesc,
                                       String longDesc) throws ConfigManagerProxyLoggedException {

        ClassTesterForAdministeredObject.testModifyStandardProperties(exerciser, object, newName, shortDesc, longDesc);
        exerciser.reportActionSubmitted();
    }
    
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some SubFlowProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param sf A valid SubFlowProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(SubFlowProxy sf, Properties p) {
        
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
                Enumeration<MessageFlowProxy.Node> e = sf.getNodes();
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
                Enumeration<MessageFlowProxy.NodeConnection>ec = sf.getNodeConnections();
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
                Enumeration<MessageFlowProxy.NodeConnection>ec = sf.getNodeConnections();
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
            if (exerciser.getPropertyDisplayLevel()>0) {
                p.setProperty("getFileExtension()", ""+sf.getFileExtension());
                p.setProperty("getNodeTypes()", IntegrationAPIExerciser.formatStringArray(sf.getNodeTypes()));
                p.setProperty("getQueues()", IntegrationAPIExerciser.formatStringArray(sf.getQueues()));
                p.setProperty("getDeployedPolicySetNames()", IntegrationAPIExerciser.formatObjectArray(sf.getDeployedPolicySetNames()));
                p.setProperty("getDeployedPolicySetBindingsNames()", IntegrationAPIExerciser.formatObjectArray(sf.getDeployedPolicySetBindingsNames()));
                // In order to work with policy set names and bindings, applications might
                // want to query individual parameters through the MessageFlowProxy.PolicySetName
                // and MessageFlowProxy.PolicySetBindingsName objects rather than simply calling
                // toString() on the returned object, which is effectively what we're doing here!
                
                //----------- Display runtime properties -----------
                String[] runtimeProperties = sf.getRuntimePropertyNames();
                StringBuffer key = new StringBuffer("getRuntimePropertyNames()");
                StringBuffer value = new StringBuffer();
                if (runtimeProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : runtimeProperties) {
                        key.append("\n    "+thisProperty);
                        value.append("\n"+sf.getRuntimeProperty(thisProperty));
                    }
                }
                p.setProperty(""+key, ""+value);
                //----------- Display deploytime properties -----------
                Properties deployTimeProperties = sf.getDeployProperties();
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
                String[] userDefinedProperties = sf.getUserDefinedPropertyNames();
                key = new StringBuffer("getUserDefinedPropertyNames()");
                value = new StringBuffer();
                if (userDefinedProperties == null) {
                    value.append("");
                } else {
                    for (String thisProperty : userDefinedProperties) {
                        try {
                            value.append("\n"+sf.getUserDefinedProperty(thisProperty));
                            key.append("\n    "+thisProperty);
                        } catch (ConfigManagerProxyLoggedException ex) {
                            // Ignore invalid properties
                        }
                    }
                }
                p.setProperty(""+key, ""+value);
            }
            p.setProperty("getFullName()", ""+sf.getFullName());
            p.setProperty("getBARFileName()", ""+sf.getBARFileName());
            p.setProperty("getDeployTime()", ""+IntegrationAPIExerciser.formatDate(sf.getDeployTime()));
            p.setProperty("getModifyTime()", ""+IntegrationAPIExerciser.formatDate(sf.getModifyTime()));
            p.setProperty("getVersion()", ""+sf.getVersion());
            try
            {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(sf.getExecutionGroup()));
            } catch (ConfigManagerProxyLoggedException ex) {
              p.setProperty("getExecutionGroup()", ""+IntegrationAPIExerciser.formatAdminObject(null));
            }
            
            // ------- Keyword list -------
            StringBuffer value = new StringBuffer();
            String[] keywords = sf.getKeywords();
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
                    p.setProperty("getKeywordValue(\""+keywords[i]+"\")", sf.getKeywordValue(keywords[i]));
                }
            }

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    
    /**
     * Tests the setting of a runtime property.
     * @param sf Subflow parent
     * @param propertyName Name of the object's property (e.g. "This/userTraceLevel")
     * @param propertyValue Value to give to the property (e.g. "none")
     */
    public void testSetRuntimeProperty(SubFlowProxy sf, String propertyName, String propertyValue) throws ConfigManagerProxyException {
        sf.setRuntimeProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the setting of a user defined property.
     * @param sf Subflow parent
     * @param propertyName Name of the property
     * @param propertyValue Value to give to the property 
     */ 
    public void testSetUserDefinedProperty(SubFlowProxy sf, String propertyName, String propertyValue) throws ConfigManagerProxyException {    
        sf.setUserDefinedProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
        
    }
    

    
}
