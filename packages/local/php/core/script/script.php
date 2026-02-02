<?php
require_once(dirname(__dir__).'/package/display.php');
function script() {
  global $package;
  global $script;
  $type = $package->type;
  $process_option = function ($option = false, $main = false) use($type) {
    $cb = $type($main) === 'Function' ? $main : false;
    if($type($option) === 'Object') {
      $export = isset($option['export']) && $type($option['export']) === 'Object' ? $option['export'] : false;
      $to = isset($option['to']) && $type($option['to']) === 'String' ? $option['to'] : false;
    }
    if($export) {
      if($to) return false;
      else {
        foreach($export as $key => $val) {
//          var_dump($type($val));
          $package->$key = new Package;
        }
      }
    }
  };
  
  $args = func_get_args();
  $argl = count($args);
  if($argl === 0) return $script->path->file;
  else if($argl === 1) {
    $arg_main = $args[$argl-1];
    if($type($arg_main) === 'String' ) return $arg_main;
    else if($type($arg_main) === 'Function' ) return call_user_func($arg_main);
    else if($type($arg_main) === 'Object') $process_option($arg_main);
    else return $type($arg_main);
  }
  else if($argl === 2) {
    $arg_main = $args[$argl-1];
    $arg_option = $args[$argl-2];
    $process_option($arg_option,$arg_main);
  }
  else return false;
}
$script = new Package;
$script->path = (object) [
  'self' => __file__,
  'base' => __dir__,
  'file' =>  get_included_files()[0],
  'dir' => dirname(get_included_files()[0])
];
$script->log = function($t_input) use($package) {
  $display = $package->display;
  $type = $package->type;
  $env = $package->env;
  $output = '';
  if($type($t_input) === 'String') $output = $display->string($t_input);
  else if($type($t_input) === 'Boolean') $output = $display->boolean($t_input);
  else if($type($t_input) === 'Integer' || $type($t_input) === 'Float') $output = $display->number($t_input);
  else if($type($t_input) === 'Array') $output = $display->array($t_input, true);
  else if($type($t_input) === 'Object') $output = $display->object($t_input, true);
  else if($type($t_input) === 'Class') $output = $display->object($t_input,true);
  else $output = $display->type($t_input);
  if($env->server) echo '<pre>'.$output.'</pre>'.PHP_EOL;
  else echo $output.PHP_EOL;
};
$script->test = $package->test;
//$script->export = function($obj)  use($package) {
//  $type = $package->type;
//  if($type($obj) === 'Object') {
//    foreach($obj as $key => $val) {
//      $package->$key = $val;
//    }
//    $name = $obj['name'];
//    if(isset($obj['to'])) {
//      $package[$obj['to']][$name] = $obj['content'];
//      
//      //var_dump($package->$name);
//    }
//    else $package->$name = $obj['content'];
//    
//  }
//};


