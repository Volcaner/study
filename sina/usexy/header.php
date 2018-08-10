<?php
header('Content-Type: text/html; charset=UTF-8');
ini_set('display_errors', 0);

define('WB_ROOT_PATH', dirname(__FILE__) . '/../');
define('WB_STATIC_URL', 'http://rm.sina.com.cn/minisite/usexy/');
define('DEVELOPER', 'WB');
define('WB_VERSION', time());

include_once(dirname(__FILE__).'/../wbframework/include/wbcsc.php');

$online = false;    //控制程序上下线 online:true（上线） offline:false（下线）
