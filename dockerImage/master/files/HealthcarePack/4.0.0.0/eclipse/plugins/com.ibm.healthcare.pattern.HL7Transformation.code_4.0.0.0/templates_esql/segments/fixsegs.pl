#!perl
while (<>) {
   if (m/OUT OutRef REFERENCE/) {
      s/OUT OutRef REFERENCE/INOUT OutRef REFERENCE/);
      die;
   }
}
