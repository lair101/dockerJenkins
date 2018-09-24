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

import java.util.Enumeration;
import java.util.Properties;

import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.EventProxy;

/*****************************************************************************
 * <p>An EventProxy object represents an event defined to the integration node
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForEventProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test EventProxy APIs
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
 *          2014-06-16  HDCAB           v10 Release:
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForEventProxy {

    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;

    /**
     * Instantiates a new ClassTesterForEventManagerProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForEventProxy(IntegrationAPIExerciser exerciser) {
        this.exerciser=exerciser;
    }

    /**
     * Adds to the supplied Properties table a set of key/value pairs that
     * describe some EventManagerProxy-specific methods that may
     * be invoked on the supplied object, and the returned value from
     * those methods.
     * @param em A valid EventManagerProxy
     * @param p A valid Properties object
     */
    public void discoverProperties(EventProxy event, Properties p) {

        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.

        try {

            //----------- Display profile information that this event is linked to  -----------
            p.setProperty("getProfileName()", ""+event.getProfileName());
            p.setProperty("getProfileVersion()", ""+event.getProfileVersion());
          //----------- Display information about the nature of this event  -----------
            p.setProperty("getEventSource()", ""+event.getEventSource());
            p.setProperty("getEventSourceAddress()", ""+event.getEventSourceAddress());
            p.setProperty("getEventType()", ""+event.getEventType());
            p.setProperty("getEventName()", ""+event.getEventName());
            p.setProperty("getEventURI()", ""+event.getEventURI());
            p.setProperty("getFilter()", ""+event.getFilter());
            p.setProperty("getUnitOfWork()", ""+event.getUnitOfWork());
            p.setProperty("isEnabled()", ""+event.isEnabled());
            p.setProperty("isTransactionEvent()", ""+event.isTransactionEvent());
            //----------- Display the publishers information -----------
            p.setProperty("getNumberOfPublishers()", ""+event.getNumberOfPublishers());
            p.setProperty("getNumberOfActivePublishers()", ""+event.getNumberOfActivePublishers());
            addPublishersToProperties("getPublishers(false)", event.getPublishers(false), p);
            addPublishersToProperties("getPublishers(true)", event.getPublishers(true), p);
            //----------- Display the event correlation details  -----------
            p.setProperty("getLocalTransactionCorrelator()", ""+event.getLocalTransactionCorrelator());
            p.setProperty("getParentTransactionCorrelator()", ""+event.getParentTransactionCorrelator());
            p.setProperty("getGlobalTransactionCorrelator()", ""+event.getGlobalTransactionCorrelator());
            //----------- Display information about the event paylod  -----------
            p.setProperty("isBitstreamDataIncludedInPayload()", ""+event.isBitstreamDataIncludedInPayload());
            p.setProperty("getPayloadBitstreamContentType()", ""+event.getPayloadBitstreamContentType());
            p.setProperty("getPayloadBitstreamContentEncodingType()", ""+event.getPayloadBitstreamContentEncodingType());
            addPayloadDataLocationsToProperties("getPayloadDataLocations()", event.getPayloadDataLocations(), p);


        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }

    private void addStringEnumerationToProperties(String description, Enumeration<String> e, Properties p)
    {
      StringBuffer key = new StringBuffer(description);
      StringBuffer value = new StringBuffer();
      if (e == null)
      {
        value.append(""+e);
      }
      else
      {
        int count = 0;
        while (e.hasMoreElements())
        {
          count++;
          String n = e.nextElement();
          key.append("\n    ["+count+"]");
          if (n == null)
          {
            value.append("\nnull");
          }
          else
          {
            value.append("\n"+n);
          }
        }
      }
      p.setProperty(""+key, ""+value);
    }

    private void addPayloadDataLocationsToProperties(String description, Enumeration<EventProxy.DataLocation> e, Properties p)
    {
      StringBuffer key = new StringBuffer(description);
      StringBuffer value = new StringBuffer();
      if (e == null)
      {
        value.append(""+e);
      }
      else
      {
        int count = 0;
        while (e.hasMoreElements())
        {
          count++;
          EventProxy.DataLocation nextEntry = e.nextElement();
          String n = nextEntry.toString();
          key.append("\n    ["+count+"]");
          if (n == null)
          {
            value.append("\nnull");
          }
          else
          {
            value.append("\n"+n);
          }
        }
      }
      p.setProperty(""+key, ""+value);
    }

    private void addPublishersToProperties(String description, Enumeration<EventProxy.Publisher> e, Properties p)
    {
      StringBuffer key = new StringBuffer(description);
      StringBuffer value = new StringBuffer();
      if (e == null)
      {
        value.append(""+e);
      }
      else
      {
        int count = 0;
        while (e.hasMoreElements())
        {
          count++;
          EventProxy.Publisher nextEntry = e.nextElement();
          String n = nextEntry.toString();
          key.append("\n    ["+count+"]");
          if (n == null)
          {
            value.append("\nnull");
          }
          else
          {
            value.append("\n"+n);
          }
        }
      }
      p.setProperty(""+key, ""+value);
    }
}
