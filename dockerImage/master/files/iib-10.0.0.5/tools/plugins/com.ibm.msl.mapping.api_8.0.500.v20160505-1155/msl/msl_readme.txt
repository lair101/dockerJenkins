********************************************************************
* Licensed Materials - Property of IBM
*
* (C) Copyright IBM Corp. 2008,2014
*
* US Government Users Restricted Rights - Use, duplication, or
* disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
********************************************************************

The file "msl.xsd" provides the XML schema that describes the IBM
Graphical Data Mapper Map Specification Language, also known as MSL.
This version of the file defines MSL in for the Graphical Data
Mapping component Version 1040.

You can use the MSL schema to help you programmatically generate map files. 

You must perform the following steps to programmatically generate a map file:

(1) Create a template map in the Graphical Data Mapping editor. 

Note: Deploy and test your template map in the run time to confirm that the
message transformation is correct. 

(2) Inspect the MSL XML content in the template map. 

Note: Use the MSL schema to identify the mapping constructs and the definition
of the points of variation for the template map.

(3) Develop the scripts and programs to generate the MSL XML for the new maps
that you plan to generate programmatically.

Note: When you use a development approach based on JAXB, the bindings file 
"msl_jaxb_bindings.xml" provides the minimal required bindings.

(4) Validate the syntax of each generated map file (.map) against the provided
MSL schema "msl.xsd".

(5) Import each generated map file into your development environment. Then,
check that all the referenced resources, such as xsd files, are imported into
the relevant project types. Ensure the relevant builder is invoked to
semantically validate each generated map file. Also, check using the Graphical
Data Mapping Editor that the transforms in your generated map are correct and
free of error and warnings.  

(6) Package and deploy into the run time your programmatically generated maps.
Then, test your application to confirm that the message transformation is
correct.


