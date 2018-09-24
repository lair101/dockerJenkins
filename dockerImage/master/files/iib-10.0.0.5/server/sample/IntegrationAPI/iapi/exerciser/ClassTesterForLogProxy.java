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

import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.LogProxy;

/*****************************************************************************
 * <p>The LogProxy object represents the log of an integration node
 * messages relevant to the current user.
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take a LogProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy bp = BrokerProxy.getLocalInstance("TESTNODE");
 * LogProxy l = bp.getLog();
 * </pre>
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForLogProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test LogProxy APIs
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
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForLogProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForLogProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForLogProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the log display
     * functionality.
     * @param l
     */
    public void testLogDisplay(LogProxy l) {

        try {
            Enumeration<LogEntry> e = l.elements();
            if (e.hasMoreElements()) {
                while (e.hasMoreElements()) {
                    LogEntry thisEntry = (LogEntry) e.nextElement();
                    exerciser.consoleLogger.logFine("-----------------------------------");
                    exerciser.consoleLogger.logFine("getMessage() = "+thisEntry.getMessage());
                    exerciser.consoleLogger.logFine("getDetail() = "+thisEntry.getDetail());
                    exerciser.consoleLogger.logFine("getSource() = "+thisEntry.getSource());
                    exerciser.consoleLogger.logFine("getTimestamp() = "+thisEntry.getTimestamp());
                    if (!e.hasMoreElements()) {
                        exerciser.consoleLogger.logFine("-----------------------------------");
                    }
                }
            } else {
                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.LOG_EMPTY));
            }

        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Gives a quick test of the log clear
     * functionality.
     * @param l
     */
    public void testLogClear(LogProxy l) {
        try {
            l.clear();
            exerciser.reportActionSubmitted();
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some LogProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param log A valid LogProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(LogProxy log, Properties p) {
        
        // ---------- Misc properties ----------
        // (only one specific to logs)
        try {
            p.setProperty("getSize()", ""+log.getSize());
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
        
        // ---------- Display log entries ----------
        // Could also use getLogEntry( 0 .. log.getSize() )
        Enumeration<LogEntry> e = null;
        StringBuffer key = new StringBuffer("elements()");
        StringBuffer value = new StringBuffer();
        
        try {
            e = log.elements();
            if (e == null) {
                value.append(""+e);
            } else {
                int count = 0;
                while (e.hasMoreElements()) {
                    count++;
                    LogEntry l = (LogEntry)e.nextElement();
                    
                    if (exerciser.getPropertyDisplayLevel()>1) {
                        key.append("\n    ["+count+"] getMessage()");
                        value.append("\n"+l.getMessage());
                        key.append("\n    ["+count+"] getDetail()");
                        value.append("\n"+IntegrationAPIExerciser.getFirstLine(l.getDetail()));
                        key.append("\n    ["+count+"] getMessageNumber()");
                        value.append("\n"+l.getMessageNumber());
                        key.append("\n    ["+count+"] getSource()");
                        value.append("\n"+l.getSource());
                        key.append("\n    ["+count+"] getTimestamp()");
                        value.append("\n"+IntegrationAPIExerciser.formatDate(l.getTimestamp()));
                        key.append("\n    ["+count+"] isErrorMessage()");
                        value.append("\n"+l.isErrorMessage());
                        key.append("\n    ["+count+"] getInsertsSize()");
                        int numberOfInserts = l.getInsertsSize();
                        value.append("\n"+numberOfInserts);
                    
                        // ------- Inserts -------
                        for (int i=0; i<numberOfInserts; i++) {
                            key.append("\n    ["+count+"] getInsert("+i+")");
                            value.append("\n"+l.getInsert(i));
                        }
                        
                        if (e.hasMoreElements()) {
                            key.append("\n    ----------");
                            value.append("\n");
                        }
                    } else {
                        // In less detailed views, display a condensed version of the above
                        key.append("\n    ["+count+"]");
                        value.append("\n("+IntegrationAPIExerciser.formatDate(l.getTimestamp()) + ") " + IntegrationAPIExerciser.getFirstLine(l.getDetail()));
                    }
                }
            }        
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
       
        p.setProperty(""+key, ""+value); 
    }

}
