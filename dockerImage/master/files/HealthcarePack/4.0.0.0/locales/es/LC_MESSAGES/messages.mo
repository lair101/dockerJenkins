��          �      L  �   �  f   R  G   �  �     �  �  �   o  A     @   S  �   �  �   �  �   v	  �   f
  �   R  �   �     �     �  C   9  �   }  k   ,  �   �  o   6  H   �  �   �  �  �  �   y  D   /  T   t    �    �    �    �  �     �   �     z  �   �  E   =  �   �  f   D                                        	                                                        
   Before installing IBM Integration Bus Healthcare Pack, make sure you have permission to write to your IBM Integration Bus installation directory. Close the IBM Integration Toolkit and stop any integration nodes that are running before you continue. IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Uninstallation IBM Integration Bus Healthcare Pack is already installed.
Uninstall any previous installations of IBM Integration Bus Healthcare Pack and run this installer again. IBM Integration Bus Healthcare Pack is installed.
For each integration node to which you want to deploy Healthcare nodes or patterns, complete the following steps:
1. Start the integration node.
2. Complete one of the following steps:
	- If your license entitles you to use all the functionality except the MedicalDeviceInput node, run the following command
		mqsimode <NODENAME> -x healthcare
	- If your license entitles you to use only the MedicalDeviceInput node, run the following command:
		mqsimode <NODENAME> -x medicalDevices
	- If your license entitles you to use all the functionality including the MedicalDeviceInput node, run the following command:
		mqsimode <NODENAME> -x "healthcare,medicalDevices" It was not possible to remove one or more files. Remove the files listed in the error(s) above to complete uninstallation of IBM Integration Bus Healthcare Pack. License accepted.
Setting up IBM Integration Bus Healthcare Pack. Stop any integration nodes that are running before you continue. The IBM Integration Bus Healthcare Pack license was not accepted.
Before using IBM Integration Bus Healthcare Pack you must first accept the license agreement.
To view and accept the license agreement, stop and run this installer again. The IBM Integration Bus Healthcare Pack use restriction was not accepted.
Before using IBM Integration Bus Healthcare Pack you must first accept the use restriction.
To view and accept the use restriction, run 'HealthcarePack_install.sh' again. Unable to install IBM Integration Bus Healthcare Pack because files could not be created in the IBM Integration Bus installation directory.
Check you have the right permissions to write to this directory before running the installer again. Unable to install IBM Integration Bus Healthcare Pack because files could not be created in the IBM Integration Bus registry directory.
Check you have the right permissions to write to this directory before running the installer again. Unable to install IBM Integration Bus Healthcare Pack.
You must specify an IBM Integration Bus V10 installation directory as the first parameter to this installer. Unable to uninstall IBM Integration Bus Healthcare Pack.
You must specify an IBM Integration Bus V10 installation directory as the first parameter to this uninstaller. Uninstallation successful. Unsupported parameters provided.
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. Antes de instalar IBM Integration Bus Healthcare Pack, asegúrese de que tiene permiso para escribir en el directorio de instalación de IBM Integration Bus. Cierre IBM Integration Toolkit y detenga los nodos de integración que se están ejecutando antes de continuar. IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Desinstalación IBM Integration Bus Healthcare Pack ya está instalado.
Desinstale cualquier instalación anterior de IBM Integration Bus Healthcare Pack y vuelva a ejecutar este instalador. Se ha instalado IBM Integration Bus Healthcare Pack.
Para cada nodo de integracion en el que desee desplegar nodos o patrones de Healthcare, complete los pasos siguientes:
1. Inicie el nodo de integración.
2. Complete uno de los pasos siguientes:
	- Si su licencia le permite utilizar toda la funcionalidad excepto el nodo MedicalDeviceInput, ejecute el mandato siguiente
		mqsimode <NODENAME> -x healthcare
	- Si su licencia sólo le permite utilizar el nodo MedicalDeviceInput, ejecute el mandato siguiente:
		mqsimode <NODENAME> -x medicalDevices
	- Si su licencia le permite utilizar toda la funcionalidad incluido el nodo MedicalDeviceInput, ejecute el siguiente mandato:
		mqsimode <NODENAME> -x "healthcare,medicalDevices" No se han podido eliminar uno o más archivos. Elimine los archivos listados en el/los error(es) anteriores para completar la desinstalación de IBM Integration Bus Healthcare Pack. Licencia aceptada.
Configurando IBM Integration Bus Healthcare Pack. Detenga todos los nodos de integración que se están ejecutando antes de continuar. No se ha aceptado la licencia de IBM Integration Bus Healthcare Pack.
Antes de utilizar IBM Integration Bus Healthcare Pack, debe aceptar primero el acuerdo de licencia.
Para ver y aceptar el acuerdo de licencia, detenga y vuelva a instalar este instalador. La restricción de uso de IBM Integration Bus Healthcare Pack no se ha aceptado.
Antes de utilizar IBM Integration Bus Healthcare Pack, debe aceptar primero la restricción de uso.
Para ver y aceptar la restricción de uso, vuelva a ejecutar 'HealthcarePack_install.sh'. No se ha podido instalar IBM Integration Bus Healthcare Pack porque los archivos no se han podido crear en el directorio de instalación de IBM Integration Bus.
Compruebe que tiene los permisos correctos para escribir en este directorio antes de volver a ejecutar el instalador. No se ha podido instalar IBM Integration Bus Healthcare Pack porque no se han podido crear los archivos en el directorio de registro de IBM Integration Bus.
Compruebe que tiene los permisos correctos para escribir en este directorio antes de volver a ejecutar el instalador. No se ha podido instalar IBM Integration Bus Healthcare Pack.
Debe especificar un directorio de instalación de IBM Integration Bus V10 como el primer parámetro para este instalador. No se ha podido desinstalar IBM Integration Bus Healthcare Pack.
Debe especificar un directorio de instalación de IBM Integration Bus V10 como el primer parámetro para este desinstalador. Desinstalación correcta. Se han proporcionado parámetros no admitidos.
Consulte la documentación de IBM Integration Bus Healthcare Pack para obtener las opciones admitidas para el instalador. Bienvenido a IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% No tiene permiso para aceptar la licencia. Consulte con el administrador del sistema para obtener permisos de escritura en el directorio de instalación de IBM Integration Bus Healthcare Pack. Debe aceptar la licencia de IBM Integration Bus antes de instalar IBM Integration Bus Healthcare Pack. 