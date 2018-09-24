/*
 * Sample program for use with Product
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2008.
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

import java.awt.Component;
import java.net.URL;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JTree;
import javax.swing.tree.DefaultTreeCellRenderer;

import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AdminQueueProxy;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.BarFile;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurableService;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.LogProxy;
import com.ibm.broker.config.proxy.MessageFlowDependency;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.RestApiProxy;
import com.ibm.broker.config.proxy.SharedLibraryProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;

public class ExerciserIconRenderer extends DefaultTreeCellRenderer {

    /**
     * Serial number for DefaultTreeCellRenderer
     */
    private static final long serialVersionUID = 1L;

    /**
     * A reference to the owning Exerciser application.
     */
    IntegrationAPIExerciser exerciser;

    // The various icons in use by the application
    Icon unknownIcon;
    Icon brokerIcon;
    Icon egIcon;
    Icon restApiIcon;
    Icon serviceIcon;
    Icon applIcon;
    Icon libIcon;
    Icon shlibIcon;
    Icon mfIcon;
    Icon sfIcon;
    Icon logIcon;
    Icon dependencyIcon;
    Icon nodeIcon;
    Icon jarIcon;
    Icon ruleIcon;
    Icon dictionaryIcon;
    Icon barIcon;
    Icon folderIcon;
    Icon csIcon;
    Icon restrictedegIcon;
    Icon restrictedbrokerIcon;
    Icon adminQueue0Icon;
    Icon adminQueue1Icon;
    Icon adminQueue2Icon;
    Icon adminQueue3Icon;
    Icon adminQueue4Icon;
    Icon adminQueueManyIcon;

    /**
     * Instantiates the icon renderer
     * @param exerciser
     */
    public ExerciserIconRenderer(IntegrationAPIExerciser exerciser) {
        this.exerciser = exerciser;
        brokerIcon = getIcon("/icons/broker.gif");
        egIcon = getIcon("/icons/executiongroup.gif");
        restApiIcon = getIcon("/icons/restapi.gif");
        serviceIcon = getIcon("/icons/service.gif");
        applIcon = getIcon("/icons/application.gif");
        libIcon = getIcon("/icons/library.gif");
        shlibIcon = getIcon("/icons/sharedlibrary.gif");
        mfIcon = getIcon("/icons/messageflow.gif");
        sfIcon = getIcon("/icons/subflow.gif");
        logIcon = getIcon("/icons/log.gif");
        dependencyIcon = getIcon("/icons/dependency.gif");
        nodeIcon = getIcon("/icons/node.gif");
        unknownIcon = getIcon("/icons/unknown.gif");
        jarIcon = getIcon("/icons/jar.gif");
        ruleIcon = getIcon("/icons/rule.gif");
        dictionaryIcon = getIcon("/icons/dictionary.gif");
        barIcon = getIcon("/icons/bar.gif");
        folderIcon = getIcon("/icons/folder.gif");
        csIcon = getIcon("/icons/cs.gif");
        restrictedegIcon = getIcon("/icons/restrictedeg.gif");
        restrictedbrokerIcon = getIcon("/icons/restrictedbroker.gif");
        adminQueue0Icon = getIcon("/icons/adminqueue0.gif");
        adminQueue1Icon = getIcon("/icons/adminqueue1.gif");
        adminQueue2Icon = getIcon("/icons/adminqueue2.gif");
        adminQueue3Icon = getIcon("/icons/adminqueue3.gif");
        adminQueue4Icon = getIcon("/icons/adminqueue4.gif");
        adminQueueManyIcon = getIcon("/icons/adminqueuemany.gif");
    }

    /**
     * Loads the icon with the supplied path name
     * @return ImageIcon of the supplied name, or null if the
     * image could not be found.
     */
    private ImageIcon getIcon(String path) {
        ImageIcon retVal = null;
        URL imageURL= this.getClass().getResource(path);
        if (imageURL != null) {
            retVal = new ImageIcon(imageURL);
        } else {
            // Ignore - the icon can't be found so a default will be displayed.
        }
        return retVal;
    }



    /**
     * Sets the icon and returns the icon renderer for a given object in the JTree.
     */
    @Override
    public Component getTreeCellRendererComponent(JTree tree, Object value, boolean selected, boolean expanded, boolean leaf, int row, boolean hasFocus) {
        Component retVal = super.getTreeCellRendererComponent(tree, value, selected, expanded, leaf, row, hasFocus);
        Icon cellIcon = unknownIcon;

        Object affectedObject = exerciser.nodesToCMPObjects.get(value);
        if (affectedObject != null) {

            if (cellIcon == unknownIcon) {
                if (affectedObject instanceof BrokerProxy) {
                    if (!((BrokerProxy)affectedObject).hasBeenRestrictedByBroker()) {
                        cellIcon = brokerIcon;
                    } else {
                        cellIcon = restrictedbrokerIcon;
                    }
                } else if (affectedObject instanceof ExecutionGroupProxy) {
                    if (!((ExecutionGroupProxy)affectedObject).hasBeenRestrictedByBroker()) {
                        cellIcon = egIcon;
                    } else {
                        cellIcon = restrictedegIcon;
                    }
                } else if (affectedObject instanceof RestApiProxy) {
                    cellIcon = restApiIcon;
                } else if (affectedObject instanceof ApplicationProxy) {
                    cellIcon = applIcon;
                    try {
                        if (((ApplicationProxy) affectedObject).getServiceDescriptor() != null) {
                            cellIcon = serviceIcon;
                        }
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {

                    }
                } else if (affectedObject instanceof SharedLibraryProxy) {
                    cellIcon = shlibIcon;
                } else if (affectedObject instanceof LibraryProxy) {
                    cellIcon = libIcon;
                } else if (affectedObject instanceof MessageFlowProxy) {
                    cellIcon = mfIcon;
                } else if (affectedObject instanceof SubFlowProxy) {
                    cellIcon = sfIcon;
                } else if (affectedObject instanceof LogProxy) {
                    cellIcon = logIcon;
                } else if (affectedObject instanceof ActivityLogProxy) {
                    cellIcon = logIcon;
                } else if (affectedObject instanceof MessageFlowProxy.Node) {
                    cellIcon = nodeIcon;
                } else if (affectedObject instanceof BarFile) {
                    cellIcon = barIcon;
                } else if (affectedObject instanceof MessageFlowDependency) {
                    String type = ((MessageFlowDependency)affectedObject).getFileExtension();
                    if ((type.equalsIgnoreCase("dictionary")) || (type.equalsIgnoreCase("xsdzip"))) {
                        cellIcon = dictionaryIcon;
                    } else if (type.equalsIgnoreCase("jar")) {
                        cellIcon = jarIcon;
                    }else if (type.equalsIgnoreCase("rule")) {
                        cellIcon = ruleIcon;
                    }
                    else {
                        cellIcon = dependencyIcon;
                    }
                } else if (affectedObject instanceof IntegrationAPIExerciser.FolderNode) {
                    cellIcon = folderIcon;
                } else if (affectedObject instanceof ConfigurableService) {
                    cellIcon = csIcon;
                } else if (affectedObject instanceof AdminQueueProxy) {
                	int numberOfItemsInQueue = -1;
    				try {
    					numberOfItemsInQueue = ((AdminQueueProxy)affectedObject).getSize();
    				} catch (ConfigManagerProxyPropertyNotInitializedException e) {
    					// Use unknown icon
    				}
    				switch(numberOfItemsInQueue) {
                	case -1: break;
                	case 0:cellIcon = adminQueue0Icon; break;
                	case 1:cellIcon = adminQueue1Icon; break;
                	case 2:cellIcon = adminQueue2Icon; break;
                	case 3:cellIcon = adminQueue3Icon; break;
                	case 4:cellIcon = adminQueue4Icon; break;
                	default:cellIcon = adminQueueManyIcon; break;
                	}
                }
            }

            if (cellIcon != null) {
                setIcon(cellIcon);
                retVal = this;
            }
        }
        return retVal;
    }

}
