<?php
include_once(dirname(__dir__).'/url.php');
include_once(dirname(__dir__).'/html.php');
//phpinfo(INFO_VARIABLES);
$config = [
  'title' => 'url',
  'content' =>  ['pre', 'REPLACE']
];
$pre = 'location: '.$url->location.PHP_EOL;
$pre .= 'part: '.PHP_EOL;
foreach($url->part as $key => $val) {
  $pre .= ' - '.$key.': '.$val.PHP_EOL;
}
$config['content'][1] = $pre;
echo html($config);


