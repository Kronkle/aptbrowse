<?php
// declare variables from form and set to empty strings
$name = $address = $rent = $amenities = $pets = $url = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$name = clean_input($_POST["text0"]);
	$address = clean_input($_POST["text1"]);
	$rent = clean_input($_POST["text2"]);
	$amenities = clean_input($_POST["text3"]);
	$pets = clean_input($_POST["text4"]);
	$url = clean_input($_POST["text5"]);
}

// format and sanitize the input via htmlspecialchars
function clean_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

 
if ($url == "Website not listed in Google Maps"){
	// avoid outputting html with a blank url when Google doesn't find an apartment website
	echo '<tr>
	<td style="overflow: hidden; white-space: nowrap;">'. $name.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $address.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $rent.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $amenities.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $pets.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $url.
	'</td></tr>';
} else {
	// return with html for a new apartment row when an apartment website is found
	echo '<tr>
	<td style="overflow: hidden; white-space: nowrap;">'. $name.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $address.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $rent.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $amenities.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. $pets.
	'</td><td style="overflow: hidden; white-space: nowrap;">'. '<a href="'.$url.'" target="_blank">Website</a>'.
	'</td></tr>';
}

?>

