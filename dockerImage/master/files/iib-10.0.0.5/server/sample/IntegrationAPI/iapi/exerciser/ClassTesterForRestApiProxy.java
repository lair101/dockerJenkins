/*
 * Sample program for use with Product
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2015.
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


/*****************************************************************************
 * <p>Each RestApiProxy object represents a REST API within a specific integration server.
 * <p>
 * <b>NOTE:</b>
 * <p>
 * Most methods in this class tester take an RestApiProxy
 * parameter. If you wish to gain a handle to such an object
 * in your own code, use something like:
 * <pre>
 * BrokerProxy b = BrokerProxy.getLocalInstance("TESTNODE");
 * ExecutionGroupProxy e = b.getExecutionGroupByName("eg1");
 * RestApiProxy aRestApi = e.getRestApiByName("application1");
 * </pre>
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ClassTesterForRestApiProxy</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Services to test RestApiProxy APIs
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
 * xyzab    2015-01-20  SS1             v10 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ClassTesterForRestApiProxy extends ClassTesterForApplicationProxy {

    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;

    /**
     * Instantiates a new ClassTesterForRestApiProxy that is
     * linked to the supplied GUI
     * @param exerciser GUI object to which the tester is linked
     */
    ClassTesterForRestApiProxy(IntegrationAPIExerciser exerciser) {
        super(exerciser);
        this.exerciser = exerciser;
    }

}
