<?php
include_once(dirname(__dir__).'/element.php');

// == basic == //

//[0]_[String]
//  [1]_String
echo element(['div',['id'=>'div_0', 'class'=>'div'], 'CONTENT']);
//  [1]_Empty
echo element(['input',['type'=>'button', 'value'=>'button']]);
//  [1]_Array
//    [2]_String
echo element(['div',['id'=>'div_1', 'class'=>'div'], 
  ['span','CONTENT'],
]);
//    [2]_Array
echo element(['div',['id'=>'div_2', 'class'=>'div'], [
  ['span','CONTENT_1'],
  ['span','CONTENT_2'],
  ['span','CONTENT_3']
]]);
//    [2]_Function
echo element(['div', [
  ['span', 'CONTENT'],
  function() {
    return ['span', 'NEXT'];
  }
]]);
//  [1]_Function
echo element(['div', function(){ return 'HELO'; }]);
//[0]_[Array]
echo element([[['span','CONTENT_1'],['span','CONTENT_2']]]);

// == nested == //

//[1]_tag-pair

echo element(['div',['id'=>'div_3', 'class'=>'div'], [
  ['ul', [
    ['li','list_item 1'],
    ['li','list_item 2']
  ]],
  ['b','BOLD']
]]);

//[2]_tag-close
echo element(['fieldset',[
  ['legend','LEGEND'],
  ['input',[ 'type'=>'checkbox', 'id'=>'ckh_0']],
  ['input',[ 'type'=>'checkbox', 'id'=>'ckh_2']]
]]);

