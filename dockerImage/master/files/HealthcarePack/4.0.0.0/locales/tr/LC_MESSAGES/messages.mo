��          �      L  �   �  f   R  G   �  �     �  �  �   o  A     @   S  �   �  �   �  �   v	  �   f
  �   R  �   �     �     �  C   9  �   }  k   ,  �   �  s     D   �  �   �    �  �   �  C   f  N   �    �  =  	  �   G  �   >  �   3  �   �     �  �   �  R   =  �   �  x                                           	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. IBM Integration Bus Healthcare Pack'i kurmadan önce, IBM Integration Bus kuruluş dizininize yazma izniniz bulunduğunu doğrulayın. Devam etmeden önce IBM Integration Toolkit'i kapatın ve çalışmakta olan tümleştirme düğümlerini durdurun. IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% - Kaldırma IBM Integration Bus Healthcare Pack zaten kurulu.
Önceki IBM Integration Bus Healthcare Pack kuruluşlarını kaldırın ve bu kuruluş programını yeniden çalıştırın. IBM Integration Bus Healthcare Pack kuruldu.
Healthcare düğümlerini ya da örüntülerini konuşlandırmak istediğiniz her tümleştirme düğümü için şu adımları tamamlayın:
1. Tümleştirme düğümünü başlatın.
2. Aşağıdaki adımlardan birini tamamlayın:
	- Lisansınız size MedicalDeviceInput düğümü dışında tüm işlevleri kullanma hakkı veriyorsa şu komutu çalıştırın:
		mqsimode <DÜĞÜMADI> -x healthcare
	- Lisansınız yalnızca MedicalDeviceInput düğümünü kullanma hakkı veriyorsa şu komutu çalıştırın:
		mqsimode <DÜĞÜMADI> -x medicalDevices
	- Lisansınız MedicalDeviceInput düğümü de içinde olmak üzere tüm işlevleri kullanma hakkı veriyorsa şu komutu çalıştırın:
		mqsimode <DÜĞÜMADI> -x "healthcare,medicalDevices" Bir ya da daha fazla dosya kaldırılamadı. IBM Integration Bus Healthcare Pack'in kaldırılmasını tamamlamak için yukarıdaki hatada (ya da hatalarda) listelenen dosyaları kaldırın. Lisans kabul edildi.
IBM Integration Bus Healthcare Pack kuruluyor. Devam etmeden önce, çalışmakta olan tümleştirme düğümlerini durdurun. IBM Integration Bus Healthcare Pack lisansı kabul edilmedi.
IBM Integration Bus Healthcare Pack'i kullanabilmek için önce lisans sözleşmesini kabul etmelisiniz.
Lisans sözleşmesini görüntülemek ve kabul etmek için kuruluş programını yeniden çalıştırın. IBM Integration Bus Healthcare Pack kullanım kısıtlaması kabul edilmedi.
IBM Integration Bus Healthcare Pack'i kullanabilmek için önce kullanım kısıtlamasını kabul etmelisiniz.
Kullanım kısıtlamasını görüntülemek ve kabul etmek için 'HealthcarePack_install.sh' dosyasını yeniden çalıştırın. IBM Integration Bus kuruluş dizininde dosyalar yaratılamadığından IBM Integration Bus Healthcare Pack kurulamıyor.
Kuruluş programını yeniden çalıştırmadan önce bu dizine yazmak için gereken izinlere sahip olduğunuzu doğrulayın. IBM Integration Bus kayıt dizininde dosyalar yaratılamadığından IBM Integration Bus Healthcare Pack kurulamıyor.
Kuruluş programını yeniden çalıştırmadan önce bu dizine yazmak için gereken izinlere sahip olduğunuzu doğrulayın. IBM Integration Bus Healthcare Pack kurulamıyor.
Bu kuruluş programının birinci değiştirgesi olarak bir IBM Integration Bus V10 kuruluş dizini belirtmelisiniz. IBM Integration Bus Healthcare Pack kaldırılamıyor.
Bu kaldırma programının birinci değiştirgesi olarak bir IBM Integration Bus V10 kuruluş dizini belirtmelisiniz. Kaldırma başarılı oldu. Desteklenmeyen değiştirgeler belirtildi.
Kuruluş programının desteklediği seçenekler için IBM Integration Bus Healthcare Pack belgelerine bakın. IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% Olanağına Hoş Geldiniz Lisansı kabul etme izniniz yok. IBM Integration Bus Healthcare Pack kuruluş dizinine yazma izni almak için sistem yöneticinize başvurun. IBM Integration Bus Healthcare Pack olanağını kurabilmek için IBM Integration Bus lisansını kabul etmeniz gerekir. 