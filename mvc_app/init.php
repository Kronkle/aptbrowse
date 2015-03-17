<?php

//MySQL processing will go here
$servername = "localhost";
$username = "root";
$password = "password";

$connect = new mysqli($servername, $username, $password);

if ($connect->connect_error) {
	die("Connection failed: " . $connect->connect_error);
}

echo "Connected successfully";

//Create just one db for now
$sql = "CREATE DATABASE aptbrowseDB";
if ($connect->query($sql) === TRUE) {
	echo "aptbrowseDB created successfully";
} else {
	echo "Error creating database: " . $connect->error;
}

$connect->close();

?>