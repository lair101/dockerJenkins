/*
 * Sample program for use with Product         
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2009.                     
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
import iapi.exerciser.ConsoleEntry.LogType;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.swing.JTextArea;
import javax.swing.SwingUtilities;
import javax.swing.text.JTextComponent;

/*****************************************************************************
 * <P>Renders the console as plain text.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ConsoleLoggerPlain</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Renders the console as plain text.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *       <LI><TT>cmp.exerciser.ConsoleLogger</TT>
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
 * 51619.71 2009-06-03  HDMPL           v7 Release
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class ConsoleLoggerPlain extends ConsoleLogger {

    JTextArea console;
    
    public ConsoleLoggerPlain(GUIEventListener guiEventListener, String welcomeText) {
        console = new JTextArea(welcomeText, 12, 50);
        console.setBackground(new Color(212,232,255));
        console.addMouseListener(guiEventListener);
    }
    
    /**
     * This method is called after a log entry has been added.
     */
    @Override
    void log(ConsoleEntry entry) {
        DateFormat df = DateFormat.getTimeInstance(DateFormat.MEDIUM, Locale.getDefault());
        String formattedDate = df.format(new Date());
        synchronized (this) {
            String outputMessage = entry.getMessage();
            
            LogType lType = entry.getType();
            if (lType == LogType.ENTERING) {
                outputMessage = "----> " + outputMessage;
            } else if (lType == LogType.EXITING) {
                outputMessage = "<---- " + outputMessage;
            }
            outputMessage = "("+formattedDate+") " + outputMessage;
            SwingUtilities.invokeLater(new LogThread(outputMessage));
            
        }
    }

    /**
     * Returns the JTextComponent responsible for rendering the console.
     */
    @Override
    JTextComponent getJTextComponent() {
        return console;
    }

    /**
     * Saves the log to disk
     * @param fileName
     */
    void save(String fileName) {
        try {
            File f = new File(fileName);
            FileOutputStream fos = new FileOutputStream(f);
            fos.write(console.getText().getBytes("UTF8"));
            fos.close();
            logFine(ResourcesHandler.getNLSResource(ResourcesHandler.CONSOLE_SAVED));
        } catch (IOException ex) {
            logThrowing(ex);
        }
    }
    
    /**
     * Used by the log() method.
     * Appends to the log at the bottom of the screen in
     * a separate thread, because append() and setCaretPosition()
     * are not thread-safe.
     */
    class LogThread implements Runnable {
        
        String s;
        public LogThread(String s) {
            this.s = s;
        }
        public void run() {
            console.append(s+"\n");
            console.setCaretPosition(console.getText().length());
        }
    }

    /**
     * Called when the user invokes the "Clear Console" action.
     */
    @Override
    void clear() {
        console.setText("");
    }

    /**
     * Returns the recommended file extension for save requests 
     */
    @Override
    String getSaveFileExtension() {
        return "log";
    }
}
