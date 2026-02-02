<?php
include_once(dirname(__dir__).'/script.php');
$script->log($script->test([
  'context' => 'script()',
  'name' => 'script() === __file__',
  'call' => function() {
    return script() === __file__;
  },
  'should' => true
]));
$script->log($script->test([
  'context' => 'script(String)',
  'name' => 'script("text")',
  'call' => function() {
    return script('text');
  },
  'should' => 'text'
]));
$script->log($script->test([
  'context' => 'script(Function)',
  'name' => 'script(function(){})',
  'call' => function() {
    return script(function(){return 1;});
  },
  'should' => 1
]));
$script->log($script->test([
  'context' => 'script(Type)',
  'name' => 'script(0)',
  'call' => function() {
    return script(0);
  },
  'should' => 'Integer'
]));

