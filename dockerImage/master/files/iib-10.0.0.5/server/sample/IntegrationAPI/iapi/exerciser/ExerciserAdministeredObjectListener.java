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
 *     WebSphere product, either for customer's own internal use or for
 *     redistribution by customer, as part of such an application, in
 *     customer's own products.
 */
package iapi.exerciser;

import iapi.common.ResourcesHandler;

import java.util.Enumeration;
import java.util.ListIterator;
import java.util.Properties;

import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.AdministeredObjectListener;
import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.CompletionCodeType;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurationObjectType;
import com.ibm.broker.config.proxy.LogEntry;

/*****************************************************************************
 * <P>The Exerciser application registers an instance of this class
 * with the IBM Integration API (CMP) for every AdministeredObject it learns about.
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>ExerciserAdministeredObjectListener</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Receives notifications from the IBM Integration API (CMP) when
 *     AdministeredObjects are modified or deleted, or when an action
 *     involving them is completed.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
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
public class ExerciserAdministeredObjectListener implements AdministeredObjectListener {
    
    /**
     * Pointer to the exerciser object
     * that provides the tracing services
     */
    private IntegrationAPIExerciser exerciser;

    /**
     * @param exerciser
     */
    public ExerciserAdministeredObjectListener(IntegrationAPIExerciser exerciser) {
        this.exerciser = exerciser;
    }

    /**
     * States that the integration node has processed a request that
     * previously originated from the current connection to it. The 
     * parameters of this method call indicate the result of the 
     * command that was sent, and the original command for 
     * reference. 
     * @param affectedObject The object on which a command was
     * attempted.
     * @param ccType The overall completion code of the action
     * @param bipMessages The unmodifiable list of
     * <I>LogEntry</I> instances that contains
     * any localized BIP Messages associated with the action.
     * @param referenceProperties Properties of the request that
     * caused this notification. See the <I>AttributeConstants</I>
     * documentation for information regarding the set of properties that
     * may be supplied here.
     */
    public void processActionResponse( AdministeredObject affectedObject,
            CompletionCodeType ccType,
            java.util.List<LogEntry> bipMessages,
            Properties referenceProperties) {
        
        // Don't display any updates until the application is fully connected
        if (exerciser.isFullyConnected) {
            exerciser.consoleLogger.logEntering(getClass().getName()+".processActionResponse(...)", ConsoleEntry.LogType.FINER);
            try {
    	        exerciser.consoleLogger.logFiner("affectedObject = "+affectedObject);
    	        exerciser.consoleLogger.logFiner("completionCode = "+ccType);
    	
    	        // Display any BIPs
    	        ListIterator<LogEntry> msgs = bipMessages.listIterator();
    	        while (msgs.hasNext()) {
    	            LogEntry log = msgs.next();
    	            exerciser.consoleLogger.logFiner(ResourcesHandler.getNLSResource(ResourcesHandler.LOG_ENTRY)+" "+log);
    	        }
    	
    	        // Display the reference properties
    	        Enumeration<Object> e = referenceProperties.keys();
    	        while (e.hasMoreElements()) {
    	            String key = (String) e.nextElement();
    	            String value = referenceProperties.getProperty(key);
    	            exerciser.consoleLogger.logFiner(ResourcesHandler.getNLSResource(ResourcesHandler.REFERENCE_PROPERTY)+" "+key+"="+value);
    	        }
            } finally {
                exerciser.consoleLogger.logExiting(getClass().getName()+".processActionResponse(...)", ConsoleEntry.LogType.FINER);
            }
        }
    }
    
    /**
     * States that the supplied <I>AdministeredObject</I>
     * has been deleted on the broker.
     * @param deletedObject The <I>AdministeredObject</I> that has been
     * deleted.
     */
    public void processDelete( AdministeredObject deletedObject ) {

        exerciser.consoleLogger.logEntering(getClass().getName()+".processDelete(...)", ConsoleEntry.LogType.FINER);
        try {
	        exerciser.consoleLogger.logFiner("deletedObject="+deletedObject);
	        
	        // If the current object is the selected one then update the properties
	        if (deletedObject == exerciser.selectedCMPObject) {
	            exerciser.selectedCMPObject = exerciser.getConnectedBrokerProxyInstance();
	            exerciser.tree.clearSelection();
	            exerciser.setupJTable(exerciser.selectedCMPObject);
	        }
        } finally {
            exerciser.consoleLogger.logExiting(getClass().getName()+".processDelete(...)", ConsoleEntry.LogType.FINER);
        }
    }
    
    
    /**
     * States that the supplied <I>AdministeredObject</I>
     * has been modified by the current or another application.
     * @param affectedObject The object which has changed. The
     * attributes of the object will already have been updated
     * to contain the new information.
     * @param changedAttributes An unmodifiable list of Strings
     * containing the attribute key names that have changed.
     * See the <I>AttributeConstants</I> documentation for a
     * list of valid key names. As of WebSphere Message Broker V7,
     * this list can also include deleted properties; calling
     * getProperty() on such a property will return null.
     * @param newChildren An unmodifiable list of Strings containing
     * the object's subcomponents that were added by the latest
     * change. To avoid the needless creation of expensive
     * <I>AdministeredObject</I> instances, each entry is a String
     * that describes one <I>AdministeredObject</I>. The String can
     * be converted into an <I>AdministeredObject</I> instance using
     * the <I>affectedObject.getManagedSubcomponentFromStringRepresentation(String)</I>
     * method.
     * @param removedChildren An unmodifiable list of Strings containing
     * the object's subcomponents that were removed by the latest
     * change. To avoid the needless creation of expensive
     * <I>AdministeredObject</I> instances, each entry is a String
     * that describes one <I>AdministeredObject</I>. The String can
     * be converted into an <I>AdministeredObject</I> instance using
     * the <I>affectedObject.getManagedSubcomponentFromStringRepresentation(String)</I>
     * method.
     */
    public void processModify( AdministeredObject affectedObject,
            java.util.List<String> changedAttributes,
            java.util.List<String> newSubcomponents,
            java.util.List<String> removedSubcomponents ) {

        // Don't display any updates until the application is fully connected
        if (exerciser.isFullyConnected) {
            exerciser.consoleLogger.logEntering(getClass().getName()+".processModify(...)", ConsoleEntry.LogType.FINEST);
            try {
                StringBuffer changesDescription = new StringBuffer("\n");
                
                changesDescription.append("affectedObject = "+affectedObject+"\n");
    	        boolean treeStructureChanged = false;
    	
    	        // Display changed attributes
    	        ListIterator<String> e1 = changedAttributes.listIterator();
    	        while (e1.hasNext()) {
    	            String changedAttribute = (String)e1.next();
    	            
    	            try {
    	                String newValue = affectedObject.getProperty(changedAttribute);
                        if (newValue != null) {
                            changesDescription.append(ResourcesHandler.getNLSResource(ResourcesHandler.CHANGED_ATTRIBUTE)+" \""+changedAttribute+"\" = \""+newValue+"\"\n");
                        } else {
                            changesDescription.append(ResourcesHandler.getNLSResource(ResourcesHandler.DELETED_ATTRIBUTE)+" \""+changedAttribute+"\"\n");
                        }
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // Thrown by getProperty()
                        exerciser.consoleLogger.logThrowing(e);
                    }
    	            
    	            // If the object has been renamed, or if a configurable service property
    	            // has changed then we should refresh the tree.
    	            if ((AttributeConstants.NAME_PROPERTY.equals(changedAttribute)) ||
    	                (changedAttribute.startsWith(AttributeConstants.BROKER_CONFIGURABLESERVICE_PROPERTY_FOLDER))) {
    	                treeStructureChanged = true;
    	            } 
    	        }
    	    
    	        // Display new subcomponents
    	        ListIterator<String> e2 = newSubcomponents.listIterator();
    	        while (e2.hasNext()) {
    	            String representation = (String) e2.next();
    	            changesDescription.append(ResourcesHandler.getNLSResource(ResourcesHandler.NEW_SUBCOMPONENT)+" "+representation+"\n");
                    //The Integration API exerciser does not show children of the AdminQueue, AdminLog or ActivityLog in the tree.
                    if( (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.administrationqueue) &&
                        (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.log) &&
                        (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.activitylog) )
                    {
                      treeStructureChanged = true;
                    }
    	            
    	            // NOTE: If you want to get a handle to the AdministeredObject
    	            // just added (that is, the one described by 'representation', use:
    	            //     AdministeredObject obj = affectedObject.getManagedSubcomponentFromStringRepresentation(representation);
    	            // You can cast 'obj' to the expected subclass.
    	            
    	        }
    	    
    	        // Display removed subcomponents
    	        ListIterator<String> e3 = removedSubcomponents.listIterator();
    	        while (e3.hasNext()) {
    	            String representation = (String) e3.next();
    	            changesDescription.append(ResourcesHandler.getNLSResource(ResourcesHandler.REMOVED_SUBCOMPONENT)+" "+representation+"\n");
                    //The Integration API exerciser does not show children of the AdminQueue, AdminLog or ActivityLog in the tree.
                    if( (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.administrationqueue) &&
                        (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.log) &&
                        (affectedObject.getConfigurationObjectType() != ConfigurationObjectType.activitylog) )
                    {
                      treeStructureChanged = true;
                    }
    	        }
    	        
    	        // Log the changes; we only do one log for performance reasons of the console renderer;
    	        // there may be many updates in a single processModify()).
    	        exerciser.consoleLogger.logFinest(changesDescription.toString());
    	        
    	        // If the tree hierarchy has changed, then refresh it
    	        if (treeStructureChanged) {
    	            exerciser.initialiseTreeForAdministeredObject(exerciser.broker);
    	        }
    	
    	        // If the current object is the selected one then update the properties
    	        if (affectedObject == exerciser.selectedCMPObject) {
    	            exerciser.setupJTable(exerciser.selectedCMPObject);
    	        }
            } finally {
                exerciser.consoleLogger.logExiting(getClass().getName()+".processModify(...)", ConsoleEntry.LogType.FINEST);
            }
        }
    }
    
}
