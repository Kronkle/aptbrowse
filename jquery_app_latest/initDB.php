<?php

// Include the FirePHP class for debugging
require_once('FirePHPCore/FirePHP.class.php');

// Start buffering the output. Not required if output_buffering is set on in php.ini file
ob_start();

// Get a firePHP variable reference
$firephp = FirePHP::getInstance(true);

$firephp->log("FirePHP Test Output!");

//MySQL processing will go here
$servername = "localhost";
$username = "root";
$password = "password";

$connect = new mysqli($servername, $username, $password);

$firephp->log("Before connect");

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
	$firephp->log("Connection failed");
}

$firephp->log("Connected successfully");

//Create db for user accounts
$sql = "CREATE DATABASE accounts";
if ($connect->query($sql) === TRUE) {
	echo "accounts db created successfully\n";
} else {
	echo "Error creating database: " . $connect->error;
}

//Create db for saved search results
$sql = "CREATE DATABASE results";
if ($connect->query($sql) === TRUE) {
	echo "results db created successfully\n";
} else {
	echo "Error creating database: " . $connect->error;
}

$connect->close();

//Create table in accounts db (consolidate this into one connection)
$db = "accounts";

$connect = new mysqli($servername, $username, $password, $db);

$sql = "CREATE TABLE users (
	UserID   INT(25) NOT NULL AUTO_INCREMENT PRIMARY KEY ,
	Username VARCHAR(65) NOT NULL ,
	Password VARCHAR(32) NOT NULL
)";

if ($connect->query($sql) === TRUE) {
	echo "accounts db table created successfully\n";
} else {
	echo "Error creating table: " . $connect->error;
}

$connect->close();


?>