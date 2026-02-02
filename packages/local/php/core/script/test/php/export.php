<?php
include_once(dirname(__dir__).'../../script.php');

//$script->log($script->test([
//  'context' => 'script',
//  'name' => 'script([export => T])',
//  'call' => function() use($package) {
//    script([
//      'export' => [
//        'sample' => 'SAMPLE'
//      ]
//    ]);
//    return $package->sample;
//  },
//  'should' => 'SAMPLE'
//]));

script([
  'export' => [
    'object' => []
  ]
]);
//var_dump($package->object);

