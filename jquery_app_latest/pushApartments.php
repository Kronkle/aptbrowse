<?php

// Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

$firephp->log("FirePHP Test Output!");

// Set HTML for heading row of search results table
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

// Formulate HTML for content rows of search results table
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

?>

