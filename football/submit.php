<?php
// declare variables from form and set to empty strings
$name = $position = $team = $college = $age = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = clean_input($_POST["text0"]);
	$position = clean_input($_POST["text1"]);
	$team = clean_input($_POST["text2"]);
	$college = clean_input($_POST["text3"]);
	$age = clean_input($_POST["text4"]);
}

// format and sanitize the input via htmlspecialchars
function clean_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

echo '<tr><td style="overflow: hidden; white-space: nowrap;">'. $name. '</td><td style="overflow: hidden; white-space: nowrap;">'. $position. '</td><td style="overflow: hidden; white-space: nowrap;">'. $team. '</td><td style="overflow: hidden; white-space: nowrap;">'. $college. '</td><td style="overflow: hidden; white-space: nowrap;">'. $age. '</td></tr>';

?>

