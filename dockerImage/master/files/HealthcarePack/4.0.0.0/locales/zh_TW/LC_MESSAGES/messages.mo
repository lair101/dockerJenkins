Þ          ´      L     À  f   R  G   ¹  £     É  ¥  ¡   o  A     @   S  ì     ô     ï   v	  ë   f
  £   R  §   ö          ¹  C   9  ®   }  k   ,  v     ]     E   m  £   ³  ¯  W       F     9   Ú  Ü     æ   ñ  Ç   Ø  Ç         h     û       z   °  E   +     q  `   ñ                                        	                                                        
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
See IBM Integration Bus Healthcare Pack documentation for supported options for the installer. Welcome to IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% You do not have permission to accept the license. See your system administrator to obtain write permissions to the IBM Integration Bus Healthcare Pack installation directory. You must accept the IBM Integration Bus license before you can install IBM Integration Bus Healthcare Pack. å®è£ IBM Integration Bus Healthcare Pack ä¹åï¼è«ç¢ºå®æ¨å·æ IBM Integration Bus å®è£ç®éçå¯«å¥æ¬ã ç¹¼çºä¹åï¼è«éé IBM Integration Toolkitï¼ä¸¦åæ­¢ä»»ä½å·è¡ä¸­çæ´åç¯é»ã IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% è§£é¤å®è£ å·²å®è£ IBM Integration Bus Healthcare Packã
è«è§£é¤å®è£ååå·²å®è£çä»»ä½ IBM Integration Bus Healthcare Packï¼ç¶å¾åæ¬¡å·è¡æ­¤å®è£ç¨å¼ã å·²å®è£ IBM Integration Bus Healthcare Packã
éå°æ¨è¦å°å¶é¨ç½² Healthcare ç¯é»æåæ¨£çæ¯åæ´åç¯é»ï¼å®æä¸åæ­¥é©ï¼
1. ååæ´åç¯é»ã
2. å®æä¸åå¶ä¸­ä¸åæ­¥é©ï¼
	- å¦ææ¨çè»é«ä½¿ç¨æ¬ææ¬æ¨ä½¿ç¨ææåè½ï¼é¤ MedicalDeviceInput ç¯é»ä¹å¤ï¼ï¼è«å·è¡ä¸åæä»¤
		mqsimode <NODENAME> -x healthcare
	- å¦ææ¨çè»é«ä½¿ç¨æ¬ææ¬æ¨åªè½ä½¿ç¨ MedicalDeviceInput ç¯é»ï¼è«å·è¡ä¸åæä»¤ï¼
		mqsimode <NODENAME> -x medicalDevices
	- å¦ææ¨çè»é«ä½¿ç¨æ¬ææ¬æ¨ä½¿ç¨ææåè½ï¼åæ¬ MedicalDeviceInput ç¯é»ï¼ï¼è«å·è¡ä¸åæä»¤ï¼
		mqsimode <NODENAME> -x "healthcare,medicalDevices" ç¡æ³ç§»é¤ä¸æå¤åæªæ¡ãè«ç§»é¤ä¸è¿°é¯èª¤ä¸­ååºçæªæ¡ï¼ä»¥å®æ IBM Integration Bus Healthcare Pack çè§£é¤å®è£ã å·²æ¥åææ¬ã
æ­£å¨è¨­å® IBM Integration Bus Healthcare Packã ç¹¼çºä¹åï¼è«åæ­¢ä»»ä½å·è¡ä¸­çæ´åç¯é»ã æªæ¥å IBM Integration Bus Healthcare Pack ææ¬ã
ä½¿ç¨ IBM Integration Bus Healthcare Pack ä¹åï¼æ¨å¿é åæ¥åææ¬åç´ã
è¥è¦æª¢è¦ä¸¦æ¥åææ¬åç´ï¼è«åæ­¢æ­¤å®è£ç¨å¼ä¸¦åæ¬¡å·è¡ã æªæ¥å IBM Integration Bus Healthcare Pack ä½¿ç¨éå¶ã
ä½¿ç¨ IBM Integration Bus Healthcare Pack ä¹åï¼æ¨å¿é åæ¥åä½¿ç¨éå¶ã
è¥è¦æª¢è¦ä¸¦æ¥åä½¿ç¨éå¶ï¼è«åæ¬¡å·è¡ 'HealthcarePack_install.sh'ã ç¡æ³å®è£ IBM Integration Bus Healthcare Packï¼å çºç¡æ³å¨ IBM Integration Bus å®è£ç®éä¸­å»ºç«æªæ¡ã
åæ¬¡å·è¡å®è£ç¨å¼ä¹åï¼è«æª¢æ¥æ¨å·ææ­¤ç®éçæ­£ç¢ºå¯«å¥æ¬ã ç¡æ³å®è£ IBM Integration Bus Healthcare Packï¼å çºç¡æ³å¨ IBM Integration Bus ç»éç®éä¸­å»ºç«æªæ¡ã
åæ¬¡å·è¡å®è£ç¨å¼ä¹åï¼è«æª¢æ¥æ¨å·ææ­¤ç®éçæ­£ç¢ºå¯«å¥æ¬ã ç¡æ³å®è£ IBM Integration Bus Healthcare Packã
æ¨å¿é å¨æ­¤å®è£ç¨å¼çç¬¬ä¸ååæ¸ä¸­æå® IBM Integration Bus V10 å®è£ç®éã ç¡æ³è§£é¤å®è£ IBM Integration Bus Healthcare Packã
æ¨å¿é å¨æ­¤è§£é¤å®è£ç¨å¼çç¬¬ä¸ååæ¸ä¸­æå® IBM Integration Bus V10 å®è£ç®éã é å©è§£é¤å®è£ã æä¾çåæ¸ä¸åæ¯æ´ã
éæ¼å®è£ç¨å¼æ¯æ´çé¸é ï¼è«åé± IBM Integration Bus Healthcare Pack æä»¶ã æ­¡è¿ä½¿ç¨ IBM Integration Bus Healthcare Pack %HEALTHCARE_VERSION% æ¨æ²æè¨±å¯æ¬ä¾æ¥åææ¬ãè«åç³»çµ±ç®¡çèåå¾ IBM Integration Bus Healthcare Pack å®è£ç®éçå¯«å¥æ¬ã æ¨å¿é æ¥å IBM Integration Bus ææ¬ï¼æè½å®è£ IBM Integration Bus Healthcare Packã 