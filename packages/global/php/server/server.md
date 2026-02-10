# PHP-Built-in-web-server-Router

Router.php is loaded before index.php, so you can:
* Have **CORS** enabled 
* Set up your environment variables and constants
* And **CACHE EVERYTHING**

It also comes with a custom console function to output string|array
into terminal ( check out index.php for usage ).

# Requirements
PHP 5.4.0+ and /src/mimes.json file.

# Usage

Bellow you'll find a few examples.

1. If router.php is located in the root folder
```cli
php -S localhost:8000 router.php
```
2. If router.php is located in separate folder:
```cli
php -S localhost:8000 misc/router.php
```
3. If your project structure is something like this,
use '-t' parameter to set the document root to your public folder

```
./www/
    - your_php_framework/
        - private_framework_stuff/
          ...
        - public/
    - misc/
        - router.php
        - mimes.json
    - onefile.php
    
    
 php -S localhost:8000 -t ./your_php_framework/public misc/router.php 
```

# Edit router.php

This are the default settings.


```
# class PHP_Webserver_Router{...}
#    or   

include('router.class.php');
    
###
# Set up early your environment variables/constants
###
    
$_SERVER["ENVIRONMENT"] = "development";
error_reporting(E_ALL);

 
$php_web_server = new PHP_Webserver_Router();

    
###
# Uncomment to Disable http output in console:
###
//$php_web_server->log_enable = FALSE;

###
# Change this if your "index.php" has another name.
# By default is index.php
###
//$php_web_server->indexPath = "my_new_index_file.php";

return $php_web_server->listen();
```

# Notes
I've tested this with the following php frameworks:
* Slim 3 ( **the newest addition to this list** )
* Yii2
* CodeIgniter 3
* Wordpress 4
* Drupal 7 and 8

On the first request sent to router.php,
it will attempt to download and create mimes.json,
if that fails, you can find mimes.json in ./src/
and copy it next to router.php

Personally I bind the webserver to ```php -S 0.0.0.0 ...```
so I can test from other remote devices.


