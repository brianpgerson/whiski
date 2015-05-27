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
	$bottle = test_input($_POST['bottle']);
	$overall = test_input($_POST['overall']);
	$smoothness = test_input($_POST['smoothness']);
	$uniqueness = test_input($_POST['uniqueness']);
	$taste = test_input($_POST['taste']);
	$aroma = test_input($_POST['aroma']);
	$sql = "INSERT INTO $bottle (bottle, overall, smoothness, uniqueness, taste, aroma) 
	VALUES ('$bottle', '$overall', '$smoothness', '$uniqueness', '$taste', '$aroma')";

	$return_arr = array();

	$fetch = mysql_query("SELECT * FROM $bottle"); 

		while ($row = mysql_fetch_array($fetch, MYSQL_ASSOC)) {
    		$row_array['bottle'] = $row['bottle'];
    		$row_array['overall'] = $row['overall'];
    		$row_array['smoothness'] = $row['smoothness'];
    		$row_array['uniqueness'] = $row['uniqueness'];
    		$row_array['taste'] = $row['taste'];
    		$row_array['aroma'] = $row['aroma'];

	    	array_push($return_arr,$row_array);
		}

	echo json_encode($return_arr);

}


if (!mysql_query($sql)) {
	die('Error. Error. ' . mysql_error());
}


mysql_close();
?>