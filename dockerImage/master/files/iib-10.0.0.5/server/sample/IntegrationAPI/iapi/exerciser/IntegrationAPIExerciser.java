/*
 * Sample program for use with Product
 *  ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
 *  (C) Copyright IBM Corporation 2004-2009.
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

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Container;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Point;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.ActionEvent;
import java.awt.event.KeyEvent;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URL;
import java.text.DateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.GregorianCalendar;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Vector;

import javax.swing.DefaultCellEditor;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JCheckBoxMenuItem;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JDialog;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JPopupMenu;
import javax.swing.JRadioButtonMenuItem;
import javax.swing.JRootPane;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.JTree;
import javax.swing.KeyStroke;
import javax.swing.Spring;
import javax.swing.SpringLayout;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableColumn;
import javax.swing.table.TableColumnModel;
import javax.swing.text.JTextComponent;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;
import javax.swing.tree.TreeNode;
import javax.swing.tree.TreePath;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import com.ibm.broker.config.proxy.ActivityLogProxy;
import com.ibm.broker.config.proxy.AdminQueueEntry;
import com.ibm.broker.config.proxy.AdminQueueProxy;
import com.ibm.broker.config.proxy.AdministeredObject;
import com.ibm.broker.config.proxy.AdministeredObjectListener;
import com.ibm.broker.config.proxy.ApplicationProxy;
import com.ibm.broker.config.proxy.AttributeConstants;
import com.ibm.broker.config.proxy.BarFile;
import com.ibm.broker.config.proxy.BrokerProxy;
import com.ibm.broker.config.proxy.CompletionCodeType;
import com.ibm.broker.config.proxy.ConfigManagerProxyLoggedException;
import com.ibm.broker.config.proxy.ConfigManagerProxyPropertyNotInitializedException;
import com.ibm.broker.config.proxy.ConfigurableService;
import com.ibm.broker.config.proxy.ConfigurationObjectType;
import com.ibm.broker.config.proxy.DeployResult;
import com.ibm.broker.config.proxy.DeployedObject;
import com.ibm.broker.config.proxy.DeployedObjectGroupProxy;
import com.ibm.broker.config.proxy.EventManagerProxy;
import com.ibm.broker.config.proxy.EventProxy;
import com.ibm.broker.config.proxy.ExecutionGroupProxy;
import com.ibm.broker.config.proxy.FlowProxy;
import com.ibm.broker.config.proxy.LibraryProxy;
import com.ibm.broker.config.proxy.LocalBrokerUtilities;
import com.ibm.broker.config.proxy.LogEntry;
import com.ibm.broker.config.proxy.LogProxy;
import com.ibm.broker.config.proxy.MessageFlowDependency;
import com.ibm.broker.config.proxy.MessageFlowProxy;
import com.ibm.broker.config.proxy.MessageFlowProxy.Node;
import com.ibm.broker.config.proxy.PolicyManagementProxy;
import com.ibm.broker.config.proxy.PolicyManagerProxy;
import com.ibm.broker.config.proxy.PolicyProxy;
import com.ibm.broker.config.proxy.ResourceManagerProxy;
import com.ibm.broker.config.proxy.SharedLibraryProxy;
import com.ibm.broker.config.proxy.SubFlowProxy;

import iapi.common.ResourcesHandler;


/*****************************************************************************
 * <P>An application to demonstrate various features of the
 * IBM Integration API (CMP).
 *
 * <P><TABLE BORDER="1" BORDERCOLOR="#000000" CELLSPACING="0"
 * CELLPADDING="5" WIDTH="100%">
 * <TR>
 *   <TD COLSPAN="2" ALIGN="LEFT" VALIGN="TOP" BGCOLOR="#C0FFC0">
 *     <B><I>IntegrationAPIExerciser</I></B><P>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Responsibilities</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *     <LI>Provides example code that shows how to use the majority
 *     of the APIs exposed by the Integration API.
 *     <LI>Provides a small portable GUI for controlling integration nodes.
 *     </UL>
 *   </TD>
 * </TR>
 * <TR>
 *   <TD WIDTH="18%" ALIGN="LEFT" VALIGN="TOP">Internal Collaborators</TD>
 *   <TD WIDTH="*" ALIGN="LEFT" VALIGN="TOP">
 *     <UL>
 *       <LI><TT>cmp.common.ResourcesHandler</TT>
 *       <LI><TT>cmp.exerciser.*</TT>
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
 * 43269    2006-01-16  HDMPL           Fix playback of scripts
 * 35108.6  2006-01-24  HDMPL           Support for 64-bit execution groups
 * 44739.7  2007-05-03  HDMPL           Updates for Java 5
 * 45112.7  2007-05-11  HDMPL           Support for new v6.1 methods
 * 51619.1  2008-07-16  HDMPL           V7 release. GUI tidying. Support for broker connections.
 * 80006.1  2011-02-02  HDCAB           v8 Release:
 *                                        Added support for applications and libraries
 * 80006.2  2011-04-18  HDCAB             Added support for Activity logs
 *    3779  2012-05-18  HDCAB             Added support for resource manager properties
 * </pre>
 *
 * @version %W% %I%
 *****************************************************************************/
public class IntegrationAPIExerciser extends JFrame {

    /**
     * The exerciser can only be connected to a single integration
     * node at any one time (this is a restriction of this exerciser
     * sample and not the IBM Integration API (CMP)). The connected
     * instance is represented by this member variable.
     */
    BrokerProxy broker;

    /**
     * The name of the default integration node
     */
    private static final String DEFAULT_BROKER_NAME = "TESTNODE_"+System.getProperty("user.name");

    /**
     * The object responsible for performing actions
     * general to all AdministeredObject types.
     */
    public ClassTesterForAdministeredObject classTesterAdministeredObject = null;

    /**
     * The object responsible for performing actions on
     * BrokerProxy instances.
     */
    public ClassTesterForBrokerProxy classTesterBroker = null;

    /**
     * The object responsible for performing actions on
     * ExecutionGroupProxy instances.
     */
    public ClassTesterForExecutionGroupProxy classTesterEG = null;

    /**
     * The object responsible for performing actions on
     * MessageFlowProxy instances.
     */
    public ClassTesterForMessageFlowProxy classTesterFlow = null;

    /**
     * The object responsible for performing actions on
     * SubFlowProxy instances.
     */
    public ClassTesterForSubFlowProxy classTesterSubFlow = null;

    /**
     * The object responsible for performing actions on
     * LogProxy instances.
     */
    public ClassTesterForLogProxy classTesterLog = null;

    /**
     * The object responsible for performing actions on
     * AdminQueueProxy instances.
     */
    public ClassTesterForAdminQueueProxy classTesterAdminQueue = null;

    /**
     * The object responsible for performing actions on
     * ActivityLogProxy instances.
     */
    public ClassTesterForActivityLogProxy classTesterActivityLog = null;

    /**
     * The object responsible for performing miscellaneous
     * other actions on the IBM Integration API (CMP).
     */
    public ClassTesterForMiscellaneousActions classTesterMisc = null;

    /**
     * The object responsible for performing actions on
     * ApplicationProxy instances.
     */
    public ClassTesterForApplicationProxy classTesterAppl = null;

    /**
     * The object responsible for performing actions on
     * RestApiProxy instances.
     */
    public ClassTesterForRestApiProxy classTesterRestApi = null;

    /**
     * The object responsible for performing actions on
     * LibraryProxy instances.
     */
    public ClassTesterForStaticLibraryProxy classTesterLib = null;

    /**
     * The object responsible for performing actions on
     * SharedLibraryProxy instances.
     */
    public ClassTesterForSharedLibraryProxy classTesterShlib = null;

    /**
     * The object responsible for performing actions on
     * ResourceManagerProxy instances.
     */
    public ClassTesterForResourceManagerProxy classTesterRM = null;

    /**
     * The object responsible for performing actions on
     * PolicyManagerProxy instances.
     */
    public ClassTesterForPolicyManagerProxy classTesterPM = null;

    /**
     * The object responsible for performing actions on PolicyProxy
     * instances.
     */
    public ClassTesterForPolicyProxy classTesterPolicy = null;

    /**
     * The object responsible for performing actions on
     * EventManagerProxy instances.
     */
    public ClassTesterForEventManagerProxy classTesterEM = null;

    /**
     * The object responsible for performing actions on EventProxy
     * instances.
     */
    public ClassTesterForEventProxy classTesterEvent = null;

    /**
     * A mapping of CMP-related objects (AdministeredObjects, MessageFlowProxy.Node etc.)
     * to the nodes in the JTree that represent them.
     */
    Hashtable<Object,DefaultMutableTreeNode> cmpObjectsToNodes;

    /**
     * A mapping of nodes in the JTree to the CMP-related obejcts that they
     * represent.
     */
    Hashtable<DefaultMutableTreeNode,Object> nodesToCMPObjects;

    /**
     * The currently selected object (e.g. an ExecutionGroupProxy)
     */
    Object selectedCMPObject = null;

    /**
     * Contains mappings of JMenuItem objects to CommandInformation
     * object. This means that when a user clicks on a menu item,
     * the correct command can be invoked.
     */
    Hashtable<JMenuItem,CommandInformation> mappingOfMenuItemsToCommands;

    /**
     * The tree
     */
    JTree tree;

    /**
     * The object used to render icons in the JTree
     */
    ExerciserIconRenderer treeCellRenderer;

    /**
     * Root node of the tree
     */
    DefaultMutableTreeNode root;

    /**
     * The JTable on the right of the frame
     */
    JTable table;

    /**
     * Handler to the JTable's model
     */
    DefaultTableModel model;

    /**
     * The frame in which parameters are entered
     */
    JDialog dataEntryFrame;

    /**
     * The editable text fields in the data entry frame
     */
    JComponent[] tf = null;

    /**
     * The object responsible for handling the console at the bottom of the main window
     */
    ConsoleLogger consoleLogger = null;

    /**
     * The status line at the bottom of the main window
     */
    JLabel statusLine = null;

    /**
     * XML document representing the automation script
     * that is currently being written. Will be null
     * if and only if no script is currently being written.
     */
    Document scriptOutputDoc = null;

    /**
     * The file name of the script that is currently
     * being written. Will be null if and only if
     * no script is currently being written.
     */
    String scriptFileName = null;

    /**
     * True if and only if there is no GUI present
     */
    private boolean headlessMode = true;

    /**
     * True if and only if the "property access method" column is currently shown.
     */
    boolean propertyAccessMethodColumnShown = true;

    /**
     * True if and only if integration server resources are grouped
     * by BAR file
     */
    boolean groupResourcesByBAR= true;

    /**
     * True if and only if polices are to be displayed in the tree
     */
    boolean displayPolicies= true;

    /**
     * True if and only if the Exerciser is connected to the
     * integration node and the object hierarchy has been fully
     * populated with all available objects.
     */
    protected boolean treeFullyPopulated = false;

    /**
     * The table column containing property names
     */
    TableColumn propertyNameColumn;

    /**
     * The table column containing property values
     */
    TableColumn propertyValueColumn;

    /**
     * Number of rows to display in the table
     */
    private final static int DEFAULT_NUMBER_OF_ROWS = 40;

    /**
     * Describes the character that separates levels of
     * the object hierarchy in the automation script file format.
     */
    private final static String AUTOMATIONFORMAT_OBJECTPATHSEPARATOR = "/";

    /**
     * The object that will be use to receive GUI event-type
     * notifications (mouse clicks, tree changes etc.)
     * AdministeredObjectListener notifications are handled
     * by the ExerciserAdministeredObjectListener.
     */
    private GUIEventListener guiEventListener;

    /**
     * The listener that will receive notifications of
     * administered object changes and deletions, and of
     * completed actions.
     */
    private AdministeredObjectListener exerciserAdministeredObjectListener;

    /**
     * Handle to the submit (or "add to batch") button used in the dialog
     * that asks the user for method parameters.
     */
    JButton submitButton;

    /**
     * Handler to the cancel button in the dialog that asks the
     * user for method parameters.
     */
    JButton cancelButton;

    /**
     * Contains mapping from Strings identifying nodes to nodes.
     * These strings are used in the scripting language for
     * working out what the current selection is
     * e.g. "qm1/eg1" == the node
     * representing the integration server eg1.
     */
    private Hashtable<String,DefaultMutableTreeNode> identifyingStringToNodes;

    /**
     * True if the application is fully connected to an integration
     * node. False if the application is not connected, or is in the
     * process of connecting to an integration node.
     */
    protected boolean isFullyConnected = false;


    // Various important dynamic menu options...
    // Most menu items are not stored here as member variables, as they
    // are static. The ones listed below can vary (e.g. checkboxes being
    // enabled/disabled), so the API Exerciser needs to be able to access and modify them.
    JMenuItem connectBrokerMenuItem = null;
    JMenuItem connectBrokerContextSensitiveMenuItem = null;
    JCheckBoxMenuItem cmpTraceEnabledMenuItem = null;
    JRadioButtonMenuItem displayLevel0 = null;
    JRadioButtonMenuItem displayLevel1 = null;
    JRadioButtonMenuItem displayLevel2 = null;
    JPopupMenu menuForSelectedObject = null;
    JPopupMenu connectMenu = null;
    JPopupMenu tableMenu = null;
    JMenu automation = null;

    /**
     * The thread that is used to handle each API test
     */
    CommandThread commandThread = null;

    /**
     * The amount of detail to display in the application
     * 0 = Basic properties only
     * 1 = All properties (recommended)
     * 2 = All properties, expanded log, nodes and node connections,
     * resource managers, monitoring event definitions
     */
    private int propertyDisplayLevel = 1;

    /**
     * A list of all the AdministeredObjects with which the
     * IBM Integration API (CMP) Exerciser has
     * AdministeredObjectListeners registered against. This stops
     * the exerciser from registering registering the same object
     * multiple times (though there is no harm in doing this).
     */
    private Vector<AdministeredObject> registeredObjects;

    /**
     * Describes a folder node in the JTree.
     * Most nodes in the JTree correspond to an object
     * based in the IBM Integration API (CMP) (e.g. a BrokerProxy).
     * However, there are some folders that don't have
     * a straight mapping to a real object (e.g. the
     * "Configurable Services" folder node, which is
     * just a convenient container for methods invoked
     * on the BrokerProxy object).
     * This class is used to describe these folder nodes;
     * instantiations give the IBM Integration API (CMP) Exerciser a
     * nice way of associating a Java object to these nodes.
     * The 'type' variable describes the area in which
     * the folder is used (e.g. Configurable Services)
     * and the 'subtype' variable uniquely
     * identifies the folder (e.g. "PolicySets" for the
     * Policy Sets Configurable Services folder, or null
     * or "" for the root "Configurable Services" folder).
     */
    protected class FolderNode {
        /** The high level type of the folder node */
        FolderNodeType type;
        /** The sub type of the folder node e.g. "PolicySets" */
        String subtype;
        /** The object responsible for issuing actions on this folder. */
        Object delegate;

        /**
         * Constructor
         * @param type the type of the FolderNode
         * @param subtype uniquely identifies the folder
         * @param delegate object that will issue actions on
         * the folder's behalf (e.g. BrokerProxy)
         */
        protected FolderNode(FolderNodeType type, String subtype, Object delegate) {
            this.type = type;
            this.subtype = subtype;
            this.delegate = delegate;
        }
        /**
         * Returns the object that can invoke the actions on the folder's behalf.
         * For example, Configurable Services folders cause actions to be
         * invoked on the owning BrokerProxy object instead.
         * @return
         */
        public Object getCMPObjectDelegate() {
            return delegate;
        }

        @Override
        public boolean equals(Object obj)
        {
          boolean retVal = false;

          if(obj instanceof FolderNode)
          {
            FolderNode compareObject = (FolderNode)obj;
            if(  (this.type.equals(compareObject.type)) &&
                 (this.subtype.equals(subtype)) )
              retVal = true;
          }
          return retVal;
        }

    }
    /** Enumerates the types of FolderNode available. */
    protected enum FolderNodeType {CONFIGURABLESERVICE};

    /**
     * As this is a JFrame, this is a serializable class;
     * therefore, define a default serialVersionUID field.
     */
    private static final long serialVersionUID = 1L;

    // Constants used in the XML script format

    /** Sample information - identifier */
    private final static String SCRIPTXML_PROGID_VALUE = "%W% %I%";
    /** Sample information - version */
    private final static String SCRIPTXML_PROGVER_VALUE = "8.0";
    /** Name of the method to be invoked */
    private static final String SCRIPTXML_NAME = "name";
    /** Owner of the method to be invoked */
    private static final String SCRIPTXML_OWNER = "owner";
    /** Method element */
    private static final String SCRIPTXML_METHOD = "method";
    /** Parameter element */
    private static final String SCRIPTXML_PARAMETER = "parameter";
    /** Type attribute of the parameter */
    private static final String SCRIPTXML_TYPE = "type";
    /** Value attribute of the parameter */
    private static final String SCRIPTXML_VALUE = "value";
    /** Root of the XML document */
    private static final String SCRIPTXML_ROOT = "script";
    /** Attribute describing the name of the program */
    private static final String SCRIPTXML_PROGNAME = "progname";
    /** Attribute describing the internal program information */
    private static final String SCRIPTXML_PROGID = "progid";
    /** Attribute describing the script version of the program */
    private static final String SCRIPTXML_PROGVER = "progver";
    /** The name of the program */
    private static final String SCRIPTXML_PROGNAME_VALUE = "IBM Integration API (CMP) Exerciser";

    /**
     * The entry point into the application.
     * @param args[0] optional parameter that describes the filename
     * that contains any saved application settings
     */
    public static void main(String[] args) {
        IntegrationAPIExerciser cmpex = new IntegrationAPIExerciser();
        if (args.length > 0) {
            cmpex.startPlayback(args[0]);
            cmpex.quit();
        } else {
            cmpex.go();
        }
    }


    /**
     * Initialises the current exerciser instance.
     */
    private void go() {

        // Set the look and feel
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            // Ignore
        }

        guiEventListener = new GUIEventListener(this);
        registeredObjects = new Vector<AdministeredObject>();
        addWindowListener(guiEventListener);

        initWindow();
        setSize(800, 600);

        Dimension screenSize = getToolkit().getScreenSize();
        Dimension guiSize = getSize();
        if(!((guiSize.width > screenSize.width) || (guiSize.height > screenSize.height))) {
            setLocation(new Point(
                    (screenSize.width - guiSize.width) / 2,
                    (screenSize.height - guiSize.height) / 2));
        }
        setVisible(true);
        headlessMode = false;

        // Set up retry characteristics
        classTesterBroker.testRetryCharacteristics(
                ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true),
                ResourcesHandler.getUserSettingInt(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, 30),
                ResourcesHandler.getUserSettingInt(ResourcesHandler.EG_CREATE_WAIT_TIME_SECS, 30),
                ResourcesHandler.getUserSettingInt(ResourcesHandler.OTHER_WAIT_TIME_SECS, 10),
                ResourcesHandler.getUserSettingInt(ResourcesHandler.POLICY_WAIT_TIME_SECS, 30));

    }

    /**
     * Returns the level of detail the user has requested to show
     * @return int The value of the propertyDisplayLevel
     * (0=least, 2=most).
     */
    protected int getPropertyDisplayLevel() {
        return propertyDisplayLevel;
    }

    /**
     * Controls whether advanced properties should be shown
     * @param propertyDisplayLevel True to show advanced properties
     * in addition to the basic set.
     */
    protected void setPropertyDisplayLevel(int propertyDisplayLevel) {
        this.propertyDisplayLevel = propertyDisplayLevel;
    }

    /**
     * Contructs a new frame for the Exerciser application.
     */
    public IntegrationAPIExerciser() {
        super(ResourcesHandler.getNLSResource(ResourcesHandler.WINDOW_TITLE));

        cmpObjectsToNodes = new Hashtable<Object,DefaultMutableTreeNode>();
        nodesToCMPObjects = new Hashtable<DefaultMutableTreeNode,Object>();
        mappingOfMenuItemsToCommands = new Hashtable<JMenuItem, CommandInformation>();
        identifyingStringToNodes = new Hashtable<String, DefaultMutableTreeNode>();

        commandThread = new CommandThread(this);
        exerciserAdministeredObjectListener = new ExerciserAdministeredObjectListener(this);
        classTesterBroker = new ClassTesterForBrokerProxy(this);
        classTesterEG = new ClassTesterForExecutionGroupProxy(this);
        classTesterFlow = new ClassTesterForMessageFlowProxy(this);
        classTesterSubFlow = new ClassTesterForSubFlowProxy(this);
        classTesterLog = new ClassTesterForLogProxy(this);
        classTesterActivityLog = new ClassTesterForActivityLogProxy(this);
        classTesterAdminQueue = new ClassTesterForAdminQueueProxy(this);
        classTesterMisc = new ClassTesterForMiscellaneousActions(this);
        classTesterAppl = new ClassTesterForApplicationProxy(this);
        classTesterRestApi = new ClassTesterForRestApiProxy(this);
        classTesterLib = new ClassTesterForStaticLibraryProxy(this);
        classTesterShlib = new ClassTesterForSharedLibraryProxy(this);
        classTesterRM = new ClassTesterForResourceManagerProxy(this);
        classTesterPM = new ClassTesterForPolicyManagerProxy(this);
        classTesterPolicy = new ClassTesterForPolicyProxy(this);
        classTesterEM = new ClassTesterForEventManagerProxy(this);
        classTesterEvent = new ClassTesterForEventProxy(this);
        classTesterAdministeredObject = new ClassTesterForAdministeredObject(this,
                                                                             classTesterBroker,
                                                                             classTesterEG,
                                                                             classTesterFlow,
                                                                             classTesterSubFlow,
                                                                             classTesterLog,
                                                                             classTesterActivityLog,
                                                                             classTesterAdminQueue,
                                                                             classTesterAppl,
                                                                             classTesterRestApi,
                                                                             classTesterLib,
                                                                             classTesterShlib,
                                                                             classTesterRM,
                                                                             classTesterPM,
                                                                             classTesterPolicy,
                                                                             classTesterEM,
                                                                             classTesterEvent);
        treeCellRenderer = new ExerciserIconRenderer(this);
        root = getTree(broker);
        tree = new JTree(root);
        tree.setCellRenderer(treeCellRenderer);
        initialiseMappingOfIdentifyingStringsToNodes(root);

        // Load the Exerciser Icon
        URL imageURL = this.getClass().getResource("/icons/exerciser.gif");
        if (imageURL != null) {
            setIconImage(new ImageIcon(imageURL).getImage());
        }
    }

    /**
     * Creates and initialises the member hashtable that contains mappings from
     * object names (e.g. "IB9NODE") to its clickable node in the GUI tree.
     * @param root Top level of the GUI tree.
     */
    void initialiseMappingOfIdentifyingStringsToNodes(DefaultMutableTreeNode root) {
        identifyingStringToNodes = new Hashtable<String, DefaultMutableTreeNode>();
        if (root != null) {
                Enumeration<?> e = root.postorderEnumeration();
                while (e.hasMoreElements()) {
                    DefaultMutableTreeNode n = (DefaultMutableTreeNode) e.nextElement();
                    identifyingStringToNodes.put(getIdentifyingStringFromTreeNode(n), n);
                }
        }
    }

    /**
     * Adds the text string as a new item in the supplied
     * menu, and initialises an action listener for it.
     * @param m Menu to which the item is to be added
     * @param text Text label for the menu item
     * @param ci Object describing the command to invoke
     * @return JMenuItem the Menu item just created
     */
    JMenuItem addMenuItem(JPopupMenu m, String text, CommandInformation ci) {
        // Add "..." to the end of the text if parameters are required
        // or if a file chooser is to be displayed,
        // AND the dots aren't already in the resource bundle
        if (text.indexOf("...") == -1) {
                if (ci != null) {
                    if (ci.labels != null) {
                        if (ci.labels.length>0) {
                            text = text+"...";
                        }
                    } else if (ci.showFileDialog == true) {
                        text = text+"...";
                    }
                }
        }
        JMenuItem mi = new JMenuItem(text);
        mi.addActionListener(guiEventListener);
        m.add(mi);
        if (ci != null) {
            mappingOfMenuItemsToCommands.put(mi, ci);
        }
        return mi;
    }

    /**
     * Adds the text string as a new item in the supplied
     * menu, and initialises an action listener for it.
     * @param m Menu to which the item is to be added
     * @param text Text label for the menu item
     * @param mnemonic Keyboard Shortcut for the command
     * @param ci Object describing the command to invoke
     * @return JMenuItem The created menu item
     */
    private JMenuItem addMenuItem(JMenu m, String text, int mnemonic, CommandInformation ci) {
        return addMenuItem(m, text, mnemonic, -1, -1, ci);
    }

    /**
     * Adds a checkbox as a new item in the supplied
     * menu, and initialises an action listener for it.
     * @param m Menu to which the item is to be added
     * @param text Text label for the menu item
     * @param mnemonic Keyboard Shortcut for the command
     * @param defaultValue True if and only if the checkbox
     * is to be enabled by default
     * @param ci Object describing the command to invoke
     * */
    private JCheckBoxMenuItem addCheckBoxMenuItem(JMenu m, String text, int mnemonic, boolean defaultValue, CommandInformation ci) {
        JCheckBoxMenuItem cb = new JCheckBoxMenuItem(text, defaultValue);
        cb.setMnemonic(mnemonic);
        cb.addActionListener(guiEventListener);
        m.add(cb);
        if (ci != null) {
            mappingOfMenuItemsToCommands.put(cb, ci);
        }
        return cb;
    }

    /**
     * Adds the text string as a new item in the supplied
     * menu, and initialises an action listener for it.
     * @param m Menu to which the item is to be added
     * @param text Text label for the menu item
     * @param mnemonic Keyboard Shortcut for the command
     * @param keystroke Keyboard shortcut for the command
     * @param keystrokeMask Keyboard shortcut modifier for the command
     * be enabled by default
     * @param ci Object describing the command to invoke
     * @return JMenuItem The created menu item
     */
    private JMenuItem addMenuItem(JMenu m, String text, int mnemonic, int keystroke, int keystrokeMask, CommandInformation ci) {

        JMenuItem mi;

        // Add "..." to the end of the text if parameters are required
        // or if a file chooser is to be displayed,
        // AND the dots aren't already in the resource bundle
        if (text.indexOf("...") == -1) {
                if (ci != null) {
                    if (ci.labels != null) {
                        if (ci.labels.length>0) {
                            text = text+"...";
                        }
                    } else if (ci.showFileDialog == true) {
                        text = text+"...";
                    }
                }
        }
        if (mnemonic != -1) {
            mi = new JMenuItem(text, mnemonic);
        } else {
            mi = new JMenuItem(text);
        }

        if (keystroke != -1) {
            mi.setAccelerator(KeyStroke.getKeyStroke(keystroke,keystrokeMask));
        }
        mi.addActionListener(guiEventListener);
        m.add(mi);

        if (ci != null) {
            mappingOfMenuItemsToCommands.put(mi, ci);
        }
        return mi;
    }

    /**
     * Works out the object hierarchy in terms of proxy objects
     * @param o AdministeredObject to get the tree for.
     * @return DefaultMutableTreeNode node describing the tree
     */
    DefaultMutableTreeNode getTree(AdministeredObject o) {

        DefaultMutableTreeNode parent;
        if (o != null) {
            parent = cmpObjectsToNodes.get(o);
            String name="?";

            // Is it worthwhile getting the information?
            if (!o.hasBeenPopulatedByBroker(true)) {
                // If the object has been restricted (e.g the current user
                // can't see it), then don't display it as a node in the tree.
                parent = null;
            } else {
                if (o instanceof LogProxy) {
                    // Override the name of the log.
                    name = ConfigurationObjectType.log.getDisplayName();
                } else if (o instanceof ActivityLogProxy) {
                    // Override the name of the activity log.
                    name = ConfigurationObjectType.activitylog.getDisplayName();
                } else {
                    // Otherwise, just display the default name as given to us by the CMP.
                    name = o.toString();
                }

                if (parent == null) {
                    // We'd never found out about this object before.
                    parent = new DefaultMutableTreeNode(name);
                    initialiseTreeNode(parent, o);
                } else {
                    // Modify the existing object
                    parent.setUserObject(name);
                }

                // Recurse through the tree
                try {
                    parent.removeAllChildren();

                    // Note: The getManagedSubcomponents() method is a general
                    // way of traversing the AdministeredObject tree that
                    // doesn't require knowledge of each object's underlying type.
                    // However, in this example we want to generate a tree whose
                    // structure we're in control of. So we'll interrogate each
                    // object's type and derive its children ourselves.
                    Enumeration<?> children = null;
                    if (o instanceof BrokerProxy) {
                        children = ((BrokerProxy)o).getExecutionGroups(null);
                    } else if (o instanceof ExecutionGroupProxy) {
                        calculateExecutionGroupBranchOfTree(parent, (ExecutionGroupProxy)o);
                    } else if (o instanceof AdministeredObject) {
                        // If we receive an AdministeredObject we don't know about,
                        // the recurse it in the generic way.
                        children = o.getManagedSubcomponents(null);
                    }

                    if (children != null) {
                        while (children.hasMoreElements()) {
                            AdministeredObject child = (AdministeredObject) children.nextElement();
                            DefaultMutableTreeNode childNode = null;

                            childNode = getTree(child);
                            if (childNode != null) {
                                // List the objects in alphabetical order.
                                // To turn off alphabetical sorting, replace everything
                                // inside this if statement with "parent.add(childNode);"
                                int positionOfChildNode = 0;
                                String childNodeName = childNode.getUserObject().toString();
                                boolean finished = false;
                                while (!finished) {
                                    if (parent.getChildCount() < (positionOfChildNode+1)) {
                                        finished = true;
                                    } else {
                                        DefaultMutableTreeNode t = (DefaultMutableTreeNode)parent.getChildAt(positionOfChildNode);
                                        if (childNodeName.compareTo(t.getUserObject().toString()) > 0) {
                                            positionOfChildNode++;
                                        } else {
                                            finished = true;
                                        }
                                    }
                                }
                                parent.insert(childNode, positionOfChildNode);

                            }
                        }
                    }

                    // If this was a broker, then insert the Administration Queue,
                    // Administration Log and Configurable Services at the bottom.
                    if (o instanceof BrokerProxy) {
                        // Add the log object
                        LogProxy l = ((BrokerProxy)o).getLog();
                        if (l != null) {
                            DefaultMutableTreeNode logDMTN = new DefaultMutableTreeNode(ConfigurationObjectType.log.getDisplayName());
                            parent.add(logDMTN);
                            initialiseTreeNode(logDMTN, l);
                        }

                        // Add the administration queue
                        //We only show the administration queue if we have selected "Everything".
                        if((propertyDisplayLevel > 1))
                        {
                          AdminQueueProxy aqp = ((BrokerProxy)o).getAdministrationQueue();
                          if (aqp != null) {
                              DefaultMutableTreeNode aqpDMTN = new DefaultMutableTreeNode(ConfigurationObjectType.administrationqueue.getDisplayName());
                              parent.add(aqpDMTN);
                              initialiseTreeNode(aqpDMTN, aqp);
                          }
                        }

                        if(displayPolicies)
                        {
                          // Add the policy management object
                          calculatePolicyManagementBranchOfTree(parent, (BrokerProxy)o);
                        }

                        if((propertyDisplayLevel > 1))
                        {
                          // Add the events from the event manager
                          calculateEventManagerBranchOfTree(parent, (BrokerProxy)o);
                        }

                        // Add configurable services
                        calculateConfigurableServicesBranchOfTree(parent, (BrokerProxy)o);
                    }

                } catch (ConfigManagerProxyPropertyNotInitializedException ex2) {
                    // Comms problems with the integration node, so indicate that
                    // the object's information is not available.
                    consoleLogger.logThrowing(ex2);
                    DefaultMutableTreeNode childNode = new DefaultMutableTreeNode("...?");
                    parent.add(childNode);

                }
            }
            } else {
            // Administered object is null (we probably aren't connected to the integration node)
            parent = new DefaultMutableTreeNode(ResourcesHandler.getNLSResource(ResourcesHandler.NOT_CONNECTED));
        }
        return parent;
    }

    /**
     * Generates the integration node part of the object display
     * tree, including any log object and configurable services but
     * excluding any integration server children.
     * @param brokerNode The initialised node in which the
     * integration node object already exists.
     * @param thisBroker Reference to the integration node
     * @throws ConfigManagerProxyPropertyNotInitializedException
     */
    private void calculateConfigurableServicesBranchOfTree(DefaultMutableTreeNode brokerNode, BrokerProxy thisBroker) throws ConfigManagerProxyPropertyNotInitializedException {
        // Add any configurable services.
        String[] serviceTypes = thisBroker.getConfigurableServiceTypes();

        if ((serviceTypes != null) && (serviceTypes.length > 0)) {
            DefaultMutableTreeNode csFolder = new DefaultMutableTreeNode(ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICES_FOLDER_NAME));
            brokerNode.add(csFolder);
            initialiseTreeNode(csFolder, new FolderNode(FolderNodeType.CONFIGURABLESERVICE, "", thisBroker));

            for (String csType : serviceTypes) {

                // Add the Configurable Service Type (e.g. JMSProviders)
                DefaultMutableTreeNode csTypeNode = new DefaultMutableTreeNode(csType);
                csFolder.add(csTypeNode);
                initialiseTreeNode(csTypeNode, new FolderNode(FolderNodeType.CONFIGURABLESERVICE, csType, thisBroker));

                // For each type, display the available configurable services.
                ConfigurableService[] services = thisBroker.getConfigurableServices(csType);
                if ((services != null) && (services.length > 0)) {
                    for (ConfigurableService cs : services) {
                        DefaultMutableTreeNode csNode = new DefaultMutableTreeNode(cs.getName());
                        csTypeNode.add(csNode);
                        initialiseTreeNode(csNode, cs);
                    }
                }
            }
        }
    }

    /**
     * Generates the event manager part of the object display tree,
     * including any events it owns.
     * @param brokerNode The initialised node in which the
     * integration node object already exists.
     * @param thisBroker Reference to the integration node
     * @throws ConfigManagerProxyPropertyNotInitializedException
     */
    private void calculateEventManagerBranchOfTree(DefaultMutableTreeNode brokerNode, BrokerProxy thisBroker)
      throws ConfigManagerProxyPropertyNotInitializedException
    {
      //Get the list of events from the event manager
      EventManagerProxy eventMgr = thisBroker.getEventManager();
      if((eventMgr != null) && (eventMgr.hasBeenPopulatedByBroker(true)))
      {
        Enumeration<EventProxy> events = eventMgr.getEvents(); //Get all the events
        if ((events != null) && (events.hasMoreElements()))
        {
          //For now we only add the event manager to the tree if we have events
          DefaultMutableTreeNode empDMTN = new DefaultMutableTreeNode(ConfigurationObjectType.eventmanager.getDisplayName());
          brokerNode.add(empDMTN);
          initialiseTreeNode(empDMTN, eventMgr);
          while(events.hasMoreElements())
          {
            EventProxy event = events.nextElement();
            //DefaultMutableTreeNode eventNode= new DefaultMutableTreeNode(event.getName());
            DefaultMutableTreeNode eventNode= new DefaultMutableTreeNode(event.getUUID());
            empDMTN.add(eventNode);
            initialiseTreeNode(eventNode, event);
          }
        }
      }
    }

    /**
     * Generates the policy management part of the object display
     * tree, including any policy managers and policies it owns.
     * @param brokerNode The initialised node in which the
     * integration node object already exists.
     * @param thisBroker Reference to the integration node
     * @throws ConfigManagerProxyPropertyNotInitializedException
     */
    private void calculatePolicyManagementBranchOfTree(DefaultMutableTreeNode brokerNode, BrokerProxy thisBroker)
      throws ConfigManagerProxyPropertyNotInitializedException
    {
      //Get the list of policy types from the policy management object
      PolicyManagementProxy pmp = thisBroker.getPolicyManagement();
      if((pmp != null) && (pmp.hasBeenPopulatedByBroker(true)))
      {
        //Render the policy management parent in the tree
        DefaultMutableTreeNode pmpDMTN = new DefaultMutableTreeNode(ConfigurationObjectType.policyManagement.getDisplayName());
        brokerNode.add(pmpDMTN);
        initialiseTreeNode(pmpDMTN, pmp);

        //We now get the policy types and for each valid type we get a Policy Manager that represents that type
        try
        {
          String[] policyTypes = pmp.getPolicyTypes();
          if(policyTypes != null)
          {
            for(String currentPolicyType : policyTypes)
            {
              PolicyManagerProxy pmpForType = pmp.getPolicyManager(currentPolicyType);
              if(pmpForType != null)
              {
                DefaultMutableTreeNode policyTypeNode= new DefaultMutableTreeNode(currentPolicyType);
                pmpDMTN.add(policyTypeNode);
                initialiseTreeNode(policyTypeNode, pmpForType);
                //Now we attempt display the policy children for this type
                if(pmpForType.hasBeenPopulatedByBroker(true))
                {
                  String[] policyNames = pmpForType.getPolicyNames();
                  if(policyNames != null)
                  {
                    for(String currentPolicyName: policyNames)
                    {
                      PolicyProxy pp = pmpForType.getPolicy(currentPolicyName);
                      if(pp != null)
                      {
                        DefaultMutableTreeNode policyNode= new DefaultMutableTreeNode(currentPolicyName);
                        policyTypeNode.add(policyNode);
                        initialiseTreeNode(policyNode, pp);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        catch (ConfigManagerProxyLoggedException ex)
        {
          //cannot determine the policy types or policy manager so we do not show anything
        }
      }
    }

    /**
     * Generates the integration server, and any child nodes, part
     * of the object display tree.
     * @param groupNode The initialised node in which the deployed
     *                  object already exists.
     * @param thisGroup Reference to the deployed object group
     * @param deployedObjects an enumeration of deployed objects to
     *                        display at this level
     * @param barFileNamesToNodes a hashtable of barfile names and
     *                            tree nodes that can be attached to
     * @throws ConfigManagerProxyPropertyNotInitializedException
     */
    private void calculateDeployedObjectGroupBranchOfTree(DefaultMutableTreeNode groupNode,
                                                          DeployedObjectGroupProxy thisGroup,
                                                          Enumeration<DeployedObject> deployedObjects
                                                          //Hashtable<String, DefaultMutableTreeNode> barFileNamesToNodes
                                                          ) throws ConfigManagerProxyPropertyNotInitializedException
    {
        Hashtable<String, DefaultMutableTreeNode> barFileNamesToNodes = new Hashtable<String, DefaultMutableTreeNode>();

        //Iterate over each of the deployed objects
        while (deployedObjects.hasMoreElements())
        {
          DeployedObject thisDeployedObject = deployedObjects.nextElement();

          // In basic view, just display message flows.
          // In advanced view, display all deployed objects.
          // In complete view, display node properties underneath each flow (see end of this method)

          if((propertyDisplayLevel == 0) && (thisDeployedObject instanceof MessageFlowDependency))
          {
            continue;
          }

          //Create a tree node for this deployed object
          DefaultMutableTreeNode childNode = new DefaultMutableTreeNode(thisDeployedObject.getFullName());

          // Work out what the parent node is - this is either the deployed object group
          // node, or the BAR file, depending on the value of groupResourcesByBAR
          DefaultMutableTreeNode parent = groupNode;
          initialiseTreeNode(groupNode, thisGroup);

          if (groupResourcesByBAR)
          {
            boolean okToLoadBar = true;
            String completeBarFileName = thisDeployedObject.getBARFileName();
            if ((completeBarFileName == null) || ("".equals(completeBarFileName)))
            {
              completeBarFileName = "(Unknown BAR)";
              okToLoadBar = false;
            }
            else
            {
              parent = barFileNamesToNodes.get(completeBarFileName);
              if (parent == null) // This BAR file has not been initialised as a node yet
              {
                String truncatedBarFileName = new String(completeBarFileName);
                int truncationPosition = Math.max(completeBarFileName.lastIndexOf("/"), completeBarFileName.lastIndexOf("\\"));
                if (truncationPosition < 0) truncationPosition = completeBarFileName.length() - 20;
                if (truncationPosition < 0)
                {
                  truncatedBarFileName = completeBarFileName;
                }
                else
                {
                  truncatedBarFileName = "..."+completeBarFileName.substring(truncationPosition);
                }

                parent = new DefaultMutableTreeNode(truncatedBarFileName);
                barFileNamesToNodes.put(completeBarFileName, parent);
                groupNode.add(parent); //Add the BAR to the parent

                // If we can, store the BAR file away so that subsequent operations can be performed on it.
                if (okToLoadBar)
                {
                  try
                  {
                    BarFile b = BarFile.loadBarFile(completeBarFileName);
                    initialiseTreeNode(parent, b);
                  } catch (IOException ex) {
                    // Ignore - this means that the BAR file is not accessible on the local filesystem.
                }
              }
            }
          }
        }

        parent.add(childNode);
        initialiseTreeNode(childNode, thisDeployedObject);

        //If the property display level is Advanced then for message flows or subflows, generate the table and nodes
        if(thisDeployedObject instanceof FlowProxy)
        {
          if((propertyDisplayLevel > 1))
          {
            Enumeration<Node> nodes = null;
            if(thisDeployedObject instanceof MessageFlowProxy) {
              MessageFlowProxy thisMF = (MessageFlowProxy) thisDeployedObject;
              nodes = thisMF.getNodes();
            }
            else if(thisDeployedObject instanceof SubFlowProxy) {
              SubFlowProxy thisMF = (SubFlowProxy) thisDeployedObject;
              nodes = thisMF.getNodes();
            }

            if(nodes != null) {
              while (nodes.hasMoreElements())
              {
                Node thisNode = nodes.nextElement();
                DefaultMutableTreeNode thisNodeDMTN = new DefaultMutableTreeNode(thisNode.getName());
                childNode.add(thisNodeDMTN);
                initialiseTreeNode(thisNodeDMTN, thisNode);
              }
            }
          }
        }
        else if( (thisDeployedObject instanceof ApplicationProxy) || (thisDeployedObject instanceof LibraryProxy) || (thisDeployedObject instanceof SharedLibraryProxy) )
        {
          DeployedObjectGroupProxy childGroup = (DeployedObjectGroupProxy)thisDeployedObject;
          Enumeration<DeployedObject> childDeployedObjects = childGroup.getDeployedObjects();
          calculateDeployedObjectGroupBranchOfTree(childNode, childGroup, childDeployedObjects);//, barFileNamesToNodes);
        }
      }
    }

/**
     * Generates the integration server, and any child nodes,
     * part of the object display tree.
     * @param executionGroupNode The initialised node in which
     * the integration server object already exists.
     * @param thisEG Reference to the integration server
     * @throws ConfigManagerProxyPropertyNotInitializedException
     */
    private void calculateExecutionGroupBranchOfTree(DefaultMutableTreeNode executionGroupNode, ExecutionGroupProxy thisEG) throws ConfigManagerProxyPropertyNotInitializedException {
        //Hashtable<String, DefaultMutableTreeNode> barFileNamesToNodes = new Hashtable<String, DefaultMutableTreeNode>();

        //For the integration server we get a list of deployed resources.
        //Instead of issuing getDeployedObjects() to get the list, we make the individual resource calls so that the deployed objects are in object type order.

        Enumeration<DeployedObject> deployedObjects = thisEG.getDeployedObjects();
        calculateDeployedObjectGroupBranchOfTree(executionGroupNode, thisEG, deployedObjects);//, barFileNamesToNodes);

        if((propertyDisplayLevel > 1))
        {
          Properties rmProperties = new Properties();
          rmProperties.setProperty(AttributeConstants.ACTIVITYLOG_SUPPORTED_PROPERTY, AttributeConstants.TRUE);
          Enumeration<ResourceManagerProxy> egResourceManagers = thisEG.getResourceManagers(rmProperties);
          //Enumeration<ResourceManagerProxy> egResourceManagers = thisEG.getResourceManagers(null);
          while(egResourceManagers.hasMoreElements())
          {
            ResourceManagerProxy thisRM = egResourceManagers.nextElement();
            DefaultMutableTreeNode rmDMTN = new DefaultMutableTreeNode(thisRM.getName());
            executionGroupNode.add(rmDMTN);
            initialiseTreeNode(rmDMTN, thisRM);
          }
        }
    }

    private void initialiseTreeNode(DefaultMutableTreeNode treeNode, Object cmpObjectHandler) {
        if(cmpObjectsToNodes.containsKey(cmpObjectHandler))
        {
          cmpObjectsToNodes.remove(cmpObjectHandler); //Before inserting the new entry we remove the old one from the hashtable
        }
        cmpObjectsToNodes.put(cmpObjectHandler,treeNode);  // for when the action() method is called

        if(nodesToCMPObjects.containsKey(treeNode))
        {
          nodesToCMPObjects.remove(treeNode);  //Before inserting the new entry we remove the old one from the hashtable
        }
        nodesToCMPObjects.put(treeNode,cmpObjectHandler);  // for when the selection changes

        if (cmpObjectHandler instanceof AdministeredObject) {
            registerListener((AdministeredObject)cmpObjectHandler);
        }
    }

    /**
     * Returns a handle to the exerciser's BrokerProxy instance,
     * if a valid direct connection to a integration node is
     * currently active.
     * @return BrokerProxy
     */
    public BrokerProxy getConnectedBrokerProxyInstance() {
        return broker;
    }

    /**
     * If expand is true, expands all nodes in the tree.
     * Otherwise, collapses all nodes in the tree.
     * @param tree
     * @param expand true to expand, false to collapse
     */
    private void expandAll(JTree tree, boolean expand) {
        // Traverse tree from root
        if (root != null) {
            expandAll(tree, new TreePath(root), expand);
        }
    }

    /**
     * Expands or collapses the supplied tree, starting from the
     * supplied parent
     * @param tree
     * @param parent
     * @param expand true to expand, false to collapse
     */
    private void expandAll(JTree tree, TreePath parent, boolean expand) {
        // Traverse children
        TreeNode node = (TreeNode)parent.getLastPathComponent();
        if (node.getChildCount() >= 0) {
            for (Enumeration<?> e=node.children(); e.hasMoreElements(); ) {
                TreeNode n = (TreeNode)e.nextElement();
                TreePath path = parent.pathByAddingChild(n);
                expandAll(tree, path, expand);
            }
        }

        // Expansion or collapse must be done bottom-up
        if ((!expand) || (alwaysCollapse(parent))) {
            tree.collapsePath(parent);
        } else {
            tree.expandPath(parent);
        }

    }

    /**
     * Returns true only if the selected element
     * in the tree should always be collapsed by default.
     */
    private boolean alwaysCollapse(TreePath node) {
        boolean retVal = false;
        // Don't expand the nodes that don't correspond to
        // CMP objects (e.g. Configurable Services)
        Object thisTreeNode = node.getLastPathComponent();
        Object thisCMPObject = nodesToCMPObjects.get(thisTreeNode);
        if (thisCMPObject instanceof FolderNode) {
            retVal = true;
        }
        return retVal;
    }


    /**
     * Displays the complete set of properties for the supplied object in the GUI's table
     * @param selected The IBM Integration API (CMP) object whose
     * details are to be displayed (e.g. an AdministeredObject, or a
     * MessageFlowProxy.Node)
     */
    public void setupJTable(Object selectedCMPObject) {

        // Ensure that there are no active editors when
        // we delete rows (it can cause ArrayIndexOutOfBoundsException)
        if (table.getCellEditor() != null) {
            ((DefaultCellEditor)table.getCellEditor()).stopCellEditing();
        }

        // Remove the old entries in the table
        int rows = model.getRowCount();
        for (int i=0; i<rows; i++) {
            model.removeRow(0);
        }

        // Set up the 'method name' column heading
        TableColumnModel tcm = table.getColumnModel();
        TableColumn tc = tcm.getColumn(0);
        String objectClassName = "";
        if (selectedCMPObject != null) {

            // Check for special instances of 'selectedCMPObject'
            // that don't correspond to a CMP class.
            if (selectedCMPObject instanceof FolderNode) {
                objectClassName = "BrokerProxy";
            } else {
                // Display the object's class name followed by 'method'.
                objectClassName = selectedCMPObject.getClass().getName();

                int lastDot = objectClassName.lastIndexOf(".");
                if (lastDot > -1) {
                    objectClassName = objectClassName.substring(lastDot+1);
                }

                // Replace '$' with '.' to cope with Java inner-class mangling.
                objectClassName = objectClassName.replace('$', '.');
            }


        }

        // Discover the new set of properties from the object
        Properties p = new Properties();
        if (selectedCMPObject != null) {
            if (selectedCMPObject instanceof AdministeredObject) {
                classTesterAdministeredObject.discoverProperties((AdministeredObject)selectedCMPObject, p);
            } else if (selectedCMPObject instanceof MessageFlowProxy.Node) {
                classTesterFlow.discoverNodeProperties((MessageFlowProxy.Node)selectedCMPObject, p);
            } else if (selectedCMPObject instanceof MessageFlowDependency) {
                classTesterFlow.discoverDependencyProperties((MessageFlowDependency)selectedCMPObject, p);
            } else if (selectedCMPObject instanceof ConfigurableService) {
                classTesterBroker.discoverConfigurableServiceProperties((ConfigurableService)selectedCMPObject, p);
            } else if (selectedCMPObject instanceof FolderNode) {
                FolderNodeType type = ((FolderNode)selectedCMPObject).type;
                String subtype = ((FolderNode)selectedCMPObject).subtype;
                if (type == FolderNodeType.CONFIGURABLESERVICE) {
                    classTesterBroker.discoverGeneralConfigurableServiceProperties(broker, p, subtype);
                }
            }
        }

        // Sort the returned list (by key name)
        int size = p.size();
        String[] listOfKeys = new String[size];
        Enumeration<Object> e = p.keys();
        int i=0;
        while (e.hasMoreElements()) {
            listOfKeys[i++] = (String) e.nextElement();
        }
        java.util.Arrays.sort(listOfKeys);
        int keyBeingAdded = 0;

        while (keyBeingAdded < size) {
            String key = listOfKeys[keyBeingAdded];
            String value = p.getProperty(key);

            // Split each key and value so that the newline
            // character '\n' causes the next row to be used.
            String[] multiLineKey = key.split("\n");
            String[] multiLineValue = value.split("\n");

            // Add the rows for this key/value pair to the table
            for (i=0; i<Math.max(multiLineKey.length, multiLineValue.length); i++) {

                String thisRowsKey = "";
                String thisRowsValue = "";

                if (multiLineKey.length > i) {
                    thisRowsKey = multiLineKey[i];
                }
                if (multiLineValue.length > i) {
                    thisRowsValue = multiLineValue[i];
                }
                model.addRow( new String[] { thisRowsKey, thisRowsValue });
            }
            keyBeingAdded++;
        }

        while (model.getRowCount() < DEFAULT_NUMBER_OF_ROWS) {
            model.addRow( new String[] { "", "" } );
        }

        tc.setHeaderValue(ResourcesHandler.getNLSResource(ResourcesHandler.PROPERTY_NAME, new String[] {objectClassName}));
        table.getTableHeader().resizeAndRepaint();
        table.setForeground(new Color(96,96,96));
    }



    /**
     * Causes the supplied object to be selected in the GUI.
     * @param selectedObject
     */
    void selectCMPObject(Object selectedObject) {
        if (!headlessMode) {
                setupJTable(selectedObject);
                setupSelectedMenu(selectedObject);
        }
        this.selectedCMPObject = selectedObject;
    }



    /**
     * Sets up the "Selected" menu context for the supplied object
     * @param o IBM Integration API (CMP) object that has been
     *          selected (e.g. an AdminsteredObject)
     */
    void setupSelectedMenu(Object o) {

        try {
            menuForSelectedObject.removeAll();
            if ((o != null) && (o instanceof AdministeredObject)) {
                AdministeredObject selectedAdministeredObject = (AdministeredObject)o;
                ConfigurationObjectType type =
                    ConfigurationObjectType.getConfigurationObjectType(((AdministeredObject)o).getType());

                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ADMINISTEREDOBJECT_REFRESH),
                        new CommandInformation(
                                null, null, null, null, false,
                                classTesterAdministeredObject,
                                this.classTesterAdministeredObject.getClass().getMethod("testRefresh", new Class[] {AdministeredObject.class}), false));

                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ADMINISTEREDOBJECT_RAWPROPERTIES),
                        new CommandInformation(
                                null, null, null, null, false,
                                classTesterAdministeredObject,
                                this.classTesterAdministeredObject.getClass().getMethod("testShowRawPropertyTable", new Class[] {AdministeredObject.class}), false));

                menuForSelectedObject.addSeparator();

                // The addMenuItem() method may look rather complicated...
                // However, by doing this we can configure *all in one place*
                // all information associated with the action; this includes the menu name,
                // any required parameters, default values AND the name of the test
                // method to invoke.
                //
                // The format used by most options is:
                // addMenuItem( <Menu to which the item should be added>,
                //              <String containing the menu item text>,
                //              new CommandInformation(
                //                  <string array, each element containing a label for a required parameter>,
                //                  <string array, each element containing the key name to use if the user entered value is to you want to store the user entered value in the settings file>
                //                  <string array, each element containing the default value for a required parameter>,
                //                  <a reference to the IntegrationAPIExerciser method that will be used to generate the text input fields, or null to have all the input fields as plain text fields>,
                //                  <boolean describing whether the command can be added to a batch (cmp.beginUpdates())>,
                //                  <the object whose method will be invoked>,
                //                  <a reference to the method to be invoked>),
                //                  <boolean describing whether the entry/exit log messages should be hidden>);
                //
                // The first parameter to "the method to be invoked" may be an AdministeredObject,
                // in which case the currently selected object (i.e. in the tree) will be passed at invocation time.
                // All other parameters to the method are taken from the user input fields
                // and may be Strings, ints or booleans only.
                //
                // The CommandInformation constructor is slightly different for methods that use dialog boxes to input parameters
                if (type == ConfigurationObjectType.broker) {

                    // Context sensitive properties for the integration node
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_CREATEEG),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.NEW_EG_NAME)},
                                            new String[] {ResourcesHandler.NEW_EG_NAME},
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.NEW_EG_NAME, "eg1")},
                                            null,
                                            true,
                                            classTesterBroker,
                                            classTesterBroker.getClass().getMethod("testCreateEG", new Class[] {BrokerProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTFLOWS),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPFLOWS),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_DISCONNECT),
                            new CommandInformation(null, null, null, null, false, classTesterMisc,
                            this.classTesterMisc.getClass().getMethod("testDisconnect", (Class[])null), false));
                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    JMenu policySetSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SETS));
                    menuForSelectedObject.add(policySetSubmenu);
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_GET_POLICY_SET), -1,
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_NAME)},
                                    new String[] { ResourcesHandler.BROKER_POLICY_SET_NAME},
                                    new String[] { "" },
                                    null,
                                    true,
                                    classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testGetPolicySet", new Class[] {BrokerProxy.class, String.class}), false));
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_GET_POLICY_SET_BINDINGS), -1,
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_BINDINGS_NAME)},
                                    new String[] { ResourcesHandler.BROKER_POLICY_SET_BINDINGS_NAME},
                                    new String[] { "" },
                                    null,
                                    true,
                                    classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testGetPolicySetBindings", new Class[] {BrokerProxy.class, String.class}), false));
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_IMPORT_POLICY_SET), -1,
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_NAME),
                                    JFileChooser.OPEN_DIALOG, "xml", false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testImportPolicySet", new Class[] {BrokerProxy.class, String.class}), false));
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_IMPORT_POLICY_SET_BINDINGS), -1,
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_BINDINGS_NAME),
                                    JFileChooser.OPEN_DIALOG, "xml", false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testImportPolicySetBindings", new Class[] {BrokerProxy.class, String.class}), false));
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_DELETE_POLICY_SET), -1,
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_NAME)},
                                    new String[] { ResourcesHandler.BROKER_POLICY_SET_NAME},
                                    new String[] { "" },
                                    null,
                                    true,
                                    classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testDeletePolicySet", new Class[] {BrokerProxy.class, String.class}), false));
                    addMenuItem(policySetSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_DELETE_POLICY_SET_BINDINGS), -1,
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_POLICY_SET_BINDINGS_NAME)},
                                    new String[] { ResourcesHandler.BROKER_POLICY_SET_BINDINGS_NAME},
                                    new String[] { "" },
                                    null,
                                    true,
                                    classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testDeletePolicySetBindings", new Class[] {BrokerProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu rtPropsSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_RUNTIME_PROPERTIES));
                    menuForSelectedObject.add(rtPropsSubmenu);
                    addMenuItem(rtPropsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_HTTP_LISTENER_RUNTIME_PROPERTY), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_HTTP_LISTENER_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_HTTP_LISTENER_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_HTTP_LISTENER_RUNTIME_PROPERTY_PROPERTY_NAME, "HTTPConnector/port"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_HTTP_LISTENER_RUNTIME_PROPERTY_PROPERTY_VALUE, "7080")},
                                            null,
                                            true,
                                            classTesterBroker,
                                            classTesterBroker.getClass().getMethod("testSetHTTPListenerRuntimeProperty", new Class[] {BrokerProxy.class, String.class,
                                                    String.class}), false));
                    addMenuItem(rtPropsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_REGISTRY_RUNTIME_PROPERTY), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_REGISTRY_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_REGISTRY_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_REGISTRY_RUNTIME_PROPERTY_PROPERTY_NAME, "BrokerRegistry/operationMode"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_REGISTRY_RUNTIME_PROPERTY_PROPERTY_VALUE, "adapter")},
                                            null,
                                            true,
                                            classTesterBroker,
                                            classTesterBroker.getClass().getMethod("testSetRegistryRuntimeProperty", new Class[] {BrokerProxy.class, String.class, String.class}), false));
                    addMenuItem(rtPropsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_SECURITY_CACHE_RUNTIME_PROPERTY), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_SECURITY_CACHE_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SET_SECURITY_CACHE_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_SECURITY_CACHE_RUNTIME_PROPERTY_PROPERTY_NAME, "SecurityCache/cacheTimeout"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_SET_SECURITY_CACHE_RUNTIME_PROPERTY_PROPERTY_VALUE, "60")},
                                            null,
                                            true,
                                            classTesterBroker,
                                            classTesterBroker.getClass().getMethod("testSetSecurityCacheRuntimeProperty", new Class[] {BrokerProxy.class, String.class, String.class}), false));

                    String[] brokerPropertyDefaults = null;
                    try {
                        brokerPropertyDefaults = new String[] {
                                selectedAdministeredObject.getShortDescription(),
                                selectedAdministeredObject.getLongDescription()};
                    } catch (ConfigManagerProxyPropertyNotInitializedException ex ) {
                        consoleLogger.logThrowing(ex);
                        brokerPropertyDefaults = new String[] { "", "" };
                    }

                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_LONG_DESC)},
                                            null,
                                            brokerPropertyDefaults,
                                            null,
                                            true,
                                            classTesterBroker,
                                            classTesterBroker.getClass().getMethod("testModifyBrokerProperties", new Class[] {BrokerProxy.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.executiongroup) {

                    // Context sensitive properties for the integration server
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEPLOY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_BAR),
                                    JFileChooser.OPEN_DIALOG, "bar", false, classTesterEG,
                                    this.classTesterEG.getClass().getMethod("testDeployBAR", new Class[] {ExecutionGroupProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_START),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testStartEG", new Class[] {ExecutionGroupProxy.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOP),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testStopEG", new Class[] {ExecutionGroupProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterBroker,
                                    classTesterBroker.getClass().getMethod("testDeleteEG", new Class[] {ExecutionGroupProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    JMenu serviceTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.SERVICE_TRACE));
                    menuForSelectedObject.add(serviceTraceSubmenu);
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.START_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartServiceTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.DEBUG_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugServiceTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.STOP_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopServiceTrace", new Class[] {AdministeredObject.class}), false));
                    String debugPortDefault = "0";
                    try {
                        debugPortDefault = "" + ((ExecutionGroupProxy)selectedAdministeredObject).getDebugPort();
                    } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
                        // Ignore
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_DEBUG_PORT),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_DEBUG_PORT_PROPERTY_VALUE)},
                                            null,
                                            new String[] { debugPortDefault },
                                            null,
                                            true,
                                            classTesterEG,
                                            classTesterEG.getClass().getMethod("testSetDebugPort", new Class[] {ExecutionGroupProxy.class, String.class} ), false));
                    menuForSelectedObject.addSeparator();
                    JMenu advancedSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.ADVANCED));
                    menuForSelectedObject.add(advancedSubmenu);
                    JMenu resourceStatsMenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS));
                    advancedSubmenu.add(resourceStatsMenu);
                    addMenuItem(resourceStatsMenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ENABLE), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_LABEL)},
                                    null,
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ALL) },
                                    this.getClass().getMethod("generateResourceTypeStatisticsDialog", new Class[] {String[].class}),
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testEnableResourceTypeStats", new Class[] {ExecutionGroupProxy.class, String.class}), false));
                    addMenuItem(resourceStatsMenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_DISABLE), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_LABEL)},
                                    null,
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ALL) },
                                    this.getClass().getMethod("generateResourceTypeStatisticsDialog", new Class[] {String[].class}),
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testDisableResourceTypeStats", new Class[] {ExecutionGroupProxy.class, String.class}), false));
                    advancedSubmenu.addSeparator();
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTAPPLICATIONS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testStartApplications", new Class[] {ExecutionGroupProxy.class} ), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPAPPLICATIONS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterEG,
                                    classTesterEG.getClass().getMethod("testStopApplications", new Class[] {ExecutionGroupProxy.class} ), false));
                    advancedSubmenu.addSeparator();
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETEDEPLOYED), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE)},
                                            new String[] {
                                            ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE},
                                            null,
                                            null,
                                            true,
                                            classTesterEG,
                                            classTesterEG.getClass().getMethod("testDeleteDeployed", new Class[] {ExecutionGroupProxy.class, String.class} ), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "ComIbmJVMManager/jvmDebugPort"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "5555")},
                                            null,
                                            true,
                                            classTesterEG,
                                            classTesterEG.getClass().getMethod("testSetRuntimeProperty", new Class[] {ExecutionGroupProxy.class, String.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_ACTION_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_ACTION_PARAMETERS),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_OBJECT_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_OBJECT_PROPERTIES)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_ACTION_NAME, "Report"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_ACTION_PARAMETERS, "recursive=yes"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_OBJECT_NAME, "HTTPConnector"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_OBJECT_PROPERTIES, "")},
                                            null,
                                            true,
                                            classTesterEG,
                                            classTesterEG.getClass().getMethod("testExecute", new Class[] {ExecutionGroupProxy.class, String.class,String.class,String.class, String.class}), false));

                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterEG,
                                            classTesterEG.getClass().getMethod("testModifyEGProperties", new Class[] {ExecutionGroupProxy.class, String.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.application || type == ConfigurationObjectType.restapi) {

                    // Context sensitive properties for the application
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEPLOY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_BAR),
                                    JFileChooser.OPEN_DIALOG, "bar", false, classTesterAppl,
                                    this.classTesterAppl.getClass().getMethod("testDeployBAR", new Class[] {ApplicationProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_START),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterAppl,
                                    classTesterAppl.getClass().getMethod("testStartApplication", new Class[] {ApplicationProxy.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOP),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterAppl,
                                    classTesterAppl.getClass().getMethod("testStopApplication", new Class[] {ApplicationProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterAppl,
                                    classTesterAppl.getClass().getMethod("testDeleteApplication", new Class[] {ApplicationProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu advancedSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.ADVANCED));
                    menuForSelectedObject.add(advancedSubmenu);
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));
                    advancedSubmenu.addSeparator();
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETEDEPLOYED), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE)},
                                            new String[] {
                                            ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE},
                                            null,
                                            null,
                                            true,
                                            classTesterAppl,
                                            classTesterAppl.getClass().getMethod("testDeleteDeployed", new Class[] {ApplicationProxy.class, String.class} ), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/UserTraceLevel"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "none")},
                                            null,
                                            true,
                                            classTesterAppl,
                                            classTesterAppl.getClass().getMethod("testSetRuntimeProperty", new Class[] {ApplicationProxy.class, String.class, String.class}), false));

                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.APPL_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterAppl,
                                            classTesterAppl.getClass().getMethod("testModifyApplicationProperties", new Class[] {ApplicationProxy.class, String.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.library) {

                    // Context sensitive properties for the library
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEPLOY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_BAR),
                                    JFileChooser.OPEN_DIALOG, "bar", false, classTesterLib,
                                    this.classTesterLib.getClass().getMethod("testDeployBAR", new Class[] {LibraryProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterLib,
                                    classTesterLib.getClass().getMethod("testDeleteLibrary", new Class[] {LibraryProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu advancedSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.ADVANCED));
                    menuForSelectedObject.add(advancedSubmenu);
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));
                    advancedSubmenu.addSeparator();
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETEDEPLOYED), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE)},
                                            new String[] {
                                            ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE},
                                            null,
                                            null,
                                            true,
                                            classTesterLib,
                                            classTesterLib.getClass().getMethod("testDeleteDeployed", new Class[] {LibraryProxy.class, String.class} ), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/UserTraceLevel"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "none")},
                                            null,
                                            true,
                                            classTesterLib,
                                            classTesterLib.getClass().getMethod("testSetRuntimeProperty", new Class[] {LibraryProxy.class, String.class, String.class}), false));

                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.LIB_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterLib,
                                            classTesterLib.getClass().getMethod("testModifyLibraryProperties", new Class[] {LibraryProxy.class, String.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.sharedLibrary) {

                    // Context sensitive properties for the library
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEPLOY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_BAR),
                                    JFileChooser.OPEN_DIALOG, "bar", false, classTesterShlib,
                                    this.classTesterShlib.getClass().getMethod("testDeployBAR", new Class[] {SharedLibraryProxy.class, String.class}), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterShlib,
                                    classTesterShlib.getClass().getMethod("testDeleteLibrary", new Class[] {SharedLibraryProxy.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu advancedSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.ADVANCED));
                    menuForSelectedObject.add(advancedSubmenu);
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STARTFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_STOPFLOWS), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));
                    advancedSubmenu.addSeparator();
                    addMenuItem(advancedSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.EG_DELETEDEPLOYED), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE)},
                                            new String[] {
                                            ResourcesHandler.DEPLOYED_OBJECTS_TO_REMOVE},
                                            null,
                                            null,
                                            true,
                                            classTesterShlib,
                                            classTesterShlib.getClass().getMethod("testDeleteDeployed", new Class[] {SharedLibraryProxy.class, String.class} ), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/UserTraceLevel"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "none")},
                                            null,
                                            true,
                                            classTesterShlib,
                                            classTesterShlib.getClass().getMethod("testSetRuntimeProperty", new Class[] {SharedLibraryProxy.class, String.class, String.class}), false));

                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.LIB_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterShlib,
                                            classTesterShlib.getClass().getMethod("testModifyLibraryProperties", new Class[] {SharedLibraryProxy.class, String.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.subflow) {
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterSubFlow,
                                    classTesterSubFlow.getClass().getMethod("testDeleteSubFlow", new Class[] {SubFlowProxy.class }), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/userTraceLevel"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "none")},
                                            null,
                                            true,
                                            classTesterSubFlow,
                                            classTesterSubFlow.getClass().getMethod("testSetRuntimeProperty", new Class[] {SubFlowProxy.class, String.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "Property1"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "1")},
                                            null,
                                            true,
                                            classTesterSubFlow,
                                            classTesterSubFlow.getClass().getMethod("testSetUserDefinedProperty", new Class[] {SubFlowProxy.class, String.class, String.class}), false));
                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterSubFlow,
                                            classTesterSubFlow.getClass().getMethod("testModifySFProperties", new Class[] {SubFlowProxy.class, String.class, String.class, String.class}), false));

                } else if (type == ConfigurationObjectType.messageflow) {

                    // Context sensitive properties for message flows
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_START),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartMsgFlows", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STOP),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopMsgFlows", new Class[] {AdministeredObject.class}), false));

                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_DELETE),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterFlow,
                                    classTesterFlow.getClass().getMethod("testDeleteMsgFlow", new Class[] {MessageFlowProxy.class }), false));

                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.GET_ACTIVITY_LOG),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterFlow,
                                    classTesterFlow.getClass().getMethod("testGetActivityLog", new Class[] {MessageFlowProxy.class }), false));

                    menuForSelectedObject.addSeparator();
                    JMenu userTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.EG_USERTRACE));
                    menuForSelectedObject.add(userTraceSubmenu);
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STARTUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_DEBUGUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugUserTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(userTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STOPUSERTRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopUserTrace", new Class[] {AdministeredObject.class}), false));
                    JMenu serviceTraceSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.SERVICE_TRACE));
                    menuForSelectedObject.add(serviceTraceSubmenu);
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.START_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartServiceTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.DEBUG_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStartDebugServiceTrace", new Class[] {AdministeredObject.class}), false));
                    addMenuItem(serviceTraceSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.STOP_SERVICE_TRACE), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterMisc,
                                    classTesterMisc.getClass().getMethod("testStopServiceTrace", new Class[] {AdministeredObject.class}), false));
                    menuForSelectedObject.addSeparator();
                    JMenu statsSubmenu = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS));
                    menuForSelectedObject.add(statsSubmenu);
                    String[] snapshotPropertyDefaults = null;
                    try {
                        boolean isEnabled = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsEnabled(true);
                        int nodeLevel = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsNodeDetailLevel(true);
                        String[] nodeLevels = { AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_NONE,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_BASIC,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_ADVANCED };
                        int threadLevel = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsThreadDetailLevel(true);
                        String[] threadLevels = { AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPTHREADDATALEVEL_NONE,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPTHREADDATALEVEL_BASIC };

                        snapshotPropertyDefaults = new String[] {
                                isEnabled ? AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPPUBLICATIONON_ACTIVE : AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPPUBLICATIONON_INACTIVE,
                                ""+nodeLevels[nodeLevel],
                                ""+threadLevels[threadLevel],
                                ((MessageFlowProxy)selectedAdministeredObject).getStatisticsOutputFormat(true),
                                ((MessageFlowProxy)selectedAdministeredObject).getStatisticsAccountingOrigin(true)};
                    } catch (ConfigManagerProxyPropertyNotInitializedException ex ) {
                        consoleLogger.logThrowing(ex);
                        snapshotPropertyDefaults = new String[] {
                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPPUBLICATIONON_INACTIVE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPNODEDATALEVEL_NONE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPTHREADDATALEVEL_NONE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSSNAPOUTPUTFORMAT_USERTRACE,
                                "" };
                    }
                    addMenuItem(statsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT_ENABLED),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT_NODE_DETAIL),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT_THREAD_DETAIL),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT_FORMAT),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_SNAPSHOT_ACCOUNTING_ORIGIN)},
                                            null,
                                            snapshotPropertyDefaults,
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testModifyStatisticsSnapshotProperties", new Class[] {MessageFlowProxy.class, String.class, String.class, String.class, String.class, String.class}), false));

                    statsSubmenu.addSeparator();
                    String[] archivePropertyDefaults = null;
                    try {
                        boolean isEnabled = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsEnabled(false);
                        int nodeLevel = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsNodeDetailLevel(false);
                        String[] nodeLevels = { AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_NONE,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_BASIC,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_ADVANCED };
                        int threadLevel = ((MessageFlowProxy)selectedAdministeredObject).getStatisticsThreadDetailLevel(false);
                        String[] threadLevels = { AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVETHREADDATALEVEL_NONE,
                                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVETHREADDATALEVEL_BASIC };

                        archivePropertyDefaults = new String[] {
                                isEnabled ? AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVALON_ACTIVE : AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVALON_INACTIVE,
                                ""+nodeLevels[nodeLevel],
                                ""+threadLevels[threadLevel],
                                ((MessageFlowProxy)selectedAdministeredObject).getStatisticsOutputFormat(false),
                                ((MessageFlowProxy)selectedAdministeredObject).getStatisticsAccountingOrigin(false)};
                    } catch (ConfigManagerProxyPropertyNotInitializedException ex ) {
                        consoleLogger.logThrowing(ex);
                        archivePropertyDefaults = new String[] {
                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVALON_INACTIVE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVENODEDATALEVEL_NONE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVETHREADDATALEVEL_NONE,
                                AttributeConstants.MESSAGEFLOW_THIS_STATSARCHIVEOUTPUTFORMAT_USERTRACE,
                                "" };
                    }
                    addMenuItem(statsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE), -1,
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_ENABLED),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_NODE_DETAIL),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_THREAD_DETAIL),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_FORMAT),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_ACCOUNTING_ORIGIN)},
                                            null,
                                            archivePropertyDefaults,
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testModifyStatisticsArchiveProperties", new Class[] {MessageFlowProxy.class, String.class, String.class, String.class, String.class, String.class}), false));

                    addMenuItem(statsSubmenu, ResourcesHandler.getNLSResource(ResourcesHandler.MF_STATISTICS_ARCHIVE_RESET), -1,
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterFlow,
                                    classTesterFlow.getClass().getMethod("testResetArchiveStatistics", new Class[] {MessageFlowProxy.class}), false));

                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_ADDITIONAL_INSTANCES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_ADDITIONAL_INSTANCES_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_ADDITIONAL_INSTANCES_VALUE, "0")},
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testSetAdditionalInstances", new Class[] {MessageFlowProxy.class, Integer.TYPE}), false));

                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/userTraceLevel"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "none")},
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testSetRuntimeProperty", new Class[] {MessageFlowProxy.class, String.class,
                                                    String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SET_USER_DEFINED_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "Property1"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.MF_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "1")},
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testSetUserDefinedProperty", new Class[] {MessageFlowProxy.class, String.class, String.class}), false));
                    String defaultName = "";
                    String defaultShortDesc = "";
                    String defaultLongDesc = "";
                    try {
                        defaultName = selectedAdministeredObject.getName();
                        defaultShortDesc = selectedAdministeredObject.getShortDescription();
                        defaultLongDesc = selectedAdministeredObject.getLongDescription();
                    } catch (ConfigManagerProxyPropertyNotInitializedException e) {
                        // ignore (use empty strings)
                    }
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MF_PROPERTIES),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_SHORT_DESC),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.MF_LONG_DESC)},
                                            null,
                                            new String[] {
                                            defaultName,
                                            defaultShortDesc,
                                            defaultLongDesc },
                                            null,
                                            true,
                                            classTesterFlow,
                                            classTesterFlow.getClass().getMethod("testModifyMFProperties", new Class[] {MessageFlowProxy.class, String.class, String.class, String.class}), false));
                } else if (type == ConfigurationObjectType.log) {

                    // Context sensitive properties for the integration node log
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.LOG_DISPLAY),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterLog,
                                    classTesterLog.getClass().getMethod("testLogDisplay", new Class[] {LogProxy.class} ), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.LOG_CLEAR),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterLog,
                                    classTesterLog.getClass().getMethod("testLogClear", new Class[] {LogProxy.class} ), false));
                } else if (type == ConfigurationObjectType.activitylog) {

                    // Context sensitive properties for the integration node log
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.LOG_DISPLAY),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterActivityLog,
                                    classTesterActivityLog.getClass().getMethod("testLogDisplay", new Class[] {ActivityLogProxy.class} ), false));
                } else if (type == ConfigurationObjectType.administrationqueue) {

                    // Context sensitive properties for the admin queue
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_DISPLAY),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterAdminQueue,
                                    classTesterAdminQueue.getClass().getMethod("testAdminQueueDisplay", new Class[] {AdminQueueProxy.class} ), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_CANCEL),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_WORKID)},
                                        null,
                                        null,
                                        this.getClass().getMethod("generateCancelAdminEntryBox", new Class[] {String[].class}),
                                        true,
                                        classTesterAdminQueue,
                                        classTesterAdminQueue.getClass().getMethod("testAdminQueueCancel", new Class[] {AdminQueueProxy.class, String.class}), false));

                } else if (type == ConfigurationObjectType.resourcemanager) {

                    //menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.GET_ACTIVITY_LOG),
                            new CommandInformation(
                                    null,
                                    null,
                                    null,
                                    null,
                                    true,
                                    classTesterRM,
                                    classTesterRM.getClass().getMethod("testGetActivityLog", new Class[] {ResourceManagerProxy.class }), false));
                    menuForSelectedObject.addSeparator();
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_ACTION_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_ACTION_PARAMETERS),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_OBJECT_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_EXECUTE_OBJECT_PROPERTIES)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_ACTION_NAME, "Report"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_ACTION_PARAMETERS, "recursive=yes"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_OBJECT_NAME, "HTTPConnector"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.ACTION_EXECUTE_OBJECT_PROPERTIES, "")},
                                            null,
                                            true,
                                            classTesterRM,
                                            classTesterRM.getClass().getMethod("testExecute", new Class[] {ResourceManagerProxy.class, String.class,String.class,String.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY),
                            new CommandInformation(
                                    new String[] {
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME),
                                            ResourcesHandler.getNLSResource(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE)},
                                            null,
                                            new String[] {
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_NAME, "This/resourceStatsReportingOn"),
                                            ResourcesHandler.getUserSetting(ResourcesHandler.EG_SET_RUNTIME_PROPERTY_PROPERTY_VALUE, "inactive")},
                                            null,
                                            true,
                                            classTesterRM,
                                            classTesterRM.getClass().getMethod("testSetRuntimeProperty", new Class[] {ResourceManagerProxy.class, String.class, String.class}), false));


                } else if (type == ConfigurationObjectType.policyManager) {
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_CREATEPOLICY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_POLICY),
                                    JFileChooser.OPEN_DIALOG, "xml", false, classTesterPM,
                                    this.classTesterPM.getClass().getMethod("testCreatePolicy", new Class[] {PolicyManagerProxy.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_CREATEPOLICYPROXY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_POLICY),
                                    JFileChooser.OPEN_DIALOG, "xml", false, classTesterPM,
                                    this.classTesterPM.getClass().getMethod("testCreatePolicyProxy", new Class[] {PolicyManagerProxy.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_DELETEPOLICY),
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.POLICY_NAME)},
                                    null, //We do not want to store any settings in the user configuration file
                                    new String[] { ResourcesHandler.getUserSetting(ResourcesHandler.POLICY_NAME, "Policy1")},
                                    null,
                                    true,
                                    classTesterPM,
                                    classTesterPM.getClass().getMethod("testDeletePolicy", new Class[] {PolicyManagerProxy.class, String.class}),
                                    false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_DELETEPOLICYPROXY),
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.POLICY_NAME)},
                                    null, //We do not want to store any settings in the user configuration file
                                    new String[] { ResourcesHandler.getUserSetting(ResourcesHandler.POLICY_NAME, "Policy1")},
                                    null,
                                    true,
                                    classTesterPM,
                                    classTesterPM.getClass().getMethod("testDeletePolicyProxy", new Class[] {PolicyManagerProxy.class, String.class}),
                                    false));

                } else if( (type == ConfigurationObjectType.policyObject) ||
                           (type == ConfigurationObjectType.wlmPolicyObject) )
                {
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_COPYPOLICY),
                            new CommandInformation(
                                    new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.POLICY_NAME)},
                                    null, //We do not want to store any settings in the user configuration file
                                    new String[] { ResourcesHandler.getUserSetting(ResourcesHandler.POLICY_NAME, "NewPolicyName")},
                                    null,
                                    true,
                                    classTesterPolicy,
                                    classTesterPolicy.getClass().getMethod("testCopyPolicy", new Class[] {PolicyProxy.class, String.class}),
                                    false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_UPDATEPOLICY),
                            new CommandInformation(
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_POLICY),
                                    JFileChooser.OPEN_DIALOG, "xml", false, classTesterPolicy,
                                    this.classTesterPolicy.getClass().getMethod("testUpdatePolicy", new Class[] {PolicyProxy.class, String.class}), false));
                    addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_DELETEPOLICY),
                            new CommandInformation(null, null, null, null, true, classTesterPolicy,
                                    classTesterPolicy.getClass().getMethod("testDeletePolicy", new Class[] {PolicyProxy.class}),
                                    false));
                }
            } else if ((o != null) && (o instanceof MessageFlowDependency)) {
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.MFD_DELETE),
                        new CommandInformation(
                                null,
                                null,
                                null,
                                null,
                                true,
                                classTesterFlow,
                                classTesterFlow.getClass().getMethod("testDeleteMsgFlowDependency", new Class[] {MessageFlowDependency.class } ), false));
            } else if ((o != null) && (o instanceof BarFile)) {
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BAR_VIEW),
                        new CommandInformation(
                                null,
                                null,
                                null,
                                null,
                                true,
                                classTesterMisc,
                                classTesterMisc.getClass().getMethod("testViewBarFile", new Class[] {BarFile.class } ), false));
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.BAR_REDEPLOY),
                        new CommandInformation(
                                null,
                                null,
                                null,
                                null,
                                true,
                                classTesterMisc,
                                classTesterMisc.getClass().getMethod("testRedeployBarFile", new Class[] {BarFile.class } ), false));
            } else if ((o != null) && (o instanceof FolderNode)) {
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_ADD),
                        new CommandInformation(
                                new String[] {
                                        ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_TYPE),
                                        ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_NAME)},
                                    null,
                                    new String[] {
                                        ((FolderNode)o).subtype,
                                        ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_NAME)},
                                    this.getClass().getMethod("generateCreateConfigurableServiceBox", new Class[] {String[].class}),
                                    true,
                                    classTesterBroker,
                                    classTesterBroker.getClass().getMethod("testCreateConfigurableService", new Class[] {BrokerProxy.class, String.class, String.class}), false));

            } else if ((o != null) && (o instanceof ConfigurableService)) {
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_DELETE),
                        new CommandInformation(
                                        null,
                                        null,
                                        null,
                                        null,
                                        true,
                                        classTesterBroker,
                                        classTesterBroker.getClass().getMethod("testDeleteConfigurableService", new Class[] {ConfigurableService.class}), false));
                addMenuItem(menuForSelectedObject, ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_MODIFY),
                        new CommandInformation(
                                new String[] {
                                        ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_PROPERTY_NAME),
                                        ResourcesHandler.getNLSResource(ResourcesHandler.CONFIGURABLE_SERVICE_PROPERTY_VALUE)},
                                    null,
                                    new String[] {
                                        ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_PROPERTY_NAME),
                                        ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_PROPERTY_VALUE)},
                                    null,
                                    true,
                                    classTesterBroker,
                                    classTesterBroker.getClass().getMethod("testModifyConfigurableService", new Class[] {ConfigurableService.class, String.class, String.class}), false));

            } else {
                JMenuItem mi = new JMenuItem("["+ResourcesHandler.getNLSResource(ResourcesHandler.NO_OPTIONS_AVAILABLE)+"]");
                mi.setEnabled(false);
                menuForSelectedObject.add(mi);
            }

        } catch (NoSuchMethodException ex) {
            consoleLogger.logThrowing(ex);
        }

    }

    /**
     * Returns the default set of input fields, with the supplied set of defaults
     * @param defaults
     * @return
     */
    private JComponent[] getDefaultTextFields(String[] defaults) {
        JComponent[] retVal = new JComponent[defaults.length];
        for (int i=0; i<defaults.length; i++) {
            retVal[i] = new JTextField(defaults[i]);
        }
        return retVal;
    }

    /**
     * Returns a set of input fields for use with the "ConnectToLocalBroker" option
     * @param defaults
     * @return
     */
    public JComponent[] generateConnectToLocalBrokerList(String[] defaults) {

        // There is only one parameter required in the Local Connect action (the integration node name).
        JComponent[] retVal = new JComponent[1];

        try {
            LocalBrokerUtilities.clearCache();
            String[] localBrokers = LocalBrokerUtilities.getLocalBrokerNames(8, -1);

            // Go through the list and tell the user which ones are not running
            for (int i=0; i<localBrokers.length; i++) {
                try {
                    int pid = LocalBrokerUtilities.getLocalBrokerPID(localBrokers[i]);
                    if (pid == 0) {
                        localBrokers[i] = localBrokers[i].concat(" ("+ResourcesHandler.getNLSResource(ResourcesHandler.NOT_RUNNING)+")");
                    }
                } catch (IOException ex) {
                    // Can't read PID
                    consoleLogger.logThrowing(ex);
                }
            }

            JComboBox jcb = new JComboBox(localBrokers);
            jcb.setEditable(localBrokers.length == 0); // If no integration nodes were found, allow the user to enter their own
            jcb.setSelectedItem(defaults[0]);
            retVal[0] = jcb;
        } catch (ConfigManagerProxyLoggedException ex) {
            // Thrown by BrokerProxy.getLocalBrokerNames()
            // It means that there was an error reading local integration nodes,
            // so get the user to enter the information manually instead.
            retVal[0] = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_NAME, DEFAULT_BROKER_NAME));
        }

        return retVal;
    }

    /**
     * This method is required because we want one of the fields to be of type checkbox (use SSL) rather than a JTextField
     * @param defaults
     * @return
     */
    public JComponent[] generateParmsForRemoteConnect(String[] defaults) {
        // There is only one parameter required in the Local Connect action (the integration node name).
        JComponent[] retVal = {
        		new JTextField(defaults[0]),		// Hostname
        		new JTextField(defaults[1]),        // Port
        		new JTextField(defaults[2]),		// Username
        		new JPasswordField(defaults[3]),	// Password
        		new JCheckBox(),	   	            // Use SSL
        };
        return retVal;
    }

    /**
     * Returns a set of input fields for use with the "Create Configurable Service" option
     * @param defaults
     * @return
     */
    public JComponent[] generateCreateConfigurableServiceBox(String[] defaults) {

        // There are two parameters required in the create action
        JComponent[] retVal = new JComponent[2];

        // Parameter 2 : The Configurable Service Name
        JTextField jtf = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_NAME, ""));
        retVal[1] = jtf;

        try {
            // Parameter 1 : The Configurable Service Type
            if (broker != null) {
                String[] availableTypes = broker.getConfigurableServiceTypes();
                JComboBox jcb = new JComboBox(availableTypes);
                jcb.setEditable(false);
                if ((defaults != null) && (defaults.length > 0) && (defaults[0] != null)) jcb.setSelectedItem(defaults[0]);
                retVal[0] = jcb;
            } else {
                // Get the user to enter the information manually instead.
                retVal[0] = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_TYPE, ""));
            }

        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            // Thrown by BrokerProxy.getConfigurableServiceTypes()
            // It means that there was an error reading local integration nodes,
            // so get the user to enter the information manually instead.
            retVal[0] = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.CONFIGURABLE_SERVICE_TYPE, ""));
        }

        return retVal;
    }

    /**
     * Returns a set of input fields for use with the "Enable/Disable Resource Type Statistics" option
     * @param defaults
     * @return
     */
    public JComponent[] generateResourceTypeStatisticsDialog(String[] defaults) {

        // There is one parameter required in this action
        JComponent[] retVal = new JComponent[1];

        try {
            // Parameter 1 : The Resource Type name
            if (broker != null) {
                String[] availableTypes = broker.getResourceTypeNames();
                String[] availableTypesPlusAll = new String[availableTypes.length+1];
                availableTypesPlusAll[0] = ResourcesHandler.getNLSResource(ResourcesHandler.EG_RESOURCE_STATISTICS_ALL);
                int i=1;
                for (String thisType : availableTypes) {
                    availableTypesPlusAll[i++] = thisType;
                }
                JComboBox jcb = new JComboBox(availableTypesPlusAll);
                jcb.setEditable(false);
                if ((defaults != null) && (defaults.length > 0) && (defaults[0] != null)) jcb.setSelectedItem(defaults[0]);
                retVal[0] = jcb;
            } else {
                // Get the user to enter the information manually instead.
                if ((defaults != null) && (defaults.length > 0) && (defaults[0] != null)) {
                    retVal[0] = new JTextField(defaults[0]);
                } else {
                    retVal[0] = new JTextField("");
                }
            }

        } catch (ConfigManagerProxyPropertyNotInitializedException ex) {
            // Thrown by BrokerProxy.getConfigurableServiceTypes()
            // It means that there was an error reading local integration nodes,
            // so get the user to enter the information manually instead.
            if ((defaults != null) && (defaults.length > 0) && (defaults[0] != null)) {
                retVal[0] = new JTextField(defaults[0]);
            } else {
                retVal[0] = new JTextField("");
            }
        }

        return retVal;
    }

    /**
     * Returns a set of input fields for use with the "Set Timeout Characteristics" option
     * @param defaults
     * @return
     */
    public JComponent[] generateTimeoutCharacteristicsDialog(String[] defaults) {

        // There are four parameters required in this action
        JComponent[] retVal = new JComponent[5];

        // Parameter 1 : Synchronous deployment toggle
        JCheckBox jcb = new JCheckBox("", ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true));
        retVal[0] = jcb;

        // Parameter 2 : The deployment timeout (int)
        JTextField jtf = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.DEPLOY_WAIT_TIME_SECS, "30"));
        retVal[1] = jtf;

        // Parameter 3 : The integration server create timeout (int)
        jtf = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.EG_CREATE_WAIT_TIME_SECS, "30"));
        retVal[2] = jtf;

        // Parameter 4 : The other requests timeout (int)
        jtf = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.OTHER_WAIT_TIME_SECS, "10"));
        retVal[3] = jtf;

        // Parameter 5 : The policy creation timeout (int)
        jtf = new JTextField(ResourcesHandler.getUserSetting(ResourcesHandler.POLICY_WAIT_TIME_SECS, "30"));
        retVal[4] = jtf;

        return retVal;
    }

    /**
     * Returns a set of input fields for use with the "Cancel Admin Queue Entry" option
     * @param defaults Not used
     * @return
     */
    public JComponent[] generateCancelAdminEntryBox(String[] defaults) {

        // There is only one parameter required in the cancel box (the admin queue entry that is to be cancelled).
        JComponent[] retVal = new JComponent[1];

        try {
            if (broker != null) {
            	AdminQueueProxy aqp = broker.getAdministrationQueue();
            	synchronized (aqp) { /* prevent the number of admin queue entries from changing while we're populating the list */
            		int numberOfWorkItems = aqp.getSize();
            		String[] workItems;
            		if (numberOfWorkItems == 0) {
            			workItems = new String[] {ResourcesHandler.getNLSResource(ResourcesHandler.ADMINQUEUE_NOTHINGTOCANCEL)};
            		} else {
            			workItems = new String[numberOfWorkItems];
		            	Enumeration<AdminQueueEntry> e = aqp.elements();
		            	int i=0;
		            	while (e.hasMoreElements()) {
		            		AdminQueueEntry aqe = e.nextElement();
		            		workItems[i++] = "["+i+"] "+classTesterAdminQueue.formatAdminQueueEntry(aqe);
		            	}

            		}
            		JComboBox jcb = new JComboBox(workItems);
            		jcb.setEditable(false);
            		retVal[0] = jcb;

            	}
            } else {
                // Get the user to enter the information manually instead.
                retVal[0] = new JTextField("");
            }

        } catch (ConfigManagerProxyPropertyNotInitializedException e) {
			// Thrown by getAdministrationQueue()
			// It means that there was an error reading the queue,
            // so get the user to enter the information manually instead.
            consoleLogger.logThrowing(e);
        	retVal[0] = new JTextField("");
		}

        return retVal;
    }

    /**
     * Gets parameters from the user for a particular command
     * @param title Text to display in the title bar of the request window
     * @param labels describes the parameter prompts
     * @param defaults Default values for the text fields
     * @param methodToGenerateInputBoxes the method that will be used
     * to generate the input boxes. If null, then all input boxes will
     * be the default unvalidated JTextFields.
     * @param canBeBatched True if and only if the command can be added to a
     * batch if the user submits the action. This determines the
     * text used for the OK button.
     */
    void getParameters(String title, String[] labels, String[] defaults, Method methodToGenerateInputBoxes, boolean canBeBatched) {

        if (labels != null) {
            Container dataEntryContent = dataEntryFrame.getContentPane();

            dataEntryContent.removeAll();
            dataEntryFrame.setTitle(title);
            SpringLayout layout = (SpringLayout) dataEntryContent.getLayout();

            JLabel[] lab = new JLabel[labels.length];

            if (methodToGenerateInputBoxes == null) {
                tf = getDefaultTextFields(defaults);
            } else {
                try {
                    Object[] parameters = new Object[1];
                    parameters[0] = defaults;
                    Object rc = methodToGenerateInputBoxes.invoke(this, parameters);
                    tf = (JComponent[]) rc;
                } catch (Exception e) {
                    consoleLogger.logThrowing(e);
                }
            }

            for (int i=0; i<labels.length; i++) {
                lab[i] = new JLabel(labels[i], JLabel.RIGHT);
                lab[i].setLabelFor(tf[i]);
                dataEntryContent.add(lab[i]);
                dataEntryContent.add(tf[i]);
            }

            // Work out the correct size and position for each component in the frame
            // First, work out the max width for the first column (labels)

            Spring maxWidth = Spring.constant(0);
            for (int i=0; i<labels.length; i++) {
                SpringLayout.Constraints c = layout.getConstraints(dataEntryContent.getComponent(i*2));
                maxWidth = Spring.max(maxWidth, c.getWidth());
            }

            if ((canBeBatched) && (broker != null) && (broker.isBatching())) {
                submitButton = new JButton(ResourcesHandler.getNLSResource(ResourcesHandler.ADDTOBATCH));
            } else {
                submitButton = new JButton(ResourcesHandler.getNLSResource(ResourcesHandler.SUBMIT));
            }

            submitButton.addActionListener(guiEventListener);
            JRootPane rootPane = dataEntryFrame.getRootPane();
            rootPane.setDefaultButton(submitButton);
            dataEntryContent.add(submitButton);

            cancelButton = new JButton(ResourcesHandler.getNLSResource(ResourcesHandler.CANCEL));
            cancelButton.addActionListener(guiEventListener);
            dataEntryContent.add(cancelButton);

            // Now position all the components correctly
            // Start with the text fields and labels
            int xPadding = 6;
            int yPadding = 6;
            int betweenColumnPadding = 12;
            int tfHeight = 20;
            int tfWidth = 180;
            int buttonHeight = 26;
            for (int i=0; i<labels.length; i++) {
                SpringLayout.Constraints c = layout.getConstraints(dataEntryContent.getComponent(i*2));
                c.setX(Spring.constant(xPadding));
                c.setWidth(maxWidth);
                c.setY(Spring.constant(yPadding+(i*(tfHeight+yPadding))));
                c.setHeight(Spring.constant(tfHeight));

                c = layout.getConstraints(dataEntryContent.getComponent((i*2)+1));
                c.setX(Spring.sum(maxWidth, Spring.constant(betweenColumnPadding)));
                c.setY(Spring.constant(yPadding+(i*(tfHeight+yPadding))));
                c.setHeight(Spring.constant(tfHeight));
                c.setWidth(Spring.constant(tfWidth));
            }

            // Now the buttons - submit/add to batch
            SpringLayout.Constraints c = layout.getConstraints(dataEntryContent.getComponent(labels.length*2));
            c.setX(Spring.sum(Spring.sum(maxWidth, Spring.minus(c.getWidth())), Spring.constant(xPadding)));
            c.setY(Spring.constant(yPadding+(labels.length*(tfHeight+yPadding))));
            c.setHeight(Spring.constant(buttonHeight));

            // Cancel button
            c = layout.getConstraints(dataEntryContent.getComponent((labels.length*2)+1));
            c.setX(Spring.sum(maxWidth, Spring.constant(betweenColumnPadding)));
            c.setY(Spring.constant(yPadding+(labels.length*(tfHeight+yPadding))));
            c.setHeight(Spring.constant(buttonHeight));

            // Now set the overall size of the dialog
            c = layout.getConstraints(dataEntryContent);
            c.setConstraint(SpringLayout.SOUTH, Spring.constant((labels.length * (tfHeight + yPadding)) + (buttonHeight + (yPadding*2))));
            c.setConstraint(SpringLayout.EAST, Spring.sum(maxWidth, Spring.constant(betweenColumnPadding + tfWidth + xPadding)));

            // (End of positioning code)
            if (!isHeadless()) {
                dataEntryFrame.pack();
                dataEntryFrame.addWindowListener(guiEventListener);
                dataEntryFrame.setResizable(false);
                centerComponentInExerciser(dataEntryFrame);
                dataEntryFrame.setVisible(true);
            }
        }
    }


    /**
     * Returns true if and only if the exerciser is
     * running in 'headless' mode (i.e. without a GUI)
     * @return boolean
     */
    public boolean isHeadless() {
        return headlessMode;
    }


    /**
     * Enables or disables various items in the automation menu
     * based on whether a script is currently being recorded
     */
    private void setAutomationMenuEnablement() {

        Component record = automation.getMenuComponent(0);
        Component wait = automation.getMenuComponent(1);
        Component play = automation.getMenuComponent(2);
        Component stop = automation.getMenuComponent(3);

        if (scriptFileName == null) {
            record.setEnabled (true);
            wait.setEnabled (false);
            play.setEnabled (true);
            stop.setEnabled (false);
        } else {
            record.setEnabled (false);
            wait.setEnabled (true);
            play.setEnabled (true);
            stop.setEnabled (true);
        }
    }

    /**
     * Sets up the tree for the supplied object
     * @param affectedObject Object for which the tree should be initialised
     */
    void initialiseTreeForAdministeredObject(AdministeredObject affectedObject) {

        DefaultMutableTreeNode treeNodeOfParent = getTree(affectedObject);
        if ((affectedObject != null) && (treeNodeOfParent != null)) {
          if(cmpObjectsToNodes.containsKey(affectedObject) || cmpObjectsToNodes.containsValue(treeNodeOfParent))
          {
            cmpObjectsToNodes.remove(affectedObject); //Before inserting the new entry we remove the old one from the hashtable
          }
          cmpObjectsToNodes.put(affectedObject, treeNodeOfParent);

          if(nodesToCMPObjects.containsKey(treeNodeOfParent) || nodesToCMPObjects.containsValue(affectedObject))
          {
            nodesToCMPObjects.remove(treeNodeOfParent);  //Before inserting the new entry we remove the old one from the hashtable
          }
          nodesToCMPObjects.put(treeNodeOfParent, affectedObject);

          expandAll(tree, true);
          ((DefaultTreeModel )tree.getModel()).nodeStructureChanged(treeNodeOfParent);

        }
    }

    /**
     * Saves the console text to the specified file
     * @param fileName Name of the file to which the
     * console output should be saved
     */
    public void saveConsole(String fileName) {
        consoleLogger.save(fileName);
    }

    /**
     * Returns a string describing the supplied object.
     * Is used for identifying the selected object in a script. Cannot use
     * the UUID, because if the object is being created as part of
     * the script the UUID is different each time!
     */
    private String getIdentifyingStringFromTreeNode(DefaultMutableTreeNode object) {
        StringBuffer retVal = new StringBuffer();
        TreeNode[] o = object.getPath();
        for (int i=0; i<o.length; i++) {
            String str = o[i].toString();
            retVal.append(str);
            if ((i+1) < o.length) {
                retVal.append(AUTOMATIONFORMAT_OBJECTPATHSEPARATOR);
            }
        }
        return retVal.toString();
    }


    /**
     * Issues the supplied action with the supplied parameters
     * @param testOwner Class tester responsible for invoking the
     * supplied method
     * @param method Method to invoke
     * @param textFieldInput any parameters to the method.
     * @param suppressEntryExitLogMessage True if and only if the
     * entry and exit log messages should not be displayed
     */
    void issueAction(Object testOwner, Method method, String[] textFieldInput, boolean suppressEntryExitLogMessage) {

        // Add the action to the output script; if no such script is being
        // written, addActionToOutputScript will have no effect.
        addActionToOutputScript(testOwner, method, textFieldInput);

        // Invoke the method
        if (method != null) {
            Class<?>[] parameterTypes = method.getParameterTypes();
            Object[] parameters = null;
            boolean error = false;

            // Fit the supplied textFieldInput strings into the parameters array
            if (parameterTypes != null) {
                int startParameter = 0;

                if (parameterTypes.length > 0) {
                    parameters = new Object[parameterTypes.length];

                    // If the selected object does not directly map
                    // to a CMP object (i.e. it's a folder), then
                    // we need to map it to an object that can
                    // issue the action on its behalf.
                    if (selectedCMPObject instanceof FolderNode) {
                        parameters[0] = ((FolderNode)selectedCMPObject).getCMPObjectDelegate();
                        startParameter++;
                    } else if ((AdministeredObject.class.isAssignableFrom(parameterTypes[0])) ||
                               (MessageFlowDependency.class.isAssignableFrom(parameterTypes[0])) ||
                               (ConfigurableService.class.isAssignableFrom(parameterTypes[0])) ||
                               (BarFile.class.isAssignableFrom(parameterTypes[0]))) {
                        // The first parameter may be the selected administered object,
                        // message flow dependency, BarFile or ConfigurableService.
                        parameters[0] = selectedCMPObject;
                        startParameter++;
                    }

                    // Now go through the other arguments and assign the values from
                    // the user input text fields to the object array that will be
                    // passed to the invoke method.
                    int positionOfInputParametersPointer = 0;
                    for (;startParameter<parameterTypes.length;startParameter++) {

                        if (textFieldInput!=null) {
                            if (positionOfInputParametersPointer>=textFieldInput.length) {
                                // There are more method parameters required than
                                // there are user text fields. Fill in the remaining
                                // parameters with null.
                                parameters[startParameter] = null;
                            } else {
                                // Look at the supplied text field parameter and try
                                // and squeeze it into the type required by the
                                // target method.
                                    String thisInputParameter = textFieldInput[positionOfInputParametersPointer++];
                                    try {
                                    parameters[startParameter] = getObjectFromStringRepresentation(thisInputParameter, parameterTypes[startParameter]);
                                    if (parameters[startParameter] == null) {
                                        consoleLogger.logSevere("Error: Unknown parameter in "+method.getName()+": "+parameterTypes[startParameter].getName());
                                        error = true;
                                    }

                                    } catch (Exception ex) {
                                        consoleLogger.logSevere("Error: Invalid "+parameterTypes[startParameter].getName()+" parameter (#"+startParameter+") to "+method.getName());
                                        error = true;
                                    }
                                }
                        } else {
                            // No parameters were supplied.
                            // Fill in all parameters with null.
                            parameters[startParameter] = null;
                        }
                    }

                }
            }

            if (!error) {
                // Tell the worker thread to invoke the requested action.
                commandThread.enqueueCommand(method, testOwner, parameters, suppressEntryExitLogMessage, false);
            } else {
                consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.INVALID_ARGUMENTS));
            }
        }
    }

    /**
     * Returns an object of the type described by the Class argument that
     * has a value described by the input parameter.
     * @param thisInputParameter Value of the returned object
     * @param class1 AdministeredObject, String or class representing one of the primitive types int, long or boolean.
     * @return Object of the required type and value, or null if and only
     * if the object could not be transformed.
     * @throws IllegalArgumentException if the type was an AdministeredObject
     * yet the object to which the string representation refers was not
     * available in the integration node's hierarchy.
     */
    private Object getObjectFromStringRepresentation(String thisInputParameter, Class<?> class1)
    throws IllegalArgumentException {
        Object retVal = null;
        if (class1.equals(String.class)) {
            retVal = thisInputParameter;
        } else if (class1.equals(Integer.TYPE)) {
            retVal = new Integer(Integer.parseInt(thisInputParameter));
        } else if (class1.equals(Long.TYPE)) {
            retVal = new Long(Long.parseLong(thisInputParameter));
        } else if (class1.equals(Boolean.TYPE)) {
            String yesIdentifier = ResourcesHandler.getNLSResource(ResourcesHandler.YES_INPUT_STRING_IDENTIFIER);
            if ((thisInputParameter.indexOf(yesIdentifier)>-1)||(thisInputParameter.indexOf(""+true)>-1)) {
                retVal = Boolean.TRUE;
            } else {
                retVal = Boolean.FALSE;
            }
        } else if (AdministeredObject.class.isAssignableFrom(class1)) {
            // throws IllegalArgumentException
            retVal = getAdministeredObjectFromString(thisInputParameter);
        }
        return retVal;
    }


    /**
     * If the user has requested that his/her actions are recorded into a script AND the described
     * method represents a recordable action, this method adds the method and parameters described
     * by the input parameters to the currently active script. Otherwise, this method does nothing.
     * @param testOwner Member variable of the API Exerciser instance that will be invoked
     * @param method Method object that is to be invoked
     * @param textFieldInput Text-based input parameters to the method
     */
    private void addActionToOutputScript(Object testOwner, Method method, String[] textFieldInput) {
        if ((scriptFileName != null) && (!cannotBeAddedToScript(method))) {

            // Work out the test owner (i.e. member variable from this class
            // that is responsible for issuing the action).
            String testOwnerS = getMemberVariableNameFromInstance(testOwner);

            // If there's no test owner, then don't bother recording the action
            // because there's nothing to invoke.
            if (testOwnerS == null) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_IGNORED));
            } else {
                try {
                    // If this is the first action, the XML document representing
                    // the script will not have been initialised, so do that here.
                    if (scriptOutputDoc == null) {
                        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
                        DocumentBuilder db = dbf.newDocumentBuilder();
                        scriptOutputDoc = db.newDocument();
                        Element root = scriptOutputDoc.createElement(SCRIPTXML_ROOT);
                        root.setAttribute(SCRIPTXML_PROGNAME, SCRIPTXML_PROGNAME_VALUE);
                        root.setAttribute(SCRIPTXML_PROGID, SCRIPTXML_PROGID_VALUE);
                        root.setAttribute(SCRIPTXML_PROGVER, SCRIPTXML_PROGVER_VALUE);
                        scriptOutputDoc.appendChild(root);
                    }

                    // Write the method information...
                    Element root = scriptOutputDoc.getDocumentElement();
                    Element methodInfo = scriptOutputDoc.createElement(SCRIPTXML_METHOD);
                    root.appendChild(methodInfo);

                    // Set the name of method and the owning member variable
                    methodInfo.setAttribute(SCRIPTXML_NAME, method.getName());
                    methodInfo.setAttribute(SCRIPTXML_OWNER, testOwnerS);

                    // Set the parameters
                    Class<?>[] parameterTypes = method.getParameterTypes();
                    int numberOfParameterTypes = parameterTypes.length;
                    int textFieldCounter = 0;
                    for (int paramTypeCounter=0; paramTypeCounter< numberOfParameterTypes; paramTypeCounter++) {
                        Element parameter = scriptOutputDoc.createElement(SCRIPTXML_PARAMETER);
                        methodInfo.appendChild(parameter);
                        parameter.setAttribute(SCRIPTXML_TYPE, parameterTypes[paramTypeCounter].getName());

                        // If the type of the current parameter is a descendant of
                        // 'AdministeredObject', use the selected object's
                        // node information and not the text field value that the user
                        // entered. This is to record
                        // the fact that the user selected an object in the tree before
                        // typing in the text fields.
                        if (AdministeredObject.class.isAssignableFrom(parameterTypes[paramTypeCounter])) {
                            if (selectedCMPObject != null) {
                                parameter.setAttribute(SCRIPTXML_VALUE, getIdentifyingStringFromTreeNode((cmpObjectsToNodes.get(selectedCMPObject))));
                            }
                        } else {
                            parameter.setAttribute(SCRIPTXML_VALUE, textFieldInput[textFieldCounter++]);
                        }


                    }
                    consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.ADDED_AUTOMATION_ACTION));

                } catch (ParserConfigurationException e) {
                    consoleLogger.logThrowing(e);
                }
            }
        }

    }


    /**
     * Returns true if and only if the method described by the
     * supplied parameters should not be written to a script file
     * @param method
     * @return boolean true iff the method is not scriptable
     */
    private boolean cannotBeAddedToScript(Method method) {
        boolean retVal = false;
        if (method != null) {
            retVal = "stopRecording".equals(method.getName());
        }
        return retVal;
    }


    /**
     * Returns the name of this object's member variable that equals
     * the supplied argument.
     * @param testOwner
     * @return String IntegrationAPIExerciser member variable
     */
    private String getMemberVariableNameFromInstance(Object testOwner) {

        String retVal = null;

        if (testOwner == this) {
                retVal = "this";
        } else {
                Field[] allFields = this.getClass().getFields();

                for (int i=0; i<allFields.length; i++) {
                        Object o = null;
                    try {
                        o = allFields[i].get(this);
                    } catch (Exception e) {
                        // Ignore - return null
                    }
                    if (o == testOwner) {
                                retVal = allFields[i].getName();
                        }
                }
            }
        return retVal;
    }


    /**
     * Initialises the GUI services
     */
    public void initWindow() {

        try {
            // Potentially long operation... display the hourglass
            Cursor hourglassCursor = new Cursor(Cursor.WAIT_CURSOR);
            setCursor(hourglassCursor);

            model = new DefaultTableModel() {
                private static final long serialVersionUID = 1L;
                @Override
                public boolean isCellEditable(int row, int column) {
                    return false;
                }
            };

            table = new JTable(model);
            table.setModel(model);
            table.setRowSelectionAllowed(false);
            table.addMouseListener(guiEventListener);
            model.addColumn(ResourcesHandler.getNLSResource(ResourcesHandler.PROPERTY_NAME));
            model.addColumn(ResourcesHandler.getNLSResource(ResourcesHandler.PROPERTY_VALUE));

            propertyNameColumn = table.getColumn(ResourcesHandler.getNLSResource(ResourcesHandler.PROPERTY_NAME));
            propertyValueColumn = table.getColumn(ResourcesHandler.getNLSResource(ResourcesHandler.PROPERTY_VALUE));

            root = getTree(broker);
            tree = new JTree(root);
            tree.setCellRenderer(treeCellRenderer);
            initialiseMappingOfIdentifyingStringsToNodes(root);

            // Set up the blue console area
            if (consoleLogger == null) {
                configureConsoleRenderingAction(false, false); //Default to a text logger.
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.PROGRAM_STARTED));
            }
            JTextComponent console = consoleLogger.getJTextComponent();
            console.setSize(new Dimension(640,100));

            // Set up the status line
            if (statusLine == null) {
                statusLine = new JLabel("");
                updateStatusLine();
            }

            // Set up the panel into which parameters are entered
            dataEntryFrame = new JDialog(this);
            dataEntryFrame.setModal(true);
            JPanel panel = new JPanel();
            panel.setLayout(new SpringLayout());
            dataEntryFrame.setContentPane(panel);

            menuForSelectedObject = new JPopupMenu(ResourcesHandler.getNLSResource(ResourcesHandler.SELECTED));

            Container content = getContentPane();

            tree.addMouseListener(guiEventListener);
            content.removeAll();

            JScrollPane treeScroller = new JScrollPane(tree, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
                    JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
            JScrollPane tableScroller = new JScrollPane(table, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
                    JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
            JScrollPane consoleScroller = new JScrollPane(console, JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED,
                    JScrollPane.HORIZONTAL_SCROLLBAR_AS_NEEDED);
            JPanel consoleAndStatusLine = new JPanel();
            consoleAndStatusLine.setLayout(new BorderLayout());
            consoleAndStatusLine.add(consoleScroller, BorderLayout.CENTER);
            consoleAndStatusLine.add(statusLine, BorderLayout.SOUTH);

            JSplitPane treeAndTable = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT, true, treeScroller, tableScroller);
            treeAndTable.setResizeWeight(0.4);
            treeAndTable.setDividerLocation(0.4);
            JSplitPane jsp = new JSplitPane(JSplitPane.VERTICAL_SPLIT, true, treeAndTable, consoleAndStatusLine);
            jsp.setResizeWeight(0.6);
            jsp.setDividerLocation(0.6);
            content.add(jsp);


            // Generate the menu bar
            JMenuBar m = new JMenuBar();
            setJMenuBar(m);


            // File menu ->
            JMenu fileMenuRoot = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.FILE));
            fileMenuRoot.setMnemonic(KeyEvent.VK_F);

            addMenuItem(fileMenuRoot,
                    ResourcesHandler.getNLSResource(ResourcesHandler.FILE_CONNECT_LOCAL_BROKER),
                    KeyEvent.VK_L, KeyEvent.VK_L, ActionEvent.ALT_MASK,
                    new CommandInformation(
                            new String[] {
                                    ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_NAME)} ,
                                    new String[] {
                                    ResourcesHandler.BROKER_NAME},
                                    new String[] { ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_NAME, DEFAULT_BROKER_NAME) },
                                    this.getClass().getMethod("generateConnectToLocalBrokerList", new Class[] {String[].class}),
                                    false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testConnectToLocalBroker", new Class[] {String.class}), false));

            connectBrokerMenuItem = addMenuItem(fileMenuRoot,
                    ResourcesHandler.getNLSResource(ResourcesHandler.FILE_CONNECT_REMOTE_BROKER),
                    KeyEvent.VK_B, KeyEvent.VK_B, ActionEvent.ALT_MASK,
                    null);

            configureConnectAction();

            addMenuItem(fileMenuRoot,
                    ResourcesHandler.getNLSResource(ResourcesHandler.FILE_DISCONNECT),
                    KeyEvent.VK_D, KeyEvent.VK_D, ActionEvent.ALT_MASK,
                    new CommandInformation(null, null, null, null, false, classTesterMisc,
                    this.classTesterMisc.getClass().getMethod("testDisconnect", (Class[])null), false));

            fileMenuRoot.addSeparator();
            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_BATCHSTART), KeyEvent.VK_B, KeyEvent.VK_F3, 0,
                    new CommandInformation(
                            null, null, null, null, false, classTesterBroker,
                            this.classTesterBroker.getClass().getMethod("testBatchStart", (Class[])null), false));

            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_BATCHSEND), KeyEvent.VK_N, KeyEvent.VK_F3, ActionEvent.CTRL_MASK,
                    new CommandInformation(
                                    null, null, null, null, false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testBatchSend", (Class[])null), false));

            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_BATCHCLEAR), KeyEvent.VK_A, KeyEvent.VK_F3, ActionEvent.SHIFT_MASK,
                    new CommandInformation(
                                    null, null, null, null, false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testBatchClear", (Class[])null), false));
            fileMenuRoot.addSeparator();
            boolean incrementalDeploy = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.INCREMENTAL_DEPLOY, true);
            addCheckBoxMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_ISDELTA), KeyEvent.VK_I, incrementalDeploy,
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("toggleIsIncremental", (Class[])null), true));

            cmpTraceEnabledMenuItem = addCheckBoxMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_CMP_TRACE), KeyEvent.VK_T, classTesterMisc.cmpTraceEnabled,
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("toggleCMPTrace", (Class[])null), false));


            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_RETRYCHARS), KeyEvent.VK_R,
                    new CommandInformation(
                            new String[] {
                                    ResourcesHandler.getNLSResource(ResourcesHandler.SYNCHRONOUS_REQUESTS),
                                    ResourcesHandler.getNLSResource(ResourcesHandler.DEPLOY_WAIT_TIME_SECS),
                                    ResourcesHandler.getNLSResource(ResourcesHandler.EG_CREATE_WAIT_TIME_SECS),
                                    ResourcesHandler.getNLSResource(ResourcesHandler.OTHER_WAIT_TIME_SECS),
                                    ResourcesHandler.getNLSResource(ResourcesHandler.POLICY_WAIT_TIME_SECS)} ,
                                    new String[] {
                                    ResourcesHandler.SYNCHRONOUS_REQUESTS,
                                    ResourcesHandler.DEPLOY_WAIT_TIME_SECS,
                                    ResourcesHandler.EG_CREATE_WAIT_TIME_SECS,
                                    ResourcesHandler.OTHER_WAIT_TIME_SECS,
                                    ResourcesHandler.POLICY_WAIT_TIME_SECS},
                                    new String[] { "true", "30", "30", "10", "30" },
                                    this.getClass().getMethod("generateTimeoutCharacteristicsDialog", new Class[] {String[].class}),
                                    false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testRetryCharacteristics", new Class[] {Boolean.TYPE, Integer.TYPE, Integer.TYPE, Integer.TYPE, Integer.TYPE}), false));

            fileMenuRoot.addSeparator();
            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_INSTALLINFO), -1, -1, -1,
                    new CommandInformation(
                                    null, null, null, null, false, classTesterMisc,
                                    this.classTesterMisc.getClass().getMethod("testReportInstallInfo", (Class[])null), false));
            fileMenuRoot.addSeparator();
            addMenuItem(fileMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_QUIT), KeyEvent.VK_X, KeyEvent.VK_F4, ActionEvent.ALT_MASK, new CommandInformation(null, null, null, null, false, this, this.getClass().getMethod("quit", (Class[])null), false));
            m.add(fileMenuRoot);


            // View
            JMenu viewMenuRoot = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.VIEW));
            viewMenuRoot.setMnemonic(KeyEvent.VK_V);
            propertyDisplayLevel = ResourcesHandler.getUserSettingInt(ResourcesHandler.VIEW, 1);
            displayLevel0 = addRadioButtonMenuItem(viewMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.VIEW_LEVEL_0), (propertyDisplayLevel == 0),
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("setPropertyDisplayLevelBasic", (Class[])null), true));
            displayLevel1 = addRadioButtonMenuItem(viewMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.VIEW_LEVEL_1), (propertyDisplayLevel == 1),
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("setPropertyDisplayLevelAdvanced", (Class[])null), true));
            displayLevel2 = addRadioButtonMenuItem(viewMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.VIEW_LEVEL_2), (propertyDisplayLevel == 2),
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("setPropertyDisplayLevelEverything", (Class[])null), true));
            viewMenuRoot.addSeparator();
            groupResourcesByBAR = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.GROUP_BY_BAR, false);
            addCheckBoxMenuItem(viewMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.VIEW_GROUPBYBAR), KeyEvent.VK_A, groupResourcesByBAR,
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("toggleGroupByBAR", (Class[])null), true));
            displayPolicies = ResourcesHandler.getUserSettingBoolean(ResourcesHandler.DISPLAY_POLICIES, false);
            addCheckBoxMenuItem(viewMenuRoot, ResourcesHandler.getNLSResource(ResourcesHandler.VIEW_DISPLAYPOLICIES), KeyEvent.VK_A, displayPolicies,
                    new CommandInformation(null, null, null, null, false, classTesterMisc, classTesterMisc.getClass().getMethod("toggleDisplayPolicies", (Class[])null), true));
            m.add(viewMenuRoot);

            // Automation ->
            automation = new JMenu(ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION));
            automation.setMnemonic(KeyEvent.VK_A);
            addMenuItem(automation, ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION_RECORD), KeyEvent.VK_R, KeyEvent.VK_R, ActionEvent.CTRL_MASK,
                    new CommandInformation(
                            ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_SCRIPT_OUTPUT),
                            JFileChooser.SAVE_DIALOG, "xml", false, this, this.getClass().getMethod("startRecording", new Class[] {String.class}), false));

            addMenuItem(automation, ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION_PAUSE), KeyEvent.VK_W,
                    new CommandInformation(
                            new String[] { ResourcesHandler.getNLSResource(ResourcesHandler.SCRIPT_WAIT_TIME)} ,
                            new String[] { ResourcesHandler.SCRIPT_WAIT_TIME } ,
                            new String[] { "5" },
                            null,
                                    false, this, this.getClass().getMethod("pauseRecording", new Class[] {Integer.TYPE}), false));

            addMenuItem(automation, ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION_PLAY), KeyEvent.VK_P, KeyEvent.VK_P, ActionEvent.CTRL_MASK,
                    new CommandInformation(
                            ResourcesHandler.getNLSResource(ResourcesHandler.SELECT_SCRIPT_INPUT),
                            JFileChooser.OPEN_DIALOG, "xml", false, this, this.getClass().getMethod("startPlaybackOnNewThread", new Class[] {String.class}), false));

            addMenuItem(automation, ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION_STOP), KeyEvent.VK_S, KeyEvent.VK_S, ActionEvent.CTRL_MASK,
                    new CommandInformation(
                                    null, null, null, null, false, this, this.getClass().getMethod("stopRecording", (Class[])null), false));

            // Do not alter the format of the automation menu without also altering setAutomationMenuEnablement()!
            m.add(automation);
            setAutomationMenuEnablement();

            // Connect menu
            connectMenu = new JPopupMenu();
            addMenuItem(connectMenu,
                    ResourcesHandler.getNLSResource(ResourcesHandler.FILE_CONNECT_LOCAL_BROKER),
                    new CommandInformation(
                            new String[] {
                                    ResourcesHandler.getNLSResource(ResourcesHandler.BROKER_NAME)} ,
                                    new String[] {
                                    ResourcesHandler.BROKER_NAME},
                                    new String[] { ResourcesHandler.getUserSetting(ResourcesHandler.BROKER_NAME, DEFAULT_BROKER_NAME) },
                                    this.getClass().getMethod("generateConnectToLocalBrokerList", new Class[] {String[].class}),
                                    false, classTesterBroker,
                                    this.classTesterBroker.getClass().getMethod("testConnectToLocalBroker", new Class[] {String.class}), false));
            connectBrokerContextSensitiveMenuItem = addMenuItem(connectMenu, ResourcesHandler.getNLSResource(ResourcesHandler.FILE_CONNECT_REMOTE_BROKER), null);
            configureConnectAction();

            // Table menu
            tableMenu = new JPopupMenu();
            addMenuItem(tableMenu, ResourcesHandler.getNLSResource(ResourcesHandler.COPY), new CommandInformation(
                    null, null, null, null, false, this, this.getClass().getMethod("copyTableCellValue", (Class[])null), true));

            // Uncomment the following line to prevent the tree from being expanded automatically
            expandAll(tree,true);
            tree.addTreeSelectionListener(guiEventListener);
            setupJTable(broker);
            setAutomationMenuEnablement();

            SwingUtilities.invokeLater(new Runnable() {
                @Override
                public void run() {
                      validate();
                }
              });

        } catch (NoSuchMethodException e) {
            consoleLogger.logThrowing(e);
        } finally {
            Cursor normalCursor = new Cursor(Cursor.DEFAULT_CURSOR);
            setCursor(normalCursor);
        }
    }

    /**
     * Adds a radio button menu item to the supplied menu
     * @param menu Menu to which the new menu item will be added
     * @param text The label for the menu item
     * @param b The selected state of the radio button (true = on)
     * @param ci CommandInformation that contains the action to perform
     */
    private JRadioButtonMenuItem addRadioButtonMenuItem(JMenu menu, String text, boolean b, CommandInformation ci) {
        JRadioButtonMenuItem rb = new JRadioButtonMenuItem(text, b);
        rb.addActionListener(guiEventListener);
        menu.add(rb);
        if (ci != null) {
            mappingOfMenuItemsToCommands.put(rb, ci);
        }
        return rb;
    }


    /**
     * Updates the status line to reflect the state of
     * the connection to the integration node.
     */
    public void updateStatusLine() {
        String text = "";
        if (broker == null) {
            text = ResourcesHandler.getNLSResource(ResourcesHandler.DISCONNECTED);
        } else {
            String brokerName = "";
            try {
                brokerName = broker.getName();
            } catch (ConfigManagerProxyPropertyNotInitializedException e1) {
                // Ignore this non-critical error.
            }
            text = ResourcesHandler.getNLSResource(ResourcesHandler.CONNECTED_TO_BROKER_ON, new String[] { brokerName } );
        }
        updateStatusLine(text);
    }

    /**
     * Updates the status line with the supplied text
     * @param newText Text to display
     */
    public void updateStatusLine(String newText) {
        if (statusLine != null) {
            statusLine.setText("  "+newText);
        }
    }


    /**
     * Tests listener registration. This method is called
     * when the Administered Object tree is being discovered.
     * AdministeredObject.registerListener() asks the Administration
     * API to keep the Exerciser application informed of
     * any changes to the object's state.
     * @param object AdministeredObject to register
     */
    private void registerListener(AdministeredObject object) {
        if (!registeredObjects.contains(object)) {
            object.registerListener(exerciserAdministeredObjectListener);
            ConfigurationObjectType c = object.getConfigurationObjectType();
            if (c == ConfigurationObjectType.broker) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_BROKER, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.executiongroup) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_EG, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.application) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_APPL, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.library) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_LIB, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.sharedLibrary) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_SHLIB, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.messageflow) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_MF, new String[] { formatFlowPath(object)}));
            } else if (c == ConfigurationObjectType.subflow) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_SF, new String[] { formatFlowPath(object)}));
            } else if (c == ConfigurationObjectType.resourcemanager) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_RM, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.eventmanager) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_EM, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.event) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_EVENT, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.policyManager) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_PM, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.policyObject) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_POLICY, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.log) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_LOG, new String[] { formatAdminObject(object)}));
            } else if (c == ConfigurationObjectType.administrationqueue) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER_AQ, new String[] { formatAdminObject(object)}));
            } else {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.REGISTERED_LISTENER, new String[] { formatAdminObject(object)}));
            }
            registeredObjects.add(object);
        }
    }

    /**
     * Starts recording to the specified file
     * @param fileName Name of the file to start recording to
     */
    public void startRecording(String fileName) {
        try {
            // Test a write the the file before any actions are written
            // (we want to fail *now* if the file is inaccessible).
            FileOutputStream recordFile = new FileOutputStream(new File(fileName));
            recordFile.close();

            // Everything appears to be OK- by setting the member variable 'scriptFileName',
            // subsequent actions will be written to the file when they are issued.
            consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.AUTOMATION_WARNING));
            consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.RECORDING_STARTED));
            scriptFileName = fileName;
            setAutomationMenuEnablement();
        } catch (Exception ex) {
            consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Copies the selected table cell to the system clipboard
     */
    public void copyTableCellValue() {
        if (table != null) {
            Clipboard c = Toolkit.getDefaultToolkit().getSystemClipboard();
            String selection = (String) table.getValueAt(table.getSelectedRow(), table.getSelectedColumn());
            StringSelection st = new StringSelection(selection.trim());
            c.setContents(st, st);
        }
    }



    /**
     * Stops recording
     */
    public void stopRecording() {
        try {
            if (scriptFileName != null) {

                // Write the currently stored actions to the file
                if (scriptOutputDoc != null) {
                    try (FileOutputStream recordFile = new FileOutputStream(new File(scriptFileName))) {

	                    // Serialize the XML document representing our script and
	                    // write it to the previously given file name.
	                    TransformerFactory tf = TransformerFactory.newInstance();
	                    Transformer t = tf.newTransformer();
                      t.setOutputProperty(OutputKeys.INDENT, "yes");
                      t.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");
	                    t.transform(new DOMSource(scriptOutputDoc), new StreamResult(recordFile));

                    }
                } else {
                    // This is fine; no actions have been issued since
                    // starting the recording.
                }

                scriptFileName = null;
                scriptOutputDoc = null;

                setAutomationMenuEnablement();
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.RECORDING_STOPPED));
            }
        } catch (Exception ex) {
            consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Moves the inner component so that it appears in the center of the exerciser main window.
     * @param outer
     */
    public void centerComponentInExerciser(Component inner) {
        Point point = this.getLocationOnScreen();
        Dimension outerD = this.getSize();
        Dimension innerD = inner.getSize();
        Dimension screenD = inner.getToolkit().getScreenSize();
        if(!((point.x + outerD.width / 2) - innerD.width / 2 < 0 ||
             (point.y + outerD.height / 2) - innerD.height / 2 < 0 ||
             (point.x + outerD.width / 2) - innerD.width / 2 >= screenD.width - 10 ||
             (point.y + outerD.height / 2) - innerD.height / 2 >= screenD.height - 10)) {
            inner.setLocation(new Point((point.x + outerD.width / 2) - innerD.width / 2,
                                        (point.y + outerD.height / 2) - innerD.height / 2));
        }
    }

    /**
     * If a script is being played back, this method
     * pauses for the supplied number of seconds.
     * @param secsToPause Number of seconds pause to
     * insert into the script, or the number of
     * seconds to pause for.
     */
    public void pauseRecording(int secsToPause) {
        // If scriptFileName != null, then insert a pause into the script
        // (this will have been done already as part of the action to
        // invoke this method (issueAction()).
        // If scriptFileName == null, then we are playing back a script
        // and so we should pause now.
        if (scriptFileName == null) {
            try {
                Thread.sleep(secsToPause*1000);
            } catch (InterruptedException ex) {
                // Ignore
            }
        }
    }


    /**
     * Calls the startPlayback method on a new thread.
     * This method is called instead of 'startPlayback' when a script
     * is played back from the GUI menu. This is because commands
     * are invoked on the command thread, but the playback mechanism
     * requires sole use of the command thread in order to function;
     * not using another thread would lead to deadlock waiting for
     * the command thread to become free.
     * @param fileName
     */
    public void startPlaybackOnNewThread(final String fileName) {
        consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_INFO));
        new Thread(
            new Runnable() {
                @Override
                public void run() {
                    startPlayback(fileName);
                }
            }
        ).start();
    }


    /**
     * Plays back a previously recorded file recording
     * @param fileName Name of the file to play
     */
    public void startPlayback(String fileName) {
        try {

            // Check that the file exists and contains text
            File f = new File(fileName);
            if (!f.exists()) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_FILE_NOT_FOUND, new String[] {fileName} ));
            } else if (!f.canRead()) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_FILE_NOT_READABLE, new String[] {fileName} ));
            } else if (f.length() == 0) {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_FILE_EMPTY));
            } else {
                consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_STARTED));

                DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
                DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
                Document doc = docBuilder.parse (f);

                Element root = doc.getDocumentElement();
                String version = root.getAttribute(SCRIPTXML_PROGVER);
                if (!(SCRIPTXML_PROGVER_VALUE.equals(version))) {
                    consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.INCOMPATIBLE_SCRIPT_VERSION,
                                          new String[] {fileName, version, SCRIPTXML_PROGVER_VALUE}));
                } else {

                    // Go through each method in the script
                    NodeList methods = root.getElementsByTagName(SCRIPTXML_METHOD);
                    int numberOfMethods = methods.getLength();
                    for (int i=0; i<numberOfMethods; i++) {

                        Element thisMethodNode = (Element) methods.item(i);

                        // Get the method name from the XML
                        String methodName = thisMethodNode.getAttribute(SCRIPTXML_NAME);

                        // Get the test owner
                        Object testOwner;
                        String testOwnerString = thisMethodNode.getAttribute(SCRIPTXML_OWNER);
                        if ("this".equals(testOwnerString)) {
                            testOwner = this;
                        } else {
                            Field testOwnerF = this.getClass().getField(testOwnerString);
                            testOwner = testOwnerF.get(this);
                        }

                        // Enumerate through the supplied parameters
                        NodeList parameters = thisMethodNode.getElementsByTagName(SCRIPTXML_PARAMETER);
                        int numberOfParameters = parameters.getLength();
                        Class<?>[] methodParameterTypes = new Class[numberOfParameters];
                        Object[] methodParameters = new Object[numberOfParameters];

                        try {
                            for (int j=0; j<numberOfParameters; j++) {
                                Element thisParameter = (Element) parameters.item(j);
                                String type = thisParameter.getAttribute(SCRIPTXML_TYPE);
                                String value = thisParameter.getAttribute(SCRIPTXML_VALUE);

                                // Derive the Class instance from the string describing it
                                methodParameterTypes[j] = getClassInstanceFromString(type);

                                // Derive the parameter for the object based on its type
                                methodParameters[j] = getObjectFromStringRepresentation(value, methodParameterTypes[j]);
                            }

                            // At this point in the code, the following variables
                            // exactly describe the action to be invoked:
                            // methodName, testOwner, methodArgTypes, methodArgs

                            // Work out the method from these input parameters
                            Method method = testOwner.getClass().getMethod(methodName, methodParameterTypes);

                            // Add the method to the command queue (cause it to be invoked)
                            commandThread.enqueueCommand(method, testOwner, methodParameters, false, true);
                        } catch (IllegalArgumentException ex) {
                            // Thrown by getObjectFromStringRepresentation
                            consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.COMMAND_IGNORED, new String[] {methodName}));
                        }

                        // Wait for the command to finish. We need to do this, in case the next
                        // command we want to invoke requires an AdministeredObject parameter
                        // which is yet to be created by this current command.
                        while (commandThread.isBusy()) {
                            Thread.sleep(200);
                        }

                    }

                    // Wait for all commands to be processed.
                    while (commandThread.commandQueue.size()>0) {
                        Thread.sleep(1000);
                    }

                    consoleLogger.logFine(ResourcesHandler.getNLSResource(ResourcesHandler.PLAYBACK_FINISHED));

                }
            }
        } catch (Exception ex) {
            consoleLogger.logThrowing(ex);
        }
    }

    /**
     * Returns an instance of the Class object that is described by the
     * supplied string.
     * @param type A class name, primitive type name or the literal
     * String "this".
     * @return Class object, or null if and only if the type could
     * not be determined.
     */
    private Class<?> getClassInstanceFromString(String type) {
        Class<?> retVal = null;

        if ("int".equals(type)) {
            retVal = Integer.TYPE;
        } else if ("boolean".equals(type)) {
            retVal = Boolean.TYPE;
        } else if ("long".equals(type)) {
            retVal = Long.TYPE;
        } else if ("char".equals(type)) {
            retVal = Boolean.TYPE;
        } else if ("short".equals(type)) {
            retVal = Short.TYPE;
        } else if ("float".equals(type)) {
            retVal = Float.TYPE;
        } else if ("double".equals(type)) {
            retVal = Double.TYPE;
        } else if ("byte".equals(type)) {
            retVal = Byte.TYPE;
        } else if ("this".equals(type)) {
            retVal = this.getClass();
        } else {
            try {
                retVal = Class.forName(type);
            } catch (ClassNotFoundException ex) {
                consoleLogger.logThrowing(ex);
            }
        }
        return retVal;
    }


    /**
     * Convenience method to display "action submitted" message
     * when a test method completes successfully.
     */
    protected void reportActionSubmitted() {
        if (broker != null) {
            if ((broker.isBatching()) && (guiEventListener.activeCommandInformation.canBeBatched)) {
                // Is batching enabled?
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_ADDED_TO_BATCH));
            } else if (ResourcesHandler.getUserSettingBoolean(ResourcesHandler.SYNCHRONOUS_REQUESTS, true)) {
                // Are synchronous updates enabled?
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_COMPLETED));
            } else {
                // Default
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_SENT_TO_BROKER));
            }
        }
    }

    /**
     * Returns an AdministeredObject handle given a string of the form
     * "broker1/eg1"
     * @param identifyingString
     * @return AdministeredObject or null if and only if the object could
     * still not be located after a ten second wait.
     * @throws IllegalArgumentException if the object to which the
     * identifying string refers could not be found (or was not
     * accessible) in the hierarchy.
     */
    private AdministeredObject getAdministeredObjectFromString(String identifyingString)
    throws IllegalArgumentException {
        AdministeredObject retVal = null;
        boolean finished = false;
        int retries = 0;

        if (!identifyingString.equals("null")) {
                while (!finished) {
                    DefaultMutableTreeNode dmtn = identifyingStringToNodes.get(identifyingString);
                    if (dmtn != null) {
                        Object o = nodesToCMPObjects.get(dmtn);
                        if (o instanceof AdministeredObject) {
                            retVal = (AdministeredObject) nodesToCMPObjects.get(dmtn);
                            selectCMPObject(retVal);
                        }
                        finished = true;
                    } else {
                        // If the node is not available, it could be
                        // that a previous action in the script has
                        // not returned from the integration node yet.
                        // Wait a while for the reply to come back.
                        retries++;
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            // ignore
                        }
                        if ((retries > 9) && (treeFullyPopulated)) {
                            finished = true;
                            consoleLogger.logSevere(ResourcesHandler.getNLSResource(ResourcesHandler.OBJECT_UNAVAILABLE, new String[] {identifyingString}));
                        throw new IllegalArgumentException(identifyingString+" not available");
                        }
                    }
                }
        }
        return retVal;
    }


    /**
     * Sets the value of the connected BrokerProxy instance.
     * Used if the application wishes to connect to a different
     * integration node
     * @param broker BrokerProxy value
     */
    public void setBrokerProxyConnectedInstance(BrokerProxy broker) {
        this.broker = broker;
    }

    /**
     * Exits the application.
     */
    public void quit() {
        stopRecording();
        disconnect();
        dispose();
        System.exit(0);
    }


    /**
     * Sets up the "Connect" action to correctly
     * reflect the value of the "connect using properties file"
     * parameter.
     * @param newValue true if and only if the user wishes
     * to connect using *.broker properties files.
     */
    public void configureConnectAction() {
        CommandInformation ci_broker = null;
        try {
           ci_broker = new CommandInformation(
                       new String[] {
                              ResourcesHandler.getNLSResource(ResourcesHandler.HOSTNAME),
                              ResourcesHandler.getNLSResource(ResourcesHandler.PORT),
                              ResourcesHandler.getNLSResource(ResourcesHandler.USERNAME),
                              ResourcesHandler.getNLSResource(ResourcesHandler.PASSWORD),
                              ResourcesHandler.getNLSResource(ResourcesHandler.USE_SSL)
                       },
                       new String[] {
                              ResourcesHandler.HOSTNAME,
                              ResourcesHandler.PORT,
                              ResourcesHandler.USERNAME,
                              ResourcesHandler.PASSWORD,
                              ResourcesHandler.USE_SSL
                       },
                       new String[] { "", "4414", "", "", "" },
                       this.getClass().getMethod("generateParmsForRemoteConnect", new Class[] {String[].class}),
                       false,
                       classTesterBroker,
                       this.classTesterBroker.getClass().getMethod("testConnectToRemoteBroker", new Class[] {String.class, String.class, String.class, String.class, String.class}), false
           );
        } catch (NoSuchMethodException ex) {
            consoleLogger.logThrowing(ex);
        }

        // Change the connect menu items to point to the new command
        if (connectBrokerMenuItem != null) {
            mappingOfMenuItemsToCommands.put(connectBrokerMenuItem, ci_broker);
        }
        if (connectBrokerContextSensitiveMenuItem != null) {
            mappingOfMenuItemsToCommands.put(connectBrokerContextSensitiveMenuItem, ci_broker);
        }
    }

    /**
     * Sets up the console to render either in HTML or
     * in plain text."Connect" action to correctly
     * reflect the value of the "connect using properties file"
     * parameter.
     * @param isHTML true if and only if the user wishes
     * to use HTML rendering
     * @param isConfigurationChange true if the method should reinitialise
     * the window as a result of this call. Only set to true
     * if this represents a configuration change; at start-up,
     * this should be set to false.
     */
    public void configureConsoleRenderingAction(boolean isHTML, boolean isConfigurationChange) {

        String initText;
        if (isConfigurationChange) {
            initText = ResourcesHandler.getNLSResource(ResourcesHandler.CONSOLE_CHANGED);
        } else {
            initText = ResourcesHandler.getNLSResource(ResourcesHandler.WELCOME);
        }
        if (isHTML) {
            consoleLogger = new ConsoleLoggerHTML(guiEventListener, initText);
        } else {
            consoleLogger = new ConsoleLoggerPlain(guiEventListener, initText);
        }
        if (isConfigurationChange) {
            initWindow();
        }
    }

    /**
     * Sends to the log information for an AdminQueueEntry
     * @param aqe AdminQueueEntry object that contains the results
     * of a previously submitted request
     */
    public synchronized void reportAdminQueueEntry(AdminQueueEntry aqe) {

        if (aqe == null) {
            consoleLogger.logFine("AdminQueueEntry == null");
        } else {
              consoleLogger.logFine("getWorkIdentifier() = "+aqe.getWorkIdentifier());
              consoleLogger.logFine("getObjectName() = "+aqe.getObjectName());
              consoleLogger.logFine("getObjectType() = "+formatConfigurationObjectType(aqe.getObjectType()));
              consoleLogger.logFine("getUser() = "+aqe.getUser());
              consoleLogger.logFine("getCreationTimestamp() = "+aqe.getCreationTimestamp());
              consoleLogger.logFine("getLastStatusChangeTimestamp() = "+aqe.getLastStatusChangeTimestamp());
              consoleLogger.logFine("getOperationType() = "+aqe.getOperationType());
              consoleLogger.logFine("getParentName() = "+aqe.getParentName());
              consoleLogger.logFine("getParentType() = "+formatConfigurationObjectType(aqe.getParentType()));
              consoleLogger.logFine("getStatus() = "+aqe.getStatus());
              consoleLogger.logFine("getDescription() = "+aqe.getDescription());
              String responseString = "";
              try
              {
                responseString = aqe.getResponse();
              }
              catch (Throwable theException)
              {
                consoleLogger.logFine("Caught Exception in getResponse(): " + theException.toString());
              }
              consoleLogger.logFine("getResponse() = "+responseString);
              Properties responseAsProperties = null;
              try
              {
                responseAsProperties = aqe.getResponseAsProperties();
                if(responseAsProperties != null)
                {
                  consoleLogger.logFine("getResponseAsProperties() = ...");
                  Enumeration<?> propertyNames = responseAsProperties.propertyNames();
                  while (propertyNames.hasMoreElements())
                  {
                    String propName = (String)propertyNames.nextElement();
                    String propValue = responseAsProperties.getProperty(propName);
                    consoleLogger.logFine(" - "+propName+" = "+propValue);
                  }
                }
              }
              catch (Throwable theException)
              {
                consoleLogger.logFine("Caught Exception in getResponseAsProperties(): " + theException.toString());
              }
        }
    }


    /**
     * Sends to the log information on a deployment.
     * @param ds DeployResult object that contains the results
     * of a previously submitted deployment
     */
    public synchronized void reportDeployResult(DeployResult ds) {

        if (ds == null) {
            consoleLogger.logFine("DeployResult == null");
        } else {
            // Display overall completion code
            consoleLogger.logFine("DeployResult.getCompletionCode() = " + ds.getCompletionCode());

            // Display deployment start and stop time
            Date startTime = ds.getDeployStartTime();
            Date stopTime = ds.getDeployStopTime();
            consoleLogger.logFine("DeployResult.getDeployStartTime() = " + formatDate(ds.getDeployStartTime()));
            if ((startTime != null) && (stopTime != null)) {
                long duration = stopTime.getTime() - startTime.getTime();
                consoleLogger.logFine("DeployResult.getDeployStopTime() = " + formatDate(ds.getDeployStopTime()) + " ("+formatMillis(duration)+")");
            } else {
                consoleLogger.logFine("DeployResult.getDeployStopTime() = " + formatDate(ds.getDeployStopTime()));
            }


            // Display log messages
            Enumeration<LogEntry> logEntries = ds.getDeployResponses();
            while (logEntries.hasMoreElements()) {
                LogEntry le = logEntries.nextElement();
                consoleLogger.logFine("DeployResult.getDeployResponses() : " + getFirstLine(le.getDetail()));
            }

            // Give a final eyecatcher that shows the overall status at a glance.
            if (ds.getCompletionCode() == CompletionCodeType.success) {
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_COMPLETED));
            } else if (ds.getCompletionCode() == CompletionCodeType.submitted) {
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_TIMEDOUT));
            } else if (ds.getCompletionCode() == CompletionCodeType.failure) {
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_FAILED));
            } else if (ds.getCompletionCode() == CompletionCodeType.pending) {
                consoleLogger.logInfo(ResourcesHandler.getNLSResource(ResourcesHandler.ACTION_ADDED_TO_BATCH));
            }
        }
    }

    /**
     * Splits a delimited string first into parameters and then
     * splits each parameter into a Property.
     * @param inputString the string to split up
     * @param parameterDelimiter the first delimiter to split by
     * @param parameterDelimiter the second delimiter to split by
     */
    public Properties delimitedStringToProperties(String inputString,
                                                   String parameterDelimiter,
                                                   String nameValueDelimiter)
    {
      Properties retVal = new Properties();
      if((inputString != null) && (inputString.length() > 0))
      {
        String[] parameters = inputString.split(parameterDelimiter);
        for(int parmCount=0; parmCount < parameters.length; parmCount++)
        {
          String[] nameValue = parameters[parmCount].split(nameValueDelimiter, 2);
          retVal.setProperty(nameValue[0], nameValue[1]);
        }
      }
      return retVal;
    }

    /**
     * Returns the supplied string, up to (and excluding) the first newline character.
     * If the supplied string is null, the output string is also null.
     * @param string String to parse.
     * @return String the first line of the input string.
     */
    protected static String getFirstLine(String string) {
        String retVal = null;
        if (string != null) {
            int firstNewline = string.indexOf('\n');
            if (firstNewline != -1) {
                retVal = string.substring(0, firstNewline);
            } else {
                retVal = string;
            }
        }
        return retVal;
    }

    /**
     * Returns a locale-specific string that represents the
     * supplied GregorianCalendar
     * @param gc
     * @return String
     */
    protected static String formatGC(GregorianCalendar gc) {
        String retVal;
        if (gc != null) {
            retVal = formatDate(gc.getTime());
        } else {
            retVal = "unknown (null)";
        }
        return retVal;
    }

    /**
     * Returns a String that represents the supplied String array
     * @param array
     * @return String
     */
    protected static String formatStringArray(String[] array) {
        return formatObjectArray(array);
    }

    /**
     * Returns a String that represents the supplied object array
     * @param array
     * @return String
     */
    protected static String formatObjectArray(Object[] array) {
        String retVal;
        if (array != null) {
            StringBuffer sb = new StringBuffer("[");
            for (int i=0; i<array.length; i++) {
                if (i != 0) sb.append(", ");
                sb.append(array[i]);
            }
            sb.append("]");
            retVal = sb.toString();
        } else {
            retVal = "null";
        }
        return retVal;
    }

    /**
     * Returns a String that represents the supplied object array
     * @param array
     * @return String
     */
    protected static String formatObjectArray(List<?> array) {
        String retVal;
        if (array != null) {
            StringBuffer sb = new StringBuffer("[");
            int i = 0;
            for (Object o : array) {
                if (i != 0) sb.append(", ");
                sb.append(o);
                i++;
            }
            sb.append("]");
            retVal = sb.toString();
        } else {
            retVal = "null";
        }
        return retVal;
    }

    /**
     * Returns a String that represents the supplied object map
     * @param array
     * @return String
     */
    protected static String formatObjectMap(Map<? extends Object, ? extends Object> map) {
        String retVal;
        if (map != null) {
            StringBuffer sb = new StringBuffer("[");
            boolean first = true;
            for (Map.Entry<? extends Object, ? extends Object> entry : map.entrySet()) {
                if (!first) {
                	sb.append(",\n");
                } else {
                	sb.append("\n");
                }
                first = false;
                sb.append("" + entry.getKey() + "=" + entry.getValue());
            }
            if (!first) sb.append("\n");
            sb.append("]");
            retVal = sb.toString();
        } else {
            retVal = "null";
        }
        return retVal;
    }

     /**
     * Returns a String that represents the supplied object array
     * @param array
     * @return String
     */
    protected static String formatObjectEnumeration(Enumeration array) {
        String retVal;
        if (array != null) {
            StringBuffer sb = new StringBuffer("[");
            int i = 0;
            while (array.hasMoreElements()) {
                if (i++ != 0) sb.append(", ");
                sb.append(array.nextElement());
            }
            sb.append("]");
            retVal = sb.toString();
        } else {
            retVal = "null";
        }
        return retVal;
    }

    /**
     * Returns a String that represents the supplied input stream.
     * Assumes that the InputStream contains UTF-8 encoded data.
     * @param is
     * @return String
     */
    protected static String formatInputStream(InputStream is) {
        String retVal;
        if (is != null) {
            try {
                is.reset();
                int dataLength = is.available();
                byte[] data = new byte[dataLength];
                is.read(data);
                try {
                    retVal = new String(data, "UTF8");
                } catch (UnsupportedEncodingException e) {
                    retVal = "IntegrationAPIExerciser.formatInputStream(): UTF8 not supported";
                }
            } catch (IOException e1) {
                retVal = "IntegrationAPIExerciser.formatInputStream(): "+e1+" when reading InputStream";
            }
        } else {
            retVal = "null";
        }
        return retVal;
    }



    /**
     * Returns a locale-specific string that represents the
     * supplied GregorianCalendar
     * @param date
     * @return String
     */
    protected static String formatDate(Date date) {

        String retVal;
        DateFormat df = DateFormat.getDateTimeInstance();
        if (date != null) {
            retVal = df.format(date);
        } else {
            retVal = "unknown (null)";
        }
        return retVal;
    }

    /**
     * Formats the supplied duration in a nice way
     * and returns it as a string.
     * @param millis length of time in milliseconds
     * @return String
     */
    protected static String formatMillis(long millis) {
        String retVal;
        if (millis < 2000) /* 2 seconds */ {
            retVal = millis + "ms";
        } else if (millis < 120000) /* 2 minutes */ {
            long secs = millis/1000;
            retVal = secs + "s";
        } else {
            long mins = millis/60000;
            retVal = mins + "mins";
        }
        return retVal;
    }

    /**
     * Returns a string that represents the
     * supplied AdministeredObject
     * @param obj
     * @return String
     */
    protected static String formatAdminObject(AdministeredObject obj) {
        String retVal;
        if (obj != null) {
            retVal = "<"+obj+">";
        } else {
            retVal = "unknown (null)";
        }
        return retVal;
    }

    /**
     * Returns a path to a message flow or subflow
     * @param obj
     * @return String
     */
    protected static String formatFlowPath(AdministeredObject obj) {
        String retVal;
        if (obj != null)
        {
          retVal = obj.toString();
          try
          {
            AdministeredObject currentParent = obj.getParent();
            while( (currentParent != null) &&
                   (currentParent.getConfigurationObjectType() != ConfigurationObjectType.executiongroup))
            {
              retVal = currentParent+"/"+retVal;
              currentParent = currentParent.getParent();
            }
          }
          catch (ConfigManagerProxyLoggedException ex)
          {
            //cannot determine the parent chain so we will just display the object name with unknown in
            retVal = "unknown/"+obj.toString();
          }

          retVal = "<"+retVal+">";
        }
        else
        {
          retVal = "unknown (null)";
        }
        return retVal;
    }

    /**
     * Returns a string that represents the
     * supplied ConfigurationObjectType
     * @param obj
     * @return String
     */
    protected static String formatConfigurationObjectType(ConfigurationObjectType obj) {
        String retVal;
        if (obj != null) {
            retVal = "<"+obj.getDisplayName()+">";
        } else {
            retVal = "(null)";
        }
        return retVal;
    }

    /**
     * Returns a copy of the input string with newline
     * characters removed.
     * @param input
     * @return
     */
    protected String formatRemoveNewlines(String input) {
        if (input != null) {
            int nextNewline = input.indexOf("\n");
            while (nextNewline > -1) {
                input = input.substring(0, nextNewline) + input.substring(nextNewline + 1);
                nextNewline = input.indexOf("\n");
            }
        }
        return input;
    }

    /**
     * Refreshes the user interface with table and tree information
     */
    protected void refreshTableAndTree() {

        // Refresh the table
        setupJTable(selectedCMPObject);

        // Refresh the tree
        AdministeredObject rootOfHierarchy = broker;
        initialiseTreeForAdministeredObject(rootOfHierarchy);
    }

    /**
     * Disconnects from any active connection to a integration node.
     */
    protected void disconnect() {
        classTesterMisc.testDisconnect();
    }


}


/**
 * Small data structure that describes the action to
 * take when a menu item is selected.
 */
class CommandInformation {

    String[] labels = null;
    String[] userSettingsKeyNames = null;
    String[] defaults = null;
    Method methodToGenerateInputBoxes = null;
    int parametersRequired = 0;
    boolean canBeBatched = false;
    boolean showFileDialog = false;
    boolean suppressEntryExitLogMessages = false;
    String fileDialogTitle = null;
    int fileDialogType = 0;
    String fileTypeFilter = null;
    Method methodToInvoke = null;
    Object classTesterObject = null;

    /**
     * Describes a set of text-based modal dialog parameters and the
     * IBM Integration API (CMP) Exerciser method to invoke after
     * the required parameters have been acquired.
     * @param labels string array, each element containing a label for a required parameter
     * @param userSettingsKeyNames string array, each element containing the key name to use if the user entered value is to you want to store the user entered value in the settings file
     * @param defaults string array, each element containing the default value for a required parameter
     * @param methodToGenerateInputBoxes The IntegrationAPIExerciser method that will be used to generate the input fields for
     * each parameter. If null, then each parameter will be a simple JTextField.
     * The return value from any supplied method must be an array of JComponent objects, the n'th element of which
     * describes the input field for the n'th parameter.
     * can have. If the String[] element is empty or null, then that parameter will be represented by a free-form text box.
     * @param canBeBatched boolean describing whether the command can be added to a batch (BrokerProxy.beginUpdates())
     * @param classTesterObject the object whose method will be invoked
     * @param methodToInvoke the Method to be invoked when the command is submitted
     * @param suppressEntryExitLogMessages True if and only if the log messages displayed
     * when the action is invoked should be hidden.
     */
    public CommandInformation(String[] labels, String[] userSettingsKeyNames, String[] defaults, Method methodToGenerateInputBoxes,
            boolean canBeBatched, Object classTesterObject, Method methodToInvoke, boolean suppressEntryExitLogMessages) {
        this.labels = labels;
        this.userSettingsKeyNames = userSettingsKeyNames;
        this.defaults = defaults;
        this.methodToGenerateInputBoxes = methodToGenerateInputBoxes;
        this.canBeBatched = canBeBatched;
        this.showFileDialog = false;
        this.methodToInvoke = methodToInvoke;
        this.classTesterObject = classTesterObject;
        if (labels != null) {
            parametersRequired = labels.length;
        }
        this.suppressEntryExitLogMessages = suppressEntryExitLogMessages;
    }

    /**
     * Describes a file chooser and a method to invoke
     * @param fileDialogTitle Title of the file choose
     * @param fileDialogType Type of the chooser -
     * JFileChooser.OPEN_DIALOG or JFileChooser.SAVE_DIALOG
     * @param fileTypeFilter The file filter to apply (e.g. "jpg")
     * @param canBeBatched True if and only if the command can be added to
     * a batch (BrokerProxy.beginUpdates())
     * @param classTesterObject the object whose method will be invoked
     * @param methodToInvoke The method to invoke when the command is submitted
     * @param suppressEntryExitLogMessages True if and only if the log messages displayed
     * when the action is invoked should be hidden.
     */
    public CommandInformation(String fileDialogTitle, int fileDialogType, String fileTypeFilter, boolean canBeBatched,
            Object classTesterObject, Method methodToInvoke, boolean suppressEntryExitLogMessages) {
        this.fileDialogTitle = fileDialogTitle;
        this.fileDialogType = fileDialogType;
        this.fileTypeFilter = fileTypeFilter;
        this.canBeBatched = canBeBatched;
        this.showFileDialog = true;
        this.classTesterObject = classTesterObject;
        this.methodToInvoke = methodToInvoke;
        this.suppressEntryExitLogMessages = suppressEntryExitLogMessages;
        parametersRequired = 0;
    }

}
