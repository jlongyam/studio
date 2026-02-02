<?php
require_once(__dir__.'/element.php');

function html($config=[]) {
  $icons = isset($config['icon']) ? $config['icon'] : [];
  $content = isset($config['content']) ? $config['content'] : [];
  $str = '<!doctype html>'.PHP_EOL;
  $str .= element([
    'html', [
      ['head',[
        ['title', isset($config['title']) ? $config['title'] : 'TITLE' ],
        $icons,
        function() use($config) {
          if(isset($config['css'])) {
            $arr_css = [];
            foreach($config['css'] as $href) {
              array_push($arr_css, ['link', ['href' => $href, 'rel' => 'stylesheet']]);
            }
            return [$arr_css];
          };
        },
        function() use($config) {
          if(isset($config['js']) && isset($config['js']['head'])) {
            $arr_js = [];
            foreach($config['js']['head'] as $src) {
              array_push($arr_js,['script',['src'=>$src ]]);
            }
            return [$arr_js];
          }
        }
      ]],
      ['body', [
        $content,
        function() use($config) {
          if(isset($config['js']) && isset($config['js']['body'])) {
            $arr_js = [];
            foreach($config['js']['body'] as $src) {
              array_push($arr_js,['script',['src'=>$src ]]);
            }
            return [$arr_js];
          }
        }
      ]]
    ]
  ]);
  return $str;
}

