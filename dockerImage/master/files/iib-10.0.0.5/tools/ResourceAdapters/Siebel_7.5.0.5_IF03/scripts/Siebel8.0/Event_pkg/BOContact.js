//verb and forCreate variables should be copied to the general section declarations.
var verb=null;
var forCreate=false;

function BusComp_PreDeleteRecord ()
{
    var EventB0;
    var EventBC;
    

    if ((TheApplication().LoginName != "CWCONN") && (forCreate==false)) 
    {
	var RowId = this.GetFieldValue("Id")

	EventBO=TheApplication().GetBusObject("IBM Event");
	EventBC=EventBO.GetBusComp("IBM Event");

	
	EventBC.SetViewMode(AllView);
	EventBC.ActivateField("Event Id");
	EventBC.ActivateField("Object Name");
	EventBC.ActivateField("Object Key");
	EventBC.ActivateField("Event Type");	    
	EventBC.ActivateField("Priority");
	EventBC.ActivateField("Status");
	EventBC.ActivateField("Description");
	EventBC.NewRecord(NewAfter);


	EventBC.SetFieldValue("Object Name", "BOContactBCContactBG");
	    
	//Set the Object Name as BOContactBCContact if you haven't generated BG as part of ESD artifacts
	//EventBC.SetFieldValue("Object Name", "BOContactBCContact");


	EventBC.SetFieldValue("Object Key", "Id=" +RowId);
	EventBC.SetFieldValue("Event Type", "Delete");	    
	EventBC.SetFieldValue("Priority", "1");
	EventBC.SetFieldValue("Status", "0");
	EventBC.SetFieldValue("Description", "Contact Event");
	EventBC.SetFieldValue("Connector Id", "Siebel");

	EventBC.WriteRecord();
	
    }
    return (ContinueOperation);
}


function BusComp_PreNewRecord ()
{
	verb="Create";
	forCreate=true;
	return (ContinueOperation);
}

function BusComp_WriteRecord ()
{
// In this Event handler, we detect Creates And Updates
// BusComp_DeleteRecord is used To catch Deletes
//
// The logic here is using the created And updated time stamps 

    var EventBC;
    var EventBO;
    

    if( TheApplication().LoginName != "CWCONN" )
    {
	var RowId = this.GetFieldValue("Id");
	var Created_ts = this.GetFieldValue("Created");
	var Updated_ts = this.GetFieldValue("Updated");
	var AccountID = this.GetFieldValue("Account Id");
	

	    var theVerb="";
	    
	    if (verb == "Create")
	    {
		theVerb = "Create";
		verb=null;
	    } else
	    {
		theVerb = "Update";
	    }

	    EventBO = TheApplication().GetBusObject("IBM Event");
	    EventBC = EventBO.GetBusComp("IBM Event");

	   
		
	    EventBC.SetViewMode(AllView);

	    EventBC.ActivateField("Event Id");
	    EventBC.ActivateField("Object Name");
	    EventBC.ActivateField("Object Key");
	    EventBC.ActivateField("Event Type");		
	    EventBC.ActivateField("Priority");
	    EventBC.ActivateField("Status");
	    EventBC.ActivateField("Description");

	    EventBC.SetFieldValue("Object Name", "BOContactBCContactBG");
	    
	    //Set the Object Name as BOContactBCContact if you haven't generated BG as part of ESD artifacts
	    //EventBC.SetFieldValue("Object Name", "BOContactBCContact");

	    EventBC.SetFieldValue("Object Name", "BOContactBCContact");
	    EventBC.SetFieldValue("Object Key", "Id=" +RowId);
	    EventBC.SetFieldValue("Event Type", theVerb);
	    EventBC.SetFieldValue("Priority", "1");
	    EventBC.SetFieldValue("Status", "0");
	    EventBC.SetFieldValue("Description", "Contact Event");
	    EventBC.SetFieldValue("Connector Id", "Siebel");

	    EventBC.WriteRecord();

    }

}