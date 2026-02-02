<?php
require_once(dirname(__dir__).'/color.php');
$env = $package->env;
$variant = ['black','red','green','orange','blue','purple','teal','white','gray'];
$modifier = ['normal','bold','dim','italic','underline','blink'];
$color = $package->color;
$bg = $package->color->bg;
if($env->server) {
  header('content-type: text/html');
  echo '<!doctype html>'.PHP_EOL;
  echo '<html><head><title>color</title></head>';
  echo '<body>'.PHP_EOL;
  echo '<pre>'.PHP_EOL;
}
foreach($variant as $key => $val) {
  echo 'color '.$color->$val($val).' normal'.PHP_EOL;
  echo 'color '.$bg->$val('bg '.$val).' normal'.PHP_EOL;
  foreach($modifier as $k => $v) {
    echo 'color '.$color->$val($val.' '.$color->$v($v)).' normal'.PHP_EOL;
  }
}

