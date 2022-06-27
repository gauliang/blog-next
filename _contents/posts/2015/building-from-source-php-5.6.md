---
title: PHP 5.6 编译安装选项说明
author: 高国良
type: posts
series: false
date: 2015-03-26T21:39:00.791Z
tags: [php, install]
description: configuresthis package to adapt to many kinds of systems.
draft: false 
cover: false
---

```bash
`configure' configuresthis package to adapt to many kinds of systems.
 
Usage: ./configure [OPTION]... [VAR=VALUE]...
 
To assign environment variables (e.g., CC, CFLAGS...), specify themas
VAR=VALUE.  See belowfor descriptions of some of the useful variables.
 
Defaultsfor the options are specifiedin brackets.
 
Configuration:
  -h, --help              displaythis help and exit
      --help=short        display options specific tothis package
      --help=recursive    display theshort help of all the included packages
  -V, --version           display version information and exit
  -q, --quiet, --silent  do not print `checking ...' messages
      --cache-file=FILE   cache test resultsin FILE [disabled]
  -C, --config-cache      aliasfor `--cache-file=config.cache'
  -n, --no-create        do not create output files
      --srcdir=DIR        find the sourcesin DIR [configure dir or `..']
 
Installation directories:
  --prefix=PREFIX         install architecture-independent filesin PREFIX
                          [/usr/local]
  --exec-prefix=EPREFIX   install architecture-dependent filesin EPREFIX
                          [PREFIX]
 
Bydefault, `make install' will install all the filesin
`/usr/local/bin', `/usr/local/lib' etc.  You can specify
an installation prefix other than `/usr/local' using `--prefix',
for instance `--prefix=$HOME'.
 
For better control, use the options below.
 
Fine tuning of the installation directories:
  --bindir=DIR            user executables [EPREFIX/bin]
  --sbindir=DIR           system admin executables [EPREFIX/sbin]
  --libexecdir=DIR        program executables [EPREFIX/libexec]
  --sysconfdir=DIR        read-only single-machine data [PREFIX/etc]
  --sharedstatedir=DIR    modifiable architecture-independent data [PREFIX/com]
  --localstatedir=DIR     modifiable single-machine data [PREFIX/var]
  --libdir=DIR           object code libraries [EPREFIX/lib]
  --includedir=DIR        C header files [PREFIX/include]
  --oldincludedir=DIR     C header filesfor non-gcc [/usr/include]
  --datarootdir=DIR       read-only arch.-independent data root [PREFIX/share]
  --datadir=DIR           read-only architecture-independent data [DATAROOTDIR]
  --infodir=DIR           info documentation [DATAROOTDIR/info]
  --localedir=DIR         locale-dependent data [DATAROOTDIR/locale]
  --mandir=DIR            man documentation [DATAROOTDIR/man]
  --docdir=DIR            documentation root [DATAROOTDIR/doc/PACKAGE]
  --htmldir=DIR           html documentation [DOCDIR]
  --dvidir=DIR            dvi documentation [DOCDIR]
  --pdfdir=DIR            pdf documentation [DOCDIR]
  --psdir=DIR             ps documentation [DOCDIR]
 
System types:
  --build=BUILD     configurefor buildingon BUILD [guessed]
  --host=HOST       cross-compile to build programs to runon HOST [BUILD]
  --target=TARGET   configurefor building compilersfor TARGET [HOST]
 
Optional Features and Packages:
  --disable-option-checking  ignore unrecognized --enable/--with options
  --disable-FEATURE      do not include FEATURE (sameas --enable-FEATURE=no)
  --enable-FEATURE[=ARG]  include FEATURE [ARG=yes]
  --with-PACKAGE[=ARG]    use PACKAGE [ARG=yes]
  --without-PACKAGE      do not use PACKAGE (sameas --with-PACKAGE=no)
  --with-libdir=NAME      Lookfor librariesin .../NAME rather than .../lib
  --disable-rpath         Disable passing additional runtime library
                          search paths
  --enable-re2c-cgoto     Enable -g flag to re2c to use computedgoto gcc extension
 
SAPI modules:
 
  --with-aolserver=DIR    Specify path to the installed AOLserver
  --with-apxs=FILE        Build shared Apache 1.x module. FILEis the optional
                          pathname to the Apache apxs tool apxs
  --with-apache=DIR       Build Apache 1.x module. DIRis the top-level Apache
                          build directory /usr/local/apache
  --enable-mod-charset    APACHE: Enable transfer tablesfor mod_charset (Rus Apache)
  --with-apxs2filter=FILE
                          EXPERIMENTAL: Build shared Apache 2.0 Filter module. FILEis the optional
                          pathname to the Apache apxs tool apxs
  --with-apxs2=FILE       Build shared Apache 2.0 Handler module. FILEis the optional
                          pathname to the Apache apxs tool apxs
  --with-apache-hooks=FILE
                          EXPERIMENTAL: Build shared Apache 1.x module. FILEis the optional
                          pathname to the Apache apxs tool apxs
  --with-apache-hooks-static=DIR
                          EXPERIMENTAL: Build Apache 1.x module. DIRis the top-level Apache
                          build directory /usr/local/apache
  --enable-mod-charset    APACHE (hooks): Enable transfer tablesfor mod_charset (Rus Apache)
  --with-caudium=DIR      Build PHPas a Pike modulefor use with Caudium.
                          DIRis the Caudium server dir /usr/local/caudium/server
  --disable-cli           Disable building CLI version of PHP
                          (this forces --without-pear)
  --with-continuity=DIR   Build PHPas Continuity Server module.
                          DIRis path to the installed Continuity Server root
  --enable-embed=TYPE     EXPERIMENTAL: Enable building of embedded SAPI library
                          TYPEis either'shared' or'static'. TYPE=shared
  --enable-fpm            Enable building of the fpm SAPI executable
  --with-fpm-user=USER    Set the userfor php-fpm to runas. (default: nobody)
  --with-fpm-group=GRP    Set thegroup for php-fpm to runas. For a system user,this
                          should usually beset to match the fpm username (default: nobody)
  --with-fpm-systemd      Activate systemd integration
  --with-fpm-acl          Use POSIX Access Control Lists
  --with-isapi=DIR        Build PHPas an ISAPI modulefor use with Zeus
  --with-litespeed        Build PHPas litespeed module
  --with-milter=DIR       Build PHPas Milter application
  --with-nsapi=DIR        Build PHPas NSAPI modulefor Netscape/iPlanet/Sun Webserver
  --enable-phpdbg         Build phpdbg
  --enable-phpdbg-debug   Build phpdbgin debug mode
  --with-phttpd=DIR       Build PHPas phttpd module
  --with-pi3web=DIR       Build PHPas Pi3Web module
  --with-roxen=DIR        Build PHPas a Pike module. DIRis thebase Roxen
                          directory, normally /usr/local/roxen/server
  --enable-roxen-zts      ROXEN: Build the Roxen moduleusing Zend Thread Safety
  --with-thttpd=SRCDIR    Build PHPas thttpd module
  --with-tux=MODULEDIR    Build PHPas a TUX module (Linux only)
  --with-webjames=SRCDIR  Build PHPas a WebJames module (RISC OS only)
  --disable-cgi           Disable building CGI version of PHP
 
General settings:
 
  --enable-gcov           Enable GCOV code coverage (requires LTP) - FOR DEVELOPERS ONLY!!
  --enable-debug          Compile with debugging symbols
  --with-layout=TYPE      Set how installed files will be laidout.  Type can
                          be either PHP or GNU [PHP]
  --with-config-file-path=PATH
                          Set the pathin which to lookfor php.ini [PREFIX/lib]
  --with-config-file-scan-dir=PATH
                          Set the pathwhere to scanfor configuration files
  --enable-sigchild       Enable PHP's own SIGCHLD handler
  --enable-libgcc         Enable explicitly linking against libgcc
  --disable-short-tags    Disable theshort-form <? start tagby default
  --enable-dmalloc        Enable dmalloc
  --disable-ipv6          Disable IPv6 support
  --enable-dtrace         Enable DTrace support
  --enable-fd-setsize     Set size of descriptor sets
 
Extensions:
 
  --with-EXTENSION=shared[,PATH]
 
    NOTE: Not all extensions can be buildas 'shared'.
 
    Example: --with-foobar=shared,/usr/local/foobar/
 
      o Builds the foobar extensionas shared extension.
      o foobar package install prefixis /usr/local/foobar/
 
 
  --disable-all           Disable all extensions which are enabledby default
 
  --with-regex=TYPE       Regex library type: system, php. TYPE=php
                          WARNING: Do NOT use unless you know what you are doing!
  --disable-libxml        Disable LIBXML support
  --with-libxml-dir=DIR   LIBXML: libxml2 install prefix
  --with-openssl=DIR      Include OpenSSL support (requires OpenSSL >= 0.9.6)
  --with-kerberos=DIR     OPENSSL: Include Kerberos support
  --with-system-ciphers   OPENSSL: Use systemdefault cipher list instead of hardcoded value
  --with-pcre-regex=DIR   Include Perl Compatible Regular Expressions support.
                          DIRis the PCRE install prefix BUNDLED
  --without-sqlite3=DIR   Do not include SQLite3 support. DIRis the prefix to
                          SQLite3 installation directory.
  --with-zlib=DIR         Include ZLIB support (requires zlib >= 1.0.9)
  --with-zlib-dir=<DIR>   Define the location of zlib install directory
  --enable-bcmath         Enable bc style precision math functions
  --with-bz2=DIR          Include BZip2 support
  --enable-calendar       Enable supportfor calendar conversion
  --disable-ctype         Disable ctype functions
  --with-curl=DIR         Include cURL support
  --enable-dba            Build DBA with bundled modules. To build shared DBA
                          extension use --enable-dba=shared
  --with-qdbm=DIR         DBA: QDBM support
  --with-gdbm=DIR         DBA: GDBM support
  --with-ndbm=DIR         DBA: NDBM support
  --with-db4=DIR          DBA: Oracle Berkeley DB 4.x or 5.x support
  --with-db3=DIR          DBA: Oracle Berkeley DB 3.x support
  --with-db2=DIR          DBA: Oracle Berkeley DB 2.x support
  --with-db1=DIR          DBA: Oracle Berkeley DB 1.x support/emulation
  --with-dbm=DIR          DBA: DBM support
  --with-tcadb=DIR        DBA: Tokyo Cabinetabstract DB support
  --without-cdb=DIR       DBA: CDB support (bundled)
  --disable-inifile       DBA: INI support (bundled)
  --disable-flatfile      DBA: FlatFile support (bundled)
  --disable-dom           Disable DOM support
  --with-libxml-dir=DIR   DOM: libxml2 install prefix
  --with-enchant=DIR      Include enchant support.
                          GNU Aspell version 1.1.3 or higher required.
  --enable-exif           Enable EXIF (metadatafrom images) support
  --disable-fileinfo      Disable fileinfo support
  --disable-filter        Disable input filter support
  --with-pcre-dir         FILTER: pcre install prefix
  --enable-ftp            Enable FTP support
  --with-openssl-dir=DIR  FTP: openssl install prefix
  --with-gd=DIR           Include GD support.  DIRis the GD librarybase
                          install directory BUNDLED
  --with-vpx-dir=DIR      GD: Set the path to libvpx install prefix
  --with-jpeg-dir=DIR     GD: Set the path to libjpeg install prefix
  --with-png-dir=DIR      GD: Set the path to libpng install prefix
  --with-zlib-dir=DIR     GD: Set the path to libz install prefix
  --with-xpm-dir=DIR      GD: Set the path to libXpm install prefix
  --with-freetype-dir=DIR GD: Set the path to FreeType 2 install prefix
  --with-t1lib=DIR        GD: Include T1lib support. T1lib version >= 5.0.0 required
  --enable-gd-native-ttf  GD: Enable TrueTypestring function
  --enable-gd-jis-conv    GD: Enable JIS-mapped Japanese font support
  --with-gettext=DIR      Include GNU gettext support
  --with-gmp=DIR          Include GNU MP support
  --with-mhash=DIR        Include mhash support
  --disable-hash          Disable hash support
  --without-iconv=DIR     Exclude iconv support
  --with-imap=DIR         Include IMAP support. DIRis the c-client install prefix
  --with-kerberos=DIR     IMAP: Include Kerberos support. DIRis the Kerberos install prefix
  --with-imap-ssl=DIR     IMAP: Include SSL support. DIRis the OpenSSL install prefix
  --with-interbase=DIR    Include InterBase support.  DIRis the InterBasebase
                          install directory /usr/interbase
  --enable-intl           Enable internationalization support
  --with-icu-dir=DIR      Specifywhere ICU libraries and headers can be found
  --disable-json          Disable JavaScript Object Serialization support
  --with-ldap=DIR         Include LDAP support
  --with-ldap-sasl=DIR    LDAP: Include Cyrus SASL support
  --enable-mbstring       Enable multibytestring support
  --disable-mbregex       MBSTRING: Disable multibyte regex support
  --disable-mbregex-backtrack
                          MBSTRING: Disable multibyte regex backtrack check
  --with-libmbfl=DIR      MBSTRING: Use external libmbfl.  DIRis the libmbflbase
                          install directory BUNDLED
  --with-onig=DIR         MBSTRING: Use external oniguruma. DIRis the oniguruma install prefix.
                          If DIRis notset, the bundled oniguruma will be used
  --with-mcrypt=DIR       Include mcrypt support
  --with-mssql=DIR        Include MSSQL-DB support.  DIRis the FreeTDS home
                          directory /usr/local/freetds
  --with-mysql=DIR        Include MySQL support.  DIRis the MySQLbase
                          directory,if no DIRis passed or the valueis
                          mysqlnd the MySQL native driver will be used
  --with-mysql-sock=SOCKPATH
                          MySQL/MySQLi/PDO_MYSQL: Location of the MySQL unix socket pointer.
                          If unspecified, thedefault locations are searched
  --with-zlib-dir=DIR     MySQL: Set the path to libz install prefix
  --with-mysqli=FILE      Include MySQLi support.  FILEis the path
                          to mysql_config.  If no value or mysqlndis passed
                          as FILE, the MySQL native driver will be used
  --enable-embedded-mysqli
                          MYSQLi: Enable embedded support
                          Note: Does not work with MySQL native driver!
  --with-oci8=DIR         Include Oracle Database OCI8 support. DIR defaults to $ORACLE_HOME.
                          Use --with-oci8=instantclient,/path/to/instant/client/lib
                          to use an Oracle Instant Client installation
  --with-adabas=DIR       Include Adabas D support /usr/local
  --with-sapdb=DIR        Include SAP DB support /usr/local
  --with-solid=DIR        Include Solid support /usr/local/solid
  --with-ibm-db2=DIR      Include IBM DB2 support /home/db2inst1/sqllib
  --with-ODBCRouter=DIR   Include ODBCRouter.com support /usr
  --with-empress=DIR      Include Empress support \$EMPRESSPATH
                          (Empress Version >= 8.60 required)
  --with-empress-bcs=DIR
                          Include Empress Local Access support \$EMPRESSPATH
                          (Empress Version >= 8.60 required)
  --with-birdstep=DIR     Include Birdstep support /usr/local/birdstep
  --with-custom-odbc=DIR  Include user defined ODBC support. DIRis ODBC installbase
                          directory /usr/local. Make sure to define CUSTOM_ODBC_LIBS and
                          have some odbc.hin your include dirs. f.e. you should define
                          followingfor Sybase SQL Anywhere 5.5.00on QNX, prior to
                          runningthis configure script:
                            CPPFLAGS=\"-DODBC_QNX -DSQLANY_BUG\"
                            LDFLAGS=-lunix
                            CUSTOM_ODBC_LIBS=\"-ldblib -lodbc\"
  --with-iodbc=DIR        Include iODBC support
  --with-esoob=DIR        Include Easysoft OOB support /usr/local/easysoft/oob/client
  --with-unixODBC=DIR     Include unixODBC support /usr/local
  --with-dbmaker=DIR      Include DBMaker support
  --enable-opcache        Enable Zend OPcache support
  --enable-pcntl          Enable pcntl support (CLI/CGI only)
  --disable-pdo           Disable PHP Data Objects support
  --with-pdo-dblib=DIR    PDO: DBLIB-DB support.  DIRis the FreeTDS home directory
  --with-pdo-firebird=DIR PDO: Firebird support.  DIRis the Firebirdbase
                          install directory /opt/firebird
  --with-pdo-mysql=DIR    PDO: MySQL support. DIRis the MySQLbase directory
                          If no value or mysqlndis passedas DIR, the
                          MySQL native driver will be used
  --with-zlib-dir=DIR     PDO_MySQL: Set the path to libz install prefix
  --with-pdo-oci=DIR      PDO: Oracle OCI support. DIR defaults to \$ORACLE_HOME.
                          Use --with-pdo-oci=instantclient,prefix,version
                          for an Oracle Instant Client SDK.
                          For exampleon Linux with 11.2 RPMs use:
                            --with-pdo-oci=instantclient,/usr,11.2
                          With 10.2 RPMs use:
                            --with-pdo-oci=instantclient,/usr,10.2.0.4
  --with-pdo-odbc=flavour,dir
                          PDO: Supportfor 'flavour' ODBC driver.
                          include and lib dirs are lookedfor under'dir'.
 
                          'flavour' can be one of:  ibm-db2, iODBC, unixODBC, generic
                          If',dir' partis omitted,default for the flavour
                          you have selected will be used. e.g.:
 
                            --with-pdo-odbc=unixODBC
 
                          will checkfor unixODBC under /usr/local. You may attempt
                          to use an otherwise unsupported driverusing the \"generic\"
                          flavour.  The syntaxfor generic ODBC supportis:
 
                            --with-pdo-odbc=generic,dir,libname,ldflags,cflags
 
                          When builtas 'shared' the extension filenameis always pdo_odbc.so
  --with-pdo-pgsql=DIR    PDO: PostgreSQL support.  DIRis the PostgreSQLbase
                          install directory or the path to pg_config
  --without-pdo-sqlite=DIR
                          PDO: sqlite 3 support.  DIRis the sqlitebase
                          install directory BUNDLED
  --with-pgsql=DIR        Include PostgreSQL support.  DIRis the PostgreSQL
                          base install directory or the path to pg_config
  --disable-phar          Disable phar support
  --disable-posix         Disable POSIX-like functions
  --with-pspell=DIR       Include PSPELL support.
                          GNU Aspell version 0.50.0 or higher required
  --with-libedit=DIR      Include libedit readline replacement (CLI/CGI only)
  --with-readline=DIR     Include readline support (CLI/CGI only)
  --with-recode=DIR       Include recode support
  --disable-session       Disable session support
  --with-mm=DIR           SESSION: Include mm supportfor session storage
  --enable-shmop          Enable shmop support
  --disable-simplexml     Disable SimpleXML support
  --with-libxml-dir=DIR   SimpleXML: libxml2 install prefix
  --with-snmp=DIR         Include SNMP support
  --with-openssl-dir=DIR  SNMP: openssl install prefix
  --enable-soap           Enable SOAP support
  --with-libxml-dir=DIR   SOAP: libxml2 install prefix
  --enable-sockets        Enable sockets support
  --with-sybase-ct=DIR    Include Sybase-CT support.  DIRis the Sybase home
                          directory /home/sybase
  --enable-sysvmsg        Enable sysvmsg support
  --enable-sysvsem        Enable System V semaphore support
  --enable-sysvshm        Enable the System V shared memory support
  --with-tidy=DIR         Include TIDY support
  --disable-tokenizer     Disable tokenizer support
  --enable-wddx           Enable WDDX support
  --with-libxml-dir=DIR   WDDX: libxml2 install prefix
  --with-libexpat-dir=DIR WDDX: libexpat dirfor XMLRPC-EPI (deprecated)
  --disable-xml           Disable XML support
  --with-libxml-dir=DIR   XML: libxml2 install prefix
  --with-libexpat-dir=DIR XML: libexpat install prefix (deprecated)
  --disable-xmlreader     Disable XMLReader support
  --with-libxml-dir=DIR   XMLReader: libxml2 install prefix
  --with-xmlrpc=DIR       Include XMLRPC-EPI support
  --with-libxml-dir=DIR   XMLRPC-EPI: libxml2 install prefix
  --with-libexpat-dir=DIR XMLRPC-EPI: libexpat dirfor XMLRPC-EPI (deprecated)
  --with-iconv-dir=DIR    XMLRPC-EPI: iconv dirfor XMLRPC-EPI
  --disable-xmlwriter     Disable XMLWriter support
  --with-libxml-dir=DIR   XMLWriter: libxml2 install prefix
  --with-xsl=DIR          Include XSL support.  DIRis the libxsltbase
                          install directory (libxslt >= 1.1.0 required)
  --enable-zip            Include Zip read/write support
  --with-zlib-dir=DIR     ZIP: Set the path to libz install prefix
  --with-pcre-dir         ZIP: pcre install prefix
  --with-libzip=DIR       ZIP: use libzip
  --enable-mysqlnd        Enable mysqlnd explicitly, will be done implicitly
                          when requiredby other extensions
  --disable-mysqlnd-compression-support
                          Disable supportfor the MySQL compressed protocolin mysqlnd
  --with-zlib-dir=DIR     mysqlnd: Set the path to libz install prefix
 
PEAR:
 
  --with-pear=DIR         Install PEARin DIR [PREFIX/lib/php]
  --without-pear          Do not install PEAR
 
Zend:
 
  --with-zend-vm=TYPE     Setvirtual machine dispatch method. Typeis
                          one of"CALL","SWITCH" or"GOTO" TYPE=CALL
  --enable-maintainer-zts Enable thread safety -for code maintainers only!!
  --disable-inline-optimization
                          If building zend_execute.lo fails,try this switch
  --enable-zend-signals   Use zend signal handling
 
TSRM:
 
  --with-tsrm-pth=pth-config
                          Use GNU Pth
  --with-tsrm-st          Use SGI's State Threads
  --with-tsrm-pthreads    Use POSIX threads (default)
 
Libtool:
 
  --enable-shared=PKGS    Build shared librariesdefault=yes
  --enable-static=PKGS    Buildstatic librariesdefault=yes
  --enable-fast-install=PKGS
                          Optimizefor fast installationdefault=yes
  --with-gnu-ld           Assume the C compiler uses GNU lddefault=no
  --disable-libtool-lock  Avoid locking (mightbreak parallel builds)
  --with-pic              Try to use only PIC/non-PIC objectsdefault=use both
  --with-tags=TAGS        Include additional configurations automatic
 
 
Some influential environment variables:
  CC          C compiler command
  CFLAGS      C compiler flags
  LDFLAGS     linker flags, e.g. -L<lib dir>if you have librariesin a
              nonstandard directory <lib dir>
  LIBS        libraries to pass to the linker, e.g. -l<library>
  CPPFLAGS    (Objective) C/C++ preprocessor flags, e.g. -I<include dir>if
              you have headersin a nonstandard directory <include dir>
  CPP         C preprocessor
  YACC        The `Yet Another C Compiler' implementation to use. Defaults to
              the first program foundout of: `bison -y', `byacc', `yacc'.
  YFLAGS      The list of arguments that will be passedby default to $YACC.
              This script willdefault YFLAGS to the emptystring to avoid a
              default value of `-d' givenby some make applications.
  CXX         C++ compiler command
  CXXFLAGS    C++ compiler flags
  CXXCPP      C++ preprocessor
 
Use these variables tooverride the choices madeby `configure' or to help
it to find libraries and programs with nonstandard names/locations.
```