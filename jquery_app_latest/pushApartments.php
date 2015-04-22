<?php

//Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

//Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

//get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

$firephp->log("FirePHP Test Output!");

// declare variables from form and set to empty strings
$response = 
		'<tr id="topOutputRow">
		<td style="overflow: hidden; white-space: nowrap;">Name</td>
		<td style="overflow: hidden; white-space: nowrap;">Address</td>
		<td style="overflow: hidden; white-space: nowrap;">Average Rating</td>
		<td style="overflow: hidden; white-space: nowrap;">Office Hours </td>
		<td style="overflow: hidden; white-space: nowrap;">Phone</td>
		<td style="overflow: hidden; white-space: nowrap;">Website</td>
		</tr>';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$str_json = json_decode(file_get_contents("php://input"));
}

foreach($str_json as $apartment) {
	$response .= 
			'<tr>
			<td style="overflow: hidden; white-space: nowrap;">'. $apartment->Name.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Address.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Rating.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Hours.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Phone;
	if(!(isset($apartment->URL))){
		$apartment->URL = "Website not listed in Google Maps";
		$response .=
		'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->URL;
	}
	else {
		$response .= 
		'</td><td style="overflow: hidden; white-space: nowrap;">'. '<a href="'.$apartment->URL.'" target="_blank">Website</a>';
	}
	$response .=
			'</td></tr>';
}

echo $response;
/*
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
}*/

?>

