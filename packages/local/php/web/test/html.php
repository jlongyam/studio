<?php
include_once(dirname(__dir__).'/html.php');

//[1]_empty
//echo html();

//[2]_content
//echo html([
//  'content' => ['div','CONTENT']
//]);

//[3]_asset
//echo html([
//  'css' => ['file.css'],
//  'js' => [
//    'head' => ['file_head.js'],
//    'body' => ['file_body.js']
//  ]
//]);

//[4]_config
$config = [
  'title' => 'Example',
  'css' => ['style.css'],
  'js' => [
    'head' => ['head.js']
  ]
];
$config['icon'] = [[
  ['link',['rel'=> 'icon', 'type'=>'image/png', 'href'=>'img/icon.png', 'size'=>'16x16']],
  ['link',['rel'=> 'icon', 'type'=>'image/png', 'href'=>'img/icon.png', 'size'=>'46x46']]
  // more ...
]];

echo html($config);

//[6]_component
//$config = [
//  'title' => 'Example',
//  'css' => ['style.css'],
//  'js' => [
//    'head' => ['head.js'],
//    'body' => []
//  ],
//  'content' => []
//];
//-- start --//
//$component = ['div',[
//  ['div', 'CONTENT1'],
//  ['div', 'CONTENT2']
//]];
//array_push($config['css'],'component.css');
//array_push($config['js']['body'],'component.js');
// nested
//array_push($component[1],['div', 'CONTENT_NESTED']);
//-- end --//
//
// install
//$config['content'] = $component;
// display
//echo html($config);

