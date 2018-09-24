/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2008-2010.                     
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

import java.io.IOException;

import com.ibm.broker.config.proxy.BrokerConnectionParameters;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyException;
import com.ibm.broker.config.proxy.DeployResult;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.IntegrationNodeConnectionParameters;

/*****************************************************************************
 * <P>A simple application to deploy a BAR file.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>DeployBAR</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Provides example code that shows how to
 *     use the IBM Integration API (CMP) to deploy a BAR file.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     None
 *   </TD>
 * </TR>
 * </TABLE>
 * <pre>
 *
 * Change Activity:
 * -------- ----------- -------------   ------------------------------------
 * Reason:  Date:       Originator:     Comments:
 * -------- ----------- -------------   ------------------------------------
 * 25103.5  2004-04-22  HDMPL           v6 Release
 * 44841    2007-03-19  HDMPL           v6.1 Release - Use v6.1 object names
 * 51619.6  2008-12-01  HDMPL           v7 Release - Connects directly with broker
 * 58121    2010-04-12  HDMPL           v7.0.0.1 - Allow overrides through cmdline
 * 63273    2011-11-22  HDMPL           v8 Release - Use v8 object names
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/

public class DeployBAR {
    
    /**
     * Attempts to deploy a BAR file to
     * the resource whose name is hard-coded within the source. 
     * @param args Not used
     */
    public static void main(String[] args) {
        
        // Modify the values of these variables in order
        // to change the integration node, integration server and BAR
        // file settings used by this sample, or override
        // a new set on the command line using the usage
        // information below.
        // -----------------------------------------------
        String brokerHostName     = "localhost";
        int    brokerPort         = 4414;
        String executionGroupName = "default";
        String barFileName        = "mybar.bar";
        int    timeoutSecs        = 10;
        // -----------------------------------------------
        if (args.length > 0) {
            if (args.length < 4) {
                System.err.println("Usage: StartDeployBAR [<hostname> <port> <integrationServer> <barFile> [<timeoutSecs>]]");
                System.exit(1);
            } else {
                brokerHostName = args[0];
                brokerPort = Integer.parseInt(args[1]);
                executionGroupName = args[2];
                barFileName = args[3];
                if (args.length>4) timeoutSecs = Integer.parseInt(args[4]);
            }
        }
        deployBAR(brokerHostName, brokerPort, executionGroupName, barFileName, timeoutSecs);
    }
        
    private static void deployBAR(String brokerHostName,
                                  int brokerPort,
                                  String executionGroupName,
                                  String barFileName,
                                  int timeoutSecs) {
        // Instantiate an object that describes the connection
        // characteristics to the integration node.
        BrokerConnectionParameters bcp =
            new IntegrationNodeConnectionParameters(brokerHostName, brokerPort);
        BrokerProxy b = null;
        
        try {
            // Start communication with the integration node
            System.out.println("Connecting to the integration node running at "+brokerHostName+":"+brokerPort+"...");
            b = BrokerProxy.getInstance(bcp);
            
            // Has the integration node responded to the connection attempt?
            if (!b.hasBeenPopulatedByBroker(true)) {
                // The application timed out while waiting for a response from the
                // integration node. When it finally becomes available, hasBeenPopulatedByBroker()
                // will return true. This application won't wait for that though-
                // it will just exit now.
                System.out.println("Broker is not responding.");
            } else {
                
                System.out.println("Discovering integration server '"+executionGroupName+"'...");
                ExecutionGroupProxy eg = b.getExecutionGroupByName(executionGroupName);
                
                // If the integration server exists, deploy to it.
                if (eg == null) {
                    System.out.println("Integration server not found");
                } else {
                    // Deploy the BAR file and display the result
                    System.out.println("Deploying "+barFileName+"...");
                    try {
                        DeployResult deployResult = eg.deploy(barFileName, // location of BAR
                                                              true,        // incremental, i.e. don't empty the integration server first
                                                              timeoutSecs * 1000); // wait for integration node response
                                                              
                        System.out.println("Result = "+deployResult.getCompletionCode());

                        // You may like to improve this application by querying
                        // the deployResult for more information, particularly if
                        // deployResult.getCompletionCode() == CompletionCodeType.failure.
                        
                    } catch (IOException ioEx) {
                        // e.g. if BAR file doesn't exist
                        ioEx.printStackTrace();
                    }
                    
                }
                
            }
        } catch (ConfigManagerProxyException cmpEx) {
            cmpEx.printStackTrace();
        } finally {
            if (b != null) {
                b.disconnect();
            }
        }
    }      
}
