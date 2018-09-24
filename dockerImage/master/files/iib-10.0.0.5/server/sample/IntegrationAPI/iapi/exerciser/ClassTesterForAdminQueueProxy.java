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

import com.ibm.broker.config.proxy.AdminQueueEntry;
import com.ibm.broker.config.proxy.AdminQueueProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;

/*****************************************************************************
 * <p>The AdminQueueProxy object represents the list of
 * outstanding work items of administration commands.
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take a AdminQueueProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy bp = BrokerProxy.getLocalInstance("TESTNODE");
 * AdminQueueProxy aqp = bp.getAdminQueue();
 * </pre>
 * 
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForAdminQueueProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test AdminQueueProxy APIs
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
 * 51619.40 2009-05-29  HDMPL           v7 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForAdminQueueProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForAdminQueueProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForAdminQueueProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }
    
    /**
     * Gives a quick test of the admin queue display
     * functionality.
     * @param aqp
     */
    public void testAdminQueueDisplay(AdminQueueProxy aqp) {

        try {
        	synchronized (aqp) { // Prevent changes to the list while we're enumerating it
	            Enumeration<AdminQueueEntry> e = aqp.elements();
	            int i=0;
	            if (e.hasMoreElements()) {
	                while (e.hasMoreElements()) {
	                    AdminQueueEntry thisEntry = (AdminQueueEntry) e.nextElement();
	                    exerciser.consoleLogger.logFine("-----------------------------------");
	                    exerciser.consoleLogger.logFine("#"+(++i) + " of "+aqp.getSize());
                            exerciser.reportAdminQueueEntry(thisEntry);
	                    if (!e.hasMoreElements()) {
	                        exerciser.consoleLogger.logFine("-----------------------------------");
	                    }
	                }
	            } else {
	                exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_EMPTY));
	            }
        	}

        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Tests the admin queue cancel
     * functionality.
     * @param aqp
     * @param descriptiveAQE In the format as supplied by formatAdminQueueEntry()
     */
    public void testAdminQueueCancel(AdminQueueProxy aqp, String descriptiveAQE) {
        try {
        	if (ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_NOTHINGTOCANCEL).equals(descriptiveAQE)) {
        		// If the user selected the dummy "nothing to cancel"
            	// option, don't submit the request
        	    exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_EMPTY));
        	} else {
        		// Convert the descriptive drop-down box into the workid
        		// that the CMP is expecting.
        		String id = getWorkIDFromAdminQueueEntryFormatString(descriptiveAQE);
        		
        		// Cancel the AdminQueueEntry with the supplied id.
        		aqp.cancel(id);
        		exerciser.reportActionSubmitted();
        	}
        } catch (Exception ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some AdminQueueProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param aqp A valid AdminQueueProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(AdminQueueProxy aqp, Properties p) {
        
        // ---------- Misc properties ----------
        // (only one specific to admin queues)
        try {
            p.setProperty("getSize()", ""+aqp.getSize());
        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
        
        // ---------- Display admin queue entries ----------
        // Could also use getAdminQueueEntry( 0 .. aqp.getSize() )
        Enumeration<AdminQueueEntry> e = null;
        StringBuffer key = new StringBuffer("elements()");
        StringBuffer value = new StringBuffer();
        
        try {
            e = aqp.elements();
            if (e == null) {
                value.append(""+e);
            } else {
                int count = 0;
                while (e.hasMoreElements()) {
                    count++;
                    AdminQueueEntry aqe = (AdminQueueEntry)e.nextElement();
                    
                    if (exerciser.getPropertyDisplayLevel()>1) {
                        key.append("\n    ["+count+"] getObjectName()");
                        value.append("\n"+aqe.getObjectName());
                        key.append("\n    ["+count+"] getObjectType()");
                        value.append("\n"+IntegrationAPIExerciser.formatConfigurationObjectType(aqe.getObjectType()));
                        key.append("\n    ["+count+"] getUser()");
                        value.append("\n"+aqe.getUser());
                        key.append("\n    ["+count+"] getWorkIdentifier()");
                        value.append("\n"+aqe.getWorkIdentifier());
                        key.append("\n    ["+count+"] getCreationTimestamp()");
                        value.append("\n"+IntegrationAPIExerciser.formatDate(aqe.getCreationTimestamp()));
                        key.append("\n    ["+count+"] getLastStatusChangeTimestamp()");
                        value.append("\n"+IntegrationAPIExerciser.formatDate(aqe.getLastStatusChangeTimestamp()));
                        key.append("\n    ["+count+"] getOperationType()");
                        value.append("\n"+aqe.getOperationType());
                        key.append("\n    ["+count+"] getParentType()");
                        value.append("\n"+IntegrationAPIExerciser.formatConfigurationObjectType(aqe.getParentType()));
                        key.append("\n    ["+count+"] getStatus()");
                        value.append("\n"+aqe.getStatus());
                        if (e.hasMoreElements()) {
                            key.append("\n    ----------");
                            value.append("\n");
                        }
                    } else {
                        // In less detailed views, display a condensed version of the above
                        key.append("\n    ["+count+"]");
                        value.append("\n" + formatAdminQueueEntry(aqe));
                    }
                }
            }        
        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            exerciser.consoleLogger.logThrowing(ex);
        }
       
        p.setProperty(""+key, ""+value); 
    }

    /**
     * Returns a string containing the important information on an AdminQueueEntry object.
     * @param aqe
     * @return
     */
    protected String formatAdminQueueEntry(AdminQueueEntry aqe) {
    	// Don't modify this without modifying getWorkIDFromAdminQueueEntryFormatString()
    	return aqe.getOperationType() +
	     " "+aqe.getObjectName() +
	     ", "+aqe.getUser() +
	     ", "+aqe.getStatus() +
	     ", "+IntegrationAPIExerciser.formatDate(aqe.getCreationTimestamp())+
	     " : "+aqe.getWorkIdentifier();
    }
    
    /**
     * Returns the work identifier part of the supplied AdminQueueEntry String
     * @param aqeFormattedString, in the format as returned by formatAdminQueueEntry()
     * @return WorkID, or null if the String was not in the correct format
     */
    protected String getWorkIDFromAdminQueueEntryFormatString(String aqeFormattedString) {
    	String retVal = null;
    	if (aqeFormattedString != null) {
	    	int lastColon = aqeFormattedString.lastIndexOf(" : ");
	    	if (lastColon != -1) {
	    		retVal = aqeFormattedString.substring(lastColon + " : ".length());
	    	}
    	}
    	return retVal;
    }
}
