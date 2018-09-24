import com.ibm.websphere.sca.Service;
import com.ibm.websphere.sca.ServiceBusinessException;
import com.ibm.websphere.sca.ServiceManager;
import commonj.sdo.DataObject;
import com.ibm.j2ca.base.internal.WPSServiceHelper;
import com.ibm.websphere.sca.scdl.InterfaceType;
import com.ibm.websphere.sca.scdl.OperationType;
import java.util.List;

public class Input_Async_Processing {
	/**
	 * Default constructor.
	 */
	public Input_Async_Processing() {
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
	 * named "Async_PortTypePartner".  This will return an instance of 
	 * {@link com.ibm.websphere.sca.Service}.  This is the dynamic
	 * interface which is used to invoke operations on the reference service
	 * either synchronously or asynchronously.  You will need to pass the operation
	 * name in order to invoke an operation on the service.
	 *
	 * @generated (com.ibm.wbit.java)
	 *
	 * @return Service
	 */
	public Service locateService_Async_PortTypePartner() {
		return (Service) ServiceManager.INSTANCE
				.locateService("Async_PortTypePartner");
	}

	/**
	 * Method generated to support implemention of all the methods above 
	 * named "Async_PortType".
	 * 
	 * The presence of commonj.sdo.DataObject as the return type and/or as a parameter 
	 * type conveys that its a complex type. Please refer to the WSDL Definition for more information 
	 * on the type of input, output and fault(s).
	 */
	private void invokeService(DataObject dataObj){
		try{
			List interfaceTypeList = locateService_Async_PortTypePartner().getReference().getInterfaceTypes();
			InterfaceType interfaceType = (InterfaceType)interfaceTypeList.get(0);
			OperationType operationType = ((OperationType)interfaceType.getOperationTypes().get(0));
			String method = operationType.getName();
			locateService_Async_PortTypePartner().invokeAsync(method, dataObj);	
		}catch(Exception e){
			throw new ServiceBusinessException(e.getMessage());
		}		
	}
	
	private DataObject getInputType(DataObject wrapperBG, String oldTopLevelBOName) throws Exception {
		DataObject inputType=null;
		DataObject wrapperBO = WPSServiceHelper.getRootBusinessObjectInstance(wrapperBG);
		DataObject bo = wrapperBO.getDataObject(oldTopLevelBOName);
		String bgName = bo.getType().getName()+"BG";
		DataObject bg = WPSServiceHelper.createDataObject(bo.getType().getURI()+"/"+bgName, bgName);
		bg.setDataObject(bo.getType().getName(), bo);
		String verb = wrapperBG.getString("verb");
		if(verb!=null) bg.setString("verb", verb);
		inputType = bg;
		return inputType;
	}
	
}