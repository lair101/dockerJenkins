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

import javax.swing.JTextPane;
import javax.swing.SwingUtilities;
import javax.swing.text.JTextComponent;

/*****************************************************************************
 * <P>Renders the console as HTML.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ConsoleLoggerHTML</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Renders the console as HTML.
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
public class ConsoleLoggerHTML extends ConsoleLogger {

    JTextPane console;
    StringBuffer text;
    int indent = 0;
    
    public ConsoleLoggerHTML(GUIEventListener guiEventListener, String welcomeText) {
        console = new JTextPane();
        text = new StringBuffer();
        console.setBackground(new Color(212,232,255));
        console.addMouseListener(guiEventListener);
        console.setContentType("text/html");
        log(new ConsoleEntry(LogType.FINE, welcomeText));
    }
    
    /**
     * This method is called after a log entry has been added.
     */
    @Override
    void log(ConsoleEntry entry) {
        
        synchronized (this) {
            
            // Start with the basic message.
            String outputMessage = entry.getMessage();
            
            // Replace HTML reserved characters
            outputMessage = outputMessage.replaceAll("<", "&lt;");
            outputMessage = outputMessage.replaceAll(">", "&gt;");
            outputMessage = outputMessage.replaceAll("\n", "<br>");
            
            // Format the message in HTML based on the type
            int localIndent = indent;
            LogType lType = entry.getType();
            if (lType == LogType.ENTERING) {
                outputMessage = "<span style=\"font-family:verdana\">" + addIndent(indent++) + "<i>----&gt;&nbsp;" + outputMessage + "</i></span>";
                
                // Apply any formatting for the subtype
                lType = entry.getSubtype();
                localIndent = 0;
            } else if (lType == LogType.EXITING) {
                outputMessage = "<span style=\"font-family:verdana\">" + addIndent(--indent) + "<i>&lt;----&nbsp;" + outputMessage + "</i></span>";
                
                // Apply any formatting for the subtype
                lType = entry.getSubtype();
                localIndent = 0;
            }
            
            if (lType == LogType.FINE) {
                outputMessage = "<span style=\"font-family:verdana\">" + addIndent(localIndent) + outputMessage + "</span>";
            } else if (lType == LogType.FINER) {
                outputMessage = "<span style=\"color:#404040;font-family:verdana\">" + addIndent(localIndent)+ outputMessage + "</span>";
            } else if (lType == LogType.FINEST) {
                outputMessage = "<span style=\"color:#808080;font-family:verdana\">" + addIndent(localIndent)+ outputMessage + "</span>";
            } else if (lType == LogType.INFO) {
                outputMessage = "<span style=\"font-family:verdana\"<b>" + addIndent(localIndent) + outputMessage + "</b></span>";
            } else if (lType == LogType.SEVERE) {
                outputMessage = "<span style=\"font-family:verdana\"<b><i><font color=" + addIndent(localIndent) + outputMessage + "</i></b></span>";
            } else if (lType == LogType.THROWING) {
                outputMessage = "<span style=\"font-family:verdana\"<b><i>" + addIndent(localIndent) + outputMessage + "</i></b></span>";
            }
            
            // Add the timestamp and a newline char at the end
            DateFormat df = DateFormat.getTimeInstance(DateFormat.MEDIUM, Locale.getDefault());
            String formattedDate = df.format(new Date());
            outputMessage = "<span style=\"font-family:verdana;color:#c0c0c0\">" + formattedDate + "</span>&nbsp;" + outputMessage + "<br>";
            
            SwingUtilities.invokeLater(new LogThread(outputMessage));
        }
    }

    private String addIndent(int levelsToAdd) {
        StringBuffer retVal = new StringBuffer();
        for (int i=0; i<levelsToAdd; i++)
            retVal.append("&nbsp;&nbsp;&nbsp;&nbsp;");
        return retVal.toString();
    }

    /**
     * Used by the log() method.
     * Appends to the log at the bottom of the screen in
     * a separate thread, because append() and setCaretPosition()
     * are not thread-safe.
     */
    class LogThread implements Runnable {
        String newHTML;
        public LogThread(String newHTML) {
            this.newHTML = newHTML;
        }
        public void run() {
            text.append(newHTML);
            console.setText("<html>"+text+"</html>");
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
     * Called when the user invokes the "Clear Console" action.
     */
    @Override
    void clear() {
        console.setText("");
        text = new StringBuffer();
    }

    /**
     * Returns the recommended file extension for save requests 
     */
    @Override
    String getSaveFileExtension() {
        return "html";
    }

}
