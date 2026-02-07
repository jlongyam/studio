<?php
require_once(dirname(__dir__).'/display.php');
$display = $package->display;
$arr = [
  's_empty' => $display->string(''),
  's_single' => $display->string('single'),
  's_double' => $display->string("double"),
  'b_true' => $display->boolean(true),
  'b_false' => $display->boolean(false),
  'n_zero' => $display->number(0),
  'n_integer' => $display->number(1),
  'n_float' => $display->number(0.99),
  's_punct' => $display->punctuator(','.' '.':'.' '.'/'.' '.'\\'),
  'S_type' => $display->type(null),
  'o_0' => $display->array([]),
  'o_01' => $display->array([1]),
  'a_1' => $display->array([1,2,3,'one','two',true,7,false]),
  'a_2' => $display->array([1,2,3,'one','two',true,7,false],true),
  'a_3' => $display->array([1,['one',2],3,['two',4]]),
  'a_4' => $display->array([1,['one',2],3,['two',4]],true),
  'a_5' => $display->array([1,'next',null,9]),
  'a_6' => $display->array([1,'next',function(){},9]),
  'a_7' => $display->array([1,2,3,['a'=>'A','b'=>'B'],'two',true,7,false],true),
  'o_1' => $display->object([1 => 'one']),
  'o_10' => $display->object([1 => 'one'],true),
  'o_2' => $display->object(['1' => 'one', '2' => 'two', 'three' => 'THREE']),
  'o_20' => $display->object(['1' => 'one', '2' => 'two', 'three' => 'THREE'],true),
  'o_3' => $display->object(['one'=>'ONE','two'=>[1,2,3],'three'=> true,'func' => function(){}]),
  'o_30' => $display->object(['one'=>'ONE','two'=>[1,2,3],'three'=> true,'func' => function(){}],true),
  'o_4' => $display->object(['one' => ['two'=>[1,2,3],'a'=>'A'],'other'=>'OTHER','arr'=>['first','last']]),
  'o_5' => $display->object(['one' => ['two'=>[1,2,3],'a'=>'A'],'other'=>'OTHER','arr'=>['first','last']],true),
  'c_0' => $display->object($package->display,true)
];
$env = $package->env;
if($env->server) {
  header('content-type: text/html');
  echo '<!doctype html>'.PHP_EOL;
  echo '<html><head><title>display</title></head>';
  echo '<body>'.PHP_EOL;
  echo '<pre>'.PHP_EOL;
}
foreach($arr as $key => $val) {
  echo $val.PHP_EOL;
}

