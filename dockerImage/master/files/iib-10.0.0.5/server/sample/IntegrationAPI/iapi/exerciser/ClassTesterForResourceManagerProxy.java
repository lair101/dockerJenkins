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

import java.util.Properties;

import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AdminQueueEntry;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ResourceManagerProxy;

/*****************************************************************************
 * <p>Each ResourceManagerProxy object represents a resource manager in a
 * single integration server.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForResourceManagerProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test ResourceManagerProxy APIs
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
 * 80006.1  2011-09-16  HDCAB           v8 Release:
 *    3779  2012-05-08  HDCAB           - Added support for runtime properties
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForResourceManagerProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForResourceManagerProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForResourceManagerProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the commands to get an activity log
     * @param object Selected ResourceManagerProxy
     */
    public void testGetActivityLog(ResourceManagerProxy object) throws ConfigManagerProxyLoggedException {

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
     * Tests the setting of a runtime property.
     * @param rm A valid ResourceManagerProxy
     * @param propertyName Name of the object's property (e.g. 
     *                     "This/traceLevel")
     * @param propertyValue Value to give to the property (e.g. 
     *                      debug)
     */
    public void testSetRuntimeProperty(ResourceManagerProxy rm, String propertyName, String propertyValue) throws ConfigManagerProxyLoggedException {
        rm.setRuntimeProperty(propertyName, propertyValue);
        exerciser.reportActionSubmitted();
    }

    /**
     * Tests the execute action on the Resource manager proxy 
     * allowing the passing in of semi colon delimited parameters 
     * and properties.
     * @param rm A valid ResourceManagerProxy 
     * @param actionName name of the action to execute (e.g. Report) 
     * @param objectName name of the object on which to perform the 
     *                   action. (e.g. HTTPConnector)
     * @param propertyName Name of an action parameter (e.g. 
     *                     "recursive")
     * @param propertyValue Value of an action parameter (e.g. yes) 
                                                                    */
    public void testExecute(ResourceManagerProxy rm, 
                            String actionName, 
                            String actionParametersStr, 
                            String objectName, 
                            String objectPropertiesStr) throws ConfigManagerProxyLoggedException {

        if(rm != null) {
            Properties actionParms = exerciser.delimitedStringToProperties(actionParametersStr, ";", "=");
            Properties objectProperties = exerciser.delimitedStringToProperties(objectPropertiesStr, ";", "=");

            AdminQueueEntry result = rm.execute(actionName, actionParms, objectName, objectProperties);
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
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some ResourceManagerProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param rm A valid ResourceManagerProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(ResourceManagerProxy rm, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {               
            
            //----------- Display miscellaneous information -----------
            p.setProperty("isActivityLogSupported()", ""+rm.isActivityLogSupported());

            //----------- Display runtime properties -----------
            String[] runtimeProperties = rm.getRuntimePropertyNames();
            StringBuffer key = new StringBuffer("getRuntimePropertyNames()");
            StringBuffer value = new StringBuffer();
            if (runtimeProperties == null) {
                value.append("");
            } else {
                for (String thisProperty : runtimeProperties) {
                    key.append("\n    "+thisProperty);
                    value.append("\n"+rm.getRuntimeProperty(thisProperty));
                }
            }
            p.setProperty(""+key, ""+value);
            

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        } 
    }
    
}
