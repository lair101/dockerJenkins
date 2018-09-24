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

import java.util.Enumeration;
import java.util.Properties;

import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.EventManagerProxy;
import com.ibm.broker.config.proxy.EventProxy;

/*****************************************************************************
 * <p>The EventManagerProxy object represents the event manager within the
 * integration node.
 * <p>
 * <b>NOTE:</b>
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForEventManagerProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test EventManagerProxy APIs
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
public class ClassTesterForEventManagerProxy {
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;
    
    /**
     * Instantiates a new ClassTesterForEventManagerProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForEventManagerProxy(IntegrationAPIExerciser exerciser) {
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
    public void discoverProperties(EventManagerProxy emp, Properties p) {
        
        // These methods set may fail with a
        // ConfigManagerProxyPropertyNotInitialisedException, which means
        // that information on the administered object was not supplied by
        // the Configuration Manager before a timeout occurred. If this
        // happens for *one* of these methods it will happen for *all*, so it
        // is acceptable to enclose all of this section in a single
        // try/catch block.
        
        try {                 
          //----------- Display the events -----------     
          Enumeration<EventProxy> eventEnum = emp.getEvents();
          addEventEnumerationToProperties("getEvents()", eventEnum, p);                   

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
            exerciser.consoleLogger.logThrowing(e);
        }
    }

    private void addEventEnumerationToProperties(String description, Enumeration<EventProxy> eventEnum, Properties p)
    {
      StringBuffer key = new StringBuffer(description);
      StringBuffer value = new StringBuffer();
      if (eventEnum == null) 
      {
        value.append(""+eventEnum);
      } 
      else 
      {
        int count = 0;
        while (eventEnum.hasMoreElements()) {
          count++;
          key.append("\n    ["+count+"]");
          value.append("\n");
          EventProxy event = (EventProxy)eventEnum.nextElement();
          value.append(IntegrationAPIExerciser.formatAdminObject(event));
        }
      }
      p.setProperty(""+key, ""+value); 
    }
    
}
