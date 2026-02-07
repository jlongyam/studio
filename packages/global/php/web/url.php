<?php

$url = (object) [
  'location' => (function(){
    $location = stripos($_SERVER['SERVER_PROTOCOL'],'https') === 0 ? 'https://' : 'http://';
    $location .= $_SERVER['HTTP_HOST'];
    $location .= $_SERVER['REQUEST_URI'];
    return $location; 
  })()
];
$url->part = parse_url($url->location);
(function($url){
  $s_path = $url->part['path'];
  $l_path = strlen($s_path);
  $s_last = substr($s_path,$l_path-1);
  $s_last === '/' ? $url->part['index'] = true : null;
})($url);
$url->part['current'] = (function($url){
  return isset($url->part['index']) ? null : basename($url->part['path']);
})($url);


