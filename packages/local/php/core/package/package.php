<?php
class package {
  private $internal = [];
  public function __set( $name, $value ) {
    if( getType( $value ) === 'object' ) $this->internal[$name] = (object) $value;
    else $this->internal[$name] = $value;
  }
  public function __get( $name ) {
    if( array_key_exists( $name, $this->internal) ) return $this->internal[$name];
  }
  public function __call( $method, $arguments ) {
    return call_user_func_array(
      Closure::bind(
        $this->$method,
        $this,
        get_called_class()
      ), $arguments
    );
  }
  public function __isset( $name ) {
    return isset( $this->internal[$name] );
  }
  public function __unset( $name ) {
    unset( $this->internal[$name] );
  }
}
$package = new Package;
$package->env = (function($s_api){
  if($s_api === 'cli') $s_server = false;
  else if($s_api === 'cli-server') $s_server = 'local';
  else if($s_api === 'apache2handler') $s_server = 'apache';
  else $s_server = $s_api;
  return (object) [
    'io' => $s_api === 'cli' ? true : false,
    'server' => $s_server
  ];
})(php_sapi_name());
$package->type = function($t_input) {
  $type = 'Unknown';
  $that = getType($t_input);
  if($that === 'boolean') $type = 'Boolean';
  if($that === 'integer') $type = 'Integer';
  if($that === 'double') $type = 'Float';
  if($that === 'array') {
    $is_array = false;
    if($t_input === []) $is_array = true;
    else $is_array = array_keys($t_input) === range(0,count($t_input)-1);
    if($is_array) $type = 'Array';
    else $type = 'Object';
  }
  if($that === 'object') {
    if(is_callable($t_input)) $type = 'Function';
    else $type = 'Class';
  }
  if($that === 'string') $type = 'String';
  if($that === 'NULL') $type = 'Null';
  return $type;
};
$package->test = function(array $option) {
  if(!isset($option['call']) && !isset($option['should'])) return;
  if(isset($option['context'])) $result['context'] = strval($option['context']);
  if(isset($option['name'])) $result['name'] = strval($option['name']);
  $result['should'] = getType($option['should']) === 'boolean' ? boolval($option['should']) : strval($option['should']);
  $result['pass'] = (call_user_func($option['call']) === $option['should']) ? true : false;
  return $result;
};

