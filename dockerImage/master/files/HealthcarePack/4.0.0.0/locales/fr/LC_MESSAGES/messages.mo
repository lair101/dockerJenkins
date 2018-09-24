��          �      L  �   �  f   R  G   �  �     �  �  �   o  A     @   S  �   �  �   �  �   v	  �   f
  �   R  �   �     �     �  C   9  �   }  k   ,  �   �  n   A  K   �  �   �    �  �   �  F   �  L   �    2     ?  /  `  ,  �  �   �  �   �     M  �   h  G   ,  �   t  n   Q                                        	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. Avant d'installer IBM Integration Bus Healthcare Pack, vérifiez que vous avez des droits d'accès en écriture sur le répertoire d'installation d'IBM Integration Bus. Fermez IBM Integration Toolkit et arrêtez les noeuds d'intégration en cours d'exécution avant de continuer. Désinstallation d'IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% IBM Integration Bus Healthcare Pack est déjà installé.
Désinstallez les installations précédentes d'IBM Integration Bus Healthcare Pack et exécutez à nouveau le programme d'installation. IBM Integration Bus Healthcare Pack est installé.
Pour chaque noeud d'intégration sur lequel vous souhaitez déployer des noeuds ou des modèles Healthcare, procédez comme suit :
1. Démarrez le noeud d'intégration.
2. Effectuez l'une des étapes suivantes :
	- Si votre licence vous autorise à utiliser toutes les fonctionnalités, sauf le noeud MedicalDeviceInput, exécutez la commande suivante :
		mqsimode <NODENAME> -x healthcare
	- Si votre licence vous autorise à utiliser seulement le noeud MedicalDeviceInput, exécutez la commande suivante :
		mqsimode <NODENAME> -x medicalDevices
	- Si votre licence vous autorise à utiliser toutes les fonctionnalités y compris le noeud MedicalDeviceInput, exécutez la commande suivante :
		mqsimode <NODENAME> -x "healthcare,medicalDevices" Un ou plusieurs fichiers n'ont pas pu être supprimés. Supprimez les fichiers répertoriés dans les erreurs ci-dessus pour terminer la désinstallation d'IBM Integration Bus Healthcare Pack. Licence acceptée.
Installation d'IBM Integration Bus Healthcare Pack. Arrêtez les noeuds d'intégration en cours d'exécution avant de continuer. La licence IBM Integration Bus Healthcare Pack n'a pas été acceptée.
Avant d'utiliser IBM Integration Bus Healthcare Pack, vous devez accepter le contrat de licence.
Pour afficher et accepter ce dernier, arrêtez et exécutez à nouveau ce programme d'installation. Les restrictions d'utilisation d'IBM Integration Bus Healthcare Pack n'ont pas été acceptées.
Procédez à cette opération avant d'utiliser IBM Integration Bus Healthcare Pack.
Pour afficher et accepter les restrictions d'utilisation, exécutez à nouveau 'HealthcarePack_install.sh'. Impossible d'installer IBM Integration Bus Healthcare Pack car les fichiers n'ont pas pu être créés dans le répertoire d'installation d'IBM Integration Bus.
Vérifiez que vous disposez des droits nécessaires pour écrire dans ce répertoire avant d'exécuter à nouveau le programme d'installation. Impossible d'installer IBM Integration Bus Healthcare Pack car les fichiers n'ont pas pu être créés dans le répertoire de registre d'IBM Integration Bus.
Vérifiez que vous disposez des droits nécessaires pour écrire dans ce répertoire avant d'exécuter à nouveau le programme d'installation. Impossible d'installer IBM Integration Bus Healthcare Pack.
Vous devez spécifier un répertoire d'installation IBM Integration Bus V10 comme premier paramètre dans ce programme d'installation. Impossible de désinstaller IBM Integration Bus Healthcare Pack.
Vous devez spécifier un répertoire d'installation IBM Integration Bus V10 comme premier paramètre dans ce programme de désinstallation. Désinstallation réussie. Des paramètres non pris en charge ont été fournis.
Pour connaître les options prises en charge par le programme d'installation, consultez la documentation IBM Integration Bus Healthcare Pack. Bienvenue dans IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Vous n'êtes pas autorisé à accepter la licence. Pour obtenir des droits d'accès en écriture sur le répertoire d'installation d'IBM Integration Bus Healthcare Pack, prenez contact avec votre administrateur système. Vous devez accepter la licence IBM Integration Bus pour pouvoir installer IBM Integration Bus Healthcare Pack. 