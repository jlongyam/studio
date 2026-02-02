<?php
require_once(__dir__.'/package.php');
require_once(__dir__.'/color.php');

(function(){
  global $package;
  $env = $package->env;
  $type = $package->type;  
  $color = $package->color;
  $display = new Package;
  $display->string = function($str) use($env,$type,$color) {
    if($type($str) === 'String') return $color->green('"'.$str.'"');
  };
  $display->boolean = function($bool) use($type,$color) {
    if($type($bool) === 'Boolean') {
      if($bool) return $color->orange('true');
      else return $color->red('false');
    }
  };
  $display->number = function($num) use($type,$color) {
    if($type($num) === 'Integer' || $type($num) === 'Float') {
      return $color->blue($num);
    }
  };
  $display->punctuator = function($s) use($type,$color) {
    if($type($s) === 'String') return $color->gray($s);
  };
  $display->type = function($t) use($type,$color) {
    return $color->purple($type($t));
  };
  $display->key = function($s) use($color) {
     return $color->teal('"'.strval($s).'"');
  };
  $display->array = function($arr,$pretty = false,$s = '  ',$s_='') use($type,$color) {
    if($type($arr) === 'Array') {
      $str = '[';
      $l = count($arr);
      if($pretty) $str .= PHP_EOL;
      if($l < 1) $str .= ']';
      foreach($arr as $i => $val) {
        if($pretty) $str .= $s;
        if($type($val) === 'String') $str .= $this->string($val);
        else if($type($val) === 'Integer' || $type($val) === 'Float') $str .= $this->number($val);
        else if($type($val) === 'Boolean') $str .= $this->boolean($val);
        else if($type($val) === 'Array') {
          if($pretty) $str .= $this->array($val,true,$s.$s,$s); 
          else $str .= $this->array($val);
        }
        else if($type($val) === 'Object') {
          if($pretty) $str .= $this->object($val,true,$s.$s,$s); 
          else $str .= $this->object($val);
        }
        else $str .= $this->type($val); 
        if($i !== $l-1) {
          $str .= $this->punctuator(',');
          if($pretty) $str .= PHP_EOL;
        }
        if($i === $l-1) {
          if($pretty) $str .= PHP_EOL.$s_.']';
          else $str .= ']';
        }
      }
      return $str;
    }
  };
  $display->object = function($obj,$pretty = false,$s = '  ',$s_='') use($type,$color) {
    if($type($obj) === 'Object' || $type($obj) === 'Class') {
      $str = '[';
      if($type($obj) === 'Class') {
        //$prop = get_class_methods($obj);
        $prop = get_object_vars($obj);
        $l = count($prop);
      }
      else $l = count($obj);
      $i = -1;
      if($pretty) $str .= PHP_EOL;
      foreach($obj as $k => $val) {
        $i++;
        if($pretty) $str .= $s;
        $str .= $this->key($k).' '.$this->punctuator('=>').' ';
        if($type($val) === 'String') $str .= $this->string($val);
        else if($type($val) === 'Integer' || $type($val) === 'Float') $str .= $this->number($val);
        else if($type($val) === 'Boolean') $str .= $this->boolean($val);
        else if($type($val) === 'Array') {
          if($pretty) $str .= $this->array($val,true,$s.$s,$s); 
          else $str .= $this->array($val);
        }
        else if($type($val) === 'Object') {
          if($pretty) $str .= $this->object($val,true,$s.$s,$s); 
          else $str .= $this->object($val);
        }
        else $str .= $this->type($val); 
        if($i !== $l-1) {
          $str .= $this->punctuator(',');
          if($pretty) $str .= PHP_EOL;
        }
        if($i === $l-1) {
          if($pretty) $str .= PHP_EOL.$s_.']';
          else $str .= ']';
        }
      }
      return $str;
    }
  };
  $package->display = $display;
})();
