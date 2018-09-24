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

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Properties;

import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurationObjectType;
import com.ibm.broker.config.proxy.PolicyManagerProxy;
import com.ibm.broker.config.proxy.PolicyProxy;
import com.ibm.broker.config.proxy.WLMPolicyProxy;

/*****************************************************************************
 * <p>Each PolicyProxy object represents a policy manager in a
 * an integration node.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForPolicyProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test PolicyProxy APIs
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
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForPolicyProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForPolicyProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForPolicyProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }

    /**
     * Tests the createPolicy(PolicyProxy) method on the policy 
     * manager proxy allowing the passing of an existing policy 
     * proxy and a new policy name. 
     * @param policy A valid PolicyProxy 
     * @param newPolicyName name of the new policy
     */
    public void testCopyPolicy(PolicyProxy policy, String newPolicyName) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      if(policy != null) 
      {
        int existingSynchronousParameter = exerciser.broker.getSynchronous();
        try 
        {
          boolean synchronousRequests = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
          if (synchronousRequests) 
          {
            int maxPolicyWaitTimeSecs = ResourcesHandler.getUserSettingInt(ResourcesHandler.POLICY_WAIT_TIME_SECS, 30);
            exerciser.broker.setSynchronous(maxPolicyWaitTimeSecs*1000);
          }
    
          AdministeredObject parent = policy.getParent();
          if((parent != null) && (parent.getConfigurationObjectType() == ConfigurationObjectType.policyManager))
          {
            PolicyManagerProxy pm = (PolicyManagerProxy)parent;
            String policyContent = policy.getPolicyContent();
            exerciser.consoleLogger.logFine("Copying policy " + policy.getPolicyName() + " with type " + pm.getPolicyType() + " to " + newPolicyName);
            exerciser.consoleLogger.logFine("Policy contents " + policyContent);
            // The following line does the actual policy creation.
            PolicyProxy newPolicy = new PolicyProxy(pm.getPolicyType(), newPolicyName);
            newPolicy.setPolicyContent(policyContent);
            pm.createPolicy(newPolicy);
            exerciser.reportActionSubmitted();
          }
          else
          {
            exerciser.consoleLogger.logFine("Could not copy policy " + policy.getName()+ 
                                            " because it does not have a PolicyManagerProxy Parent");
          }
        } finally {
          exerciser.broker.setSynchronous(existingSynchronousParameter);
        }           
      }
    }

    /**
     * Tests the updatePolicy methods on the policy manager proxy 
     * allowing the passing in of a file path for the policy 
     * content. 
     * @param pm A valid PolicyProxy 
     * @param policyFileName name of the policy xml file 
     */
    public void testUpdatePolicy(PolicyProxy policy, String policyFileName) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      if(policy != null) 
      {
        FileInputStream fis = null;
        int existingSynchronousParameter = exerciser.broker.getSynchronous();
        try 
        {
          boolean synchronousRequests = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
          if (synchronousRequests) 
          {
            int maxPolicyWaitTimeSecs = ResourcesHandler.getUserSettingInt(ResourcesHandler.POLICY_WAIT_TIME_SECS, 30);
            exerciser.broker.setSynchronous(maxPolicyWaitTimeSecs*1000);
          }
    
          //The policy file base name will be used as the policy name.
          //The contents of the policy file will then we used as the policy contents
          String policyName = policy.getName();
          StringBuilder stringBuilder = new StringBuilder();
          fis = new FileInputStream(policyFileName);        
          Reader fileReader = new BufferedReader(new InputStreamReader(fis, "UTF-8"));
          char[] charBuffer = new char[8192];
          int bytesRead = 0;
          while ((bytesRead = fileReader.read(charBuffer, 0, charBuffer.length)) > 0) 
          {
            stringBuilder.append(charBuffer, 0, bytesRead);
          }
          String policyContent = stringBuilder.toString();
          AdministeredObject parent = policy.getParent();
          if((parent != null) && (parent.getConfigurationObjectType() == ConfigurationObjectType.policyManager))
          {
            PolicyManagerProxy pm = (PolicyManagerProxy)parent;
            exerciser.consoleLogger.logFine("Updating policy " + policyName+ " with type " + pm.getPolicyType());
            exerciser.consoleLogger.logFine("New policy contents " + policyContent);
            // The following line does the actual policy update.
            PolicyProxy newPolicy = new PolicyProxy(pm.getPolicyType(), policyName);
            newPolicy.setPolicyContent(policyContent);
            pm.updatePolicy(newPolicy);
            exerciser.reportActionSubmitted();
          }
          else
          {
            exerciser.consoleLogger.logFine("Could not update policy " + policy.getName()+ 
                                            " because it does not have a PolicyManagerProxy Parent");
          }
        } catch(IOException ex) {
          exerciser.consoleLogger.logThrowing(ex);
        } finally {
          exerciser.broker.setSynchronous(existingSynchronousParameter);
        }           
      }
    }

    /**
     * Tests the deletePolicy(PolicyProxy) method on the policy 
     * manager proxy allowing the passing in of a policy proxy. 
     * @param policy A valid PolicyProxy 
     */
    public void testDeletePolicy(PolicyProxy policy) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      if(policy != null) 
      {
        AdministeredObject parent = policy.getParent();
        if((parent != null) && (parent.getConfigurationObjectType() == ConfigurationObjectType.policyManager))
        {
          int existingSynchronousParameter = exerciser.broker.getSynchronous();
          try
          {
            boolean synchronousRequests = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true);
            if (synchronousRequests) 
            {
              int maxPolicyWaitTimeSecs = ResourcesHandler.getUserSettingInt(ResourcesHandler.POLICY_WAIT_TIME_SECS, 30);
              exerciser.broker.setSynchronous(maxPolicyWaitTimeSecs*1000);
            }
            PolicyManagerProxy pm = (PolicyManagerProxy)parent;
            exerciser.consoleLogger.logFine("Deleting policy " + policy.getName()+ " of type "+pm.getPolicyType());
            pm.deletePolicy(policy);
            exerciser.reportActionSubmitted();
          } finally {
            exerciser.broker.setSynchronous(existingSynchronousParameter);
          } 
        }
        else
        {
          exerciser.consoleLogger.logFine("Could not delete policy " + policy.getName()+ 
                                          " because it does not have a PolicyManagerProxy Parent");
        }
      }          
    }
      
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some PolicyProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param rm A valid PolicyProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(PolicyProxy policy, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {               
            
            //----------- Display miscellaneous information -----------
            p.setProperty("getPolicyName()", ""+policy.getPolicyName());
            p.setProperty("getPolicyType()", ""+policy.getPolicyType());
            p.setProperty("getPolicyContent()", ""+policy.getPolicyContent());
            p.setProperty("getPolicyUri()", ""+policy.getPolicyUri());
            

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some PolicyProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param rm A valid PolicyProxy
     * @param p A valid Properties object
     */
    public void discoverWLMProperties(WLMPolicyProxy policy, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {               
            
            //----------- Display basic information -----------
            p.setProperty("getPolicyName()", ""+policy.getPolicyName());
            p.setProperty("getPolicyType()", ""+policy.getPolicyType());
            p.setProperty("getPolicyContent()", ""+policy.getPolicyContent());
            p.setProperty("getPolicyUri()", ""+policy.getPolicyUri());
            //----------- Display miscellaneous information -----------
            p.setProperty("getNotificationThresholdMsgsPerSec()", ""+policy.getNotificationThresholdMsgsPerSec());
            p.setProperty("getMaximumRateMsgsPerSec()", ""+policy.getMaximumRateMsgsPerSec());
            p.setProperty("getAdditionalInstances()", ""+policy.getAdditionalInstances());
            p.setProperty("getStartInstancesWhenFlowStarts()", ""+policy.getStartInstancesWhenFlowStarts());
            p.setProperty("getStartMode()", ""+policy.getStartMode());
            p.setProperty("getCommitCount()", ""+policy.getCommitCount());
            p.setProperty("getCommitInterval()", ""+policy.getCommitInterval());
            WLMPolicyProxy.ProcessingTimeoutAction timeoutAction = policy.getProcessingTimeoutAction();
            if(timeoutAction == WLMPolicyProxy.ProcessingTimeoutAction.restartExecutionGroup) 
            {
              p.setProperty("getProcessingTimeoutAction()", "restartExecutionGroup");
            }
            else
            {
              p.setProperty("getProcessingTimeoutAction()", "none");
            }
            p.setProperty("getPolicyContent()", ""+policy.getPolicyContent());
            

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    
}
