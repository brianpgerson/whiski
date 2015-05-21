<?php

define('DB_NAME', 'thesuiu2_whiski');
define('DB_USER', 'thesuiu2_root');
define('DB_PASSWORD', 'iamroot');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!link) {
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db (DB_NAME, $link);

if (!$db_selected) {
	die('Can\'t use ' . DB_NAME . ': ' . mysql_error());
}

// echo 'Connected successfully';

function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	$overall = test_input($_POST['overall']);
	$smoothness = test_input($_POST['smoothness']);
	$uniqueness = test_input($_POST['uniqueness']);
	$taste = test_input($_POST['taste']);
	$aroma = test_input($_POST['aroma']);
	$sql = "INSERT INTO whiski (overall, smoothness, uniqueness, taste, aroma) 
	VALUES ('$overall', '$smoothness', '$uniqueness', '$taste', '$aroma')";
}


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
	$overall = test_input($_POST['overall']);
	$smoothness = test_input($_POST['smoothness']);
	$uniqueness = test_input($_POST['uniqueness']);
	$taste = test_input($_POST['taste']);
	$aroma = test_input($_POST['aroma']);
	$sql = "SELECT * FROM whiski";
}


if (!mysql_query($sql)) {
	die('Error. Error. ' . mysql_error());
}


mysql_close();
?>