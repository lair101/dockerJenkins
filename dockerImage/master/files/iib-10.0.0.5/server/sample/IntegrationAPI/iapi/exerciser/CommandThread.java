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

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Iterator;
import java.util.List;
import java.util.Vector;

import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.Spring;
import javax.swing.SpringLayout;

import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.BarFile;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyRequestFailureException;
import com.ibm.broker.config.proxy.ConfigManagerProxyRequestTimeoutException;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.MessageFlowDependency;

/*****************************************************************************
 * <p>This is a helper class that is used by the IntegrationAPIExerciser.
 * <P>The CommandThread uses its own thread to invoke the various actions
 * possible from the IBM Integration API (CMP) Exerciser. It does this because some methods
 * may take some time to complete, and so by using a separate thread interface
 * actions (such as screen updates) can still occur.
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>CommandThread</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Accepting requests to invoking methods in the IBM Integration API (CMP) Exerciser
 * application that test the Configuration Manager Proxy.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *       <LI><TT>cmp.common.ResourcesHandler</TT>
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
 * 25103.7  2004-08-03  HDMPL           v6 Release
 * 44739.7  2007-05-03  HDMPL           Updates for Java 5
 *
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
class CommandThread implements Runnable {

    Thread commandThread = null;
    
    /**
     * Each element describes a command that the user has requested.
     * Commands are pulled from the command queue and invoked by the
     * command thread.
     */
    Vector<IntegrationAPIExerciserCommand> commandQueue;
    
    /**
     * True if and only if the command thread can be
     * interrupted by an incoming action.
     */
    boolean interruptable = false;
    
    /**
     * True if and only if the command thread is currently
     * busy processing a command.
     */
    boolean busy;
    
    /**
     * GUI object to which the tester is linked
     */
    IntegrationAPIExerciser exerciser;

    /**
     * The progress bar dialog - shown whenever a long running
     * operation is being performed.
     */
    private JDialog progressBarDialog;
    
    
    /**
     * Instantiates a new CommandThread.
     * @param exerciser handler to the provider of log functions.
     */
    protected CommandThread(IntegrationAPIExerciser exerciser) {
        commandQueue = new Vector<IntegrationAPIExerciserCommand>();
        this.exerciser = exerciser;
        busy = false;
        
        initialiseProgressBarDialog();
    }  

    /**
     * Initialises the progress bar dialog, but does not display it.
     */
    private void initialiseProgressBarDialog() {
        
        int xPadding = 12;
        int yPadding = 12;
        int heightOfComponents = 24;
        int barWidth = 376;
        
        progressBarDialog = new JDialog();
        progressBarDialog.setTitle(ResourcesHandler.getNLSResource(ResourcesHandler.PLEASE_WAIT));
        progressBarDialog.setResizable(false);
        JPanel panel = new JPanel();
        panel.setLayout(new SpringLayout());
        progressBarDialog.setContentPane(panel);
        SpringLayout layout = (SpringLayout) panel.getLayout();
        
        // Position the label
        JLabel lab = new JLabel(ResourcesHandler.getNLSResource(ResourcesHandler.PLEASE_WAIT_VERBOSE));
        panel.add(lab);
        SpringLayout.Constraints c = layout.getConstraints(lab);
        c.setX(Spring.constant(xPadding));
        c.setY(Spring.constant(yPadding));
        
        // Position the progress bar
        JProgressBar jpb = new JProgressBar();
        jpb.setIndeterminate(true);
        panel.add(jpb);
        c = layout.getConstraints(jpb);
        c.setX(Spring.constant(xPadding));
        c.setWidth(Spring.constant(barWidth));
        c.setY(Spring.constant(heightOfComponents + yPadding));
        
        // Size the dialog
        c = layout.getConstraints(panel);
        c.setConstraint(SpringLayout.SOUTH, Spring.constant(heightOfComponents + (yPadding*3)));
        c.setConstraint(SpringLayout.EAST, Spring.constant((xPadding*2) + barWidth));
        progressBarDialog.pack();
        
        
    }

    /**
     * Adds the command with the supplied characteristics to the command queue for processing.
     * @param method Method to be invoked
     * @param testOwner The IntegrationAPIExerciser member variable that owns the method 
     * @param parameters The parameters to the method
     * @param suppressEntryExitLogMessage If and only if the value is true, the "--->" and "<---"
     * lines, which describe the method being invoked, will not be shown 
     * @param suppressBusyWarning If and only if the value is true, the warning message,
     * usually displayed if the queue is already dealing with an action, will not be shown.  
     */
    protected void enqueueCommand(Method method, Object testOwner, Object[] parameters, boolean suppressEntryExitLogMessage, boolean suppressBusyWarning) {
        ensureRunningCommandThread();
        
        // If the command is already doing something important, tell the user.
        if ((busy) && (!suppressBusyWarning)) {
            exerciser.consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.COMMAND_THREAD_BUSY));
        }
        
        // Tell the command queue to do something.
        synchronized (commandQueue) {
            commandQueue.add(new IntegrationAPIExerciserCommand(method, testOwner, parameters, suppressEntryExitLogMessage));
        }
        
        // Nudge the command thread so that it wakes up from any sleep,
        // but only if it's not already doing anything important.
        synchronized (commandThread) {
            if (interruptable && (commandThread != null)) {
                commandThread.interrupt();
            }
        }
    }
    
    
    /**
     * Returns the actual thread associated with this CommandThread,
     * having first created a new one if necessary. 
     */
    private void ensureRunningCommandThread() {
        if (commandThread == null) {
            commandThread = new Thread(this);
            commandThread.setDaemon(true);
            commandThread.setName("CMPExerciserCmd");
        }  
        if (!commandThread.isAlive()) {
            commandThread.start();
        }
    }

    /**
     * Waits for commands to arrive on the command queue and invokes them
     * @see java.lang.Runnable#run()
     */
    public void run() {
        
        // As a daemon thread, this thread will finish
        // when the main (non-daemon) thread does.
        while (true) {
                    
            // If the application isn't finishing but there are
            // no commands to process, sleep for one second.
            if (commandQueue.size() == 0) {
                synchronized (commandThread) {
                    try {
                        interruptable = true;
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        // ignore
                    } finally {
                        interruptable = false;
                    }
                }
            }
            
            // If there are commands to process, do the next one
            // on the queue.
            if (commandQueue.size() > 0) {
                IntegrationAPIExerciserCommand c;
                synchronized (commandQueue) {
                    c = (IntegrationAPIExerciserCommand)commandQueue.remove(0);
                }
                if (!exerciser.isHeadless()) {
                    exerciser.centerComponentInExerciser(progressBarDialog);
                    progressBarDialog.setVisible(true);
                }
                busy = true;
                invokeCommand(c);
                
                if (commandQueue.size() == 0) {
                    busy = false;
                    progressBarDialog.setVisible(false);
                }
            }
         }
    }
    
    /**
     * Issues the command represented by the parameter.
     * @param c
     */
    private void invokeCommand(IntegrationAPIExerciserCommand c) {
        String command = c.testOwner.getClass().getName()+"."+c.method.getName();
        String inputInfo = command + "(";
        String outputInfo = command;
        
        // Log the input parameters
        if (c.parameters != null) {
            for (int i=0; i<c.parameters.length; i++) {
                if (c.parameters[i] != null) {
                    if (c.parameters[i] instanceof String) {
                        inputInfo = inputInfo.concat("\"" + c.parameters[i] + "\"");
                    } else if (c.parameters[i] instanceof AdministeredObject) {
                        inputInfo = inputInfo.concat(IntegrationAPIExerciser.formatAdminObject((AdministeredObject)c.parameters[i]));
                    } else if (c.parameters[i] instanceof MessageFlowDependency) {
                        String mfdName = "?";
                        try {
                            mfdName = ((MessageFlowDependency)c.parameters[i]).getFullName();
                        } catch (ConfigManagerProxyPropertyNotInitializedException e) { /* Ignore - display default value */ }
                        inputInfo = inputInfo.concat(mfdName);
                    } else if (c.parameters[i] instanceof BarFile) {
                        String barName = ((BarFile)c.parameters[i]).getFullName();
                        inputInfo = inputInfo.concat(barName);
                    } else {
                        inputInfo = inputInfo.concat(""+c.parameters[i]);
                    }
                } else {
                    inputInfo = inputInfo.concat("null");
                }
                
                if ((i+1) != c.parameters.length) {
                    inputInfo  = inputInfo.concat(", ");
                }
            }
        } 
        inputInfo = inputInfo.concat(")");
        if (!c.suppressEntryExitLogMessage) {
            exerciser.consoleLogger.logEntering(inputInfo, ConsoleEntry.LogType.FINE);
        }
        
        
        try {
            // Invoke the test method!
            Object rc = c.method.invoke(c.testOwner, c.parameters);
            if (rc != null) {
                outputInfo = outputInfo.concat(" returned "+rc);
            }
        } catch (InvocationTargetException e1) {
            Throwable e2 = e1.getTargetException();
            outputInfo = outputInfo.concat(" threw "+e2);
            
            if (e2 instanceof ConfigManagerProxyRequestFailureException) {
                exerciser.consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_FAILED));
                List<LogEntry> failureCodes = ((ConfigManagerProxyRequestFailureException)e2).getResponseMessages();
                Iterator<LogEntry> i = failureCodes.iterator();
                while (i.hasNext()) {
                    LogEntry l = i.next();
                    exerciser.consoleLogger.logFine(l.toString());
                }
            } else if (e2 instanceof ConfigManagerProxyRequestTimeoutException) {
                exerciser.consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_TIMEDOUT));
            } else {
                exerciser.consoleLogger.logThrowing(e2);
            }
        } catch (Throwable ex) {
            exerciser.consoleLogger.logSevere("c.method = "+c.method);
            exerciser.consoleLogger.logSevere("c.testOwner = "+c.testOwner);
            for (int i=0; i< c.parameters.length; i++)
                exerciser.consoleLogger.logSevere("c.parameters["+i+"]= "+c.parameters[i]);
            exerciser.consoleLogger.logThrowing(ex);
        }
        
        // Log the output
        if (!c.suppressEntryExitLogMessage) {
            exerciser.consoleLogger.logExiting(outputInfo, ConsoleEntry.LogType.FINE);
        }
        
    }

    /**
     * Returns true if and only if the command thread is currently processing commands
     * @return
     */
    public boolean isBusy() {
        return busy;
    }
}

/**
 * Small data structure to represent a CMP Exerciser command
 */
class IntegrationAPIExerciserCommand {
    Method method;
    Object testOwner;
    Object[] parameters;
    boolean suppressEntryExitLogMessage;
    public IntegrationAPIExerciserCommand(Method method, Object testOwner, Object[] parameters, boolean suppressEntryExitLogMessage) {
        this.method = method;
        this.testOwner = testOwner;
        this.parameters = parameters;
        this.suppressEntryExitLogMessage = suppressEntryExitLogMessage;
    }
}
