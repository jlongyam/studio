<?php
include_once(dirname(__dir__).'/package.php');
$env = $package->env;
$type = $package->type;
$test = $package->test;
$arr = [];
if($env->server) {
  header('content-type: text/html');
  echo "<!doctype html>";
  echo "<html>";
  echo "<head>";
  echo "<title>package</title>";
  echo "</head>";
  echo "<body>";
  echo "<pre>";
}
array_push($arr, $test([
  'call' => function() {
    return 0;
  },
  'should' => 0
]));
array_push($arr, $test([
  'name' => 'should false',
  'call' => function() {
    return 1;
  },
  'should' => 0
]));
array_push($arr, $test([
  'context' => 'type(T)',
  'name' => 'type(0)',
  'call' => function() use($type) {
    return $type(0);
  },
  'should' => 'Integer'
]));
array_push($arr, $test([
  'context' => 'type(T)',
  'name' => 'type(false)',
  'call' => function() use($type) {
    return $type(false);
  },
  'should' => 'Boolean'
]));
$package->next = 'NEXT';
array_push($arr, $test([
  'context' => '$package-><Instance>',
  'name' => '$package->next',
  'call' => function() use($package) {
    return $package->next;
  },
  'should' => 'NEXT'
]));
class other extends package {
  public $value = false;
  public $item = [];
  public function __construct($t_input) {
    $this->value = $t_input;
  }
  public function extend($t_name, $t_value) {
    $this->item[$t_name] = $t_value;
  }
}
$object = new other('VALUE');
$object->say = function($s) { return $s; };
array_push($arr, $test([
  'context' => 'object extends package',
  'name' => '$object->value',
  'call' => function() use($object) {
    return $object->value;
  },
  'should' => 'VALUE'
]));
array_push($arr, $test([
  'context' => '$object->say = <Function>',
  'name' => '$object->say("OUTPUT")',
  'call' => function() use($object) {
    return $object->say('OUTPUT');
  },
  'should' => 'OUTPUT'
]));
foreach($arr as $key => $val ) {
  echo var_export($val);
  echo PHP_EOL;
}

