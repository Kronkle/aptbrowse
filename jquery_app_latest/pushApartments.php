<?php
/* 
 *  pushApartments.php Functionality:
 *  1) Start FirePHP logging for testing and debugging
 *  2) Create HTML for the heading of the search results table
 *  3) Use Google Places results to create HTML for search results table content
 */

// ***************************************************************************************
// ---------------------------------------FirePHP-----------------------------------------
// ***************************************************************************************

require_once( "FirePHPCore/FirePHP.class.php" );

// Start buffering the output - not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance( true );

$firephp->log( "FirePHP Test Output!" );

// ***************************************************************************************
// ---------------------------------Create heading row HTML-------------------------------
// ***************************************************************************************

$response = 
		'<tr id="topOutputRow">
		<td style="overflow: hidden; white-space: nowrap;">Name</td>
		<td style="overflow: hidden; white-space: nowrap;">Address</td>
		<td style="overflow: hidden; white-space: nowrap;">Average Rating</td>
		<td style="overflow: hidden; white-space: nowrap;">Office Hours </td>
		<td style="overflow: hidden; white-space: nowrap;">Phone</td>
		<td style="overflow: hidden; white-space: nowrap;">Website</td>
		</tr>';

// ***************************************************************************************
// ---------------------------------Create table content HTML-----------------------------
// ***************************************************************************************
$str_json = "";

if ( $_SERVER[ "REQUEST_METHOD" ] == "POST" ) {
	$str_json = json_decode( file_get_contents( "php://input" ) );
}

// Generate a table row for each apartment in search results
foreach( $str_json as $apartment ) {

	$response .= 
			'<tr>
			<td style="overflow: hidden; white-space: nowrap;">'. $apartment->Name.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Address.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Rating.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Hours.
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->Phone;

	// Use filler text for URL field if website isn't listed in Google Maps
	if( !( isset( $apartment->URL ) ) ){
		$apartment->URL = "Website not listed in Google Maps";
		$response .=
			'</td><td style="overflow: hidden; white-space: nowrap;">'. $apartment->URL;
	} else {
		$response .= 
			'</td><td style="overflow: hidden; white-space: nowrap;">'. '<a href="'.$apartment->URL.'" target="_blank">Website</a>';
	}

	$response .=
			'</td></tr>';
}

echo $response;

?>

