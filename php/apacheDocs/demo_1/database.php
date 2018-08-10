<?php
$dbhost = 'localhost:3306';  // mysql服务器主机地址
$dbuser = 'root';            // mysql用户名
$dbpass = '';                // mysql用户名密码
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn) {
    die('Could not connect: ' . mysqli_error());
}
echo '连接数据库成功！</br></br>';

// 设置编码，防止中文乱码
mysqli_query($conn, 'set names utf8');

mysqli_select_db($conn, 'mysql');

$sql = 'SELECT user, Db FROM db';

$retval = mysqli_query($conn, $sql);

if(! $retval) {
    die('无法读取数据： ' . mysqli_error($conn));
}

// while($row = mysqli_fetch_array($retval, MYSQLI_ASSOCs)) {  // MYSQLI_ASSOC 使用字段名称来作为数组的索引
while($row = mysqli_fetch_array($retval, MYSQLI_NUM)) {  // MYSQLI_NUM 返回数字数组
    echo "<table border=1><tr>" .
        // "<td width=200>{$row["user"]}</td>" .
        // "<td width=300>{$row["Db"]}</td>" .
        "<td width=200>{$row[0]}</td>" .
        "<td width=300>{$row[1]}</td>" .
        "<td width=300>{$row[2]}</td>" .
        "<td width=300><input type='text' /></td>" .
        "</tr></table>";
}

//
mysqli_free_result($retval);

mysqli_close($conn);

echo '</br>';

?>

<?php
echo $_SERVER['HTTP_USER_AGENT'];

// echo strpos($_SERVER['HTTP_USER_AGENT'], 'MISE');

if(strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== FALSE ||  // MSIE 用于判断是否为 IE
    strpos($_SERVER['HTTP_USER_AGENT'], 'Trident') !== FALSE) {  // Trident 用于判断是否是 IE11
    echo '正在使用 Internet Explorer.';
}
?>
