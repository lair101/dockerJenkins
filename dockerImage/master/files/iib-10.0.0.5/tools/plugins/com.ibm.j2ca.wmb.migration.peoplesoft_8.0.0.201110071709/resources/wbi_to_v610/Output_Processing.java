import java.util.List;

import com.ibm.j2ca.base.exceptions.InvalidObjectDefinitionException;
import com.ibm.j2ca.base.internal.WPSServiceHelper;
import com.ibm.wbiserverspi.mediation.MediateException;
import com.ibm.websphere.sca.Service;
import com.ibm.websphere.sca.ServiceManager;
import com.ibm.websphere.sca.Ticket;
import commonj.sdo.DataObject;


public class Output_Processing {
	/**
	 * Default constructor.
	 */
	public Output_Processing() {
		super();
	}

	/**
	 * Return a reference to the component service instance for this implementation
	 * class.  This method should be used when passing this service to a partner reference
	 * or if you want to invoke this component service asynchronously.
	 *
	 * @generated (com.ibm.wbit.java)
	 */
	private Object getMyService() {
		return (Object) ServiceManager.INSTANCE.locateService("self");
	}

	/**
	 * This method is used to locate the service for the reference
	 * named "Output".  This will return an instance of
	 * {@link com.ibm.websphere.sca.Service}.  This is the dynamic
	 * interface which is used to invoke operations on the reference service
	 * either synchronously or asynchronously.  You will need to pass the operation
	 * name in order to invoke an operation on the service.
	 *
	 * @generated (com.ibm.wbit.java)
	 *
	 * @return Service
	 */
	public Service locateService_Output() {
		return (Service) ServiceManager.INSTANCE.locateService("Output");
	}

	private String getVerb(DataObject dataObject) {
		String verb = null;
		try {
			verb = WPSServiceHelper.getTopLevelVerb(dataObject);
		} catch (InvalidObjectDefinitionException e) {
			// TODO Auto-generated catch block
			verb = null;
		}
		return verb;
	}

	private String getOperation(String verb, DataObject dataObject)
	throws Exception {

		String operation = null;

		String outRootTypeName = null;

		outRootTypeName = WPSServiceHelper.getRootBusinessObjectInstance(dataObject).getType().getName();

		if (verb == null) {
			throw new MediateException(
			"The operation to invoke on the target interface could not be determined because the verb defined for the input Business Graph is null.");
		}
		if (outRootTypeName == null) {
			throw new MediateException(
			"The operation to invoke on the target interface could not be determined because the ouput Business Object type is null.");
		}

		verb = verb.toLowerCase();

		if ((verb.equalsIgnoreCase("create"))
				|| (verb.equalsIgnoreCase("update"))
				|| (verb.equalsIgnoreCase("delete"))
				|| (verb.equalsIgnoreCase("retrieve"))) {
			operation = verb + outRootTypeName;
		}

		if (verb.equalsIgnoreCase("retrievebycontent")) {
			operation = "retrieveall" + outRootTypeName;
		}

		if (verb.equalsIgnoreCase("deltaupdate")) {
			operation = "applychanges" + outRootTypeName;
		}

		return operation;

	}
	
	private DataObject getOutputType(DataObject output)throws Exception {
		DataObject newOutput = null;
		List bgList = output.getDataObject(0).getList(0);
		if(bgList!=null && bgList.size()>0){
			newOutput = (DataObject)bgList.get(0);
		}
		return newOutput;
	}
}