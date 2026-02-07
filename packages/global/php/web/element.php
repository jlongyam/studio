<?php
require_once(dirname(__dir__).'/core/type.php');

function element($a_option, $i_space = 0) {
  if(!$a_option) return;
//  global $script;
  $str = '';
  $l = PHP_EOL;
  $s = str_repeat('  ',$i_space);
  $closed = [
    'area','base','br','col','embed','hr',
    'img','input','link','meta','source','track','wbr'
  ];
  if(type($a_option[0]) === 'String') {
    $s_tag = $a_option[0];
    $a_attr = 0;
    $t_content = $a_option[1];
    
    if(type($a_option[1]) === 'Object') {
      $a_attr = $a_option[1];
      $t_content = 0;
    }
    if(count($a_option) === 3) {
      $a_attr = $a_option[1];
      $t_content = $a_option[2];
    }
    if(type($s_tag) === 'String') {
      $s_attr = '';
      if($a_attr && type($a_attr) === 'Object') {
        $s_attr .= ' ';
        $n = count($a_attr);
        $i = 0;
        foreach($a_attr as $k => $v) {
          $s_attr .= $k.'="'.$v.'"';
          $i++;
          if($i !== $n) $s_attr .= ' '; 
        }
      }
      if( in_array($s_tag, $closed) ) {
        $str .= $s.'<'.$s_tag.$s_attr.'>'.$l;
      }
      else {
        $s_content = '';    
        if(type($t_content) === 'String') $s_content = $t_content;
        if(type($t_content) === 'Array') {
          if(type($t_content[0]) === 'String') {
            $s_content = $l.element($t_content,$i_space+1);
          }
          if(type($t_content[0]) === 'Array') {
            $a_content = $l;
            foreach($t_content as $content) {
              if(type($content) === 'Function') {
                $f_content = $content();
                $a_content .= element($f_content,$i_space+1);
              }
              else $a_content .= element($content,$i_space+1);
            }
            $s_content = $a_content.$s;
          }
        }
        if(type($t_content) === 'Function') $s_content = $t_content();
        $str .= $s.'<'.$s_tag.$s_attr.'>'.$s_content.'</'.$s_tag.'>'.$l;
      }
    }  
  }
  if(type($a_option[0]) === 'Array') {
    foreach($a_option[0] as $val) {
      $str .= element($val,$i_space);
    }
  }
  return $str;
}

