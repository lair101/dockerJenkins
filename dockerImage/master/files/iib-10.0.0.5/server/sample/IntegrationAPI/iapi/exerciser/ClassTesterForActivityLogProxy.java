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

import java.util.Enumeration;
import java.util.Properties;

import com.ibm.broker.config.proxy.ActivityLogEntry;
import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;

/*****************************************************************************
 * <p>The ActivityLogProxy object represents a log of runtime activity
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take a ActivityLogProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy bp = BrokerProxy.getLocalInstance("TESTNODE");
 * ExecutionGroupProxy eg = bp.getExecutionGroupByName("default");
 * ActivityLogProxy l = eg.getActivityLog();
 * </pre>
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForActivityLogProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test ActivityLogProxy APIs
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
 * 80006.2  2011-04-18  HDCAB           v8 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForActivityLogProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForActivityLogProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForActivityLogProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the log display
     * functionality.
     * @param l
     */
    public void testLogDisplay(ActivityLogProxy l) {

        try {
            Enumeration<ActivityLogEntry> e = l.elements();
            if (e.hasMoreElements()) {
                while (e.hasMoreElements()) {
                    ActivityLogEntry thisEntry = (ActivityLogEntry) e.nextElement();
                    exerciser.consoleLogger.logFine("-----------------------------------");
                    exerciser.consoleLogger.logFine("getThreadIdentifier() = "+thisEntry.getThreadIdentifier());
                    exerciser.consoleLogger.logFine("getThreadSequenceNumber() = "+thisEntry.getThreadSequenceNumber());
                    exerciser.consoleLogger.logFine("getTimestamp() = "+thisEntry.getTimestamp());
                    exerciser.consoleLogger.logFine("getMessage() = "+thisEntry.getMessage());
                    exerciser.consoleLogger.logFine("getDetail() = "+thisEntry.getDetail());
                    exerciser.consoleLogger.logFine("getSource() = "+thisEntry.getSource());
                    exerciser.consoleLogger.logFine("getTagsSize() = "+thisEntry.getTagsSize());
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
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some ActivityLogProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param log A valid ActivityLogProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(ActivityLogProxy log, Properties p) {
        
        // ---------- Misc properties ----------
        // (only one specific to activity logs)
        try {
            p.setProperty("getSize()", ""+log.getSize());
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
        
        // ---------- Display log entries ----------
        // Could also use getActivityLogEntry( 0 .. log.getSize() )
        Enumeration<ActivityLogEntry> e = null;
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
                    ActivityLogEntry l = (ActivityLogEntry)e.nextElement();
                    
                    if (exerciser.getPropertyDisplayLevel()>1) {
                        key.append("\n    ["+count+"] getThreadIdentifier()");
                        value.append("\n"+l.getThreadIdentifier());
                        key.append("\n    ["+count+"] getThreadSequenceNumber()");
                        value.append("\n"+l.getThreadSequenceNumber());
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

                        // ------- Inserts -------
                        int numberOfInserts = l.getInsertsSize();
                        value.append("\n"+numberOfInserts);
                                            
                        for (int i=0; i<numberOfInserts; i++) {
                            key.append("\n    ["+count+"] getInsert("+i+")");
                            value.append("\n"+l.getInsert(i));
                        }

                        // ------- Tags -------
                        key.append("\n    ["+count+"] getTagsSize()");
                        int numberOfTags = l.getTagsSize();
                        value.append("\n"+numberOfTags);

                        Enumeration<String> tagNames = l.getTagNames();
                        while(tagNames.hasMoreElements()) 
                        {
                          String tagName = tagNames.nextElement();
                          String tagValue = l.getTagValue(tagName);
                            key.append("\n    ["+count+"] getTagValue("+tagName+")");
                            value.append("\n"+tagValue);
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
