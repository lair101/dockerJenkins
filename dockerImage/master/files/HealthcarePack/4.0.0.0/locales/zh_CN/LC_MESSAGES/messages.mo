Þ          ´      L     À  f   R  G   ¹  £     É  ¥  ¡   o  A     @   S  ì     ô     ï   v	  ë   f
  £   R  §   ö          ¹  C   9  ®   }  k   ,       [     ?   w     ·    M     Ù  I   \  9   ¦  ß   à  é   À  Ù   ª  Ü        a     ñ       }     E        U  l   á                                        	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. å¨å®è£ IBM Integration Bus Healthcare Pack ä¹åï¼è¯·ç¡®ä¿æ¨å·æåå¥å° IBM Integration Bus å®è£ç®å½çè®¸å¯æã å¨ç»§ç»­ä¹åå³é­ IBM Integration Toolkit å¹¶åæ­¢ä»»ä½æ­£å¨è¿è¡çéæèç¹ã IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% å¸è½½ IBM Integration Bus Healthcare Pack å·²å®è£ã
å¸è½½ IBM Integration Bus Healthcare Pack çä»»ä½ååå®è£ï¼å¹¶åæ¬¡è¿è¡è¯¥å®è£ç¨åºã IBM Integration Bus Healthcare Pack å·²å®è£ã
å¯¹äºè¦å° Healthcare èç¹ææ¨¡å¼é¨ç½²å°çæ¯ä¸ªéæèç¹ï¼è¯·å®æä»¥ä¸æ­¥éª¤ï¼
1. å¯å¨éæèç¹ã
2. è¯·å®æä»¥ä¸æ­¥éª¤ä¹ä¸ï¼
	- å¦æè®¸å¯è¯æææ¨ä½¿ç¨é¤ MedicalDeviceInput èç¹ä¹å¤çææåè½ï¼è¯·è¿è¡ä»¥ä¸å½ä»¤ï¼
		mqsimode <NODENAME> -x healthcare
	- å¦æè®¸å¯è¯æææ¨åªè½ä½¿ç¨ MedicalDeviceInput èç¹ï¼è¯·è¿è¡ä»¥ä¸å½ä»¤ï¼
		mqsimode <NODENAME> -x medicalDevices
	- å¦æè®¸å¯è¯æææ¨ä½¿ç¨åæ¬ MedicalDeviceInput èç¹å¨åçææåè½ï¼è¯·è¿è¡ä»¥ä¸å½ä»¤ï¼
		mqsimode <NODENAME> -x "healthcare,medicalDevices" æ æ³é¤å»ä¸ä¸ªæå¤ä¸ªæä»¶ãé¤å»ä¸è¿°éè¯¯ä¸­ååºçæä»¶ä»¥å®æ IBM Integration Bus Healthcare Pack çå¸è½½ã è®¸å¯è¯å·²æ¥åã
æ­£å¨è®¾ç½® IBM Integration Bus Healthcare Packã å¨ç»§ç»­ä¹ååæ­¢ä»»ä½æ­£å¨è¿è¡çéæèç¹ã æªæ¥å IBM Integration Bus Healthcare Pack è®¸å¯è¯ã
å¨ä½¿ç¨ IBM Integration Bus Healthcare Pack ä¹åï¼å¿é¡»é¦åæ¥åè®¸å¯åè®®ã
è¦æ¥çå¹¶æ¥åè®¸å¯åè®®ï¼è¯·åæ­¢å¹¶åæ¬¡è¿è¡è¯¥å®è£ç¨åºã æªæ¥å IBM Integration Bus Healthcare Pack ä½¿ç¨éå¶ã
å¨ä½¿ç¨ IBM Integration Bus Healthcare Pack ä¹åï¼å¿é¡»é¦åæ¥åä½¿ç¨éå¶ã
è¦æ¥çå¹¶æ¥åä½¿ç¨éå¶ï¼è¯·åæ¬¡è¿è¡âHealthcarePack_install.shâã æ æ³å®è£ IBM Integration Bus Healthcare Packï¼å ä¸ºæ æ³å¨ IBM Integration Bus å®è£ç®å½ä¸­åå»ºæä»¶ã
è¯·é¦åæ£æ¥æ¨æ¯å¦å·æåå¥å°è¯¥ç®å½çåè®¸å¯æï¼ç¶ååæ¬¡è¿è¡å®è£ç¨åºã æ æ³å®è£ IBM Integration Bus Healthcare Packï¼å ä¸ºæ æ³å¨ IBM Integration Bus æ³¨åè¡¨ç®å½ä¸­åå»ºæä»¶ã
è¯·é¦åæ£æ¥æ¨æ¯å¦å·æåå¥å°è¯¥ç®å½çåè®¸å¯æï¼ç¶ååæ¬¡è¿è¡å®è£ç¨åºã æ æ³å®è£ IBM Integration Bus Healthcare Packã
å¿é¡»æå® IBM Integration Bus V10 å®è£ç®å½ä½ä¸ºè¯¥å®è£ç¨åºçç¬¬ä¸ä¸ªåæ°ã æ æ³å¸è½½ IBM Integration Bus Healthcare Packã
å¿é¡»æå® IBM Integration Bus V10 å®è£ç®å½ä½ä¸ºè¯¥å¸è½½ç¨åºçç¬¬ä¸ä¸ªåæ°ã å¸è½½æåã æä¾çåæ°ä¸åæ¯æã
è¯·åé IBM Integration Bus Healthcare Pack ææ¡£ä»¥è·åå®è£ç¨åºçåæ¯æéé¡¹ã æ¬¢è¿ä½¿ç¨ IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% æ¨æ²¡ææ¥åè®¸å¯è¯çæéãè¯·åç³»ç»ç®¡çåå¨è¯¢ä»¥è·å IBM Integration Bus Healthcare Pack å®è£ç®å½çåè®¸å¯æã å¿é¡»é¦åæ¥å IBM Integration Bus è®¸å¯è¯ï¼ç¶åæè½å®è£ IBM Integration Bus Healthcare Packã 