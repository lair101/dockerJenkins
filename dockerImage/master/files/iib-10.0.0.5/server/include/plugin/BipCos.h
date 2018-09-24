/*
// Licensed Materials - Property of IBM
// ProgIds: 5724-J06 5724-J05 5724-J04 5697-J09 5655-M74 5655-M75 5648-C63
// (C) Copyright IBM Corp. 1999, 2014
*/

#ifndef BipCos_h
#define BipCos_h

#ifdef __cplusplus
extern "C" {
#endif

/* #if __cplusplus > 199711L
# ifndef BIP_AVOID_CXX11_SUPPORT
#  ifndef BIP_CXX11_SUPPORT
#   define BIP_CXX11_SUPPORT 1
#  endif
# endif
#endif */

#ifndef _WIN32
# ifdef __GNUC__
#  ifdef BIP_INTERNAL_CALL
#   define ImportExportPrefix __attribute__ ((visibility("default")))
#   define ImportExportSuffix
#  else
#   define ImportExportPrefix
#   define ImportExportSuffix
#  endif
#  define LilFactoryExportPrefix __attribute__ ((visibility("default")))
#  define LilFactoryExportSuffix
# else
#  define ImportExportPrefix
#  define ImportExportSuffix
#  define LilFactoryExportPrefix
#  define LilFactoryExportSuffix
# endif
#else
# ifdef BIP_INTERNAL_CALL
#  define ImportExportPrefix __declspec(dllexport)
#  define ImportExportSuffix
# else
#  define ImportExportPrefix __declspec(dllimport)
#  define ImportExportSuffix
# endif
# define LilFactoryExportPrefix __declspec(dllexport)
# define LilFactoryExportSuffix
#endif

#if defined(_AIX)

# if defined(_LP64)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_AIX__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit AIX systems
# endif

#elif defined(__hpux)

# if defined(_LP64) && defined(__ia64)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_HPUX__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit HP-UX IA64 systems
# endif

#elif defined(__sun)

# if defined(__sparcv9) || defined(__x86_64__)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_SOLARIS__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit Solaris SPARC and x86-64 systems
#endif

#elif defined(__linux__)

# if defined(__LP64__) && (defined(__x86_64__) || defined(__powerpc64__) || defined(__s390x__))
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_LINUX__
# elif defined(__arm__)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint32_t CciCount;
#  define __CCI_LINUX__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit Linux x86-64, POWER and z systems, and 32-bit ARM hard float systems
#endif

#elif defined(__APPLE__)

# if defined(__x86_64__)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_MACOS__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit MacOS x86-64 systems
#endif

#elif defined(__MVS__)

# if defined(_LP64)
#  include <stdint.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef uint16_t CciChar;
#  endif
typedef int64_t CciInt;
typedef uint64_t CciCount;
#  define __CCI_MVS__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit z/OS systems
#endif

#elif defined(_WIN32)

# if defined(_M_AMD64)
#  include <wchar.h>
#  if BIP_CXX11_SUPPORT
typedef char16_t CciChar;
#  else
typedef wchar_t CciChar;
#  endif
typedef __int64 CciInt;
typedef unsigned __int64 CciCount;
#  define __CCI_WINDOWS__
# else
#  error The C plugin interface for IBM Integration Bus is only available for 64-bit Windows x86-64 systems
#endif

#else
# error The C plugin interface for IBM Integration Bus is not available for this unknown system
#endif

#ifdef __cplusplus
}
#endif

#endif
