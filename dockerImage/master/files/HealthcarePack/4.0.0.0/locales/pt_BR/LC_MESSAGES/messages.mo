��          �      L  �   �  f   R  G   �  �     �  �  �   o  A     @   S  �   �  �   �  �   v	  �   f
  �   R  �   �     �     �  C   9  �   }  k   ,  �   �  n   9  K   �  �   �  �  �  �     D   '  L   l    �    �    �    �  �   �  �   �     �  �   �  E   :  �   �  t   F                                        	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. Antes de instalar o IBM Integration Bus Healthcare Pack, certifique-se de que tenha permissão para gravar no diretório de instalação do IBM Integration Bus. Feche o IBM Integration Toolkit e pare os nós de integração que estiverem em execução antes de continuar. Desinstalação do IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% O IBM Integration Bus Healthcare Pack já está instalado.
Desinstale as instalações anteriores do IBM Integration Bus Healthcare Pack e execute esse instalador novamente. O IBM Integration Bus Healthcare Pack está instalado.
Para cada nó de integração no qual você deseja implementar nós ou padrões do Healthcare, conclua as etapas a seguir:
1. Inicie o nó de integração.
2. Conclua uma das etapas a seguir:
	- Se sua licença o autoriza a usar todas as funcionalidades, com exceção do nó MedicalDeviceInput, execute o comando a seguir
		mqsimode <NODENAME> -x healthcare
	- Se sua licença o autoriza a usar somente o nó MedicalDeviceInput, execute o comando a seguir:
		mqsimode <NODENAME> -x medicalDevices
	- Se sua licença o autoriza a usar todas as funcionalidades, incluindo o nó MedicalDeviceInput, execute o comando a seguir:
		mqsimode <NODENAME> -x "healthcare,medicalDevices" Não foi possível remover um ou mais arquivos. Remova os arquivos listados no(s) erro(s) acima para concluir a desinstalação do IBM Integration Bus Healthcare Pack. Licença aceita.
Configurando o IBM Integration Bus Healthcare Pack. Pare os nós de integração que estiverem em execução antes de continuar. A licença do IBM Integration Bus Healthcare Pack não foi aceita.
Antes de usar o IBM Integration Bus Healthcare Pack, deve-se primeiro aceitar o contrato de licença.
Para visualizar e aceitar o contrato de licença, pare e execute esse instalador novamente. A restrição de uso do IBM Integration Bus Healthcare Pack não foi aceita.
Antes de usar o IBM Integration Bus Healthcare Pack, deve-se primeiro aceitar a restrição de uso.
Para visualizar e aceitar a restrição de uso, execute 'HealthcarePack_install.sh' novamente. Não é possível instalar o IBM Integration Bus Healthcare Pack porque os arquivos não puderam ser criados no diretório de instalação do IBM Integration Bus.
Verifique se você tem as permissões corretas para gravar nesse diretório antes de executar o instalador novamente. Não é possível instalar o IBM Integration Bus Healthcare Pack porque os arquivos não puderam ser criados no diretório de registro do IBM Integration Bus.
Verifique se você tem as permissões corretas para gravar nesse diretório antes de executar o instalador novamente. Não é possível instalar o IBM Integration Bus Healthcare Pack.
Deve-se especificar um diretório de instalação do IBM Integration Bus V10 como o primeiro parâmetro para esse instalador. Não é possível desinstalar o IBM Integration Bus Healthcare Pack.
Deve-se especificar um diretório de instalação do IBM Integration Bus V10 como o primeiro parâmetro para esse desinstalador. Desinstalação bem-sucedida. Parâmetros não suportados fornecidos.
Consulte a documentação do IBM Integration Bus Healthcare Pack para obter as opções suportadas do instalador. Bem-vindo ao IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Você não tem permissão para aceitar a licença. Consulte o administrador do sistema para obter permissões de gravação para o diretório de instalação do IBM Integration Bus Healthcare Pack. Deve-se aceitar a licença do IBM Integration Bus para ser possível instalar o IBM Integration Bus Healthcare Pack. 