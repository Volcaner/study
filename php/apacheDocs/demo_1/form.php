你好，<?php echo htmlspecialchars($_POST['name']); ?>。
你<?php echo (int)$_POST['age'] ?>岁了！
<!-- <?php echo $_POST ?> -->
<?php
    var_dump($_REQUEST);
    var_dump($_SESSION);
?>
