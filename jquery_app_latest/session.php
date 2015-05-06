<?php


//Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

//Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

//get a firePHP variable reference
$firephp = FirePHP::getInstance(true);
//Create an account session
$firephp->log("FirePHP Test Output!");

session_start();


$firephp->log("FirePHP Test Output!");

$servername = "localhost";
$dbname = "accounts";
$username = "root";
$password = "password";

$connect = new mysqli($servername, $username, $password);
$connect->select_db($dbname);
?>