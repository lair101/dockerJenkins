��          �      L  �   �  f   R  G   �  �     �  �  �   o  A     @   S  �   �  �   �  �   v	  �   f
  �   R  �   �     �     �  C   9  �   }  k   ,  �   �  {   I  K   �  �     S  �  �   9  I   �  P   H  H  �  G  �  =  *  9  h  �   �  �   j     6  �   R  G     �   X  w   '                                        	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. Stellen Sie vor der Installation von IBM Integration Bus Healthcare Pack sicher, dass Sie berechtigt sind, in das Installationsverzeichnis von IBM Integration Bus zu schreiben. Schließen Sie IBM Integration Toolkit und stoppen Sie alle aktiven Integrationsknoten, bevor Sie die Operation fortsetzen. Deinstallation von IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% IBM Integration Bus Healthcare Pack ist bereits installiert.
Deinstallieren Sie alle früheren Installationen von IBM Integration Bus Healthcare Pack und führen Sie dann dieses Installationsprogramm erneut aus. IBM Integration Bus Healthcare Pack ist installiert.
Führen Sie für jeden Integrationsknoten, auf dem Healthcare-Knoten oder -Muster bereitgestellt werden sollen, folgende Schritte aus:
1. Starten Sie den Integrationsknoten.
2. Führen Sie einen der folgenden Schritte aus:
	- Wenn Ihre Lizenz Sie zur Verwendung aller Funktionen mit Ausnahme des MedicalDeviceInput-Knotens berechtigt, führen Sie den folgenden Befehl aus:
		mqsimode <KNOTENNAME> -x healthcare
	- Wenn Ihre Lizenz Sie ausschließlich zur Verwendung des MedicalDeviceInput-Knotens berechtigt, führen Sie den folgenden Befehl aus:
		mqsimode <KNOTENNAME> -x medicalDevices
	- Wenn Ihre Lizenz Sie zur Verwendung aller Funktionen, einschließlich des MedicalDeviceInput-Knotens, berechtigt, führen Sie den folgenden Befehl aus:
		mqsimode <KNOTENNAME> -x "healthcare,medicalDevices" Mindestens eine Datei konnte nicht entfernt werden. Entfernen Sie die in den vorherigen Fehlern aufgelisteten Dateien, um die Deinstallation von IBM Integration Bus Healthcare Pack durchzuführen. Lizenz akzeptiert.
IBM Integration Bus Healthcare Pack wird konfiguriert. Stoppen Sie alle aktiven Integrationsknoten, bevor Sie die Operation fortsetzen. Die IBM Integration Bus Healthcare Pack-Lizenz wurde nicht akzeptiert.
Um IBM Integration Bus Healthcare Pack verwenden zu können, müssen Sie die zuerst die Lizenzvereinbarung akzeptieren.
zum Anzeigen und Akzeptieren der Lizenzvereinbarung stoppen Sie dieses Installationsprogramm und führen Sie es anschließend erneut aus. Die Einschränkung für die Nutzung von IBM Integration Bus Healthcare Pack wurde nicht akzeptiert.
Um IBM Integration Bus Healthcare Pack verwenden zu können, müssen Sie zuerst die Nutzungseinschränkung akzeptieren.
Zum Anzeigen und Akzeptieren der Nutzungseinschränkung führen Sie 'HealthcarePack_install.sh' erneut aus. IBM Integration Bus Healthcare Pack kann nicht installiert werden, weil keine Dateien im IBM Integration Bus-Installationsverzeichnis erstellt werden konnten.
Vergewissern Sie sich, dass Sie die erforderlichen Schreibberechtigungen für dieses Verzeichnis haben, bevor Sie das Installationsprogramm erneut ausführen. IBM Integration Bus Healthcare Pack kann nicht installiert werden, weil keine Dateien im IBM Integration Bus-Registry-Verzeichnis erstellt werden konnten.
Vergewissern Sie sich, dass Sie die erforderlichen Schreibberechtigungen für dieses Verzeichnis haben, bevor Sie das Installationsprogramm erneut ausführen. IBM Integration Bus Healthcare Pack kann nicht installiert werden.
Sie müssen das Installationsverzeichnis von IBM Integration Bus V10 als ersten Parameter für dieses Installationsprogramm angeben. IBM Integration Bus Healthcare Pack kann nicht deinstalliert werden.
Sie müssen das Installationsverzeichnis von IBM Integration Bus V10 als ersten Parameter für dieses Deinstallationsprogramm angeben. Deinstallation erfolgreich. Es wurden nicht unterstützte Parameter angegeben.
Die unterstützten Optionen für das Installationsprogramm können Sie der Dokumentation zu IBM Integration Bus Healthcare Pack entnehmen. Willkommen bei IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Sie sind nicht berechtigt, die Lizenz zu akzeptieren. Bitten Sie Ihren Systemadministrator, Ihnen Schreibberechtigungen für das Installationsverzeichnis von IBM Integration Bus Healthcare Pack zu erteilen. Sie müssen die IBM Integration Bus-Lizenz akzeptieren, um IBM Integration Bus Healthcare Pack installieren zu können. 