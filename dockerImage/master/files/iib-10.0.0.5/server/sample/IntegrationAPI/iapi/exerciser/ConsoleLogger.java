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

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;

import javax.swing.text.JTextComponent;

/*****************************************************************************
 * <P>Abstract parent for all console renderers.
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
 *     <LI>Abstract parent for all console renderers.
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
public abstract class ConsoleLogger {

    /**
     * Logs a method entry message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used when methods are invoked from inside the 
     * CommandThread. 
     * @param message
     * @param subType the default type of any text that should
     * appear inside the entry message.
     */
    void logEntering(String message, ConsoleEntry.LogType subType) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
        log(new ConsoleEntry(ConsoleEntry.LogType.ENTERING, message, subType));
    }
    
    /**
     * Logs a method exit message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used when invoked methods return from inside the 
     * CommandThread. 
     * @param message
     * @param subType the default type of any text that should
     * appear inside the exit message.
     */
    void logExiting(String message, ConsoleEntry.LogType subType) {
        log(new ConsoleEntry(ConsoleEntry.LogType.EXITING, message, subType));
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
    }
    
    /**
     * Logs an informational message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used to show overall success/failure messages. 
     * @param message
     */
    void logInfo(String message) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
        log(new ConsoleEntry(ConsoleEntry.LogType.INFO, message));
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
    }
    
    /**
     * Logs a fine-level message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used to show output from the invoked methods. 
     * @param message
     */
    void logFine(String message) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, message));
    }
    
    /**
     * Logs a finer-level message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used to show actionresponse and delete notifications from 
     * the IBM Integration API (CMP). 
     * @param message
     */
    void logFiner(String message) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINER, message));
    }
    
    /**
     * Logs a finest-level message to the console.
     * In the IBM Integration API (CMP), this message type is used 
     * to show modify notifications from the IBM Integration API 
     * (CMP). 
     * @param message
     */
    void logFinest(String message) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINEST, message));
    }
    
    /**
     * Logs an exception to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used to show all caught exceptions. 
     * @param message
     */
    void logThrowing(Throwable ex) {
        
        // Dump the stack trace to a printwriter
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PrintWriter pw = new PrintWriter(baos);
        ex.printStackTrace(pw);
        pw.flush();

        // Convert the printwriter into a string, converting
        // newlines to spaces.
        String stackTrace = baos.toString();
        stackTrace = stackTrace.replace('\n', ' ');
     
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
        log(new ConsoleEntry(ConsoleEntry.LogType.THROWING, stackTrace));
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
    }
    
    /**
     * Logs a severe-level message to the console.
     * In the IBM Integration API (CMP) Exerciser, this message type 
     * is used to show IBM Integration API (CMP) Exerciser 
     * application errors. 
     * @param message
     */
    void logSevere(String message) {
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
        log(new ConsoleEntry(ConsoleEntry.LogType.SEVERE, message));
        log(new ConsoleEntry(ConsoleEntry.LogType.FINE, ""));
    }
    
    /**
     * Asks the renderer to save the contents of the console
     * to the supplied file name.
     */
    abstract void save(String fileName);
    
    /**
     * Returns the recommended file extension for saves. 
     */
    abstract String getSaveFileExtension();
    
    /**
     * Asks the renderer to clear the console.
     */
    abstract void clear();
    
    /**
     * Asks the renderer to log the supplied ConsoleEntry.
     */
    abstract void log(ConsoleEntry entry);
    
    /**
     * Returns the JTextComponent renderer.
     */
    abstract JTextComponent getJTextComponent();
}

/** Represents a single entry in the console. */
class ConsoleEntry {
    
    /** Enum of all possible ConsoleEntry types */
    static enum LogType { ENTERING, EXITING, INFO, FINE, FINER, FINEST, THROWING, SEVERE };
    
    /** The type of the ConsoleEntry */
    private LogType type;
    /** The text associated with the entry */
    private String message;
    /** The subtype of the ConsoleEntry - only used when type is ENTERING or EXITING. */
    private LogType subtype;
    
    /**
     * Constructs a new ConsoleEntry
     * @param type Type of the ConsoleEntry; denotes the entries context and severity.
     * @param message The text associated with the entry
     * @param subtype The subtype associated with the entry
     */
    public ConsoleEntry(LogType type, String message, LogType subtype) {
        this.type = type;
        this.message = message;
        this.subtype = subtype;
    }
    
    /**
     * Constructs a new ConsoleEntry
     * @param type Type of the ConsoleEntry; denotes the entries context and severity.
     * @param message The text associated with the entry
     */
    public ConsoleEntry(LogType type, String message) {
        this(type, message, null);
    }
    
    /** Returns the type of the ConsoleEntry */
    public LogType getType() {
        return type;
    }
    
    /** Returns any subtype of the ConsoleEntry.
        If the subtype is not set, null is returned. */
    public LogType getSubtype() {
        return subtype;
    }
    
    /** Returns the text associated with the entry */
    public String getMessage() {
        return message;
    }
}