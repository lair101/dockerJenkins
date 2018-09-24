' VB Script to save Application and Sys Event logs
' Application Event - AppEvent.evt
' System Event      - SysEvent.evt
' http://technet.microsoft.com/en-us/library/ee176700.aspx

Option Explicit
On Error Resume Next

Dim thisComputer: thisComputer = "."
Dim isDebug : isDebug = false

' Process input. Exit if invalid input
if not hasValidInput() then
	WScript.echo "Usage: csript b.vbs <outputDir>"
	WScript.echo "       - where outputDir is quoted and fullpath"
	WScript.Quit
end if

' Run it
Dim outputDir : outputDir = WScript.Arguments(0)
if isDebug then WScript.echo "Output Dir = "& outputDir

Call ExportAppEventLogs() 
' Call ExportSysEventLogs() 
Call RoutineToWriteAppEvents()
' Call RoutineToWriteSystemEvents()

WScript.echo "done."
'End of script

' ===========================
' Check valid input
' Checks for - argument count = 1, 
'   - not an empty string
'   - and full path (contains \ )
' ===========================
Function hasValidInput() 
   Dim args: set args = WScript.Arguments

   if (args.Count = 1) and (len(args(0)) > 0) and (InStr(args(0), "\") <> 0) then
       hasValidInput = true
       Exit Function
   end if
   hasValidInput = false
End Function

' ===========================
' ExportAppEventLogs() 
' ===========================
sub ExportAppEventLogs() 
   Dim objWMIService, outFile, queryLogFiles, objLogfile, backupLog
   
   WScript.echo "Collecting Application Event Logs ... "
   outFile = outputDir & "\AppEvent.evt" 
   if isDebug then WScript.echo "Output : " & outFile

   ' getting service w/ security + backup settings
   Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate,(Backup)}!\\" & thisComputer & "\root\cimv2")

   ' query for all records in security
   Set queryLogFiles = objWMIService.ExecQuery("SELECT * FROM Win32_NTEventLogFile WHERE LogFileName='Application'")

   ' write it.
   for each objLogfile in queryLogFiles
	backupLog = objLogFile.BackupEventLog(outFile)
   next   
	
end sub

' ===========================
' ExportSysEventLogs() 
' ===========================
sub ExportSysEventLogs() 
   Dim objWMIService, outFile, queryLogFiles, objLogfile, backupLog
   
   WScript.echo "Collecting System Event Logs ... "
   outFile = outputDir & "\SysEvent.evt" 
   if isDebug then WScript.echo "Output : " & outFile

   ' getting service w/ security + backup settings
   Set objWMIService = GetObject("winmgmts:{impersonationLevel=impersonate,(Backup)}!\\" & thisComputer & "\root\cimv2")

   ' query for all records in security
   Set queryLogFiles = objWMIService.ExecQuery("SELECT * FROM Win32_NTEventLogFile WHERE LogFileName='System'")

   ' write it.
   for each objLogfile in queryLogFiles
	backupLog = objLogFile.BackupEventLog(outFile)
   next   
end sub

sub RoutineToWriteAppEvents()
	Dim objWMIService,colLoggedEvents,objEvent, objFSO, objFile, strEvent
	WScript.echo "Write App Events to text file ... "
	
	Set objWMIService = GetObject("winmgmts:"  & "{impersonationLevel=impersonate}!\\"  & thisComputer & "\root\cimv2")
	Set colLoggedEvents = objWMIService.ExecQuery ("Select * from Win32_NTLogEvent " & "Where Logfile = 'Application'")

	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFile = objFSO.CreateTextFile(outputDir & "\AppEvent.txt" )

	For Each objEvent in colLoggedEvents

	    objFile.WriteLine ("Category: " & objEvent.Category & VBTab _
    		& "Computer Name: " & objEvent.ComputerName & VBTab _
    		& "Event Code: " & objEvent.EventCode & VBTab _
    		& "Record Number: " & objEvent.RecordNumber & VBTab _
    		& "Source Name: " & objEvent.SourceName & VBTab _
    		& "Time Written: " & objEvent.TimeWritten & VBTab _
    		& "Event Type: " & objEvent.Type & VBTab _
    		& "User: " & objEvent.User & VBTab _
    		& "Message: " & objEvent.Message )
	Next
end sub

sub RoutineToWriteSystemEvents()
	Dim objWMIService,colLoggedEvents,objEvent, objFSO, objFile, strEvent
	WScript.echo "Write System Events to text file ... "
	
	Set objWMIService = GetObject("winmgmts:"  & "{impersonationLevel=impersonate}!\\"  & thisComputer & "\root\cimv2")
	Set colLoggedEvents = objWMIService.ExecQuery ("Select * from Win32_NTLogEvent " & "Where Logfile = 'System'")
		
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set objFile = objFSO.CreateTextFile(outputDir & "\SysEvent.txt" )

	For Each objEvent in colLoggedEvents

	    objFile.WriteLine ("Category: " & objEvent.Category & VBTab _
    		& "Computer Name: " & objEvent.ComputerName & VBTab _
    		& "Event Code: " & objEvent.EventCode & VBTab _
    		& "Message: " & objEvent.Message & VBTab _
    		& "Record Number: " & objEvent.RecordNumber & VBTab _
    		& "Source Name: " & objEvent.SourceName & VBTab _
    		& "Time Written: " & objEvent.TimeWritten & VBTab _
    		& "Event Type: " & objEvent.Type & VBTab _
    		& "User: " & objEvent.User )
	Next
end sub

