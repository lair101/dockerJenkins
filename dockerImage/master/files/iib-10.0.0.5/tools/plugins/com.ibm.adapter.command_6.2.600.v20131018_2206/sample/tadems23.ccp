       identification division.                                                 
       program-id. TADEMS22.                                                    
       data division.                                                           
       working-storage section.                                                 
       linkage section.                                                         
       01 DFHCOMMAREA.                                                          
          02 in1a.                                                              
           03 in1aa.                                                            
            04 in1bb.                                                           
             05 in1cc.                                                          
              06 in1dd.                                                         
               07 in1ee.                                                        
                08 in1 usage comp-4 PIC SP(2)99 SYNC.                           
          02 in1b.                                                              
             05 in1dd.                                                          
              06 in1ee.                                                         
               07 in1 usage is computational sync right PIC S99ppV.             
          02 in1c.                                                              
           03 in1aa.                                                            
            04 in1bb.                                                           
             05 in1cc.                                                          
              06 in1dd.                                                         
               07 in1ee.                                                        
                08 in1 binary sync left PIC S9(3)V9(2).                         
          02 out1out2out3.                                                      
             03 out1 sync usage binary PIC SP(3)9(2).                           
             03 out2 sync right PIC S99PPP usage is COMP.                       
             03 out3 PIC S9(4)V9(1) comp-4 sync left.                           
          02 vars.                                                              
            03 var12.                                                           
              04 var33.                                                         
                05 v33a.                                                        
                  06 var2var3.                                                  
                    07 var2 sync PIC SP(2)9(2) usage comp-4.                    
             03 var32.                                                          
               04 var33.                                                        
                 05 v33a.                                                       
                   06 var2var3.                                                 
                     07 var2 sync left pic S99PP usage is binary.               
             03 var23.                                                          
               04 v33a.                                                         
                 05 var2var3.                                                   
                   06 var2 usage comp sync right PIC S9(3)V99.                  
       procedure division.                                                      
       testcase-code.                                                           
              multiply in1 IN in1ee IN in1dd IN in1cc IN in1aa                  
                      IN in1a by -0.1 giving out1.                              
              multiply in1 IN in1ee IN in1dd IN in1b                            
                      by 10.0 giving out2.                                      
              multiply in1 IN in1ee IN in1dd IN in1cc IN in1bb IN in1aa         
                      IN in1c by -10.0 giving out3.                             
              multiply var2 in var2var3 IN v33a IN var33 IN var12               
              by -1.0 giving var2 IN var2var3 IN v33a IN var33 IN var12.        
              multiply var2 IN var2var3 IN v33a IN var33 IN var32               
              by 1.0 giving var2 IN var2var3 IN v33a IN var33 IN var32.         
              multiply var2 IN var2var3 IN v33a IN var23                        
                     by -1.0 giving var2 IN var2var3 IN v33a IN var23.          
             EXEC CICS RETURN END-EXEC.                                         
