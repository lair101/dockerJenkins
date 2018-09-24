       identification division.
       program-id. TADERC99.
       environment division.
       data division.
       working-storage section.
       LINKAGE SECTION.
       01  DFHCOMMAREA.
           02  CustomerNumber     PIC X(5).
           02  FirstName  PIC A(15).
           02  LastName   PIC A(25).
           02  Street     PIC X(20).
           02  City       PIC A(20).
           02  Country    PIC A(10).
           02  Phone      PIC X(15).
           02  PostalCode PIC X(7).
       procedure division.
       start-para.
           IF CustomerNumber EQUAL '12345'
             move 'Alan' to FirstName
             move 'Turing' to LastName
             move '1150 Eglinton Ave.' to Street
             move 'New York' to City
             move 'USA' to Country
             move '(416) 444-4444' to Phone
             move '  94041' to PostalCode
           ELSE IF CustomerNumber EQUAL '44444'
             move 'Enrico' to FirstName
             move 'Fermi' to LastName
             move '11 Maple Ave.' to Street
             move 'Austin' to City
             move 'USA' to Country
             move '(416) 444-4444' to Phone
             move '  10121' to PostalCode
           ELSE
             move 'Mary' to FirstName
             move 'Poppins' to LastName
             move '51 Sweets Dr.' to Street
             move 'Chicago' to City
             move 'USA' to Country
             move '(416) 444-4444' to Phone
             move '  30326' to PostalCode
           END-IF.
           EXEC CICS RETURN
           END-EXEC.
