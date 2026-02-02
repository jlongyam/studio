<?php
require_once(__dir__.'/package.php');

(function(){
  global $package;
  $env = $package->env;
  $package->color = new Package;
  $variant = ['black','red','green','orange','blue','purple','teal','white','gray'];
  $package->color->bg = new Package;
  foreach($variant as $key => $val) {
    $package->color->$val = function($str) use($key,$env,$val) {
      if($env->io) {
        if($key  === 8) return "\x1b[90m".$str."\x1b[0m";
        else return "\x1b[3".$key."m".$str."\x1b[0m";
      }
      else return '<code style="color:'.$val.'">'.$str.'</code>';
    };
    $package->color->bg->$val = function($str) use($key,$env,$val) {
      if($env->io) {
        if($key  === 8) return "\x1b[100m".$str."\x1b[0m";
        else return "\x1b[4".$key."m".$str."\x1b[0m";
      }
      else return '<code style="background-color:'.$val.'">'.$str.'</code>';
    };
  } 
  $style = ['normal','bold','dim','italic','underline','blink'];
  $prop = '';
  foreach($style as $key => $val) {
    $package->color->$val = function($str) use($key,$env,$val,$prop) {
      if($env->io) return "\x1b[".$key."m".$str;
      else {
        $prop = 'font-style';
        if($val === 'bold') $prop = 'font-weight';
        if($val === 'underline') $prop = 'text-decoration';
        if($val === 'dim') {
          $prop = 'opacity';
          $val = '0.75';
        }
        return '<code style="'.$prop.':'.$val.'">'.$str.'</code>';
      }
    };
  }
})();


