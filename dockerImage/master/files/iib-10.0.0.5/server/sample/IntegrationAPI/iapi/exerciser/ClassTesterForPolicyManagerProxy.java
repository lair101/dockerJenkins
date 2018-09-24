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
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Properties;
import java.util.StringTokenizer;

import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.PolicyManagerProxy;
import com.ibm.broker.config.proxy.PolicyProxy;

/*****************************************************************************
 * <p>Each PolicyManagerProxy object represents a policy manager in a
 * an integration node.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForPolicyManagerProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test PolicyManagerProxy APIs
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
public class ClassTesterForPolicyManagerProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForPolicyManagerProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForPolicyManagerProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }    

    /**
     * Tests the createPolicy(String, String) method on the policy 
     * manager proxy allowing the passing in of a policy name and 
     * the file path of the policy content. 
     * @param pm A valid PolicyManagerProxy 
     * @param policyFileName name of the policy xml file
     */
    public void testCreatePolicy(PolicyManagerProxy pm, String policyFileName) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      testCreatePolicy(pm, policyFileName, false);
    }

    /**
     * Tests the createPolicy(PolicyProxy) method on the policy 
     * manager proxy allowing the passing in of a policy name and 
     * the file path of the policy content. 
     * @param pm A valid PolicyManagerProxy 
     * @param policyFileName name of the policy xml file 
     */
    public void testCreatePolicyProxy(PolicyManagerProxy pm, String policyFileName)                                      
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException
    {
      testCreatePolicy(pm, policyFileName, true);
    }

    /**
     * Tests the createPolicy methods on the policy 
     * manager proxy allowing the passing in of a policy name and 
     * the policy content.
     * @param pm A valid PolicyManagerProxy 
     * @param policyFileName name of the policy xml file 
     * @param createProxy Indicates whether the PolicyProxy or 
     *                    String,String createPolicy methods are to
     *                    be used
     */
    private void testCreatePolicy(PolicyManagerProxy pm, String policyFileName, boolean createProxy) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      if(pm != null) 
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
          String policyName = generatePolicyName(policyFileName);
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
          exerciser.consoleLogger.logFine("Creating policy " + policyName+ " with type " + pm.getPolicyType());
          exerciser.consoleLogger.logFine("Policy contents " + policyContent);
          // The following line does the actual policy creation.
          if(createProxy) 
          {
            PolicyProxy newPolicy = new PolicyProxy(pm.getPolicyType(), policyName);
            newPolicy.setPolicyContent(policyContent);
            pm.createPolicy(newPolicy);
          }
          else
          {
            pm.createPolicy(policyName, policyContent);
          }
          exerciser.reportActionSubmitted();
        } catch(IOException ex) {
          exerciser.consoleLogger.logThrowing(ex);
        } finally {
          exerciser.broker.setSynchronous(existingSynchronousParameter);
        }           
      }
    }

    /**
     *  Generates the name of a policy  based on its name in  
     *   the filesystem. User-written applications need not generate
     *   names of policys in this way, but can instead choose to
     *   invent more meaningful names.
     * @param pathFileName Path and file name
     * @return String fileName
     */
    private String generatePolicyName(String pathFileName) 
    {
      File f = new File(pathFileName);
      String fileName = f.getName();
    
      // Remove any file extension
      int i = fileName.lastIndexOf(".");
      if (i>0) 
      {
        fileName = fileName.substring(0, i);
      }
    
      // Keep the name simple; strip out some non-standard characters
      String retVal = "";
      StringTokenizer st = new StringTokenizer(fileName, " ,!\u00a3$%^&*()-=+[]{};:'@#~,<.>?|");  
      while (st.hasMoreTokens()) 
      {
        retVal = retVal + st.nextToken();
      }
     
      return retVal;
    }

    /**
     * Tests the deletePolicy(String) method on the policy 
     * manager proxy allowing the passing in of a policy name. 
     * @param pm A valid PolicyManagerProxy 
     * @param policyName name of the policy
     */
    public void testDeletePolicy(PolicyManagerProxy pm, String policyName) 
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException  
    {
      if(pm != null) 
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
          exerciser.consoleLogger.logFine("Deleting policy " + policyName+ " of type "+pm.getPolicyType());
          pm.deletePolicy(policyName);
          exerciser.reportActionSubmitted();
        } finally {
          exerciser.broker.setSynchronous(existingSynchronousParameter);
        } 
      }          
    }

    /**
     * Tests the deletePolicy(PolicyProxy) method on the policy 
     * manager proxy allowing the passing in of a policy name. 
     * @param pm A valid PolicyManagerProxy 
     * @param policyName name of the policy 
     */
    public void testDeletePolicyProxy(PolicyManagerProxy pm, String policyName)                                      
      throws ConfigManagerProxyLoggedException, ConfigManagerProxyPropertyNotInitializedException
    {
      if(pm != null) 
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

          exerciser.consoleLogger.logFine("Deleting policy " + policyName+ " of type "+pm.getPolicyType());
          PolicyProxy newPolicy = new PolicyProxy(pm.getPolicyType(), policyName);
          pm.deletePolicy(newPolicy);
          exerciser.reportActionSubmitted();
        } finally {
          exerciser.broker.setSynchronous(existingSynchronousParameter);
        } 
      }
    }

      
    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some PolicyManagerProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param rm A valid PolicyManagerProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(PolicyManagerProxy pm, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {               
            
            //----------- Display miscellaneous information -----------
            p.setProperty("getPolicyType()", ""+pm.getPolicyType());

            //----------- Display runtime properties -----------
            String[] policyNames = pm.getPolicyNames();
            StringBuffer key = new StringBuffer("getPolicyNames()");
            StringBuffer value = new StringBuffer();
            if (policyNames == null) {
                value.append("");
            } else {
                int count = 0;
                for (String thisPolicyName : policyNames) {
                    count++;
                    key.append("\n    ["+count+"]");
                    value.append("\n"+thisPolicyName);
                }
            }
            p.setProperty(""+key, ""+value);
            

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    
}
