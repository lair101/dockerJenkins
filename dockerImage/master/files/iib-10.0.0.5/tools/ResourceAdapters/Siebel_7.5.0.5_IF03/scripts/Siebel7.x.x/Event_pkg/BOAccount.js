//In this event handler we detect Deletes
var verb=null;
var forCreate=false;

function BusComp_PreDeleteRecord ()
{
    var EventBO=new BusObject;
    var EventBC;
    

    if ((TheApplication().LoginName != "CWCONN") && (forCreate==false)) 
    {
	var RowId = this.GetFieldValue("Id")

	EventBO=TheApplication().GetBusObject("IBM2");
	EventBC=EventBO.GetBusComp("IBM2");

	
	EventBC.SetViewMode(AllView);
	EventBC.ActivateField("Event Id");
	EventBC.ActivateField("Object Name");
	EventBC.ActivateField("Object Key");
	EventBC.ActivateField("Event Type");	    
	EventBC.ActivateField("Priority");
	EventBC.ActivateField("Status");
	EventBC.ActivateField("Description");
	EventBC.NewRecord(NewAfter);

	EventBC.SetFieldValue("Object Name", "BOAccountBCAccountBG");
	    
	//Set the Object Name as BOAccountBCAccount if you haven't generated BG as part of ESD artifacts
	//EventBC.SetFieldValue("Object Name", "BOAccountBCAccount");

	EventBC.SetFieldValue("Object Key", "Id="+RowId);
	EventBC.SetFieldValue("Event Type", "Delete");   
	EventBC.SetFieldValue("Priority", "1");
	EventBC.SetFieldValue("Status", "0");
	EventBC.SetFieldValue("Description", "Account Event");

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
// In this event handler, we detect Creates and Updates
// BusComp_DeleteRecord is used to catch Deletes
//
// The logic here is using the created and updated time stamps 
// to distinguish between Creates and Updates
// A Create is not triggered untilthe Account has a Primary Address

    var EventBC;
    var EventBO = new BusObject;
    

    if( TheApplication().LoginName != "CWCONN" )
    {
	 var RowId = this.GetFieldValue("Id");
	 var Created_ts = this.GetFieldValue("Created");
	 var Updated_ts = this.GetFieldValue("Updated");
	 var PriAddress = this.GetFieldValue("Primary Address Id");


	 if ((PriAddress.length > 0) && (PriAddress != "No Match Row Id")) 
	 {
	     var theVerb="";


	     if (verb == "Create")
	     {
		  theVerb = "Create";
		  verb=null;
	     } else
	     {
		  theVerb = "Update";
	     }
	  EventBO = TheApplication().GetBusObject("IBM2");
	  EventBC = EventBO.GetBusComp("IBM2");



	  EventBC.SetViewMode(AllView);

	  EventBC.ActivateField("Event Id");
	  EventBC.ActivateField("Object Name");
	  EventBC.ActivateField("Object Key");
	  EventBC.ActivateField("Event Type");  
	  EventBC.ActivateField("Priority");
	  EventBC.ActivateField("Status");
	  EventBC.ActivateField("Description");

	  EventBC.NewRecord(NewAfter);


	  EventBC.SetFieldValue("Object Name", "BOAccountBCAccountBG");
	    
	  //Set the Object Name as BOAccountBCAccount if you haven't generated BG as part of ESD artifacts
	  //EventBC.SetFieldValue("Object Name", "BOAccountBCAccount");


	  EventBC.SetFieldValue("Object Key", "Id="+RowId);
	  EventBC.SetFieldValue("Event Type", theVerb);   
	  EventBC.SetFieldValue("Priority", "1");
	  EventBC.SetFieldValue("Status", "0");
	  EventBC.SetFieldValue("Description", "Account Event");

	  EventBC.WriteRecord();
	 }
    }
}
